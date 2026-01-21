/**
 * Custom 404 Not Found Page - Root level
 * SEO-optimized error page with helpful navigation - Locale aware
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n, type Locale } from '@/i18n-config';

// Translations for 404 page
const translations = {
  id: {
    title: 'Halaman Tidak Ditemukan',
    description: 'Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan periksa URL atau gunakan navigasi di bawah ini.',
    backHome: 'Kembali ke Beranda',
    contactUs: 'Hubungi Kami',
    popularPages: 'Halaman Populer',
    aboutUs: 'Tentang Kami',
    agriculture: 'Produk Pertanian',
    livestock: 'Produk Peternakan',
    fishery: 'Produk Perikanan',
    news: 'Berita & Artikel',
    career: 'Karir',
    documents: 'Dokumen',
    contact: 'Kontak',
  },
  en: {
    title: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist or has been moved. Please check the URL or use the navigation below.',
    backHome: 'Back to Home',
    contactUs: 'Contact Us',
    popularPages: 'Popular Pages',
    aboutUs: 'About Us',
    agriculture: 'Agriculture Products',
    livestock: 'Livestock Products',
    fishery: 'Fishery Products',
    news: 'News & Articles',
    career: 'Career',
    documents: 'Documents',
    contact: 'Contact',
  },
};

export default function NotFound() {
  const pathname = usePathname();
  
  // Extract lang from pathname (e.g., /en/some-page -> en)
  const pathLang = pathname?.split('/')[1] as Locale;
  const lang: Locale = i18n.locales.includes(pathLang) ? pathLang : i18n.defaultLocale;
  const t = translations[lang];
  
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
        
        {/* Error Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t.title}
        </h2>
        
        {/* Error Description */}
        <p className="text-lg text-gray-600 mb-8">
          {t.description}
        </p>
        
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href={`/${lang}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t.backHome}
          </Link>
          <Link 
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t.contactUs}
          </Link>
        </div>
        
        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t.popularPages}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link 
              href={`/${lang}/about-us`}
              className="text-primary hover:underline"
            >
              {t.aboutUs}
            </Link>
            <Link 
              href={`/${lang}/product/agriculture`}
              className="text-primary hover:underline"
            >
              {t.agriculture}
            </Link>
            <Link 
              href={`/${lang}/product/livestock`}
              className="text-primary hover:underline"
            >
              {t.livestock}
            </Link>
            <Link 
              href={`/${lang}/product/fishery`}
              className="text-primary hover:underline"
            >
              {t.fishery}
            </Link>
            <Link 
              href={`/${lang}/news`}
              className="text-primary hover:underline"
            >
              {t.news}
            </Link>
            <Link 
              href={`/${lang}/career`}
              className="text-primary hover:underline"
            >
              {t.career}
            </Link>
            <Link 
              href={`/${lang}/documents`}
              className="text-primary hover:underline"
            >
              {t.documents}
            </Link>
            <Link 
              href={`/${lang}/contact`}
              className="text-primary hover:underline"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
