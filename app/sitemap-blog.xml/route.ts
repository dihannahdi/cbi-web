/**
 * Blog Articles Sitemap
 * 
 * Generates XML sitemap for all blog articles
 * Blog articles updated weekly, medium-high priority for SEO
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

interface BlogItem {
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
 * Fetch blogs from Strapi CMS
 */
async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    // Fetch with Indonesian locale (45 blogs)
    const response = await fetch(
      `${API_URL}/api/blogs?locale=id&pagination[pageSize]=100`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn(`Blog sitemap: Failed to fetch blogs, status: ${response.status}`);
      return [];
    }

    const json: StrapiResponse<BlogItem> = await response.json();
    return json.data || [];
  } catch (error) {
    console.warn('Blog sitemap: Error fetching blogs:', error);
    return [];
  }
}

/**
 * Get last modified date
 */
function getLastModified(item: BlogItem): string {
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
 * Create blog entry - using actual locale from Strapi
 */
function createBlogEntry(blog: BlogItem): string {
  const slug = blog.slug || blog.documentId || String(blog.id);
  const path = `/blog/${slug}`;
  const lastModified = getLastModified(blog);
  const locale = blog.locale || 'id';

  // Each blog entry should only appear once in its actual locale
  return `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
}

export async function GET() {
  const blogs = await fetchBlogs();
  const blogEntries = blogs.map(createBlogEntry).join('');

  const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${blogEntries}
</urlset>`;

  return new NextResponse(blogSitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
