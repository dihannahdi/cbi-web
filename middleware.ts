import { NextRequest, NextResponse } from 'next/server';
import { i18n, isValidLocale } from './i18n-config';

// Paths that should be excluded from locale routing
const PUBLIC_FILE = /\.(.*)$/;
const EXCLUDED_PATHS = [
  '/_next',
  '/api',
  '/images',
  '/flags',
  '/social-media-icon',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/og-image.jpg',
  '/logo',
];

function getLocaleFromCookie(request: NextRequest): string | undefined {
  return request.cookies.get('NEXT_LOCALE')?.value;
}

function getLocaleFromAcceptLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return i18n.defaultLocale;

  // Parse accept-language header
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, priority = 'q=1'] = lang.trim().split(';');
      const q = parseFloat(priority.split('=')[1] || '1');
      return { locale: locale.split('-')[0].toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  // Find first matching locale
  for (const { locale } of languages) {
    if (i18n.locales.includes(locale as typeof i18n.locales[number])) {
      return locale;
    }
  }

  return i18n.defaultLocale;
}

function shouldExcludePath(pathname: string): boolean {
  // Check for public files
  if (PUBLIC_FILE.test(pathname)) return true;

  // Check for excluded paths
  return EXCLUDED_PATHS.some(
    (path) => pathname.startsWith(path) || pathname === path
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for excluded paths
  if (shouldExcludePath(pathname)) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale and validate
    const segments = pathname.split('/');
    const pathLocale = segments[1];
    
    if (isValidLocale(pathLocale)) {
      // Set locale cookie for future visits
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', pathLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }
  }

  // No locale in path - redirect to appropriate locale
  // Always default to Indonesian (id) for centrabiotechindonesia.com
  const cookieLocale = getLocaleFromCookie(request);
  const locale = isValidLocale(cookieLocale || '') 
    ? cookieLocale! 
    : i18n.defaultLocale; // Always default to 'id' instead of detecting language

  // Redirect to localized path
  const newUrl = new URL(request.url);
  newUrl.pathname = `/${locale}${pathname}`;
  
  const response = NextResponse.redirect(newUrl);
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  
  return response;
}

export const config = {
  // Match all paths except excluded ones
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)',
  ],
};
