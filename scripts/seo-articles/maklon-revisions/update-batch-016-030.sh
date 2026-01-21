#!/bin/bash
# ============================================
# UPDATE: Maklon SEO Articles Revision (16-30)
# Run this script on the VPS via SSH
# Location: /opt/cbi-strapi/.tmp/data.db
# ============================================

# Navigate to Strapi directory
cd /opt/cbi-strapi

# Execute all SQL update files
echo "Updating Maklon SEO Articles (16-30)..."

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-016-maklon-pupuk-untuk-sawit.sql
echo "✓ Updated: Maklon Pupuk untuk Sawit"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-017-maklon-pupuk-untuk-padi.sql
echo "✓ Updated: Maklon Pupuk untuk Padi"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-018-maklon-pupuk-untuk-hortikultura.sql
echo "✓ Updated: Maklon Pupuk untuk Hortikultura"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-019-maklon-pupuk-mikro-lengkap.sql
echo "✓ Updated: Maklon Pupuk Mikro Lengkap"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-020-maklon-pupuk-granul-vs-cair.sql
echo "✓ Updated: Maklon Pupuk Granul vs Cair"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-021-teknologi-fermentasi.sql
echo "✓ Updated: Teknologi Fermentasi"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-022-quality-control-maklon-pupuk.sql
echo "✓ Updated: Quality Control Maklon Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-023-strategi-branding-pupuk-organik.sql
echo "✓ Updated: Strategi Branding Pupuk Organik"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-024-maklon-label-pupuk-pendaftaran.sql
echo "✓ Updated: Label Pupuk dan Pendaftaran"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-025-distribusi-pupuk-maklon.sql
echo "✓ Updated: Distribusi Pupuk Maklon"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-026-tren-pupuk-organik-indonesia.sql
echo "✓ Updated: Tren Pupuk Organik Indonesia"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-027-kisah-sukses-bisnis-pupuk.sql
echo "✓ Updated: Kisah Sukses Bisnis Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-028-kesalahan-maklon-pupuk.sql
echo "✓ Updated: Kesalahan Maklon Pupuk"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-029-maklon-pupuk-untuk-ekspor.sql
echo "✓ Updated: Maklon Pupuk untuk Ekspor"

sqlite3 .tmp/data.db < scripts/seo-articles/maklon-revisions/update-030-masa-depan-industri-maklon-pupuk.sql
echo "✓ Updated: Masa Depan Industri Maklon Pupuk"

echo ""
echo "============================================"
echo "Maklon Update Batch 16-30 completed!"
echo "============================================"
