/**
 * Internationalization Configuration
 * Supports Indonesian (default) and English for global market reach
 */

export const i18n = {
  defaultLocale: 'id',
  locales: ['id', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  id: 'Indonesia',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  id: '/flags/Indonesia.svg',
  en: '/flags/UK.svg',
};

// For SEO purposes
export const localeMetadata: Record<Locale, { 
  language: string; 
  country: string; 
  locale: string;
  hreflang: string;
}> = {
  id: {
    language: 'id',
    country: 'ID',
    locale: 'id_ID',
    hreflang: 'id-ID',
  },
  en: {
    language: 'en',
    country: 'US',
    locale: 'en_US',
    hreflang: 'en',
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}
