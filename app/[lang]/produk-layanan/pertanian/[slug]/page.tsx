import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import VideoGallerySlider from "@/components/product/VideoGallerySlider";
import { SITE_CONFIG, truncateTitle, cleanMetaDescription } from "@/utils/seo";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  generateVideoSchema,
  generateFAQSchema,
  generateProductSchemaWithImageGallery,
  generateImageObjectSchema,
  MultipleStructuredData
} from "@/utils/structuredData";
import { getProductSEOData } from "@/utils/productSEOData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Award,
  Leaf,
  Shield,
  Droplets,
  CheckCircle,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Calendar,
  Package,
  ExternalLink,
  ChevronRight,
  Sprout,
  Wheat,
  TreeDeciduous,
  Cherry,
  Carrot,
  Phone,
  ShoppingCart,
  FileText,
  Download,
  Play,
  Star,
  TrendingUp,
  Users,
  MapPin,
  MessageCircle,
  BadgeCheck,
  Zap,
  Clock,
  ArrowRight,
  Youtube,
  Bug,
  Microscope,
  Beaker,
} from "lucide-react";
import { notFound } from "next/navigation";

// Strapi API Base URL
const STRAPI_URL = (process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com").trim();

// Types
interface ProductData {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  ctaWhatsapp: string;
  ctaShopee: string;
  ctaCatalog: string;
  ctaBrochure: string;
  ctaCertificate: string;
  videoSectionTitle: string;
  videoSectionSubtitle: string;
  whatsappNumber: string;
  whatsappMessage: string;
  primaryColor: string;
  secondaryColor: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  heroBannerTitle?: string;
  benefitsSectionTitle?: string;
  certificationsSectionTitle?: string;
  certificationsSectionSubtitle?: string;
  faqSectionTitle?: string;
  ctaQuestionTitle?: string;
  btnWhatsappLabel?: string;
  btnShopeeLabel?: string;
  btnBrochureLabel?: string;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  focus_keyphrase?: string;
  btnDemplotLabel?: string;
  heroImage?: { url: string } | null;
  productImage?: { url: string } | null;
  productGallery?: Array<{ url: string; width?: number; height?: number }>;
  certifications: Array<{
    id: number;
    label: string;
    value: string;
    icon: string;
    link?: string;
    logoUrl?: string;
  }>;
  benefits: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  faq: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
  videos: Array<{
    id: number;
    videoId: string;
    title: string;
    embedUrl: string;
    type: "youtube" | "tiktok";
    thumbnailUrl?: string;
  }>;
  externalLinks?: {
    brochure?: string;
    certificate?: string;
    shopee?: string;
    tokopedia?: string;
    inaproc?: string;
    tkdn?: string;
    demplotPdf?: string;
    testReport1?: string;
    testReport2?: string;
  };
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    trending: TrendingUp,
    leaf: Leaf,
    shield: Shield,
    sprout: Sprout,
    zap: Zap,
    droplets: Droplets,
    microscope: Microscope,
    bug: Bug,
    sparkles: Sparkles,
    clock: Clock,
    beaker: Beaker,
    award: Award,
    badge: BadgeCheck,
    government: Shield,
    organic: Leaf,
    sni: ShieldCheck,
    kan: Award,
    tkdn: BadgeCheck,
  };
  return icons[iconName] || CheckCircle;
};

// Get product hero image based on slug (fallback)
function getProductHeroImage(slug: string): string {
  const heroImages: Record<string, string> = {
    "rajabio-pupuk-organik-cair": "/product SKU/Rajabio/e-brochure Rajabio-page-0007.jpg",
    "floraone-pupuk-hayati": "/product SKU/Floraone/e-brochure Flora One-page-0002.jpg",
    "biokiller-insektisida-hayati": "/product SKU/Biokiller/e-brochure Bioo Killer-page-0012.jpg",
    "simbios-pupuk-hayati-cair": "/product SKU/Simbios/e-brochure Simbios-page-0017.jpg",
    "floraone-pupuk-hayati-padat": "/product SKU/Floraone/e-brochure Flora One-page-0003.jpg",
    "blackturbo-asam-humat-cair": "/Cover Black Turbo.webp",
    "biojagat-pupuk-hayati-cair": "/products/rajabio/rajabio-cover.webp",
    "biokalsi-dolomit-pembenah-tanah": "/dolomit-biokalsi-mockup.png",
    "terrachamp": "/img-placeholder.png",
    "lumbricompost": "/img-placeholder.png",
  };
  return heroImages[slug] || "/img-placeholder.png";
}

// Get product main image based on slug (fallback)
function getProductMainImage(slug: string): string {
  const productImages: Record<string, string> = {
    "rajabio-pupuk-organik-cair": "/product SKU/Rajabio/e-brochure Rajabio-page-0001.jpg",
    "floraone-pupuk-hayati": "/product SKU/Floraone/e-brochure Flora One-page-0001.jpg",
    "biokiller-insektisida-hayati": "/product SKU/Biokiller/e-brochure Bioo Killer-page-0001.jpg",
    "simbios-pupuk-hayati-cair": "/product SKU/Simbios/e-brochure Simbios-page-0001.jpg",
    "floraone-pupuk-hayati-padat": "/product SKU/Floraone/e-brochure Flora One-page-0001.jpg",
    "blackturbo-asam-humat-cair": "/mockup-black-turbo (1).png",
    "biojagat-pupuk-hayati-cair": "/products/rajabio/rajabio-cover.webp",
    "biokalsi-dolomit-pembenah-tanah": "/dolomit-biokalsi-mockup.png",
    "terrachamp": "/img-placeholder.png",
    "lumbricompost": "/img-placeholder.png",
  };
  return productImages[slug] || "/img-placeholder.png";
}

// Build populate query for Strapi v5 (explicit populate needed for media/relations)
const buildPopulateQuery = () => {
  const populateFields = [
    'heroImage',
    'productImage', 
    'productGallery',
    'stats',
    'benefits',
    'composition',
    'dosage',
    'pricing',
    'certifications',
    'faq',
    'videos',
    'externalLinks',
    'metadata'
  ];
  // Also fetch SEO fields explicitly
  const seoFields = ['meta_title', 'meta_description', 'focus_keyphrase'];
  const fieldsQuery = seoFields.map((f, i) => `fields[${i}]=${f}`).join('&');
  return populateFields.map(field => `populate=${field}`).join('&') + '&' + fieldsQuery;
};

// Fetch product data from Strapi with locale support
async function getProductBySlug(slug: string, locale: string = 'en'): Promise<ProductData | null> {
  try {
    const populateQuery = buildPopulateQuery();
    // First try with requested locale
    const res = await fetch(
      `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&${populateQuery}&locale=${locale}`,
      { 
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch product: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    
    // If no data in requested locale and locale is 'id', try English fallback
    // (since product content is currently only in English)
    if ((!data.data || data.data.length === 0) && locale === 'id') {
      console.warn(`[Strapi] Product ${slug} not found in ${locale}, trying English fallback`);
      const fallbackRes = await fetch(
        `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&${populateQuery}&locale=en`,
        { 
          next: { revalidate: 60 },
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (fallbackData.data && fallbackData.data.length > 0) {
          return fallbackData.data[0];
        }
      }
    }
    
    if (!data.data || data.data.length === 0) {
      return null;
    }
    
    return data.data[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get all product slugs for static generation
async function getAllProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/product-detail-pages?filters[category][$eq]=agriculture&fields[0]=slug`,
      { next: { revalidate: 60 } }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data?.map((p: { slug: string }) => p.slug) || [];
  } catch {
    return [];
  }
}

// Generate static params for all locales and products
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  const params: { lang: string; slug: string }[] = [];
  
  for (const locale of i18n.locales) {
    for (const slug of slugs) {
      params.push({ lang: locale, slug });
    }
  }
  
  // Also add fallback slugs in case API is down
  const fallbackSlugs = [
    "rajabio-pupuk-organik-cair",
    "floraone-pupuk-hayati",
    "biokiller-insektisida-hayati",
    "simbios-pupuk-hayati-cair",
    "floraone-pupuk-hayati-padat",
    "blackturbo-asam-humat-cair",
    "biojagat-pupuk-hayati-cair",
    "biokalsi-dolomit-pembenah-tanah",
    "terrachamp",
    "lumbricompost",
  ];
  
  for (const locale of i18n.locales) {
    for (const slug of fallbackSlugs) {
      if (!params.find(p => p.lang === locale && p.slug === slug)) {
        params.push({ lang: locale, slug });
      }
    }
  }
  
  return params;
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = await getProductBySlug(slug, lang);
  
  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      description: "Halaman produk yang Anda cari tidak ditemukan.",
    };
  }
  
  const baseUrl = SITE_CONFIG.url;
  const pageUrl = `${baseUrl}/${lang}/produk-layanan/pertanian/${slug}`;
  
  // Use SEO fields from Strapi if available, fallback to generated values
  // Truncate title for mobile SEO (max 60 chars)
  const rawTitle = product.meta_title || `${product.name} - ${product.subtitle}`;
  const metaTitle = truncateTitle(rawTitle, 60);
  
  // Clean and optimize description for mobile (max 155 chars for mobile display)
  const rawDescription = product.meta_description || product.description;
  const metaDescription = cleanMetaDescription(rawDescription, 155);
  
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: product.focus_keyphrase ? [product.focus_keyphrase, product.name, "pupuk organik", "pertanian Indonesia"].join(", ") : undefined,
    alternates: {
      canonical: pageUrl,
      languages: {
        id: `${baseUrl}/id/produk-layanan/pertanian/${slug}`,
        en: `${baseUrl}/en/produk-layanan/pertanian/${slug}`,
        'x-default': `${baseUrl}/id/produk-layanan/pertanian/${slug}`,
      },
    },
    openGraph: {
      title: product.meta_title || product.heroTitle,
      description: product.meta_description || product.heroSubtitle,
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? "en_US" : "id_ID",
      type: "website",
      images: [
        {
          url: product.productImage?.url || getProductMainImage(slug),
          width: 1200,
          height: 630,
          alt: `${product.name} - ${product.subtitle}`,
        },
      ],
    },
  };
}

// Main component
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const product = await getProductBySlug(slug, lang);
  
  if (!product) {
    notFound();
  }
  
  // Helper to resolve Strapi media URLs
  const resolveMediaUrl = (url: string | undefined | null): string | null => {
    if (!url) return null;
    // If already absolute URL, return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    // Prepend Strapi base URL for relative paths
    return `${STRAPI_URL}${url}`;
  };
  
  // Get fallback images - resolve Strapi media URLs
  const heroImage = resolveMediaUrl(product.heroImage?.url) || getProductHeroImage(slug);
  const productImage = resolveMediaUrl(product.productImage?.url) || getProductMainImage(slug);
  
  // WhatsApp link
  const whatsappLink = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(product.whatsappMessage)}`;
  
  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Produk & Layanan", url: `/${lang}/produk-layanan` },
    { name: "Pertanian", url: `/${lang}/produk-layanan/pertanian` },
    { name: product.name, url: `/${lang}/produk-layanan/pertanian/${slug}` },
  ];
  
  // Structured data - use enterprise SEO data if available
  const enterpriseSEO = getProductSEOData(slug);
  
  // Prepare image gallery for enhanced schema
  const imageGallery: Array<{
    url: string;
    width?: number;
    height?: number;
    caption?: string;
    encodingFormat?: string;
  }> = [];
  
  // Add product main image first (representative)
  if (product.productImage?.url) {
    imageGallery.push({
      url: product.productImage.url.startsWith('http') 
        ? product.productImage.url 
        : `${STRAPI_URL}${product.productImage.url}`,
      caption: `${product.name} - ${product.subtitle}`,
      encodingFormat: 'image/webp',
    });
  }
  
  // Add product gallery images
  if (product.productGallery && Array.isArray(product.productGallery)) {
    product.productGallery.forEach((img: { url?: string }, index: number) => {
      if (img.url) {
        imageGallery.push({
          url: img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`,
          caption: `${product.name} - Gallery Image ${index + 1}`,
          encodingFormat: 'image/webp',
        });
      }
    });
  }
  
  // Use enhanced schema with image gallery
  const productSchema = generateProductSchemaWithImageGallery(
    enterpriseSEO ? {
      ...enterpriseSEO,
      // Override with current page URL for correct locale
      url: `/${lang}/produk-layanan/pertanian/${slug}`,
      // Use dynamic name from CMS
      name: `${product.name} - ${product.subtitle}`,
      description: product.description,
      image: productImage.startsWith("http") ? productImage : `${SITE_CONFIG.url}${productImage}`,
    } : {
      name: `${product.name} - ${product.subtitle}`,
      description: product.description,
      image: productImage.startsWith("http") ? productImage : `${SITE_CONFIG.url}${productImage}`,
      brand: "Centra Biotech Indonesia",
      category: "Pupuk",
      url: `/${lang}/produk-layanan/pertanian/${slug}`,
      // NOTE: no `offers` block here on purpose. This is a B2B site with no
      // published retail price for these CMS-driven products, so emitting a
      // placeholder price (previously hardcoded to 0) would misrepresent the
      // product to Google Merchant/Product rich results. See GSC structured
      // data remediation notes (2026-07-28) for details.
    },
    imageGallery.length > 0 ? imageGallery : undefined
  );
  
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: `${SITE_CONFIG.url}${item.url}`,
    }))
  );
  
  const faqSchema = product.faq.length > 0 
    ? generateFAQSchema(
        product.faq.map((f) => ({ question: f.question, answer: f.answer }))
      )
    : null;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [productSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);
  
  // Add ImageObject Schema for Product Images - Google Image License Metadata
  // Fixes GSC issue: "Missing field 'acquireLicensePage'" and "Missing field 'creator'"
  const imageSchemaUrl = productImage.startsWith('http') ? productImage : productImage;
  schemas.push(generateImageObjectSchema({
    url: imageSchemaUrl,
    name: `${product.name} - ${product.subtitle}`,
    caption: `${product.name} - ${product.tagline || product.subtitle}`,
    description: product.description?.slice(0, 200) || `${product.name} product image`,
    width: 600,
    height: 600,
    encodingFormat: 'image/webp',
    representativeOfPage: true,
    keywords: [product.name.toLowerCase(), product.slug, 'centra biotech'],
  }));

  return (
    <main className="min-h-screen bg-white">
      {/* Structured Data */}
      <MultipleStructuredData dataArray={schemas} />
      
      {/* Hero Section */}
      <HeroSectionGeneral
        title={product.heroBannerTitle || product.heroTitle}
        imgUrl={heroImage}
      />
      
      {/* Breadcrumb */}
      <ContainerSection className="py-4">
        <Breadcrumb lang={lang} />
      </ContainerSection>
      
      {/* Main Content */}
      <ContainerSection className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={productImage}
                alt={`${product.name} - ${product.subtitle}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-green-600 uppercase tracking-wider">
                {product.subtitle}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{product.tagline}</p>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {product.btnWhatsappLabel || product.ctaWhatsapp || "Hubungi Kami"}
              </Link>
              
              {product.externalLinks?.shopee && (
                <Link
                  href={product.externalLinks.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.btnShopeeLabel || "Beli di Shopee"}
                </Link>
              )}
            </div>
            
            {/* External Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              {product.externalLinks?.brochure && (
                <Link
                  href={product.externalLinks.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {product.btnBrochureLabel || "Unduh Brosur"}
                </Link>
              )}
              
              {product.externalLinks?.demplotPdf && (
                <Link
                  href={product.externalLinks.demplotPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {product.btnDemplotLabel || "Lihat Hasil Uji"}
                </Link>
              )}
              
              {product.externalLinks?.inaproc && (
                <Link
                  href={product.externalLinks.inaproc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  E-Katalog Pemerintah
                </Link>
              )}
            </div>
          </div>
        </div>
      </ContainerSection>
      
      {/* Benefits Section */}
      {product.benefits.length > 0 && (
        <section className="py-16 bg-gray-50">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.benefitsSectionTitle || `Keunggulan ${product.name}`}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.tagline}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.benefits.map((benefit) => {
                const IconComponent = getIconComponent(benefit.icon);
                return (
                  <div
                    key={benefit.id}
                    className="bg-white p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-green-100"
                    >
                      <IconComponent 
                        className="w-6 h-6 text-green-600"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </ContainerSection>
        </section>
      )}
      
      {/* Certifications Section */}
      {product.certifications.length > 0 && (
        <section className="py-16">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.certificationsSectionTitle || "Sertifikasi & Legalitas"}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.certificationsSectionSubtitle || `${product.name} telah teruji dan tersertifikasi oleh lembaga resmi`}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {product.certifications.map((cert) => {
                const IconComponent = getIconComponent(cert.icon);
                return (
                  <div
                    key={cert.id}
                    className="bg-white border border-gray-200 p-4 rounded-xl text-center hover:border-green-500 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">{cert.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{cert.value}</p>
                  </div>
                );
              })}
            </div>
          </ContainerSection>
        </section>
      )}
      
      {/* Videos Section */}
      {product.videos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.videoSectionTitle || `Lihat ${product.name} Beraksi`}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.videoSectionSubtitle || "Video testimoni dan cara aplikasi"}
            </p>
            
            <VideoGallerySlider 
              videos={product.videos.map(v => ({
                id: v.videoId,
                title: v.title,
                embedUrl: v.embedUrl,
                type: v.type,
              }))} 
            />
          </ContainerSection>
        </section>
      )}
      
      {/* FAQ Section */}
      {product.faq.length > 0 && (
        <section className="py-16">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.faqSectionTitle || "Pertanyaan yang Sering Diajukan"}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.ctaQuestionTitle || `Temukan jawaban tentang ${product.name}`}
            </p>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {product.faq.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    value={`item-${index}`}
                    className="bg-white border border-gray-200 rounded-xl px-6 data-[state=open]:border-green-500"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ContainerSection>
        </section>
      )}
      
      {/* CTA Section */}
      <section 
        className="py-16"
        style={{ backgroundColor: product.primaryColor }}
      >
        <ContainerSection>
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tertarik dengan {product.name}?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk informasi lebih lanjut dan penawaran terbaik
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Hubungi via WhatsApp
              </Link>
              {product.externalLinks?.shopee && (
                <Link
                  href={product.externalLinks.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Beli di Shopee
                </Link>
              )}
            </div>
          </div>
        </ContainerSection>
      </section>
    </main>
  );
}
