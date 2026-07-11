// Maps an article slug to a neutral, honest pointer toward the most
// relevant Centra Biotech product page — no efficacy claims or numbers,
// just "this article's topic relates to this product".

export interface RelatedProductInfo {
  name: string;
  url: string;
  blurb: string;
}

interface ProductRule {
  keywords: string[];
  name: string;
  url: string;
  blurb: { id: string; en: string };
}

// Rules are checked in order; the first keyword match wins.
// URLs are Indonesian by default — callers localize the "/id/" prefix
// themselves based on the current locale (see ArticleDetail.tsx).
const PRODUCT_RULES: ProductRule[] = [
  {
    keywords: ["humat", "black-turbo"],
    name: "Black Turbo",
    url: "/id/produk-layanan/pertanian/blackturbo-asam-humat-cair",
    blurb: {
      id: "Produk asam humat cair dari lini pertanian Centra Biotech.",
      en: "A liquid humic acid product from Centra Biotech's agriculture line.",
    },
  },
  {
    keywords: ["insektisida", "biokiller"],
    name: "BioKiller",
    url: "/id/produk-layanan/pertanian/biokiller-insektisida-hayati",
    blurb: {
      id: "Produk insektisida hayati dari lini pertanian Centra Biotech.",
      en: "A bio-based insecticide product from Centra Biotech's agriculture line.",
    },
  },
  {
    keywords: ["pupuk-hayati", "floraone"],
    name: "FloraOne",
    url: "/id/produk-layanan/pertanian/floraone-pupuk-hayati",
    blurb: {
      id: "Produk pupuk hayati dari lini pertanian Centra Biotech.",
      en: "A biofertilizer product from Centra Biotech's agriculture line.",
    },
  },
  {
    keywords: ["pupuk-organik", "rajabio"],
    name: "RajaBio",
    url: "/id/produk-layanan/pertanian/rajabio-pupuk-organik-cair",
    blurb: {
      id: "Produk pupuk organik cair dari lini pertanian Centra Biotech.",
      en: "A liquid organic fertilizer product from Centra Biotech's agriculture line.",
    },
  },
  {
    keywords: ["pembenah", "dolomit"],
    name: "Biokalsi",
    url: "/id/produk-layanan/pertanian/biokalsi-dolomit-pembenah-tanah",
    blurb: {
      id: "Produk pembenah tanah dolomit dari lini pertanian Centra Biotech.",
      en: "A dolomite soil conditioner product from Centra Biotech's agriculture line.",
    },
  },
];

/**
 * Find the best-matching product for a given article slug, by simple
 * keyword containment. Returns null when nothing matches — callers
 * should simply skip rendering a related-product card in that case.
 *
 * @param slug - article slug to match against
 * @param locale - 'id' (default) or 'en', used only to pick the blurb text
 */
export function getRelatedProduct(
  slug: string,
  locale: "id" | "en" = "id",
): RelatedProductInfo | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase();

  const rule = PRODUCT_RULES.find((r) =>
    r.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (!rule) return null;

  return {
    name: rule.name,
    url: rule.url,
    blurb: rule.blurb[locale] ?? rule.blurb.id,
  };
}
