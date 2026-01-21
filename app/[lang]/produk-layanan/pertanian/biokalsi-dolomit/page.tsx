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
import { 
  generateProductSchema,
  generateBreadcrumbSchema,
  generateVideoSchema,
  generateFAQSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";
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
  ExternalLink,
  Download,
  TrendingUp,
  MessageCircle,
  BadgeCheck,
  Zap,
  Sparkles,
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk BIOKALSI Dolomit. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in BIOKALSI Dolomite. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "#",
  labTest: "#",
};

// BIOKALSI Videos Data
const biokalsiVideos: Array<{
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
}> = [
  {
    id: "rRbK3D_gvS4",
    title: "PEMBENAHAN TANAH ASAM DENGAN BIOKALSI DOLOMIT",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "_B3pONNfGEI",
    title: "TESTIMONI PETANI TENTANG BIOKALSI DOLOMIT CENTRA BIOTECH",
    embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
    type: "youtube"
  },
  {
    id: "IkHUqxjLuIE",
    title: "CARA EFEKTIF MENETRALKAN PH TANAH ASAM",
    embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
    type: "youtube"
  },
  {
    id: "zGF2bYyClhk",
    title: "TESTIMONI PENGGUNA BIOKALSI DARI BERBAGAI DAERAH",
    embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
    type: "youtube"
  },
];

// Product data - bilingual
const productData = {
  id: {
    name: "BIOKALSI",
    subtitle: "Pupuk Dolomit Premium",
    heroTitle: "Atasi Tanah Asam dengan BIOKALSI - Dolomit Premium MgO 18,64% CaO 30,51%",
    description: "BIOKALSI adalah pupuk dolomit premium dengan kandungan MgO 18,64% dan CaO 30,51%. Efektif menetralkan pH tanah asam, menyediakan kalsium & magnesium untuk tanaman, serta mengatasi keracunan Mn dan Al. Mesh 100 untuk kelarutan maksimal.",
    ctaWhatsapp: "Pesan via WhatsApp",
    ctaBrochure: "Unduh Brosur",
    whyChooseDescription: "BIOKALSI adalah dolomit premium dengan fungsi ganda: menetralkan pH tanah asam sekaligus menyediakan unsur Ca dan Mg yang vital. Mesh 100 untuk kelarutan dan efektivitas maksimal.",
    faq: [
      {
        q: "Apa itu BIOKALSI?",
        a: "BIOKALSI adalah pupuk dolomit premium dari batu kapur dolomit pilihan dengan kandungan MgO 18,64% dan CaO 30,51%. Dirancang untuk menetralkan tanah asam dan menyediakan unsur hara Ca & Mg bagi tanaman."
      },
      {
        q: "Apa keunggulan BIOKALSI dibanding dolomit biasa?",
        a: "BIOKALSI memiliki kandungan MgO dan CaO tinggi, mesh 100 (sangat halus) untuk penyerapan cepat, tersertifikasi dan teruji laboratorium, serta efektif mengatasi keracunan Al dan Mn pada tanah."
      },
      {
        q: "Berapa dosis penggunaan BIOKALSI?",
        a: "Dosis umum: 1-2 ton per hektar untuk tanah normal, 2-4 ton per hektar untuk tanah sangat asam (pH < 4.5). Aplikasikan 2-4 minggu sebelum tanam, aduk merata dengan tanah."
      },
      {
        q: "Untuk tanaman apa saja BIOKALSI cocok?",
        a: "BIOKALSI cocok untuk SEMUA tanaman: padi, jagung, sayuran, buah-buahan, tanaman perkebunan (kelapa sawit, karet, kakao), dan semua tanaman yang membutuhkan Ca & Mg."
      },
      {
        q: "Apakah tersedia untuk pengadaan pemerintah?",
        a: "Ya, BIOKALSI tersedia untuk pengadaan pemerintah dan proyek pertanian skala besar. Hubungi tim kami untuk informasi pemesanan dalam jumlah besar dan penawaran khusus."
      },
    ],
  },
  en: {
    name: "BIOKALSI",
    subtitle: "Premium Dolomite Fertilizer",
    heroTitle: "Solve Acidic Soil with BIOKALSI - Premium Dolomite MgO 18.64% CaO 30.51%",
    description: "BIOKALSI is a premium dolomite fertilizer with MgO 18.64% and CaO 30.51% content. Effectively neutralizes acidic soil pH, provides calcium & magnesium for plants, and overcomes Mn and Al toxicity. Mesh 100 for maximum solubility.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaBrochure: "Download Brochure",
    whyChooseDescription: "BIOKALSI is a premium dolomite with dual function: neutralizing acidic soil pH while providing vital Ca and Mg elements. Mesh 100 for maximum solubility and effectiveness.",
    faq: [
      {
        q: "What is BIOKALSI?",
        a: "BIOKALSI is a premium dolomite fertilizer from selected dolomite limestone with MgO 18.64% and CaO 30.51% content. Designed to neutralize acidic soil and provide Ca & Mg nutrients for plants."
      },
      {
        q: "What are BIOKALSI's advantages over regular dolomite?",
        a: "BIOKALSI has high MgO and CaO content, mesh 100 (very fine) for fast absorption, certified and laboratory tested, and effectively overcomes Al and Mn toxicity in soil."
      },
      {
        q: "What is the dosage for BIOKALSI?",
        a: "General dosage: 1-2 tons per hectare for normal soil, 2-4 tons per hectare for very acidic soil (pH < 4.5). Apply 2-4 weeks before planting, mix evenly with soil."
      },
      {
        q: "What plants is BIOKALSI suitable for?",
        a: "BIOKALSI is suitable for ALL plants: rice, corn, vegetables, fruits, plantation crops (palm oil, rubber, cocoa), and all plants requiring Ca & Mg."
      },
      {
        q: "Is it available for government procurement?",
        a: "Yes, BIOKALSI is available for government procurement and large-scale agricultural projects. Contact our team for bulk order information and special offers."
      },
    ],
  },
};

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = productData[lang];
  
  return {
    title: `${data.heroTitle} | Centra Biotech Indonesia`,
    description: data.description,
    keywords: lang === 'id'
      ? ['dolomit', 'biokalsi', 'pupuk dolomit', 'tanah asam', 'kapur pertanian']
      : ['dolomite', 'biokalsi', 'dolomite fertilizer', 'acidic soil', 'agricultural lime'],
    openGraph: {
      title: `${data.heroTitle} | Centra Biotech Indonesia`,
      description: data.description,
      images: ['/images/products/biokalsi-dolomit.webp'],
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokalsi-dolomit`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/biokalsi-dolomit`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/biokalsi-dolomit`,
      },
    },
  };
}

export default async function BiokalsiPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Fetch data from Strapi CMS
  const strapiData = await fetchStrapiProduct("biokalsi-dolomit");
  
  // Use static fallback data as base
  const staticData = productData[lang];
  
  // Merge Strapi data with static fallback (only existing fields)
  const data = {
    ...staticData,
    name: strapiData?.name || staticData.name,
    subtitle: strapiData?.subtitle || staticData.subtitle,
    heroTitle: strapiData?.heroTitle || staticData.heroTitle,
    description: strapiData?.description || staticData.description,
    faq: transformFAQ(strapiData?.faq, staticData.faq),
  };
  
  // Videos and links from Strapi or fallback
  const videos = transformVideos(strapiData?.videos, biokalsiVideos);
  const externalLinks = transformExternalLinks(strapiData?.externalLinks, EXTERNAL_LINKS);
  
  // WhatsApp URL
  const whatsappNumber = strapiData?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = strapiData?.whatsappMessage || (lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const productSchema = generateProductSchema({
    name: data.name,
    description: data.description,
    image: '/images/products/biokalsi-dolomit.webp',
    url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokalsi-dolomit`,
    brand: 'Centra Biotech Indonesia',
    offers: { price: 0, priceCurrency: 'IDR', availability: 'InStock' as const },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
    { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
    { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
    { name: data.name, url: `/${lang}/produk-layanan/pertanian/biokalsi-dolomit` },
  ]);

  const faqSchema = generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a })));
  const videoSchemas = biokalsiVideos.map(video => generateVideoSchema({
    name: video.title,
    description: video.title,
    thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: '2024-01-01',
    contentUrl: video.embedUrl,
  }));

  return (
    <>
      <MultipleStructuredData dataArray={[productSchema, breadcrumbSchema, faqSchema, ...videoSchemas]} />
      
      <HeroSectionGeneral
        imgUrl="/images/products/biokalsi-dolomit.webp"
        category="Pupuk Pembenah Tanah"
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            Netralkan Tanah Asam dengan {data.name} - {data.subtitle}
          </h1>
        }
      />

      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />

      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/images/products/biokalsi-dolomit.webp"
                  alt={`${data.name} - ${data.subtitle}`}
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:text-3xl">{data.heroTitle}</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{data.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={whatsappUrl} target="_blank" className="flex items-center gap-2 rounded-xl bg-[#119f40] hover:bg-[#0d7a31] px-6 py-4 font-semibold text-white transition-all hover:shadow-lg">
                  <MessageCircle className="h-5 w-5" />
                  {data.ctaWhatsapp}
                </Link>
                <Link href={EXTERNAL_LINKS.brochure} className="flex items-center gap-2 rounded-xl border-2 border-[#006622] text-[#006622] hover:bg-[#006622] hover:text-white px-6 py-4 font-semibold transition-all">
                  <Download className="h-5 w-5" />
                  {data.ctaBrochure}
                </Link>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="space-y-6 md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                {lang === 'id' ? 'Mengapa Petani Memilih BIOKALSI?' : 'Why Farmers Choose BIOKALSI?'}
              </h2>
              <p className="text-gray-600">{data.whyChooseDescription}</p>
              <Link href={EXTERNAL_LINKS.labTest} className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-fit">
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Hasil Uji Lab' : 'Download Lab Test Results'}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:w-1/2 md:grid-cols-2">
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Zap className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'id' ? 'Fungsi Ganda' : 'Dual Function'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'id' ? 'Netralkan pH & sediakan Ca-Mg sekaligus' : 'Neutralize pH & provide Ca-Mg simultaneously'}</p>
              </div>
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <TrendingUp className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'id' ? 'Kandungan Tinggi' : 'High Content'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'id' ? 'MgO 18,64% dan CaO 30,51% terjamin' : 'MgO 18.64% and CaO 30.51% guaranteed'}</p>
              </div>
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Shield className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'id' ? 'Atasi Keracunan' : 'Overcome Toxicity'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'id' ? 'Efektif atasi keracunan Al dan Mn' : 'Effectively overcome Al and Mn toxicity'}</p>
              </div>
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Leaf className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'id' ? 'Ramah Lingkungan' : 'Eco-Friendly'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'id' ? 'Alami dari batu kapur dolomit pilihan' : 'Natural from selected dolomite limestone'}</p>
              </div>
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Droplets className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'id' ? 'Tanaman Lebih Kuat' : 'Stronger Plants'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'id' ? 'Ca memperkuat batang & dinding sel' : 'Ca strengthens stems & cell walls'}</p>
              </div>
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Sparkles className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'id' ? 'Mesh Halus 100' : 'Fine Mesh 100'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'id' ? 'Kelarutan tinggi, efektif & cepat bereaksi' : 'High solubility, effective & fast reaction'}</p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      <section className="bg-[#EEE] py-20">
        <ContainerSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">{lang === 'id' ? 'Dokumen Resmi & Sertifikasi' : 'Official Documents & Certifications'}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">{lang === 'id' ? 'BIOKALSI bersertifikat resmi dari PT Centra Biotech Indonesia dan memiliki sertifikat uji laboratorium. Unduh dokumen lengkap untuk referensi Anda.' : 'BIOKALSI is officially certified by PT Centra Biotech Indonesia and has laboratory test certificates. Download complete documents for your reference.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/Logo Kementerian Pertanian.png" alt="Kementerian Pertanian RI" width={128} height={128} className="object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">PT Centra Biotech Indonesia</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Produsen Terpercaya' : 'Trusted Manufacturer'}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/Logo-Organik-Indonesia-01.png" alt="Lab Certificate" width={128} height={128} className="object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Sertifikat Uji Laboratorium' : 'Laboratory Test Certificate'}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Tersertifikasi' : 'Certified'}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/SNI Logo.svg" alt="SNI Standard" width={128} height={128} className="object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Standar Mutu Terjamin' : 'Guaranteed Quality Standard'}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Terstandarisasi' : 'Standardized'}</span>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/KAN Logo.webp" alt="KAN Accreditation" width={128} height={128} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Izin Pendaftaran Resmi' : 'Official Registration Permit'}</h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">04.03.2024.537</p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Terdaftar Resmi' : 'Officially Registered'}</span>
                </div>
              </div>
            </div>
            <Link href="#" className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/TKDN Logo.png" alt="TKDN Certificate" width={128} height={128} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Masa Edar' : 'Validity Period'}</h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">{lang === 'id' ? 'Hingga Maret 2028' : 'Until March 2028'}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all"><ExternalLink className="h-3 w-3" />{lang === 'id' ? 'Verifikasi Sertifikat' : 'Verify Certificate'}</span>
                </div>
              </div>
            </Link>
          </div>
        </ContainerSection>
      </section>

      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">{lang === 'id' ? 'Lihat BIOKALSI Beraksi' : 'Watch BIOKALSI in Action'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{lang === 'id' ? 'Saksikan testimoni petani dan hasil nyata penggunaan BIOKALSI di lapangan' : 'Watch farmer testimonials and real results of BIOKALSI in the field'}</p>
          </div>
          <VideoGallerySlider videos={biokalsiVideos} />
        </ContainerSection>
      </section>

      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">{lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}</h2>
              <p className="text-gray-600">{lang === 'id' ? 'Temukan jawaban atas pertanyaan umum tentang BIOKALSI' : 'Find answers to common questions about BIOKALSI'}</p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {data.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="bg-gray-50 rounded-2xl border border-gray-200 px-6 overflow-hidden data-[state=open]:bg-[#006622]/5 data-[state=open]:border-[#006622]/30 transition-colors duration-300">
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <span className="h-7 w-7 rounded-full bg-[#006622] text-white flex items-center justify-center text-sm flex-shrink-0 group-data-[state=open]:bg-[#004d1a] transition-colors">{idx + 1}</span>
                      <span className="font-bold text-gray-900 group-data-[state=open]:text-[#006622] transition-colors">{item.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 ml-10">
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-12 text-center bg-gradient-to-br from-[#006622]/5 to-[#009933]/5 rounded-2xl p-8 border border-[#006622]/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <MessageCircle className="h-8 w-8 text-[#006622]" />
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{lang === 'id' ? 'Masih ada pertanyaan?' : 'Still have questions?'}</h3>
                  <p className="text-gray-600">{lang === 'id' ? 'Tim kami siap membantu Anda.' : 'Our team is ready to help you.'}</p>
                </div>
                <Link href={whatsappUrl} target="_blank" className="inline-flex items-center gap-2 bg-[#119f40] hover:bg-[#0d7a31] text-white font-semibold px-8 py-4 rounded-xl transition-all">
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
