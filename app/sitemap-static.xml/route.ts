/**
 * Static Pages Sitemap
 * 
 * Contains all static/semi-static pages that don't change frequently
 * Includes homepage, about, contact, category pages, and legal pages
 * 
 * Priority levels (Google recommendation):
 * - 1.0: Homepage (most important)
 * - 0.9: Main category pages (Agriculture, Livestock, Fishery)
 * - 0.8: Key pages (About, News listing, Blog listing, Maklon listing, Product main)
 * - 0.7: Contact page
 * - 0.6: Career page
 * - 0.5: Documents, Legal pages (Privacy, Terms, Cookies)
 */

import { NextResponse } from 'next/server';
import { i18n } from '@/i18n-config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';
const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

/**
 * Generate hreflang alternates for multilingual SEO
 */
function generateAlternates(path: string): string {
  const languageCodes: Record<string, string> = {
    'id': 'id-ID',
    'en': 'en-US',
  };
  
  let alternates = '';
  locales.forEach((locale) => {
    const langCode = languageCodes[locale] || locale;
    alternates += `\n    <xhtml:link rel="alternate" hreflang="${langCode}" href="${BASE_URL}/${locale}${path}"/>`;
  });
  
  // Add x-default for default locale (SEO best practice)
  alternates += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${defaultLocale}${path}"/>`;
  
  return alternates;
}

/**
 * Create sitemap entry for each locale
 */
function createMultilingualEntry(
  path: string,
  lastModified: string,
  changeFrequency: string,
  priority: string
): string {
  let entries = '';
  
  locales.forEach((locale) => {
    entries += `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>${generateAlternates(path)}
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
  
  return entries;
}

export async function GET() {
  const currentDate = new Date().toISOString();

  const staticSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${createMultilingualEntry('', currentDate, 'daily', '1.0')}
  ${createMultilingualEntry('/about-us', currentDate, 'monthly', '0.8')}
  ${createMultilingualEntry('/contact', currentDate, 'monthly', '0.7')}
  ${createMultilingualEntry('/product', currentDate, 'weekly', '0.8')}
  ${createMultilingualEntry('/product/agriculture', currentDate, 'weekly', '0.9')}
  ${createMultilingualEntry('/product/livestock', currentDate, 'weekly', '0.9')}
  ${createMultilingualEntry('/product/fishery', currentDate, 'weekly', '0.9')}
  ${createMultilingualEntry('/news', currentDate, 'daily', '0.8')}
  ${createMultilingualEntry('/blog', currentDate, 'daily', '0.8')}
  ${createMultilingualEntry('/maklon-pupuk', currentDate, 'weekly', '0.8')}
  ${createMultilingualEntry('/career', currentDate, 'weekly', '0.6')}
  ${createMultilingualEntry('/documents', currentDate, 'monthly', '0.5')}
  ${createMultilingualEntry('/privacy-policy', currentDate, 'yearly', '0.5')}
  ${createMultilingualEntry('/terms-of-service', currentDate, 'yearly', '0.5')}
  ${createMultilingualEntry('/cookies', currentDate, 'yearly', '0.5')}
</urlset>`;

  return new NextResponse(staticSitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours (static pages)
    },
  });
}
