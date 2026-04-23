/**
 * STRUCTURED DATA (JSON-LD) UTILITIES
 * Comprehensive Schema.org structured data for maximum SEO
 * Follows Google's structured data guidelines
 */

import { SITE_CONFIG } from './seo';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    email: string;
    contactType: string;
  };
  socialMedia?: string[];
  foundingDate?: string;
  founders?: string[];
  slogan?: string;
}

export interface WebsiteData {
  name: string;
  description: string;
  url: string;
  searchUrlTemplate?: string;
}

export interface ArticleData {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  url: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

export interface ProductData {
  name: string;
  description: string;
  image: string;
  url: string;
  sku?: string;
  mpn?: string;           // Manufacturer Part Number (Google recommended)
  gtin14?: string;        // Global Trade Item Number (Google recommended)
  brand?: string;
  category?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    itemCondition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
    priceValidUntil?: string;
    shippingDetails?: {
      shippingRate: { value: number; currency: string };
      shippingDestination: string;
      deliveryTime?: { minDays: number; maxDays: number };
    };
    hasMerchantReturnPolicy?: {
      returnPolicyCategory: 'MerchantReturnFiniteReturnWindow' | 'MerchantReturnNotPermitted';
      merchantReturnDays?: number;
      returnMethod?: 'ReturnByMail' | 'ReturnInStore';
      returnFees?: 'FreeReturn' | 'OriginalShippingFees' | 'RestockingFees';
    };
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  review?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: { ratingValue: number; bestRating?: number };
  }>;
  // Certification (critical for agricultural/organic products)
  hasCertification?: Array<{
    issuedBy: string;
    name: string;
    certificationIdentification?: string;
    validFrom?: string;
    validThrough?: string;
  }>;
  // Additional product attributes
  additionalProperty?: Array<{
    name: string;
    value: string;
  }>;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceData {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType?: string;
  url?: string;
  image?: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToData {
  name: string;
  description: string;
  image?: string;
  estimatedCost?: { value: number; currency: string };
  totalTime?: string;
  steps: HowToStep[];
}

export interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

export interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address: string;
  };
  image?: string;
  organizer?: string;
  eventStatus?: 'Scheduled' | 'Cancelled' | 'Postponed' | 'Rescheduled';
  eventAttendanceMode?: 'Offline' | 'Online' | 'Mixed';
}

export interface ImageObjectData {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
  encodingFormat?: string; // MIME type (e.g., 'image/webp', 'image/jpeg')
  contentSize?: string;    // File size (e.g., '245KB')
  representativeOfPage?: boolean; // True for hero/main images
  name?: string;
  description?: string;
  uploadDate?: string;
  author?: string;
  copyrightHolder?: string;
  license?: string;
  keywords?: string[];
  exifData?: {
    make?: string;
    model?: string;
    exposureTime?: string;
    fNumber?: string;
    isoSpeed?: number;
  };
  // Google Image License Metadata (required for licensable badge)
  // @see https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
  acquireLicensePage?: string; // URL to licensing info page
  creator?: {
    type: 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  creditText?: string; // Credit line for image attribution
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getBaseUrl = () => SITE_CONFIG.url;

const getFullImageUrl = (image: string): string => {
  if (!image) return `${getBaseUrl()}/og-image.jpg`;
  if (image.startsWith('http')) return image;
  if (image.startsWith('/uploads')) return `${SITE_CONFIG.apiUrl}${image}`;
  return `${getBaseUrl()}${image.startsWith('/') ? image : `/${image}`}`;
};

const getFullUrl = (url: string): string => {
  if (url.startsWith('http')) return url;
  return `${getBaseUrl()}${url.startsWith('/') ? url : `/${url}`}`;
};

// ============================================
// IMAGE SCHEMA
// ============================================

/**
 * Generate comprehensive ImageObject structured data
 * Following Schema.org best practices for Google Image Search
 * @see https://schema.org/ImageObject
 * @see https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
 */
export function generateImageObjectSchema(data: ImageObjectData) {
  const baseUrl = getBaseUrl();
  const fullImageUrl = getFullImageUrl(data.url);
  
  // Determine encoding format from MIME type or URL
  const getEncodingFormat = (): string => {
    if (data.encodingFormat) return data.encodingFormat;
    const ext = data.url.split('.').pop()?.toLowerCase();
    const formatMap: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'webp': 'image/webp',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
    };
    return formatMap[ext || ''] || 'image/jpeg';
  };

  // Default license and acquire license page URLs
  const defaultLicenseUrl = `${baseUrl}/id/copyright`;
  const defaultAcquireLicenseUrl = `${baseUrl}/id/copyright#licensing`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${fullImageUrl}#image`,
    contentUrl: fullImageUrl,
    url: fullImageUrl,
    name: data.name || data.caption,
    caption: data.caption,
    description: data.description,
    encodingFormat: getEncodingFormat(),
    width: data.width ? {
      '@type': 'QuantitativeValue',
      value: data.width,
      unitCode: 'E37' // pixel
    } : undefined,
    height: data.height ? {
      '@type': 'QuantitativeValue',
      value: data.height,
      unitCode: 'E37' // pixel
    } : undefined,
    contentSize: data.contentSize,
    representativeOfPage: data.representativeOfPage || false,
    uploadDate: data.uploadDate,
    // Google Image License Metadata - REQUIRED FIELDS
    // @see https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
    license: data.license || defaultLicenseUrl,
    acquireLicensePage: data.acquireLicensePage || defaultAcquireLicenseUrl,
    creditText: data.creditText || SITE_CONFIG.name,
    creator: data.creator ? {
      '@type': data.creator.type,
      name: data.creator.name,
      url: data.creator.url,
    } : {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    copyrightHolder: data.copyrightHolder ? {
      '@type': 'Organization',
      name: data.copyrightHolder,
    } : {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
    },
    copyrightNotice: `© ${new Date().getFullYear()} ${data.copyrightHolder || SITE_CONFIG.name}`,
    // Optional fields
    author: data.author ? {
      '@type': 'Organization',
      name: data.author,
    } : undefined,
    keywords: data.keywords?.join(', '),
    exifData: data.exifData ? {
      '@type': 'PropertyValue',
      name: 'EXIF Data',
      value: Object.entries(data.exifData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; '),
    } : undefined,
  };
}

/**
 * Generate ImageObject array for product galleries
 * Creates structured data for multiple product images
 */
export function generateProductImageGallerySchema(images: Array<{
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  encodingFormat?: string;
}>, productName: string): Array<any> {
  return images.map((image, index) => 
    generateImageObjectSchema({
      url: image.url,
      width: image.width,
      height: image.height,
      caption: image.caption || `${productName} - Image ${index + 1}`,
      encodingFormat: image.encodingFormat,
      representativeOfPage: index === 0, // First image is representative
      name: `${productName} - ${index === 0 ? 'Main Image' : `Gallery Image ${index}`}`,
      keywords: [productName, 'product image', 'agricultural product', 'biofertilizer'],
    })
  );
}

// ============================================
// ORGANIZATION SCHEMA
// ============================================

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(data: OrganizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${data.url}#organization`,
    name: data.name,
    legalName: SITE_CONFIG.legalName,
    description: data.description,
    url: data.url,
    logo: data.logo
      ? {
          '@type': 'ImageObject',
          '@id': `${data.url}#logo`,
          url: getFullImageUrl(data.logo),
          contentUrl: getFullImageUrl(data.logo),
          caption: data.name,
        }
      : undefined,
    image: data.logo ? getFullImageUrl(data.logo) : undefined,
    address: data.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: data.address.streetAddress,
          addressLocality: data.address.addressLocality,
          addressRegion: data.address.addressRegion,
          postalCode: data.address.postalCode,
          addressCountry: data.address.addressCountry,
        }
      : undefined,
    contactPoint: data.contactPoint
      ? [
          {
            '@type': 'ContactPoint',
            telephone: data.contactPoint.telephone,
            email: data.contactPoint.email,
            contactType: data.contactPoint.contactType,
            availableLanguage: ['Indonesian', 'English'],
            areaServed: 'ID',
          },
        ]
      : undefined,
    sameAs: data.socialMedia?.filter(Boolean),
    foundingDate: data.foundingDate,
    founder: data.founders?.map(name => ({
      '@type': 'Person',
      name,
    })),
    slogan: data.slogan || SITE_CONFIG.tagline,
    knowsAbout: [
      'Bioteknologi',
      'Pertanian',
      'Peternakan',
      'Perikanan',
      'Probiotik',
      'Pupuk Hayati',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };
}

// ============================================
// WEBSITE SCHEMA
// ============================================

/**
 * Generate Website structured data with search action
 */
export function generateWebsiteSchema(data: WebsiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${data.url}#website`,
    name: data.name,
    description: data.description,
    url: data.url,
    inLanguage: SITE_CONFIG.language,
    publisher: {
      '@id': `${data.url}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: data.searchUrlTemplate || `${data.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ============================================
// WEBPAGE SCHEMA
// ============================================

/**
 * Generate WebPage structured data
 */
export function generateWebPageSchema(data: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${getFullUrl(data.url)}#webpage`,
    name: data.name,
    description: data.description,
    url: getFullUrl(data.url),
    inLanguage: SITE_CONFIG.language,
    isPartOf: {
      '@id': `${getBaseUrl()}#website`,
    },
    about: {
      '@id': `${getBaseUrl()}#organization`,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    breadcrumb: data.breadcrumb ? {
      '@id': `${getFullUrl(data.url)}#breadcrumb`,
    } : undefined,
  };
}

// ============================================
// ARTICLE SCHEMA
// ============================================

/**
 * Generate Article structured data
 */
export function generateArticleSchema(data: ArticleData & {
  imageWidth?: number;
  imageHeight?: number;
  imageCaption?: string;
}) {
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl(data.url);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullUrl}#article`,
    headline: data.title,
    description: data.description,
    image: {
      '@type': 'ImageObject',
      '@id': `${getFullImageUrl(data.image)}#image`,
      contentUrl: getFullImageUrl(data.image),
      url: getFullImageUrl(data.image),
      caption: data.imageCaption || data.title,
      name: data.title,
      encodingFormat: 'image/jpeg',
      width: data.imageWidth ? {
        '@type': 'QuantitativeValue',
        value: data.imageWidth,
        unitCode: 'E37'
      } : 1200,
      height: data.imageHeight ? {
        '@type': 'QuantitativeValue',
        value: data.imageHeight,
        unitCode: 'E37'
      } : 630,
      representativeOfPage: true,
      author: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: SITE_CONFIG.name,
      },
      copyrightHolder: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: SITE_CONFIG.name,
      },
      copyrightNotice: `© ${new Date().getFullYear()} ${SITE_CONFIG.name}`,
      creditText: SITE_CONFIG.name,
      license: `${baseUrl}/copyright`,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.authorName,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${SITE_CONFIG.logo}`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    articleSection: data.section || 'News',
    keywords: data.keywords?.join(', '),
    wordCount: data.wordCount,
    inLanguage: SITE_CONFIG.language,
    isPartOf: {
      '@id': `${baseUrl}#website`,
    },
    // Note: aggregateRating removed - not supported by Google for NewsArticle types
  };
}

/**
 * Generate NewsArticle structured data (for news pages)
 */
export function generateNewsArticleSchema(data: ArticleData) {
  return {
    ...generateArticleSchema(data),
    '@type': 'NewsArticle',
  };
}

/**
 * Generate BlogPosting structured data (for blog posts)
 */
export function generateBlogPostingSchema(data: ArticleData) {
  return {
    ...generateArticleSchema(data),
    '@type': 'BlogPosting',
  };
}

// ============================================
// PRODUCT SCHEMA
// ============================================

/**
 * Generate Product structured data with offers
 * Optimized for Google Merchant Listing and AI product recommendations
 */
export function generateProductSchema(data: ProductData) {
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl(data.url);
  
  // Calculate priceValidUntil if not provided (default: 1 year from now)
  const defaultPriceValidUntil = new Date();
  defaultPriceValidUntil.setFullYear(defaultPriceValidUntil.getFullYear() + 1);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${fullUrl}#product`,
    name: data.name,
    description: data.description,
    image: getFullImageUrl(data.image),
    url: fullUrl,
    // Product Identifiers (Google recommended for merchant listings)
    sku: data.sku,
    mpn: data.mpn,
    gtin14: data.gtin14,
    brand: {
      '@type': 'Brand',
      name: data.brand || SITE_CONFIG.name,
      logo: `${baseUrl}${SITE_CONFIG.logo}`,
    },
    category: data.category,
    manufacturer: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
    },
    // Offers with complete pricing, shipping, and return policy
    offers: data.offers ? {
      '@type': 'Offer',
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency || 'IDR',
      availability: `https://schema.org/${data.offers.availability || 'InStock'}`,
      itemCondition: `https://schema.org/${data.offers.itemCondition || 'NewCondition'}`,
      priceValidUntil: data.offers.priceValidUntil || defaultPriceValidUntil.toISOString().split('T')[0],
      seller: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: SITE_CONFIG.name,
      },
      shippingDetails: data.offers.shippingDetails ? {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: data.offers.shippingDetails.shippingRate.value,
          currency: data.offers.shippingDetails.shippingRate.currency || 'IDR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: data.offers.shippingDetails.shippingDestination || 'ID',
        },
        deliveryTime: data.offers.shippingDetails.deliveryTime ? {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: data.offers.shippingDetails.deliveryTime.minDays,
            maxValue: data.offers.shippingDetails.deliveryTime.maxDays,
            unitCode: 'DAY'
          }
        } : undefined,
      } : undefined,
      hasMerchantReturnPolicy: data.offers.hasMerchantReturnPolicy ? {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: `https://schema.org/${data.offers.hasMerchantReturnPolicy.returnPolicyCategory}`,
        merchantReturnDays: data.offers.hasMerchantReturnPolicy.merchantReturnDays,
        returnMethod: data.offers.hasMerchantReturnPolicy.returnMethod ? `https://schema.org/${data.offers.hasMerchantReturnPolicy.returnMethod}` : undefined,
        returnFees: data.offers.hasMerchantReturnPolicy.returnFees ? `https://schema.org/${data.offers.hasMerchantReturnPolicy.returnFees}` : undefined,
      } : undefined,
    } : undefined,
    // Aggregate Rating (critical for search visibility)
    aggregateRating: data.aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: data.aggregateRating.bestRating || 5,
      worstRating: data.aggregateRating.worstRating || 1,
    } : undefined,
    // Individual Reviews (enhances E-E-A-T)
    review: data.review ? data.review.map(rev => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.author,
      },
      datePublished: rev.datePublished,
      reviewBody: rev.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.reviewRating.ratingValue,
        bestRating: rev.reviewRating.bestRating || 5,
      },
    })) : undefined,
    // Certifications (critical for agricultural/organic products)
    hasCertification: data.hasCertification ? data.hasCertification.map(cert => ({
      '@type': 'Certification',
      issuedBy: {
        '@type': 'Organization',
        name: cert.issuedBy,
      },
      name: cert.name,
      certificationIdentification: cert.certificationIdentification,
      validFrom: cert.validFrom,
      validThrough: cert.validThrough,
    })) : undefined,
    // Additional Product Properties
    additionalProperty: data.additionalProperty ? data.additionalProperty.map(prop => ({
      '@type': 'PropertyValue',
      name: prop.name,
      value: prop.value,
    })) : undefined,
  };
}

/**
 * Generate ProductGroup schema for product categories
 */
export function generateProductGroupSchema(data: {
  name: string;
  description: string;
  url: string;
  products: Array<{ name: string; url: string; image?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: data.name,
    description: data.description,
    url: getFullUrl(data.url),
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    hasVariant: data.products.map(product => ({
      '@type': 'Product',
      name: product.name,
      url: getFullUrl(product.url),
      image: product.image ? getFullImageUrl(product.image) : undefined,
    })),
  };
}

/**
 * Generate Product Schema with Image Gallery
 * Includes comprehensive ImageObject schema for all product images
 */
export function generateProductSchemaWithImageGallery(
  productData: ProductData, 
  imageGallery?: Array<{
    url: string;
    width?: number;
    height?: number;
    caption?: string;
    encodingFormat?: string;
  }>
) {
  const baseSchema = generateProductSchema(productData) as any;
  
  // If image gallery provided, replace simple image with ImageObject array
  if (imageGallery && imageGallery.length > 0) {
    baseSchema.image = imageGallery.map((img, index) => ({
      '@type': 'ImageObject',
      '@id': `${getFullImageUrl(img.url)}#image`,
      contentUrl: getFullImageUrl(img.url),
      url: getFullImageUrl(img.url),
      name: img.caption || `${productData.name} - Image ${index + 1}`,
      caption: img.caption || `${productData.name} product image`,
      encodingFormat: img.encodingFormat || 'image/webp',
      width: img.width ? {
        '@type': 'QuantitativeValue',
        value: img.width,
        unitCode: 'E37'
      } : undefined,
      height: img.height ? {
        '@type': 'QuantitativeValue',
        value: img.height,
        unitCode: 'E37'
      } : undefined,
      representativeOfPage: index === 0,
      author: {
        '@type': 'Organization',
        '@id': `${getBaseUrl()}#organization`,
        name: SITE_CONFIG.name,
      },
      copyrightHolder: {
        '@type': 'Organization',
        '@id': `${getBaseUrl()}#organization`,
        name: SITE_CONFIG.name,
      },
      copyrightNotice: `© ${new Date().getFullYear()} ${SITE_CONFIG.name}`,
      creditText: SITE_CONFIG.name,
      license: `${getBaseUrl()}/copyright`,
    }));
  }
  
  return baseSchema;
}

// ============================================
// BREADCRUMB SCHEMA
// ============================================

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl();
  
  // Always include home as first item
  const breadcrumbItems = items[0]?.url === '/' 
    ? items 
    : [{ name: 'Beranda', url: '/' }, ...items];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${getFullUrl(items[items.length - 1]?.url || '/')}#breadcrumb`,
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getFullUrl(item.url),
    })),
  };
}

// ============================================
// LOCAL BUSINESS SCHEMA
// ============================================

/**
 * Generate LocalBusiness structured data (for contact page)
 */
export function generateLocalBusinessSchema(data: {
  name: string;
  description: string;
  address: OrganizationData['address'];
  telephone: string;
  email: string;
  url: string;
  openingHours?: Array<{ dayOfWeek: string[]; opens: string; closes: string }>;
  image?: string;
  priceRange?: string;
  geo?: { latitude: number; longitude: number };
}) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Corporation'],
    '@id': `${baseUrl}#localbusiness`,
    name: data.name,
    description: data.description,
    image: data.image ? getFullImageUrl(data.image) : `${baseUrl}${SITE_CONFIG.logo}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address?.streetAddress,
      addressLocality: data.address?.addressLocality,
      addressRegion: data.address?.addressRegion,
      postalCode: data.address?.postalCode,
      addressCountry: data.address?.addressCountry,
    },
    geo: data.geo ? {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    } : undefined,
    telephone: data.telephone,
    email: data.email,
    url: data.url,
    priceRange: data.priceRange || '$$',
    openingHoursSpecification: data.openingHours?.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'IDR',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };
}

// ============================================
// FAQ SCHEMA
// ============================================

/**
 * Generate FAQPage structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// SERVICE SCHEMA
// ============================================

/**
 * Generate Service structured data
 */
export function generateServiceSchema(data: ServiceData) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: data.provider || SITE_CONFIG.name,
    },
    areaServed: {
      '@type': 'Country',
      name: data.areaServed || 'Indonesia',
    },
    serviceType: data.serviceType,
    url: data.url ? getFullUrl(data.url) : undefined,
    image: data.image ? getFullImageUrl(data.image) : undefined,
  };
}

/**
 * Generate multiple services as ItemList
 */
export function generateServicesListSchema(services: ServiceData[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Layanan Centra Biotech Indonesia',
    description: 'Daftar layanan bioteknologi untuk pertanian, peternakan, dan perikanan',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url ? getFullUrl(service.url) : undefined,
      },
    })),
  };
}

// ============================================
// HOW-TO SCHEMA
// ============================================

/**
 * Generate HowTo structured data (for guides/tutorials)
 */
export function generateHowToSchema(data: HowToData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    image: data.image ? getFullImageUrl(data.image) : undefined,
    estimatedCost: data.estimatedCost ? {
      '@type': 'MonetaryAmount',
      value: data.estimatedCost.value,
      currency: data.estimatedCost.currency,
    } : undefined,
    totalTime: data.totalTime,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? getFullImageUrl(step.image) : undefined,
      url: step.url ? getFullUrl(step.url) : undefined,
    })),
  };
}

// ============================================
// VIDEO SCHEMA
// ============================================

/**
 * Generate VideoObject structured data
 */
export function generateVideoSchema(data: VideoData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: getFullImageUrl(data.thumbnailUrl),
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: data.contentUrl,
    embedUrl: data.embedUrl,
    publisher: {
      '@type': 'Organization',
      '@id': `${getBaseUrl()}#organization`,
      name: SITE_CONFIG.name,
    },
  };
}

// ============================================
// EVENT SCHEMA
// ============================================

/**
 * Generate Event structured data
 */
export function generateEventSchema(data: EventData) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate || data.startDate,
    eventStatus: `https://schema.org/Event${data.eventStatus || 'Scheduled'}`,
    eventAttendanceMode: data.eventAttendanceMode === 'Online' 
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : data.eventAttendanceMode === 'Mixed'
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    location: data.location ? {
      '@type': 'Place',
      name: data.location.name,
      address: data.location.address,
    } : undefined,
    image: data.image ? getFullImageUrl(data.image) : undefined,
    organizer: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: data.organizer || SITE_CONFIG.name,
    },
  };
}

// ============================================
// COLLECTION PAGE SCHEMA
// ============================================

/**
 * Generate CollectionPage structured data (for listing pages)
 */
export function generateCollectionPageSchema(data: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.name,
    description: data.description,
    url: getFullUrl(data.url),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: getFullUrl(item.url),
        name: item.name,
        description: item.description,
      })),
    },
  };
}

// ============================================
// SITE NAVIGATION SCHEMA
// ============================================

/**
 * Generate SiteNavigationElement structured data
 */
export function generateSiteNavigationSchema(navItems: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    hasPart: navItems.map(item => ({
      '@type': 'WebPage',
      name: item.name,
      url: getFullUrl(item.url),
    })),
  };
}

// ============================================
// STRUCTURED DATA COMPONENT
// ============================================

/**
 * Component to inject JSON-LD script safely
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  // Sanitize the JSON to prevent XSS
  const sanitizedJson = JSON.stringify(data).replace(/</g, '\\u003c');
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedJson }}
    />
  );
}

/**
 * Component to inject multiple structured data scripts
 */
export function MultipleStructuredData({ dataArray }: { dataArray: Array<Record<string, unknown>> }) {
  return (
    <>
      {dataArray.map((data, index) => (
        <StructuredData key={`structured-data-${index}`} data={data} />
      ))}
    </>
  );
}

// ============================================
// PRESET SCHEMAS FOR COMMON PAGES
// ============================================

/**
 * Generate all schemas for homepage
 */
export function generateHomePageSchemas() {
  const baseUrl = getBaseUrl();
  
  return [
    generateOrganizationSchema({
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: baseUrl,
      logo: SITE_CONFIG.logo,
      address: SITE_CONFIG.address,
      contactPoint: {
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        contactType: 'Customer Service',
      },
      socialMedia: [
        SITE_CONFIG.facebook,
        SITE_CONFIG.instagram,
        SITE_CONFIG.linkedin,
        SITE_CONFIG.youtube,
      ].filter(Boolean),
      slogan: SITE_CONFIG.tagline,
    }),
    generateWebsiteSchema({
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: baseUrl,
    }),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
    ]),
  ];
}

/**
 * Generate all schemas for about page
 */
export function generateAboutPageSchemas() {
  const baseUrl = getBaseUrl();
  
  return [
    generateWebPageSchema({
      name: 'Tentang Kami - Centra Biotech Indonesia',
      description: 'Kenali Centra Biotech Indonesia, perusahaan bioteknologi terkemuka Indonesia.',
      url: '/about-us',
    }),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Tentang Kami', url: '/about-us' },
    ]),
    generateOrganizationSchema({
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: baseUrl,
      logo: SITE_CONFIG.logo,
      address: SITE_CONFIG.address,
      contactPoint: {
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        contactType: 'Customer Service',
      },
      socialMedia: [
        SITE_CONFIG.facebook,
        SITE_CONFIG.instagram,
        SITE_CONFIG.linkedin,
      ].filter(Boolean),
    }),
  ];
}

/**
 * Generate all schemas for contact page
 */
export function generateContactPageSchemas() {
  const baseUrl = getBaseUrl();
  
  return [
    generateWebPageSchema({
      name: 'Hubungi Kami - Centra Biotech Indonesia',
      description: 'Hubungi Centra Biotech Indonesia untuk konsultasi solusi bioteknologi.',
      url: '/contact',
    }),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Hubungi Kami', url: '/contact' },
    ]),
    generateLocalBusinessSchema({
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      address: SITE_CONFIG.address,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      url: baseUrl,
      openingHours: SITE_CONFIG.openingHours,
    }),
  ];
}

/**
 * Generate schemas for product category page
 */
export function generateProductCategorySchemas(category: {
  name: string;
  description: string;
  url: string;
  products: Array<{ name: string; url: string; image?: string; description?: string }>;
}) {
  return [
    generateWebPageSchema({
      name: `${category.name} - Centra Biotech Indonesia`,
      description: category.description,
      url: category.url,
    }),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Produk', url: '/product' },
      { name: category.name, url: category.url },
    ]),
    generateCollectionPageSchema({
      name: category.name,
      description: category.description,
      url: category.url,
      items: category.products,
    }),
  ];
}

/**
 * Generate schemas for news/article listing page
 */
export function generateNewsListingSchemas(articles: Array<{ title: string; url: string; description?: string }>) {
  return [
    generateWebPageSchema({
      name: 'Berita & Artikel - Centra Biotech Indonesia',
      description: 'Baca berita terbaru dan artikel informatif tentang bioteknologi, pertanian, peternakan, dan perikanan.',
      url: '/news',
    }),
    generateBreadcrumbSchema([
      { name: 'Beranda', url: '/' },
      { name: 'Berita & Artikel', url: '/news' },
    ]),
    generateCollectionPageSchema({
      name: 'Berita & Artikel',
      description: 'Kumpulan berita dan artikel dari Centra Biotech Indonesia',
      url: '/news',
      items: articles.map(a => ({
        name: a.title,
        url: a.url,
        description: a.description,
      })),
    }),
  ];
}
// ============================================
// GEO (GENERATIVE ENGINE OPTIMIZATION) SCHEMAS
// ============================================

/**
 * Generate Speakable schema for voice assistants and AI citation
 * This helps Google Assistant and AI systems identify speakable content
 * Essential for GEO (Generative Engine Optimization) 2025-2026
 */
export function generateSpeakableSchema(data: {
  url: string;
  name: string;
  description: string;
  speakableSelectors?: string[];
  speakableXPaths?: string[];
}) {
  const fullUrl = getFullUrl(data.url);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${fullUrl}#speakable`,
    name: data.name,
    description: data.description,
    url: fullUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      // Use CSS selectors for content that should be speakable
      cssSelector: data.speakableSelectors || [
        'article h1',
        'article h2',
        'article p:first-of-type',
        '.product-description',
        '.main-content p',
        'meta[name="description"]',
      ],
      // XPath for more precise targeting
      xpath: data.speakableXPaths || [
        '/html/head/title',
        "/html/head/meta[@name='description']/@content",
      ],
    },
    isPartOf: {
      '@id': `${getBaseUrl()}#website`,
    },
    publisher: {
      '@id': `${getBaseUrl()}#organization`,
    },
  };
}

/**
 * Generate Citation-Ready Article schema for AI/LLM optimization
 * Enhanced for GEO - includes all data AI systems need for accurate citation
 */
export function generateGEOArticleSchema(data: ArticleData & {
  citationText?: string;
  factStatements?: string[];
  expertise?: string[];
  sources?: Array<{ name: string; url: string }>;
}) {
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl(data.url);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${fullUrl}#geo-article`,
    headline: data.title,
    description: data.description,
    image: {
      '@type': 'ImageObject',
      url: getFullImageUrl(data.image),
      width: 1200,
      height: 630,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.authorName,
      url: baseUrl,
      // Expertise signals for E-E-A-T
      knowsAbout: data.expertise || [
        'Bioteknologi',
        'Pertanian Organik',
        'Pupuk Hayati',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${SITE_CONFIG.logo}`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    articleSection: data.section || 'General',
    keywords: data.keywords?.join(', '),
    wordCount: data.wordCount,
    inLanguage: SITE_CONFIG.language,
    // Citation data for AI systems
    citation: data.citationText || `${data.authorName}. "${data.title}." ${SITE_CONFIG.name}, ${new Date(data.datePublished).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}. ${fullUrl}`,
    // Key facts that can be cited
    ...(data.factStatements?.length && {
      hasPart: data.factStatements.map((fact, index) => ({
        '@type': 'WebPageElement',
        isAccessibleForFree: true,
        cssSelector: `.fact-${index + 1}`,
        text: fact,
      })),
    }),
    // Source references for credibility
    ...(data.sources?.length && {
      isBasedOn: data.sources.map(source => ({
        '@type': 'CreativeWork',
        name: source.name,
        url: source.url,
      })),
    }),
    // Speakable content for voice
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article p:first-of-type'],
    },
    // Accessibility
    accessibilityFeature: ['tableOfContents', 'readingOrder'],
    accessibilityHazard: 'none',
    accessMode: ['textual', 'visual'],
  };
}

/**
 * Generate enhanced Product schema with GEO optimization
 * Includes all data needed for AI product recommendations
 */
export function generateGEOProductSchema(data: ProductData & {
  benefits?: string[];
  useCases?: string[];
  targetAudience?: string[];
  certifications?: string[];
  applicationMethod?: string;
}) {
  const baseProductSchema = generateProductSchema(data);
  
  return {
    ...baseProductSchema,
    // Enhanced for GEO
    additionalProperty: [
      ...(data.benefits?.map(benefit => ({
        '@type': 'PropertyValue',
        name: 'Manfaat',
        value: benefit,
      })) || []),
      ...(data.useCases?.map(useCase => ({
        '@type': 'PropertyValue',
        name: 'Kegunaan',
        value: useCase,
      })) || []),
      ...(data.certifications?.map(cert => ({
        '@type': 'PropertyValue',
        name: 'Sertifikasi',
        value: cert,
      })) || []),
      ...(data.applicationMethod ? [{
        '@type': 'PropertyValue',
        name: 'Cara Aplikasi',
        value: data.applicationMethod,
      }] : []),
    ],
    // Target audience for AI recommendations
    audience: data.targetAudience?.map(audience => ({
      '@type': 'Audience',
      audienceType: audience,
    })),
    // Speakable product info
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.product-name', '.product-description', '.product-benefits'],
    },
  };
}

/**
 * Generate Knowledge Graph compatible Organization schema
 * Enhanced for AI/LLM understanding and citation
 */
export function generateGEOOrganizationSchema(data: OrganizationData & {
  expertise?: string[];
  achievements?: string[];
  certifications?: string[];
}) {
  const baseOrgSchema = generateOrganizationSchema(data);
  
  return {
    ...baseOrgSchema,
    // Enhanced expertise for E-E-A-T
    knowsAbout: [
      ...(baseOrgSchema.knowsAbout || []),
      ...(data.expertise || []),
    ],
    // Credentials and achievements
    hasCredential: data.certifications?.map(cert => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certificate',
      name: cert,
    })),
    // Notable achievements for authority
    award: data.achievements?.map(achievement => ({
      '@type': 'Award',
      name: achievement,
    })),
    // Official channels
    publishingPrinciples: `${data.url}/documents`,
    // Speakable for voice
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.company-name', '.company-tagline', '.company-description'],
    },
  };
}

// ============================================
// INTERACTION STATISTICS SCHEMA
// ============================================

/**
 * Generate InteractionCounter for social proof
 * Used in articles, products, and pages for engagement metrics
 */
export function generateInteractionStatistics(data: {
  views?: number;
  likes?: number;
  shares?: number;
  comments?: number;
}) {
  const stats = [];
  
  if (data.views) {
    stats.push({
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ViewAction',
      userInteractionCount: data.views,
    });
  }
  
  if (data.likes) {
    stats.push({
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/LikeAction',
      userInteractionCount: data.likes,
    });
  }
  
  if (data.shares) {
    stats.push({
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ShareAction',
      userInteractionCount: data.shares,
    });
  }
  
  if (data.comments) {
    stats.push({
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/CommentAction',
      userInteractionCount: data.comments,
    });
  }
  
  return stats;
}

// ============================================
// ADVANCED GOOGLE 2024-2026 SCHEMAS
// ============================================

/**
 * Generate JobPosting schema for career pages
 * Following Google's structured data guidelines for job search
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export interface JobPostingData {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN' | 'VOLUNTEER' | 'PER_DIEM' | 'OTHER';
  hiringOrganization?: {
    name: string;
    sameAs?: string;
    logo?: string;
  };
  jobLocation?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  baseSalary?: {
    minValue?: number;
    maxValue?: number;
    currency?: string;
    unitText?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  };
  applicantLocationRequirements?: string[];
  jobLocationType?: 'TELECOMMUTE';
  directApply?: boolean;
  qualifications?: string[];
  responsibilities?: string[];
  skills?: string[];
  educationRequirements?: string;
  experienceRequirements?: string;
}

export function generateJobPostingSchema(data: JobPostingData) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: data.title,
    description: data.description,
    datePosted: data.datePosted,
    validThrough: data.validThrough,
    employmentType: data.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: data.hiringOrganization?.name || SITE_CONFIG.name,
      sameAs: data.hiringOrganization?.sameAs || baseUrl,
      logo: data.hiringOrganization?.logo || `${baseUrl}${SITE_CONFIG.logo}`,
    },
    jobLocation: data.jobLocation ? {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.jobLocation.streetAddress,
        addressLocality: data.jobLocation.addressLocality,
        addressRegion: data.jobLocation.addressRegion,
        postalCode: data.jobLocation.postalCode,
        addressCountry: data.jobLocation.addressCountry,
      },
    } : {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CONFIG.address.addressLocality,
        addressRegion: SITE_CONFIG.address.addressRegion,
        postalCode: SITE_CONFIG.address.postalCode,
        addressCountry: SITE_CONFIG.address.addressCountry,
      },
    },
    baseSalary: data.baseSalary ? {
      '@type': 'MonetaryAmount',
      currency: data.baseSalary.currency || 'IDR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: data.baseSalary.minValue,
        maxValue: data.baseSalary.maxValue,
        unitText: data.baseSalary.unitText || 'MONTH',
      },
    } : undefined,
    applicantLocationRequirements: data.applicantLocationRequirements?.map(location => ({
      '@type': 'Country',
      name: location,
    })),
    jobLocationType: data.jobLocationType,
    directApply: data.directApply ?? true,
    qualifications: data.qualifications,
    responsibilities: data.responsibilities,
    skills: data.skills,
    educationRequirements: data.educationRequirements ? {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: data.educationRequirements,
    } : undefined,
    experienceRequirements: data.experienceRequirements ? {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: data.experienceRequirements,
    } : undefined,
  };
}

/**
 * Generate ProfilePage schema for about pages
 * New Google 2024 requirement for author/organization pages
 * @see https://developers.google.com/search/docs/appearance/structured-data/profile-page
 */
export interface ProfilePageData {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image?: string;
  dateCreated?: string;
  dateModified?: string;
  sameAs?: string[];
  mainEntity: {
    type: 'Person' | 'Organization';
    name: string;
    description?: string;
    image?: string;
    sameAs?: string[];
    url?: string;
    // For Person
    jobTitle?: string;
    worksFor?: string;
    alumniOf?: string[];
    knowsAbout?: string[];
    // For Organization
    foundingDate?: string;
    founders?: string[];
    numberOfEmployees?: { minValue?: number; maxValue?: number };
    areaServed?: string;
  };
  hasPart?: Array<{
    type: 'Article' | 'SocialMediaPosting' | 'ImageObject';
    headline?: string;
    url?: string;
    datePublished?: string;
    image?: string;
  }>;
  interactionStatistic?: {
    interactionType: string;
    userInteractionCount: number;
  }[];
}

export function generateProfilePageSchema(data: ProfilePageData) {
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl(data.url);
  
  const mainEntity = data.mainEntity.type === 'Person' ? {
    '@type': 'Person',
    name: data.mainEntity.name,
    description: data.mainEntity.description,
    image: data.mainEntity.image ? getFullImageUrl(data.mainEntity.image) : undefined,
    sameAs: data.mainEntity.sameAs,
    url: data.mainEntity.url || fullUrl,
    jobTitle: data.mainEntity.jobTitle,
    worksFor: data.mainEntity.worksFor ? {
      '@type': 'Organization',
      name: data.mainEntity.worksFor,
    } : undefined,
    alumniOf: data.mainEntity.alumniOf?.map(school => ({
      '@type': 'EducationalOrganization',
      name: school,
    })),
    knowsAbout: data.mainEntity.knowsAbout,
  } : {
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: data.mainEntity.name,
    description: data.mainEntity.description,
    image: data.mainEntity.image ? getFullImageUrl(data.mainEntity.image) : undefined,
    sameAs: data.mainEntity.sameAs,
    url: data.mainEntity.url || baseUrl,
    foundingDate: data.mainEntity.foundingDate,
    founder: data.mainEntity.founders?.map(name => ({
      '@type': 'Person',
      name,
    })),
    numberOfEmployees: data.mainEntity.numberOfEmployees ? {
      '@type': 'QuantitativeValue',
      minValue: data.mainEntity.numberOfEmployees.minValue,
      maxValue: data.mainEntity.numberOfEmployees.maxValue,
    } : undefined,
    areaServed: data.mainEntity.areaServed ? {
      '@type': 'Country',
      name: data.mainEntity.areaServed,
    } : undefined,
    knowsAbout: data.mainEntity.knowsAbout,
  };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${fullUrl}#profilepage`,
    name: data.name,
    alternateName: data.alternateName,
    description: data.description,
    url: fullUrl,
    image: data.image ? getFullImageUrl(data.image) : undefined,
    dateCreated: data.dateCreated,
    dateModified: data.dateModified || data.dateCreated,
    mainEntity,
    hasPart: data.hasPart?.map(part => ({
      '@type': part.type,
      headline: part.headline,
      url: part.url ? getFullUrl(part.url) : undefined,
      datePublished: part.datePublished,
      image: part.image ? getFullImageUrl(part.image) : undefined,
    })),
    interactionStatistic: data.interactionStatistic?.map(stat => ({
      '@type': 'InteractionCounter',
      interactionType: `https://schema.org/${stat.interactionType}`,
      userInteractionCount: stat.userInteractionCount,
    })),
  };
}

/**
 * Generate LearningResource/Course schema for educational content
 * Optimized for Google's learning content rich results
 * @see https://developers.google.com/search/docs/appearance/structured-data/course
 */
export interface LearningResourceData {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
  educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  learningResourceType?: 'Article' | 'Course' | 'Guide' | 'Tutorial' | 'Video' | 'Quiz';
  timeRequired?: string; // ISO 8601 duration (e.g., "PT30M" for 30 minutes)
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
  teaches?: string[];
  educationalUse?: string[];
  competencyRequired?: string[];
  author?: {
    name: string;
    jobTitle?: string;
    affiliation?: string;
    sameAs?: string[];
  };
  keywords?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  hasPart?: Array<{
    name: string;
    description?: string;
    url?: string;
    timeRequired?: string;
  }>;
}

export function generateLearningResourceSchema(data: LearningResourceData) {
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl(data.url);
  
  return {
    '@context': 'https://schema.org',
    '@type': ['LearningResource', 'Article'],
    '@id': `${fullUrl}#learningresource`,
    name: data.name,
    description: data.description,
    url: fullUrl,
    image: data.image ? getFullImageUrl(data.image) : undefined,
    provider: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: data.provider || SITE_CONFIG.name,
    },
    educationalLevel: data.educationalLevel || 'All Levels',
    learningResourceType: data.learningResourceType || 'Guide',
    timeRequired: data.timeRequired,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    inLanguage: data.inLanguage || SITE_CONFIG.language,
    teaches: data.teaches,
    educationalUse: data.educationalUse || ['Self-Study', 'Professional Development'],
    competencyRequired: data.competencyRequired,
    author: data.author ? {
      '@type': 'Person',
      name: data.author.name,
      jobTitle: data.author.jobTitle,
      affiliation: data.author.affiliation ? {
        '@type': 'Organization',
        name: data.author.affiliation,
      } : undefined,
      sameAs: data.author.sameAs,
    } : {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
    },
    keywords: data.keywords?.join(', '),
    aggregateRating: data.aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    hasPart: data.hasPart?.map((part, index) => ({
      '@type': 'LearningResource',
      position: index + 1,
      name: part.name,
      description: part.description,
      url: part.url ? getFullUrl(part.url) : undefined,
      timeRequired: part.timeRequired,
    })),
    // Speakable for voice search
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.introduction', '.summary', 'article p:first-of-type'],
    },
    // Accessibility features
    accessibilityFeature: ['tableOfContents', 'readingOrder', 'structuredContent'],
    accessibilityHazard: 'none',
    accessMode: ['textual', 'visual'],
    isAccessibleForFree: true,
  };
}

/**
 * Generate enhanced Author/Person schema for E-E-A-T
 * Critical for Google's expertise, experience, authoritativeness, trustworthiness signals
 */
export interface AuthorData {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  worksFor?: string;
  alumniOf?: string[];
  knowsAbout?: string[];
  sameAs?: string[];
  hasCredential?: Array<{
    name: string;
    issuedBy?: string;
    dateIssued?: string;
  }>;
  award?: string[];
  memberOf?: string[];
}

export function generateAuthorSchema(data: AuthorData) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': data.url ? getFullUrl(data.url) : `${baseUrl}#author-${data.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: data.name,
    url: data.url ? getFullUrl(data.url) : undefined,
    image: data.image ? getFullImageUrl(data.image) : undefined,
    jobTitle: data.jobTitle,
    description: data.description,
    worksFor: data.worksFor ? {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: data.worksFor,
    } : {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
    },
    alumniOf: data.alumniOf?.map(school => ({
      '@type': 'EducationalOrganization',
      name: school,
    })),
    knowsAbout: data.knowsAbout || [
      'Bioteknologi Pertanian',
      'Pupuk Hayati',
      'Pertanian Berkelanjutan',
      'Mikrobiologi Tanah',
    ],
    sameAs: data.sameAs,
    hasCredential: data.hasCredential?.map(cred => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.name,
      credentialCategory: 'Professional Certification',
      recognizedBy: cred.issuedBy ? {
        '@type': 'Organization',
        name: cred.issuedBy,
      } : undefined,
      dateCreated: cred.dateIssued,
    })),
    award: data.award,
    memberOf: data.memberOf?.map(org => ({
      '@type': 'Organization',
      name: org,
    })),
  };
}

/**
 * Generate ItemList schema for listing pages (blog, news, products)
 * Enables Google's carousel rich results
 * @see https://developers.google.com/search/docs/appearance/structured-data/carousel
 */
export interface ItemListData {
  name: string;
  description: string;
  url: string;
  itemListType: 'Article' | 'Product' | 'NewsArticle' | 'BlogPosting' | 'Course' | 'Event';
  items: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
    datePublished?: string;
    author?: string;
    price?: number;
    currency?: string;
  }>;
  numberOfItems?: number;
}

export function generateItemListSchema(data: ItemListData) {
  const baseUrl = getBaseUrl();
  const fullUrl = getFullUrl(data.url);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${fullUrl}#itemlist`,
    name: data.name,
    description: data.description,
    url: fullUrl,
    numberOfItems: data.numberOfItems || data.items.length,
    itemListElement: data.items.map((item, index) => {
      const baseItem = {
        '@type': 'ListItem',
        position: index + 1,
        url: getFullUrl(item.url),
      };
      
      // Add item details based on type
      const itemDetails: Record<string, unknown> = {
        '@type': data.itemListType,
        name: item.name,
        url: getFullUrl(item.url),
        description: item.description,
      };
      
      if (item.image) {
        itemDetails.image = getFullImageUrl(item.image);
      }
      
      if (item.datePublished && ['Article', 'NewsArticle', 'BlogPosting'].includes(data.itemListType)) {
        itemDetails.datePublished = item.datePublished;
      }
      
      if (item.author && ['Article', 'NewsArticle', 'BlogPosting'].includes(data.itemListType)) {
        itemDetails.author = {
          '@type': 'Person',
          name: item.author,
        };
      }
      
      if (item.price && data.itemListType === 'Product') {
        itemDetails.offers = {
          '@type': 'Offer',
          price: item.price,
          priceCurrency: item.currency || 'IDR',
          availability: 'https://schema.org/InStock',
        };
      }
      
      return {
        ...baseItem,
        item: itemDetails,
      };
    }),
    // Publisher info
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
    },
  };
}

/**
 * Generate enhanced LocalBusiness schema with GeoCoordinates
 * Following Google's local business structured data guidelines
 */
export function generateEnhancedLocalBusinessSchema(data: {
  name: string;
  description: string;
  url: string;
  image?: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours?: Array<{
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string;
  areaServed?: string[];
  hasMap?: string;
  sameAs?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  review?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: number;
  }>;
}) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Corporation', 'BiotechCompany'],
    '@id': `${baseUrl}#localbusiness`,
    name: data.name,
    legalName: SITE_CONFIG.legalName,
    description: data.description,
    url: data.url,
    image: data.image ? getFullImageUrl(data.image) : `${baseUrl}${SITE_CONFIG.logo}`,
    logo: `${baseUrl}${SITE_CONFIG.logo}`,
    telephone: data.telephone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    hasMap: data.hasMap || `https://maps.google.com/?q=${data.geo.latitude},${data.geo.longitude}`,
    openingHoursSpecification: data.openingHours?.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    priceRange: data.priceRange || '$$',
    paymentAccepted: data.paymentAccepted || ['Cash', 'Credit Card', 'Bank Transfer', 'E-Wallet'],
    currenciesAccepted: data.currenciesAccepted || 'IDR',
    areaServed: data.areaServed?.map(area => ({
      '@type': area === 'Indonesia' ? 'Country' : 'State',
      name: area,
    })) || [{ '@type': 'Country', name: 'Indonesia' }],
    sameAs: data.sameAs || [
      SITE_CONFIG.facebook,
      SITE_CONFIG.instagram,
      SITE_CONFIG.linkedin,
      SITE_CONFIG.youtube,
    ].filter(Boolean),
    aggregateRating: data.aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: data.review?.map(rev => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.author,
      },
      datePublished: rev.datePublished,
      reviewBody: rev.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.reviewRating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    // Additional business attributes
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founder.name,
    },
    foundingDate: '2011',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    knowsAbout: [
      'Bioteknologi Pertanian',
      'Pupuk Hayati',
      'Pupuk Organik',
      'Probiotik Ternak',
      'Probiotik Ikan',
      'Maklon Pupuk',
    ],
    makesOffer: SITE_CONFIG.flagshipProducts?.map(product => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: product.name,
        category: product.type,
      },
    })),
  };
}

/**
 * Generate Article with Speakable specification for voice search
 * Following Google's speakable structured data for news articles
 * @see https://developers.google.com/search/docs/appearance/structured-data/speakable
 */
export function generateArticleWithSpeakableSchema(data: ArticleData & {
  speakableSelectors?: string[];
  speakableSections?: string[];
}) {
  const baseArticle = generateArticleSchema(data);
  
  return {
    ...baseArticle,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: data.speakableSelectors || [
        'article h1',
        'article h2',
        'article > p:first-of-type',
        'article > p:nth-of-type(2)',
        '.article-summary',
        '.introduction',
        'meta[name="description"]',
      ],
    },
    // Accessibility metadata
    accessibilityFeature: ['readingOrder', 'structuredNavigation', 'tableOfContents'],
    accessibilityHazard: 'none',
    accessMode: ['textual', 'visual'],
    accessModeSufficient: ['textual'],
    accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
  };
}

/**
 * Generate NewsArticle with enhanced Speakable for Google Assistant
 */
export function generateNewsArticleWithSpeakableSchema(data: ArticleData & {
  speakableSelectors?: string[];
}) {
  const baseSchema = generateArticleWithSpeakableSchema(data);
  
  return {
    ...baseSchema,
    '@type': 'NewsArticle',
    // News-specific properties
    dateline: SITE_CONFIG.address.addressLocality,
    printEdition: 'Online',
    printSection: data.section || 'Business',
  };
}

// ============================================
// ENHANCED PAGE SCHEMA GENERATORS
// ============================================

/**
 * Generate comprehensive schemas for news/blog listing page
 */
export function generateEnhancedNewsListingSchemas(data: {
  title: string;
  description: string;
  url: string;
  locale: string;
  articles: Array<{
    title: string;
    url: string;
    image?: string;
    description?: string;
    datePublished?: string;
    author?: string;
  }>;
}) {
  const baseUrl = getBaseUrl();
  
  return [
    generateWebPageSchema({
      name: data.title,
      description: data.description,
      url: data.url,
    }),
    generateBreadcrumbSchema([
      { name: data.locale === 'id' ? 'Beranda' : 'Home', url: `/${data.locale}` },
      { name: data.title, url: data.url },
    ]),
    generateItemListSchema({
      name: data.title,
      description: data.description,
      url: data.url,
      itemListType: 'NewsArticle',
      items: data.articles.map(a => ({
        name: a.title,
        url: a.url,
        image: a.image,
        description: a.description,
        datePublished: a.datePublished,
        author: a.author,
      })),
    }),
    // CollectionPage for semantic structure
    generateCollectionPageSchema({
      name: data.title,
      description: data.description,
      url: data.url,
      items: data.articles.map(a => ({
        name: a.title,
        url: a.url,
        description: a.description,
      })),
    }),
  ];
}

/**
 * Generate comprehensive schemas for about page with ProfilePage
 */
export function generateEnhancedAboutPageSchemas(data: {
  locale: string;
  companyDescription: string;
  foundingDate?: string;
  founders?: string[];
  achievements?: string[];
  certifications?: string[];
}) {
  const baseUrl = getBaseUrl();
  const url = `/${data.locale}/about-us`;
  
  return [
    generateWebPageSchema({
      name: data.locale === 'id' ? 'Tentang Kami - Centra Biotech Indonesia' : 'About Us - Centra Biotech Indonesia',
      description: data.companyDescription,
      url,
    }),
    generateBreadcrumbSchema([
      { name: data.locale === 'id' ? 'Beranda' : 'Home', url: `/${data.locale}` },
      { name: data.locale === 'id' ? 'Tentang Kami' : 'About Us', url },
    ]),
    generateProfilePageSchema({
      name: data.locale === 'id' ? 'Profil Centra Biotech Indonesia' : 'Centra Biotech Indonesia Profile',
      description: data.companyDescription,
      url,
      mainEntity: {
        type: 'Organization',
        name: SITE_CONFIG.name,
        description: data.companyDescription,
        image: SITE_CONFIG.logo,
        sameAs: [
          SITE_CONFIG.facebook,
          SITE_CONFIG.instagram,
          SITE_CONFIG.linkedin,
          SITE_CONFIG.youtube,
        ].filter(Boolean),
        foundingDate: data.foundingDate || '2011',
        founders: data.founders || ['Tim Centra Biotech Indonesia'],
        numberOfEmployees: { minValue: 50, maxValue: 100 },
        areaServed: 'Indonesia',
        knowsAbout: [
          'Bioteknologi',
          'Pertanian Berkelanjutan',
          'Pupuk Hayati',
          'Probiotik',
        ],
      },
    }),
    generateGEOOrganizationSchema({
      name: SITE_CONFIG.name,
      description: data.companyDescription,
      url: baseUrl,
      logo: SITE_CONFIG.logo,
      address: SITE_CONFIG.address,
      contactPoint: {
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        contactType: 'Customer Service',
      },
      socialMedia: [
        SITE_CONFIG.facebook,
        SITE_CONFIG.instagram,
        SITE_CONFIG.linkedin,
        SITE_CONFIG.youtube,
      ].filter(Boolean),
      expertise: [
        'Agricultural Biotechnology',
        'Biofertilizer Manufacturing',
        'Organic Farming Solutions',
        'Probiotic Production',
      ],
      achievements: data.achievements,
      certifications: data.certifications,
    }),
  ];
}

/**
 * Generate comprehensive schemas for career page with JobPosting
 */
export function generateEnhancedCareerPageSchemas(data: {
  locale: string;
  jobs?: Array<{
    title: string;
    description: string;
    datePosted: string;
    validThrough?: string;
    employmentType?: JobPostingData['employmentType'];
    salary?: {
      min?: number;
      max?: number;
    };
  }>;
}) {
  const baseUrl = getBaseUrl();
  const url = `/${data.locale}/career`;
  const title = data.locale === 'id' ? 'Karir di Centra Biotech Indonesia' : 'Career at Centra Biotech Indonesia';
  const description = data.locale === 'id' 
    ? 'Temukan peluang karir menarik di PT Centra Biotech Indonesia, perusahaan bioteknologi terkemuka Indonesia.'
    : 'Discover exciting career opportunities at PT Centra Biotech Indonesia, Indonesia\'s leading biotech company.';
  
  // Type as array of any structured data object
  const schemas: Array<Record<string, unknown>> = [
    generateWebPageSchema({
      name: title,
      description,
      url,
    }),
    generateBreadcrumbSchema([
      { name: data.locale === 'id' ? 'Beranda' : 'Home', url: `/${data.locale}` },
      { name: data.locale === 'id' ? 'Karir' : 'Career', url },
    ]),
  ];
  
  // Add JobPosting schemas for each job
  if (data.jobs?.length) {
    data.jobs.forEach(job => {
      schemas.push(generateJobPostingSchema({
        title: job.title,
        description: job.description,
        datePosted: job.datePosted,
        validThrough: job.validThrough,
        employmentType: job.employmentType || 'FULL_TIME',
        baseSalary: job.salary ? {
          minValue: job.salary.min,
          maxValue: job.salary.max,
          currency: 'IDR',
          unitText: 'MONTH',
        } : undefined,
        jobLocation: {
          addressLocality: SITE_CONFIG.address.addressLocality,
          addressRegion: SITE_CONFIG.address.addressRegion,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: 'ID',
        },
      }));
    });
  }
  
  return schemas;
}

/**
 * Generate comprehensive schemas for contact page with enhanced LocalBusiness
 */
export function generateEnhancedContactPageSchemas(data?: {
  locale?: string;
}) {
  const locale = data?.locale || 'id';
  const baseUrl = getBaseUrl();
  const url = `/${locale}/contact`;
  
  return [
    generateWebPageSchema({
      name: locale === 'id' ? 'Hubungi Kami - Centra Biotech Indonesia' : 'Contact Us - Centra Biotech Indonesia',
      description: locale === 'id' 
        ? 'Hubungi Centra Biotech Indonesia untuk konsultasi solusi bioteknologi.' 
        : 'Contact Centra Biotech Indonesia for biotechnology solutions consultation.',
      url,
    }),
    generateBreadcrumbSchema([
      { name: locale === 'id' ? 'Beranda' : 'Home', url: `/${locale}` },
      { name: locale === 'id' ? 'Hubungi Kami' : 'Contact Us', url },
    ]),
    generateEnhancedLocalBusinessSchema({
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: baseUrl,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: SITE_CONFIG.address,
      geo: {
        // Klaten, Central Java coordinates
        latitude: -7.7056,
        longitude: 110.6043,
      },
      openingHours: SITE_CONFIG.openingHours,
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Bank Transfer', 'Credit Card', 'E-Wallet'],
      areaServed: ['Indonesia', 'Jawa Tengah', 'Klaten'],
      hasMap: 'https://maps.google.com/?q=-7.7056,110.6043',
      sameAs: [
        SITE_CONFIG.facebook,
        SITE_CONFIG.instagram,
        SITE_CONFIG.linkedin,
        SITE_CONFIG.youtube,
      ].filter(Boolean),
    }),
  ];
}

// ============================================
// CBI PRODUCT-SPECIFIC SCHEMAS (MASTER KEYWORD OPTIMIZED)
// ============================================

/**
 * CBI Product FAQ Data - Comprehensive FAQs for all products
 * Used for FAQ schema generation on product pages
 */
export const CBI_PRODUCT_FAQS = {
  floraOne: [
    {
      question: 'Apa itu Flora One dan apa keunggulannya?',
      answer: 'Flora One adalah pupuk hayati cair premium dari PT Centra Biotech Indonesia yang mengandung 5 jenis mikroorganisme menguntungkan: Trichoderma sp., Pseudomonas fluorescens, Rhizobium sp., Azotobacter sp., dan Bacillus sp. dengan konsentrasi >1×10⁸ CFU/ml. Keunggulannya: mencegah penyakit layu fusarium dan busuk akar, meningkatkan penyerapan nutrisi hingga 30%, bersertifikat Kementan RI, dan 100% ramah lingkungan.',
    },
    {
      question: 'Berapa harga Flora One per liter?',
      answer: 'Harga Flora One mulai dari Rp 85.000 per liter untuk kemasan retail. Untuk pembelian partai besar (grosir), tersedia harga khusus yang lebih kompetitif. Hubungi distributor resmi PT Centra Biotech Indonesia di 0851-9621-4187 atau WhatsApp untuk penawaran terbaik.',
    },
    {
      question: 'Bagaimana cara menggunakan Flora One yang benar?',
      answer: 'Cara aplikasi Flora One: 1) Campurkan 5-10 ml Flora One per liter air, 2) Semprot merata pada daun dan pangkal batang tanaman, 3) Aplikasikan pagi hari (06.00-09.00) atau sore hari (15.00-17.00) saat cuaca teduh, 4) Ulangi setiap 7-14 hari sekali untuk hasil optimal. Untuk pencegahan penyakit, aplikasikan sejak fase vegetatif.',
    },
    {
      question: 'Apakah Flora One aman untuk tanaman organik?',
      answer: 'Ya, Flora One 100% berbahan hayati alami dan telah bersertifikat Kementan RI, sehingga aman digunakan untuk pertanian organik. Tidak mengandung bahan kimia sintetis, tidak meninggalkan residu berbahaya, dan ramah lingkungan. Flora One sesuai untuk standar pertanian organik SNI dan sertifikasi organik internasional.',
    },
    {
      question: 'Flora One cocok untuk tanaman apa saja?',
      answer: 'Flora One cocok untuk semua jenis tanaman: tanaman pangan (padi, jagung, kedelai), sayuran (cabai, tomat, bawang, selada), buah-buahan (jeruk, mangga, melon), tanaman hias, dan tanaman perkebunan (sawit, karet, kakao). Sangat efektif untuk mencegah penyakit layu pada tanaman solanaceae dan cucurbitaceae.',
    },
    {
      question: 'Di mana beli Flora One asli?',
      answer: 'Flora One asli tersedia di: 1) Shopee Indonesia - toko resmi Centra Biotech, 2) Tokopedia - Centra Biotech Official, 3) E-Katalog INAPROC untuk pengadaan pemerintah, 4) Distributor resmi di seluruh Indonesia. Untuk pemesanan langsung hubungi WhatsApp 0851-9621-4187. Pastikan membeli dari sumber resmi untuk mendapat produk asli bersertifikat.',
    },
  ],
  
  simbios: [
    {
      question: 'Apa itu Simbios dan apa fungsinya?',
      answer: 'Simbios adalah pupuk hayati padat premium dari PT Centra Biotech Indonesia yang mengandung mikoriza VAM (Vesicular Arbuscular Mycorrhiza) dan Trichoderma sp. Fungsinya: memperluas jangkauan akar hingga 10x lipat, meningkatkan penyerapan fosfor hingga 40%, membuat tanaman lebih tahan kekeringan dan stress air, serta memperbaiki struktur tanah.',
    },
    {
      question: 'Berapa harga Simbios per kemasan?',
      answer: 'Harga Simbios kemasan 5kg mulai dari Rp 175.000. Tersedia juga kemasan 25kg untuk kebutuhan perkebunan dengan harga lebih ekonomis. Hubungi 0851-9621-4187 untuk harga grosir dan pengiriman ke seluruh Indonesia.',
    },
    {
      question: 'Simbios cocok untuk tanaman apa?',
      answer: 'Simbios sangat cocok untuk: tanaman tahunan (sawit, karet, kakao, kopi, jeruk, durian), tanaman hortikultura, dan tanaman yang mengalami stress kekeringan. Sangat efektif di lahan marginal, tanah berpasir, dan daerah dengan ketersediaan air terbatas.',
    },
    {
      question: 'Bagaimana dosis Simbios per hektar?',
      answer: 'Dosis Simbios: untuk tanaman tahunan 200-500 gram per pohon, aplikasikan di sekitar perakaran saat tanam atau pemupukan dasar. Untuk tanaman semusim 100-150 kg/ha, campur dengan pupuk dasar sebelum tanam. Aplikasi ulang setiap 3-6 bulan untuk hasil maksimal.',
    },
  ],
  
  biokiller: [
    {
      question: 'Apakah Bio Killer efektif membasmi wereng?',
      answer: 'Ya, Bio Killer sangat efektif membasmi wereng coklat (Nilaparvata lugens) dan wereng hijau (Nephotettix virescens). Mengandung jamur entomopatogen Beauveria bassiana dan Metarhizium anisopliae dengan konsentrasi >1×10⁸ spora/ml yang menginfeksi dan membunuh wereng dalam 3-7 hari setelah aplikasi. Bio Killer adalah insektisida hayati terbaik yang bersertifikat Kementan RI.',
    },
    {
      question: 'Apakah Bio Killer aman untuk lingkungan?',
      answer: 'Ya, Bio Killer 100% berbahan hayati alami, tidak meninggalkan residu kimia pada tanaman dan lingkungan. Aman untuk serangga menguntungkan seperti lebah, predator alami, dan musuh alami hama. Bio Killer sesuai untuk program IPM (Integrated Pest Management) dan pertanian organik bersertifikat.',
    },
    {
      question: 'Hama apa saja yang bisa dibasmi Bio Killer?',
      answer: 'Bio Killer efektif mengendalikan: wereng coklat, wereng hijau, penggerek batang padi, walang sangit, kutu daun (aphids), ulat grayak, hama pengisap, thrips, dan tungau. Sangat cocok untuk tanaman padi, sayuran, buah-buahan, dan tanaman perkebunan.',
    },
    {
      question: 'Berapa harga Bio Killer?',
      answer: 'Harga Bio Killer Rp 95.000 per liter untuk kemasan retail. Tersedia juga kemasan 5L dan 20L dengan harga lebih hemat untuk petani dan kelompok tani. Hubungi 0851-9621-4187 untuk harga grosir.',
    },
    {
      question: 'Bagaimana cara aplikasi Bio Killer?',
      answer: 'Cara aplikasi Bio Killer: 1) Campurkan 5-10 ml per liter air, 2) Semprot merata pada seluruh bagian tanaman terutama bagian bawah daun, 3) Aplikasikan sore hari (setelah jam 15.00) untuk menghindari sinar UV yang dapat mengurangi efektivitas, 4) Ulangi aplikasi setiap 5-7 hari saat serangan tinggi.',
    },
  ],
  
  blackTurbo: [
    {
      question: 'Apa itu Black Turbo dan fungsinya?',
      answer: 'Black Turbo adalah pembenah tanah premium dari PT Centra Biotech Indonesia dengan kandungan asam humat >52% dan asam fulvat >3%, tertinggi di kelasnya. Fungsinya: meningkatkan KTK (Kapasitas Tukar Kation) tanah, memperbaiki struktur tanah, meningkatkan efisiensi pupuk hingga 30%, dan sebagai kelat hara mikro agar lebih mudah diserap tanaman.',
    },
    {
      question: 'Berapa dosis Black Turbo per hektar?',
      answer: 'Dosis Black Turbo: untuk aplikasi tanah 5-10 liter/ha dicampur dengan air, aplikasikan melalui sistem fertigasi atau kocor. Untuk foliar spray 2-3 ml per liter air. Dapat dicampur dengan pupuk lain untuk meningkatkan efektivitas penyerapan.',
    },
    {
      question: 'Black Turbo cocok untuk tanah jenis apa?',
      answer: 'Black Turbo sangat efektif untuk semua jenis tanah, terutama: tanah berpasir (meningkatkan daya ikat air), tanah liat (memperbaiki aerasi dan drainase), tanah salin (mengurangi dampak garam), dan tanah yang telah terdegradasi akibat penggunaan pupuk kimia berlebihan.',
    },
  ],
  
  biokalsi: [
    {
      question: 'Apa keunggulan Biokalsi dibanding dolomit biasa?',
      answer: 'Biokalsi adalah dolomit super halus mesh 100 dengan kandungan CaO >30% dan MgO >18%. Keunggulannya: kehalusan tinggi membuat reaksi dengan tanah lebih cepat (2-3x lebih cepat dari dolomit biasa), penyerapan Ca dan Mg oleh tanaman lebih optimal, dan distribusi merata saat aplikasi. Bersertifikat Kementan RI.',
    },
    {
      question: 'Berapa dosis Biokalsi untuk menaikkan pH tanah?',
      answer: 'Dosis Biokalsi tergantung tingkat keasaman tanah: pH 4-4.5 gunakan 3-4 ton/ha, pH 4.5-5 gunakan 2-3 ton/ha, pH 5-5.5 gunakan 1-2 ton/ha. Aplikasikan 2-4 minggu sebelum tanam, campur merata dengan tanah pada kedalaman 15-20 cm.',
    },
    {
      question: 'Biokalsi cocok untuk tanaman apa?',
      answer: 'Biokalsi cocok untuk semua tanaman yang membutuhkan kalsium dan magnesium tinggi: sawit, kakao, karet, sayuran (cabai, tomat, kubis), buah-buahan, dan tanaman yang tumbuh di tanah asam atau gambut. Sangat penting untuk mencegah defisiensi Ca (busuk ujung buah) dan Mg (daun menguning).',
    },
    {
      question: 'Berapa harga Biokalsi per karung?',
      answer: 'Harga Biokalsi Rp 45.000 per karung 25kg (paling ekonomis di kelasnya). Untuk pembelian partai besar (ton), tersedia harga khusus. Hubungi 0851-9621-4187 untuk penawaran harga grosir dan pengiriman.',
    },
  ],
  
  biojagat: [
    {
      question: 'Apa itu Biojagat dan manfaatnya?',
      answer: 'Biojagat adalah pupuk hayati cair dari PT Centra Biotech Indonesia yang mengandung bakteri Azotobacter chroococcum (penambat nitrogen dari udara) dan Bacillus megaterium (pelarut fosfat terikat di tanah). Manfaatnya: mengurangi kebutuhan pupuk urea hingga 25%, meningkatkan ketersediaan fosfor, dan memperbaiki kesehatan tanah secara alami.',
    },
    {
      question: 'Biojagat bisa mengurangi pupuk kimia berapa persen?',
      answer: 'Dengan penggunaan Biojagat secara teratur, Anda dapat mengurangi pupuk urea 20-25% dan pupuk SP-36 15-20% tanpa mengurangi hasil panen. Bahkan banyak petani melaporkan hasil panen meningkat 10-15% karena kesehatan tanah yang lebih baik.',
    },
  ],
  
  rajabio: [
    {
      question: 'Mengapa Rajabio disebut pupuk organik premium?',
      answer: 'Rajabio memiliki kandungan C-Organik >15%, jauh di atas standar minimum SNI pupuk organik cair (6%). Terbuat dari fermentasi kotoran ternak sapi dan ayam dengan mikroba dekomposer pilihan selama 90+ hari, menghasilkan nutrisi lengkap (N, P, K, hara mikro) dalam bentuk yang langsung tersedia untuk tanaman. Rating 4.9/5 dari 2.500+ ulasan - tertinggi di kategorinya.',
    },
    {
      question: 'Berapa harga Rajabio dan dimana belinya?',
      answer: 'Harga Rajabio: kemasan 1L Rp 62.000, kemasan 5L Rp 250.000, kemasan 25L Rp 1.100.000. Beli di: Shopee (https://shopee.co.id/Rajabio), Tokopedia, E-Katalog INAPROC untuk pengadaan pemerintah, atau langsung WhatsApp 0851-9621-4187.',
    },
    {
      question: 'Rajabio bisa meningkatkan hasil panen berapa persen?',
      answer: 'Berdasarkan uji lapang di 10.000+ hektar lahan, Rajabio terbukti meningkatkan hasil panen: padi +35-40%, jagung +30-35%, sayuran +25-40%, cabai +30-45%. Hasil ini dicapai dengan kombinasi perbaikan struktur tanah, peningkatan aktivitas mikroba tanah, dan penyediaan nutrisi slow-release.',
    },
    {
      question: 'Bagaimana dosis Rajabio untuk padi?',
      answer: 'Dosis Rajabio untuk padi: 3-5 liter/ha, aplikasikan setiap 2 minggu sekali mulai umur 14 HST hingga fase generatif. Campurkan dengan air perbandingan 1:100, aplikasikan melalui knapsack sprayer atau sistem fertigasi. Untuk hasil maksimal, kombinasikan dengan Flora One untuk pencegahan penyakit.',
    },
    {
      question: 'Apakah Rajabio terdaftar di E-Katalog pemerintah?',
      answer: 'Ya, Rajabio terdaftar di E-Katalog INAPROC (https://katalog.inaproc.id/search?keyword=rajabio) sehingga dapat digunakan untuk pengadaan pemerintah, program bantuan pertanian, dan proyek-proyek pertanian. Memenuhi persyaratan TKDN dan bersertifikat Kementan RI.',
    },
  ],
};

/**
 * Generate Product FAQ Schema for a specific CBI product
 */
export function generateProductFAQSchema(productKey: keyof typeof CBI_PRODUCT_FAQS) {
  const faqs = CBI_PRODUCT_FAQS[productKey];
  if (!faqs || faqs.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate enhanced Product schema with certifications and reviews
 */
export function generateEnhancedProductSchema(data: ProductData & {
  certifications?: Array<{
    name: string;
    issuedBy: string;
    identifier?: string;
  }>;
  keywords?: string[];
}) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}${data.url}#product`,
    name: data.name,
    description: data.description,
    image: Array.isArray(data.image) 
      ? data.image.map(img => getFullImageUrl(img))
      : [getFullImageUrl(data.image)],
    url: getFullUrl(data.url),
    sku: data.sku,
    mpn: data.mpn,
    gtin14: data.gtin14,
    brand: {
      '@type': 'Brand',
      name: data.brand || 'Centra Biotech Indonesia',
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'PT Centra Biotech Indonesia',
    },
    category: data.category,
    // Certifications (important for agri products)
    hasCertification: data.certifications?.map(cert => ({
      '@type': 'Certification',
      name: cert.name,
      issuedBy: {
        '@type': 'Organization',
        name: cert.issuedBy,
      },
      certificationIdentification: cert.identifier,
    })),
    // Offers
    offers: data.offers ? {
      '@type': 'Offer',
      url: getFullUrl(data.url),
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency || 'IDR',
      availability: `https://schema.org/${data.offers.availability || 'InStock'}`,
      itemCondition: `https://schema.org/${data.offers.itemCondition || 'NewCondition'}`,
      priceValidUntil: data.offers.priceValidUntil,
      seller: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'PT Centra Biotech Indonesia',
      },
      shippingDetails: data.offers.shippingDetails ? {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: data.offers.shippingDetails.shippingRate.value,
          currency: data.offers.shippingDetails.shippingRate.currency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: data.offers.shippingDetails.shippingDestination,
        },
        deliveryTime: data.offers.shippingDetails.deliveryTime ? {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: data.offers.shippingDetails.deliveryTime.minDays,
            maxValue: data.offers.shippingDetails.deliveryTime.maxDays,
            unitCode: 'DAY',
          },
        } : undefined,
      } : undefined,
    } : undefined,
    // Aggregate Rating
    aggregateRating: data.aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: data.aggregateRating.bestRating || 5,
      worstRating: data.aggregateRating.worstRating || 1,
    } : undefined,
    // Reviews
    review: data.review?.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: r.datePublished,
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.reviewRating.ratingValue,
        bestRating: r.reviewRating.bestRating || 5,
      },
    })),
    // Additional properties
    additionalProperty: data.additionalProperty?.map(prop => ({
      '@type': 'PropertyValue',
      name: prop.name,
      value: prop.value,
    })),
    // Keywords for AI understanding
    keywords: data.keywords?.join(', '),
  };
}

/**
 * Generate Video Schema for product tutorial/demo videos
 */
export function generateProductVideoSchema(data: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601 format e.g., "PT5M30S"
  contentUrl?: string;
  embedUrl?: string;
  productName?: string;
  transcript?: string;
  hasPart?: Array<{
    name: string;
    startOffset: number;
    endOffset: number;
    url: string;
  }>;
}) {
  const baseUrl = getBaseUrl();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: getFullImageUrl(data.thumbnailUrl),
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: data.contentUrl,
    embedUrl: data.embedUrl,
    // Publisher
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-only.png`,
      },
    },
    // Transcript for accessibility and SEO
    transcript: data.transcript,
    // Video clips/chapters
    hasPart: data.hasPart?.map(part => ({
      '@type': 'Clip',
      name: part.name,
      startOffset: part.startOffset,
      endOffset: part.endOffset,
      url: part.url,
    })),
    // Interaction statistics (can be updated dynamically)
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: 0, // Update with actual view count
    },
    // About the product
    about: data.productName ? {
      '@type': 'Product',
      name: data.productName,
    } : undefined,
    // Educational use
    educationalUse: 'Tutorial',
    learningResourceType: 'Video',
    inLanguage: 'id',
  };
}

/**
 * Generate comprehensive product page schemas combining Product, FAQ, and Video
 */
export function generateComprehensiveProductPageSchemas(data: {
  product: ProductData & {
    certifications?: Array<{ name: string; issuedBy: string; identifier?: string }>;
    keywords?: string[];
  };
  faqKey?: keyof typeof CBI_PRODUCT_FAQS;
  video?: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    embedUrl?: string;
  };
  breadcrumbs: BreadcrumbItem[];
  locale?: string;
}) {
  const schemas: Array<Record<string, unknown>> = [];
  
  // 1. Product Schema
  schemas.push(generateEnhancedProductSchema(data.product));
  
  // 2. Breadcrumb Schema
  schemas.push(generateBreadcrumbSchema(data.breadcrumbs));
  
  // 3. FAQ Schema (if available for this product)
  if (data.faqKey && CBI_PRODUCT_FAQS[data.faqKey]) {
    const faqSchema = generateProductFAQSchema(data.faqKey);
    if (faqSchema) schemas.push(faqSchema);
  }
  
  // 4. Video Schema (if video data provided)
  if (data.video) {
    schemas.push(generateProductVideoSchema({
      ...data.video,
      productName: data.product.name,
    }));
  }
  
  // 5. WebPage Schema
  schemas.push(generateWebPageSchema({
    name: `${data.product.name} | ${SITE_CONFIG.name}`,
    description: data.product.description,
    url: data.product.url,
  }));
  
  return schemas;
}