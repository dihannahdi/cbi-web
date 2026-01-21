#!/bin/bash
# ============================================
# UPDATE: Maklon SEO Articles Revision (1-15)
# Run this script on the VPS via SSH
# Location: /opt/cbi-strapi/.tmp/data.db
# ============================================

# Navigate to Strapi directory
cd /opt/cbi-strapi

# Execute all SQL update files
echo "Updating Maklon SEO Articles (1-15)..."

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-001-apa-itu-maklon-pupuk.sql
echo "✓ Updated: Apa itu Maklon Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-002-keuntungan-maklon-pupuk-organik.sql
echo "✓ Updated: Keuntungan Maklon Pupuk Organik"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-003-proses-maklon-pupuk-hayati.sql
echo "✓ Updated: Proses Maklon Pupuk Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-004-cara-memilih-jasa-maklon-pupuk.sql
echo "✓ Updated: Cara Memilih Jasa Maklon"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-005-maklon-pupuk-organik-cair.sql
echo "✓ Updated: Maklon Pupuk Organik Cair"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-006-biaya-maklon-pupuk.sql
echo "✓ Updated: Biaya Maklon Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-007-maklon-vs-produksi-sendiri.sql
echo "✓ Updated: Maklon vs Produksi Sendiri"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-008-sertifikasi-maklon-pupuk.sql
echo "✓ Updated: Sertifikasi Maklon Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-009-moq-maklon-pupuk.sql
echo "✓ Updated: MOQ Maklon Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-010-formulasi-pupuk-custom.sql
echo "✓ Updated: Formulasi Pupuk Custom"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-011-maklon-pupuk-hayati-trichoderma.sql
echo "✓ Updated: Maklon Pupuk Hayati Trichoderma"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-012-maklon-poc.sql
echo "✓ Updated: Maklon POC"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-013-maklon-insektisida-hayati.sql
echo "✓ Updated: Maklon Insektisida Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-014-maklon-fungisida-hayati.sql
echo "✓ Updated: Maklon Fungisida Hayati"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-015-maklon-pupuk-npk-organik.sql
echo "✓ Updated: Maklon Pupuk NPK Organik"

echo ""
echo "============================================"
echo "Maklon Update Batch 1-15 completed!"
echo "============================================"
