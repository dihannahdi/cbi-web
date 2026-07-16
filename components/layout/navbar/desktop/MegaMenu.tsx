import { FC } from "react";
import Link from "next/link";
import {
  Sprout,
  Beef,
  Fish,
  LayoutGrid,
  ArrowRight,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n-config";
import type { Dictionary } from "@/dictionaries";

interface MegaMenuProps {
  isOpen: boolean;
  lang: Locale;
  dict: Dictionary;
  onNavigate?: () => void;
}

interface SectorLink {
  title: string;
  href: string;
}

interface Sector {
  icon: LucideIcon;
  title: string;
  href: string;
  description: string;
  links?: SectorLink[];
}

export const MegaMenu: FC<MegaMenuProps> = ({
  isOpen,
  lang,
  dict,
  onNavigate,
}) => {
  const isId = lang === "id";
  const productsHref = isId ? `/${lang}/produk-layanan` : `/${lang}/product`;

  const sectors: Sector[] = [
    {
      icon: Sprout,
      title: dict.nav.agriculture,
      href: isId ? `/${lang}/produk-layanan/pertanian` : `/${lang}/product/agriculture`,
      description: isId
        ? "Pupuk hayati, insektisida & pembenah tanah"
        : "Biofertilizers, biopesticides & soil conditioners",
    },
    {
      icon: Beef,
      title: dict.nav.livestock,
      href: isId ? `/${lang}/produk-layanan/peternakan` : `/${lang}/product/livestock`,
      description: isId
        ? "Probiotik untuk unggas & ruminansia"
        : "Probiotics for poultry & ruminants",
      links: [
        { title: dict.nav.peternakanUnggas, href: `/${lang}/produk-layanan/peternakan/unggas` },
        { title: dict.nav.peternakanRuminant, href: `/${lang}/produk-layanan/peternakan/ruminant` },
      ],
    },
    {
      icon: Fish,
      title: dict.nav.fishery,
      href: isId ? `/${lang}/produk-layanan/perikanan` : `/${lang}/product/fishery`,
      description: isId
        ? "Solusi bioflok & budidaya udang"
        : "Biofloc & shrimp aquaculture solutions",
      links: [
        { title: dict.nav.perikananBiofloc, href: `/${lang}/produk-layanan/perikanan/biofloc` },
        { title: dict.nav.perikananUdang, href: `/${lang}/produk-layanan/perikanan/udang` },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "absolute left-1/2 top-full z-20 mt-3 w-[min(680px,92vw)] origin-top -translate-x-1/2 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg transition-all duration-300 ease-out",
        isOpen
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0",
      )}
    >
      {/* All products tile */}
      <Link
        href={productsHref}
        onClick={onNavigate}
        className="group mb-3 flex items-center gap-4 rounded-xl border border-stone-150 bg-green-50/60 p-4 transition-colors hover:border-green-200 hover:bg-green-50"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
          <LayoutGrid className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block font-bold text-stone-950">
            {isId ? "Semua Produk & Layanan" : "All Products & Services"}
          </span>
          <span className="block text-sm text-stone-500">
            {isId
              ? "Jelajahi seluruh katalog bioteknologi kami"
              : "Explore our full biotechnology catalogue"}
          </span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
      </Link>

      {/* Katalog Solusi (Paket Kombinasi) — the 145-package solution catalog.
          Count is the static catalog size (CATALOG_TOTAL in lib/catalog);
          hardcoded here to avoid bundling the dataset into the navbar. */}
      <Link
        href={`/${lang}/produk-layanan/solusi`}
        onClick={onNavigate}
        className="group mb-3 flex items-center gap-4 rounded-xl border border-lime-200 bg-lime-50/60 p-4 transition-colors hover:border-lime-300 hover:bg-lime-50"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-500 text-green-900">
          <LayoutGrid className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2 font-bold text-stone-950">
            {isId ? "Katalog Solusi" : "Solution Catalogue"}
            <span className="cbi-mono rounded-full bg-lime-500/20 px-2 py-0.5 text-xs font-semibold text-lime-700">
              145 {isId ? "paket" : "packages"}
            </span>
          </span>
          <span className="block text-sm text-stone-500">
            {isId
              ? "Paket konsorsium mikroba per komoditas & fase budidaya"
              : "Microbial consortium packages by commodity & phase"}
          </span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-lime-700" />
      </Link>

      {/* Sector grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {sectors.map((sector) => {
          const Icon = sector.icon;
          return (
            <div
              key={sector.href}
              className="rounded-xl p-3 transition-colors hover:bg-stone-50"
            >
              <Link
                href={sector.href}
                onClick={onNavigate}
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700 transition-colors group-hover:bg-green-100">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-stone-950 transition-colors group-hover:text-brand">
                    {sector.title}
                  </span>
                  <span className="block text-xs leading-snug text-stone-500">
                    {sector.description}
                  </span>
                </span>
              </Link>
              {sector.links && (
                <div className="mt-2 flex flex-wrap gap-1.5 pl-[3.25rem]">
                  {sector.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onNavigate}
                      className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-green-100 hover:text-brand"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Help / consultation cell */}
        <Link
          href={`/${lang}/contact`}
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl border border-dashed border-stone-200 p-3 transition-colors hover:border-green-300 hover:bg-green-50"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
            <HelpCircle className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-stone-950 transition-colors group-hover:text-brand">
              {isId ? "Butuh bantuan memilih?" : "Need help choosing?"}
            </span>
            <span className="block text-xs leading-snug text-stone-500">
              {isId ? "Konsultasi gratis dengan tim kami" : "Free consultation with our team"}
            </span>
          </span>
        </Link>
      </div>

      {/* Proof footer — verifiable certifications only */}
      <div className="mt-3 border-t border-stone-150 pt-3 text-center">
        <span className="cbi-mono text-xs text-stone-500">
          {isId
            ? "Bersertifikat Kementan · KAN · Organik Indonesia"
            : "Certified by Kementan · KAN · Organik Indonesia"}
        </span>
      </div>
    </div>
  );
};
