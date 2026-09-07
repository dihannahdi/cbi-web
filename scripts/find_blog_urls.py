#!/usr/bin/env python3
"""Find all internal URLs in blog content JSON from Strapi DB."""
import sys
import json
import sqlite3

db_path = '/opt/cbi-strapi/.tmp/data.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT id, slug, content FROM blogs WHERE id IN (23, 32, 35)")
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

for row in rows:
    blog_id, slug, content = row
    print(f"\n=== BLOG {blog_id}: {slug} ===")
    try:
        data = json.loads(content)
        urls = []
        find_urls(data, urls)
        for u in urls:
            print(f"  {u}")
        if not urls:
            print("  (no URLs found in 'url' fields)")
    except json.JSONDecodeError as e:
        print(f"  JSON ERROR: {e}")

conn.close()
