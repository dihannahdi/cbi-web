import React from "react";
import Link from "next/link";
import { FileText, Award, Shield, Building2, Leaf, CheckCircle } from "lucide-react";

import { Headline } from "@/types/responseTypes/headline";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import ContainerSection from "@/components/layout/container";
import { getImageUrl } from "@/utils/getImageUrl";
import { Locale } from "@/i18n-config";

interface HeroSectionProps {
  data: Headline;
  lang?: Locale;
}

const translations = {
  id: {
    seoTitle: "Dokumentasi Resmi PT Centra Biotech Indonesia",
    seoDesc: "Sebagai <strong>perusahaan bioteknologi terpercaya di Indonesia</strong>, PT Centra Biotech Indonesia menyediakan akses transparan ke seluruh dokumen legalitas, sertifikasi produk, dan materi informasi yang dibutuhkan oleh mitra bisnis, petani, peternak, dan pembudidaya ikan.",
    certTitle: "Sertifikat Produk",
    certDesc: "Semua produk <strong>PT Centra Biotech Indonesia</strong> telah mendapatkan sertifikasi dari Kementerian Pertanian RI, menjamin kualitas dan keamanan produk bioteknologi.",
    legalTitle: "Legalitas Perusahaan",
    legalDesc: "PT Centra Biotech Indonesia adalah badan usaha resmi dengan izin usaha lengkap. Dokumen NIB, NPWP, dan akta pendirian tersedia untuk verifikasi.",
    brochureTitle: "Brosur & Panduan",
    brochureDesc: "Download brosur produk lengkap dengan spesifikasi teknis, dosis aplikasi, dan manfaat dari setiap produk pupuk hayati dan probiotik.",
    qualityTitle: "Jaminan Mutu",
    qualityDesc: "Setiap produk melalui kontrol kualitas ketat dengan standar laboratorium. Sertifikat analisis tersedia untuk setiap batch produk.",
    organicTitle: "Komitmen Organik",
    organicDesc: "Produk kami mendukung program pertanian organik nasional dengan formula ramah lingkungan yang aman untuk ekosistem.",
    supportTitle: "Dukungan Teknis",
    supportDesc: "Tim ahli kami siap memberikan konsultasi teknis terkait penggunaan produk sesuai kondisi lahan dan kebutuhan usaha tani Anda.",
    ctaTitle: "Butuh Informasi Lebih Lanjut?",
    ctaDesc: "Jelajahi katalog produk bioteknologi atau hubungi tim kami untuk konsultasi gratis.",
    agriProducts: "Produk Pertanian",
    contactUs: "Hubungi Kami",
  },
  en: {
    seoTitle: "Official Documentation of PT Centra Biotech Indonesia",
    seoDesc: "As a <strong>trusted biotechnology company in Indonesia</strong>, PT Centra Biotech Indonesia provides transparent access to all legal documents, product certifications, and information materials needed by business partners, farmers, breeders, and fish farmers.",
    certTitle: "Product Certificates",
    certDesc: "All <strong>PT Centra Biotech Indonesia</strong> products have been certified by the Indonesian Ministry of Agriculture, ensuring the quality and safety of biotechnology products.",
    legalTitle: "Company Legality",
    legalDesc: "PT Centra Biotech Indonesia is an officially registered business entity with complete business licenses. NIB, NPWP, and deed of establishment documents are available for verification.",
    brochureTitle: "Brochures & Guides",
    brochureDesc: "Download complete product brochures with technical specifications, application dosages, and benefits of each biological fertilizer and probiotic product.",
    qualityTitle: "Quality Assurance",
    qualityDesc: "Each product goes through strict quality control with laboratory standards. Certificate of analysis is available for each product batch.",
    organicTitle: "Organic Commitment",
    organicDesc: "Our products support the national organic farming program with environmentally friendly formulas that are safe for the ecosystem.",
    supportTitle: "Technical Support",
    supportDesc: "Our team of experts is ready to provide technical consultation regarding product use according to your land conditions and farming needs.",
    ctaTitle: "Need More Information?",
    ctaDesc: "Explore our biotechnology product catalog or contact our team for free consultation.",
    agriProducts: "Agriculture Products",
    contactUs: "Contact Us",
  },
};

/**
 * Document HeroSection with integrated SEO content
 * Target Keywords: pt centra biotech indonesia, sertifikat produk bioteknologi, dokumen resmi
 */
const HeroSection = ({ data, lang = "id" }: HeroSectionProps) => {
  const t = translations[lang];
  
  return (
    <>
      <HeroSectionGeneral
        imgUrl={getImageUrl(data.image?.url)}
        category={data.description}
        title={
          <h1 className="text-center text-3xl font-bold text-white lg:text-5xl xl:text-[56px]">
            {data.title}
          </h1>
        }
      />
      
      {/* Integrated SEO Content */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <ContainerSection>
          {/* Intro Text */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
              {t.seoTitle}
            </h2>
            <p 
              className="leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{ __html: t.seoDesc }}
            />
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.certTitle}</h3>
              </div>
              <p 
                className="text-sm leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: t.certDesc }}
              />
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.legalTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {t.legalDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.brochureTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {t.brochureDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.qualityTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {t.qualityDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Leaf className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.organicTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {t.organicDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
                  <CheckCircle className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{t.supportTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {t.supportDesc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-green-50 p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              {t.ctaTitle}
            </h3>
            <p className="mb-6 mx-auto max-w-2xl text-gray-600">
              {t.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href={`/${lang}/product/agriculture`} 
                className="inline-flex items-center rounded-full bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                <Leaf className="mr-2 h-5 w-5" />
                {t.agriProducts}
              </Link>
              <Link 
                href={`/${lang}/contact`} 
                className="inline-flex items-center rounded-full bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
              >
                <FileText className="mr-2 h-5 w-5" />
                {t.contactUs}
              </Link>
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
};

export default HeroSection;
