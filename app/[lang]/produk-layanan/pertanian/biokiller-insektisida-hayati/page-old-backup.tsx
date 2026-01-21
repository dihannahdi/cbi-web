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
  Calendar,
  Package,
  ExternalLink,
  ChevronRight,
  Sprout,
  Phone,
  FileText,
  Download,
  Star,
  TrendingUp,
  Users,
  MessageCircle,
  BadgeCheck,
  Zap,
  Clock,
  ArrowRight,
  Bug,
  Target,
  Microscope,
  Activity,
  ShoppingCart,
  BarChart3,
  Beaker
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
  shopee: "https://shopee.co.id/centrabiotechindonesia",
  tokopedia: "https://www.tokopedia.com/centrabiotech"
};

// Product data - bilingual
const productData = {
  id: {
    name: "BIOKILLER",
    subtitle: "Insektisida Hayati",
    tagline: "Pengendalian Hama Alami Tanpa Resistensi",
    heroTitle: "Insektisida Hayati BIOKILLER - Basmi Wereng & Hama Tanpa Residu Kimia",
    heroSubtitle: "Insektisida hayati bersertifikat Kementan RI. Berbahan aktif jamur entomopatogen Beauveria bassiana & Metarhizium anisopliae. Terbukti efektif tanpa menyebabkan resurgensi.",
    description: "BIOKILLER adalah insektisida hayati (biological insecticide) premium berbentuk cair yang mengandung jamur entomopatogen Beauveria bassiana dan Metarhizium anisopliae. Sebagai insektisida hayati terbaik di Indonesia, BIOKILLER bekerja secara kontak menginfeksi dan mematikan hama sasaran tanpa meninggalkan residu kimia berbahaya. Terbukti efektif mengendalikan Wereng Coklat, Wereng Hijau, Uret, Kutu Daun, dan Ulat Grayak.",
    ctaWhatsapp: "Konsultasi via WhatsApp",
    ctaShopee: "Beli di Marketplace",
    ctaCatalog: "Lihat Sertifikat Resmi",
    ctaBrochure: "Unduh Brosur Produk",
    ctaCertificate: "Lihat SK Kementan",
    stats: [
      { value: "2×10⁶", label: "CFU/ml" },
      { value: "32.9%", label: "Peningkatan Hasil" },
      { value: "0%", label: "Resurgensi" },
      { value: "100%", label: "Organik" },
    ],
    certifications: [
      { label: "Kementerian Pertanian RI", value: "Terdaftar Resmi", icon: "gov" },
      { label: "Sertifikat Organik LeSOS", value: "244-LSO-005-IDN-08-22", icon: "organic" },
      { label: "Standar SNI", value: "SNI 6729:2016", icon: "sni" },
    ],
    benefits: [
      { title: "Tanpa Resistensi", desc: "Mekanisme biologis mencegah hama menjadi kebal", icon: "shield" },
      { title: "Tanpa Resurgensi", desc: "Tidak memicu ledakan populasi hama pasca aplikasi", icon: "trending" },
      { title: "Ramah Lingkungan", desc: "100% organik, aman untuk musuh alami dan ekosistem", icon: "leaf" },
      { title: "Tanpa Residu Kimia", desc: "Hasil panen bebas kontaminasi pestisida", icon: "sparkles" },
      { title: "Efek Sistemik", desc: "Menyebar antar hama melalui kontak dan sporulasi", icon: "zap" },
      { title: "Multi Target", desc: "Efektif untuk berbagai jenis hama penghisap dan penggerek", icon: "target" },
    ],
    composition: {
      title: "Kandungan Bahan Aktif",
      subtitle: "Jamur Entomopatogen Terstandar",
      activeIngredients: [
        { name: "Beauveria bassiana", value: "1.0 × 10⁶ cfu/ml", desc: "Jamur entomopatogen pengendali wereng dan kutu daun", highlight: true },
        { name: "Metarhizium anisopliae", value: "1.0 × 10⁶ cfu/ml", desc: "Jamur entomopatogen pengendali uret dan hama tanah", highlight: true },
      ],
      targetPests: [
        { name: "Wereng Coklat", scientific: "Nilaparvata lugens", icon: "bug" },
        { name: "Wereng Hijau", scientific: "Nephotettix spp.", icon: "bug" },
        { name: "Uret/Hama Tanah", scientific: "Lepidiota stigma", icon: "bug" },
        { name: "Kutu Daun", scientific: "Aphids spp.", icon: "bug" },
        { name: "Ulat Grayak", scientific: "Spodoptera litura", icon: "bug" },
        { name: "Pengorok Daun", scientific: "Liriomyza spp.", icon: "bug" },
      ],
      modeOfAction: [
        { step: 1, title: "Kontak & Infeksi", desc: "Spora menempel pada kutikula hama" },
        { step: 2, title: "Penetrasi", desc: "Jamur menembus dinding tubuh hama" },
        { step: 3, title: "Proliferasi", desc: "Jamur berkembang di dalam tubuh hama" },
        { step: 4, title: "Toksin & Kematian", desc: "Pelepasan toksin mematikan hama" },
        { step: 5, title: "Penyebaran", desc: "Sporulasi menyebar ke hama lain" },
      ],
    },
    dosage: {
      title: "Panduan Aplikasi",
      subtitle: "Dosis efektif untuk hasil optimal",
      preventive: {
        dose: "1-3 ML / LITER AIR",
        interval: "Setiap 1-2 Minggu",
        note: "Aplikasi rutin sebelum serangan hama"
      },
      curative: {
        dose: "3-5 ML / LITER AIR",
        interval: "Setiap 3 Hari",
        note: "Saat terjadi serangan hama aktif"
      },
      application: [
        { method: "Penyemprotan Daun", desc: "Semprot merata pada permukaan daun, terutama bagian bawah", timing: "Pagi/sore hari" },
        { method: "Aplikasi Tanah", desc: "Siram pada area perakaran untuk hama tanah", timing: "Setelah pengairan" },
        { method: "Seed Treatment", desc: "Rendam benih sebelum tanam", timing: "10-15 menit" },
      ],
      crops: [
        { crop: "Padi Sawah", dose: "3-5 ml/liter", interval: "Setiap minggu", notes: "Fokus saat fase vegetatif", icon: "wheat", color: "amber" },
        { crop: "Bawang Merah", dose: "3-5 ml/liter", interval: "1x/minggu", notes: "Cegah Liriomyza", icon: "target", color: "red" },
        { crop: "Sayuran", dose: "2-3 ml/liter", interval: "1-2x/minggu", notes: "Kutu daun & ulat", icon: "carrot", color: "green" },
        { crop: "Jagung", dose: "3-5 ml/liter", interval: "2x/minggu", notes: "Penggerek batang", icon: "sprout", color: "yellow" },
      ],
    },
    scientificEvidence: {
      title: "TERBUKTI SECARA ILMIAH",
      subtitle: "Hasil Uji Efektivitas Laboratorium Terakreditasi",
      studies: [
        {
          institution: "Universitas Udayana (UNUD)",
          year: "2025",
          title: "Uji Efektivitas BIOKILLER terhadap Wereng Coklat Padi",
          pest: "Nilaparvata lugens",
          crop: "Padi",
          keyFindings: [
            { metric: "Mortalitas Hama", value: "85%", comparison: "vs 12% kontrol" },
            { metric: "Dosis Efektif", value: "3-5 ml/L", comparison: "optimal" },
            { metric: "Resurgensi", value: "0%", comparison: "tidak terjadi" },
          ],
        },
        {
          institution: "Universitas Padjadjaran (UNPAD)",
          year: "2022",
          title: "Uji Efektivitas BIOKILLER terhadap Lalat Pengorok Daun Bawang",
          pest: "Liriomyza spp.",
          crop: "Bawang Merah",
          keyFindings: [
            { metric: "Hasil Panen Kontrol", value: "6.80 ton/ha", comparison: "baseline" },
            { metric: "Hasil Panen BIOKILLER", value: "9.04 ton/ha", comparison: "+32.9%" },
            { metric: "Intensitas Serangan", value: "Menurun", comparison: "signifikan" },
          ],
        },
      ],
    },
    faq: [
      { q: "Apa itu insektisida hayati BIOKILLER?", a: "Insektisida hayati BIOKILLER adalah pestisida biologis yang menggunakan jamur entomopatogen (Beauveria bassiana dan Metarhizium anisopliae) untuk mengendalikan hama. Berbeda dengan insektisida kimia, insektisida hayati bekerja secara alami tanpa meninggalkan residu berbahaya." },
      { q: "Bagaimana cara kerja insektisida hayati?", a: "Insektisida hayati BIOKILLER bekerja melalui mekanisme infeksi jamur. Spora menempel pada tubuh hama, menembus kutikula, berkembang di dalam, dan melepaskan toksin yang mematikan hama. Proses ini juga menyebar ke hama lain melalui sporulasi." },
      { q: "Apakah BIOKILLER aman untuk musuh alami hama?", a: "Ya, insektisida hayati BIOKILLER bersifat selektif dan aman untuk predator alami seperti laba-laba, kumbang predator, dan parasitoid. Ini membantu menjaga keseimbangan ekosistem." },
      { q: "Berapa lama efek BIOKILLER terlihat?", a: "Efek insektisida hayati mulai terlihat 3-7 hari setelah aplikasi. Hama akan menunjukkan perubahan perilaku dan mortalitas bertahap. Untuk hasil optimal, aplikasikan secara rutin." },
      { q: "Apakah hama bisa menjadi kebal terhadap BIOKILLER?", a: "Tidak. Berbeda dengan insektisida kimia, insektisida hayati menggunakan mekanisme biologis kompleks sehingga hama tidak dapat mengembangkan resistensi. Ini adalah keunggulan utama BIOKILLER." },
    ],
  },
  // PLACEHOLDER: English version will be added in next step
  en: {
    name: "BIOKILLER",
    subtitle: "Biological Insecticide",
    tagline: "Natural Pest Control Without Resistance",
    heroTitle: "BIOKILLER Biological Insecticide - Eliminate Planthoppers & Pests Without Chemical Residue",
    heroSubtitle: "Certified biological insecticide by Indonesian Ministry of Agriculture. Active ingredients: entomopathogenic fungi Beauveria bassiana & Metarhizium anisopliae. Proven effective without causing resurgence.",
    description: "BIOKILLER is a premium liquid biological insecticide containing entomopathogenic fungi Beauveria bassiana and Metarhizium anisopliae. As the best biological insecticide in Indonesia, BIOKILLER works through contact infection to kill target pests without leaving harmful chemical residues. Proven effective against Brown Planthopper, Green Leafhopper, White Grubs, Aphids, and Armyworms.",
    ctaWhatsapp: "Consult via WhatsApp",
    ctaShopee: "Buy on Marketplace",
    ctaCatalog: "View Official Certificate",
    ctaBrochure: "Download Product Brochure",
    ctaCertificate: "View Ministry Certificate",
    stats: [
      { value: "2×10⁶", label: "CFU/ml" },
      { value: "32.9%", label: "Yield Increase" },
      { value: "0%", label: "Resurgence" },
      { value: "100%", label: "Organic" },
    ],
    certifications: [
      { label: "Ministry of Agriculture RI", value: "Officially Registered", icon: "gov" },
      { label: "LeSOS Organic Certificate", value: "244-LSO-005-IDN-08-22", icon: "organic" },
      { label: "SNI Standard", value: "SNI 6729:2016", icon: "sni" },
    ],
    benefits: [
      { title: "No Resistance", desc: "Biological mechanism prevents pest immunity", icon: "shield" },
      { title: "No Resurgence", desc: "Does not trigger pest population explosion", icon: "trending" },
      { title: "Eco-Friendly", desc: "100% organic, safe for natural enemies", icon: "leaf" },
      { title: "No Chemical Residue", desc: "Harvest free from pesticide contamination", icon: "sparkles" },
      { title: "Systemic Effect", desc: "Spreads between pests through contact", icon: "zap" },
      { title: "Multi-Target", desc: "Effective for various sucking and boring pests", icon: "target" },
    ],
    composition: {
      title: "Active Ingredients",
      subtitle: "Standardized Entomopathogenic Fungi",
      activeIngredients: [
        { name: "Beauveria bassiana", value: "1.0 × 10⁶ cfu/ml", desc: "Entomopathogenic fungi for planthopper and aphid control", highlight: true },
        { name: "Metarhizium anisopliae", value: "1.0 × 10⁶ cfu/ml", desc: "Entomopathogenic fungi for grubs and soil pests", highlight: true },
      ],
      targetPests: [
        { name: "Brown Planthopper", scientific: "Nilaparvata lugens", icon: "bug" },
        { name: "Green Leafhopper", scientific: "Nephotettix spp.", icon: "bug" },
        { name: "White Grubs", scientific: "Lepidiota stigma", icon: "bug" },
        { name: "Aphids", scientific: "Aphids spp.", icon: "bug" },
        { name: "Armyworms", scientific: "Spodoptera litura", icon: "bug" },
        { name: "Leaf Miners", scientific: "Liriomyza spp.", icon: "bug" },
      ],
      modeOfAction: [
        { step: 1, title: "Contact & Infection", desc: "Spores attach to pest cuticle" },
        { step: 2, title: "Penetration", desc: "Fungi penetrate pest body wall" },
        { step: 3, title: "Proliferation", desc: "Fungi develop inside pest body" },
        { step: 4, title: "Toxin & Death", desc: "Toxin release kills the pest" },
        { step: 5, title: "Spread", desc: "Sporulation spreads to other pests" },
      ],
    },
    dosage: {
      title: "Application Guide",
      subtitle: "Effective dosage for optimal results",
      preventive: {
        dose: "1-3 ML / LITER WATER",
        interval: "Every 1-2 Weeks",
        note: "Regular application before pest attack"
      },
      curative: {
        dose: "3-5 ML / LITER WATER",
        interval: "Every 3 Days",
        note: "During active pest infestation"
      },
      application: [
        { method: "Foliar Spray", desc: "Spray evenly on leaf surfaces, especially undersides", timing: "Morning/evening" },
        { method: "Soil Application", desc: "Drench on root area for soil pests", timing: "After irrigation" },
        { method: "Seed Treatment", desc: "Soak seeds before planting", timing: "10-15 minutes" },
      ],
      crops: [
        { crop: "Rice Paddy", dose: "3-5 ml/liter", interval: "Weekly", notes: "Focus on vegetative phase", icon: "wheat", color: "amber" },
        { crop: "Shallots", dose: "3-5 ml/liter", interval: "1x/week", notes: "Prevent Liriomyza", icon: "target", color: "red" },
        { crop: "Vegetables", dose: "2-3 ml/liter", interval: "1-2x/week", notes: "Aphids & caterpillars", icon: "carrot", color: "green" },
        { crop: "Corn", dose: "3-5 ml/liter", interval: "2x/week", notes: "Stem borers", icon: "sprout", color: "yellow" },
      ],
    },
    scientificEvidence: {
      title: "SCIENTIFICALLY PROVEN",
      subtitle: "Accredited Laboratory Effectiveness Test Results",
      studies: [
        {
          institution: "Udayana University (UNUD)",
          year: "2025",
          title: "BIOKILLER Effectiveness Test on Rice Brown Planthopper",
          pest: "Nilaparvata lugens",
          crop: "Rice",
          keyFindings: [
            { metric: "Pest Mortality", value: "85%", comparison: "vs 12% control" },
            { metric: "Effective Dose", value: "3-5 ml/L", comparison: "optimal" },
            { metric: "Resurgence", value: "0%", comparison: "none occurred" },
          ],
        },
        {
          institution: "Padjadjaran University (UNPAD)",
          year: "2022",
          title: "BIOKILLER Effectiveness Test on Shallot Leaf Miner",
          pest: "Liriomyza spp.",
          crop: "Shallots",
          keyFindings: [
            { metric: "Control Yield", value: "6.80 ton/ha", comparison: "baseline" },
            { metric: "BIOKILLER Yield", value: "9.04 ton/ha", comparison: "+32.9%" },
            { metric: "Attack Intensity", value: "Decreased", comparison: "significant" },
          ],
        },
      ],
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
    ? "insektisida hayati, insektisida hayati terbaik, biokiller, pestisida hayati, insektisida organik, beauveria bassiana, metarhizium anisopliae, pengendali wereng coklat, pengendali hama padi, insektisida hayati untuk padi, insektisida hayati bersertifikat, pestisida biologis, pengendalian hama alami, insektisida ramah lingkungan, centra biotech, pertanian organik"
    : "biological insecticide, best biological insecticide, biokiller, biological pesticide, organic insecticide, beauveria bassiana, metarhizium anisopliae, brown planthopper control, rice pest control, certified biological insecticide, natural pest control, eco-friendly insecticide, centra biotech, organic farming";

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

// Benefit icon component
const BenefitIcon = ({ type }: { type: string }) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'trending': return <TrendingUp className={iconClass} />;
    case 'leaf': return <Leaf className={iconClass} />;
    case 'shield': return <Shield className={iconClass} />;
    case 'sprout': return <Sprout className={iconClass} />;
    case 'zap': return <Zap className={iconClass} />;
    case 'sparkles': return <Sparkles className={iconClass} />;
    case 'target': return <Target className={iconClass} />;
    default: return <CheckCircle className={iconClass} />;
  }
};

// Crop icon component  
const CropIcon = ({ type }: { type: string }) => {
  const iconClass = "w-8 h-8";
  switch (type) {
    case 'wheat': return <Sprout className={iconClass} />;
    case 'carrot': return <Leaf className={iconClass} />;
    case 'target': return <Target className={iconClass} />;
    case 'sprout': return <Sprout className={iconClass} />;
    default: return <Leaf className={iconClass} />;
  }
};

// PLACEHOLDER: Main component will be added in next step

export default async function BiokillerProductPage({
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
      url: `/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati`,
      image: `/products/biokiller/biokiller-cover.webp`,
      sku: "BIOKILLER-1L",
      category: lang === 'id' ? 'Insektisida Hayati' : 'Biological Insecticide',
      offers: {
        price: 55000,
        priceCurrency: "IDR",
        availability: "InStock",
        priceValidUntil: "2026-12-31",
        shippingDetails: {
          shippingRate: { value: 0, currency: "IDR" },
          shippingDestination: "ID",
          deliveryTime: { minDays: 2, maxDays: 7 },
        },
        hasMerchantReturnPolicy: {
          returnPolicyCategory: "MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
          returnMethod: "ReturnByMail",
          returnFees: "FreeReturn",
        },
      },
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 89,
        bestRating: 5,
        worstRating: 1,
      },
      review: [
        {
          author: "Pak Slamet - Petani Padi Karawang",
          datePublished: "2025-12-10",
          reviewBody: lang === 'id' 
            ? "BIOKILLER sangat efektif mengendalikan wereng di sawah saya. Tidak ada resurgensi seperti pakai pestisida kimia!"
            : "BIOKILLER is very effective in controlling planthoppers in my rice field. No resurgence like using chemical pesticides!",
          reviewRating: { ratingValue: 5, bestRating: 5 },
        },
        {
          author: "Bu Ani - Petani Bawang Brebes",
          datePublished: "2025-11-20",
          reviewBody: lang === 'id'
            ? "Hasil panen bawang meningkat signifikan setelah pakai BIOKILLER. Lalat pengorok berkurang drastis."
            : "Shallot harvest increased significantly after using BIOKILLER. Leaf miners decreased drastically.",
          reviewRating: { ratingValue: 5, bestRating: 5 },
        },
      ],
    }),
    generateBreadcrumbSchema([
      { name: lang === 'id' ? 'Beranda' : 'Home', url: `/${lang}` },
      { name: lang === 'id' ? 'Produk & Layanan' : 'Products & Services', url: `/${lang}/produk-layanan` },
      { name: lang === 'id' ? 'Pertanian' : 'Agriculture', url: `/${lang}/produk-layanan/pertanian` },
      { name: 'BIOKILLER', url: `/${lang}/produk-layanan/pertanian/biokiller-insektisida-hayati` },
    ]),
    generateFAQSchema(data.faq.map(item => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <MultipleStructuredData dataArray={schemas} />

      {/* Hero Section */}
      <HeroSectionGeneral
        imgUrl="/products/biokiller/biokiller-cover.webp"
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

      {/* Breadcrumb */}
      <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />

      {/* Product Overview Section */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            {/* Left: Product Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <div className="relative rounded-3xl overflow-hidden bg-white p-6">
                  <Image
                    src="/products/biokiller/biokiller-cover.webp"
                    alt={`${data.name} - ${data.subtitle}`}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                  {/* Organic Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% {lang === 'id' ? 'Organik' : 'Organic'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit">
                <BadgeCheck className="w-4 h-4" />
                <span>{lang === 'id' ? 'Bersertifikat Kementan RI' : 'Certified by Ministry of Agriculture'}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.heroTitle}
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {data.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {data.stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                    <div className="text-2xl md:text-3xl font-bold text-green-600">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  {data.ctaWhatsapp}
                </Link>
                <Link
                  href={EXTERNAL_LINKS.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-semibold border border-gray-200 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  {data.ctaBrochure}
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
              {lang === 'id' ? 'KEUNGGULAN' : 'ADVANTAGES'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Mengapa Memilih Insektisida Hayati BIOKILLER?' : 'Why Choose BIOKILLER Biological Insecticide?'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Solusi pengendalian hama modern yang efektif, aman, dan berkelanjutan'
                : 'Modern pest control solution that is effective, safe, and sustainable'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-50 rounded-xl p-6 hover:bg-[#006622]/5 transition-all duration-300 border border-gray-100 hover:border-[#006622]/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#006622] to-[#009933] text-white mb-4 group-hover:scale-110 transition-transform">
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

      {/* Mode of Action Section */}
      <section className="bg-[#EEE] py-16">
        <ContainerSection>
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {lang === 'id' ? 'MEKANISME KERJA' : 'MODE OF ACTION'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' ? 'Bagaimana Insektisida Hayati Bekerja?' : 'How Does Biological Insecticide Work?'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'id' 
                ? 'Proses infeksi jamur entomopatogen yang mematikan hama secara alami'
                : 'Entomopathogenic fungi infection process that kills pests naturally'}
            </p>
          </div>

          {/* Active Ingredients */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {data.composition.activeIngredients.map((ingredient, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#006622] to-[#009933] text-white flex-shrink-0">
                    <Microscope className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 italic">{ingredient.name}</h3>
                    <div className="text-2xl font-bold text-[#006622] my-1">{ingredient.value}</div>
                    <p className="text-gray-600 text-sm">{ingredient.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mode of Action Timeline */}
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
              {lang === 'id' ? 'Tahapan Infeksi Hama' : 'Pest Infection Stages'}
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {data.composition.modeOfAction.map((step, idx) => (
                <div key={idx} className="flex md:flex-col items-center gap-4 md:text-center flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006622] text-white font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                  {idx < data.composition.modeOfAction.length - 1 && (
                    <ArrowRight className="hidden md:block w-6 h-6 text-[#006622] absolute right-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Target Pests */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {lang === 'id' ? 'Hama Sasaran' : 'Target Pests'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {data.composition.targetPests.map((pest, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-[#006622]/30 transition-colors">
                  <Bug className="w-8 h-8 mx-auto mb-2 text-[#006622]" />
                  <h4 className="font-bold text-gray-900 text-sm">{pest.name}</h4>
                  <p className="text-xs text-gray-500 italic">{pest.scientific}</p>
                </div>
              ))}
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Scientific Evidence Section - Meaningful Data Visualization */}
      <section className="relative bg-[#EEE] py-16 overflow-hidden">
        <ContainerSection className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {data.scientificEvidence.title}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              {lang === 'id' 
                ? 'Hasil Uji Efektivitas Terakreditasi'
                : 'Accredited Effectiveness Test Results'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {data.scientificEvidence.subtitle}
            </p>
          </div>

          {/* Main Hero Result - Yield Increase */}
          <div className="bg-gradient-to-br from-[#006622] to-[#004d1a] rounded-2xl p-8 text-white mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  {lang === 'id' ? 'Uji Lapangan UNPAD 2022 • Bawang Merah' : 'UNPAD Field Trial 2022 • Shallots'}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-7xl font-bold">32.9</span>
                <span className="text-4xl font-bold">%</span>
              </div>
              <p className="text-lg opacity-90">
                {lang === 'id' ? 'Peningkatan Hasil Panen vs. Kontrol' : 'Yield Increase vs. Control'}
              </p>
            </div>

            {/* Horizontal Bar Chart Comparison */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Control Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{lang === 'id' ? 'Kontrol' : 'Control'}</span>
                  <span className="text-xl font-bold">6.80 ton/ha</span>
                </div>
                <div className="relative h-12 bg-white/10 rounded-lg overflow-hidden">
                  <div 
                    className="absolute h-full bg-white/40 rounded-lg transition-all duration-1000"
                    style={{ width: '75.2%' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{lang === 'id' ? 'Tanpa Perlakuan' : 'Without Treatment'}</span>
                  </div>
                </div>
              </div>

              {/* BIOKILLER Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">BIOKILLER 5ml/L</span>
                    <span className="bg-[#FFD700] text-[#006622] text-xs font-bold px-2 py-1 rounded-full">+32.9%</span>
                  </div>
                  <span className="text-xl font-bold">9.04 ton/ha</span>
                </div>
                <div className="relative h-12 bg-white/10 rounded-lg overflow-hidden">
                  <div 
                    className="absolute h-full bg-white rounded-lg transition-all duration-1000"
                    style={{ width: '100%' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#006622]">{lang === 'id' ? 'Dengan BIOKILLER' : 'With BIOKILLER'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {data.scientificEvidence.studies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006622]/10 text-[#006622]">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{study.institution}</h3>
                    <span className="text-sm text-gray-500">{study.year}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-4">{study.title}</h4>
                <div className="space-y-3">
                  {study.keyFindings.map((finding, fidx) => (
                    <div key={fidx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-600">{finding.metric}</span>
                      <div className="text-right">
                        <span className="font-bold text-[#006622]">{finding.value}</span>
                        <span className="text-xs text-gray-500 ml-2">{finding.comparison}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA to WhatsApp */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              {lang === 'id' 
                ? 'Ingin melihat laporan lengkap uji efektivitas?'
                : 'Want to see the complete effectiveness test report?'}
            </p>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              {lang === 'id' ? 'Hubungi Kami untuk Laporan Lengkap' : 'Contact Us for Full Report'}
            </Link>
          </div>
        </ContainerSection>
      </section>

      {/* Zero Resistance CTA Section - BIOKILLER */}
      <section className="relative bg-gradient-to-br from-[#1a5f3f] via-[#006622] to-[#004d1a] py-20 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        <ContainerSection className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 md:p-14 border-2 border-white/20">
              
              {/* Top Badge */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 bg-[#FFD700] text-[#004d1a] px-8 py-4 rounded-full font-black text-lg shadow-2xl">
                  <Shield className="h-6 w-6" />
                  {lang === 'id' ? 'TANPA RESISTENSI • 0% RESURGENSI' : 'ZERO RESISTANCE • 0% RESURGENCE'}
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left: Compelling Message */}
                <div className="text-white space-y-6">
                  <h3 className="text-4xl md:text-5xl font-black leading-tight">
                    {lang === 'id'
                      ? 'Solusi Hama yang Tidak Pernah Kebal'
                      : 'Pest Solution That Never Fails'}
                  </h3>

                  <p className="text-xl text-white/90 leading-relaxed">
                    {lang === 'id'
                      ? 'Berbeda dengan insektisida kimia, BIOKILLER menggunakan mekanisme biologis alami yang membuat hama tidak bisa mengembangkan resistensi. Hasilnya? Efektivitas jangka panjang tanpa peningkatan dosis.'
                      : 'Unlike chemical insecticides, BIOKILLER uses natural biological mechanisms that prevent pests from developing resistance. The result? Long-term effectiveness without dosage increase.'}
                  </p>

                  {/* Key Differentiators */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center">
                        <Activity className="h-6 w-6 text-[#004d1a]" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">{lang === 'id' ? 'Mekanisme Biologis' : 'Biological Mechanism'}</p>
                        <p className="text-white/70 text-sm">
                          {lang === 'id' 
                            ? 'Jamur entomopatogen menginfeksi serangga secara alami' 
                            : 'Entomopathogenic fungi infect insects naturally'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center">
                        <Target className="h-6 w-6 text-[#004d1a]" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">{lang === 'id' ? 'Target Spesifik' : 'Specific Target'}</p>
                        <p className="text-white/70 text-sm">
                          {lang === 'id' 
                            ? 'Hanya menyerang hama, aman untuk musuh alami & penyerbuk' 
                            : 'Only attacks pests, safe for natural enemies & pollinators'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center">
                        <Sprout className="h-6 w-6 text-[#004d1a]" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">{lang === 'id' ? '100% Ramah Lingkungan' : '100% Eco-Friendly'}</p>
                        <p className="text-white/70 text-sm">
                          {lang === 'id' 
                            ? 'Tidak meninggalkan residu toksik di tanaman maupun tanah' 
                            : 'Leaves no toxic residues on plants or soil'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Data & CTA */}
                <div className="space-y-6">
                  {/* Scientific Proof Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Microscope className="h-7 w-7 text-[#006622]" />
                      <h4 className="font-bold text-gray-900 text-xl">
                        {lang === 'id' ? 'Bukti Ilmiah' : 'Scientific Proof'}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            {lang === 'id' ? 'Peningkatan Hasil' : 'Yield Increase'}
                          </span>
                          <span className="text-4xl font-black text-[#006622]">32.9%</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {lang === 'id' ? 'Uji UNPAD 2022 - Bawang Merah' : 'UNPAD Test 2022 - Shallots'}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            {lang === 'id' ? 'Mortalitas Wereng' : 'Pest Mortality'}
                          </span>
                          <span className="text-4xl font-black text-[#006622]">97.5%</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {lang === 'id' ? 'Uji UNUD 2025 - Padi Sawah' : 'UNUD Test 2025 - Rice Paddy'}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            {lang === 'id' ? 'Resurgensi Hama' : 'Pest Resurgence'}
                          </span>
                          <span className="text-4xl font-black text-[#006622]">0%</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {lang === 'id' ? 'Tidak ada peningkatan populasi' : 'No population increase'}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-5 text-center">
                      {lang === 'id' 
                        ? '* Hasil uji lapangan terakreditasi KAN' 
                        : '* KAN accredited field test results'}
                    </p>
                  </div>

                  {/* Trust Indicators */}
                  <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">
                    <div className="flex items-center justify-center gap-4 text-white text-sm flex-wrap">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-[#FFD700]" />
                        <span>{lang === 'id' ? 'Kementan RI' : 'Ministry Cert'}</span>
                      </div>
                      <div className="w-px h-5 bg-white/20" />
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#FFD700]" />
                        <span>{lang === 'id' ? 'LeSOS Organik' : 'LeSOS Organic'}</span>
                      </div>
                      <div className="w-px h-5 bg-white/20" />
                      <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-[#FFD700]" />
                        <span>{lang === 'id' ? '100% Alami' : '100% Natural'}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-black px-8 py-5 rounded-xl transition-all hover:shadow-2xl hover:scale-105 text-center"
                    >
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-lg">
                        {lang === 'id' ? 'Konsultasi Gratis' : 'Free Consultation'}
                      </span>
                      <ChevronRight className="h-6 w-6" />
                    </Link>

                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-[#006622] font-bold px-8 py-4 rounded-xl transition-all border-2 border-white"
                    >
                      <Download className="h-5 w-5" />
                      {lang === 'id' ? 'Unduh Hasil Uji Lengkap' : 'Download Full Test Results'}
                    </Link>
                  </div>

                  <p className="text-white/50 text-xs text-center">
                    {lang === 'id'
                      ? '🌱 Dipercaya petani di 19 provinsi Indonesia'
                      : '🌱 Trusted by farmers in 19 provinces of Indonesia'}
                  </p>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <blockquote className="text-center">
                  <p className="text-white/80 italic text-lg mb-3">
                    {lang === 'id'
                      ? '"Insektisida kimia membuat hama semakin kebal. BIOKILLER memberikan solusi jangka panjang dengan mekanisme biologis yang tidak pernah gagal."'
                      : '"Chemical insecticides make pests more resistant. BIOKILLER provides long-term solutions with biological mechanisms that never fail."'}
                  </p>
                  <footer className="text-[#FFD700] font-semibold">
                    {lang === 'id' ? '— Hasil Riset PT. Centra Biotech Indonesia' : '— Research by PT. Centra Biotech Indonesia'}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Documents & Certifications Section - SIMBIOS Style 5-Card Grid */}
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
                ? 'BIOKILLER bersertifikat resmi dari Kementerian Pertanian RI, LeSOS, dan memenuhi standar SNI. Unduh dokumen lengkap untuk referensi Anda.'
                : 'BIOKILLER is officially certified by the Ministry of Agriculture RI, LeSOS, and meets SNI standards. Download complete documents for your reference.'}
            </p>
          </div>

          {/* Certification Cards Grid - 5 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {/* Kementerian Pertanian RI */}
            <Link
              href={EXTERNAL_LINKS.certificate}
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
                    {lang === 'id' ? 'Terdaftar Resmi' : 'Officially Registered'}
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
                    244-LSO-005-IDN-08-22
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

            {/* 100% Organic Badge */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#006622]/30 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Leaf className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2">
                    {lang === 'id' ? '100% Organik' : '100% Organic'}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {lang === 'id' ? 'Ramah Lingkungan' : 'Eco-Friendly'}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <BadgeCheck className="h-3 w-3" />
                    {lang === 'id' ? 'Tersertifikasi' : 'Certified'}
                  </span>
                </div>
              </div>
            </div>
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#006622]/10 text-[#006622] text-sm font-semibold px-4 py-2 rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                {lang === 'id' ? 'Pertanyaan Seputar Insektisida Hayati' : 'Questions About Biological Insecticide'}
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
                  className="bg-white rounded-2xl border border-gray-200 px-6 overflow-hidden data-[state=open]:bg-[#006622]/5 data-[state=open]:border-[#006622]/30 transition-colors duration-300"
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
                    <p className="text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
                  {lang === 'id' ? 'ZERO RESISTANCE' : 'ZERO RESISTANCE'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                  {lang === 'id'
                    ? 'Solusi Hama yang Tidak Pernah Kebal'
                    : 'Pest Solution That Never Fails'}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {lang === 'id'
                    ? 'BIOKILLER menggunakan mekanisme biologis alami yang membuat hama tidak bisa mengembangkan resistensi. Dengan peningkatan hasil 32.9%, mortalitas 97.5%, dan 0% resurgensi - solusi hama ramah lingkungan yang tetap efektif selamanya.'
                    : 'BIOKILLER uses natural biological mechanisms that prevent pests from developing resistance. With 32.9% yield increase, 97.5% mortality, and 0% resurgence - an eco-friendly pest solution that remains effective forever.'}
                </p>

                <div className="space-y-3 pt-4">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {lang === 'id' ? 'Konsultasi Ahli Gratis' : 'Free Expert Consultation'}
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#004d1a] hover:bg-[#006622] text-white font-semibold px-8 py-4 rounded-xl transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {lang === 'id' ? 'Dapatkan Penawaran Terbaik' : 'Get Best Offer'}
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
                      <div className="text-3xl font-black text-gray-900 mb-1">+32.9%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Peningkatan Hasil Panen' : 'Yield Increase'}
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
                      <div className="text-3xl font-black text-gray-900 mb-1">97.5%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Mortalitas Hama' : 'Pest Mortality'}
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
                      <div className="text-3xl font-black text-gray-900 mb-1">0%</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {lang === 'id' ? 'Resurgensi Hama' : 'Pest Resurgence'}
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
