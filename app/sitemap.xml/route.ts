/**
 * Sitemap Index Route Handler
 * 
 * Google recommends using a sitemap index when you have:
 * - More than 50,000 URLs
 * - Sitemap files larger than 50MB
 * - Logically separate groups of content
 * 
 * This creates a master sitemap index that references all sub-sitemaps
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps
 */

import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';

/**
 * Generate Sitemap Index XML following Google's protocol
 * References all sub-sitemaps organized by content type
 */
export async function GET() {
  const currentDate = new Date().toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-static.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-products.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-news.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
