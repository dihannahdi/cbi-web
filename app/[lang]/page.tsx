import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getDashboardQuery } from "@/utils/queries/dashboardQuery";
import { generateQuery } from "@/utils/generateQuery";

import { DashboardResponse } from "@/types/responseTypes";
import { ArticleItem } from "@/types/responseTypes/article/articleItem";
import { LatestNews } from "@/types/responseTypes/dashboard/latestNews";

import WhySection from "@/components/home/WhySection";
import HeroSection from "@/components/home/HeroSection";
import OurImpactSection from "@/components/home/OurImpactSection";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import ProductServiceSection from "@/components/home/ProductServiceSection";
import BannerContactSection from "@/components/home/BannerContactSection";

import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateBreadcrumbSchema,
  StructuredData,
  MultipleStructuredData 
} from "@/utils/structuredData";
import { generateMetadataFromProps, SITE_CONFIG } from "@/utils/seo";
import { 
  generateItemListSchema, 
  generateComprehensiveOrganizationSchema,
  generateWebsiteWithSearchSchema 
} from "@/utils/advancedSEO";
import { getDictionary } from "@/dictionaries";
import { Locale, i18n, localeMetadata } from "@/i18n-config";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

// Query for fetching latest articles directly (sorted by publishedAt desc)
const LATEST_ARTICLES_LIMIT = 7;

// Slugs to exclude from the homepage latest news section
const EXCLUDED_BLOG_SLUGS = ['pupuk-hayati-bersertifikat-kementan'];

function getLatestArticlesQuery() {
  return generateQuery({
    sort: 'publishedAt:desc',
    pagination: { limit: LATEST_ARTICLES_LIMIT },
    fields: ['title', 'shortDescription', 'slug', 'createdAt', 'publishedAt', 'type'],
    populate: {
      image: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      },
    },
  });
}

// Fetch latest blogs and news directly from their collection endpoints
async function getLatestArticles(locale: string = 'id'): Promise<LatestNews> {
  const query = getLatestArticlesQuery();

  const [blogsRes, newsRes] = await Promise.all([
    apiRequest<{ data: ArticleItem[] }>({
      path: ApiPath.BLOGS,
      queryParams: query,
      locale,
    }).catch(() => ({ data: [] as ArticleItem[] })),
    apiRequest<{ data: ArticleItem[] }>({
      path: ApiPath.NEWS,
      queryParams: query,
      locale,
    }).catch(() => ({ data: [] as ArticleItem[] })),
  ]);

  return {
    id: 0,
    blogs: (blogsRes.data ?? []).filter(b => !EXCLUDED_BLOG_SLUGS.includes(b.slug)).slice(0, 6),
    news: newsRes.data ?? [],
  };
}

// Fungsi untuk mengambil data dari API
async function getDashboardData(locale: string = 'id') {
  try {
    const query = getDashboardQuery();
    const { data } = await apiRequest<DashboardResponse>({
      path: ApiPath.DASHBOARD,
      queryParams: query,
      locale: locale,
    });
    return data;
  } catch (e) {
    console.error("Error fetching dashboard data:", e);
    return null;
  }
}

// Generate static params for all locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Enhanced metadata generation for SEO with i18n
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = await getDashboardData();
  const metadata = localeMetadata[lang];

  const baseUrl = SITE_CONFIG.url;

  // Default metadata jika data gagal diambil
  if (!data || !data.metadata) {
    return {
      ...generateMetadataFromProps({
        title: dict.nav.home,
        description: dict.metadata.description,
        url: `/${lang}`,
      }),
      alternates: {
        canonical: `${baseUrl}/${lang}`,
        languages: {
          'id': `${baseUrl}/id`,
          'en': `${baseUrl}/en`,
          'x-default': `${baseUrl}/id`,
        },
      },
    };
  }

  // Enhanced metadata from API with additional SEO fields
  return {
    ...generateMetadataFromProps({
      title: lang === 'id' ? (data.metadata.titleTag || dict.nav.home) : dict.seo.homeTitle,
      description: lang === 'id' ? (data.metadata.metaDesc || dict.metadata.description) : dict.metadata.description,
      image: data.headline?.image?.url || SITE_CONFIG.ogImage,
      url: `/${lang}`,
      type: "website",
    }),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'id': `${baseUrl}/id`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/id`,
      },
    },
    openGraph: {
      locale: metadata.locale,
      alternateLocale: i18n.locales.filter(l => l !== lang).map(l => localeMetadata[l].locale),
    },
  };
}

const Home = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const [data, latestNews] = await Promise.all([
    getDashboardData(lang),
    getLatestArticles(lang),
  ]);

  if (!data) {
    return <div>{dict.common.error}</div>;
  }

  // Generate structured data for SEO
  const organizationSchema = generateOrganizationSchema({
    name: SITE_CONFIG.name,
    description: dict.metadata.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    address: SITE_CONFIG.address,
    contactPoint: {
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: 'Customer Service',
    },
    socialMedia: [
      SITE_CONFIG.facebook,
      SITE_CONFIG.instagram,
      SITE_CONFIG.linkedin,
      SITE_CONFIG.youtube,
    ].filter(Boolean),
  });

  const websiteSchema = generateWebsiteSchema({
    name: SITE_CONFIG.name,
    description: dict.metadata.description,
    url: SITE_CONFIG.url,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.nav.home, url: `/${lang}` }
  ]);

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      {/* Page Content with Semantic HTML */}
      <main>
        <HeroSection data={data.headline} lang={lang} dict={dict} />
        <WhySection data={data.whySection} lang={lang} dict={dict} />
        <ProductServiceSection data={data.productService} lang={lang} dict={dict} />
        <OurImpactSection data={data.ourImpact} lang={lang} dict={dict} />
        <LatestNewsSection data={latestNews} lang={lang} dict={dict} />
        <BannerContactSection data={data.bannerCTA} lang={lang} dict={dict} />
      </main>
    </>
  );
};

export default Home;
