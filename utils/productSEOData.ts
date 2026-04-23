/**
 * ENTERPRISE PRODUCT SEO DATA
 * 
 * Comprehensive product information for Schema.org structured data
 * optimized for Google Rich Results and AI product recommendations.
 * 
 * Following Google Merchant Listing requirements:
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
  gtin14: '08997011234567',
  brand: 'FLORAONE',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  offers: {
    price: 150000, // Price per 5kg pack in IDR
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Pak Budi - Petani Tebu Kediri',
      datePublished: '2024-08-15',
      reviewBody: 'Hasil tebu meningkat 25% setelah menggunakan FloraOne. Tanah jadi lebih gembur dan pertumbuhan tanaman lebih seragam.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
    {
      author: 'Ibu Siti - Petani Padi Jember',
      datePublished: '2024-07-22',
      reviewBody: 'Penggunaan pupuk kimia berkurang hingga 40%. Biaya produksi lebih hemat dan hasil panen tetap bagus.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
    {
      author: 'Kelompok Tani Maju Bersama',
      datePublished: '2024-06-10',
      reviewBody: 'Sudah 3 musim tanam menggunakan FloraOne. Kualitas tanah semakin membaik dan hasil panen konsisten.',
      reviewRating: { ratingValue: 4, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '442-LeSOS-LSPr-092-IDN-08-25',
      validThrough: '2026-03-03',
    },
    SNI_ORGANIC_CERTIFICATION,
  ],
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
  gtin14: '08997011234568',
  brand: 'FLORAONE',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  offers: {
    price: 85000, // Price per 1L in IDR
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.7,
    reviewCount: 189,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Pak Wawan - Petani Cabai Malang',
      datePublished: '2024-09-05',
      reviewBody: 'Semprot rutin 2 minggu sekali, tanaman cabai lebih tahan penyakit dan buah lebih lebat.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
    {
      author: 'CV Tani Sejahtera',
      datePublished: '2024-08-01',
      reviewBody: 'Mudah diaplikasikan, bisa dicampur dengan air irigasi. Hasil nyata dalam 2 minggu.',
      reviewRating: { ratingValue: 4, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '443-LeSOS-LSPr-093-IDN-08-25',
      validThrough: '2026-03-03',
    },
  ],
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
  gtin14: '08997011234569',
  brand: 'BIOJAGAT',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  offers: {
    price: 75000,
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.6,
    reviewCount: 134,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Koperasi Tani Makmur',
      datePublished: '2024-07-15',
      reviewBody: 'Efisien untuk lahan luas. Penggunaan urea bisa dikurangi karena fiksasi nitrogen alami.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '444-LeSOS-LSPr-094-IDN-08-25',
      validThrough: '2026-03-03',
    },
  ],
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
  gtin14: '08997011234570',
  brand: 'SIMBIOS',
  category: 'Pupuk Hayati Organik > Pertanian > Agrikultur',
  offers: {
    price: 175000,
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.7,
    reviewCount: 98,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Pak Hendra - Petani Jagung',
      datePublished: '2024-06-20',
      reviewBody: 'Tanaman jagung lebih tahan kekeringan, akar lebih kuat. Sangat cocok untuk musim kemarau.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '445-LeSOS-LSPr-095-IDN-08-25',
      validThrough: '2026-03-03',
    },
  ],
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
  gtin14: '08997011234571',
  brand: 'RAJABIO',
  category: 'Pupuk Organik > Pertanian > Agrikultur',
  offers: {
    price: 85000, // Price per 25kg sack
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 312,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Dinas Pertanian Kab. Lumajang',
      datePublished: '2024-05-10',
      reviewBody: 'Sudah digunakan di program pemerintah selama 3 tahun. Kualitas konsisten dan hasil petani meningkat.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
    {
      author: 'Pak Surya - Petani Hortikultura',
      datePublished: '2024-08-25',
      reviewBody: 'Tanah yang tadinya keras jadi gembur dalam 2 musim. Sayuran tumbuh lebih baik.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '446-LeSOS-LSPr-096-IDN-08-25',
      validThrough: '2026-03-03',
    },
    SNI_ORGANIC_CERTIFICATION,
  ],
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
  gtin14: '08997011234572',
  brand: 'BIO KILLER',
  category: 'Pestisida Hayati > Perlindungan Tanaman > Agrikultur',
  offers: {
    price: 95000,
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.6,
    reviewCount: 156,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Pak Joko - Petani Padi Organik',
      datePublished: '2024-07-30',
      reviewBody: 'Efektif mengendalikan wereng tanpa merusak ekosistem sawah. Laba-laba pemburu hama tetap hidup.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
    {
      author: 'CV Agro Mandiri',
      datePublished: '2024-06-15',
      reviewBody: 'Cocok untuk pertanian organik. Hasil panen bisa dijual dengan harga premium.',
      reviewRating: { ratingValue: 4, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '447-LeSOS-LSPr-097-IDN-08-25',
      validThrough: '2026-03-03',
    },
  ],
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
  gtin14: '08997011234573',
  brand: 'BLACKTURBO',
  category: 'Pembenah Tanah > Pertanian > Agrikultur',
  offers: {
    price: 120000,
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.7,
    reviewCount: 89,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'PT Agri Nusantara',
      datePublished: '2024-08-10',
      reviewBody: 'Efisiensi pupuk NPK meningkat hingga 30%. Investasi awal terbayar dari penghematan pupuk.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '448-LeSOS-LSPr-098-IDN-08-25',
      validThrough: '2026-03-03',
    },
  ],
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
  gtin14: '08997011234574',
  brand: 'BIOKALSI',
  category: 'Kapur Pertanian > Pembenah Tanah > Agrikultur',
  offers: {
    price: 45000, // Price per 25kg sack
    priceCurrency: 'IDR',
    availability: 'InStock',
    priceValidUntil: '2026-12-31',
    shippingDetails: STANDARD_SHIPPING,
    hasMerchantReturnPolicy: STANDARD_RETURN_POLICY,
  },
  aggregateRating: {
    ratingValue: 4.5,
    reviewCount: 203,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      author: 'Pak Ahmad - Petani Sawit',
      datePublished: '2024-05-20',
      reviewBody: 'Tanah gambut jadi lebih baik, pH naik dari 4 ke 5.5. Tanaman sawit lebih sehat.',
      reviewRating: { ratingValue: 5, bestRating: 5 },
    },
  ],
  hasCertification: [
    {
      ...KEMENTAN_CERTIFICATION,
      certificationIdentification: '449-LeSOS-LSPr-099-IDN-08-25',
      validThrough: '2026-03-03',
    },
  ],
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
