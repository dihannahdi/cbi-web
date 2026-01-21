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
  Microscope,
  Clock,
  Beaker,
  FileText,
  MapPin
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
  testReportRice: "https://docs.centrabiotechindonesia.com/uploads/Lap_Uji_Efektifitas_Simbios_Padi_Nov_2022.pdf",
  certificate: "https://docs.centrabiotechindonesia.com/uploads/SK_SIMBIOS_2023.pdf",
  tkdn: "https://tkdn.kemenperin.go.id/sertifikat_perush.php?id=vqUH9qalfsZtbUNxr_FTaBzIcQ11dCMcjVMHKpkQJeU,&id_siinas=P8E-9a3KhgPc2Eqnpx2ONGDJTRd5_4kK8sDa3Pq5Xr8,",
  inaproc: "https://katalog.inaproc.id/search?keyword=simbios&page=1",
  shopee: "https://shopee.co.id/search?keyword=simbios%20centra%20biotech",
};

// Product data - bilingual
const productData = {
  id: {
    name: "SIMBIOS",
    subtitle: "Pupuk Hayati Premium",
    tagline: "Premium Quality - Teknologi Optimal untuk Mikroba Aktif",
    heroTitle: "Pupuk Hayati Premium SIMBIOS: Efektivitas 122% & Teknologi Bio-Aktivasi",
    heroSubtitle: "Pupuk hayati premium bersertifikat Kementan RI dengan teknologi bio-aktivasi. Mikroba bekerja 70% lebih optimal. Terbukti tingkatkan hasil padi hingga 122% RAE.",
    description: "SIMBIOS adalah pupuk hayati premium dalam bentuk cair yang diformulasikan dengan teknologi khusus untuk memastikan mikroba bekerja 70% lebih optimal dibandingkan pupuk hayati standar. Dilengkapi dengan Bioactivator untuk mengaktifkan mikroba sebelum aplikasi, SIMBIOS memiliki fungsi ganda sebagai pemupuk dan pengendali penyakit tanaman.",
    ctaWhatsapp: "Pesan Langsung via WhatsApp",
    ctaShopee: "Beli di Shopee",
    ctaCatalog: "Lihat di E-Katalog Pemerintah",
    ctaBrochure: "Unduh Brosur Produk",
    benefits: [
      { title: "Premium Quality", desc: "Teknologi khusus mikroba bekerja 70% lebih optimal", icon: "sparkle" },
      { title: "Bio-Aktivasi", desc: "Dilengkapi Bioactivator untuk hasil maksimal", icon: "beaker" },
      { title: "RAE 122%", desc: "Efektivitas agronomi relatif terbukti sangat efektif", icon: "trending" },
      { title: "Aman 100%", desc: "Bebas E.coli, Salmonella, logam berat berbahaya", icon: "shield" },
      { title: "Hemat 50%", desc: "Kurangi penggunaan pupuk kimia NPK/Urea", icon: "zap" },
      { title: "Percepat Panen", desc: "Mempercepat pertumbuhan dan waktu panen", icon: "clock" },
    ],
    microbes: [
      { name: "Pseudomonas fluorescens", function: "PGPR, Bakterisida & Fungisida Hayati", count: "2.40 x 10⁹ CFU/ml" },
      { name: "Azospirillum sp.", function: "Pengikat N dari udara, Penghasil Fitohormon", count: "5.85 x 10⁷ CFU/ml" },
      { name: "Rhizobium sp.", function: "Pengikat N untuk Legum, Pembentuk Nodul Akar", count: "4.45 x 10⁶ CFU/ml" },
      { name: "Aspergillus niger", function: "Pelarut P & K dalam Tanah, Dekomposer", count: "1.00 x 10⁵ CFU/ml" },
      { name: "Trichoderma harzianum", function: "Raja Fungi - Fungisida Hayati Kuat", count: "1.00 x 10⁵ CFU/ml" },
    ],
    fieldTestResults: {
      title: "Hasil Uji Lapangan Padi - IPB & Centra Biotech (Nov 2022)",
      location: "Karawang, Jawa Barat",
      crop: "Padi Sawah",
      treatment: "100% NPK + 100% SIMBIOS (2 L/Ha, 4 ml/L air)",
      results: [
        { metric: "Tinggi Tanaman", control: "116.80 cm", treatment: "121.40 cm", increase: "+4%" },
        { metric: "Jumlah Anakan", control: "12.52", treatment: "17.36", increase: "+39%" },
        { metric: "Hasil GKG/Ha", control: "5.3 ton", treatment: "6.18 ton", increase: "+17%" },
      ],
      rae: "122%",
      conclusion: "EFEKTIF meningkatkan pertumbuhan dan hasil padi"
    },
    safetyData: {
      pathogenicity: "Negatif",
      ecoli: "Negatif",
      salmonella: "Negatif",
      arsenic: "0.00 ppm",
      mercury: "0.00 ppm",
      cadmium: "0.00 ppm",
      lead: "4.37 ppm (di bawah ambang batas)"
    },
    certifications: [
      { label: "Kementan RI", value: "03.02.2023.328", icon: "gov" },
      { label: "Sertifikat Organik LeSOS", value: "442-LSO-005-IDN-08-22", icon: "organic" },
      { label: "Standar SNI", value: "6729:2016", icon: "sni" },
    ],
    pricing: {
      title: "Dapatkan SIMBIOS Sekarang",
      packages: [
        { name: "SIMBIOS Premium (1 Liter)", price: "Rp 60.000" },
      ],
      note: "Harga E-Katalog (termasuk PPN), belum termasuk ongkir",
    },
    applicationSteps: [
      { step: 1, title: "Bio-Aktivasi", desc: "Campurkan Bioactivator, diamkan 24-48 jam pada suhu ruang" },
      { step: 2, title: "Perlakuan Benih", desc: "Rendam benih 15ml/liter air selama 8-12 jam" },
      { step: 3, title: "Pengolahan Lahan", desc: "1-2 Liter/Ha, semprotkan merata pada tanah" },
      { step: 4, title: "Perawatan", desc: "1-2 ml/liter air, semprot setiap 1-2 minggu" },
    ],
    faq: [
      { q: "Apa itu pupuk hayati premium SIMBIOS?", a: "SIMBIOS adalah pupuk hayati premium dalam bentuk cair yang mengandung 5 jenis mikroba hidup dengan teknologi bio-aktivasi. Mikroba bekerja 70% lebih optimal dibandingkan pupuk hayati standar, dengan RAE (Relative Agronomic Effectiveness) mencapai 122%." },
      { q: "Apa perbedaan SIMBIOS dengan pupuk hayati biasa?", a: "SIMBIOS menggunakan teknologi premium yang memastikan mikroba 70% lebih aktif. Dilengkapi Bioactivator yang perlu dicampurkan dan didiamkan 24-48 jam sebelum aplikasi untuk mengaktifkan mikroba secara maksimal." },
      { q: "Berapa dosis SIMBIOS untuk 1 hektar?", a: "Untuk pengolahan lahan: 1-2 Liter/Ha dengan konsentrasi 1-2 ml/liter air. Untuk perawatan: 1-2 ml/liter air, aplikasi setiap 1-2 minggu. Berdasarkan uji lapangan, 2 L/Ha dengan konsentrasi 4 ml/L air memberikan hasil optimal." },
      { q: "Apakah SIMBIOS aman untuk pertanian organik?", a: "Ya, SIMBIOS 100% aman dan bersertifikat organik LeSOS (442-LSO-005-IDN-08-22), memenuhi standar SNI 6729:2016. Bebas E.coli, Salmonella, dan logam berat berbahaya (Arsenic 0.00 ppm, Mercury 0.00 ppm, Cadmium 0.00 ppm)." },
      { q: "Dimana bisa beli pupuk hayati SIMBIOS?", a: "SIMBIOS tersedia di E-Katalog Pemerintah (INA PROC) dengan harga Rp 60.000/liter dan marketplace Shopee. Anda juga bisa pesan langsung via WhatsApp untuk konsultasi gratis dan pengiriman ke seluruh Indonesia." },
    ],
  },
  en: {
    name: "SIMBIOS",
    subtitle: "Premium Biological Fertilizer",
    tagline: "Premium Quality - Optimal Technology for Active Microbes",
    heroTitle: "SIMBIOS Premium Biofertilizer: 122% Effectiveness & Bio-Activation Technology",
    heroSubtitle: "Premium biological fertilizer certified by Ministry of Agriculture RI with bio-activation technology. Microbes work 70% more optimally. Proven to increase rice yield up to 122% RAE.",
    description: "SIMBIOS is a premium liquid biological fertilizer formulated with special technology to ensure microbes work 70% more optimally than standard biological fertilizers. Equipped with Bioactivator to activate microbes before application, SIMBIOS has dual function as fertilizer and plant disease controller.",
    ctaWhatsapp: "Order via WhatsApp",
    ctaShopee: "Buy on Shopee",
    ctaCatalog: "View on Government E-Catalog",
    ctaBrochure: "Download Product Brochure",
    benefits: [
      { title: "Premium Quality", desc: "Special technology - microbes work 70% more optimally", icon: "sparkle" },
      { title: "Bio-Activation", desc: "Equipped with Bioactivator for maximum results", icon: "beaker" },
      { title: "122% RAE", desc: "Relative Agronomic Effectiveness proven highly effective", icon: "trending" },
      { title: "100% Safe", desc: "Free from E.coli, Salmonella, harmful heavy metals", icon: "shield" },
      { title: "Save 50%", desc: "Reduce chemical NPK/Urea fertilizer usage", icon: "zap" },
      { title: "Faster Harvest", desc: "Accelerate growth and harvest time", icon: "clock" },
    ],
    microbes: [
      { name: "Pseudomonas fluorescens", function: "PGPR, Biological Bactericide & Fungicide", count: "2.40 x 10⁹ CFU/ml" },
      { name: "Azospirillum sp.", function: "Nitrogen Fixer, Phytohormone Producer", count: "5.85 x 10⁷ CFU/ml" },
      { name: "Rhizobium sp.", function: "N Fixer for Legumes, Root Nodule Formation", count: "4.45 x 10⁶ CFU/ml" },
      { name: "Aspergillus niger", function: "P & K Solubilizer, Decomposer", count: "1.00 x 10⁵ CFU/ml" },
      { name: "Trichoderma harzianum", function: "King of Fungi - Strong Biological Fungicide", count: "1.00 x 10⁵ CFU/ml" },
    ],
    fieldTestResults: {
      title: "Rice Field Test Results - IPB & Centra Biotech (Nov 2022)",
      location: "Karawang, West Java",
      crop: "Paddy Rice",
      treatment: "100% NPK + 100% SIMBIOS (2 L/Ha, 4 ml/L water)",
      results: [
        { metric: "Plant Height", control: "116.80 cm", treatment: "121.40 cm", increase: "+4%" },
        { metric: "Number of Tillers", control: "12.52", treatment: "17.36", increase: "+39%" },
        { metric: "GKG Yield/Ha", control: "5.3 tons", treatment: "6.18 tons", increase: "+17%" },
      ],
      rae: "122%",
      conclusion: "EFFECTIVE in increasing rice growth and yield"
    },
    safetyData: {
      pathogenicity: "Negative",
      ecoli: "Negative",
      salmonella: "Negative",
      arsenic: "0.00 ppm",
      mercury: "0.00 ppm",
      cadmium: "0.00 ppm",
      lead: "4.37 ppm (below threshold)"
    },
    certifications: [
      { label: "Min. Agriculture RI", value: "03.02.2023.328", icon: "gov" },
      { label: "LeSOS Organic Certificate", value: "442-LSO-005-IDN-08-22", icon: "organic" },
      { label: "SNI Standard", value: "6729:2016", icon: "sni" },
    ],
    pricing: {
      title: "Get SIMBIOS Now",
      packages: [
        { name: "SIMBIOS Premium (1 Liter)", price: "Rp 60,000" },
      ],
      note: "E-Catalog price (incl. VAT), excl. shipping",
    },
    applicationSteps: [
      { step: 1, title: "Bio-Activation", desc: "Mix Bioactivator, let sit 24-48 hours at room temperature" },
      { step: 2, title: "Seed Treatment", desc: "Soak seeds 15ml/liter water for 8-12 hours" },
      { step: 3, title: "Land Preparation", desc: "1-2 Liters/Ha, spray evenly on soil" },
      { step: 4, title: "Maintenance", desc: "1-2 ml/liter water, spray every 1-2 weeks" },
    ],
    faq: [
      { q: "What is SIMBIOS premium biological fertilizer?", a: "SIMBIOS is a premium liquid biological fertilizer containing 5 types of living microbes with bio-activation technology. Microbes work 70% more optimally than standard biofertilizers, with RAE (Relative Agronomic Effectiveness) reaching 122%." },
      { q: "What's the difference between SIMBIOS and regular biofertilizer?", a: "SIMBIOS uses premium technology ensuring microbes are 70% more active. Equipped with Bioactivator that needs to be mixed and left for 24-48 hours before application to maximize microbial activation." },
      { q: "What's the SIMBIOS dosage for 1 hectare?", a: "For land preparation: 1-2 Liters/Ha with 1-2 ml/liter water concentration. For maintenance: 1-2 ml/liter water, apply every 1-2 weeks. Based on field tests, 2 L/Ha with 4 ml/L water concentration gives optimal results." },
      { q: "Is SIMBIOS safe for organic farming?", a: "Yes, SIMBIOS is 100% safe and LeSOS organic certified (442-LSO-005-IDN-08-22), meets SNI 6729:2016 standards. Free from E.coli, Salmonella, and harmful heavy metals (Arsenic 0.00 ppm, Mercury 0.00 ppm, Cadmium 0.00 ppm)." },
      { q: "Where can I buy SIMBIOS biological fertilizer?", a: "SIMBIOS is available on Government E-Catalog (INA PROC) at Rp 60,000/liter and Shopee marketplace. You can also order directly via WhatsApp for free consultation and delivery throughout Indonesia." },
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
    ? "Pupuk Hayati Premium SIMBIOS: RAE 122% & Bio-Aktivasi"
    : "SIMBIOS Premium Biofertilizer: 122% RAE & Bio-Activation";
  
  const description = lang === 'id'
    ? "Pupuk hayati premium SIMBIOS dengan teknologi bio-aktivasi. Mikroba 70% lebih optimal, RAE 122%, bebas logam berat. Sertifikat Kementan & SNI. Pesan sekarang!"
    : "SIMBIOS premium biofertilizer with bio-activation technology. 70% more optimal microbes, 122% RAE, heavy metal free. Ministry & SNI certified. Order now!";

  const keywords = lang === 'id'
    ? "pupuk hayati premium, simbios, pupuk hayati, biological fertilizer, pupuk mikroba, bio aktivasi, rae 122, trichoderma, pseudomonas, rhizobium, azospirillum, aspergillus niger, centra biotech, pupuk organik, pupuk kementan, sni 6729, pupuk padi"
    : "premium biological fertilizer, simbios, biofertilizer, microbial fertilizer, bio activation, rae 122, trichoderma, pseudomonas, rhizobium, azospirillum, aspergillus niger, centra biotech, organic fertilizer, ministry certified, sni 6729, rice fertilizer";

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
    case 'sparkle': return <Sparkles className={iconClass} />;
    case 'beaker': return <Beaker className={iconClass} />;
    case 'clock': return <Clock className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

// PLACEHOLDER - Component will be completed section by section
export default async function SimbiosProductPage({
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
      url: `/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`,
      image: `/products/simbios/simbios-cover.webp`,
      sku: "SIMBIOS-1L",
      category: lang === 'id' ? 'Pupuk Hayati Premium' : 'Premium Biological Fertilizer',
      offers: {
        price: 60000,
        priceCurrency: "IDR",
        availability: "InStock",
        priceValidUntil: "2026-12-31",
      },
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
      { name: 'SIMBIOS', url: `/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati` },
    ]),
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <>
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section */}
      <HeroSectionGeneral
        imgUrl="/products/simbios/simbios-cover.webp"
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
                <div className="relative rounded-3xl overflow-hidden bg-white p-6">
                  <Image
                    src="/products/simbios/simbios-cover.webp"
                    alt={lang === 'id' 
                      ? `Pupuk Hayati Premium SIMBIOS - Pupuk Mikroba Cair Bersertifikat Kementan dengan Teknologi Bio-Aktivasi` 
                      : `SIMBIOS Premium Biological Fertilizer - Certified Liquid Microbial Fertilizer with Bio-Activation Technology`}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full p-3 border-4 border-white">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#006622] text-white rounded-xl px-4 py-2 font-bold text-sm">
                  PREMIUM
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 text-sm font-semibold text-yellow-800 mb-4 w-fit border border-yellow-300">
                <Sparkles className="h-4 w-4" />
                <span>{lang === 'id' ? 'PREMIUM QUALITY' : 'PREMIUM QUALITY'}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:text-3xl">
                {lang === 'id' 
                  ? 'Pupuk Hayati Premium SIMBIOS: Teknologi Bio-Aktivasi untuk Hasil Maksimal'
                  : 'SIMBIOS Premium Biofertilizer: Bio-Activation Technology for Maximum Results'}
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {data.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] px-6 py-4 font-semibold text-white transition-all hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  {data.ctaWhatsapp}
                </Link>
                <Link
                  href={EXTERNAL_LINKS.shopee}
                  target="_blank"
                  className="flex items-center gap-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] px-6 py-4 font-semibold text-white transition-all hover:shadow-lg"
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
      <section className="bg-white py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'KEUNGGULAN PREMIUM' : 'PREMIUM ADVANTAGES'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' 
                ? 'Mengapa Pilih Pupuk Hayati Premium SIMBIOS?'
                : 'Why Choose SIMBIOS Premium Biofertilizer?'}
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-[#006622] hover:shadow-lg transition-all">
                <div className="h-12 w-12 rounded-xl bg-[#006622] text-white flex items-center justify-center mb-4">
                  <BenefitIcon type={benefit.icon} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>

      {/* Bukti Ilmiah & Teknis - Integrated Section */}
      <section className="bg-white py-20">
        <ContainerSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'BUKTI ILMIAH & TEKNIS' : 'SCIENTIFIC & TECHNICAL EVIDENCE'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' 
                ? 'Data Laboratorium & Hasil Uji Lapangan'
                : 'Laboratory Data & Field Test Results'}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {lang === 'id'
                ? 'SIMBIOS telah diuji secara ilmiah dengan hasil RAE 122%. Data berikut membuktikan efektivitas dan keamanan pupuk hayati premium kami.'
                : 'SIMBIOS has been scientifically tested with 122% RAE results. The following data proves the effectiveness and safety of our premium biofertilizer.'}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Microbial Composition */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-[#006622] px-6 py-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Beaker className="h-5 w-5" />
                  {lang === 'id' ? 'Komposisi 5 Mikroba Premium' : '5 Premium Microbes Composition'}
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {data.microbes.map((microbe, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 italic text-sm">{microbe.name}</p>
                        <p className="text-xs text-gray-500">{microbe.function}</p>
                      </div>
                      <span className="font-mono text-xs bg-[#006622]/10 px-2 py-1 rounded text-[#006622] font-semibold whitespace-nowrap">
                        {microbe.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - RAE Results */}
            <div className="bg-gradient-to-br from-[#004d1a] to-[#006622] rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <p className="text-sm opacity-80 mb-1">{lang === 'id' ? 'Relative Agronomic Effectiveness' : 'Relative Agronomic Effectiveness'}</p>
                <div className="text-6xl font-bold mb-1">{data.fieldTestResults.rae}</div>
                <p className="text-sm opacity-80">RAE - IPB & Centra Biotech</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm opacity-90">{lang === 'id' ? 'Kontrol (Kimia 100%)' : 'Control (100% Chemical)'}</span>
                    <span className="font-bold">5.3 ton/Ha</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white/60 h-2 rounded-full" style={{width: '86%'}}></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm opacity-90">{lang === 'id' ? 'Dengan SIMBIOS' : 'With SIMBIOS'}</span>
                    <span className="font-bold text-yellow-300">6.18 ton/Ha</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="opacity-80">{lang === 'id' ? 'Lokasi' : 'Location'}</p>
                  <p className="font-semibold">{data.fieldTestResults.location}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="opacity-80">{lang === 'id' ? 'Komoditas' : 'Commodity'}</p>
                  <p className="font-semibold">{data.fieldTestResults.crop}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
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
          </div>

          {/* Safety Data Row */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-[#006622]" />
              <h3 className="font-bold text-gray-900">
                {lang === 'id' ? 'Keamanan & Kualitas Teruji' : 'Tested Safety & Quality'}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#006622]/10 text-[#006622] mb-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-500">E.coli</p>
                <p className="font-bold text-[#006622]">{data.safetyData.ecoli}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#006622]/10 text-[#006622] mb-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-500">Salmonella</p>
                <p className="font-bold text-[#006622]">{data.safetyData.salmonella}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#006622]/10 text-[#006622] mb-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-500">Arsenic</p>
                <p className="font-bold text-[#006622]">{data.safetyData.arsenic}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#006622]/10 text-[#006622] mb-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-500">Mercury</p>
                <p className="font-bold text-[#006622]">{data.safetyData.mercury}</p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Premium Quality CTA Section - SIMBIOS */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#004d1a] via-[#006622] to-[#008a2e]" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        <ContainerSection className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-14 border border-white/20 shadow-2xl">
              
              {/* Premium Badge */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FFD700] via-[#FFC700] to-[#FFB700] text-[#004d1a] px-8 py-4 rounded-full font-black text-lg shadow-xl">
                  <Sparkles className="h-6 w-6" />
                  {lang === 'id' ? 'PREMIUM QUALITY' : 'PREMIUM QUALITY'}
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-8 items-center mb-10">
                {/* Left Column - Main Message */}
                <div className="md:col-span-3 text-white space-y-6">
                  <h3 className="text-4xl md:text-5xl font-black leading-tight">
                    {lang === 'id'
                      ? 'Teknologi Premium untuk Hasil Maksimal'
                      : 'Premium Technology for Maximum Results'}
                  </h3>

                  <p className="text-xl text-white/90 leading-relaxed">
                    {lang === 'id'
                      ? 'SIMBIOS bukan sekadar pupuk hayati biasa. Ini adalah inovasi premium dari PT. Centra Biotech Indonesia dengan teknologi bio-aktivasi yang membuat mikroba bekerja 70% lebih optimal.'
                      : 'SIMBIOS is not just an ordinary biological fertilizer. It\'s a premium innovation from PT. Centra Biotech Indonesia with bio-activation technology that makes microbes work 70% more optimally.'}
                  </p>

                  {/* Key Premium Features */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-[#004d1a]" />
                        </div>
                        <span className="font-bold text-lg">70%</span>
                      </div>
                      <p className="text-sm text-white/80">
                        {lang === 'id' ? 'Mikroba lebih optimal' : 'More optimal microbes'}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-[#004d1a]" />
                        </div>
                        <span className="font-bold text-lg">122%</span>
                      </div>
                      <p className="text-sm text-white/80">
                        {lang === 'id' ? 'RAE pada padi' : 'RAE on rice'}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                          <Beaker className="h-5 w-5 text-[#004d1a]" />
                        </div>
                        <span className="font-bold text-base">Bio-Activator</span>
                      </div>
                      <p className="text-sm text-white/80">
                        {lang === 'id' ? 'Aktivasi mikroba' : 'Microbe activation'}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                          <Shield className="h-5 w-5 text-[#004d1a]" />
                        </div>
                        <span className="font-bold text-base">100%</span>
                      </div>
                      <p className="text-sm text-white/80">
                        {lang === 'id' ? 'Aman teruji' : 'Tested safe'}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm italic pt-2">
                    {lang === 'id'
                      ? '✓ Bersertifikat Kementan RI • LeSOS Organic • SNI • TKDN 79.5%'
                      : '✓ Ministry Certified • LeSOS Organic • SNI • TKDN 79.5%'}
                  </p>
                </div>

                {/* Right Column - Stats & CTA */}
                <div className="md:col-span-2 space-y-6">
                  {/* Why Premium Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-2xl">
                    <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#FFD700]" />
                      {lang === 'id' ? 'Kenapa Premium?' : 'Why Premium?'}
                    </h4>
                    
                    <ul className="space-y-3">
                      {[
                        lang === 'id' ? 'Bio-aktivator eksklusif' : 'Exclusive bio-activator',
                        lang === 'id' ? 'Formula teroptimasi' : 'Optimized formula',
                        lang === 'id' ? 'Riset & pengembangan' : 'Research & development',
                        lang === 'id' ? 'Quality control ketat' : 'Strict quality control',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#006622] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust Indicators */}
                  <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <MapPin className="h-5 w-5 text-[#FFD700]" />
                        <span className="font-bold text-lg">19</span>
                        <span className="text-white/80">{lang === 'id' ? 'Provinsi' : 'Provinces'}</span>
                      </div>
                      <p className="text-xs text-white/60">
                        {lang === 'id' ? 'Jangkauan distribusi Indonesia' : 'Distribution reach Indonesia'}
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-5 rounded-xl transition-all hover:shadow-2xl hover:scale-105"
                    >
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-lg">
                        {lang === 'id' ? 'Konsultasi Premium' : 'Premium Consultation'}
                      </span>
                      <ChevronRight className="h-6 w-6" />
                    </Link>

                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-[#006622] font-bold px-8 py-4 rounded-xl transition-all border-2 border-white"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {lang === 'id' ? 'Dapatkan Harga Spesial' : 'Get Special Price'}
                    </Link>
                  </div>

                  <p className="text-white/50 text-xs text-center">
                    {lang === 'id'
                      ? '💎 Investasi terbaik untuk pertanian modern'
                      : '💎 Best investment for modern agriculture'}
                  </p>
                </div>
              </div>

              {/* Bottom Trust Bar */}
              <div className="pt-8 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#FFD700]" />
                    <span>{lang === 'id' ? 'Sertifikat Resmi' : 'Official Certified'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#FFD700]" />
                    <span>{lang === 'id' ? 'Standar SNI' : 'SNI Standard'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#FFD700]" />
                    <span>{lang === 'id' ? 'TKDN 79.5%' : 'TKDN 79.5%'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-[#FFD700]" />
                    <span>{lang === 'id' ? '100% Organik' : '100% Organic'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Documents & Certifications Section - RAJABIO Style 5-Card Grid */}
      <section className="bg-[#EEE] py-20">
        <ContainerSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'DOKUMEN & SERTIFIKASI' : 'DOCUMENTS & CERTIFICATIONS'}
            </span>
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
            <Link
              href={EXTERNAL_LINKS.brochure}
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo Kementerian Pertanian.png"
                    alt="Kementerian Pertanian RI"
                    width={96}
                    height={96}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
                    {lang === 'id' ? 'Kementerian Pertanian RI' : 'Ministry of Agriculture RI'}
                  </h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    03.02.2023.328
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
              href={EXTERNAL_LINKS.brochure}
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/Logo-Organik-Indonesia-01.png"
                    alt="LeSOS Organic Certificate"
                    width={96}
                    height={96}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
                    {lang === 'id' ? 'Sertifikat Organik LeSOS' : 'LeSOS Organic Certificate'}
                  </h3>
                  <p className="text-sm font-mono text-[#006622] font-semibold mb-3">
                    LSO-005-IDN
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
                <div className="w-24 h-24 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/SNI Logo.svg"
                    alt="SNI Standard"
                    width={96}
                    height={96}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
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

            {/* KAN Accreditation */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/KAN Logo.webp"
                    alt="KAN Accreditation"
                    width={96}
                    height={96}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
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
              href={EXTERNAL_LINKS.tkdn}
              target="_blank"
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <Image
                    src="/Certificate Logos/TKDN Logo.png"
                    alt="TKDN Certificate"
                    width={96}
                    height={96}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
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
                className="inline-flex items-center gap-3 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                <Download className="h-5 w-5" />
                {lang === 'id' ? 'Unduh Brosur Lengkap' : 'Download Complete Brochure'}
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
                {lang === 'id' ? 'Minta Laporan Uji' : 'Request Test Report'}
              </Link>
            </div>
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
          </div>

          <div className="max-w-3xl mx-auto">
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
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              {lang === 'id' 
                ? 'Masih ada pertanyaan? Hubungi tim kami!'
                : 'Still have questions? Contact our team!'}
            </p>
            <Link
              href={whatsappUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white transition-all hover:bg-[#20BD5A]"
            >
              <MessageCircle className="h-5 w-5" />
              {lang === 'id' ? 'Tanya via WhatsApp' : 'Ask via WhatsApp'}
            </Link>
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
                  {lang === 'id' ? 'TEKNOLOGI PREMIUM' : 'PREMIUM TECHNOLOGY'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                  {lang === 'id'
                    ? 'Teknologi Premium untuk Hasil Maksimal'
                    : 'Premium Technology for Maximum Results'}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {lang === 'id'
                    ? 'SIMBIOS menggunakan teknologi fermentasi terkini dengan TKDN 79.5%. Dengan efektivitas 122% RAE dan optimalisasi 70%, produk premium ini memberikan nilai investasi terbaik untuk pertanian modern Anda.'
                    : 'SIMBIOS uses the latest fermentation technology with 79.5% TKDN. With 122% RAE effectiveness and 70% optimization, this premium product provides the best investment value for your modern agriculture.'}
                </p>

                <div className="space-y-3 pt-4">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {lang === 'id' ? 'Konsultasi Premium Gratis' : 'Free Premium Consultation'}
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#004d1a] hover:bg-[#006622] text-white font-semibold px-8 py-4 rounded-xl transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {lang === 'id' ? 'Dapatkan Harga Spesial' : 'Get Special Price'}
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
                      <div className="text-3xl font-black text-gray-900 mb-1">70%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Optimalisasi Hasil' : 'Yield Optimization'}
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
                      <div className="text-3xl font-black text-gray-900 mb-1">122% RAE</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Efektivitas Relatif' : 'Relative Effectiveness'}
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
                      <div className="text-3xl font-black text-gray-900 mb-1">79.5%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'TKDN Indonesia' : 'Indonesian TKDN'}
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
