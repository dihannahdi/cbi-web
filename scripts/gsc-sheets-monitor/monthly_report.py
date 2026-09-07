#!/usr/bin/env python3
"""
CBI Monthly Website Performance Report — Google Sheets
=======================================================
Creates Jatis-Mobile-style monthly performance reports in Google Sheets.

Generates two report sheets:
  1. "Web CBI 2026" — Monthly website metrics (GSC + GA4)
  2. "Keyword CBI 2026" — Monthly keyword position tracking

Template reference: Jatis Mobile 2024 report format
Target Spreadsheet: Same as existing CBI monitoring sheet

Usage:
  python monthly_report.py                  # Full report for current year
  python monthly_report.py --year 2026      # Specify year
  python monthly_report.py --auth           # Re-authorize OAuth2

Author: CBI Marketing Automation
"""

import os
import sys
import json
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path
from calendar import monthrange

import gspread
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# ============================================================================
# CONFIGURATION
# ============================================================================

SPREADSHEET_ID = "1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E"
GSC_SITE_URL = "sc-domain:centrabiotechindonesia.com"
SITE_DOMAIN = "https://www.centrabiotechindonesia.com"

SCRIPT_DIR = Path(__file__).parent.resolve()
TOKEN_PATH = SCRIPT_DIR / "token.json"
CLIENT_SECRET_PATH = SCRIPT_DIR / "client_secret.json"

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/webmasters.readonly",
]

# GA4 requires additional scope — will be attempted separately.
#
# NOTE: get_credentials() below currently authorizes with `SCOPES` only, so
# the saved token.json does NOT carry analytics.readonly and all GA4 calls
# (Admin API property discovery + Data API report requests) will fail with
# 403 and fall back gracefully. To enable durable GA4-based reporting
# (including WhatsApp lead counting via get_whatsapp_leads_ga4_monthly):
#   1. In get_credentials(), pass GA4_SCOPES instead of SCOPES (both to
#      Credentials.from_authorized_user_file(...) and to
#      InstalledAppFlow.from_client_secrets_file(...)).
#   2. Delete/rename token.json (or run `python monthly_report.py --auth`)
#      so the OAuth consent screen is shown again and the new scope is
#      actually granted — swapping the SCOPES constant alone does not
#      retroactively upgrade an already-issued token.
#   3. Optionally set the GA4_PROPERTY_ID env var below if auto-discovery
#      via the Admin API doesn't find the right property.
# See docs/seo/ANALYTICS-README.md for the full step-by-step.
GA4_SCOPES = SCOPES + ["https://www.googleapis.com/auth/analytics.readonly"]

# Optional explicit GA4 property id (numeric, e.g. "123456789") for
# WhatsApp-lead + GA4-metric reporting. If unset, the script attempts to
# auto-discover it via the Analytics Admin API (also requires the
# analytics.readonly scope above). Leave unset if GA4 isn't configured yet —
# all GA4-dependent code paths fall back gracefully.
GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "").strip() or None

LOG_DIR = SCRIPT_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)
log_file = LOG_DIR / f"monthly_report_{datetime.now().strftime('%Y%m%d')}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

# Target keywords (from client tracking sheet)
TARGET_KEYWORDS = [
    "Pupuk Hayati Cair",
    "Pupuk Organik Cair",
    "Insektisida Hayati",
    "Pembenah Tanah",
    "Asam Humat Cair",
    "Bio Pestisida",
    "Pupuk Hayati Terbaik",
    "Distributor Pupuk Organik Cair",
    "Jual Insektisida Hayati",
    "Floraone",
]

MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

MONTH_NAMES_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

# Colors (RGB 0-1 float)
DARK_NAVY = {"red": 0.16, "green": 0.22, "blue": 0.30}
MEDIUM_BLUE = {"red": 0.25, "green": 0.40, "blue": 0.60}
LIGHT_GRAY = {"red": 0.93, "green": 0.93, "blue": 0.93}
WHITE = {"red": 1.0, "green": 1.0, "blue": 1.0}
LIGHT_GREEN = {"red": 0.85, "green": 0.95, "blue": 0.85}
LIGHT_RED = {"red": 0.97, "green": 0.85, "blue": 0.85}
GREEN_TEXT = {"red": 0.0, "green": 0.5, "blue": 0.0}
RED_TEXT = {"red": 0.8, "green": 0.0, "blue": 0.0}
CBI_GREEN = {"red": 0.0, "green": 0.45, "blue": 0.20}
CBI_GREEN_LIGHT = {"red": 0.80, "green": 0.92, "blue": 0.85}


# ============================================================================
# AUTHENTICATION
# ============================================================================

def get_credentials():
    """Get or refresh OAuth2 credentials."""
    creds = None

    if TOKEN_PATH.exists() and TOKEN_PATH.stat().st_size > 0:
        try:
            creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
            logger.info("Loaded existing token")
        except Exception as e:
            logger.warning("Failed to load token: %s", e)

    if creds and creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
            logger.info("Token refreshed")
            _save_token(creds)
        except Exception as e:
            logger.error("Token refresh failed: %s", e)
            creds = None

    if not creds or not creds.valid:
        if not CLIENT_SECRET_PATH.exists():
            logger.error("No client_secret.json found at %s", SCRIPT_DIR)
            sys.exit(1)

        from google_auth_oauthlib.flow import InstalledAppFlow
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET_PATH), SCOPES)
        creds = flow.run_local_server(port=0)
        logger.info("New OAuth2 authorization completed")
        _save_token(creds)

    return creds


def _save_token(creds):
    """Atomically save credentials to token file."""
    tmp_path = str(TOKEN_PATH) + ".tmp"
    with open(tmp_path, "w") as f:
        f.write(creds.to_json())
    os.replace(tmp_path, str(TOKEN_PATH))
    logger.info("Token saved")


# ============================================================================
# GSC DATA FETCHING
# ============================================================================

def get_gsc_monthly_overview(creds, year):
    """Get monthly overview metrics from GSC (clicks, impressions, CTR, position)."""
    service = build("searchconsole", "v1", credentials=creds)
    monthly_data = {}

    today = datetime.now(timezone.utc).date()
    # GSC data has ~3 day delay
    data_cutoff = today - timedelta(days=3)

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        # Skip future months
        if start_date > data_cutoff:
            break

        # Cap end date to data cutoff
        if end_date > data_cutoff:
            end_date = data_cutoff

        try:
            response = service.searchanalytics().query(
                siteUrl=GSC_SITE_URL,
                body={
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                    "type": "web",
                },
            ).execute()

            rows = response.get("rows", [])
            if rows:
                row = rows[0]
                monthly_data[month] = {
                    "clicks": row.get("clicks", 0),
                    "impressions": row.get("impressions", 0),
                    "ctr": round(row.get("ctr", 0) * 100, 2),
                    "position": round(row.get("position", 0), 1),
                }
            else:
                monthly_data[month] = {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0}

            logger.info("GSC overview %s-%02d: %s", year, month, monthly_data[month])
        except Exception as e:
            logger.error("GSC overview %s-%02d failed: %s", year, month, e)
            monthly_data[month] = {"clicks": 0, "impressions": 0, "ctr": 0, "position": 0}

    return monthly_data


def get_gsc_monthly_pages_count(creds, year):
    """Get count of pages with GSC data per month."""
    service = build("searchconsole", "v1", credentials=creds)
    monthly_pages = {}

    today = datetime.now(timezone.utc).date()
    data_cutoff = today - timedelta(days=3)

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        if start_date > data_cutoff:
            break
        if end_date > data_cutoff:
            end_date = data_cutoff

        try:
            response = service.searchanalytics().query(
                siteUrl=GSC_SITE_URL,
                body={
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                    "dimensions": ["page"],
                    "rowLimit": 5000,
                    "type": "web",
                },
            ).execute()

            monthly_pages[month] = len(response.get("rows", []))
            logger.info("GSC pages %s-%02d: %d", year, month, monthly_pages[month])
        except Exception as e:
            logger.error("GSC pages %s-%02d failed: %s", year, month, e)
            monthly_pages[month] = 0

    return monthly_pages


def get_gsc_top_pages(creds, year):
    """Get top performing pages per month."""
    service = build("searchconsole", "v1", credentials=creds)
    monthly_top = {}

    today = datetime.now(timezone.utc).date()
    data_cutoff = today - timedelta(days=3)

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        if start_date > data_cutoff:
            break
        if end_date > data_cutoff:
            end_date = data_cutoff

        top_product = ""
        top_blog = ""

        # Top product page
        try:
            response = service.searchanalytics().query(
                siteUrl=GSC_SITE_URL,
                body={
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                    "dimensions": ["page"],
                    "dimensionFilterGroups": [{
                        "filters": [{
                            "dimension": "page",
                            "operator": "contains",
                            "expression": "/produk-layanan/",
                        }]
                    }],
                    "rowLimit": 1,
                    "type": "web",
                },
            ).execute()
            rows = response.get("rows", [])
            if rows:
                top_product = rows[0]["keys"][0]
        except Exception as e:
            logger.warning("Top product page %s-%02d failed: %s", year, month, e)

        # Top blog/news page
        try:
            for path_filter in ["/blog/", "/news/"]:
                response = service.searchanalytics().query(
                    siteUrl=GSC_SITE_URL,
                    body={
                        "startDate": start_date.strftime("%Y-%m-%d"),
                        "endDate": end_date.strftime("%Y-%m-%d"),
                        "dimensions": ["page"],
                        "dimensionFilterGroups": [{
                            "filters": [{
                                "dimension": "page",
                                "operator": "contains",
                                "expression": path_filter,
                            }]
                        }],
                        "rowLimit": 1,
                        "type": "web",
                    },
                ).execute()
                rows = response.get("rows", [])
                if rows:
                    candidate = rows[0]["keys"][0]
                    if not top_blog or rows[0].get("clicks", 0) > 0:
                        top_blog = candidate
                        break
        except Exception as e:
            logger.warning("Top blog page %s-%02d failed: %s", year, month, e)

        monthly_top[month] = {"product": top_product, "blog": top_blog}
        logger.info("Top pages %s-%02d: product=%s, blog=%s", year, month, top_product[:50], top_blog[:50])

    return monthly_top


def get_gsc_keyword_monthly(creds, year):
    """Get monthly keyword position + impressions for each target keyword."""
    service = build("searchconsole", "v1", credentials=creds)
    keyword_data = {kw: {} for kw in TARGET_KEYWORDS}

    today = datetime.now(timezone.utc).date()
    data_cutoff = today - timedelta(days=3)

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        if start_date > data_cutoff:
            break
        if end_date > data_cutoff:
            end_date = data_cutoff

        try:
            response = service.searchanalytics().query(
                siteUrl=GSC_SITE_URL,
                body={
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                    "dimensions": ["query"],
                    "rowLimit": 5000,
                    "type": "web",
                },
            ).execute()

            # Build a lookup of all queries (lowercase)
            query_lookup = {}
            for row in response.get("rows", []):
                query_key = row["keys"][0].lower().strip()
                query_lookup[query_key] = {
                    "position": round(row.get("position", 0), 2),
                    "impressions": row.get("impressions", 0),
                    "clicks": row.get("clicks", 0),
                    "ctr": round(row.get("ctr", 0) * 100, 2),
                }

            # Match each target keyword
            for kw in TARGET_KEYWORDS:
                kw_lower = kw.lower().strip()
                if kw_lower in query_lookup:
                    keyword_data[kw][month] = query_lookup[kw_lower]
                else:
                    # Try partial match
                    found = False
                    for q, data in query_lookup.items():
                        if kw_lower in q or q in kw_lower:
                            keyword_data[kw][month] = data
                            found = True
                            break
                    if not found:
                        keyword_data[kw][month] = {
                            "position": 0,
                            "impressions": 0,
                            "clicks": 0,
                            "ctr": 0,
                        }

            logger.info("GSC keywords %s-%02d: matched %d/%d",
                        year, month,
                        sum(1 for kw in TARGET_KEYWORDS if keyword_data[kw].get(month, {}).get("position", 0) > 0),
                        len(TARGET_KEYWORDS))

        except Exception as e:
            logger.error("GSC keyword query %s-%02d failed: %s", year, month, e)
            for kw in TARGET_KEYWORDS:
                keyword_data[kw][month] = {"position": 0, "impressions": 0, "clicks": 0, "ctr": 0}

    return keyword_data


def get_whatsapp_leads_monthly(year):
    """Get monthly WhatsApp click leads from the local JSON tracking file.

    This is a best-effort FALLBACK data source, not the durable one — the
    Next.js API route that writes this file (app/api/analytics/whatsapp-click
    /route.ts) may run on an ephemeral filesystem, so the file can be empty
    or missing even when clicks are happening. GA4's `whatsapp_button_click`
    event is the durable source of truth; see get_whatsapp_leads_ga4_monthly()
    and docs/seo/ANALYTICS-README.md.

    Robust to BOTH known file shapes so a valid file is never silently
    treated as zero leads:
      - current: a bare JSON array of click events,
            [{"timestamp": "...", "page": "...", ...}, ...]
      - legacy: an object wrapper (as an earlier version of route.ts wrote),
            {"totalClicks": N, "clicks": [{"timestamp": ...}, ...], ...}
    """
    data_path = SCRIPT_DIR.parent.parent / "data" / "whatsapp-clicks.json"
    monthly_leads = {}

    if not data_path.exists():
        logger.warning("WhatsApp clicks data not found at %s", data_path)
        return monthly_leads

    try:
        with open(data_path) as f:
            raw = json.load(f)

        # Accept either shape — never silently return 0 just because the
        # top-level type differs from what we expect.
        if isinstance(raw, list):
            clicks = raw
        elif isinstance(raw, dict) and isinstance(raw.get("clicks"), list):
            clicks = raw["clicks"]
        else:
            logger.warning(
                "Unrecognized WhatsApp clicks file shape at %s (type=%s) — treating as empty",
                data_path, type(raw).__name__,
            )
            clicks = []

        for click in clicks:
            if not isinstance(click, dict):
                continue
            ts = click.get("timestamp", "")
            if not ts:
                continue
            try:
                dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
                if dt.year == year:
                    month = dt.month
                    monthly_leads[month] = monthly_leads.get(month, 0) + 1
            except Exception:
                continue

        logger.info("WhatsApp leads (local file, fallback source): %s", monthly_leads)
    except Exception as e:
        logger.error("Failed to read WhatsApp data: %s", e)

    return monthly_leads


def get_whatsapp_leads_ga4_monthly(creds, year, property_id=None):
    """Get monthly WhatsApp lead counts from GA4's `whatsapp_button_click`
    event — the DURABLE source of truth (see module docstring / README).

    Guarded / never raises: returns {} whenever GA4 access isn't available
    (no property id discoverable, library not installed, creds lack the
    analytics.readonly scope, API error, etc.), so callers can safely treat
    an empty dict as "fall back to the local file for this data".

    Returns dict[month] -> int (event count for that calendar month).
    Months that fail individually are simply omitted (not zeroed), so the
    caller can fall back to file-based counts for just those months.
    """
    if not property_id:
        property_id = _discover_ga4_property(creds)
        if not property_id:
            logger.info("GA4 property not configured — WhatsApp leads will use local file fallback")
            return {}

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            RunReportRequest,
            DateRange,
            Dimension,
            Metric,
            Filter,
            FilterExpression,
        )
    except ImportError:
        logger.info("google-analytics-data not installed — WhatsApp leads will use local file fallback")
        return {}

    try:
        client = BetaAnalyticsDataClient(credentials=creds)
    except Exception as e:
        logger.warning("GA4 client init failed — WhatsApp leads will use local file fallback: %s", e)
        return {}

    monthly_leads = {}
    today = datetime.now(timezone.utc).date()

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        if start_date > today:
            break
        if end_date > today:
            end_date = today

        try:
            request = RunReportRequest(
                property=f"properties/{property_id}",
                date_ranges=[DateRange(
                    start_date=start_date.strftime("%Y-%m-%d"),
                    end_date=end_date.strftime("%Y-%m-%d"),
                )],
                dimensions=[Dimension(name="eventName")],
                metrics=[Metric(name="eventCount")],
                dimension_filter=FilterExpression(
                    filter=Filter(
                        field_name="eventName",
                        string_filter=Filter.StringFilter(value="whatsapp_button_click"),
                    )
                ),
            )
            response = client.run_report(request)

            total = sum(int(float(row.metric_values[0].value)) for row in response.rows)
            monthly_leads[month] = total
            logger.info("GA4 WhatsApp leads %s-%02d: %d", year, month, total)
        except Exception as e:
            # Leave this month out of the dict entirely — the combiner
            # below will fall back to the file-based count for it.
            logger.warning("GA4 WhatsApp leads %s-%02d failed: %s", year, month, e)

    return monthly_leads


def get_whatsapp_leads_combined(creds, year, ga4_property_id=None):
    """Combine GA4-based WhatsApp lead counts (durable, preferred) with the
    local-file fallback (best-effort, may be empty on ephemeral hosting).

    Per month: use the GA4 count when GA4 returned data for that month,
    otherwise fall back to the file-based count. Never raises — if GA4 is
    entirely unavailable this is identical to get_whatsapp_leads_monthly().
    """
    file_leads = get_whatsapp_leads_monthly(year)

    try:
        ga4_leads = get_whatsapp_leads_ga4_monthly(creds, year, property_id=ga4_property_id)
    except Exception as e:
        logger.warning("GA4 WhatsApp leads fetch failed unexpectedly — using file fallback only: %s", e)
        ga4_leads = {}

    if not ga4_leads:
        return file_leads

    combined = dict(file_leads)  # start from file fallback for all months
    combined.update(ga4_leads)   # GA4 counts win wherever GA4 has data
    logger.info("WhatsApp leads (combined, GA4-preferred where available): %s", combined)
    return combined


# ============================================================================
# GA4 DATA FETCHING (optional — requires analytics scope)
# ============================================================================

def get_ga4_monthly(creds, year, property_id=None):
    """
    Get GA4 monthly metrics: users, newUsers, sessions, bounceRate,
    screenPageViews, averageSessionDuration, screenPageViewsPerSession.

    Returns dict[month] -> {metric: value}
    Returns empty dict if GA4 not configured.
    """
    if not property_id:
        # Try to discover property ID from GA4 Admin API
        property_id = _discover_ga4_property(creds)
        if not property_id:
            logger.info("GA4 property not configured — skipping GA4 metrics")
            return {}

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            RunReportRequest,
            DateRange,
            Dimension,
            Metric,
        )
    except ImportError:
        logger.warning("google-analytics-data not installed — skipping GA4")
        return {}

    monthly_data = {}
    today = datetime.now(timezone.utc).date()

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        if start_date > today:
            break
        if end_date > today:
            end_date = today

        try:
            client = BetaAnalyticsDataClient(credentials=creds)
            request = RunReportRequest(
                property=f"properties/{property_id}",
                date_ranges=[DateRange(
                    start_date=start_date.strftime("%Y-%m-%d"),
                    end_date=end_date.strftime("%Y-%m-%d"),
                )],
                metrics=[
                    Metric(name="totalUsers"),
                    Metric(name="newUsers"),
                    Metric(name="sessions"),
                    Metric(name="bounceRate"),
                    Metric(name="screenPageViews"),
                    Metric(name="averageSessionDuration"),
                    Metric(name="screenPageViewsPerSession"),
                ],
            )
            response = client.run_report(request)

            if response.rows:
                row = response.rows[0]
                values = [v.value for v in row.metric_values]
                monthly_data[month] = {
                    "users": int(float(values[0])),
                    "new_users": int(float(values[1])),
                    "sessions": int(float(values[2])),
                    "bounce_rate": round(float(values[3]) * 100, 2),
                    "pageviews": int(float(values[4])),
                    "avg_session_duration": round(float(values[5]), 0),
                    "pages_per_session": round(float(values[6]), 2),
                }
                logger.info("GA4 %s-%02d: %s", year, month, monthly_data[month])
            else:
                monthly_data[month] = None
        except Exception as e:
            logger.warning("GA4 %s-%02d failed: %s", year, month, e)

    return monthly_data


def _discover_ga4_property(creds):
    """Try to find GA4 property ID using Admin API."""
    try:
        service = build("analyticsadmin", "v1beta", credentials=creds)
        response = service.accountSummaries().list().execute()
        for account in response.get("accountSummaries", []):
            for prop in account.get("propertySummaries", []):
                prop_id = prop.get("property", "").replace("properties/", "")
                logger.info("Found GA4 property: %s (%s)", prop_id, prop.get("displayName"))
                return prop_id
    except Exception as e:
        logger.info("GA4 Admin API not available: %s", e)
    return None


# ============================================================================
# SHEETS: WEB METRICS REPORT
# ============================================================================

def write_web_report(sh, year, gsc_overview, gsc_pages, gsc_top, wa_leads, ga4_data):
    """Write the 'Web CBI {year}' sheet — Jatis Mobile template style."""
    sheet_name = f"Web CBI {year}"

    try:
        ws = sh.worksheet(sheet_name)
        logger.info("Found existing worksheet '%s'", sheet_name)
    except gspread.WorksheetNotFound:
        ws = sh.add_worksheet(title=sheet_name, rows=60, cols=20)
        logger.info("Created new worksheet '%s'", sheet_name)

    ws.clear()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    months_with_data = sorted(gsc_overview.keys())
    num_months = len(months_with_data)

    # Column layout: A=Metric label, B-M=months, N=Total, O=Average
    # Row layout follows Jatis Mobile template

    all_rows = []

    # ===== ROW 1: Title =====
    title_row = [f"WEBSITE CBI (centrabiotechindonesia.com) {year}"]
    title_row += [""] * (num_months + 2)
    all_rows.append(title_row)

    # ===== ROW 2: Empty =====
    all_rows.append([])

    # ===== SECTION 1: Web/Blog Visitor per month =====
    # Section header
    section1_header = ["Web/Blog Visitor per month by Search Console"]
    all_rows.append(section1_header)

    # Column headers
    col_headers = ["Website (Include Blog)"]
    for m in months_with_data:
        col_headers.append(MONTH_NAMES[m - 1])
    col_headers += ["Total", "Average"]
    all_rows.append(col_headers)

    # --- GSC Metrics rows ---
    # Clicks
    clicks_row = ["Clicks"]
    total_clicks = 0
    for m in months_with_data:
        v = gsc_overview.get(m, {}).get("clicks", 0)
        clicks_row.append(v)
        total_clicks += v
    clicks_row += [total_clicks, round(total_clicks / max(num_months, 1))]
    all_rows.append(clicks_row)

    # Impressions
    impr_row = ["Impressions"]
    total_impr = 0
    for m in months_with_data:
        v = gsc_overview.get(m, {}).get("impressions", 0)
        impr_row.append(v)
        total_impr += v
    impr_row += [total_impr, round(total_impr / max(num_months, 1))]
    all_rows.append(impr_row)

    # CTR
    ctr_row = ["CTR (%)"]
    total_ctr = 0
    for m in months_with_data:
        v = gsc_overview.get(m, {}).get("ctr", 0)
        ctr_row.append(f"{v:.2f}%")
        total_ctr += v
    ctr_row += [f"{total_ctr:.2f}%", f"{total_ctr / max(num_months, 1):.2f}%"]
    all_rows.append(ctr_row)

    # Avg Position
    pos_row = ["Avg Position"]
    total_pos = 0
    for m in months_with_data:
        v = gsc_overview.get(m, {}).get("position", 0)
        pos_row.append(v)
        total_pos += v
    pos_row += ["", round(total_pos / max(num_months, 1), 1)]
    all_rows.append(pos_row)

    # Pages in Search Results
    pages_row = ["Pages in Search Results"]
    total_pages = 0
    for m in months_with_data:
        v = gsc_pages.get(m, 0)
        pages_row.append(v)
        total_pages += v
    pages_row += [total_pages, round(total_pages / max(num_months, 1))]
    all_rows.append(pages_row)

    # ===== GA4 Metrics (if available) =====
    if ga4_data:
        ga4_metrics = [
            ("Users", "users"),
            ("New Users", "new_users"),
            ("Sessions", "sessions"),
            ("Bounce Rate (%)", "bounce_rate"),
            ("Pageviews", "pageviews"),
            ("Avg Session Duration (s)", "avg_session_duration"),
            ("Pages / Session", "pages_per_session"),
        ]
        for label, key in ga4_metrics:
            row = [label]
            total = 0
            is_pct = key in ("bounce_rate", "pages_per_session")
            for m in months_with_data:
                ga_month = ga4_data.get(m)
                if ga_month:
                    v = ga_month.get(key, 0)
                    if key == "bounce_rate":
                        row.append(f"{v:.2f}%")
                    elif key == "avg_session_duration":
                        mins = int(v) // 60
                        secs = int(v) % 60
                        row.append(f"{mins}:{secs:02d}")
                    elif key == "pages_per_session":
                        row.append(f"{v:.2f}")
                    else:
                        row.append(int(v))
                    total += v
                else:
                    row.append("")
            # Total & Average
            if is_pct:
                row += ["", f"{total / max(num_months, 1):.2f}%" if key == "bounce_rate" else f"{total / max(num_months, 1):.2f}"]
            elif key == "avg_session_duration":
                avg = total / max(num_months, 1)
                mins = int(avg) // 60
                secs = int(avg) % 60
                row += ["", f"{mins}:{secs:02d}"]
            else:
                row += [int(total), round(total / max(num_months, 1))]
            all_rows.append(row)
    else:
        # Placeholder rows for GA4 metrics
        ga4_placeholder = [
            "Users", "New Users", "Sessions", "Bounce Rate (%)",
            "Pageviews", "Avg Session Duration", "Pages / Session",
        ]
        for label in ga4_placeholder:
            row = [label]
            for _ in months_with_data:
                row.append("")  # Will be filled when GA4 API is connected
            row += ["", ""]
            all_rows.append(row)

    # ===== Empty row =====
    all_rows.append([])

    # ===== SECTION 2: Leads Website (Conversion) =====
    all_rows.append(["Leads Website (Conversion)"])

    leads_header = ["Metrics"]
    for m in months_with_data:
        leads_header.append(MONTH_NAMES[m - 1])
    leads_header += ["Total", "Average"]
    all_rows.append(leads_header)

    # Website Traffic (= clicks from GSC)
    traffic_row = ["Website Traffic (Clicks)"]
    total_traffic = 0
    for m in months_with_data:
        v = gsc_overview.get(m, {}).get("clicks", 0)
        traffic_row.append(v)
        total_traffic += v
    traffic_row += [total_traffic, round(total_traffic / max(num_months, 1))]
    all_rows.append(traffic_row)

    # Leads (WhatsApp clicks)
    leads_row = ["Leads (WhatsApp)"]
    total_leads = 0
    for m in months_with_data:
        v = wa_leads.get(m, 0)
        leads_row.append(v)
        total_leads += v
    leads_row += [total_leads, round(total_leads / max(num_months, 1))]
    all_rows.append(leads_row)

    # Conversion Rate
    conv_row = ["Conversion Rate"]
    for m in months_with_data:
        traffic = gsc_overview.get(m, {}).get("clicks", 0)
        leads = wa_leads.get(m, 0)
        if traffic > 0:
            conv_row.append(f"{(leads / traffic * 100):.2f}%")
        else:
            conv_row.append("0.00%")
    conv_row += ["", ""]
    all_rows.append(conv_row)

    # ===== Empty row =====
    all_rows.append([])

    # ===== SECTION 3: Top Landing Page =====
    all_rows.append(["Top Landing Page"])

    top_header = ["Website News & Product"]
    for m in months_with_data:
        top_header.append(MONTH_NAMES[m - 1])
    top_header += ["Total", "Average"]
    all_rows.append(top_header)

    # Top product page
    prod_row = ["Most visited product page"]
    for m in months_with_data:
        url = gsc_top.get(m, {}).get("product", "")
        prod_row.append(url)
    prod_row += ["", ""]
    all_rows.append(prod_row)

    # Top blog page
    blog_row = ["Most read Articles on Blog pages"]
    for m in months_with_data:
        url = gsc_top.get(m, {}).get("blog", "")
        blog_row.append(url)
    blog_row += ["", ""]
    all_rows.append(blog_row)

    # ===== Footer =====
    all_rows.append([])
    all_rows.append([f"Last updated: {now}  |  Data source: Google Search Console + Google Analytics"])

    # Write all data
    ws.update(all_rows, value_input_option="USER_ENTERED")
    logger.info("Wrote %d rows to '%s'", len(all_rows), sheet_name)

    # Calculate actual row positions for formatting
    row_positions = {
        "title": 1,
        "s1_header": 3,
        "s1_cols": 4,
        "gsc_data_start": 5,
        "gsc_data_end": 9,
        "ga4_start": 10,
        "ga4_end": 16,
        "s2_header": 18,
        "s2_cols": 19,
        "s2_data_start": 20,
        "s2_data_end": 22,
        "s3_header": 24,
        "s3_cols": 25,
        "s3_data_start": 26,
        "s3_data_end": 27,
    }

    # ===== FORMATTING =====
    _format_web_sheet(ws, num_months, months_with_data, row_positions, ga4_data)

    return ws


def _format_web_sheet(ws, num_months, months_with_data, rp, ga4_data):
    """Apply professional formatting to the web report sheet.

    rp = row_positions dict with keys: title, s1_header, s1_cols,
    gsc_data_start, gsc_data_end, ga4_start, ga4_end,
    s2_header, s2_cols, s2_data_start, s2_data_end,
    s3_header, s3_cols, s3_data_start, s3_data_end
    """
    last_col = _col_letter(num_months + 2)  # labels + months + Total + Average

    formats = []

    # --- Title row ---
    formats.append({
        "range": f"A{rp['title']}:{last_col}{rp['title']}",
        "format": {
            "backgroundColor": DARK_NAVY,
            "textFormat": {"bold": True, "fontSize": 13, "foregroundColor": WHITE},
            "horizontalAlignment": "LEFT",
        },
    })

    # --- Helper: format a section header + column headers + data rows ---
    def fmt_section(header_row, cols_row, data_start, data_end):
        # Section header
        formats.append({
            "range": f"A{header_row}:{last_col}{header_row}",
            "format": {
                "backgroundColor": MEDIUM_BLUE,
                "textFormat": {"bold": True, "fontSize": 10, "foregroundColor": WHITE},
            },
        })
        # Column headers
        formats.append({
            "range": f"A{cols_row}:{last_col}{cols_row}",
            "format": {
                "backgroundColor": DARK_NAVY,
                "textFormat": {"bold": True, "fontSize": 10, "foregroundColor": WHITE},
                "horizontalAlignment": "CENTER",
            },
        })
        # Data rows with alternating color
        for row_num in range(data_start, data_end + 1):
            idx = row_num - data_start
            bg = LIGHT_GRAY if idx % 2 == 0 else WHITE
            formats.append({
                "range": f"A{row_num}:{last_col}{row_num}",
                "format": {"backgroundColor": bg},
            })
            # Row label bold
            formats.append({
                "range": f"A{row_num}",
                "format": {"textFormat": {"bold": True, "fontSize": 10}},
            })
            # Data cells right-aligned
            if num_months > 0:
                data_end_col = _col_letter(num_months)
                formats.append({
                    "range": f"B{row_num}:{last_col}{row_num}",
                    "format": {"horizontalAlignment": "RIGHT"},
                })

    # Section 1: GSC metrics
    fmt_section(rp["s1_header"], rp["s1_cols"], rp["gsc_data_start"], rp["gsc_data_end"])

    # GA4 rows (or placeholders)
    for row_num in range(rp["ga4_start"], rp["ga4_end"] + 1):
        idx = row_num - rp["ga4_start"]
        bg = LIGHT_GRAY if idx % 2 == 0 else WHITE
        formats.append({
            "range": f"A{row_num}:{last_col}{row_num}",
            "format": {"backgroundColor": bg},
        })
        formats.append({
            "range": f"A{row_num}",
            "format": {"textFormat": {"bold": True, "fontSize": 10, "foregroundColor": {"red": 0.5, "green": 0.5, "blue": 0.5}} if not ga4_data else {"bold": True, "fontSize": 10}},
        })

    # Section 2: Leads
    fmt_section(rp["s2_header"], rp["s2_cols"], rp["s2_data_start"], rp["s2_data_end"])

    # Section 3: Top Landing Page
    fmt_section(rp["s3_header"], rp["s3_cols"], rp["s3_data_start"], rp["s3_data_end"])

    # Number formatting
    num_col_end = _col_letter(num_months)
    total_col = _col_letter(num_months + 1)
    avg_col = _col_letter(num_months + 2)

    # Clicks, Impressions — thousands separator
    for r in [rp["gsc_data_start"], rp["gsc_data_start"] + 1, rp["gsc_data_end"]]:
        formats.append({
            "range": f"B{r}:{avg_col}{r}",
            "format": {"numberFormat": {"type": "NUMBER", "pattern": "#,##0"}},
        })

    # Position — 1 decimal
    formats.append({
        "range": f"B{rp['gsc_data_start'] + 3}:{avg_col}{rp['gsc_data_start'] + 3}",
        "format": {"numberFormat": {"type": "NUMBER", "pattern": "#,##0.0"}},
    })

    try:
        ws.batch_format(formats)
        logger.info("Applied formatting to web report")
    except Exception as e:
        logger.warning("Formatting failed (non-critical): %s", e)

    # Column widths and frozen panes
    try:
        body = {
            "requests": [
                {
                    "updateDimensionProperties": {
                        "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": 0, "endIndex": 1},
                        "properties": {"pixelSize": 260},
                        "fields": "pixelSize",
                    }
                },
                {
                    "updateDimensionProperties": {
                        "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": 1, "endIndex": num_months + 3},
                        "properties": {"pixelSize": 110},
                        "fields": "pixelSize",
                    }
                },
                {
                    "updateSheetProperties": {
                        "properties": {
                            "sheetId": ws.id,
                            "gridProperties": {"frozenRowCount": 4, "frozenColumnCount": 1},
                        },
                        "fields": "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
                    }
                },
            ]
        }
        ws.spreadsheet.batch_update(body)
    except Exception as e:
        logger.warning("Column width update failed: %s", e)

    # Tab color (hex string format)
    try:
        ws.update_tab_color("#007333")
    except Exception as e:
        logger.warning("Tab color failed: %s", e)


# ============================================================================
# SHEETS: KEYWORD RANKING REPORT
# ============================================================================

def write_keyword_report(sh, year, keyword_data):
    """Write the 'Keyword CBI {year}' sheet — SEO & SEM template style."""
    sheet_name = f"Keyword CBI {year}"

    try:
        ws = sh.worksheet(sheet_name)
        logger.info("Found existing worksheet '%s'", sheet_name)
    except gspread.WorksheetNotFound:
        ws = sh.add_worksheet(title=sheet_name, rows=30, cols=50)
        logger.info("Created new worksheet '%s'", sheet_name)

    ws.clear()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    # Determine which months have data
    months_with_data = set()
    for kw_months in keyword_data.values():
        months_with_data.update(kw_months.keys())
    months_with_data = sorted(months_with_data)

    if not months_with_data:
        ws.update([["No keyword data available"]])
        return ws

    # Column layout per month: Position | Change M2M (Position) | Impressions
    # So for N months: 2 + N*3 columns (No, Keyword, then 3 per month)
    cols_per_month = 3

    all_rows = []

    # ===== ROW 1: Title =====
    total_cols = 2 + len(months_with_data) * cols_per_month
    title_row = [f"{year}", "", "SEO & SEM — CBI Keyword Tracking"]
    title_row += [""] * (total_cols - 3)
    all_rows.append(title_row)

    # ===== ROW 2: Empty =====
    all_rows.append([])

    # ===== ROW 3: Month group headers (merged visually) =====
    month_group_row = ["", ""]  # No, Optimized Keyword
    for m in months_with_data:
        month_group_row.append(MONTH_NAMES_ID[m - 1])
        month_group_row.append("")
        month_group_row.append("")
    all_rows.append(month_group_row)

    # ===== ROW 4: Sub-headers =====
    sub_headers = ["No", "Optimized Keyword"]
    for m in months_with_data:
        sub_headers.append("Position")
        sub_headers.append("Change M2M\n(Position)")
        sub_headers.append("Impressions")
    all_rows.append(sub_headers)

    # ===== Data rows =====
    for i, kw in enumerate(TARGET_KEYWORDS, 1):
        row = [i, kw]
        prev_position = 0

        for m in months_with_data:
            data = keyword_data.get(kw, {}).get(m, {})
            position = data.get("position", 0)
            impressions = data.get("impressions", 0)

            # Position display
            if position > 0:
                row.append(round(position, 2))
            else:
                row.append(0)

            # Change M2M: negative means improved (went up in rank)
            if prev_position > 0 and position > 0:
                change = round(position - prev_position, 2)
                row.append(change)
            elif position > 0 and prev_position == 0:
                row.append("NEW")
            else:
                row.append(0)

            # Impressions
            row.append(impressions)

            prev_position = position

        all_rows.append(row)

    # ===== Summary row =====
    all_rows.append([])
    summary_row = ["", "SUMMARY"]
    for m in months_with_data:
        # Average position of ranked keywords
        positions = [keyword_data.get(kw, {}).get(m, {}).get("position", 0) for kw in TARGET_KEYWORDS]
        ranked = [p for p in positions if p > 0]
        avg_pos = round(sum(ranked) / len(ranked), 2) if ranked else 0

        # Total impressions
        total_impr = sum(keyword_data.get(kw, {}).get(m, {}).get("impressions", 0) for kw in TARGET_KEYWORDS)

        summary_row.append(f"Avg: {avg_pos}")
        summary_row.append(f"{len(ranked)}/{len(TARGET_KEYWORDS)} ranked")
        summary_row.append(total_impr)

    all_rows.append(summary_row)

    # Footer
    all_rows.append([])
    all_rows.append([f"Last updated: {now}  |  Source: Google Search Console  |  Site: {SITE_DOMAIN}"])

    # Write all data
    ws.update(all_rows, value_input_option="USER_ENTERED")
    logger.info("Wrote %d rows to '%s'", len(all_rows), sheet_name)

    # ===== FORMATTING =====
    _format_keyword_sheet(ws, months_with_data, cols_per_month, keyword_data)

    return ws


def _format_keyword_sheet(ws, months_with_data, cols_per_month, keyword_data):
    """Apply professional formatting to the keyword report sheet."""
    total_cols = 2 + len(months_with_data) * cols_per_month
    last_col_letter = _col_letter(total_cols - 1)

    formats = []

    # Row 1: Title
    formats.append({
        "range": f"A1:{last_col_letter}1",
        "format": {
            "backgroundColor": DARK_NAVY,
            "textFormat": {"bold": True, "fontSize": 12, "foregroundColor": WHITE},
        },
    })

    # Row 3: Month group headers
    for idx, m in enumerate(months_with_data):
        col_start = 2 + idx * cols_per_month
        col_end = col_start + cols_per_month - 1
        start_letter = _col_letter(col_start)
        end_letter = _col_letter(col_end)
        formats.append({
            "range": f"{start_letter}3:{end_letter}3",
            "format": {
                "backgroundColor": MEDIUM_BLUE,
                "textFormat": {"bold": True, "fontSize": 10, "foregroundColor": WHITE},
                "horizontalAlignment": "CENTER",
            },
        })

    # Row 4: Sub-headers
    formats.append({
        "range": f"A4:{last_col_letter}4",
        "format": {
            "backgroundColor": DARK_NAVY,
            "textFormat": {"bold": True, "fontSize": 9, "foregroundColor": WHITE},
            "horizontalAlignment": "CENTER",
            "wrapStrategy": "WRAP",
        },
    })

    # Data rows (5 to 5 + num_keywords - 1)
    num_keywords = len(TARGET_KEYWORDS)
    for i in range(num_keywords):
        row_num = 5 + i
        bg = LIGHT_GRAY if i % 2 == 0 else WHITE
        formats.append({
            "range": f"A{row_num}:{last_col_letter}{row_num}",
            "format": {"backgroundColor": bg, "horizontalAlignment": "CENTER"},
        })
        # Keyword name left-aligned and bold
        formats.append({
            "range": f"B{row_num}",
            "format": {"textFormat": {"bold": True}, "horizontalAlignment": "LEFT"},
        })

    # Conditional coloring for Change M2M columns
    for idx, m in enumerate(months_with_data):
        change_col = 2 + idx * cols_per_month + 1  # The "Change M2M" column
        change_letter = _col_letter(change_col)

        for i, kw in enumerate(TARGET_KEYWORDS):
            row_num = 5 + i
            data = keyword_data.get(kw, {}).get(m, {})
            position = data.get("position", 0)

            # Calculate change M2M
            prev_m_idx = months_with_data.index(m) - 1
            if prev_m_idx >= 0:
                prev_month = months_with_data[prev_m_idx]
                prev_pos = keyword_data.get(kw, {}).get(prev_month, {}).get("position", 0)
                if prev_pos > 0 and position > 0:
                    change = position - prev_pos
                    if change < 0:  # Improved (lower position = better)
                        formats.append({
                            "range": f"{change_letter}{row_num}",
                            "format": {
                                "backgroundColor": LIGHT_GREEN,
                                "textFormat": {"foregroundColor": GREEN_TEXT},
                            },
                        })
                    elif change > 0:  # Declined
                        formats.append({
                            "range": f"{change_letter}{row_num}",
                            "format": {
                                "backgroundColor": LIGHT_RED,
                                "textFormat": {"foregroundColor": RED_TEXT},
                            },
                        })

    # Summary row
    summary_row_num = 5 + num_keywords + 1
    formats.append({
        "range": f"A{summary_row_num}:{last_col_letter}{summary_row_num}",
        "format": {
            "backgroundColor": CBI_GREEN_LIGHT,
            "textFormat": {"bold": True, "fontSize": 10},
            "horizontalAlignment": "CENTER",
        },
    })

    try:
        ws.batch_format(formats)
        logger.info("Applied formatting to keyword report")
    except Exception as e:
        logger.warning("Formatting failed (non-critical): %s", e)

    # Merge month header cells
    try:
        requests_body = {"requests": []}
        for idx, m in enumerate(months_with_data):
            col_start = 2 + idx * cols_per_month
            col_end = col_start + cols_per_month
            requests_body["requests"].append({
                "mergeCells": {
                    "range": {
                        "sheetId": ws.id,
                        "startRowIndex": 2,  # Row 3 (0-indexed)
                        "endRowIndex": 3,
                        "startColumnIndex": col_start,
                        "endColumnIndex": col_end,
                    },
                    "mergeType": "MERGE_ALL",
                }
            })

        # Column widths
        requests_body["requests"].append({
            "updateDimensionProperties": {
                "range": {
                    "sheetId": ws.id,
                    "dimension": "COLUMNS",
                    "startIndex": 0,
                    "endIndex": 1,
                },
                "properties": {"pixelSize": 40},
                "fields": "pixelSize",
            }
        })
        requests_body["requests"].append({
            "updateDimensionProperties": {
                "range": {
                    "sheetId": ws.id,
                    "dimension": "COLUMNS",
                    "startIndex": 1,
                    "endIndex": 2,
                },
                "properties": {"pixelSize": 220},
                "fields": "pixelSize",
            }
        })
        # Data columns
        requests_body["requests"].append({
            "updateDimensionProperties": {
                "range": {
                    "sheetId": ws.id,
                    "dimension": "COLUMNS",
                    "startIndex": 2,
                    "endIndex": total_cols,
                },
                "properties": {"pixelSize": 100},
                "fields": "pixelSize",
            }
        })

        # Freeze first 2 columns and 4 rows
        requests_body["requests"].append({
            "updateSheetProperties": {
                "properties": {
                    "sheetId": ws.id,
                    "gridProperties": {
                        "frozenRowCount": 4,
                        "frozenColumnCount": 2,
                    },
                },
                "fields": "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
            }
        })

        ws.spreadsheet.batch_update(requests_body)
        logger.info("Applied merges and column widths to keyword report")
    except Exception as e:
        logger.warning("Merge/width update failed: %s", e)

    # Tab color (hex string format)
    try:
        ws.update_tab_color("#D9661A")
    except Exception as e:
        logger.warning("Tab color failed: %s", e)


def get_gsc_top_queries_monthly(creds, year, top_n=50):
    """
    Fetch top search queries for each calendar month (1st to 30/31).
    Returns:
        queries_by_month: dict[month] -> list of {query, clicks, impressions, ctr, position}
        all_queries_set: set of all unique queries found across all months
    """
    service = build("searchconsole", "v1", credentials=creds)
    queries_by_month = {}
    all_queries_set = set()

    today = datetime.now(timezone.utc).date()
    data_cutoff = today - timedelta(days=3)

    for month in range(1, 13):
        start_date = datetime(year, month, 1).date()
        _, last_day = monthrange(year, month)
        end_date = datetime(year, month, last_day).date()

        if start_date > data_cutoff:
            break
        if end_date > data_cutoff:
            end_date = data_cutoff

        try:
            response = service.searchanalytics().query(
                siteUrl=GSC_SITE_URL,
                body={
                    "startDate": start_date.strftime("%Y-%m-%d"),
                    "endDate": end_date.strftime("%Y-%m-%d"),
                    "dimensions": ["query"],
                    "rowLimit": 500,
                    "type": "web",
                },
            ).execute()

            month_queries = []
            for row in response.get("rows", []):
                q = row["keys"][0]
                all_queries_set.add(q)
                month_queries.append({
                    "query": q,
                    "clicks": row.get("clicks", 0),
                    "impressions": row.get("impressions", 0),
                    "ctr": round(row.get("ctr", 0) * 100, 2),
                    "position": round(row.get("position", 0), 1),
                })
            queries_by_month[month] = month_queries
            logger.info("GSC top queries %s-%02d: %d queries (period: %s to %s)",
                        year, month, len(month_queries),
                        start_date.strftime("%Y-%m-%d"), end_date.strftime("%Y-%m-%d"))
        except Exception as e:
            logger.error("GSC top queries %s-%02d failed: %s", year, month, e)
            queries_by_month[month] = []

    return queries_by_month, all_queries_set


def write_top_queries_monthly(sh, year, queries_by_month, all_queries_set):
    """
    Write 'Top Queries Monthly' sheet — shows avg position per query per calendar month.
    Columns: No | Query | Jan Pos | Feb Pos | ... | Avg Pos | Total Clicks | Total Impr | Best Month
    """
    sheet_name = f"Top Queries Monthly"

    try:
        ws = sh.worksheet(sheet_name)
        logger.info("Found existing worksheet '%s'", sheet_name)
    except gspread.WorksheetNotFound:
        ws = sh.add_worksheet(title=sheet_name, rows=200, cols=25)
        logger.info("Created new worksheet '%s'", sheet_name)

    ws.clear()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    months_with_data = sorted(queries_by_month.keys())
    if not months_with_data:
        ws.update([["No data available"]])
        return ws

    # Build lookup: query -> {month -> {clicks, impressions, ctr, position}}
    query_lookup = {}
    for month, month_queries in queries_by_month.items():
        for qd in month_queries:
            q = qd["query"]
            if q not in query_lookup:
                query_lookup[q] = {}
            query_lookup[q][month] = qd

    # Rank queries by total clicks across all months (descending)
    query_totals = []
    for q, month_data in query_lookup.items():
        total_clicks = sum(md.get("clicks", 0) for md in month_data.values())
        total_impr = sum(md.get("impressions", 0) for md in month_data.values())
        positions = [md.get("position", 0) for md in month_data.values() if md.get("position", 0) > 0]
        avg_pos = round(sum(positions) / len(positions), 1) if positions else 0

        # Find best month (lowest position = best ranking)
        best_month = ""
        best_pos = 999
        for m, md in month_data.items():
            pos = md.get("position", 0)
            if 0 < pos < best_pos:
                best_pos = pos
                best_month = MONTH_NAMES[m - 1]

        query_totals.append({
            "query": q,
            "total_clicks": total_clicks,
            "total_impressions": total_impr,
            "avg_position": avg_pos,
            "best_month": best_month,
            "month_data": month_data,
        })

    # Sort by total clicks descending, take top 50
    query_totals.sort(key=lambda x: x["total_clicks"], reverse=True)
    top_queries = query_totals[:50]

    all_rows = []

    # ===== ROW 1: Title =====
    all_rows.append([f"CBI Top Search Queries — Monthly Position Tracking {year}"])

    # ===== ROW 2: Subtitle =====
    month_range_text = ", ".join(
        f"{MONTH_NAMES[m - 1]} (1-{monthrange(year, m)[1]})"
        for m in months_with_data
    )
    all_rows.append([f"Last Updated: {now}  |  Period: Full calendar months  |  {month_range_text}"])

    # ===== ROW 3: Empty =====
    all_rows.append([])

    # ===== ROW 4: Column headers =====
    headers = ["No", "Query"]
    for m in months_with_data:
        _, last_day = monthrange(year, m)
        headers.append(f"{MONTH_NAMES[m - 1]}\n(1-{last_day})")
    headers += ["Avg Pos", "Total Clicks", "Total Impr", "Best Month"]
    all_rows.append(headers)

    # ===== Data rows =====
    for i, qt in enumerate(top_queries, 1):
        row = [i, qt["query"]]
        for m in months_with_data:
            md = qt["month_data"].get(m)
            if md and md.get("position", 0) > 0:
                row.append(md["position"])
            else:
                row.append("")
        row += [
            qt["avg_position"] if qt["avg_position"] > 0 else "",
            qt["total_clicks"],
            qt["total_impressions"],
            qt["best_month"],
        ]
        all_rows.append(row)

    # ===== Empty row =====
    all_rows.append([])

    # ===== Summary row =====
    summary_row = ["", "MONTHLY AVERAGE"]
    for m in months_with_data:
        month_queries = queries_by_month.get(m, [])
        positions = [qd["position"] for qd in month_queries if qd.get("position", 0) > 0]
        avg = round(sum(positions) / len(positions), 1) if positions else ""
        summary_row.append(avg)
    # Overall avg
    all_positions = []
    for qt in top_queries:
        if qt["avg_position"] > 0:
            all_positions.append(qt["avg_position"])
    overall_avg = round(sum(all_positions) / len(all_positions), 1) if all_positions else ""
    total_clicks_all = sum(qt["total_clicks"] for qt in top_queries)
    total_impr_all = sum(qt["total_impressions"] for qt in top_queries)
    summary_row += [overall_avg, total_clicks_all, total_impr_all, ""]
    all_rows.append(summary_row)

    # ===== Queries Count row =====
    count_row = ["", "QUERIES RANKED"]
    for m in months_with_data:
        month_queries = queries_by_month.get(m, [])
        ranked = len([qd for qd in month_queries if qd.get("position", 0) > 0])
        count_row.append(ranked)
    count_row += ["", "", "", ""]
    all_rows.append(count_row)

    # ===== Position Trend row =====
    trend_row = ["", "POSITION TREND"]
    prev_avg = None
    for m in months_with_data:
        month_queries = queries_by_month.get(m, [])
        positions = [qd["position"] for qd in month_queries if qd.get("position", 0) > 0]
        current_avg = round(sum(positions) / len(positions), 1) if positions else 0
        if prev_avg is not None and current_avg > 0 and prev_avg > 0:
            diff = round(current_avg - prev_avg, 1)
            if diff < 0:
                trend_row.append(f"▲ {abs(diff)}")  # Improved (lower position = better)
            elif diff > 0:
                trend_row.append(f"▼ {diff}")  # Declined
            else:
                trend_row.append("━ 0")
        else:
            trend_row.append("")
        if current_avg > 0:
            prev_avg = current_avg
    trend_row += ["", "", "", ""]
    all_rows.append(trend_row)

    # Footer
    all_rows.append([])
    all_rows.append([f"Data source: Google Search Console  |  Site: {SITE_DOMAIN}  |  Top 50 queries by clicks"])

    # Write all data
    ws.update(all_rows, value_input_option="USER_ENTERED")
    logger.info("Wrote %d rows to '%s'", len(all_rows), sheet_name)

    # ===== FORMATTING =====
    _format_top_queries_monthly(ws, months_with_data, top_queries, len(top_queries))

    return ws


def _format_top_queries_monthly(ws, months_with_data, top_queries, num_queries):
    """Apply professional formatting to the Top Queries Monthly sheet."""
    num_months = len(months_with_data)
    # Columns: No(0) | Query(1) | months(2..2+num_months-1) | AvgPos | TotalClicks | TotalImpr | BestMonth
    total_cols = 2 + num_months + 4
    last_col = _col_letter(total_cols - 1)

    formats = []

    # Row 1: Title
    formats.append({
        "range": f"A1:{last_col}1",
        "format": {
            "backgroundColor": CBI_GREEN,
            "textFormat": {"bold": True, "fontSize": 13, "foregroundColor": WHITE},
            "horizontalAlignment": "LEFT",
        },
    })

    # Row 2: Subtitle
    formats.append({
        "range": f"A2:{last_col}2",
        "format": {
            "textFormat": {"italic": True, "fontSize": 9, "foregroundColor": {"red": 0.4, "green": 0.4, "blue": 0.4}},
        },
    })

    # Row 4: Column headers
    formats.append({
        "range": f"A4:{last_col}4",
        "format": {
            "backgroundColor": DARK_NAVY,
            "textFormat": {"bold": True, "fontSize": 9, "foregroundColor": WHITE},
            "horizontalAlignment": "CENTER",
            "wrapStrategy": "WRAP",
        },
    })

    # Data rows (row 5 to 5 + num_queries - 1)
    data_start = 5
    data_end = data_start + num_queries - 1
    for i in range(num_queries):
        row_num = data_start + i
        bg = LIGHT_GRAY if i % 2 == 0 else WHITE
        formats.append({
            "range": f"A{row_num}:{last_col}{row_num}",
            "format": {"backgroundColor": bg},
        })
        # Query column left-aligned, bold
        formats.append({
            "range": f"B{row_num}",
            "format": {"textFormat": {"bold": True}, "horizontalAlignment": "LEFT"},
        })
        # Number & position cells center-aligned
        formats.append({
            "range": f"A{row_num}",
            "format": {"horizontalAlignment": "CENTER"},
        })
        # Month position columns + summary
        first_month_col = _col_letter(2)
        formats.append({
            "range": f"{first_month_col}{row_num}:{last_col}{row_num}",
            "format": {"horizontalAlignment": "CENTER"},
        })

    # Position columns — 1 decimal number format
    for idx in range(num_months):
        col = _col_letter(2 + idx)
        formats.append({
            "range": f"{col}{data_start}:{col}{data_end}",
            "format": {"numberFormat": {"type": "NUMBER", "pattern": "#,##0.0"}},
        })

    # Avg Pos column — 1 decimal
    avg_col = _col_letter(2 + num_months)
    formats.append({
        "range": f"{avg_col}{data_start}:{avg_col}{data_end}",
        "format": {"numberFormat": {"type": "NUMBER", "pattern": "#,##0.0"}},
    })

    # Total Clicks — thousands separator
    clicks_col = _col_letter(2 + num_months + 1)
    formats.append({
        "range": f"{clicks_col}{data_start}:{clicks_col}{data_end}",
        "format": {"numberFormat": {"type": "NUMBER", "pattern": "#,##0"}},
    })

    # Total Impressions — thousands separator
    impr_col = _col_letter(2 + num_months + 2)
    formats.append({
        "range": f"{impr_col}{data_start}:{impr_col}{data_end}",
        "format": {"numberFormat": {"type": "NUMBER", "pattern": "#,##0"}},
    })

    # Summary rows formatting
    summary_start = data_end + 2
    for offset in range(3):  # MONTHLY AVERAGE, QUERIES RANKED, POSITION TREND
        row_num = summary_start + offset
        formats.append({
            "range": f"A{row_num}:{last_col}{row_num}",
            "format": {
                "backgroundColor": CBI_GREEN_LIGHT,
                "textFormat": {"bold": True, "fontSize": 10},
                "horizontalAlignment": "CENTER",
            },
        })
        formats.append({
            "range": f"B{row_num}",
            "format": {"horizontalAlignment": "LEFT"},
        })

    # Conditional formatting for position values: Green for top 3, yellow for top 10
    # Use batch formatting per cell for position colors
    for i, qt in enumerate(top_queries):
        row_num = data_start + i
        for idx, m in enumerate(months_with_data):
            md = qt["month_data"].get(m)
            if md and md.get("position", 0) > 0:
                col = _col_letter(2 + idx)
                pos = md["position"]
                if pos <= 3:
                    formats.append({
                        "range": f"{col}{row_num}",
                        "format": {
                            "backgroundColor": LIGHT_GREEN,
                            "textFormat": {"bold": True, "foregroundColor": GREEN_TEXT},
                        },
                    })
                elif pos <= 10:
                    formats.append({
                        "range": f"{col}{row_num}",
                        "format": {
                            "backgroundColor": {"red": 0.95, "green": 1.0, "blue": 0.90},
                        },
                    })
                elif pos > 20:
                    formats.append({
                        "range": f"{col}{row_num}",
                        "format": {
                            "backgroundColor": LIGHT_RED,
                            "textFormat": {"foregroundColor": RED_TEXT},
                        },
                    })

    try:
        ws.batch_format(formats)
        logger.info("Applied formatting to Top Queries Monthly")
    except Exception as e:
        logger.warning("Formatting failed (non-critical): %s", e)

    # Column widths and frozen panes
    try:
        body = {
            "requests": [
                {
                    "updateDimensionProperties": {
                        "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": 0, "endIndex": 1},
                        "properties": {"pixelSize": 40},
                        "fields": "pixelSize",
                    }
                },
                {
                    "updateDimensionProperties": {
                        "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": 1, "endIndex": 2},
                        "properties": {"pixelSize": 280},
                        "fields": "pixelSize",
                    }
                },
                {
                    "updateDimensionProperties": {
                        "range": {"sheetId": ws.id, "dimension": "COLUMNS", "startIndex": 2, "endIndex": 2 + num_months + 4},
                        "properties": {"pixelSize": 90},
                        "fields": "pixelSize",
                    }
                },
                {
                    "updateSheetProperties": {
                        "properties": {
                            "sheetId": ws.id,
                            "gridProperties": {"frozenRowCount": 4, "frozenColumnCount": 2},
                        },
                        "fields": "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
                    }
                },
            ]
        }
        ws.spreadsheet.batch_update(body)
    except Exception as e:
        logger.warning("Column width update failed: %s", e)

    # Tab color
    try:
        ws.update_tab_color("#1B5E20")
    except Exception as e:
        logger.warning("Tab color failed: %s", e)


def _col_letter(index):
    """Convert 0-based column index to spreadsheet letter(s)."""
    result = ""
    while index >= 0:
        result = chr(ord('A') + (index % 26)) + result
        index = index // 26 - 1
    return result


# ============================================================================
# MAIN ENTRY POINT
# ============================================================================

def main():
    """Main entry point."""
    year = datetime.now().year

    if "--auth" in sys.argv:
        # Force re-authorization
        if TOKEN_PATH.exists():
            TOKEN_PATH.unlink()
        logger.info("Cleared existing token — will re-authorize")

    if "--year" in sys.argv:
        idx = sys.argv.index("--year")
        if idx + 1 < len(sys.argv):
            year = int(sys.argv[idx + 1])

    logger.info("=" * 70)
    logger.info("CBI Monthly Report Generation — Year %d", year)
    logger.info("=" * 70)

    # Authenticate
    creds = get_credentials()
    logger.info("Authentication successful")

    # Open spreadsheet
    gc = gspread.authorize(creds)
    sh = gc.open_by_key(SPREADSHEET_ID)
    logger.info("Opened spreadsheet: %s", sh.title)

    # ---- Fetch all data ----
    logger.info("--- Fetching GSC monthly overview ---")
    gsc_overview = get_gsc_monthly_overview(creds, year)

    logger.info("--- Fetching GSC monthly pages count ---")
    gsc_pages = get_gsc_monthly_pages_count(creds, year)

    logger.info("--- Fetching GSC top pages ---")
    gsc_top = get_gsc_top_pages(creds, year)

    logger.info("--- Fetching GSC keyword data ---")
    keyword_data = get_gsc_keyword_monthly(creds, year)

    logger.info("--- Fetching WhatsApp leads (GA4-preferred, file fallback) ---")
    wa_leads = get_whatsapp_leads_combined(creds, year, ga4_property_id=GA4_PROPERTY_ID)

    logger.info("--- Fetching GA4 data (optional) ---")
    ga4_data = get_ga4_monthly(creds, year, property_id=GA4_PROPERTY_ID)

    logger.info("--- Fetching GSC top queries monthly (full calendar months) ---")
    queries_by_month, all_queries_set = get_gsc_top_queries_monthly(creds, year)

    # ---- Write reports ----
    logger.info("--- Writing Web Report ---")
    write_web_report(sh, year, gsc_overview, gsc_pages, gsc_top, wa_leads, ga4_data)

    logger.info("--- Writing Keyword Report ---")
    write_keyword_report(sh, year, keyword_data)

    logger.info("--- Writing Top Queries Monthly ---")
    write_top_queries_monthly(sh, year, queries_by_month, all_queries_set)

    logger.info("=" * 70)
    logger.info("DONE — Reports written to spreadsheet")
    logger.info("URL: https://docs.google.com/spreadsheets/d/%s", SPREADSHEET_ID)
    logger.info("=" * 70)


if __name__ == "__main__":
    main()
