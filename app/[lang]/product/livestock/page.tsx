import { ProductLivestockResponse } from "@/types/responseTypes";
import { Metadata } from "next";
import dynamic from "next/dynamic";

import { getImageUrl } from "@/utils/getImageUrl";
import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getServicesQuery } from "@/utils/queries/product/servicesQuery";
import { PAGE_METADATA, SITE_CONFIG } from "@/utils/seo";
import { 
  generateProductCategorySchemas,
  MultipleStructuredData 
} from "@/utils/structuredData";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary, Dictionary } from "@/dictionaries";

import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";
import CustomSvgIcon from "@/components/common/CustomSvgIcon";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import BannerContactSection from "@/components/product/livestock/BannerContactSection";

// Dynamic import for LivestockProductsSection (uses Swiper - heavy JS library)
const LivestockProductsSection = dynamic(
  () => import("@/components/product/livestock/LivestockProductsSection"),
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

// Fungsi untuk mengambil data peternakan
async function getLivestockData(locale: string = 'id') {
  try {
    const query = getServicesQuery();
    const { data } = await apiRequest<ProductLivestockResponse>({
      path: ApiPath.PRODUCT_LIVESTOCK,
      queryParams: query,
      locale: locale,
    });
    return data;
  } catch (e) {
    console.error("Error fetching livestock data:", e);
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
  const data = await getLivestockData(lang);

  const defaultTitle = dict.products.livestock.title + " | Centra Biotech Indonesia";
  const defaultDescription = dict.products.livestock.description;

  if (!data || !data.metadata) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      alternates: {
        canonical: `${SITE_CONFIG.url}/${lang}/product/livestock`,
        languages: {
          'id': `${SITE_CONFIG.url}/id/product/livestock`,
          'en': `${SITE_CONFIG.url}/en/product/livestock`,
        },
      },
    };
  }

  const imageUrl = data.headline?.image?.url
    ? new URL(getImageUrl(data.headline.image.url), SITE_CONFIG.url).toString()
    : `${SITE_CONFIG.url}/images/livestock-default.jpg`;

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
          alt: data.headline?.title || dict.products.livestock.title,
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
      canonical: `${SITE_CONFIG.url}/${lang}/product/livestock`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/product/livestock`,
        'en': `${SITE_CONFIG.url}/en/product/livestock`,
      },
    },
    keywords: lang === 'id'
      ? ["bioteknologi peternakan", "produk peternakan", "kesehatan hewan", "peternakan berkelanjutan", "probiotik ternak"]
      : ["livestock biotechnology", "livestock products", "animal health", "sustainable livestock", "livestock probiotics"],
  };
}

const Livestock = async ({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = await getLivestockData(lang);

  if (!data) {
    const errorMessage = lang === 'id'
      ? "Gagal memuat data produk peternakan"
      : "Failed to load livestock products data";
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{errorMessage}</p>
      </div>
    );
  }

  // Localized content
  const introTitle = lang === 'id'
    ? "Produk Bioteknologi Unggulan untuk Peternakan Modern"
    : "Premium Biotechnology Products for Modern Livestock";

  const introDescription = lang === 'id'
    ? "Tingkatkan produktivitas dan kesehatan ternak dengan rangkaian produk bioteknologi dari Centra Biotech Indonesia. Produk peternakan kami meliputi probiotik, suplemen pakan, dan bioaktivator untuk sapi, kambing, domba, dan unggas."
    : "Increase productivity and livestock health with our range of biotechnology products from Centra Biotech Indonesia. Our livestock products include probiotics, feed supplements, and bioactivators for cattle, goats, sheep, and poultry.";

  const whyTitle = lang === 'id'
    ? "Mengapa memilih Produk Peternakan kami?"
    : "Why choose our Livestock Products?";

  // Extract products for structured data
  const products = data.productCategoriesSection?.flatMap((category: any) => 
    category.products?.map((product: any) => ({
      name: product.name || product.title,
      url: `/${lang}/product/livestock/${product.slug || product.documentId || product.id}`,
      image: product.image?.url,
      description: product.description,
    })) || []
  ) || [];

  // Generate structured data
  const schemas = generateProductCategorySchemas({
    name: dict.products.livestock.title,
    description: PAGE_METADATA.livestock.description,
    url: `/${lang}/product/livestock`,
    products,
  });

  return (
    <>
      {/* Structured Data for SEO */}
      <MultipleStructuredData dataArray={schemas} />
      
      <HeroSectionGeneral
        imgUrl={getImageUrl(data.headline?.image?.url)}
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
                  url={getImageUrl(data?.whySection?.why2?.image?.url)}
                />
                <p className="mt-6 text-sm text-neutral-600 transition-colors duration-300 group-hover:text-white lg:mt-8 lg:text-base">
                  {data.whySection.why2.description}
                </p>
              </div>

              <div className="group flex flex-1 flex-col rounded-lg bg-[#FDFDFD] px-8 py-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#C46617] lg:py-12">
                <CustomSvgIcon
                  url={getImageUrl(data?.whySection?.why3?.image?.url)}
                />
                <p className="mt-6 text-sm text-neutral-600 transition-colors duration-300 group-hover:text-white lg:mt-8 lg:text-base">
                  {data?.whySection?.why3?.description}
                </p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      <LivestockProductsSection
        productCategories={data.productCategoriesSection}
      />

      <BannerContactSection data={data.bannerCTA} />
    </>
  );
};

export default Livestock;
