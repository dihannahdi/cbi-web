import Image from "next/image";
import Link from "next/link";

import { getImageUrl } from "@/utils/getImageUrl";

import { AboutUs } from "@/types/responseTypes/aboutUsData";
import ContainerSection from "@/components/layout/container";
import { Locale } from "@/i18n-config";

interface AboutUsSectionProps {
  aboutUs: AboutUs;
  lang: Locale;
}

// Translations for the SEO content section
const translations = {
  id: {
    seoTitle: "Apa Itu Biotech? Mengenal Bioteknologi Indonesia",
    seoP1: "adalah cabang ilmu yang memanfaatkan",
    organisms: "organisme hidup",
    seoP1b: "untuk menghasilkan produk dan layanan yang bermanfaat bagi manusia. Di",
    variousFields: "berbagai bidang",
    seoP1c: "kehidupan, bioteknologi memainkan peran penting, termasuk dalam pertanian, peternakan, perikanan, dan kesehatan.",
    geneticEngineering: "Rekayasa genetika",
    seoP1d: "merupakan salah satu teknik modern dalam bioteknologi yang memungkinkan pengembangan produk-produk inovatif.",
    seoP2a: "Sebagai",
    biotechCompany: "perusahaan bioteknologi Indonesia",
    seoP2b: "yang berkomitmen pada inovasi, PT Centra Biotech Indonesia (PT CBI) mengembangkan solusi",
    biotechIndo: "biotech Indonesia",
    seoP2c: "untuk mendukung sektor agrikultur nasional. Kami memproduksi berbagai produk seperti",
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
  },
  en: {
    seoTitle: "What is Biotech? Understanding Biotechnology in Indonesia",
    seoP1: "is a branch of science that utilizes",
    organisms: "living organisms",
    seoP1b: "to produce products and services beneficial to humans. In",
    variousFields: "various fields",
    seoP1c: "of life, biotechnology plays an important role, including in agriculture, livestock, fisheries, and health.",
    geneticEngineering: "Genetic engineering",
    seoP1d: "is one of the modern techniques in biotechnology that enables the development of innovative products.",
    seoP2a: "As an",
    biotechCompany: "Indonesian biotechnology company",
    seoP2b: "committed to innovation, PT Centra Biotech Indonesia (PT CBI) develops",
    biotechIndo: "Indonesian biotech",
    seoP2c: "solutions to support the national agricultural sector. We produce various products such as",
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
  },
};

/**
 * AboutUsSection with integrated SEO content
 * Target keywords: biotech indonesia, apa itu biotech, perusahaan bioteknologi,
 * organisme hidup, berbagai bidang, rekayasa genetika, bioteknologi adalah cabang ilmu
 */
const AboutUsSection = ({ aboutUs, lang }: AboutUsSectionProps) => {
  const t = translations[lang];
  
  return (
    <section>
      <ContainerSection className="flex flex-col gap-y-8">
        {/* Main About Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-x-52">
          <h2 className="text-nowrap">{aboutUs.title}</h2>
          <p>{aboutUs.description}</p>
        </div>
        {aboutUs?.image?.url && (
          <Image
            src={getImageUrl(aboutUs.image.url)}
            alt={aboutUs.image.alternativeText ?? "about us"}
            width={aboutUs.image.width ?? 400}
            height={aboutUs.image.height ?? 400}
            className="h-60 rounded-2xl object-cover object-center lg:h-[25rem]"
          />
        )}

        {/* Integrated SEO Content - What is Biotech */}
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#f0f9f4] to-white p-8 lg:p-12">
          <h3 className="mb-6 text-2xl font-bold text-[#083F19] lg:text-3xl">
            {t.seoTitle}
          </h3>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              <strong>{lang === 'id' ? 'Bioteknologi' : 'Biotechnology'}</strong> {t.seoP1} <strong>{t.organisms}</strong> 
              {t.seoP1b} <strong>{t.variousFields}</strong> {t.seoP1c} <strong>{t.geneticEngineering}</strong> {t.seoP1d}
            </p>
            <p className="leading-relaxed">
              {t.seoP2a} <strong>{t.biotechCompany}</strong> {t.seoP2b} <strong>{t.biotechIndo}</strong> {t.seoP2c}
              <Link href={`/${lang}/product/agriculture`} className="mx-1 text-green-600 hover:underline">{t.bioFertilizer}</Link>,
              <Link href={`/${lang}/product/agriculture`} className="mx-1 text-green-600 hover:underline">{t.bioInsecticide}</Link>, {t.and}
              <Link href={`/${lang}/product/livestock`} className="mx-1 text-green-600 hover:underline">{t.livestockProbiotic}</Link>.
            </p>
          </div>

          {/* Key Points Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl">
                🔬
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-800">
                {t.card1Title}
              </h4>
              <p className="text-sm text-gray-600">
                {t.card1Desc}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
                🌱
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-800">
                {t.card2Title}
              </h4>
              <p className="text-sm text-gray-600">
                {t.card2Desc}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-2xl">
                🏭
              </div>
              <h4 className="mb-2 text-lg font-semibold text-gray-800">
                {t.card3Title}
              </h4>
              <p className="text-sm text-gray-600">
                {t.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default AboutUsSection;
