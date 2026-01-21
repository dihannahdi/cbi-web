import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import VideoGallerySlider from "@/components/product/VideoGallerySlider";
import { SITE_CONFIG } from "@/utils/seo";
import { MultipleStructuredData } from "@/utils/structuredData";
import {
  fetchStrapiProduct,
  transformFAQ,
  transformVideos,
  transformExternalLinks,
} from "@/utils/strapiProductData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Leaf, 
  Shield, 
  Droplets, 
  CheckCircle, 
  Sprout,
  Download,
  TrendingUp,
  MessageCircle,
  BadgeCheck,
  Zap,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk BIOJAGAT Pupuk Hayati Cair. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in BIOJAGAT Liquid Biological Fertilizer. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "https://docs.centrabiotechindonesia.com/uploads/e_brochure_Biojagat_placeholder.pdf",
  certificate: "https://docs.centrabiotechindonesia.com/uploads/SK_BIOJAGAT_placeholder.pdf",
  shopee: "https://shopee.co.id/Biojagat-Pupuk-Hayati-Cair-Premium-i.1083634538.placeholder",
};

// BIOJAGAT Videos Data
const biojagatVideos: Array<{
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
}> = [
  {
    id: "rRbK3D_gvS4",
    title: "TESTIMONI PETANI - BIOJAGAT PUPUK HAYATI CAIR",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "_B3pONNfGEI",
    title: "HASIL NYATA BIOJAGAT DI LAPANGAN",
    embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
    type: "youtube"
  },
  {
    id: "IkHUqxjLuIE",
    title: "CARA APLIKASI BIOJAGAT YANG EFEKTIF",
    embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
    type: "youtube"
  },
  {
    id: "zGF2bYyClhk",
    title: "KEUNGGULAN BIOJAGAT UNTUK PADI",
    embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
    type: "youtube"
  },
  {
    id: "7593292407202909461",
    title: "BIOJAGAT di Lapangan #1",
    embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461",
    type: "tiktok"
  },
  {
    id: "7589298285819563285",
    title: "BIOJAGAT di Lapangan #2",
    embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285",
    type: "tiktok"
  },
  {
    id: "7567321822954360085",
    title: "BIOJAGAT di Lapangan #3",
    embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085",
    type: "tiktok"
  },
  {
    id: "7512399240962854161",
    title: "BIOJAGAT di Lapangan #4",
    embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161",
    type: "tiktok"
  }
];

// Product data - bilingual
const productData = {
  id: {
    name: "BIOJAGAT",
    subtitle: "Pupuk Hayati Cair",
    tagline: "Konsorsium Mikroorganisme Unggulan untuk Pertanian Indonesia",
    heroTitle: "Pupuk Hayati Cair Terbaik - BIOJAGAT Tingkatkan Panen Hingga 40%",
    heroSubtitle: "Pupuk hayati cair premium dengan konsorsium mikroorganisme menguntungkan. Dipercaya petani di 19+ provinsi Indonesia.",
    description: "BIOJAGAT adalah pupuk organik cair (POC) premium yang diformulasikan dari bahan alami pilihan menggunakan teknologi fermentasi modern. Sebagai salah satu pupuk organik cair terbaik di Indonesia, BIOJAGAT mengandung mikroorganisme menguntungkan yang efektif menyuburkan tanah sekaligus meningkatkan ketahanan tanaman terhadap hama dan penyakit. POC BIOJAGAT telah terbukti meningkatkan hasil panen hingga 40%.",
    ctaWhatsapp: "Pesan Langsung via WhatsApp",
    ctaShopee: "Beli di Shopee",
    ctaBrochure: "Unduh Hasil Demplot",
    benefits: [
      { title: "Tingkatkan Hasil Panen", desc: "Terbukti meningkatkan produktivitas panen hingga 40%", icon: "trending" },
      { title: "Suburkan Tanah", desc: "Memperbaiki struktur tanah dan meningkatkan pH tanah", icon: "leaf" },
      { title: "Tahan Hama & Penyakit", desc: "Melindungi tanaman dari serangan hama dan penyakit", icon: "shield" },
      { title: "Ramah Lingkungan", desc: "100% organik dengan mikroba menguntungkan, aman untuk ekosistem", icon: "sprout" },
      { title: "Hemat Biaya", desc: "Mengurangi kebutuhan pupuk kimia hingga 50%", icon: "zap" },
      { title: "Mudah Diaplikasi", desc: "Cukup 1-2 ml/liter air, semprot atau siram", icon: "droplets" },
    ],
    faq: [
      { 
        q: "Apa itu pupuk organik cair (POC) BIOJAGAT?", 
        a: "BIOJAGAT adalah pupuk hayati cair yang mengandung konsorsium mikroorganisme menguntungkan (Serratia marcescens, Azospirillum sp, Trichoderma harzianum, Pseudomonas fluorescens) yang berfungsi sebagai pupuk hayati, pengendali hama, pengendali penyakit, penghasil hormon, dan dekomposer." 
      },
      { 
        q: "Berapa lama BIOJAGAT mulai bekerja?", 
        a: "BIOJAGAT mulai bekerja dalam 3-7 hari setelah aplikasi. Mikroorganisme akan aktif memperbaiki struktur tanah dan meningkatkan ketersediaan nutrisi bagi tanaman." 
      },
      { 
        q: "Apakah pupuk organik cair aman dicampur pestisida?", 
        a: "Tidak dianjurkan mencampur BIOJAGAT dengan kimia/pestisida atau herbisida karena dapat membunuh mikroorganisme menguntungkan di dalamnya." 
      },
      { 
        q: "Berapa dosis pupuk organik cair untuk 1 hektar sawah?", 
        a: "Untuk padi: 1-2 liter BIOJAGAT per hektar dengan konsentrasi 1-2 ml per liter air, aplikasi setiap 2 minggu sampai pertengahan umur tanam (60 hari)." 
      },
      { 
        q: "Apakah tersedia untuk pembelian pemerintah?", 
        a: "Ya, BIOJAGAT tersedia untuk pembelian dalam jumlah besar dan kerjasama dengan instansi pemerintah. Hubungi tim kami untuk penawaran khusus." 
      },
    ],
  },
  en: {
    name: "BIOJAGAT",
    subtitle: "Liquid Biological Fertilizer",
    tagline: "Premium Microorganism Consortium for Indonesian Agriculture",
    heroTitle: "Best Liquid Biological Fertilizer - BIOJAGAT Increases Harvest Up to 40%",
    heroSubtitle: "Premium liquid biological fertilizer with beneficial microorganism consortium. Trusted by farmers across 19+ Indonesian provinces.",
    description: "BIOJAGAT is a premium liquid organic fertilizer (LOF) formulated from selected natural ingredients using modern fermentation technology. As one of the best liquid organic fertilizers in Indonesia, BIOJAGAT contains beneficial microorganisms that effectively fertilize soil while increasing plant resistance to pests and diseases. BIOJAGAT LOF has been proven to increase harvest up to 40%.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaShopee: "Buy on Shopee",
    ctaBrochure: "Download Demplot Results",
    benefits: [
      { title: "Increase Harvest Yield", desc: "Proven to increase productivity up to 40%", icon: "trending" },
      { title: "Enrich Soil", desc: "Improves soil structure and increases soil pH", icon: "leaf" },
      { title: "Pest & Disease Resistant", desc: "Protects plants from pest and disease attacks", icon: "shield" },
      { title: "Eco-Friendly", desc: "100% organic with beneficial microbes, safe for ecosystem", icon: "sprout" },
      { title: "Cost Effective", desc: "Reduces chemical fertilizer needs by up to 50%", icon: "zap" },
      { title: "Easy Application", desc: "Just 1-2 ml/liter water, spray or pour", icon: "droplets" },
    ],
    faq: [
      { 
        q: "What is BIOJAGAT liquid organic fertilizer (LOF)?", 
        a: "BIOJAGAT is a liquid biological fertilizer containing a consortium of beneficial microorganisms (Serratia marcescens, Azospirillum sp, Trichoderma harzianum, Pseudomonas fluorescens) that function as biological fertilizer, pest control, disease control, hormone producer, and decomposer." 
      },
      { 
        q: "How long before BIOJAGAT starts working?", 
        a: "BIOJAGAT starts working within 3-7 days after application. The microorganisms will actively improve soil structure and increase nutrient availability for plants." 
      },
      { 
        q: "Is it safe to mix with pesticides?", 
        a: "It is not recommended to mix BIOJAGAT with chemicals/pesticides or herbicides as it can kill the beneficial microorganisms inside." 
      },
      { 
        q: "What is the dosage for 1 hectare of rice field?", 
        a: "For rice: 1-2 liters of BIOJAGAT per hectare with concentration of 1-2 ml per liter of water, applied every 2 weeks until mid-growth stage (60 days)." 
      },
      { 
        q: "Is it available for government procurement?", 
        a: "Yes, BIOJAGAT is available for bulk purchases and cooperation with government agencies. Contact our team for special offers." 
      },
    ],
  },
};

// Generate metadata with enhanced SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = productData[lang];

  const title = lang === 'id' 
    ? "Pupuk Hayati Cair BIOJAGAT - POC Terbaik Tingkatkan Panen 40% | Bersertifikat Kementan"
    : "BIOJAGAT Liquid Biological Fertilizer - Best LOF Increase Harvest 40% | Certified";
  
  const description = lang === 'id'
    ? "Pupuk hayati cair (POC) BIOJAGAT dengan konsorsium mikroorganisme menguntungkan. Pupuk hayati cair terbaik untuk meningkatkan panen hingga 40%. Pesan BIOJAGAT sekarang!"
    : "BIOJAGAT liquid biological fertilizer with beneficial microorganism consortium. Best biological liquid fertilizer proven to increase harvest up to 40%. Order now!";

  const keywords = lang === 'id'
    ? "jual pupuk hayati cair, pupuk hayati cair, poc, pupuk hayati cair terbaik, biojagat, jual biojagat, distributor pupuk hayati cair, pupuk hayati bersertifikat, pupuk mikroba, centra biotech, pertanian berkelanjutan"
    : "liquid biological fertilizer, buy biological fertilizer, lof, best biological fertilizer, biojagat, buy biojagat, biological fertilizer distributor, certified biological fertilizer, microbial fertilizer, centra biotech, sustainable agriculture";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "PT. Centra Biotech Indonesia" }],
    creator: "Centra Biotech Indonesia",
    publisher: "Centra Biotech Indonesia",
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `https://cbi-backend.my.id/uploads/mockup-label-biojagat-1000.png`,
        width: 1200,
        height: 630,
        alt: data.name + " - " + data.subtitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://cbi-backend.my.id/uploads/mockup-label-biojagat-1000.png`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BiojagatlProductPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Fetch data from Strapi CMS
  const strapiData = await fetchStrapiProduct("biojagat-pupuk-hayati-cair");
  
  // Use static fallback data as base
  const staticData = productData[lang];
  
  // Merge Strapi data with static fallback
  const data = {
    ...staticData,
    name: strapiData?.name || staticData.name,
    subtitle: strapiData?.subtitle || staticData.subtitle,
    tagline: strapiData?.tagline || staticData.tagline,
    heroTitle: strapiData?.heroTitle || staticData.heroTitle,
    heroSubtitle: strapiData?.heroSubtitle || staticData.heroSubtitle,
    description: strapiData?.description || staticData.description,
    faq: transformFAQ(strapiData?.faq, staticData.faq),
  };
  
  // Videos and links from Strapi or fallback
  const videos = transformVideos(strapiData?.videos, biojagatVideos);
  const externalLinks = transformExternalLinks(strapiData?.externalLinks, EXTERNAL_LINKS);
  
  // WhatsApp URL
  const whatsappNumber = strapiData?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = strapiData?.whatsappMessage || (lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Generate comprehensive structured data for maximum SEO + AI Search Engines
  const schemas = [
    // Product Schema
    {
      '@context': 'https://schema.org',
      '@type': ['Product', 'Thing'],
      '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biojagat-pupuk-hayati-cair#product`,
      name: `${data.name} - ${data.subtitle}`,
      alternateName: lang === 'id' 
        ? ['BIOJAGAT LOF', 'BIOJAGAT Pupuk Hayati', 'Pupuk Hayati Cair BIOJAGAT', 'POC BIOJAGAT']
        : ['BIOJAGAT LOF', 'BIOJAGAT Biological Fertilizer', 'BIOJAGAT Liquid Biological Fertilizer'],
      description: data.description,
      image: `https://cbi-backend.my.id/uploads/mockup-label-biojagat-1000.png`,
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`,
      sku: 'BIOJAGAT-1L',
      mpn: 'BIOJAGAT-LOF-2024',
      manufacturer: {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}#organization`,
        name: 'PT Centra Biotech Indonesia',
        url: SITE_CONFIG.url,
      },
      brand: {
        '@type': 'Brand',
        name: 'BIOJAGAT',
      },
      category: lang === 'id' 
        ? ['Produk Pertanian', 'Pupuk', 'Pupuk Hayati Cair', 'Pupuk Mikroba']
        : ['Agricultural Products', 'Fertilizers', 'Liquid Biological Fertilizers', 'Microbial Fertilizers'],
      offers: {
        '@type': 'Offer',
        url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biojagat-pupuk-hayati-cair`,
        availability: 'https://schema.org/InStock',
        priceCurrency: 'IDR',
        seller: {
          '@type': 'Organization',
          name: 'PT Centra Biotech Indonesia',
        },
      },
    },
    // FAQ Schema
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ];

  return (
    <>
      {/* Structured Data for SEO + AI Search */}
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section */}
      <HeroSectionGeneral
        imgUrl="https://cbi-backend.my.id/uploads/mockup-label-biojagat-1000.png"
        category="Pupuk Hayati"
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            Tingkatkan Hasil Panen Anda dengan {data.name} - {data.subtitle}
          </h1>
        }
      />

      {/* Breadcrumb */}
      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />

      {/* Product Overview Section */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            {/* Left: Product Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/products/biojagat/biojagat-mockup.png"
                  alt={`${data.name} - ${data.subtitle}`}
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:text-3xl">
                {data.heroTitle}
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {data.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#119f40] hover:bg-[#0d7a31] px-6 py-4 font-semibold text-white transition-all shadow-sm hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  {data.ctaWhatsapp}
                </Link>
                <Link
                  href={EXTERNAL_LINKS.shopee}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] px-6 py-4 font-semibold text-white transition-all shadow-sm hover:shadow-lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {data.ctaShopee}
                </Link>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Benefits Section */}
      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left: Header & Description */}
            <div className="space-y-6 md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {lang === 'id' 
                    ? 'Mengapa Petani Memilih BIOJAGAT?'
                    : 'Why Farmers Choose BIOJAGAT?'}
                </h2>
              </div>
              <p className="text-gray-600">
                {lang === 'id'
                  ? 'BIOJAGAT adalah pupuk hayati cair yang mengandung konsorsium mikroorganisme bermanfaat dengan kandungan mikroba tinggi. Diformulasikan khusus untuk meningkatkan kesuburan tanah dan produktivitas tanaman secara alami dan berkelanjutan.'
                  : 'BIOJAGAT is a liquid biological fertilizer containing a consortium of beneficial microorganisms with high microbial content. Specially formulated to naturally and sustainably improve soil fertility and plant productivity.'}
              </p>
              
              {/* CTA Button - Download Demplot */}
              <Link
                href={EXTERNAL_LINKS.brochure}
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-fit"
              >
                <Download className="h-5 w-5" />
                {data.ctaBrochure}
              </Link>
            </div>

            {/* Right: Benefits Cards Grid - 2x3 Layout */}
            <div className="grid grid-cols-1 gap-4 md:w-1/2 md:grid-cols-2">
              {/* Card 1: Tingkatkan Hasil Panen */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <TrendingUp className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {data.benefits[0].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {data.benefits[0].desc}
                </p>
              </div>

              {/* Card 2: Suburkan Tanah */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Leaf className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {data.benefits[1].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {data.benefits[1].desc}
                </p>
              </div>

              {/* Card 3: Tahan Hama & Penyakit */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Shield className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {data.benefits[2].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {data.benefits[2].desc}
                </p>
              </div>

              {/* Card 4: Ramah Lingkungan */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Sprout className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {data.benefits[3].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {data.benefits[3].desc}
                </p>
              </div>

              {/* Card 5: Hemat Biaya */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Zap className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {data.benefits[4].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {data.benefits[4].desc}
                </p>
              </div>

              {/* Card 6: Mudah Diaplikasi */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Droplets className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {data.benefits[5].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {data.benefits[5].desc}
                </p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Documents & Certifications Section */}
      <section className="bg-[#EEE] py-20">
        <ContainerSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Dokumen Resmi & Sertifikasi' : 'Official Documents & Certifications'}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {lang === 'id' 
                ? 'BIOJAGAT bersertifikat resmi dari Kementerian Pertanian RI dan memenuhi standar kualitas nasional.'
                : 'BIOJAGAT is officially certified by the Ministry of Agriculture RI and meets national quality standards.'}
            </p>
          </div>

          {/* Certification Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {/* Kementerian Pertanian RI */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo Kementerian Pertanian.png"
                    alt="Kementerian Pertanian RI"
                    width={128}
                    height={128}
                    className="object-contain transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Kementerian Pertanian RI' : 'Ministry of Agriculture RI'}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <BadgeCheck className="h-3 w-3" />
                    {lang === 'id' ? 'Tersertifikasi' : 'Certified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sertifikat Organik LeSOS */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo-Organik-Indonesia-01.png"
                    alt="LeSOS Organic Certificate"
                    width={128}
                    height={128}
                    className="object-contain transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Sertifikat Organik LeSOS' : 'LeSOS Organic Certificate'}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <BadgeCheck className="h-3 w-3" />
                    {lang === 'id' ? 'Tersertifikasi' : 'Certified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Standar SNI */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/SNI Logo.svg"
                    alt="SNI Standard"
                    width={128}
                    height={128}
                    className="object-contain transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Standar SNI' : 'SNI Standard'}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <BadgeCheck className="h-3 w-3" />
                    {lang === 'id' ? 'Tersertifikasi' : 'Certified'}
                  </span>
                </div>
              </div>
            </div>

            {/* KAN Accreditation */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/KAN Logo.webp"
                    alt="KAN Accreditation"
                    width={128}
                    height={128}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Akreditasi KAN' : 'KAN Accreditation'}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {lang === 'id' ? 'Komite Akreditasi Nasional' : 'National Accreditation Committee'}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <BadgeCheck className="h-3 w-3" />
                    {lang === 'id' ? 'Terakreditasi' : 'Accredited'}
                  </span>
                </div>
              </div>
            </div>

            {/* TKDN Certificate */}
            <Link
              href="https://tkdn.kemenperin.go.id/"
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/TKDN Logo.png"
                    alt="TKDN Certificate"
                    width={128}
                    height={128}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Sertifikat TKDN' : 'TKDN Certificate'}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all">
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'id' ? 'Verifikasi Sertifikat' : 'Verify Certificate'}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </ContainerSection>
      </section>

      {/* Video Gallery Section - Batch Slider */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Lihat BIOJAGAT Beraksi' : 'Watch BIOJAGAT in Action'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Saksikan testimoni petani dan hasil nyata penggunaan BIOJAGAT di lapangan'
                : 'Watch farmer testimonials and real results of BIOJAGAT in the field'}
            </p>
          </div>

          <VideoGallerySlider videos={biojagatVideos} />
        </ContainerSection>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                {lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600">
                {lang === 'id' 
                  ? 'Temukan jawaban atas pertanyaan umum tentang BIOJAGAT'
                  : 'Find answers to common questions about BIOJAGAT'}
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {data.faq.map((item, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`faq-${idx}`}
                  className="bg-gray-50 rounded-2xl border border-gray-200 px-6 overflow-hidden data-[state=open]:bg-[#006622]/5 data-[state=open]:border-[#006622]/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span className="h-7 w-7 rounded-full bg-[#006622] text-white flex items-center justify-center text-sm flex-shrink-0 group-data-[state=open]:bg-[#004d1a] transition-colors">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-gray-900 group-data-[state=open]:text-[#006622] transition-colors">
                        {item.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 ml-10">
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still have questions CTA */}
            <div className="mt-12 text-center bg-gradient-to-br from-[#006622]/5 to-[#009933]/5 rounded-2xl p-8 border border-[#006622]/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <MessageCircle className="h-8 w-8 text-[#006622]" />
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {lang === 'id' ? 'Masih ada pertanyaan?' : 'Still have questions?'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'id' ? 'Tim kami siap membantu Anda.' : 'Our team is ready to help you.'}
                  </p>
                </div>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#119f40] hover:bg-[#0d7a31] text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  {lang === 'id' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
                </Link>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
}
