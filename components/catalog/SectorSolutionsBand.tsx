import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

import type { Locale } from "@/i18n-config";
import { getUmbrellaStats } from "@/lib/catalog";

interface SectorSolutionsBandProps {
  lang: Locale;
  /** Site sector key: "pertanian" | "peternakan" | "perikanan" */
  siteSector: string;
  /** DS sector accent color (hex). */
  accent: string;
  label: { id: string; en: string };
  /** Max komoditas chips to show. */
  maxChips?: number;
}

const SectorSolutionsBand = ({
  lang,
  siteSector,
  accent,
  label,
  maxChips = 10,
}: SectorSolutionsBandProps) => {
  const isId = lang === "id";
  const { count, komoditas } = getUmbrellaStats(siteSector);
  if (count === 0) return null;

  const sectorName = isId ? label.id : label.en;
  const chips = komoditas.slice(0, maxChips);
  const catalogHref = `/${lang}/produk-layanan/solusi`;

  return (
    <section className="px-6 py-12 lg:px-9 lg:py-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <div
          className="overflow-hidden rounded-3xl border bg-white p-8 shadow-sm lg:p-10"
          style={{ borderColor: `${accent}33` }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p
                className="text-xs font-bold uppercase tracking-[0.12em]"
                style={{ color: accent }}
              >
                {isId ? "Paket Solusi" : "Solution Packages"}
              </p>
              <h2 className="mt-2">
                {isId
                  ? `${count} Paket Solusi Bioteknologi untuk ${sectorName}`
                  : `${count} Biotech Solution Packages for ${sectorName}`}
              </h2>
              <p className="mt-3 text-stone-600">
                {isId
                  ? "Solusi konsorsium mikroba per komoditas & fase budidaya — dipetakan untuk kebutuhan lapangan Anda."
                  : "Microbial consortium solutions by commodity & cultivation phase — mapped to your field needs."}
              </p>
            </div>
            <Link
              href={catalogHref}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full px-6 py-3 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-brand"
              style={{ backgroundColor: accent }}
            >
              <LayoutGrid className="h-5 w-5" />
              {isId ? "Lihat Katalog Solusi" : "View Solution Catalogue"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {chips.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-150 pt-6">
              {chips.map((k) => (
                <Link
                  key={k}
                  href={catalogHref}
                  className="rounded-full border px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-800"
                  style={{ borderColor: `${accent}55` }}
                >
                  {k}
                </Link>
              ))}
              {komoditas.length > chips.length && (
                <span className="rounded-full px-3 py-1.5 text-sm text-stone-400">
                  +{komoditas.length - chips.length} {isId ? "komoditas" : "commodities"}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectorSolutionsBand;
