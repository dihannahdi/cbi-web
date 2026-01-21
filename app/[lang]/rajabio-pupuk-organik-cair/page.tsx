import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import { SITE_CONFIG } from "@/utils/seo";
import { 
  generateProductSchema,
  generateBreadcrumbSchema,
  generateVideoSchema,
  generateFAQSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";
import { 
  Award, 
  Leaf, 
  Shield, 
  Droplets, 
  CheckCircle, 
  FlaskConical,
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
  brochure: "https://cbi-backend.my.id/uploads/e_brochure_Rajabio_0a91d17adf.pdf",
  certificate: "https://cbi-backend.my.id/uploads/SK_RAJABIO_9ec75a4ec2.pdf",
  inaproc: "https://katalog.inaproc.id/search?keyword=rajabio&page=1",
  shopee: "https://shopee.co.id/Rajabio-Pupuk-Cair-Organik-Nutrisi-Lengkap-i.1083634538.23485056818",
  newsArticle: "/news/rajabio-revolusi-organik-untuk-padi-sawah-indonesia-janjikan-panen-berlimpah-dan-lahan-lestari",
  youtubeVideo: "https://www.youtube.com/shorts/A5twMwN51Kw",
  youtubeEmbed: "https://www.youtube.com/embed/A5twMwN51Kw",
};

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
    ? "jual pupuk organik cair, pupuk organik cair, poc, pupuk organik cair terbaik, rajabio, jual rajabio, jual poc, pupuk organik cair poc, pupuk organik bersertifikat, pupuk hayati cair, pupuk padi organik cair, c-organik tinggi, pupuk organik cair untuk padi, pupuk ramah lingkungan, centra biotech, pertanian berkelanjutan, pupuk organik kementan, e-katalog pupuk, pupuk organik cair pertanian"
    : "liquid organic fertilizer for sale, buy liquid organic fertilizer, lof, best liquid organic fertilizer, rajabio, buy rajabio, organic liquid fertilizer, certified organic fertilizer, biological liquid fertilizer, organic rice fertilizer, high c-organic, eco-friendly liquid fertilizer, centra biotech, sustainable agriculture";

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
      url: `${SITE_CONFIG.url}/${lang}/rajabio-pupuk-organik-cair`,
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
      canonical: `${SITE_CONFIG.url}/${lang}/rajabio-pupuk-organik-cair`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/rajabio-pupuk-organik-cair`,
        'en': `${SITE_CONFIG.url}/en/rajabio-pupuk-organik-cair`,
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
  const data = productData[lang];
  const whatsappMessage = lang === 'id' ? WHATSAPP_MESSAGE_ID : WHATSAPP_MESSAGE_EN;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  // Generate structured data
  const schemas = [
    generateProductSchema({
      name: `${data.name} - ${data.subtitle}`,
      description: data.description,
      brand: "Centra Biotech Indonesia",
      url: `/${lang}/rajabio-pupuk-organik-cair`,
      image: `/products/rajabio/rajabio-cover.webp`,
      sku: "RAJABIO-1L",
      category: lang === 'id' ? 'Pupuk Organik Cair' : 'Liquid Organic Fertilizer',
      offers: {
        price: 62000,
        priceCurrency: "IDR",
        availability: "InStock",
      },
    }),
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk' : 'Products', url: `/${lang}/product` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/product/agriculture` },
      { name: 'RAJABIO', url: `/${lang}/rajabio-pupuk-organik-cair` },
    ]),
    generateVideoSchema({
      name: lang === 'id' ? "RAJABIO Pupuk Organik - Video Testimoni" : "RAJABIO Organic Fertilizer - Testimonial Video",
      description: data.description,
      thumbnailUrl: `${SITE_CONFIG.url}/products/rajabio/rajabio-cover.webp`,
      uploadDate: "2024-01-01",
      embedUrl: EXTERNAL_LINKS.youtubeEmbed,
    }),
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section - Full Width with Gradient */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#004d1a] via-[#006622] to-[#008833]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <ContainerSection className="relative z-10 flex min-h-[90vh] flex-col justify-center py-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="order-2 lg:order-1 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium mb-6">
                <BadgeCheck className="h-4 w-4" />
                <span>{lang === 'id' ? 'Terdaftar Resmi Kementan RI' : 'Officially Registered - Ministry of Agriculture'}</span>
              </div>
              
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl mb-4">
                {data.name}
                <span className="block text-[#90EE90] text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
                  {data.subtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl font-medium text-white/90 mb-4">
                {data.heroTitle}
              </p>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                {data.heroSubtitle}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#90EE90]">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] px-6 py-4 font-semibold text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  {data.ctaWhatsapp}
                </Link>
                <Link
                  href={EXTERNAL_LINKS.shopee}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-[#EE4D2D] hover:bg-[#D73211] px-6 py-4 font-semibold text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {data.ctaShopee}
                </Link>
              </div>
            </div>

            {/* Right: Product Image Carousel */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main Product Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm p-4">
                  <Image
                    src="/products/rajabio/rajabio-cover.webp"
                    alt={`${data.name} - ${data.subtitle}`}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
                
                {/* Price Badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#C46617] text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-xs line-through opacity-70">{data.pricing.originalPrice}</div>
                  <div className="text-2xl font-bold">{data.pricing.price}</div>
                  <div className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-semibold mt-1">
                    {data.pricing.discount}
                  </div>
                </div>

                {/* Certificate Badge */}
                <div className="absolute -top-4 -left-4 bg-white text-[#006622] rounded-full p-3 shadow-xl">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </ContainerSection>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F4F4F4"/>
          </svg>
        </div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb className="bg-[#F4F4F4]" lang={lang} dict={dict} />

      {/* Documents Section */}
      <section className="bg-[#F4F4F4] py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Dokumen Resmi & Sertifikasi' : 'Official Documents & Certifications'}
            </h2>
            <p className="text-gray-600">
              {lang === 'id' ? 'Unduh dokumen resmi untuk referensi Anda' : 'Download official documents for your reference'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {/* Brochure */}
            <Link
              href={EXTERNAL_LINKS.brochure}
              target="_blank"
              className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#006622]/10 text-[#006622] group-hover:bg-[#006622] group-hover:text-white transition-colors">
                <FileText className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-[#006622]">{lang === 'id' ? 'Brosur Produk' : 'Product Brochure'}</h3>
                <p className="text-sm text-gray-500">PDF • E-Brochure RAJABIO</p>
              </div>
              <Download className="h-5 w-5 text-gray-400 group-hover:text-[#006622]" />
            </Link>

            {/* Certificate */}
            <Link
              href={EXTERNAL_LINKS.certificate}
              target="_blank"
              className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#C46617]/10 text-[#C46617] group-hover:bg-[#C46617] group-hover:text-white transition-colors">
                <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-[#C46617]">{lang === 'id' ? 'Sertifikat Kementan' : 'Ministry Certificate'}</h3>
                <p className="text-sm text-gray-500">PDF • SK RAJABIO</p>
              </div>
              <Download className="h-5 w-5 text-gray-400 group-hover:text-[#C46617]" />
            </Link>

            {/* News Article */}
            <Link
              href={`/${lang}${EXTERNAL_LINKS.newsArticle}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{lang === 'id' ? 'Artikel Sukses Petani' : 'Farmer Success Story'}</h3>
                <p className="text-sm text-gray-500">{lang === 'id' ? 'Baca kisah sukses' : 'Read success story'}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
            </Link>
          </div>

          {/* Certification Details */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            {/* Kementerian Pertanian */}
            <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border-2 border-[#006622]/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#006622]/10 text-[#006622]">
                <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{lang === 'id' ? 'Kementerian Pertanian RI' : 'Ministry of Agriculture RI'}</h3>
                <p className="text-sm font-mono text-[#006622]">02.02.2023.883</p>
              </div>
            </div>

            {/* Sertifikat Organik LeSOS */}
            <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border-2 border-[#C46617]/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#C46617]/10 text-[#C46617]">
                <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{lang === 'id' ? 'Sertifikat Organik LeSOS' : 'LeSOS Organic Certificate'}</h3>
                <p className="text-sm font-mono text-[#C46617]">442-LSO-005-IDN-08-22</p>
              </div>
            </div>

            {/* Standar SNI */}
            <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-500/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{lang === 'id' ? 'Standar SNI' : 'SNI Standard'}</h3>
                <p className="text-sm font-mono text-blue-600">SNI 6729:2016</p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Video & Gallery Section */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {data.videoSection.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.videoSection.subtitle}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* YouTube Video Embed */}
            <div className="relative aspect-[9/16] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl bg-black">
              <iframe
                src={`${EXTERNAL_LINKS.youtubeEmbed}?autoplay=0&rel=0`}
                title="RAJABIO Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Secondary Image - Poster */}
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/products/rajabio/rajabio-poster.jpg"
                alt="RAJABIO Poster"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg font-semibold">{lang === 'id' ? 'Poster Produk RAJABIO' : 'RAJABIO Product Poster'}</p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#F4F4F4] py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'KEUNGGULAN' : 'ADVANTAGES'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Mengapa Petani Memilih RAJABIO?' : 'Why Farmers Choose RAJABIO?'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {data.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#006622]/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#006622] to-[#009933] text-white mb-4 group-hover:scale-110 transition-transform">
                  <BenefitIcon type={benefit.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>





      {/* Dosage Section */}
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#C46617]/10 text-[#C46617] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'PANDUAN APLIKASI' : 'APPLICATION GUIDE'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {data.dosage.title}
            </h2>
            <p className="text-gray-600">{data.dosage.subtitle}</p>
          </div>

          {/* Dosage Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-gradient-to-br from-[#006622] to-[#009933] text-white rounded-2xl p-8 text-center min-w-[200px]">
              <Droplets className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{data.dosage.standard}</div>
              <div className="text-sm text-white/80">{data.dosage.standardNote}</div>
            </div>
            <div className="bg-gradient-to-br from-[#C46617] to-[#E07020] text-white rounded-2xl p-8 text-center min-w-[200px]">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{data.dosage.interval}</div>
              <div className="text-sm text-white/80">{lang === 'id' ? 'Interval Aplikasi' : 'Application Interval'}</div>
            </div>
          </div>

          {/* Application Stages */}
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            {data.dosage.stages.map((stage, idx) => (
              <div key={idx} className="bg-[#F4F4F4] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-[#006622]/10">
                  {idx + 1}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006622] text-white font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-gray-900">{stage.stage}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{stage.method}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#006622] font-semibold">{stage.dose}</span>
                    <span className="text-gray-500">{stage.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Crops Grid */}
          <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
            {lang === 'id' ? 'Dosis per Jenis Tanaman' : 'Dosage by Crop Type'}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {data.dosage.crops.map((crop, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
                  <CropIcon type={crop.icon} />
                </div>
                <h4 className="font-bold text-gray-900 mb-3">{crop.crop}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{lang === 'id' ? 'Dosis' : 'Dose'}</span>
                    <span className="font-medium">{crop.dose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{lang === 'id' ? 'Interval' : 'Interval'}</span>
                    <span className="font-medium">{crop.interval}</span>
                  </div>
                </div>
                <p className="text-xs text-[#C46617] mt-3">{crop.notes}</p>
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F4F4F4] py-16">
        <ContainerSection>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                {lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}
              </h2>
            </div>

            <div className="space-y-4">
              {data.faq.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#006622] text-white text-sm flex-shrink-0">?</span>
                    {item.q}
                  </h3>
                  <p className="text-gray-600 ml-9">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
}
