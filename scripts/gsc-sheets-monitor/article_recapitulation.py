#!/usr/bin/env python3
"""
CBI Article Recapitulation — Google Sheets Integration
=======================================================
Adds "Article Recapitulation" sheet to existing GSC monitoring spreadsheet.
Reads all DeepSeek-generated articles from Strapi SQLite and populates the sheet
with category breakdown, SEO fields, URLs, and performance data.

Usage:
  python3 article_recapitulation.py              # Full sync to Sheets
  python3 article_recapitulation.py --stats       # Print stats to terminal
  
Author: CBI Article Automation
"""

import os
import sys
import json
import sqlite3
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path
from collections import defaultdict

import gspread
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# ============================================================================
# CONFIGURATION
# ============================================================================

SPREADSHEET_ID = "1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E"
SHEET_NAME = "Article Recapitulation"

GSC_SITE_URL = "sc-domain:centrabiotechindonesia.com"
SITE_DOMAIN = "https://www.centrabiotechindonesia.com"

STRAPI_DB_PATH = "/opt/cbi-strapi/.tmp/data.db"

SCRIPT_DIR = Path(__file__).parent.resolve()
TOKEN_PATH = SCRIPT_DIR / "token.json"
CLIENT_SECRET_PATH = SCRIPT_DIR / "client_secret.json"

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/webmasters.readonly",
]

LOG_DIR = SCRIPT_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)
log_file = LOG_DIR / f"recap_{datetime.now().strftime('%Y%m%d')}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

# Category slug keywords → display category mapping
CATEGORY_MAP = {
    'pupuk-hayati': 'Pupuk Hayati',
    'floraone': 'Pupuk Hayati',
    'pupuk-organik': 'Pupuk Organik',
    'rajabio': 'Pupuk Organik',
    'insektisida-hayati': 'Insektisida Hayati',
    'biokiller': 'Insektisida Hayati',
    'asam-humat': 'Asam Humat',
    'black-turbo': 'Asam Humat',
    'probiotik': 'Peternakan',
    'peternakan': 'Peternakan',
    'perikanan': 'Peternakan',
    'pertanian-berkelanjutan': 'Pertanian Berkelanjutan',
    'agroekologi': 'Pertanian Berkelanjutan',
    'smart-farming': 'Pertanian Berkelanjutan',
    'maklon': 'Maklon & Bisnis',
    'bisnis-pupuk': 'Maklon & Bisnis',
    'teknologi-pertanian': 'Teknologi Pertanian',
    'bioteknologi': 'Teknologi Pertanian',
}

# ============================================================================
# AUTHENTICATION (reuses tokens from gsc_sheets_monitor)
# ============================================================================

def get_credentials():
    """Get or refresh OAuth2 credentials."""
    creds = None

    if TOKEN_PATH.exists() and TOKEN_PATH.stat().st_size > 0:
        try:
            creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
        except Exception as e:
            logger.warning("Failed to load token: %s", e)

    if creds and creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
            tmp_path = str(TOKEN_PATH) + ".tmp"
            with open(tmp_path, "w") as f:
                f.write(creds.to_json())
            os.replace(tmp_path, str(TOKEN_PATH))
        except Exception as e:
            logger.error("Failed to refresh token: %s — keeping existing token file intact", e)
            creds = None

    if not creds or not creds.valid:
        if not CLIENT_SECRET_PATH.exists():
            logger.error("No valid credentials. Run gsc_sheets_monitor.py --auth first.")
            sys.exit(1)

        from google_auth_oauthlib.flow import InstalledAppFlow
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET_PATH), SCOPES)
        creds = flow.run_local_server(port=0)
        tmp_path = str(TOKEN_PATH) + ".tmp"
        with open(tmp_path, "w") as f:
            f.write(creds.to_json())
        os.replace(tmp_path, str(TOKEN_PATH))

    return creds


# ============================================================================
# DATA: FETCH ARTICLES FROM STRAPI
# ============================================================================

def get_all_blogs():
    """Fetch all blogs from Strapi SQLite."""
    if not os.path.exists(STRAPI_DB_PATH):
        logger.error("Strapi DB not found: %s", STRAPI_DB_PATH)
        return []

    conn = sqlite3.connect(STRAPI_DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            id, document_id, title, short_description, slug, type,
            locale, published_at, created_at, updated_at,
            meta_title, meta_description, focus_keyphrase,
            canonical_url, robots_directive, reading_time_minutes
        FROM blogs
        ORDER BY published_at DESC, id DESC
    """)
    rows = cursor.fetchall()
    conn.close()

    return [dict(r) for r in rows]


def detect_category(slug, title):
    """Detect article category from slug and title."""
    text = f"{slug} {title}".lower()
    for keyword, category in CATEGORY_MAP.items():
        if keyword in text:
            return category
    return 'Umum'


# ============================================================================
# DATA: FETCH GSC PERFORMANCE
# ============================================================================

def get_gsc_data(creds, urls):
    """Fetch GSC performance for a batch of URLs (last 28 days)."""
    service = build("searchconsole", "v1", credentials=creds)

    end_date = datetime.now(timezone.utc) - timedelta(days=3)
    start_date = end_date - timedelta(days=28)

    perf = {}
    BATCH_SIZE = 25

    # Process in batches to not overwhelm GSC
    url_list = list(urls)
    for i in range(0, len(url_list), BATCH_SIZE):
        batch = url_list[i:i + BATCH_SIZE]

        try:
            body = {
                "startDate": start_date.strftime("%Y-%m-%d"),
                "endDate": end_date.strftime("%Y-%m-%d"),
                "dimensions": ["page"],
                "dimensionFilterGroups": [
                    {
                        "filters": [
                            {
                                "dimension": "page",
                                "operator": "includingRegex",
                                "expression": "|".join(
                                    url.replace(".", "\\.").replace("/", "\\/")
                                    for url in batch
                                ),
                            }
                        ]
                    }
                ],
                "rowLimit": len(batch),
            }

            response = (
                service.searchanalytics()
                .query(siteUrl=GSC_SITE_URL, body=body)
                .execute()
            )

            for row in response.get("rows", []):
                page = row["keys"][0]
                perf[page] = {
                    "clicks": row.get("clicks", 0),
                    "impressions": row.get("impressions", 0),
                    "ctr": round(row.get("ctr", 0) * 100, 2),
                    "position": round(row.get("position", 0), 1),
                }
        except Exception as e:
            logger.warning("GSC batch error: %s", e)

    return perf


# ============================================================================
# GOOGLE SHEETS: WRITE RECAPITULATION
# ============================================================================

def write_recapitulation(creds, blogs, gsc_data):
    """Write or update the Article Recapitulation sheet."""
    gc = gspread.authorize(creds)
    spreadsheet = gc.open_by_key(SPREADSHEET_ID)

    # Get or create sheet
    try:
        sheet = spreadsheet.worksheet(SHEET_NAME)
        sheet.clear()
        logger.info("Cleared existing '%s' sheet", SHEET_NAME)
    except gspread.WorksheetNotFound:
        sheet = spreadsheet.add_worksheet(title=SHEET_NAME, rows=1200, cols=20)
        logger.info("Created new '%s' sheet", SHEET_NAME)

    # Prepare headers
    headers = [
        "No", "Title", "Category", "Slug", "Locale", "Focus Keyphrase",
        "Meta Title", "Meta Description", "Published Date", "Reading Time",
        "URL", "Status",
        "Clicks (28d)", "Impressions (28d)", "CTR (%)", "Avg Position",
    ]

    # Prepare rows
    rows = [headers]
    category_stats = defaultdict(lambda: {"count": 0, "clicks": 0, "impressions": 0})

    for idx, blog in enumerate(blogs, 1):
        category = detect_category(blog["slug"], blog["title"])
        url = f"{SITE_DOMAIN}/id/blog/{blog['slug']}"
        perf = gsc_data.get(url, {})

        clicks = perf.get("clicks", 0)
        impressions = perf.get("impressions", 0)
        ctr = perf.get("ctr", 0)
        position = perf.get("position", 0)

        # Determine indexing status
        if clicks > 0 or impressions > 0:
            status = "Indexed"
        elif blog.get("published_at"):
            status = "Published"
        else:
            status = "Draft"

        pub_date = ""
        if blog["published_at"]:
            pub_date = blog["published_at"][:10]

        rows.append([
            idx,
            blog["title"],
            category,
            blog["slug"],
            blog.get("locale", "id"),
            blog.get("focus_keyphrase", ""),
            blog.get("meta_title", ""),
            blog.get("meta_description", ""),
            pub_date,
            blog.get("reading_time_minutes", ""),
            url,
            status,
            clicks,
            impressions,
            ctr,
            position,
        ])

        category_stats[category]["count"] += 1
        category_stats[category]["clicks"] += clicks
        category_stats[category]["impressions"] += impressions

    # Add summary section
    rows.append([])   # blank row
    rows.append(["", "═══ CATEGORY SUMMARY ═══", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
    rows.append(["", "Category", "Articles", "", "", "", "", "", "", "", "", "",
                 "Total Clicks", "Total Impressions", "", ""])

    for cat, st in sorted(category_stats.items()):
        rows.append([
            "", cat, st["count"], "", "", "", "", "", "", "", "", "",
            st["clicks"], st["impressions"], "", "",
        ])

    # Grand totals
    total_articles = len(blogs)
    total_clicks = sum(s["clicks"] for s in category_stats.values())
    total_impressions = sum(s["impressions"] for s in category_stats.values())
    rows.append([
        "", "TOTAL", total_articles, "", "", "", "", "", "", "", "", "",
        total_clicks, total_impressions, "", "",
    ])

    # Add metadata row
    rows.append([])
    rows.append(["", f"Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S WIB')}"])

    # Write all data at once
    sheet.update(range_name=f"A1:P{len(rows)}", values=rows)
    logger.info("Wrote %d rows to '%s'", len(rows), SHEET_NAME)

    # Apply formatting
    apply_formatting(spreadsheet, sheet, len(blogs))

    return total_articles


def apply_formatting(spreadsheet, sheet, article_count):
    """Apply conditional formatting and header styling."""
    sheet_id = sheet.id

    requests_list = [
        # Freeze header row
        {
            "updateSheetProperties": {
                "properties": {"sheetId": sheet_id, "gridProperties": {"frozenRowCount": 1}},
                "fields": "gridProperties.frozenRowCount",
            }
        },
        # Header formatting — dark green background with white bold text
        {
            "repeatCell": {
                "range": {"sheetId": sheet_id, "startRowIndex": 0, "endRowIndex": 1},
                "cell": {
                    "userEnteredFormat": {
                        "backgroundColor": {"red": 0.13, "green": 0.55, "blue": 0.13},
                        "textFormat": {"bold": True, "foregroundColor": {"red": 1, "green": 1, "blue": 1}},
                        "horizontalAlignment": "CENTER",
                    }
                },
                "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
            }
        },
        # Auto-resize columns
        {
            "autoResizeDimensions": {
                "dimensions": {"sheetId": sheet_id, "dimension": "COLUMNS", "startIndex": 0, "endIndex": 16}
            }
        },
    ]

    # Conditional formatting: green for "Indexed" status
    requests_list.append({
        "addConditionalFormatRule": {
            "rule": {
                "ranges": [{"sheetId": sheet_id, "startRowIndex": 1, "endRowIndex": article_count + 1,
                            "startColumnIndex": 11, "endColumnIndex": 12}],
                "booleanRule": {
                    "condition": {"type": "TEXT_EQ", "values": [{"userEnteredValue": "Indexed"}]},
                    "format": {"backgroundColor": {"red": 0.72, "green": 0.88, "blue": 0.72}},
                },
            },
            "index": 0,
        }
    })

    # Conditional formatting: yellow for "Published" status
    requests_list.append({
        "addConditionalFormatRule": {
            "rule": {
                "ranges": [{"sheetId": sheet_id, "startRowIndex": 1, "endRowIndex": article_count + 1,
                            "startColumnIndex": 11, "endColumnIndex": 12}],
                "booleanRule": {
                    "condition": {"type": "TEXT_EQ", "values": [{"userEnteredValue": "Published"}]},
                    "format": {"backgroundColor": {"red": 1, "green": 0.95, "blue": 0.6}},
                },
            },
            "index": 1,
        }
    })

    spreadsheet.batch_update({"requests": requests_list})
    logger.info("Applied formatting to '%s'", SHEET_NAME)


# ============================================================================
# MAIN
# ============================================================================

def main():
    if "--stats" in sys.argv:
        blogs = get_all_blogs()
        cats = defaultdict(int)
        for b in blogs:
            cats[detect_category(b["slug"], b["title"])] += 1
        print(f"\nTotal blogs in DB: {len(blogs)}")
        for cat, cnt in sorted(cats.items()):
            print(f"  {cat}: {cnt}")
        return

    logger.info("Starting Article Recapitulation sync...")

    creds = get_credentials()
    blogs = get_all_blogs()
    logger.info("Fetched %d blogs from Strapi", len(blogs))

    if not blogs:
        logger.warning("No blogs found!")
        return

    # Collect URLs for GSC lookup
    urls = set()
    for blog in blogs:
        urls.add(f"{SITE_DOMAIN}/id/blog/{blog['slug']}")

    # Fetch GSC data
    gsc_data = get_gsc_data(creds, urls)
    logger.info("Fetched GSC data for %d URLs", len(gsc_data))

    # Write to Google Sheets
    count = write_recapitulation(creds, blogs, gsc_data)
    logger.info("Recapitulation complete: %d articles written to sheet", count)


if __name__ == "__main__":
    main()
