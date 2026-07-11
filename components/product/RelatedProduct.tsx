import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import TrackedWhatsAppButton from "@/components/common/TrackedWhatsAppButton";
import { buildWhatsAppUrl } from "@/constants/contact";
import { Locale } from "@/i18n-config";

interface RelatedProductProps {
  /** Product name, e.g. "Black Turbo" */
  name: string;
  /** Full, already-localized path to the product page, e.g. "/id/produk-layanan/pertanian/..." */
  url: string;
  /** Short, neutral description — no efficacy claims or numbers */
  blurb: string;
  locale?: Locale;
  /** Extra analytics context, e.g. { slug: 'artikel-slug' } */
  context?: Record<string, unknown>;
}

const translations = {
  id: {
    label: "Produk Terkait",
    learnMore: "Pelajari Produk",
    consult: "Tanya via WhatsApp",
  },
  en: {
    label: "Related Product",
    learnMore: "Learn About This Product",
    consult: "Ask via WhatsApp",
  },
};

const RelatedProduct = ({
  name,
  url,
  blurb,
  locale = "id",
  context,
}: RelatedProductProps) => {
  const t = translations[locale] || translations.id;

  const message =
    locale === "en"
      ? `Hello, I'd like to ask about the ${name} product.`
      : `Halo, saya ingin bertanya tentang produk ${name}.`;
  const whatsappUrl = buildWhatsAppUrl(message);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 lg:p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-green-600">
        {t.label}
      </span>
      <h4 className="mt-1 text-base font-bold text-[#222] lg:text-lg">
        {name}
      </h4>
      <p className="mt-1 text-sm text-[#555]">{blurb}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={url}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 hover:underline"
        >
          {t.learnMore}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <TrackedWhatsAppButton
          href={whatsappUrl}
          source="related_product"
          context={{ product: name, ...context }}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4" />
          {t.consult}
        </TrackedWhatsAppButton>
      </div>
    </div>
  );
};

export default RelatedProduct;
