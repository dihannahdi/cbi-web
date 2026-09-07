/**
 * ENTERPRISE PRODUCT SEO DATA
 *
 * Comprehensive product information for Schema.org structured data
 * optimized for Google Rich Results and AI product recommendations.
 *
 * IMPORTANT (2026-07-28 GSC structured-data remediation):
 * This catalog is currently DEAD CODE. `getProductSEOData()` is only called
 * from app/[lang]/produk-layanan/pertanian/[slug]/page.tsx, but every key
 * below either matches a product that has its own static route (which Next.js
 * always resolves before the [slug] catch-all) or a slug that doesn't exist
 * on any live page. No live URL currently renders this data.
 *
 * The `offers` (price/shippingDetails/hasMerchantReturnPolicy), `gtin14`,
 * `hasCertification` (certificationIdentification), and `review`/
 * `aggregateRating` values below were fabricated — invented prices, a
 * sequentially-numbered fake GTIN range, fake certification registration
 * numbers, and fake named reviewers — not sourced from real business data.
 * They have been removed so this file can't accidentally ship fabricated
 * Merchant/Review structured data if the slug keys are ever "fixed" to match
 * live routes. If real prices/certifications/reviews become available, add
 * them back sourced from the CMS (see utils/strapiProductData.ts's `priceIdr`
 * /`gtin`/`priceValidUntil` fields) — do not re-invent placeholder values.
 *
 * Following Google Merchant Listing requirements (for when real data exists):
 * - Required: name, image, offers.price, offers.priceCurrency, offers.availability
 * - Strongly Recommended: sku, mpn, brand, aggregateRating, review, hasCertification
 * - Recommended: shippingDetails, hasMerchantReturnPolicy
 *
 * IMPORTANT (2026-09-07 fabricated-composition audit):
 * Every `description` and `additionalProperty` composition/ingredient claim
 * below was checked against the live static pages under
 * app/[lang]/produk-layanan/pertanian/**\/page.tsx (the ones Next.js actually
 * serves — see the dead-code note above for why the [slug] catch-all rarely
 * reaches this file). Anything not stated on the corresponding live page was
 * removed rather than softened; anything stated with a different number was
 * corrected to the live figure. SIMBIOS carries no composition claim at all —
 * its "Vesicular Arbuscular Mycorrhiza" / mikoriza claim was invented and no
 * authoritative source for Simbios's actual composition exists, so none is
 * asserted here. Do not reintroduce a composition/ingredient value without
 * checking it against the live page first.
 */

import { SITE_CONFIG } from './seo';
import type { ProductData } from './structuredData';

// ============================================
// ENTERPRISE PRODUCT SEO INTERFACE
// ============================================

/**
 * Extended Product Data for Enterprise SEO
 * Includes all Google-recommended fields for maximum SERP visibility
 */
export interface EnterpriseProductData extends ProductData {
  // Product Identifiers (Google Merchant Required)
  gtin14?: string;       // Global Trade Item Number (14-digit)
  mpn?: string;          // Manufacturer Part Number
  
  // Certification for agricultural products (highly valued by Google)
  hasCertification?: Array<{
    issuedBy: string;
    name: string;
    certificationIdentification?: string;
    validFrom?: string;
    validThrough?: string;
  }>;
  
  // Material and ingredients (for agricultural products)
  material?: string;
  additionalProperty?: Array<{
    name: string;
    value: string;
  }>;
}

// ============================================
// CENTRA BIOTECH PRODUCT CATALOG
// ============================================

/**
 * Common company data used across all products
 */
export const COMPANY_DATA = {
  name: 'PT Centra Biotech Indonesia',
  legalName: 'PT. Centra Biotech Indonesia',
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/centra-biotech-logo.png`,
  address: {
    streetAddress: 'Sawahan RT 02 RW 07 Pasungan, Ceper',
    addressLocality: 'Klaten',
    addressRegion: 'Jawa Tengah',
    postalCode: '57465',
    addressCountry: 'ID',
  },
  telephone: '+6285196214187',
  email: 'centrabiotech.id@gmail.com',
  foundingDate: '2011',
  slogan: 'Solusi Bioteknologi Terintegrasi untuk Pertanian dan Peternakan Indonesia',
};

/**
 * Standard shipping details for all products (Indonesia-wide)
 */
export const STANDARD_SHIPPING = {
  shippingRate: { 
    value: 0, // Free shipping for bulk orders
    currency: 'IDR' 
  },
  shippingDestination: 'ID',
  deliveryTime: { 
    minDays: 2, 
    maxDays: 7 
  },
};

/**
 * Standard return policy for agricultural products
 */
export const STANDARD_RETURN_POLICY = {
  returnPolicyCategory: 'MerchantReturnFiniteReturnWindow' as const,
  merchantReturnDays: 14,
  returnMethod: 'ReturnByMail' as const,
  returnFees: 'OriginalShippingFees' as const,
};

/**
 * Kementan RI Certification (Ministry of Agriculture)
 */
export const KEMENTAN_CERTIFICATION = {
  issuedBy: 'Kementerian Pertanian Republik Indonesia',
  name: 'Izin Edar Pupuk Organik/Hayati',
  validFrom: '2021-03-03',
};

/**
 * SNI Organic Certification
 */
export const SNI_ORGANIC_CERTIFICATION = {
  issuedBy: 'Badan Standardisasi Nasional (BSN)',
  name: 'SNI 6729:2016 - Sistem Pertanian Organik',
};

/**
 * TKDN Certification (Tingkat Komponen Dalam Negeri)
 * Important for Indonesian government procurement eligibility
 */
export const TKDN_CERTIFICATION = {
  issuedBy: 'Kementerian Perindustrian Republik Indonesia',
  name: 'Sertifikat Tingkat Komponen Dalam Negeri (TKDN)',
  certificationIdentification: 'TKDN ≥40%',
  description: 'Eligible for government procurement programs',
};

/**
 * LeSOS Organic Certification
 */
export const LESOS_ORGANIC_CERTIFICATION = {
  issuedBy: 'Lembaga Sertifikasi Organik Seloliman (LeSOS)',
  name: 'Sertifikat Organik Indonesia',
};

// ============================================
// INDIVIDUAL PRODUCT SEO DATA
// ============================================

/**
 * FLORAONE Pupuk Hayati Padat (Solid Biological Fertilizer)
 */
export const FLORAONE_PADAT_SEO: EnterpriseProductData = {
  name: 'FLORAONE Pupuk Hayati Padat',
  description: 'Pupuk hayati organik premium mengandung konsorsium mikroba unggul (Rhizobium sp., Azotobacter sp., Trichoderma sp., Aspergillus sp., Pseudomonas sp.) untuk meningkatkan kesuburan tanah dan produktivitas tanaman. Bersertifikat Kementan RI & SNI 6729:2016 untuk pertanian organik berkelanjutan.',
  image: '/mockup-flora-one-padat.png',
  url: '/id/produk-layanan/pertanian/floraone-pupuk-hayati-padat',
  sku: 'CBI-FLO-PADAT-001',
  mpn: 'FLORAONE-SOLID-5KG',
  brand: 'FLORAONE',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    { name: 'Kandungan Mikroba', value: 'Rhizobium, Azotobacter, Trichoderma, Aspergillus, Pseudomonas' },
    // 'Konsentrasi' (>1×10⁷ CFU/gram) removed 2026-09-07 — no CFU figure for
    // the padat SKU appears on the live page (only generic "konsentrasi
    // tinggi" wording). Unverified, so dropped rather than guessed.
    { name: 'Bentuk', value: 'Granul/Padat' },
    { name: 'Kemasan', value: '5 kg, 25 kg, Bulk' },
    { name: 'Cocok untuk', value: 'Padi, Tebu, Jagung, Kedelai, Sayuran' },
  ],
};

/**
 * FLORAONE Pupuk Hayati Cair (Liquid Biological Fertilizer)
 */
export const FLORAONE_CAIR_SEO: EnterpriseProductData = {
  name: 'FLORAONE Pupuk Hayati Cair',
  description: 'Pupuk hayati organik cair dengan konsorsium mikroba unggul untuk aplikasi semprot daun dan fertigasi. Meningkatkan penyerapan nutrisi dan ketahanan tanaman terhadap penyakit. Bersertifikat Kementan RI.',
  image: '/mockup-flora-one-cair.png',
  url: '/id/produk-layanan/pertanian/floraone-pupuk-hayati',
  sku: 'CBI-FLO-CAIR-001',
  mpn: 'FLORAONE-LIQUID-1L',
  brand: 'FLORAONE',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    // Corrected 2026-09-07 to the full 5-microbe consortium shown on the
    // live page's own composition table and Product JSON-LD
    // (app/[lang]/produk-layanan/pertanian/floraone-pupuk-hayati/page.tsx) —
    // the previous 2-organism list was an incomplete abridgment.
    { name: 'Kandungan Mikroba', value: 'Pseudomonas fluorescens, Azospirillum sp., Rhizobium sp., Trichoderma harzianum, Aspergillus niger' },
    // 'Konsentrasi' (>1×10⁸ CFU/ml) removed 2026-09-07 — no CFU figure
    // appears anywhere on the live page for this SKU. Unverified.
    { name: 'Bentuk', value: 'Cair konsentrat' },
    { name: 'Kemasan', value: '1 L, 5 L, 20 L, Bulk' },
    { name: 'Aplikasi', value: 'Semprot daun, Fertigasi, Seed treatment' },
  ],
};

/**
 * BIOJAGAT Pupuk Hayati Cair
 */
export const BIOJAGAT_SEO: EnterpriseProductData = {
  name: 'BIOJAGAT Pupuk Hayati Cair',
  // Corrected 2026-09-07: the live page (biojagat-pupuk-hayati-cair/page.tsx)
  // only describes a generic "konsorsium mikroorganisme bermanfaat" — it
  // never names Azotobacter/Bacillus or a nitrogen-fixing/phosphate-solubilizing
  // function. Description reworded to match; see additionalProperty note below.
  description: 'Pupuk hayati cair dengan konsorsium mikroorganisme bermanfaat untuk meningkatkan efisiensi pemupukan dan kesuburan tanah secara alami. Cocok untuk semua jenis tanaman.',
  image: '/mockup-biojagat.png',
  url: '/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair',
  sku: 'CBI-BJG-001',
  mpn: 'BIOJAGAT-1L',
  brand: 'BIOJAGAT',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    // 'Kandungan Mikroba' (Azotobacter chroococcum, Bacillus megaterium) and
    // 'Fungsi Utama' (Fiksasi N, Pelarut P) removed 2026-09-07 — the live
    // page never names these organisms or this function; unverified, so
    // removed rather than softened.
    { name: 'Kemasan', value: '1 L, 5 L, 20 L' },
  ],
};

/**
 * SIMBIOS Pupuk Hayati
 */
export const SIMBIOS_SEO: EnterpriseProductData = {
  name: 'SIMBIOS Pupuk Hayati',
  // Corrected 2026-09-07: the mycorrhiza/VAM claim below was fabricated —
  // the live page (simbios-pupuk-hayati-cair/page.tsx) describes SIMBIOS as
  // a bio-activation biofertilizer with a consortium of nitrogen-fixing,
  // phosphate-solubilizing and potassium-providing microorganisms (RAE 122%
  // independently tested); it never mentions mikoriza/VAM anywhere. No
  // authoritative source for a Simbios composition claim could be found, so
  // per project rule NO composition claim about Simbios is made here at all.
  description: 'Pupuk hayati premium dengan teknologi bio-aktivasi, mengandung konsorsium mikroorganisme penambat nitrogen, pelarut fosfat, dan penyedia kalium. Terbukti melalui uji RAE (Relative Agronomic Effectiveness) independen mencapai 122% efektivitas pada tanaman padi.',
  image: '/mockup-simbios.png',
  url: '/id/produk-layanan/pertanian/simbios-pupuk-hayati',
  sku: 'CBI-SIM-001',
  mpn: 'SIMBIOS-5KG',
  brand: 'SIMBIOS',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  // additionalProperty intentionally omitted 2026-09-07 — see description
  // note above. Do not add a composition/technology claim here without a
  // verifiable source; the old VAM/mikoriza/Trichoderma entries were invented.
};

/**
 * RAJABIO Pupuk Organik
 */
export const RAJABIO_SEO: EnterpriseProductData = {
  name: 'RAJABIO Pupuk Organik',
  // Corrected 2026-09-07: the live page (rajabio-pupuk-organik-cair/page.tsx)
  // describes RAJABIO only as fermented from "bahan alami pilihan" (selected
  // natural materials) — it never names manure/kotoran ternak as the base
  // material, and never mentions KTK/CEC or slow-release for this SKU.
  // Reworded to match what the live page actually says.
  description: 'Pupuk organik cair (POC) premium yang diformulasikan dari bahan alami pilihan menggunakan teknologi fermentasi modern. Mengandung C-Organik tinggi (>10%) yang efektif memupuk tanah, meningkatkan ketahanan tanaman terhadap hama dan penyakit, serta terbukti meningkatkan hasil panen hingga 40%.',
  image: '/mockup-rajabio.png',
  url: '/id/produk-layanan/pertanian/rajabio-pupuk-organik',
  sku: 'CBI-RJB-001',
  mpn: 'RAJABIO-25KG',
  brand: 'RAJABIO',
  category: 'Pupuk Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation). Note:
  // the removed "review" from "Dinas Pertanian Kab. Lumajang" falsely
  // attributed a government agency endorsement — never reintroduce an
  // institutional review like that without a verifiable, citable source.
  additionalProperty: [
    // 'Bahan Dasar' (Kotoran sapi, ayam terfermentasi) removed 2026-09-07 —
    // this is the exact defect pattern the project rule of 2026-06-08 exists
    // for (see RajaBio asam humat/fulvat precedent): the live page never
    // names a manure source, only "bahan alami pilihan". Unverified, removed.
    // 'Kandungan C-Organik' corrected from the fabricated '>15%' to the
    // figure the live page actually states (>10%, precisely 10.05%).
    { name: 'Kandungan C-Organik', value: '>10%' },
    // 'C/N Ratio' (15-25) removed 2026-09-07 — not mentioned anywhere on
    // the live page. Unverified.
    { name: 'Kemasan', value: '5 kg, 25 kg, Curah' },
  ],
};

/**
 * BIO KILLER Insektisida Hayati
 */
export const BIOKILLER_SEO: EnterpriseProductData = {
  name: 'BIO KILLER Insektisida Hayati',
  description: 'Insektisida hayati berbahan aktif Beauveria bassiana dan Metarhizium anisopliae untuk pengendalian hama secara biologis. Aman untuk lingkungan, tidak meninggalkan residu pada hasil panen, dan ramah musuh alami.',
  image: '/mockup-biokiller.png',
  url: '/id/produk-layanan/pertanian/biokiller-insektisida-hayati',
  sku: 'CBI-BKL-001',
  mpn: 'BIOKILLER-1L',
  brand: 'BIO KILLER',
  category: 'Pestisida Hayati > Perlindungan Tanaman > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    { name: 'Bahan Aktif', value: 'Beauveria bassiana, Metarhizium anisopliae' },
    { name: 'Target Hama', value: 'Wereng, Penggerek Batang, Walang Sangit, Kutu Daun' },
    // 'Konsentrasi' corrected 2026-09-07: the live page's own composition
    // table (biokiller-insektisida-hayati/page.tsx) states 1.0×10⁶ CFU/ml for
    // each organism — two orders of magnitude below the previous, fabricated
    // '>1×10⁸ spora/ml' figure.
    { name: 'Konsentrasi', value: '1.0 × 10⁶ CFU/ml (masing-masing bahan aktif)' },
    { name: 'Aplikasi', value: 'Semprot, PHT (Pengendalian Hama Terpadu)' },
  ],
};

/**
 * BLACKTURBO Asam Humat
 */
export const BLACKTURBO_SEO: EnterpriseProductData = {
  name: 'BLACKTURBO Asam Humat',
  // Corrected 2026-09-07: "dan fulvat" and "dari leonardite" removed — the
  // live page (blackturbo-asam-humat-cair/page.tsx) states 52.37% humic acid
  // with 81.04% solubility and never mentions fulvic acid or a leonardite
  // source. See additionalProperty note below for the fulvic-acid removal.
  description: 'Asam humat berkualitas tinggi (52,37%) untuk meningkatkan kapasitas tukar kation (KTK) tanah, memperbaiki struktur tanah, dan meningkatkan efisiensi penyerapan pupuk. Ideal sebagai soil conditioner.',
  image: '/mockup-blackturbo.png',
  url: '/id/produk-layanan/pertanian/blackturbo-asam-humat',
  sku: 'CBI-BLT-001',
  mpn: 'BLACKTURBO-1L',
  brand: 'BLACKTURBO',
  category: 'Pembenah Tanah > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    // Corrected 2026-09-07 from the fabricated '>12%' to the figure the live
    // page actually states (52,37%).
    { name: 'Kandungan Asam Humat', value: '52,37%' },
    // 'Kandungan Asam Fulvat' (>3%) removed 2026-09-07 — this is the exact
    // asam humat + asam fulvat fabrication pattern the project rule of
    // 2026-06-08 exists for (RajaBio precedent). The live page never
    // mentions fulvic acid for BLACKTURBO. Unverified, removed.
    // 'pH' (9-11, alkali) removed 2026-09-07 — not stated anywhere on the
    // live page. Unverified.
    { name: 'Fungsi', value: 'Soil conditioner, Chelating agent' },
  ],
};

/**
 * BIOKALSI Dolomit
 */
export const BIOKALSI_SEO: EnterpriseProductData = {
  name: 'BIOKALSI Dolomit',
  description: 'Dolomit berkualitas tinggi dengan kandungan kalsium dan magnesium untuk menetralisir pH tanah asam, menyediakan unsur hara sekunder Ca dan Mg, serta memperbaiki struktur tanah. Proses khusus untuk kehalusan optimal.',
  image: '/mockup-biokalsi.png',
  url: '/id/produk-layanan/pertanian/biokalsi-dolomit',
  sku: 'CBI-BKS-001',
  mpn: 'BIOKALSI-25KG',
  brand: 'BIOKALSI',
  category: 'Kapur Pertanian > Pembenah Tanah > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    // CaO/MgO corrected 2026-09-07 to the precise figures the live page
    // states (biokalsi-dolomit-pembenah-tanah/page.tsx: CaO 30,51%, MgO
    // 18,64%) — the old '>30%'/'>18%' were directionally consistent but
    // vaguer than the verified source.
    { name: 'Kandungan CaO', value: '30,51%' },
    { name: 'Kandungan MgO', value: '18,64%' },
    // 'Kehalusan' corrected from '80 mesh' — the live page states Mesh 100,
    // a direct contradiction, not merely an unverified figure.
    { name: 'Kehalusan', value: 'Mesh 100' },
    { name: 'Fungsi', value: 'Penetral pH tanah asam, Sumber Ca & Mg' },
  ],
};

// ============================================
// PRODUCT CATALOG MAPPING
// ============================================

/**
 * Map of product slug to SEO data
 */
export const PRODUCT_SEO_CATALOG: Record<string, EnterpriseProductData> = {
  'floraone-pupuk-hayati-padat': FLORAONE_PADAT_SEO,
  'floraone-pupuk-hayati': FLORAONE_CAIR_SEO,
  'biojagat-pupuk-hayati-cair': BIOJAGAT_SEO,
  'simbios-pupuk-hayati': SIMBIOS_SEO,
  'rajabio-pupuk-organik': RAJABIO_SEO,
  'biokiller-insektisida-hayati': BIOKILLER_SEO,
  'blackturbo-asam-humat': BLACKTURBO_SEO,
  'biokalsi-dolomit': BIOKALSI_SEO,
};

/**
 * Get product SEO data by slug
 */
export function getProductSEOData(slug: string): EnterpriseProductData | undefined {
  return PRODUCT_SEO_CATALOG[slug];
}

/**
 * Get all product slugs
 */
export function getAllProductSlugs(): string[] {
  return Object.keys(PRODUCT_SEO_CATALOG);
}
