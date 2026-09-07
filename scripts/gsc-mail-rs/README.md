# gsc-mail (Rust)

Downloads Google Search Console notification emails from Gmail over IMAP and turns
them into a digest, a JSON file, and one plain-text file per email.

Rust port of `scripts/gsc-mail/` (Python). **It reads the same
`../gsc-mail/.env.gsc-mail` config**, so there is nothing new to set up.

## Honest note on speed

There is none. Measured on the same 84-message mailbox, three runs each:

| | run 1 | run 2 | run 3 |
| --- | --- | --- | --- |
| Rust | 12 816 ms | 12 322 ms | 12 557 ms |
| Python | 12 685 ms | 10 817 ms | 7 291 ms |

Identical within network noise. This job is bound by Gmail's IMAP round-trips, not
by CPU, so a faster language cannot help. Rust is more *consistent* here (tighter
spread), not faster.

Contrast `scripts/seo-crawl`, where Rust genuinely won 4.9× — that job was
thousands of parallel HTTPS requests, so connection pooling and no process spawns
mattered. The lesson is that the language choice pays off where the bottleneck
actually is.

## What it does better than the Python version

It finds **9 more issue-reason mentions** across the same 84 emails (38 vs 29):

- 6 × `Alternative page with proper canonical tag` — GSC writes "Alternative", the
  Python list only had Schema's "Alternate".
- 3 × `Excluded by 'noindex' tag` — GSC uses **curly** quotes (U+2018/U+2019). The
  Rust `fold()` normalises curly to straight before matching; the Python one only
  normalised hyphens and en dashes.

So the Python digest was quietly under-reporting. Treat this version as canonical.

## Build and run

```bash
cd scripts/gsc-mail-rs
cargo build --release
./target/release/gsc-mail
```

Or double-click **`fetch.cmd`** — it builds on first run, then reuses the binary.

| Flag | Default | Meaning |
| --- | --- | --- |
| `--days N` | 0 (all time) | only mail newer than N days |
| `--site DOMAIN` | — | keep only emails mentioning this domain |
| `--folder NAME` | `[Gmail]/All Mail` | mailbox to scan (includes archived) |
| `--out DIR` | `./out` | output directory |
| `--env-file PATH` | auto | override config location |

## Output

Same shape as the Python version, in `out/` (gitignored):

| File | Contents |
| --- | --- |
| `DIGEST.md` | Tables by category, site and issue reason, then a newest-first timeline, then every message in full |
| `gsc-emails.json` | The same data structured, one object per email |
| `raw/YYYY-MM-DD-subject.txt` | One file per email |

## Design notes worth knowing

**Read-only, always.** The mailbox is opened with `EXAMINE` rather than `SELECT`,
and bodies are fetched with `BODY.PEEK[]`. Nothing is ever marked as read.

**rustls, not native-tls.** `tokio-rustls` + `webpki-roots`, so there is no OpenSSL
build dependency on Windows. `async-imap` is added with
`default-features = false, features = ["runtime-tokio"]` — its default runtime is
async-std, which would drag in a second executor alongside tokio.

**Folded headers.** RFC 5322 lets a long `Subject:` wrap onto continuation lines.
`mailparse` preserves the original indentation verbatim, which produced subjects
with a long run of spaces in the middle. Every whitespace run in `Subject` and
`From` is collapsed to a single space.

**Multi-word IMAP search values must be quoted.** `SUBJECT "Search Console"`
without the quotes makes Gmail answer `BAD Could not parse command`.

**Fetch streams borrow the session.** `uid_fetch` returns a stream holding a mutable
borrow, so each batch is collected inside its own scope before the next IMAP command
can be issued.

## Retiring the Python version

`scripts/gsc-mail/` still works but under-reports two reason types (above) and is now
a second thing to maintain. Once you are satisfied with this one, delete that
directory — but keep `.env.gsc-mail`, or move it here first, since this tool reads it.
