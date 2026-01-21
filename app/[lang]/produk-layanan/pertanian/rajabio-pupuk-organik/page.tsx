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
  Youtube
} from "lucide-react";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Constants
const WHATSAPP_NUMBER = "6281235003655";
const WHATSAPP_MESSAGE_ID = "Halo, saya tertarik dengan produk RAJABIO Pupuk Organik Cair. Mohon informasi lebih lanjut.";
const WHATSAPP_MESSAGE_EN = "Hello, I'm interested in RAJABIO Liquid Organic Fertilizer. Please provide more information.";

const EXTERNAL_LINKS = {
  brochure: "https://docs.centrabiotechindonesia.com/uploads/e_brochure_Rajabio_0a91d17adf.pdf",
  certificate: "https://docs.centrabiotechindonesia.com/uploads/SK_RAJABIO_9ec75a4ec2.pdf",
  inaproc: "https://katalog.inaproc.id/search?keyword=rajabio&page=1",
  shopee: "https://shopee.co.id/Rajabio-Pupuk-Cair-Organik-Nutrisi-Lengkap-i.1083634538.23485056818",
  newsArticle: "/news/rajabio-revolusi-organik-untuk-padi-sawah-indonesia-janjikan-panen-berlimpah-dan-lahan-lestari",
  youtubeVideo: "https://www.youtube.com/shorts/A5twMwN51Kw",
  youtubeEmbed: "https://www.youtube.com/embed/A5twMwN51Kw",
};

// RAJABIO Videos Data
const rajabiVideos: Array<{
  id: string;
  title: string;
  embedUrl: string;
  type: 'youtube' | 'tiktok';
}> = [
  {
    id: "qFHAOivPp1A",
    title: "Video Testimoni Pupuk Organik RAJABIO",
    embedUrl: "https://www.youtube.com/embed/qFHAOivPp1A",
    type: "youtube"
  },
  {
    id: "rRbK3D_gvS4",
    title: "DULU BEKAS PRODUKSI BATU BATA, KINI SUDAH BERPRODUKSI LAGI BERKAT RAJABIO",
    embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
    type: "youtube"
  },
  {
    id: "_B3pONNfGEI",
    title: "TESTIMONI PAK PARJAN DARI INDRAMAYU - RAJABIO",
    embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
    type: "youtube"
  },
  {
    id: "IkHUqxjLuIE",
    title: "CARA EFEKTIF MENEKAN BIAYA PRODUKSI PADI HINGGA 60% DENGAN RAJABIO",
    embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
    type: "youtube"
  },
  {
    id: "zGF2bYyClhk",
    title: "TESTIMONI PAK PARMAN DARI BATANG - RAJABIO",
    embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
    type: "youtube"
  },
  {
    id: "7593292407202909461",
    title: "RAJABIO di Lapangan #1",
    embedUrl: "https://www.tiktok.com/embed/v2/7593292407202909461",
    type: "tiktok"
  },
  {
    id: "7589298285819563285",
    title: "RAJABIO di Lapangan #2",
    embedUrl: "https://www.tiktok.com/embed/v2/7589298285819563285",
    type: "tiktok"
  },
  {
    id: "7567321822954360085",
    title: "RAJABIO di Lapangan #3",
    embedUrl: "https://www.tiktok.com/embed/v2/7567321822954360085",
    type: "tiktok"
  },
  {
    id: "7512399240962854161",
    title: "RAJABIO di Lapangan #4",
    embedUrl: "https://www.tiktok.com/embed/v2/7512399240962854161",
    type: "tiktok"
  }
];

// Product data - bilingual
const productData = {
  id: {
    name: "RAJABIO",
    subtitle: "Pupuk Organik Cair",
    tagline: "Revolusi Organik untuk Pertanian Indonesia",
    heroTitle: "Pupuk Organik Cair Terbaik - RAJABIO Tingkatkan Panen Hingga 40%",
    heroSubtitle: "POC (Pupuk Organik Cair) bersertifikat Kementan RI. Dipercaya petani di 19+ provinsi Indonesia. Terdaftar resmi di E-Katalog Pemerintah.",
    description: "RAJABIO adalah pupuk organik cair (POC) premium yang diformulasikan dari bahan alami pilihan menggunakan teknologi fermentasi modern. Sebagai salah satu pupuk organik cair terbaik di Indonesia, RAJABIO mengandung C-Organik tinggi (>10%) yang efektif memupuk tanah sekaligus meningkatkan ketahanan tanaman terhadap hama dan penyakit. POC RAJABIO telah terbukti meningkatkan hasil panen hingga 40%.",
    ctaWhatsapp: "Pesan Langsung via WhatsApp",
    ctaShopee: "Beli di Shopee",
    ctaCatalog: "Lihat di E-Katalog Pemerintah",
    ctaBrochure: "Unduh Brosur Produk",
    ctaCertificate: "Lihat Sertifikat Resmi",
    ctaReadArticle: "Baca Kisah Sukses Petani",
    stats: [
      { value: "19+", label: "Provinsi" },
      { value: "10.05%", label: "C-Organik" },
      { value: "40%", label: "Peningkatan Panen" },
      { value: "100%", label: "Organik" },
    ],
    certifications: [
      { label: "Kementerian Pertanian RI", value: "02.02.2023.883", icon: "gov" },
      { label: "Sertifikat Organik LeSOS", value: "442-LSO-005-IDN-08-22", icon: "organic" },
      { label: "Standar SNI", value: "SNI 6729:2016", icon: "sni" },
    ],
    benefits: [
      { title: "Tingkatkan Hasil Panen", desc: "Terbukti meningkatkan produktivitas panen hingga 40%", icon: "trending" },
      { title: "Suburkan Tanah", desc: "C-Organik >10% memperbaiki struktur dan kesuburan tanah", icon: "leaf" },
      { title: "Tahan Hama & Penyakit", desc: "Meningkatkan imunitas alami tanaman", icon: "shield" },
      { title: "Ramah Lingkungan", desc: "100% organik, aman untuk ekosistem", icon: "sprout" },
      { title: "Hemat Biaya", desc: "Mengurangi kebutuhan pupuk kimia hingga 50%", icon: "zap" },
      { title: "Mudah Diaplikasi", desc: "Cukup 5ml/liter, semprot atau siram", icon: "droplets" },
    ],
    composition: {
      title: "Komposisi & Kandungan Nutrisi",
      subtitle: "Hasil Uji Laboratorium Terakreditasi",
      mainNutrients: [
        { name: "C-Organik", value: "10.05%", highlight: true },
        { name: "pH", value: "8.02", highlight: false },
        { name: "Nitrogen (N)", value: "2.56%", highlight: false },
        { name: "N-Organik", value: "0.57%", highlight: false },
        { name: "Fosfat (P₂O₅)", value: "< 0.0074%", highlight: false },
        { name: "Kalium (K₂O)", value: "< 0.0017%", highlight: false },
      ],
      microNutrients: [
        { name: "Mangan (Mn)", value: "49.11 mg/kg" },
        { name: "Besi (Fe)", value: "649 mg/kg" },
        { name: "Boron (B)", value: "13.5 ppm" },
        { name: "Molibdenum (Mo)", value: "2.9 ppm" },
      ],
      safety: [
        { name: "E. coli", value: "< 3.0 MPN/gr", status: "Aman" },
        { name: "Salmonella sp", value: "Negatif", status: "Aman" },
      ],
    },
    dosage: {
      title: "Panduan Aplikasi",
      subtitle: "Dosis yang tepat untuk hasil maksimal",
      standard: "5 ML / LITER AIR",
      standardNote: "8 tutup kemasan per tangki",
      interval: "Setiap 1-2 Minggu",
      stages: [
        { stage: "Pengolahan Lahan", method: "Semprot atau siram merata pada lahan", dose: "5 ml/liter", timing: "Sebelum tanam" },
        { stage: "Saat Tanam", method: "Aplikasikan pada lubang tanam", dose: "5 ml/liter", timing: "Hari pertama" },
        { stage: "Perawatan", method: "Semprot daun dan siram akar", dose: "5 ml/liter", timing: "Rutin 1-2 minggu" },
      ],
      crops: [
        { crop: "Padi Sawah", dose: "5 ml/liter", interval: "Setiap 2 minggu", notes: "Hingga usia 60 hari", icon: "wheat", color: "amber" },
        { crop: "Sayuran & Hortikultura", dose: "5 ml/liter", interval: "1-2x/minggu", notes: "Sepanjang masa tanam", icon: "carrot", color: "orange" },
        { crop: "Perkebunan Produktif", dose: "5 ml/liter", interval: "1x/bulan", notes: "Siram area perakaran", icon: "tree", color: "green" },
        { crop: "Tanaman Muda", dose: "5 ml/liter", interval: "1-2 bulan", notes: "Masa pertumbuhan vegetatif", icon: "sprout", color: "lime" },
        { crop: "Singkong & Tebu", dose: "5 ml/liter", interval: "1-2 bulan", notes: "Hingga usia 6 bulan", icon: "cherry", color: "rose" },
      ],
    },
    pricing: {
      title: "Dapatkan RAJABIO Sekarang",
      package: "Kemasan 1 Liter",
      price: "Rp 62.000",
      originalPrice: "Rp 75.000",
      discount: "17% OFF",
      note: "Harga sudah termasuk PPN",
      freeShipping: "Gratis ongkir untuk pembelian 6 liter+",
      guarantee: "Garansi uang kembali 30 hari",
    },
    testimonialSection: {
      title: "Dipercaya Petani Indonesia",
      subtitle: "Lihat bagaimana RAJABIO mengubah hasil panen petani",
    },
    faq: [
      { q: "Apa itu pupuk organik cair (POC) RAJABIO?", a: "POC atau Pupuk Organik Cair RAJABIO adalah pupuk organik berbentuk cair yang dibuat dari fermentasi bahan organik pilihan. Berbeda dengan pupuk padat, pupuk organik cair lebih mudah diserap tanaman dan efektif meningkatkan kesuburan tanah dengan kandungan C-Organik >10%." },
      { q: "Berapa lama RAJABIO mulai bekerja?", a: "Efek pupuk organik cair RAJABIO terlihat dalam 7-14 hari setelah aplikasi rutin. Tanaman akan terlihat lebih hijau dan segar karena nutrisi POC langsung diserap." },
      { q: "Apakah pupuk organik cair aman dicampur pestisida?", a: "Ya, POC RAJABIO aman dicampur dengan pestisida organik. Hindari pencampuran dengan bahan kimia keras agar efektivitas pupuk organik cair tetap optimal." },
      { q: "Berapa dosis pupuk organik cair untuk 1 hektar sawah?", a: "Untuk 1 hektar sawah, dibutuhkan sekitar 3-5 liter pupuk organik cair RAJABIO per aplikasi dengan interval 2 minggu. Dosis POC standar: 5ml/liter air." },
      { q: "Apakah tersedia untuk pembelian pemerintah?", a: "Ya, RAJABIO pupuk organik cair sudah terdaftar di E-Katalog Pemerintah (INAPROC) untuk kemudahan pengadaan resmi. POC RAJABIO juga bersertifikat Kementan RI." },
    ],
    videoSection: {
      title: "Lihat RAJABIO Beraksi",
      subtitle: "Video testimoni dan cara aplikasi",
    },
  },
  en: {
    name: "RAJABIO",
    subtitle: "Liquid Organic Fertilizer",
    tagline: "Organic Revolution for Indonesian Agriculture",
    heroTitle: "Best Liquid Organic Fertilizer - RAJABIO Increases Harvest Up to 40%",
    heroSubtitle: "Premium LOF (Liquid Organic Fertilizer) certified by Ministry of Agriculture RI. Trusted by farmers across 19+ Indonesian provinces. Officially registered in Government E-Catalog.",
    description: "RAJABIO is a premium liquid organic fertilizer formulated from selected natural ingredients using modern fermentation technology. With high C-Organic content (>10%), RAJABIO fertilizes soil while increasing plant resistance to pests and diseases.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaShopee: "Buy on Shopee",
    ctaCatalog: "View on Government E-Catalog",
    ctaBrochure: "Download Product Brochure",
    ctaCertificate: "View Official Certificate",
    ctaReadArticle: "Read Farmer Success Stories",
    stats: [
      { value: "19+", label: "Provinces" },
      { value: "10.05%", label: "C-Organic" },
      { value: "40%", label: "Yield Increase" },
      { value: "100%", label: "Organic" },
    ],
    certifications: [
      { label: "Ministry of Agriculture RI", value: "02.02.2023.883", icon: "gov" },
      { label: "LeSOS Organic Certificate", value: "442-LSO-005-IDN-08-22", icon: "organic" },
      { label: "SNI Standard", value: "SNI 6729:2016", icon: "sni" },
    ],
    benefits: [
      { title: "Increase Harvest Yield", desc: "Proven to increase productivity up to 40%", icon: "trending" },
      { title: "Enrich Soil", desc: "C-Organic >10% improves soil structure and fertility", icon: "leaf" },
      { title: "Pest & Disease Resistant", desc: "Enhances natural plant immunity", icon: "shield" },
      { title: "Eco-Friendly", desc: "100% organic, safe for ecosystem", icon: "sprout" },
      { title: "Cost Effective", desc: "Reduces chemical fertilizer needs by up to 50%", icon: "zap" },
      { title: "Easy Application", desc: "Just 5ml/liter, spray or pour", icon: "droplets" },
    ],
    composition: {
      title: "Composition & Nutrient Content",
      subtitle: "Accredited Laboratory Test Results",
      mainNutrients: [
        { name: "C-Organic", value: "10.05%", highlight: true },
        { name: "pH", value: "8.02", highlight: false },
        { name: "Nitrogen (N)", value: "2.56%", highlight: false },
        { name: "N-Organic", value: "0.57%", highlight: false },
        { name: "Phosphate (P₂O₅)", value: "< 0.0074%", highlight: false },
        { name: "Potassium (K₂O)", value: "< 0.0017%", highlight: false },
      ],
      microNutrients: [
        { name: "Manganese (Mn)", value: "49.11 mg/kg" },
        { name: "Iron (Fe)", value: "649 mg/kg" },
        { name: "Boron (B)", value: "13.5 ppm" },
        { name: "Molybdenum (Mo)", value: "2.9 ppm" },
      ],
      safety: [
        { name: "E. coli", value: "< 3.0 MPN/gr", status: "Safe" },
        { name: "Salmonella sp", value: "Negative", status: "Safe" },
      ],
    },
    dosage: {
      title: "Application Guide",
      subtitle: "Right dosage for maximum results",
      standard: "5 ML / LITER WATER",
      standardNote: "8 bottle caps per tank",
      interval: "Every 1-2 Weeks",
      stages: [
        { stage: "Land Preparation", method: "Spray or pour evenly on land", dose: "5 ml/liter", timing: "Before planting" },
        { stage: "At Planting", method: "Apply to planting holes", dose: "5 ml/liter", timing: "Day one" },
        { stage: "Maintenance", method: "Spray leaves and pour on roots", dose: "5 ml/liter", timing: "Regular 1-2 weeks" },
      ],
      crops: [
        { crop: "Rice Paddy", dose: "5 ml/liter", interval: "Every 2 weeks", notes: "Until 60 days", icon: "wheat", color: "amber" },
        { crop: "Vegetables & Horticulture", dose: "5 ml/liter", interval: "1-2x/week", notes: "Throughout growing season", icon: "carrot", color: "orange" },
        { crop: "Productive Plantation", dose: "5 ml/liter", interval: "Once/month", notes: "Pour on root area", icon: "tree", color: "green" },
        { crop: "Young Plants", dose: "5 ml/liter", interval: "1-2 months", notes: "Vegetative growth phase", icon: "sprout", color: "lime" },
        { crop: "Cassava & Sugarcane", dose: "5 ml/liter", interval: "1-2 months", notes: "Until 6 months", icon: "cherry", color: "rose" },
      ],
    },
    pricing: {
      title: "Get RAJABIO Now",
      package: "1 Liter Package",
      price: "Rp 62,000",
      originalPrice: "Rp 75,000",
      discount: "17% OFF",
      note: "Price includes VAT",
      freeShipping: "Free shipping for 6+ liters",
      guarantee: "30-day money back guarantee",
    },
    testimonialSection: {
      title: "Trusted by Indonesian Farmers",
      subtitle: "See how RAJABIO transforms farmer harvests",
    },
    faq: [
      { q: "How long before RAJABIO starts working?", a: "Effects visible within 7-14 days of regular application. Plants will look greener and fresher." },
      { q: "Is it safe to mix with pesticides?", a: "Yes, RAJABIO is safe to mix with organic pesticides. Avoid mixing with harsh chemicals." },
      { q: "What's the dosage for 1 hectare of rice field?", a: "For 1 hectare, approximately 3-5 liters of RAJABIO per application with 2-week intervals." },
      { q: "Is it available for government procurement?", a: "Yes, RAJABIO is registered in Government E-Catalog (INAPROC) for official procurement." },
    ],
    videoSection: {
      title: "See RAJABIO in Action",
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
    ? "Pupuk Organik Cair RAJABIO - POC Terbaik Tingkatkan Panen 40% | Bersertifikat Kementan"
    : "RAJABIO Liquid Organic Fertilizer - Best LOF Increase Harvest 40% | Certified";
  
  const description = lang === 'id'
    ? "Pupuk organik cair (POC) RAJABIO bersertifikat Kementan RI dengan C-Organik >10%. Pupuk organik cair terbaik untuk meningkatkan panen hingga 40%. Tersedia di E-Katalog Pemerintah & Shopee. Pesan POC RAJABIO sekarang!"
    : "RAJABIO certified liquid organic fertilizer (LOF) from Ministry of Agriculture RI with C-Organic >10%. Best organic liquid fertilizer proven to increase harvest up to 40%. Available on Government E-Catalog & Shopee. Order now!";

  const keywords = lang === 'id'
    ? "jual pupuk organik cair, pupuk organik cair, poc, pupuk organik cair terbaik, rajabio, jual rajabio, jual poc, distributor pupuk organik cair, supplier pupuk organik cair, grosir pupuk organik cair, pupuk organik cair poc, pupuk organik bersertifikat, pupuk hayati cair, pupuk padi organik cair, c-organik tinggi, pupuk organik cair untuk padi, pupuk ramah lingkungan, centra biotech, pertanian berkelanjutan, pupuk organik kementan, e-katalog pupuk, pupuk organik cair pertanian, agen pupuk organik"
    : "liquid organic fertilizer for sale, buy liquid organic fertilizer, lof, best liquid organic fertilizer, rajabio, buy rajabio, liquid organic fertilizer distributor, organic fertilizer supplier, wholesale organic fertilizer, organic liquid fertilizer, certified organic fertilizer, biological liquid fertilizer, organic rice fertilizer, high c-organic, eco-friendly liquid fertilizer, centra biotech, sustainable agriculture, organic fertilizer dealer";

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
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
      images: [{
        url: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
        width: 1200,
        height: 630,
        alt: data.name + " - " + data.subtitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/produk-layanan/pertanian/rajabio-pupuk-organik`,
        'en': `${SITE_CONFIG.url}/en/produk-layanan/pertanian/rajabio-pupuk-organik`,
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

export default async function RajabioProductPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  // Fetch data from Strapi CMS (for text editability)
  const strapiData = await fetchStrapiProduct("rajabio-pupuk-organik");
  
  // Use static fallback data as base
  const staticData = productData[lang];
  
  // Merge Strapi data with static fallback (Strapi text takes precedence if available)
  // This allows editing text via Strapi while keeping exact same design
  const data = {
    ...staticData,
    // Override text fields from Strapi if available
    name: strapiData?.name || staticData.name,
    subtitle: strapiData?.subtitle || staticData.subtitle,
    tagline: strapiData?.tagline || staticData.tagline,
    heroTitle: strapiData?.heroTitle || staticData.heroTitle,
    heroSubtitle: strapiData?.heroSubtitle || staticData.heroSubtitle,
    description: strapiData?.description || staticData.description,
    ctaWhatsapp: strapiData?.ctaWhatsapp || staticData.ctaWhatsapp,
    ctaShopee: strapiData?.ctaShopee || staticData.ctaShopee,
    ctaCatalog: strapiData?.ctaCatalog || staticData.ctaCatalog,
    ctaBrochure: strapiData?.ctaBrochure || staticData.ctaBrochure,
    ctaCertificate: strapiData?.ctaCertificate || staticData.ctaCertificate,
    // FAQ from Strapi or fallback
    faq: transformFAQ(strapiData?.faq, staticData.faq),
    // Video section titles from Strapi
    videoSection: {
      ...staticData.videoSection,
      title: strapiData?.videoSectionTitle || staticData.videoSection.title,
      subtitle: strapiData?.videoSectionSubtitle || staticData.videoSection.subtitle,
    },
  };
  
  // Videos from Strapi or fallback to static rajabiVideos
  const videos = transformVideos(strapiData?.videos, rajabiVideos);
  
  // External links from Strapi or fallback
  const externalLinks = transformExternalLinks(strapiData?.externalLinks, EXTERNAL_LINKS);
  
  // WhatsApp URL (can be customized via Strapi)
  const whatsappNumber = strapiData?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMessage = strapiData?.whatsappMessage || (lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Generate comprehensive structured data for maximum SEO + AI Search Engines
  const schemas = [
    // 1. Enhanced Product Schema with AI Entity Relationships
    {
      '@context': 'https://schema.org',
      '@type': ['Product', 'Thing'],
      '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#product`,
      
      // Basic Product Info
      name: `${data.name} - ${data.subtitle}`,
      alternateName: lang === 'id' 
        ? ['RAJABIO LOF', 'RAJABIO Pupuk Organik', 'Pupuk Organik Cair RAJABIO', 'POC RAJABIO']
        : ['RAJABIO LOF', 'RAJABIO Organic Fertilizer', 'RAJABIO Liquid Organic Fertilizer'],
      description: data.description,
      image: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik`,
      sku: 'RAJABIO-1L',
      mpn: 'RAJABIO-LOF-2024',
      
      // ENTITY RELATIONSHIPS (Critical for AI)
      manufacturer: {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}#organization`,
        name: 'PT Centra Biotech Indonesia',
        alternateName: 'Centra Biotech Indonesia',
        url: SITE_CONFIG.url,
        telephone: '+62-812-3500-3655',
        email: 'centrabioindo@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sawahan RT 02 RW 07 Pasungan, Ceper',
          addressLocality: 'Klaten',
          addressRegion: 'Jawa Tengah',
          postalCode: '57465',
          addressCountry: 'ID',
        },
      },
      brand: {
        '@type': 'Brand',
        name: 'RAJABIO',
        logo: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      },
      
      // Category Hierarchy (for AI understanding)
      category: lang === 'id' 
        ? ['Produk Pertanian', 'Pupuk', 'Pupuk Organik Cair', 'Pupuk Hayati']
        : ['Agricultural Products', 'Fertilizers', 'Liquid Organic Fertilizers', 'Biological Fertilizers'],
      additionalType: [
        'https://en.wikipedia.org/wiki/Organic_fertilizer',
        'https://en.wikipedia.org/wiki/Liquid_fertilizer',
      ],
      
      // Certification Authority
      award: lang === 'id'
        ? ['Sertifikasi Kementerian Pertanian Republik Indonesia', 'Terdaftar di E-Katalog Pemerintah (INAPROC)']
        : ['Ministry of Agriculture Republic of Indonesia Certification', 'Registered in Government E-Catalog (INAPROC)'],
      
      // Measurable Claims (AI loves specific data)
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'C-Organic Content',
          value: '>10',
          unitText: 'percent',
          description: lang === 'id' ? 'Kandungan C-Organik di atas standar industri' : 'C-Organic content above industry standard',
        },
        {
          '@type': 'PropertyValue',
          name: 'Harvest Increase',
          value: '40',
          unitText: 'percent',
          description: lang === 'id' ? 'Peningkatan hasil panen dibanding pupuk kimia' : 'Harvest increase compared to chemical fertilizers',
        },
        {
          '@type': 'PropertyValue',
          name: 'Cost Efficiency',
          value: '30',
          unitText: 'percent',
          description: lang === 'id' ? 'Lebih efisien biaya per hektar' : 'More cost-efficient per hectare',
        },
      ],
      
      // Use Cases (AI uses for recommendations)
      applicationCategory: lang === 'id'
        ? ['Pertanian Padi', 'Pertanian Sayuran', 'Pertanian Jagung', 'Pertanian Organik']
        : ['Rice Farming', 'Vegetable Farming', 'Corn Farming', 'Organic Agriculture'],
      
      // Product Offers
      offers: {
        '@type': 'Offer',
        url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik`,
        availability: 'https://schema.org/InStock',
        price: '62000',
        priceCurrency: 'IDR',
        priceValidUntil: '2026-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.url}#organization`,
          name: 'PT Centra Biotech Indonesia',
        },
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
        },
        availableAtOrFrom: [
          {
            '@type': 'OnlineStore',
            name: 'Shopee Indonesia',
            url: EXTERNAL_LINKS.shopee,
          },
          {
            '@type': 'GovernmentService',
            name: lang === 'id' ? 'E-Katalog Pemerintah (INAPROC)' : 'Government E-Catalog (INAPROC)',
            url: EXTERNAL_LINKS.inaproc,
          },
        ],
      },
      
      // Related Products (semantic connections)
      isRelatedTo: [
        {
          '@type': 'Product',
          name: 'FLORAONE Pupuk Hayati',
          url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/floraone-pupuk-hayati`,
        },
        {
          '@type': 'Product',
          name: 'SIMBIOS Pupuk Hayati',
          url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
        },
        {
          '@type': 'Product',
          name: 'BIO KILLER Insektisida Hayati',
          url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati`,
        },
      ],
      
      // Sustainability Claims
      keywords: lang === 'id'
        ? 'pupuk organik cair, ramah lingkungan, pertanian berkelanjutan, bersertifikat kementan'
        : 'liquid organic fertilizer, eco-friendly, sustainable agriculture, ministry certified',
      
      // Aggregate Rating
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
      
      // Reviews (Proof Points for AI)
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Pak Budi - Petani Padi Indramayu',
          },
          datePublished: '2025-11-15',
          reviewBody: lang === 'id' 
            ? 'RAJABIO benar-benar mengubah hasil panen saya. Padi lebih subur dan panen naik 35%. Sangat direkomendasikan untuk petani organik!'
            : 'RAJABIO truly transformed my harvest. Rice is more fertile and harvest increased by 35%. Highly recommended for organic farmers!',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Ibu Sri - Petani Sayur Bandung',
          },
          datePublished: '2025-10-22',
          reviewBody: lang === 'id'
            ? 'Sayuran jadi lebih segar dan tahan lama. Hama berkurang drastis setelah rutin pakai RAJABIO. Harga juga sangat terjangkau.'
            : 'Vegetables became fresher and last longer. Pests decreased drastically after regular use of RAJABIO. Price is also very affordable.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Pak Ahmad - Petani Cabai Jawa Tengah',
          },
          datePublished: '2025-09-10',
          reviewBody: lang === 'id'
            ? 'Cabai saya tumbuh lebih besar dan produktif. RAJABIO mudah diaplikasikan dan hasilnya memuaskan. Akan terus pakai produk ini.'
            : 'My chili plants grew bigger and more productive. RAJABIO is easy to apply with satisfying results. Will continue using this product.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
      ],
    },
    
    // 2. Breadcrumb Schema
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
      { name: 'RAJABIO', url: `/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik` },
    ]),
    
    // 3. FAQ Schema - Critical for Featured Snippets
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
    
    // 4. Multiple Video Schemas for All Testimonials
    // YouTube Video 1
    generateVideoSchema({
      name: lang === 'id' ? "Bekas Produksi Batu Bata Kini Berproduksi Lagi Berkat RAJABIO" : "Former Brick Production Now Producing Again Thanks to RAJABIO",
      description: lang === 'id' ? "Testimoni petani dari Indramayu yang berhasil menghidupkan kembali lahan bekas produksi batu bata menggunakan pupuk organik cair RAJABIO." : "Farmer testimonial from Indramayu successfully reviving former brick production land using RAJABIO liquid organic fertilizer.",
      thumbnailUrl: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      uploadDate: "2024-11-01",
      contentUrl: "https://www.youtube.com/watch?v=rRbK3D_gvS4",
      embedUrl: "https://www.youtube.com/embed/rRbK3D_gvS4",
      duration: "PT3M45S",
    }),
    
    // YouTube Video 2
    generateVideoSchema({
      name: lang === 'id' ? "Testimoni Pak Parjan Indramayu - RAJABIO POC" : "Pak Parjan Indramayu Testimonial - RAJABIO LOF",
      description: lang === 'id' ? "Pak Parjan dari Indramayu membagikan pengalamannya menggunakan pupuk organik cair RAJABIO untuk meningkatkan hasil panen padi." : "Pak Parjan from Indramayu shares his experience using RAJABIO liquid organic fertilizer to increase rice harvest.",
      thumbnailUrl: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      uploadDate: "2024-10-15",
      contentUrl: "https://www.youtube.com/watch?v=_B3pONNfGEI",
      embedUrl: "https://www.youtube.com/embed/_B3pONNfGEI",
      duration: "PT2M30S",
    }),
    
    // YouTube Video 3
    generateVideoSchema({
      name: lang === 'id' ? "Cara Efektif Menekan Biaya Produksi Padi 60% dengan RAJABIO" : "Effective Way to Reduce Rice Production Costs 60% with RAJABIO",
      description: lang === 'id' ? "Tutorial lengkap cara menggunakan pupuk organik cair RAJABIO untuk menekan biaya produksi padi hingga 60% tanpa mengurangi hasil panen." : "Complete tutorial on using RAJABIO liquid organic fertilizer to reduce rice production costs up to 60% without reducing harvest.",
      thumbnailUrl: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      uploadDate: "2024-09-20",
      contentUrl: "https://www.youtube.com/watch?v=IkHUqxjLuIE",
      embedUrl: "https://www.youtube.com/embed/IkHUqxjLuIE",
      duration: "PT4M15S",
    }),
    
    // YouTube Video 4
    generateVideoSchema({
      name: lang === 'id' ? "Testimoni Pak Parman Batang - RAJABIO Pupuk Organik" : "Pak Parman Batang Testimonial - RAJABIO Organic Fertilizer",
      description: lang === 'id' ? "Petani dari Batang, Pak Parman, berbagi kesuksesannya menggunakan POC RAJABIO untuk pertanian organik yang menguntungkan." : "Farmer from Batang, Pak Parman, shares his success using RAJABIO LOF for profitable organic farming.",
      thumbnailUrl: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      uploadDate: "2024-08-10",
      contentUrl: "https://www.youtube.com/watch?v=zGF2bYyClhk",
      embedUrl: "https://www.youtube.com/embed/zGF2bYyClhk",
      duration: "PT3M20S",
    }),
    
    // 5. HowTo Schema for Application Guide - Critical for Featured Snippets
    generateHowToSchema({
      name: lang === 'id' ? "Cara Menggunakan Pupuk Organik Cair RAJABIO" : "How to Use RAJABIO Liquid Organic Fertilizer",
      description: lang === 'id' 
        ? "Panduan lengkap aplikasi pupuk organik cair (POC) RAJABIO untuk hasil panen maksimal. Dosis standar 5ml per liter air, aplikasi setiap 1-2 minggu."
        : "Complete guide for applying RAJABIO liquid organic fertilizer (LOF) for maximum harvest. Standard dose 5ml per liter water, apply every 1-2 weeks.",
      image: "/products/rajabio/rajabio-cover.webp",
      totalTime: "PT15M",
      estimatedCost: { value: 62000, currency: "IDR" },
      steps: [
        {
          name: lang === 'id' ? "Persiapan Larutan" : "Prepare Solution",
          text: lang === 'id' 
            ? "Campurkan 5ml (1 tutup botol) pupuk organik cair RAJABIO dengan 1 liter air bersih. Untuk 1 tangki semprot 15 liter, gunakan 8 tutup kemasan (±75ml). Aduk hingga merata."
            : "Mix 5ml (1 bottle cap) of RAJABIO liquid organic fertilizer with 1 liter of clean water. For 1 sprayer tank of 15 liters, use 8 bottle caps (±75ml). Stir until evenly mixed.",
          image: "/products/rajabio/rajabio-cover.webp",
        },
        {
          name: lang === 'id' ? "Aplikasi Pada Lahan" : "Apply to Land",
          text: lang === 'id'
            ? "Untuk pengolahan lahan, semprotkan atau siramkan larutan POC RAJABIO secara merata pada area tanam 7-14 hari sebelum penanaman. Ini membantu menyuburkan tanah dan meningkatkan mikroorganisme menguntungkan."
            : "For land preparation, spray or pour RAJABIO LOF solution evenly on planting area 7-14 days before planting. This helps fertilize soil and increase beneficial microorganisms.",
        },
        {
          name: lang === 'id' ? "Aplikasi Saat Tanam" : "Apply at Planting",
          text: lang === 'id'
            ? "Pada hari penanaman, siramkan pupuk organik cair pada lubang tanam atau area perakaran. Untuk padi sawah, aplikasikan 1-2 hari setelah tanam dengan dosis 5ml/liter."
            : "On planting day, pour liquid organic fertilizer on planting holes or root area. For paddy rice, apply 1-2 days after planting with 5ml/liter dose.",
        },
        {
          name: lang === 'id' ? "Perawatan Rutin" : "Regular Maintenance",
          text: lang === 'id'
            ? "Lakukan penyemprotan daun atau penyiraman akar dengan POC RAJABIO setiap 1-2 minggu sekali. Semprot pada pagi atau sore hari saat matahari tidak terik. Untuk tanaman padi, hentikan aplikasi 2 minggu sebelum panen."
            : "Perform leaf spraying or root watering with RAJABIO LOF every 1-2 weeks. Spray in morning or evening when sun is not too hot. For rice plants, stop application 2 weeks before harvest.",
        },
        {
          name: lang === 'id' ? "Penyimpanan Produk" : "Product Storage",
          text: lang === 'id'
            ? "Simpan kemasan pupuk organik cair RAJABIO di tempat sejuk, kering, dan terlindung dari sinar matahari langsung. Tutup rapat setelah penggunaan. Produk bertahan hingga 2 tahun dalam kondisi penyimpanan optimal."
            : "Store RAJABIO liquid organic fertilizer in cool, dry place protected from direct sunlight. Close tightly after use. Product lasts up to 2 years in optimal storage conditions.",
        },
      ],
    }),
    
    // 6. DefinedTermSet Schema for Key Terminology (AI Understanding)
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#glossary`,
      name: lang === 'id' ? 'Glosarium RAJABIO' : 'RAJABIO Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#poc`,
          name: lang === 'id' ? 'Pupuk Organik Cair (POC)' : 'Liquid Organic Fertilizer (LOF)',
          alternateName: lang === 'id' ? ['POC', 'Pupuk Cair Organik'] : ['LOF', 'Liquid Organic Fertilizer'],
          description: lang === 'id'
            ? 'Pupuk berbentuk cair yang terbuat dari bahan organik dengan mikroorganisme menguntungkan untuk meningkatkan kesuburan tanah dan hasil panen. RAJABIO adalah POC bersertifikat dengan kandungan C-Organik >10%.'
            : 'A liquid fertilizer made from organic materials with beneficial microorganisms to improve soil fertility and crop yield. RAJABIO is a certified LOF with >10% C-Organic content.',
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: lang === 'id' ? 'Terminologi Pertanian' : 'Agricultural Terminology',
          },
        },
        {
          '@type': 'DefinedTerm',
          '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#c-organic`,
          name: 'C-Organik',
          alternateName: lang === 'id' ? ['Karbon Organik', 'C-Organic'] : ['Organic Carbon', 'C-Organic'],
          description: lang === 'id'
            ? 'Persentase kandungan karbon organik dalam pupuk yang menunjukkan jumlah bahan organik. RAJABIO mengandung C-Organik >10%, di atas standar industri untuk pupuk organik cair.'
            : 'The percentage of organic carbon content in fertilizer indicating the amount of organic matter. RAJABIO contains >10% C-Organic, above industry standards for liquid organic fertilizers.',
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: lang === 'id' ? 'Metrik Kualitas Pupuk' : 'Fertilizer Quality Metrics',
          },
        },
        {
          '@type': 'DefinedTerm',
          '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#nitrogen-fixing`,
          name: lang === 'id' ? 'Bakteri Penambat Nitrogen' : 'Nitrogen-Fixing Bacteria',
          alternateName: lang === 'id' ? ['Azotobacter', 'Azospirillum'] : ['Nitrogen Fixers', 'N-Fixing Bacteria'],
          description: lang === 'id'
            ? 'Mikroorganisme yang dapat mengubah nitrogen dari udara menjadi bentuk yang dapat diserap tanaman. RAJABIO mengandung Azotobacter dan Azospirillum untuk meningkatkan ketersediaan nitrogen alami.'
            : 'Microorganisms that can convert atmospheric nitrogen into forms plants can absorb. RAJABIO contains Azotobacter and Azospirillum to increase natural nitrogen availability.',
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: lang === 'id' ? 'Mikrobiologi Tanah' : 'Soil Microbiology',
          },
        },
      ],
    },
    
    // 7. WebPage Schema with SpeakableSpecification (Voice AI Optimization)
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik`,
      name: `${data.name} - ${data.subtitle}`,
      description: data.description,
      url: `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik`,
      inLanguage: lang === 'id' ? 'id-ID' : 'en-US',
      isPartOf: {
        '@id': `${SITE_CONFIG.url}#website`,
      },
      about: {
        '@type': 'Product',
        '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#product`,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-title', '.product-description', '.benefits-list'],
        xpath: [
          '/html/body/main/section[1]/h1',
          '/html/body/main/section[2]/p',
        ],
      },
      mainEntity: {
        '@type': 'Product',
        '@id': `${SITE_CONFIG.url}/${lang}/produk-layanan/pertanian/rajabio-pupuk-organik#product`,
      },
    },
  ];

  return (
    <>
      {/* Structured Data for SEO + AI Search */}
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section - Matching Agriculture Landing Page Typography */}
      <HeroSectionGeneral
        imgUrl="/products/rajabio/rajabio-poster.jpg"
        category="Pupuk Organik"
        title={
          <h1 className="p-4 text-center text-3xl font-bold !leading-tight text-white lg:text-5xl xl:text-[56px]">
            Tingkatkan Hasil Panen Anda dengan {data.name} - {data.subtitle}
          </h1>
        }
      />

      {/* Breadcrumb - Immediately after hero like about-us */}
      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />

      {/* Product Overview Section - Matching About-Us Layout */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            {/* Left: Product Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/products/rajabio/rajabio-cover.webp"
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
                  href={externalLinks.shopee}
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

      {/* Keunggulan Produk Section - Matching Visi & Misi Layout */}
      <section className="relative bg-white py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left: Header & Description */}
            <div className="space-y-6 md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {lang === 'id' 
                    ? 'Mengapa Petani Memilih RAJABIO?'
                    : 'Why Farmers Choose RAJABIO?'}
                </h2>
              </div>
              <p className="text-gray-600">
                {lang === 'id'
                  ? 'RAJABIO adalah pupuk organik cair (POC) premium yang diformulasikan dari bahan alami pilihan menggunakan teknologi fermentasi modern. Sebagai salah satu pupuk organik cair terbaik di Indonesia, RAJABIO mengandung C-Organik tinggi (>10%) yang efektif memupuk tanah sekaligus meningkatkan ketahanan tanaman terhadap hama dan penyakit. POC RAJABIO telah terbukti meningkatkan hasil panen hingga 40%.'
                  : 'RAJABIO is a premium liquid organic fertilizer (LOF) formulated from selected natural materials using modern fermentation technology. As one of the best liquid organic fertilizers in Indonesia, RAJABIO contains high C-Organic (>10%) which is effective in fertilizing soil while increasing plant resistance to pests and diseases. LOF RAJABIO has been proven to increase harvest by up to 40%.'}
              </p>
              
              {/* CTA Button - Download Demplot */}
              <Link
                href={externalLinks.brochure}
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all w-fit"
              >
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Hasil Demplot' : 'Download Demplot Results'}
              </Link>
            </div>

            {/* Right: Keunggulan Cards Grid - 2x3 Layout */}
            <div className="grid grid-cols-1 gap-4 md:w-1/2 md:grid-cols-2">
              {/* Card 1: Tingkatkan Hasil Panen */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <TrendingUp className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'id' ? 'Tingkatkan Hasil Panen' : 'Increase Harvest Yield'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'id'
                    ? 'Terbukti meningkatkan produktivitas panen hingga 40%'
                    : 'Proven to increase productivity up to 40%'}
                </p>
              </div>

              {/* Card 2: Suburkan Tanah */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Leaf className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'id' ? 'Suburkan Tanah' : 'Enrich Soil'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'id'
                    ? 'C-Organik >10% memperbaiki struktur dan kesuburan tanah'
                    : 'C-Organic >10% improves soil structure and fertility'}
                </p>
              </div>

              {/* Card 3: Tahan Hama & Penyakit */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Shield className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'id' ? 'Tahan Hama & Penyakit' : 'Pest & Disease Resistant'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'id'
                    ? 'Meningkatkan imunitas alami tanaman'
                    : 'Enhances natural plant immunity'}
                </p>
              </div>

              {/* Card 4: Ramah Lingkungan */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Sprout className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'id' ? 'Ramah Lingkungan' : 'Eco-Friendly'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'id'
                    ? '100% organik, aman untuk ekosistem'
                    : '100% organic, safe for ecosystem'}
                </p>
              </div>

              {/* Card 5: Hemat Biaya */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Zap className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'id' ? 'Hemat Biaya' : 'Cost Effective'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'id'
                    ? 'Mengurangi kebutuhan pupuk kimia hingga 50%'
                    : 'Reduces chemical fertilizer needs by up to 50%'}
                </p>
              </div>

              {/* Card 6: Mudah Diaplikasi */}
              <div className="rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg">
                <Droplets className="mb-3 text-[#119f40]" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'id' ? 'Mudah Diaplikasi' : 'Easy Application'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'id'
                    ? 'Cukup 5ml/liter, semprot atau siram'
                    : 'Just 5ml/liter, spray or pour'}
                </p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Documents & Certifications Section - Elegant Grid Layout */}
      <section className="bg-[#EEE] py-20">
        <ContainerSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Dokumen Resmi & Sertifikasi' : 'Official Documents & Certifications'}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {lang === 'id' 
                ? 'RAJABIO bersertifikat resmi dari Kementerian Pertanian RI, LeSOS, dan memenuhi standar SNI. Unduh dokumen lengkap untuk referensi Anda.'
                : 'RAJABIO is officially certified by the Ministry of Agriculture RI, LeSOS, and meets SNI standards. Download complete documents for your reference.'}
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
        </ContainerSection>
      </section>

      {/* Video Gallery Section - Batch Slider */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {data.videoSection.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Saksikan testimoni petani dan hasil nyata penggunaan RAJABIO di lapangan'
                : 'Watch farmer testimonials and real results of RAJABIO in the field'}
            </p>
          </div>

          <VideoGallerySlider videos={videos} />
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
                  ? 'Temukan jawaban atas pertanyaan umum tentang RAJABIO'
                  : 'Find answers to common questions about RAJABIO'}
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
