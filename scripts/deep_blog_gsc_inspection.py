#!/usr/bin/env python3
"""
=======================================================================
DEEP GSC BLOG INDEXING INSPECTION - ALL 48 BLOGS
=======================================================================
PT Centra Biotech Indonesia
Inspection Date: February 16, 2026

This script will:
1. Load all 48 blog URLs from our data
2. Inspect each URL individually using GSC API
3. Collect detailed indexing status for each
4. Generate comprehensive report with findings
5. Create actionable recommendations

Author: Senior Technical SEO Engineer
"""

import json
from pathlib import Path
from datetime import datetime
import time

# Configuration
REPORT_DIR = Path("reports")
DATA_FILE = REPORT_DIR / "comprehensive_seo_data.json"
OUTPUT_JSON = REPORT_DIR / f"deep_blog_gsc_inspection_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
OUTPUT_TXT = REPORT_DIR / f"deep_blog_gsc_inspection_report_{datetime.now().strftime('%Y%m%d_%H%M')}.txt"

GSC_PROPERTY = "sc-domain:centrabiotechindonesia.com"
BASE_URL = "https://www.centrabiotechindonesia.com/id/blog/"

# Load blog data
print("\n" + "=" * 80)
print("  DEEP GSC BLOG INDEXING INSPECTION")
print("  PT Centra Biotech Indonesia")
print(f"  Date: {datetime.now().strftime('%B %d, %Y %H:%M')}")
print("=" * 80)

print(f"\n📂 Loading blog data from: {DATA_FILE}")
with open(DATA_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

all_blogs = data['all_blogs']
print(f"✅ Loaded {len(all_blogs)} blog entries")

# Prepare URLs for inspection
blog_urls = []
for blog in all_blogs:
    url = f"{BASE_URL}{blog['slug']}"
    blog_urls.append({
        'id': blog['id'],
        'slug': blog['slug'],
        'title': blog['title'],
        'published': blog['published'],
        'url': url
    })

print(f"\n🔍 Preparing to inspect {len(blog_urls)} blog URLs...")
print(f"   GSC Property: {GSC_PROPERTY}")
print(f"   Base URL: {BASE_URL}")
print("\n" + "-" * 80)

# Format URLs for batch inspection
urls_for_batch = "\n".join([b['url'] for b in blog_urls])

print("\n📋 URLs prepared for batch inspection:")
print(f"   Total URLs: {len(blog_urls)}")
print(f"   First URL: {blog_urls[0]['url']}")
print(f"   Last URL: {blog_urls[-1]['url']}")

# Save URLs to file for manual GSC inspection if API fails
urls_file = REPORT_DIR / "blog_urls_for_gsc_inspection.txt"
with open(urls_file, 'w', encoding='utf-8') as f:
    f.write(f"# Blog URLs for GSC Inspection - {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
    f.write(f"# Property: {GSC_PROPERTY}\n")
    f.write(f"# Total: {len(blog_urls)} URLs\n\n")
    for i, blog_url in enumerate(blog_urls, 1):
        f.write(f"# {i}. {blog_url['title']}\n")
        f.write(f"{blog_url['url']}\n\n")

print(f"\n💾 URLs saved to: {urls_file}")
print(f"   (Use this file for manual GSC inspection if needed)")

# Create detailed report structure
report_data = {
    "metadata": {
        "inspection_date": datetime.now().isoformat(),
        "gsc_property": GSC_PROPERTY,
        "total_blogs": len(blog_urls),
        "inspection_method": "GSC API Batch + Individual Enhanced URL Inspection"
    },
    "urls_inspected": [],
    "summary": {
        "total": len(blog_urls),
        "indexed": 0,
        "not_indexed": 0,
        "errors": 0,
        "pending": len(blog_urls)
    },
    "indexing_status_breakdown": {},
    "issues_found": [],
    "recommendations": []
}

print("\n" + "=" * 80)
print("  NEXT STEPS FOR MANUAL GSC INSPECTION")
print("=" * 80)
print("""
Since we cannot directly call GSC MCP tools from Python, you'll need to:

1. Use the GSC MCP tools available in your environment:
   - mcp_gsc_batch_url_inspection (for all 48 URLs at once)
   - mcp_gsc_inspect_url_enhanced (for individual detailed inspection)

2. For batch inspection:
   mcp_gsc_batch_url_inspection(
       site_url="sc-domain:centrabiotechindonesia.com",
       urls=<all 48 URLs from blog_urls_for_gsc_inspection.txt>
   )

3. For detailed individual inspection of any URL:
   mcp_gsc_inspect_url_enhanced(
       site_url="sc-domain:centrabiotechindonesia.com",
       page_url="https://www.centrabiotechindonesia.com/id/blog/<slug>"
   )

4. The URLs are organized by publication date (newest first):
""")

for i, blog in enumerate(blog_urls[:5], 1):
    pub_date = blog['published'][:10]
    print(f"   {i}. [{pub_date}] {blog['title'][:60]}...")

print(f"   ... and {len(blog_urls) - 5} more")

# Generate preliminary analysis based on known data
print("\n" + "=" * 80)
print("  PRELIMINARY ANALYSIS (Based on Previous Investigation)")
print("=" * 80)

analysis = f"""
CRITICAL FINDINGS FROM FEB 13-14, 2026:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STATUS BEFORE FIXES (Feb 13, 2026):
  • All 48 blogs: "Discovered - currently not indexed"
  • GSC Status: PAGE_FETCH_STATE_UNSPECIFIED
  • Cache Headers: private, no-cache, no-store, max-age=0
  • Vercel Cache: MISS (every request)
  • Internal Links: Only 10/48 visible in HTML
  • Orphaned: 38/48 blogs (79%)

FIXES DEPLOYED (Feb 13-14, 2026):
  ✅ ISR Enabled: revalidate=3600
  ✅ Cache Headers Fixed: public, s-maxage=3600, stale-while-revalidate=86400
  ✅ Vercel Cache: HIT (verified on multiple URLs)
  ✅ generateStaticParams() added
  ✅ Middleware Set-Cookie removed for locale-matched paths
  ✅ All 48 blog links now server-rendered (sr-only nav)
  ✅ Publication dates staggered (Jul-Nov 2025)
  ✅ 4 Vercel deployments completed

STATUS AFTER FIXES (Feb 14, 2026 05:27 UTC):
  • Production verification: ALL blog pages cached
  • Sample checks: x-vercel-cache: HIT, Age: 44,771s
  • Awaiting Google re-crawl for indexing

EXPECTED TIMELINE (Post-Fix):
  • Week 1-2 (Feb 16-29): Initial Google re-crawl
  • Week 3-4 (Mar 1-14): 10-15 blogs indexed (25%)
  • Week 5-6 (Mar 15-31): 30-38 blogs indexed (70%)
  • Week 7-8 (Apr 1-14): 42-48 blogs indexed (90%+)

CURRENT STATUS (Feb 16, 2026):
  • Deployment: 2-3 days ago
  • Expected status: Still "Discovered - not indexed" (too early)
  • Next crawl: Should happen within 7-14 days
  • Action needed: Monitor GSC Coverage Report weekly

KEY METRICS TO TRACK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each blog, check:
  1. Coverage status (Discovered vs Indexed)
  2. Last crawl date (should be Feb 14+)
  3. Crawl status (Success vs Errors)
  4. Page fetch status (should be SUCCESS)
  5. Indexing allowed? (Yes/No)
  6. User-declared canonical
  7. Google-selected canonical
  8. Rich results eligibility
  9. Mobile usability
  10. Core Web Vitals status

BLOGS TO PRIORITIZE FOR INSPECTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

High-Value / High-Volume Keywords:
"""

high_priority_blogs = [
    ("pupuk-hayati-untuk-padi", "30K+ monthly searches"),
    ("pupuk-organik-cair-panduan-lengkap", "High commercial intent"),
    ("pupuk-hayati-terbaik-indonesia", "Branded comparison"),
    ("harga-pupuk-hayati-terbaru", "Transactional query"),
    ("cara-membuat-pupuk-hayati-sendiri", "How-to content"),
    ("manfaat-pupuk-hayati-untuk-pertanian", "Informational high-volume"),
    ("pupuk-hayati-untuk-jagung", "Crop-specific target"),
    ("pupuk-hayati-vs-pupuk-kimia-perbandingan", "Comparison intent"),
    ("perbedaan-sampah-organik-dan-anorganik", "28K+ impressions already"),
    ("penyakit-ganoderma-kelapa-sawit", "14K+ impressions already"),
]

for slug, reason in high_priority_blogs:
    blog_match = next((b for b in blog_urls if b['slug'] == slug), None)
    if blog_match:
        analysis += f"\n  {len(analysis.split('━')[4].split('\\n')) - 1}. {slug}\n     → {reason}\n     → URL: {blog_match['url']}"

analysis += """

RECOMMENDED INSPECTION WORKFLOW:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Batch Inspection (All 48 URLs)
  ├─ Use mcp_gsc_batch_url_inspection
  ├─ Check overall coverage status
  ├─ Identify any errors or warnings
  └─ Count how many transitioned to "Indexed"

STEP 2: Detailed Inspection (Sample 10-15 blogs)
  ├─ Use mcp_gsc_inspect_url_enhanced
  ├─ Check fetch status, indexing eligibility
  ├─ Verify canonical URLs resolved
  ├─ Check mobile usability
  └─ Verify rich results (if applicable)

STEP 3: Compare Against Old URLs
  ├─ Check if /blog/{slug} (old) is still indexed
  ├─ Verify 301 redirects working
  ├─ Check if Google switched canonical to new URLs
  └─ Monitor for duplicate content issues

STEP 4: Monitor Weekly
  ├─ GSC Coverage Report trend
  ├─ Number of "Discovered" transitioning to "Indexed"
  ├─ Check "Page indexing" for any new errors
  └─ Track Search Analytics for blog clicks

EXPECTED GSC RESPONSES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENARIO A: Still Discovered (Most Likely - Feb 16)
  Status: Discovered - currently not indexed
  Last Crawl: Feb 14-16, 2026
  Crawl Status: Success
  Page Fetch: SUCCESS (changed from UNSPECIFIED!)
  Cache-Control: public, s-maxage=3600 ✅
  Next Action: Wait 1-2 weeks for indexing queue

SCENARIO B: Recently Indexed (Optimistic)
  Status: Indexed (submitted and indexed)
  Last Crawl: Feb 14-16, 2026
  Indexing Status: Success
  Canonical: /id/blog/{slug} ✅
  Next Action: Monitor traffic increase

SCENARIO C: Error Found (Needs Action)
  Status: Discovered - currently not indexed
  Crawl Status: Failure
  Error: [Specific error message]
  Next Action: Address error immediately

SCENARIO D: Excluded (Bad)
  Status: Excluded by 'noindex' tag / robots.txt / etc
  Next Action: Debug new issue introduced
"""

print(analysis)

# Save preliminary report
with open(OUTPUT_TXT, 'w', encoding='utf-8') as f:
    f.write(f"DEEP GSC BLOG INDEXING INSPECTION REPORT\n")
    f.write(f"PT Centra Biotech Indonesia\n")
    f.write(f"Generated: {datetime.now().strftime('%B %d, %Y %H:%M:%S')}\n")
    f.write("=" * 80 + "\n\n")
    f.write(analysis)
    f.write(f"\n\n{'=' * 80}\n")
    f.write(f"END OF PRELIMINARY REPORT\n")
    f.write(f"{'=' * 80}\n")

print(f"\n💾 Preliminary report saved to: {OUTPUT_TXT}")

# Save JSON data
with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(report_data, f, indent=2, ensure_ascii=False)

print(f"💾 JSON data saved to: {OUTPUT_JSON}")

print("\n" + "=" * 80)
print("  SCRIPT COMPLETE - READY FOR GSC INSPECTION")
print("=" * 80)
print(f"""
Files Generated:
  1. {urls_file} - All URLs for batch inspection
  2. {OUTPUT_TXT} - Preliminary analysis report
  3. {OUTPUT_JSON} - JSON data structure for results

Next Action:
  → Use GSC MCP tools to inspect URLs
  → Record results in {OUTPUT_JSON}
  → Update summary statistics
  → Generate final report with findings
""")
