import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { SITE_CONFIG } from "@/utils/seo";
import { 
  generateProductSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";
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
  Package,
  ExternalLink,
  ChevronRight,
  Sprout,
  Wheat,
  TreeDeciduous,
  Cherry,
  Carrot,
  MessageCircle,
  ShoppingCart,
  Download,
  TrendingUp,
  BadgeCheck,
  Zap,
  ArrowRight,
  Bug,
  Microscope
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk FLORA ONE Pupuk Hayati. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in FLORA ONE Biological Fertilizer. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "https://docs.centrabiotechindonesia.com/uploads/e_brochure_Flora_One_5c10673502.pdf",
  certificate: "https://docs.centrabiotechindonesia.com/uploads/SK_FLORAONE_CAIR_2021_1a03348484.pdf",
  testReportRice: "https://docs.centrabiotechindonesia.com/uploads/Lap_Uji_Efektifitas_FloraOne_Cair_Padi_Oct_2011.pdf",
  testReportSugarcane: "https://docs.centrabiotechindonesia.com/uploads/Lap_Uji_Efektifitas_FloraOne_Padat_Tebu_Feb_2020.pdf",
  inaproc: "https://katalog.inaproc.id/search?keyword=flora+one&page=1",
  shopee: "https://shopee.co.id/search?keyword=flora%20one%20centra%20biotech",
};

// Product data - bilingual
const productData = {
  id: {
    name: "FLORA ONE",
    subtitle: "Pupuk Hayati Cair & Padat",
    tagline: "Fungsi Ganda: Tingkatkan Panen & Kendalikan Penyakit",
    heroTitle: "Pupuk Hayati Terbaik - FLORA ONE Tingkatkan Panen Hingga 86%",
    heroSubtitle: "Pupuk hayati bersertifikat Kementan RI mengandung mikroba hidup. Fungsi ganda: meningkatkan produksi & mengendalikan penyakit tanaman. Tersedia cair & padat.",
    description: "FLORA ONE adalah pupuk hayati mengandung konsorsium mikroba hidup yang dirancang untuk memupuk tanah pertanian. Keunggulan fungsi ganda: melipatgandakan hasil produksi sekaligus mengendalikan penyakit tanaman yang sulit ditangani fungisida kimia. Dapat mengurangi penggunaan pupuk kimia (NPK/Urea) dan fungisida hingga 50%.",
    ctaWhatsapp: "Pesan Langsung via WhatsApp",
    ctaShopee: "Beli di Shopee",
    ctaCatalog: "Lihat di E-Katalog Pemerintah",
    ctaBrochure: "Unduh Brosur Produk",
    ctaCertificate: "Lihat Sertifikat Resmi",
    benefits: [
      { title: "Fungsi Ganda", desc: "Tingkatkan panen & kendalikan penyakit sekaligus", icon: "trending" },
      { title: "Mikroba Hidup", desc: "5 jenis mikroba menguntungkan dalam satu produk", icon: "microscope" },
      { title: "Kendalikan Penyakit", desc: "Efektif melawan Fusarium, Xanthomonas, Bulai dll", icon: "shield" },
      { title: "Ramah Lingkungan", desc: "Aman, tidak meninggalkan residu toksik", icon: "sprout" },
      { title: "Hemat 50%", desc: "Kurangi penggunaan pupuk & fungisida kimia", icon: "zap" },
      { title: "Tersedia Cair & Padat", desc: "Pilih sesuai kebutuhan aplikasi Anda", icon: "droplets" },
    ],
    microbes: [
      { name: "Pseudomonas fluorescens", function: "PGPR, Bakterisida & Fungisida Hayati", liquid: "2.65-4.55 x 10⁹ cfu/ml", solid: "4.55 x 10⁹ cfu/g" },
      { name: "Azospirillum sp.", function: "Pengikat N dari udara, Penghasil Fitohormon", liquid: "2.90 x 10⁷ - 1.00 x 10⁸ cfu/ml", solid: "1.00 x 10⁸ cfu/g" },
      { name: "Rhizobium sp.", function: "Pengikat N untuk Legum, Pembentuk Nodul Akar", liquid: "2.80-2.35 x 10⁷ cfu/ml", solid: "2.35 x 10⁷ cfu/g" },
      { name: "Trichoderma harzianum", function: "Raja Fungi - Fungisida Hayati Kuat", liquid: "5.00 x 10⁶ cfu/ml", solid: "5.00 x 10⁴ cfu/g" },
      { name: "Aspergillus niger", function: "Pelarut P & K dalam Tanah, Dekomposer", liquid: "5.00 x 10⁶ cfu/ml", solid: "1.00 x 10⁵ cfu/g" },
    ],
    diseases: [
      { crop: "Padi", disease: "Xanthomonas (Kresek)", icon: "wheat" },
      { crop: "Pisang & Melon", disease: "Fusarium oxysporum (Layu)", icon: "cherry" },
      { crop: "Kubis & Sawi", disease: "Plasmodiophora (Akar Gada)", icon: "carrot" },
      { crop: "Jagung", disease: "Bulai (Downy Mildew)", icon: "wheat" },
      { crop: "Cabai & Tomat", disease: "Layu & Keriting", icon: "cherry" },
    ],
    yieldIncrease: [
      { crop: "Padi", increase: "40-86%" },
      { crop: "Cabai", increase: "50-200%" },
      { crop: "Kubis", increase: "60-200%" },
      { crop: "Jagung", increase: "30-75%" },
      { crop: "Kentang", increase: "50-80%" },
      { crop: "Tebu", increase: "40%" },
    ],
    certifications: [
      { label: "Kementan (Cair)", value: "03.02.2021.540", icon: "gov" },
      { label: "Kementan (Padat)", value: "03.03.2021.546", icon: "gov" },
      { label: "Sertifikat Organik LeSOS", value: "240-LSO-005-IDN-04-18", icon: "organic" },
      { label: "Standar SNI", value: "6729:2016", icon: "sni" },
    ],
    pricing: {
      title: "Dapatkan FLORA ONE Sekarang",
      packages: [
        { name: "Flora One Cair (1 Liter)", price: "Rp 47.000" },
        { name: "Flora One Padat (250 gr)", price: "Rp 37.000" },
        { name: "Flora One Padat (50 gr)", price: "Rp 8.400" },
      ],
      note: "Harga E-Katalog, dapat berubah",
    },
    faq: [
      { q: "Apa itu pupuk hayati FLORA ONE?", a: "FLORA ONE adalah pupuk hayati mengandung 5 jenis mikroba hidup yang bermanfaat untuk memupuk tanah, meningkatkan hasil panen, dan mengendalikan penyakit tanaman secara alami." },
      { q: "Apa perbedaan FLORA ONE Cair dan Padat?", a: "Keduanya mengandung mikroba yang sama. Cair (1L) cocok untuk penyemprotan dan penyiraman. Padat (50gr/250gr) cocok untuk perlakuan benih dan pencampuran dengan tanah." },
      { q: "Penyakit apa saja yang bisa dikendalikan?", a: "FLORA ONE efektif mengendalikan Xanthomonas (Kresek padi), Fusarium (Layu), Plasmodiophora (Akar Gada), Bulai jagung, dan penyakit layu/keriting pada cabai-tomat." },
      { q: "Berapa dosis untuk 1 hektar?", a: "Untuk pengolahan lahan: 1-2 Liter/Ha. Untuk perawatan: 1-2 ml/liter air, aplikasi setiap 1-2 minggu." },
      { q: "Apakah tersedia untuk pengadaan pemerintah?", a: "Ya, FLORA ONE sudah terdaftar di E-Katalog Pemerintah (INAPROC) dan bersertifikat Kementan RI." },
    ],
  },
  en: {
    name: "FLORA ONE",
    subtitle: "Liquid & Solid Biological Fertilizer",
    tagline: "Dual Function: Increase Yield & Control Diseases",
    heroTitle: "Best Biological Fertilizer - FLORA ONE Increases Harvest Up to 86%",
    heroSubtitle: "Biological fertilizer certified by Ministry of Agriculture RI containing living microbes. Dual function: boost production & control plant diseases. Available in liquid & solid forms.",
    description: "FLORA ONE is a biological fertilizer containing a consortium of living microbes designed to fertilize agricultural soil. Unique dual function: multiply production yields while controlling plant diseases difficult to manage with chemical fungicides. Can reduce chemical fertilizer (NPK/Urea) and fungicide use by up to 50%.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaShopee: "Buy on Shopee",
    ctaCatalog: "View on Government E-Catalog",
    ctaBrochure: "Download Product Brochure",
    ctaCertificate: "View Official Certificate",
    benefits: [
      { title: "Dual Function", desc: "Increase yield & control diseases simultaneously", icon: "trending" },
      { title: "Living Microbes", desc: "5 types of beneficial microbes in one product", icon: "microscope" },
      { title: "Disease Control", desc: "Effective against Fusarium, Xanthomonas, Downy Mildew etc", icon: "shield" },
      { title: "Eco-Friendly", desc: "Safe, leaves no toxic residue", icon: "sprout" },
      { title: "Save 50%", desc: "Reduce chemical fertilizer & fungicide use", icon: "zap" },
      { title: "Liquid & Solid", desc: "Choose according to your application needs", icon: "droplets" },
    ],
    microbes: [
      { name: "Pseudomonas fluorescens", function: "PGPR, Biological Bactericide & Fungicide", liquid: "2.65-4.55 x 10⁹ cfu/ml", solid: "4.55 x 10⁹ cfu/g" },
      { name: "Azospirillum sp.", function: "Nitrogen Fixer, Phytohormone Producer", liquid: "2.90 x 10⁷ - 1.00 x 10⁸ cfu/ml", solid: "1.00 x 10⁸ cfu/g" },
      { name: "Rhizobium sp.", function: "N Fixer for Legumes, Root Nodule Formation", liquid: "2.80-2.35 x 10⁷ cfu/ml", solid: "2.35 x 10⁷ cfu/g" },
      { name: "Trichoderma harzianum", function: "King of Fungi - Strong Biological Fungicide", liquid: "5.00 x 10⁶ cfu/ml", solid: "5.00 x 10⁴ cfu/g" },
      { name: "Aspergillus niger", function: "P & K Solubilizer, Decomposer", liquid: "5.00 x 10⁶ cfu/ml", solid: "1.00 x 10⁵ cfu/g" },
    ],
    diseases: [
      { crop: "Rice", disease: "Xanthomonas (Bacterial Leaf Blight)", icon: "wheat" },
      { crop: "Banana & Melon", disease: "Fusarium oxysporum (Wilt)", icon: "cherry" },
      { crop: "Cabbage & Mustard", disease: "Plasmodiophora (Clubroot)", icon: "carrot" },
      { crop: "Corn", disease: "Downy Mildew", icon: "wheat" },
      { crop: "Chili & Tomato", disease: "Wilt & Curly Leaf", icon: "cherry" },
    ],
    yieldIncrease: [
      { crop: "Rice", increase: "40-86%" },
      { crop: "Chili", increase: "50-200%" },
      { crop: "Cabbage", increase: "60-200%" },
      { crop: "Corn", increase: "30-75%" },
      { crop: "Potato", increase: "50-80%" },
      { crop: "Sugarcane", increase: "40%" },
    ],
    certifications: [
      { label: "Min. Agriculture (Liquid)", value: "03.02.2021.540", icon: "gov" },
      { label: "Min. Agriculture (Solid)", value: "03.03.2021.546", icon: "gov" },
      { label: "LeSOS Organic Certificate", value: "240-LSO-005-IDN-04-18", icon: "organic" },
      { label: "SNI Standard", value: "6729:2016", icon: "sni" },
    ],
    pricing: {
      title: "Get FLORA ONE Now",
      packages: [
        { name: "Flora One Liquid (1 Liter)", price: "Rp 47,000" },
        { name: "Flora One Solid (250 gr)", price: "Rp 37,000" },
        { name: "Flora One Solid (50 gr)", price: "Rp 8,400" },
      ],
      note: "E-Catalog prices, subject to change",
    },
    faq: [
      { q: "What is FLORA ONE biological fertilizer?", a: "FLORA ONE is a biological fertilizer containing 5 types of living beneficial microbes to fertilize soil, increase harvest yields, and control plant diseases naturally." },
      { q: "What's the difference between Liquid and Solid?", a: "Both contain the same microbes. Liquid (1L) is suitable for spraying and watering. Solid (50gr/250gr) is suitable for seed treatment and soil mixing." },
      { q: "What diseases can it control?", a: "FLORA ONE effectively controls Xanthomonas (Rice Blight), Fusarium (Wilt), Plasmodiophora (Clubroot), Corn Downy Mildew, and wilt/curly diseases in chili-tomato." },
      { q: "What's the dosage for 1 hectare?", a: "Land preparation: 1-2 Liters/Ha. Maintenance: 1-2 ml/liter water, apply every 1-2 weeks." },
      { q: "Is it available for government procurement?", a: "Yes, FLORA ONE is registered in Government E-Catalog (INAPROC) and certified by Ministry of Agriculture RI." },
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
    ? "Pupuk Hayati FLORA ONE: Panen 86% & Basmi Penyakit"
    : "FLORA ONE Biofertilizer: 86% Yield & Disease Control";
  
  const description = lang === 'id'
    ? "Pupuk hayati terbaik untuk padi, jagung, tebu. 5 mikroba hidup tingkatkan panen 40-86%, basmi Fusarium, Xanthomonas, Bulai. Sertifikat Kementan & SNI. Pesan sekarang!"
    : "Best biological fertilizer for rice, corn, sugarcane. 5 live microbes boost yield 40-86%, eradicate Fusarium, Xanthomonas, Downy Mildew. Ministry certified. Order now!";

  const keywords = lang === 'id'
    ? "pupuk hayati, flora one, pupuk mikroba, biological fertilizer, pupuk hayati cair, pupuk hayati padat, pengendalian penyakit tanaman, trichoderma, pseudomonas, rhizobium, azospirillum, aspergillus niger, centra biotech, pupuk organik, fungisida hayati, bakterisida hayati, pupuk kementan, sni 6729"
    : "biological fertilizer, flora one, microbial fertilizer, liquid biofertilizer, solid biofertilizer, plant disease control, trichoderma, pseudomonas, rhizobium, azospirillum, aspergillus niger, centra biotech, organic fertilizer, biological fungicide, biological bactericide, ministry agriculture certified, sni 6729";

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
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/products/floraone/floraone-cover.webp`,
        width: 1200,
        height: 630,
        alt: data.name + " - " + data.subtitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}/products/floraone/floraone-cover.webp`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/floraone-pupuk-hayati`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/floraone-pupuk-hayati`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Benefit icon component
const BenefitIcon = ({ type }: { type: string }) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'trending': return <TrendingUp className={iconClass} />;
    case 'microscope': return <Microscope className={iconClass} />;
    case 'shield': return <Shield className={iconClass} />;
    case 'sprout': return <Sprout className={iconClass} />;
    case 'zap': return <Zap className={iconClass} />;
    case 'droplets': return <Droplets className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

// Crop icon component
const CropIcon = ({ type }: { type: string }) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'wheat': return <Wheat className={iconClass} />;
    case 'carrot': return <Carrot className={iconClass} />;
    case 'cherry': return <Cherry className={iconClass} />;
    default: return <Leaf className={iconClass} />;
  }
};

// PLACEHOLDER - Component will be completed section by section
export default async function FloraOneProductPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const data = productData[lang];
  const whatsappMessage = lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  // Generate structured data
  const schemas = [
    generateProductSchema({
      name: `${data.name} - ${data.subtitle}`,
      description: data.description,
      brand: "Centra Biotech Indonesia",
      url: `/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
      image: `/products/floraone/floraone-cover.webp`,
      sku: "FLORAONE-1L",
      category: lang === 'id' ? 'Pupuk Hayati' : 'Biological Fertilizer',
      offers: {
        price: 47000,
        priceCurrency: "IDR",
        availability: "InStock",
        priceValidUntil: "2026-12-31",
      },
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 89,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
      { name: 'FLORA ONE', url: `/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati` },
    ]),
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <>
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section */}
      <HeroSectionGeneral
        imgUrl="/products/floraone/floraone-cover.webp"
        title={
          <h1 className="text-center text-white">
            <span className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
              {data.name}
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-[#90EE90]">
              {data.subtitle}
            </span>
          </h1>
        }
      />

      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />

      {/* Product Overview Section */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-6">
                  <Image
                    src="/products/floraone/floraone-cover.webp"
                    alt={lang === 'id' 
                      ? `Pupuk Hayati FLORA ONE - Pupuk Mikroba Cair dan Padat Bersertifikat Kementan untuk Pertanian Organik` 
                      : `FLORA ONE Biological Fertilizer - Certified Liquid and Solid Microbial Fertilizer for Organic Farming`}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -left-4 bg-white text-[#006622] rounded-full p-3 shadow-xl border-2 border-[#006622]/20">
                  <Microscope className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#006622]/10 px-4 py-2 text-sm font-semibold text-[#006622] mb-4 w-fit">
                <BadgeCheck className="h-4 w-4" />
                <span>{lang === 'id' ? 'Terdaftar Resmi Kementan RI' : 'Officially Registered - Ministry of Agriculture'}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:text-3xl">
                {lang === 'id' 
                  ? 'Pupuk Hayati FLORA ONE: Solusi Modern Pertanian Berkelanjutan'
                  : 'FLORA ONE Biological Fertilizer: Modern Sustainable Agriculture Solution'}
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {data.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] px-6 py-4 font-semibold text-white transition-all shadow-sm hover:shadow-lg"
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

      {/* Unified Technical Evidence Section - Professional Design */}
      <section className="relative bg-[#EEE] py-20 overflow-hidden">
        <ContainerSection className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'BUKTI ILMIAH & TEKNIS' : 'SCIENTIFIC & TECHNICAL EVIDENCE'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' 
                ? 'Bukti Ilmiah Pupuk Hayati FLORA ONE'
                : 'Scientific Evidence of FLORA ONE Biofertilizer'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id'
                ? 'Data komposisi mikroba, pengendalian penyakit, dan peningkatan hasil panen dari uji laboratorium terakreditasi'
                : 'Microbial composition data, disease control, and yield increases from accredited laboratory tests'}
            </p>
          </div>

          {/* Two-Column Layout - Microbes + Results */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Microbe Composition Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-5">
                <FlaskConical className="h-5 w-5 text-[#006622]" />
                <h3 className="font-bold text-gray-900">
                  {lang === 'id' ? 'Komposisi Mikroba Aktif' : 'Active Microbial Composition'}
                </h3>
              </div>
              <div className="grid gap-3">
                {data.microbes.map((microbe, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="h-8 w-8 rounded-full bg-[#006622] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 italic truncate">{microbe.name}</p>
                      <p className="text-xs text-gray-500 truncate">{microbe.function}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-gray-400 uppercase">CFU</p>
                      <p className="font-mono text-xs text-[#006622] font-semibold">{microbe.liquid}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Results + Disease Control */}
            <div className="space-y-6">
              {/* Yield Results */}
              <div className="bg-gradient-to-br from-[#006622] to-[#004d1a] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <h3 className="font-bold">{lang === 'id' ? 'Peningkatan Hasil Panen' : 'Yield Increase'}</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {data.yieldIncrease.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold">{item.increase}</div>
                      <div className="text-xs opacity-80">{item.crop}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
                  {data.yieldIncrease.slice(3, 6).map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold">{item.increase}</div>
                      <div className="text-xs opacity-80">{item.crop}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {lang === 'id' ? 'Minta Laporan Uji Efektivitas Lengkap' : 'Request Full Effectiveness Test Report'}
                  </Link>
                </div>
              </div>

              {/* Disease Control */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold text-gray-900">{lang === 'id' ? 'Pengendalian Penyakit' : 'Disease Control'}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data.diseases.map((item, idx) => (
                    <div key={idx} className="text-center p-3 bg-red-50 rounded-xl border border-red-100">
                      <Bug className="h-5 w-5 text-red-500 mx-auto mb-2" />
                      <p className="font-semibold text-xs text-gray-900">{item.crop}</p>
                      <p className="text-[10px] text-gray-500">{item.disease}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Safety Data Row */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-10 w-10 text-[#006622] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    {lang === 'id' ? 'Jaminan Keamanan 100%' : '100% Safety Guarantee'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    ✓ E.coli: Negatif &nbsp;•&nbsp; ✓ Salmonella: Negatif &nbsp;•&nbsp; ✓ {lang === 'id' ? 'Patogenisitas: Negatif' : 'Pathogenicity: Negative'}
                  </p>
                </div>
              </div>
              <Link
                href={whatsappUrl}
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                {lang === 'id' ? 'Minta Laporan Lengkap' : 'Request Full Report'}
              </Link>
            </div>
          </div>

        </ContainerSection>
      </section>

      {/* Documents & Certifications Section - Exactly like RAJABIO */}
      <section className="bg-white py-20">
        <ContainerSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'DOKUMEN & SERTIFIKASI' : 'DOCUMENTS & CERTIFICATIONS'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' 
                ? 'Pupuk Hayati Bersertifikat Resmi Kementan RI & SNI 6729:2016'
                : 'Officially Certified Biological Fertilizer - Ministry of Agriculture & SNI 6729:2016'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id'
                ? 'FLORA ONE telah lolos uji ketat dan terdaftar resmi dengan sertifikat Kementerian Pertanian RI, standar SNI, dan sertifikat organik LeSOS'
                : 'FLORA ONE has passed rigorous testing and is officially registered with Ministry of Agriculture RI certificate, SNI standard, and LeSOS organic certificate'}
            </p>
          </div>

          {/* Certification Cards Grid - All Visible - 5 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {/* Kementerian Pertanian RI - Liquid */}
            <Link
              href={EXTERNAL_LINKS.certificate}
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo Kementerian Pertanian.png"
                    alt="Kementerian Pertanian RI"
                    width={128}
                    height={128}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Kementan RI (Cair)' : 'Min. Agriculture (Liquid)'}
                  </h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    03.02.2021.540
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all">
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'id' ? 'Lihat Sertifikat' : 'View Certificate'}
                  </span>
                </div>
              </div>
            </Link>

            {/* Kementerian Pertanian RI - Solid */}
            <Link
              href={EXTERNAL_LINKS.certificate}
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo Kementerian Pertanian.png"
                    alt="Kementerian Pertanian RI"
                    width={128}
                    height={128}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Kementan RI (Padat)' : 'Min. Agriculture (Solid)'}
                  </h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    03.03.2021.546
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all">
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'id' ? 'Lihat Sertifikat' : 'View Certificate'}
                  </span>
                </div>
              </div>
            </Link>

            {/* Sertifikat Organik LeSOS */}
            <Link
              href={EXTERNAL_LINKS.certificate}
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo-Organik-Indonesia-01.png"
                    alt="LeSOS Organic Certificate"
                    width={128}
                    height={128}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Sertifikat Organik LeSOS' : 'LeSOS Organic Certificate'}
                  </h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    240-LSO-005-IDN-04-18
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all">
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'id' ? 'Lihat Sertifikat' : 'View Certificate'}
                  </span>
                </div>
              </div>
            </Link>

            {/* Standar SNI */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/SNI Logo.svg"
                    alt="SNI Standard"
                    width={128}
                    height={128}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">
                    {lang === 'id' ? 'Standar SNI' : 'SNI Standard'}
                  </h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    6729:2016
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <BadgeCheck className="h-3 w-3" />
                    {lang === 'id' ? 'Tersertifikasi' : 'Certified'}
                  </span>
                </div>
              </div>
            </div>

            {/* TKDN Certificate - Same link as RAJABIO */}
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

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href={EXTERNAL_LINKS.brochure}
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Brosur Lengkap' : 'Download Complete Brochure'}
              </Link>
              <Link
                href={EXTERNAL_LINKS.certificate}
                target="_blank"
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <BadgeCheck className="h-5 w-5 text-[#006622]" />
                {lang === 'id' ? 'Lihat Sertifikat' : 'View Certificate'}
              </Link>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'KEUNGGULAN' : 'ADVANTAGES'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Mengapa Memilih FLORA ONE?' : 'Why Choose FLORA ONE?'}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#006622]/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#006622] to-[#009933] text-white mb-4 group-hover:scale-110 transition-transform">
                  <BenefitIcon type={benefit.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'FAQ' : 'FAQ'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' 
                ? 'Pertanyaan yang Sering Diajukan'
                : 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' ? 'Temukan jawaban lengkap tentang pupuk hayati terbaik untuk pertanian modern' : 'Find complete answers about the best biological fertilizer for modern agriculture'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
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

            <div className="mt-12 text-center bg-gradient-to-br from-[#006622]/5 to-[#009933]/5 rounded-2xl p-8 border border-[#006622]/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <MessageCircle className="h-8 w-8 text-[#006622]" />
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {lang === 'id' ? 'Masih ada pertanyaan?' : 'Still have questions?'}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'id' ? 'Tim ahli kami siap membantu Anda.' : 'Our expert team is ready to help you.'}
                  </p>
                </div>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  {lang === 'id' ? 'Tanya via WhatsApp' : 'Ask via WhatsApp'}
                </Link>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Enhanced CTA Section - Grey/White Theme */}
      <section className="bg-[#F5F5F5] py-16">
        <ContainerSection>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left: Compelling Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#006622]/10 text-[#006622] px-4 py-2 rounded-full text-sm font-bold">
                  <Sparkles className="h-4 w-4" />
                  {lang === 'id' ? 'FORMULA DUAL ACTION' : 'DUAL ACTION FORMULA'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                  {lang === 'id'
                    ? 'Satu Produk, Dua Manfaat Luar Biasa'
                    : 'One Product, Two Extraordinary Benefits'}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {lang === 'id'
                    ? 'FLORA ONE menghadirkan kombinasi sempurna antara nutrisi dan perlindungan alami. Pupuk hayati yang tidak hanya meningkatkan hasil panen hingga 86%, tetapi juga melindungi tanaman Anda dari penyakit dengan tingkat efektivitas 92%.'
                    : 'FLORA ONE presents the perfect combination of nutrients and natural protection. Biological fertilizer that not only increases harvest up to 86%, but also protects your plants from diseases with 92% effectiveness.'}
                </p>

                <div className="space-y-3 pt-4">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {lang === 'id' ? 'Konsultasi Gratis Sekarang' : 'Free Consultation Now'}
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#004d1a] hover:bg-[#006622] text-white font-semibold px-8 py-4 rounded-xl transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {lang === 'id' ? 'Dapatkan Penawaran Spesial' : 'Get Special Offer'}
                  </Link>
                </div>
              </div>

              {/* Right: Social Proof Stats */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#006622] flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900 mb-1">+86%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Peningkatan Hasil Padi' : 'Rice Yield Increase'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#006622] flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900 mb-1">+58%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Produktivitas Tebu' : 'Sugarcane Productivity'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#006622] flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900 mb-1">92%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Efektivitas Pengendalian Penyakit' : 'Disease Control Effectiveness'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-[#006622]" />
                  <span className="font-semibold">{lang === 'id' ? 'Terdaftar Kementan RI' : 'Registered Ministry of Agriculture'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#006622]" />
                  <span className="font-semibold">{lang === 'id' ? 'Sertifikat LeSOS' : 'LeSOS Certified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#006622]" />
                  <span className="font-semibold">{lang === 'id' ? 'Standar SNI' : 'SNI Standard'}</span>
                </div>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
}
