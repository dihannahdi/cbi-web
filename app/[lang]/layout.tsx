import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { i18n, type Locale, isValidLocale, localeMetadata } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

import Navbar from "@/components/layout/navbar/index";
import Footer from "@/components/layout/footer/footer";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";
import { SITE_CONFIG } from "@/utils/seo";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  
  if (!isValidLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang);
  const localeInfo = localeMetadata[lang];
  
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`,
    },
    description: dict.metadata.description,
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
    },
    
    manifest: '/manifest.json',
    
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `${SITE_CONFIG.url}/${lang}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
      locale: localeInfo.locale,
      type: "website",
      // Add countryName for better local SEO
      countryName: lang === 'id' ? 'Indonesia' : 'Indonesia',
    },
    
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
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
    
    // Enhanced alternates with proper hreflang
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}`,
      languages: {
        'id-ID': `${SITE_CONFIG.url}/id`,
        'en-US': `${SITE_CONFIG.url}/en`,
        'x-default': `${SITE_CONFIG.url}/id`,
      },
      // Add types for better discovery
      types: {
        'application/rss+xml': `${SITE_CONFIG.url}/${lang}/feed.xml`,
      },
    },
    
    category: 'technology',
  };
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;
  
  // Validate locale
  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar lang={locale} dict={dict} />
      {children}
      <Footer lang={locale} dict={dict} />
      <WhatsAppFloat />
    </>
  );
}
