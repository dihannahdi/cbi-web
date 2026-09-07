/**
 * Blog Articles Sitemap
 * 
 * Generates XML sitemap for all blog articles
 * Blog articles updated weekly, medium-high priority for SEO
 */

import { NextResponse } from 'next/server';
import { i18n } from '@/i18n-config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';
const API_URL = process.env.NEXT_PUBLIC_URL_API || 'https://backend.centrabiotechindonesia.com';
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
 * Fetch blogs from Strapi CMS - both Indonesian and English locales with pagination
 */
async function fetchBlogs(): Promise<BlogItem[]> {
  const allBlogs: BlogItem[] = [];
  
  for (const locale of locales) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      try {
        const response = await fetch(
          `${API_URL}/api/blogs?locale=${locale}&pagination[page]=${page}&pagination[pageSize]=100`,
          {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          console.warn(`Blog sitemap: Failed to fetch ${locale} blogs page ${page}, status: ${response.status}`);
          break;
        }

        const json = await response.json();
        if (json.data && json.data.length > 0) {
          allBlogs.push(...json.data.map((b: BlogItem) => ({ ...b, locale })));
          const pagination = json.meta?.pagination;
          hasMore = pagination ? page < pagination.pageCount : false;
          page++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.warn(`Blog sitemap: Error fetching ${locale} blogs page ${page}:`, error);
        hasMore = false;
      }
    }
  }
  
  return allBlogs;
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
      'Cache-Control': 'public, max-age=600, s-maxage=600', // Cache for 10 minutes
    },
  });
}
