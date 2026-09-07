# GSC Google Sheets SEO Monitoring — Agent Knowledge Base

## Overview
This document provides complete context for any AI agent working with the CBI Google Sheets SEO monitoring system. It covers architecture, credentials, APIs, data flow, and troubleshooting.

---

## System Architecture

### Scripts Location
`scripts/gsc-sheets-monitor/`

### Files
| File | Purpose | Lines |
|------|---------|-------|
| `gsc_sheets_monitor.py` | Main daily monitoring — articles + GSC + Sheets sync | ~850 |
| `monthly_report.py` | Monthly reports — Web metrics + Keywords + Top Queries Monthly | ~1500 |
| `article_recapitulation.py` | Article category breakdown + GSC performance | ~330 |
| `verify_sheet.py` | Quick read-only sheet health check | ~50 |
| `token.json` | OAuth2 access + refresh token (auto-refreshes) |
| `client_secret.json` | Google OAuth2 installed app credentials |
| `logs/` | Daily execution logs (monitor_YYYYMMDD.log) |

---

## Google API Credentials

### OAuth2 Configuration
- **Type**: Installed Application (Desktop)
- **Project**: `finance-ai-483811`
- **Client ID**: `290562616548-olbp0lkd57nmmtqor1s36hu9f3fi9be0.apps.googleusercontent.com`
- **Token Path**: `scripts/gsc-sheets-monitor/token.json`
- **Client Secret Path**: `scripts/gsc-sheets-monitor/client_secret.json`

### API Scopes
```
https://www.googleapis.com/auth/spreadsheets       (read/write sheets)
https://www.googleapis.com/auth/webmasters.readonly (GSC data)
```

### Token Refresh Flow
1. Load `token.json` → check expiry
2. If expired → `creds.refresh(Request())` using refresh_token
3. If refresh fails → prompt local OAuth flow (`InstalledAppFlow.run_local_server`)
4. Save atomically via `.tmp` → `os.replace()`

### Re-authorization
```bash
cd d:\nahdi\cbi-web\scripts\gsc-sheets-monitor
python monthly_report.py --auth      # Deletes token, re-runs OAuth
python gsc_sheets_monitor.py         # Also refreshes on run
```

---

## Target Spreadsheet

### Spreadsheet ID
`1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E`

### URL
https://docs.google.com/spreadsheets/d/1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E

### GSC Site URL
`sc-domain:centrabiotechindonesia.com`

### Website Domain
`https://www.centrabiotechindonesia.com`

---

## Sheet Tabs & Data Sources

### From `gsc_sheets_monitor.py` (Daily Monitor)
| Sheet Name | Rows | Content | Data Period |
|------------|------|---------|-------------|
| **Article Monitor** | ~100+ | Article performance: title, slug, URL, clicks, impressions, CTR, position, index status | Rolling 28 days |
| **Daily Trend** | 28 | Day-by-day metrics | Rolling 28 days |
| **Top Queries** | 100 | Top search queries with clicks, impressions, CTR, avg position | Rolling 28 days |
| **Execution Log** | Appending | Timestamped audit trail of each sync run | Cumulative |
| **Top Articles** | ~50 | Combined news + blog articles ranked by performance | Rolling 28 days |

### From `monthly_report.py` (Monthly Reports)
| Sheet Name | Content | Data Period |
|------------|---------|-------------|
| **Web CBI {year}** | Monthly GSC + GA4 metrics: clicks, impressions, CTR, avg position, pages count, leads | Calendar months (1st to 30/31) |
| **Keyword CBI {year}** | 10 target keywords: monthly position, change M2M, impressions | Calendar months (1st to 30/31) |
| **Top Queries Monthly** | Top 50 queries: avg position per calendar month, trends, totals | Calendar months (1st to 30/31) |

### From `article_recapitulation.py`
| Sheet Name | Content | Data Period |
|------------|---------|-------------|
| **Article Recapitulation** | Blog articles by product category with GSC performance | Rolling 28 days |

---

## GSC Data Fetching Patterns

### Date Range Strategy
- **Daily monitor** (`gsc_sheets_monitor.py`): `today - 31d` to `today - 3d` (28 days rolling)
- **Monthly report** (`monthly_report.py`): `{year}-{month}-01` to `{year}-{month}-{last_day}` (full calendar month)
- **GSC data lag**: 3 days — always subtract 3 from today as data cutoff
- **Cap current month**: If end_date > data_cutoff, use data_cutoff as end_date

### API Call Pattern
```python
from googleapiclient.discovery import build
service = build("searchconsole", "v1", credentials=creds)

response = service.searchanalytics().query(
    siteUrl="sc-domain:centrabiotechindonesia.com",
    body={
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "dimensions": ["query"],        # or ["page"], ["date"], etc.
        "rowLimit": 500,
        "type": "web",
        "dimensionFilterGroups": [{      # optional filtering
            "filters": [{
                "dimension": "page",
                "operator": "contains",
                "expression": "/blog/",
            }]
        }],
    },
).execute()
```

### Available Dimensions
- `query` — search query text
- `page` — URL of the page
- `date` — individual date
- `country` — country code
- `device` — desktop/mobile/tablet

### Response Metrics (per row)
- `clicks` — number of clicks
- `impressions` — number of impressions
- `ctr` — click-through rate (0-1 float, multiply by 100 for %)
- `position` — average position in search results

---

## Google Sheets API Patterns

### Authentication
```python
import gspread
from google.oauth2.credentials import Credentials

creds = Credentials.from_authorized_user_file("token.json", SCOPES)
gc = gspread.authorize(creds)
sh = gc.open_by_key("1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E")
```

### Sheet Operations
```python
# Get or create worksheet
try:
    ws = sh.worksheet("Sheet Name")
except gspread.WorksheetNotFound:
    ws = sh.add_worksheet(title="Sheet Name", rows=200, cols=25)

# Write data
ws.clear()
ws.update(all_rows, value_input_option="USER_ENTERED")

# Formatting
ws.batch_format([{
    "range": "A1:Z1",
    "format": {
        "backgroundColor": {"red": 0.16, "green": 0.22, "blue": 0.30},
        "textFormat": {"bold": True, "fontSize": 13, "foregroundColor": {"red": 1, "green": 1, "blue": 1}},
        "horizontalAlignment": "CENTER",
        "numberFormat": {"type": "NUMBER", "pattern": "#,##0.0"},
        "wrapStrategy": "WRAP",
    },
}])

# Column widths & frozen panes
ws.spreadsheet.batch_update({"requests": [
    {"updateDimensionProperties": {
        "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": 0, "endIndex": 1},
        "properties": {"pixelSize": 260},
        "fields": "pixelSize",
    }},
    {"updateSheetProperties": {
        "properties": {"sheetId": ws.id, "gridProperties": {"frozenRowCount": 4, "frozenColumnCount": 2}},
        "fields": "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
    }},
]})

# Tab color
ws.update_tab_color("#007333")
```

---

## Target Keywords Tracked

### In `monthly_report.py` — Keyword CBI sheet
1. Pupuk Hayati Cair
2. Pupuk Organik Cair
3. Insektisida Hayati
4. Pembenah Tanah
5. Asam Humat Cair
6. Bio Pestisida
7. Pupuk Hayati Terbaik
8. Distributor Pupuk Organik Cair
9. Jual Insektisida Hayati
10. Floraone

### Category Mapping (article_recapitulation.py)
- "Pupuk Hayati" → slug contains: pupuk-hayati, floraone
- "Pupuk Organik" → slug contains: pupuk-organik, rajabio
- "Insektisida Hayati" → slug contains: insektisida-hayati, biokiller
- "Asam Humat" → slug contains: asam-humat, black-turbo
- "Peternakan" → slug contains: probiotik, peternakan, perikanan
- "Pertanian Berkelanjutan" → slug contains: pertanian-berkelanjutan, agroekologi
- "Maklon & Bisnis" → slug contains: maklon, bisnis-pupuk
- "Teknologi Pertanian" → slug contains: teknologi-pertanian, bioteknologi
- Default: "Umum"

---

## VPS Data Source (Strapi)

### Strapi SQLite Database
- **Path**: `/opt/cbi-strapi/.tmp/data.db`
- **Table**: `articles` (for blog article slugs, titles, published dates)
- **Table**: `blogs` (for blog categorization)
- **Access**: SSH into VPS via `ssh hostinger`

### Strapi API Sync
- POST to `http://localhost:1337/api/gsc-sync/push`
- Dashboard JSON: `/opt/cbi-strapi/public/uploads/article-performance.json`

---

## Running the Scripts

### Prerequisites
```bash
# Python packages (installed globally or in venv)
pip install gspread google-auth google-auth-oauthlib google-api-python-client
```

### Execute Monthly Report (Full Calendar Month Data)
```bash
cd d:\nahdi\cbi-web\scripts\gsc-sheets-monitor
python monthly_report.py                  # Current year
python monthly_report.py --year 2026      # Specific year
python monthly_report.py --auth           # Force re-auth
```

### Execute Daily Monitor
```bash
cd d:\nahdi\cbi-web\scripts\gsc-sheets-monitor
python gsc_sheets_monitor.py
```

### Execute Article Recapitulation
```bash
cd d:\nahdi\cbi-web\scripts\gsc-sheets-monitor
python article_recapitulation.py
```

### Verify Sheet Health
```bash
python verify_sheet.py
```

---

## Design Conventions

### Color Palette (RGB 0-1 float)
| Name | RGB | Use |
|------|-----|-----|
| DARK_NAVY | 0.16, 0.22, 0.30 | Title bars, column headers |
| MEDIUM_BLUE | 0.25, 0.40, 0.60 | Section headers |
| CBI_GREEN | 0.0, 0.45, 0.20 | Brand green accents |
| CBI_GREEN_LIGHT | 0.80, 0.92, 0.85 | Summary rows |
| LIGHT_GRAY | 0.93, 0.93, 0.93 | Alternating row background |
| LIGHT_GREEN | 0.85, 0.95, 0.85 | Positive/good values |
| LIGHT_RED | 0.97, 0.85, 0.85 | Negative/bad values |

### Position Significance
- **1-3**: Excellent — highlighted green, bold
- **4-10**: Good — light green background
- **11-20**: Needs improvement — default
- **20+**: Critical — highlighted red

### Sheet Layout Pattern
1. Title row (dark background, white bold text)
2. Subtitle/metadata row (italic, gray)
3. Empty separator row
4. Column headers (dark background, white text, centered)
5. Data rows (alternating gray/white, metrics right-aligned)
6. Empty separator
7. Summary rows (green background, bold)
8. Footer row (data source attribution)

---

## Troubleshooting

### Token Expired
```bash
python monthly_report.py --auth
# Opens browser for Google OAuth consent
```

### Rate Limiting
- GSC API: ~1200 queries/day per project
- Sheets API: ~300 requests/minute
- Use `rowLimit` wisely (500 max per query is good)
- Batch sheet writes instead of cell-by-cell

### No Data for a Month
- GSC has 3-day lag → `data_cutoff = today - 3 days`
- Current month won't have full data until 3 days after month end
- Future months are skipped automatically

### Module Not Found
```bash
pip install gspread google-auth google-auth-oauthlib google-api-python-client
```

### Log Files
- Location: `scripts/gsc-sheets-monitor/logs/`
- Pattern: `monitor_YYYYMMDD.log`, `monthly_report_YYYYMMDD.log`
- Check for `ERROR` entries: `grep ERROR logs/*.log`
