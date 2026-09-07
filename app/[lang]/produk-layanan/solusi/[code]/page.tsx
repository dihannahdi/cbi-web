import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, ArrowLeft, AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import { SITE_CONFIG, normalizeSeoTitle } from "@/utils/seo";

import ContainerSection from "@/components/layout/container";
import SolutionCard from "@/components/catalog/SolutionCard";
import {
  getSolutionByCode,
  getAllCodes,
  getRelatedSolutions,
  getSolutionSummaries,
  sectorLabel,
  sectorColor,
  READINESS_NOTE,
} from "@/lib/catalog";

export const revalidate = 3600;

const WA_NUMBER = "6285196214187";

export async function generateStaticParams() {
  const codes = getAllCodes();
  return i18n.locales.flatMap((locale) =>
    codes.map((code) => ({ lang: locale, code })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; code: string }>;
}): Promise<Metadata> {
  const { lang, code } = await params;
  const solution = getSolutionByCode(code);
  if (!solution) return {};

  const isId = lang === "id";
  const url = `${SITE_CONFIG.url}/${lang}/produk-layanan/solusi/${code}`;
  const rawTitle = `${solution.solution} — CBI ${solution.brand}`;
  // Normalized: many of the 145 catalog titles run well past 60 chars raw
  // (up to 149), which Google rewrites anyway. normalizeSeoTitle trims the
  // topic at a word boundary and appends the brand exactly once.
  const title = normalizeSeoTitle(rawTitle);
  const description = isId
    ? `${solution.solution} untuk ${solution.komoditas}. Paket konsorsium mikroba CBI (${solution.brand}) — ${solution.phase}. Konsultasikan untuk data uji per produk.`
    : `${solution.solution} for ${solution.komoditas}. CBI microbial consortium package (${solution.brand}) — ${solution.phase}. Contact us for per-product test data.`;

  return {
    // absolute: brand already included by normalizeSeoTitle, exactly once.
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${SITE_CONFIG.url}/id/produk-layanan/solusi/${code}`,
        en: `${SITE_CONFIG.url}/en/produk-layanan/solusi/${code}`,
      },
    },
    openGraph: {
      title, // reuse the same normalized, single-brand title
      description,
      url,
      siteName: "Centra Biotech Indonesia",
      images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: title }],
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; code: string }>;
}) {
  const { lang, code } = await params;
  const solution = getSolutionByCode(code);
  if (!solution) notFound();

  const isId = lang === "id";
  const dict = await getDictionary(lang);
  const color = sectorColor(solution.sector);
  const related = getRelatedSolutions(code, 3);
  const summaries = getSolutionSummaries();
  const relatedSummaries = related
    .map((r) => summaries.find((s) => s.code === r.code))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const taglineChips = solution.tagline.split("·").map((t) => t.trim()).filter(Boolean);
  const waMessage = encodeURIComponent(
    isId
      ? `Halo, saya tertarik dengan solusi ${solution.code} — ${solution.solution} (CBI ${solution.brand}). Mohon informasi lebih lanjut.`
      : `Hello, I'm interested in solution ${solution.code} — ${solution.solution} (CBI ${solution.brand}). Please share more information.`,
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 pb-14 pt-28 text-white lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-9 xl:px-0">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href={`/${lang}`} className="hover:text-white">{dict.nav.home}</Link>
            <span>›</span>
            <Link href={`/${lang}/produk-layanan/solusi`} className="hover:text-white">
              {isId ? "Katalog Solusi" : "Solution Catalogue"}
            </Link>
            <span>›</span>
            <span className="cbi-mono font-semibold text-white">{solution.code}</span>
          </nav>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="cbi-mono rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white">
              {solution.code}
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {sectorLabel(solution.sector, lang)} · {solution.komoditas}
            </span>
            <span className="rounded-full bg-lime-500/20 px-3 py-1 text-xs font-semibold text-lime-200">
              {solution.phase}
            </span>
          </div>

          <h1 className="max-w-3xl text-white">{solution.solution}</h1>
          <p className="mt-3 text-lg font-semibold text-lime-300">
            {isId ? "Produk" : "Product"}: CBI {solution.brand}
          </p>

          {/* Tagline chips */}
          {taglineChips.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {taglineChips.map((chip, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-lime-500 px-6 py-3 font-semibold text-green-900 shadow-brand transition-all hover:-translate-y-0.5 hover:bg-lime-600"
            >
              <MessageCircle className="h-5 w-5" />
              {isId ? "Konsultasi via WhatsApp" : "Consult via WhatsApp"}
            </a>
            <Link
              href={`/${lang}/produk-layanan/solusi`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
              {isId ? "Paket Kombinasi" : "Solution Packages"}
            </Link>
          </div>
        </div>
      </section>

      <ContainerSection>
        {/* Readiness note — prominent, near the figures */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-100/60 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
          <p className="text-sm text-stone-700">{READINESS_NOTE[lang] ?? READINESS_NOTE.id}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {/* Problems */}
            <div>
              <h2 className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-danger-500" />
                {isId ? "Masalah yang Diatasi" : "Problems Addressed"}
              </h2>
              <ul className="space-y-3">
                {solution.problems.map((p, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4">
                    <span className="cbi-mono text-sm font-bold text-danger-500">{i + 1}</span>
                    <span className="text-stone-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div>
              <h2 className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                {isId ? "Cara Kerja Solusi" : "How the Solution Works"}
              </h2>
              <ul className="space-y-3">
                {solution.solusi.map((s, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-green-100 bg-green-50/50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-stone-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Composition table */}
            {solution.comp.length > 0 && (
              <div>
                <h2 className="mb-4">{isId ? "Komposisi Konsorsium" : "Consortium Composition"}</h2>
                <div className="overflow-x-auto rounded-2xl border border-stone-200">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-stone-100 text-stone-600">
                      <tr>
                        <th className="px-4 py-3 font-semibold">{isId ? "Organisme" : "Organism"}</th>
                        <th className="px-4 py-3 font-semibold">{isId ? "Kode" : "Code"}</th>
                        <th className="px-4 py-3 font-semibold">{isId ? "Kepadatan" : "Density"}</th>
                        <th className="px-4 py-3 font-semibold">{isId ? "Mekanisme" : "Mechanism"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-150">
                      {solution.comp.map((c, i) => (
                        <tr key={i} className="bg-white">
                          <td className="px-4 py-3 font-medium italic text-stone-800">{c.n}</td>
                          <td className="cbi-mono px-4 py-3 text-stone-600">{c.code}</td>
                          <td className="cbi-mono px-4 py-3 text-stone-600">{c.conc}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                              {c.mech}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ROI / value */}
            {solution.roi.length > 0 && (
              <div>
                <h2 className="mb-4">{isId ? "Nilai & Perkiraan ROI" : "Value & Estimated ROI"}</h2>
                <ul className="space-y-3">
                  {solution.roi.map((r, i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 text-stone-700">
                      <span className="text-gold-600">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4">{isId ? "Ringkasan" : "Summary"}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">{isId ? "Kode" : "Code"}</dt>
                  <dd className="cbi-mono font-medium text-stone-800">{solution.code}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">{isId ? "Sektor" : "Sector"}</dt>
                  <dd className="font-medium text-stone-800">{sectorLabel(solution.sector, lang)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">{isId ? "Komoditas" : "Commodity"}</dt>
                  <dd className="font-medium text-stone-800">{solution.komoditas}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">{isId ? "Fase" : "Phase"}</dt>
                  <dd className="font-medium text-stone-800">{solution.phase}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">{isId ? "Produk" : "Product"}</dt>
                  <dd className="font-medium text-brand">CBI {solution.brand}</dd>
                </div>
              </dl>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-full"
              >
                <MessageCircle className="h-4 w-4" />
                {isId ? "Konsultasi Gratis" : "Free Consultation"}
              </a>
            </div>

            {/* Cross-link to flagship product line (claim-safe) */}
            <div className="rounded-2xl border border-green-100 bg-green-50/60 p-6">
              <h3 className="mb-2 text-base">{isId ? "Produk Unggulan Kami" : "Our Flagship Products"}</h3>
              <p className="text-sm text-stone-600">
                {isId
                  ? "Lihat produk hayati bersertifikat yang sudah beredar dari lini pertanian Centra Biotech."
                  : "Explore our certified, market-ready biological products from Centra Biotech's agriculture line."}
              </p>
              <Link
                href={`/${lang}/produk-layanan/pertanian`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                {isId ? "Lihat produk unggulan" : "View flagship products"} →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related solutions */}
        {relatedSummaries.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6">{isId ? "Solusi Terkait" : "Related Solutions"}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSummaries.map((s) => (
                <SolutionCard key={s.code} solution={s} lang={lang} />
              ))}
            </div>
          </div>
        )}
      </ContainerSection>
    </main>
  );
}
