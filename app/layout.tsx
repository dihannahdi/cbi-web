import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import MetaPixel from "@/components/common/MetaPixel";
import WebVitals from "@/components/common/WebVitals";
import { SITE_CONFIG } from "@/utils/seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  variable: "--font-plus-jakarta",
  preload: true,
  adjustFontFallback: true,
});

// IBM Plex Mono — technical/lab data (dosages, C-Organik %, certificate codes).
// Not a variable font on Google Fonts, so explicit weights are required.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  variable: "--font-ibm-plex-mono",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: '#083F19',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  applicationName: SITE_CONFIG.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  
  manifest: '/manifest.json',
  
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
    creator: SITE_CONFIG.twitter,
    site: SITE_CONFIG.twitter,
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'id-ID': `${SITE_CONFIG.url}/id`,
      'en-US': `${SITE_CONFIG.url}/en`,
      'x-default': `${SITE_CONFIG.url}/id`,
    },
  },
  
  category: 'technology',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// Global Organization Schema for all pages (Google Knowledge Panel optimization)
const globalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Corporation"],
  "@id": `${SITE_CONFIG.url}#organization`,
  name: SITE_CONFIG.name,
  legalName: SITE_CONFIG.legalName,
  alternateName: ["CBI", "Centra Biotech", "PT CBI", "Centra Biotech Indonesia"],
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_CONFIG.url}#logo`,
    url: `${SITE_CONFIG.url}/logo-only.png`,
    contentUrl: `${SITE_CONFIG.url}/logo-only.png`,
    caption: SITE_CONFIG.name,
    width: 200,
    height: 60,
  },
  image: `${SITE_CONFIG.url}/og-image.jpg`,
  foundingDate: "2011",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Klaten",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.addressLocality,
    addressRegion: SITE_CONFIG.address.addressRegion,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.7051,
    longitude: 110.6577,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: "sales",
      availableLanguage: ["Indonesian", "English"],
      areaServed: "ID",
    },
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.whatsapp,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
      contactOption: "TollFree",
    },
  ],
  sameAs: [
    SITE_CONFIG.facebook,
    SITE_CONFIG.instagram,
    SITE_CONFIG.linkedin,
    SITE_CONFIG.youtube,
    "https://shopee.co.id/centrabiotech",
    "https://katalog.inaproc.id/search?keyword=centra+biotech",
  ].filter(Boolean),
  knowsAbout: [
    "Bioteknologi Pertanian",
    "Pupuk Hayati",
    "Pupuk Organik Cair",
    "Insektisida Hayati",
    "Maklon Pupuk",
    "Contract Manufacturing Fertilizer",
    "Agricultural Biotechnology",
    "Organic Farming Indonesia",
  ],
  slogan: SITE_CONFIG.tagline,
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certificate",
      name: "Izin Edar Kementerian Pertanian RI",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certificate",
      name: "SNI 6729:2016 Pertanian Organik",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certificate",
      name: "Good Manufacturing Practice (GMP)",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 100,
  },
  naics: "325314", // Fertilizer Manufacturing
  isicV4: "2012", // Manufacture of fertilisers and nitrogen compounds
};

// Global WebSite Schema for sitelinks search box
const globalWebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.url}#website`,
  name: SITE_CONFIG.name,
  alternateName: ["Centra Biotech", "CBI Website"],
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  inLanguage: ["id-ID", "en-US"],
  publisher: {
    "@id": `${SITE_CONFIG.url}#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  const GA_MEASUREMENT_ID = "G-16L2MWL33B";
  const META_PIXEL_ID = "2243691269777677";

  return (
    <html dir="ltr" suppressHydrationWarning>
      <head>
        {/* Global Organization Schema for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalOrganizationSchema).replace(/</g, '\\u003c'),
          }}
        />
        {/* Global WebSite Schema for Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalWebsiteSchema).replace(/</g, '\\u003c'),
          }}
        />
        
        {/* ============== ULTRA-ADVANCED RESOURCE HINTS ============== */}
        {/* Critical Preconnects - Establish early connections to reduce latency */}
        <link rel="preconnect" href="https://backend.centrabiotechindonesia.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch - Resolve DNS early for non-critical resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://backend.centrabiotechindonesia.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://region1.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        
        {/* Preload Critical Resources for LCP Optimization */}
        <link 
          rel="preload" 
          href="/og-image.jpg" 
          as="image" 
          type="image/jpeg"
          fetchPriority="high"
        />
        
        {/* Modulepreload for Critical JavaScript Chunks (Next.js optimization) */}
        {/* Note: Next.js automatically handles most modulepreloads */}
        
        {/* AI/LLM Context Files */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Context" />
        
        {/* Prefetch for likely user navigation - improves perceived performance */}
        <link rel="prefetch" href="/id/product" as="document" />
        <link rel="prefetch" href="/id/about-us" as="document" />
        
        {/* Origin Trial for experimental web features (optional) */}
        {/* <meta httpEquiv="origin-trial" content="TOKEN" /> */}
        
        {/* Client Hints meta tags for responsive images */}
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
        
        {/* Feature Policy / Permissions Policy */}
        <meta 
          httpEquiv="Permissions-Policy" 
          content="accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" 
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${ibmPlexMono.variable} antialiased`}>
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        <MetaPixel pixelId={META_PIXEL_ID} />
        <WebVitals />
        {children}
        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>
  );
}
