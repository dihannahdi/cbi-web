#!/usr/bin/env python3
"""Fix SEO metadata for blog posts."""
import sqlite3
from datetime import datetime

db_path = '/opt/cbi-strapi/.tmp/data.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Fix blog 32: meta_title should be Indonesian (content is id locale)
cursor.execute("""
    UPDATE blogs SET 
        meta_title = 'Penyakit Ganoderma Kelapa Sawit: Penyebab & Pengendalian',
        meta_description = 'Kenali penyakit Ganoderma kelapa sawit: penyebab infeksi jamur, gejala serangan, dan cara pengendalian efektif. Panduan lengkap untuk petani sawit Indonesia.',
        focus_keyphrase = 'ganoderma kelapa sawit',
        updated_at = ?
    WHERE id = 32
""", (datetime.now().isoformat(),))

# Fix blog 23: focus_keyphrase should be Indonesian
cursor.execute("""
    UPDATE blogs SET 
        focus_keyphrase = 'perbedaan sampah organik dan anorganik',
        updated_at = ?
    WHERE id = 23
""", (datetime.now().isoformat(),))

conn.commit()

# Verify
cursor.execute("SELECT id, slug, meta_title, meta_description, focus_keyphrase FROM blogs WHERE id IN (23, 32)")
for row in cursor.fetchall():
    print(f"\nBlog {row[0]} ({row[1]}):")
    print(f"  meta_title: {row[2]}")
    print(f"  meta_description: {row[3]}")
    print(f"  focus_keyphrase: {row[4]}")

conn.close()
print("\nDone!")
