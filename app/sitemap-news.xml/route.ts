/**
 * News Articles Sitemap
 * 
 * Generates XML sitemap for all news articles
 * News articles updated weekly, medium-high priority for SEO
 */

import { NextResponse } from 'next/server';
import { i18n } from '@/i18n-config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';
const API_URL = process.env.NEXT_PUBLIC_URL_API || 'https://cbi-backend.my.id';
const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

interface StrapiResponse<T> {
  data: T[];
}

interface NewsItem {
  id: number;
  slug?: string;
  documentId?: string;
  title?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
  locale?: string;
}

/**
 * Fetch news from Strapi CMS
 */
async function fetchNews(): Promise<NewsItem[]> {
  try {
    // Fetch from /api/articles endpoint with Indonesian locale
    const response = await fetch(
      `${API_URL}/api/articles?locale=id&pagination[pageSize]=100`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn(`News sitemap: Failed to fetch articles, status: ${response.status}`);
      return [];
    }

    const json: StrapiResponse<NewsItem> = await response.json();
    return json.data || [];
  } catch (error) {
    console.warn('News sitemap: Error fetching articles:', error);
    return [];
  }
}

/**
 * Get last modified date
 */
function getLastModified(item: NewsItem): string {
  const date = item.updatedAt || item.publishedAt || item.createdAt;
  return date ? new Date(date).toISOString() : new Date().toISOString();
}

/**
 * Generate hreflang alternates
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
  
  alternates += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${defaultLocale}${path}"/>`;
  
  return alternates;
}

/**
 * Create news entry with Google News sitemap extensions
 */
function createNewsEntry(news: NewsItem): string {
  const slug = news.slug || news.documentId || String(news.id);
  const path = `/news/${slug}`;
  const lastModified = getLastModified(news);
  const publicationDate = news.publishedAt || news.createdAt || new Date().toISOString();
  const title = news.title || 'News Article';
  const locale = news.locale || 'id';
  const language = locale === 'en' ? 'en' : 'id';

  // News sitemap should only include the canonical URL, not all locales
  // Use the article's actual locale
  return `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>
    <news:news>
      <news:publication>
        <news:name>Centra Biotech Indonesia</news:name>
        <news:language>${language}</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
    </news:news>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const news = await fetchNews();
  
  // Generate news entries only if there are articles
  const newsEntries = news.length > 0 
    ? news.map(createNewsEntry).join('') 
    : `
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsEntries}
</urlset>`;

  return new NextResponse(newsSitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
