#!/usr/bin/env python3
import sqlite3
DB = '/opt/cbi-strapi/.tmp/data.db'
conn = sqlite3.connect(DB)
c = conn.cursor()

print('=== Table counts ===')
c.execute('SELECT COUNT(*) FROM articles')
print('articles:', c.fetchone()[0])
c.execute('SELECT COUNT(*) FROM blogs')
print('blogs:', c.fetchone()[0])

print('\n=== Articles table - all slugs with locale=id ===')
c.execute("SELECT slug, type, title FROM articles WHERE locale='id' ORDER BY type, slug")
rows = c.fetchall()
for r in rows:
    print(f'  type={r[1]:10s} slug={r[0]}')
print(f'Total id locale: {len(rows)}')

print('\n=== Articles table - all locales ===')
c.execute("SELECT slug, locale, type FROM articles ORDER BY slug, locale")
rows = c.fetchall()
for r in rows:
    print(f'  locale={r[1]} type={r[2]:10s} slug={r[0]}')
print(f'Total all locales: {len(rows)}')

# Check specific slug
print('\n=== Checking rahasia-membuat-pupuk-organik-cair-super ===')
c.execute("SELECT id, slug, locale, type, title FROM articles WHERE slug='rahasia-membuat-pupuk-organik-cair-super'")
for r in c.fetchall():
    print(f'  ARTICLES: id={r[0]} locale={r[2]} type={r[3]} title={r[4][:60]}')
c.execute("SELECT id, slug, locale, type, title FROM blogs WHERE slug='rahasia-membuat-pupuk-organik-cair-super'")
for r in c.fetchall():
    print(f'  BLOGS: id={r[0]} locale={r[2]} type={r[3]} title={r[4][:60]}')

conn.close()
