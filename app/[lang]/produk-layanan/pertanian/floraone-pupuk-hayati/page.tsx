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
  Beaker,
  Microscope,
  Bug
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
  tkdn: "https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=P8E-9a3KhgPc2Eqnpx2ONGDJTRd5_4kK8sDa3Pq5Xr8,",
  inaproc: "https://katalog.inaproc.id/search?keyword=flora+one&page=1",
  shopee: "https://shopee.co.id/search?keyword=flora%20one%20centra%20biotech",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_ID)}`,
};

// FLORAONE Videos Data
const floraoneVideos: Array<{
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
}> = [
  // YouTube Videos
  {
    id: "rRbK3D_gvS4",
    title: "DULU BEKAS PRODUKSI BATU BATA SEKARANG SAWAHNYA MENGHASILKAN PADI 86% LEBIH BANYAK",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "_B3pONNfGEI",
    title: "TESTIMONI PAK PARJAN TENTANG PUPUK HAYATI FLORAONE DAN SIMBIOS CENTRA BIOTECH INDONESIA",
    embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
    type: "youtube"
  },
  {
    id: "IkHUqxjLuIE",
    title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PERTANIAN",
    embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
    type: "youtube"
  },
  {
    id: "zGF2bYyClhk",
    title: "TESTIMONI PAK PARMAN DARI TUBAN JAWA TIMUR",
    embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
    type: "youtube"
  },
  // TikTok Videos
  {
    id: "tiktok-1",
    title: "Sawah Batu Bata Jadi Subur - RAJA BIO",
    embedUrl: "https://www.tiktok.com/embed/7473016610037577991",
    type: "tiktok"
  },
  {
    id: "tiktok-2",
    title: "Testimoni Pupuk Hayati Flora One",
    embedUrl: "https://www.tiktok.com/embed/7473021296413189383",
    type: "tiktok"
  },
  {
    id: "tiktok-3",
    title: "Tips Hemat Biaya Pertanian",
    embedUrl: "https://www.tiktok.com/embed/7473029212536893703",
    type: "tiktok"
  },
  {
    id: "tiktok-4",
    title: "Testimoni Petani Tuban",
    embedUrl: "https://www.tiktok.com/embed/7473025671688871175",
    type: "tiktok"
  },
];

// Product data - bilingual
const productData = {
  id: {
    name: "FLORA ONE",
    subtitle: "Pupuk Hayati Cair & Padat",
    tagline: "Fungsi Ganda: Tingkatkan Panen & Kendalikan Penyakit",
    heroTitle: "Pupuk Hayati Terbaik - FLORA ONE Tingkatkan Panen Hingga 86%",
    heroSubtitle: "Pupuk hayati bersertifikat Kementan RI mengandung mikroba hidup. Fungsi ganda: meningkatkan produksi & mengendalikan penyakit tanaman. Tersedia cair & padat.",
    description: "FLORA ONE adalah pupuk hayati mengandung konsorsium mikroba hidup yang dirancang untuk memupuk tanah pertanian. Keunggulan fungsi ganda: melipatgandakan hasil produksi sekaligus mengendalikan penyakit tanaman yang sulit ditangani fungisida kimia. Dapat mengurangi penggunaan pupuk kimia (NPK/Urea) dan fungisida hingga 50%.",
    stats: [
      { value: "86%", label: "Peningkatan Panen" },
      { value: "5", label: "Jenis Mikroba" },
      { value: "50%", label: "Hemat Pupuk Kimia" },
      { value: "100%", label: "Organik" },
    ],
    benefits: [
      { title: "Fungsi Ganda", desc: "Tingkatkan panen & kendalikan penyakit sekaligus", icon: "trending" },
      { title: "Mikroba Hidup", desc: "5 jenis mikroba menguntungkan dalam satu produk", icon: "microscope" },
      { title: "Kendalikan Penyakit", desc: "Efektif melawan Fusarium, Xanthomonas, Bulai dll", icon: "shield" },
      { title: "Ramah Lingkungan", desc: "Aman, tidak meninggalkan residu toksik", icon: "leaf" },
      { title: "Hemat 50%", desc: "Kurangi penggunaan pupuk & fungisida kimia", icon: "zap" },
      { title: "Tersedia Cair & Padat", desc: "Pilih sesuai kebutuhan aplikasi Anda", icon: "droplets" },
    ],
    dosage: {
      lahan: "1-2 LITER / HEKTAR",
      perawatan: "1-2 ML / LITER AIR",
      interval: "Setiap 1-2 Minggu",
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
    stats: [
      { value: "86%", label: "Yield Increase" },
      { value: "5", label: "Microbe Types" },
      { value: "50%", label: "Chemical Savings" },
      { value: "100%", label: "Organic" },
    ],
    benefits: [
      { title: "Dual Function", desc: "Increase yield & control diseases simultaneously", icon: "trending" },
      { title: "Living Microbes", desc: "5 types of beneficial microbes in one product", icon: "microscope" },
      { title: "Disease Control", desc: "Effective against Fusarium, Xanthomonas, Downy Mildew etc", icon: "shield" },
      { title: "Eco-Friendly", desc: "Safe, leaves no toxic residue", icon: "leaf" },
      { title: "Save 50%", desc: "Reduce chemical fertilizer & fungicide use", icon: "zap" },
      { title: "Liquid & Solid", desc: "Choose according to your application needs", icon: "droplets" },
    ],
    dosage: {
      lahan: "1-2 LITERS / HECTARE",
      perawatan: "1-2 ML / LITER WATER",
      interval: "Every 1-2 Weeks",
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

// Generate metadata with enhanced SEO for "pupuk hayati"
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = productData[lang];

  const title = lang === 'id' 
    ? "Pupuk Hayati Terbaik FLORA ONE - Tingkatkan Panen 86% & Kendalikan Penyakit | Bersertifikat Kementan"
    : "FLORA ONE Best Biological Fertilizer - Increase Yield 86% & Control Diseases | Certified";
  
  const description = lang === 'id'
    ? "Pupuk hayati FLORA ONE mengandung 5 jenis mikroba hidup. Fungsi ganda: tingkatkan panen hingga 86% & kendalikan penyakit tanaman. Bersertifikat Kementan RI & LeSOS Organik. Tersedia cair & padat. Pesan sekarang!"
    : "FLORA ONE biological fertilizer contains 5 types of living microbes. Dual function: increase yield up to 86% & control plant diseases. Certified by Ministry of Agriculture. Available liquid & solid. Order now!";

  const keywords = lang === 'id'
    ? "jual pupuk hayati cair, jual pupuk hayati padat, pupuk hayati, pupuk hayati terbaik, pupuk hayati terbaik indonesia, flora one, floraone, jual floraone, pupuk organik, pupuk mikroba, trichoderma, pseudomonas, pengendalian penyakit tanaman, pupuk hayati bersertifikat, pupuk ramah lingkungan, centra biotech, pertanian organik, pupuk cair, pupuk padat, pupuk hayati cair terbaik, pupuk hayati padat terbaik, distributor pupuk hayati"
    : "biological fertilizer for sale, liquid biological fertilizer, solid biological fertilizer, best biological fertilizer, best biofertilizer indonesia, flora one, floraone, buy floraone, organic fertilizer, microbial fertilizer, trichoderma, pseudomonas, plant disease control, certified biological fertilizer, eco-friendly fertilizer, centra biotech, organic farming, liquid fertilizer, solid fertilizer, biofertilizer distributor";

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

// Icon components for benefits
const BenefitIcon = ({ type }: { type: string }) => {
  const iconClass = "h-8 w-8 text-[#006622]";
  switch (type) {
    case "trending": return <TrendingUp className={iconClass} />;
    case "microscope": return <Microscope className={iconClass} />;
    case "shield": return <Shield className={iconClass} />;
    case "leaf": return <Leaf className={iconClass} />;
    case "zap": return <Zap className={iconClass} />;
    case "droplets": return <Droplets className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

// Main page component
export default async function FloraOnePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  
  // Fetch data from Strapi CMS (for text editability)
  const strapiData = await fetchStrapiProduct("floraone-pupuk-hayati");
  
  // Use static fallback data as base
  const staticData = productData[lang];
  
  // Merge Strapi data with static fallback (Strapi text takes precedence if available)
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
  
  // Videos from Strapi or fallback
  const videos = transformVideos(strapiData?.videos, floraoneVideos);
  
  // External links from Strapi or fallback
  const externalLinks = transformExternalLinks(strapiData?.externalLinks, EXTERNAL_LINKS);
  
  // WhatsApp URL
  const whatsappNumber = strapiData?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = strapiData?.whatsappMessage || (lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Enhanced AI SEO Structured Data - Matching RajaBio Pattern
  const schemas = [
    // Product Schema with Enhanced Entity Relationships
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati#product`,
      "name": data.name,
      "alternateName": ["FLORA ONE", "Flora One Pupuk Hayati", "FloraOne", "Biological Fertilizer"],
      "description": data.description,
      "brand": {
        "@type": "Brand",
        "name": "Centra Biotech Indonesia",
        "@id": `${SITE_CONFIG.url}/#brand`
      },
      "manufacturer": {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        "name": "PT. Centra Biotech Indonesia",
        "url": SITE_CONFIG.url,
        "logo": `${SITE_CONFIG.url}/images/logo/centra-biotech-logo.png`,
        "sameAs": [
          "https://www.facebook.com/centrabiotech",
          "https://www.instagram.com/centrabiotech",
          "https://www.youtube.com/@centrabiotech"
        ]
      },
      "category": "Biological Fertilizer",
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Microbe 1", "value": "Pseudomonas fluorescens - PGPR & Fungisida Hayati" },
        { "@type": "PropertyValue", "name": "Microbe 2", "value": "Azospirillum sp. - Pengikat Nitrogen" },
        { "@type": "PropertyValue", "name": "Microbe 3", "value": "Rhizobium sp. - Pengikat N untuk Legum" },
        { "@type": "PropertyValue", "name": "Microbe 4", "value": "Trichoderma harzianum - Fungisida Hayati" },
        { "@type": "PropertyValue", "name": "Microbe 5", "value": "Aspergillus niger - Pelarut P & K" },
        { "@type": "PropertyValue", "name": "Yield Increase", "value": "Up to 86%" },
        { "@type": "PropertyValue", "name": "Certification", "value": "Kementerian Pertanian RI" },
        { "@type": "PropertyValue", "name": "Organic Certification", "value": "LeSOS 240-LSO-005-IDN-04-18" },
      ],
      "image": [
        `${SITE_CONFIG.url}/products/floraone/floraone-cover.webp`,
        `${SITE_CONFIG.url}/products/floraone/floraone-bottle.webp`,
      ],
      "offers": {
        "@type": "Offer",
        "url": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
        "priceCurrency": "IDR",
        "price": "60000",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "PT. Centra Biotech Indonesia"
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "ID",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "IDR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "ID"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 7,
              "unitCode": "DAY"
            }
          }
        }
      },
      "isRelatedTo": [
        {
          "@type": "Product",
          "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati#product`,
          "name": "SIMBIOS Pupuk Hayati Premium",
          "description": "Pupuk hayati premium dengan 5 jenis mikroba menguntungkan untuk kesuburan tanah"
        },
        {
          "@type": "Product",
          "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#product`,
          "name": "RAJABIO Pupuk Organik",
          "description": "Pupuk organik granul dengan RAE 122% untuk pertumbuhan tanaman optimal"
        },
        {
          "@type": "Product",
          "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati#product`,
          "name": "BIOKILLER Insektisida Hayati",
          "description": "Insektisida hayati untuk pengendalian wereng dan hama tanaman"
        }
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": "Farmers, Agricultural Professionals, Organic Farming Practitioners"
      }
    },
    // Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": lang === 'id' ? "Beranda" : "Home", "item": `${SITE_CONFIG.url}/${lang}` },
        { "@type": "ListItem", "position": 2, "name": lang === 'id' ? "Produk & Layanan" : "Products & Services", "item": `${SITE_CONFIG.url}/${lang}/produk-layanan` },
        { "@type": "ListItem", "position": 3, "name": lang === 'id' ? "Pertanian" : "Agriculture", "item": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian` },
        { "@type": "ListItem", "position": 4, "name": "FLORA ONE", "item": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati` }
      ]
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    },
    // HowTo Schema for Application
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": lang === 'id' ? "Cara Mengaplikasikan Pupuk Hayati FLORA ONE" : "How to Apply FLORA ONE Biological Fertilizer",
      "description": lang === 'id' 
        ? "Panduan lengkap aplikasi pupuk hayati FLORA ONE untuk meningkatkan hasil panen dan mengendalikan penyakit tanaman"
        : "Complete guide for applying FLORA ONE biological fertilizer to increase yield and control plant diseases",
      "step": [
        {
          "@type": "HowToStep",
          "name": lang === 'id' ? "Siapkan Larutan" : "Prepare Solution",
          "text": lang === 'id' 
            ? "Campurkan 1-2 ml FLORA ONE per liter air untuk perawatan tanaman"
            : "Mix 1-2 ml FLORA ONE per liter of water for plant maintenance"
        },
        {
          "@type": "HowToStep",
          "name": lang === 'id' ? "Kocok Hingga Merata" : "Shake Well",
          "text": lang === 'id'
            ? "Kocok larutan hingga tercampur merata sebelum aplikasi"
            : "Shake the solution until evenly mixed before application"
        },
        {
          "@type": "HowToStep",
          "name": lang === 'id' ? "Aplikasikan pada Tanaman" : "Apply to Plants",
          "text": lang === 'id'
            ? "Siram atau semprotkan merata pada tanaman dan tanah di sekitar perakaran"
            : "Pour or spray evenly on plants and soil around the root area"
        },
        {
          "@type": "HowToStep",
          "name": lang === 'id' ? "Ulangi Secara Rutin" : "Repeat Regularly",
          "text": lang === 'id'
            ? "Aplikasikan setiap 1-2 minggu untuk hasil optimal"
            : "Apply every 1-2 weeks for optimal results"
        }
      ],
      "tool": [
        { "@type": "HowToTool", "name": lang === 'id' ? "Sprayer/Alat Semprot" : "Sprayer" },
        { "@type": "HowToTool", "name": lang === 'id' ? "Ember/Wadah" : "Bucket/Container" }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "FLORA ONE Pupuk Hayati" },
        { "@type": "HowToSupply", "name": lang === 'id' ? "Air Bersih" : "Clean Water" }
      ]
    },
    // GEO Schema 1: WebPage with SpeakableSpecification (Voice AI & AI Overviews)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati#webpage`,
      "url": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
      "name": lang === 'id' 
        ? "FLORA ONE Pupuk Hayati Terbaik - Tingkatkan Panen 86% & Kendalikan Penyakit" 
        : "FLORA ONE Best Biological Fertilizer - Increase Yield 86% & Control Diseases",
      "description": data.description,
      "inLanguage": lang === 'id' ? "id-ID" : "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        "name": "Centra Biotech Indonesia",
        "url": SITE_CONFIG.url
      },
      "about": {
        "@type": "Product",
        "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati#product`
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".hero-description", ".product-description"],
        "xpath": [
          "/html/head/title",
          "/html/head/meta[@name='description']/@content"
        ]
      },
      "specialty": lang === 'id' 
        ? "Pupuk hayati dengan 5 mikroba menguntungkan untuk meningkatkan panen dan mengendalikan penyakit"
        : "Biological fertilizer with 5 beneficial microbes to increase yield and control diseases",
      "lastReviewed": new Date().toISOString().split('T')[0],
      "reviewedBy": {
        "@type": "Organization",
        "name": "PT Centra Biotech Indonesia"
      }
    },
    // GEO Schema 2: AggregateRating (Social Proof for AI)
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati#product-rating`,
      "name": "FLORA ONE Pupuk Hayati",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "156",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Pak Parjan - Petani Padi Indramayu" },
          "datePublished": "2025-10-20",
          "reviewBody": lang === 'id'
            ? "FLORA ONE benar-benar luar biasa! Padi saya meningkat 86% dan bebas penyakit blas. Sangat direkomendasikan!"
            : "FLORA ONE is truly amazing! My rice yield increased 86% and free from blast disease. Highly recommended!",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Bu Siti - Petani Sayur Bandung" },
          "datePublished": "2025-09-15",
          "reviewBody": lang === 'id'
            ? "Sayuran saya lebih sehat dan tahan penyakit sejak pakai FLORA ONE. Hasilnya konsisten bagus!"
            : "My vegetables are healthier and disease-resistant since using FLORA ONE. Results are consistently great!",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
    },
    // GEO Schema 3: ItemList for AI Answer Extraction
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": lang === 'id' ? "Keunggulan FLORA ONE Pupuk Hayati" : "FLORA ONE Biological Fertilizer Benefits",
      "description": lang === 'id' 
        ? "Daftar keunggulan utama pupuk hayati FLORA ONE untuk pertanian"
        : "List of main benefits of FLORA ONE biological fertilizer for agriculture",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": lang === 'id' ? "Tingkatkan panen hingga 86%" : "Increase yield up to 86%" },
        { "@type": "ListItem", "position": 2, "name": lang === 'id' ? "5 jenis mikroba menguntungkan" : "5 types of beneficial microbes" },
        { "@type": "ListItem", "position": 3, "name": lang === 'id' ? "Kendalikan penyakit tanaman" : "Control plant diseases" },
        { "@type": "ListItem", "position": 4, "name": lang === 'id' ? "Bersertifikat Kementan RI" : "Ministry of Agriculture RI Certified" },
        { "@type": "ListItem", "position": 5, "name": lang === 'id' ? "Ramah lingkungan 100% organik" : "Eco-friendly 100% organic" },
        { "@type": "ListItem", "position": 6, "name": lang === 'id' ? "Tersedia cair dan padat" : "Available liquid and solid" }
      ]
    },
    // GEO Schema 4: Organization (Brand Authority for AI Trust)
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      "name": "PT Centra Biotech Indonesia",
      "alternateName": ["Centra Biotech", "CBI", "Centra Biotech Indonesia"],
      "url": SITE_CONFIG.url,
      "logo": `${SITE_CONFIG.url}/images/logo/centra-biotech-logo.png`,
      "description": lang === 'id'
        ? "Produsen pupuk hayati dan insektisida hayati terkemuka di Indonesia sejak 2011"
        : "Leading biological fertilizer and bio-pesticide manufacturer in Indonesia since 2011",
      "foundingDate": "2011",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sawahan RT 02 RW 07 Pasungan, Ceper",
        "addressLocality": "Klaten",
        "addressRegion": "Jawa Tengah",
        "postalCode": "57465",
        "addressCountry": "ID"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-812-3500-3655",
        "contactType": "sales",
        "availableLanguage": ["Indonesian", "English"]
      },
      "sameAs": [
        "https://www.facebook.com/centrabiotech",
        "https://www.instagram.com/centrabiotech",
        "https://www.youtube.com/@centrabiotech",
        "https://shopee.co.id/centrabiotech"
      ],
      "knowsAbout": [
        "Biological Fertilizers",
        "Organic Fertilizers", 
        "Bio-pesticides",
        "Agricultural Biotechnology",
        "Contract Manufacturing"
      ]
    }
  ];

  return (
    <>
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section - Matching RajaBio */}
      <HeroSectionGeneral
        imgUrl="/products/floraone/floraone-cover.webp"
        category="Pupuk Hayati"
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            {lang === 'id' 
              ? `Tingkatkan Hasil Panen Anda dengan ${data.name} - ${data.subtitle}`
              : `Boost Your Harvest with ${data.name} - ${data.subtitle}`}
          </h1>
        }
      />

      {/* Breadcrumb */}
      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dictionary} />

      {/* Product Overview Section - Matching RajaBio Layout */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            {/* Left: Product Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/products/floraone/floraone-cover.webp"
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
                  href={EXTERNAL_LINKS.whatsapp}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#119f40] hover:bg-[#0d7a31] px-6 py-4 font-semibold text-white transition-all shadow-sm hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  {lang === 'id' ? 'Pesan via WhatsApp' : 'Order via WhatsApp'}
                </Link>
                <Link
                  href={EXTERNAL_LINKS.brochure}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl border-2 border-[#006622] text-[#006622] hover:bg-[#006622] hover:text-white px-6 py-4 font-semibold transition-all"
                >
                  <Download className="h-5 w-5" />
                  {lang === 'id' ? 'Unduh Brosur' : 'Download Brochure'}
                </Link>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Benefits/Keunggulan Section - 2x3 Grid Matching RajaBio */}
      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left: Header & Description */}
            <div className="space-y-6 md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {lang === 'id' 
                    ? 'Mengapa Petani Memilih FLORA ONE?'
                    : 'Why Farmers Choose FLORA ONE?'}
                </h2>
              </div>
              <p className="text-gray-600">
                {lang === 'id'
                  ? 'FLORA ONE adalah pupuk hayati premium dengan fungsi ganda: meningkatkan kesuburan tanah dan mengendalikan penyakit tanaman secara alami. Terbukti efektif dan aman untuk pertanian organik.'
                  : 'FLORA ONE is a premium biological fertilizer with dual function: improving soil fertility and controlling plant diseases naturally. Proven effective and safe for organic farming.'}
              </p>
              
              {/* CTA Button */}
              <Link
                href={EXTERNAL_LINKS.brochure}
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-fit"
              >
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Hasil Uji Lab' : 'Download Lab Test Results'}
              </Link>
            </div>

            {/* Right: Keunggulan Cards Grid - 2x3 Layout */}
            <div className="grid grid-cols-1 gap-4 md:w-1/2 md:grid-cols-2">
              {data.benefits.map((benefit, idx) => (
                <div key={idx} className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                  <BenefitIcon type={benefit.icon} />
                  <h3 className="text-lg font-bold text-gray-900 mb-2 mt-3">
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

      {/* Documents & Certifications Section - Matching RajaBio Layout */}
      <section className="bg-[#EEE] py-20">
        <ContainerSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Dokumen Resmi & Sertifikasi' : 'Official Documents & Certifications'}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {lang === 'id' 
                ? 'FLORA ONE bersertifikat resmi dari Kementerian Pertanian RI, LeSOS, dan memenuhi standar SNI. Unduh dokumen lengkap untuk referensi Anda.'
                : 'FLORA ONE is officially certified by the Ministry of Agriculture RI, LeSOS, and meets SNI standards. Download complete documents for your reference.'}
            </p>
          </div>

          {/* Certification Cards Grid - 5 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {/* Kementerian Pertanian RI */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/Logo Kementerian Pertanian.png" alt="Kementerian Pertanian RI" width={128} height={128} className="object-contain transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Kementerian Pertanian RI' : 'Ministry of Agriculture RI'}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Tersertifikasi' : 'Certified'}</span>
                </div>
              </div>
            </div>

            {/* Sertifikat Organik LeSOS */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/Logo-Organik-Indonesia-01.png" alt="LeSOS Organic Certificate" width={128} height={128} className="object-contain transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Sertifikat Organik LeSOS' : 'LeSOS Organic Certificate'}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Tersertifikasi' : 'Certified'}</span>
                </div>
              </div>
            </div>

            {/* Standar SNI */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/SNI Logo.svg" alt="SNI Standard" width={128} height={128} className="object-contain transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Standar SNI' : 'SNI Standard'}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Tersertifikasi' : 'Certified'}</span>
                </div>
              </div>
            </div>

            {/* KAN Accreditation */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/KAN Logo.webp" alt="KAN Accreditation" width={128} height={128} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Akreditasi KAN' : 'KAN Accreditation'}</h3>
                  <p className="text-xs text-gray-600 mb-3">{lang === 'id' ? 'Komite Akreditasi Nasional' : 'National Accreditation Committee'}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500"><BadgeCheck className="h-3 w-3" />{lang === 'id' ? 'Terakreditasi' : 'Accredited'}</span>
                </div>
              </div>
            </div>

            {/* TKDN Certificate */}
            <Link href={EXTERNAL_LINKS.tkdn} target="_blank" className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <Image src="/Certificate Logos/TKDN Logo.png" alt="TKDN Certificate" width={128} height={128} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{lang === 'id' ? 'Sertifikat TKDN' : 'TKDN Certificate'}</h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">79.5%</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#006622] font-semibold group-hover:gap-2 transition-all"><ExternalLink className="h-3 w-3" />{lang === 'id' ? 'Verifikasi Sertifikat' : 'Verify Certificate'}</span>
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
              {lang === 'id' ? 'Lihat FLORA ONE Beraksi' : 'Watch FLORA ONE in Action'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Saksikan testimoni petani dan hasil nyata penggunaan FLORA ONE di lapangan'
                : 'Watch farmer testimonials and real results of FLORA ONE in the field'}
            </p>
          </div>

          <VideoGallerySlider videos={floraoneVideos} />
        </ContainerSection>
      </section>

      {/* FAQ Section - Enhanced with Animated Accordions */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                {lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600">
                {lang === 'id' 
                  ? 'Temukan jawaban atas pertanyaan umum tentang FLORA ONE'
                  : 'Find answers to common questions about FLORA ONE'}
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
                  href={EXTERNAL_LINKS.whatsapp}
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
