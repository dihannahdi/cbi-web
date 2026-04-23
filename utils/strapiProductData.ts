/**
 * Strapi product-page overlay utilities.
 *
 * Each product page keeps its full static copy as a fallback and calls
 * fetchStrapiProduct(slug) at build time. When Strapi returns matching
 * content, individual fields override the static defaults via the
 * transform* helpers. Any failure (network, 4xx, schema drift, missing
 * entry) collapses to the static fallback so the static export never
 * breaks on a flaky backend.
 */

export interface StrapiProductData {
  name?: string;
  subtitle?: string;
  tagline?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  description?: string;
  faq?: unknown;
  videos?: unknown;
  externalLinks?: unknown;
  whatsappNumber?: string;
  whatsappMessage?: string;
  ctaWhatsapp?: string;
  ctaShopee?: string;
  ctaCatalog?: string;
  ctaBrochure?: string;
  ctaCertificate?: string;
  videoSectionTitle?: string;
  videoSectionSubtitle?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_URL_API || "https://cbi-backend.my.id";

export async function fetchStrapiProduct(
  slug: string,
): Promise<StrapiProductData | null> {
  try {
    const url =
      `${BASE_URL}/api/product-agriculture` +
      `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&populate=*`;

    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return null;

    const json = await response.json();
    const entry = json?.data?.[0];
    if (!entry) return null;

    const attrs = entry.attributes ?? entry;
    return (attrs ?? null) as StrapiProductData | null;
  } catch {
    return null;
  }
}

function isNonEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}

export function transformFAQ<T>(strapiFAQ: unknown, fallback: T): T {
  return isNonEmptyArray(strapiFAQ) ? (strapiFAQ as unknown as T) : fallback;
}

export function transformVideos<T>(strapiVideos: unknown, fallback: T): T {
  return isNonEmptyArray(strapiVideos)
    ? (strapiVideos as unknown as T)
    : fallback;
}

export function transformExternalLinks<T>(
  strapiLinks: unknown,
  fallback: T,
): T {
  if (strapiLinks && typeof strapiLinks === "object") {
    return { ...fallback, ...(strapiLinks as Record<string, unknown>) } as T;
  }
  return fallback;
}
