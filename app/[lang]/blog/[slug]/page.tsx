import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import HeroSection from "@/components/media/article-detail/HeroSection";
import ArticleDetail from "@/components/media/article-detail/ArticleDetail";
import Breadcrumb from "@/components/common/BreadScrumb";
import { SITE_CONFIG, cleanMetaDescription, normalizeSeoTitle } from "@/utils/seo";
import { getImageUrl } from "@/utils/getImageUrl";
import { 
  generateArticleWithSpeakableSchema,
  generateBreadcrumbSchema,
  generateAuthorSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";
import { ArticleDetail as ArticleDetailType } from "@/types/responseTypes/article/articleDetailTypes";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

// ISR: Revalidate blog pages every 10 minutes for faster content discovery
// Shorter revalidation catches new articles quickly while still leveraging Vercel edge cache
export const revalidate = 600;

// Allow dynamic params not returned by generateStaticParams (ISR on-demand)
export const dynamicParams = true;

// Generate static params to enable ISR on dynamic routes
// Returns empty array = all pages generated on-demand with ISR caching
export function generateStaticParams() {
  return [];
}

const API_URL = (process.env.NEXT_PUBLIC_URL_API || 'https://backend.centrabiotechindonesia.com').trim();

// Helper to fetch blog data - using direct fetch with locale support
async function getBlogData(slug: string, locale: string = 'id'): Promise<ArticleDetailType | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/blogs?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=content&fields[2]=type&fields[3]=publishedAt&fields[4]=meta_title&fields[5]=meta_description&fields[6]=focus_keyphrase&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=width&populate[image][fields][3]=height&populate[author]=true&locale=${locale}`,
      {
        next: { revalidate: 600 },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const article = data?.data?.[0];
    if (!article) return null;
    
    // Ensure required fields have default values
    return {
      ...article,
      image: article.image || { id: 0, documentId: '', url: '', alternativeText: '', width: 0, height: 0 },
      author: article.author || { id: 0, documentId: '', createdAt: '', firstname: '', lastname: '', preferedLanguage: null, publishedAt: '', updatedAt: '', username: 'Author' },
    } as ArticleDetailType;
  } catch {
    return null;
  }
}

// Check if slug exists in the articles table (news) — used for redirect fallback
async function slugExistsInArticles(slug: string, locale: string = 'id'): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_URL}/api/articles?filters[slug][$eq]=${slug}&fields[0]=slug&locale=${locale}`,
      { next: { revalidate: 600 }, headers: { 'Content-Type': 'application/json' } }
    );
    if (!response.ok) return false;
    const data = await response.json();
    return (data?.data?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

// Dynamic metadata generation with i18n
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  const blog = await getBlogData(slug, lang);

  if (!blog) {
    // Check if this slug belongs to the articles (news) table and redirect
    const existsInArticles = await slugExistsInArticles(slug, lang);
    if (existsInArticles) {
      permanentRedirect(`/${lang}/news/${slug}`);
    }
    return {
      title: { absolute: normalizeSeoTitle(lang === 'id' ? 'Blog Tidak Ditemukan' : 'Blog Not Found') },
      description: lang === 'id' ? 'Artikel yang Anda cari tidak ditemukan.' : 'The article you are looking for was not found.',
    };
  }

  const title = blog.title || 'Blog Centra Biotech Indonesia';
  // Use SEO title from Strapi if available, otherwise the article title.
  // Always normalized: Strapi meta_title routinely already ends with a
  // (sometimes truncated) "| Centra Biotech" suffix, which would otherwise
  // double up with the layout's own brand template.
  const seoTitle = normalizeSeoTitle(blog.meta_title || title);
  // Use SEO description from Strapi if available
  const strapiMetaDesc = blog.meta_description;
  // Extract first 160 chars from content if it's a string, otherwise use default
  const contentPreview = typeof blog.content === 'string' 
    ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160) 
    : null;
  const description = strapiMetaDesc || cleanMetaDescription(
    contentPreview || (lang === 'id' ? `Baca artikel ${title} dari Centra Biotech Indonesia` : `Read article ${title} from Centra Biotech Indonesia`)
  );
  // Get focus keyphrase from Strapi for keywords
  const focusKeyphrase = blog.focus_keyphrase;
  const imageUrl = blog.image?.url ? getImageUrl(blog.image.url) : `${SITE_CONFIG.url}/images/og-blog.jpg`;
  
  // Get author name from author object
  const authorName = blog.author 
    ? `${blog.author.firstname || ''} ${blog.author.lastname || ''}`.trim() || blog.author.username || SITE_CONFIG.name
    : SITE_CONFIG.name;

  return {
    // absolute: brand already included by normalizeSeoTitle, exactly once.
    title: { absolute: seoTitle },
    description,
    keywords: focusKeyphrase 
      ? [focusKeyphrase, 'blog', 'bioteknologi', 'centra biotech', blog.type].filter(Boolean) 
      : ['blog', 'bioteknologi', 'centra biotech', blog.type].filter(Boolean),
    authors: [{ name: authorName }],
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/blog/${slug}`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/blog/${slug}`,
        'en': `${SITE_CONFIG.url}/en/blog/${slug}`,
        'x-default': `${SITE_CONFIG.url}/id/blog/${slug}`,
      },
    },
    openGraph: {
      title,  // Full title for social sharing
      description,
      url: `${SITE_CONFIG.url}/${lang}/blog/${slug}`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [authorName],
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Menandai komponen sebagai async component
const BlogDetail = async ({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}) => {
  try {
    const { slug, lang } = await params;
    const dict = await getDictionary(lang);
    const blogDetailData = await getBlogData(slug, lang);

    if (!blogDetailData) {
      // Redirect to /news/ if slug exists in articles table
      const existsInArticles = await slugExistsInArticles(slug, lang);
      if (existsInArticles) {
        permanentRedirect(`/${lang}/news/${slug}`);
      }
      notFound();
    }

    // Localized breadcrumb labels
    const homeLabel = lang === 'id' ? 'Beranda' : 'Home';
    const blogLabel = dict.nav.blog;

    // Get author name for structured data
    const authorName = blogDetailData.author 
      ? `${blogDetailData.author.firstname || ''} ${blogDetailData.author.lastname || ''}`.trim() || blogDetailData.author.username || SITE_CONFIG.name
      : SITE_CONFIG.name;

    // Generate content preview for description
    const contentPreview = typeof blogDetailData.content === 'string' 
      ? blogDetailData.content.replace(/<[^>]*>/g, '').substring(0, 160) 
      : (lang === 'id' ? `Baca artikel ${blogDetailData.title} dari Centra Biotech Indonesia` : `Read article ${blogDetailData.title} from Centra Biotech Indonesia`);

    // Generate enhanced structured data with Speakable and Author for E-E-A-T
    const structuredDataArray = [
      {
        ...generateArticleWithSpeakableSchema({
          title: blogDetailData.title,
          description: contentPreview,
          url: `/${lang}/blog/${slug}`,
          image: blogDetailData.image?.url || '',
          datePublished: blogDetailData.publishedAt,
          dateModified: blogDetailData.publishedAt,
          authorName: authorName,
          // Speakable selectors for voice search
          speakableSelectors: [
            'article h1',
            'article h2',
            'article > p:first-of-type',
            '.article-content p:first-of-type',
            '.blog-introduction',
          ],
        }),
        '@type': 'BlogPosting', // Override to BlogPosting type
      },
      generateBreadcrumbSchema([
        { name: homeLabel, url: `/${lang}` },
        { name: blogLabel, url: `/${lang}/blog` },
        { name: blogDetailData.title, url: `/${lang}/blog/${slug}` },
      ]),
      // Author schema for E-E-A-T signals
      generateAuthorSchema({
        name: authorName,
        worksFor: SITE_CONFIG.name,
        knowsAbout: [
          'Bioteknologi Pertanian',
          'Pupuk Hayati',
          'Pertanian Berkelanjutan',
          'Probiotik',
          'Mikrobiologi Tanah',
        ],
      }),
    ];

    return (
      <section>
        {/* Structured Data for SEO */}
        <MultipleStructuredData dataArray={structuredDataArray} />
        
        <HeroSection data={blogDetailData} />
        <Breadcrumb lang={lang} dict={dict} />
        <ArticleDetail
          content={blogDetailData.content}
          type={blogDetailData.type}
          locale={lang}
          dict={dict}
          title={blogDetailData.title}
          slug={slug}
        />
      </section>
    );
  } catch (error) {
    // Re-throw navigation errors (redirect, notFound) so Next.js handles them
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }
    console.error("Error fetching blog detail:", error);
    notFound();
  }
};

export default BlogDetail;
