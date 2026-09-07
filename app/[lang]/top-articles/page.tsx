import { Metadata } from "next";
import { SITE_CONFIG, normalizeSeoTitle } from "@/utils/seo";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData,
} from "@/utils/structuredData";
import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";
import { getDictionary } from "@/dictionaries";
import { Locale, i18n, localeMetadata } from "@/i18n-config";
import TopArticlesDashboard from "@/components/media/TopArticlesDashboard";

export const revalidate = 600;

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = SITE_CONFIG.url;

  const rawTitle =
    lang === "id"
      ? "Top Artikel - Pemantauan Performa Artikel"
      : "Top Articles - Article Performance Monitor";
  // Normalized: 68-69 chars once the layout's brand template is appended.
  // This route is noindex, but the <title> tag is still rendered.
  const title = normalizeSeoTitle(rawTitle);
  const description =
    lang === "id"
      ? "Dashboard pemantauan performa artikel Centra Biotech Indonesia. Lihat artikel dengan performa terbaik berdasarkan klik, tayangan, dan posisi pencarian."
      : "Article performance monitoring dashboard for Centra Biotech Indonesia. View top performing articles by clicks, impressions, and search position.";

  return {
    // absolute: brand already included by normalizeSeoTitle, exactly once.
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${baseUrl}/${lang}/top-articles`,
      languages: {
        id: `${baseUrl}/id/top-articles`,
        en: `${baseUrl}/en/top-articles`,
        "x-default": `${baseUrl}/id/top-articles`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/top-articles`,
      siteName: SITE_CONFIG.name,
      locale: localeMetadata[lang].locale,
      type: "website",
    },
  };
}

const TopArticlesPage = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const structuredDataArray = [
    generateWebPageSchema({
      name:
        lang === "id"
          ? "Top Artikel - Centra Biotech Indonesia"
          : "Top Articles - Centra Biotech Indonesia",
      description:
        lang === "id"
          ? "Dashboard pemantauan performa artikel"
          : "Article performance monitoring dashboard",
      url: `/${lang}/top-articles`,
    }),
    generateBreadcrumbSchema([
      { name: dict.nav.home, url: `/${lang}` },
      {
        name: lang === "id" ? "Top Artikel" : "Top Articles",
        url: `/${lang}/top-articles`,
      },
    ]),
  ];

  return (
    <section>
      <MultipleStructuredData dataArray={structuredDataArray} />

      {/* Hero */}
      <div className="bg-[#083F19] text-white">
        <ContainerSection className="py-10 lg:py-14">
          <h1 className="text-2xl font-bold lg:text-4xl">
            {lang === "id"
              ? "📊 Pemantauan Performa Artikel"
              : "📊 Article Performance Monitor"}
          </h1>
          <p className="mt-3 text-sm text-white/70 lg:text-base">
            {lang === "id"
              ? "Data klik & tayangan dari Google Search Console (28 hari terakhir). Diperbarui setiap hari."
              : "Click & impression data from Google Search Console (last 28 days). Updated daily."}
          </p>
        </ContainerSection>
      </div>

      <Breadcrumb lang={lang} dict={dict} />

      <ContainerSection>
        <TopArticlesDashboard lang={lang} />
      </ContainerSection>
    </section>
  );
};

export default TopArticlesPage;
