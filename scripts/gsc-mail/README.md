# GSC Mail — one-click Search Console email export

Downloads every Google Search Console notification email from Gmail and turns it
into something readable: a digest table, a JSON file, and one plain-text file per
email.

No `pip install`, no `npm install`, no Google Cloud project, no OAuth consent
screen. It uses Python's built-in `imaplib`.

## Setup (once, about two minutes)

1. **Enable 2-Step Verification** on the Google account that receives the GSC
   mail — <https://myaccount.google.com/security>. Google will not issue an App
   Password without it.

2. **Create an App Password** — <https://myaccount.google.com/apppasswords>.
   Name it anything ("gsc-mail"). Google shows 16 characters in 4 groups.

3. **Write the config file:**

   ```cmd
   cd scripts\gsc-mail
   copy .env.gsc-mail.example .env.gsc-mail
   notepad .env.gsc-mail
   ```

   Fill in `GMAIL_ADDRESS` and `GMAIL_APP_PASSWORD`. Spaces in the password are
   stripped for you.

   `.env*` is already in the repo `.gitignore`, so this file is never committed.

## Run

Double-click **`fetch.cmd`**. That is the one click.

From a terminal, if you prefer:

```cmd
py fetch_gsc_emails.py                                    :: everything, all time
py fetch_gsc_emails.py --days 365                         :: last year only
py fetch_gsc_emails.py --site centrabiotechindonesia.com  :: one property
py fetch_gsc_emails.py --folder INBOX                     :: skip archived mail
```

## Output

Everything lands in `out/` (gitignored):

| File | What it holds |
| --- | --- |
| `DIGEST.md` | Summary tables — by category, by site, by issue reason — then a newest-first timeline, then every message in full |
| `gsc-emails.json` | The same data structured, one object per email |
| `raw/YYYY-MM-DD-subject.txt` | One file per email, for grepping or citing a single notice |

Each email is tagged automatically with the site it concerns, a category
(`indexing`, `structured-data`, `critical`, `sitemap`, …) and any Search Console
issue reasons found in the text, such as `Blocked by robots.txt` or
`Crawled - currently not indexed`.

## Notes

- Mail is read with `BODY.PEEK`, so nothing is marked as read. Your inbox is
  left exactly as it was.
- The default mailbox is `[Gmail]/All Mail`, which includes archived mail. Use
  `--folder INBOX` to look only at what is still in the inbox.
- Gmail's `X-GM-RAW` search is used when available, with a plain IMAP `FROM` /
  `SUBJECT` search as fallback.
- An App Password grants read access to the whole mailbox. Revoke it at
  <https://myaccount.google.com/apppasswords> whenever you want; the script will
  simply stop working.
- Senders matched: `sc-noreply@google.com`, `search-console-noreply@google.com`,
  `wmt-noreply@google.com`, plus any subject containing "Search Console".
