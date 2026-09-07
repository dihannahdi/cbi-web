import { Metadata } from "next";
import Link from "next/link";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import { SITE_CONFIG, normalizeSeoTitle } from "@/utils/seo";

import ContainerSection from "@/components/layout/container";
import SolutionCatalog from "@/components/catalog/SolutionCatalog";
import LinkGreen from "@/components/home/LinkGreen";
import {
  getSolutionSummaries,
  getSectorTiles,
  CATALOG_TOTAL,
} from "@/lib/catalog";

export const revalidate = 3600;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isId = lang === "id";
  const url = `${SITE_CONFIG.url}/${lang}/produk-layanan/solusi`;
  const rawTitle = isId
    ? `${CATALOG_TOTAL} Paket Solusi Bioteknologi Siap Pakai`
    : `${CATALOG_TOTAL} Ready-to-Use Biotech Solution Packages`;
  const title = normalizeSeoTitle(rawTitle);
  const description = isId
    ? "Katalog solusi konsorsium mikroba CBI per komoditas & fase budidaya — pangan, hortikultura, perkebunan, peternakan, akuakultur, dan bioproses industri."
    : "CBI's catalogue of microbial consortium solutions by commodity & cultivation phase — food crops, horticulture, plantation, livestock, aquaculture, and industrial bioprocess.";

  return {
    // absolute: brand already included by normalizeSeoTitle, exactly once.
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${SITE_CONFIG.url}/id/produk-layanan/solusi`,
        en: `${SITE_CONFIG.url}/en/produk-layanan/solusi`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Centra Biotech Indonesia",
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function SolusiPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isId = lang === "id";
  const dict = await getDictionary(lang);

  const summaries = getSolutionSummaries();
  const sectorTiles = getSectorTiles();

  return (
    <main>
      {/* Hero — deep forest panel (clears the fixed navbar) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 pb-14 pt-28 text-white lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-9 xl:px-0">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href={`/${lang}`} className="hover:text-white">
              {dict.nav.home}
            </Link>
            <span>›</span>
            <Link href={`/${lang}/produk-layanan`} className="hover:text-white">
              {dict.nav.products}
            </Link>
            <span>›</span>
            <span className="font-semibold text-white">
              {isId ? "Katalog Solusi" : "Solution Catalogue"}
            </span>
          </nav>

          <p className="cbi-eyebrow !text-lime-300">
            {isId ? "Paket Kombinasi" : "Solution Packages"}
          </p>
          <h1 className="mt-3 max-w-4xl text-white">
            {isId
              ? `${CATALOG_TOTAL} Paket Solusi Bioteknologi Siap Pakai`
              : `${CATALOG_TOTAL} Ready-to-Use Biotech Solution Packages`}
          </h1>
          <p className="mt-5 max-w-2xl text-white/85">
            {isId
              ? "Solusi konsorsium mikroba per komoditas & fase budidaya — dari persiapan lahan hingga pascapanen, hingga bioproses industri, untuk pangan, hortikultura, perkebunan, peternakan, dan akuakultur."
              : "Microbial consortium solutions by commodity & cultivation phase — from land preparation to post-harvest and industrial bioprocess, across food crops, horticulture, plantation, livestock, and aquaculture."}
          </p>
        </div>
      </section>

      {/* Catalog */}
      <ContainerSection>
        <SolutionCatalog
          solutions={summaries}
          sectorTiles={sectorTiles}
          lang={lang}
        />

        {/* Readiness / consultation note */}
        <p className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-4 text-center text-sm text-stone-500">
          {isId
            ? "Angka pada setiap solusi merupakan spesifikasi target & rentang hasil uji lapang; hasil aktual bervariasi menurut kondisi. Konsultasikan dengan tim kami untuk data uji per produk."
            : "Figures shown for each solution are target specifications & field-trial ranges; actual results vary by conditions. Contact our team for per-product test data."}
        </p>
      </ContainerSection>

      {/* Contact CTA */}
      <section className="bg-green-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-white">
            {isId ? "Butuh bantuan memilih solusi?" : "Need help choosing a solution?"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            {isId
              ? "Tim agronomi kami siap membantu menyusun paket yang tepat untuk komoditas dan kondisi lahan Anda."
              : "Our agronomy team is ready to help design the right package for your commodity and field conditions."}
          </p>
          <div className="mt-8 flex justify-center">
            <LinkGreen href={`/${lang}/contact`} variant="accent">
              {isId ? "Konsultasi Gratis" : "Free Consultation"}
            </LinkGreen>
          </div>
        </div>
      </section>
    </main>
  );
}
