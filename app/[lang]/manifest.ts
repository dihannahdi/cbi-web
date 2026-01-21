/**
 * Dynamic PWA Manifest with i18n Support
 * Generates locale-specific manifest files for Indonesian and English
 * PT Centra Biotech Indonesia - Indonesia's Leading Agro-Biotech Manufacturing Hub
 */

import { MetadataRoute } from 'next';
import { isValidLocale, type Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';

export default async function manifest({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<MetadataRoute.Manifest> {
  const { lang } = await params;
  
  // Fallback to Indonesian if invalid locale
  const locale: Locale = isValidLocale(lang) ? (lang as Locale) : 'id';
  const dict = await getDictionary(locale);
  
  // Locale-specific configurations - OPTIMIZED FOR MAKLON + PRODUCT SALES
  const localeConfig = {
    id: {
      name: 'Centra Biotech Indonesia - Pusat Inovasi & Manufaktur Agro-Bioteknologi Terdepan',
      shortName: 'CBI',
      description: 'Pusat Inovasi & Manufaktur Agro-Bioteknologi Terdepan di Indonesia. MAKLON PUPUK HAYATI & ORGANIK terbaik dengan kapasitas produksi besar. Produk bersertifikat Kementan: FLORAONE, RAJABIO, BIO KILLER, SIMBIOS. 14+ tahun pengalaman. Hub: 0812-3500-3655',
      shortcuts: [
        {
          name: 'Layanan Maklon Pupuk',
          short_name: 'Maklon',
          description: 'Jasa maklon pupuk hayati & organik terbaik di Indonesia - kapasitas besar, harga kompetitif',
          url: '/id/maklon-pupuk',
        },
        {
          name: 'Produk Pertanian',
          short_name: 'Produk',
          description: 'FLORAONE, RAJABIO, BIO KILLER, SIMBIOS - Bersertifikat Kementerian Pertanian RI',
          url: '/id/product/agriculture',
        },
        {
          name: 'Hubungi Kami',
          short_name: 'Kontak',
          description: 'WhatsApp: 0812-3500-3655 | Email: centrabioindo@gmail.com',
          url: '/id/contact',
        },
        {
          name: 'Tentang Kami',
          short_name: 'Tentang',
          description: '14+ tahun pengalaman dalam industri bioteknologi pertanian',
          url: '/id/about-us',
        },
      ],
    },
    en: {
      name: "Centra Biotech Indonesia - Indonesia's Leading Agro-Biotech Manufacturing Hub",
      shortName: 'CBI',
      description: "Indonesia's #1 Agro-Biotech Innovation & Manufacturing Hub. BEST contract manufacturing (maklon) for biological & organic fertilizers. Ministry of Agriculture certified: FLORAONE, RAJABIO, BIO KILLER, SIMBIOS. 14+ years experience. Contact: +62 812-3500-3655",
      shortcuts: [
        {
          name: 'Maklon Services',
          short_name: 'Maklon',
          description: 'Best contract manufacturing for biological & organic fertilizers in Indonesia',
          url: '/en/maklon-pupuk',
        },
        {
          name: 'Agriculture Products',
          short_name: 'Products',
          description: 'FLORAONE, RAJABIO, BIO KILLER, SIMBIOS - Ministry of Agriculture Certified',
          url: '/en/product/agriculture',
        },
        {
          name: 'Contact Us',
          short_name: 'Contact',
          description: 'WhatsApp: +62 812-3500-3655 | Email: centrabioindo@gmail.com',
          url: '/en/contact',
        },
        {
          name: 'About Us',
          short_name: 'About',
          description: '14+ years experience in agricultural biotechnology industry',
          url: '/en/about-us',
        },
      ],
    },
  };

  const config = localeConfig[locale];

  return {
    name: config.name,
    short_name: config.shortName,
    description: config.description,
    start_url: `/${locale}`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/apple-icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'agriculture', 'technology', 'biotechnology', 'science'],
    lang: locale === 'id' ? 'id-ID' : 'en-US',
    dir: 'ltr',
    scope: `/${locale}`,
    shortcuts: config.shortcuts.map((shortcut) => ({
      ...shortcut,
      icons: [
        {
          src: '/apple-icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    })),
    related_applications: [],
    prefer_related_applications: false,
  };
}
