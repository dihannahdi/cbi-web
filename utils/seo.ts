/**
 * SEO UTILITIES
 * Comprehensive SEO helper functions for maximum search engine optimization
 * Following Google's best practices and Schema.org standards
 * 
 * PT Centra Biotech Indonesia - Indonesia's Leading Agro-Biotech Innovation & Manufacturing Hub
 * Pusat Inovasi & Manufaktur Agro-Bioteknologi Terdepan di Indonesia
 */

import { Metadata } from 'next';

/**
 * Site Configuration - Central source of truth for all SEO-related data
 * OPTIMIZED FOR: Maklon services, B2B manufacturing, and retail product sales
 */
export const SITE_CONFIG = {
  // Basic site information
  name: 'Centra Biotech Indonesia',
  shortName: 'CBI',
  legalName: 'PT Centra Biotech Indonesia',
  tagline: "Indonesia's Leading Agro-Biotech Innovation & Manufacturing Hub",
  taglineId: 'Pusat Inovasi & Manufaktur Agro-Bioteknologi Terdepan di Indonesia',
  description: "Indonesia's Leading Agro-Biotech Innovation & Manufacturing Hub. BEST maklon (contract manufacturing) services for pupuk hayati & organik. Certified products: FLORAONE, RAJABIO, BIO KILLER, SIMBIOS. 14+ years experience. Contact: 0851 8328 4691",
  descriptionId: 'Pusat Inovasi & Manufaktur Agro-Bioteknologi Terdepan di Indonesia. Layanan MAKLON PUPUK HAYATI & ORGANIK terbaik dengan kapasitas produksi besar. Produk bersertifikat Kementan: FLORAONE, RAJABIO, BIO KILLER, SIMBIOS. 14+ tahun pengalaman.',
  
  // Value Propositions
  valuePropositions: {
    forFarmers: 'Solusi panen terbaik dengan pupuk bersertifikat Kementan',
    forBusinesses: 'Pabrik maklon pupuk hayati & organik dengan kapasitas besar',
    forStudents: 'Pusat edukasi dan pengetahuan bioteknologi pertanian',
  },
  
  // URLs and domains
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com',
  apiUrl: process.env.NEXT_PUBLIC_URL_API || 'https://backend.centrabiotechindonesia.com',
  
  // Images
  ogImage: '/og-image.jpg',
  logo: '/logo-only.png',
  logoFull: '/logo CBI navbar.png',
  
  // Localization
  locale: 'id_ID',
  language: 'id',
  country: 'ID',
  alternateLocales: ['en_US'],
  timezone: 'Asia/Jakarta',
  
  // Social media
  twitter: '@CentraBiotech',
  facebook: 'https://facebook.com/centrabiotech',
  instagram: 'https://instagram.com/centrabiotech',
  linkedin: 'https://linkedin.com/company/centrabiotech',
  youtube: 'https://youtube.com/@centrabiotech',
  
  // Contact information - UPDATED
  email: 'centrabiotech.id@gmail.com',
  phone: '+62-851-9621-4187',
  whatsapp: '+62-851-9621-4187',
  phoneDisplay: '+62 851-9621-4187',
  mapsUrl: 'https://maps.app.goo.gl/jrzvpmv3gxQXVSST7',
  
  // Address - UPDATED WITH FULL ADDRESS
  address: {
    streetAddress: 'Sawahan RT 02 RW 07 Pasungan, Ceper',
    addressLocality: 'Klaten',
    addressRegion: 'Jawa Tengah',
    postalCode: '57465',
    addressCountry: 'ID',
    fullAddress: 'Sawahan RT 02 RW 07 Pasungan, Ceper, Klaten, Jawa Tengah, Indonesia 57465',
  },
  
  // Business hours
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { dayOfWeek: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],
  
  // Flagship Products (Ministry of Agriculture Certified)
  flagshipProducts: [
    { name: 'FLORAONE', type: 'Pupuk Hayati Cair', certification: 'Izin Edar Kementan RI' },
    { name: 'RAJABIO', type: 'Pupuk Organik Cair', certification: 'Izin Edar Kementan RI' },
    { name: 'BIO KILLER', type: 'Insektisida Hayati Cair', certification: 'Izin Edar Kementan RI' },
    { name: 'SIMBIOS', type: 'Pupuk Hayati Cair', certification: 'Izin Edar Kementan RI' },
  ],
  
  // Company Credentials
  credentials: {
    yearsExperience: '14+',
    certifications: ['Izin Edar Kementerian Pertanian RI', 'Uji Mutu dan Efektivitas', 'GMP Standards', 'TKDN', 'SNI', 'LeSOS'],
    capabilities: ['Large Production Capacity', 'Small to Industrial Volumes', 'Private Label', 'Export Ready'],
  },
  
  // Comprehensive keywords organized by category - MASTER KEYWORD STRATEGY
  keywords: [
    // PRIMARY TRANSACTIONAL KEYWORDS (Buying Intent)
    'jual pupuk hayati', 'harga pupuk organik', 'beli pupuk hayati online',
    'distributor pupuk organik', 'agen pupuk hayati', 'supplier pupuk organik',
    // PRIMARY PRODUCT KEYWORDS (Brand + Generic)
    'jual Flora One asli', 'harga pupuk Flora One', 'Flora One trichoderma',
    'harga pupuk Simbios', 'Simbios mikoriza', 'pupuk mikoriza terbaik',
    'jual insektisida Biokiller', 'harga obat wereng Biokiller', 'Bio Killer pestisida organik',
    'jual asam humat Black Turbo', 'harga pembenah tanah', 'Black Turbo asam humat',
    'jual dolomit Biokalsi', 'harga kapur pertanian', 'Biokalsi dolomit mesh 100',
    'jual pupuk cair Biojagat', 'Biojagat azotobacter', 'pupuk penambat nitrogen',
    'jual POC Rajabio', 'harga pupuk organik Rajabio', 'Rajabio C-Organik 15%',
    // B2B KEYWORDS
    'maklon pupuk hayati', 'maklon pupuk organik', 'jasa maklon pupuk',
    'pabrik pupuk hayati', 'produsen pupuk organik', 'OEM pupuk',
    'private label pupuk', 'toll manufacturing pupuk',
    'supplier pupuk bersertifikat TKDN', 'distributor pupuk E-Katalog INAPROC',
    'produsen pupuk berizin Kementan', 'pabrik pupuk bersertifikat LeSOS',
    'vendor pertanian sertifikat SNI',
    // PROBLEM-SOLUTION KEYWORDS
    'pupuk untuk layu fusarium', 'obat busuk akar tanaman', 'fungisida hayati',
    'obat wereng padi organik', 'pestisida penggerek batang', 'insektisida hama padi aman',
    'pupuk tanah asam', 'pembenah tanah keras', 'pupuk untuk tanah tidak subur',
    'meningkatkan hasil panen', 'solusi produktivitas rendah', 'mencegah gagal panen',
    // BRAND KEYWORDS
    'centra biotech indonesia', 'PT Centra Biotech Indonesia',
    'bioteknologi indonesia', 'pupuk bersertifikat kementan',
    // GENERIC KEYWORDS
    'pupuk hayati cair', 'pupuk organik cair', 'insektisida hayati',
    'pupuk hayati terbaik', 'pupuk organik terbaik', 'biofertilizer Indonesia',
    'pertanian organik', 'sustainable agriculture Indonesia',
  ],
  
  // Category-specific keywords with TARGET SERP keywords - ENHANCED
  categoryKeywords: {
    agriculture: [
      // TRANSACTIONAL (Buying Intent)
      'jual pupuk hayati', 'harga pupuk organik', 'beli pupuk online',
      'distributor pupuk hayati', 'agen pupuk organik', 'supplier biofertilizer',
      // PRODUCT SPECIFIC
      'Flora One', 'Simbios', 'Biokiller', 'Black Turbo', 'Biokalsi', 'Biojagat', 'Rajabio',
      'floraone pupuk hayati', 'rajabio pupuk organik', 'biokiller insektisida',
      // B2B
      'maklon pupuk', 'jasa maklon pupuk hayati', 'maklon pupuk hayati',
      'contract manufacturing fertilizer', 'OEM pupuk Indonesia',
      // PROBLEM-SOLUTION
      'pupuk organik cair', 'insektisida hayati', 'fungisida hayati',
      'pupuk hayati', 'pupuk hayati cair', 'pestisida organik',
      'obat wereng', 'pupuk layu fusarium', 'pupuk tanah asam',
      // GENERIC
      'biofertilizer', 'pupuk organik', 'pertanian berkelanjutan',
      'teknologi pertanian', 'hasil panen optimal', 'pertanian organik',
    ],
    livestock: [
      'probiotik ternak', 'pakan ternak', 'suplemen hewan', 'kesehatan ternak',
      'peternakan modern', 'nutrisi ternak', 'produktivitas ternak',
      'probiotik sapi', 'probiotik ayam', 'pakan organik ternak',
    ],
    fishery: [
      'probiotik ikan', 'pakan ikan', 'akuakultur', 'budidaya ikan',
      'kesehatan ikan', 'kualitas air kolam', 'perikanan berkelanjutan',
      'probiotik udang', 'budidaya udang', 'tambak ikan',
    ],
    b2b: [
      'maklon pupuk hayati', 'maklon pupuk organik', 'jasa maklon pupuk',
      'pabrik pupuk hayati', 'contract manufacturing fertilizer indonesia',
      'OEM pupuk', 'private label pupuk', 'toll manufacturing pupuk',
      'supplier TKDN', 'E-Katalog INAPROC', 'produsen Kementan',
      'vendor pertanian SNI', 'pabrik pupuk LeSOS',
    ],
    products: {
      floraOne: ['jual Flora One', 'harga Flora One', 'Flora One trichoderma', 'Flora One fungisida', 'agen Flora One'],
      simbios: ['harga Simbios', 'Simbios mikoriza', 'pupuk mikoriza terbaik', 'Simbios untuk sawit'],
      biokiller: ['jual Biokiller', 'harga obat wereng', 'Biokiller beauveria', 'pestisida organik'],
      blackTurbo: ['jual Black Turbo', 'asam humat 52%', 'pembenah tanah terbaik', 'humic acid'],
      biokalsi: ['jual Biokalsi', 'dolomit mesh 100', 'kapur pertanian', 'dolomit super halus'],
      biojagat: ['Biojagat azotobacter', 'pupuk penambat nitrogen', 'pelarut fosfat'],
      rajabio: ['jual Rajabio', 'POC Rajabio', 'C-Organik 15%', 'pupuk organik premium'],
    },
  },
  
  // Verification IDs
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
  
  // Analytics
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || 'G-16L2MWL33B',
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',
  
  // Founder/Author info for articles
  founder: {
    name: 'Tim Centra Biotech Indonesia',
    jobTitle: 'Founder',
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadataFromProps({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noindex = false,
  nofollow = false,
  canonical,
}: SEOProps): Metadata {
  // Normalize so the FINAL rendered <title> (topic + brand) fits Google's
  // ~60-char display budget with the brand appearing exactly once, even if
  // `title` already carries a (possibly truncated) brand suffix from
  // upstream CMS/static data. Composed here, once, rather than left to the
  // layout's `%s | Centra Biotech Indonesia` template (app/[lang]/layout.tsx),
  // since that template has no way to know an incoming title is already dirty.
  const pageTitle = normalizeSeoTitle(title);
  // OG/Twitter don't go through the layout's title template, so reuse the
  // same normalized, single-brand title for consistency.
  const ogTitle = pageTitle;
  const fullUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url;
  const fullImage = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;
  
  const metadata: Metadata = {
    // `absolute` bypasses the parent layout's title template so the brand
    // (already included by normalizeSeoTitle above) is never appended twice.
    title: { absolute: pageTitle },
    description,
    keywords: SITE_CONFIG.keywords,
    authors: author ? [{ name: author }] : [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    
    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Open Graph
    openGraph: {
      title: ogTitle,
      description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: type === 'product' ? 'website' : type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [fullImage],
      creator: SITE_CONFIG.twitter,
      site: SITE_CONFIG.twitter,
    },
    
    // Alternate URLs with hreflang for multi-language SEO
    alternates: {
      canonical: canonical || fullUrl,
      languages: {
        'id': url ? `${SITE_CONFIG.url}/id${url}` : `${SITE_CONFIG.url}/id`,
        'en': url ? `${SITE_CONFIG.url}/en${url}` : `${SITE_CONFIG.url}/en`,
        'x-default': url ? `${SITE_CONFIG.url}/id${url}` : `${SITE_CONFIG.url}/id`,
      },
    },
    
    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  };
  
  return metadata;
}

/**
 * Generate breadcrumb data for structured data
 */
export function generateBreadcrumbs(paths: Array<{ name: string; path?: string }>) {
  return paths.map((item, index) => ({
    name: item.name,
    url: item.path ? `${SITE_CONFIG.url}${item.path}` : SITE_CONFIG.url,
    position: index + 1,
  }));
}

/**
 * Clean and truncate text for meta descriptions
 */
export function cleanMetaDescription(text: string, maxLength: number = 160): string {
  // Remove HTML tags
  const cleaned = text.replace(/<[^>]*>/g, '');
  
  // Truncate to max length
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  // Truncate at word boundary
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-'); // Replace multiple hyphens with single
}

/**
 * Get reading time estimate
 */
export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url, SITE_CONFIG.url);
    return parsed.toString();
  } catch {
    return `${SITE_CONFIG.url}${url.startsWith('/') ? url : `/${url}`}`;
  }
}

/**
 * Generate image alt text if missing
 */
export function generateAltText(filename: string, context?: string): string {
  // Extract name from filename
  const name = filename
    .split('/').pop()
    ?.replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
  
  return context ? `${context} - ${name}` : name || 'Image';
}

/**
 * Generate page-specific keywords
 */
export function generatePageKeywords(pageKeywords: string[], category?: keyof typeof SITE_CONFIG.categoryKeywords): string[] {
  const baseKeywords = [...SITE_CONFIG.keywords.slice(0, 5)];
  
  // Handle category keywords - check if it's an array or object
  let categoryKeywords: string[] = [];
  if (category) {
    const catData = SITE_CONFIG.categoryKeywords[category];
    if (Array.isArray(catData)) {
      categoryKeywords = catData;
    }
    // If it's an object (like products), skip it - use getProductKeywords() instead
  }
  
  return [...new Set([...pageKeywords, ...categoryKeywords, ...baseKeywords])];
}

/**
 * Get product-specific keywords from categoryKeywords.products
 */
export function getProductCategoryKeywords(productKey: keyof typeof SITE_CONFIG.categoryKeywords.products): string[] {
  return SITE_CONFIG.categoryKeywords.products[productKey] || [];
}

/**
 * Generate absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

/**
 * Generate canonical URL with proper formatting
 */
export function getCanonicalUrl(path: string): string {
  const url = getAbsoluteUrl(path);
  // Remove trailing slash except for root
  return url === `${SITE_CONFIG.url}/` ? SITE_CONFIG.url : url.replace(/\/$/, '');
}

/**
 * Metadata for specific page types
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

/**
 * Pre-defined metadata for static pages - OPTIMIZED FOR SERP #1
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'PT CBI Centra Biotech - Bioteknologi Indonesia untuk Pertanian',
    description: 'PT Centra Biotech Indonesia adalah perusahaan bioteknologi industri terkemuka. Bioteknologi untuk negara-negara berkembang dengan bahan baku berkualitas. Produsen pupuk organik cair, insektisida hayati, dan fungisida hayati. Jasa maklon pupuk hayati untuk pertanian Indonesia.',
    path: '/',
    keywords: ['bioteknologi indonesia', 'pt cbi', 'pt centra biotech indonesia', 'biotech', 'pupuk organik cair', 'insektisida hayati', 'fungisida hayati', 'pupuk hayati', 'maklon pupuk hayati', 'bioteknologi industri', 'bahan baku', 'bioteknologi untuk', 'negara negara'],
  },
  aboutUs: {
    title: 'Tentang PT CBI - Perusahaan Bioteknologi Indonesia Terdepan',
    description: 'PT Centra Biotech Indonesia (PT CBI) adalah perusahaan bioteknologi di Indonesia. Apa itu biotech? Bioteknologi memanfaatkan organisme hidup untuk menghasilkan produk pertanian dan obat-obatan. Produsen pupuk hayati, insektisida hayati, dan jasa maklon pupuk untuk pertanian berkelanjutan.',
    path: '/about-us',
    keywords: ['biotech indonesia', 'perusahaan bioteknologi', 'perusahaan bioteknologi di indonesia', 'pt centra biotech indonesia', 'pt cbi', 'apa itu biotech', 'bioteknologi indonesia', 'organisme hidup', 'obat obatan'],
  },
  contact: {
    title: 'Hubungi Kami - Konsultasi Gratis',
    description: 'Hubungi Centra Biotech Indonesia untuk konsultasi pupuk organik cair dan jasa maklon pupuk hayati. Konsultasi gratis untuk petani Indonesia.',
    path: '/contact',
    keywords: ['kontak centra biotech', 'konsultasi pupuk', 'jasa maklon pupuk'],
  },
  products: {
    title: 'Produk Pupuk Hayati & Insektisida',
    description: 'Produk pupuk organik cair, pupuk hayati cair, insektisida hayati, dan fungisida hayati untuk pertanian berkelanjutan Indonesia.',
    path: '/produk-layanan',
    keywords: ['pupuk hayati', 'insektisida hayati', 'fungisida hayati', 'pupuk organik cair'],
  },
  news: {
    title: 'Berita Pertanian & Tips Pupuk Organik',
    description: 'Berita dan tips pertanian, penggunaan pupuk organik cair, insektisida hayati, dan fungisida hayati dari Centra Biotech Indonesia.',
    path: '/news',
    keywords: ['berita pertanian', 'tips pupuk organik', 'artikel bioteknologi'],
  },
  agriculture: {
    title: 'Pupuk Organik Cair & Fungisida Hayati',
    description: 'Produk pertanian unggulan: pupuk organik cair Floraone, insektisida hayati Biokiller, fungisida hayati Trico-Z. Jasa maklon pupuk hayati tersedia.',
    path: '/produk-layanan/pertanian',
    keywords: SITE_CONFIG.categoryKeywords.agriculture,
    type: 'product',
  },
  livestock: {
    title: 'Produk Peternakan - Probiotik Ternak',
    description: 'Produk probiotik dan suplemen berkualitas untuk peternakan. Tingkatkan kesehatan dan produktivitas ternak Anda dengan bioteknologi modern.',
    path: '/produk-layanan/peternakan',
    keywords: SITE_CONFIG.categoryKeywords.livestock,
    type: 'product',
  },
  fishery: {
    title: 'Produk Perikanan - Probiotik Ikan',
    description: 'Solusi akuakultur terbaik untuk budidaya ikan dan udang. Probiotik dan pakan berkualitas untuk pertumbuhan optimal.',
    path: '/produk-layanan/perikanan',
    keywords: SITE_CONFIG.categoryKeywords.fishery,
    type: 'product',
  },
  career: {
    title: 'Karir di Centra Biotech - Lowongan Kerja Terbaru',
    description: 'Bergabunglah dengan tim Centra Biotech Indonesia. Temukan peluang karir di perusahaan bioteknologi terkemuka Indonesia.',
    path: '/career',
    keywords: ['lowongan kerja', 'karir biotek', 'pekerjaan pertanian'],
  },
  documents: {
    title: 'Dokumen & Sertifikat Resmi PT Centra Biotech Indonesia',
    description: 'Akses dokumen resmi, sertifikat produk bioteknologi, dan materi informasi dari PT Centra Biotech Indonesia. Download brosur produk pertanian, peternakan, dan perikanan.',
    path: '/documents',
    keywords: [
      'pt centra biotech indonesia',
      'sertifikat produk bioteknologi',
      'dokumen resmi perusahaan biotech',
      'brosur produk pertanian',
      'sertifikasi pupuk hayati',
      'legalitas pt cbi',
    ],
  },
};

/**
 * Generate complete metadata for a page
 */
export function generateCompleteMetadata(pageKey: keyof typeof PAGE_METADATA): Metadata {
  const page = PAGE_METADATA[pageKey];
  return generateMetadataFromProps({
    title: page.title,
    description: page.description,
    url: page.path,
    type: page.type,
  });
}

/**
 * Generate article metadata for news/blog posts
 */
export interface ArticleMetadataProps {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  slug: string;
  section?: string;
}

/**
 * Truncate title for SEO (max 60 characters, truncate at word boundary)
 */
export function truncateTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  const truncated = title.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  // Truncate at word boundary and add ellipsis if needed
  return lastSpace > 20 ? truncated.substring(0, lastSpace) : truncated.substring(0, maxLength - 3) + '...';
}

// Brand aliases that may already appear as a trailing "site name" suffix on
// a CMS-supplied or hard-coded title. Upstream data (Strapi `meta_title`, and
// a handful of hard-coded page titles) violates the contract documented
// above -- sometimes with the full name, sometimes with a naive 60-char cut
// that leaves a partial fragment ("| Centra Biotech", "| Ce"), sometimes
// with the short name ("| CBI"), and sometimes with " - " instead of "|".
const BRAND_SUFFIX_ALIASES = [SITE_CONFIG.name, SITE_CONFIG.shortName];

// A trailing fragment counts as "the brand" only if it is an exact match or
// a left-anchored prefix of a known brand alias (so real topic text that
// happens to end in "| Something else" is never touched). Fragments under 2
// chars are ignored -- too short to tell apart from coincidence.
function isBrandFragment(tail: string): boolean {
  if (tail.length < 2) return false;
  const tailLower = tail.toLowerCase();
  return BRAND_SUFFIX_ALIASES.some((alias) => alias.toLowerCase().startsWith(tailLower));
}

// Strips ONE trailing brand suffix, whether pipe-delimited ("Foo | Centra
// Biotech") or dash-delimited ("Foo - Centra Biotech Indonesia"). Pipe is
// checked first since it is the layout's own separator; dash is a distinct,
// separately-observed defect flavor (see dictionaries' `seo.*Title` entries).
function stripTrailingBrandFragment(title: string): string {
  const pipeIdx = title.lastIndexOf('|');
  if (pipeIdx !== -1 && isBrandFragment(title.slice(pipeIdx + 1).trim())) {
    return title.slice(0, pipeIdx).trim();
  }
  const dashIdx = title.lastIndexOf(' - ');
  if (dashIdx !== -1 && isBrandFragment(title.slice(dashIdx + 3).trim())) {
    return title.slice(0, dashIdx).trim();
  }
  return title;
}

/**
 * Normalize a page title so it composes safely into a <title> tag that is
 * at most `maxLength` characters INCLUDING the " | <brand>" suffix, with the
 * brand appearing exactly once.
 *
 * This is the single upstream fix for the site-wide double-brand / overlong
 * <title> defect: Strapi `meta_title` (and several hard-coded titles) already
 * end with a brand suffix -- sometimes truncated mid-word -- and the layout
 * template `%s | Centra Biotech Indonesia` (app/[lang]/layout.tsx) then
 * appends the brand again unconditionally.
 *
 * Callers MUST assign the result via `title: { absolute: normalizeSeoTitle(...) } }`
 * (never a bare string) so the layout's template does not append the brand
 * a second time.
 *
 * Idempotent: normalizeSeoTitle(normalizeSeoTitle(x)) === normalizeSeoTitle(x).
 */
export function normalizeSeoTitle(
  rawTitle: string | null | undefined,
  options: { maxLength?: number; brand?: string } = {}
): string {
  const brand = options.brand ?? SITE_CONFIG.name;
  const maxLength = options.maxLength ?? 60;

  let topic = (rawTitle ?? '').replace(/\s+/g, ' ').trim();

  // Repeatedly strip trailing brand fragments -- handles data that already
  // got the suffix appended more than once, e.g.
  // "Foo | Centra Biotech | Centra Biotech Indonesia" (bound to 5 passes,
  // far more than any real doubling could produce, to guarantee termination).
  for (let i = 0; i < 5; i++) {
    const next = stripTrailingBrandFragment(topic);
    if (next === topic) break;
    topic = next;
  }

  // A topic that IS the bare brand name, with no "|"/"-" delimiter for the
  // loop above to strip (this is what the empty/null fallback below itself
  // returns), counts as "nothing left" too. Without this, normalizeSeoTitle
  // would not be idempotent: normalizeSeoTitle('') -> "Centra Biotech
  // Indonesia" -> fed back in -> "Centra Biotech Indonesia | Centra Biotech
  // Indonesia".
  if (topic.toLowerCase() === brand.toLowerCase()) {
    topic = '';
  }

  if (!topic) {
    // Nothing left after stripping (input was only the brand, or empty) --
    // fall back to the brand name so callers never render an empty <title>.
    return brand.length <= maxLength ? brand : truncateTitle(brand, maxLength);
  }

  // The topic earns the click, the brand does not. A full-brand suffix costs
  // 26 of the 60-char budget, which was cutting focus keyphrases off real
  // titles ("Cara Tepat Asam Humat Dicampur Pupuk NPK" lost "Pupuk NPK").
  // So the brand gives way, not the keyword: try the longest brand form that
  // still leaves the whole topic intact, and drop the brand entirely rather
  // than truncate a topic that needs the full width.
  //
  // An explicitly supplied options.brand is honoured as-is, no ladder, since
  // the caller has stated which brand string it wants.
  const brandLadder = options.brand
    ? [options.brand]
    : [SITE_CONFIG.name, 'Centra Biotech', SITE_CONFIG.shortName];

  for (const candidate of brandLadder) {
    const suffix = ` | ${candidate}`;
    if (topic.length + suffix.length <= maxLength) {
      return `${topic}${suffix}`;
    }
  }

  // Topic is too long for even the shortest brand. Trim it against that
  // shortest suffix rather than against maxLength, then keep the brand.
  //
  // Trimming against maxLength instead would break idempotency: the word
  // boundary cut usually lands well short of the limit, which frees enough
  // room for a brand on the next pass, so f(f(x)) !== f(x).
  const shortestBrand = brandLadder[brandLadder.length - 1];
  const shortestSuffix = ` | ${shortestBrand}`;
  const budget = Math.max(maxLength - shortestSuffix.length, 10);

  return `${truncateTitle(topic, budget)}${shortestSuffix}`;
}

export function generateArticleMetadata(props: ArticleMetadataProps): Metadata {
  const fullUrl = `${SITE_CONFIG.url}/news/${props.slug}`;
  const fullImage = props.image?.startsWith('http')
    ? props.image
    : props.image
      ? `${SITE_CONFIG.apiUrl}${props.image}`
      : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  // Normalize title for SEO compliance (max 60 chars, single brand mention).
  // Defensive even though the `title` field isn't fetched from meta_title,
  // in case an editor types the brand straight into the headline.
  const seoTitle = normalizeSeoTitle(props.title);

  return {
    // absolute: brand is already included by normalizeSeoTitle above.
    title: { absolute: seoTitle },
    description: props.description,
    keywords: [...(props.tags || []), ...SITE_CONFIG.keywords.slice(0, 5)],
    authors: [{ name: props.author || SITE_CONFIG.name }],
    
    openGraph: {
      title: props.title, // Full title for social sharing
      description: props.description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: [{
        url: fullImage,
        width: 1200,
        height: 630,
        alt: props.title,
      }],
      type: 'article',
      publishedTime: props.publishedTime,
      modifiedTime: props.modifiedTime || props.publishedTime,
      authors: [props.author || SITE_CONFIG.name],
      section: props.section || 'News',
      tags: props.tags,
      locale: SITE_CONFIG.locale,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: props.title, // Full title for Twitter
      description: props.description,
      images: [fullImage],
      creator: SITE_CONFIG.twitter,
    },
    
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate product metadata
 */
export interface ProductMetadataProps {
  name: string;
  description: string;
  image?: string;
  category: 'agriculture' | 'livestock' | 'fishery';
  slug: string;
  price?: string;
}

export function generateProductMetadata(props: ProductMetadataProps): Metadata {
  const categoryMap = { agriculture: 'pertanian', livestock: 'peternakan', fishery: 'perikanan' };
  const categoryPath = `/produk-layanan/${categoryMap[props.category]}`;
  const fullUrl = `${SITE_CONFIG.url}${categoryPath}/${props.slug}`;
  const fullImage = props.image?.startsWith('http') 
    ? props.image 
    : props.image 
      ? `${SITE_CONFIG.apiUrl}${props.image}` 
      : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;
  
  const categoryName = {
    agriculture: 'Pertanian',
    livestock: 'Peternakan',
    fishery: 'Perikanan',
  }[props.category];
  
  return {
    title: `${props.name} - Produk ${categoryName}`,
    description: props.description,
    keywords: generatePageKeywords([props.name, categoryName], props.category),
    
    openGraph: {
      title: props.name,
      description: props.description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: [{
        url: fullImage,
        width: 1200,
        height: 630,
        alt: props.name,
      }],
      type: 'website', // Use website for products in OG
      locale: SITE_CONFIG.locale,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: props.name,
      description: props.description,
      images: [fullImage],
    },
    
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Extract text content from rich text/blocks for SEO
 */
export function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (typeof block === 'string') return block;
      if (block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join(' ');
      }
      if (block.text) return block.text;
      return '';
    })
    .join(' ')
    .trim();
}

/**
 * Generate FAQ structured data from Q&A pairs
 */
export function formatFAQsForSchema(faqs: Array<{ question: string; answer: string }>) {
  return faqs.map(faq => ({
    question: faq.question.trim(),
    answer: typeof faq.answer === 'string' 
      ? faq.answer.trim() 
      : extractTextFromBlocks(faq.answer as any),
  }));
}
