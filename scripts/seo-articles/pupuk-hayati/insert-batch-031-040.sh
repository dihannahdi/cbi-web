#!/bin/bash
# ============================================
# BATCH INSERT: Pupuk Hayati SEO Articles (31-40)
# Run this script on the VPS via SSH
# Location: /opt/cbi-strapi/.tmp/data.db
# ============================================

# Navigate to Strapi directory
cd /opt/cbi-strapi

# Execute all SQL files
echo "Inserting Pupuk Hayati SEO Articles (31-40)..."

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-031-pupuk-hayati-untuk-tomat.sql
echo "✓ Article 031: Pupuk Hayati untuk Tomat"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-032-pupuk-hayati-untuk-melon-semangka.sql
echo "✓ Article 032: Pupuk Hayati untuk Melon Semangka"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-033-pupuk-hayati-untuk-lahan-gambut.sql
echo "✓ Article 033: Pupuk Hayati untuk Lahan Gambut"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-034-pupuk-hayati-untuk-revegetasi-lahan-kritis.sql
echo "✓ Article 034: Pupuk Hayati untuk Revegetasi"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-035-pupuk-hayati-untuk-pertanian-urban.sql
echo "✓ Article 035: Pupuk Hayati untuk Pertanian Urban"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-036-pupuk-hayati-dan-perubahan-iklim.sql
echo "✓ Article 036: Pupuk Hayati dan Perubahan Iklim"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-037-pupuk-hayati-untuk-pembibitan.sql
echo "✓ Article 037: Pupuk Hayati untuk Pembibitan"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-038-pupuk-hayati-starter-transplanting.sql
echo "✓ Article 038: Pupuk Hayati Starter Transplanting"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-039-pupuk-hayati-untuk-tanaman-hias.sql
echo "✓ Article 039: Pupuk Hayati untuk Tanaman Hias"

sqlite3 .tmp/data.db < scripts/seo-articles/pupuk-hayati/article-040-pupuk-hayati-untuk-perkebunan-skala-kecil.sql
echo "✓ Article 040: Pupuk Hayati untuk Perkebunan Skala Kecil"

echo ""
echo "============================================"
echo "Batch 031-040 completed!"
echo "============================================"
