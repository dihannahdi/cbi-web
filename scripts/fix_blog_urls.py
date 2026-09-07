#!/usr/bin/env python3
"""Fix broken internal links in blog content - replace non-locale URLs with correct locale-prefixed ones."""
import json
import sqlite3
import shutil
from datetime import datetime

db_path = '/opt/cbi-strapi/.tmp/data.db'

# Create backup first
backup_path = f'/opt/cbi-strapi/.tmp/data.db.backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
shutil.copy2(db_path, backup_path)
print(f"Database backed up to: {backup_path}")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# URL replacement map: old broken path -> correct locale-prefixed path
URL_MAP = {
    '/product/agriculture': '/id/produk-layanan/pertanian',
    '/product/livestock': '/id/produk-layanan/peternakan',
    '/product/fishery': '/id/produk-layanan/perikanan',
    '/product': '/id/produk-layanan',
    '/about-us': '/id/about-us',
    '/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya': '/id/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya',
    '/blog': '/id/blog',
    '/documents': '/id/documents',
    '/contact': '/id/contact',
    '/career': '/id/career',
}

def fix_urls(obj, changes):
    """Recursively fix URLs in JSON content."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == 'url' and isinstance(v, str):
                for old_url, new_url in URL_MAP.items():
                    if v == old_url:
                        obj[k] = new_url
                        changes.append((old_url, new_url))
                        break
            else:
                fix_urls(v, changes)
    elif isinstance(obj, list):
        for item in obj:
            fix_urls(item, changes)

# Process each affected blog
blog_ids = [23, 32, 35]
total_fixes = 0

for blog_id in blog_ids:
    cursor.execute("SELECT slug, content FROM blogs WHERE id = ?", (blog_id,))
    row = cursor.fetchone()
    if not row:
        print(f"Blog {blog_id} not found!")
        continue
    
    slug, content = row
    print(f"\n=== Fixing Blog {blog_id}: {slug} ===")
    
    try:
        data = json.loads(content)
        changes = []
        fix_urls(data, changes)
        
        if changes:
            new_content = json.dumps(data, ensure_ascii=False)
            cursor.execute("UPDATE blogs SET content = ?, updated_at = ? WHERE id = ?",
                         (new_content, datetime.now().isoformat(), blog_id))
            for old, new in changes:
                print(f"  FIXED: {old} -> {new}")
            total_fixes += len(changes)
        else:
            print("  No changes needed")
    except json.JSONDecodeError as e:
        print(f"  JSON ERROR: {e}")

conn.commit()
conn.close()

print(f"\n=== COMPLETE ===")
print(f"Total links fixed: {total_fixes}")
print(f"Database backup: {backup_path}")
print(f"\nIMPORTANT: Restart Strapi with 'pm2 restart cbi-strapi' to clear cache!")
