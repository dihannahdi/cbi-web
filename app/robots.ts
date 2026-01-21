/**
 * Dynamic robots.txt configuration with multilingual support
 * Generates optimized robots.txt for search engine crawlers
 * Following next-intl and next-seo best practices
 */

import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default rules for all crawlers - ALLOW all Next.js assets
        userAgent: '*',
        allow: [
          '/',
          '/id/',
          '/en/',
          '/_next/static/',
          '/_next/image/',
          '/images/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_vercel/',
          '/scripts/',
        ],
      },
      {
        // Googlebot specific rules (allow all, fastest crawl)
        userAgent: 'Googlebot',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // Google-Extended for AI (ChatGPT, Gemini, etc.)
        userAgent: 'Google-Extended',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // OpenAI GPTBot for ChatGPT
        userAgent: 'GPTBot',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // Anthropic Claude Bot
        userAgent: 'ClaudeBot',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // Perplexity AI Bot
        userAgent: 'PerplexityBot',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // Bingbot with slight delay
        userAgent: 'Bingbot',
        allow: ['/', '/id/', '/en/'],
        crawlDelay: 1,
      },
      {
        // Google Images bot - allow ALL images
        userAgent: 'Googlebot-Image',
        allow: ['/', '/images/', '/_next/image/'],
        disallow: ['/admin/'],
      },
      {
        // Facebook crawler for Open Graph
        userAgent: 'facebookexternalhit',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // Twitter crawler for Twitter Cards
        userAgent: 'Twitterbot',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // LinkedIn crawler
        userAgent: 'LinkedInBot',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // WhatsApp crawler
        userAgent: 'WhatsApp',
        allow: ['/', '/id/', '/en/'],
      },
      {
        // Block aggressive crawlers
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot'],
        disallow: ['/'],
      },
    ],
    // Sitemap Index - References all sub-sitemaps organized by content type
    // Following Google's best practices for large sites with multiple content types
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
