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
  apiUrl: process.env.NEXT_PUBLIC_URL_API || 'https://cbi-backend.my.id',
  
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
  email: 'centrabioindo@gmail.com',
  phone: '+62-851-8328-4691',
  whatsapp: '+62-851-8328-4691',
  phoneDisplay: '0851 8328 4691',
  
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
    certifications: ['Izin Edar Kementerian Pertanian RI', 'Uji Mutu dan Efektivitas', 'GMP Standards'],
    capabilities: ['Large Production Capacity', 'Small to Industrial Volumes', 'Private Label', 'Export Ready'],
  },
  
  // Comprehensive keywords organized by category - OPTIMIZED FOR MAKLON + PRODUCTS
  keywords: [
    // PRIMARY MAKLON KEYWORDS (B2B - highest priority)
    'maklon pupuk hayati',
    'maklon pupuk organik',
    'jasa maklon pupuk',
    'pabrik pupuk hayati',
    'contract manufacturing fertilizer indonesia',
    'oem pupuk',
    'private label pupuk',
    'maklon pupuk klaten',
    // PRIMARY PRODUCT KEYWORDS (Retail)
    'pupuk hayati cair',
    'pupuk organik cair',
    'insektisida hayati',
    'floraone',
    'rajabio',
    'bio killer',
    'simbios',
    // Brand keywords
    'centra biotech indonesia',
    'bioteknologi indonesia',
    // Industry keywords
    'pupuk bersertifikat kementan',
    'pupuk hayati terbaik',
    'pupuk organik terbaik',
    'produsen pupuk hayati',
    'supplier pupuk organik',
    'distributor pupuk hayati',
  ],
  
  // Category-specific keywords with TARGET SERP keywords
  categoryKeywords: {
    agriculture: [
      // Primary target keywords for SERP #1
      'pupuk organik cair', 'insektisida hayati', 'fungisida hayati',
      'pupuk hayati', 'pupuk hayati cair', 'maklon pupuk', 
      'jasa maklon pupuk hayati', 'maklon pupuk hayati',
      // Secondary keywords
      'biofertilizer', 'pupuk organik', 'pestisida organik',
      'pertanian berkelanjutan', 'teknologi pertanian', 'hasil panen optimal',
      'floraone', 'biokiller', 'trico z', 'rajabio', 'megabio',
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
  // Check if title already contains the site name to avoid duplication
  const hasSiteName = title?.toLowerCase().includes('centra biotech');
  const fullTitle = title 
    ? (hasSiteName ? title : `${title} | ${SITE_CONFIG.name}`)
    : SITE_CONFIG.name;
  const fullUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url;
  const fullImage = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;
  
  const metadata: Metadata = {
    title: fullTitle,
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
      title: fullTitle,
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
      title: fullTitle,
      description,
      images: [fullImage],
      creator: SITE_CONFIG.twitter,
      site: SITE_CONFIG.twitter,
    },
    
    // Alternate URLs
    alternates: {
      canonical: canonical || fullUrl,
      languages: {
        'id-ID': fullUrl,
        // Only Indonesian version available - no other language alternates
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
  const categoryKeywords = category ? SITE_CONFIG.categoryKeywords[category] : [];
  
  return [...new Set([...pageKeywords, ...categoryKeywords, ...baseKeywords])];
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
    path: '/product',
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
    path: '/product/agriculture',
    keywords: SITE_CONFIG.categoryKeywords.agriculture,
    type: 'product',
  },
  livestock: {
    title: 'Produk Peternakan - Probiotik Ternak',
    description: 'Produk probiotik dan suplemen berkualitas untuk peternakan. Tingkatkan kesehatan dan produktivitas ternak Anda dengan bioteknologi modern.',
    path: '/product/livestock',
    keywords: SITE_CONFIG.categoryKeywords.livestock,
    type: 'product',
  },
  fishery: {
    title: 'Produk Perikanan - Probiotik Ikan',
    description: 'Solusi akuakultur terbaik untuk budidaya ikan dan udang. Probiotik dan pakan berkualitas untuk pertumbuhan optimal.',
    path: '/product/fishery',
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

export function generateArticleMetadata(props: ArticleMetadataProps): Metadata {
  const fullUrl = `${SITE_CONFIG.url}/news/${props.slug}`;
  const fullImage = props.image?.startsWith('http') 
    ? props.image 
    : props.image 
      ? `${SITE_CONFIG.apiUrl}${props.image}` 
      : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;
  
  // Truncate title for SEO compliance (max 60 characters)
  const seoTitle = truncateTitle(props.title);
  
  return {
    title: seoTitle,
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
  const categoryPath = `/product/${props.category}`;
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
