import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSectionCareer from "@/components/career/HeroSection";
import JobVacany from "@/components/career/JobVacany";
import JoinUs from "@/components/career/JoinUs";
import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";
import { PAGE_METADATA, SITE_CONFIG } from "@/utils/seo";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

// Dynamic import for Testimony (uses Swiper - heavy JS library)
const Testimony = dynamic(
  () => import("@/components/career/Testimony"),
  { 
    ssr: true,
    loading: () => (
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }
);

import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// SEO Metadata for Career page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = lang === 'en' 
    ? 'Career - Join Our Team | Centra Biotech Indonesia' 
    : PAGE_METADATA.career.title;
  const description = lang === 'en'
    ? 'Discover exciting career opportunities at PT Centra Biotech Indonesia. Join our biotechnology company and contribute to agricultural innovation in Indonesia.'
    : PAGE_METADATA.career.description;

  return {
    title,
    description,
    keywords: lang === 'en'
      ? 'career, jobs, employment, biotechnology jobs, agriculture jobs, Indonesia career, Centra Biotech Indonesia careers'
      : PAGE_METADATA.career.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/career`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/career`,
        'en': `${SITE_CONFIG.url}/en/career`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/career`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/images/og-career.jpg`,
        width: 1200,
        height: 630,
        alt: lang === 'en' ? 'Career at Centra Biotech Indonesia' : 'Karir di Centra Biotech Indonesia',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const Career = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized content
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const careerLabel = dict.nav.career;
  const pageTitle = PAGE_METADATA.career.title;
  const pageDescription = PAGE_METADATA.career.description;

  // Generate structured data
  const structuredDataArray = [
    generateWebPageSchema({
      name: lang === 'en' ? 'Career at Centra Biotech Indonesia' : pageTitle,
      description: lang === 'en' 
        ? 'Discover exciting career opportunities at PT Centra Biotech Indonesia' 
        : pageDescription,
      url: `/${lang}/career`,
    }),
    generateBreadcrumbSchema([
      { name: homeLabel, url: `/${lang}` },
      { name: careerLabel, url: `/${lang}/career` },
    ]),
  ];

  // Localized intro content
  const introTitle = lang === 'en'
    ? 'Join the Centra Biotech Indonesia Team'
    : 'Bergabung dengan Tim Centra Biotech Indonesia';
  const introText = lang === 'en'
    ? `Discover exciting career opportunities at PT Centra Biotech Indonesia, a leading biotechnology company 
       committed to innovation and sustainability. We are looking for talented individuals who are passionate 
       about contributing to the development of biotechnology solutions for Indonesia's agriculture, livestock, 
       and fishery sectors. Join our professional team and become part of the national agribusiness transformation. 
       We offer a supportive work environment, career development opportunities, and competitive compensation.`
    : `Temukan peluang karir menarik di PT Centra Biotech Indonesia, perusahaan bioteknologi terkemuka 
       yang berkomitmen pada inovasi dan keberlanjutan. Kami mencari talenta berbakat yang memiliki semangat 
       untuk berkontribusi dalam pengembangan solusi bioteknologi untuk pertanian, peternakan, dan perikanan Indonesia. 
       Bergabunglah dengan tim profesional kami dan jadilah bagian dari transformasi sektor agribisnis nasional. 
       Kami menawarkan lingkungan kerja yang mendukung, kesempatan pengembangan karir, dan kompensasi kompetitif.`;

  return (
    <section>
      {/* Structured Data for SEO */}
      <MultipleStructuredData dataArray={structuredDataArray} />
      
      <HeroSectionCareer />
      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />
      
      {/* Integrated SEO Intro */}
      <section className="bg-[#EEE]">
        <ContainerSection className="pb-0">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
              {introTitle}
            </h2>
            <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
              {introText}
            </p>
          </div>
        </ContainerSection>
      </section>
      
      <JoinUs />
      <Testimony />
      <JobVacany />
    </section>
  );
};

export default Career;
