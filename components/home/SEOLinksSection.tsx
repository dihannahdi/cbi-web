import Link from "next/link";
import ContainerSection from "@/components/layout/container";
import { Locale } from "@/i18n-config";

interface SEOLinksSectionProps {
  lang?: Locale;
}

const translations = {
  id: {
    mainTitle: "PT Centra Biotech Indonesia - Perusahaan Bioteknologi Terdepan",
    mainDesc: "Sebagai <strong>perusahaan bioteknologi di Indonesia</strong> yang inovatif, <strong>PT Biotech</strong> CBI (Centra Biotech Indonesia) mengembangkan <strong>pupuk hayati</strong>, <strong>insektisida hayati</strong>, dan <strong>probiotik</strong> melalui <strong>penelitian dan pengembangan</strong> berbasis teknologi fermentasi modern. Dengan <strong>sumber daya manusia</strong> kompeten <strong>di bidang</strong> bioteknologi, kami menghasilkan <strong>vaksin dan produk bioteknologi</strong> yang terbukti meningkatkan produktivitas <strong>pangan dan</strong> pertanian berkelanjutan di Indonesia.",
    agricultureTitle: "Pupuk Organik Cair",
    agricultureDesc: "Solusi pupuk hayati cair dan fungisida hayati untuk meningkatkan hasil panen pertanian.",
    livestockTitle: "Probiotik Peternakan",
    livestockDesc: "Produk bioteknologi untuk kesehatan dan produktivitas ternak yang optimal.",
    fisheryTitle: "Bioaktivator Perikanan",
    fisheryDesc: "Teknologi bioteknologi untuk akuakultur dan budidaya perikanan berkelanjutan.",
    aboutTitle: "Tentang PT CBI",
    aboutDesc: "Profil perusahaan bioteknologi di Indonesia dengan visi pertanian berkelanjutan.",
    blogTitle: "Blog & Artikel",
    blogDesc: "Tips pertanian & bioteknologi",
    newsTitle: "Berita Terbaru",
    newsDesc: "Update dari Centra Biotech",
    documentsTitle: "Dokumen & Sertifikat",
    documentsDesc: "Sertifikasi produk resmi",
    ctaText: "<strong>Centra Biotech Indonesia</strong> adalah pilihan tepat untuk kebutuhan",
    ctaPupuk: "pupuk hayati",
    ctaInsektisida: "insektisida hayati",
    ctaMaklon: "jasa maklon pupuk",
    ctaSuffix: "di Indonesia.",
  },
  en: {
    mainTitle: "PT Centra Biotech Indonesia - Leading Biotechnology Company",
    mainDesc: "As an innovative <strong>biotechnology company in Indonesia</strong>, <strong>PT Biotech</strong> CBI (Centra Biotech Indonesia) develops <strong>biological fertilizers</strong>, <strong>biological insecticides</strong>, and <strong>probiotics</strong> through <strong>research and development</strong> based on modern fermentation technology. With <strong>competent human resources</strong> in the <strong>field of</strong> biotechnology, we produce <strong>vaccines and biotechnology products</strong> proven to increase <strong>food and</strong> sustainable agricultural productivity in Indonesia.",
    agricultureTitle: "Liquid Organic Fertilizer",
    agricultureDesc: "Biological liquid fertilizer and fungicide solutions to increase agricultural yields.",
    livestockTitle: "Livestock Probiotics",
    livestockDesc: "Biotechnology products for optimal livestock health and productivity.",
    fisheryTitle: "Fishery Bioactivator",
    fisheryDesc: "Biotechnology for sustainable aquaculture and fishery cultivation.",
    aboutTitle: "About PT CBI",
    aboutDesc: "Profile of a biotechnology company in Indonesia with a sustainable agriculture vision.",
    blogTitle: "Blog & Articles",
    blogDesc: "Agriculture & biotechnology tips",
    newsTitle: "Latest News",
    newsDesc: "Updates from Centra Biotech",
    documentsTitle: "Documents & Certificates",
    documentsDesc: "Official product certification",
    ctaText: "<strong>Centra Biotech Indonesia</strong> is the right choice for",
    ctaPupuk: "biological fertilizers",
    ctaInsektisida: "biological insecticides",
    ctaMaklon: "fertilizer contract manufacturing services",
    ctaSuffix: "in Indonesia.",
  },
};

/**
 * SEO Links Section - Adds internal links and target keywords for homepage SEO
 * Target keywords: bioteknologi indonesia, perusahaan bioteknologi, pt biotech, pt cbi
 * Semantic keywords: di bidang, penelitian dan pengembangan, sumber daya manusia, vaksin dan produk bioteknologi, salah satu
 * Enhanced for better text-to-HTML ratio
 */
const SEOLinksSection = ({ lang = "id" }: SEOLinksSectionProps) => {
  const t = translations[lang];
  
  return (
    <section className="bg-gradient-to-b from-[#f0f9f4] to-white py-16">
      <ContainerSection>
        {/* SEO Intro Text with Target Keywords - Consolidated */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-[#083F19] lg:text-4xl">
            {t.mainTitle}
          </h2>
          <p 
            className="mb-8 text-lg leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: t.mainDesc }}
          />
        </div>

        {/* Internal Links Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Produk Pertanian */}
          <Link 
            href={`/${lang}/product/agriculture`}
            className="group rounded-xl border border-green-100 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl group-hover:bg-green-200">
              🌾
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-green-700">
              {t.agricultureTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {t.agricultureDesc}
            </p>
          </Link>

          {/* Produk Peternakan */}
          <Link 
            href={`/${lang}/product/livestock`}
            className="group rounded-xl border border-green-100 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl group-hover:bg-orange-200">
              🐄
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-orange-700">
              {t.livestockTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {t.livestockDesc}
            </p>
          </Link>

          {/* Produk Perikanan */}
          <Link 
            href={`/${lang}/product/fishery`}
            className="group rounded-xl border border-green-100 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl group-hover:bg-blue-200">
              🐟
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-700">
              {t.fisheryTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {t.fisheryDesc}
            </p>
          </Link>

          {/* Tentang Perusahaan */}
          <Link 
            href={`/${lang}/about-us`}
            className="group rounded-xl border border-green-100 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-2xl group-hover:bg-emerald-200">
              🏢
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-emerald-700">
              {t.aboutTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {t.aboutDesc}
            </p>
          </Link>
        </div>

        {/* Secondary Links Row */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link 
            href={`/${lang}/blog`}
            className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-green-50 hover:shadow-md"
          >
            <span className="text-xl">📝</span>
            <div>
              <h4 className="font-medium text-gray-800">{t.blogTitle}</h4>
              <p className="text-xs text-gray-500">{t.blogDesc}</p>
            </div>
          </Link>

          <Link 
            href={`/${lang}/news`}
            className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-green-50 hover:shadow-md"
          >
            <span className="text-xl">📰</span>
            <div>
              <h4 className="font-medium text-gray-800">{t.newsTitle}</h4>
              <p className="text-xs text-gray-500">{t.newsDesc}</p>
            </div>
          </Link>

          <Link 
            href={`/${lang}/documents`}
            className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-green-50 hover:shadow-md"
          >
            <span className="text-xl">📄</span>
            <div>
              <h4 className="font-medium text-gray-800">{t.documentsTitle}</h4>
              <p className="text-xs text-gray-500">{t.documentsDesc}</p>
            </div>
          </Link>
        </div>

        {/* Bottom CTA with Keywords */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            <span dangerouslySetInnerHTML={{ __html: t.ctaText }} /> 
            <Link href={`/${lang}/product`} className="mx-1 text-green-600 hover:underline">{t.ctaPupuk}</Link>, 
            <Link href={`/${lang}/product/agriculture`} className="mx-1 text-green-600 hover:underline">{t.ctaInsektisida}</Link>, {lang === 'id' ? 'dan' : 'and'}
            <Link href={`/${lang}/contact`} className="mx-1 text-green-600 hover:underline">{t.ctaMaklon}</Link> 
            {t.ctaSuffix}
          </p>
        </div>
      </ContainerSection>
    </section>
  );
};

export default SEOLinksSection;
