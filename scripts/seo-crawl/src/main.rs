//! seo-crawl — audit a sitemap in one pass.
//!
//! For every URL it reports: HTTP status, redirect target, `<link rel=canonical>`,
//! `<meta name=robots>` and the `X-Robots-Tag` header.
//!
//! Why this exists: the shell equivalent was
//!   `cat urls.txt | xargs -P 8 -I{} sh -c 'curl ... {}'`
//! which spawns two processes per URL and performs a fresh TCP+TLS handshake every
//! time. Here one pooled client keeps connections alive, so the handshake is paid
//! once per host instead of once per URL, and nothing is ever forked.
//!
//! Redirects are deliberately NOT followed — a 301 in a sitemap is the finding.

use clap::Parser;
use futures::stream::{self, StreamExt};
use regex::Regex;
use serde::Serialize;
use std::collections::{BTreeMap, HashSet};
use std::path::PathBuf;
use std::sync::LazyLock;
use std::time::{Duration, Instant};

// Compiled once, on first use. LazyLock is std since Rust 1.80 — no once_cell needed.
static RE_LOC: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(?is)<loc>\s*(.*?)\s*</loc>").unwrap());
static RE_CANONICAL: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r#"(?is)<link[^>]+rel\s*=\s*["']?canonical["']?[^>]*>"#).unwrap()
});
static RE_META_ROBOTS: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r#"(?is)<meta[^>]+name\s*=\s*["']?robots["']?[^>]*>"#).unwrap()
});
static RE_HREF: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r#"(?is)href\s*=\s*["']([^"']*)["']"#).unwrap());
static RE_CONTENT: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r#"(?is)content\s*=\s*["']([^"']*)["']"#).unwrap());

const GOOGLEBOT_UA: &str =
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const BROWSER_UA: &str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
                          (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

#[derive(Parser, Debug)]
#[command(
    name = "seo-crawl",
    about = "Crawl a sitemap and report status, canonical and robots directives"
)]
struct Args {
    /// Sitemap URL. Sitemap-index files are expanded automatically.
    #[arg(long, conflicts_with = "urls")]
    sitemap: Option<String>,

    /// File of URLs, one per line (alternative to --sitemap).
    #[arg(long)]
    urls: Option<PathBuf>,

    /// Simultaneous in-flight requests.
    #[arg(long, default_value_t = 32)]
    concurrency: usize,

    /// Per-request timeout in seconds.
    #[arg(long, default_value_t = 30)]
    timeout: u64,

    /// Identify as Googlebot (default) or as a browser.
    #[arg(long, default_value = "googlebot", value_parser = ["googlebot", "browser"])]
    ua: String,

    /// Skip body download; status + headers only. Much faster, but no canonical.
    #[arg(long)]
    status_only: bool,

    /// Write rows here as CSV and JSON (two files, .csv and .json).
    #[arg(long)]
    out: Option<PathBuf>,

    /// Retry once, serially, anything that failed to connect.
    #[arg(long, default_value_t = true)]
    retry_failures: bool,
}

#[derive(Serialize, Clone, Debug)]
struct Row {
    url: String,
    /// 0 means the request never produced a response (DNS, TLS, timeout).
    status: u16,
    error: Option<String>,
    location: Option<String>,
    canonical: Option<String>,
    meta_robots: Option<String>,
    x_robots_tag: Option<String>,
    /// True when `canonical` resolves to something other than `url`.
    canonical_mismatch: bool,
    head_bytes: usize,
    ms: u128,
}

/// Read only as far as `</head>`, or `limit` bytes, whichever comes first.
/// Product pages can be hundreds of KB; everything we need is in the head.
async fn read_head(res: reqwest::Response, limit: usize) -> String {
    let mut res = res;
    let mut buf: Vec<u8> = Vec::with_capacity(16 * 1024);
    while let Ok(Some(chunk)) = res.chunk().await {
        buf.extend_from_slice(&chunk);
        if let Some(pos) = find_head_end(&buf) {
            buf.truncate(pos);
            break;
        }
        if buf.len() >= limit {
            break;
        }
    }
    String::from_utf8_lossy(&buf).into_owned()
}

fn find_head_end(buf: &[u8]) -> Option<usize> {
    // Cheap two-case scan; avoids allocating a lowercased copy of the whole body.
    for needle in [b"</head".as_slice(), b"</HEAD".as_slice()] {
        if let Some(p) = buf.windows(needle.len()).position(|w| w == needle) {
            return Some(p + needle.len());
        }
    }
    None
}

fn attr(tag_re: &Regex, val_re: &Regex, html: &str) -> Option<String> {
    let tag = tag_re.find(html)?.as_str();
    let v = val_re.captures(tag)?.get(1)?.as_str().trim();
    if v.is_empty() {
        None
    } else {
        Some(v.to_string())
    }
}

/// Compare canonical against the crawled URL, tolerating only a trailing-slash
/// difference in neither direction — a canonical that points at a URL which
/// itself redirects is exactly the bug we are hunting, so be strict.
fn is_mismatch(url: &str, canonical: &Option<String>) -> bool {
    match canonical {
        None => false,
        Some(c) => {
            let norm = |s: &str| s.trim_end_matches('#').to_string();
            norm(c) != norm(url)
        }
    }
}

async fn probe(client: &reqwest::Client, url: &str, status_only: bool) -> Row {
    let started = Instant::now();
    let req = if status_only {
        client.head(url)
    } else {
        client.get(url)
    };

    match req.send().await {
        Err(e) => Row {
            url: url.to_string(),
            status: 0,
            error: Some(shorten_err(&e)),
            location: None,
            canonical: None,
            meta_robots: None,
            x_robots_tag: None,
            canonical_mismatch: false,
            head_bytes: 0,
            ms: started.elapsed().as_millis(),
        },
        Ok(res) => {
            let status = res.status().as_u16();
            let hdr = |name: &str| {
                res.headers()
                    .get(name)
                    .and_then(|v| v.to_str().ok())
                    .map(|s| s.to_string())
            };
            let location = hdr("location");
            let x_robots_tag = hdr("x-robots-tag");

            let (canonical, meta_robots, head_bytes) = if status_only {
                (None, None, 0)
            } else {
                let html = read_head(res, 256 * 1024).await;
                let n = html.len();
                (
                    attr(&RE_CANONICAL, &RE_HREF, &html),
                    attr(&RE_META_ROBOTS, &RE_CONTENT, &html),
                    n,
                )
            };

            Row {
                url: url.to_string(),
                status,
                error: None,
                location,
                canonical_mismatch: is_mismatch(url, &canonical),
                canonical,
                meta_robots,
                x_robots_tag,
                head_bytes,
                ms: started.elapsed().as_millis(),
            }
        }
    }
}

fn shorten_err(e: &reqwest::Error) -> String {
    if e.is_timeout() {
        "timeout".into()
    } else if e.is_connect() {
        "connect".into()
    } else if e.is_redirect() {
        "redirect-policy".into()
    } else {
        let s = e.to_string();
        s.chars().take(90).collect()
    }
}

/// Expand a sitemap or sitemap-index into a flat URL list. Iterative worklist
/// instead of async recursion, which would need boxed futures.
async fn collect_urls(client: &reqwest::Client, root: &str) -> Result<Vec<String>, String> {
    let mut work = vec![root.to_string()];
    let mut seen_maps: HashSet<String> = HashSet::new();
    let mut out: Vec<String> = Vec::new();
    let mut seen_urls: HashSet<String> = HashSet::new();

    while let Some(map_url) = work.pop() {
        if !seen_maps.insert(map_url.clone()) {
            continue;
        }
        let body = client
            .get(&map_url)
            .send()
            .await
            .map_err(|e| format!("{map_url}: {e}"))?
            .text()
            .await
            .map_err(|e| format!("{map_url}: {e}"))?;

        let is_index = body.to_ascii_lowercase().contains("<sitemapindex");
        let mut found = 0usize;
        for c in RE_LOC.captures_iter(&body) {
            let loc = c.get(1).map(|m| m.as_str().trim()).unwrap_or("");
            if loc.is_empty() {
                continue;
            }
            let loc = loc
                .replace("&amp;", "&")
                .replace("&lt;", "<")
                .replace("&gt;", ">");
            found += 1;
            if is_index {
                work.push(loc);
            } else if seen_urls.insert(loc.clone()) {
                out.push(loc);
            }
        }
        eprintln!(
            "  {} {} -> {} entr{}",
            if is_index { "index" } else { "sitemap" },
            map_url,
            found,
            if found == 1 { "y" } else { "ies" }
        );
    }
    Ok(out)
}

fn write_outputs(rows: &[Row], base: &PathBuf) -> std::io::Result<()> {
    use std::io::Write;

    let json_path = base.with_extension("json");
    std::fs::write(&json_path, serde_json::to_vec_pretty(rows).unwrap())?;

    let csv_path = base.with_extension("csv");
    let mut f = std::fs::File::create(&csv_path)?;
    writeln!(
        f,
        "status,url,location,canonical,canonical_mismatch,meta_robots,x_robots_tag,ms,error"
    )?;
    let q = |o: &Option<String>| -> String {
        match o {
            None => String::new(),
            Some(s) => format!("\"{}\"", s.replace('"', "\"\"")),
        }
    };
    for r in rows {
        writeln!(
            f,
            "{},\"{}\",{},{},{},{},{},{},{}",
            r.status,
            r.url.replace('"', "\"\""),
            q(&r.location),
            q(&r.canonical),
            r.canonical_mismatch,
            q(&r.meta_robots),
            q(&r.x_robots_tag),
            r.ms,
            q(&r.error),
        )?;
    }
    eprintln!("  wrote {}", csv_path.display());
    eprintln!("  wrote {}", json_path.display());
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();

    let ua = if args.ua == "browser" {
        BROWSER_UA
    } else {
        GOOGLEBOT_UA
    };

    let client = reqwest::Client::builder()
        .user_agent(ua)
        .timeout(Duration::from_secs(args.timeout))
        // Do not follow redirects: a 3xx in a sitemap is the finding, not a detour.
        .redirect(reqwest::redirect::Policy::none())
        // Keep sockets warm; this is the whole point of the rewrite.
        .pool_max_idle_per_host(args.concurrency)
        .pool_idle_timeout(Duration::from_secs(90))
        .build()?;

    // ---- gather the URL list -------------------------------------------------
    let urls: Vec<String> = if let Some(sm) = &args.sitemap {
        eprintln!("[1/3] Expanding sitemap");
        collect_urls(&client, sm).await.map_err(|e| -> Box<dyn std::error::Error> { e.into() })?
    } else if let Some(path) = &args.urls {
        eprintln!("[1/3] Reading {}", path.display());
        tokio::fs::read_to_string(path)
            .await?
            .lines()
            .map(str::trim)
            .filter(|l| l.starts_with("http"))
            .map(str::to_string)
            .collect()
    } else {
        eprintln!("Need --sitemap <url> or --urls <file>. See --help.");
        std::process::exit(2);
    };

    if urls.is_empty() {
        eprintln!("No URLs found.");
        std::process::exit(1);
    }
    eprintln!(
        "  {} unique URL(s), concurrency {}, as {}",
        urls.len(),
        args.concurrency,
        if args.ua == "browser" { "browser" } else { "Googlebot" }
    );

    // ---- crawl ---------------------------------------------------------------
    eprintln!("[2/3] Crawling");
    let wall = Instant::now();
    let total = urls.len();

    // buffer_unordered gives bounded concurrency without spawning a task per URL.
    let mut rows: Vec<Row> = stream::iter(urls.iter().cloned())
        .map(|u| {
            let client = &client;
            let status_only = args.status_only;
            async move { probe(client, &u, status_only).await }
        })
        .buffer_unordered(args.concurrency)
        .enumerate()
        .map(|(i, row)| {
            let n = i + 1;
            if n % 250 == 0 || n == total {
                eprintln!("  {n}/{total}");
            }
            row
        })
        .collect()
        .await;

    // A connection failure under load is usually load, not a broken page.
    if args.retry_failures {
        let failed: Vec<String> = rows
            .iter()
            .filter(|r| r.status == 0)
            .map(|r| r.url.clone())
            .collect();
        if !failed.is_empty() {
            eprintln!("  retrying {} failure(s) serially", failed.len());
            for url in failed {
                let fresh = probe(&client, &url, args.status_only).await;
                if let Some(slot) = rows.iter_mut().find(|r| r.url == url) {
                    *slot = fresh;
                }
            }
        }
    }

    let elapsed = wall.elapsed();
    rows.sort_by(|a, b| a.status.cmp(&b.status).then_with(|| a.url.cmp(&b.url)));

    // ---- report --------------------------------------------------------------
    eprintln!("[3/3] Summary\n");

    let mut by_status: BTreeMap<u16, usize> = BTreeMap::new();
    for r in &rows {
        *by_status.entry(r.status).or_default() += 1;
    }
    println!("status distribution");
    for (code, n) in &by_status {
        let label = if *code == 0 { "failed".to_string() } else { code.to_string() };
        println!("  {label:>6}  {n}");
    }

    let bad: Vec<&Row> = rows.iter().filter(|r| r.status != 200).collect();
    if bad.is_empty() {
        println!("\nall {} URLs returned 200", rows.len());
    } else {
        println!("\nnon-200 ({})", bad.len());
        for r in &bad {
            let extra = r
                .location
                .as_deref()
                .or(r.error.as_deref())
                .unwrap_or("");
            println!("  {:>3}  {}  {}", r.status, r.url, extra);
        }
    }

    if !args.status_only {
        let mism: Vec<&Row> = rows
            .iter()
            .filter(|r| r.status == 200 && r.canonical_mismatch)
            .collect();
        if !mism.is_empty() {
            println!("\ncanonical points elsewhere ({})", mism.len());
            for r in mism.iter().take(40) {
                println!("  {}\n     -> {}", r.url, r.canonical.as_deref().unwrap_or(""));
            }
            if mism.len() > 40 {
                println!("  ... and {} more", mism.len() - 40);
            }
        }

        let missing: usize = rows
            .iter()
            .filter(|r| r.status == 200 && r.canonical.is_none())
            .count();
        if missing > 0 {
            println!("\n{missing} URL(s) returned 200 with NO canonical tag");
        }

        let noindex: Vec<&Row> = rows
            .iter()
            .filter(|r| {
                let m = r.meta_robots.as_deref().unwrap_or("").to_ascii_lowercase();
                let x = r.x_robots_tag.as_deref().unwrap_or("").to_ascii_lowercase();
                m.contains("noindex") || x.contains("noindex")
            })
            .collect();
        if !noindex.is_empty() {
            println!(
                "\nnoindex while present in the crawl set ({}) — these must not be in a sitemap",
                noindex.len()
            );
            for r in &noindex {
                println!(
                    "  {}  meta={:?} header={:?}",
                    r.url, r.meta_robots, r.x_robots_tag
                );
            }
        }
    }

    let secs = elapsed.as_secs_f64();
    println!(
        "\n{} URLs in {:.2}s  ({:.1} req/s)",
        rows.len(),
        secs,
        rows.len() as f64 / secs.max(0.001)
    );

    if let Some(out) = &args.out {
        write_outputs(&rows, out)?;
    }

    Ok(())
}
