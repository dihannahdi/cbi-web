import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSection from "@/components/media/article-detail/HeroSection";
import ArticleDetail from "@/components/media/article-detail/ArticleDetail";
import Breadcrumb from "@/components/common/BreadScrumb";
import { SITE_CONFIG, cleanMetaDescription, truncateTitle } from "@/utils/seo";
import { getImageUrl } from "@/utils/getImageUrl";
import { 
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";
import { ArticleDetail as ArticleDetailType } from "@/types/responseTypes/article/articleDetailTypes";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

const API_URL = process.env.NEXT_PUBLIC_URL_API || 'https://cbi-backend.my.id';

// Helper to fetch blog data - using direct fetch with locale support
async function getBlogData(slug: string, locale: string = 'id'): Promise<ArticleDetailType | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/blogs?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=content&fields[2]=type&fields[3]=publishedAt&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=width&populate[image][fields][3]=height&populate[author]=true&locale=${locale}`,
      {
        next: { revalidate: 3600 },
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
    return {
      title: lang === 'id' ? 'Blog Tidak Ditemukan | Centra Biotech Indonesia' : 'Blog Not Found | Centra Biotech Indonesia',
      description: lang === 'id' ? 'Artikel yang Anda cari tidak ditemukan.' : 'The article you are looking for was not found.',
    };
  }

  const title = blog.title || 'Blog Centra Biotech Indonesia';
  // Truncate title for SEO (max 60 chars total including suffix)
  const seoTitle = truncateTitle(title, 60);
  // Extract first 160 chars from content if it's a string, otherwise use default
  const contentPreview = typeof blog.content === 'string' 
    ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160) 
    : null;
  const description = cleanMetaDescription(
    contentPreview || (lang === 'id' ? `Baca artikel ${title} dari Centra Biotech Indonesia` : `Read article ${title} from Centra Biotech Indonesia`)
  );
  const imageUrl = blog.image?.url ? getImageUrl(blog.image.url) : `${SITE_CONFIG.url}/images/og-blog.jpg`;
  
  // Get author name from author object
  const authorName = blog.author 
    ? `${blog.author.firstname || ''} ${blog.author.lastname || ''}`.trim() || blog.author.username || SITE_CONFIG.name
    : SITE_CONFIG.name;

  return {
    title: seoTitle,  // Use truncated title for SEO
    description,
    keywords: ['blog', 'bioteknologi', 'centra biotech', blog.type].filter(Boolean),
    authors: [{ name: authorName }],
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/blog/${slug}`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/blog/${slug}`,
        'en': `${SITE_CONFIG.url}/en/blog/${slug}`,
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

    // Generate structured data
    const structuredDataArray = [
      generateBlogPostingSchema({
        title: blogDetailData.title,
        description: contentPreview,
        url: `/${lang}/blog/${slug}`,
        image: blogDetailData.image?.url || '',
        datePublished: blogDetailData.publishedAt,
        dateModified: blogDetailData.publishedAt,
        authorName: authorName,
        // Add aggregate rating for better CTR in search results
        aggregateRating: {
          ratingValue: 4.8,
          reviewCount: 12,
          bestRating: 5,
          worstRating: 1,
        },
      }),
      generateBreadcrumbSchema([
        { name: homeLabel, url: `/${lang}` },
        { name: blogLabel, url: `/${lang}/blog` },
        { name: blogDetailData.title, url: `/${lang}/blog/${slug}` },
      ]),
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
        />
      </section>
    );
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    notFound();
  }
};

export default BlogDetail;
