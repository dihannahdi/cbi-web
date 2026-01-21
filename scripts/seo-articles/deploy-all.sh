#!/bin/bash
# ============================================
# MASTER DEPLOYMENT SCRIPT: All SEO Articles
# Run this script on the VPS via SSH
# ============================================
# 
# This script deploys:
# 1. 40 NEW Pupuk Hayati articles (INSERT)
# 2. 30 Maklon article revisions (UPDATE)
#
# Total: 70 article operations
# ============================================

echo "============================================"
echo "     CBI SEO ARTICLES DEPLOYMENT"
echo "============================================"
echo ""

cd /opt/cbi-strapi

# Backup database first
echo "Creating database backup..."
cp .tmp/data.db .tmp/data.db.backup-$(date +%Y%m%d-%H%M%S)
echo "✓ Backup created"
echo ""

# ============================================
# PHASE 1: Pupuk Hayati NEW Articles (INSERT)
# ============================================
echo "============================================"
echo "PHASE 1: Inserting Pupuk Hayati Articles"
echo "============================================"

echo ""
echo "--- Batch 001-010 ---"
bash scripts/seo-articles/pupuk-hayati/insert-batch-001-010.sh

echo ""
echo "--- Batch 011-020 ---"
bash scripts/seo-articles/pupuk-hayati/insert-batch-011-020.sh

echo ""
echo "--- Batch 021-030 ---"
bash scripts/seo-articles/pupuk-hayati/insert-batch-021-030.sh

echo ""
echo "--- Batch 031-040 ---"
bash scripts/seo-articles/pupuk-hayati/insert-batch-031-040.sh

echo ""
echo "✓ Phase 1 Complete: 40 Pupuk Hayati articles inserted"
echo ""

# ============================================
# PHASE 2: Maklon Article Revisions (UPDATE)
# ============================================
echo "============================================"
echo "PHASE 2: Updating Maklon Articles"
echo "============================================"

echo ""
echo "--- Update Batch 001-015 ---"
bash scripts/seo-articles/maklon-revisions/update-batch-001-015.sh

echo ""
echo "--- Update Batch 016-030 ---"
bash scripts/seo-articles/maklon-revisions/update-batch-016-030.sh

echo ""
echo "✓ Phase 2 Complete: 30 Maklon articles updated"
echo ""

# ============================================
# VERIFICATION
# ============================================
echo "============================================"
echo "VERIFICATION"
echo "============================================"

echo ""
echo "Counting total blog articles..."
TOTAL=$(sqlite3 .tmp/data.db "SELECT COUNT(*) FROM blogs;")
echo "Total articles in database: $TOTAL"

echo ""
echo "Recent 10 articles:"
sqlite3 .tmp/data.db "SELECT id, slug, substr(title, 1, 40) FROM blogs ORDER BY id DESC LIMIT 10;"

echo ""
echo "============================================"
echo "     DEPLOYMENT COMPLETE!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Restart Strapi: pm2 restart strapi"
echo "2. Visit https://cbi-web.vercel.app/blog"
echo "3. Verify articles display correctly"
echo ""
