/**
 * Products Sitemap with Video and Image Sitemap Support
 * 
 * Generates XML sitemap for all products with image and video information
 * Following Google's Image & Video Sitemap Protocol
 * 
 * Benefits:
 * - Helps Google discover and index product images
 * - Enables video rich results in Google Search
 * - Improves visibility in Google Images and Video search
 * - Better SEO for e-commerce/product pages
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
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

interface ProductItem {
  id: number;
  slug?: string;
  documentId?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
  name?: string;
  title?: string;
  image?: {
    url?: string;
    alternativeText?: string;
    caption?: string;
  };
}

/**
 * Fetch products from Strapi CMS
 */
async function fetchProducts(): Promise<ProductItem[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/products?populate=image&pagination[pageSize]=100`,
      {
        cache: 'no-store', // Always fetch fresh data for sitemaps
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn(`Products sitemap: Failed to fetch products, status: ${response.status}`);
      return [];
    }

    const json: StrapiResponse<ProductItem> = await response.json();
    return json.data || [];
  } catch (error) {
    console.warn('Products sitemap: Error fetching products:', error);
    return [];
  }
}

/**
 * Get last modified date
 */
function getLastModified(item: ProductItem): string {
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

/**
 * Generate image sitemap entry following Google's protocol
 */
function generateImageEntry(product: ProductItem): string {
  if (!product.image || !product.image.url) {
    return '';
  }

  const imageUrl = product.image.url.startsWith('http') 
    ? product.image.url 
    : `${API_URL}${product.image.url}`;
  
  const imageTitle = escapeXml(product.image.caption || product.name || product.title || 'Product Image');
  const imageAlt = escapeXml(product.image.alternativeText || product.name || product.title || '');

  return `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${imageTitle}</image:title>
      ${imageAlt ? `<image:caption>${imageAlt}</image:caption>` : ''}
    </image:image>`;
}

/**
 * Product videos for hardcoded pages
 * Following Google Video Sitemap specification
 */
interface VideoData {
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
  thumbnailUrl: string;
  duration?: string; // ISO 8601 duration format
  description: string;
}

const productVideos: Record<string, VideoData[]> = {
  'biokiller': [
    { id: "rRbK3D_gvS4", title: "DULU BEKAS PRODUKSI BATU BATA, KINI SUDAH BERPRODUKSI LAGI BERKAT CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/rRbK3D_gvS4/maxresdefault.jpg", duration: "300", description: "Testimoni petani tentang keberhasilan menggunakan produk BIOKILLER Insektisida Hayati dari Centra Biotech Indonesia" },
    { id: "_B3pONNfGEI", title: "TESTIMONI PAK PARJAN DARI INDRAMAYU - CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/_B3pONNfGEI/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parjan dari Indramayu tentang penggunaan BIOKILLER Insektisida Hayati untuk padi" },
    { id: "IkHUqxjLuIE", title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PADI HINGGA 60%", embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/IkHUqxjLuIE/maxresdefault.jpg", duration: "240", description: "Tutorial cara efektif menekan biaya produksi padi menggunakan produk BIOKILLER dari Centra Biotech" },
    { id: "zGF2bYyClhk", title: "TESTIMONI PAK PARMAN DARI BATANG - CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/zGF2bYyClhk/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parman dari Batang tentang efektivitas BIOKILLER Insektisida Hayati" },
    { id: "7593292407202909461", title: "BIOKILLER di Lapangan #1", embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/biokiller/biokiller-cover.webp", duration: "60", description: "Video aplikasi BIOKILLER Insektisida Hayati di lapangan petani" },
    { id: "7589298285819563285", title: "BIOKILLER di Lapangan #2", embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/biokiller/biokiller-cover.webp", duration: "60", description: "Testimoni petani menggunakan BIOKILLER untuk pengendalian hama" },
    { id: "7567321822954360085", title: "BIOKILLER di Lapangan #3", embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/biokiller/biokiller-cover.webp", duration: "60", description: "Demonstrasi penggunaan BIOKILLER Insektisida Hayati di sawah" },
    { id: "7512399240962854161", title: "BIOKILLER di Lapangan #4", embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/biokiller/biokiller-cover.webp", duration: "60", description: "Hasil panen optimal dengan BIOKILLER Insektisida Hayati" }
  ],
  'floraone': [
    { id: "rRbK3D_gvS4", title: "DULU BEKAS PRODUKSI BATU BATA, KINI SUDAH BERPRODUKSI LAGI BERKAT CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/rRbK3D_gvS4/maxresdefault.jpg", duration: "300", description: "Testimoni petani tentang keberhasilan menggunakan produk FLORAONE Pupuk Hayati dari Centra Biotech Indonesia" },
    { id: "_B3pONNfGEI", title: "TESTIMONI PAK PARJAN DARI INDRAMAYU - CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/_B3pONNfGEI/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parjan dari Indramayu tentang penggunaan FLORAONE Pupuk Hayati untuk padi" },
    { id: "IkHUqxjLuIE", title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PADI HINGGA 60%", embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/IkHUqxjLuIE/maxresdefault.jpg", duration: "240", description: "Tutorial cara efektif menekan biaya produksi padi menggunakan produk FLORAONE dari Centra Biotech" },
    { id: "zGF2bYyClhk", title: "TESTIMONI PAK PARMAN DARI BATANG - CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/zGF2bYyClhk/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parman dari Batang tentang efektivitas FLORAONE Pupuk Hayati" },
    { id: "7593292407202909461", title: "FLORAONE di Lapangan #1", embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/floraone/floraone-cover.webp", duration: "60", description: "Video aplikasi FLORAONE Pupuk Hayati di lapangan petani" },
    { id: "7589298285819563285", title: "FLORAONE di Lapangan #2", embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/floraone/floraone-cover.webp", duration: "60", description: "Testimoni petani menggunakan FLORAONE untuk meningkatkan kesuburan tanah" },
    { id: "7567321822954360085", title: "FLORAONE di Lapangan #3", embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/floraone/floraone-cover.webp", duration: "60", description: "Demonstrasi penggunaan FLORAONE Pupuk Hayati di sawah" },
    { id: "7512399240962854161", title: "FLORAONE di Lapangan #4", embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/floraone/floraone-cover.webp", duration: "60", description: "Hasil panen optimal dengan FLORAONE Pupuk Hayati" }
  ],
  'simbios': [
    { id: "rRbK3D_gvS4", title: "DULU BEKAS PRODUKSI BATU BATA, KINI SUDAH BERPRODUKSI LAGI BERKAT CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/rRbK3D_gvS4/maxresdefault.jpg", duration: "300", description: "Testimoni petani tentang keberhasilan menggunakan produk SIMBIOS Pupuk Hayati Premium dari Centra Biotech Indonesia" },
    { id: "_B3pONNfGEI", title: "TESTIMONI PAK PARJAN DARI INDRAMAYU - CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/_B3pONNfGEI/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parjan dari Indramayu tentang penggunaan SIMBIOS Pupuk Hayati untuk padi" },
    { id: "IkHUqxjLuIE", title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PADI HINGGA 60%", embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/IkHUqxjLuIE/maxresdefault.jpg", duration: "240", description: "Tutorial cara efektif menekan biaya produksi padi menggunakan produk SIMBIOS dari Centra Biotech" },
    { id: "zGF2bYyClhk", title: "TESTIMONI PAK PARMAN DARI BATANG - CENTRA BIOTECH", embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/zGF2bYyClhk/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parman dari Batang tentang efektivitas SIMBIOS Pupuk Hayati Premium" },
    { id: "7593292407202909461", title: "SIMBIOS di Lapangan #1", embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/simbios/simbios-cover.webp", duration: "60", description: "Video aplikasi SIMBIOS Pupuk Hayati Premium di lapangan petani" },
    { id: "7589298285819563285", title: "SIMBIOS di Lapangan #2", embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/simbios/simbios-cover.webp", duration: "60", description: "Testimoni petani menggunakan SIMBIOS untuk meningkatkan kesuburan tanah" },
    { id: "7567321822954360085", title: "SIMBIOS di Lapangan #3", embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/simbios/simbios-cover.webp", duration: "60", description: "Demonstrasi penggunaan SIMBIOS Pupuk Hayati di sawah" },
    { id: "7512399240962854161", title: "SIMBIOS di Lapangan #4", embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/simbios/simbios-cover.webp", duration: "60", description: "Hasil panen optimal dengan SIMBIOS Pupuk Hayati Premium" }
  ],
  'rajabio': [
    { id: "rRbK3D_gvS4", title: "DULU BEKAS PRODUKSI BATU BATA, KINI SUDAH BERPRODUKSI LAGI BERKAT RAJABIO", embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/rRbK3D_gvS4/maxresdefault.jpg", duration: "300", description: "Testimoni petani tentang keberhasilan menggunakan produk RAJABIO Pupuk Organik Cair dari Centra Biotech Indonesia" },
    { id: "_B3pONNfGEI", title: "TESTIMONI PAK PARJAN DARI INDRAMAYU - RAJABIO", embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/_B3pONNfGEI/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parjan dari Indramayu tentang penggunaan RAJABIO Pupuk Organik untuk padi" },
    { id: "IkHUqxjLuIE", title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PADI HINGGA 60% DENGAN RAJABIO", embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/IkHUqxjLuIE/maxresdefault.jpg", duration: "240", description: "Tutorial cara efektif menekan biaya produksi padi menggunakan produk RAJABIO dari Centra Biotech" },
    { id: "zGF2bYyClhk", title: "TESTIMONI PAK PARMAN DARI BATANG - RAJABIO", embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk", type: "youtube", thumbnailUrl: "https://i.ytimg.com/vi/zGF2bYyClhk/maxresdefault.jpg", duration: "180", description: "Testimoni Pak Parman dari Batang tentang efektivitas RAJABIO Pupuk Organik Cair" },
    { id: "7593292407202909461", title: "RAJABIO di Lapangan #1", embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/rajabio/rajabio-cover.webp", duration: "60", description: "Video aplikasi RAJABIO Pupuk Organik Cair di lapangan petani" },
    { id: "7589298285819563285", title: "RAJABIO di Lapangan #2", embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/rajabio/rajabio-cover.webp", duration: "60", description: "Testimoni petani menggunakan RAJABIO untuk meningkatkan kesuburan tanah" },
    { id: "7567321822954360085", title: "RAJABIO di Lapangan #3", embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/rajabio/rajabio-cover.webp", duration: "60", description: "Demonstrasi penggunaan RAJABIO Pupuk Organik di sawah" },
    { id: "7512399240962854161", title: "RAJABIO di Lapangan #4", embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161", type: "tiktok", thumbnailUrl: "https://www.centrabiotechindonesia.com/products/rajabio/rajabio-cover.webp", duration: "60", description: "Hasil panen optimal dengan RAJABIO Pupuk Organik Cair" }
  ]
};

/**
 * Generate video sitemap entries following Google's protocol
 * 
 * Per Google Search Central documentation:
 * - video:content_loc should point to actual video file (mp4, etc.) - NOT embed URLs
 * - video:player_loc should point to the video player/embed URL
 * - For YouTube/TikTok, we only have player URLs (embeds), not direct file URLs
 * - Therefore, we ONLY use video:player_loc for third-party hosted videos
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
 */
function generateVideoEntries(productSlug: string): string {
  const videos = productVideos[productSlug];
  if (!videos || videos.length === 0) return '';

  return videos.map(video => {
    // For YouTube videos, use the standard watch URL format for better compatibility
    let playerUrl = video.embedUrl;
    if (video.type === 'youtube') {
      playerUrl = `https://www.youtube.com/watch?v=${video.id}`;
    }
    
    return `
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeXml(playerUrl)}</video:player_loc>
      ${video.duration ? `<video:duration>${video.duration}</video:duration>` : ''}
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>`;
  }).join('');
}

/**
 * Create product sitemap entry with images
 */
function createProductEntry(product: ProductItem): string {
  // Filter out invalid slugs (random documentIds)
  const slug = product.slug;
  if (!slug || slug.match(/^[a-z0-9]{20,}$/i)) {
    return '';
  }

  const path = `/product/${slug}`;
  const lastModified = getLastModified(product);
  const imageEntry = generateImageEntry(product);

  let entries = '';
  locales.forEach((locale) => {
    entries += `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>${generateAlternates(path)}${imageEntry}
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  return entries;
}

export async function GET() {
  const products = await fetchProducts();
  
  // Filter valid products
  const validProducts = products.filter(
    (product) => product.slug && !product.slug.match(/^[a-z0-9]{20,}$/i)
  );

  const productEntries = validProducts.map(createProductEntry).join('');

  // Add hardcoded RAJABIO product page
  const rajabioEntries = locales.map((locale) => {
    const path = '/produk-layanan/pertanian/rajabio-pupuk-organik';
    const lastModified = new Date().toISOString();
    const imageUrl = `${BASE_URL}/products/rajabio/rajabio-cover.webp`;
    const videoEntries = generateVideoEntries('rajabio');
    
    return `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>${generateAlternates(path)}
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>RAJABIO Pupuk Organik Cair</image:title>
      <image:caption>RAJABIO Liquid Organic Fertilizer - Jual Pupuk Organik Cair Terbaik - Certified by Ministry of Agriculture RI</image:caption>
    </image:image>${videoEntries}
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('');

  // Add hardcoded BIOKILLER product page
  const biokillerEntries = locales.map((locale) => {
    const path = '/produk-layanan/pertanian/biokiller-insektisida-hayati';
    const lastModified = new Date().toISOString();
    const imageUrl = `${BASE_URL}/products/biokiller/biokiller-cover.webp`;
    const videoEntries = generateVideoEntries('biokiller');
    
    return `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>${generateAlternates(path)}
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>BIOKILLER Insektisida Hayati</image:title>
      <image:caption>BIOKILLER Insektisida Hayati - Jual Insektisida Hayati Bio Pestisida Terbaik - Certified by Ministry of Agriculture RI</image:caption>
    </image:image>${videoEntries}
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('');

  // Add hardcoded FLORAONE product page
  const floraoneEntries = locales.map((locale) => {
    const path = '/produk-layanan/pertanian/floraone-pupuk-hayati';
    const lastModified = new Date().toISOString();
    const imageUrl = `${BASE_URL}/products/floraone/floraone-cover.webp`;
    const videoEntries = generateVideoEntries('floraone');
    
    return `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>${generateAlternates(path)}
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>FLORAONE Pupuk Hayati</image:title>
      <image:caption>FLORAONE Pupuk Hayati Terbaik - Jual Pupuk Hayati Cair dan Padat - Certified by Ministry of Agriculture RI</image:caption>
    </image:image>${videoEntries}
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('');

  // Add hardcoded SIMBIOS product page
  const simbiosEntries = locales.map((locale) => {
    const path = '/produk-layanan/pertanian/simbios-pupuk-hayati';
    const lastModified = new Date().toISOString();
    const imageUrl = `${BASE_URL}/products/simbios/simbios-cover.webp`;
    const videoEntries = generateVideoEntries('simbios');
    
    return `
  <url>
    <loc>${BASE_URL}/${locale}${path}</loc>${generateAlternates(path)}
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>SIMBIOS Pupuk Hayati Premium</image:title>
      <image:caption>SIMBIOS Pupuk Hayati Premium - Jual Pupuk Hayati Cair Terbaik - Certified by Ministry of Agriculture RI</image:caption>
    </image:image>${videoEntries}
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('');

  const productsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${rajabioEntries}${biokillerEntries}${floraoneEntries}${simbiosEntries}${productEntries}
</urlset>`;

  return new NextResponse(productsSitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
