#!/bin/bash
# ============================================
# BATCH INSERT: Pupuk Hayati SEO Articles (21-30)
# Run this script on the VPS via SSH
# Location: /opt/cbi-strapi/.tmp/data.db
# ============================================

# Navigate to Strapi directory
cd /opt/cbi-strapi

# Execute all SQL files
echo "Inserting Pupuk Hayati SEO Articles (21-30)..."

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-021-pupuk-hayati-untuk-kopi.sql
echo "✓ Article 021: Pupuk Hayati untuk Kopi"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-022-pupuk-hayati-untuk-kakao.sql
echo "✓ Article 022: Pupuk Hayati untuk Kakao"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-023-pupuk-hayati-untuk-karet.sql
echo "✓ Article 023: Pupuk Hayati untuk Karet"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-024-pupuk-hayati-untuk-teh.sql
echo "✓ Article 024: Pupuk Hayati untuk Teh"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-025-pupuk-hayati-untuk-kentang.sql
echo "✓ Article 025: Pupuk Hayati untuk Kentang"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-026-pupuk-hayati-untuk-bawang-merah.sql
echo "✓ Article 026: Pupuk Hayati untuk Bawang Merah"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-027-pupuk-hayati-untuk-cabai.sql
echo "✓ Article 027: Pupuk Hayati untuk Cabai"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-028-pupuk-hayati-mol-mikroorganisme-lokal.sql
echo "✓ Article 028: Pupuk Hayati MOL"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-029-pupuk-hayati-vs-pupuk-organik.sql
echo "✓ Article 029: Pupuk Hayati vs Pupuk Organik"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-030-aplikasi-pupuk-hayati-musim-hujan.sql
echo "✓ Article 030: Aplikasi Pupuk Hayati Musim Hujan"

echo ""
echo "============================================"
echo "Batch 021-030 completed!"
echo "============================================"
