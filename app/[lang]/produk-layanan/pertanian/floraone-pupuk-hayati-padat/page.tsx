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
  generateHowToSchema,
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
  Award, 
  Leaf, 
  Shield, 
  Droplets, 
  CheckCircle, 
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Calendar,
  Package,
  ExternalLink,
  ChevronRight,
  Sprout,
  Wheat,
  TreeDeciduous,
  Cherry,
  Carrot,
  Phone,
  ShoppingCart,
  FileText,
  Download,
  Play,
  Star,
  TrendingUp,
  Users,
  MapPin,
  MessageCircle,
  BadgeCheck,
  Zap,
  Clock,
  ArrowRight,
  Youtube,
  Bug,
  Microscope
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk FLORAONE Pupuk Hayati Padat. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in FLORAONE Solid Biological Fertilizer. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "https://docs.centrabiotechindonesia.com/uploads/Lap%20Uji%20Efektifitas%20FloraOne%20Padat%20(Tebu)_Feb%202020.pdf",
  certificate: "#",
  shopee: "https://shopee.co.id/Floraone-Pupuk-Hayati-Cair-1-Liter-By-Centra-Biotech-Tricoderma-Pestisida-Pupuk-Cair-Obat-Tanaman-Layu-Busuk-i.1083634538.22558722641?extraParams=%7B%22display_model_id%22%3A204670147772%7D",
  youtubeVideo: "https://www.youtube.com/shorts/A5twMwN51Kw",
  youtubeEmbed: "https://www.youtube.com/embed/A5twMwN51Kw",
};

// FLORAONE Videos Data (using same as RAJABIO for now)
const floraoneVideos: Array<{
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
}> = [
  {
    id: "rRbK3D_gvS4",
    title: "TESTIMONI PETANI MENGGUNAKAN FLORAONE",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "_B3pONNfGEI",
    title: "APLIKASI FLORAONE DI LAPANGAN",
    embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
    type: "youtube"
  },
  {
    id: "IkHUqxjLuIE",
    title: "HASIL PANEN DENGAN FLORAONE",
    embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
    type: "youtube"
  },
  {
    id: "zGF2bYyClhk",
    title: "FLORAONE UNTUK PERTANIAN ORGANIK",
    embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
    type: "youtube"
  }
];

// Product data - bilingual
const productData = {
  id: {
    name: "FLORAONE",
    subtitle: "Pupuk Hayati Padat",
    tagline: "Pupuk Hayati Organik Bersertifikat",
    heroTitle: "Tingkatkan Produktivitas Tanaman Anda dengan FloraOne - Pupuk Hayati Organik Bersertifikat",
    heroSubtitle: "FloraOne adalah pupuk hayati organik premium yang mengandung konsorsium mikroba unggul untuk meningkatkan kesuburan tanah dan produktivitas tanaman. Dengan kandungan 5 jenis mikroba bermanfaat dalam konsentrasi tinggi, FloraOne merupakan solusi alami untuk pertanian berkelanjutan yang ramah lingkungan.",
    description: "FloraOne adalah pupuk hayati organik premium yang mengandung konsorsium mikroba unggul untuk meningkatkan kesuburan tanah dan produktivitas tanaman. Dengan kandungan 5 jenis mikroba bermanfaat dalam konsentrasi tinggi, FloraOne merupakan solusi alami untuk pertanian berkelanjutan yang ramah lingkungan.",
    ctaWhatsapp: "Pesan Langsung via WhatsApp",
    ctaShopee: "Beli di Shopee",
    ctaBrochure: "Unduh Hasil Demplot",
    ctaCertificate: "Verifikasi Sertifikat",
    benefits: [
      { title: "Merangsang Akar & Bintil Akar", desc: "Rhizobium sp. membantu pembentukan bintil akar pada tanaman kacang-kacangan untuk fiksasi nitrogen alami", icon: "sprout" },
      { title: "Mempercepat Perkecambahan", desc: "Meningkatkan persentase perkecambahan biji dan pertumbuhan bibit yang lebih seragam", icon: "trending" },
      { title: "Memperbaiki Struktur Tanah", desc: "Mikroba mengurai bahan organik dan memperbaiki pH serta struktur tanah untuk pertumbuhan optimal", icon: "leaf" },
      { title: "Meningkatkan Produktivitas", desc: "Terbukti meningkatkan kuantitas dan kualitas hasil panen secara signifikan", icon: "zap" },
      { title: "Proteksi Alami", desc: "Melindungi tanaman dari serangan penyakit dan mengurangi penggunaan fungisida dan pupuk kimia", icon: "shield" },
      { title: "Efisien & Ekonomis", desc: "Mengurangi biaya produksi dengan efisiensi pemupukan dan menekan penggunaan input kimia", icon: "microscope" },
    ],
    certifications: [
      { label: "Kementerian Pertanian RI", value: "442-LeSOS-LSPr-092-IDN-08-25", date: "03.03.2021.546", icon: "gov" },
      { label: "Sertifikat Organik Indonesia", value: "SNI 6729:2016", subtitle: "Label Organik Indonesia", icon: "organic" },
      { label: "Akreditasi KAN", value: "Komite Akreditasi Nasional", icon: "kan" },
    ],
    faq: [
      { 
        q: "Apa itu pupuk hayati FloraOne?", 
        a: "FloraOne adalah pupuk hayati organik yang mengandung konsorsium mikroba unggul (Rhizobium, Azotobacter, Trichoderma, Aspergillus, dan Pseudomonas) yang bekerja untuk meningkatkan kesuburan tanah dan produktivitas tanaman secara alami." 
      },
      { 
        q: "Apa perbedaan pupuk hayati dengan pupuk organik biasa?", 
        a: "Pupuk hayati mengandung mikroorganisme hidup yang aktif bekerja memperbaiki tanah dan membantu tanaman, sedangkan pupuk organik biasa hanya mengandung bahan organik tanpa mikroba aktif." 
      },
      { 
        q: "Berapa lama FloraOne mulai bekerja?", 
        a: "Mikroba dalam FloraOne mulai aktif sejak aplikasi. Efek pada tanaman mulai terlihat 1-2 minggu setelah aplikasi, dengan hasil optimal pada masa panen." 
      },
      { 
        q: "Apakah FloraOne aman dicampur dengan pupuk kimia?", 
        a: "Sebaiknya aplikasi FloraOne dilakukan terpisah dari pupuk kimia atau pestisida kimia. Berikan jarak minimal 3-5 hari antara aplikasi FloraOne dengan input kimia." 
      },
      { 
        q: "Berapa dosis FloraOne untuk 1 hektar sawah?", 
        a: "Untuk perlakuan benih: 250 gr/ha. Untuk aplikasi ke tanah: 10-15 kg/ha, diberikan 2 kali (sebelum tanam dan 2-4 minggu setelah tanam)." 
      },
      { 
        q: "Apakah tersedia untuk pembelian pemerintah?", 
        a: "Ya, FloraOne tersedia untuk pembelian dalam jumlah besar untuk program pemerintah. Silakan hubungi tim kami untuk penawaran khusus." 
      },
    ],
    videoSection: {
      title: "Lihat FloraOne Beraksi",
      subtitle: "Saksikan testimoni petani dan hasil nyata penggunaan FloraOne di lapangan",
    },
  },
  en: {
    name: "FLORAONE",
    subtitle: "Solid Biological Fertilizer",
    tagline: "Certified Organic Biological Fertilizer",
    heroTitle: "Increase Your Plant Productivity with FloraOne - Certified Organic Biological Fertilizer",
    heroSubtitle: "FloraOne is a premium organic biological fertilizer containing superior microbial consortium to improve soil fertility and plant productivity. With 5 types of beneficial microbes in high concentration, FloraOne is a natural solution for sustainable and environmentally friendly agriculture.",
    description: "FloraOne is a premium organic biological fertilizer containing superior microbial consortium to improve soil fertility and plant productivity. With 5 types of beneficial microbes in high concentration, FloraOne is a natural solution for sustainable and environmentally friendly agriculture.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaShopee: "Buy on Shopee",
    ctaBrochure: "Download Demplot Results",
    ctaCertificate: "Verify Certificate",
    benefits: [
      { title: "Stimulates Roots & Root Nodules", desc: "Rhizobium sp. helps form root nodules on legume plants for natural nitrogen fixation", icon: "sprout" },
      { title: "Accelerates Germination", desc: "Increases seed germination percentage and more uniform seedling growth", icon: "trending" },
      { title: "Improves Soil Structure", desc: "Microbes decompose organic matter and improve pH and soil structure for optimal growth", icon: "leaf" },
      { title: "Increases Productivity", desc: "Proven to significantly increase the quantity and quality of harvest", icon: "zap" },
      { title: "Natural Protection", desc: "Protects plants from disease attacks and reduces the use of fungicides and chemical fertilizers", icon: "shield" },
      { title: "Efficient & Economical", desc: "Reduces production costs with fertilization efficiency and suppresses chemical input usage", icon: "microscope" },
    ],
    certifications: [
      { label: "Ministry of Agriculture RI", value: "442-LeSOS-LSPr-092-IDN-08-25", date: "03.03.2021.546", icon: "gov" },
      { label: "Indonesian Organic Certificate", value: "SNI 6729:2016", subtitle: "Indonesian Organic Label", icon: "organic" },
      { label: "KAN Accreditation", value: "National Accreditation Committee", icon: "kan" },
    ],
    faq: [
      { 
        q: "What is FloraOne biological fertilizer?", 
        a: "FloraOne is an organic biological fertilizer containing superior microbial consortium (Rhizobium, Azotobacter, Trichoderma, Aspergillus, and Pseudomonas) that work to improve soil fertility and plant productivity naturally." 
      },
      { 
        q: "What's the difference between biological and regular organic fertilizer?", 
        a: "Biological fertilizer contains living microorganisms actively working to improve soil and help plants, while regular organic fertilizer only contains organic matter without active microbes." 
      },
      { 
        q: "How long before FloraOne starts working?", 
        a: "Microbes in FloraOne start working from application. Effects on plants begin to show 1-2 weeks after application, with optimal results at harvest time." 
      },
      { 
        q: "Is FloraOne safe to mix with chemical fertilizers?", 
        a: "It's best to apply FloraOne separately from chemical fertilizers or pesticides. Give a minimum gap of 3-5 days between FloraOne application and chemical inputs." 
      },
      { 
        q: "What's the FloraOne dosage for 1 hectare of rice field?", 
        a: "For seed treatment: 250 gr/ha. For soil application: 10-15 kg/ha, given 2 times (before planting and 2-4 weeks after planting)." 
      },
      { 
        q: "Is it available for government procurement?", 
        a: "Yes, FloraOne is available for bulk purchase for government programs. Please contact our team for special offers." 
      },
    ],
    videoSection: {
      title: "Watch FloraOne in Action",
      subtitle: "Watch farmer testimonials and real results of FloraOne in the field",
    },
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
    ? "Pupuk Hayati FloraOne - Pupuk Organik Bersertifikat dengan Konsorsium Mikroba Unggul"
    : "FloraOne Biological Fertilizer - Certified Organic with Superior Microbial Consortium";
  
  const description = lang === 'id'
    ? "Pupuk hayati organik FloraOne mengandung konsorsium mikroba unggul (Rhizobium, Azotobacter, Trichoderma, Aspergillus, Pseudomonas) untuk meningkatkan kesuburan tanah dan produktivitas tanaman. Bersertifikat Kementan & SNI 6729:2016."
    : "FloraOne organic biological fertilizer contains superior microbial consortium (Rhizobium, Azotobacter, Trichoderma, Aspergillus, Pseudomonas) to improve soil fertility and plant productivity. Certified by Ministry of Agriculture & SNI 6729:2016.";

  const keywords = lang === 'id'
    ? "pupuk hayati, floraone, pupuk organik, pupuk mikroba, rhizobium, azotobacter, trichoderma, pupuk bersertifikat, pupuk kementan, pupuk organik padat, pupuk hayati organik, konsorsium mikroba, fiksasi nitrogen, pertanian berkelanjutan, pupuk ramah lingkungan, centra biotech"
    : "biological fertilizer, floraone, organic fertilizer, microbial fertilizer, rhizobium, azotobacter, trichoderma, certified fertilizer, organic solid fertilizer, biological organic fertilizer, microbial consortium, nitrogen fixation, sustainable agriculture, eco-friendly fertilizer, centra biotech";

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
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati-padat`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/mockup-flora-one-padat.png`,
        width: 1200,
        height: 630,
        alt: data.name + " - " + data.subtitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}/mockup-flora-one-padat.png`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati-padat`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/floraone-pupuk-hayati-padat`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/floraone-pupuk-hayati-padat`,
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

// Benefit icon component
const BenefitIcon = ({ type }: { type: string }) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'trending': return <TrendingUp className={iconClass} />;
    case 'leaf': return <Leaf className={iconClass} />;
    case 'shield': return <Shield className={iconClass} />;
    case 'sprout': return <Sprout className={iconClass} />;
    case 'zap': return <Zap className={iconClass} />;
    case 'droplets': return <Droplets className={iconClass} />;
    case 'microscope': return <Microscope className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

export default async function FloraOneProductPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Fetch data from Strapi CMS
  const strapiData = await fetchStrapiProduct("floraone-pupuk-hayati-padat");
  
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
  const videos = transformVideos(strapiData?.videos, floraoneVideos);
  const externalLinks = transformExternalLinks(strapiData?.externalLinks, EXTERNAL_LINKS);
  
  // WhatsApp URL
  const whatsappNumber = strapiData?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = strapiData?.whatsappMessage || (lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Generate comprehensive structured data
  const schemas = [
    // Product Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati-padat#product`,
      name: `${data.name} - ${data.subtitle}`,
      description: data.description,
      image: `${SITE_CONFIG.url}/mockup-flora-one-padat.png`,
      brand: {
        '@type': 'Brand',
        name: 'FLORAONE',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'PT Centra Biotech Indonesia',
      },
    },
    
    // Breadcrumb Schema
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
      { name: 'FloraOne', url: `/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati-padat` },
    ]),
    
    // FAQ Schema
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section */}
      <HeroSectionGeneral
        imgUrl="/products/floraone/floraone-poster.png"
        category="Pupuk Hayati"
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            {data.heroTitle}
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
                  src="/products/floraone-padat/floraone-padat-mockup.png"
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
                FLORAONE Pupuk Hayati Padat
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {data.heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#119f40] hover:bg-[#0d7a31] px-6 py-4 font-semibold text-white transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  {data.ctaWhatsapp}
                </Link>
                <Link
                  href={EXTERNAL_LINKS.shopee}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] px-6 py-4 font-semibold text-white transition-all"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {data.ctaShopee}
                </Link>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Keunggulan Produk Section */}
      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left: Header & Description */}
            <div className="space-y-6 md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {lang === 'id' 
                    ? 'Mengapa Petani & Pekebun Memilih FloraOne?'
                    : 'Why Farmers & Gardeners Choose FloraOne?'}
                </h2>
              </div>
              <p className="text-gray-600">
                {lang === 'id'
                  ? 'FloraOne mengandung konsorsium mikroba unggul yang bekerja sinergis untuk merangsang pertumbuhan akar, mempercepat perkecambahan biji, menyuburkan tanah, dan meningkatkan kualitas serta kuantitas produksi. Produk ini telah tersertifikasi organik dan memenuhi standar SNI 6729:2016.'
                  : 'FloraOne contains superior microbial consortium that works synergistically to stimulate root growth, accelerate seed germination, fertilize soil, and increase production quality and quantity. This product has been certified organic and meets SNI 6729:2016 standards.'}
              </p>
              
              {/* CTA Button - Download Demplot */}
              <Link
                href={EXTERNAL_LINKS.brochure}
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl w-fit"
              >
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Hasil Demplot' : 'Download Demplot Results'}
              </Link>
            </div>

            {/* Right: Keunggulan Cards Grid - 2x3 Layout */}
            <div className="grid grid-cols-1 gap-4 md:w-1/2 md:grid-cols-2">
              {data.benefits.map((benefit, idx) => (
                <div key={idx} className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                  <div className="mb-3 text-[#119f40]">
                    <BenefitIcon type={benefit.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.desc}
                  </p>
                </div>
              ))}
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
                ? 'FloraOne bersertifikat resmi dan memenuhi standar kualitas nasional'
                : 'FloraOne is officially certified and meets national quality standards'}
            </p>
          </div>

          {/* Certification Cards Grid - All Visible */}
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
              href="https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=P8E-9a3KhgPc2Eqnpx2ONGDJTRd5_4kK8sDa3Pq5Xr8,"
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
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    79.5%
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all">
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'id' ? 'Verifikasi Sertifikat' : 'Verify Certificate'}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Verify Certificate Button */}
          <div className="text-center">
            <Link
              href={EXTERNAL_LINKS.certificate}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              <ExternalLink className="h-5 w-5" />
              {lang === 'id' ? 'Verifikasi Sertifikat' : 'Verify Certificate'}
            </Link>
          </div>
        </ContainerSection>
      </section>

      {/* Video Gallery Section */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {data.videoSection.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {data.videoSection.subtitle}
            </p>
          </div>

          <VideoGallerySlider videos={floraoneVideos} />
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
