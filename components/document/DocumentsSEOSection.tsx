'use client';

import ContainerSection from "@/components/layout/container";
import { FileText, Award, Download, Shield, CheckCircle, Building2, Leaf } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface DocumentsSEOSectionProps {
  lang?: Locale;
}

const translations = {
  id: {
    seoTitle: "Dokumentasi Resmi PT Centra Biotech Indonesia",
    seoDesc: "Sebagai <strong>perusahaan bioteknologi terpercaya di Indonesia</strong>, PT Centra Biotech Indonesia menyediakan akses transparan ke seluruh dokumen legalitas, sertifikasi produk, dan materi informasi yang dibutuhkan oleh mitra bisnis, petani, peternak, dan pembudidaya ikan.",
    certTitle: "Sertifikat Produk",
    certDesc: "Semua produk <strong>PT Centra Biotech Indonesia</strong> telah mendapatkan sertifikasi dari lembaga berwenang seperti Kementerian Pertanian RI, menjamin kualitas dan keamanan produk bioteknologi kami untuk penggunaan di sektor pertanian, peternakan, dan perikanan.",
    legalTitle: "Legalitas Perusahaan",
    legalDesc: "PT Centra Biotech Indonesia adalah badan usaha resmi yang terdaftar di Indonesia dengan izin usaha lengkap. Dokumen NIB, NPWP, dan akta pendirian perusahaan tersedia untuk keperluan verifikasi mitra bisnis dan instansi pemerintah.",
    brochureTitle: "Brosur & Panduan",
    brochureDesc: "Download brosur produk bioteknologi lengkap dengan informasi spesifikasi teknis, dosis aplikasi, cara penggunaan, dan manfaat dari setiap produk pupuk hayati, probiotik, dan insektisida alami dari <strong>PT CBI</strong>.",
    qualityTitle: "Jaminan Mutu",
    qualityDesc: "Setiap produk melalui proses kontrol kualitas ketat dengan standar laboratorium. Sertifikat analisis tersedia untuk membuktikan kandungan mikroba menguntungkan dan bahan aktif dalam setiap batch produk bioteknologi.",
    organicTitle: "Komitmen Organik",
    organicDesc: "PT Centra Biotech Indonesia berkomitmen pada produksi pertanian berkelanjutan. Produk kami mendukung program pertanian organik nasional dengan formula ramah lingkungan yang aman untuk ekosistem dan kesehatan manusia.",
    supportTitle: "Dukungan Teknis",
    supportDesc: "Tim ahli kami siap memberikan konsultasi teknis terkait penggunaan produk. Hubungi kami untuk mendapatkan panduan aplikasi yang disesuaikan dengan kondisi lahan dan kebutuhan spesifik usaha tani Anda.",
    ctaTitle: "Butuh Informasi Lebih Lanjut tentang Produk Kami?",
    ctaDesc: "Jelajahi katalog produk bioteknologi PT Centra Biotech Indonesia atau hubungi tim kami untuk konsultasi gratis mengenai solusi terbaik untuk pertanian, peternakan, atau perikanan Anda.",
    agriProducts: "Produk Pertanian",
    livestockProducts: "Produk Peternakan",
    contactUs: "Hubungi Kami",
  },
  en: {
    seoTitle: "Official Documentation of PT Centra Biotech Indonesia",
    seoDesc: "As a <strong>trusted biotechnology company in Indonesia</strong>, PT Centra Biotech Indonesia provides transparent access to all legal documents, product certifications, and information materials needed by business partners, farmers, breeders, and fish farmers.",
    certTitle: "Product Certificates",
    certDesc: "All <strong>PT Centra Biotech Indonesia</strong> products have been certified by authorized institutions such as the Indonesian Ministry of Agriculture, ensuring the quality and safety of our biotechnology products for use in agriculture, livestock, and fisheries sectors.",
    legalTitle: "Company Legality",
    legalDesc: "PT Centra Biotech Indonesia is an officially registered business entity in Indonesia with complete business licenses. NIB, NPWP, and company deed documents are available for business partner and government agency verification purposes.",
    brochureTitle: "Brochures & Guides",
    brochureDesc: "Download complete biotechnology product brochures with technical specifications, application dosages, usage instructions, and benefits of each biological fertilizer, probiotic, and natural insecticide from <strong>PT CBI</strong>.",
    qualityTitle: "Quality Assurance",
    qualityDesc: "Each product goes through strict quality control processes with laboratory standards. Certificate of analysis is available to prove beneficial microbial content and active ingredients in each batch of biotechnology products.",
    organicTitle: "Organic Commitment",
    organicDesc: "PT Centra Biotech Indonesia is committed to sustainable agricultural production. Our products support the national organic farming program with environmentally friendly formulas that are safe for ecosystems and human health.",
    supportTitle: "Technical Support",
    supportDesc: "Our team of experts is ready to provide technical consultation regarding product use. Contact us for application guidance tailored to your land conditions and specific farming needs.",
    ctaTitle: "Need More Information About Our Products?",
    ctaDesc: "Explore PT Centra Biotech Indonesia's biotechnology product catalog or contact our team for free consultation on the best solutions for your agriculture, livestock, or fisheries needs.",
    agriProducts: "Agriculture Products",
    livestockProducts: "Livestock Products",
    contactUs: "Contact Us",
  },
};

/**
 * DocumentsSEOSection - SEO component for Documents page
 * Adds keyword-rich content to improve word count and SEO relevance
 * Target Keywords: pt centra biotech indonesia, sertifikat produk bioteknologi, dokumen resmi
 */
const DocumentsSEOSection = ({ lang = "id" }: DocumentsSEOSectionProps) => {
  const t = translations[lang];
  
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <ContainerSection>
        {/* Section Title with Keywords */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t.seoTitle}
          </h2>
          <p 
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.seoDesc }}
          />
        </div>

        {/* Features Grid with Semantic Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 - Product Certificates */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.certTitle}</h3>
            </div>
            <p 
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.certDesc }}
            />
          </div>

          {/* Card 2 - Company Legality */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.legalTitle}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.legalDesc}
            </p>
          </div>

          {/* Card 3 - Brochures */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.brochureTitle}</h3>
            </div>
            <p 
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.brochureDesc }}
            />
          </div>

          {/* Card 4 - Quality Assurance */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.qualityTitle}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.qualityDesc}
            </p>
          </div>

          {/* Card 5 - Organic Commitment */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.organicTitle}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.organicDesc}
            </p>
          </div>

          {/* Card 6 - Technical Support */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{t.supportTitle}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.supportDesc}
            </p>
          </div>
        </div>

        {/* Call to Action with Internal Links */}
        <div className="bg-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {t.ctaTitle}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href={`/${lang}/product/agriculture`} 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
            >
              <Leaf className="w-5 h-5 mr-2" />
              {t.agriProducts}
            </Link>
            <Link 
              href={`/${lang}/product/livestock`} 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-medium"
            >
              <Award className="w-5 h-5 mr-2" />
              {t.livestockProducts}
            </Link>
            <Link 
              href={`/${lang}/contact`} 
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              <FileText className="w-5 h-5 mr-2" />
              {t.contactUs}
            </Link>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default DocumentsSEOSection;
