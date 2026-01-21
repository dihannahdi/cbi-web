import { Metadata } from "next";
import dynamic from "next/dynamic";
import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getAboutUsQuery } from "@/utils/queries/aboutUs";

import { AboutUsResponse } from "@/types/responseTypes";

import Breadcrumb from "@/components/common/BreadScrumb";
import AboutUsSection from "@/components/about-us/AboutUs";
import HeroSectionAboutUs from "@/components/about-us/HeroSection";
import VisionMissionSection from "@/components/about-us/vision&misson";
import BannerCareerSection from "@/components/about-us/BannerCarrierSection";

import { getDictionary } from "@/dictionaries";
import { Locale, i18n, localeMetadata } from "@/i18n-config";
import { generateMetadataFromProps, SITE_CONFIG } from "@/utils/seo";
import { 
  generateAboutPageSchemas, 
  MultipleStructuredData 
} from "@/utils/structuredData";

// Dynamic import for ManagementSection (uses Swiper - heavy JS library)
const ManagementSection = dynamic(
  () => import("@/components/about-us/ManagementSection"),
  { 
    ssr: true,
    loading: () => (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
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
    ...generateMetadataFromProps({
      title: dict.seo.aboutTitle,
      description: dict.seo.aboutDescription,
      url: `/${lang}/about-us`,
    }),
    alternates: {
      canonical: `${baseUrl}/${lang}/about-us`,
      languages: {
        'id': `${baseUrl}/id/about-us`,
        'en': `${baseUrl}/en/about-us`,
        'x-default': `${baseUrl}/id/about-us`,
      },
    },
    openGraph: {
      locale: localeMetadata[lang].locale,
      alternateLocale: i18n.locales.filter(l => l !== lang).map(l => localeMetadata[l].locale),
    },
  };
}

const AboutUs = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  try {
    const query = getAboutUsQuery();

    const { data } = await apiRequest<AboutUsResponse>({
      path: ApiPath.ABOUT_US,
      queryParams: query,
      locale: lang,
    });

    // Generate structured data for SEO
    const schemas = generateAboutPageSchemas();

    return (
      <>
        {/* Structured Data */}
        <MultipleStructuredData dataArray={schemas} />
        
        <section>
          <HeroSectionAboutUs headline={data.headline} />
          <Breadcrumb lang={lang} dict={dict} />
          <AboutUsSection aboutUs={data.aboutUs} lang={lang} />
          <VisionMissionSection
            visionMission={data.visionMission}
            corporateValue={data.corporateValue}
            lang={lang}
            dict={dict}
          />
          <ManagementSection managements={data.managements} lang={lang} />
          <BannerCareerSection bannerCTA={data.bannerCTA} lang={lang} />
        </section>
      </>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{dict.common.error}</p>
      </div>
    );
  }
};

export default AboutUs;
