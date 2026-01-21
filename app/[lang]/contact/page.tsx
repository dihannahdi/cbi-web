import { Metadata } from "next";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import FormSection from "@/components/contact/FormSection";
import ContactAddress from "@/components/contact/ContactAddress";
import ContainerSection from "@/components/layout/container";
import { getContactQuery } from "@/utils/queries/contactQuery";
import { ApiPath, apiRequest } from "@/utils/apiClient";
import { ContactResponse } from "@/types/responseTypes";
import Breadcrumb from "@/components/common/BreadScrumb";
import { getImageUrl } from "@/utils/getImageUrl";

import { getDictionary } from "@/dictionaries";
import { Locale, i18n, localeMetadata } from "@/i18n-config";
import { generateMetadataFromProps, SITE_CONFIG } from "@/utils/seo";
import { 
  generateContactPageSchemas, 
  MultipleStructuredData 
} from "@/utils/structuredData";

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
      title: dict.seo.contactTitle,
      description: dict.seo.contactDescription,
      url: `/${lang}/contact`,
    }),
    alternates: {
      canonical: `${baseUrl}/${lang}/contact`,
      languages: {
        'id': `${baseUrl}/id/contact`,
        'en': `${baseUrl}/en/contact`,
        'x-default': `${baseUrl}/id/contact`,
      },
    },
    openGraph: {
      locale: localeMetadata[lang].locale,
      alternateLocale: i18n.locales.filter(l => l !== lang).map(l => localeMetadata[l].locale),
    },
  };
}

const Contact = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  try {
    const query = getContactQuery();
    const { data } = await apiRequest<ContactResponse>({
      path: ApiPath.CONTACT,
      queryParams: query,
      locale: lang,
    });

    // Generate structured data for SEO
    const schemas = generateContactPageSchemas();

    return (
      <>
        {/* Structured Data */}
        <MultipleStructuredData dataArray={schemas} />
        
        <HeroSectionGeneral
          imgUrl={getImageUrl(data.headline.image?.url)}
          title={<h1 className="text-white">{data.headline.title}</h1>}
        />
        <Breadcrumb lang={lang} dict={dict} />
        
        {/* Integrated SEO Intro with Contact Info */}
        <section className="bg-white">
          <ContainerSection className="pb-0">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
                {dict.contact.teamTitle}
              </h2>
              <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                {dict.contact.description}
              </p>
            </div>
          </ContainerSection>
        </section>
        
        <ContainerSection className="flex flex-col gap-12 lg:flex-row">
          <ContactAddress
            title={data.title}
            description={data.description}
            contactInfo={data.addressAndContact}
          />
          <FormSection dict={dict.contact} lang={lang} />
        </ContainerSection>
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{dict.common.error}</p>
      </div>
    );
  }
};

export default Contact;
