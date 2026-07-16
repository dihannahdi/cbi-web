import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Locale } from "@/i18n-config";
import { sectorColor, sectorLabel } from "@/lib/catalogSectors";
import type { SolutionSummary } from "@/lib/catalog";

interface SolutionCardProps {
  solution: SolutionSummary;
  lang: Locale;
}

const SolutionCard = ({ solution, lang }: SolutionCardProps) => {
  const color = sectorColor(solution.sector);
  const href = `/${lang}/produk-layanan/solusi/${solution.code}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="cbi-mono rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
          {solution.code}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {sectorLabel(solution.sector, lang)}
        </span>
        <span className="text-xs text-stone-400">· {solution.komoditas}</span>
      </div>

      <h3 className="text-lg font-bold leading-snug text-stone-950 transition-colors group-hover:text-brand">
        {solution.solution}
      </h3>

      <p className="mt-1 text-sm font-medium text-brand">
        {lang === "id" ? "Produk" : "Product"}: CBI {solution.brand}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-3">
        {solution.tagline}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs uppercase tracking-wide text-stone-400">
          {solution.phase}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
          {lang === "id" ? "Selengkapnya" : "Details"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default SolutionCard;
