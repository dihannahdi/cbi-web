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
  brand?: string;
  category?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
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
export function generateArticleSchema(data: ArticleData) {
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
    sku: data.sku,
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
    offers: data.offers ? {
      '@type': 'Offer',
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency || 'IDR',
      availability: `https://schema.org/${data.offers.availability || 'InStock'}`,
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
    aggregateRating: data.aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: data.aggregateRating.bestRating || 5,
      worstRating: data.aggregateRating.worstRating || 1,
    } : undefined,
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