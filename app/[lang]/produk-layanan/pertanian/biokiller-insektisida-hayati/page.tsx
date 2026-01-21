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
  Bug,
  Target,
  Activity
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk BIOKILLER Insektisida Hayati. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in BIOKILLER Biological Insecticide. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "https://docs.centrabiotechindonesia.com/uploads/e_brochure_Bioo_Killer_575a4c27ca.pdf",
  certificate: "https://docs.centrabiotechindonesia.com/uploads/SK_BIOKILLER_e098a73513.pdf",
  testReportPadi: "https://docs.centrabiotechindonesia.com/uploads/LAP_Uji_Efektivitas_BIOKILLER_SL_Padi_Nilaparvata_2025_Jan_UNUD.pdf",
  testReportBawang: "https://docs.centrabiotechindonesia.com/uploads/Lap_Uji_Efektifitas_BIOKILLER_SL_Liriomyza_Bawang_Apr_2022.pdf",
  tkdn: "https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=P8E-9a3KhgPc2Eqnpx2ONGDJTRd5_4kK8sDa3Pq5Xr8,",
  inaproc: "https://katalog.inaproc.id/search?keyword=biokiller&page=1",
  shopee: "https://shopee.co.id/search?keyword=biokiller%20centra%20biotech",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_ID)}`,
};

// BIOKILLER Videos Data - Using real CBI YouTube videos
const biokillerVideos: Array<{
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
}> = [
  {
    id: "rRbK3D_gvS4",
    title: "DULU BEKAS PRODUKSI BATU BATA, KINI SUDAH BERPRODUKSI LAGI BERKAT CENTRA BIOTECH",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "_B3pONNfGEI",
    title: "TESTIMONI PAK PARJAN DARI INDRAMAYU - CENTRA BIOTECH",
    embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
    type: "youtube"
  },
  {
    id: "IkHUqxjLuIE",
    title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PADI HINGGA 60%",
    embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
    type: "youtube"
  },
  {
    id: "zGF2bYyClhk",
    title: "TESTIMONI PAK PARMAN DARI BATANG - CENTRA BIOTECH",
    embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
    type: "youtube"
  },
  {
    id: "7593292407202909461",
    title: "BIOKILLER di Lapangan #1",
    embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461",
    type: "tiktok"
  },
  {
    id: "7589298285819563285",
    title: "BIOKILLER di Lapangan #2",
    embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285",
    type: "tiktok"
  },
  {
    id: "7567321822954360085",
    title: "BIOKILLER di Lapangan #3",
    embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085",
    type: "tiktok"
  },
  {
    id: "7512399240962854161",
    title: "BIOKILLER di Lapangan #4",
    embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161",
    type: "tiktok"
  }
];

// Product data - bilingual
const productData = {
  id: {
    name: "BIOKILLER",
    subtitle: "Insektisida Hayati Premium",
    tagline: "Pengendalian Hama Alami Tanpa Resistensi",
    heroTitle: "Insektisida Hayati BIOKILLER - Basmi Wereng & Hama Tanpa Residu Kimia",
    heroSubtitle: "Insektisida hayati bersertifikat Kementan RI. Berbahan aktif jamur entomopatogen Beauveria bassiana & Metarhizium anisopliae. Terbukti efektif tanpa menyebabkan resurgensi.",
    description: "BIOKILLER adalah insektisida hayati (biological insecticide) premium berbentuk cair yang mengandung jamur entomopatogen Beauveria bassiana dan Metarhizium anisopliae. Sebagai insektisida hayati terbaik di Indonesia, BIOKILLER bekerja secara kontak menginfeksi dan mematikan hama sasaran tanpa meninggalkan residu kimia berbahaya. Terbukti efektif mengendalikan Wereng Coklat, Wereng Hijau, Uret, Kutu Daun, dan Ulat Grayak.",
    stats: [
      { value: "2×10⁶", label: "CFU/ml" },
      { value: "85%", label: "Mortalitas Hama" },
      { value: "0%", label: "Resistensi" },
      { value: "100%", label: "Organik" },
    ],
    benefits: [
      { title: "Tanpa Resistensi", desc: "Mekanisme biologis mencegah hama menjadi kebal", icon: "shield" },
      { title: "Tanpa Resurgensi", desc: "Tidak memicu ledakan populasi hama pasca aplikasi", icon: "trending" },
      { title: "Ramah Lingkungan", desc: "100% organik, aman untuk musuh alami dan ekosistem", icon: "leaf" },
      { title: "Tanpa Residu Kimia", desc: "Hasil panen bebas kontaminasi pestisida", icon: "sparkles" },
      { title: "Efek Sistemik", desc: "Menyebar antar hama melalui kontak dan sporulasi", icon: "zap" },
      { title: "Multi Target", desc: "Efektif untuk berbagai jenis hama penghisap dan penggerek", icon: "target" },
    ],
    dosage: {
      preventive: "1-3 ML / LITER AIR",
      curative: "3-5 ML / LITER AIR",
      interval: "Setiap 3-7 Hari",
    },
    faq: [
      { q: "Apa itu insektisida hayati BIOKILLER?", a: "Insektisida hayati BIOKILLER adalah pestisida biologis yang menggunakan jamur entomopatogen (Beauveria bassiana dan Metarhizium anisopliae) untuk mengendalikan hama. Berbeda dengan insektisida kimia, insektisida hayati bekerja secara alami tanpa meninggalkan residu berbahaya." },
      { q: "Bagaimana cara kerja insektisida hayati?", a: "Insektisida hayati BIOKILLER bekerja melalui mekanisme infeksi jamur. Spora menempel pada tubuh hama, menembus kutikula, berkembang di dalam, dan melepaskan toksin yang mematikan hama. Proses ini juga menyebar ke hama lain melalui sporulasi." },
      { q: "Apakah BIOKILLER aman untuk musuh alami hama?", a: "Ya, insektisida hayati BIOKILLER bersifat selektif dan aman untuk predator alami seperti laba-laba, kumbang predator, dan parasitoid. Ini membantu menjaga keseimbangan ekosistem." },
      { q: "Berapa lama efek BIOKILLER terlihat?", a: "Efek insektisida hayati mulai terlihat 3-7 hari setelah aplikasi. Hama akan menunjukkan perubahan perilaku dan mortalitas bertahap. Untuk hasil optimal, aplikasikan secara rutin." },
      { q: "Apakah hama bisa menjadi kebal terhadap BIOKILLER?", a: "Tidak. Berbeda dengan insektisida kimia, insektisida hayati menggunakan mekanisme biologis kompleks sehingga hama tidak dapat mengembangkan resistensi. Ini adalah keunggulan utama BIOKILLER." },
    ],
  },
  en: {
    name: "BIOKILLER",
    subtitle: "Premium Biological Insecticide",
    tagline: "Natural Pest Control Without Resistance",
    heroTitle: "BIOKILLER Biological Insecticide - Eliminate Planthoppers & Pests Without Chemical Residue",
    heroSubtitle: "Certified biological insecticide by Indonesian Ministry of Agriculture. Active ingredients: entomopathogenic fungi Beauveria bassiana & Metarhizium anisopliae. Proven effective without causing resurgence.",
    description: "BIOKILLER is a premium liquid biological insecticide containing entomopathogenic fungi Beauveria bassiana and Metarhizium anisopliae. As the best biological insecticide in Indonesia, BIOKILLER works through contact infection to kill target pests without leaving harmful chemical residues. Proven effective against Brown Planthopper, Green Leafhopper, White Grubs, Aphids, and Armyworms.",
    stats: [
      { value: "2×10⁶", label: "CFU/ml" },
      { value: "85%", label: "Pest Mortality" },
      { value: "0%", label: "Resistance" },
      { value: "100%", label: "Organic" },
    ],
    benefits: [
      { title: "No Resistance", desc: "Biological mechanism prevents pest immunity", icon: "shield" },
      { title: "No Resurgence", desc: "Does not trigger pest population explosion", icon: "trending" },
      { title: "Eco-Friendly", desc: "100% organic, safe for natural enemies", icon: "leaf" },
      { title: "No Chemical Residue", desc: "Harvest free from pesticide contamination", icon: "sparkles" },
      { title: "Systemic Effect", desc: "Spreads between pests through contact", icon: "zap" },
      { title: "Multi-Target", desc: "Effective for various sucking and boring pests", icon: "target" },
    ],
    dosage: {
      preventive: "1-3 ML / LITER WATER",
      curative: "3-5 ML / LITER WATER",
      interval: "Every 3-7 Days",
    },
    faq: [
      { q: "What is BIOKILLER biological insecticide?", a: "BIOKILLER is a biological pesticide that uses entomopathogenic fungi (Beauveria bassiana and Metarhizium anisopliae) to control pests. Unlike chemical insecticides, biological insecticides work naturally without leaving harmful residues." },
      { q: "How does biological insecticide work?", a: "BIOKILLER works through fungal infection mechanism. Spores attach to pest body, penetrate the cuticle, develop inside, and release toxins that kill the pest. This process also spreads to other pests through sporulation." },
      { q: "Is BIOKILLER safe for natural pest enemies?", a: "Yes, BIOKILLER is selective and safe for natural predators like spiders, predatory beetles, and parasitoids. This helps maintain ecosystem balance." },
      { q: "How long until BIOKILLER effects are visible?", a: "Effects of biological insecticide start showing 3-7 days after application. Pests will show behavioral changes and gradual mortality. For optimal results, apply regularly." },
      { q: "Can pests become resistant to BIOKILLER?", a: "No. Unlike chemical insecticides, biological insecticides use complex biological mechanisms so pests cannot develop resistance. This is BIOKILLER's main advantage." },
    ],
  },
};

// Generate metadata with enhanced SEO for "insektisida hayati"
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = productData[lang];

  const title = lang === 'id' 
    ? "Insektisida Hayati BIOKILLER - Basmi Wereng & Hama Tanpa Resistensi | Bersertifikat Kementan"
    : "BIOKILLER Biological Insecticide - Eliminate Planthoppers & Pests Without Resistance | Certified";
  
  const description = lang === 'id'
    ? "Insektisida hayati BIOKILLER mengandung Beauveria bassiana & Metarhizium anisopliae. Insektisida hayati terbaik untuk mengendalikan wereng coklat, kutu daun, ulat grayak tanpa resistensi. Bersertifikat Kementan RI & LeSOS Organik. Pesan sekarang!"
    : "BIOKILLER biological insecticide contains Beauveria bassiana & Metarhizium anisopliae. Best biological insecticide for controlling brown planthopper, aphids, armyworms without resistance. Certified by Ministry of Agriculture. Order now!";

  const keywords = lang === 'id'
    ? "jual insektisida hayati, insektisida hayati, insektisida hayati terbaik, biokiller, jual biokiller, bio pestisida, biopestisida, pestisida hayati, pestisida organik, insektisida organik, beauveria bassiana, metarhizium anisopliae, pengendali wereng coklat, pengendali hama padi, insektisida hayati untuk padi, insektisida hayati bersertifikat, pestisida biologis, pengendalian hama alami, insektisida ramah lingkungan, centra biotech, pertanian organik, jual bio pestisida"
    : "biological insecticide for sale, best biological insecticide, biokiller, buy biological insecticide, bio pesticide, biological pesticide, organic pesticide, organic insecticide, beauveria bassiana, metarhizium anisopliae, brown planthopper control, rice pest control, certified biological insecticide, natural pest control, eco-friendly insecticide, centra biotech, organic farming, buy bio pesticide";

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
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/products/biokiller/biokiller-cover.webp`,
        width: 1200,
        height: 630,
        alt: data.name + " - " + data.subtitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}/products/biokiller/biokiller-cover.webp`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/biokiller-insektisida-hayati`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/biokiller-insektisida-hayati`,
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
    case "shield": return <Shield className={iconClass} />;
    case "trending": return <TrendingUp className={iconClass} />;
    case "leaf": return <Leaf className={iconClass} />;
    case "sparkles": return <Sparkles className={iconClass} />;
    case "zap": return <Zap className={iconClass} />;
    case "target": return <Target className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

// Crop icons for dosage section
const CropIcon = ({ type }: { type: string }) => {
  const iconClass = "h-6 w-6";
  switch (type) {
    case "wheat": return <Wheat className={iconClass} />;
    case "bug": return <Bug className={iconClass} />;
    case "carrot": return <Carrot className={iconClass} />;
    case "sprout": return <Sprout className={iconClass} />;
    default: return <Leaf className={iconClass} />;
  }
};

// Main page component
export default async function BioKillerPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  
  // Fetch data from Strapi CMS
  const strapiData = await fetchStrapiProduct("biokiller-insektisida-hayati");
  
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
  const videos = transformVideos(strapiData?.videos, biokillerVideos);
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
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati#product`,
      "name": data.name,
      "alternateName": ["BIOKILLER", "Biokiller Insektisida Hayati", "Bio Killer", "Biological Insecticide"],
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
      "category": "Biological Insecticide",
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Active Ingredient 1", "value": "Beauveria bassiana 1.0 × 10⁶ cfu/ml" },
        { "@type": "PropertyValue", "name": "Active Ingredient 2", "value": "Metarhizium anisopliae 1.0 × 10⁶ cfu/ml" },
        { "@type": "PropertyValue", "name": "Total Concentration", "value": "2 × 10⁶ cfu/ml" },
        { "@type": "PropertyValue", "name": "Pest Mortality Rate", "value": "85%" },
        { "@type": "PropertyValue", "name": "Resistance Rate", "value": "0%" },
        { "@type": "PropertyValue", "name": "Certification", "value": "Kementerian Pertanian RI" },
        { "@type": "PropertyValue", "name": "Organic Certification", "value": "LeSOS 244-LSO-005-IDN-08-22" },
      ],
      "image": [
        `${SITE_CONFIG.url}/products/biokiller/biokiller-cover.webp`,
        `${SITE_CONFIG.url}/products/biokiller/biokiller-cover.webp`,
      ],
      "offers": {
        "@type": "Offer",
        "url": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati`,
        "priceCurrency": "IDR",
        "price": "75000",
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
          "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati#product`,
          "name": "FLORAONE Pupuk Hayati",
          "description": "Pupuk hayati cair untuk meningkatkan penyerapan nutrisi tanaman"
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
        { "@type": "ListItem", "position": 4, "name": "BIOKILLER", "item": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati` }
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
      "name": lang === 'id' ? "Cara Mengaplikasikan Insektisida Hayati BIOKILLER" : "How to Apply BIOKILLER Biological Insecticide",
      "description": lang === 'id' 
        ? "Panduan lengkap aplikasi insektisida hayati BIOKILLER untuk pengendalian wereng dan hama tanaman"
        : "Complete guide for applying BIOKILLER biological insecticide for planthopper and pest control",
      "step": [
        {
          "@type": "HowToStep",
          "name": lang === 'id' ? "Siapkan Larutan" : "Prepare Solution",
          "text": lang === 'id' 
            ? "Campurkan 1-3 ml BIOKILLER per liter air untuk pencegahan, atau 3-5 ml untuk pengendalian aktif"
            : "Mix 1-3 ml BIOKILLER per liter of water for prevention, or 3-5 ml for active control"
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
            ? "Semprotkan merata pada seluruh bagian tanaman terutama bagian bawah daun, lakukan pagi atau sore hari"
            : "Spray evenly on all plant parts especially leaf undersides, apply in morning or evening"
        },
        {
          "@type": "HowToStep",
          "name": lang === 'id' ? "Ulangi Secara Rutin" : "Repeat Regularly",
          "text": lang === 'id'
            ? "Aplikasikan setiap 3-7 hari untuk hasil optimal dan pengendalian berkelanjutan"
            : "Apply every 3-7 days for optimal results and continuous control"
        }
      ],
      "tool": [
        { "@type": "HowToTool", "name": lang === 'id' ? "Sprayer/Alat Semprot" : "Sprayer" },
        { "@type": "HowToTool", "name": lang === 'id' ? "Ember/Wadah" : "Bucket/Container" }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "BIOKILLER Insektisida Hayati" },
        { "@type": "HowToSupply", "name": lang === 'id' ? "Air Bersih" : "Clean Water" }
      ]
    },
    // GEO Schema 1: WebPage with SpeakableSpecification (Voice AI & AI Overviews)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati#webpage`,
      "url": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati`,
      "name": lang === 'id' 
        ? "BIOKILLER Insektisida Hayati Terbaik - Kendalikan Wereng & Hama Organik" 
        : "BIOKILLER Best Biological Insecticide - Control Planthoppers & Organic Pest",
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
        "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati#product`
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
        ? "Insektisida hayati dengan Beauveria bassiana & Metarhizium anisopliae untuk pengendalian wereng"
        : "Biological insecticide with Beauveria bassiana & Metarhizium anisopliae for planthopper control",
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
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati#product-rating`,
      "name": "BIOKILLER Insektisida Hayati",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "89",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Pak Hadi - Petani Padi Demak" },
          "datePublished": "2025-11-10",
          "reviewBody": lang === 'id'
            ? "BIOKILLER sangat efektif mengendalikan wereng coklat di sawah saya. Tidak ada resistensi seperti pestisida kimia!"
            : "BIOKILLER is very effective in controlling brown planthoppers in my rice field. No resistance like chemical pesticides!",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Bu Rina - Petani Bawang Brebes" },
          "datePublished": "2025-10-25",
          "reviewBody": lang === 'id'
            ? "Lalat pengorok daun di bawang saya berhasil dikendalikan dengan BIOKILLER. Produk organik yang benar-benar works!"
            : "Leafminer flies in my onions were successfully controlled with BIOKILLER. Organic product that really works!",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
    },
    // GEO Schema 3: ItemList for AI Answer Extraction
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": lang === 'id' ? "Keunggulan BIOKILLER Insektisida Hayati" : "BIOKILLER Biological Insecticide Benefits",
      "description": lang === 'id' 
        ? "Daftar keunggulan utama insektisida hayati BIOKILLER untuk pertanian"
        : "List of main benefits of BIOKILLER biological insecticide for agriculture",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": lang === 'id' ? "Mortalitas hama hingga 85%" : "Pest mortality up to 85%" },
        { "@type": "ListItem", "position": 2, "name": lang === 'id' ? "0% resistensi hama" : "0% pest resistance" },
        { "@type": "ListItem", "position": 3, "name": lang === 'id' ? "2 jenis jamur entomopatogen" : "2 types of entomopathogenic fungi" },
        { "@type": "ListItem", "position": 4, "name": lang === 'id' ? "Bersertifikat Kementan RI" : "Ministry of Agriculture RI Certified" },
        { "@type": "ListItem", "position": 5, "name": lang === 'id' ? "Aman untuk musuh alami" : "Safe for natural enemies" },
        { "@type": "ListItem", "position": 6, "name": lang === 'id' ? "100% organik tanpa residu" : "100% organic no residue" }
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
        "Bio-pesticides",
        "Biological Insecticides",
        "Agricultural Biotechnology",
        "Organic Pest Control"
      ]
    }
  ];

  return (
    <>
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section - Matching RajaBio */}
      <HeroSectionGeneral
        imgUrl="/products/biokiller/biokiller-cover.webp"
        category="Insektisida Hayati"
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            Tingkatkan Hasil Panen Anda dengan {data.name} - {data.subtitle}
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
                  src="/products/biokiller/biokiller-cover.webp"
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

      {/* Keunggulan Produk Section - Matching RajaBio Layout */}
      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left: Header & Description */}
            <div className="space-y-6 md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {lang === 'id' 
                    ? 'Mengapa Petani Memilih BIOKILLER?'
                    : 'Why Farmers Choose BIOKILLER?'}
                </h2>
              </div>
              <p className="text-gray-600">
                {lang === 'id'
                  ? 'BIOKILLER adalah insektisida hayati premium yang menggunakan jamur entomopatogen untuk mengendalikan hama secara alami. Terbukti efektif, aman, dan tidak menimbulkan resistensi.'
                  : 'BIOKILLER is a premium biological insecticide using entomopathogenic fungi to naturally control pests. Proven effective, safe, and does not cause resistance.'}
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
                ? 'BIOKILLER bersertifikat resmi dari Kementerian Pertanian RI, LeSOS, dan memenuhi standar SNI. Unduh dokumen lengkap untuk referensi Anda.'
                : 'BIOKILLER is officially certified by the Ministry of Agriculture RI, LeSOS, and meets SNI standards. Download complete documents for your reference.'}
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
              {lang === 'id' ? 'Lihat BIOKILLER Beraksi' : 'Watch BIOKILLER in Action'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Saksikan testimoni petani dan hasil nyata penggunaan BIOKILLER di lapangan'
                : 'Watch farmer testimonials and real results of BIOKILLER in the field'}
            </p>
          </div>

          <VideoGallerySlider videos={biokillerVideos} />
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
                  ? 'Temukan jawaban atas pertanyaan umum tentang BIOKILLER'
                  : 'Find answers to common questions about BIOKILLER'}
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
