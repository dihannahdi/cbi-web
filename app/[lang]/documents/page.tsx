import React from "react";
import { Metadata } from "next";
import HeroSection from "@/components/document/HeroSection";
import DocumentBrochure from "@/components/document/DocumentBrochure";
import { getDocumentsQuery } from "@/utils/queries/documentsQuery";
import { ApiPath, apiRequest } from "@/utils/apiClient";
import { MediaInformationResponse } from "@/types/responseTypes";
import Breadcrumb from "@/components/common/BreadScrumb";
import { PAGE_METADATA, SITE_CONFIG } from "@/utils/seo";
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// SEO Metadata for Documents page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = lang === 'en' 
    ? 'Documents & Certificates | Centra Biotech Indonesia' 
    : PAGE_METADATA.documents.title;
  const description = lang === 'en'
    ? 'Download official documents, certificates, and brochures from Centra Biotech Indonesia. Access our product catalogs and company certifications.'
    : PAGE_METADATA.documents.description;

  return {
    title,
    description,
    keywords: lang === 'en'
      ? 'documents, certificates, brochures, product catalog, ISO certification, company documents, Centra Biotech Indonesia'
      : PAGE_METADATA.documents.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/documents`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/documents`,
        'en': `${SITE_CONFIG.url}/en/documents`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/documents`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/images/og-documents.jpg`,
        width: 1200,
        height: 630,
        alt: lang === 'en' ? 'Documents and Certificates - Centra Biotech Indonesia' : 'Dokumen dan Sertifikat Centra Biotech Indonesia',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const MediaInformation = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized content
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const documentsLabel = lang === 'en' ? 'Documents & Media' : 'Dokumen & Media';
  const pageTitle = lang === 'en' ? 'Documents & Certificates' : PAGE_METADATA.documents.title;
  const pageDescription = lang === 'en' 
    ? 'Download official documents, certificates, and brochures from Centra Biotech Indonesia' 
    : PAGE_METADATA.documents.description;
  const errorMessage = lang === 'en' ? 'Failed to load document data' : 'Gagal memuat data dokumen';

  // Generate structured data
  const structuredDataArray = [
    generateWebPageSchema({
      name: pageTitle,
      description: pageDescription,
      url: `/${lang}/documents`,
    }),
    generateBreadcrumbSchema([
      { name: homeLabel, url: `/${lang}` },
      { name: documentsLabel, url: `/${lang}/documents` },
    ]),
  ];

  try {
    const query = getDocumentsQuery();
    const { data } = await apiRequest<MediaInformationResponse>({
      path: ApiPath.DOCUMENTS,
      queryParams: query,
      locale: lang,
    });

    return (
      <section>
        {/* Structured Data for SEO */}
        <MultipleStructuredData dataArray={structuredDataArray} />
        
        <HeroSection data={data.headline} lang={lang} />
        <Breadcrumb lang={lang} dict={dict} />
        
        <DocumentBrochure
          certificates={data.certificates}
          brochures={data.brochures}
        />
      </section>
    );
  } catch (e) {
    console.error(e);
    return (
      <section>
        <MultipleStructuredData dataArray={structuredDataArray} />
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-600">{errorMessage}</p>
        </div>
      </section>
    );
  }
};

export default MediaInformation;
