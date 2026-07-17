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
      // Don't set cookies when locale is already in URL path
      // Setting Set-Cookie on every request prevents Vercel ISR caching
      // which blocks Googlebot from getting cached responses
      return NextResponse.next();
    }
  }

  // No locale in path - redirect to appropriate locale
  // Always default to Indonesian (id) for centrabiotechindonesia.com
  const cookieLocale = getLocaleFromCookie(request);
  const locale = isValidLocale(cookieLocale || '') 
    ? cookieLocale! 
    : i18n.defaultLocale; // Always default to 'id' instead of detecting language

  // Redirect to localized path with 301 (permanent) for SEO
  // 301 tells Google to update the index with the new canonical URL
  // Build the redirect from forwarded host so the upstream bind (e.g. 127.0.0.1:3034 behind nginx) doesn't leak into Location
  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
  const newUrl = forwardedHost
    ? new URL(`${forwardedProto}://${forwardedHost}/${locale}${pathname}${request.nextUrl.search}`)
    : (() => { const u = new URL(request.url); u.pathname = `/${locale}${pathname}`; return u; })();

  const response = NextResponse.redirect(newUrl, 301);
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
