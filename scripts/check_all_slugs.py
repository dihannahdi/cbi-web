#!/usr/bin/env python3
"""Check which articles table slugs are being referenced with wrong /blog/ path"""
import sqlite3

DB = '/opt/cbi-strapi/.tmp/data.db'
conn = sqlite3.connect(DB)
c = conn.cursor()

# All articles table entries (served at /news/ route)
c.execute('SELECT slug, type, title FROM articles WHERE locale="id" ORDER BY type, slug')
rows = c.fetchall()
print('=== ALL articles table slugs (should be /news/ path) ===')
for r in rows:
    print(f'  type={r[1]:10s} /news/{r[0]}')
print(f'Total: {len(rows)}')

print()

# Check if any blog table entries share slugs with articles
c.execute('''
    SELECT a.slug, a.type as a_type, b.type as b_type
    FROM articles a
    INNER JOIN blogs b ON a.slug = b.slug AND a.locale = b.locale
    WHERE a.locale = 'id'
''')
dupes = c.fetchall()
if dupes:
    print(f'=== DUPLICATE slugs in both tables ({len(dupes)}) ===')
    for d in dupes:
        print(f'  slug={d[0]} articles.type={d[1]} blogs.type={d[2]}')
else:
    print('=== No duplicate slugs between tables ===')

conn.close()
