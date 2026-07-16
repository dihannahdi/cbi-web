import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

import type { Locale } from "@/i18n-config";
import { CATALOG_TOTAL } from "@/lib/catalog";

const CatalogBanner = ({ lang }: { lang: Locale }) => {
  const isId = lang === "id";
  return (
    <section className="px-6 py-12 lg:px-9 lg:py-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-8 text-white shadow-brand lg:p-12">
          <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="cbi-eyebrow !text-lime-300">
                {isId ? "Paket Kombinasi" : "Solution Packages"}
              </p>
              <h2 className="mt-3 text-white">
                {isId
                  ? `${CATALOG_TOTAL} Paket Solusi Bioteknologi Siap Pakai`
                  : `${CATALOG_TOTAL} Ready-to-Use Biotech Solution Packages`}
              </h2>
              <p className="mt-3 text-white/85">
                {isId
                  ? "Solusi konsorsium mikroba per komoditas & fase budidaya — dari persiapan lahan hingga bioproses industri."
                  : "Microbial consortium solutions by commodity & phase — from land preparation to industrial bioprocess."}
              </p>
            </div>
            <Link
              href={`/${lang}/produk-layanan/solusi`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime-500 px-6 py-3 font-semibold text-green-900 transition-all hover:-translate-y-0.5 hover:bg-lime-600"
            >
              <LayoutGrid className="h-5 w-5" />
              {isId ? "Jelajahi Katalog" : "Explore Catalogue"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogBanner;
