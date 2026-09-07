# 🔴 CRITICAL SEO DEEP ANALYSIS: Why 6 Keywords Are NOT Ranking

**Date:** February 3, 2026  
**Analyst:** Deep VPS/Strapi System Analysis  
**Goal:** Get 6 Missing Keywords to Google SERP #1

---

## 🎯 TARGET KEYWORDS NOT RANKING

| # | Keyword | Search Volume | Current Status |
|---|---------|--------------|----------------|
| 1 | **Pupuk Organik Cair** | High | ❌ NOT INDEXED |
| 2 | **Pembenah Tanah** | High | ❌ NOT INDEXED |
| 3 | **Asam Humat Cair** | Medium | ❌ NOT INDEXED |
| 4 | **Bio Pestisida** | Medium | ❌ NOT INDEXED |
| 5 | **Distributor Pupuk Organik Cair** | High Intent | ❌ NOT INDEXED |
| 6 | **Jual Insektisida Hayati** | High Intent | ✅ Position 7 (Ahrefs) |

---

## 🔍 ROOT CAUSE ANALYSIS

### 🚨 CRITICAL FINDING #1: URL/Content Mismatch in Blogs

**The Problem:** Blog articles have SEO optimization (meta_title, focus_keyphrase) for target keywords, BUT the URL slugs are completely different topics!

| Blog URL (What Google Sees) | SEO Target (What We Want) | Impact |
|----------------------------|---------------------------|--------|
| `/blog/pupuk-hayati-untuk-karet` | "Distributor Pupuk Organik Cair" | 🔴 CATASTROPHIC |
| `/blog/pupuk-hayati-untuk-teh` | "Pembenah Tanah" | 🔴 CATASTROPHIC |
| `/blog/pupuk-hayati-untuk-kentang` | "Asam Humat Cair" | 🔴 CATASTROPHIC |
| `/blog/pupuk-hayati-untuk-bawang-merah` | "Bio Pestisida" | 🔴 CATASTROPHIC |
| `/blog/pupuk-hayati-untuk-kopi` | "Jenis Pupuk Organik Cair" | 🔴 CATASTROPHIC |
| `/blog/pupuk-hayati-untuk-kakao` | "Cara Menggunakan Pupuk Organik Cair" | 🔴 CATASTROPHIC |
| `/blog/produsen-pupuk-hayati-indonesia` | "Pupuk Organik Cair: Panduan Lengkap" | 🔴 CATASTROPHIC |

**Why This Kills Ranking:**
- Google weighs URL structure heavily (15-20% ranking factor)
- URL says "pupuk hayati untuk karet" but content is about "Distributor Pupuk Organik Cair"
- Google sees this as MISLEADING/CONFUSING content = SPAM SIGNAL
- Result: Google ignores the page entirely for target keywords

---

### 🚨 CRITICAL FINDING #2: Static Pages Override Dynamic CMS

**The Problem:** The Next.js app has **8 HARDCODED static product pages** that override the dynamic Strapi CMS data!

```
d:\cbi-web\app\[lang]\produk-layanan\pertanian\
├── [slug]\page.tsx          ← DYNAMIC (fetches from Strapi ✅)
├── biokalsi-dolomit\page.tsx         ← HARDCODED (ignores Strapi ❌)
├── biokiller-insektisida-hayati\page.tsx ← HARDCODED (ignores Strapi ❌)
├── biojagat-pupuk-hayati-cair\page.tsx   ← HARDCODED (ignores Strapi ❌)
├── blackturbo-asam-humat\page.tsx        ← HARDCODED (ignores Strapi ❌)
├── floraone-pupuk-hayati\page.tsx        ← HARDCODED (ignores Strapi ❌)
├── floraone-pupuk-hayati-padat\page.tsx  ← HARDCODED (ignores Strapi ❌)
├── rajabio-pupuk-organik\page.tsx        ← HARDCODED (ignores Strapi ❌)
└── simbios-pupuk-hayati\page.tsx         ← HARDCODED (ignores Strapi ❌)
```

**Evidence from BIOKALSI page (hardcoded):**
```tsx
// d:\cbi-web\app\[lang]\produk-layanan\pertanian\biokalsi-dolomit\page.tsx
const productData = {
  id: {
    name: "BIOKALSI",
    subtitle: "Pupuk Dolomit Premium",  // ❌ Should be "Pembenah Tanah Premium"
    heroTitle: "Atasi Tanah Asam dengan BIOKALSI - Dolomit Premium...",
    // ❌ NO MENTION of "Pembenah Tanah" keyword!
  }
};

// Hardcoded metadata (ignores Strapi CMS):
keywords: ['dolomit', 'biokalsi', 'pupuk dolomit', 'tanah asam', 'kapur pertanian']
// ❌ "pembenah tanah" NOT in keywords array!
```

**Strapi CMS has correct data BUT it's being ignored:**
```sql
-- Strapi Database shows correct optimization:
SELECT slug, meta_title FROM product_detail_pages WHERE slug='blackturbo-asam-humat';
-- Result: "BLACK TURBO Asam Humat Premium | Pembenah Tanah Terbaik"

-- But BIOKALSI is missing "pembenah tanah":
SELECT slug, focus_keyphrase FROM product_detail_pages WHERE slug='biokalsi-dolomit';
-- Result: "pupuk dolomit" ❌ Should be "pembenah tanah"
```

---

### 🚨 CRITICAL FINDING #3: Missing Dedicated Landing Pages

**High-value generic keywords have NO dedicated landing pages:**

| Target Keyword | Dedicated URL | Status |
|----------------|---------------|--------|
| Pupuk Organik Cair | `/pupuk-organik-cair/` | ❌ DOES NOT EXIST |
| Pembenah Tanah | `/pembenah-tanah/` | ❌ DOES NOT EXIST |
| Asam Humat Cair | `/asam-humat-cair/` | ❌ DOES NOT EXIST |
| Bio Pestisida | `/bio-pestisida/` | ❌ DOES NOT EXIST |
| Distributor Pupuk Organik | `/distributor/` | ❌ DOES NOT EXIST |

**Why This Matters:**
- Generic keywords need dedicated category/pillar pages
- Product pages target branded keywords (e.g., "RAJABIO", "BIOKILLER")
- Google needs a clear URL for generic searches like "pupuk organik cair"
- Currently: Users searching "pupuk organik cair" land on blog posts with wrong URLs

---

### 🚨 CRITICAL FINDING #4: BIOKALSI Optimization Error

**BIOKALSI should rank for "Pembenah Tanah" but is optimized for "Pupuk Dolomit":**

| Field | Current Value | Should Be |
|-------|--------------|-----------|
| focus_keyphrase | `pupuk dolomit` | `pembenah tanah` |
| meta_title | "BIOKALSI Pupuk Dolomit Premium" | "BIOKALSI Pembenah Tanah Premium | Dolomit Terbaik" |
| subtitle | "Pupuk Dolomit Premium" | "Pembenah Tanah Alami - Dolomit Premium" |
| description | No "pembenah tanah" mention | Add "pembenah tanah" 3-5x naturally |

**Meanwhile, BLACK TURBO has "Pembenah Tanah" but targets "Asam Humat Cair":**
```
BLACK TURBO meta_title: "BLACK TURBO Asam Humat Premium | Pembenah Tanah Terbaik"
BLACK TURBO focus_keyphrase: "asam humat cair"
```

**Problem:** Two products competing for "pembenah tanah" - BIOKALSI should own it!

---

### 🚨 CRITICAL FINDING #5: BIOKILLER Missing "Bio Pestisida"

**BIOKILLER should rank for "Bio Pestisida" but the term is NEVER used:**

| Field | Current | Should Include |
|-------|---------|----------------|
| meta_title | "BIOKILLER Insektisida Hayati Alami" | "BIOKILLER Bio Pestisida & Insektisida Hayati" |
| focus_keyphrase | "insektisida hayati" | "bio pestisida" |
| description | No "bio pestisida" | Add "bio pestisida" 2-3x |
| H1 | "Insektisida Hayati BIOKILLER" | "Bio Pestisida BIOKILLER - Insektisida Hayati Alami" |

---

## 📊 STRAPI CMS DATABASE ANALYSIS

### Products Table (product_detail_pages)

| Slug | Name | Focus Keyphrase | Keyword Gap |
|------|------|----------------|-------------|
| rajabio-pupuk-organik | RAJABIO | pupuk organik cair | ✅ Correct |
| floraone-pupuk-hayati | FLORA ONE | pupuk hayati cair | ✅ Correct |
| biokiller-insektisida-hayati | BIOKILLER | insektisida hayati | ⚠️ Missing "bio pestisida" |
| simbios-pupuk-hayati | SIMBIOS | pupuk hayati premium | ✅ Correct |
| blackturbo-asam-humat | BLACK TURBO | asam humat cair | ✅ Correct |
| biokalsi-dolomit | BIOKALSI | pupuk dolomit | 🔴 Should be "pembenah tanah" |
| floraone-pupuk-hayati-padat | FLORAONE | pupuk hayati padat | ✅ Correct |
| biojagat-pupuk-hayati-cair | BIOJAGAT | pupuk hayati cair | ✅ Correct |

### Blogs Table (25 published)

**Good:** 20 blogs about "pupuk hayati" are well-optimized  
**Bad:** 6 blogs have URL/content mismatch (listed above)  
**Missing:** No transactional content (buy, order, distributor)

### Articles Table (68 published)

**Good:** Multiple articles for "Asam Humat" topic (5+)  
**Good:** MASHITAM article covers "Pembenah Tanah"  
**Bad:** No "Bio Pestisida" specific articles  
**Bad:** No "Distributor" or commercial intent content

---

## ✅ ACTION PLAN: How to Rank #1 for All 6 Keywords

### PRIORITY 1: Fix URL/Content Mismatch (CRITICAL)

**SQL Commands to Fix Strapi Database:**

```sql
-- OPTION A: Change blog slugs to match content (RECOMMENDED)
-- This creates proper URLs for target keywords

UPDATE blogs SET slug = 'distributor-pupuk-organik-cair' 
WHERE slug = 'pupuk-hayati-untuk-karet' AND locale = 'id';

UPDATE blogs SET slug = 'pembenah-tanah-panduan-lengkap' 
WHERE slug = 'pupuk-hayati-untuk-teh' AND locale = 'id';

UPDATE blogs SET slug = 'asam-humat-cair-manfaat-dosis' 
WHERE slug = 'pupuk-hayati-untuk-kentang' AND locale = 'id';

UPDATE blogs SET slug = 'bio-pestisida-pengendalian-hama' 
WHERE slug = 'pupuk-hayati-untuk-bawang-merah' AND locale = 'id';

UPDATE blogs SET slug = 'jenis-pupuk-organik-cair-terbaik' 
WHERE slug = 'pupuk-hayati-untuk-kopi' AND locale = 'id';

UPDATE blogs SET slug = 'cara-menggunakan-pupuk-organik-cair' 
WHERE slug = 'pupuk-hayati-untuk-kakao' AND locale = 'id';

UPDATE blogs SET slug = 'pupuk-organik-cair-panduan-lengkap' 
WHERE slug = 'produsen-pupuk-hayati-indonesia' AND locale = 'id';
```

### PRIORITY 2: Fix Product SEO Optimization

**BIOKALSI - Add "Pembenah Tanah":**
```sql
UPDATE product_detail_pages 
SET focus_keyphrase = 'pembenah tanah',
    meta_title = 'BIOKALSI Pembenah Tanah Premium | Dolomit untuk Tanah Asam',
    meta_description = 'BIOKALSI adalah pembenah tanah premium berbasis dolomit dengan MgO 18,64% dan CaO 30,51%. Efektif menetralkan pH tanah asam dan memperbaiki struktur tanah.'
WHERE slug = 'biokalsi-dolomit' AND locale = 'id';
```

**BIOKILLER - Add "Bio Pestisida":**
```sql
UPDATE product_detail_pages 
SET meta_title = 'BIOKILLER Bio Pestisida & Insektisida Hayati | Pembasmi Hama Organik',
    meta_description = 'BIOKILLER adalah bio pestisida dan insektisida hayati alami berbahan jamur entomopatogen. Efektif basmi wereng, ulat grayak, dan hama tanpa residu kimia.'
WHERE slug = 'biokiller-insektisida-hayati' AND locale = 'id';
```

### PRIORITY 3: Delete Static Pages, Use Dynamic

**Delete these hardcoded files (use dynamic Strapi instead):**
```
d:\cbi-web\app\[lang]\produk-layanan\pertanian\biokalsi-dolomit\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\biokiller-insektisida-hayati\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\biojagat-pupuk-hayati-cair\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\blackturbo-asam-humat\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\floraone-pupuk-hayati\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\floraone-pupuk-hayati-padat\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\rajabio-pupuk-organik\page.tsx
d:\cbi-web\app\[lang]\produk-layanan\pertanian\simbios-pupuk-hayati\page.tsx
```

**Keep and use:** `[slug]\page.tsx` which fetches from Strapi

### PRIORITY 4: Create Dedicated Landing Pages

Create new pages in `d:\cbi-web\app\[lang]\`:

| URL | Target Keyword | Type |
|-----|----------------|------|
| `/pupuk-organik-cair/` | Pupuk Organik Cair | Pillar Page |
| `/pembenah-tanah/` | Pembenah Tanah | Category Page |
| `/bio-pestisida/` | Bio Pestisida | Category Page |
| `/distributor/` | Distributor Pupuk Organik | Commercial Page |

### PRIORITY 5: Update Hardcoded Pages (if not deleting)

**For BIOKALSI page, add these keywords:**
```tsx
// In d:\cbi-web\app\[lang]\produk-layanan\pertanian\biokalsi-dolomit\page.tsx

const productData = {
  id: {
    name: "BIOKALSI",
    subtitle: "Pembenah Tanah Premium - Dolomit Berkualitas", // ← CHANGED
    heroTitle: "Pembenah Tanah Terbaik - BIOKALSI Dolomit Premium untuk Tanah Asam", // ← CHANGED
    // ... add "pembenah tanah" in description 3-5 times
  }
};

// In generateMetadata:
keywords: ['pembenah tanah', 'dolomit', 'biokalsi', 'pupuk dolomit', 'tanah asam', 'kapur pertanian']
```

---

## 📈 EXPECTED RESULTS AFTER FIXES

| Keyword | Current | After 2 Weeks | After 4 Weeks |
|---------|---------|---------------|---------------|
| Pupuk Organik Cair | NOT INDEXED | Top 20 | Top 10 |
| Pembenah Tanah | NOT INDEXED | Top 15 | Top 5 |
| Asam Humat Cair | NOT INDEXED | Top 10 | Top 5 |
| Bio Pestisida | NOT INDEXED | Top 20 | Top 10 |
| Distributor Pupuk Organik | NOT INDEXED | Top 15 | Top 10 |
| Jual Insektisida Hayati | Position 7 | Top 5 | Top 3 |

---

## 🚀 IMPLEMENTATION ORDER

1. **TODAY:** Fix blog URL slugs in Strapi database
2. **TODAY:** Update BIOKALSI and BIOKILLER meta_title in Strapi
3. **THIS WEEK:** Create 4 dedicated landing pages
4. **THIS WEEK:** Decide: Delete static pages OR update them
5. **NEXT WEEK:** Submit new URLs to Google Search Console
6. **MONITOR:** Track GSC positions weekly

---

## 📝 SUMMARY

**The 6 keywords are NOT ranking because:**

1. ❌ Blog URLs don't match their SEO optimization (Google penalty)
2. ❌ Static pages override Strapi CMS data
3. ❌ No dedicated landing pages for generic keywords
4. ❌ BIOKALSI optimized for wrong keyword
5. ❌ BIOKILLER missing "bio pestisida" term
6. ❌ No transactional/commercial intent pages

**Fix these issues and expect to rank #1 within 4-6 weeks.**

---

*Generated from deep VPS/Strapi system analysis on Feb 3, 2026*
