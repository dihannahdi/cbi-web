#!/bin/bash
# ============================================
# BATCH INSERT: Pupuk Hayati SEO Articles (1-10)
# Run this script on the VPS via SSH
# Location: /opt/cbi-strapi/.tmp/data.db
# ============================================

# Navigate to Strapi directory
cd /opt/cbi-strapi

# Execute all SQL files
echo "Inserting Pupuk Hayati SEO Articles..."

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-001-pupuk-hayati-pengertian.sql
echo "✓ Article 001: Pupuk Hayati Pengertian"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-002-jenis-pupuk-hayati.sql
echo "✓ Article 002: Jenis Pupuk Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-003-manfaat-pupuk-hayati.sql
echo "✓ Article 003: Manfaat Pupuk Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-004-cara-membuat-pupuk-hayati.sql
echo "✓ Article 004: Cara Membuat Pupuk Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-005-pupuk-hayati-untuk-padi.sql
echo "✓ Article 005: Pupuk Hayati untuk Padi"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-006-pupuk-hayati-untuk-jagung.sql
echo "✓ Article 006: Pupuk Hayati untuk Jagung"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-007-pupuk-hayati-vs-pupuk-kimia.sql
echo "✓ Article 007: Pupuk Hayati vs Kimia"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-008-harga-pupuk-hayati.sql
echo "✓ Article 008: Harga Pupuk Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-009-pupuk-hayati-terbaik.sql
echo "✓ Article 009: Pupuk Hayati Terbaik"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-010-produsen-pupuk-hayati.sql
echo "✓ Article 010: Produsen Pupuk Hayati"

echo ""
echo "============================================"
echo "All 10 Pupuk Hayati articles inserted!"
echo "============================================"

# Verify insertion
echo ""
echo "Verifying inserted articles..."
sqlite3 .tmp/data.db "SELECT id, title FROM blogs WHERE slug LIKE 'pupuk-hayati%' ORDER BY id DESC LIMIT 10;"

echo ""
echo "Done! Restart Strapi to apply changes:"
echo "pm2 restart cbi-strapi"
