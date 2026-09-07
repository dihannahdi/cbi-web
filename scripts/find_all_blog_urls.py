#!/usr/bin/env python3
"""Find ALL internal URLs in ALL blog content and identify which need fixing."""
import json
import sqlite3

db_path = '/opt/cbi-strapi/.tmp/data.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT id, slug, content FROM blogs WHERE published_at IS NOT NULL ORDER BY id")
rows = cursor.fetchall()

def find_urls(obj, urls):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == 'url' and isinstance(v, str):
                urls.append(v)
            else:
                find_urls(v, urls)
    elif isinstance(obj, list):
        for item in obj:
            find_urls(item, urls)

# Known correct prefixes
LOCALE_PREFIXES = ['/id/', '/en/']

broken_count = 0
total_blogs = 0
blogs_with_issues = []

for row in rows:
    blog_id, slug, content = row
    total_blogs += 1
    try:
        data = json.loads(content)
        urls = []
        find_urls(data, urls)
        broken = [u for u in urls if u.startswith('/') and not any(u.startswith(p) for p in LOCALE_PREFIXES) and not u.startswith('/uploads/')]
        if broken:
            broken_count += len(broken)
            blogs_with_issues.append((blog_id, slug, broken))
            print(f"BROKEN in blog {blog_id} ({slug}):")
            for u in broken:
                print(f"  {u}")
    except json.JSONDecodeError:
        print(f"JSON ERROR in blog {blog_id} ({slug})")

print(f"\n=== SUMMARY ===")
print(f"Total blogs scanned: {total_blogs}")
print(f"Blogs with broken links: {len(blogs_with_issues)}")
print(f"Total broken links: {broken_count}")

# Also check for external CBI URLs without locale
cursor.execute("SELECT id, slug, content FROM blogs WHERE published_at IS NOT NULL AND content LIKE '%centrabiotechindonesia.com%' ORDER BY id")
rows2 = cursor.fetchall()
ext_broken = 0
for row in rows2:
    blog_id, slug, content = row
    try:
        data = json.loads(content)
        urls = []
        find_urls(data, urls)
        bad_ext = [u for u in urls if 'centrabiotechindonesia.com' in u and '/id/' not in u and '/en/' not in u]
        if bad_ext:
            ext_broken += len(bad_ext)
            print(f"\nEXTERNAL BROKEN in blog {blog_id} ({slug}):")
            for u in bad_ext:
                print(f"  {u}")
    except json.JSONDecodeError:
        pass

if ext_broken:
    print(f"\nExternal broken links (full URL without locale): {ext_broken}")

conn.close()
