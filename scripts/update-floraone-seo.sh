#!/bin/bash
# Update FloraOne product SEO metadata in Strapi SQLite DB

DB="/opt/cbi-strapi/.tmp/data.db"

echo "=== BEFORE UPDATE ==="
sqlite3 "$DB" "SELECT id, locale, meta_title, meta_description, hero_title, subtitle FROM product_detail_pages WHERE slug='floraone-pupuk-hayati';"

echo ""
echo "=== UPDATING ID (Indonesian) locale ==="

# Optimized meta_title: keyword-first, under 60 chars
# "FLORA ONE Pupuk Hayati Terbaik - Panen +86% | Centra Biotech" = 62 chars
# Better: "FLORA ONE - Pupuk Hayati Cair Terbaik Indonesia | CBI" = 53 chars
sqlite3 "$DB" "UPDATE product_detail_pages SET meta_title='FLORA ONE Pupuk Hayati Cair Terbaik | Panen +86%' WHERE slug='floraone-pupuk-hayati' AND locale='id';"

# Optimized meta_description: 150-160 chars, CTA, benefits, keywords
sqlite3 "$DB" "UPDATE product_detail_pages SET meta_description='Jual FLORA ONE pupuk hayati cair & padat No.1 Indonesia. 5 mikroba hidup tingkatkan panen 86% & kendalikan penyakit tanaman. Bersertifikat Kementan RI. Pesan sekarang!' WHERE slug='floraone-pupuk-hayati' AND locale='id';"

# Update focus_keyphrase for better keyword targeting
sqlite3 "$DB" "UPDATE product_detail_pages SET focus_keyphrase='pupuk hayati, flora one, floraone, pupuk hayati cair, jual pupuk hayati' WHERE slug='floraone-pupuk-hayati' AND locale='id';"

echo ""
echo "=== UPDATING EN (English) locale ==="

sqlite3 "$DB" "UPDATE product_detail_pages SET meta_title='FLORA ONE Biofertilizer - +86% Yield | Ministry Certified' WHERE slug='floraone-pupuk-hayati' AND locale='en';"

sqlite3 "$DB" "UPDATE product_detail_pages SET meta_description='FLORA ONE biological fertilizer with 5 living microbes. Increase harvest up to 86% and control plant diseases naturally. Ministry of Agriculture RI certified. Order now!' WHERE slug='floraone-pupuk-hayati' AND locale='en';"

echo ""
echo "=== AFTER UPDATE ==="
sqlite3 "$DB" "SELECT id, locale, meta_title, meta_description, focus_keyphrase FROM product_detail_pages WHERE slug='floraone-pupuk-hayati';"

echo ""
echo "=== RESTARTING STRAPI TO CLEAR CACHE ==="
pm2 restart cbi-strapi --no-color
echo "Strapi restarted."
