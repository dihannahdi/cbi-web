"use client";

import { useMemo, useState } from "react";
import { Search, Wheat, Sprout, Trees, Beef, Fish, FlaskConical, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n-config";
import type { SolutionSummary } from "@/lib/catalog";
import SolutionCard from "./SolutionCard";

interface SectorTile {
  name: string;
  slug: string;
  color: string;
  label: { id: string; en: string };
  count: number;
}

interface SolutionCatalogProps {
  solutions: SolutionSummary[];
  sectorTiles: SectorTile[];
  lang: Locale;
}

const SECTOR_ICONS: Record<string, LucideIcon> = {
  pangan: Wheat,
  hortikultura: Sprout,
  perkebunan: Trees,
  peternakan: Beef,
  akuakultur: Fish,
  bioprocess: FlaskConical,
};

const PAGE_SIZE = 12;

const SolutionCatalog = ({ solutions, sectorTiles, lang }: SolutionCatalogProps) => {
  const isId = lang === "id";
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeKomoditas, setActiveKomoditas] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const komoditasOptions = useMemo(() => {
    if (!activeSector) return [];
    return [
      ...new Set(
        solutions
          .filter((s) => s.sectorSlug === activeSector)
          .map((s) => s.komoditas),
      ),
    ];
  }, [solutions, activeSector]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return solutions.filter((s) => {
      if (activeSector && s.sectorSlug !== activeSector) return false;
      if (activeKomoditas && s.komoditas !== activeKomoditas) return false;
      if (q) {
        const hay = `${s.solution} ${s.brand} ${s.komoditas} ${s.code} ${s.tagline}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [solutions, activeSector, activeKomoditas, query]);

  const visible = filtered.slice(0, limit);

  const selectSector = (slug: string) => {
    setActiveSector((cur) => (cur === slug ? null : slug));
    setActiveKomoditas(null);
    setLimit(PAGE_SIZE);
  };

  const resetFilters = () => {
    setActiveSector(null);
    setActiveKomoditas(null);
    setQuery("");
    setLimit(PAGE_SIZE);
  };

  return (
    <div>
      {/* Sector index tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {sectorTiles.map((tile) => {
          const Icon = SECTOR_ICONS[tile.slug] ?? Sprout;
          const active = activeSector === tile.slug;
          return (
            <button
              key={tile.slug}
              type="button"
              onClick={() => selectSector(tile.slug)}
              aria-pressed={active}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-0.5",
                active
                  ? "border-transparent text-white shadow-brand"
                  : "border-stone-200 bg-white text-stone-700 hover:border-green-200 hover:shadow-md",
              )}
              style={active ? { backgroundColor: tile.color } : undefined}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  active ? "bg-white/20 text-white" : "bg-green-50 text-green-700",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-tight">
                {tile.label[lang] ?? tile.label.id}
              </span>
              <span className={cn("cbi-mono text-xs", active ? "text-white/80" : "text-stone-400")}>
                {tile.count} {isId ? "solusi" : "solutions"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search + komoditas chips */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder={isId ? "Cari solusi, komoditas, produk…" : "Search solutions, crops, products…"}
            className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>

        {activeSector && komoditasOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveKomoditas(null)}
              className={cn("filter-pill", !activeKomoditas ? "filter-pill-active" : "filter-pill-inactive")}
            >
              {isId ? "Semua komoditas" : "All crops"}
            </button>
            {komoditasOptions.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setActiveKomoditas((cur) => (cur === k ? null : k))}
                className={cn("filter-pill", activeKomoditas === k ? "filter-pill-active" : "filter-pill-inactive")}
              >
                {k}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-stone-500">
          {filtered.length} {isId ? "solusi ditemukan" : "solutions found"}
        </p>
        {(activeSector || activeKomoditas || query) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-brand hover:underline"
          >
            {isId ? "Reset filter" : "Reset filters"}
          </button>
        )}
      </div>

      {/* Cards */}
      {visible.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <SolutionCard key={s.code} solution={s} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-stone-500">
          {isId ? "Tidak ada solusi yang cocok dengan filter." : "No solutions match your filters."}
        </p>
      )}

      {/* Load more */}
      {limit < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="btn-secondary"
          >
            {isId ? "Muat lebih banyak" : "Load more"} ({filtered.length - limit})
          </button>
        </div>
      )}
    </div>
  );
};

export default SolutionCatalog;
