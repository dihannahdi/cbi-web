import { Metadata } from "next";
import { NewsSectionResponse } from "@/types/responseTypes";

import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getNewsSectionQuery } from "@/utils/queries/newsSectionQuery";

import CTASection from "@/components/media/CTA";
import HeroSection from "@/components/media/HeroSection";
import MainArticle from "@/components/media/MainArticle";
import ListArticle from "@/components/media/ListArticle";
import Breadcrumb from "@/components/common/BreadScrumb";

import { getDictionary } from "@/dictionaries";
import { Locale, i18n, localeMetadata } from "@/i18n-config";
import { SITE_CONFIG } from "@/utils/seo";
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

// Generate static params for all locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata with i18n
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = SITE_CONFIG.url;

  return {
    title: dict.seo.newsTitle,
    description: dict.seo.newsDescription,
    alternates: {
      canonical: `${baseUrl}/${lang}/news`,
      languages: {
        'id': `${baseUrl}/id/news`,
        'en': `${baseUrl}/en/news`,
        'x-default': `${baseUrl}/id/news`,
      },
    },
    openGraph: {
      title: dict.seo.newsTitle,
      description: dict.seo.newsDescription,
      url: `${baseUrl}/${lang}/news`,
      siteName: SITE_CONFIG.name,
      locale: localeMetadata[lang].locale,
      alternateLocale: i18n.locales.filter(l => l !== lang).map(l => localeMetadata[l].locale),
      type: 'website',
    },
  };
}

const Media = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  try {
    const query = getNewsSectionQuery();

    const { data } = await apiRequest<NewsSectionResponse>({
      path: ApiPath.NEWS_SECTION,
      queryParams: query,
      locale: lang,
    });

    // Collect all articles for structured data
    const allArticles = [
      ...(data.headlineNews ? [data.headlineNews] : []),
      ...(data.news1 || []),
      ...(data.news2 || []),
    ].filter(Boolean);

    // Generate structured data
    const schemas = [
      generateWebPageSchema({
        name: lang === 'id' ? 'Berita & Artikel - Centra Biotech Indonesia' : 'News & Articles - Centra Biotech Indonesia',
        description: dict.seo.newsDescription,
        url: `/${lang}/news`,
      }),
      generateBreadcrumbSchema([
        { name: dict.nav.home, url: `/${lang}` },
        { name: dict.news.title, url: `/${lang}/news` },
      ]),
      generateCollectionPageSchema({
        name: dict.news.title,
        description: dict.seo.newsDescription,
        url: `/${lang}/news`,
        items: allArticles.map((article: any) => ({
          name: article.title || '',
          url: `/${lang}/news/${article.slug || article.documentId || article.id}`,
          description: article.description || '',
        })),
      }),
    ];

    return (
      <>
        {/* Structured Data */}
        <MultipleStructuredData dataArray={schemas} />
        
        <section>
          <HeroSection 
            headline={data.headline}
            introTitle={dict.news.introTitle}
            introDescription={dict.news.introDescription}
          />
          <Breadcrumb lang={lang} dict={dict} />
          
          <MainArticle data={data.headlineNews} lang={lang} dict={dict} />
          <ListArticle news1={data.news1} news2={data.news2} lang={lang} dict={dict} />
          <CTASection data={data.bannerCTA} lang={lang} dict={dict} />
        </section>
      </>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{dict.common.error}</p>
      </div>
    );
  }
};

export default Media;
