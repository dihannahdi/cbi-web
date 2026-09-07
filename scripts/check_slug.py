#!/usr/bin/env python3
import sqlite3, sys

DB = '/opt/cbi-strapi/.tmp/data.db'
slug = sys.argv[1] if len(sys.argv) > 1 else 'rahasia-membuat-pupuk-organik-cair-super'

conn = sqlite3.connect(DB)
c = conn.cursor()

# Check articles table
c.execute('SELECT id, slug, locale, type, title FROM articles WHERE slug=?', (slug,))
rows = c.fetchall()
print(f'=== articles table ({len(rows)} rows) ===')
for r in rows:
    print(f'  id={r[0]} slug={r[1]} locale={r[2]} type={r[3]} title={r[4][:60]}')

# Check blogs table
c.execute('SELECT id, slug, locale, type, title FROM blogs WHERE slug=?', (slug,))
rows = c.fetchall()
print(f'=== blogs table ({len(rows)} rows) ===')
for r in rows:
    print(f'  id={r[0]} slug={r[1]} locale={r[2]} type={r[3]} title={r[4][:60]}')

# Also check articles with news type that might be in wrong path
c.execute("SELECT COUNT(*) FROM articles WHERE type='article'")
art_count = c.fetchone()[0]
c.execute("SELECT COUNT(*) FROM articles WHERE type='news'")
news_count = c.fetchone()[0]
c.execute("SELECT COUNT(*) FROM blogs")
blog_count = c.fetchone()[0]

print(f'\n=== Summary ===')
print(f'articles table: {art_count} type=article, {news_count} type=news')
print(f'blogs table: {blog_count} total')

conn.close()
