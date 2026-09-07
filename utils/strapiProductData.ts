// Utility to fetch product data from Strapi CMS
// Falls back to static data if Strapi is unavailable

const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";

// Types matching Strapi schema
export interface StrapiProductData {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  ctaWhatsapp: string;
  ctaShopee: string;
  ctaCatalog: string;
  ctaBrochure: string;
  ctaCertificate: string;
  videoSectionTitle: string;
  videoSectionSubtitle: string;
  whatsappNumber: string;
  whatsappMessage: string;
  primaryColor: string;
  secondaryColor: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  heroBannerTitle?: string | null;
  benefitsSectionTitle?: string | null;
  certificationsSectionTitle?: string | null;
  certificationsSectionSubtitle?: string | null;
  faqSectionTitle?: string | null;
  ctaQuestionTitle?: string | null;
  btnWhatsappLabel?: string | null;
  btnShopeeLabel?: string | null;
  btnBrochureLabel?: string | null;
  btnDemplotLabel?: string | null;
  // SEO metadata fields
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyphrase?: string | null;
  canonicalUrl?: string | null;
  robotsDirective?: string | null;
  // Product structured data fields
  sku?: string | null;
  gtin?: string | null;
  priceIdr?: number | null;
  priceValidUntil?: string | null;
  heroImage?: { url: string; alternativeText?: string | null } | null;
  productImage?: { url: string; alternativeText?: string | null; caption?: string | null } | null;
  productGallery?: Array<{
    id: number;
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
  }> | null;
  certifications: Array<{
    id: number;
    label: string;
    value: string;
    icon: string;
    link?: string;
    logoUrl?: string;
  }>;
  benefits: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  faq: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
  videos: Array<{
    id: number;
    videoId: string;
    title: string;
    embedUrl: string;
    type: "youtube" | "tiktok";
    thumbnailUrl?: string;
  }>;
  externalLinks?: {
    id: number;
    brochure?: string;
    certificate?: string;
    shopee?: string;
    tokopedia?: string;
    inaproc?: string;
    tkdn?: string;
    demplotPdf?: string;
    testReport1?: string;
    testReport2?: string;
  };
  stats?: Array<{
    id: number;
    value: string;
    label: string;
    icon?: string;
  }>;
  composition?: {
    title?: string;
    subtitle?: string;
    mainNutrients?: Array<{ name: string; value: string; highlight?: boolean }>;
    microNutrients?: Array<{ name: string; value: string }>;
    safety?: Array<{ name: string; value: string; status: string }>;
  } | null;
  dosage?: {
    title?: string;
    subtitle?: string;
    standard?: string;
    standardNote?: string;
    interval?: string;
    stages?: Array<{ stage: string; method: string; dose: string; timing: string }>;
    crops?: Array<{ crop: string; dose: string; interval: string; notes: string; icon: string; color: string }>;
  } | null;
  pricing?: {
    title?: string;
    package?: string;
    price?: string;
    originalPrice?: string;
    discount?: string;
    note?: string;
    freeShipping?: string;
    guarantee?: string;
  } | null;
}

export interface StrapiResponse {
  data: StrapiProductData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch product data from Strapi by slug with locale support
 * Returns null if product not found or error occurs
 * Falls back to 'en' locale if content not available in requested locale (since products are EN-only currently)
 */
function normalizeSeoFields(data: StrapiProductData): StrapiProductData {
  const raw = data as unknown as Record<string, unknown>;
  return {
    ...data,
    metaTitle: data.metaTitle ?? (raw.meta_title as string | null | undefined) ?? null,
    metaDescription: data.metaDescription ?? (raw.meta_description as string | null | undefined) ?? null,
    focusKeyphrase: data.focusKeyphrase ?? (raw.focus_keyphrase as string | null | undefined) ?? null,
    canonicalUrl: data.canonicalUrl ?? (raw.canonical_url as string | null | undefined) ?? null,
    robotsDirective: data.robotsDirective ?? (raw.robots_directive as string | null | undefined) ?? null,
  };
}

export async function fetchStrapiProduct(slug: string, locale: string = 'en'): Promise<StrapiProductData | null> {
  try {
    // Build explicit populate query for Strapi v5 (populate=* doesn't work for media relations)
    const populateFields = [
      'heroImage',
      'productImage', 
      'productGallery',
      'stats',
      'benefits',
      'composition',
      'dosage',
      'pricing',
      'certifications',
      'faq',
      'videos',
      'externalLinks',
      'metadata'
    ];
    const populateQuery = populateFields.map(field => `populate=${field}`).join('&');
    
    // First try with requested locale
    const res = await fetch(
      `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&${populateQuery}&locale=${locale}`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds, then revalidate
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`[Strapi] Failed to fetch product ${slug}: ${res.status}`);
      return null;
    }

    const json: StrapiResponse = await res.json();

    // If no data in requested locale and locale is 'id', try English fallback
    if ((!json.data || json.data.length === 0) && locale === 'id') {
      console.warn(`[Strapi] Product ${slug} not found in ${locale}, trying English fallback`);
      const fallbackRes = await fetch(
        `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&${populateQuery}&locale=en`,
        {
          next: { revalidate: 60 },
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (fallbackRes.ok) {
        const fallbackJson: StrapiResponse = await fallbackRes.json();
        if (fallbackJson.data && fallbackJson.data.length > 0) {
          return normalizeSeoFields(fallbackJson.data[0]);
        }
      }
    }

    if (!json.data || json.data.length === 0) {
      console.warn(`[Strapi] Product not found: ${slug}`);
      return null;
    }

    return normalizeSeoFields(json.data[0]);
  } catch (error) {
    console.error(`[Strapi] Error fetching product ${slug}:`, error);
    return null;
  }
}

/**
 * Merge Strapi data with static fallback data
 * Strapi data takes precedence, but falls back to static if Strapi field is null/empty
 */
export function mergeWithFallback<T extends Record<string, any>>(
  strapiData: Partial<T> | null,
  fallbackData: T
): T {
  if (!strapiData) {
    return fallbackData;
  }

  const merged = { ...fallbackData };

  for (const key in strapiData) {
    const strapiValue = strapiData[key];
    // Only use Strapi value if it's not null/undefined/empty string
    if (strapiValue !== null && strapiValue !== undefined && strapiValue !== '') {
      (merged as any)[key] = strapiValue;
    }
  }

  return merged;
}

/**
 * Transform Strapi benefits to match static page format
 */
export function transformBenefits(
  strapiBenefits: StrapiProductData['benefits'] | undefined,
  fallbackBenefits: Array<{ title: string; desc: string; icon: string }>
): Array<{ title: string; desc: string; icon: string }> {
  if (!strapiBenefits || strapiBenefits.length === 0) {
    return fallbackBenefits;
  }

  return strapiBenefits.map((b) => ({
    title: b.title,
    desc: b.description,
    icon: b.icon,
  }));
}

/**
 * Transform Strapi certifications to match static page format
 */
export function transformCertifications(
  strapiCerts: StrapiProductData['certifications'] | undefined,
  fallbackCerts: Array<{ label: string; value: string; icon: string }>
): Array<{ label: string; value: string; icon: string }> {
  if (!strapiCerts || strapiCerts.length === 0) {
    return fallbackCerts;
  }

  return strapiCerts.map((c) => ({
    label: c.label,
    value: c.value,
    icon: c.icon,
  }));
}

/**
 * Transform Strapi FAQ to match static page format
 */
export function transformFAQ(
  strapiFaq: StrapiProductData['faq'] | undefined,
  fallbackFaq: Array<{ q: string; a: string }>
): Array<{ q: string; a: string }> {
  if (!strapiFaq || strapiFaq.length === 0) {
    return fallbackFaq;
  }

  return strapiFaq.map((f) => ({
    q: f.question,
    a: f.answer,
  }));
}

/**
 * Get full image URL from Strapi image object
 */
export function getStrapiImageUrl(
  image: { url: string } | null | undefined,
  fallbackUrl?: string
): string {
  const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";
  
  if (!image?.url) {
    return fallbackUrl || '';
  }
  
  // If already absolute URL, return as-is
  if (image.url.startsWith('http')) {
    return image.url;
  }
  
  // Construct full URL
  return `${STRAPI_URL}${image.url}`;
}

/**
 * Transform Strapi product images for carousel component
 */
export function transformProductImages(
  mainImage: StrapiProductData['productImage'] | undefined,
  gallery: StrapiProductData['productGallery'] | undefined,
  fallbackMainUrl?: string
): {
  mainImage: { id: number; url: string; alternativeText?: string | null; caption?: string | null } | null;
  gallery: Array<{ id: number; url: string; alternativeText?: string | null; caption?: string | null }>;
} {
  const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";
  
  let processedMainImage = null;
  if (mainImage?.url) {
    processedMainImage = {
      id: 1,
      url: mainImage.url.startsWith('http') ? mainImage.url : `${STRAPI_URL}${mainImage.url}`,
      alternativeText: mainImage.alternativeText || null,
      caption: mainImage.caption || null,
    };
  } else if (fallbackMainUrl) {
    processedMainImage = {
      id: 0,
      url: fallbackMainUrl,
      alternativeText: null,
      caption: null,
    };
  }
  
  const processedGallery = (gallery || []).map((img, idx) => ({
    id: img.id || idx + 2,
    url: img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`,
    alternativeText: img.alternativeText || null,
    caption: img.caption || null,
  }));
  
  return {
    mainImage: processedMainImage,
    gallery: processedGallery,
  };
}

/**
 * Transform Strapi videos to match static page format
 */
export function transformVideos(
  strapiVideos: StrapiProductData['videos'] | undefined,
  fallbackVideos: Array<{ id: string; title: string; embedUrl: string; type: 'youtube' | 'tiktok' }>
): Array<{ id: string; title: string; embedUrl: string; type: 'youtube' | 'tiktok' }> {
  if (!strapiVideos || strapiVideos.length === 0) {
    return fallbackVideos;
  }

  return strapiVideos.map((v) => ({
    id: v.videoId,
    title: v.title,
    embedUrl: v.embedUrl,
    type: v.type,
  }));
}

/**
 * Transform Strapi external links to match static page format
 */
export function transformExternalLinks(
  strapiLinks: StrapiProductData['externalLinks'] | undefined,
  fallbackLinks: Record<string, string>
): Record<string, string> {
  if (!strapiLinks) {
    return fallbackLinks;
  }

  return {
    brochure: strapiLinks.brochure || fallbackLinks.brochure || '',
    certificate: strapiLinks.certificate || fallbackLinks.certificate || '',
    inaproc: strapiLinks.inaproc || fallbackLinks.inaproc || '',
    shopee: strapiLinks.shopee || fallbackLinks.shopee || '',
    tokopedia: strapiLinks.tokopedia || fallbackLinks.tokopedia || '',
    tkdn: strapiLinks.tkdn || fallbackLinks.tkdn || '',
    demplotPdf: strapiLinks.demplotPdf || fallbackLinks.demplotPdf || '',
    testReport1: strapiLinks.testReport1 || fallbackLinks.testReport1 || '',
    testReport2: strapiLinks.testReport2 || fallbackLinks.testReport2 || '',
    // Keep any additional fallback links
    ...fallbackLinks,
  };
}

/**
 * Get hero image URL from Strapi data with fallback
 * This is used for the HeroSectionGeneral component background image
 */
export function getHeroImageUrl(
  strapiData: StrapiProductData | null | undefined,
  fallbackUrl: string
): string {
  const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";
  
  if (!strapiData?.heroImage?.url) {
    return fallbackUrl;
  }
  
  // If already absolute URL, return as-is
  if (strapiData.heroImage.url.startsWith('http')) {
    return strapiData.heroImage.url;
  }
  
  // Construct full URL with Strapi base
  return `${STRAPI_URL}${strapiData.heroImage.url}`;
}
