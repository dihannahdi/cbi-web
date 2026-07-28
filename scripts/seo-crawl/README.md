# seo-crawl

Audits a sitemap in one pass: HTTP status, redirect target, `<link rel=canonical>`,
`<meta name=robots>` and the `X-Robots-Tag` header — for every URL.

## Why it exists

The shell version of this job was:

```bash
cat urls.txt | xargs -P 8 -I{} sh -c 'curl -s -o /dev/null -w "%{http_code}" ... "{}"'
```

That spawns two processes per URL and performs a fresh TCP + TLS handshake every
time. On a 2000-URL sitemap that is 4000 process spawns and 2000 handshakes.

Measured head-to-head, same 300 URLs from `biosolution.tech`, same concurrency of 8,
status-only so the comparison is fair:

| | elapsed | result |
| --- | --- | --- |
| `xargs -P 8` + `curl` | 20 803 ms | 300 × 200 |
| `seo-crawl` | 4 276 ms | 300 × 200 |

**4.9× faster**, identical findings. The win is connection reuse plus zero forks —
not raw language speed. This job is I/O bound; Rust helps here because of the pooled
async client, not because the arithmetic is faster.

It also does in **one** request what the shell version needed two for: status *and*
canonical *and* robots directives.

## Build

```bash
cd scripts/seo-crawl
cargo build --release
```

Binary lands at `target/release/seo-crawl`. TLS is `rustls`, so there is no OpenSSL
build dependency on Windows.

## Use

```bash
# whole sitemap (sitemap-index files are expanded automatically)
./target/release/seo-crawl --sitemap https://www.example.com/sitemap.xml

# from a file of URLs, one per line
./target/release/seo-crawl --urls urls.txt

# faster, status + headers only, no canonical
./target/release/seo-crawl --sitemap https://www.example.com/sitemap.xml --status-only

# save rows for later analysis -> writes out.csv and out.json
./target/release/seo-crawl --sitemap https://www.example.com/sitemap.xml --out out
```

| Flag | Default | Meaning |
| --- | --- | --- |
| `--sitemap URL` | — | sitemap or sitemap-index to expand |
| `--urls FILE` | — | file of URLs instead of a sitemap |
| `--concurrency N` | 32 | simultaneous in-flight requests |
| `--timeout SECS` | 30 | per-request timeout |
| `--ua googlebot\|browser` | googlebot | which user-agent to send |
| `--status-only` | off | skip body download (no canonical) |
| `--out BASE` | — | write `BASE.csv` and `BASE.json` |
| `--retry-failures` | on | re-probe connection failures serially |

## What it flags

- **non-200** — every URL with its code and, for 3xx, the `Location` it points at.
  A sitemap should contain only canonical 200 URLs; anything else is a finding.
- **canonical points elsewhere** — the page returns 200 but its canonical names a
  different URL. Catches the common bug where the sitemap lists `/page` while the
  server serves `/page/` and the canonical names the redirecting form.
- **200 with no canonical tag at all** — frequently a client-rendered SPA shell.
- **noindex inside the crawl set** — a page carrying `noindex` (meta or header) that
  is nonetheless being submitted. Google reports this as
  "Submitted URL marked 'noindex'".

## Two deliberate design choices

**Redirects are not followed.** `redirect::Policy::none()`. A 301 inside a sitemap is
the thing you are looking for, not an obstacle to route around.

**Connection failures are retried serially.** Under parallel load a timeout usually
means load, not a broken page. On a real run of 1994 URLs, 11 first-pass failures all
returned 200 on serial retry — every one of them would have been a false positive.
Pass `--retry-failures false` to see the raw first-pass result.

## Reading the body efficiently

Only the `<head>` is needed, so `read_head()` streams chunks and stops at `</head>`
or 256 KB, whichever comes first. Product pages can be hundreds of KB; there is no
reason to download the tail.
