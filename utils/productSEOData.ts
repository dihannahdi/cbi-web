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
    { name: 'Konsentrasi', value: '>1×10⁷ CFU/gram' },
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
    { name: 'Kandungan Mikroba', value: 'Trichoderma sp., Pseudomonas fluorescens' },
    { name: 'Konsentrasi', value: '>1×10⁸ CFU/ml' },
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
  description: 'Pupuk hayati cair formulasi khusus dengan mikroba penambat nitrogen dan pelarut fosfat. Meningkatkan efisiensi pemupukan dan kesuburan tanah secara alami. Cocok untuk semua jenis tanaman.',
  image: '/mockup-biojagat.png',
  url: '/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair',
  sku: 'CBI-BJG-001',
  mpn: 'BIOJAGAT-1L',
  brand: 'BIOJAGAT',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    { name: 'Kandungan Mikroba', value: 'Azotobacter chroococcum, Bacillus megaterium' },
    { name: 'Fungsi Utama', value: 'Fiksasi N, Pelarut P' },
    { name: 'Kemasan', value: '1 L, 5 L, 20 L' },
  ],
};

/**
 * SIMBIOS Pupuk Hayati
 */
export const SIMBIOS_SEO: EnterpriseProductData = {
  name: 'SIMBIOS Pupuk Hayati',
  description: 'Pupuk hayati dengan teknologi simbiosis mikoriza untuk meningkatkan penyerapan unsur hara terutama fosfor. Memperluas jangkauan akar dan meningkatkan ketahanan tanaman terhadap kekeringan.',
  image: '/mockup-simbios.png',
  url: '/id/produk-layanan/pertanian/simbios-pupuk-hayati',
  sku: 'CBI-SIM-001',
  mpn: 'SIMBIOS-5KG',
  brand: 'SIMBIOS',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    { name: 'Teknologi', value: 'Vesicular Arbuscular Mycorrhiza (VAM)' },
    { name: 'Kandungan', value: 'Mikoriza, Trichoderma' },
    { name: 'Manfaat Utama', value: 'Penyerapan P, Ketahanan Kekeringan' },
  ],
};

/**
 * RAJABIO Pupuk Organik
 */
export const RAJABIO_SEO: EnterpriseProductData = {
  name: 'RAJABIO Pupuk Organik',
  description: 'Pupuk organik premium berbahan dasar kotoran ternak terfermentasi sempurna dengan tambahan mikroba dekomposer. Memperbaiki struktur tanah, meningkatkan kapasitas tukar kation (KTK), dan menyediakan unsur hara lengkap secara slow-release.',
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
    { name: 'Bahan Dasar', value: 'Kotoran sapi, ayam terfermentasi' },
    { name: 'Kandungan C-Organik', value: '>15%' },
    { name: 'C/N Ratio', value: '15-25' },
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
    { name: 'Konsentrasi', value: '>1×10⁸ spora/ml' },
    { name: 'Aplikasi', value: 'Semprot, PHT (Pengendalian Hama Terpadu)' },
  ],
};

/**
 * BLACKTURBO Asam Humat
 */
export const BLACKTURBO_SEO: EnterpriseProductData = {
  name: 'BLACKTURBO Asam Humat',
  description: 'Asam humat dan fulvat berkualitas tinggi dari leonardite untuk meningkatkan kapasitas tukar kation tanah, memperbaiki struktur tanah, dan meningkatkan efisiensi penyerapan pupuk. Ideal sebagai soil conditioner.',
  image: '/mockup-blackturbo.png',
  url: '/id/produk-layanan/pertanian/blackturbo-asam-humat',
  sku: 'CBI-BLT-001',
  mpn: 'BLACKTURBO-1L',
  brand: 'BLACKTURBO',
  category: 'Pembenah Tanah > Pertanian > Agrikultur',
  // offers / aggregateRating / review / hasCertification / gtin14 removed —
  // see file header note (2026-07-28 GSC structured-data remediation).
  additionalProperty: [
    { name: 'Kandungan Asam Humat', value: '>12%' },
    { name: 'Kandungan Asam Fulvat', value: '>3%' },
    { name: 'pH', value: '9-11 (alkali)' },
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
    { name: 'Kandungan CaO', value: '>30%' },
    { name: 'Kandungan MgO', value: '>18%' },
    { name: 'Kehalusan', value: '80 mesh' },
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
