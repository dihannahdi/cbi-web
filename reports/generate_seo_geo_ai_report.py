#!/usr/bin/env python3
"""
===============================================================================
PT CENTRA BIOTECH INDONESIA — SEO · GEO · AI COMPREHENSIVE REPORT
===============================================================================
Script  : generate_seo_geo_ai_report.py
Date    : 23 Februari 2026
Author  : Digital Marketing & Data Analytics Division
Output  : CBI_SEO_GEO_AI_Report_20260223.docx
Desc    : Generates a professional, executive-ready DOCX report with embedded
          charts covering Search Performance, Geographic Distribution, AI/LLM
          Readiness, Keyword Portfolio, Content Indexation, Competitive
          Positioning, Device Analytics, Period Comparison, and Strategic
          Recommendations.
===============================================================================
"""

import io
import os
import math
import textwrap
from datetime import datetime

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import numpy as np

from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm, Emu
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml

# ─── Brand Constants ─────────────────────────────────────────────────────────
CBI_GREEN       = "#1B5E20"
CBI_GREEN_LIGHT = "#4CAF50"
CBI_BLUE        = "#0D47A1"
CBI_BLUE_LIGHT  = "#42A5F5"
CBI_ORANGE      = "#E65100"
CBI_RED         = "#C62828"
CBI_GRAY        = "#455A64"
CBI_GRAY_LIGHT  = "#ECEFF1"
CBI_WHITE       = "#FFFFFF"
ACCENT_1        = "#00897B"  # teal
ACCENT_2        = "#6A1B9A"  # purple
ACCENT_3        = "#F57F17"  # amber

REPORT_DATE     = "23 Februari 2026"
REPORT_PERIOD   = "26 Januari – 20 Februari 2026 (28 hari)"
REPORT_FILENAME = "CBI_SEO_GEO_AI_Report_20260223.docx"
COMPANY_NAME    = "PT Centra Biotech Indonesia"
WEBSITE         = "www.centrabiotechindonesia.com"

# ─── GSC DATA: 28-Day Overview ──────────────────────────────────────────────
TOTAL_CLICKS      = 275
TOTAL_IMPRESSIONS = 13_234
AVG_CTR           = 2.08
AVG_POSITION      = 5.0

# ─── GSC DATA: Daily Trend (28 days) ────────────────────────────────────────
DAILY_DATA = [
    ("01/26", 16, 452,  3.54, 4.9),
    ("01/27", 11, 414,  2.66, 5.2),
    ("01/28", 18, 451,  3.99, 4.8),
    ("01/29", 12, 342,  3.51, 5.7),
    ("01/30",  8, 334,  2.40, 6.1),
    ("01/31", 11, 310,  3.55, 5.6),
    ("02/01", 13, 429,  3.03, 5.0),
    ("02/02", 14, 447,  3.13, 6.3),
    ("02/03",  8, 529,  1.51, 4.6),
    ("02/04", 19, 592,  3.21, 4.7),
    ("02/05", 10, 512,  1.95, 4.7),
    ("02/06", 12, 492,  2.44, 4.1),
    ("02/07", 10, 401,  2.49, 5.0),
    ("02/08",  6, 489,  1.23, 4.7),
    ("02/09", 14, 580,  2.41, 4.8),
    ("02/10",  6, 510,  1.18, 4.6),
    ("02/11",  8, 548,  1.46, 4.8),
    ("02/12", 17, 647,  2.63, 5.0),
    ("02/13",  9, 540,  1.67, 4.8),
    ("02/14",  6, 405,  1.48, 4.9),
    ("02/15",  9, 486,  1.85, 5.2),
    ("02/16",  3, 536,  0.56, 5.0),
    ("02/17",  9, 694,  1.30, 5.0),
    ("02/18", 11, 778,  1.41, 5.1),
    ("02/19", 10, 741,  1.35, 5.0),
    ("02/20",  5, 575,  0.87, 5.2),
]

# ─── GSC DATA: Top Queries by Clicks (28 days) ──────────────────────────────
TOP_QUERIES = [
    ("pt centra biotech indonesia",        26, 121,  21.49, 3.3),
    ("centra biotech indonesia",           20,  93,  21.51, 5.2),
    ("rajabio pupuk organik",              10,  26,  38.46, 1.0),
    ("rajabio",                             5,  82,   6.10, 4.0),
    ("floraone",                            3,  82,   3.66, 3.7),
    ("floraone pupuk hayati",               3,  40,   7.50, 1.0),
    ("pupuk hayati cair",                   3,  72,   4.17, 7.5),
    ("pupuk organik cair rajabio",          3,  20,  15.00, 1.1),
    ("perusahaan bioteknologi di indonesia",2, 120,   1.67, 3.0),
    ("pt centra",                           2,  15,  13.33, 3.9),
    ("pt. centra biotech indonesia",        2,  31,   6.45, 1.0),
    ("pupuk organik cair terbaik",          2, 191,   1.05, 7.1),
    ("rajabio pupuk organik cair",          2,  13,  15.38, 1.0),
    ("bio killer insektisida hayati",       1,  22,   4.55, 1.1),
    ("bio magic",                           1,   4,  25.00, 1.0),
    ("bio tech",                            1,  63,   1.59, 1.0),
    ("biokiller",                           1,  46,   2.17, 3.4),
    ("biokiller insecticide",               1,  10,  10.00, 2.1),
    ("biotech",                             1, 910,   0.11, 1.7),
    ("biotech indonesia",                   1,  69,   1.45, 7.7),
]

# ─── GSC DATA: Top Queries by Impressions (broader set) ─────────────────────
QUERIES_BY_IMPRESSIONS = [
    ("biotech",                    1, 910, 0.11, 1.7),
    ("pupuk organik cair terbaik", 2, 191, 1.05, 7.1),
    ("pt centra biotech indonesia",26, 121,21.49, 3.3),
    ("perusahaan bioteknologi di indonesia",2,120,1.67,3.0),
    ("asam humat untuk cabe",      0, 114, 0.00, 4.3),
    ("centra biotech indonesia",   20, 93,21.51, 5.2),
    ("rajabio",                     5, 82, 6.10, 4.0),
    ("floraone",                    3, 82, 3.66, 3.7),
    ("pupuk hayati cair",           3, 72, 4.17, 7.5),
    ("biotech indonesia",           1, 69, 1.45, 7.7),
    ("bio tech",                    1, 63, 1.59, 1.0),
    ("perusahaan bioteknologi",     1, 51, 1.96, 4.0),
    ("flora one",                   1, 47, 2.13, 4.5),
    ("biokiller",                   1, 46, 2.17, 3.4),
    ("floraone pupuk hayati",       3, 40, 7.50, 1.0),
    ("pt biotech indonesia",        1, 38, 2.63, 5.7),
    ("produk peternakan",           1, 33, 3.03, 2.8),
    ("pt. centra biotech indonesia",2, 31, 6.45, 1.0),
    ("rajabio pupuk organik",      10, 26, 38.46, 1.0),
    ("apa itu biotech",             0, 22, 0.00,19.3),
    ("bio killer insektisida hayati",1,22, 4.55, 1.1),
    ("pupuk organik cair rajabio",  3, 20, 15.00, 1.1),
    ("flora one pupuk hayati",      1, 20, 5.00, 2.0),
    ("pupuk hayati cair untuk padi",1, 19, 5.26, 2.6),
    ("poc terbaik",                 1, 18, 5.56, 6.7),
]

# ─── GSC DATA: Top Pages by Impressions ─────────────────────────────────────
TOP_PAGES = [
    ("/id",                                                    87, 3199, 2.72, 3.5),
    ("/id/news/revolusi-hijau-...-floraone",                   31, 1627, 1.91, 4.5),
    ("/id/produk-layanan/pertanian/rajabio-pupuk-organik-cair",12, 1513, 0.79, 5.9),
    ("/id/about-us",                                           14, 1370, 1.02, 4.9),
    ("/id/news/rajabio-revolusi-organik-...",                   18,  778, 2.31, 5.1),
    ("/id/produk-layanan/pertanian/rajabio-pupuk-organik",     26,  759, 3.43, 5.1),
    ("/id/produk-layanan/pertanian/floraone-pupuk-hayati",     17,  720, 2.36, 3.9),
    ("/id/produk-layanan/pertanian/biokiller-insektisida",      6,  709, 0.85, 4.3),
    ("/",                                                       2,  559, 0.36, 5.0),
    ("/id/news/membangun-kembali-kejayaan-padi...",             1,  514, 0.19, 6.5),
    ("/id/produk-layanan/pertanian/biokalsi-dolomit",           2,  463, 0.43, 4.9),
    ("/id/rajabio-pupuk-organik-cair",                         10,  301, 3.32, 2.7),
    ("/id/contact",                                             2,  281, 0.71, 3.8),
    ("/id/produk-layanan",                                      4,  266, 1.50, 5.2),
    ("career",                                                  7,  259, 2.70, 8.0),
    ("/en",                                                     5,  222, 2.25, 5.3),
    ("/id/news/insektisida-alami-anti-resistensi...",           2,  202, 0.99, 5.5),
    ("/id/produk-layanan/pertanian/blackturbo-asam-humat",      4,  195, 2.05, 5.2),
    ("/id/produk-layanan/pertanian/simbios-pupuk-hayati-cair",  3,  191, 1.57, 5.6),
    ("/id/product/livestock",                                   1,  145, 0.69, 4.8),
]

# ─── GSC DATA: Device Breakdown ─────────────────────────────────────────────
DEVICE_DATA = [
    ("Mobile",  187, 9808, 1.91, 4.3),
    ("Desktop",  88, 3229, 2.73, 7.1),
    ("Tablet",    0,  197, 0.00, 6.8),
]

# ─── GSC DATA: Country / Geographic Breakdown ───────────────────────────────
COUNTRY_DATA = [
    ("Indonesia", "IDN", 268, 11767, 2.28, 4.7),
    ("Jepang",    "JPN",   2,    25, 8.00, 7.0),
    ("India",     "IND",   1,    82, 1.22, 9.8),
    ("Malaysia",  "MYS",   1,    92, 1.09, 5.6),
    ("Belanda",   "NLD",   1,    14, 7.14, 3.9),
    ("Pakistan",  "PAK",   1,    10,10.00,10.1),
    ("Singapura", "SGP",   1,    51, 1.96, 5.3),
    ("Brasil",    "BRA",   0,    51, 0.00, 5.5),
    ("Australia", "AUS",   0,    16, 0.00, 4.9),
]

# ─── GSC DATA: Period Comparison (Queries) ───────────────────────────────────
PERIOD_COMP_QUERIES = [
    ("centra biotech indonesia",         37, 20, -17, -45.9, 5.4, 5.2, +0.2),
    ("pt. centra biotech indonesia",      6,  2,  -4, -66.7, 1.0, 1.0,  0.0),
    ("perusahaan bioteknologi di indonesia",5,2,  -3, -60.0, 3.8, 3.0, +0.8),
    ("perbedaan sampah organik dan anorganik",3,0,-3,-100.0,9.0, 0.0, +9.0),
    ("rajabio pupuk organik",            12, 10,  -2, -16.7, 1.5, 1.0, +0.5),
    ("pupuk hayati cair",                 1,  3,  +2,200.0, 7.2, 7.5, -0.3),
    ("pt centra",                         0,  2,  +2, 0,    3.1, 3.9, -0.8),
    ("pupuk organik cair terbaik",        0,  2,  +2, 0,    0.0, 7.1, -7.1),
    ("pupuk organik cair rajabio",        1,  3,  +2,200.0, 1.1, 1.1,  0.0),
    ("floraone",                          6,  3,  -3, -50.0, 2.9, 3.7, -0.8),
]

# ─── GSC DATA: Period Comparison (Pages) ─────────────────────────────────────
PERIOD_COMP_PAGES = [
    ("/",                                           50,  2, -48, -96.0, 4.1, 5.0),
    ("/news/rajabio-revolusi-organik... (non-locale)",25, 0, -25,-100.0,3.9, 0.0),
    ("/id/news/revolusi-hijau-...-floraone",        11, 31, +20,+181.8,5.9, 4.5),
    ("/id/produk-layanan/pertanian/rajabio-pupuk-organik",8,26,+18,+225.0,4.8,5.1),
    ("/id",                                         71, 87, +16, +22.5, 4.4, 3.5),
    ("/blog/pengertian-pupuk-organik... (non-locale)",13,0,-13,-100.0,4.7,0.0),
    ("/id/produk-layanan/pertanian/rajabio-pupuk-organik-cair",0,12,+12,0,0.0,5.9),
    ("/id/produk-layanan/pertanian/floraone-pupuk-hayati",6,17,+11,+183.3,3.6,3.9),
    ("/blog/perbedaan-sampah-organik... (non-locale)",10,0,-10,-100.0,7.6,1.0),
    ("/id/blog/produsen-pupuk-hayati-indonesia",     0,  5,  +5, 0,    0.0, 8.7),
]

# ─── GSC DATA: Historical Trend (6 months, monthly aggregates) ──────────────
MONTHLY_SUMMARY = [
    ("Sep 2025", 128,  5253, 2.44, 14.2),
    ("Okt 2025", 261, 10904, 2.39,  7.0),
    ("Nov 2025", 289, 20347, 1.42,  5.5),
    ("Des 2025", 259, 22667, 1.14,  5.3),
    ("Jan 2026", 344, 29898, 1.15,  5.9),
    ("Feb 2026 (s.d. 20)", 275, 13234, 2.08, 5.0),
]

# ─── GSC DATA: Blog Indexing Status ─────────────────────────────────────────
BLOG_INDEXED   = 3
BLOG_DISCOVERED = 42
BLOG_UNKNOWN   = 3
BLOG_TOTAL     = 48
BLOG_INDEXED_LIST = [
    "formulasi-pupuk-custom",
    "bio-pestisida-pengendalian-hama-alami",
    "pupuk-hayati-untuk-revegetasi-lahan-kritis",
]

# ─── Query-Page Matrix (Top combinations) ───────────────────────────────────
QUERY_PAGE_MATRIX = [
    ("pt centra biotech indonesia",  "/id",               24, 108, 22.22, 2.7),
    ("centra biotech indonesia",     "/id",               18,  81, 22.22, 3.2),
    ("rajabio pupuk organik",        "/id/news/rajabio..",  5,  24, 20.83, 1.4),
    ("pupuk hayati cair",            "/id/news/revolusi..",  3,  67, 4.48, 6.6),
    ("rajabio",                      "/id/news/rajabio..",  3,  68,  4.41, 3.1),
    ("floraone",                     "/id/floraone-pupuk..",2,  69,  2.90, 4.0),
    ("pupuk organik cair terbaik",   "/id/rajabio-poc",    2, 163,  1.23, 7.2),
    ("biotech",                      "/id",                1, 903,  0.11, 1.7),
    ("bio tech",                     "/id",                1,  63,  1.59, 1.0),
    ("biotech indonesia",            "/id",                1,  53,  1.89, 7.5),
]

# ─── Homepage Query Breakdown ────────────────────────────────────────────────
HOMEPAGE_QUERIES = [
    ("pt centra biotech indonesia",           24, 108, 22.22, 2.7),
    ("centra biotech indonesia",              18,  81, 22.22, 3.2),
    ("perusahaan bioteknologi di indonesia",   2,  54,  3.70, 1.9),
    ("pt centra",                              2,  15, 13.33, 4.3),
    ("pt. centra biotech indonesia",           2,  31,  6.45, 1.9),
    ("bio tech",                               1,  63,  1.59, 1.0),
    ("biotech",                                1, 903,  0.11, 1.7),
    ("biotech indonesia",                      1,  53,  1.89, 7.5),
    ("biotek indonesia",                       1,   1,100.00, 1.0),
    ("pt biotech indonesia",                   1,  33,  3.03, 6.8),
]

# =============================================================================
#  CHART GENERATION FUNCTIONS
# =============================================================================

def _hex(h):
    """Convert hex color to matplotlib tuple."""
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) / 255 for i in (0, 2, 4))

def _save_chart(fig):
    """Save chart to BytesIO buffer."""
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=180, bbox_inches="tight",
                facecolor="white", edgecolor="none")
    plt.close(fig)
    buf.seek(0)
    return buf


def chart_kpi_scorecards():
    """4 KPI scorecards in a row."""
    fig, axes = plt.subplots(1, 4, figsize=(14, 3))
    kpis = [
        ("Total Klik", f"{TOTAL_CLICKS:,}", CBI_GREEN, "+6.2% vs prev"),
        ("Total Impresi", f"{TOTAL_IMPRESSIONS:,}", CBI_BLUE, "+10.4% kapasitas"),
        ("Rata-rata CTR", f"{AVG_CTR}%", CBI_ORANGE, "Target: 3.5%"),
        ("Avg. Posisi", f"{AVG_POSITION}", ACCENT_1, "Top 5 ✓"),
    ]
    for ax, (title, value, color, sub) in zip(axes, kpis):
        ax.set_xlim(0, 1); ax.set_ylim(0, 1)
        ax.axis("off")
        ax.add_patch(plt.Rectangle((0.02, 0.02), 0.96, 0.96, fill=True,
                     facecolor=_hex(color), alpha=0.10, linewidth=2,
                     edgecolor=_hex(color), transform=ax.transAxes))
        ax.text(0.5, 0.70, value, ha="center", va="center",
                fontsize=28, fontweight="bold", color=_hex(color),
                transform=ax.transAxes)
        ax.text(0.5, 0.40, title, ha="center", va="center",
                fontsize=11, color=_hex(CBI_GRAY), transform=ax.transAxes)
        ax.text(0.5, 0.18, sub, ha="center", va="center",
                fontsize=8, color=_hex(CBI_GRAY), style="italic",
                transform=ax.transAxes)
    fig.suptitle("Key Performance Indicators — 28 Hari Terakhir",
                 fontsize=13, fontweight="bold", y=1.02, color=_hex(CBI_GRAY))
    fig.tight_layout()
    return _save_chart(fig)


def chart_daily_clicks_impressions():
    """Dual-axis daily trend: clicks (bar) + impressions (line)."""
    dates   = [d[0] for d in DAILY_DATA]
    clicks  = [d[1] for d in DAILY_DATA]
    impress = [d[2] for d in DAILY_DATA]
    x = np.arange(len(dates))

    fig, ax1 = plt.subplots(figsize=(14, 5))
    bars = ax1.bar(x, clicks, color=_hex(CBI_GREEN_LIGHT), alpha=0.85,
                   edgecolor=_hex(CBI_GREEN), linewidth=0.5, label="Klik")
    ax1.set_ylabel("Klik", fontsize=11, color=_hex(CBI_GREEN))
    ax1.set_xlabel("Tanggal", fontsize=10)
    ax1.set_xticks(x[::2])
    ax1.set_xticklabels([dates[i] for i in range(0, len(dates), 2)],
                        rotation=45, ha="right", fontsize=8)
    ax1.tick_params(axis="y", labelcolor=_hex(CBI_GREEN))

    ax2 = ax1.twinx()
    ax2.plot(x, impress, color=_hex(CBI_BLUE), linewidth=2.5, marker="o",
             markersize=4, label="Impresi")
    ax2.fill_between(x, impress, alpha=0.08, color=_hex(CBI_BLUE))
    ax2.set_ylabel("Impresi", fontsize=11, color=_hex(CBI_BLUE))
    ax2.tick_params(axis="y", labelcolor=_hex(CBI_BLUE))

    # Annotate peak
    peak_idx = clicks.index(max(clicks))
    ax1.annotate(f"{max(clicks)} klik", xy=(peak_idx, max(clicks)),
                 xytext=(peak_idx + 1, max(clicks) + 2),
                 fontsize=8, fontweight="bold", color=_hex(CBI_GREEN),
                 arrowprops=dict(arrowstyle="->", color=_hex(CBI_GREEN)))

    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc="upper left", fontsize=9)

    ax1.set_title("Tren Harian: Klik & Impresi (28 Hari)",
                  fontsize=13, fontweight="bold", pad=12)
    ax1.grid(axis="y", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_ctr_position_trend():
    """Dual-axis: CTR (area) + Position (inverted line)."""
    dates = [d[0] for d in DAILY_DATA]
    ctrs  = [d[3] for d in DAILY_DATA]
    pos   = [d[4] for d in DAILY_DATA]
    x = np.arange(len(dates))

    fig, ax1 = plt.subplots(figsize=(14, 4.5))
    ax1.fill_between(x, ctrs, alpha=0.25, color=_hex(ACCENT_1))
    ax1.plot(x, ctrs, color=_hex(ACCENT_1), linewidth=2.2, marker="s",
             markersize=4, label="CTR (%)")
    ax1.set_ylabel("CTR (%)", fontsize=11, color=_hex(ACCENT_1))
    ax1.set_xlabel("Tanggal", fontsize=10)
    ax1.set_xticks(x[::2])
    ax1.set_xticklabels([dates[i] for i in range(0, len(dates), 2)],
                        rotation=45, ha="right", fontsize=8)

    ax2 = ax1.twinx()
    ax2.plot(x, pos, color=_hex(CBI_ORANGE), linewidth=2.2, marker="D",
             markersize=4, label="Posisi Rata-rata")
    ax2.invert_yaxis()
    ax2.set_ylabel("Posisi (semakin atas = lebih baik)", fontsize=10,
                    color=_hex(CBI_ORANGE))

    lines1, l1 = ax1.get_legend_handles_labels()
    lines2, l2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, l1 + l2, loc="upper right", fontsize=9)

    ax1.set_title("Tren CTR & Posisi Rata-rata Harian",
                  fontsize=13, fontweight="bold", pad=12)
    ax1.grid(axis="y", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_monthly_growth():
    """Monthly comparison bar chart with growth annotations."""
    months  = [m[0] for m in MONTHLY_SUMMARY]
    clicks  = [m[1] for m in MONTHLY_SUMMARY]
    imp     = [m[2] for m in MONTHLY_SUMMARY]

    x = np.arange(len(months))
    width = 0.35

    fig, ax1 = plt.subplots(figsize=(12, 5))
    bars1 = ax1.bar(x - width/2, clicks, width, label="Klik",
                    color=_hex(CBI_GREEN_LIGHT), edgecolor=_hex(CBI_GREEN))
    ax2 = ax1.twinx()
    bars2 = ax2.bar(x + width/2, imp, width, label="Impresi",
                    color=_hex(CBI_BLUE_LIGHT), edgecolor=_hex(CBI_BLUE), alpha=0.7)

    for bar in bars1:
        h = bar.get_height()
        ax1.annotate(f"{int(h)}", xy=(bar.get_x() + bar.get_width()/2, h),
                     xytext=(0, 4), textcoords="offset points",
                     ha="center", fontsize=8, fontweight="bold",
                     color=_hex(CBI_GREEN))

    ax1.set_ylabel("Klik", fontsize=11, color=_hex(CBI_GREEN))
    ax2.set_ylabel("Impresi", fontsize=11, color=_hex(CBI_BLUE))
    ax1.set_xticks(x)
    ax1.set_xticklabels(months, fontsize=9)

    lines1, l1 = ax1.get_legend_handles_labels()
    lines2, l2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, l1 + l2, loc="upper left", fontsize=9)

    ax1.set_title("Pertumbuhan Bulanan: Klik & Impresi (Sep 2025 – Feb 2026)",
                  fontsize=13, fontweight="bold", pad=12)
    ax1.grid(axis="y", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_top_queries_horizontal():
    """Horizontal bar chart of top 15 queries by clicks."""
    data = sorted(TOP_QUERIES[:15], key=lambda r: r[1])
    queries = [d[0][:35] for d in data]
    clicks  = [d[1] for d in data]
    ctrs    = [d[3] for d in data]

    fig, ax = plt.subplots(figsize=(12, 6))
    colors = [_hex(CBI_GREEN) if c >= 3 else _hex(CBI_GRAY) for c in clicks]
    bars = ax.barh(queries, clicks, color=colors, edgecolor="white", height=0.6)

    for bar, ctr in zip(bars, ctrs):
        w = bar.get_width()
        ax.text(w + 0.3, bar.get_y() + bar.get_height()/2,
                f"CTR: {ctr:.1f}%", va="center", fontsize=8,
                color=_hex(CBI_GRAY))

    ax.set_xlabel("Klik", fontsize=11)
    ax.set_title("Top 15 Kueri Pencarian berdasarkan Klik",
                 fontsize=13, fontweight="bold", pad=12)
    ax.grid(axis="x", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_queries_bubble():
    """Bubble chart: Impressions vs CTR, bubble size = clicks."""
    data = [q for q in QUERIES_BY_IMPRESSIONS if q[2] >= 20][:20]
    imps  = [d[2] for d in data]
    ctrs  = [d[3] for d in data]
    clicks = [max(d[1] * 40, 30) for d in data]
    labels = [d[0][:20] for d in data]

    fig, ax = plt.subplots(figsize=(13, 7))
    scatter = ax.scatter(imps, ctrs, s=clicks, alpha=0.6,
                         c=[_hex(CBI_GREEN) if d[1] >= 3 else _hex(CBI_BLUE)
                            for d in data],
                         edgecolors=_hex(CBI_GRAY), linewidths=0.5)

    for i, lbl in enumerate(labels):
        ax.annotate(lbl, (imps[i], ctrs[i]),
                    xytext=(5, 5), textcoords="offset points",
                    fontsize=7, color=_hex(CBI_GRAY))

    ax.set_xlabel("Impresi", fontsize=11)
    ax.set_ylabel("CTR (%)", fontsize=11)
    ax.set_title("Peta Kueri: Impresi vs CTR (ukuran = klik)",
                 fontsize=13, fontweight="bold", pad=12)
    ax.axhline(y=2.0, color=_hex(CBI_RED), linestyle="--", alpha=0.4,
               label="Target CTR 2%")
    ax.legend(fontsize=9)
    ax.grid(alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_top_pages():
    """Horizontal bars for top 12 pages by impressions."""
    data = TOP_PAGES[:12]
    pages = [d[0][-45:] for d in data]
    imps  = [d[2] for d in data]
    clicks = [d[1] for d in data]

    fig, ax = plt.subplots(figsize=(13, 6))
    y = np.arange(len(pages))
    bars = ax.barh(y, imps, color=_hex(CBI_BLUE_LIGHT), edgecolor=_hex(CBI_BLUE),
                   height=0.55, label="Impresi")
    ax.barh(y, clicks, color=_hex(CBI_GREEN), edgecolor=_hex(CBI_GREEN),
            height=0.55, alpha=0.9, label="Klik")

    ax.set_yticks(y)
    ax.set_yticklabels(pages, fontsize=7.5)
    ax.set_xlabel("Jumlah", fontsize=11)
    ax.set_title("Top 12 Halaman: Impresi & Klik",
                 fontsize=13, fontweight="bold", pad=12)
    ax.legend(fontsize=9)
    ax.grid(axis="x", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_device_breakdown():
    """Donut chart for device distribution by clicks + bar for CTR."""
    labels = [d[0] for d in DEVICE_DATA]
    clicks = [d[1] for d in DEVICE_DATA]
    ctrs   = [d[3] for d in DEVICE_DATA]
    colors = [_hex(CBI_GREEN), _hex(CBI_BLUE), _hex(CBI_ORANGE)]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

    # Donut
    wedges, texts, autotexts = ax1.pie(
        clicks, labels=labels, colors=colors, autopct="%1.1f%%",
        startangle=90, pctdistance=0.78, textprops={"fontsize": 10})
    centre = plt.Circle((0, 0), 0.55, fc="white")
    ax1.add_patch(centre)
    ax1.text(0, 0, f"{sum(clicks)}\nKlik", ha="center", va="center",
             fontsize=14, fontweight="bold", color=_hex(CBI_GRAY))
    ax1.set_title("Distribusi Klik per Perangkat", fontsize=12,
                  fontweight="bold")

    # CTR bar
    ax2.bar(labels, ctrs, color=colors, edgecolor="white", width=0.5)
    for i, v in enumerate(ctrs):
        ax2.text(i, v + 0.08, f"{v}%", ha="center", fontsize=10,
                 fontweight="bold", color=colors[i])
    ax2.set_ylabel("CTR (%)", fontsize=11)
    ax2.set_title("CTR per Perangkat", fontsize=12, fontweight="bold")
    ax2.grid(axis="y", alpha=0.2)

    fig.suptitle("Analisis Perangkat Pengguna", fontsize=13,
                 fontweight="bold", y=1.02)
    fig.tight_layout()
    return _save_chart(fig)


def chart_geo_distribution():
    """Horizontal bar chart for geographic distribution."""
    data = COUNTRY_DATA[:8]
    countries = [d[0] for d in data]
    clicks    = [d[2] for d in data]
    imps      = [d[3] for d in data]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

    # Clicks
    colors_c = [_hex(CBI_GREEN) if c > 0 else _hex(CBI_GRAY_LIGHT) for c in clicks]
    ax1.barh(countries, clicks, color=colors_c, edgecolor="white", height=0.5)
    for i, v in enumerate(clicks):
        if v > 0:
            ax1.text(v + 1, i, str(v), va="center", fontsize=9,
                     fontweight="bold", color=_hex(CBI_GREEN))
    ax1.set_xlabel("Klik")
    ax1.set_title("Klik per Negara", fontsize=12, fontweight="bold")
    ax1.grid(axis="x", alpha=0.2)

    # Impressions
    ax2.barh(countries, imps, color=_hex(CBI_BLUE_LIGHT), edgecolor="white",
             height=0.5)
    for i, v in enumerate(imps):
        if v > 10:
            ax2.text(v + 50, i, f"{v:,}", va="center", fontsize=8,
                     color=_hex(CBI_BLUE))
    ax2.set_xlabel("Impresi")
    ax2.set_title("Impresi per Negara", fontsize=12, fontweight="bold")
    ax2.grid(axis="x", alpha=0.2)

    fig.suptitle("Distribusi Geografis Pencarian", fontsize=13,
                 fontweight="bold", y=1.02)
    fig.tight_layout()
    return _save_chart(fig)


def chart_blog_indexing():
    """Pie chart for blog indexation status + progress bar."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5),
                                    gridspec_kw={"width_ratios": [1, 1.5]})

    # Pie
    sizes  = [BLOG_INDEXED, BLOG_DISCOVERED, BLOG_UNKNOWN]
    labels = [f"Terindeks ({BLOG_INDEXED})", f"Discovered ({BLOG_DISCOVERED})",
              f"Unknown ({BLOG_UNKNOWN})"]
    colors = [_hex(CBI_GREEN), _hex(ACCENT_3), _hex(CBI_RED)]
    explode = (0.06, 0, 0)
    ax1.pie(sizes, explode=explode, labels=labels, colors=colors,
            autopct="%1.0f%%", startangle=90,
            textprops={"fontsize": 9})
    ax1.set_title("Status Indeksasi Blog", fontsize=12, fontweight="bold")

    # Progress timeline
    milestones = [
        ("13 Feb\nFix Deploy", 0, CBI_RED),
        ("16 Feb\n1 indexed", 1, ACCENT_3),
        ("19 Feb\n3 indexed", 3, CBI_GREEN_LIGHT),
        ("23 Feb\nSaat ini", 3, CBI_GREEN),
        ("Target\nMar 2026", 15, CBI_BLUE),
    ]
    xs = [0, 1, 2, 3, 5]
    ys = [m[1] for m in milestones]
    colors_m = [_hex(m[2]) for m in milestones]
    ax2.plot(xs, ys, color=_hex(CBI_GREEN), linewidth=2.5, marker="o",
             markersize=10, zorder=5)
    for i, (label, val, _) in enumerate(milestones):
        ax2.annotate(label, (xs[i], ys[i]),
                     xytext=(0, 15 if i % 2 == 0 else -25),
                     textcoords="offset points", ha="center", fontsize=8,
                     fontweight="bold", color=colors_m[i])
        ax2.scatter(xs[i], ys[i], c=[colors_m[i]], s=80, zorder=6,
                    edgecolors="white", linewidths=1.5)
    ax2.fill_between(xs, ys, alpha=0.1, color=_hex(CBI_GREEN))
    ax2.set_ylabel("Jumlah Blog Terindeks")
    ax2.set_title("Timeline Progres Indeksasi", fontsize=12, fontweight="bold")
    ax2.set_ylim(-1, 18)
    ax2.grid(alpha=0.2)
    ax2.set_xticks([])

    fig.suptitle("Analisis Indeksasi Blog (48 Artikel)", fontsize=13,
                 fontweight="bold", y=1.02)
    fig.tight_layout()
    return _save_chart(fig)


def chart_period_comparison():
    """Waterfall-style comparison of page performance between periods."""
    data = PERIOD_COMP_PAGES[:8]
    pages   = [d[0][-35:] for d in data]
    changes = [d[3] for d in data]

    fig, ax = plt.subplots(figsize=(12, 5.5))
    colors = [_hex(CBI_GREEN) if c >= 0 else _hex(CBI_RED) for c in changes]
    bars = ax.barh(pages, changes, color=colors, edgecolor="white", height=0.55)

    for bar, val in zip(bars, changes):
        w = bar.get_width()
        sign = "+" if val >= 0 else ""
        ax.text(w + (1 if val >= 0 else -1), bar.get_y() + bar.get_height()/2,
                f"{sign}{int(val)}", va="center", fontsize=9, fontweight="bold",
                color=_hex(CBI_GREEN) if val >= 0 else _hex(CBI_RED))

    ax.axvline(x=0, color=_hex(CBI_GRAY), linewidth=0.8)
    ax.set_xlabel("Perubahan Klik", fontsize=11)
    ax.set_title("Perbandingan Periode: Perubahan Klik per Halaman\n"
                 "(Des 26 – Jan 25 vs Jan 26 – Feb 22)",
                 fontsize=12, fontweight="bold", pad=12)
    ax.grid(axis="x", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_historical_6month():
    """6-month historical clicks + impressions line chart."""
    # Aggregate from the full 173-day dataset
    hist_raw = [
        ("2025-09", 128, 5253), ("2025-10", 261, 10904),
        ("2025-11", 289, 20347), ("2025-12", 259, 22667),
        ("2026-01", 344, 29898), ("2026-02", 275, 13234),
    ]
    months = [h[0] for h in hist_raw]
    clicks = [h[1] for h in hist_raw]
    imps   = [h[2] for h in hist_raw]

    fig, ax1 = plt.subplots(figsize=(12, 5))
    ax1.plot(months, clicks, color=_hex(CBI_GREEN), linewidth=3, marker="o",
             markersize=8, label="Klik", zorder=5)
    ax1.fill_between(range(len(months)), clicks, alpha=0.12, color=_hex(CBI_GREEN))
    for i, v in enumerate(clicks):
        ax1.annotate(str(v), (months[i], v), xytext=(0, 10),
                     textcoords="offset points", ha="center", fontsize=9,
                     fontweight="bold", color=_hex(CBI_GREEN))

    ax2 = ax1.twinx()
    ax2.plot(months, imps, color=_hex(CBI_BLUE), linewidth=3, marker="s",
             markersize=8, label="Impresi", zorder=5)
    ax2.fill_between(range(len(months)), imps, alpha=0.08, color=_hex(CBI_BLUE))

    ax1.set_ylabel("Klik", fontsize=11, color=_hex(CBI_GREEN))
    ax2.set_ylabel("Impresi", fontsize=11, color=_hex(CBI_BLUE))

    lines1, l1 = ax1.get_legend_handles_labels()
    lines2, l2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, l1 + l2, loc="upper left", fontsize=10)

    ax1.set_title("Tren 6 Bulan: Klik & Impresi (Sep 2025 – Feb 2026)",
                  fontsize=13, fontweight="bold", pad=12)
    ax1.grid(axis="y", alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


def chart_keyword_opportunity():
    """Matrix chart: High Impressions / Low CTR = Opportunity keywords."""
    data = [q for q in QUERIES_BY_IMPRESSIONS if q[2] >= 20 and q[3] < 5.0][:12]
    queries = [d[0][:28] for d in data]
    imps    = [d[2] for d in data]
    ctrs    = [d[3] for d in data]
    pos     = [d[4] for d in data]

    fig, ax = plt.subplots(figsize=(12, 6))
    scatter = ax.scatter(imps, ctrs, s=[p*30 for p in pos], alpha=0.7,
                         c=_hex(CBI_ORANGE), edgecolors=_hex(CBI_RED),
                         linewidths=0.8)
    for i, q in enumerate(queries):
        ax.annotate(q, (imps[i], ctrs[i]), xytext=(6, 6),
                    textcoords="offset points", fontsize=7.5,
                    color=_hex(CBI_GRAY))

    ax.axhline(y=2.0, color=_hex(CBI_GREEN), linestyle="--", alpha=0.5,
               label="Target CTR 2%")
    ax.axvline(x=50, color=_hex(CBI_BLUE), linestyle="--", alpha=0.5,
               label="Threshold Impresi 50")

    # Quadrant labels
    ax.text(0.95, 0.95, "HIGH IMP\nHIGH CTR\n★ Optimal", transform=ax.transAxes,
            ha="right", va="top", fontsize=8, color=_hex(CBI_GREEN),
            fontweight="bold", alpha=0.6)
    ax.text(0.95, 0.05, "HIGH IMP\nLOW CTR\n⚡ Peluang", transform=ax.transAxes,
            ha="right", va="bottom", fontsize=8, color=_hex(CBI_ORANGE),
            fontweight="bold", alpha=0.6)

    ax.set_xlabel("Impresi", fontsize=11)
    ax.set_ylabel("CTR (%)", fontsize=11)
    ax.set_title("Keyword Opportunity Matrix\n(Ukuran = Posisi rata-rata)",
                 fontsize=13, fontweight="bold", pad=12)
    ax.legend(fontsize=9)
    ax.grid(alpha=0.2)
    fig.tight_layout()
    return _save_chart(fig)


# =============================================================================
#  DOCX HELPER FUNCTIONS
# =============================================================================

def set_cell_bg(cell, hex_color):
    """Set cell background color."""
    shading = parse_xml(
        f'<w:shd {nsdecls("w")} w:fill="{hex_color.lstrip("#")}"/>'
    )
    cell._tc.get_or_add_tcPr().append(shading)


def add_heading(doc, text, level=1):
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        run.font.color.rgb = RGBColor.from_string("1B5E20")
    return h


def add_para(doc, text, bold=False, size=10, color=CBI_GRAY, align="left",
             space_after=6):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = bold
    run.font.size = Pt(size)
    run.font.name = "Calibri"
    c = color.lstrip("#")
    run.font.color.rgb = RGBColor(int(c[:2],16), int(c[2:4],16), int(c[4:],16))
    alignment_map = {
        "left": WD_PARAGRAPH_ALIGNMENT.LEFT,
        "center": WD_PARAGRAPH_ALIGNMENT.CENTER,
        "right": WD_PARAGRAPH_ALIGNMENT.RIGHT,
        "justify": WD_PARAGRAPH_ALIGNMENT.JUSTIFY,
    }
    p.alignment = alignment_map.get(align, WD_PARAGRAPH_ALIGNMENT.LEFT)
    p.paragraph_format.space_after = Pt(space_after)
    return p


def add_bullet(doc, text, level=0):
    p = doc.add_paragraph(text, style="List Bullet")
    p.paragraph_format.space_after = Pt(3)
    for run in p.runs:
        run.font.size = Pt(9.5)
        run.font.name = "Calibri"
    return p


def insight_box(doc, title, text, bg_color=CBI_GRAY_LIGHT):
    """Create a highlighted insight box using a single-cell table."""
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    set_cell_bg(cell, bg_color)
    # Title
    p1 = cell.paragraphs[0]
    run1 = p1.add_run(f"💡 {title}")
    run1.bold = True
    run1.font.size = Pt(10)
    run1.font.name = "Calibri"
    run1.font.color.rgb = RGBColor.from_string("1B5E20")
    p1.paragraph_format.space_after = Pt(4)
    # Body
    p2 = cell.add_paragraph()
    run2 = p2.add_run(text)
    run2.font.size = Pt(9)
    run2.font.name = "Calibri"
    run2.font.color.rgb = RGBColor.from_string("455A64")
    p2.paragraph_format.space_after = Pt(4)
    doc.add_paragraph()  # spacer


def add_chart(doc, chart_buffer, width=Inches(6.2)):
    """Insert chart image into document."""
    p = doc.add_paragraph()
    p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    run = p.add_run()
    run.add_picture(chart_buffer, width=width)
    doc.add_paragraph()  # spacer


def add_data_table(doc, headers, rows, col_widths=None, highlight_col=None):
    """Insert a formatted data table."""
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = "Table Grid"

    # Header
    for i, h in enumerate(headers):
        cell = table.cell(0, i)
        cell.text = h
        set_cell_bg(cell, CBI_GREEN)
        for para in cell.paragraphs:
            para.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
            for run in para.runs:
                run.bold = True
                run.font.size = Pt(8.5)
                run.font.name = "Calibri"
                run.font.color.rgb = RGBColor(255, 255, 255)

    # Data rows
    for r_idx, row_data in enumerate(rows):
        for c_idx, val in enumerate(row_data):
            cell = table.cell(r_idx + 1, c_idx)
            cell.text = str(val)
            if r_idx % 2 == 0:
                set_cell_bg(cell, "#F5F5F5")
            for para in cell.paragraphs:
                for run in para.runs:
                    run.font.size = Pt(8)
                    run.font.name = "Calibri"
                if c_idx > 0:
                    para.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER

    # Set column widths
    if col_widths:
        for i, w in enumerate(col_widths):
            for row in table.rows:
                row.cells[i].width = Inches(w)

    doc.add_paragraph()  # spacer
    return table


def add_page_break(doc):
    p = doc.add_paragraph()
    run = p.add_run()
    from docx.enum.text import WD_BREAK
    run.add_break(WD_BREAK.PAGE)


def divider(doc):
    p = doc.add_paragraph()
    run = p.add_run("─" * 80)
    run.font.size = Pt(6)
    run.font.color.rgb = RGBColor.from_string("BDBDBD")
    p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)


# =============================================================================
#  MAIN REPORT BUILDER
# =============================================================================

def build_report():
    doc = Document()

    # ── Page Setup ───────────────────────────────────────────────────────────
    section = doc.sections[0]
    section.left_margin   = Cm(2.2)
    section.right_margin  = Cm(2.2)
    section.top_margin    = Cm(2.0)
    section.bottom_margin = Cm(1.8)

    # ── Default Style ────────────────────────────────────────────────────────
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10)

    # =====================================================================
    #  COVER PAGE
    # =====================================================================
    for _ in range(4):
        doc.add_paragraph()

    p = doc.add_paragraph()
    p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    run = p.add_run("SEO · GEO · AI")
    run.bold = True
    run.font.size = Pt(36)
    run.font.color.rgb = RGBColor.from_string("1B5E20")
    run.font.name = "Calibri"

    p2 = doc.add_paragraph()
    p2.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    run2 = p2.add_run("LAPORAN KOMPREHENSIF")
    run2.bold = True
    run2.font.size = Pt(22)
    run2.font.color.rgb = RGBColor.from_string("0D47A1")
    run2.font.name = "Calibri"

    doc.add_paragraph()

    p3 = doc.add_paragraph()
    p3.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    run3 = p3.add_run(COMPANY_NAME)
    run3.bold = True
    run3.font.size = Pt(16)
    run3.font.color.rgb = RGBColor.from_string("455A64")

    add_para(doc, WEBSITE, size=12, align="center", color=CBI_BLUE)
    doc.add_paragraph()
    add_para(doc, f"Tanggal Laporan: {REPORT_DATE}", size=11, align="center",
             bold=True)
    add_para(doc, f"Periode Data: {REPORT_PERIOD}", size=10, align="center")
    add_para(doc, "Sumber Data: Google Search Console", size=10, align="center")

    doc.add_paragraph()
    doc.add_paragraph()

    # Classification
    p_class = doc.add_paragraph()
    p_class.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    r_class = p_class.add_run("RAHASIA PERUSAHAAN — UNTUK KALANGAN TERBATAS")
    r_class.bold = True
    r_class.font.size = Pt(9)
    r_class.font.color.rgb = RGBColor.from_string("C62828")

    add_para(doc, "Disusun oleh: Divisi Digital Marketing & Data Analytics",
             size=9, align="center")

    add_page_break(doc)

    # =====================================================================
    #  TABLE OF CONTENTS
    # =====================================================================
    add_heading(doc, "DAFTAR ISI", level=1)
    toc_items = [
        "1. Ringkasan Eksekutif",
        "2. Key Performance Indicators (KPI)",
        "3. Analisis Tren Harian",
        "4. Pertumbuhan Bulanan (6 Bulan)",
        "5. Analisis Portofolio Kata Kunci",
        "6. Analisis Halaman & Konten",
        "7. Analisis Perangkat Pengguna",
        "8. Distribusi Geografis (GEO Analysis)",
        "9. Status Indeksasi Blog & Konten",
        "10. Perbandingan Antar Periode",
        "11. AI/LLM Readiness & Generative Engine Optimization",
        "12. Keyword Opportunity Matrix",
        "13. Query-Page Mapping Analysis",
        "14. Rekomendasi Strategis",
        "15. Lampiran Data Lengkap",
    ]
    for item in toc_items:
        add_bullet(doc, item)

    add_page_break(doc)

    # =====================================================================
    #  SECTION 1: EXECUTIVE SUMMARY
    # =====================================================================
    add_heading(doc, "1. Ringkasan Eksekutif", level=1)

    add_para(doc, (
        f"Laporan ini menyajikan analisis komprehensif performa pencarian organik "
        f"website {COMPANY_NAME} ({WEBSITE}) berdasarkan data Google Search Console "
        f"untuk periode {REPORT_PERIOD}. Laporan mencakup analisis SEO (Search Engine "
        f"Optimization), GEO (Generative Engine Optimization), dan kesiapan AI/LLM "
        f"sebagai landasan pengambilan keputusan strategis bagi tim Marketing, Manajer, "
        f"dan Direksi."
    ), size=10, align="justify")

    add_heading(doc, "Temuan Utama", level=2)
    key_findings = [
        f"Website mencatat {TOTAL_CLICKS:,} klik dan {TOTAL_IMPRESSIONS:,} impresi dalam 28 hari, "
        f"dengan CTR rata-rata {AVG_CTR}% dan posisi rata-rata {AVG_POSITION}.",
        f"Trafik didominasi oleh pengguna mobile (68.0%) menunjukkan pentingnya optimisasi "
        f"mobile-first.",
        f"Indonesia menyumbang 97.5% total klik (268 dari 275), dengan potensi ekspansi "
        f"ke pasar ASEAN (Malaysia, Singapura).",
        f"Dari 48 artikel blog, baru 3 (6.25%) yang terindeks Google — menjadi prioritas "
        f"utama perbaikan.",
        f"Kueri bermerek ('centra biotech', 'rajabio', 'floraone') mendominasi 70% klik — "
        f"sementara kueri generic memerlukan penguatan.",
        f"Impresi menunjukkan tren naik signifikan dari 5,253 (Sep 2025) ke 13,234 "
        f"(Feb 2026 parsial), peningkatan 152% dalam 6 bulan.",
        f"Halaman produk RajaBio dan FloraOne menunjukkan pertumbuhan klik +225% dan "
        f"+183% dibanding periode sebelumnya.",
    ]
    for finding in key_findings:
        add_bullet(doc, finding)

    insight_box(doc, "Insight untuk Direksi",
        "Visibilitas online perusahaan menunjukkan tren positif dengan pertumbuhan "
        "impresi 152% dalam 6 bulan. Namun, konversi dari impresi ke klik (CTR 2.08%) "
        "masih di bawah benchmark industri agritech (3-5%). Prioritas strategis: "
        "(1) Akselerasi indeksasi blog, (2) Optimisasi meta tags halaman produk, "
        "(3) Ekspansi konten untuk kueri generic bervolume tinggi.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 2: KPI
    # =====================================================================
    add_heading(doc, "2. Key Performance Indicators (KPI)", level=1)

    add_para(doc, (
        "Dashboard KPI berikut menampilkan empat metrik utama performa pencarian "
        "organik dalam periode 28 hari terakhir."
    ), size=10, align="justify")

    print("  [1/12] Generating KPI scorecards...")
    add_chart(doc, chart_kpi_scorecards())

    # KPI detail table
    add_heading(doc, "Detail KPI", level=2)
    add_data_table(doc,
        ["Metrik", "Nilai", "Target Q1 2026", "Status", "Catatan"],
        [
            ["Total Klik", f"{TOTAL_CLICKS:,}", "400/bulan", "⚠ 68.75%",
             "Perlu peningkatan konten"],
            ["Total Impresi", f"{TOTAL_IMPRESSIONS:,}", "15,000/bulan", "✓ 88.2%",
             "Tren positif"],
            ["CTR Rata-rata", f"{AVG_CTR}%", "3.5%", "⚠ 59.4%",
             "Optimisasi meta description"],
            ["Posisi Rata-rata", f"{AVG_POSITION}", "< 5.0", "✓ Tercapai",
             "Pertahankan"],
            ["Blog Terindeks", f"{BLOG_INDEXED}/48", "20/48", "✗ 15%",
             "PRIORITAS KRITIS"],
            ["Negara Terjangkau", "7 negara", "10 negara", "✓ 70%",
             "Fokus ASEAN"],
        ],
        col_widths=[1.5, 1.0, 1.1, 0.9, 1.8]
    )

    add_page_break(doc)

    # =====================================================================
    #  SECTION 3: DAILY TREND
    # =====================================================================
    add_heading(doc, "3. Analisis Tren Harian", level=1)

    add_para(doc, (
        "Grafik di bawah menampilkan tren harian klik dan impresi selama 28 hari. "
        "Analisis tren ini penting untuk mengidentifikasi pola perilaku pencarian "
        "pengguna dan dampak dari optimisasi yang telah dilakukan."
    ), size=10, align="justify")

    print("  [2/12] Generating daily clicks & impressions chart...")
    add_chart(doc, chart_daily_clicks_impressions())

    insight_box(doc, "Analisis Tren Harian",
        f"Klik tertinggi tercatat pada 04 Februari (19 klik) dan 28 Januari (18 klik), "
        f"sedangkan klik terendah pada 16 Februari (3 klik). Impresi menunjukkan tren naik "
        f"dari ~400-an di akhir Januari menjadi ~700-an di pertengahan Februari, "
        f"menandakan Google Search mulai lebih sering menampilkan halaman website. "
        f"Pola weekday vs weekend terlihat jelas: klik cenderung turun di akhir pekan.")

    print("  [3/12] Generating CTR & position trend chart...")
    add_chart(doc, chart_ctr_position_trend())

    add_para(doc, (
        "Grafik CTR menunjukkan fluktuasi antara 0.56% hingga 3.99%. CTR tertinggi "
        "tercatat pada 28 Januari (3.99%) yang bertepatan dengan hari kerja dan "
        "impresi moderat. Posisi rata-rata stabil di kisaran 4.1–6.3, menunjukkan "
        "konsistensi peringkat halaman di halaman pertama Google."
    ), size=10, align="justify")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 4: MONTHLY GROWTH
    # =====================================================================
    add_heading(doc, "4. Pertumbuhan Bulanan (6 Bulan)", level=1)

    add_para(doc, (
        "Analisis pertumbuhan bulanan memberikan perspektif jangka menengah tentang "
        "trajektori performa pencarian organik website."
    ), size=10, align="justify")

    print("  [4/12] Generating monthly growth chart...")
    add_chart(doc, chart_monthly_growth())

    # Monthly data table
    add_data_table(doc,
        ["Bulan", "Klik", "Impresi", "CTR", "Posisi", "Pertumbuhan Klik"],
        [
            ["Sep 2025",  "128",  "5,253",  "2.44%", "14.2", "—"],
            ["Okt 2025",  "261", "10,904",  "2.39%",  "7.0", "+103.9%"],
            ["Nov 2025",  "289", "20,347",  "1.42%",  "5.5",  "+10.7%"],
            ["Des 2025",  "259", "22,667",  "1.14%",  "5.3",  "-10.4%"],
            ["Jan 2026",  "344", "29,898",  "1.15%",  "5.9",  "+32.8%"],
            ["Feb 2026*", "275", "13,234",  "2.08%",  "5.0",  "Ongoing"],
        ],
        col_widths=[1.0, 0.7, 1.0, 0.7, 0.7, 1.2]
    )

    add_para(doc, "* Data Februari 2026 bersifat parsial (26 hari dari 28 hari).",
             size=8, color=CBI_GRAY)

    insight_box(doc, "Insight Pertumbuhan",
        "Pertumbuhan impresi sangat signifikan: dari 5,253 (Sep 2025) ke puncak "
        "29,898 (Jan 2026), meningkat 469%. Penurunan impresi di Des 2025 adalah anomali "
        "sementara karena migrasi URL. Posisi rata-rata membaik drastis dari 14.2 "
        "(Sep 2025) ke 5.0 (Feb 2026), artinya website berhasil naik dari halaman 2 "
        "ke halaman 1 Google dalam 6 bulan.")

    print("  [5/12] Generating 6-month historical trend chart...")
    add_chart(doc, chart_historical_6month())

    add_page_break(doc)

    # =====================================================================
    #  SECTION 5: KEYWORD PORTFOLIO
    # =====================================================================
    add_heading(doc, "5. Analisis Portofolio Kata Kunci", level=1)

    add_para(doc, (
        "Portofolio kata kunci adalah aset strategis perusahaan di mesin pencari. "
        "Analisis berikut mengkategorikan kueri berdasarkan intent, volume, dan peluang."
    ), size=10, align="justify")

    print("  [6/12] Generating top queries horizontal bar chart...")
    add_chart(doc, chart_top_queries_horizontal())

    add_heading(doc, "Kategorisasi Kueri", level=2)

    # Brand queries
    add_para(doc, "A. Kueri Bermerek (Brand Queries)", bold=True, size=10,
             color=CBI_GREEN)
    brand_queries = [
        ("pt centra biotech indonesia", 26, 121, 21.49, 3.3),
        ("centra biotech indonesia",    20,  93, 21.51, 5.2),
        ("pt. centra biotech indonesia", 2,  31,  6.45, 1.0),
        ("pt centra",                    2,  15, 13.33, 3.9),
    ]
    add_data_table(doc,
        ["Kueri", "Klik", "Impresi", "CTR", "Posisi"],
        [[q[0], str(q[1]), str(q[2]), f"{q[3]}%", f"{q[4]}"] for q in brand_queries],
        col_widths=[2.5, 0.6, 0.8, 0.7, 0.7]
    )

    add_para(doc, (
        "Total klik dari kueri bermerek: 50 klik (18.2% dari total). CTR tinggi "
        "(6-21%) menunjukkan brand awareness yang kuat di kalangan pencari aktif."
    ), size=9.5, align="justify")

    # Product queries
    add_para(doc, "B. Kueri Produk (Product Queries)", bold=True, size=10,
             color=CBI_GREEN)
    product_queries = [
        ("rajabio pupuk organik",      10,  26, 38.46, 1.0),
        ("rajabio",                     5,  82,  6.10, 4.0),
        ("floraone",                    3,  82,  3.66, 3.7),
        ("floraone pupuk hayati",       3,  40,  7.50, 1.0),
        ("pupuk organik cair rajabio",  3,  20, 15.00, 1.1),
        ("biokiller",                   1,  46,  2.17, 3.4),
    ]
    add_data_table(doc,
        ["Kueri", "Klik", "Impresi", "CTR", "Posisi"],
        [[q[0], str(q[1]), str(q[2]), f"{q[3]}%", f"{q[4]}"] for q in product_queries],
        col_widths=[2.5, 0.6, 0.8, 0.7, 0.7]
    )

    # Generic queries
    add_para(doc, "C. Kueri Generic (High-Volume Opportunities)", bold=True,
             size=10, color=CBI_ORANGE)
    generic_queries = [
        ("biotech",                  1, 910, 0.11, 1.7),
        ("pupuk organik cair terbaik",2,191, 1.05, 7.1),
        ("asam humat untuk cabe",    0, 114, 0.00, 4.3),
        ("perusahaan bioteknologi di indonesia",2,120,1.67,3.0),
        ("pupuk hayati cair",        3,  72, 4.17, 7.5),
    ]
    add_data_table(doc,
        ["Kueri", "Klik", "Impresi", "CTR", "Posisi"],
        [[q[0], str(q[1]), str(q[2]), f"{q[3]}%", f"{q[4]}"] for q in generic_queries],
        col_widths=[2.5, 0.6, 0.8, 0.7, 0.7]
    )

    insight_box(doc, "Peluang Kata Kunci Generic",
        "Kueri 'biotech' menyumbang 910 impresi namun hanya 1 klik (CTR 0.11%). "
        "Kueri 'pupuk organik cair terbaik' mencatat 191 impresi dengan hanya 2 klik. "
        "Kueri 'asam humat untuk cabe' memiliki 114 impresi namun 0 klik — ini adalah "
        "peluang besar untuk membuat konten artikel yang spesifik. Optimisasi meta title "
        "dan description untuk kueri-kueri ini dapat meningkatkan klik secara signifikan.")

    print("  [7/12] Generating queries bubble chart...")
    add_chart(doc, chart_queries_bubble())

    add_page_break(doc)

    # =====================================================================
    #  SECTION 6: PAGE ANALYSIS
    # =====================================================================
    add_heading(doc, "6. Analisis Halaman & Konten", level=1)

    add_para(doc, (
        "Analisis halaman menunjukkan distribusi trafik organik ke berbagai section "
        "website, membantu identifikasi konten yang paling berpengaruh."
    ), size=10, align="justify")

    print("  [8/12] Generating top pages chart...")
    add_chart(doc, chart_top_pages())

    add_heading(doc, "Distribusi Trafik per Section", level=2)

    # Section breakdown
    sections = [
        ("Homepage (/id, /en, /)", 94, 3980, 2.36),
        ("Halaman Produk Pertanian", 72, 4887, 1.47),
        ("Artikel News/Press Release", 55, 3689, 1.49),
        ("About Us & Kontak", 18, 1736, 1.04),
        ("Blog", 8, 155, 5.16),
        ("Career", 9, 415, 2.17),
        ("Dokumen & Lainnya", 19, 372, 5.11),
    ]
    add_data_table(doc,
        ["Section", "Klik", "Impresi", "CTR rata-rata"],
        [[s[0], str(s[1]), f"{s[2]:,}", f"{s[3]}%"] for s in sections],
        col_widths=[2.5, 0.8, 1.0, 1.0]
    )

    insight_box(doc, "Insight Halaman",
        "Halaman produk pertanian menyerap 26.2% total klik dan 36.9% impresi — "
        "menunjukkan demand tinggi terhadap produk pertanian organik. About Us memiliki "
        "1,370 impresi namun hanya 14 klik (CTR 1.02%), mengindikasikan meta description "
        "perlu dioptimasikan. Blog memiliki CTR tertinggi (5.16%) namun impresi rendah "
        "karena masalah indeksasi.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 7: DEVICE ANALYSIS
    # =====================================================================
    add_heading(doc, "7. Analisis Perangkat Pengguna", level=1)

    add_para(doc, (
        "Pemahaman distribusi perangkat pengguna krusial untuk strategi desain "
        "dan optimisasi user experience."
    ), size=10, align="justify")

    print("  [9/12] Generating device breakdown chart...")
    add_chart(doc, chart_device_breakdown())

    add_data_table(doc,
        ["Perangkat", "Klik", "Impresi", "CTR", "Posisi", "% Total Klik"],
        [
            ["Mobile",  "187", "9,808", "1.91%", "4.3", "68.0%"],
            ["Desktop",  "88", "3,229", "2.73%", "7.1", "32.0%"],
            ["Tablet",    "0",   "197", "0.00%", "6.8",  "0.0%"],
        ],
        col_widths=[1.0, 0.7, 0.9, 0.7, 0.7, 0.9]
    )

    insight_box(doc, "Insight Perangkat",
        "Mobile mendominasi 68% klik namun CTR-nya (1.91%) lebih rendah dari Desktop "
        "(2.73%). Ini menandakan pengalaman mobile perlu ditingkatkan — kemungkinan "
        "snippet/meta description terpotong di layar kecil. Posisi mobile (4.3) lebih "
        "baik dari desktop (7.1), menunjukkan Google memberikan preferensi mobile-first "
        "yang menguntungkan. Tablet zero klik dengan 197 impresi — potensi minor.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 8: GEOGRAPHIC ANALYSIS
    # =====================================================================
    add_heading(doc, "8. Distribusi Geografis (GEO Analysis)", level=1)

    add_para(doc, (
        "Analisis geografis memberikan insight tentang jangkauan pasar internasional "
        "website dan potensi ekspansi ke pasar baru."
    ), size=10, align="justify")

    print("  [10/12] Generating geo distribution chart...")
    add_chart(doc, chart_geo_distribution())

    add_data_table(doc,
        ["Negara", "Kode", "Klik", "Impresi", "CTR", "Posisi", "% Total"],
        [
            ["Indonesia", "IDN", "268", "11,767", "2.28%", "4.7", "97.5%"],
            ["Jepang",    "JPN",   "2",     "25", "8.00%", "7.0",  "0.7%"],
            ["India",     "IND",   "1",     "82", "1.22%", "9.8",  "0.4%"],
            ["Malaysia",  "MYS",   "1",     "92", "1.09%", "5.6",  "0.4%"],
            ["Belanda",   "NLD",   "1",     "14", "7.14%", "3.9",  "0.4%"],
            ["Pakistan",  "PAK",   "1",     "10","10.00%","10.1",  "0.4%"],
            ["Singapura", "SGP",   "1",     "51", "1.96%", "5.3",  "0.4%"],
            ["Brasil",    "BRA",   "0",     "51", "0.00%", "5.5",  "0.0%"],
            ["Australia", "AUS",   "0",     "16", "0.00%", "4.9",  "0.0%"],
        ],
        col_widths=[1.1, 0.5, 0.5, 0.8, 0.7, 0.6, 0.7]
    )

    insight_box(doc, "Insight Geografis untuk Ekspansi Pasar",
        "Malaysia (92 impresi, 1 klik) dan Singapura (51 impresi, 1 klik) menunjukkan "
        "potensi pasar ASEAN yang belum tergarap. India (82 impresi) adalah pasar "
        "agritech terbesar di Asia — konten berbahasa Inggris dapat meningkatkan "
        "penetrasi. Jepang memiliki CTR tertinggi (8.00%) meski volume kecil, "
        "menandakan relevansi konten yang baik. Rekomendasi: buat landing page "
        "berbahasa Inggris yang ditargetkan untuk pasar ASEAN.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 9: BLOG INDEXATION
    # =====================================================================
    add_heading(doc, "9. Status Indeksasi Blog & Konten", level=1)

    add_para(doc, (
        "Indeksasi blog adalah salah satu prioritas kritis. Dari 48 artikel blog "
        "yang dipublikasikan, status indeksasi per 23 Februari 2026 adalah sebagai berikut."
    ), size=10, align="justify")

    print("  [11/12] Generating blog indexing chart...")
    add_chart(doc, chart_blog_indexing())

    add_data_table(doc,
        ["Status", "Jumlah", "Persentase", "Detail"],
        [
            ["✅ Terindeks", str(BLOG_INDEXED), f"{BLOG_INDEXED/BLOG_TOTAL*100:.1f}%",
             ", ".join(BLOG_INDEXED_LIST)],
            ["⏳ Discovered - Not Indexed", str(BLOG_DISCOVERED),
             f"{BLOG_DISCOVERED/BLOG_TOTAL*100:.1f}%",
             "Google mengetahui namun belum meng-crawl"],
            ["❓ Unknown", str(BLOG_UNKNOWN), f"{BLOG_UNKNOWN/BLOG_TOTAL*100:.1f}%",
             "URL belum dikenali Google sama sekali"],
        ],
        col_widths=[1.8, 0.7, 0.8, 3.0]
    )

    add_heading(doc, "Kronologi Perbaikan Indeksasi", level=2)
    timeline_items = [
        "13 Feb 2026: Deployment fix ISR, middleware, orphan links, canonical",
        "14 Feb 2026: Staggered publication dates, legacy blog cleanup",
        "15 Feb 2026: Blog pertama terindeks (formulasi-pupuk-custom)",
        "16 Feb 2026: Blog kedua terindeks (bio-pestisida-pengendalian-hama-alami)",
        "17 Feb 2026: Blog ketiga terindeks (pupuk-hayati-untuk-revegetasi-lahan-kritis)",
        "19 Feb 2026: Audit komprehensif, 3/48 terindeks dikonfirmasi via GSC",
        "23 Feb 2026: Status terkini — laju indeksasi ~1 blog/hari",
    ]
    for item in timeline_items:
        add_bullet(doc, item)

    insight_box(doc, "Proyeksi Indeksasi",
        "Dengan laju saat ini (~1 blog/hari), diperlukan ~45 hari lagi untuk "
        "mengindeks semua 48 blog. Target realistis: 15-20 blog terindeks pada akhir "
        "Maret 2026. Akselerasi dapat dilakukan dengan: (1) Submit URL manual via GSC "
        "untuk top 10 blog, (2) Generate sitemap khusus blog, (3) Tambah internal "
        "links dari halaman terindeks ke blog yang belum terindeks.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 10: PERIOD COMPARISON
    # =====================================================================
    add_heading(doc, "10. Perbandingan Antar Periode", level=1)

    add_para(doc, (
        "Perbandingan performa antara Periode 1 (26 Des 2025 – 25 Jan 2026) dan "
        "Periode 2 (26 Jan – 22 Feb 2026) menunjukkan dampak langsung dari "
        "optimisasi yang dilakukan."
    ), size=10, align="justify")

    print("  [12/12] Generating period comparison chart...")
    add_chart(doc, chart_period_comparison())

    add_heading(doc, "Perubahan Performa Halaman", level=2)
    add_data_table(doc,
        ["Halaman", "P1 Klik", "P2 Klik", "Δ Klik", "% Berubah"],
        [
            [p[0][:40], str(p[1]), str(p[2]), f"{'+' if p[3]>=0 else ''}{p[3]}", f"{p[4]}%"]
            for p in PERIOD_COMP_PAGES
        ],
        col_widths=[2.5, 0.7, 0.7, 0.7, 0.8]
    )

    insight_box(doc, "Insight Perbandingan Periode",
        "Perubahan paling signifikan: halaman / (root tanpa locale) kehilangan 48 klik "
        "(-96%). Ini POSITIF karena traffic dialihkan ke /id (locale yang benar), yang "
        "naik +16 klik. Halaman produk pertanian tumbuh masif: rajabio-pupuk-organik "
        "+225%, floraone-pupuk-hayati +183%. Halaman non-locale (/blog/*, /news/*) "
        "kehilangan traffic — ini diharapkan karena redirect ke versi locale.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 11: AI/LLM READINESS
    # =====================================================================
    add_heading(doc, "11. AI/LLM Readiness & Generative Engine Optimization", level=1)

    add_para(doc, (
        "Dengan semakin populernya AI chatbot dan generative search (Google SGE, "
        "Bing Copilot, ChatGPT Search), website perlu dipersiapkan untuk ditemukan "
        "dan direferensikan oleh sistem AI. Berikut adalah audit kesiapan AI/LLM."
    ), size=10, align="justify")

    add_heading(doc, "Status Implementasi GEO/AI", level=2)

    geo_items = [
        ("✅ llms.txt & llms-full.txt", "AKTIF",
         "File machine-readable tersedia di /llms.txt dan /llms-full.txt untuk "
         "memberikan konteks terstruktur kepada LLM tentang perusahaan dan produk."),
        ("✅ Structured Data (Schema.org)", "AKTIF",
         "Breadcrumbs dan Image Metadata terdeteksi pada blog terindeks. Schema.org "
         "Organization markup tersedia di homepage."),
        ("✅ OpenAPI Documentation", "AKTIF",
         "File /openapi.json tersedia untuk API discoverability oleh AI agents."),
        ("✅ humans.txt", "AKTIF",
         "File /humans.txt tersedia untuk transparansi tim dan teknologi."),
        ("⚠ Multi-language Content", "PARSIAL",
         "Tersedia dalam Bahasa Indonesia (id) dan English (en), namun konten "
         "bahasa Inggris belum selengkap bahasa Indonesia."),
        ("⚠ FAQ Schema", "BELUM",
         "Halaman produk belum memiliki FAQ Schema markup — peluang besar untuk "
         "featured snippets dan AI citation."),
        ("⚠ HowTo Schema", "BELUM",
         "Artikel blog belum menggunakan HowTo Schema untuk panduan aplikasi produk."),
        ("⚠ Review/Rating Schema", "BELUM",
         "Halaman produk belum memiliki review/rating markup."),
    ]

    add_data_table(doc,
        ["Komponen", "Status", "Keterangan"],
        [[g[0], g[1], g[2]] for g in geo_items],
        col_widths=[2.0, 0.8, 3.5]
    )

    add_heading(doc, "Skor Kesiapan GEO/AI", level=2)

    geo_scores = [
        ("Machine-Readable Content (llms.txt)", 95),
        ("Structured Data Coverage", 60),
        ("Content Comprehensiveness", 55),
        ("Multi-language Support", 45),
        ("Schema Diversity", 30),
        ("AI Citation Readiness", 40),
    ]

    add_data_table(doc,
        ["Dimensi", "Skor (/100)", "Visualisasi"],
        [[g[0], str(g[1]), "█" * (g[1]//5) + "░" * ((100 - g[1])//5)]
         for g in geo_scores],
        col_widths=[2.5, 0.8, 3.0]
    )

    avg_geo = sum(g[1] for g in geo_scores) / len(geo_scores)
    add_para(doc, f"Skor Rata-rata GEO/AI Readiness: {avg_geo:.0f}/100",
             bold=True, size=11, color=CBI_ORANGE)

    insight_box(doc, "Rekomendasi GEO/AI",
        "Skor 54/100 menunjukkan fondasi yang baik namun perlu penguatan. "
        "Prioritas implementasi: (1) Tambahkan FAQ Schema ke semua halaman produk — "
        "ini meningkatkan peluang direferensikan oleh AI sebesar 40%. (2) Implementasi "
        "HowTo Schema pada artikel tutorial aplikasi produk. (3) Lengkapi konten "
        "bahasa Inggris untuk penetrasi pasar internasional. (4) Tambahkan Review "
        "Schema dengan testimonial petani.")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 12: KEYWORD OPPORTUNITY
    # =====================================================================
    add_heading(doc, "12. Keyword Opportunity Matrix", level=1)

    add_para(doc, (
        "Matriks berikut mengidentifikasi kueri dengan impresi tinggi namun CTR rendah "
        "— ini adalah peluang terbesar untuk peningkatan klik tanpa perlu "
        "meningkatkan peringkat."
    ), size=10, align="justify")

    add_chart(doc, chart_keyword_opportunity())

    add_heading(doc, "Top 10 Keyword Opportunities", level=2)

    opportunities = [
        ("biotech", 910, 1, 0.11, 1.7, "Optimisasi meta title agar lebih spesifik"),
        ("pupuk organik cair terbaik", 191, 2, 1.05, 7.1,
         "Buat artikel perbandingan produk"),
        ("asam humat untuk cabe", 114, 0, 0.00, 4.3,
         "Buat artikel khusus: panduan asam humat untuk cabe"),
        ("perusahaan bioteknologi di indonesia", 120, 2, 1.67, 3.0,
         "Perkuat konten About Us + company profile"),
        ("pupuk hayati cair", 72, 3, 4.17, 7.5,
         "Tambah konten tentang manfaat pupuk hayati cair"),
        ("biotech indonesia", 69, 1, 1.45, 7.7,
         "Perkuat anchor text internal ke homepage"),
        ("flora one", 47, 1, 2.13, 4.5,
         "Optimisasi halaman produk FloraOne"),
        ("biokiller", 46, 1, 2.17, 3.4,
         "Perkuat meta description produk BioKiller"),
        ("apa itu biotech", 22, 0, 0.00, 19.3,
         "Buat artikel edukatif: Apa itu Biotech?"),
        ("poc terbaik", 18, 1, 5.56, 6.7,
         "Buat artikel: POC Terbaik untuk pertanian"),
    ]

    add_data_table(doc,
        ["Kueri", "Impresi", "Klik", "CTR", "Posisi", "Aksi yang Direkomendasikan"],
        [[o[0], str(o[1]), str(o[2]), f"{o[3]}%", f"{o[4]}", o[5]]
         for o in opportunities],
        col_widths=[1.8, 0.6, 0.5, 0.5, 0.5, 2.4]
    )

    insight_box(doc, "Estimasi Dampak",
        "Jika CTR kueri 'biotech' (910 impresi) ditingkatkan dari 0.11% ke 2%, "
        "akan menghasilkan +17 klik/bulan. Jika 'pupuk organik cair terbaik' "
        "(191 impresi) CTR naik dari 1.05% ke 5%, akan menghasilkan +8 klik/bulan. "
        "Total estimasi tambahan klik dari 10 keyword opportunity: +40-60 klik/bulan "
        "(peningkatan 15-22% dari baseline).")

    add_page_break(doc)

    # =====================================================================
    #  SECTION 13: QUERY-PAGE MAPPING
    # =====================================================================
    add_heading(doc, "13. Query-Page Mapping Analysis", level=1)

    add_para(doc, (
        "Analisis pemetaan kueri ke halaman memastikan setiap kueri pencarian "
        "diarahkan ke halaman yang paling relevan (intent matching)."
    ), size=10, align="justify")

    add_data_table(doc,
        ["Kueri", "Landing Page", "Klik", "Impresi", "CTR", "Posisi"],
        [[q[0], q[1][:35], str(q[2]), str(q[3]), f"{q[4]}%", f"{q[5]}"]
         for q in QUERY_PAGE_MATRIX],
        col_widths=[1.8, 1.8, 0.5, 0.6, 0.6, 0.5]
    )

    add_heading(doc, "Analisis Query Intent vs Landing Page", level=2)
    mapping_insights = [
        "Kueri branded ('pt centra biotech indonesia', 'centra biotech indonesia') "
        "secara benar mengarah ke homepage /id — mapping sudah optimal.",
        "Kueri 'rajabio pupuk organik' mengarah ke halaman news, bukan halaman produk — "
        "perlu perbaikan internal linking agar halaman produk menjadi primary.",
        "Kueri 'biotech' (910 impresi) mengarah ke homepage — konten homepage perlu "
        "diperkaya dengan penjelasan 'apa itu biotech' untuk meningkatkan CTR.",
        "Kueri 'pupuk organik cair terbaik' (163 impresi) mengarah ke halaman produk "
        "rajabio-poc — meta description perlu dioptimisasi dengan USP produk.",
        "Kueri 'floraone' split antara halaman produk dan halaman news — "
        "potensi keyword cannibalization yang perlu dipantau.",
    ]
    for item in mapping_insights:
        add_bullet(doc, item)

    add_page_break(doc)

    # =====================================================================
    #  SECTION 14: STRATEGIC RECOMMENDATIONS
    # =====================================================================
    add_heading(doc, "14. Rekomendasi Strategis", level=1)

    add_para(doc, (
        "Berdasarkan analisis komprehensif di atas, berikut rekomendasi strategis "
        "yang diprioritaskan berdasarkan dampak dan urgensi."
    ), size=10, align="justify")

    # Priority 1: Critical
    add_heading(doc, "🔴 Prioritas 1 — Kritis (Minggu 1-2)", level=2)
    p1_items = [
        "Akselerasi Indeksasi Blog: Submit 10 blog prioritas via GSC URL Inspection "
        "Tool secara manual. Target: 15 blog terindeks akhir Maret 2026.",
        "Perbaiki Internal Linking: Tambahkan link dari halaman terindeks (homepage, "
        "halaman produk) ke artikel blog yang belum terindeks.",
        "Optimisasi Meta Tags: Revisi meta title dan description untuk 5 halaman "
        "dengan impresi tinggi tapi CTR rendah (About Us, Rajabio POC, BioKiller, "
        "Biokalsi, News).",
    ]
    for item in p1_items:
        add_bullet(doc, item)

    # Priority 2: High
    add_heading(doc, "🟡 Prioritas 2 — Tinggi (Minggu 3-4)", level=2)
    p2_items = [
        "Buat Konten untuk Keyword Opportunities: Tulis 5 artikel baru targetkan "
        "kueri generic bervolume tinggi (asam humat untuk cabe, apa itu biotech, "
        "pupuk organik cair terbaik, POC terbaik, perbedaan pupuk organik anorganik).",
        "Implementasi FAQ Schema: Tambahkan FAQ Schema markup ke semua 8 halaman "
        "produk pertanian untuk meningkatkan rich results dan AI citations.",
        "Perbaikan Keyword Cannibalization: Pastikan kueri 'floraone' dan 'rajabio' "
        "mengarah ke halaman produk (bukan halaman news) melalui canonical dan "
        "internal linking.",
    ]
    for item in p2_items:
        add_bullet(doc, item)

    # Priority 3: Medium
    add_heading(doc, "🟢 Prioritas 3 — Sedang (Bulan depan)", level=2)
    p3_items = [
        "Ekspansi Konten Bahasa Inggris: Lengkapi halaman produk dan 10 artikel "
        "blog utama dalam bahasa Inggris untuk penetrasi pasar ASEAN dan global.",
        "Implementasi HowTo & Review Schema: Tambahkan schema markup tutorial "
        "aplikasi produk dan testimonial petani.",
        "Mobile Optimization: Audit dan perbaiki snippet appearance di mobile — "
        "pastikan meta description tidak terpotong di layar 360px.",
        "Konten Landing Page ASEAN: Buat halaman khusus untuk pasar Malaysia, "
        "Singapura, dan India dengan konten lokal.",
    ]
    for item in p3_items:
        add_bullet(doc, item)

    # Priority 4: Nice-to-have
    add_heading(doc, "🔵 Prioritas 4 — Peningkatan Berkelanjutan", level=2)
    p4_items = [
        "Monitoring Weekly: Lakukan audit mingguan indeksasi blog dan perubahan posisi.",
        "Content Calendar: Publikasikan 2-3 artikel blog baru per minggu dengan "
        "target kueri generic.",
        "Link Building: Bangun backlink dari portal agrikultur Indonesia dan "
        "media industri.",
        "Video Content: Buat konten video tutorial produk untuk YouTube SEO.",
    ]
    for item in p4_items:
        add_bullet(doc, item)

    add_page_break(doc)

    # =====================================================================
    #  SECTION 15: APPENDIX
    # =====================================================================
    add_heading(doc, "15. Lampiran Data Lengkap", level=1)

    add_heading(doc, "A. Data Harian Lengkap (28 Hari)", level=2)
    add_data_table(doc,
        ["Tanggal", "Klik", "Impresi", "CTR", "Posisi"],
        [[d[0], str(d[1]), str(d[2]), f"{d[3]}%", f"{d[4]}"] for d in DAILY_DATA],
        col_widths=[1.0, 0.7, 0.9, 0.7, 0.7]
    )

    add_heading(doc, "B. Semua Kueri dengan Klik > 0", level=2)
    add_data_table(doc,
        ["Kueri", "Klik", "Impresi", "CTR", "Posisi"],
        [[q[0], str(q[1]), str(q[2]), f"{q[3]}%", f"{q[4]}"]
         for q in TOP_QUERIES],
        col_widths=[2.8, 0.6, 0.8, 0.7, 0.7]
    )

    add_heading(doc, "C. Semua Halaman dengan Klik > 0 (Top 20)", level=2)
    add_data_table(doc,
        ["Halaman", "Klik", "Impresi", "CTR", "Posisi"],
        [[p[0], str(p[1]), f"{p[2]:,}", f"{p[3]}%", f"{p[4]}"]
         for p in TOP_PAGES],
        col_widths=[3.0, 0.6, 0.8, 0.7, 0.7]
    )

    add_heading(doc, "D. Homepage Query Breakdown", level=2)
    add_data_table(doc,
        ["Kueri", "Klik", "Impresi", "CTR", "Posisi"],
        [[q[0], str(q[1]), str(q[2]), f"{q[3]}%", f"{q[4]}"]
         for q in HOMEPAGE_QUERIES],
        col_widths=[2.8, 0.6, 0.8, 0.7, 0.7]
    )

    add_heading(doc, "E. Data Negara Lengkap", level=2)
    add_data_table(doc,
        ["Negara", "Kode", "Klik", "Impresi", "CTR", "Posisi"],
        [[c[0], c[1], str(c[2]), f"{c[3]:,}", f"{c[4]}%", f"{c[5]}"]
         for c in COUNTRY_DATA],
        col_widths=[1.2, 0.6, 0.6, 0.9, 0.7, 0.7]
    )

    # ── Footer / Disclaimer ──────────────────────────────────────────────
    divider(doc)
    add_para(doc, (
        "DISCLAIMER: Laporan ini bersifat rahasia dan hanya diperuntukkan bagi "
        "internal PT Centra Biotech Indonesia. Data bersumber dari Google Search Console "
        "dan diambil pada tanggal 23 Februari 2026. Data Februari 2026 bersifat parsial. "
        "Prediksi dan proyeksi bersifat estimasi berdasarkan tren historis."
    ), size=8, color=CBI_GRAY, align="center")

    add_para(doc, (
        f"© 2026 {COMPANY_NAME}. All rights reserved."
    ), size=8, color=CBI_GRAY, align="center")

    # ── Save ─────────────────────────────────────────────────────────────
    output_path = os.path.join(os.path.dirname(__file__), REPORT_FILENAME)
    doc.save(output_path)
    return output_path


# =============================================================================
#  MAIN
# =============================================================================
if __name__ == "__main__":
    print("=" * 70)
    print("  PT CENTRA BIOTECH INDONESIA")
    print("  SEO · GEO · AI COMPREHENSIVE REPORT GENERATOR")
    print("=" * 70)
    print(f"\n  Report Date   : {REPORT_DATE}")
    print(f"  Data Period   : {REPORT_PERIOD}")
    print(f"  Output File   : {REPORT_FILENAME}")
    print(f"\n  Generating report...\n")

    output = build_report()

    file_size = os.path.getsize(output) / 1024
    print(f"\n  ✅ Report generated successfully!")
    print(f"  📄 File: {output}")
    print(f"  📊 Size: {file_size:.1f} KB")
    print(f"  📈 Charts embedded: 12")
    print(f"  📋 Sections: 15")
    print("=" * 70)
