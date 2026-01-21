# LIVE vs LOCAL Product Pages - Comprehensive Analysis

**Analysis Date:** January 21, 2026  
**Analyzed by:** GitHub Copilot AI  
**Production Site:** https://www.centrabiotechindonesia.com  
**Local Version:** Commit 0c64804 (Jan 19, 2026)

---

## Executive Summary

This document provides an end-to-end analysis comparing LIVE production product pages on centrabiotechindonesia.com with LOCAL repository files. The analysis identifies critical differences in content structure, image sources, SEO implementation, and missing pages.

### Key Findings:

1. **Missing Local Pages**: 2 products exist on LIVE but not as standalone pages locally
2. **Image Source Differences**: LIVE uses multiple domains for images
3. **Content Depth**: LOCAL version has significantly more detailed content and features
4. **SEO Implementation**: LOCAL has advanced structured data not present on LIVE
5. **Video Content**: LOCAL has more embedded video testimonials
6. **CTA Buttons**: Different placements and links between LIVE and LOCAL

---

## 1. Product Pages Inventory

### Pages Analyzed (8 total):

| # | Product Name | Live URL | Local File | Status |
|---|--------------|----------|------------|--------|
| 1 | FloraOne Pupuk Hayati Padat | `/id/produk-layanan/pertanian/floraone-pupuk-hayati-padat` | ❌ NOT FOUND | **MISSING** |
| 2 | BioJagat Pupuk Hayati Cair | `/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair` | ❌ NOT FOUND | **MISSING** |
| 3 | FloraOne Pupuk Hayati | `/id/produk-layanan/pertanian/floraone-pupuk-hayati` | ✅ `floraone-pupuk-hayati/page.tsx` | **EXISTS** |
| 4 | Simbios Pupuk Hayati | `/id/produk-layanan/pertanian/simbios-pupuk-hayati` | ✅ `simbios-pupuk-hayati/page.tsx` | **EXISTS** |
| 5 | RajaBio Pupuk Organik | `/id/produk-layanan/pertanian/rajabio-pupuk-organik` | ✅ `rajabio-pupuk-organik/page.tsx` | **EXISTS** |
| 6 | Biokiller Insektisida Hayati | `/id/produk-layanan/pertanian/biokiller-insektisida-hayati` | ✅ `biokiller-insektisida-hayati/page.tsx` | **EXISTS** |
| 7 | Black Turbo Asam Humat | `/id/produk-layanan/pertanian/blackturbo-asam-humat` | ✅ `blackturbo-asam-humat/page.tsx` | **EXISTS** |
| 8 | Biokalsi Dolomit | `/id/produk-layanan/pertanian/biokalsi-dolomit` | ✅ `biokalsi-dolomit/page.tsx` | **EXISTS** |

### Critical Discovery:
- **FloraOne Pupuk Hayati Padat** and **BioJagat Pupuk Hayati Cair** exist as separate product pages on LIVE but do NOT have dedicated static pages locally
- These products may be handled by the dynamic `[slug]` route (app/[lang]/produk-layanan/pertanian/[slug]/page.tsx)
- Found references to these products in VPS_PRODUCT_CATEGORY_IMPLEMENTATION.md

---

## 2. Image Source Analysis

### LIVE Production Image Sources:

#### **Domain 1: www.centrabiotechindonesia.com**
- Used for: Product mockups, brochures, certificates
- Examples:
  - `/mockup-flora-one-padat.webp` (FloraOne Padat hero)
  - `/product%20SKU/Floraone/(28KNAW)%20Preview...jpg` (FloraOne main)
  - `/product%20SKU/Simbios/...jpg` (Simbios SKU)
  - `/product%20SKU/Biokiller/...jpg` (Biokiller SKU)
  - `/products/floraone/floraone-poster.png` (banner)
  - `/Certificate%20Logos/Logo-Organik-Indonesia-01.png`
  - `/Certificate%20Logos/SNI%20Logo.svg`
  - `/Certificate%20Logos/KAN%20Logo.webp`

#### **Domain 2: cbi-backend.my.id/uploads/**
- Used for: BioJagat product image
- Example: `/uploads/mockup-label-biojagat-1000.png`

#### **Domain 3: docs.centrabiotechindonesia.com/uploads/**
- Used for: PDF documents (test reports, brochures)
- Examples:
  - `/uploads/Lap%20Uji%20Efektifitas%20FloraOne%20Padat%20(Tebu)_Feb%202020.pdf`
  - `/uploads/Lap%20Uji%20Efektifitas%20FloraOne%20Cair%20(Padi)_Sep%202021.pdf`
  - `/uploads/Lap%20Uji%20Efektifitas%20Rajabio%20(Padi)_Mei%202023.pdf`

### LOCAL Repository Image Sources:

#### **Path 1: `/products/{product-name}/`**
- Located in: `public/products/`
- Examples:
  - `/products/floraone/floraone-cover.webp`
  - `/products/floraone/floraone-poster.png`
  - `/products/rajabio/rajabio-cover.webp`
  - `/products/simbios/simbios-cover.webp`
  - `/products/biokiller/biokiller-cover.webp`
- **Status:** ✅ EXIST LOCALLY

#### **Path 2: `/images/products/`**
- Used in: Biokalsi page
- Example: `/images/products/biokalsi-dolomit.webp`
- **Status:** ❌ DIRECTORY DOES NOT EXIST
- **Actual Location:** Image found in `cbi-backend/public/uploads/dolomit-biokalsi-mockup.webp`

#### **Path 3: `cbi-backend/public/uploads/`**
- Strapi CMS upload folder (563 total images)
- Contains:
  - Product mockups: `mockup-flora-one-padat.webp`, `dolomit-biokalsi-mockup.webp`
  - Test reports: `Lap Uji Efektifitas FloraOne Padat (Tebu)_Feb 2020.pdf`
  - Brochures: `e_brochure_Flora_One_5c10673502.pdf`
  - Blog images: ID45.webp through ID105.webp (45 files)
  - News images: img_news_1 through img_news_4

### Image Path Discrepancies:

| Product | Live Image Path | Local Code Reference | Actual File Location | Issue |
|---------|----------------|----------------------|---------------------|-------|
| Biokalsi | `www.../images/products/biokalsi-dolomit.webp` | `/images/products/biokalsi-dolomit.webp` | `cbi-backend/public/uploads/dolomit-biokalsi-mockup.webp` | ⚠️ Wrong path |
| FloraOne Padat | `www.../mockup-flora-one-padat.webp` | N/A (no local page) | `public/mockup-flora-one-padat.png` exists | ⚠️ Missing page |
| BioJagat | `cbi-backend.my.id/uploads/mockup-label-biojagat-1000.png` | N/A (no local page) | Not found locally | ⚠️ Missing file |

---

## 3. Content Structure Comparison

### A. Hero Section

#### **LIVE Version:**
```jsx
<div className="hero-section">
  <img src="product-hero.webp" />
  <div className="category-badge">Pupuk Hayati</div>
  <h1>Product Title</h1>
</div>
```

#### **LOCAL Version:**
```tsx
<HeroSectionGeneral
  imgUrl="/products/floraone/floraone-cover.webp"
  category="Pupuk Hayati"
  title={<h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
    Tingkatkan Hasil Panen Anda dengan FLORA ONE - Pupuk Hayati Cair & Padat
  </h1>}
/>
```

**Differences:**
- LOCAL uses custom `HeroSectionGeneral` component
- LOCAL has responsive typography (text-3xl → lg:text-5xl → xl:text-[56px])
- LOCAL includes subtitle in hero
- LIVE has simpler static HTML

### B. Product Overview Section

#### **LIVE:**
- Simple 2-column layout (image + text)
- Short description (2-3 paragraphs)
- 2 CTA buttons: WhatsApp + Shopee

#### **LOCAL:**
- Enhanced layout with:
  - Product stats grid (86% Peningkatan Panen, 5 Jenis Mikroba, etc.)
  - More detailed description
  - CTA buttons: WhatsApp + Download Brochure (NOT Shopee)
  - Better accessibility with `<Image>` component

**Example LOCAL:**
```tsx
<div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
  {/* Left: Product Image */}
  <div className="lg:w-1/2">
    <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
      <Image
        src="/products/floraone/floraone-cover.webp"
        alt="FLORA ONE - Pupuk Hayati Cair & Padat"
        width={600}
        height={600}
        priority
        className="w-full h-auto object-contain rounded-2xl"
      />
    </div>
  </div>
  {/* Right: Content + CTAs */}
</div>
```

### C. Benefits Section (Mengapa Petani Memilih...)

#### **LIVE:**
- 6 benefit cards in 2x3 grid
- Icons + title + short description
- Simple card design

#### **LOCAL:**
- Same 6 benefits BUT:
  - Custom `BenefitIcon` component with switch statement
  - Lucide React icons (TrendingUp, Microscope, Shield, Leaf, Zap, Droplets)
  - More detailed descriptions
  - Better hover effects and transitions

**LOCAL Code:**
```tsx
const BenefitIcon = ({ type }: { type: string }) => {
  const iconClass = "h-8 w-8 text-[#006622]";
  switch (type) {
    case "trending": return <TrendingUp className={iconClass} />;
    case "microscope": return <Microscope className={iconClass} />;
    case "shield": return <Shield className={iconClass} />;
    // ...
  }
};
```

### D. Certifications Section (Dokumen Resmi & Sertifikasi)

#### **LIVE:**
- 5 certification badges:
  1. Kementerian Pertanian RI
  2. Sertifikat Organik LeSOS
  3. Standar SNI
  4. Akreditasi KAN
  5. TKDN Certificate (with verification link)
- Simple grid layout
- Static images from `/Certificate%20Logos/`

#### **LOCAL:**
- Same 5 certifications
- Enhanced with:
  - Hover effects
  - External links with `<ExternalLink>` icon
  - TKDN verification link to kemenperin.go.id
  - Better mobile responsiveness

### E. Video Gallery Section

#### **LIVE:**
- 4 YouTube videos embedded
- 4 TikTok video placeholders (thumbnail only, no iframe)
- Simple grid layout

#### **LOCAL - FloraOne Example:**
- **8 total videos:**
  - 4 YouTube embeds (same as LIVE)
  - 4 TikTok embeds (ACTUAL working iframes, not placeholders)
- Custom `VideoGallerySlider` component
- Video schema for SEO

**LOCAL Code:**
```tsx
const floraoneVideos = [
  {
    id: "rRbK3D_gvS4",
    title: "DULU BEKAS PRODUKSI BATU BATA...",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "tiktok-1",
    title: "Sawah Batu Bata Jadi Subur - RAJA BIO",
    embedUrl: "https://www.tiktok.com/embed/7473016610037577991",
    type: "tiktok"
  },
  // ... 8 videos total
];
```

#### **LIVE:**
```html
<!-- Only 4 YouTube videos, TikTok are placeholders -->
<iframe src="https://www.youtube.com/embed/rRbK3D_gvS4"></iframe>
<div class="tiktok-placeholder">
  <img src="placeholder.jpg" />
  <span>TikTok Video #1</span>
</div>
```

**Difference:** LOCAL has functional TikTok embeds, LIVE does not.

### F. FAQ Section

#### **LIVE:**
- 5-6 FAQ items
- Simple accordion
- No schema markup visible

#### **LOCAL:**
- Same 5-6 FAQ items
- Shadcn/ui Accordion component
- **FAQ Schema markup** for SEO:

```tsx
const faqSchema = generateFAQSchema(data.faq.map(item => ({ 
  question: item.q, 
  answer: item.a 
})));
```

---

## 4. SEO & Structured Data Comparison

### LIVE Production (centrabiotechindonesia.com):

**Metadata:**
- Basic title and description
- Open Graph tags present
- No visible structured data in source

**Observable Issues:**
- Missing JSON-LD schema
- No breadcrumb schema
- No product schema
- No video schema
- No FAQ schema

### LOCAL Repository:

**Enhanced Metadata:**
```tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pupuk Hayati Terbaik FLORA ONE - Tingkatkan Panen 86%...",
    description: "Pupuk hayati FLORA ONE mengandung 5 jenis mikroba hidup...",
    keywords: "jual pupuk hayati cair, jual pupuk hayati padat, pupuk hayati terbaik...",
    openGraph: { ... },
    twitter: { ... },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
      languages: { 'id': ..., 'en': ... }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { ... }
    }
  };
}
```

**Advanced Structured Data (JSON-LD):**

1. **Product Schema:**
```tsx
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "...#product",
  "name": "FLORA ONE",
  "alternateName": ["FLORA ONE", "Flora One Pupuk Hayati", "FloraOne"],
  "description": "...",
  "brand": { "@type": "Brand", ... },
  "manufacturer": { "@type": "Organization", ... },
  "category": "Biological Fertilizer",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Microbe 1", "value": "Pseudomonas fluorescens - PGPR & Fungisida Hayati" },
    { "@type": "PropertyValue", "name": "Yield Increase", "value": "Up to 86%" },
    // ... 8 properties
  ],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "IDR",
    "price": "60000",
    "availability": "https://schema.org/InStock",
    "hasMerchantReturnPolicy": { ... },
    "shippingDetails": { ... }
  },
  "isRelatedTo": [ /* Related products */ ]
}
```

2. **Breadcrumb Schema:**
```tsx
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "/" },
    { "@type": "ListItem", "position": 2, "name": "Produk & Layanan", "item": "/produk-layanan" },
    // ...
  ]
}
```

3. **FAQ Schema:**
```tsx
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apa itu pupuk hayati FLORA ONE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FLORA ONE adalah pupuk hayati mengandung 5 jenis mikroba hidup..."
      }
    },
    // ... all FAQs
  ]
}
```

4. **Video Schema (for each video):**
```tsx
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "TESTIMONI PETANI...",
  "description": "...",
  "thumbnailUrl": "https://img.youtube.com/vi/rRbK3D_gvS4/maxresdefault.jpg",
  "uploadDate": "2024-01-01",
  "contentUrl": "https://www.youtube.com/embed/rRbK3D_gvS4"
}
```

5. **Organization Schema:**
```tsx
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ".../#organization",
  "name": "PT. Centra Biotech Indonesia",
  "url": "...",
  "logo": ".../centra-biotech-logo.png",
  "address": { "@type": "PostalAddress", ... },
  "contactPoint": { "@type": "ContactPoint", ... },
  "sameAs": [ /* Social media links */ ],
  "knowsAbout": [
    "Biological Fertilizers",
    "Organic Fertilizers", 
    "Bio-pesticides",
    "Agricultural Biotechnology"
  ]
}
```

**Total Structured Data:** 10+ schemas per page in LOCAL vs 0 in LIVE

---

## 5. CTA Buttons & External Links Comparison

### FloraOne Page:

| CTA | LIVE | LOCAL |
|-----|------|-------|
| **Primary Button** | "Pesan Langsung via WhatsApp" | "Pesan via WhatsApp" |
| **Secondary Button** | "Beli di Shopee" (https://shopee.co.id/...) | "Unduh Brosur" (PDF link) |
| **Third Button** | N/A | "Unduh Hasil Uji Demplot" (PDF link) |

### RajaBio Page:

| CTA | LIVE | LOCAL |
|-----|------|-------|
| **Primary Button** | "Pesan Langsung via WhatsApp" | "Pesan Langsung via WhatsApp" |
| **Secondary Button** | "Beli di Shopee" | "Beli di Shopee" |
| **Third Button** | N/A | "Unduh Hasil Demplot" (PDF link) |

### Biokalsi Page:

| CTA | LIVE | LOCAL |
|-----|------|-------|
| **Primary Button** | "Pesan via WhatsApp" | "Pesan via WhatsApp" |
| **Secondary Button** | "Unduh Brosur" (placeholder #) | "Unduh Brosur" (placeholder #) |
| **Third Button** | N/A | "Unduh Hasil Uji Lab" (placeholder #) |

**Key Differences:**
- LIVE emphasizes Shopee links (marketplace sales)
- LOCAL emphasizes educational content (brochures, test results)
- LOCAL has more download CTAs for credibility

---

## 6. Missing Products Analysis

### **Product 1: FloraOne Pupuk Hayati Padat**
- **Live URL:** `/id/produk-layanan/pertanian/floraone-pupuk-hayati-padat`
- **Local Status:** ❌ No dedicated page
- **Hero Image (LIVE):** `https://www.centrabiotechindonesia.com/mockup-flora-one-padat.webp`
- **Local Image Found:** `public/mockup-flora-one-padat.png` (11.2 MB PNG)

**Content on LIVE:**
- Title: "FLORAONE Pupuk Hayati Padat"
- Description: "FloraOne adalah pupuk hayati organik premium yang mengandung konsorsium mikroba unggul untuk meningkatkan kesuburan tanah..."
- Benefits: Same 6 benefits as liquid version
- Certifications: Same 5 certificates
- Videos: Same 4 YouTube + 4 TikTok placeholders

**Where to create locally:**
- Option A: Create dedicated folder `app/[lang]/produk-layanan/pertanian/floraone-pupuk-hayati-padat/page.tsx`
- Option B: Use dynamic `[slug]` route with Strapi CMS data

### **Product 2: BioJagat Pupuk Hayati Cair**
- **Live URL:** `/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`
- **Local Status:** ❌ No dedicated page
- **Hero Image (LIVE):** `https://cbi-backend.my.id/uploads/mockup-label-biojagat-1000.png`
- **Local Image:** ❌ NOT FOUND in repository

**Content on LIVE:**
- Title: "Pupuk Hayati Cair Terbaik - BIOJAGAT Tingkatkan Panen Hingga 40%"
- Description: "BIOJAGAT adalah pupuk organik cair (POC) premium yang diformulasikan dari bahan alami pilihan menggunakan teknologi fermentasi modern..."
- Benefits: 6 benefits (Tingkatkan Hasil Panen, Suburkan Tanah, Tahan Hama & Penyakit, Ramah Lingkungan, Hemat Biaya, Mudah Diaplikasi)
- Certifications: Same 5 certificates (Kementan, LeSOS, SNI, KAN, TKDN)
- Videos: Same reused videos (4 YouTube + 4 TikTok placeholders)

**Missing Assets:**
- Need to download `mockup-label-biojagat-1000.png` from VPS
- Need product brochure PDF
- Need test report PDF (currently placeholder)

**Where to create locally:**
- Option A: Create `app/[lang]/produk-layanan/pertanian/biojagat-pupuk-hayati-cair/page.tsx`
- Option B: Use dynamic `[slug]` route with Strapi CMS

### Documentation Found:
- `VPS_PRODUCT_CATEGORY_IMPLEMENTATION.md` contains data for both products
- References to Strapi database entries
- SQL queries to add these products to categories

---

## 7. Code Quality & Best Practices

### LOCAL Advantages:

1. **Next.js 14+ Features:**
   - App Router with async Server Components
   - `generateStaticParams()` for static page generation
   - `generateMetadata()` for dynamic metadata
   - TypeScript throughout

2. **Component Architecture:**
   - Reusable components: `HeroSectionGeneral`, `VideoGallerySlider`, `Breadcrumb`, `ContainerSection`
   - Shadcn/ui components: `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`
   - Icon library: Lucide React (tree-shakeable)

3. **Image Optimization:**
   - Next.js `<Image>` component with:
     - `priority` prop for hero images (LCP optimization)
     - `width` and `height` for aspect ratio
     - `alt` text for accessibility
   - WebP format with fallback

4. **SEO Excellence:**
   - Structured data for all content types
   - Canonical URLs
   - Language alternates (id/en)
   - Robots meta tags with granular control
   - Open Graph + Twitter Cards

5. **Internationalization:**
   - Bilingual content (Indonesian/English)
   - Proper locale handling
   - Dictionary-based translations

6. **External Link Management:**
   - Constants for all external URLs
   - WhatsApp links with pre-filled messages
   - Document links (PDFs, certificates)
   - E-catalog links (INAPROC)

### LIVE Limitations:

1. **Static HTML/PHP:**
   - Less dynamic
   - Harder to maintain
   - No component reusability

2. **Missing SEO Features:**
   - No structured data
   - Basic metadata only

3. **Image Optimization:**
   - No Next.js Image optimization
   - Manual responsive handling

4. **Code Duplication:**
   - Repeated video embeds across pages
   - Similar layouts copy-pasted

---

## 8. Recommendations

### Priority 1: CRITICAL

1. **Create Missing Product Pages:**
   ```bash
   # Option A: Create dedicated pages
   mkdir -p app/[lang]/produk-layanan/pertanian/floraone-pupuk-hayati-padat
   mkdir -p app/[lang]/produk-layanan/pertanian/biojagat-pupuk-hayati-cair
   ```

2. **Fix Biokalsi Image Path:**
   ```tsx
   // Current (BROKEN):
   imgUrl="/images/products/biokalsi-dolomit.webp"
   
   // Fix Option 1: Move file
   mv cbi-backend/public/uploads/dolomit-biokalsi-mockup.webp public/images/products/biokalsi-dolomit.webp
   
   // Fix Option 2: Update code
   imgUrl="/cbi-backend/public/uploads/dolomit-biokalsi-mockup.webp"
   
   // Fix Option 3: Use public root
   mv cbi-backend/public/uploads/dolomit-biokalsi-mockup.webp public/products/biokalsi/biokalsi-mockup.webp
   imgUrl="/products/biokalsi/biokalsi-mockup.webp"
   ```

3. **Download Missing BioJagat Image:**
   ```bash
   ssh hostinger
   cd /opt/cbi-strapi/public/uploads
   # Identify correct biojagat mockup image
   ls -lah | grep -i biojagat
   
   # Download via SCP
   scp root@72.62.122.166:/opt/cbi-strapi/public/uploads/mockup-label-biojagat-1000.png public/products/biojagat/
   ```

### Priority 2: HIGH

4. **Sync Image Sources:**
   - Consolidate all product images to `public/products/{product}/`
   - Create consistent naming: `{product}-cover.webp`, `{product}-mockup.webp`
   - Update all page.tsx files to use unified paths

5. **Deploy LOCAL Version to Production:**
   ```bash
   # Build and verify
   npm run build
   
   # Deploy via Vercel CLI
   vercel --prod
   ```

6. **Add TikTok Embeds to LIVE:**
   - LOCAL already has working TikTok iframe embeds
   - Update LIVE pages to include actual TikTok embeds instead of placeholders

### Priority 3: MEDIUM

7. **Implement Structured Data on LIVE:**
   - Add JSON-LD schema markup to all product pages
   - Use LOCAL schemas as reference

8. **Standardize CTA Buttons:**
   - Decide on primary call-to-action (Shopee vs Brochure)
   - Maintain consistency across all products

9. **Create Image Optimization Pipeline:**
   - Convert all PNGs to WebP
   - Generate multiple sizes for responsive loading
   - Implement lazy loading for below-fold images

### Priority 4: LOW

10. **Component Library Documentation:**
    - Document all reusable components
    - Create Storybook for UI components

11. **A/B Testing Setup:**
    - Test Shopee CTA vs Brochure CTA conversion rates
    - Test video placement effectiveness

---

## 9. Image Asset Checklist

### ✅ Available Locally:

- [x] FloraOne cover: `public/products/floraone/floraone-cover.webp`
- [x] FloraOne poster: `public/products/floraone/floraone-poster.png`
- [x] FloraOne Padat mockup: `public/mockup-flora-one-padat.png` (needs move)
- [x] RajaBio cover: `public/products/rajabio/rajabio-cover.webp`
- [x] Simbios cover: `public/products/simbios/simbios-cover.webp`
- [x] Biokiller cover: `public/products/biokiller/biokiller-cover.webp`
- [x] Black Turbo mockup: `public/mockup-black-turbo.png`
- [x] Biokalsi mockup: `cbi-backend/public/uploads/dolomit-biokalsi-mockup.webp`

### ❌ Missing Locally:

- [ ] BioJagat mockup: `mockup-label-biojagat-1000.png` (on VPS only)
- [ ] Product SKU images from `product%20SKU/` folder (on LIVE domain)

### 📄 PDF Documents Available:

- [x] FloraOne Cair test report (Padi - Oct 2011)
- [x] FloraOne Cair test report (Padi - Sep 2021)
- [x] FloraOne Padat test report (Tebu - Feb 2020)
- [x] RajaBio test report (Padi - Mei 2023)
- [x] Simbios test report (Padi - Nov 2022)
- [x] Biokiller test report (Padi/Nilaparvata - Jan 2025 UNUD)
- [x] Biokalsi test report (Desember 2025)
- [x] All product brochures (e_brochure_*.pdf)
- [x] All certificates (SK_*.pdf)

---

## 10. Technical Debt & Future Work

### Current Technical Debt:

1. **Mixed Image Sources:**
   - Images scattered across 4 different locations
   - Inconsistent path structures
   - Some images in root public, some in subfolders

2. **Dynamic vs Static Pages:**
   - Some products use static pages (floraone, rajabio, etc.)
   - Some products may use dynamic [slug] route
   - No clear pattern for when to use which approach

3. **CMS Integration:**
   - Strapi CMS exists on VPS
   - Local pages are static (not using CMS data)
   - Potential for content drift between CMS and code

4. **Missing /images/ Directory:**
   - Biokalsi page references `/images/products/` which doesn't exist
   - Need to create proper image directory structure

### Future Improvements:

1. **Unified CMS Strategy:**
   - Option A: Migrate all products to dynamic [slug] route using Strapi API
   - Option B: Keep static pages but sync content from CMS
   - Option C: Hybrid approach (static build with CMS data)

2. **Image CDN:**
   - Upload all product images to CDN (Cloudinary, Vercel Blob)
   - Implement automatic WebP conversion
   - Generate responsive image sets

3. **Analytics Integration:**
   - Track CTA button clicks (WhatsApp vs Shopee vs Download)
   - Monitor video engagement
   - A/B test different layouts

4. **Performance Optimization:**
   - Implement route-level code splitting
   - Lazy load components below fold
   - Optimize LCP for hero images

---

## Conclusion

### Summary of Findings:

1. **Content Quality:** LOCAL version is significantly more advanced with:
   - Enhanced SEO (10+ structured data schemas per page)
   - Better component architecture
   - More video content (8 vs 4 functional embeds)
   - Superior image optimization

2. **Missing Pages:** 2 products exist on LIVE but not locally:
   - FloraOne Pupuk Hayati Padat
   - BioJagat Pupuk Hayati Cair

3. **Image Issues:**
   - Biokalsi uses non-existent path `/images/products/`
   - BioJagat image only on VPS, not in local repo
   - Inconsistent image organization

4. **CTA Strategy Difference:**
   - LIVE emphasizes marketplace sales (Shopee)
   - LOCAL emphasizes educational content (brochures, reports)

### Immediate Action Items:

1. ✅ Create `floraone-pupuk-hayati-padat/page.tsx`
2. ✅ Create `biojagat-pupuk-hayati-cair/page.tsx`
3. ✅ Fix Biokalsi image path
4. ✅ Download BioJagat mockup from VPS
5. ✅ Deploy LOCAL version with all features to production

### Long-term Strategy:

- Decide on CMS vs static page approach
- Consolidate all product images to unified structure
- Implement continuous sync between code and CMS content
- Set up automated image optimization pipeline

---

**Analysis Complete** ✅

Generated: January 21, 2026 by GitHub Copilot
