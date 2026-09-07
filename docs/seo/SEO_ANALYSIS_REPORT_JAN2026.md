# SEO Analysis & Optimization Report
## Centra Biotech Indonesia - Blog & Website
**Date:** January 19, 2026

---

## 📊 Executive Summary

### Current Performance (Last 28 Days)
| Metric | Value |
|--------|-------|
| **Total Clicks** | 258 |
| **Total Impressions** | 26,867 |
| **Average CTR** | 0.96% |
| **Average Position** | 6.4 |

### Trend Analysis
- **Growth**: Significant increase in impressions from ~300-500/day in late December to 1,500-2,500/day in mid-January
- **Improving Keywords**: "rajabio pupuk organik" (+1000%), "perusahaan bioteknologi di indonesia" (+300%)
- **Brand Position**: "Centra Biotech Indonesia" ranking improved from position 6.3 to 2.0

---

## ✅ Completed Tasks

### 1. Blog Image Integration (43 Images)
- **Uploaded**: 43 WebP images to VPS `/opt/cbi-strapi/public/uploads/`
- **Database Integration**: 43 file records linked to corresponding blogs
- **Image Format**: WebP optimized (2752x1536 and 1376x768)
- **Missing Images**: Blog ID 72 and ID 104 (need generation)

### 2. Sitemap Status
| Sitemap | URLs | Errors | Warnings |
|---------|------|--------|----------|
| sitemap.xml (index) | 94 | 0 | 0 |
| sitemap-blog.xml | 45 | 0 | 0 |
| sitemap-static.xml | 30 | 0 | 0 |
| sitemap-news.xml | 11 | 0 | 0 |
| sitemap-products.xml | 8 | 0 | 4 |

### 3. Structured Data Implementation
- ✅ BlogPosting schema with proper author, datePublished, image
- ✅ BreadcrumbList schema for navigation
- ✅ Organization schema on homepage
- ✅ WebSite schema with search functionality
- ✅ Product schema for products

---

## 🔍 Top Performing Pages

### By Impressions
| Page | Clicks | Impressions | CTR | Position |
|------|--------|-------------|-----|----------|
| /blog/perbedaan-sampah-organik-dan-anorganik | 10 | 13,890 | 0.07% | 7.7 |
| /blog/pengertian-pupuk-organik | 13 | 2,850 | 0.46% | 4.6 |
| /blog/penyakit-ganoderma-kelapa-sawit | 11 | 2,226 | 0.49% | 6.2 |
| Homepage | 57 | 1,728 | 3.30% | 3.7 |
| /id Homepage | 40 | 1,559 | 2.57% | 4.6 |

### By Clicks
| Page | Clicks | Impressions | CTR | Position |
|------|--------|-------------|-----|----------|
| Homepage | 57 | 1,728 | 3.30% | 3.7 |
| /id Homepage | 40 | 1,559 | 2.57% | 4.6 |
| /news/rajabio-revolusi-organik | 34 | 969 | 3.51% | 3.9 |
| /blog/pengertian-pupuk-organik | 13 | 2,850 | 0.46% | 4.6 |
| /id/about-us | 13 | 680 | 1.91% | 5.3 |

---

## 🚨 Issues Identified

### 1. Low CTR on High-Impression Pages
**Problem**: Blog pages have high impressions but very low CTR
- `/blog/perbedaan-sampah-organik-dan-anorganik`: 13,890 impressions, only 0.07% CTR
- `/blog/pengertian-pupuk-organik`: 2,850 impressions, only 0.46% CTR

**Root Cause**: 
- Position 7.7 means the page appears on page 1 bottom or page 2
- Generic titles may not stand out in SERP
- Missing rich snippets (FAQ, HowTo schema)

### 2. New Blog Articles Not Indexed
**Status**: 45 new blog articles are "Discovered - currently not indexed"
- These are from the January 3, 2026 content push
- Google has discovered them but not crawled/indexed yet
- Typical indexing time: 2-4 weeks for new content

### 3. Product Sitemap Warnings
- 4 warnings on products sitemap
- 0 products indexed despite 8 submitted
- VIDEO: 64 submitted, 0 indexed (may be false positives)

### 4. Missing Images for 2 Blogs
- Blog ID 72: Pupuk Hayati vs Pupuk Kimia
- Blog ID 104: Pupuk Hayati untuk Tanaman Buah

---

## 📈 Optimization Recommendations

### High Priority (Immediate Impact)

#### 1. Improve Meta Titles for High-Impression Pages
Current: Generic titles
Recommendation: Add power words, numbers, and year
```
Before: "Perbedaan Sampah Organik dan Anorganik"
After: "Perbedaan Sampah Organik dan Anorganik [Tabel + Contoh 2026]"

Before: "Pengertian Pupuk Organik: Jenis, Manfaat"
After: "Pupuk Organik: 10 Jenis, Manfaat & Cara Aplikasi [2026]"
```

#### 2. Add FAQ Schema to Blog Posts
Add FAQ structured data to high-potential pages:
- "Apa perbedaan sampah organik dan anorganik?"
- "Contoh sampah organik adalah?"
- "Apa itu pupuk organik?"

#### 3. Request Indexing for New Blogs
Manually request indexing for top-priority articles:
- Pupuk Hayati Pengertian Lengkap
- Pupuk Hayati untuk Padi
- Pupuk Hayati untuk Kelapa Sawit
- Formulasi Pupuk Custom

### Medium Priority (1-2 Weeks)

#### 4. Internal Linking Strategy
- Add contextual links between related blog posts
- Create topic clusters around "pupuk hayati", "pupuk organik", "maklon"
- Link from high-authority pages to new content

#### 5. Generate Missing Blog Images
Create images for:
- ID72: Pupuk Hayati vs Pupuk Kimia comparison infographic
- ID104: Pupuk Hayati untuk Tanaman Buah showcase

#### 6. Optimize Product Pages
- Fix 4 warnings on product sitemap
- Add complete product schema with offers
- Improve product descriptions for SEO

### Lower Priority (Long-term)

#### 7. Content Expansion
Target keywords with high impressions but low position:
- "sampah organik dan anorganik" (Position 10.1, 2,221 impressions)
- "biotech" (Position 1.9, 794 impressions)
- "apa itu pupuk organik" (Position 1.3, 153 impressions)

#### 8. Backlink Building
- Guest posts on agriculture websites
- Partnerships with farming communities
- Press releases for new products

---

## 📊 Key Metrics to Track

### Weekly KPIs
- [ ] Total impressions (target: 30,000+)
- [ ] Average CTR (target: 2%+)
- [ ] Average position (target: 5.0)
- [ ] New pages indexed

### Monthly KPIs
- [ ] Total clicks (target: 500+)
- [ ] Top 10 keywords by clicks
- [ ] New blog articles indexed
- [ ] Core Web Vitals scores

---

## 🎯 Action Items

### Immediate (This Week)
1. ✅ Blog images integrated (43/45)
2. ⏳ Generate missing images (ID72, ID104)
3. ⏳ Request indexing for 10 priority blogs
4. ⏳ Add FAQ schema to top 3 blog posts

### Next Week
1. Optimize meta titles for high-impression pages
2. Implement internal linking between blog clusters
3. Fix product sitemap warnings
4. Review and optimize underperforming pages

### This Month
1. Monitor indexing of new blog articles
2. Create content calendar for Q1 2026
3. Analyze competitor keywords
4. Implement HowTo schema for tutorial blogs

---

## 📝 Technical Notes

### Current Implementation
- **Framework**: Next.js 14 with App Router
- **CMS**: Strapi with SQLite database
- **Hosting**: Vercel (frontend), Hostinger VPS (backend)
- **Caching**: ISR with 60-second revalidation
- **Images**: WebP format via Next.js Image optimization

### Database Schema
- `files` table: Image metadata (id, name, url, dimensions)
- `files_related_mph` table: Polymorphic relations (file ↔ blog)
- All 45 Indonesian blogs have images linked (except ID72, ID104)

---

**Report Generated**: January 19, 2026
**Next Review**: January 26, 2026
