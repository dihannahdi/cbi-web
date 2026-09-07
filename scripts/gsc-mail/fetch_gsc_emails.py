#!/usr/bin/env python3
"""
Fetch Google Search Console notification emails from Gmail over IMAP.

Zero third-party dependencies -- imaplib, email and html.parser are stdlib.
Messages are read with BODY.PEEK so nothing in the mailbox is marked as read.

Setup (one time):
  1. Enable 2-Step Verification on the Google account.
  2. Create an App Password: https://myaccount.google.com/apppasswords
  3. Copy .env.gsc-mail.example to .env.gsc-mail and fill it in.

Usage:
  py fetch_gsc_emails.py                       # every GSC email, all time
  py fetch_gsc_emails.py --days 180            # last 180 days only
  py fetch_gsc_emails.py --site centrabiotechindonesia.com
  py fetch_gsc_emails.py --folder INBOX        # skip archived mail
"""

from __future__ import annotations

import argparse
import email
import imaplib
import json
import re
import sys
from datetime import datetime, timedelta, timezone
from email.header import decode_header, make_header
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path

HERE = Path(__file__).resolve().parent
ENV_FILE = HERE / ".env.gsc-mail"
DEFAULT_OUT = HERE / "out"

IMAP_HOST = "imap.gmail.com"
IMAP_PORT = 993

# Senders Search Console has used for notification mail.
GSC_SENDERS = (
    "sc-noreply@google.com",
    "search-console-noreply@google.com",
    "wmt-noreply@google.com",
)

# Coverage / indexing reasons as GSC words them. Used to tag each email so the
# digest can be skimmed without reading every message.
KNOWN_REASONS = (
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
    "Alternate page with proper canonical tag",
    "Not found (404)",
    "Soft 404",
    "Server error (5xx)",
    "Redirect error",
    "URL blocked due to other 4xx issue",
    "Crawl anomaly",
)


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

def log(msg: str) -> None:
    print(msg, flush=True)


def die(msg: str, code: int = 1) -> None:
    print(f"\n[!] {msg}\n", file=sys.stderr, flush=True)
    sys.exit(code)


class HTMLTextExtractor(HTMLParser):
    """Flatten HTML email bodies into readable plain text."""

    SKIP = {"script", "style", "head", "meta", "link", "title"}
    BREAK_AFTER = {"p", "div", "br", "tr", "li", "h1", "h2", "h3", "h4", "table"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self._skip_depth += 1
        elif tag == "a":
            href = dict(attrs).get("href", "")
            if href.startswith("http") and "google.com/url" not in href:
                self.parts.append(f" <{href}> ")
        elif tag in ("td", "th"):
            self.parts.append(" | ")

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip_depth:
            self._skip_depth -= 1
        elif tag in self.BREAK_AFTER:
            self.parts.append("\n")

    def handle_data(self, data):
        if not self._skip_depth:
            self.parts.append(data)

    def text(self) -> str:
        raw = "".join(self.parts)
        raw = re.sub(r"[ \t\r\f\v]+", " ", raw)
        raw = re.sub(r"\n\s*\n\s*\n+", "\n\n", raw)
        lines = [ln.strip(" |").strip() for ln in raw.split("\n")]
        return "\n".join(ln for ln in lines if ln).strip()


def html_to_text(html: str) -> str:
    parser = HTMLTextExtractor()
    try:
        parser.feed(html)
        parser.close()
    except Exception:
        pass
    return parser.text()


def decode_hdr(value: str | None) -> str:
    if not value:
        return ""
    try:
        return str(make_header(decode_header(value))).strip()
    except Exception:
        return value.strip()


def part_text(part) -> str:
    payload = part.get_payload(decode=True)
    if payload is None:
        return ""
    charset = part.get_content_charset() or "utf-8"
    try:
        return payload.decode(charset, errors="replace")
    except (LookupError, UnicodeDecodeError):
        return payload.decode("utf-8", errors="replace")


def extract_body(msg) -> str:
    """Prefer text/plain; fall back to flattened text/html."""
    plain: list[str] = []
    html: list[str] = []

    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_maintype() == "multipart":
                continue
            disp = str(part.get("Content-Disposition") or "")
            if "attachment" in disp.lower():
                continue
            ctype = part.get_content_type()
            if ctype == "text/plain":
                plain.append(part_text(part))
            elif ctype == "text/html":
                html.append(part_text(part))
    else:
        if msg.get_content_type() == "text/html":
            html.append(part_text(msg))
        else:
            plain.append(part_text(msg))

    if plain and any(p.strip() for p in plain):
        body = "\n\n".join(p for p in plain if p.strip())
        return re.sub(r"\n{3,}", "\n\n", body).strip()
    return html_to_text("\n".join(html))


def load_env() -> dict[str, str]:
    if not ENV_FILE.exists():
        template = HERE / ".env.gsc-mail.example"
        die(
            f"Config not found: {ENV_FILE}\n"
            f"    Copy the template and fill it in:\n"
            f"      copy \"{template.name}\" \".env.gsc-mail\"\n"
            f"    Then create an App Password at https://myaccount.google.com/apppasswords\n"
            f"    (2-Step Verification must be enabled first.)"
        )
    env: dict[str, str] = {}
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        env[key.strip()] = val.strip().strip('"').strip("'")
    return env


# --------------------------------------------------------------------------- #
# analysis
# --------------------------------------------------------------------------- #

SITE_PATTERNS = (
    re.compile(r"sc-domain:([A-Za-z0-9.\-]+)"),
    # GSC uses both "for site X" and "on site X" depending on the notice type.
    re.compile(r"\b(?:for|on)\s+site\s+(https?://[^\s,;)\]]+|[A-Za-z0-9.\-]+\.[A-Za-z]{2,})", re.I),
    # "... detected for example.com" / "... presence for example.com"
    re.compile(r"\b(?:detected|presence|traffic to|with)\s+(?:for\s+)?(https?://[^\s,;)\]]+|[A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)+\.[A-Za-z]{2,})", re.I),
    re.compile(r"\b(?:property|site)\b[^\n]{0,20}?(https?://[^\s,;)\]]+)", re.I),
    # Last resort: any bare domain in the subject line.
    re.compile(r"\b([A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.(?:com|id|tech|online|co\.id|net|org))\b"),
)


#  Google's own hosts appear in every footer -- never report them as the site.
GOOGLE_HOSTS = ("google.com", "c.gle", "gstatic.com", "googleapis.com", "youtube.com")


def detect_site(subject: str, body: str) -> str:
    for blob in (subject, body[:4000]):
        for pat in SITE_PATTERNS:
            for m in pat.finditer(blob):
                host = m.group(1).rstrip("/.")
                bare = re.sub(r"^https?://", "", host).casefold()
                if any(bare == g or bare.endswith("." + g) for g in GOOGLE_HOSTS):
                    continue
                # Normalise so "https://biosolution.tech/" and "biosolution.tech"
                # do not count as two different properties.
                return re.sub(r"^www\.", "", bare).rstrip("/")
    return ""


def detect_reasons(subject: str, body: str) -> list[str]:
    blob = f"{subject}\n{body}"
    folded = blob.casefold()
    hits = []
    for reason in KNOWN_REASONS:
        # GSC writes the en dash inconsistently; normalise before matching.
        needle = reason.casefold().replace("-", "").replace("–", "")
        hay = folded.replace("-", "").replace("–", "")
        if needle in hay:
            hits.append(reason)
    return hits


COUNT_PATTERNS = (
    re.compile(r"([\d][\d,.\s]{0,12}?)\s+pages?\b", re.I),
    re.compile(r"([\d][\d,.\s]{0,12}?)\s+URLs?\b", re.I),
    re.compile(r"([\d][\d,.\s]{0,12}?)\s+(?:valid|invalid|affected|new)\b", re.I),
)


def detect_counts(body: str) -> list[str]:
    out: list[str] = []
    for pat in COUNT_PATTERNS:
        for m in pat.finditer(body[:6000]):
            snippet = m.group(0).strip()
            snippet = re.sub(r"\s+", " ", snippet)
            if snippet not in out:
                out.append(snippet)
    return out[:8]


def classify(subject: str) -> str:
    s = subject.casefold()
    if "not indexed" in s or "indexing" in s or "coverage" in s or "index" in s:
        return "indexing"
    if "core web vitals" in s or "page experience" in s or "speed" in s:
        return "performance"
    if "mobile usability" in s:
        return "mobile"
    if any(k in s for k in ("breadcrumb", "structured data", "rich result", "product", "faq", "review snippet")):
        return "structured-data"
    if "manual action" in s or "security" in s or "spam" in s:
        return "critical"
    if "sitemap" in s:
        return "sitemap"
    if "search performance" in s or "monthly" in s or "progress" in s:
        return "report"
    return "other"


# --------------------------------------------------------------------------- #
# IMAP
# --------------------------------------------------------------------------- #

def search_uids(imap: imaplib.IMAP4_SSL, since: datetime | None) -> list[bytes]:
    """Collect UIDs via Gmail's X-GM-RAW when available, else plain IMAP terms."""
    uids: list[bytes] = []
    seen: set[bytes] = set()

    def absorb(data) -> int:
        added = 0
        for chunk in data or []:
            if not chunk:
                continue
            for uid in chunk.split():
                if uid not in seen:
                    seen.add(uid)
                    uids.append(uid)
                    added += 1
        return added

    date_term = []
    if since:
        date_term = ["SINCE", since.strftime("%d-%b-%Y")]

    # Preferred: Gmail's own query language -- one round trip, exact matching.
    gm_query = (
        "from:(sc-noreply@google.com OR search-console-noreply@google.com "
        "OR wmt-noreply@google.com) OR subject:\"Search Console\""
    )
    try:
        typ, data = imap.uid("SEARCH", None, "X-GM-RAW", f'"{gm_query}"', *date_term)
        if typ == "OK":
            n = absorb(data)
            log(f"    X-GM-RAW matched {n} message(s)")
            if n:
                return uids
    except imaplib.IMAP4.error:
        log("    X-GM-RAW unsupported, falling back to standard IMAP search")

    # Fallback: union of individual searches.
    terms: list[list[str]] = [["FROM", s] for s in GSC_SENDERS]
    # Multi-word IMAP search values must be quoted or Gmail answers BAD.
    terms.append(["SUBJECT", '"Search Console"'])
    for term in terms:
        try:
            typ, data = imap.uid("SEARCH", None, *term, *date_term)
        except imaplib.IMAP4.error as exc:
            log(f"    search {term} failed: {exc}")
            continue
        if typ == "OK":
            n = absorb(data)
            log(f"    {' '.join(term)} -> {n} new")
    return uids


def fetch_messages(imap: imaplib.IMAP4_SSL, uids: list[bytes], batch: int = 25) -> list[dict]:
    records: list[dict] = []
    seen_ids: set[str] = set()
    total = len(uids)

    for start in range(0, total, batch):
        window = uids[start : start + batch]
        uid_set = b",".join(window).decode()
        # PEEK: never flag the user's mail as read.
        typ, data = imap.uid("FETCH", uid_set, "(BODY.PEEK[])")
        if typ != "OK":
            log(f"    fetch failed for {uid_set[:60]}...")
            continue

        for item in data:
            if not isinstance(item, tuple) or len(item) < 2:
                continue
            try:
                msg = email.message_from_bytes(item[1])
            except Exception as exc:
                log(f"    parse error: {exc}")
                continue

            msg_id = decode_hdr(msg.get("Message-ID")) or f"nomsgid-{len(records)}"
            if msg_id in seen_ids:
                continue
            seen_ids.add(msg_id)

            subject = decode_hdr(msg.get("Subject"))
            sender = decode_hdr(msg.get("From"))
            raw_date = msg.get("Date")
            try:
                dt = parsedate_to_datetime(raw_date)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                iso = dt.astimezone(timezone.utc).isoformat()
            except Exception:
                iso = ""

            body = extract_body(msg)
            records.append(
                {
                    "message_id": msg_id,
                    "date": iso,
                    "from": sender,
                    "subject": subject,
                    "site": detect_site(subject, body),
                    "category": classify(subject),
                    "reasons": detect_reasons(subject, body),
                    "counts": detect_counts(body),
                    "body": body,
                }
            )

        log(f"    fetched {min(start + batch, total)}/{total}")

    return records


# --------------------------------------------------------------------------- #
# output
# --------------------------------------------------------------------------- #

def slugify(text: str, limit: int = 60) -> str:
    slug = re.sub(r"[^A-Za-z0-9]+", "-", text).strip("-").lower()
    return (slug[:limit].rstrip("-")) or "untitled"


def write_outputs(records: list[dict], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    raw_dir = out_dir / "raw"
    raw_dir.mkdir(exist_ok=True)

    records.sort(key=lambda r: r["date"] or "", reverse=True)

    (out_dir / "gsc-emails.json").write_text(
        json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    for rec in records:
        day = (rec["date"] or "0000-00-00")[:10]
        name = f"{day}-{slugify(rec['subject'])}.txt"
        payload = (
            f"Date:    {rec['date']}\n"
            f"From:    {rec['from']}\n"
            f"Subject: {rec['subject']}\n"
            f"Site:    {rec['site'] or '(undetected)'}\n"
            f"Reasons: {', '.join(rec['reasons']) or '(none matched)'}\n"
            f"{'-' * 78}\n\n{rec['body']}\n"
        )
        (raw_dir / name).write_text(payload, encoding="utf-8")

    # Digest
    lines: list[str] = []
    lines.append("# Google Search Console — Email Digest\n")
    generated = datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M %Z")
    lines.append(f"Generated: {generated}  \nTotal messages: **{len(records)}**\n")

    by_cat: dict[str, int] = {}
    by_site: dict[str, int] = {}
    reason_tally: dict[str, int] = {}
    for rec in records:
        by_cat[rec["category"]] = by_cat.get(rec["category"], 0) + 1
        key = rec["site"] or "(undetected)"
        by_site[key] = by_site.get(key, 0) + 1
        for reason in rec["reasons"]:
            reason_tally[reason] = reason_tally.get(reason, 0) + 1

    lines.append("## By category\n")
    lines.append("| Category | Emails |\n| --- | --- |")
    for cat, n in sorted(by_cat.items(), key=lambda kv: -kv[1]):
        lines.append(f"| {cat} | {n} |")
    lines.append("")

    lines.append("## By site\n")
    lines.append("| Site | Emails |\n| --- | --- |")
    for site, n in sorted(by_site.items(), key=lambda kv: -kv[1]):
        lines.append(f"| {site} | {n} |")
    lines.append("")

    if reason_tally:
        lines.append("## Issue reasons mentioned (across all emails)\n")
        lines.append("| Reason | Mentions |\n| --- | --- |")
        for reason, n in sorted(reason_tally.items(), key=lambda kv: -kv[1]):
            lines.append(f"| {reason} | {n} |")
        lines.append("")

    lines.append("## Timeline (newest first)\n")
    lines.append("| Date | Site | Category | Subject | Reasons |\n| --- | --- | --- | --- | --- |")
    for rec in records:
        subject = rec["subject"].replace("|", "\\|")
        reasons = ", ".join(rec["reasons"]).replace("|", "\\|") or "—"
        site = (rec["site"] or "—").replace("|", "\\|")
        lines.append(
            f"| {(rec['date'] or '')[:10]} | {site} | {rec['category']} | {subject} | {reasons} |"
        )
    lines.append("")

    lines.append("---\n\n## Full messages\n")
    for rec in records:
        lines.append(f"### {(rec['date'] or '')[:10]} — {rec['subject']}\n")
        lines.append(f"- **From:** {rec['from']}")
        lines.append(f"- **Site:** {rec['site'] or '(undetected)'}")
        lines.append(f"- **Category:** {rec['category']}")
        if rec["reasons"]:
            lines.append(f"- **Reasons:** {', '.join(rec['reasons'])}")
        if rec["counts"]:
            lines.append(f"- **Numbers seen:** {', '.join(rec['counts'])}")
        lines.append("\n```text")
        body = rec["body"]
        lines.append(body if len(body) < 8000 else body[:8000] + "\n...[truncated]")
        lines.append("```\n")

    (out_dir / "DIGEST.md").write_text("\n".join(lines), encoding="utf-8")


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #

def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    ap = argparse.ArgumentParser(description="Download GSC notification emails from Gmail.")
    ap.add_argument("--days", type=int, default=0, help="only mail newer than N days (0 = all time)")
    ap.add_argument("--site", default="", help="keep only emails mentioning this domain")
    ap.add_argument("--folder", default="[Gmail]/All Mail", help='mailbox to scan (default includes archived)')
    ap.add_argument("--out", default=str(DEFAULT_OUT), help="output directory")
    args = ap.parse_args()

    env = load_env()
    user = env.get("GMAIL_ADDRESS", "")
    password = env.get("GMAIL_APP_PASSWORD", "").replace(" ", "")
    if not user or not password:
        die(f"GMAIL_ADDRESS and GMAIL_APP_PASSWORD must both be set in {ENV_FILE}")

    since = datetime.now(timezone.utc) - timedelta(days=args.days) if args.days else None

    log(f"[1/4] Connecting to {IMAP_HOST} as {user}")
    try:
        imap = imaplib.IMAP4_SSL(IMAP_HOST, IMAP_PORT)
    except Exception as exc:
        die(f"Could not reach Gmail IMAP: {exc}")

    try:
        imap.login(user, password)
    except imaplib.IMAP4.error as exc:
        die(
            f"Login rejected: {exc}\n"
            "    Checklist:\n"
            "      - GMAIL_APP_PASSWORD is a 16-char App Password, not the account password\n"
            "      - 2-Step Verification is enabled on the account\n"
            "      - IMAP is on: Gmail > Settings > Forwarding and POP/IMAP > Enable IMAP"
        )

    try:
        log(f"[2/4] Selecting mailbox: {args.folder}")
        typ, _ = imap.select(f'"{args.folder}"', readonly=True)
        if typ != "OK":
            log(f"    could not open {args.folder}, falling back to INBOX")
            typ, _ = imap.select("INBOX", readonly=True)
            if typ != "OK":
                die("Could not select any mailbox")

        log("[3/4] Searching for Search Console mail")
        uids = search_uids(imap, since)
        if not uids:
            log("\n    No Search Console emails matched. Try --folder INBOX, or widen --days.")
            return
        log(f"    {len(uids)} candidate message(s)")

        log("[4/4] Downloading bodies (BODY.PEEK — mail stays unread)")
        records = fetch_messages(imap, uids)
    finally:
        try:
            imap.close()
        except Exception:
            pass
        imap.logout()

    if args.site:
        needle = args.site.casefold()
        before = len(records)
        records = [
            r for r in records
            if needle in r["site"].casefold()
            or needle in r["subject"].casefold()
            or needle in r["body"].casefold()
        ]
        log(f"    site filter '{args.site}': {len(records)}/{before} kept")

    if not records:
        log("\n    Nothing left after filtering. Re-run without --site.")
        return

    out_dir = Path(args.out)
    write_outputs(records, out_dir)

    newest = (records[0]["date"] or "")[:10]
    oldest = (records[-1]["date"] or "")[:10]
    log("")
    log(f"  Done. {len(records)} email(s), {oldest} -> {newest}")
    log(f"  Digest : {out_dir / 'DIGEST.md'}")
    log(f"  JSON   : {out_dir / 'gsc-emails.json'}")
    log(f"  Raw    : {out_dir / 'raw'}  ({len(records)} files)")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        die("Interrupted", 130)
