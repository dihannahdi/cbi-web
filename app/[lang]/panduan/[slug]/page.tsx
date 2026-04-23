import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { SITE_CONFIG, cleanMetaDescription, truncateTitle } from "@/utils/seo";
import {
  generateLearningResourceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  MultipleStructuredData,
} from "@/utils/structuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  ChevronRight,
  Leaf,
  Shield,
  Droplets,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Package,
  Users,
  Award,
} from "lucide-react";

// ============================================
// PILLAR PAGE CONTENT DATA
// ============================================

interface PillarContent {
  slug: string;
  locale: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  introduction: string;
  sections: {
    title: string;
    content: string;
    icon?: React.ReactNode;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedProducts: {
    name: string;
    slug: string;
    description: string;
    image: string;
  }[];
  relatedArticles: {
    title: string;
    slug: string;
    description: string;
  }[];
  ctaWhatsapp: string;
}

// PILLAR CONTENT DATABASE - This should eventually move to Strapi CMS
const PILLAR_CONTENT: Record<string, PillarContent> = {
  // =====================================
  // PUPUK HAYATI CAIR - Indonesian
  // =====================================
  "pupuk-hayati-cair-id": {
    slug: "pupuk-hayati-cair",
    locale: "id",
    title: "Panduan Lengkap Pupuk Hayati Cair",
    subtitle: "Solusi Biologis untuk Pertanian Modern Indonesia",
    metaTitle: "Pupuk Hayati Cair: Panduan Lengkap 2026 | Centra Biotech Indonesia",
    metaDescription: "Pelajari semua tentang pupuk hayati cair: pengertian, jenis, cara kerja, manfaat, dosis, dan rekomendasi produk terbaik. Panduan lengkap dari ahli mikrobiologi pertanian.",
    keywords: ["pupuk hayati cair", "pupuk hayati cair terbaik", "jual pupuk hayati cair", "dosis pupuk hayati cair", "manfaat pupuk hayati cair", "cara aplikasi pupuk hayati cair"],
    heroImage: "/images/pillar/pupuk-hayati-cair-hero.webp",
    introduction: `
      <p class="text-lg leading-relaxed">
        <strong>Pupuk hayati cair</strong> adalah pupuk yang mengandung mikroorganisme bermanfaat dalam bentuk cair, 
        yang dapat meningkatkan kesuburan tanah dan produktivitas tanaman secara alami. Berbeda dengan pupuk kimia, 
        pupuk hayati cair bekerja dengan bantuan mikroba hidup yang membantu tanaman menyerap nutrisi lebih efisien.
      </p>
      <p class="text-lg leading-relaxed mt-4">
        Di Indonesia, penggunaan pupuk hayati cair semakin populer karena mampu mengurangi ketergantungan pada 
        pupuk kimia hingga 50%, sekaligus memperbaiki struktur tanah yang telah rusak akibat penggunaan pupuk 
        sintetis berlebihan selama puluhan tahun.
      </p>
    `,
    sections: [
      {
        title: "Apa Itu Pupuk Hayati Cair?",
        content: `
          <p>Pupuk hayati cair adalah formulasi pupuk berbasis mikroorganisme menguntungkan (beneficial microorganisms) 
          dalam medium cair. Mikroorganisme ini mencakup bakteri penambat nitrogen (Azotobacter, Rhizobium), 
          bakteri pelarut fosfat (Bacillus, Pseudomonas), dan fungi mikoriza.</p>
          
          <h4 class="font-bold mt-4 mb-2">Komposisi Umum Pupuk Hayati Cair:</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Bakteri Penambat Nitrogen:</strong> Mengikat N₂ dari udara menjadi tersedia untuk tanaman</li>
            <li><strong>Bakteri Pelarut Fosfat:</strong> Mengubah P terikat menjadi P tersedia</li>
            <li><strong>Bakteri Penghasil Hormon:</strong> Memproduksi IAA, giberelin untuk pertumbuhan</li>
            <li><strong>Medium Cair:</strong> Air steril dengan nutrisi untuk menjaga viabilitas mikroba</li>
          </ul>
        `,
      },
      {
        title: "Manfaat Pupuk Hayati Cair untuk Pertanian",
        content: `
          <div class="grid md:grid-cols-2 gap-4 mt-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h5 class="font-bold text-green-700">🌱 Untuk Tanaman</h5>
              <ul class="list-disc pl-4 mt-2 space-y-1 text-sm">
                <li>Meningkatkan hasil panen 15-30%</li>
                <li>Mempercepat pertumbuhan akar</li>
                <li>Meningkatkan ketahanan terhadap penyakit</li>
                <li>Memperbaiki kualitas buah/biji</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h5 class="font-bold text-blue-700">🌍 Untuk Tanah</h5>
              <ul class="list-disc pl-4 mt-2 space-y-1 text-sm">
                <li>Memperbaiki struktur tanah</li>
                <li>Meningkatkan aktivitas mikroba tanah</li>
                <li>Mengurangi pencemaran tanah</li>
                <li>Rehabilitasi lahan terdegradasi</li>
              </ul>
            </div>
          </div>
          
          <h4 class="font-bold mt-6 mb-2">Keunggulan Dibanding Pupuk Kimia:</h4>
          <p>Pupuk hayati cair tidak menyebabkan penumpukan garam di tanah, aman untuk lingkungan, 
          dan dapat digunakan bersamaan dengan pupuk organik maupun kimia dalam dosis terkontrol.</p>
        `,
      },
      {
        title: "Cara Aplikasi Pupuk Hayati Cair yang Benar",
        content: `
          <h4 class="font-bold mb-2">Metode Aplikasi:</h4>
          
          <div class="space-y-4">
            <div class="border-l-4 border-green-500 pl-4">
              <h5 class="font-semibold">1. Penyemprotan Daun (Foliar Spray)</h5>
              <p class="text-sm text-gray-600">Dosis: 2-3 ml/liter air. Semprotkan pagi atau sore hari.</p>
            </div>
            
            <div class="border-l-4 border-blue-500 pl-4">
              <h5 class="font-semibold">2. Penyiraman ke Tanah</h5>
              <p class="text-sm text-gray-600">Dosis: 5-10 ml/liter air. Siramkan di sekitar perakaran.</p>
            </div>
            
            <div class="border-l-4 border-purple-500 pl-4">
              <h5 class="font-semibold">3. Fertigasi (Sistem Irigasi)</h5>
              <p class="text-sm text-gray-600">Dosis: 1-2 liter/ha melalui sistem irigasi tetes.</p>
            </div>
            
            <div class="border-l-4 border-orange-500 pl-4">
              <h5 class="font-semibold">4. Perendaman Benih/Bibit</h5>
              <p class="text-sm text-gray-600">Dosis: 5 ml/liter air. Rendam 15-30 menit sebelum tanam.</p>
            </div>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
            <h5 class="font-bold text-yellow-800">⚠️ Tips Penting:</h5>
            <ul class="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Jangan campurkan dengan pestisida atau fungisida kimia</li>
              <li>• Hindari aplikasi saat terik matahari (>35°C)</li>
              <li>• Kocok botol sebelum digunakan</li>
              <li>• Gunakan dalam 24 jam setelah dicampur air</li>
            </ul>
          </div>
        `,
      },
      {
        title: "Dosis Pupuk Hayati Cair per Tanaman",
        content: `
          <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-200 mt-4">
              <thead class="bg-green-600 text-white">
                <tr>
                  <th class="px-4 py-2 text-left">Tanaman</th>
                  <th class="px-4 py-2 text-left">Dosis</th>
                  <th class="px-4 py-2 text-left">Frekuensi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr class="bg-white">
                  <td class="px-4 py-2">Padi Sawah</td>
                  <td class="px-4 py-2">1-2 L/ha</td>
                  <td class="px-4 py-2">3x (15, 30, 45 HST)</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-4 py-2">Jagung</td>
                  <td class="px-4 py-2">1-2 L/ha</td>
                  <td class="px-4 py-2">3x (20, 35, 50 HST)</td>
                </tr>
                <tr class="bg-white">
                  <td class="px-4 py-2">Cabai</td>
                  <td class="px-4 py-2">2-3 ml/tanaman</td>
                  <td class="px-4 py-2">Setiap 7-10 hari</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-4 py-2">Kelapa Sawit</td>
                  <td class="px-4 py-2">50-100 ml/pohon</td>
                  <td class="px-4 py-2">Setiap 3 bulan</td>
                </tr>
                <tr class="bg-white">
                  <td class="px-4 py-2">Sayuran</td>
                  <td class="px-4 py-2">2 ml/liter</td>
                  <td class="px-4 py-2">Setiap 7 hari</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
    ],
    faqs: [
      {
        question: "Apa perbedaan pupuk hayati cair dan pupuk hayati padat?",
        answer: "Pupuk hayati cair mengandung mikroba dalam medium cair sehingga lebih mudah diaplikasikan dan diserap tanaman. Pupuk hayati padat berbentuk granul/powder, cocok untuk aplikasi tanah jangka panjang. Keduanya memiliki efektivitas yang baik, tergantung kondisi lahan dan preferensi petani.",
      },
      {
        question: "Apakah pupuk hayati cair aman dicampur dengan pupuk NPK?",
        answer: "Ya, pupuk hayati cair aman dicampur dengan pupuk NPK selama tidak mengandung bahan kimia yang bersifat bakterisidal. Hindari pencampuran langsung dengan pupuk kimia konsentrasi tinggi. Sebaiknya aplikasikan secara terpisah dengan jarak 3-7 hari.",
      },
      {
        question: "Berapa lama pupuk hayati cair bertahan setelah dibuka?",
        answer: "Pupuk hayati cair yang sudah dibuka sebaiknya digunakan dalam 1-3 bulan jika disimpan dengan benar (suhu ruang, terhindar sinar matahari langsung). Setelah dicampur air, gunakan maksimal 24 jam karena mikroba akan cepat mati.",
      },
      {
        question: "Kenapa hasil panen tidak langsung meningkat setelah pakai pupuk hayati cair?",
        answer: "Pupuk hayati cair bekerja secara biologis, butuh waktu 2-4 minggu agar mikroba berkembang dan aktif. Hasil optimal terlihat setelah 2-3 musim tanam karena mikroba terus memperbaiki kondisi tanah. Konsistensi aplikasi adalah kunci keberhasilan.",
      },
      {
        question: "Dimana beli pupuk hayati cair yang berkualitas?",
        answer: "Pilih pupuk hayati cair yang sudah terdaftar di Kementerian Pertanian dan memiliki sertifikat uji laboratorium. Centra Biotech Indonesia menyediakan BIOJAGAT, pupuk hayati cair premium dengan 9+ jenis mikroba bermanfaat yang telah teruji di berbagai kondisi lahan Indonesia.",
      },
    ],
    relatedProducts: [
      {
        name: "BIOJAGAT - Pupuk Hayati Cair Premium",
        slug: "/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair",
        description: "Pupuk hayati cair dengan 9+ jenis mikroba bermanfaat untuk semua jenis tanaman",
        image: "/images/products/biojagat-product.webp",
      },
      {
        name: "SIMBIOS - Pupuk Hayati Padat",
        slug: "/id/produk-layanan/pertanian/simbios-pupuk-hayati",
        description: "Versi padat dengan teknologi mikroenkapsulasi untuk aplikasi tanah",
        image: "/images/products/simbios-product.webp",
      },
    ],
    relatedArticles: [
      {
        title: "Pupuk Hayati Cair vs Padat: Mana yang Lebih Efektif?",
        slug: "/id/blog/pupuk-hayati-cair-vs-padat",
        description: "Perbandingan lengkap kelebihan dan kekurangan masing-masing jenis",
      },
      {
        title: "15 Jenis Pupuk Hayati Terbaik untuk Pertanian",
        slug: "/id/blog/jenis-jenis-pupuk-hayati-terbaik",
        description: "Panduan memilih pupuk hayati berdasarkan kebutuhan tanaman",
      },
      {
        title: "Cara Membuat Pupuk Hayati Sendiri di Rumah",
        slug: "/id/blog/cara-membuat-pupuk-hayati-sendiri",
        description: "Tutorial lengkap pembuatan pupuk hayati skala rumah tangga",
      },
    ],
    ctaWhatsapp: "Halo, saya ingin konsultasi tentang pupuk hayati cair untuk tanaman saya. Mohon informasi lebih lanjut.",
  },
  
  // Add more pillar content for other keywords...
  // "pupuk-organik-cair-id": {...},
  // "pembenah-tanah-id": {...},
  // "asam-humat-cair-id": {...},
  // "bio-pestisida-id": {...},
  // "distributor-pupuk-organik-id": {...},
};

// Get pillar content by slug and locale
function getPillarContent(slug: string, locale: string): PillarContent | null {
  const key = `${slug}-${locale}`;
  return PILLAR_CONTENT[key] || null;
}

// Generate static params for all pillar pages
export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  
  Object.values(PILLAR_CONTENT).forEach((content) => {
    params.push({
      lang: content.locale as Locale,
      slug: content.slug,
    });
  });
  
  return params;
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const content = getPillarContent(slug, lang);

  if (!content) {
    return {
      title: lang === "id" ? "Panduan Tidak Ditemukan" : "Guide Not Found",
      description: lang === "id" ? "Halaman panduan tidak ditemukan." : "Guide page not found.",
    };
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    authors: [{ name: "Centra Biotech Indonesia" }],
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/panduan/${slug}`,
      languages: {
        id: `${SITE_CONFIG.url}/id/panduan/${slug}`,
        en: `${SITE_CONFIG.url}/en/panduan/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: `${SITE_CONFIG.url}/${lang}/panduan/${slug}`,
      siteName: SITE_CONFIG.name,
      locale: lang === "id" ? "id_ID" : "en_US",
      type: "article",
      images: [
        {
          url: `${SITE_CONFIG.url}${content.heroImage}`,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.metaDescription,
      images: [`${SITE_CONFIG.url}${content.heroImage}`],
    },
  };
}

// Main Page Component
export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  const content = getPillarContent(slug, lang);

  if (!content) {
    notFound();
  }

  // Generate structured data with LearningResource for educational content
  const structuredDataArray = [
    generateLearningResourceSchema({
      name: content.title,
      description: content.metaDescription,
      url: `/${lang}/panduan/${slug}`,
      image: content.heroImage,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      educationalLevel: 'All Levels',
      learningResourceType: 'Guide',
      timeRequired: 'PT15M', // 15 minutes read time
      teaches: content.keywords,
      keywords: content.keywords,
      author: {
        name: 'Tim Centra Biotech Indonesia',
        jobTitle: 'Agricultural Biotechnology Expert',
        affiliation: SITE_CONFIG.name,
      },
      hasPart: content.sections.map((section, index) => ({
        name: section.title,
        description: section.content.replace(/<[^>]*>/g, '').substring(0, 100),
        url: `/${lang}/panduan/${slug}#section-${index}`,
        timeRequired: 'PT3M',
      })),
    }),
    generateBreadcrumbSchema([
      { name: lang === "id" ? "Beranda" : "Home", url: `/${lang}` },
      { name: lang === "id" ? "Panduan" : "Guides", url: `/${lang}/panduan` },
      { name: content.title, url: `/${lang}/panduan/${slug}` },
    ]),
    generateFAQSchema(content.faqs),
  ];

  const WHATSAPP_NUMBER = "6285196214187";

  return (
    <main>
      <MultipleStructuredData dataArray={structuredDataArray} />

      {/* Hero Section */}
      <HeroSectionGeneral
        imgUrl={content.heroImage || "/images/default-hero.webp"}
        title={<h1 className="text-3xl lg:text-5xl font-bold text-center">{content.title}</h1>}
        category={content.subtitle}
      />

      {/* Breadcrumb */}
      <Breadcrumb lang={lang} dict={dict} />

      {/* Main Content */}
      <ContainerSection className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.introduction }} />
          </section>

          {/* Table of Contents */}
          <nav className="my-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Daftar Isi
            </h3>
            <ul className="space-y-2">
              {content.sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="text-green-600 hover:text-green-800 flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-green-600 hover:text-green-800 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  FAQ (Pertanyaan Umum)
                </a>
              </li>
            </ul>
          </nav>

          {/* Content Sections */}
          {content.sections.map((section, index) => (
            <section key={index} id={`section-${index}`} className="my-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}

          {/* Related Products */}
          {content.relatedProducts.length > 0 && (
            <section className="my-12 p-6 bg-green-50 rounded-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Package className="h-6 w-6 text-green-600" />
                Produk Rekomendasi
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {content.relatedProducts.map((product, index) => (
                  <Link
                    key={index}
                    href={product.slug}
                    className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow flex gap-4"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                      {/* Product image placeholder */}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section id="faq" className="my-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              FAQ (Pertanyaan Umum)
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {content.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related Articles */}
          {content.relatedArticles.length > 0 && (
            <section className="my-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                Artikel Terkait
              </h3>
              <div className="space-y-4">
                {content.relatedArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.slug}
                    className="block p-4 border rounded-lg hover:border-green-500 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900">{article.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="my-12 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Konsultasi Gratis dengan Ahli
            </h3>
            <p className="mb-6">
              Dapatkan rekomendasi produk yang tepat untuk kebutuhan pertanian Anda
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(content.ctaWhatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Chat WhatsApp Sekarang
            </a>
          </section>
        </div>
      </ContainerSection>
    </main>
  );
}
