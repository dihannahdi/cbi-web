import { notFound } from "next/navigation";
import { Metadata } from "next";

import { ApiPath, apiRequest } from "@/utils/apiClient";
import { ArticleDetailResponse } from "@/types/responseTypes";
import { getArticleDetailQuery } from "@/utils/queries/articlesDetailQuery";

import HeroSection from "@/components/media/article-detail/HeroSection";
import ArticleDetail from "@/components/media/article-detail/ArticleDetail";
import Breadcrumb from "@/components/common/BreadScrumb";

import { generateArticleMetadata, SITE_CONFIG, cleanMetaDescription } from "@/utils/seo";
import { 
  generateNewsArticleSchema, 
  generateBreadcrumbSchema,
  StructuredData 
} from "@/utils/structuredData";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

// Type for page props
type Props = {
  params: Promise<{ slug: string; lang: Locale }>;
};

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate dynamic metadata for each news article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  
  try {
    const query = getArticleDetailQuery(slug);
    const { data } = await apiRequest<ArticleDetailResponse>({
      path: ApiPath.NEWS,
      queryParams: query,
      locale: lang,
    });

    if (!data.length) {
      return {
        title: lang === 'en' ? 'Article Not Found' : 'Artikel Tidak Ditemukan',
        description: lang === 'en' ? 'The article you are looking for was not found.' : 'Artikel yang Anda cari tidak ditemukan.',
      };
    }

    const article = data[0];
    
    // Extract content preview for description since ArticleDetail doesn't have description field
    const contentPreview = typeof article.content === 'string' 
      ? article.content.replace(/<[^>]*>/g, '').substring(0, 160) 
      : null;
    const description = contentPreview 
      ? cleanMetaDescription(contentPreview)
      : lang === 'en' 
        ? `Read article ${article.title} from ${SITE_CONFIG.name}`
        : `Baca artikel ${article.title} dari ${SITE_CONFIG.name}`;
    
    // Get author name from author object
    const authorName = article.author 
      ? `${article.author.firstname || ''} ${article.author.lastname || ''}`.trim() || article.author.username || SITE_CONFIG.name
      : SITE_CONFIG.name;

    const metadata = generateArticleMetadata({
      title: article.title,
      description,
      image: article.image?.url,
      publishedTime: article.publishedAt,
      author: authorName,
      slug,
      section: article.type || 'News',
    });

    return {
      ...metadata,
      alternates: {
        canonical: `${SITE_CONFIG.url}/${lang}/news/${slug}`,
        languages: {
          'id': `${SITE_CONFIG.url}/id/news/${slug}`,
          'en': `${SITE_CONFIG.url}/en/news/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: lang === 'en' ? 'News' : 'Berita',
      description: lang === 'en' 
        ? 'Latest news from Centra Biotech Indonesia' 
        : 'Berita terbaru dari Centra Biotech Indonesia',
    };
  }
}

const NewsDetail = async ({ params }: Props) => {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  
  const query = getArticleDetailQuery(slug);
  const { data } = await apiRequest<ArticleDetailResponse>({
    path: ApiPath.NEWS,
    queryParams: query,
    locale: lang,
  });

  if (!data.length) {
    notFound();
  }

  const newsDetailData = data[0];

  // Get author name from author object
  const authorName = newsDetailData.author 
    ? `${newsDetailData.author.firstname || ''} ${newsDetailData.author.lastname || ''}`.trim() || newsDetailData.author.username || SITE_CONFIG.name
    : SITE_CONFIG.name;

  // Extract content preview for description
  const contentPreview = typeof newsDetailData.content === 'string' 
    ? newsDetailData.content.replace(/<[^>]*>/g, '').substring(0, 160) 
    : lang === 'en' 
      ? `Read article ${newsDetailData.title} from ${SITE_CONFIG.name}`
      : `Baca artikel ${newsDetailData.title} dari ${SITE_CONFIG.name}`;

  // Localized breadcrumb labels
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const newsLabel = dict.nav.news;

  // Generate structured data for the article
  const articleSchema = generateNewsArticleSchema({
    title: newsDetailData.title,
    description: contentPreview,
    image: newsDetailData.image?.url || '',
    datePublished: newsDetailData.publishedAt,
    dateModified: newsDetailData.publishedAt,
    authorName: authorName,
    url: `/${lang}/news/${slug}`,
    section: newsDetailData.type || 'News',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: homeLabel, url: `/${lang}` },
    { name: newsLabel, url: `/${lang}/news` },
    { name: newsDetailData.title, url: `/${lang}/news/${slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      <section>
        <HeroSection data={newsDetailData} />
        <Breadcrumb lang={lang} dict={dict} />
        <ArticleDetail
          content={newsDetailData.content}
          type={newsDetailData.type}
          locale={lang}
          dict={dict}
        />
      </section>
    </>
  );
};

export default NewsDetail;
