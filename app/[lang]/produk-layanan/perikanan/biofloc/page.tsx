import { Metadata } from "next";
import Image from "next/image";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import { SITE_CONFIG, normalizeSeoTitle } from "@/utils/seo";

import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import LinkGreen from "@/components/home/LinkGreen";

export const revalidate = 3600;

const HERO_IMG = "/img/sections/industri-perikanan.webp";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seg = dict.products.fisheryBiofloc;
  const url = `${SITE_CONFIG.url}/${lang}/produk-layanan/perikanan/biofloc`;

  return {
    // absolute: seg.metaTitle is a static dictionary string that already
    // ends with "| CBI"; normalizeSeoTitle strips that and re-appends the
    // full brand once, so it does not double up with the layout template.
    title: { absolute: normalizeSeoTitle(seg.metaTitle) },
    description: seg.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        id: `${SITE_CONFIG.url}/id/produk-layanan/perikanan/biofloc`,
        en: `${SITE_CONFIG.url}/en/produk-layanan/perikanan/biofloc`,
      },
    },
    openGraph: {
      title: seg.metaTitle,
      description: seg.metaDescription,
      url,
      siteName: "Centra Biotech Indonesia",
      images: [
        {
          url: `${SITE_CONFIG.url}${HERO_IMG}`,
          width: 1200,
          height: 630,
          alt: seg.title,
        },
      ],
      locale: lang === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seg.metaTitle,
      description: seg.metaDescription,
      images: [`${SITE_CONFIG.url}${HERO_IMG}`],
    },
    keywords:
      lang === "id"
        ? [
            "probiotik bioflok",
            "sistem bioflok lele",
            "sistem bioflok nila",
            "bioteknologi akuakultur",
            "budidaya intensif ikan",
            "probiotik gurame",
          ]
        : [
            "biofloc probiotics",
            "biofloc catfish system",
            "biofloc tilapia system",
            "aquaculture biotechnology",
            "intensive fish farming",
            "gourami probiotics",
          ],
  };
}

const COMMODITIES = [
  { key: "lele", labelId: "Lele", labelEn: "Catfish" },
  { key: "nila", labelId: "Nila", labelEn: "Tilapia" },
  { key: "gurame", labelId: "Gurame", labelEn: "Gourami" },
];

export default async function PerikananBiofloc({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seg = dict.products.fisheryBiofloc;
  const baseUrl = SITE_CONFIG.url;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: dict.nav.products, item: `${baseUrl}/${lang}/produk-layanan` },
      { "@type": "ListItem", position: 3, name: dict.nav.fishery, item: `${baseUrl}/${lang}/produk-layanan/perikanan` },
      { "@type": "ListItem", position: 4, name: dict.nav.perikananBiofloc, item: `${baseUrl}/${lang}/produk-layanan/perikanan/biofloc` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSectionGeneral
        imgUrl={HERO_IMG}
        category={seg.subtitle}
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            {seg.title}
          </h1>
        }
      />

      <Breadcrumb className="bg-[#F4F4F4]" lang={lang} dict={dict} />

      <section className="bg-[#F4F4F4]">
        <ContainerSection>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
              {seg.subtitle}
            </h2>
            <p className="leading-relaxed text-gray-600 md:text-lg">
              {seg.description}
            </p>
          </div>
        </ContainerSection>
      </section>

      <section>
        <ContainerSection>
          <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">
            {lang === "id" ? "Komoditas Akuakultur Bioflok" : "Biofloc Aquaculture Commodities"}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMMODITIES.map((c) => (
              <div
                key={c.key}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-[#7CB518]"
              >
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {lang === "id" ? c.labelId : c.labelEn}
                </h3>
                <p className="text-sm text-gray-600">
                  {lang === "id"
                    ? "Sistem bioflok dengan probiotik CBI untuk efisiensi air dan akselerasi panen."
                    : "Biofloc system with CBI probiotics for water efficiency and accelerated harvest."}
                </p>
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>

      <section>
        <ContainerSection>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              { src: "/img/sections/industri-perikanan.webp", alt: lang === "id" ? "Industri Akuakultur" : "Aquaculture Industry" },
              { src: "/img/sections/uji-lapangan.webp", alt: lang === "id" ? "Uji Lapangan" : "Field Trial" },
              { src: "/img/sections/kredibilitas-ilmiah.webp", alt: lang === "id" ? "Kredibilitas Ilmiah" : "Scientific Credibility" },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>

      <section>
        <ContainerSection>
          <div className="rounded-3xl bg-[#083F19] p-8 text-white md:p-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-3xl lg:text-4xl">
                {lang === "id"
                  ? "Konsultasi Sistem Bioflok?"
                  : "Need Biofloc System Consultation?"}
              </h2>
              <LinkGreen href={`/${lang}/contact`} withArrow>
                {lang === "id" ? "Hubungi Kami" : "Contact Us"}
              </LinkGreen>
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
}
