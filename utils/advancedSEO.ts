/**
 * ADVANCED SEO UTILITIES - Comprehensive Google Search Central Implementation
 * Following ALL Google Search Central Best Practices for Maximum SERP Performance
 * 
 * Features:
 * - ItemList for product carousels and article lists
 * - SiteNavigationElement for site structure
 * - Speakable schema for voice search optimization
 * - CollectionPage for listing pages
 * - HowTo schema for guides
 * - Course schema for educational content
 * - Event schema for webinars/events
 * - Software Application schema
 * - Complete meta robots directives
 * - Core Web Vitals optimization hints
 * 
 * PT Centra Biotech Indonesia - Indonesia's Leading Agro-Biotech Innovation Hub
 */

import { SITE_CONFIG } from './seo';

// ============================================================================
// ITEM LIST SCHEMA (For Carousels and Lists)
// Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/carousel
// ============================================================================

export interface ItemListItem {
  position: number;
  name: string;
  url: string;
  image?: string;
  description?: string;
  datePublished?: string;
  author?: string;
}

export interface ProductListItem extends ItemListItem {
  price?: number;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

/**
 * Generate ItemList schema for carousels (articles, products, etc.)
 * Critical for rich results carousel display
 */
export function generateItemListSchema(
  items: ItemListItem[],
  listType: 'Article' | 'Product' | 'Recipe' | 'Course' | 'Event' = 'Article'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      item: {
        '@type': listType,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
        ...(item.image && { 
          image: item.image.startsWith('http') ? item.image : `${SITE_CONFIG.url}${item.image}` 
        }),
        ...(item.description && { description: item.description }),
        ...(item.datePublished && { datePublished: item.datePublished }),
        ...(item.author && { 
          author: { '@type': 'Organization', name: item.author }
        }),
      },
    })),
    numberOfItems: items.length,
  };
}

/**
 * Generate Product ItemList for e-commerce carousels
 */
export function generateProductItemListSchema(items: ProductListItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
        image: item.image?.startsWith('http') ? item.image : `${SITE_CONFIG.url}${item.image}`,
        description: item.description,
        brand: {
          '@type': 'Brand',
          name: item.brand || SITE_CONFIG.name,
        },
        ...(item.sku && { sku: item.sku }),
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: item.priceCurrency || 'IDR',
            availability: `https://schema.org/${item.availability || 'InStock'}`,
            seller: {
              '@type': 'Organization',
              name: SITE_CONFIG.name,
            },
          },
        }),
        ...(item.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.rating.ratingValue,
            reviewCount: item.rating.reviewCount,
          },
        }),
      },
    })),
    numberOfItems: items.length,
  };
}

// ============================================================================
// COLLECTION PAGE SCHEMA (For Listing Pages)
// ============================================================================

export interface CollectionPageConfig {
  name: string;
  description: string;
  url: string;
  image?: string;
  items?: ItemListItem[];
  breadcrumb?: Array<{ name: string; url: string }>;
  mainEntity?: {
    type: string;
    items: ItemListItem[];
  };
}

/**
 * Generate CollectionPage schema for listing pages (blog index, product catalog, etc.)
 */
export function generateCollectionPageSchema(config: CollectionPageConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: config.name,
    description: config.description,
    url: config.url.startsWith('http') ? config.url : `${SITE_CONFIG.url}${config.url}`,
    ...(config.image && { 
      image: config.image.startsWith('http') ? config.image : `${SITE_CONFIG.url}${config.image}` 
    }),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
    },
    ...(config.mainEntity && {
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: config.mainEntity.items.length,
        itemListElement: config.mainEntity.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': config.mainEntity!.type,
            name: item.name,
            url: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
          },
        })),
      },
    }),
  };
}

// ============================================================================
// SPEAKABLE SCHEMA (For Voice Search Optimization)
// Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/speakable
// ============================================================================

export interface SpeakableConfig {
  cssSelectors?: string[];
  xpaths?: string[];
}

/**
 * Generate Speakable schema for voice assistant optimization
 * Targets key content sections for Google Assistant / Voice Search
 */
export function generateSpeakableSchema(config?: SpeakableConfig) {
  return {
    '@type': 'SpeakableSpecification',
    cssSelector: config?.cssSelectors || [
      'article > h1',
      'article > h2',
      'article > p:first-of-type',
      '.summary',
      '.key-points',
      '.faq-answer',
    ],
    ...(config?.xpaths && { xpath: config.xpaths }),
  };
}

// ============================================================================
// SITE NAVIGATION ELEMENT SCHEMA
// ============================================================================

export interface NavigationItem {
  name: string;
  url: string;
  children?: NavigationItem[];
}

/**
 * Generate SiteNavigationElement schema for site structure
 */
export function generateSiteNavigationSchema(items: NavigationItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    hasPart: items.map((item) => ({
      '@type': 'SiteNavigationElement',
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
      ...(item.children && {
        hasPart: item.children.map((child) => ({
          '@type': 'SiteNavigationElement',
          name: child.name,
          url: child.url.startsWith('http') ? child.url : `${SITE_CONFIG.url}${child.url}`,
        })),
      }),
    })),
  };
}

// ============================================================================
// HOW-TO SCHEMA (For Guides and Tutorials)
// Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/how-to
// ============================================================================

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToConfig {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
  estimatedCost?: {
    currency: string;
    value: number;
  };
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
}

/**
 * Generate HowTo schema for guides, tutorials, and instructions
 */
export function generateHowToSchema(config: HowToConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: config.name,
    description: config.description,
    ...(config.image && {
      image: config.image.startsWith('http') ? config.image : `${SITE_CONFIG.url}${config.image}`,
    }),
    ...(config.totalTime && { totalTime: config.totalTime }),
    ...(config.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: config.estimatedCost.currency,
        value: config.estimatedCost.value,
      },
    }),
    ...(config.supply && {
      supply: config.supply.map((s) => ({
        '@type': 'HowToSupply',
        name: s,
      })),
    }),
    ...(config.tool && {
      tool: config.tool.map((t) => ({
        '@type': 'HowToTool',
        name: t,
      })),
    }),
    step: config.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: step.image.startsWith('http') ? step.image : `${SITE_CONFIG.url}${step.image}`,
      }),
      ...(step.url && {
        url: step.url.startsWith('http') ? step.url : `${SITE_CONFIG.url}${step.url}`,
      }),
    })),
  };
}

// ============================================================================
// COURSE SCHEMA (For Educational Content)
// ============================================================================

export interface CourseConfig {
  name: string;
  description: string;
  provider: string;
  url?: string;
  image?: string;
  duration?: string;
  educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  inLanguage?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability?: string;
  };
}

/**
 * Generate Course schema for educational content
 */
export function generateCourseSchema(config: CourseConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: config.name,
    description: config.description,
    provider: {
      '@type': 'Organization',
      name: config.provider || SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url,
    },
    ...(config.url && {
      url: config.url.startsWith('http') ? config.url : `${SITE_CONFIG.url}${config.url}`,
    }),
    ...(config.image && {
      image: config.image.startsWith('http') ? config.image : `${SITE_CONFIG.url}${config.image}`,
    }),
    ...(config.duration && { timeRequired: config.duration }),
    ...(config.educationalLevel && { educationalLevel: config.educationalLevel }),
    ...(config.inLanguage && { inLanguage: config.inLanguage }),
    ...(config.offers && {
      offers: {
        '@type': 'Offer',
        price: config.offers.price,
        priceCurrency: config.offers.priceCurrency,
        availability: `https://schema.org/${config.offers.availability || 'InStock'}`,
      },
    }),
  };
}

// ============================================================================
// EVENT SCHEMA (For Webinars, Workshops, etc.)
// ============================================================================

export interface EventConfig {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    type: 'Place' | 'VirtualLocation';
    name?: string;
    address?: string;
    url?: string;
  };
  image?: string;
  performer?: string;
  organizer?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability?: string;
    url?: string;
    validFrom?: string;
  };
  eventStatus?: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
  eventAttendanceMode?: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
}

/**
 * Generate Event schema for webinars, workshops, and events
 */
export function generateEventSchema(config: EventConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: config.name,
    description: config.description,
    startDate: config.startDate,
    ...(config.endDate && { endDate: config.endDate }),
    ...(config.image && {
      image: config.image.startsWith('http') ? config.image : `${SITE_CONFIG.url}${config.image}`,
    }),
    ...(config.eventStatus && { eventStatus: `https://schema.org/${config.eventStatus}` }),
    ...(config.eventAttendanceMode && { 
      eventAttendanceMode: `https://schema.org/${config.eventAttendanceMode}` 
    }),
    ...(config.location && {
      location: config.location.type === 'VirtualLocation'
        ? {
            '@type': 'VirtualLocation',
            url: config.location.url || SITE_CONFIG.url,
          }
        : {
            '@type': 'Place',
            name: config.location.name || SITE_CONFIG.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: config.location.address || SITE_CONFIG.address.streetAddress,
              addressLocality: SITE_CONFIG.address.addressLocality,
              addressRegion: SITE_CONFIG.address.addressRegion,
              postalCode: SITE_CONFIG.address.postalCode,
              addressCountry: SITE_CONFIG.address.addressCountry,
            },
          },
    }),
    organizer: {
      '@type': 'Organization',
      name: config.organizer || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    ...(config.performer && {
      performer: {
        '@type': 'Organization',
        name: config.performer,
      },
    }),
    ...(config.offers && {
      offers: {
        '@type': 'Offer',
        price: config.offers.price,
        priceCurrency: config.offers.priceCurrency,
        availability: `https://schema.org/${config.offers.availability || 'InStock'}`,
        ...(config.offers.url && { url: config.offers.url }),
        ...(config.offers.validFrom && { validFrom: config.offers.validFrom }),
      },
    }),
  };
}

// ============================================================================
// PROFESSIONAL SERVICE SCHEMA (For Maklon/Contract Manufacturing)
// ============================================================================

export interface ProfessionalServiceConfig {
  name: string;
  description: string;
  serviceType: string;
  provider?: string;
  areaServed?: string[];
  url?: string;
  image?: string;
  priceRange?: string;
  hasOfferCatalog?: {
    name: string;
    itemListElement: Array<{
      name: string;
      description: string;
    }>;
  };
}

/**
 * Generate ProfessionalService schema for B2B services like maklon
 */
export function generateProfessionalServiceSchema(config: ProfessionalServiceConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: config.name,
    description: config.description,
    serviceType: config.serviceType,
    provider: {
      '@type': 'Organization',
      name: config.provider || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'sales',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    },
    ...(config.areaServed && {
      areaServed: config.areaServed.map((area) => ({
        '@type': 'Country',
        name: area,
      })),
    }),
    ...(config.url && {
      url: config.url.startsWith('http') ? config.url : `${SITE_CONFIG.url}${config.url}`,
    }),
    ...(config.image && {
      image: config.image.startsWith('http') ? config.image : `${SITE_CONFIG.url}${config.image}`,
    }),
    ...(config.priceRange && { priceRange: config.priceRange }),
    ...(config.hasOfferCatalog && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: config.hasOfferCatalog.name,
        itemListElement: config.hasOfferCatalog.itemListElement.map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            description: item.description,
          },
        })),
      },
    }),
  };
}

// ============================================================================
// ENHANCED ROBOTS META DIRECTIVES
// Google Search Central: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
// ============================================================================

export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
  notranslate?: boolean;
  noimageindex?: boolean;
  unavailableAfter?: string; // ISO 8601 date
}

/**
 * Generate comprehensive robots meta tag content
 */
export function generateRobotsContent(config: RobotsConfig = {}): string {
  const directives: string[] = [];

  // Index/noindex
  if (config.index === false) {
    directives.push('noindex');
  } else {
    directives.push('index');
  }

  // Follow/nofollow
  if (config.follow === false) {
    directives.push('nofollow');
  } else {
    directives.push('follow');
  }

  // Snippet control (critical for rich results)
  if (config.nosnippet) {
    directives.push('nosnippet');
  } else if (config.maxSnippet !== undefined) {
    directives.push(`max-snippet:${config.maxSnippet}`);
  } else {
    // Default: unlimited snippets for best rich results
    directives.push('max-snippet:-1');
  }

  // Image preview control
  if (config.maxImagePreview) {
    directives.push(`max-image-preview:${config.maxImagePreview}`);
  } else {
    // Default: large image previews for visual search results
    directives.push('max-image-preview:large');
  }

  // Video preview control
  if (config.maxVideoPreview !== undefined) {
    directives.push(`max-video-preview:${config.maxVideoPreview}`);
  } else {
    // Default: unlimited video previews
    directives.push('max-video-preview:-1');
  }

  // Archive control
  if (config.noarchive) {
    directives.push('noarchive');
  }

  // Translation control
  if (config.notranslate) {
    directives.push('notranslate');
  }

  // Image index control
  if (config.noimageindex) {
    directives.push('noimageindex');
  }

  // Unavailable after date
  if (config.unavailableAfter) {
    directives.push(`unavailable_after:${config.unavailableAfter}`);
  }

  return directives.join(', ');
}

/**
 * Generate optimal robots meta object for Next.js Metadata
 */
export function generateOptimalRobotsMeta(options?: {
  noindex?: boolean;
  nofollow?: boolean;
}) {
  return {
    index: options?.noindex !== true,
    follow: options?.nofollow !== true,
    nocache: false,
    googleBot: {
      index: options?.noindex !== true,
      follow: options?.nofollow !== true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  };
}

// ============================================================================
// ENHANCED METADATA GENERATOR
// ============================================================================

export interface EnhancedMetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  locale?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate enhanced metadata with all Google-recommended properties
 */
export function generateEnhancedMetadata(config: EnhancedMetadataConfig) {
  const fullUrl = config.url.startsWith('http') ? config.url : `${SITE_CONFIG.url}${config.url}`;
  const fullImage = config.image
    ? config.image.startsWith('http')
      ? config.image
      : `${SITE_CONFIG.url}${config.image}`
    : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  const isIndonesian = config.locale === 'id' || config.locale === 'id_ID';

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords || SITE_CONFIG.keywords,
    authors: config.author ? [{ name: config.author }] : [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    robots: generateOptimalRobotsMeta({
      noindex: config.noindex,
      nofollow: config.nofollow,
    }),
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: config.title,
          type: 'image/jpeg',
        },
      ],
      locale: isIndonesian ? 'id_ID' : 'en_US',
      alternateLocale: isIndonesian ? ['en_US'] : ['id_ID'],
      type: config.type || 'website',
      ...(config.type === 'article' && {
        publishedTime: config.publishedTime,
        modifiedTime: config.modifiedTime,
        authors: config.author ? [config.author] : undefined,
        section: config.section,
        tags: config.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [fullImage],
      creator: SITE_CONFIG.twitter,
      site: SITE_CONFIG.twitter,
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'id': fullUrl.replace('/en/', '/id/'),
        'en': fullUrl.replace('/id/', '/en/'),
        'x-default': fullUrl.includes('/id/') ? fullUrl : fullUrl.replace('/en/', '/id/'),
      },
    },
    verification: {
      google: SITE_CONFIG.googleSiteVerification,
    },
    category: config.section,
  };
}

// ============================================================================
// PRELOAD HINTS FOR CORE WEB VITALS
// ============================================================================

export interface PreloadConfig {
  criticalImages?: string[];
  criticalFonts?: string[];
  criticalStyles?: string[];
  criticalScripts?: string[];
  dnsPreconnect?: string[];
}

/**
 * Generate link preload hints for Core Web Vitals optimization
 */
export function generatePreloadHints(config: PreloadConfig): string[] {
  const hints: string[] = [];

  // DNS Preconnect for third-party domains
  if (config.dnsPreconnect) {
    config.dnsPreconnect.forEach((domain) => {
      hints.push(`<link rel="preconnect" href="${domain}" crossorigin>`);
      hints.push(`<link rel="dns-prefetch" href="${domain}">`);
    });
  }

  // Preload critical images (LCP optimization)
  if (config.criticalImages) {
    config.criticalImages.forEach((image) => {
      const type = image.endsWith('.webp')
        ? 'image/webp'
        : image.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg';
      hints.push(`<link rel="preload" href="${image}" as="image" type="${type}">`);
    });
  }

  // Preload critical fonts
  if (config.criticalFonts) {
    config.criticalFonts.forEach((font) => {
      const type = font.endsWith('.woff2')
        ? 'font/woff2'
        : font.endsWith('.woff')
        ? 'font/woff'
        : 'font/ttf';
      hints.push(`<link rel="preload" href="${font}" as="font" type="${type}" crossorigin>`);
    });
  }

  // Preload critical styles
  if (config.criticalStyles) {
    config.criticalStyles.forEach((style) => {
      hints.push(`<link rel="preload" href="${style}" as="style">`);
    });
  }

  // Preload critical scripts
  if (config.criticalScripts) {
    config.criticalScripts.forEach((script) => {
      hints.push(`<link rel="preload" href="${script}" as="script">`);
    });
  }

  return hints;
}

/**
 * Get recommended DNS preconnect domains for CBI website
 */
export function getRecommendedPreconnects(): string[] {
  return [
    'https://backend.centrabiotechindonesia.com', // Strapi CMS
    'https://www.googletagmanager.com', // GTM
    'https://www.google-analytics.com', // GA
    'https://fonts.googleapis.com', // Google Fonts
    'https://fonts.gstatic.com', // Google Fonts assets
  ];
}

// ============================================================================
// SEARCHBOX / SITELINKS SEARCH BOX SCHEMA
// Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
// ============================================================================

/**
 * Generate WebSite schema with SearchAction for sitelinks search box
 */
export function generateWebsiteWithSearchSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: ['id-ID', 'en-US'],
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_CONFIG.url}/id/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
        width: 200,
        height: 200,
      },
    },
  };
}

// ============================================================================
// COMPLETE ORGANIZATION SCHEMA WITH ALL PROPERTIES
// ============================================================================

/**
 * Generate comprehensive Organization schema with all Google-recommended properties
 */
export function generateComprehensiveOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.shortName, SITE_CONFIG.legalName],
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_CONFIG.url}/#logo`,
      url: `${SITE_CONFIG.url}${SITE_CONFIG.logoFull}`,
      contentUrl: `${SITE_CONFIG.url}${SITE_CONFIG.logoFull}`,
      width: 300,
      height: 100,
      caption: SITE_CONFIG.name,
    },
    image: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
      width: 1200,
      height: 630,
    },
    description: SITE_CONFIG.description,
    slogan: SITE_CONFIG.tagline,
    foundingDate: '2011',
    foundingLocation: {
      '@type': 'Place',
      name: 'Klaten, Central Java, Indonesia',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.7174,
      longitude: 110.6587,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.whatsapp,
        contactType: 'sales',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    ],
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    sameAs: [
      SITE_CONFIG.facebook,
      SITE_CONFIG.instagram,
      SITE_CONFIG.linkedin,
      SITE_CONFIG.youtube,
    ],
    knowsAbout: [
      'Biofertilizer',
      'Organic Fertilizer',
      'Contract Manufacturing',
      'Agricultural Biotechnology',
      'Pupuk Hayati',
      'Pupuk Organik',
      'Maklon Pupuk',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Produk & Layanan Centra Biotech Indonesia',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Produk Pertanian',
          itemListElement: SITE_CONFIG.flagshipProducts.map((product) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: product.name,
              description: product.type,
            },
          })),
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Jasa Maklon Pupuk',
            description: 'Contract manufacturing services for biofertilizers and organic fertilizers',
          },
        },
      ],
    },
    award: SITE_CONFIG.credentials.certifications,
    parentOrganization: {
      '@type': 'Organization',
      name: 'PT Centra Biotech Indonesia',
      legalName: 'PT Centra Biotech Indonesia',
    },
  };
}

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export const SEO_DEFAULTS = {
  maxSnippet: -1,
  maxImagePreview: 'large' as const,
  maxVideoPreview: -1,
};

export default {
  generateItemListSchema,
  generateProductItemListSchema,
  generateCollectionPageSchema,
  generateSpeakableSchema,
  generateSiteNavigationSchema,
  generateHowToSchema,
  generateCourseSchema,
  generateEventSchema,
  generateProfessionalServiceSchema,
  generateRobotsContent,
  generateOptimalRobotsMeta,
  generateEnhancedMetadata,
  generatePreloadHints,
  getRecommendedPreconnects,
  generateWebsiteWithSearchSchema,
  generateComprehensiveOrganizationSchema,
};
