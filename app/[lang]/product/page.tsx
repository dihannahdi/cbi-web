import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

import { ProductAndServiceResponse } from "@/types/responseTypes";

import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getProductServiceQuery } from "@/utils/queries/product/productService";
import { SITE_CONFIG } from "@/utils/seo";
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary, Dictionary } from "@/dictionaries";

import Breadcrumb from "@/components/common/BreadScrumb";
import WhySection from "@/components/product/WhySection";
import HeroSection from "@/components/product/HeroSection";
import OurProductSection from "@/components/product/OurProduct";
import BannerContactSection from "@/components/product/BannerContactSection";

// Dynamic import for OurServiceSection (uses Swiper - heavy JS library)
const OurServiceSection = dynamic(
  () => import("@/components/product/OurService"),
  { 
    ssr: true,
    loading: () => (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
);

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate SEO Metadata for Product & Services page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const title = dict.seo.productsTitle;
  const description = dict.seo.productsDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/product`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/product`,
        'en': `${SITE_CONFIG.url}/en/product`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/product`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/images/og-products.jpg`,
        width: 1200,
        height: 630,
        alt: dict.products.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const ProductsAndServices = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized intro text
  const introTitle = lang === 'id' 
    ? "Solusi Bioteknologi Terdepan untuk Agribisnis Indonesia"
    : "Leading Biotechnology Solutions for Indonesian Agribusiness";
  
  const introDescription = lang === 'id'
    ? "Centra Biotech Indonesia menghadirkan rangkaian produk bioteknologi berkualitas tinggi untuk sektor pertanian, peternakan, dan perikanan. Produk kami dikembangkan melalui riset mendalam dan teknologi fermentasi modern untuk menghasilkan pupuk hayati, probiotik, dan bioaktivator yang ramah lingkungan."
    : "Centra Biotech Indonesia provides a range of high-quality biotechnology products for the agriculture, livestock, and fisheries sectors. Our products are developed through in-depth research and modern fermentation technology to produce biological fertilizers, probiotics, and eco-friendly bioactivators.";

  // Localized breadcrumb
  const breadcrumbLabel = lang === 'id' ? 'Produk & Layanan' : 'Products & Services';
  const homeLabel = lang === 'id' ? 'Beranda' : 'Home';

  try {
    const query = getProductServiceQuery();
    const { data } = await apiRequest<ProductAndServiceResponse>({
      path: ApiPath.PRODUCTS_AND_SERVICES,
      queryParams: query,
      locale: lang,
    });

    // Generate structured data
    const structuredDataArray = [
      generateWebPageSchema({
        name: dict.seo.productsTitle,
        description: dict.seo.productsDescription,
        url: `/${lang}/product`,
      }),
      generateBreadcrumbSchema([
        { name: homeLabel, url: `/${lang}` },
        { name: breadcrumbLabel, url: `/${lang}/product` },
      ]),
    ];

    return (
      <>
        {/* Structured Data for SEO */}
        <MultipleStructuredData dataArray={structuredDataArray} />
        
        <HeroSection data={data.headline} />
        <Breadcrumb className="bg-[#eee]" lang={lang} dict={dict} />
        
        <WhySection 
          data={data.whySection}
          introTitle={introTitle}
          introDescription={introDescription}
        />
        <OurProductSection data={data.productsSection} lang={lang} dict={dict} />
        <OurServiceSection data={data.servicesSection} lang={lang} readMoreText={dict.home.learnMore} />
        <BannerContactSection data={data.bannerCTA} />
      </>
    );
  } catch (e) {
    console.error(e);
    const errorMessage = lang === 'id' 
      ? "Gagal memuat data produk dan layanan"
      : "Failed to load products and services data";
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{errorMessage}</p>
      </div>
    );
  }
};

export default ProductsAndServices;
