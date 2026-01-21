#!/bin/bash
# ============================================
# Batch Insert Script for Pupuk Hayati Articles 011-020
# PT Centra Biotech Indonesia SEO Articles
# ============================================

echo "Starting batch insert for articles 011-020..."
echo "Database: /opt/cbi-strapi/.tmp/data.db"
echo ""

# Article 011
echo "Inserting article 011: Pupuk Hayati untuk Sayuran..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-011-pupuk-hayati-untuk-sayuran.sql
if [ $? -eq 0 ]; then echo "✓ Article 011 inserted successfully"; else echo "✗ Article 011 failed"; fi

# Article 012
echo "Inserting article 012: Pupuk Hayati untuk Sawit..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-012-pupuk-hayati-untuk-sawit.sql
if [ $? -eq 0 ]; then echo "✓ Article 012 inserted successfully"; else echo "✗ Article 012 failed"; fi

# Article 013
echo "Inserting article 013: Pupuk Hayati untuk Tebu..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-013-pupuk-hayati-untuk-tebu.sql
if [ $? -eq 0 ]; then echo "✓ Article 013 inserted successfully"; else echo "✗ Article 013 failed"; fi

# Article 014
echo "Inserting article 014: Pupuk Hayati Cair vs Padat..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-014-pupuk-hayati-cair-vs-padat.sql
if [ $? -eq 0 ]; then echo "✓ Article 014 inserted successfully"; else echo "✗ Article 014 failed"; fi

# Article 015
echo "Inserting article 015: Pupuk Hayati untuk Greenhouse..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-015-pupuk-hayati-untuk-greenhouse.sql
if [ $? -eq 0 ]; then echo "✓ Article 015 inserted successfully"; else echo "✗ Article 015 failed"; fi

# Article 016
echo "Inserting article 016: Pupuk Hayati Bersertifikat Kementan..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-016-pupuk-hayati-bersertifikat-kementan.sql
if [ $? -eq 0 ]; then echo "✓ Article 016 inserted successfully"; else echo "✗ Article 016 failed"; fi

# Article 017
echo "Inserting article 017: Cara Menyimpan Pupuk Hayati..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-017-cara-menyimpan-pupuk-hayati.sql
if [ $? -eq 0 ]; then echo "✓ Article 017 inserted successfully"; else echo "✗ Article 017 failed"; fi

# Article 018
echo "Inserting article 018: Efek Samping Pupuk Hayati..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-018-efek-samping-pupuk-hayati.sql
if [ $? -eq 0 ]; then echo "✓ Article 018 inserted successfully"; else echo "✗ Article 018 failed"; fi

# Article 019
echo "Inserting article 019: Pupuk Hayati untuk Tanaman Buah..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-019-pupuk-hayati-untuk-tanaman-buah.sql
if [ $? -eq 0 ]; then echo "✓ Article 019 inserted successfully"; else echo "✗ Article 019 failed"; fi

# Article 020
echo "Inserting article 020: Pupuk Hayati untuk Hidroponik..."
sqlite3 /opt/cbi-strapi/.tmp/data.db < /root/seo-articles/pupuk-hayati/article-020-pupuk-hayati-untuk-hidroponik.sql
if [ $? -eq 0 ]; then echo "✓ Article 020 inserted successfully"; else echo "✗ Article 020 failed"; fi

echo ""
echo "Batch insert completed!"
echo ""

# Verify inserted articles
echo "Verifying inserted articles..."
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT id, slug, substr(title, 1, 60) as title FROM blogs WHERE slug LIKE '%pupuk-hayati%' ORDER BY id DESC LIMIT 20;"

echo ""
echo "Total articles with 'pupuk-hayati' in slug:"
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT COUNT(*) FROM blogs WHERE slug LIKE '%pupuk-hayati%';"

echo ""
echo "Don't forget to restart PM2:"
echo "pm2 restart cbi-strapi"
