import Link from "next/link";
import ContainerSection from "@/components/layout/container";
import { Locale } from "@/i18n-config";

interface AboutSEOSectionProps {
  lang?: Locale;
}

const translations = {
  id: {
    seoTitle: "Apa Itu Biotech? Mengenal Bioteknologi Indonesia",
    bioP1: "<strong>Bioteknologi</strong> adalah cabang ilmu yang memanfaatkan <strong>organisme hidup</strong> untuk menghasilkan produk dan layanan yang bermanfaat bagi manusia. Di <strong>berbagai bidang</strong> kehidupan, bioteknologi memainkan peran penting, termasuk dalam pertanian, peternakan, perikanan, dan kesehatan. <strong>Rekayasa genetika</strong> merupakan salah satu teknik modern dalam bioteknologi yang memungkinkan pengembangan produk-produk inovatif.",
    bioP2: "Sebagai <strong>perusahaan bioteknologi Indonesia</strong> yang berkomitmen pada inovasi, PT Centra Biotech Indonesia (PT CBI) mengembangkan solusi <strong>biotech Indonesia</strong> untuk mendukung sektor agrikultur nasional. Kami memproduksi berbagai produk seperti",
    bioFertilizer: "pupuk hayati",
    bioInsecticide: "insektisida hayati",
    and: "dan",
    livestockProbiotic: "probiotik ternak",
    card1Title: "Riset & Pengembangan",
    card1Desc: "Penelitian dan pengembangan produk bioteknologi untuk pertanian berkelanjutan dengan sumber daya manusia yang kompeten di bidang bioteknologi.",
    card2Title: "Vaksin & Produk Bioteknologi",
    card2Desc: "Menghasilkan vaksin dan produk bioteknologi untuk pangan dan pertanian yang aman, efektif, dan ramah lingkungan.",
    card3Title: "Bioteknologi untuk Industri",
    card3Desc: "Penerapan bioteknologi untuk industri pertanian dan peternakan Indonesia dengan standar mutu yang teruji.",
    ctaTitle: "Tertarik Bekerja Sama dengan PT Centra Biotech Indonesia?",
    ctaDesc: "Kami menyediakan jasa maklon pupuk hayati dan solusi bioteknologi untuk pertanian Anda.",
    contactUs: "Hubungi Kami",
    viewProducts: "Lihat Produk",
  },
  en: {
    seoTitle: "What is Biotech? Understanding Biotechnology in Indonesia",
    bioP1: "<strong>Biotechnology</strong> is a branch of science that utilizes <strong>living organisms</strong> to produce products and services beneficial to humans. In <strong>various fields</strong> of life, biotechnology plays an important role, including in agriculture, livestock, fisheries, and health. <strong>Genetic engineering</strong> is one of the modern techniques in biotechnology that enables the development of innovative products.",
    bioP2: "As an <strong>Indonesian biotechnology company</strong> committed to innovation, PT Centra Biotech Indonesia (PT CBI) develops <strong>Indonesian biotech</strong> solutions to support the national agricultural sector. We produce various products such as",
    bioFertilizer: "biological fertilizers",
    bioInsecticide: "biological insecticides",
    and: "and",
    livestockProbiotic: "livestock probiotics",
    card1Title: "Research & Development",
    card1Desc: "Research and development of biotechnology products for sustainable agriculture with competent human resources in the field of biotechnology.",
    card2Title: "Vaccines & Biotechnology Products",
    card2Desc: "Producing vaccines and biotechnology products for food and agriculture that are safe, effective, and environmentally friendly.",
    card3Title: "Biotechnology for Industry",
    card3Desc: "Application of biotechnology for Indonesia's agricultural and livestock industry with proven quality standards.",
    ctaTitle: "Interested in Partnering with PT Centra Biotech Indonesia?",
    ctaDesc: "We provide biological fertilizer contract manufacturing and biotechnology solutions for your agriculture.",
    contactUs: "Contact Us",
    viewProducts: "View Products",
  },
};

/**
 * About SEO Section - Adds target keywords for about-us page SEO
 * Target keywords: biotech indonesia, apa itu biotech, perusahaan bioteknologi
 * Related words: organisme hidup, berbagai bidang, rekayasa genetika, bioteknologi adalah cabang ilmu
 */
const AboutSEOSection = ({ lang = "id" }: AboutSEOSectionProps) => {
  const t = translations[lang];
  
  return (
    <section className="bg-gradient-to-b from-white to-[#f0f9f4] py-16">
      <ContainerSection>
        <div className="mx-auto max-w-4xl">
          {/* Main SEO Content */}
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-2xl font-bold text-[#083F19] lg:text-3xl">
              {t.seoTitle}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.bioP1 }}
              />
              <p className="leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: t.bioP2 }} />
                <Link href={`/${lang}/product/agriculture`} className="mx-1 text-green-600 hover:underline">{t.bioFertilizer}</Link>,
                <Link href={`/${lang}/product/agriculture`} className="mx-1 text-green-600 hover:underline">{t.bioInsecticide}</Link>, {t.and}
                <Link href={`/${lang}/product/livestock`} className="mx-1 text-green-600 hover:underline">{t.livestockProbiotic}</Link>.
              </p>
            </div>
          </div>

          {/* Key Points Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl">
                🔬
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {t.card1Title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.card1Desc}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                🌱
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {t.card2Title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.card2Desc}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl">
                🏭
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {t.card3Title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.card3Desc}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 rounded-xl bg-[#083F19] p-8 text-center text-white">
            <h3 className="mb-4 text-xl font-bold">
              {t.ctaTitle}
            </h3>
            <p className="mb-6 text-gray-200">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={`/${lang}/contact`}
                className="rounded-lg bg-white px-6 py-3 font-medium text-[#083F19] transition-all hover:bg-green-50"
              >
                {t.contactUs}
              </Link>
              <Link
                href={`/${lang}/product`}
                className="rounded-lg border border-white px-6 py-3 font-medium text-white transition-all hover:bg-white hover:text-[#083F19]"
              >
                {t.viewProducts}
              </Link>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default AboutSEOSection;
