import { Metadata } from "next";
import { BlogSectionResponse, ArticlesCollectionResponse } from "@/types/responseTypes";

import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getBlogSectionQuery } from "@/utils/queries/blogSectionQuery";
import { SITE_CONFIG } from "@/utils/seo";
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";

import CTASection from "@/components/media/CTA";
import HeroSection from "@/components/media/HeroSection";
import MainArticle from "@/components/media/MainArticle";
import BlogGrid from "@/components/media/BlogGrid";
import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";

import { getDictionary } from "@/dictionaries";
import { Locale, i18n, localeMetadata } from "@/i18n-config";

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
    title: dict.seo.blogTitle,
    description: dict.seo.blogDescription,
    keywords: lang === 'id' ? [
      'blog bioteknologi',
      'artikel pertanian',
      'tips budidaya',
      'informasi peternakan',
      'panduan perikanan',
      'centra biotech blog',
      'teknologi pertanian',
    ] : [
      'biotechnology blog',
      'agriculture articles',
      'farming tips',
      'livestock information',
      'fishery guide',
      'centra biotech blog',
      'agricultural technology',
    ],
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        'id': `${baseUrl}/id/blog`,
        'en': `${baseUrl}/en/blog`,
        'x-default': `${baseUrl}/id/blog`,
      },
    },
    openGraph: {
      title: dict.seo.blogTitle,
      description: dict.seo.blogDescription,
      url: `${baseUrl}/${lang}/blog`,
      siteName: SITE_CONFIG.name,
      locale: localeMetadata[lang].locale,
      alternateLocale: i18n.locales.filter(l => l !== lang).map(l => localeMetadata[l].locale),
      type: 'website',
    },
  };
}

const Blog = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  // Generate structured data
  const structuredDataArray = [
    generateWebPageSchema({
      name: lang === 'id' ? 'Blog Centra Biotech Indonesia' : 'Centra Biotech Indonesia Blog',
      description: dict.seo.blogDescription,
      url: `/${lang}/blog`,
    }),
    generateBreadcrumbSchema([
      { name: dict.nav.home, url: `/${lang}` },
      { name: dict.blog.title, url: `/${lang}/blog` },
    ]),
  ];

  try {
    // Fetch blog section for hero and CTA
    const sectionQuery = getBlogSectionQuery();
    const { data: sectionData } = await apiRequest<BlogSectionResponse>({
      path: ApiPath.BLOG_SECTION,
      queryParams: sectionQuery,
      locale: lang,
    });

    // Fetch ALL blog articles with locale
    const allBlogsQuery = `fields[0]=title&fields[1]=shortDescription&fields[2]=slug&fields[3]=createdAt&fields[4]=publishedAt&fields[5]=type&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=width&populate[image][fields][3]=height&pagination[pageSize]=100&sort[0]=publishedAt:desc`;
    const { data: allBlogs } = await apiRequest<ArticlesCollectionResponse>({
      path: ApiPath.BLOGS,
      queryParams: allBlogsQuery,
      locale: lang,
    });

    return (
      <section>
        {/* Structured Data for SEO */}
        <MultipleStructuredData dataArray={structuredDataArray} />
        
        <HeroSection 
          headline={sectionData.headline}
          introTitle={dict.blog.introTitle}
          introDescription={dict.blog.introDescription}
        />
        <Breadcrumb lang={lang} dict={dict} />
        
        <MainArticle data={sectionData.headlineBlog} lang={lang} dict={dict} />
        
        {/* All Blog Articles Grid with Pagination */}
        <ContainerSection>
          <h3 className="mb-8">{dict.blog.otherArticles}</h3>
          <BlogGrid articles={allBlogs} lang={lang} dict={dict} itemsPerPage={9} />
        </ContainerSection>

        <CTASection data={sectionData.bannerCTA} lang={lang} dict={dict} />
      </section>
    );
  } catch (e) {
    console.error(e);
    return (
      <section>
        <MultipleStructuredData dataArray={structuredDataArray} />
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-600">{dict.common.error}</p>
        </div>
      </section>
    );
  }
};

export default Blog;
