#!/usr/bin/env python3
import sqlite3
conn = sqlite3.connect('/opt/cbi-strapi/.tmp/data.db')
c = conn.cursor()
c.execute("SELECT id, slug, name, meta_title, locale FROM product_detail_pages")
for r in c.fetchall():
    print(r)
print()
c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%product%'")
for r in c.fetchall():
    print('TABLE:', r[0])
conn.close()
