import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import VideoGallerySlider from "@/components/product/VideoGallerySlider";
import { SITE_CONFIG } from "@/utils/seo";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  MultipleStructuredData
} from "@/utils/structuredData";
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
  Package,
  ExternalLink,
  Phone,
  ShoppingCart,
  FileText,
  Download,
  TrendingUp,
  BadgeCheck,
  Zap,
  Clock,
  Bug,
  Microscope,
  Beaker,
  Fish,
  Waves,
  ThermometerSun,
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
  btnDemplotLabel?: string;
  heroImage?: { url: string } | null;
  productImage?: { url: string } | null;
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

// Icon mapping helper for fishery
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    trending: TrendingUp,
    leaf: Leaf,
    shield: Shield,
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
    fish: Fish,
    waves: Waves,
    water: Droplets,
    temperature: ThermometerSun,
    flask: FlaskConical,
    package: Package,
  };
  return icons[iconName] || CheckCircle;
};

// Get product hero image based on slug (fallback)
function getProductHeroImage(slug: string): string {
  const heroImages: Record<string, string> = {
    "bioaqua": "/images/fishery/bioaqua-hero.jpg",
  };
  return heroImages[slug] || "/img-placeholder.png";
}

// Get product main image based on slug (fallback)
function getProductMainImage(slug: string): string {
  const productImages: Record<string, string> = {
    "bioaqua": "/images/fishery/bioaqua-product.png",
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
  return populateFields.map(field => `populate=${field}`).join('&');
};

// Fetch product data from Strapi with locale support
async function getProductBySlug(slug: string, locale: string = 'en'): Promise<ProductData | null> {
  try {
    const populateQuery = buildPopulateQuery();
    // First try with requested locale
    const res = await fetch(
      `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&filters[category][$eq]=fishery&${populateQuery}&locale=${locale}`,
      { 
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch fishery product: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    
    // If no data in requested locale and locale is 'id', try English fallback
    if ((!data.data || data.data.length === 0) && locale === 'id') {
      console.warn(`[Strapi] Fishery product ${slug} not found in ${locale}, trying English fallback`);
      const fallbackRes = await fetch(
        `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&filters[category][$eq]=fishery&${populateQuery}&locale=en`,
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
    console.error("Error fetching fishery product:", error);
    return null;
  }
}

// Get all fishery product slugs for static generation
async function getAllProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/product-detail-pages?filters[category][$eq]=fishery&fields[0]=slug`,
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
  const fallbackSlugs = ["bioaqua"];
  
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
      title: lang === 'id' ? "Produk Tidak Ditemukan" : "Product Not Found",
      description: lang === 'id' ? "Halaman produk yang Anda cari tidak ditemukan." : "The product page you are looking for was not found.",
    };
  }
  
  const baseUrl = SITE_CONFIG.url;
  const pageUrl = `${baseUrl}/${lang}/produk-layanan/perikanan/${slug}`;
  
  return {
    title: `${product.name} - ${product.subtitle}`,
    description: product.description.slice(0, 160),
    alternates: {
      canonical: pageUrl,
      languages: {
        id: `${baseUrl}/id/produk-layanan/perikanan/${slug}`,
        en: `${baseUrl}/en/produk-layanan/perikanan/${slug}`,
      },
    },
    openGraph: {
      title: product.heroTitle,
      description: product.heroSubtitle,
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      locale: lang === "id" ? "id_ID" : "en_US",
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
export default async function FisheryProductDetailPage({
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
  const categoryName = lang === 'id' ? 'Perikanan' : 'Fishery';
  const breadcrumbItems = [
    { name: lang === 'id' ? "Produk & Layanan" : "Products & Services", url: `/${lang}/produk-layanan` },
    { name: categoryName, url: `/${lang}/produk-layanan/perikanan` },
    { name: product.name, url: `/${lang}/produk-layanan/perikanan/${slug}` },
  ];
  
  // Structured data
  const productSchema = generateProductSchema({
    name: `${product.name} - ${product.subtitle}`,
    description: product.description,
    image: productImage.startsWith("http") ? productImage : `${SITE_CONFIG.url}${productImage}`,
    brand: "Centra Biotech Indonesia",
    category: "Probiotik Perikanan",
    url: `${SITE_CONFIG.url}/${lang}/produk-layanan/perikanan/${slug}`,
    offers: {
      price: 0,
      priceCurrency: "IDR",
      availability: "InStock",
    },
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: `${SITE_CONFIG.url}${item.url}`,
    }))
  );
  
  const faqSchema = product.faq && product.faq.length > 0 
    ? generateFAQSchema(
        product.faq.map((f) => ({ question: f.question, answer: f.answer }))
      )
    : null;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [productSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);

  // Localized labels
  const labels = {
    contactUs: lang === 'id' ? 'Hubungi Kami' : 'Contact Us',
    buyOnShopee: lang === 'id' ? 'Beli di Shopee' : 'Buy on Shopee',
    downloadBrochure: lang === 'id' ? 'Unduh Brosur' : 'Download Brochure',
    viewTestResults: lang === 'id' ? 'Lihat Hasil Uji' : 'View Test Results',
    govCatalog: lang === 'id' ? 'E-Katalog Pemerintah' : 'Government E-Catalog',
    certifications: lang === 'id' ? 'Sertifikasi & Legalitas' : 'Certifications & Compliance',
    certSubtitle: lang === 'id' ? 'telah teruji dan tersertifikasi oleh lembaga resmi' : 'has been tested and certified by official institutions',
    faq: lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions',
    interestedIn: lang === 'id' ? 'Tertarik dengan' : 'Interested in',
    contactNow: lang === 'id' ? 'Hubungi kami sekarang untuk informasi lebih lanjut dan penawaran terbaik' : 'Contact us now for more information and the best deals',
    contactWhatsApp: lang === 'id' ? 'Hubungi via WhatsApp' : 'Contact via WhatsApp',
  };

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
              <p className="text-sm font-medium text-cyan-600 uppercase tracking-wider">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {product.btnWhatsappLabel || product.ctaWhatsapp || labels.contactUs}
              </Link>
              
              {product.externalLinks?.shopee && (
                <Link
                  href={product.externalLinks.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.btnShopeeLabel || labels.buyOnShopee}
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
                  {product.btnBrochureLabel || labels.downloadBrochure}
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
                  {product.btnDemplotLabel || labels.viewTestResults}
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
                  {labels.govCatalog}
                </Link>
              )}
            </div>
          </div>
        </div>
      </ContainerSection>
      
      {/* Benefits Section */}
      {product.benefits && product.benefits.length > 0 && (
        <section className="py-16 bg-gray-50">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.benefitsSectionTitle || (lang === 'id' ? `Keunggulan ${product.name}` : `${product.name} Benefits`)}
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
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-cyan-100"
                    >
                      <IconComponent 
                        className="w-6 h-6 text-cyan-600"
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
      {product.certifications && product.certifications.length > 0 && (
        <section className="py-16">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.certificationsSectionTitle || labels.certifications}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.certificationsSectionSubtitle || `${product.name} ${labels.certSubtitle}`}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {product.certifications.map((cert) => {
                const IconComponent = getIconComponent(cert.icon);
                return (
                  <div
                    key={cert.id}
                    className="bg-white border border-gray-200 p-4 rounded-xl text-center hover:border-cyan-500 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-cyan-100 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-cyan-600" />
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
      {product.videos && product.videos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.videoSectionTitle || (lang === 'id' ? `Lihat ${product.name} Beraksi` : `See ${product.name} in Action`)}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.videoSectionSubtitle || (lang === 'id' ? "Video testimoni dan cara aplikasi" : "Testimonial videos and application guides")}
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
      {product.faq && product.faq.length > 0 && (
        <section className="py-16">
          <ContainerSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              {product.faqSectionTitle || labels.faq}
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {product.ctaQuestionTitle || (lang === 'id' ? `Temukan jawaban tentang ${product.name}` : `Find answers about ${product.name}`)}
            </p>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {product.faq.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    value={`item-${index}`}
                    className="bg-white border border-gray-200 rounded-xl px-6 data-[state=open]:border-cyan-500"
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
        style={{ backgroundColor: product.primaryColor || '#0891b2' }}
      >
        <ContainerSection>
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {labels.interestedIn} {product.name}?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {labels.contactNow}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {labels.contactWhatsApp}
              </Link>
              {product.externalLinks?.shopee && (
                <Link
                  href={product.externalLinks.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {labels.buyOnShopee}
                </Link>
              )}
            </div>
          </div>
        </ContainerSection>
      </section>
    </main>
  );
}
