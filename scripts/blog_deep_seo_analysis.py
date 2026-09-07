#!/usr/bin/env python3
"""
CBI Blog Deep Technical SEO Analysis & Diagnosis Report
========================================================
Senior Technical SEO Analysis: Why do 48 blogs have 0% indexing rate?
Root cause investigation with technical proof and visualizations.

Author: Senior Technical SEO Engineer
Date: February 13, 2026
"""

import json
import os
from datetime import datetime
from pathlib import Path

# ============================================================
# RAW DATA FROM GSC + VPS INVESTIGATION
# ============================================================

# GSC Performance Data (Jan 2025 - Feb 2026, 13+ months)
GSC_BLOG_PERFORMANCE = {
    "period": "2025-01-01 to 2026-02-13",
    "total_blog_urls_in_gsc": 9,
    "total_blogs_in_strapi": 48,
    "blogs_with_impressions": 5,
    "blogs_with_clicks": 4,
    "total_clicks": 122,
    "total_impressions": 58688,
    "overall_ctr": 0.21,  # %
    "pages": [
        {"url": "/blog/penyakit-ganoderma-kelapa-sawit", "clicks": 61, "impressions": 14155, "ctr": 0.43, "position": 12.5, "type": "old_url", "indexed": False, "gsc_status": "Not found (404)"},
        {"url": "/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya", "clicks": 40, "impressions": 15159, "ctr": 0.26, "position": 7.2, "type": "old_url", "indexed": False, "gsc_status": "Not found (404)"},
        {"url": "/blog/perbedaan-sampah-organik-dan-anorganik", "clicks": 17, "impressions": 28805, "ctr": 0.06, "position": 10.0, "type": "old_url", "indexed": False, "gsc_status": "Not found (404)"},
        {"url": "/id/blog/produsen-pupuk-hayati-indonesia", "clicks": 3, "impressions": 77, "ctr": 3.90, "position": 8.9, "type": "new_url", "indexed": False, "gsc_status": "Discovered - currently not indexed"},
        {"url": "/blog/pupuk-hayati-untuk-teh", "clicks": 1, "impressions": 70, "ctr": 1.43, "position": 6.8, "type": "old_url", "indexed": True, "gsc_status": "Indexed (canonical mismatch)"},
        {"url": "/blog/ini-contoh-dari-blog-1", "clicks": 0, "impressions": 357, "ctr": 0.0, "position": 82.2, "type": "legacy_test", "indexed": False, "gsc_status": "Unknown to Google"},
        {"url": "/blog/perbedaan-sampah-organik-dan-anorganik", "clicks": 0, "impressions": 494, "ctr": 0.0, "position": 1.0, "type": "old_url_30d", "indexed": False, "gsc_status": "Not found (404)"},
        {"url": "/blog/ini-contoh-dari-blog-2", "clicks": 0, "impressions": 19, "ctr": 0.0, "position": 73.1, "type": "legacy_test", "indexed": False, "gsc_status": "Unknown to Google"},
        {"url": "/blog/ini-contoh-dari-blog-3", "clicks": 0, "impressions": 98, "ctr": 0.0, "position": 83.6, "type": "legacy_test", "indexed": False, "gsc_status": "Unknown to Google"},
    ]
}

# Full indexing audit results (48 blogs checked via GSC URL Inspection API)
INDEXING_AUDIT = {
    "total_checked": 48,
    "indexed": 0,
    "not_indexed": 48,
    "status_breakdown": {
        "Discovered - currently not indexed": 48,
        "Indexed": 0,
        "Not found (404)": 0,
        "Robots blocked": 0,
    },
    "fetch_status": {
        "PAGE_FETCH_STATE_UNSPECIFIED": 48,
        "SUCCESSFUL": 0,
    }
}

# Old URL indexing check (URLs Google has in search results)
OLD_URL_AUDIT = {
    "total_checked": 7,
    "indexed": 1,
    "not_indexed": 6,
    "details": [
        {"url": "/blog/perbedaan-sampah-organik-dan-anorganik", "status": "Not found (404)", "redirect_to": "/id/blog/perbedaan-sampah-organik-dan-anorganik", "http_code": 301},
        {"url": "/blog/penyakit-ganoderma-kelapa-sawit", "status": "Not found (404)", "redirect_to": "/id/blog/penyakit-ganoderma-kelapa-sawit", "http_code": 301},
        {"url": "/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya", "status": "Not found (404)", "redirect_to": "/id/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya", "http_code": 301},
        {"url": "/blog/pupuk-hayati-untuk-teh", "status": "Indexed (canonical conflict)", "redirect_to": "/id/blog/pupuk-hayati-untuk-teh", "http_code": 301, "google_canonical": "/blog/pupuk-hayati-untuk-teh", "declared_canonical": "/id/blog/pupuk-hayati-untuk-teh"},
        {"url": "/blog/ini-contoh-dari-blog-1", "status": "Unknown to Google", "redirect_to": None, "http_code": 301},
        {"url": "/blog/ini-contoh-dari-blog-2", "status": "Unknown to Google", "redirect_to": None, "http_code": 301},
        {"url": "/blog/ini-contoh-dari-blog-3", "status": "Unknown to Google", "redirect_to": None, "http_code": 301},
    ]
}

# Technical findings from VPS investigation
TECHNICAL_FINDINGS = {
    "strapi_database": {
        "total_blogs": 48,
        "all_published": True,
        "locale": "id (all)",
        "robots_directive_set": 0,
        "has_content": 48,
        "min_content_length": 2211,
        "max_content_length": 18951,
        "avg_content_length": 13200,
    },
    "url_structure": {
        "sitemap_format": "/id/blog/{slug}",
        "google_indexed_format": "/blog/{slug}",
        "middleware_redirect": "/blog/{slug} → 301 → /id/blog/{slug}",
        "all_200_with_locale": True,
        "all_200_without_locale_follow_redirect": True,
    },
    "http_headers": {
        "cache_control": "private, no-cache, no-store, max-age=0, must-revalidate",
        "x_vercel_cache": "MISS",
        "x_robots_tag": None,  # Not present = good
        "has_canonical": True,
        "canonical_format": "/id/blog/{slug}",
    },
    "internal_linking": {
        "homepage_blog_links": 3,
        "blog_listing_visible_links": 10,
        "total_blogs": 48,
        "orphaned_blogs": 38,  # 48 - 10
        "pagination_type": "client_side_js",
    },
    "sitemap": {
        "total_urls": 48,
        "format": "https://www.centrabiotechindonesia.com/id/blog/{slug}",
        "submitted_to_gsc": True,
    }
}

# All 48 blog slugs from Strapi DB
ALL_BLOG_SLUGS = [
    "perbedaan-sampah-organik-dan-anorganik",
    "penyakit-ganoderma-kelapa-sawit",
    "pengertian-pupuk-organik-jenis-dan-manfaatnya",
    "formulasi-pupuk-custom",
    "teknologi-fermentasi-pupuk-hayati",
    "strategi-branding-pupuk-organik",
    "cara-daftar-pupuk-kementan",
    "tren-pupuk-organik-indonesia",
    "pupuk-hayati-pengertian-lengkap",
    "jenis-jenis-pupuk-hayati-terbaik",
    "manfaat-pupuk-hayati-untuk-pertanian",
    "cara-membuat-pupuk-hayati-sendiri",
    "pupuk-hayati-untuk-padi",
    "pupuk-hayati-untuk-jagung",
    "pupuk-hayati-vs-pupuk-kimia-perbandingan",
    "harga-pupuk-hayati-terbaru",
    "pupuk-hayati-terbaik-indonesia",
    "pupuk-organik-cair-panduan-lengkap",
    "jenis-pupuk-organik-cair-terbaik",
    "cara-menggunakan-pupuk-organik-cair",
    "distributor-pupuk-organik-cair-terpercaya",
    "pembenah-tanah-panduan-lengkap-rehabilitasi",
    "asam-humat-cair-manfaat-dosis-aplikasi",
    "bio-pestisida-pengendalian-hama-alami",
    "pupuk-hayati-untuk-cabai",
    "pupuk-hayati-mol-mikroorganisme-lokal",
    "pupuk-hayati-vs-pupuk-organik",
    "aplikasi-pupuk-hayati-musim-hujan",
    "pupuk-hayati-untuk-tomat",
    "pupuk-hayati-untuk-melon-semangka",
    "pupuk-hayati-untuk-lahan-gambut",
    "pupuk-hayati-untuk-revegetasi-lahan-kritis",
    "pupuk-hayati-untuk-urban-farming-pertanian-perkotaan",
    "pupuk-hayati-adaptasi-perubahan-iklim-pertanian",
    "pupuk-hayati-untuk-pembibitan-bibit-berkualitas",
    "pupuk-hayati-starter-transplanting-pindah-tanam",
    "pupuk-hayati-untuk-tanaman-hias-ornamental",
    "pupuk-hayati-untuk-perkebunan-skala-kecil-petani-mandiri",
    "pupuk-hayati-untuk-sayuran",
    "pupuk-hayati-untuk-kelapa-sawit",
    "pupuk-hayati-untuk-tebu",
    "pupuk-hayati-cair-vs-padat",
    "pupuk-hayati-untuk-greenhouse",
    "pupuk-hayati-bersertifikat-kementan",
    "cara-menyimpan-pupuk-hayati",
    "efek-samping-pupuk-hayati",
    "pupuk-hayati-untuk-tanaman-buah",
    "pupuk-hayati-untuk-hidroponik",
]

# Root cause analysis
ROOT_CAUSES = [
    {
        "id": "RC1",
        "severity": "CRITICAL",
        "title": "Google Cannot Fetch Blog Pages (PAGE_FETCH_STATE_UNSPECIFIED)",
        "description": "All 48 blog URLs show 'Discovered - currently not indexed' with PAGE_FETCH_STATE_UNSPECIFIED. Google's crawler has found the URLs via sitemap but has NEVER successfully fetched/rendered them.",
        "evidence": "GSC URL Inspection API: 48/48 blogs = PAGE_FETCH_STATE_UNSPECIFIED",
        "impact": "100% blog content is invisible to Google search",
        "technical_detail": "This status means Googlebot discovered the URL but the rendering queue hasn't processed it yet, OR the server response was problematic during crawl attempts.",
    },
    {
        "id": "RC2",
        "severity": "CRITICAL",
        "title": "Aggressive No-Cache Headers Blocking Crawl Budget",
        "description": "Blog pages return 'Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate' which forces Googlebot to re-download every resource on every visit, wasting crawl budget on a small site.",
        "evidence": "HTTP Response: cache-control: private, no-cache, no-store, max-age=0, must-revalidate; x-vercel-cache: MISS",
        "impact": "Google deprioritizes crawling pages that appear uncacheable, especially on low-authority domains",
        "technical_detail": "For a new/small domain, Google allocates limited crawl budget. When every page costs full bandwidth, Google may defer crawling in favor of already-indexed or higher-authority pages.",
    },
    {
        "id": "RC3",
        "severity": "HIGH",
        "title": "38/48 Blogs are Orphaned (No Internal Links)",
        "description": "Only 10 blogs are visible on the blog listing page due to client-side JavaScript pagination. 38 blogs have ZERO crawlable internal links pointing to them.",
        "evidence": "Blog listing page (/id/blog) only renders 10 blog links in HTML. Homepage links to only 3 blogs. Remaining 38 blogs are behind JS pagination, invisible to Googlebot.",
        "impact": "Googlebot discovers orphaned pages only via sitemap (low priority) instead of through internal links (high priority)",
        "technical_detail": "Googlebot CAN render JavaScript, but orphaned pages discovered only via sitemap get lowest crawl priority. With aggressive no-cache headers, Google may never allocate budget to crawl them.",
    },
    {
        "id": "RC4",
        "severity": "HIGH",
        "title": "Canonical URL Conflict Between Old and New URL Structures",
        "description": "Google indexed blogs at /blog/{slug} (old format) but the site declares canonical as /id/blog/{slug} (new format). Middleware 301 redirects old→new, but Google refuses to follow for some URLs.",
        "evidence": "GSC shows /blog/pupuk-hayati-untuk-teh as indexed with Google choosing '/blog/pupuk-hayati-untuk-teh' instead of declared '/id/blog/pupuk-hayati-untuk-teh'. Three other old URLs show 'Not found (404)' despite 301 redirecting correctly.",
        "impact": "Google's canonical confusion prevents consolidation of ranking signals. Old URLs show in search results but may serve 404 on re-crawl.",
        "technical_detail": "Google treats 301 redirects as suggestions, not mandates. If the old URL has stronger signals (backlinks, historical data), Google may keep indexing the old version, creating canonical conflicts.",
    },
    {
        "id": "RC5",
        "severity": "MEDIUM",
        "title": "Content Similarity / Thin Content Signals Among 45 New Blogs",
        "description": "45 blogs were published on the same date (Jan 3, 2026) with similar titles all about 'pupuk hayati' (biofertilizer). This pattern triggers Google's quality filters for mass-produced content.",
        "evidence": "Strapi DB: 45 blogs published_at '2026-01-03 12:31:13' with titles like 'Pupuk Hayati untuk Padi', 'Pupuk Hayati untuk Jagung', 'Pupuk Hayati untuk Cabai' etc.",
        "impact": "Google's spam detection may flag mass-published similar content, deprioritizing all of them in crawl queue",
        "technical_detail": "Publishing 45 articles with near-identical title patterns on the same timestamp is a strong signal of programmatic content creation. Google's SpamBrain algorithm specifically targets this behavior.",
    },
    {
        "id": "RC6",
        "severity": "MEDIUM",
        "title": "Slug-Title Mismatch (Misleading Meta Data)",
        "description": "Many blogs have slugs that don't match their actual meta_title, creating confusion for search engines.",
        "evidence": "Blog ID 82: slug='pupuk-hayati-untuk-cabai' but meta_title='Pupuk Hayati Cair vs Padat: Mana Lebih Efektif?'. Blog ID 83: slug='pupuk-hayati-mol-mikroorganisme-lokal' but meta_title='Pupuk Hayati untuk Sawit: Tingkatkan TBS 20%'",
        "impact": "URL-title mismatch reduces relevance signals and confuses ranking algorithms",
        "technical_detail": "Google uses URL slugs as a secondary relevance signal. When the slug says 'cabai' but the title says 'cair vs padat', it dilutes topical authority.",
    },
    {
        "id": "RC7",
        "severity": "LOW",
        "title": "Legacy Test Blog Pages Still in Google Index",
        "description": "Three test blog pages (ini-contoh-dari-blog-1/2/3) are still appearing in Google search results with combined 474 impressions, wasting crawl budget and diluting blog authority.",
        "evidence": "GSC shows /blog/ini-contoh-dari-blog-1 with 357 impressions at position 82.2",
        "impact": "Minor crawl budget waste and brand reputation issue",
        "technical_detail": "These test pages should be removed from Strapi and 410 Gone responses should be sent to speed up de-indexing.",
    },
]

# Save complete analysis data
analysis_data = {
    "report_metadata": {
        "title": "CBI Blog Deep Technical SEO Analysis",
        "generated_at": datetime.now().isoformat(),
        "analysis_type": "Root Cause Investigation",
        "analyst": "Senior Technical SEO Engineer",
        "subject": "Why 48 blogs have 0% indexing rate despite being published and accessible",
    },
    "gsc_performance": GSC_BLOG_PERFORMANCE,
    "indexing_audit": INDEXING_AUDIT,
    "old_url_audit": OLD_URL_AUDIT,
    "technical_findings": TECHNICAL_FINDINGS,
    "all_blog_slugs": ALL_BLOG_SLUGS,
    "root_causes": ROOT_CAUSES,
}

# Save to JSON
reports_dir = Path("reports")
reports_dir.mkdir(exist_ok=True)
with open(reports_dir / "blog_deep_analysis_data.json", "w") as f:
    json.dump(analysis_data, f, indent=2, default=str)

print("=" * 70)
print("  BLOG DEEP SEO ANALYSIS DATA COLLECTED")
print("=" * 70)
print(f"\n  Total Blogs in Strapi: {TECHNICAL_FINDINGS['strapi_database']['total_blogs']}")
print(f"  Blogs Indexed by Google: {INDEXING_AUDIT['indexed']}")
print(f"  Indexing Rate: {INDEXING_AUDIT['indexed']/INDEXING_AUDIT['total_checked']*100:.0f}%")
print(f"\n  Root Causes Identified: {len(ROOT_CAUSES)}")
for rc in ROOT_CAUSES:
    print(f"    [{rc['severity']}] {rc['id']}: {rc['title']}")
print(f"\n  Data saved to: reports/blog_deep_analysis_data.json")
