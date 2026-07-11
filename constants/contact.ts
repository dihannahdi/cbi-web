// Shared WhatsApp / contact constants
// Framework-agnostic: no React/Next imports here so this can be used
// from client components, server components, and API routes alike.

/**
 * Official business WhatsApp number (international format, no leading "+").
 * Single source of truth — import this instead of hardcoding the number.
 */
export const WHATSAPP_NUMBER = "6285196214187";

/**
 * Known labels for where a WhatsApp CTA was clicked from.
 * Used for analytics segmentation (see lib/whatsapp-analytics.ts).
 * Kept as a union of known sources; callers may still pass an
 * ad-hoc string label if a new CTA doesn't fit these yet.
 */
export type WhatsAppSource =
  | "whatsapp_float"
  | "article_cta"
  | "related_product"
  | "agriculture_products"
  | "contact_address"
  | "footer";

/**
 * Build a wa.me deep link, optionally prefilled with a message.
 *
 * @param message - plain text message to prefill (will be URI-encoded)
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
