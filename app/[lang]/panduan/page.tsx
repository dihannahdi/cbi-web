import { Metadata } from "next";
import Link from "next/link";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { SITE_CONFIG } from "@/utils/seo";
import {
  generateBreadcrumbSchema,
  MultipleStructuredData,
} from "@/utils/structuredData";
import {
  BookOpen,
  Droplets,
  Leaf,
  Shield,
  Sprout,
  TrendingUp,
  Users,
  ChevronRight,
} from "lucide-react";

// Guide categories data
interface GuideCard {
  slug: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
  icon: React.ReactNode;
  keywords: string[];
  color: string;
}

const GUIDES: GuideCard[] = [
  {
    slug: "pupuk-hayati-cair",
    title: {
      id: "Panduan Pupuk Hayati Cair",
      en: "Liquid Biofertilizer Guide",
    },
    description: {
      id: "Pelajari pengertian, jenis, cara aplikasi, dan dosis pupuk hayati cair untuk berbagai tanaman",
      en: "Learn about types, application methods, and dosage of liquid biofertilizer for various crops",
    },
    icon: <Droplets className="h-8 w-8" />,
    keywords: ["pupuk hayati cair", "biofertilizer cair"],
    color: "from-blue-500 to-blue-600",
  },
  {
    slug: "pupuk-organik-cair",
    title: {
      id: "Panduan Pupuk Organik Cair",
      en: "Liquid Organic Fertilizer Guide",
    },
    description: {
      id: "Panduan lengkap pupuk organik cair: bahan, proses pembuatan, manfaat, dan rekomendasi produk",
      en: "Complete guide to liquid organic fertilizer: materials, production, benefits, and product recommendations",
    },
    icon: <Leaf className="h-8 w-8" />,
    keywords: ["pupuk organik cair", "organic fertilizer"],
    color: "from-green-500 to-green-600",
  },
  {
    slug: "pembenah-tanah",
    title: {
      id: "Panduan Pembenah Tanah",
      en: "Soil Conditioner Guide",
    },
    description: {
      id: "Cara memperbaiki struktur tanah yang rusak dengan pembenah tanah organik dan biologis",
      en: "How to improve damaged soil structure with organic and biological soil conditioners",
    },
    icon: <Sprout className="h-8 w-8" />,
    keywords: ["pembenah tanah", "soil conditioner"],
    color: "from-amber-500 to-amber-600",
  },
  {
    slug: "asam-humat-cair",
    title: {
      id: "Panduan Asam Humat Cair",
      en: "Liquid Humic Acid Guide",
    },
    description: {
      id: "Manfaat asam humat untuk tanah dan tanaman, cara aplikasi, serta kombinasi dengan pupuk lain",
      en: "Benefits of humic acid for soil and plants, application methods, and combinations with other fertilizers",
    },
    icon: <TrendingUp className="h-8 w-8" />,
    keywords: ["asam humat cair", "humic acid"],
    color: "from-purple-500 to-purple-600",
  },
  {
    slug: "bio-pestisida",
    title: {
      id: "Panduan Bio Pestisida",
      en: "Biopesticide Guide",
    },
    description: {
      id: "Pengendalian hama dan penyakit tanaman dengan bio pestisida yang ramah lingkungan",
      en: "Pest and disease control with environmentally friendly biopesticides",
    },
    icon: <Shield className="h-8 w-8" />,
    keywords: ["bio pestisida", "biopesticide"],
    color: "from-red-500 to-red-600",
  },
  {
    slug: "distributor-pupuk-organik",
    title: {
      id: "Cara Jadi Distributor Pupuk",
      en: "Become a Fertilizer Distributor",
    },
    description: {
      id: "Panduan menjadi distributor pupuk organik dan hayati di Indonesia, syarat dan keuntungannya",
      en: "Guide to becoming an organic and biological fertilizer distributor in Indonesia",
    },
    icon: <Users className="h-8 w-8" />,
    keywords: ["distributor pupuk organik cair", "jual pupuk organik"],
    color: "from-indigo-500 to-indigo-600",
  },
];

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title =
    lang === "id"
      ? "Panduan Pertanian Organik & Bioteknologi | Centra Biotech Indonesia"
      : "Organic Agriculture & Biotechnology Guides | Centra Biotech Indonesia";

  const description =
    lang === "id"
      ? "Panduan lengkap pupuk hayati cair, pupuk organik, pembenah tanah, asam humat, bio pestisida, dan tips menjadi distributor pupuk di Indonesia."
      : "Complete guides on liquid biofertilizer, organic fertilizer, soil conditioner, humic acid, biopesticides, and tips to become a fertilizer distributor.";

  return {
    title,
    description,
    keywords: [
      "panduan pertanian",
      "pupuk hayati cair",
      "pupuk organik cair",
      "pembenah tanah",
      "asam humat cair",
      "bio pestisida",
      "distributor pupuk",
    ],
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/panduan`,
      languages: {
        id: `${SITE_CONFIG.url}/id/panduan`,
        en: `${SITE_CONFIG.url}/en/panduan`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/panduan`,
      siteName: SITE_CONFIG.name,
      locale: lang === "id" ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

// Main Component
export default async function PanduanIndexPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const pageTitle = lang === "id" ? "Panduan Pertanian" : "Agriculture Guides";
  const pageSubtitle =
    lang === "id"
      ? "Pelajari cara meningkatkan produktivitas pertanian dengan teknologi bioteknologi"
      : "Learn how to improve agricultural productivity with biotechnology";

  const structuredData = generateBreadcrumbSchema([
    { name: lang === "id" ? "Beranda" : "Home", url: `/${lang}` },
    { name: pageTitle, url: `/${lang}/panduan` },
  ]);

  return (
    <main>
      <MultipleStructuredData dataArray={[structuredData]} />

      {/* Hero */}
      <HeroSectionGeneral
        imgUrl="/images/hero/panduan-hero.webp"
        title={<h1 className="text-3xl lg:text-5xl font-bold text-center">{pageTitle}</h1>}
        category={pageSubtitle}
      />

      {/* Breadcrumb */}
      <Breadcrumb lang={lang} dict={dict} />

      {/* Guide Cards Grid */}
      <ContainerSection className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {lang === "id" ? "Pilih Topik Panduan" : "Choose a Guide Topic"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === "id"
                ? "Klik salah satu topik di bawah untuk membaca panduan lengkapnya"
                : "Click on a topic below to read the complete guide"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${lang}/panduan/${guide.slug}`}
                className="group block bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`bg-gradient-to-r ${guide.color} p-6 text-white`}
                >
                  <div className="flex items-center justify-between">
                    {guide.icon}
                    <ChevronRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {guide.title[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {guide.description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-4">
                    {guide.keywords.slice(0, 2).map((keyword) => (
                      <span
                        key={keyword}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ContainerSection>

      {/* SEO Text Section */}
      <ContainerSection className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {lang === "id" ? (
            <>
              <h2>Pusat Pengetahuan Pertanian Organik Indonesia</h2>
              <p>
                Selamat datang di pusat panduan pertanian dari Centra Biotech Indonesia. 
                Di sini Anda akan menemukan informasi lengkap tentang berbagai produk dan 
                teknologi pertanian organik berbasis bioteknologi, termasuk <strong>pupuk hayati cair</strong>, 
                <strong>pupuk organik cair</strong>, <strong>pembenah tanah</strong>, <strong>asam humat cair</strong>, 
                dan <strong>bio pestisida</strong>.
              </p>
              <p>
                Semua panduan disusun oleh tim ahli mikrobiologi dan agronomi Centra Biotech Indonesia 
                berdasarkan penelitian ilmiah dan pengalaman lapangan selama lebih dari 10 tahun. 
                Kami berkomitmen untuk membantu petani Indonesia beralih ke pertanian berkelanjutan 
                yang ramah lingkungan namun tetap produktif.
              </p>
              <h3>Mengapa Memilih Produk Centra Biotech?</h3>
              <ul>
                <li>Terdaftar resmi di Kementerian Pertanian RI</li>
                <li>Diproduksi dengan standar GMP (Good Manufacturing Practice)</li>
                <li>Didukung oleh tim ahli yang siap memberikan pendampingan</li>
                <li>Telah terbukti di ribuan hektar lahan di seluruh Indonesia</li>
              </ul>
            </>
          ) : (
            <>
              <h2>Indonesian Organic Agriculture Knowledge Center</h2>
              <p>
                Welcome to the agricultural guide center from Centra Biotech Indonesia. 
                Here you will find comprehensive information about various organic agricultural 
                products and biotechnology, including <strong>liquid biofertilizers</strong>, 
                <strong>liquid organic fertilizers</strong>, <strong>soil conditioners</strong>, 
                <strong>liquid humic acid</strong>, and <strong>biopesticides</strong>.
              </p>
              <p>
                All guides are compiled by Centra Biotech Indonesia&apos;s team of microbiology 
                and agronomy experts based on scientific research and over 10 years of field experience. 
                We are committed to helping Indonesian farmers transition to sustainable agriculture 
                that is environmentally friendly yet productive.
              </p>
              <h3>Why Choose Centra Biotech Products?</h3>
              <ul>
                <li>Officially registered with the Indonesian Ministry of Agriculture</li>
                <li>Produced with GMP (Good Manufacturing Practice) standards</li>
                <li>Supported by an expert team ready to provide assistance</li>
                <li>Proven on thousands of hectares of land throughout Indonesia</li>
              </ul>
            </>
          )}
        </div>
      </ContainerSection>
    </main>
  );
}
