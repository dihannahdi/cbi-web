#!/bin/bash
# =============================================================================
# CBI Article Automation - VPS Deployment Script
# =============================================================================
# This script deploys the article automation system to the VPS
# Run this from the local machine: bash deploy-to-vps.sh
# =============================================================================

set -e

# Configuration
VPS_HOST="root@72.62.122.166"
VPS_AUTOMATION_PATH="/opt/cbi-article-automation"
LOCAL_DRAFTS_PATH="../../public/draft of articles"

echo "========================================="
echo "CBI Article Automation - VPS Deployment"
echo "========================================="
echo ""

# Step 1: Create directories on VPS
echo "[1/5] Creating directories on VPS..."
ssh $VPS_HOST "mkdir -p $VPS_AUTOMATION_PATH/drafts $VPS_AUTOMATION_PATH/logs"

# Step 2: Copy automation scripts
echo "[2/5] Copying automation scripts..."
scp article-uploader.js $VPS_HOST:$VPS_AUTOMATION_PATH/
scp package.json $VPS_HOST:$VPS_AUTOMATION_PATH/

# Step 3: Copy draft articles
echo "[3/5] Copying draft articles to VPS..."
# Create category folders and copy DOCX files
for category in "Asam Humat" "Insektisida Hayati" "Maklon Pupuk" "Pupuk Hayati" "Pupuk Organik Cair" "Uji Efektivitas"; do
    if [ -d "$LOCAL_DRAFTS_PATH/$category" ]; then
        echo "   Copying: $category"
        ssh $VPS_HOST "mkdir -p '$VPS_AUTOMATION_PATH/drafts/$category'"
        scp "$LOCAL_DRAFTS_PATH/$category"/*.docx "$VPS_HOST:$VPS_AUTOMATION_PATH/drafts/$category/" 2>/dev/null || true
    fi
done

# Step 4: Install dependencies on VPS
echo "[4/5] Installing dependencies on VPS..."
ssh $VPS_HOST "cd $VPS_AUTOMATION_PATH && npm install"

# Step 5: Setup cron job
echo "[5/5] Setting up cron job (every 6 hours)..."
ssh $VPS_HOST 'crontab -l 2>/dev/null | grep -v "cbi-article-automation" > /tmp/crontab.tmp || true'
ssh $VPS_HOST 'echo "0 */6 * * * cd /opt/cbi-article-automation && /usr/bin/node article-uploader.js >> /opt/cbi-article-automation/logs/cron.log 2>&1" >> /tmp/crontab.tmp'
ssh $VPS_HOST 'crontab /tmp/crontab.tmp && rm /tmp/crontab.tmp'

echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
echo ""
echo "Automation Details:"
echo "  - Location: $VPS_AUTOMATION_PATH"
echo "  - Draft Articles: $VPS_AUTOMATION_PATH/drafts/"
echo "  - Logs: $VPS_AUTOMATION_PATH/logs/"
echo "  - Schedule: Every 6 hours (0:00, 6:00, 12:00, 18:00)"
echo ""
echo "Manual Commands:"
echo "  - Run now: ssh $VPS_HOST 'cd $VPS_AUTOMATION_PATH && node article-uploader.js'"
echo "  - View stats: ssh $VPS_HOST 'cd $VPS_AUTOMATION_PATH && node article-uploader.js --stats'"
echo "  - Dry run: ssh $VPS_HOST 'cd $VPS_AUTOMATION_PATH && node article-uploader.js --dry-run'"
echo "  - View logs: ssh $VPS_HOST 'tail -f $VPS_AUTOMATION_PATH/logs/cron.log'"
echo ""
