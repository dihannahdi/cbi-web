import { ProductAgricultureResponse } from "@/types/responseTypes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { getImageUrl } from "@/utils/getImageUrl";
import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getServicesQuery } from "@/utils/queries/product/servicesQuery";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary, Dictionary } from "@/dictionaries";

import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";
import CustomSvgIcon from "@/components/common/CustomSvgIcon";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import BannerContactSection from "@/components/product/agriculture/BannerContactSection";
import { Award, ArrowRight, CheckCircle, Leaf, MessageCircle, ShoppingCart } from "lucide-react";

// Dynamic import for AgricultureProductsSection (uses Swiper - heavy JS library)
const AgricultureProductsSection = dynamic(
  () => import("@/components/product/agriculture/AgricultureProductsSection"),
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

import { PAGE_METADATA, SITE_CONFIG } from "@/utils/seo";
import { 
  generateProductCategorySchemas,
  MultipleStructuredData 
} from "@/utils/structuredData";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Fungsi untuk mengambil data pertanian
async function getAgricultureData(locale: string = 'id') {
  try {
    const query = getServicesQuery();
    const { data } = await apiRequest<ProductAgricultureResponse>({
      path: ApiPath.PRODUCT_AGRICULTURE,
      queryParams: query,
      locale: locale,
    });
    return data;
  } catch (e) {
    console.error("Error fetching agriculture data:", e);
    return null;
  }
}

// Fungsi untuk generate metadata dinamis dengan i18n
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = await getAgricultureData(lang);

  const defaultTitle = dict.products.agriculture.title + " | Centra Biotech Indonesia";
  const defaultDescription = dict.products.agriculture.description;

  if (!data || !data.metadata) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      alternates: {
        canonical: `${SITE_CONFIG.url}/${lang}/product/agriculture`,
        languages: {
          'id': `${SITE_CONFIG.url}/id/product/agriculture`,
          'en': `${SITE_CONFIG.url}/en/product/agriculture`,
        },
      },
    };
  }

  const imageUrl = data.headline?.image?.url 
    ? getImageUrl(data.headline.image.url) 
    : `${SITE_CONFIG.url}/images/og-agriculture.jpg`;

  return {
    title: data.metadata.titleTag || defaultTitle,
    description: data.metadata.metaDesc || defaultDescription,
    openGraph: {
      title: data.metadata.titleTag || defaultTitle,
      description: data.metadata.metaDesc || defaultDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.headline?.title || dict.products.agriculture.title,
        },
      ],
      locale: lang === 'id' ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metadata.titleTag || defaultTitle,
      description: data.metadata.metaDesc || defaultDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/product/agriculture`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/product/agriculture`,
        'en': `${SITE_CONFIG.url}/en/product/agriculture`,
      },
    },
    keywords: lang === 'id' 
      ? ["bioteknologi pertanian", "pupuk hayati", "produk pertanian", "pertanian berkelanjutan", "pengendalian hama alami"]
      : ["agricultural biotechnology", "biological fertilizer", "agricultural products", "sustainable agriculture", "natural pest control"],
  };
}

const Agriculture = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = await getAgricultureData(lang);

  if (!data) {
    const errorMessage = lang === 'id' 
      ? "Gagal memuat data produk pertanian"
      : "Failed to load agricultural products data";
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{errorMessage}</p>
      </div>
    );
  }

  // Localized content
  const introTitle = lang === 'id' 
    ? "Produk Bioteknologi Unggulan untuk Pertanian Modern"
    : "Premium Biotechnology Products for Modern Agriculture";
  
  const introDescription = lang === 'id'
    ? "Tingkatkan hasil panen dan kualitas tanaman dengan rangkaian produk bioteknologi dari Centra Biotech Indonesia. Produk pertanian kami meliputi pupuk hayati organik, insektisida alami, dan bioaktivator yang diformulasikan khusus untuk pertanian berkelanjutan."
    : "Increase crop yields and plant quality with our range of biotechnology products from Centra Biotech Indonesia. Our agricultural products include organic biological fertilizers, natural insecticides, and bioactivators specifically formulated for sustainable agriculture.";

  const whyTitle = lang === 'id'
    ? "Mengapa memilih Produk Pertanian kami?"
    : "Why choose our Agricultural Products?";

  // Extract products for structured data
  const products = data.productCategoriesSection?.flatMap((category: any) => 
    category.products?.map((product: any) => ({
      name: product.name || product.title,
      url: `/${lang}/product/agriculture/${product.slug || product.documentId || product.id}`,
      image: product.image?.url,
      description: product.description,
    })) || []
  ) || [];

  // Generate structured data
  const schemas = generateProductCategorySchemas({
    name: dict.products.agriculture.title,
    description: PAGE_METADATA.agriculture.description,
    url: `/${lang}/product/agriculture`,
    products,
  });

  return (
    <>
      {/* Structured Data for SEO */}
      <MultipleStructuredData dataArray={schemas} />
      
      <HeroSectionGeneral
        imgUrl={getImageUrl(data?.headline?.image?.url)}
        category={data.headline?.description}
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            {data.headline?.title}
          </h1>
        }
      />
      <Breadcrumb className="bg-[#F4F4F4]" lang={lang} dict={dict} />
      
      {/* Integrated SEO Intro */}
      <section className="bg-[#F4F4F4]">
        <ContainerSection className="pb-0">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
              {introTitle}
            </h2>
            <p className="leading-relaxed text-gray-600 md:text-lg">
              {introDescription}
            </p>
          </div>
        </ContainerSection>
      </section>

      {/* Featured Product: RAJABIO */}
      <section className="bg-[#F4F4F4]">
        <ContainerSection>
          <div className="rounded-3xl bg-gradient-to-br from-[#004d1a] via-[#006622] to-[#008833] p-6 md:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left: Content */}
              <div className="text-white order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-medium mb-4">
                  <Award className="h-3.5 w-3.5" />
                  <span>{lang === 'id' ? 'Produk Unggulan' : 'Featured Product'}</span>
                </div>
                
                <h3 className="text-3xl font-extrabold mb-2 lg:text-4xl">
                  RAJABIO
                  <span className="block text-[#90EE90] text-lg font-semibold mt-1 lg:text-xl">
                    {lang === 'id' ? 'Pupuk Organik Cair' : 'Liquid Organic Fertilizer'}
                  </span>
                </h3>
                
                <p className="text-white/90 mb-4 text-sm lg:text-base">
                  {lang === 'id' 
                    ? 'Pupuk organik cair bersertifikat Kementan RI dengan C-Organik >10%. Dipercaya petani di 19 provinsi Indonesia.'
                    : 'Ministry of Agriculture certified liquid organic fertilizer with C-Organic >10%. Trusted by farmers across 19 Indonesian provinces.'}
                </p>
                
                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    lang === 'id' ? 'Tingkatkan Panen 40%' : 'Increase Harvest 40%',
                    lang === 'id' ? 'Suburkan Tanah' : 'Enrich Soil',
                    lang === 'id' ? 'Tahan Hama' : 'Pest Resistant',
                    lang === 'id' ? '100% Organik' : '100% Organic',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-[#90EE90] flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/${lang}/rajabio-pupuk-organik-cair`}
                    className="flex items-center gap-2 rounded-full bg-white text-[#006622] px-5 py-2.5 font-semibold text-sm hover:bg-[#90EE90] transition-all"
                  >
                    {lang === 'id' ? 'Lihat Detail Produk' : 'View Product Details'}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://wa.me/6285183284691?text=Halo,%20saya%20tertarik%20dengan%20RAJABIO"
                    target="_blank"
                    className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] px-5 py-2.5 font-semibold text-white text-sm transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Link>
                </div>
              </div>
              
              {/* Right: Product Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative aspect-square max-w-xs mx-auto">
                  <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-4">
                    <Image
                      src="/products/rajabio/rajabio-cover.webp"
                      alt="RAJABIO - Pupuk Organik Cair"
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                  {/* Price Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-[#C46617] text-white rounded-xl px-3 py-2 shadow-lg">
                    <div className="text-xs line-through opacity-70">Rp 75.000</div>
                    <div className="text-lg font-bold">Rp 62.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>
      
      {/* About Section */}
      <section className="bg-[#F4F4F4]">
        <ContainerSection>
          <div className="flex flex-col gap-6 rounded-3xl bg-[#00802B] p-8 md:flex-row md:items-center lg:gap-12 lg:p-16">
            <h2 className="max-w-[10rem] text-3xl text-white lg:max-w-none lg:text-[40px]/[48px] xl:w-[46rem] xl:text-5xl/[60px]">
              {data.aboutSection.title}
            </h2>
            <p className="w-fit text-white">{data.aboutSection.description}</p>
          </div>
        </ContainerSection>
      </section>

      <section>
        <ContainerSection>
          <div>
            <h2 className="leading-[50px] lg:leading-[80px]">
              {whyTitle.split(' ').slice(0, 2).join(' ')} <br />
              {whyTitle.split(' ').slice(2).join(' ')}
            </h2>
            <div className="mt-8 flex flex-col gap-8 md:flex-row lg:mt-24">
              <div className="group flex flex-1 flex-col rounded-lg bg-[#FDFDFD] px-8 py-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] transition duration-300 hover:bg-[#C46617] lg:py-12">
                <CustomSvgIcon
                  url={getImageUrl(data?.whySection?.why1?.image?.url)}
                />
                <p className="mt-6 text-sm text-[#666] group-hover:text-white lg:mt-8 lg:text-base">
                  {data.whySection.why1.description}
                </p>
              </div>

              <div className="group flex flex-1 flex-col rounded-lg bg-[#FDFDFD] px-8 py-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#C46617] lg:py-12">
                <CustomSvgIcon
                  url={
                    process.env.NEXT_PUBLIC_URL_API +
                    data.whySection.why2.image.url
                  }
                />
                <p className="mt-6 text-sm text-neutral-600 transition-colors duration-300 group-hover:text-white lg:mt-8 lg:text-base">
                  {data.whySection.why2.description}
                </p>
              </div>

              <div className="group flex flex-1 flex-col rounded-lg bg-[#FDFDFD] px-8 py-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#C46617] lg:py-12">
                <CustomSvgIcon
                  url={
                    process.env.NEXT_PUBLIC_URL_API +
                    data.whySection.why3.image.url
                  }
                />
                <p className="mt-6 text-sm text-neutral-600 transition-colors duration-300 group-hover:text-white lg:mt-8 lg:text-base">
                  {data.whySection.why3.description}
                </p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      <AgricultureProductsSection
        productCategories={data.productCategoriesSection}
        lang={lang}
      />

      <BannerContactSection data={data.bannerCTA} />
    </>
  );
};

export default Agriculture;
