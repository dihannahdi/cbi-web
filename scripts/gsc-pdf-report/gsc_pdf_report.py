#!/usr/bin/env python3
"""
CBI Enterprise SEO & SERP Report Generator
===========================================
Generates a comprehensive, enterprise-grade PDF report from Google Search Console data.

Sections:
  01. Cover Page
  02. Executive Summary (KPIs snapshot)
  03. Search Performance Trend (daily 28-day charts)
  04. Top Queries / Keywords (clicks, impressions, CTR, position)
  05. Top Pages Performance
  06. SERP Opportunity Matrix (high-impression / low-CTR)
  07. Quick-Win Keywords (position 4–15)
  08. Content Portfolio Analysis
  09. Device & Country Breakdown
  10. Index Status Report
  11. Actionable Recommendations

Author: CBI SEO Automation
"""

import io
import os
import sys
import json
import math
import sqlite3
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path
from collections import defaultdict

import requests
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# ── PDF & chart libs ──────────────────────────────────────────────────────────
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether, Image as RLImage,
)
from reportlab.graphics.shapes import Drawing, Rect, String, Line
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.charts.linecharts import HorizontalLineChart
from reportlab.graphics.charts.piecharts import Pie
from reportlab.graphics import renderPDF
from reportlab.pdfgen import canvas
from reportlab.platypus.flowables import Flowable

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from matplotlib.patches import FancyBboxPatch
import numpy as np

# ── Config ────────────────────────────────────────────────────────────────────
SCRIPT_DIR  = Path(__file__).parent.resolve()
TOKEN_PATH  = SCRIPT_DIR / "token.json"
CLIENT_PATH = SCRIPT_DIR / "client_secret.json"

GSC_SITE_URL  = "sc-domain:centrabiotechindonesia.com"
SITE_DOMAIN   = "https://www.centrabiotechindonesia.com"
STRAPI_DB     = "/opt/cbi-strapi/.tmp/data.db"
REPORT_DIR    = SCRIPT_DIR / "reports"
REPORT_DIR.mkdir(exist_ok=True)

SCOPES = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
]

COMPANY_NAME  = "PT Centra Biotech Indonesia"
COMPANY_TAG   = "centrabiotechindonesia.com"
REPORT_PERIOD = 28        # days
PREV_PERIOD   = 28        # comparison window

# ── Brand palette ─────────────────────────────────────────────────────────────
CBI_GREEN      = colors.HexColor("#1B7A3E")
CBI_DARK       = colors.HexColor("#0D3B20")
CBI_LIGHT      = colors.HexColor("#E8F5EE")
CBI_ACCENT     = colors.HexColor("#F5A623")
CBI_DANGER     = colors.HexColor("#E74C3C")
CBI_NEUTRAL    = colors.HexColor("#6C757D")
CBI_BORDER     = colors.HexColor("#DEE2E6")
WHITE          = colors.white
BLACK          = colors.HexColor("#1A1A1A")

CHART_COLORS = [
    "#1B7A3E", "#2E9D56", "#5ABC78", "#F5A623", "#E74C3C",
    "#3498DB", "#9B59B6", "#16A085", "#E67E22", "#2C3E50",
]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
log = logging.getLogger(__name__)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# AUTH
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def get_creds():
    creds = None
    if TOKEN_PATH.exists():
        try:
            creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
        except Exception:
            pass
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        TOKEN_PATH.write_text(creds.to_json())
    if not creds or not creds.valid:
        log.error("No valid OAuth2 token. Run with --auth to authorize.")
        sys.exit(1)
    return creds


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# GSC DATA FETCHING
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def gsc_query(service, body):
    """Execute GSC searchAnalytics.query with automatic row batching."""
    all_rows = []
    start = 0
    body["rowLimit"] = 25000
    while True:
        body["startRow"] = start
        res = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=body).execute()
        rows = res.get("rows", [])
        all_rows.extend(rows)
        if len(rows) < body["rowLimit"]:
            break
        start += len(rows)
    return all_rows


def fetch_all_data(service, end_date, days=REPORT_PERIOD):
    start_date = (datetime.strptime(end_date, "%Y-%m-%d") - timedelta(days=days)).strftime("%Y-%m-%d")
    prev_end   = (datetime.strptime(end_date, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y-%m-%d")
    prev_start = (datetime.strptime(end_date, "%Y-%m-%d") - timedelta(days=days * 2 + 1)).strftime("%Y-%m-%d")

    base = {"startDate": start_date, "endDate": end_date}
    prev = {"startDate": prev_start, "endDate": prev_end}

    log.info("Fetching GSC data %s → %s", start_date, end_date)

    data = {}

    # -- by query ---------------------------------------------------------
    log.info("  Queries…")
    rows = gsc_query(service, {**base, "dimensions": ["query"]})
    data["queries"] = [
        {
            "query": r["keys"][0],
            "clicks": r["clicks"],
            "impressions": r["impressions"],
            "ctr": round(r["ctr"] * 100, 2),
            "position": round(r["position"], 1),
        }
        for r in rows
    ]
    data["queries"].sort(key=lambda x: x["clicks"], reverse=True)

    # -- by page ----------------------------------------------------------
    log.info("  Pages…")
    rows = gsc_query(service, {**base, "dimensions": ["page"]})
    data["pages"] = [
        {
            "page": r["keys"][0],
            "clicks": r["clicks"],
            "impressions": r["impressions"],
            "ctr": round(r["ctr"] * 100, 2),
            "position": round(r["position"], 1),
        }
        for r in rows
    ]
    data["pages"].sort(key=lambda x: x["clicks"], reverse=True)

    # -- daily trend ------------------------------------------------------
    log.info("  Daily trend…")
    rows = gsc_query(service, {**base, "dimensions": ["date"]})
    data["daily"] = sorted(
        [
            {
                "date": r["keys"][0],
                "clicks": r["clicks"],
                "impressions": r["impressions"],
                "ctr": round(r["ctr"] * 100, 2),
                "position": round(r["position"], 1),
            }
            for r in rows
        ],
        key=lambda x: x["date"],
    )

    # -- device -----------------------------------------------------------
    log.info("  Devices…")
    rows = gsc_query(service, {**base, "dimensions": ["device"]})
    data["devices"] = {r["keys"][0]: r for r in rows}

    # -- country top-10 ---------------------------------------------------
    log.info("  Countries…")
    rows = gsc_query(service, {**base, "dimensions": ["country"]}) 
    rows.sort(key=lambda x: x["clicks"], reverse=True)
    data["countries"] = rows[:15]

    # -- previous period --------------------------------------------------
    log.info("  Previous period…")
    prev_rows = gsc_query(service, {**prev, "dimensions": ["query"]})
    data["prev_queries"] = {r["keys"][0]: r for r in prev_rows}

    prev_page_rows = gsc_query(service, {**prev, "dimensions": ["page"]})
    data["prev_pages"] = {r["keys"][0]: r for r in prev_page_rows}

    # -- overall totals ---------------------------------------------------
    total_clicks     = sum(r["clicks"] for r in data["queries"])
    total_impr       = sum(r["impressions"] for r in data["queries"])
    total_ctr        = (total_clicks / total_impr * 100) if total_impr else 0
    all_positions    = [r["position"] for r in data["queries"] if r["impressions"]]
    avg_position     = sum(all_positions) / len(all_positions) if all_positions else 0

    prev_clicks  = sum(r["clicks"] for r in data["prev_queries"].values())
    prev_impr    = sum(r["impressions"] for r in data["prev_queries"].values())

    data["summary"] = {
        "start_date": start_date,
        "end_date": end_date,
        "total_clicks": total_clicks,
        "total_impressions": total_impr,
        "site_ctr": round(total_ctr, 2),
        "avg_position": round(avg_position, 1),
        "delta_clicks": total_clicks - prev_clicks,
        "delta_impressions": total_impr - prev_impr,
        "delta_clicks_pct": round((total_clicks - prev_clicks) / prev_clicks * 100, 1) if prev_clicks else 0,
        "delta_impr_pct": round((total_impr - prev_impr) / prev_impr * 100, 1) if prev_impr else 0,
        "total_queries": len(data["queries"]),
        "pages_with_clicks": sum(1 for p in data["pages"] if p["clicks"] > 0),
        "pages_total": len(data["pages"]),
    }

    log.info("  Summary: %d clicks, %d impressions over %d days",
             total_clicks, total_impr, days)
    return data


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STRAPI DATA
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def fetch_strapi_articles():
    if not Path(STRAPI_DB).exists():
        log.warning("Strapi DB not found at %s", STRAPI_DB)
        return []
    conn = sqlite3.connect(STRAPI_DB)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT slug, title, locale, published_at, focus_keyphrase, type
            FROM articles
            WHERE published_at IS NOT NULL
            ORDER BY published_at DESC
        """)
        rows = [dict(r) for r in cur.fetchall()]
    except Exception:
        try:
            cur.execute("""
                SELECT slug, title, locale, published_at, focus_keyphrase
                FROM articles WHERE published_at IS NOT NULL
            """)
            rows = [dict(r) for r in cur.fetchall()]
        except Exception as e:
            log.warning("Could not fetch articles from Strapi: %s", e)
            rows = []
    conn.close()
    return rows


def fetch_article_analytics():
    """Fetch pre-synced GSC analytics from Strapi CMS."""
    if not Path(STRAPI_DB).exists():
        return []
    conn = sqlite3.connect(STRAPI_DB)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT slug, title, url, content_type, focus_keyphrase,
                   clicks_28_d AS clicks_28d, impressions_28_d AS impressions_28d,
                   ctr_28_d AS ctr_28d, avg_position_28_d AS avg_position_28d,
                   index_status, top_query, last_synced
            FROM article_analytics
            ORDER BY clicks_28_d DESC
        """)
        rows = [dict(r) for r in cur.fetchall()]
    except Exception as e:
        log.warning("article_analytics not available: %s", e)
        rows = []
    conn.close()
    return rows


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CHART HELPERS  (matplotlib → PNG → ReportLab image bytes)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def _fig_to_img(fig, width_cm=16, height_cm=7):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=150, bbox_inches="tight",
                facecolor=fig.get_facecolor())
    buf.seek(0)
    plt.close(fig)
    return RLImage(buf, width=width_cm * cm, height=height_cm * cm)


def chart_dual_line(dates, series1, series2, label1="Clicks", label2="Impressions",
                    color1="#1B7A3E", color2="#F5A623", width_cm=16, height_cm=6):
    """Two-axis line chart for clicks + impressions over time."""
    fig, ax1 = plt.subplots(figsize=(width_cm / 2.54, height_cm / 2.54))
    fig.patch.set_facecolor("#FAFAFA")
    ax1.set_facecolor("#FAFAFA")

    xs = list(range(len(dates)))

    ln1 = ax1.plot(xs, series1, color=color1, linewidth=2.2, marker="o",
                   markersize=3, label=label1, zorder=3)
    ax1.fill_between(xs, series1, alpha=0.12, color=color1)
    ax1.set_ylabel(label1, color=color1, fontsize=9)
    ax1.tick_params(axis="y", labelcolor=color1, labelsize=8)
    ax1.spines[["top", "right"]].set_visible(False)

    ax2 = ax1.twinx()
    ln2 = ax2.plot(xs, series2, color=color2, linewidth=2.2, linestyle="--",
                   marker="s", markersize=3, label=label2, zorder=3)
    ax2.set_ylabel(label2, color=color2, fontsize=9)
    ax2.tick_params(axis="y", labelcolor=color2, labelsize=8)
    ax2.spines[["top", "left"]].set_visible(False)

    # x-axis labels
    step = max(1, len(dates) // 7)
    ax1.set_xticks(xs[::step])
    ax1.set_xticklabels([d[5:] for d in dates[::step]], fontsize=7, rotation=30)
    ax1.grid(axis="y", alpha=0.3, linestyle="--")

    lines = ln1 + ln2
    labs  = [l.get_label() for l in lines]
    ax1.legend(lines, labs, loc="upper left", fontsize=8, framealpha=0.7)
    fig.tight_layout()
    return _fig_to_img(fig, width_cm, height_cm)


def chart_bar_horizontal(labels, values, title="", color="#1B7A3E",
                          width_cm=16, height_cm=7):
    n = len(labels)
    fig, ax = plt.subplots(figsize=(width_cm / 2.54, height_cm / 2.54))
    fig.patch.set_facecolor("#FAFAFA")
    ax.set_facecolor("#FAFAFA")

    ys = list(range(n))
    bars = ax.barh(ys, values, color=color, height=0.6, alpha=0.85)
    ax.set_yticks(ys)
    ax.set_yticklabels(
        [l[:45] + "…" if len(l) > 45 else l for l in labels],
        fontsize=8,
    )
    ax.invert_yaxis()
    ax.spines[["top", "right", "left"]].set_visible(False)
    ax.tick_params(left=False, labelsize=8)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"{int(x):,}"))
    ax.set_xlabel("Clicks", fontsize=8)

    for bar, val in zip(bars, values):
        ax.text(bar.get_width() + max(values) * 0.01, bar.get_y() + bar.get_height() / 2,
                f"{int(val):,}", va="center", fontsize=7)

    if title:
        ax.set_title(title, fontsize=10, fontweight="bold", pad=8)
    ax.grid(axis="x", alpha=0.3, linestyle="--")
    fig.tight_layout()
    return _fig_to_img(fig, width_cm, height_cm)


def chart_pie(labels, values, colors_list=None, title="", width_cm=10, height_cm=7):
    fig, ax = plt.subplots(figsize=(width_cm / 2.54, height_cm / 2.54))
    fig.patch.set_facecolor("#FAFAFA")
    ax.set_facecolor("#FAFAFA")

    clrs = colors_list or CHART_COLORS[:len(values)]
    wedge_props = {"linewidth": 1.5, "edgecolor": "white"}
    wedges, texts, autotexts = ax.pie(
        values, labels=None, colors=clrs,
        autopct="%1.1f%%", startangle=140,
        wedgeprops=wedge_props, pctdistance=0.75,
    )
    for at in autotexts:
        at.set_fontsize(8)

    ax.legend(
        wedges, [f"{l} ({v:,})" for l, v in zip(labels, values)],
        loc="center left", bbox_to_anchor=(0.85, 0.5),
        fontsize=7, framealpha=0.7,
    )
    if title:
        ax.set_title(title, fontsize=10, fontweight="bold", pad=6)
    fig.tight_layout()
    return _fig_to_img(fig, width_cm, height_cm)


def chart_scatter_opportunity(pages, width_cm=16, height_cm=8):
    """Impressions vs CTR scatter to find SERP opportunities."""
    fig, ax = plt.subplots(figsize=(width_cm / 2.54, height_cm / 2.54))
    fig.patch.set_facecolor("#FAFAFA")
    ax.set_facecolor("#FAFAFA")

    impr  = [p["impressions"] for p in pages]
    ctrs  = [p["ctr"] for p in pages]
    clks  = [p["clicks"] for p in pages]
    sizes = [max(30, min(300, c * 3)) for c in clks]

    sc = ax.scatter(impr, ctrs, s=sizes, c=clks, cmap="YlGn",
                    alpha=0.7, edgecolors="#555", linewidths=0.4)
    cbar = plt.colorbar(sc, ax=ax)
    cbar.set_label("Clicks", fontsize=8)
    cbar.ax.tick_params(labelsize=7)

    # Median lines
    med_impr = np.median(impr) if impr else 0
    med_ctr  = np.median(ctrs) if ctrs else 0
    ax.axvline(med_impr, color="#E74C3C", linestyle="--", alpha=0.5, linewidth=1)
    ax.axhline(med_ctr, color="#E74C3C", linestyle="--", alpha=0.5, linewidth=1)

    ax.set_xlabel("Impressions (28 days)", fontsize=9)
    ax.set_ylabel("CTR (%)", fontsize=9)
    ax.set_title("SERP Opportunity Matrix — High Impressions / Low CTR",
                 fontsize=10, fontweight="bold")
    ax.spines[["top", "right"]].set_visible(False)
    ax.tick_params(labelsize=8)

    # Quadrant labels
    xmax = max(impr) if impr else 1
    ymax = max(ctrs) if ctrs else 1
    ax.text(xmax * 0.95, ymax * 0.95, "★ Best", ha="right", va="top",
            fontsize=8, color="#1B7A3E", alpha=0.6)
    ax.text(xmax * 0.95, med_ctr * 0.3, "⚠ Opportunity", ha="right",
            fontsize=8, color="#E74C3C", alpha=0.6)

    fig.tight_layout()
    return _fig_to_img(fig, width_cm, height_cm)


def chart_position_distribution(queries, width_cm=16, height_cm=6):
    """Donut chart of keyword position buckets."""
    buckets = {"Top 3 (1-3)": 0, "Page 1 (4-10)": 0,
               "Page 2 (11-20)": 0, "Page 3+ (21+)": 0}
    for q in queries:
        p = q["position"]
        if p <= 3:
            buckets["Top 3 (1-3)"] += 1
        elif p <= 10:
            buckets["Page 1 (4-10)"] += 1
        elif p <= 20:
            buckets["Page 2 (11-20)"] += 1
        else:
            buckets["Page 3+ (21+)"] += 1

    labels = list(buckets.keys())
    vals   = list(buckets.values())
    clrs   = ["#1B7A3E", "#2E9D56", "#F5A623", "#E74C3C"]
    return chart_pie(labels, vals, clrs,
                     title="Keyword Position Distribution",
                     width_cm=width_cm, height_cm=height_cm)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# REPORTLAB HELPERS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE_W, PAGE_H = A4
MARGIN = 2 * cm

def build_styles():
    base = getSampleStyleSheet()
    S = {}

    S["h1"] = ParagraphStyle("H1", parent=base["Title"],
        fontName="Helvetica-Bold", fontSize=22, textColor=CBI_DARK,
        spaceAfter=6, leading=26)

    S["h2"] = ParagraphStyle("H2", parent=base["Heading2"],
        fontName="Helvetica-Bold", fontSize=14, textColor=CBI_GREEN,
        spaceBefore=16, spaceAfter=6, leading=18,
        borderPad=4, borderColor=CBI_GREEN, borderWidth=0,
        leftIndent=0)

    S["h3"] = ParagraphStyle("H3", parent=base["Heading3"],
        fontName="Helvetica-Bold", fontSize=11, textColor=CBI_DARK,
        spaceBefore=10, spaceAfter=4)

    S["body"] = ParagraphStyle("Body", parent=base["Normal"],
        fontName="Helvetica", fontSize=9, textColor=BLACK,
        leading=14, spaceAfter=6)

    S["small"] = ParagraphStyle("Small", parent=base["Normal"],
        fontName="Helvetica", fontSize=8, textColor=CBI_NEUTRAL, leading=12)

    S["caption"] = ParagraphStyle("Caption", parent=base["Normal"],
        fontName="Helvetica-Oblique", fontSize=8, textColor=CBI_NEUTRAL,
        alignment=TA_CENTER, spaceAfter=4)

    S["kpi_label"] = ParagraphStyle("KpiLabel",
        fontName="Helvetica", fontSize=8, textColor=CBI_NEUTRAL,
        leading=10, alignment=TA_CENTER)

    S["kpi_value"] = ParagraphStyle("KpiValue",
        fontName="Helvetica-Bold", fontSize=18, textColor=CBI_DARK,
        leading=22, alignment=TA_CENTER)

    S["kpi_delta"] = ParagraphStyle("KpiDelta",
        fontName="Helvetica", fontSize=8, leading=10, alignment=TA_CENTER)

    S["th"] = ParagraphStyle("TH",
        fontName="Helvetica-Bold", fontSize=8, textColor=WHITE,
        alignment=TA_CENTER, leading=11)

    S["td"] = ParagraphStyle("TD",
        fontName="Helvetica", fontSize=8, textColor=BLACK,
        alignment=TA_LEFT, leading=11)

    S["td_num"] = ParagraphStyle("TDNum",
        fontName="Helvetica", fontSize=8, textColor=BLACK,
        alignment=TA_RIGHT, leading=11)

    S["bullet"] = ParagraphStyle("Bullet", parent=base["Normal"],
        fontName="Helvetica", fontSize=9, textColor=BLACK,
        leading=14, leftIndent=14, firstLineIndent=-10, spaceAfter=4)

    return S


def kpi_table(kpis, styles):
    """
    kpis: list of (label, value, delta_str, delta_positive)
    Renders as a single-row Table of KPI cards.
    """
    S = styles
    col_w = (PAGE_W - 2 * MARGIN) / len(kpis)
    cells = []
    for label, value, delta, good in kpis:
        delta_color = "#1B7A3E" if good else "#E74C3C"
        if good is None:
            delta_color = "#6C757D"
        cell_content = [
            Paragraph(label, S["kpi_label"]),
            Spacer(1, 3),
            Paragraph(str(value), S["kpi_value"]),
            Paragraph(delta, ParagraphStyle("D", parent=S["kpi_delta"],
                      textColor=colors.HexColor(delta_color))),
        ]
        cells.append(cell_content)

    tbl = Table([cells], colWidths=[col_w] * len(kpis), rowHeights=[90])
    style = TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CBI_LIGHT),
        ("BOX",        (0, 0), (-1, -1), 0.5, CBI_BORDER),
        ("INNERGRID",  (0, 0), (-1, -1), 0.5, WHITE),
        ("VALIGN",     (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN",      (0, 0), (-1, -1), "CENTER"),
        ("ROUNDEDCORNERS", [4]),
        ("TOPPADDING",  (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ])
    tbl.setStyle(style)
    return tbl


def data_table(headers, rows, styles, col_widths=None,
               zebra=True, highlight_col=None):
    """Generic styled data table."""
    S = styles
    avail_w = PAGE_W - 2 * MARGIN
    n_cols = len(headers)

    if col_widths is None:
        col_widths = [avail_w / n_cols] * n_cols

    # Header row
    header_row = [Paragraph(h, S["th"]) for h in headers]
    table_data = [header_row]

    for i, row in enumerate(rows):
        tr = []
        for j, cell in enumerate(row):
            align = S["td_num"] if isinstance(cell, (int, float)) else S["td"]
            tr.append(Paragraph(str(cell), align))
        table_data.append(tr)

    tbl = Table(table_data, colWidths=col_widths, repeatRows=1)
    ts = [
        ("BACKGROUND", (0, 0), (-1, 0), CBI_GREEN),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, CBI_LIGHT] if zebra else [WHITE]),
        ("GRID",       (0, 0), (-1, -1), 0.4, CBI_BORDER),
        ("VALIGN",     (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("FONTSIZE",   (0, 0), (-1, -1), 8),
    ]
    if highlight_col is not None:
        ts.append(("BACKGROUND", (highlight_col, 1), (highlight_col, -1),
                   colors.HexColor("#D4EDDA")))
    tbl.setStyle(TableStyle(ts))
    return tbl


def section_header(title, styles):
    """Horizontal rule + section title."""
    return [
        HRFlowable(width="100%", thickness=2, color=CBI_GREEN, spaceAfter=4),
        Paragraph(title, styles["h2"]),
    ]


def delta_fmt(val, pct, unit=""):
    if val is None:
        return "—"
    sign  = "▲" if val >= 0 else "▼"
    color = "green" if val >= 0 else "red"
    return f'<font color="{color}">{sign} {abs(val):,}{unit} ({abs(pct):.1f}%)</font>'


def pos_badge(pos):
    if pos <= 3:
        return f'<font color="#1B7A3E">●</font> {pos:.1f}'
    elif pos <= 10:
        return f'<font color="#F5A623">●</font> {pos:.1f}'
    elif pos <= 20:
        return f'<font color="#E67E22">●</font> {pos:.1f}'
    return f'<font color="#E74C3C">●</font> {pos:.1f}'


def fmt_url(url, max_len=50):
    path = url.replace("https://www.centrabiotechindonesia.com", "")
    if not path:
        path = "/"
    if len(path) > max_len:
        path = path[:max_len - 1] + "…"
    return path


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PAGE TEMPLATE  (header / footer on every page)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class HeaderFooterCanvas(canvas.Canvas):
    SKIP_FIRST = True

    def __init__(self, *args, report_meta=None, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []
        self._meta = report_meta or {}
        self._page_num = 0

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()
        self._page_num += 1

    def save(self):
        total = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            page_n = state.get("_pageNumber", 1)
            if page_n > 1:          # skip cover
                self._draw_header_footer(page_n, total)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def _draw_header_footer(self, page_n, total):
        c = self
        w, h = A4

        # ── Header bar
        c.saveState()
        c.setFillColor(CBI_GREEN)
        c.rect(0, h - 1.1 * cm, w, 1.1 * cm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(MARGIN, h - 0.75 * cm, COMPANY_NAME)
        c.setFont("Helvetica", 8)
        title_str = self._meta.get("title", "SEO & SERP Report")
        c.drawRightString(w - MARGIN, h - 0.75 * cm, title_str)
        c.restoreState()

        # ── Footer bar
        c.saveState()
        c.setFillColor(CBI_LIGHT)
        c.rect(0, 0, w, 0.9 * cm, fill=1, stroke=0)
        c.setStrokeColor(CBI_GREEN)
        c.setLineWidth(0.8)
        c.line(0, 0.9 * cm, w, 0.9 * cm)
        c.setFont("Helvetica", 7.5)
        c.setFillColor(CBI_NEUTRAL)
        c.drawString(MARGIN, 0.3 * cm, f"Confidential — {COMPANY_NAME}")
        c.drawCentredString(w / 2, 0.3 * cm,
            f"Generated: {self._meta.get('generated', '')}")
        c.drawRightString(w - MARGIN, 0.3 * cm, f"Page {page_n} of {total}")
        c.restoreState()


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# COVER PAGE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def build_cover(summary, styles):
    S = styles
    W = PAGE_W - 2 * MARGIN

    elements = []

    # Green accent top bar (via colored table)
    top_bar = Table([[""]],
                    colWidths=[W + 2 * MARGIN], rowHeights=[0.5 * cm])
    top_bar.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), CBI_GREEN)]))

    # ── Big cover image / color block
    cover_block = Table(
        [[Paragraph("GSC", ParagraphStyle("CV",
             fontName="Helvetica-Bold", fontSize=72,
             textColor=colors.HexColor("#FFFFFF40"),
             alignment=TA_RIGHT))]],
        colWidths=[W + 2 * MARGIN], rowHeights=[6 * cm],
    )
    cover_block.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), CBI_DARK),
        ("VALIGN",     (0,0), (-1,-1), "BOTTOM"),
        ("RIGHTPADDING", (0,0), (-1,-1), 20),
    ]))

    elements += [
        Spacer(1, 3.5 * cm),
        cover_block,
        Spacer(1, 0.8 * cm),
    ]

    # Title block
    elements.append(Paragraph(
        "Enterprise SEO &amp; Google SERP Report",
        ParagraphStyle("CVTitle", fontName="Helvetica-Bold", fontSize=26,
                       textColor=CBI_DARK, leading=32, spaceAfter=6)
    ))
    elements.append(Paragraph(
        COMPANY_NAME,
        ParagraphStyle("CVSub", fontName="Helvetica", fontSize=13,
                       textColor=CBI_NEUTRAL, spaceAfter=4)
    ))
    elements.append(HRFlowable(width=W, thickness=2, color=CBI_GREEN, spaceAfter=10))

    # Period info
    period_data = [
        ["Report Period",
         f"{summary['start_date']} → {summary['end_date']} ({REPORT_PERIOD} days)"],
        ["Property",    GSC_SITE_URL],
        ["Domain",      COMPANY_TAG],
        ["Generated",   datetime.now().strftime("%d %B %Y, %H:%M UTC")],
        ["Classification", "Confidential / Internal"],
    ]
    t = Table(period_data, colWidths=[4 * cm, W - 4 * cm])
    t.setStyle(TableStyle([
        ("FONTNAME",  (0,0), (0,-1), "Helvetica-Bold"),
        ("FONTNAME",  (1,0), (1,-1), "Helvetica"),
        ("FONTSIZE",  (0,0), (-1,-1), 9),
        ("TEXTCOLOR", (0,0), (0,-1), CBI_DARK),
        ("TEXTCOLOR", (1,0), (1,-1), CBI_NEUTRAL),
        ("LINEAFTER", (0,0), (0,-1), 0.5, CBI_BORDER),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (1,0), (1,-1), 10),
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, CBI_LIGHT]),
    ]))
    elements.append(t)

    # Disclaimer
    elements += [
        Spacer(1, 1 * cm),
        Paragraph(
            "This report is generated automatically using live Google Search Console data "
            "and Strapi CMS article inventory. All performance metrics are based on the "
            f"last {REPORT_PERIOD} days relative to the generation date. "
            "Distribution is restricted to authorized personnel only.",
            ParagraphStyle("Disc", fontName="Helvetica-Oblique", fontSize=8,
                           textColor=CBI_NEUTRAL, leading=12),
        ),
    ]

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 1 — EXECUTIVE SUMMARY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_executive(gsc, articles, analytics, styles):
    S  = styles
    sm = gsc["summary"]
    elements = []

    elements += section_header("01 — Executive Summary", S)
    elements.append(Paragraph(
        f"Performance snapshot for <b>{sm['start_date']}</b> to <b>{sm['end_date']}</b> "
        f"({REPORT_PERIOD} days). Compared to the previous {PREV_PERIOD}-day window.",
        S["body"],
    ))
    elements.append(Spacer(1, 6))

    # KPI cards
    kpis = [
        ("Total Clicks",       f"{sm['total_clicks']:,}",
         delta_fmt(sm['delta_clicks'], sm['delta_clicks_pct']),
         sm['delta_clicks'] >= 0),
        ("Total Impressions",  f"{sm['total_impressions']:,}",
         delta_fmt(sm['delta_impressions'], sm['delta_impr_pct']),
         sm['delta_impressions'] >= 0),
        ("Avg. CTR",           f"{sm['site_ctr']:.2f}%", "— vs prior period", None),
        ("Avg. Position",      f"{sm['avg_position']:.1f}", "Overall ranking", None),
        ("Unique Queries",     f"{sm['total_queries']:,}", "Distinct keywords", None),
        ("Pages w/ Clicks",    f"{sm['pages_with_clicks']:,}", f"of {sm['pages_total']} discovered", None),
    ]
    elements.append(kpi_table(kpis, S))
    elements.append(Spacer(1, 10))

    # Quick insights
    q_data = gsc["queries"]
    p_data = gsc["pages"]
    top_q  = q_data[0] if q_data else None
    top_p  = p_data[0] if p_data else None

    opportunity = [p for p in p_data
                   if p["impressions"] > 200 and p["ctr"] < sm["site_ctr"]]
    quick_wins  = [q for q in q_data if 4 <= q["position"] <= 15]
    indexed_cnt = sum(1 for a in analytics if a.get("index_status") == "indexed") if analytics else 0
    total_cnt   = len(analytics) if analytics else len(articles)

    insights = [
        f"<b>Top keyword:</b> <i>{top_q['query'] if top_q else '—'}</i> — "
        f"{top_q['clicks']:,} clicks, position {top_q['position']:.1f}" if top_q else "",
        f"<b>Best page:</b> {fmt_url(top_p['page']) if top_p else '—'} — "
        f"{top_p['clicks']:,} clicks" if top_p else "",
        f"<b>SERP opportunities:</b> {len(opportunity)} pages with high impressions but below-average CTR.",
        f"<b>Quick wins:</b> {len(quick_wins)} keywords ranked 4–15, close to top-3.",
        f"<b>Content indexed:</b> {indexed_cnt} of {total_cnt} articles tracked in GSC.",
        f"<b>Content portfolio:</b> {len([a for a in articles if a.get('type') == 'blog'])} blog posts, "
        f"{len([a for a in articles if a.get('type') == 'news'])} news articles." if articles else "",
    ]
    for ins in insights:
        if ins:
            elements.append(Paragraph(f"• {ins}", S["bullet"]))

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 2 — SEARCH PERFORMANCE TREND
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_trend(gsc, styles):
    S  = styles
    daily = gsc["daily"]
    elements = []

    elements += section_header("02 — Search Performance Trend (28 Days)", S)
    elements.append(Paragraph(
        "Daily clicks and impressions over the report period. "
        "A dual-axis chart allows comparison of volume (impressions) vs. engagement (clicks).",
        S["body"],
    ))
    elements.append(Spacer(1, 6))

    if daily:
        dates  = [d["date"] for d in daily]
        clicks = [d["clicks"] for d in daily]
        imprs  = [d["impressions"] for d in daily]

        img = chart_dual_line(dates, clicks, imprs,
                              label1="Clicks", label2="Impressions")
        elements.append(img)
        elements.append(Paragraph(
            f"Fig 1. Daily clicks (green) and impressions (amber) — "
            f"{dates[0]} to {dates[-1]}",
            S["caption"],
        ))
        elements.append(Spacer(1, 8))

        # CTR & position trend
        ctrs = [d["ctr"] for d in daily]
        poss = [d["position"] for d in daily]
        ctr_img = chart_dual_line(
            dates, ctrs, poss,
            label1="CTR (%)", label2="Avg Position",
            color1="#3498DB", color2="#E74C3C",
            height_cm=5,
        )
        elements.append(ctr_img)
        elements.append(Paragraph(
            "Fig 2. Daily CTR (%) and average search position — lower position = better ranking.",
            S["caption"],
        ))

        # Weekly summary table
        elements.append(Spacer(1, 8))
        elements.append(Paragraph("Weekly Summary", S["h3"]))
        weeks = defaultdict(lambda: {"clicks": 0, "impressions": 0, "dates": []})
        for d in daily:
            dt   = datetime.strptime(d["date"], "%Y-%m-%d")
            week = dt.strftime("W%V %Y")
            weeks[week]["clicks"]      += d["clicks"]
            weeks[week]["impressions"] += d["impressions"]
            weeks[week]["dates"].append(d["date"])

        w_rows = []
        for week, vals in sorted(weeks.items()):
            avg_pos = sum(d["position"] for d in daily
                          if d["date"] in vals["dates"]) / len(vals["dates"])
            ctr_w   = vals["clicks"] / vals["impressions"] * 100 if vals["impressions"] else 0
            w_rows.append([
                week,
                f"{vals['clicks']:,}",
                f"{vals['impressions']:,}",
                f"{ctr_w:.2f}%",
                f"{avg_pos:.1f}",
            ])
        avail = PAGE_W - 2 * MARGIN
        tbl = data_table(
            ["Week", "Clicks", "Impressions", "CTR", "Avg Position"],
            w_rows, S,
            col_widths=[3.5*cm, 2.5*cm, 3.5*cm, 2.5*cm, 3*cm],
        )
        elements.append(tbl)

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 3 — TOP QUERIES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_queries(gsc, styles):
    S = styles
    elements = []
    queries  = gsc["queries"]
    prev_q   = gsc["prev_queries"]

    elements += section_header("03 — Top Keywords & Queries", S)
    elements.append(Paragraph(
        f"Top {min(25, len(queries))} queries ranked by clicks. "
        f"Total {len(queries):,} unique keywords drove traffic in this period.",
        S["body"],
    ))
    elements.append(Spacer(1, 6))

    # Position distribution donut
    if queries:
        pos_img = chart_position_distribution(queries, width_cm=16, height_cm=6)
        elements.append(pos_img)
        elements.append(Paragraph(
            "Fig 3. Distribution of all tracked keywords by SERP position bucket.",
            S["caption"],
        ))
        elements.append(Spacer(1, 6))

    # Top-15 bar chart  
    if queries:
        top15 = queries[:15]
        bar_img = chart_bar_horizontal(
            [q["query"] for q in top15],
            [q["clicks"] for q in top15],
            title="Top 15 Keywords by Clicks",
        )
        elements.append(bar_img)
        elements.append(Paragraph("Fig 4. Top 15 keywords ranked by total clicks (28 days).", S["caption"]))
        elements.append(Spacer(1, 8))

    # Full top-25 table
    elements.append(Paragraph("Top 25 Queries — Full Data", S["h3"]))
    rows = []
    for i, q in enumerate(queries[:25], 1):
        prev = prev_q.get(q["query"])
        prev_clicks = prev["clicks"] if prev else 0
        delta = q["clicks"] - prev_clicks
        delta_str = f"+{delta:,}" if delta >= 0 else f"{delta:,}"
        rows.append([
            str(i),
            q["query"],
            f"{q['clicks']:,}",
            f"{q['impressions']:,}",
            f"{q['ctr']:.2f}%",
            pos_badge(q["position"]),
            delta_str,
        ])

    col_w = [0.8*cm, 6.5*cm, 2*cm, 2.8*cm, 1.8*cm, 2*cm, 2*cm]
    tbl = data_table(
        ["#", "Query", "Clicks", "Impressions", "CTR", "Position", "Δ Clicks"],
        rows, S, col_widths=col_w,
    )
    elements.append(tbl)
    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 4 — TOP PAGES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_pages(gsc, styles):
    S = styles
    pages  = gsc["pages"]
    prev_p = gsc["prev_pages"]
    elements = []

    elements += section_header("04 — Top Pages Performance", S)
    elements.append(Paragraph(
        f"Top {min(25, len(pages))} pages by clicks. "
        f"{gsc['summary']['pages_with_clicks']:,} pages received at least one click; "
        f"{gsc['summary']['pages_total']:,} total pages discovered in Google.",
        S["body"],
    ))
    elements.append(Spacer(1, 6))

    if pages:
        top15 = pages[:15]
        bar_img = chart_bar_horizontal(
            [fmt_url(p["page"]) for p in top15],
            [p["clicks"] for p in top15],
            title="Top 15 Pages by Clicks",
            color="#2E9D56",
        )
        elements.append(bar_img)
        elements.append(Paragraph("Fig 5. Top 15 pages ranked by total clicks (28 days).", S["caption"]))
        elements.append(Spacer(1, 8))

    elements.append(Paragraph("Top 25 Pages — Full Data", S["h3"]))
    rows = []
    for i, p in enumerate(pages[:25], 1):
        prev     = prev_p.get(p["page"])
        prev_clk = prev["clicks"] if prev else 0
        delta    = p["clicks"] - prev_clk
        delta_s  = f"+{delta:,}" if delta >= 0 else f"{delta:,}"
        rows.append([
            str(i),
            fmt_url(p["page"], max_len=45),
            f"{p['clicks']:,}",
            f"{p['impressions']:,}",
            f"{p['ctr']:.2f}%",
            pos_badge(p["position"]),
            delta_s,
        ])

    col_w = [0.8*cm, 6.5*cm, 2*cm, 2.8*cm, 1.8*cm, 2*cm, 2*cm]
    tbl = data_table(
        ["#", "Page URL", "Clicks", "Impressions", "CTR", "Position", "Δ Clicks"],
        rows, S, col_widths=col_w,
    )
    elements.append(tbl)
    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 5 — SERP OPPORTUNITY MATRIX
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_opportunity(gsc, styles):
    S  = styles
    sm = gsc["summary"]
    pages = gsc["pages"]
    elements = []

    elements += section_header("05 — SERP Opportunity Matrix", S)
    elements.append(Paragraph(
        "Pages that appear frequently in Google search results (high impressions) "
        "but fail to convert those appearances into clicks (low CTR) represent "
        "<b>immediate optimization opportunities</b>. Improving titles, meta descriptions, "
        "and structured data on these pages can multiply traffic without additional content effort.",
        S["body"],
    ))
    elements.append(Spacer(1, 6))

    # Scatter chart
    if len(pages) >= 5:
        scatter = chart_scatter_opportunity(pages[:80])
        elements.append(scatter)
        elements.append(Paragraph(
            "Fig 6. Impressions vs CTR scatter — pages in lower-right quadrant "
            "(high impressions, low CTR) are prime optimization targets.",
            S["caption"],
        ))
        elements.append(Spacer(1, 8))

    # Opportunity table
    avg_ctr = sm["site_ctr"]
    opps    = sorted(
        [p for p in pages if p["impressions"] >= 100 and p["ctr"] < avg_ctr],
        key=lambda x: x["impressions"],
        reverse=True,
    )[:20]

    if opps:
        elements.append(Paragraph(
            f"High-Priority Pages (≥100 impressions, CTR below site average {avg_ctr:.2f}%)",
            S["h3"],
        ))
        rows = []
        for i, p in enumerate(opps, 1):
            ctr_gap = avg_ctr - p["ctr"]
            pot_clicks = int(p["impressions"] * avg_ctr / 100)
            rows.append([
                str(i),
                fmt_url(p["page"], 42),
                f"{p['impressions']:,}",
                f"{p['ctr']:.2f}%",
                f"+{ctr_gap:.2f}%",
                f"~{pot_clicks:,}",
                pos_badge(p["position"]),
            ])
        col_w = [0.8*cm, 6*cm, 2.5*cm, 1.8*cm, 1.8*cm, 2*cm, 2*cm]
        tbl = data_table(
            ["#", "Page URL", "Impressions", "CTR", "CTR Gap", "Pot. Clicks", "Position"],
            rows, S, col_widths=col_w, highlight_col=4,
        )
        elements.append(tbl)
    else:
        elements.append(Paragraph("No significant opportunity pages found in this period.", S["body"]))

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 6 — QUICK-WIN KEYWORDS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_quick_wins(gsc, styles):
    S  = styles
    queries = gsc["queries"]
    elements = []

    elements += section_header("06 — Quick-Win Keywords (Position 4–15)", S)
    elements.append(Paragraph(
        "Keywords currently ranking in positions 4–15 are <b>just outside top-3</b>. "
        "Small improvements to on-page SEO, internal linking, or structured data "
        "can push them into top-3, dramatically increasing clicks.",
        S["body"],
    ))
    elements.append(Spacer(1, 6))

    wins = [q for q in queries if 3.5 <= q["position"] <= 15]
    wins.sort(key=lambda x: (x["position"], -x["impressions"]))

    if wins:
        elements.append(Paragraph(
            f"{len(wins)} quick-win keywords identified. Showing top 30 by search volume:",
            S["body"],
        ))
        elements.append(Spacer(1, 4))

        top_w = sorted(wins, key=lambda x: x["impressions"], reverse=True)[:30]
        rows = []
        for i, q in enumerate(top_w, 1):
            gap  = q["position"] - 1
            prio = "🔥 High" if q["position"] <= 7 else "Medium"
            rows.append([
                str(i),
                q["query"],
                f"{q['clicks']:,}",
                f"{q['impressions']:,}",
                f"{q['ctr']:.2f}%",
                pos_badge(q["position"]),
                prio,
            ])
        col_w = [0.8*cm, 6.5*cm, 2*cm, 2.8*cm, 1.8*cm, 2*cm, 2*cm]
        tbl = data_table(
            ["#", "Keyword", "Clicks", "Impressions", "CTR", "Position", "Priority"],
            rows, S, col_widths=col_w, highlight_col=5,
        )
        elements.append(tbl)
    else:
        elements.append(Paragraph("No quick-win keywords found in positions 4–15.", S["body"]))

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 7 — DEVICE & COUNTRY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_devices_countries(gsc, styles):
    S = styles
    devs      = gsc["devices"]
    countries = gsc["countries"]
    elements  = []

    elements += section_header("07 — Device & Country Breakdown", S)
    elements.append(Spacer(1, 6))

    avail = PAGE_W - 2 * MARGIN

    if devs:
        dev_labels = []
        dev_vals   = []
        for dev, row in devs.items():
            dev_labels.append(dev.capitalize())
            dev_vals.append(row["clicks"])

        dev_img = chart_pie(
            dev_labels, dev_vals,
            colors_list=["#1B7A3E", "#F5A623", "#3498DB"],
            title="Traffic by Device Type",
            width_cm=9, height_cm=6,
        )

        # Device table
        d_rows = []
        for dev, row in sorted(devs.items(), key=lambda x: x[1]["clicks"], reverse=True):
            total_c = sum(r["clicks"] for r in devs.values()) or 1
            pct = row["clicks"] / total_c * 100
            d_rows.append([
                dev.capitalize(),
                f"{row['clicks']:,}",
                f"{row['impressions']:,}",
                f"{row['ctr']*100:.2f}%",
                f"{row['position']:.1f}",
                f"{pct:.1f}%",
            ])
        d_tbl = data_table(
            ["Device", "Clicks", "Impressions", "CTR", "Position", "Share"],
            d_rows, S,
            col_widths=[3*cm, 2.5*cm, 3*cm, 2*cm, 2.5*cm, 2*cm],
        )

        combined = Table(
            [[dev_img, d_tbl]],
            colWidths=[avail * 0.45, avail * 0.55],
        )
        combined.setStyle(TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING",  (1,0), (1,-1), 10),
        ]))
        elements.append(combined)
        elements.append(Spacer(1, 12))

    if countries:
        elements.append(Paragraph("Top Countries by Clicks", S["h3"]))
        c_rows = []
        total_c = sum(r["clicks"] for r in countries) or 1
        for i, row in enumerate(countries[:15], 1):
            pct = row["clicks"] / total_c * 100
            c_rows.append([
                str(i),
                row["keys"][0].upper(),
                f"{row['clicks']:,}",
                f"{row['impressions']:,}",
                f"{row['ctr']*100:.2f}%",
                f"{row['position']:.1f}",
                f"{pct:.1f}%",
            ])
        tbl = data_table(
            ["#", "Country", "Clicks", "Impressions", "CTR", "Position", "Share"],
            c_rows, S,
            col_widths=[0.8*cm, 2.5*cm, 2.5*cm, 3*cm, 2*cm, 2.5*cm, 2*cm],
        )
        elements.append(tbl)

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 8 — CONTENT PORTFOLIO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_content(articles, analytics, gsc, styles):
    S = styles
    elements = []

    elements += section_header("08 — Content Portfolio Analysis", S)
    elements.append(Spacer(1, 6))

    if not analytics:
        elements.append(Paragraph(
            "No article analytics data available. Run the sync script to populate.",
            S["body"],
        ))
        elements.append(PageBreak())
        return elements

    # Index status pie
    status_counts = defaultdict(int)
    for a in analytics:
        status_counts[a.get("index_status", "unknown")] += 1

    avail = PAGE_W - 2 * MARGIN

    pie_img = chart_pie(
        [k.replace("_", " ").title() for k in status_counts.keys()],
        list(status_counts.values()),
        colors_list=["#1B7A3E", "#F5A623", "#E74C3C", "#3498DB"],
        title="Content Index Status",
        width_cm=8, height_cm=6,
    )

    # Content type split
    ct_counts = defaultdict(int)
    for a in analytics:
        ct_counts[a.get("content_type", "unknown")] += 1
    ct_img = chart_pie(
        [k.title() for k in ct_counts.keys()],
        list(ct_counts.values()),
        colors_list=CHART_COLORS,
        title="Content Type Distribution",
        width_cm=8, height_cm=6,
    )

    pie_row = Table([[pie_img, ct_img]], colWidths=[avail / 2, avail / 2])
    pie_row.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP")]))
    elements.append(pie_row)
    elements.append(Spacer(1, 8))

    # Top-performing articles
    elements.append(Paragraph("Top 20 Articles by Clicks", S["h3"]))
    top_art = [a for a in analytics if a.get("clicks_28d", 0) > 0][:20]
    rows = []
    for i, a in enumerate(top_art, 1):
        rows.append([
            str(i),
            (a.get("title") or a.get("slug") or "—")[:50],
            a.get("content_type", "—").title(),
            f"{a.get('clicks_28d', 0):,}",
            f"{a.get('impressions_28d', 0):,}",
            f"{float(a.get('ctr_28d', 0)):.2f}%",
            f"{float(a.get('avg_position_28d', 0)):.1f}",
            (a.get("index_status") or "—").replace("_", " ").title(),
        ])
    if rows:
        col_w = [0.8*cm, 5.5*cm, 1.8*cm, 1.8*cm, 2.5*cm, 1.5*cm, 1.8*cm, 2.5*cm]
        tbl = data_table(
            ["#", "Title", "Type", "Clicks", "Impressions", "CTR", "Pos", "Status"],
            rows, S, col_widths=col_w,
        )
        elements.append(tbl)
    else:
        elements.append(Paragraph("No article click data available for this period.", S["body"]))

    elements.append(PageBreak())
    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SECTION 9 — RECOMMENDATIONS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def section_recommendations(gsc, analytics, styles):
    S  = styles
    sm = gsc["summary"]
    pages   = gsc["pages"]
    queries = gsc["queries"]
    elements = []

    elements += section_header("09 — Actionable Recommendations", S)
    elements.append(Paragraph(
        "Data-driven priorities derived from this report's findings. "
        "Ranked by estimated impact vs. implementation effort.",
        S["body"],
    ))
    elements.append(Spacer(1, 8))

    avg_ctr    = sm["site_ctr"]
    quick_wins = [q for q in queries if 3.5 <= q["position"] <= 10]
    opps       = [p for p in pages if p["impressions"] >= 100 and p["ctr"] < avg_ctr]
    no_index   = [a for a in (analytics or []) if a.get("index_status") not in ("indexed",)]

    rec_data = [
        ["Priority", "Action", "Impact", "Effort", "Detail"],
    ]

    recs = [
        {
            "p": "🔴 Critical",
            "a": "Fix Title & Meta Description on Opportunity Pages",
            "i": "High",
            "e": "Low",
            "d": f"{len(opps)} pages have ≥100 impressions but CTR below site average ({avg_ctr:.2f}%). "
                 "Rewrite their title tags and meta descriptions to include "
                 "a clear call-to-action and primary keyword.",
        },
        {
            "p": "🔴 Critical",
            "a": "Accelerate Quick-Win Keywords to Top 3",
            "i": "High",
            "e": "Medium",
            "d": f"{len(quick_wins)} keywords rank 4–10. Add internal links from high-authority pages, "
                 "expand content depth, and optimize H1/H2 tags for these specific queries.",
        },
        {
            "p": "🟠 High",
            "a": "Ensure All Articles Are Indexed",
            "i": "High",
            "e": "Low",
            "d": f"{len(no_index)} tracked articles appear not indexed or status unknown. "
                 "Submit a refreshed sitemap, check robots.txt, and request indexing via GSC URL Inspection.",
        },
        {
            "p": "🟠 High",
            "a": "Add Structured Data (FAQ / HowTo / Article Schema)",
            "i": "High",
            "e": "Medium",
            "d": "Rich snippets increase CTR by 20–30% on average. "
                 "Implement Article schema on all blog posts and FAQ schema on product pages.",
        },
        {
            "p": "🟡 Medium",
            "a": "Improve Mobile CTR — Mobile share is significant",
            "i": "Medium",
            "e": "Medium",
            "d": "Optimize page load speed (Core Web Vitals), reduce CLS/LCP on mobile. "
                 "Use Google PageSpeed Insights for page-level recommendations.",
        },
        {
            "p": "🟡 Medium",
            "a": "Develop Content for Branded + Long-Tail Keywords",
            "i": "Medium",
            "e": "High",
            "d": "Branded queries (company name) dominate top clicks. "
                 "Create TOFU content targeting long-tail agricultural/biotech keywords "
                 f"to grow new audience beyond the existing {sm['total_queries']:,} tracked queries.",
        },
        {
            "p": "🟢 Low",
            "a": "Build Internal Link Strategy",
            "i": "Medium",
            "e": "Low",
            "d": "Cross-link related blog posts and product pages. "
                 "Prioritize links to pages currently in positions 4–15 to boost page authority.",
        },
        {
            "p": "🟢 Low",
            "a": "Monthly GSC Report Review Cadence",
            "i": "Low",
            "e": "Low",
            "d": "Establish a monthly review of this automated report. "
                 "Track position deltas, CTR changes, and new indexing opportunities "
                 "to maintain SEO momentum.",
        },
    ]

    rows = [[r["p"], r["a"], r["i"], r["e"], r["d"]] for r in recs]
    col_w = [2.2*cm, 4.5*cm, 1.5*cm, 1.5*cm, 8.2*cm]
    tbl = data_table(
        ["Priority", "Action", "Impact", "Effort", "Details"],
        rows, S, col_widths=col_w,
    )
    elements.append(tbl)
    elements.append(Spacer(1, 12))

    # Next steps
    elements.append(Paragraph("30-Day Action Plan", S["h3"]))
    next_steps = [
        "<b>Week 1:</b> Audit and rewrite title/meta for all Opportunity pages (from Section 05).",
        "<b>Week 2:</b> Add internal links to Quick-Win keywords; submit updated sitemap to GSC.",
        "<b>Week 3:</b> Implement FAQ/Article schema markup on top 20 blog posts.",
        "<b>Week 4:</b> Review Core Web Vitals; fix mobile layout issues; publish 2 new long-tail articles.",
        "<b>Month 2:</b> Re-run this report and compare position/CTR deltas per action.",
    ]
    for step in next_steps:
        elements.append(Paragraph(f"• {step}", S["bullet"]))

    return elements


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# MAIN PDF BUILDER
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def build_pdf(gsc, articles, analytics, output_path):
    log.info("Building enterprise PDF report → %s", output_path)
    styles = build_styles()

    meta = {
        "title": "CBI SEO & SERP Report",
        "generated": datetime.utcnow().strftime("%d %b %Y %H:%M UTC"),
    }

    def make_canvas(filename, **kwargs):
        return HeaderFooterCanvas(filename, pagesize=A4, report_meta=meta)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN + 1 * cm, bottomMargin=MARGIN + 0.5 * cm,
        title=meta["title"],
        author=COMPANY_NAME,
        subject=f"GSC SEO Report — {gsc['summary']['start_date']} to {gsc['summary']['end_date']}",
    )

    story = []
    story += build_cover(gsc["summary"], styles)
    story += section_executive(gsc, articles, analytics, styles)
    story += section_trend(gsc, styles)
    story += section_queries(gsc, styles)
    story += section_pages(gsc, styles)
    story += section_opportunity(gsc, styles)
    story += section_quick_wins(gsc, styles)
    story += section_devices_countries(gsc, styles)
    story += section_content(articles, analytics, gsc, styles)
    story += section_recommendations(gsc, analytics, styles)

    doc.build(story, canvasmaker=make_canvas)
    log.info("PDF saved: %s (%.1f KB)", output_path, output_path.stat().st_size / 1024)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ENTRY POINT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def main():
    import argparse
    parser = argparse.ArgumentParser(description="CBI GSC Enterprise PDF Report Generator")
    parser.add_argument("--days",    type=int, default=REPORT_PERIOD, help="Report period in days")
    parser.add_argument("--output",  type=str, default=None, help="Output PDF path")
    parser.add_argument("--date",    type=str, default=None,
                        help="End date YYYY-MM-DD (default: yesterday)")
    args = parser.parse_args()

    end_date = args.date or (datetime.utcnow() - timedelta(days=1)).strftime("%Y-%m-%d")

    output_file = Path(args.output) if args.output else (
        REPORT_DIR / f"CBI_SEO_SERP_Report_{end_date}.pdf"
    )

    log.info("=" * 60)
    log.info("CBI Enterprise SEO & SERP Report Generator")
    log.info("=" * 60)
    log.info("Period : last %d days ending %s", args.days, end_date)
    log.info("Output : %s", output_file)

    # 1. Auth
    creds   = get_creds()
    service = build("searchconsole", "v1", credentials=creds)

    # 2. Fetch GSC data
    gsc_data = fetch_all_data(service, end_date, days=args.days)

    # 3. Fetch Strapi data
    log.info("Fetching Strapi article inventory…")
    articles  = fetch_strapi_articles()
    analytics = fetch_article_analytics()
    log.info("  %d articles, %d with analytics", len(articles), len(analytics))

    # 4. Build PDF
    build_pdf(gsc_data, articles, analytics, output_file)

    log.info("=" * 60)
    log.info("REPORT COMPLETE: %s", output_file)
    log.info("=" * 60)
    return str(output_file)


if __name__ == "__main__":
    main()
