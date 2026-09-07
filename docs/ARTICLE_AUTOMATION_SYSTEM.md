# CBI Article Automation System

## Overview

Automated article publishing system for PT Centra Biotech Indonesia. This system automatically processes DOCX articles from a draft folder and uploads them to Strapi CMS with Enterprise SEO optimization.

## 📍 Location

- **VPS Path**: `/opt/cbi-article-automation/`
- **Strapi Database**: `/opt/cbi-strapi/.tmp/data.db`
- **Draft Articles**: `/opt/cbi-article-automation/drafts/`
- **Logs**: `/opt/cbi-article-automation/logs/`
- **Tracker**: `/opt/cbi-article-automation/uploaded-articles.json`

## 🚀 Features

1. **DOCX Parsing**: Uses mammoth.js to convert DOCX files to HTML
2. **HTML to Strapi Blocks**: Converts HTML to Strapi's JSON blocks format
3. **Enterprise SEO Optimization**:
   - Auto-generates `meta_title` with brand suffix
   - Auto-generates `meta_description` from content
   - Auto-generates `focus_keyphrase` based on category
   - Sets `robots_directive` to "index,follow"
4. **Duplicate Prevention**: Tracks uploaded files to avoid re-uploading
5. **Scheduled Execution**: Runs every 6 hours via cron

## ⏰ Schedule

The automation runs **every 6 hours** at:
- 00:00 UTC
- 06:00 UTC
- 12:00 UTC
- 18:00 UTC

Each run uploads **1 article** (configurable).

## 📊 Current Statistics

- **Total Draft Articles**: 59 files
- **Categories**: 6 (Asam Humat, Insektisida Hayati, Maklon Pupuk, Pupuk Hayati, Pupuk Organik Cair, Uji Efektivitas)
- **Articles per Run**: 1 (one article every 6 hours = 4 articles/day)
- **Estimated Completion**: ~15 days to upload all 59 articles

## 🔧 Manual Commands

### Run Automation Now
```bash
ssh hostinger
cd /opt/cbi-article-automation
node article-uploader.js
```

### Upload Multiple Articles
```bash
# Upload 5 articles
node article-uploader.js --count 5

# Upload all remaining articles
node article-uploader.js --count 100
```

### Check Statistics
```bash
node article-uploader.js --stats
```

### Dry Run (Preview Without Uploading)
```bash
node article-uploader.js --dry-run
```

### View Logs
```bash
tail -f /opt/cbi-article-automation/logs/cron.log
cat /opt/cbi-article-automation/logs/automation-2026-02-01.log
```

### Check Cron Job
```bash
crontab -l
```

### View Uploaded Articles Tracker
```bash
cat /opt/cbi-article-automation/uploaded-articles.json
```

## 📁 Draft Articles Categories

| Category | Files | Products/Topics |
|----------|-------|-----------------|
| Asam Humat | 10 | Black Turbo, soil improvement |
| Insektisida Hayati | 10 | BioKiller, pest control |
| Maklon Pupuk | 5 | B2B manufacturing services |
| Pupuk Hayati | 15 | FloraOne, Simbios, biofertilizers |
| Pupuk Organik Cair | 15 | RajaBio, organic liquid fertilizers |
| Uji Efektivitas | 4 | Product efficacy test reports |

## 🔄 SEO Optimization Rules

### Meta Title
- Max 70 characters
- Includes brand suffix " | Centra Biotech" when space allows
- Truncates at natural break points (–, -, :, |)

### Meta Description
- Max 160 characters
- Extracts relevant sentences containing focus keyphrase
- Falls back to first sentence if no match

### Focus Keyphrase
Category-based keyphrases:
- Asam Humat → "asam humat pupuk organik"
- Insektisida Hayati → "insektisida hayati pengendalian hama"
- Maklon Pupuk → "jasa maklon pupuk organik"
- Pupuk Hayati → "pupuk hayati biofertilizer"
- Pupuk Organik Cair → "pupuk organik cair tanaman"
- Uji Efektivitas → "uji efektivitas produk pertanian"

Product names (FloraOne, Simbios, BioKiller, etc.) are prepended when found in title.

## 🛠️ Troubleshooting

### Script Not Running
```bash
# Check if Node.js is available
which node

# Test script manually
cd /opt/cbi-article-automation
node article-uploader.js --dry-run
```

### Database Connection Issues
```bash
# Check if Strapi database exists
ls -la /opt/cbi-strapi/.tmp/data.db

# Verify database is readable
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT COUNT(*) FROM articles;"
```

### Cron Not Running
```bash
# Check cron service
systemctl status cron

# Check cron logs
grep CRON /var/log/syslog | tail -20
```

### Reset Tracker (Re-upload All)
```bash
rm /opt/cbi-article-automation/uploaded-articles.json
```

## 📝 Configuration

Environment variables (optional):
- `DRAFT_FOLDER`: Path to draft articles folder
- `STRAPI_DB_PATH`: Path to Strapi SQLite database
- `ARTICLES_PER_RUN`: Number of articles to process per run
- `LOG_PATH`: Path to log files directory

## 🗓️ Upload Timeline (59 articles at 1/6hrs)

| Days | Articles Uploaded | Remaining |
|------|-------------------|-----------|
| Day 1 | 4 | 55 |
| Day 5 | 20 | 39 |
| Day 10 | 40 | 19 |
| Day 15 | 60 | 0 (Complete) |

---

**Created**: February 1, 2026
**Author**: PT Centra Biotech Indonesia
**Version**: 1.0.0
