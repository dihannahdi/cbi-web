"use client";

import Link from "next/link";
import { ReactNode } from "react";

import WhatsAppAnalytics from "@/lib/whatsapp-analytics";
import { WhatsAppSource } from "@/constants/contact";

interface TrackedWhatsAppButtonProps {
  href: string;
  source: WhatsAppSource | (string & {});
  context?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
}

/**
 * Thin client-side wrapper around a wa.me link.
 *
 * Next.js Server Components cannot attach onClick handlers directly
 * (event handlers can't cross the server/client boundary), so any
 * Server Component that needs a tracked WhatsApp CTA — e.g.
 * ArticleDetail — renders this small Client Component instead of
 * wiring WhatsAppAnalytics.trackClick() itself.
 */
const TrackedWhatsAppButton = ({
  href,
  source,
  context,
  className,
  children,
}: TrackedWhatsAppButtonProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        WhatsAppAnalytics.trackClick(source, context);
      }}
    >
      {children}
    </Link>
  );
};

export default TrackedWhatsAppButton;
