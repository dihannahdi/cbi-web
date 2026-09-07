//! gsc-mail — download Google Search Console notification emails over IMAP.
//!
//! Rust port of `scripts/gsc-mail/fetch_gsc_emails.py`. Same config file, same
//! output shape, so it drops in place.
//!
//! Honest note on why: this job is bound by Gmail's IMAP round-trips, not by CPU,
//! so it is not meaningfully faster than the Python version. What Rust buys here is
//! one language across the toolbox and a compiler that will not let a missing
//! header or a bad decode pass silently.
//!
//! Messages are fetched with BODY.PEEK and the mailbox is opened with EXAMINE
//! (read-only), so nothing is ever marked as read.

use clap::Parser;
use futures::StreamExt;
use regex::Regex;
use serde::Serialize;
use std::collections::BTreeMap;
use std::path::{Path, PathBuf};
use std::sync::{Arc, LazyLock};
use tokio::net::TcpStream;
use tokio_rustls::rustls::pki_types::ServerName;
use tokio_rustls::rustls::{ClientConfig, RootCertStore};
use tokio_rustls::TlsConnector;

const IMAP_HOST: &str = "imap.gmail.com";
const IMAP_PORT: u16 = 993;
const FETCH_BATCH: usize = 25;

/// Senders Search Console has used for notification mail. In practice only the
/// first has ever matched, but the others cost nothing to try.
const GSC_SENDERS: &[&str] = &[
    "sc-noreply@google.com",
    "search-console-noreply@google.com",
    "wmt-noreply@google.com",
];

/// Coverage / indexing reasons as GSC words them, so each email can be tagged and
/// the digest skimmed without opening every message.
const KNOWN_REASONS: &[&str] = &[
    "Blocked by robots.txt",
    "Indexed, though blocked by robots.txt",
    "Blocked due to unauthorized request (401)",
    "Blocked due to access forbidden (403)",
    "Blocked due to other 4xx issue",
    "Page with redirect",
    "Excluded by 'noindex' tag",
    "Page blocked by noindex tag",
    "Discovered - currently not indexed",
    "Crawled - currently not indexed",
    "Duplicate without user-selected canonical",
    "Duplicate, Google chose different canonical than user",
    "Alternative page with proper canonical tag",
    "Alternate page with proper canonical tag",
    "Not found (404)",
    "Soft 404",
    "Server error (5xx)",
    "Redirect error",
    "Crawl anomaly",
];

/// Google's own hosts appear in every footer — never report them as the site.
const GOOGLE_HOSTS: &[&str] = &[
    "google.com",
    "c.gle",
    "gstatic.com",
    "googleapis.com",
    "youtube.com",
];

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

#[derive(Parser, Debug)]
#[command(name = "gsc-mail", about = "Download GSC notification emails from Gmail")]
struct Args {
    /// Only mail newer than N days (0 = all time).
    #[arg(long, default_value_t = 0)]
    days: i64,

    /// Keep only emails mentioning this domain.
    #[arg(long, default_value = "")]
    site: String,

    /// Mailbox to scan. The default includes archived mail.
    #[arg(long, default_value = "[Gmail]/All Mail")]
    folder: String,

    /// Output directory.
    #[arg(long)]
    out: Option<PathBuf>,

    /// Config file. Defaults to ../gsc-mail/.env.gsc-mail then ./.env.gsc-mail
    #[arg(long)]
    env_file: Option<PathBuf>,
}

// ---------------------------------------------------------------------------
// Regexes, compiled once
// ---------------------------------------------------------------------------

static RE_SC_DOMAIN: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"sc-domain:([A-Za-z0-9.\-]+)").unwrap());
// GSC writes both "for site X" and "on site X" depending on the notice type.
static RE_FOR_ON_SITE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(?i)\b(?:for|on)\s+site\s+(https?://[^\s,;)\]]+|[A-Za-z0-9.\-]+\.[A-Za-z]{2,})")
        .unwrap()
});
static RE_DETECTED_FOR: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(
        r"(?i)\b(?:detected|presence|traffic to|with)\s+(?:for\s+)?(https?://[^\s,;)\]]+|[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+\.[A-Za-z]{2,})",
    )
    .unwrap()
});
static RE_BARE_DOMAIN: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"\b([A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.(?:com|id|tech|online|net|org))\b")
        .unwrap()
});
static RE_COUNT: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(?i)\d[\d,. ]{0,12}?\s+(?:pages?|URLs?|valid|invalid|affected|new)\b").unwrap()
});
static RE_WS: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"[ \t\r\x0b\x0c]+").unwrap());
static RE_BLANKS: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"\n\s*\n\s*\n+").unwrap());
static RE_TAG: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"(?s)<[^>]*>").unwrap());
static RE_DROP_BLOCK: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(?is)<(script|style|head|title)\b[^>]*>.*?</\s*(?:script|style|head|title)\s*>")
        .unwrap()
});
static RE_BREAK_TAG: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"(?i)</?\s*(?:p|div|br|tr|li|h[1-6]|table|ul|ol)\b[^>]*>").unwrap()
});
static RE_CELL_TAG: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(?i)<\s*(?:td|th)\b[^>]*>").unwrap());
static RE_ANCHOR: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r#"(?is)<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>"#).unwrap());
static RE_NUM_ENTITY: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"&#(x?[0-9A-Fa-f]+);").unwrap());
static RE_NON_SLUG: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"[^A-Za-z0-9]+").unwrap());

// ---------------------------------------------------------------------------
// HTML -> text
// ---------------------------------------------------------------------------

fn decode_entities(s: &str) -> String {
    let mut out = RE_NUM_ENTITY
        .replace_all(s, |c: &regex::Captures| {
            let raw = &c[1];
            let cp = match raw.strip_prefix('x').or_else(|| raw.strip_prefix('X')) {
                Some(hex) => u32::from_str_radix(hex, 16).ok(),
                None => raw.parse::<u32>().ok(),
            };
            cp.and_then(char::from_u32)
                .map(|ch| ch.to_string())
                .unwrap_or_default()
        })
        .into_owned();
    for (from, to) in [
        ("&nbsp;", " "),
        ("&ndash;", "\u{2013}"),
        ("&mdash;", "\u{2014}"),
        ("&quot;", "\""),
        ("&apos;", "'"),
        ("&lt;", "<"),
        ("&gt;", ">"),
        // &amp; last, so "&amp;lt;" does not collapse all the way to "<"
        ("&amp;", "&"),
    ] {
        out = out.replace(from, to);
    }
    out
}

fn html_to_text(html: &str) -> String {
    let s = RE_DROP_BLOCK.replace_all(html, "\n");
    // Keep link targets — GSC emails carry the report URL in an anchor.
    let s = RE_ANCHOR.replace_all(&s, " <$1> ");
    let s = RE_CELL_TAG.replace_all(&s, " | ");
    let s = RE_BREAK_TAG.replace_all(&s, "\n");
    let s = RE_TAG.replace_all(&s, "");
    let s = decode_entities(&s);
    let s = RE_WS.replace_all(&s, " ");
    let s = RE_BLANKS.replace_all(&s, "\n\n");
    s.lines()
        .map(|l| l.trim().trim_matches('|').trim())
        .filter(|l| !l.is_empty())
        .collect::<Vec<_>>()
        .join("\n")
        .trim()
        .to_string()
}

// ---------------------------------------------------------------------------
// MIME walking
// ---------------------------------------------------------------------------

/// Collect text/plain and text/html payloads from a possibly-nested message.
fn collect_parts(mail: &mailparse::ParsedMail, plain: &mut Vec<String>, html: &mut Vec<String>) {
    if matches!(
        mail.get_content_disposition().disposition,
        mailparse::DispositionType::Attachment
    ) {
        return;
    }

    if mail.subparts.is_empty() {
        let ctype = mail.ctype.mimetype.to_ascii_lowercase();
        if let Ok(body) = mail.get_body() {
            if ctype == "text/plain" {
                plain.push(body);
            } else if ctype == "text/html" {
                html.push(body);
            }
        }
        return;
    }
    for sub in &mail.subparts {
        collect_parts(sub, plain, html);
    }
}

fn extract_body(mail: &mailparse::ParsedMail) -> String {
    let mut plain = Vec::new();
    let mut html = Vec::new();
    collect_parts(mail, &mut plain, &mut html);

    let usable: Vec<&str> = plain
        .iter()
        .map(|s| s.as_str())
        .filter(|p| !p.trim().is_empty())
        .collect();
    if !usable.is_empty() {
        let body = usable.join("\n\n");
        return RE_BLANKS.replace_all(&body, "\n\n").trim().to_string();
    }
    html_to_text(&html.join("\n"))
}

// ---------------------------------------------------------------------------
// Analysis
// ---------------------------------------------------------------------------

fn strip_scheme(host: &str) -> String {
    host.trim_start_matches("https://")
        .trim_start_matches("http://")
        .to_ascii_lowercase()
}

fn is_google_host(host: &str) -> bool {
    let bare = strip_scheme(host);
    GOOGLE_HOSTS
        .iter()
        .any(|g| bare == *g || bare.ends_with(&format!(".{g}")))
}

fn detect_site(subject: &str, body: &str) -> String {
    let head: String = body.chars().take(4000).collect();
    let pats: [&LazyLock<Regex>; 4] = [
        &RE_SC_DOMAIN,
        &RE_FOR_ON_SITE,
        &RE_DETECTED_FOR,
        &RE_BARE_DOMAIN,
    ];
    for blob in [subject, head.as_str()] {
        for pat in pats {
            for c in pat.captures_iter(blob) {
                let host = c[1].trim_end_matches(['/', '.']).to_string();
                if is_google_host(&host) {
                    continue;
                }
                // Normalise so "https://biosolution.tech/" and "biosolution.tech"
                // do not count as two different properties.
                return strip_scheme(&host)
                    .trim_start_matches("www.")
                    .trim_end_matches('/')
                    .to_string();
            }
        }
    }
    String::new()
}

/// GSC is inconsistent about hyphen vs en dash and straight vs curly quotes.
/// Fold all of them away before matching.
fn fold(s: &str) -> String {
    s.to_lowercase()
        .replace(['-', '\u{2013}', '\u{2014}'], "")
        .replace(['\u{2018}', '\u{2019}'], "'")
}

fn detect_reasons(subject: &str, body: &str) -> Vec<String> {
    let hay = fold(&format!("{subject}\n{body}"));
    KNOWN_REASONS
        .iter()
        .filter(|r| hay.contains(&fold(r)))
        .map(|r| r.to_string())
        .collect()
}

fn detect_counts(body: &str) -> Vec<String> {
    let head: String = body.chars().take(6000).collect();
    let mut out: Vec<String> = Vec::new();
    for m in RE_COUNT.find_iter(&head) {
        let snippet = RE_WS.replace_all(m.as_str().trim(), " ").into_owned();
        if !out.contains(&snippet) {
            out.push(snippet);
        }
        if out.len() >= 8 {
            break;
        }
    }
    out
}

fn classify(subject: &str) -> &'static str {
    let s = subject.to_lowercase();
    let has = |ks: &[&str]| ks.iter().any(|k| s.contains(k));
    if has(&["manual action", "security", "spam"]) {
        "critical"
    } else if has(&["not indexed", "indexing", "coverage", "index"]) {
        "indexing"
    } else if has(&["core web vitals", "page experience", "speed"]) {
        "performance"
    } else if s.contains("mobile usability") {
        "mobile"
    } else if has(&[
        "breadcrumb",
        "structured data",
        "rich result",
        "product",
        "faq",
        "review snippet",
        "merchant listing",
        "shopping tab",
    ]) {
        "structured-data"
    } else if s.contains("sitemap") {
        "sitemap"
    } else if has(&["search performance", "monthly", "progress"]) {
        "report"
    } else {
        "other"
    }
}

// ---------------------------------------------------------------------------
// Record
// ---------------------------------------------------------------------------

#[derive(Serialize, Clone, Debug)]
struct Record {
    message_id: String,
    date: String,
    from: String,
    subject: String,
    site: String,
    category: String,
    reasons: Vec<String>,
    counts: Vec<String>,
    body: String,
}

fn slugify(text: &str, limit: usize) -> String {
    let s = RE_NON_SLUG
        .replace_all(text, "-")
        .trim_matches('-')
        .to_lowercase();
    let cut: String = s.chars().take(limit).collect();
    let cut = cut.trim_end_matches('-').to_string();
    if cut.is_empty() {
        "untitled".into()
    } else {
        cut
    }
}

/// First 10 chars of an RFC3339 date, or empty.
fn day_of(date: &str) -> &str {
    if date.len() >= 10 { &date[..10] } else { "" }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/// The crate root, derived from the running binary at target/<profile>/gsc-mail.
fn crate_root() -> PathBuf {
    std::env::current_exe()
        .ok()
        .and_then(|p| {
            p.parent()
                .and_then(|d| d.parent())
                .and_then(|d| d.parent())
                .map(Path::to_path_buf)
        })
        .unwrap_or_else(|| PathBuf::from("."))
}

fn load_env(explicit: Option<&Path>) -> Result<(String, String, PathBuf), String> {
    let root = crate_root();
    let candidates: Vec<PathBuf> = match explicit {
        Some(p) => vec![p.to_path_buf()],
        None => vec![
            // Reuse the Python tool's config so nothing needs reconfiguring.
            root.join("..").join("gsc-mail").join(".env.gsc-mail"),
            root.join(".env.gsc-mail"),
            PathBuf::from(".env.gsc-mail"),
        ],
    };

    let found = candidates.iter().find(|p| p.exists()).ok_or_else(|| {
        format!(
            "No config found. Looked in:\n{}\n\n    \
             Create one with GMAIL_ADDRESS and GMAIL_APP_PASSWORD.\n    \
             App Password: https://myaccount.google.com/apppasswords\n    \
             (2-Step Verification must be enabled first.)",
            candidates
                .iter()
                .map(|p| format!("      {}", p.display()))
                .collect::<Vec<_>>()
                .join("\n")
        )
    })?;

    let text = std::fs::read_to_string(found).map_err(|e| format!("{}: {e}", found.display()))?;
    let mut user = String::new();
    let mut pass = String::new();
    for line in text.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        let Some((k, v)) = line.split_once('=') else {
            continue;
        };
        let v = v.trim().trim_matches('"').trim_matches('\'');
        match k.trim() {
            "GMAIL_ADDRESS" => user = v.to_string(),
            "GMAIL_APP_PASSWORD" => pass = v.replace(' ', ""),
            _ => {}
        }
    }
    if user.is_empty() || pass.is_empty() {
        return Err(format!(
            "GMAIL_ADDRESS and GMAIL_APP_PASSWORD must both be set in {}",
            found.display()
        ));
    }
    Ok((user, pass, found.clone()))
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

fn write_outputs(records: &[Record], out_dir: &Path) -> std::io::Result<()> {
    use std::fmt::Write as _;

    let raw_dir = out_dir.join("raw");
    std::fs::create_dir_all(&raw_dir)?;

    std::fs::write(
        out_dir.join("gsc-emails.json"),
        serde_json::to_vec_pretty(records).unwrap(),
    )?;

    for r in records {
        let day = if r.date.len() >= 10 { &r.date[..10] } else { "0000-00-00" };
        let name = format!("{day}-{}.txt", slugify(&r.subject, 60));
        let payload = format!(
            "Date:    {}\nFrom:    {}\nSubject: {}\nSite:    {}\nReasons: {}\n{}\n\n{}\n",
            r.date,
            r.from,
            r.subject,
            if r.site.is_empty() { "(undetected)" } else { &r.site },
            if r.reasons.is_empty() {
                "(none matched)".to_string()
            } else {
                r.reasons.join(", ")
            },
            "-".repeat(78),
            r.body
        );
        std::fs::write(raw_dir.join(name), payload)?;
    }

    let mut d = String::new();
    let generated = chrono::Local::now().format("%Y-%m-%d %H:%M %Z");
    writeln!(d, "# Google Search Console — Email Digest\n").unwrap();
    writeln!(
        d,
        "Generated: {generated}  \nTotal messages: **{}**\n",
        records.len()
    )
    .unwrap();

    let mut by_cat: BTreeMap<&str, usize> = BTreeMap::new();
    let mut by_site: BTreeMap<String, usize> = BTreeMap::new();
    let mut tally: BTreeMap<&str, usize> = BTreeMap::new();
    for r in records {
        *by_cat.entry(r.category.as_str()).or_default() += 1;
        let key = if r.site.is_empty() {
            "(undetected)".to_string()
        } else {
            r.site.clone()
        };
        *by_site.entry(key).or_default() += 1;
        for reason in &r.reasons {
            *tally.entry(reason.as_str()).or_default() += 1;
        }
    }

    let mut table = |title: &str, head: &str, mut rows: Vec<(String, usize)>| {
        writeln!(d, "## {title}\n").unwrap();
        writeln!(d, "| {head} | Emails |\n| --- | --- |").unwrap();
        rows.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
        for (k, n) in rows {
            writeln!(d, "| {k} | {n} |").unwrap();
        }
        d.push('\n');
    };

    table(
        "By category",
        "Category",
        by_cat.iter().map(|(k, v)| (k.to_string(), *v)).collect(),
    );
    table(
        "By site",
        "Site",
        by_site.iter().map(|(k, v)| (k.clone(), *v)).collect(),
    );
    table(
        "Issue reasons mentioned (across all emails)",
        "Reason",
        tally.iter().map(|(k, v)| (k.to_string(), *v)).collect(),
    );

    writeln!(d, "## Timeline (newest first)\n").unwrap();
    writeln!(
        d,
        "| Date | Site | Category | Subject | Reasons |\n| --- | --- | --- | --- | --- |"
    )
    .unwrap();
    for r in records {
        writeln!(
            d,
            "| {} | {} | {} | {} | {} |",
            day_of(&r.date),
            if r.site.is_empty() { "—" } else { &r.site },
            r.category,
            r.subject.replace('|', "\\|").replace('\n', " "),
            if r.reasons.is_empty() {
                "—".to_string()
            } else {
                r.reasons.join(", ").replace('|', "\\|")
            }
        )
        .unwrap();
    }
    d.push('\n');

    writeln!(d, "---\n\n## Full messages\n").unwrap();
    for r in records {
        writeln!(
            d,
            "### {} — {}\n",
            day_of(&r.date),
            r.subject.replace('\n', " ")
        )
        .unwrap();
        writeln!(d, "- **From:** {}", r.from).unwrap();
        writeln!(
            d,
            "- **Site:** {}",
            if r.site.is_empty() { "(undetected)" } else { &r.site }
        )
        .unwrap();
        writeln!(d, "- **Category:** {}", r.category).unwrap();
        if !r.reasons.is_empty() {
            writeln!(d, "- **Reasons:** {}", r.reasons.join(", ")).unwrap();
        }
        if !r.counts.is_empty() {
            writeln!(d, "- **Numbers seen:** {}", r.counts.join(", ")).unwrap();
        }
        writeln!(d, "\n```text").unwrap();
        if r.body.chars().count() < 8000 {
            writeln!(d, "{}", r.body).unwrap();
        } else {
            let cut: String = r.body.chars().take(8000).collect();
            writeln!(d, "{cut}\n...[truncated]").unwrap();
        }
        writeln!(d, "```\n").unwrap();
    }

    std::fs::write(out_dir.join("DIGEST.md"), d)?;
    Ok(())
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

fn die(msg: impl std::fmt::Display) -> ! {
    eprintln!("\n[!] {msg}\n");
    std::process::exit(1);
}

#[tokio::main]
async fn main() {
    let args = Args::parse();

    let (user, pass, cfg_path) = match load_env(args.env_file.as_deref()) {
        Ok(v) => v,
        Err(e) => die(e),
    };

    let out_dir = args.out.clone().unwrap_or_else(|| crate_root().join("out"));

    eprintln!("[1/4] Connecting to {IMAP_HOST} as {user}");
    eprintln!("      config: {}", cfg_path.display());

    // rustls, not native-tls: no OpenSSL needed at build time on Windows.
    let mut roots = RootCertStore::empty();
    roots.extend(webpki_roots::TLS_SERVER_ROOTS.iter().cloned());
    let tls_config = ClientConfig::builder()
        .with_root_certificates(roots)
        .with_no_client_auth();
    let connector = TlsConnector::from(Arc::new(tls_config));

    let tcp = match TcpStream::connect((IMAP_HOST, IMAP_PORT)).await {
        Ok(s) => s,
        Err(e) => die(format!("Could not reach Gmail IMAP: {e}")),
    };
    let dnsname = match ServerName::try_from(IMAP_HOST) {
        Ok(n) => n,
        Err(e) => die(format!("bad server name: {e}")),
    };
    let tls = match connector.connect(dnsname, tcp).await {
        Ok(s) => s,
        Err(e) => die(format!("TLS handshake failed: {e}")),
    };

    let mut client = async_imap::Client::new(tls);
    // The server greets first; consume it before issuing LOGIN.
    match client.read_response().await {
        Ok(Some(_)) => {}
        Ok(None) => die("connection closed before greeting"),
        Err(e) => die(format!("bad IMAP greeting: {e}")),
    }

    let mut session = match client.login(&user, &pass).await {
        Ok(s) => s,
        Err((e, _)) => die(format!(
            "Login rejected: {e}\n    Checklist:\n      \
             - GMAIL_APP_PASSWORD is a 16-char App Password, not the account password\n      \
             - 2-Step Verification is enabled on the account\n      \
             - IMAP is on: Gmail > Settings > Forwarding and POP/IMAP"
        )),
    };

    // EXAMINE, not SELECT: read-only, so nothing can be flagged as read.
    eprintln!("[2/4] Opening mailbox read-only: {}", args.folder);
    if session.examine(&args.folder).await.is_err() {
        eprintln!("      could not open {}, falling back to INBOX", args.folder);
        if let Err(e) = session.examine("INBOX").await {
            die(format!("Could not open any mailbox: {e}"));
        }
    }

    // ---- search ----
    eprintln!("[3/4] Searching for Search Console mail");
    let date_term = if args.days > 0 {
        let since = chrono::Local::now() - chrono::Duration::days(args.days);
        format!(" SINCE {}", since.format("%d-%b-%Y"))
    } else {
        String::new()
    };

    let mut uids: Vec<u32> = Vec::new();
    let mut queries: Vec<String> = GSC_SENDERS
        .iter()
        .map(|s| format!("FROM \"{s}\"{date_term}"))
        .collect();
    // Multi-word IMAP search values must be quoted or Gmail answers BAD.
    queries.push(format!("SUBJECT \"Search Console\"{date_term}"));

    for q in &queries {
        match session.uid_search(q).await {
            Ok(found) => {
                let before = uids.len();
                for u in found {
                    if !uids.contains(&u) {
                        uids.push(u);
                    }
                }
                eprintln!("      {q} -> {} new", uids.len() - before);
            }
            Err(e) => eprintln!("      {q} failed: {e}"),
        }
    }

    if uids.is_empty() {
        eprintln!("\n      No Search Console mail matched. Try --folder INBOX or a larger --days.");
        let _ = session.logout().await;
        return;
    }
    uids.sort_unstable();
    eprintln!("      {} candidate message(s)", uids.len());

    // ---- fetch ----
    eprintln!("[4/4] Downloading bodies (BODY.PEEK — mail stays unread)");
    let mut records: Vec<Record> = Vec::new();
    let mut seen_ids: Vec<String> = Vec::new();
    let total = uids.len();
    let mut done = 0usize;

    for chunk in uids.chunks(FETCH_BATCH) {
        let set = chunk
            .iter()
            .map(|u| u.to_string())
            .collect::<Vec<_>>()
            .join(",");

        // Scoped so the borrow on `session` ends before the next command.
        let mut bodies: Vec<Vec<u8>> = Vec::new();
        {
            let mut stream = match session.uid_fetch(&set, "BODY.PEEK[]").await {
                Ok(s) => s,
                Err(e) => {
                    eprintln!("      fetch failed for a batch: {e}");
                    continue;
                }
            };
            while let Some(item) = stream.next().await {
                match item {
                    Ok(f) => {
                        if let Some(b) = f.body() {
                            bodies.push(b.to_vec());
                        }
                    }
                    Err(e) => eprintln!("      fetch item error: {e}"),
                }
            }
        }

        for raw in bodies {
            let Ok(mail) = mailparse::parse_mail(&raw) else {
                eprintln!("      unparseable message, skipped");
                continue;
            };
            use mailparse::MailHeaderMap;
            let hget =
                |name: &str| -> String { mail.headers.get_first_value(name).unwrap_or_default() };

            let message_id = {
                let v = hget("Message-ID");
                if v.is_empty() {
                    format!("nomsgid-{}", records.len())
                } else {
                    v
                }
            };
            if seen_ids.contains(&message_id) {
                continue;
            }
            seen_ids.push(message_id.clone());

            // RFC 5322 folded headers unfold to a newline plus the original
            // indentation, which mailparse preserves verbatim. Collapse every
            // whitespace run to one space so the subject is a single clean line.
            let subject = hget("Subject")
                .split_whitespace()
                .collect::<Vec<_>>()
                .join(" ");
            let from = hget("From")
                .split_whitespace()
                .collect::<Vec<_>>()
                .join(" ");
            let date = mailparse::dateparse(&hget("Date"))
                .ok()
                .and_then(|ts| chrono::DateTime::from_timestamp(ts, 0))
                .map(|dt| dt.to_rfc3339())
                .unwrap_or_default();

            let body = extract_body(&mail);
            records.push(Record {
                message_id,
                date,
                from,
                site: detect_site(&subject, &body),
                category: classify(&subject).to_string(),
                reasons: detect_reasons(&subject, &body),
                counts: detect_counts(&body),
                subject,
                body,
            });
        }

        done += chunk.len();
        eprintln!("      fetched {done}/{total}");
    }

    let _ = session.logout().await;

    // ---- filter, sort, write ----
    if !args.site.is_empty() {
        let needle = args.site.to_lowercase();
        let before = records.len();
        records.retain(|r| {
            r.site.contains(&needle)
                || r.subject.to_lowercase().contains(&needle)
                || r.body.to_lowercase().contains(&needle)
        });
        eprintln!(
            "      site filter '{}': {}/{} kept",
            args.site,
            records.len(),
            before
        );
    }

    if records.is_empty() {
        eprintln!("\n      Nothing left after filtering. Re-run without --site.");
        return;
    }

    records.sort_by(|a, b| b.date.cmp(&a.date));

    if let Err(e) = std::fs::create_dir_all(&out_dir) {
        die(format!("cannot create {}: {e}", out_dir.display()));
    }
    if let Err(e) = write_outputs(&records, &out_dir) {
        die(format!("write failed: {e}"));
    }

    let newest = records.first().map(|r| day_of(&r.date)).unwrap_or("");
    let oldest = records.last().map(|r| day_of(&r.date)).unwrap_or("");
    println!();
    println!("  Done. {} email(s), {oldest} -> {newest}", records.len());
    println!("  Digest : {}", out_dir.join("DIGEST.md").display());
    println!("  JSON   : {}", out_dir.join("gsc-emails.json").display());
    println!(
        "  Raw    : {}  ({} files)",
        out_dir.join("raw").display(),
        records.len()
    );
}
