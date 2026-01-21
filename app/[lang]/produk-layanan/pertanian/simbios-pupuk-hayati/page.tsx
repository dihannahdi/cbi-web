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
  Microscope
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk SIMBIOS Pupuk Hayati Premium. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in SIMBIOS Premium Biological Fertilizer. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "https://docs.centrabiotechindonesia.com/uploads/e_brochure_Simbios_27e5cdd04c.pdf",
  certificate: "https://docs.centrabiotechindonesia.com/uploads/SK_SIMBIOS_2023.pdf",
  testReport: "https://docs.centrabiotechindonesia.com/uploads/Lap_Uji_Efektifitas_Simbios_Padi_Nov_2022.pdf",
  tkdn: "https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=P8E-9a3KhgPc2Eqnpx2ONGDJTRd5_4kK8sDa3Pq5Xr8,",
  inaproc: "https://katalog.inaproc.id/search?keyword=simbios&page=1",
  shopee: "https://shopee.co.id/search?keyword=simbios%20centra%20biotech",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_ID)}`,
};

// SIMBIOS Videos Data
const simbiosVideos: Array<{
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
    name: "SIMBIOS",
    subtitle: "Pupuk Hayati Premium",
    tagline: "Premium Quality - Teknologi Optimal untuk Mikroba Aktif",
    heroTitle: "Pupuk Hayati Premium SIMBIOS: Efektivitas 122% RAE & Teknologi Bio-Aktivasi",
    heroSubtitle: "Pupuk hayati premium bersertifikat Kementan RI dengan teknologi bio-aktivasi. Mikroba bekerja 70% lebih optimal. Terbukti tingkatkan hasil padi hingga 122% RAE.",
    description: "SIMBIOS adalah pupuk hayati premium dalam bentuk cair yang diformulasikan dengan teknologi khusus untuk memastikan mikroba bekerja 70% lebih optimal dibandingkan pupuk hayati standar. Dilengkapi dengan Bioactivator untuk mengaktifkan mikroba sebelum aplikasi, SIMBIOS memiliki fungsi ganda sebagai pemupuk dan pengendali penyakit tanaman.",
    ctaWhatsapp: "Pesan Langsung via WhatsApp",
    ctaShopee: "Beli di Shopee",
    ctaCatalog: "Lihat di E-Katalog Pemerintah",
    ctaBrochure: "Unduh Brosur Produk",
    ctaCertificate: "Lihat Sertifikat Resmi",
    ctaReadArticle: "Baca Laporan Uji Efektivitas",
    stats: [
      { value: "122%", label: "RAE" },
      { value: "70%", label: "Lebih Optimal" },
      { value: "5", label: "Jenis Mikroba" },
      { value: "100%", label: "Organik" },
    ],
    certifications: [
      { label: "Kementerian Pertanian RI", value: "03.02.2023.328", icon: "gov" },
      { label: "Sertifikat Organik LeSOS", value: "442-LSO-005-IDN-08-22", icon: "organic" },
      { label: "Standar SNI", value: "SNI 6729:2016", icon: "sni" },
    ],
    benefits: [
      { title: "Premium Quality", desc: "Teknologi khusus mikroba bekerja 70% lebih optimal", icon: "trending" },
      { title: "Bio-Aktivasi", desc: "Dilengkapi Bioactivator untuk hasil maksimal", icon: "beaker" },
      { title: "RAE 122%", desc: "Efektivitas agronomi relatif terbukti sangat efektif", icon: "sparkles" },
      { title: "Aman 100%", desc: "Bebas E.coli, Salmonella, logam berat berbahaya", icon: "shield" },
      { title: "Hemat 50%", desc: "Kurangi penggunaan pupuk kimia NPK/Urea", icon: "zap" },
      { title: "Percepat Panen", desc: "Mempercepat pertumbuhan dan waktu panen", icon: "clock" },
    ],
    dosage: {
      title: "Panduan Aplikasi",
      subtitle: "Dosis yang tepat untuk hasil maksimal",
      standard: "1-2 ML / LITER AIR",
      standardNote: "Setelah bio-aktivasi 24-48 jam",
      interval: "Setiap 1-2 Minggu",
      stages: [
        { stage: "Bio-Aktivasi", method: "Campurkan Bioactivator, diamkan 24-48 jam", dose: "Sesuai petunjuk", timing: "Sebelum aplikasi" },
        { stage: "Perlakuan Benih", method: "Rendam benih dalam larutan", dose: "15 ml/liter", timing: "8-12 jam" },
        { stage: "Pengolahan Lahan", method: "Semprotkan merata pada tanah", dose: "1-2 L/Ha", timing: "Sebelum tanam" },
        { stage: "Perawatan", method: "Semprot daun dan siram akar", dose: "1-2 ml/liter", timing: "Rutin 1-2 minggu" },
      ],
      crops: [
        { crop: "Padi Sawah", dose: "2 L/Ha", interval: "Setiap 2 minggu", notes: "RAE 122% terbukti", icon: "wheat", color: "amber" },
        { crop: "Sayuran & Hortikultura", dose: "1-2 ml/liter", interval: "1-2x/minggu", notes: "Sepanjang masa tanam", icon: "carrot", color: "orange" },
        { crop: "Perkebunan", dose: "1-2 ml/liter", interval: "1x/bulan", notes: "Siram area perakaran", icon: "tree", color: "green" },
        { crop: "Tanaman Muda", dose: "1-2 ml/liter", interval: "1-2 bulan", notes: "Masa pertumbuhan", icon: "sprout", color: "lime" },
      ],
    },
    pricing: {
      title: "Dapatkan SIMBIOS Sekarang",
      package: "Kemasan 1 Liter",
      price: "Rp 60.000",
      originalPrice: "Rp 75.000",
      discount: "20% OFF",
      note: "Harga sudah termasuk PPN",
      freeShipping: "Gratis ongkir untuk pembelian 6 liter+",
      guarantee: "Garansi uang kembali 30 hari",
    },
    testimonialSection: {
      title: "Dipercaya Petani Indonesia",
      subtitle: "Lihat bagaimana SIMBIOS mengubah hasil panen petani",
    },
    faq: [
      { q: "Apa itu pupuk hayati premium SIMBIOS?", a: "SIMBIOS adalah pupuk hayati premium dalam bentuk cair yang mengandung 5 jenis mikroba hidup dengan teknologi bio-aktivasi. Mikroba bekerja 70% lebih optimal dibandingkan pupuk hayati standar, dengan RAE (Relative Agronomic Effectiveness) mencapai 122%." },
      { q: "Apa perbedaan SIMBIOS dengan pupuk hayati biasa?", a: "SIMBIOS menggunakan teknologi premium yang memastikan mikroba 70% lebih aktif. Dilengkapi Bioactivator yang perlu dicampurkan dan didiamkan 24-48 jam sebelum aplikasi untuk mengaktifkan mikroba secara maksimal." },
      { q: "Berapa dosis SIMBIOS untuk 1 hektar?", a: "Untuk pengolahan lahan: 1-2 Liter/Ha dengan konsentrasi 1-2 ml/liter air. Untuk perawatan: 1-2 ml/liter air, aplikasi setiap 1-2 minggu. Berdasarkan uji lapangan, 2 L/Ha dengan konsentrasi 4 ml/L air memberikan hasil optimal." },
      { q: "Apakah SIMBIOS aman untuk pertanian organik?", a: "Ya, SIMBIOS 100% aman dan bersertifikat organik LeSOS (442-LSO-005-IDN-08-22), memenuhi standar SNI 6729:2016. Bebas E.coli, Salmonella, dan logam berat berbahaya (Arsenic 0.00 ppm, Mercury 0.00 ppm, Cadmium 0.00 ppm)." },
      { q: "Dimana bisa beli pupuk hayati SIMBIOS?", a: "SIMBIOS tersedia di E-Katalog Pemerintah (INA PROC) dengan harga Rp 60.000/liter dan marketplace Shopee. Anda juga bisa pesan langsung via WhatsApp untuk konsultasi gratis dan pengiriman ke seluruh Indonesia." },
    ],
    videoSection: {
      title: "Lihat SIMBIOS Beraksi",
      subtitle: "Video testimoni dan cara aplikasi",
    },
  },
  en: {
    name: "SIMBIOS",
    subtitle: "Premium Biological Fertilizer",
    tagline: "Premium Quality - Optimal Technology for Active Microbes",
    heroTitle: "SIMBIOS Premium Biofertilizer: 122% RAE Effectiveness & Bio-Activation Technology",
    heroSubtitle: "Premium biological fertilizer certified by Ministry of Agriculture RI with bio-activation technology. Microbes work 70% more optimally. Proven to increase rice yield up to 122% RAE.",
    description: "SIMBIOS is a premium liquid biological fertilizer formulated with special technology to ensure microbes work 70% more optimally than standard biological fertilizers. Equipped with Bioactivator to activate microbes before application, SIMBIOS has dual function as fertilizer and plant disease controller.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaShopee: "Buy on Shopee",
    ctaCatalog: "View on Government E-Catalog",
    ctaBrochure: "Download Product Brochure",
    ctaCertificate: "View Official Certificate",
    ctaReadArticle: "Read Effectiveness Test Report",
    stats: [
      { value: "122%", label: "RAE" },
      { value: "70%", label: "More Optimal" },
      { value: "5", label: "Microbe Types" },
      { value: "100%", label: "Organic" },
    ],
    certifications: [
      { label: "Ministry of Agriculture RI", value: "03.02.2023.328", icon: "gov" },
      { label: "LeSOS Organic Certificate", value: "442-LSO-005-IDN-08-22", icon: "organic" },
      { label: "SNI Standard", value: "SNI 6729:2016", icon: "sni" },
    ],
    benefits: [
      { title: "Premium Quality", desc: "Special technology - microbes work 70% more optimally", icon: "trending" },
      { title: "Bio-Activation", desc: "Equipped with Bioactivator for maximum results", icon: "beaker" },
      { title: "122% RAE", desc: "Relative Agronomic Effectiveness proven highly effective", icon: "sparkles" },
      { title: "100% Safe", desc: "Free from E.coli, Salmonella, harmful heavy metals", icon: "shield" },
      { title: "Save 50%", desc: "Reduce chemical NPK/Urea fertilizer usage", icon: "zap" },
      { title: "Faster Harvest", desc: "Accelerate growth and harvest time", icon: "clock" },
    ],
    dosage: {
      title: "Application Guide",
      subtitle: "Right dosage for maximum results",
      standard: "1-2 ML / LITER WATER",
      standardNote: "After 24-48 hours bio-activation",
      interval: "Every 1-2 Weeks",
      stages: [
        { stage: "Bio-Activation", method: "Mix Bioactivator, let sit 24-48 hours", dose: "As directed", timing: "Before application" },
        { stage: "Seed Treatment", method: "Soak seeds in solution", dose: "15 ml/liter", timing: "8-12 hours" },
        { stage: "Land Preparation", method: "Spray evenly on soil", dose: "1-2 L/Ha", timing: "Before planting" },
        { stage: "Maintenance", method: "Spray leaves and pour on roots", dose: "1-2 ml/liter", timing: "Regular 1-2 weeks" },
      ],
      crops: [
        { crop: "Rice Paddy", dose: "2 L/Ha", interval: "Every 2 weeks", notes: "122% RAE proven", icon: "wheat", color: "amber" },
        { crop: "Vegetables & Horticulture", dose: "1-2 ml/liter", interval: "1-2x/week", notes: "Throughout growing season", icon: "carrot", color: "orange" },
        { crop: "Plantation", dose: "1-2 ml/liter", interval: "Once/month", notes: "Pour on root area", icon: "tree", color: "green" },
        { crop: "Young Plants", dose: "1-2 ml/liter", interval: "1-2 months", notes: "Growth phase", icon: "sprout", color: "lime" },
      ],
    },
    pricing: {
      title: "Get SIMBIOS Now",
      package: "1 Liter Package",
      price: "Rp 60,000",
      originalPrice: "Rp 75,000",
      discount: "20% OFF",
      note: "Price includes VAT",
      freeShipping: "Free shipping for 6+ liters",
      guarantee: "30-day money back guarantee",
    },
    testimonialSection: {
      title: "Trusted by Indonesian Farmers",
      subtitle: "See how SIMBIOS transforms farmer harvests",
    },
    faq: [
      { q: "What is SIMBIOS premium biological fertilizer?", a: "SIMBIOS is a premium liquid biological fertilizer containing 5 types of living microbes with bio-activation technology. Microbes work 70% more optimally than standard biofertilizers, with RAE (Relative Agronomic Effectiveness) reaching 122%." },
      { q: "What's the difference between SIMBIOS and regular biofertilizer?", a: "SIMBIOS uses premium technology ensuring microbes are 70% more active. Equipped with Bioactivator that needs to be mixed and left for 24-48 hours before application to maximize microbial activation." },
      { q: "What's the SIMBIOS dosage for 1 hectare?", a: "For land preparation: 1-2 Liters/Ha with 1-2 ml/liter water concentration. For maintenance: 1-2 ml/liter water, apply every 1-2 weeks. Based on field tests, 2 L/Ha with 4 ml/L water concentration gives optimal results." },
      { q: "Is SIMBIOS safe for organic farming?", a: "Yes, SIMBIOS is 100% safe and LeSOS organic certified (442-LSO-005-IDN-08-22), meets SNI 6729:2016 standards. Free from E.coli, Salmonella, and harmful heavy metals (Arsenic 0.00 ppm, Mercury 0.00 ppm, Cadmium 0.00 ppm)." },
      { q: "Where can I buy SIMBIOS biological fertilizer?", a: "SIMBIOS is available on Government E-Catalog (INA PROC) at Rp 60,000/liter and Shopee marketplace. You can also order directly via WhatsApp for free consultation and delivery throughout Indonesia." },
    ],
    videoSection: {
      title: "See SIMBIOS in Action",
      subtitle: "Testimonial and application videos",
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
    ? "Pupuk Hayati Premium SIMBIOS - RAE 122% Bio-Aktivasi | Bersertifikat Kementan"
    : "SIMBIOS Premium Biofertilizer - 122% RAE Bio-Activation | Ministry Certified";
  
  const description = lang === 'id'
    ? "Pupuk hayati premium SIMBIOS dengan teknologi bio-aktivasi. Mikroba 70% lebih optimal, RAE 122% terbukti pada padi. Bersertifikat Kementan RI, SNI, LeSOS Organik. Tersedia di E-Katalog & Shopee. Pesan sekarang!"
    : "SIMBIOS premium biofertilizer with bio-activation technology. 70% more optimal microbes, 122% RAE proven on rice. Ministry certified, SNI, LeSOS Organic. Available on E-Catalog & Shopee. Order now!";

  const keywords = lang === 'id'
    ? "jual pupuk hayati cair, pupuk hayati premium, simbios, jual simbios, pupuk hayati, pupuk hayati terbaik, pupuk hayati premium terbaik, biological fertilizer, pupuk mikroba, bio aktivasi, rae 122, trichoderma, pseudomonas, rhizobium, azospirillum, aspergillus niger, centra biotech, pupuk organik bersertifikat, pupuk kementan, sni 6729, pupuk padi, pupuk hayati cair, e-katalog pupuk, jual pupuk hayati premium, distributor pupuk hayati cair"
    : "liquid biological fertilizer for sale, premium biological fertilizer, simbios, buy simbios, biofertilizer, best biofertilizer, best premium biofertilizer, microbial fertilizer, bio activation, rae 122, trichoderma, pseudomonas, rhizobium, azospirillum, aspergillus niger, centra biotech, certified organic fertilizer, ministry certified, sni 6729, rice fertilizer, liquid biofertilizer, biofertilizer distributor";

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
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/products/simbios/simbios-cover.webp`,
        width: 1200,
        height: 630,
        alt: data.name + " - " + data.subtitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}/products/simbios/simbios-cover.webp`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/simbios-pupuk-hayati`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/simbios-pupuk-hayati`,
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
    case 'beaker': return <Beaker className={iconClass} />;
    case 'sparkles': return <Sparkles className={iconClass} />;
    case 'shield': return <Shield className={iconClass} />;
    case 'zap': return <Zap className={iconClass} />;
    case 'clock': return <Clock className={iconClass} />;
    case 'leaf': return <Leaf className={iconClass} />;
    case 'sprout': return <Sprout className={iconClass} />;
    case 'droplets': return <Droplets className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

// Crop icon component
const CropIcon = ({ type }: { type: string }) => {
  const iconClass = "w-8 h-8";
  switch (type) {
    case 'wheat': return <Wheat className={iconClass} />;
    case 'carrot': return <Carrot className={iconClass} />;
    case 'tree': return <TreeDeciduous className={iconClass} />;
    case 'sprout': return <Sprout className={iconClass} />;
    case 'cherry': return <Cherry className={iconClass} />;
    default: return <Leaf className={iconClass} />;
  }
};

export default async function SimbiosProductPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Fetch data from Strapi CMS
  const strapiData = await fetchStrapiProduct("simbios-pupuk-hayati");
  
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
  const videos = transformVideos(strapiData?.videos, simbiosVideos);
  const externalLinks = transformExternalLinks(strapiData?.externalLinks, EXTERNAL_LINKS);
  
  // WhatsApp URL
  const whatsappNumber = strapiData?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = strapiData?.whatsappMessage || (lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Generate comprehensive structured data for maximum SEO + AI Search Engines
  const schemas = [
    // 1. Enhanced Product Schema with AI Entity Relationships
    {
      '@context': 'https://schema.org',
      '@type': ['Product', 'Thing'],
      '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati#product`,
      name: `${data.name} - ${data.subtitle}`,
      alternateName: lang === 'id' 
        ? ['SIMBIOS Premium', 'Pupuk Hayati SIMBIOS', 'SIMBIOS Bio-Aktivasi']
        : ['SIMBIOS Premium', 'SIMBIOS Biofertilizer', 'SIMBIOS Bio-Activation'],
      description: data.description,
      image: `${SITE_CONFIG.url}/products/simbios/simbios-cover.webp`,
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
      sku: 'SIMBIOS-1L',
      mpn: 'SIMBIOS-PREMIUM-2024',
      manufacturer: {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}#organization`,
        name: 'PT Centra Biotech Indonesia',
        url: SITE_CONFIG.url,
        telephone: '+62-812-3500-3655',
        email: 'centrabioindo@gmail.com',
      },
      brand: {
        '@type': 'Brand',
        name: 'SIMBIOS',
        logo: `${SITE_CONFIG.url}/products/simbios/simbios-cover.webp`,
      },
      category: lang === 'id' 
        ? ['Produk Pertanian', 'Pupuk', 'Pupuk Hayati', 'Pupuk Hayati Premium']
        : ['Agricultural Products', 'Fertilizers', 'Biological Fertilizers', 'Premium Biofertilizers'],
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'RAE (Relative Agronomic Effectiveness)', value: '122', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Microbe Optimization', value: '70', unitText: 'percent' },
        { '@type': 'PropertyValue', name: 'Microbe Types', value: '5', unitText: 'types' },
      ],
      offers: {
        '@type': 'Offer',
        url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
        availability: 'https://schema.org/InStock',
        price: '60000',
        priceCurrency: 'IDR',
        priceValidUntil: '2026-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: 'PT Centra Biotech Indonesia' },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'ID',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility'
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'IDR'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'ID'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 3,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 7,
              unitCode: 'DAY'
            }
          }
        }
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '156', bestRating: '5' },
      isRelatedTo: [
        { '@type': 'Product', name: 'RAJABIO Pupuk Organik Cair', url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik` },
        { '@type': 'Product', name: 'FLORAONE Pupuk Hayati', url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati` },
        { '@type': 'Product', name: 'BIO KILLER Insektisida Hayati', url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati` },
      ],
    },
    // 2. Breadcrumb Schema
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
      { name: 'SIMBIOS', url: `/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati` },
    ]),
    // 3. FAQ Schema
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
    // 4. HowTo Schema
    generateHowToSchema({
      name: lang === 'id' ? "Cara Menggunakan Pupuk Hayati Premium SIMBIOS" : "How to Use SIMBIOS Premium Biofertilizer",
      description: lang === 'id' 
        ? "Panduan lengkap aplikasi pupuk hayati premium SIMBIOS dengan teknologi bio-aktivasi untuk hasil maksimal."
        : "Complete guide for applying SIMBIOS premium biofertilizer with bio-activation technology for maximum results.",
      image: "/products/simbios/simbios-cover.webp",
      totalTime: "PT30M",
      estimatedCost: { value: 60000, currency: "IDR" },
      steps: [
        { name: lang === 'id' ? "Bio-Aktivasi" : "Bio-Activation", text: lang === 'id' ? "Campurkan Bioactivator dengan SIMBIOS, diamkan 24-48 jam pada suhu ruang untuk mengaktifkan mikroba." : "Mix Bioactivator with SIMBIOS, let sit 24-48 hours at room temperature to activate microbes." },
        { name: lang === 'id' ? "Persiapan Larutan" : "Prepare Solution", text: lang === 'id' ? "Campurkan 1-2 ml SIMBIOS yang sudah diaktivasi dengan 1 liter air bersih." : "Mix 1-2 ml of activated SIMBIOS with 1 liter of clean water." },
        { name: lang === 'id' ? "Aplikasi" : "Application", text: lang === 'id' ? "Semprotkan atau siramkan pada tanaman setiap 1-2 minggu." : "Spray or pour on plants every 1-2 weeks." },
      ],
    }),
    // GEO Schema 5: WebPage with SpeakableSpecification (Voice AI & AI Overviews)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati#webpage`,
      "url": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
      "name": lang === 'id' 
        ? "SIMBIOS Pupuk Hayati Premium - Pupuk Hayati Cair Terbaik dengan Bio-Aktivasi" 
        : "SIMBIOS Premium Biofertilizer - Best Liquid Biofertilizer with Bio-Activation",
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
        "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati#product`
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
        ? "Pupuk hayati premium dengan teknologi bio-aktivasi mengandung 5 mikroba benefisial aktif"
        : "Premium biofertilizer with bio-activation technology containing 5 active beneficial microbes",
      "lastReviewed": new Date().toISOString().split('T')[0],
      "reviewedBy": {
        "@type": "Organization",
        "name": "PT Centra Biotech Indonesia"
      }
    },
    // GEO Schema 6: AggregateRating with Reviews (Social Proof for AI)
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati#product-rating`,
      "name": "SIMBIOS Pupuk Hayati Premium",
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
          "author": { "@type": "Person", "name": "Pak Darmawan - Petani Hortikultura Batu" },
          "datePublished": "2025-11-18",
          "reviewBody": lang === 'id'
            ? "SIMBIOS dengan bio-aktivasinya membuat tanaman tomat saya lebih kuat dan berbuah lebat! Teknologi yang luar biasa."
            : "SIMBIOS with its bio-activation makes my tomato plants stronger and fruitful! Amazing technology.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Bu Endah - Petani Buah Malang" },
          "datePublished": "2025-10-30",
          "reviewBody": lang === 'id'
            ? "Mikroba aktif dalam SIMBIOS benar-benar membantu tanaman stroberi saya tahan penyakit. Sangat recommended!"
            : "Active microbes in SIMBIOS really help my strawberry plants resist diseases. Highly recommended!",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
    },
    // GEO Schema 7: ItemList for AI Answer Extraction
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": lang === 'id' ? "Keunggulan SIMBIOS Pupuk Hayati Premium" : "SIMBIOS Premium Biofertilizer Benefits",
      "description": lang === 'id' 
        ? "Daftar keunggulan utama pupuk hayati premium SIMBIOS dengan teknologi bio-aktivasi"
        : "List of main benefits of SIMBIOS premium biofertilizer with bio-activation technology",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": lang === 'id' ? "5 mikroba benefisial aktif" : "5 active beneficial microbes" },
        { "@type": "ListItem", "position": 2, "name": lang === 'id' ? "Teknologi bio-aktivasi unik" : "Unique bio-activation technology" },
        { "@type": "ListItem", "position": 3, "name": lang === 'id' ? "Meningkatkan serapan hara 40%" : "Increases nutrient absorption 40%" },
        { "@type": "ListItem", "position": 4, "name": lang === 'id' ? "Bersertifikat Kementan RI" : "Ministry of Agriculture RI Certified" },
        { "@type": "ListItem", "position": 5, "name": lang === 'id' ? "Kompatibel dengan produk CBI lainnya" : "Compatible with other CBI products" },
        { "@type": "ListItem", "position": 6, "name": lang === 'id' ? "100% organik dan ramah lingkungan" : "100% organic and eco-friendly" }
      ]
    },
    // GEO Schema 8: Organization (Brand Authority for AI Trust)
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      "name": "PT Centra Biotech Indonesia",
      "alternateName": ["Centra Biotech", "CBI", "Centra Biotech Indonesia"],
      "url": SITE_CONFIG.url,
      "logo": `${SITE_CONFIG.url}/images/logo/centra-biotech-logo.png`,
      "description": lang === 'id'
        ? "Produsen pupuk hayati dan pupuk organik terkemuka di Indonesia dengan teknologi bio-aktivasi sejak 2011"
        : "Leading biofertilizer and organic fertilizer manufacturer in Indonesia with bio-activation technology since 2011",
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
        "Biofertilizers",
        "Organic Fertilizers",
        "Agricultural Biotechnology",
        "Bio-activation Technology"
      ]
    }
  ];

  return (
    <>
      {/* Structured Data for SEO + AI Search */}
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section - Matching RajaBio Layout */}
      <HeroSectionGeneral
        imgUrl="/products/simbios/simbios-cover.webp"
        category="Pupuk Hayati Premium"
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
                  src="/products/simbios/simbios-cover.webp"
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

      {/* Keunggulan Produk Section - Matching RajaBio Layout */}
      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left: Header & Description */}
            <div className="space-y-6 md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {lang === 'id' 
                    ? 'Mengapa Petani Memilih SIMBIOS?'
                    : 'Why Farmers Choose SIMBIOS?'}
                </h2>
              </div>
              <p className="text-gray-600">
                {data.description}
              </p>
              
              {/* CTA Button - Download Demplot */}
              <Link
                href={EXTERNAL_LINKS.testReport}
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-fit"
              >
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Hasil Uji Efektivitas' : 'Download Effectiveness Test Results'}
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
                ? 'SIMBIOS bersertifikat resmi dari Kementerian Pertanian RI, LeSOS, dan memenuhi standar SNI. Unduh dokumen lengkap untuk referensi Anda.'
                : 'SIMBIOS is officially certified by the Ministry of Agriculture RI, LeSOS, and meets SNI standards. Download complete documents for your reference.'}
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
              {lang === 'id' ? 'Lihat SIMBIOS Beraksi' : 'Watch SIMBIOS in Action'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Saksikan testimoni petani dan hasil nyata penggunaan SIMBIOS di lapangan'
                : 'Watch farmer testimonials and real results of SIMBIOS in the field'}
            </p>
          </div>

          <VideoGallerySlider videos={simbiosVideos} />
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
                  ? 'Temukan jawaban atas pertanyaan umum tentang SIMBIOS'
                  : 'Find answers to common questions about SIMBIOS'}
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