// Sector metadata + helpers — deliberately free of any JSON data import so
// this module can be pulled into the client bundle (SolutionCard) without
// shipping the 185KB solutions dataset. The data accessors live in lib/catalog.

import type { Locale } from "@/i18n-config";

export interface SectorMeta {
  name: string;
  slug: string;
  color: string;
  label: { id: string; en: string };
}

// Colors from the DS catalog `sc` map; keyed by the sector strings used in
// solutions.json.
export const SECTORS: SectorMeta[] = [
  { name: "Pangan", slug: "pangan", color: "#0E5424", label: { id: "Pangan", en: "Food Crops" } },
  { name: "Hortikultura", slug: "hortikultura", color: "#166B30", label: { id: "Hortikultura", en: "Horticulture" } },
  { name: "Perkebunan", slug: "perkebunan", color: "#6B4F2E", label: { id: "Perkebunan", en: "Plantation" } },
  { name: "Peternakan", slug: "peternakan", color: "#9A7B34", label: { id: "Peternakan", en: "Livestock" } },
  { name: "Akuakultur", slug: "akuakultur", color: "#0E3C4E", label: { id: "Akuakultur", en: "Aquaculture" } },
  { name: "BioProcess Industri", slug: "bioprocess", color: "#3D3A54", label: { id: "BioProcess & Industri", en: "BioProcess & Industry" } },
];

const SECTOR_BY_NAME = new Map(SECTORS.map((s) => [s.name, s]));
const SECTOR_BY_SLUG = new Map(SECTORS.map((s) => [s.slug, s]));

export function sectorSlug(name: string): string {
  return SECTOR_BY_NAME.get(name)?.slug ?? "lainnya";
}

export function getSectorBySlug(slug: string): SectorMeta | undefined {
  return SECTOR_BY_SLUG.get(slug);
}

export function sectorLabel(name: string, locale: Locale): string {
  const meta = SECTOR_BY_NAME.get(name);
  return meta ? meta.label[locale] ?? meta.label.id : name;
}

export function sectorColor(name: string): string {
  return SECTOR_BY_NAME.get(name)?.color ?? "#083F19";
}
