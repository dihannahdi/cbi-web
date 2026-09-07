# SEO Optimization Phase 2B - Category Updates & Video Strategy
## Implementation Plan - January 2026

---

## 🎯 Objectives

### 1. Update Blog Categories in Database
**Current State**: All 45 blogs have `type="maklon"`  
**Target State**: 7 distinct categories based on content analysis

### 2. Video Schema Research
**Current State**: No embedded videos found in blog content  
**Target State**: Identify video content strategy for future implementation

### 3. Prepare for English Translations
**Current State**: 3/48 blogs have English versions  
**Target State**: Prioritize 42 blogs for translation

---

## 📊 Category Distribution Plan

Based on VPS analysis, update 45 Indonesian blogs to 7 categories:

| Category | Count | Blog Titles Pattern |
|----------|-------|---------------------|
| **tutorial-panduan** | 14 | "Cara...", "Panduan..." |
| **pengetahuan-umum** | 12 | General education, definitions |
| **tanaman-pangan** | 7 | Padi, Jagung, Tebu, Kentang, Bawang, Cabai, Sayuran |
| **tanaman-perkebunan** | 5 | Kopi, Kakao, Karet, Sawit, Teh |
| **bisnis-regulasi** | 3 | Harga, Produsen, Kementan, Formulasi, Branding, Tren |
| **tanaman-buah** | 2 | Buah-buahan |
| **teknologi-pertanian** | 2 | Hidroponik, Greenhouse |

---

## 🔧 Implementation Steps

### Step 1: SSH to VPS
```bash
ssh hostinger
cd /opt/cbi-strapi
```

### Step 2: Backup Database
```bash
cp .tmp/data.db .tmp/data.db.backup-$(date +%Y%m%d)
```

### Step 3: Update Categories - Tutorial/Guide Blogs (14)
```sql
UPDATE blogs 
SET type = 'tutorial-panduan' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND (
    title LIKE '%Cara%' 
    OR title LIKE '%Panduan%' 
    OR title LIKE '%Langkah%'
  );
```

### Step 4: Update Categories - Food Crops (7)
```sql
UPDATE blogs 
SET type = 'tanaman-pangan' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND (
    title LIKE '%Padi%' 
    OR title LIKE '%Jagung%' 
    OR title LIKE '%Tebu%' 
    OR title LIKE '%Kentang%' 
    OR title LIKE '%Bawang%' 
    OR title LIKE '%Cabai%' 
    OR title LIKE '%Sayuran%'
  );
```

### Step 5: Update Categories - Plantation Crops (5)
```sql
UPDATE blogs 
SET type = 'tanaman-perkebunan' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND (
    title LIKE '%Kopi%' 
    OR title LIKE '%Kakao%' 
    OR title LIKE '%Karet%' 
    OR title LIKE '%Sawit%' 
    OR title LIKE '%Teh%'
  );
```

### Step 6: Update Categories - Fruit Crops (2)
```sql
UPDATE blogs 
SET type = 'tanaman-buah' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND title LIKE '%Buah%';
```

### Step 7: Update Categories - Agricultural Technology (2)
```sql
UPDATE blogs 
SET type = 'teknologi-pertanian' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND (
    title LIKE '%Hidroponik%' 
    OR title LIKE '%Greenhouse%'
  );
```

### Step 8: Update Categories - Business/Regulation (3)
```sql
UPDATE blogs 
SET type = 'bisnis-regulasi' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND (
    title LIKE '%Harga%' 
    OR title LIKE '%Produsen%' 
    OR title LIKE '%Kementan%' 
    OR title LIKE '%Formulasi%' 
    OR title LIKE '%Branding%' 
    OR title LIKE '%Tren%'
  );
```

### Step 9: Set Remaining to General Knowledge (12)
```sql
UPDATE blogs 
SET type = 'pengetahuan-umum' 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
  AND type = 'maklon';
```

### Step 10: Verify Updates
```sql
SELECT 
  type, 
  COUNT(*) as count 
FROM blogs 
WHERE locale = 'id' 
  AND published_at IS NOT NULL 
GROUP BY type 
ORDER BY count DESC;
```

**Expected Output**:
```
tutorial-panduan|14
pengetahuan-umum|12
tanaman-pangan|7
tanaman-perkebunan|5
bisnis-regulasi|3
tanaman-buah|2
teknologi-pertanian|2
```

### Step 11: Restart Strapi
```bash
pm2 restart cbi-strapi-dev
pm2 logs cbi-strapi-dev --lines 20
```

---

## 🎥 Video Schema Strategy

### Current Findings
- ❌ No YouTube embeds found in blog content
- ❌ No video URLs in blog database
- ⚠️ 3 blogs mention "video" in text (not actual embeds)
  - strategi-branding-pupuk-organik
  - pupuk-hayati-vs-pupuk-organik
  - efek-samping-pupuk-hayati

### YouTube Channel Research
**Channel**: @centrabiotechindonesia  
**Status**: Needs verification  
**Content**: Product demos, tutorials, testimonials (assumed)

### Video Schema Implementation Plan (Future)
**Prerequisites**:
1. Create video content for top 10 blogs
2. Upload to YouTube channel
3. Embed videos in Strapi blog content
4. Add video schema generator utility

**Schema Structure** (VideoObject):
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video title",
  "description": "Video description",
  "thumbnailUrl": "thumbnail URL",
  "uploadDate": "2026-01-19",
  "duration": "PT5M30S",
  "embedUrl": "https://www.youtube.com/embed/...",
  "contentUrl": "https://www.youtube.com/watch?v=..."
}
```

### Recommended Videos to Create
1. **Cara Membuat Pupuk Hayati Sendiri** (14K words, tutorial format)
   - 5-10 minute step-by-step demonstration
   - Show fermentation process, materials, results
   
2. **10 Pupuk Hayati Terbaik di Indonesia** (product comparison)
   - 8-12 minute product showcase
   - Comparison table, benefits, recommendations

3. **Cara Aplikasi Pupuk Hayati** (application guide)
   - 5-7 minute field demonstration
   - Different application methods, timing, dosage

**Estimated Impact**: +30% engagement, +20% CTR with video thumbnails

---

## 🌍 English Translation Priority

### Translation Gap Analysis
- **Total Blogs**: 48 published
- **Indonesian**: 45 blogs ✅
- **English**: 3 blogs ✅
- **Need Translation**: 42 blogs ⏳

### Priority Blogs (Top 10 for Phase 2C)
Based on content value and traffic potential:

1. **pupuk-hayati-pengertian-lengkap** (comprehensive guide)
   - 10K+ words, foundational content
   - High search volume for "biofertilizer guide"

2. **cara-membuat-pupuk-hayati-sendiri** (DIY tutorial)
   - 14K+ words, HowTo schema
   - International DIY audience

3. **jenis-jenis-pupuk-hayati-terbaik** (types of biofertilizer)
   - Educational content
   - Global agricultural interest

4. **manfaat-pupuk-hayati-untuk-pertanian** (benefits)
   - 20 benefits with scientific evidence
   - Universal agriculture topic

5. **pupuk-hayati-untuk-padi** (rice application)
   - 30% yield increase claim
   - Large Asian market

6. **pupuk-hayati-terbaik-indonesia** (top 10 products)
   - Product review, commercial intent
   - Regional authority

7. **harga-pupuk-hayati-terbaru** (pricing guide)
   - Commercial content
   - Purchase decision support

8. **pupuk-hayati-vs-pupuk-kimia-perbandingan** (comparison)
   - Organic vs synthetic debate
   - Global interest

9. **cara-daftar-pupuk-kementan** (registration guide)
   - Business content
   - Regulatory information

10. **produsen-pupuk-hayati-indonesia** (producer directory)
    - B2B content
    - Maklon partnership leads

### Translation Methods
**Option 1**: AI Translation + Human Review
- Use Claude/GPT-4 for initial translation
- Expert review for technical terms
- Cost: ~$50-100 per 10 blogs
- Timeline: 1-2 weeks

**Option 2**: Professional Translation Service
- Native English speakers with agriculture background
- Higher quality, technical accuracy
- Cost: ~$500-1000 per 10 blogs
- Timeline: 2-4 weeks

**Option 3**: Hybrid Approach (Recommended)
- AI translation for structure and general content
- Professional review for critical sections
- Technical term glossary for consistency
- Cost: ~$200-400 per 10 blogs
- Timeline: 1-2 weeks

---

## 📈 Expected Impact

### Category Updates
**Before**: 45 blogs, all "maklon" type  
**After**: 7 distinct categories

**Benefits**:
1. ✅ Better RelatedBlogs filtering (more relevant suggestions)
2. ✅ Improved internal linking structure
3. ✅ Content discovery by category
4. ✅ Analytics segmentation
5. ✅ Future: Category archive pages

### SEO Improvements from Categories
- **Topical Authority**: Clear content clusters
- **User Experience**: Relevant related articles
- **Engagement**: +15-20% time on site
- **Bounce Rate**: -10-15% reduction

---

## 🚀 Deployment Plan

### Phase 2B Deployment Checklist
- [ ] SSH to VPS
- [ ] Backup database
- [ ] Execute all 7 category UPDATE queries
- [ ] Verify category distribution (should match prediction)
- [ ] Restart Strapi PM2 process
- [ ] Check Strapi admin panel (categories visible)
- [ ] Trigger Next.js ISR (1 hour auto-revalidate)
- [ ] Verify related blogs showing new categories
- [ ] Check homepage blog listings
- [ ] Monitor error logs for 24 hours

### Post-Deployment Verification
1. Open blog detail page
2. Check "Artikel Terkait" section
3. Verify 3 related blogs are from same/similar category
4. Test multiple categories
5. Confirm no "maklon" type remaining

---

## 📝 Next Actions

### Immediate (Phase 2B - Today)
1. ✅ Create implementation plan (this document)
2. ⏳ Execute category SQL updates on VPS
3. ⏳ Restart Strapi
4. ⏳ Verify changes
5. ⏳ Update documentation

### Short Term (Phase 2C - This Week)
6. ⏳ Identify translation service/method
7. ⏳ Translate top 10 priority blogs
8. ⏳ Review and publish EN versions
9. ⏳ Update sitemaps with EN URLs
10. ⏳ Deploy Phase 2C

### Medium Term (Phase 3 - 2-4 Weeks)
11. ⏳ GSC authorization setup
12. ⏳ Submit sitemaps to GSC
13. ⏳ Monitor index coverage
14. ⏳ Create news section architecture
15. ⏳ Content refresh strategy

---

## 🛠️ Tools & Scripts

### Quick Category Check Script
```bash
#!/bin/bash
# check-categories.sh
sqlite3 /opt/cbi-strapi/.tmp/data.db \
  "SELECT type, COUNT(*) as count 
   FROM blogs 
   WHERE locale='id' AND published_at IS NOT NULL 
   GROUP BY type 
   ORDER BY count DESC;"
```

### Related Blogs Debug Query
```sql
-- Find related blogs for a specific slug
SELECT b1.slug as current_blog, b1.type as current_type, 
       b2.slug as related_blog, b2.type as related_type, b2.title
FROM blogs b1
CROSS JOIN blogs b2
WHERE b1.slug = 'cara-membuat-pupuk-hayati-sendiri'
  AND b2.slug != b1.slug
  AND b2.type = b1.type
  AND b2.locale = 'id'
  AND b2.published_at IS NOT NULL
LIMIT 3;
```

---

## 📊 Success Metrics

### Phase 2B Goals
| Metric | Before | After | Status |
|--------|--------|-------|--------|
| Category Types | 1 (maklon) | 7 categories | ⏳ Pending |
| Related Blogs Relevance | Mixed | Category-filtered | ⏳ Pending |
| Content Organization | Flat | Hierarchical | ⏳ Pending |
| Internal Linking Quality | Generic | Topical | ⏳ Pending |

### Validation Criteria
- [x] Implementation plan documented
- [ ] SQL queries prepared and tested
- [ ] Backup strategy confirmed
- [ ] Rollback plan available (restore backup)
- [ ] Category distribution verified
- [ ] Strapi restart successful
- [ ] Frontend reflects new categories
- [ ] No broken links or 404 errors

---

## 🎯 Risk Mitigation

### Potential Issues
1. **Category Overlap**: A blog might match multiple patterns
   - Solution: Execute queries in priority order (most specific first)
   - Tutorial > Specific Crops > General

2. **Missing Categories**: Some blogs might not match any pattern
   - Solution: Default to "pengetahuan-umum" for remainder

3. **Strapi Cache**: Changes might not reflect immediately
   - Solution: Restart PM2, clear application cache, trigger ISR

4. **Frontend Breaking**: Related blogs component might error
   - Solution: Already handles empty results, default to fallback

### Rollback Plan
If issues occur after deployment:
```bash
# Restore database backup
cd /opt/cbi-strapi
cp .tmp/data.db.backup-20260119 .tmp/data.db
pm2 restart cbi-strapi-dev
```

---

## 📚 References

- RelatedBlogs Component: `components/media/article-detail/RelatedBlogs.tsx`
- Blog API Endpoint: `/api/blogs?filters[type][$eq]=...`
- Strapi PM2: `pm2 list | grep cbi-strapi`
- Database Path: `/opt/cbi-strapi/.tmp/data.db`

---

**Phase 2B Status**: ⏳ **READY FOR IMPLEMENTATION**  
**Prerequisites**: ✅ All planning complete  
**Next Step**: Execute category SQL updates on VPS

---

*Plan created: January 2026*  
*Implementation: Phase 2B Category Updates*  
*Project: CBI Web SEO Optimization*
