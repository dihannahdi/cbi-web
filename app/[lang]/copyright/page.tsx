import { Metadata } from "next";
import Link from "next/link";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import ContainerSection from "@/components/layout/container";
import Breadcrumb from "@/components/common/BreadScrumb";
import { SITE_CONFIG } from "@/utils/seo";
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  MultipleStructuredData 
} from "@/utils/structuredData";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'en' 
    ? 'Copyright & Image Licensing | Centra Biotech Indonesia'
    : 'Hak Cipta & Lisensi Gambar | Centra Biotech Indonesia';
  const description = lang === 'en'
    ? 'Copyright information and image licensing terms for PT Centra Biotech Indonesia. Learn how to properly use and license our images and content.'
    : 'Informasi hak cipta dan ketentuan lisensi gambar PT Centra Biotech Indonesia. Pelajari cara menggunakan dan melisensikan gambar dan konten kami.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/copyright`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/copyright`,
        'en': `${SITE_CONFIG.url}/en/copyright`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/copyright`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
    },
  };
}

const CopyrightPage = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized content
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const pageTitle = lang === 'en' ? 'Copyright & Image Licensing' : 'Hak Cipta & Lisensi Gambar';

  const structuredDataArray = [
    generateWebPageSchema({
      name: pageTitle,
      description: lang === 'en' 
        ? 'Copyright and image licensing information for PT Centra Biotech Indonesia'
        : 'Informasi hak cipta dan lisensi gambar PT Centra Biotech Indonesia',
      url: `/${lang}/copyright`,
    }),
    generateBreadcrumbSchema([
      { name: homeLabel, url: `/${lang}` },
      { name: pageTitle, url: `/${lang}/copyright` },
    ]),
  ];

  const currentYear = new Date().getFullYear();

  // Content based on language
  const content = lang === 'en' ? {
    intro: `All content on this website, including but not limited to text, graphics, logos, images, photographs, video clips, and audio clips, is the property of PT Centra Biotech Indonesia or its content suppliers and is protected by Indonesian and international copyright laws.`,
    
    ownershipTitle: 'Ownership of Content',
    ownershipText: 'The intellectual property rights in all material on this site are owned by PT Centra Biotech Indonesia or are licensed to us. All such rights are reserved.',
    
    imageRightsTitle: 'Image Rights',
    imageRightsText: 'All product images, photographs, and visual content displayed on this website are original works created by or for PT Centra Biotech Indonesia. These images are protected by copyright and may not be reproduced without permission.',
    
    licensingTitle: 'Image Licensing',
    licensingText: 'If you wish to use our images for commercial or editorial purposes, please contact us to obtain a license. We offer licensing options for various use cases.',
    
    howToLicenseTitle: 'How to License Our Images',
    howToLicenseSteps: [
      'Contact our marketing team via email at info@centrabiotechindonesia.com',
      'Describe the intended use of the image(s)',
      'Specify the duration and geographic scope of use',
      'Receive a quote and licensing agreement',
      'Upon payment, receive high-resolution images with license documentation'
    ],
    
    permittedUsesTitle: 'Permitted Uses (with License)',
    permittedUses: [
      'Commercial advertising and marketing materials',
      'Editorial use in news articles and publications',
      'Educational materials and presentations',
      'Product packaging (with extended license)',
      'Digital and print media'
    ],
    
    prohibitedUsesTitle: 'Prohibited Uses',
    prohibitedUses: [
      'Redistribution or resale of images',
      'Use in defamatory, obscene, or illegal content',
      'Modification of images without permission',
      'Removal of copyright notices or watermarks',
      'Claiming ownership of our images'
    ],
    
    attributionTitle: 'Attribution Requirements',
    attributionText: 'When using our images under license, please provide attribution as follows:',
    attributionExample: '© [Year] PT Centra Biotech Indonesia. All rights reserved.',
    
    contactTitle: 'Contact for Licensing',
    contactText: 'For licensing inquiries, please contact:',
    
    dmcaTitle: 'Copyright Infringement (DMCA)',
    dmcaText: 'If you believe that any content on our site infringes your copyright, please contact us immediately with:',
    dmcaItems: [
      'Identification of the copyrighted work',
      'Location of the infringing material on our site',
      'Your contact information',
      'A statement of good faith belief',
      'Your physical or electronic signature'
    ],
    
    lastUpdated: 'Last updated: January 1, 2026'
  } : {
    intro: `Semua konten di situs web ini, termasuk namun tidak terbatas pada teks, grafik, logo, gambar, foto, klip video, dan klip audio, adalah milik PT Centra Biotech Indonesia atau pemasok kontennya dan dilindungi oleh undang-undang hak cipta Indonesia dan internasional.`,
    
    ownershipTitle: 'Kepemilikan Konten',
    ownershipText: 'Hak kekayaan intelektual atas semua materi di situs ini dimiliki oleh PT Centra Biotech Indonesia atau dilisensikan kepada kami. Semua hak tersebut dilindungi undang-undang.',
    
    imageRightsTitle: 'Hak Gambar',
    imageRightsText: 'Semua gambar produk, foto, dan konten visual yang ditampilkan di situs web ini adalah karya asli yang dibuat oleh atau untuk PT Centra Biotech Indonesia. Gambar-gambar ini dilindungi hak cipta dan tidak boleh direproduksi tanpa izin.',
    
    licensingTitle: 'Lisensi Gambar',
    licensingText: 'Jika Anda ingin menggunakan gambar kami untuk tujuan komersial atau editorial, silakan hubungi kami untuk mendapatkan lisensi. Kami menawarkan opsi lisensi untuk berbagai kebutuhan.',
    
    howToLicenseTitle: 'Cara Melisensikan Gambar Kami',
    howToLicenseSteps: [
      'Hubungi tim pemasaran kami melalui email di info@centrabiotechindonesia.com',
      'Jelaskan tujuan penggunaan gambar',
      'Tentukan durasi dan cakupan geografis penggunaan',
      'Terima penawaran dan perjanjian lisensi',
      'Setelah pembayaran, terima gambar resolusi tinggi dengan dokumentasi lisensi'
    ],
    
    permittedUsesTitle: 'Penggunaan yang Diizinkan (dengan Lisensi)',
    permittedUses: [
      'Iklan komersial dan materi pemasaran',
      'Penggunaan editorial di artikel berita dan publikasi',
      'Materi pendidikan dan presentasi',
      'Kemasan produk (dengan lisensi diperluas)',
      'Media digital dan cetak'
    ],
    
    prohibitedUsesTitle: 'Penggunaan yang Dilarang',
    prohibitedUses: [
      'Redistribusi atau penjualan kembali gambar',
      'Penggunaan dalam konten fitnah, cabul, atau ilegal',
      'Modifikasi gambar tanpa izin',
      'Penghapusan pemberitahuan hak cipta atau watermark',
      'Mengklaim kepemilikan gambar kami'
    ],
    
    attributionTitle: 'Persyaratan Atribusi',
    attributionText: 'Saat menggunakan gambar kami berdasarkan lisensi, harap berikan atribusi sebagai berikut:',
    attributionExample: '© [Tahun] PT Centra Biotech Indonesia. Hak cipta dilindungi undang-undang.',
    
    contactTitle: 'Kontak untuk Lisensi',
    contactText: 'Untuk pertanyaan lisensi, silakan hubungi:',
    
    dmcaTitle: 'Pelanggaran Hak Cipta',
    dmcaText: 'Jika Anda yakin bahwa konten di situs kami melanggar hak cipta Anda, segera hubungi kami dengan:',
    dmcaItems: [
      'Identifikasi karya yang dilindungi hak cipta',
      'Lokasi materi yang melanggar di situs kami',
      'Informasi kontak Anda',
      'Pernyataan itikad baik',
      'Tanda tangan fisik atau elektronik Anda'
    ],
    
    lastUpdated: 'Terakhir diperbarui: 1 Januari 2026'
  };

  return (
    <>
      <MultipleStructuredData dataArray={structuredDataArray} />
      
      <HeroSectionGeneral
        imgUrl="/og-image.jpg"
        category="Legal"
        title={
          <h1 className="text-center text-3xl font-bold text-white lg:text-5xl xl:text-[56px]">
            {pageTitle}
          </h1>
        }
      />
      
      <Breadcrumb lang={lang} dict={dict} />
      
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <ContainerSection>
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-sm text-gray-500">{content.lastUpdated}</p>
            
            {/* Introduction */}
            <div className="mb-8 rounded-lg bg-green-50 p-6 border-l-4 border-green-500">
              <p className="text-gray-700 leading-relaxed">{content.intro}</p>
            </div>
            
            {/* Ownership */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{content.ownershipTitle}</h2>
              <p className="text-gray-700 leading-relaxed">{content.ownershipText}</p>
            </div>
            
            {/* Image Rights */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{content.imageRightsTitle}</h2>
              <p className="text-gray-700 leading-relaxed">{content.imageRightsText}</p>
            </div>
            
            {/* Licensing Section with ID anchor */}
            <div id="licensing" className="mb-8 scroll-mt-20">
              <h2 className="mb-4 text-2xl font-bold text-green-700">{content.licensingTitle}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{content.licensingText}</p>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{content.howToLicenseTitle}</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {content.howToLicenseSteps.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
            
            {/* Permitted Uses */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{content.permittedUsesTitle}</h2>
              <ul className="list-disc list-inside space-y-2">
                {content.permittedUses.map((use, index) => (
                  <li key={index} className="text-gray-700">{use}</li>
                ))}
              </ul>
            </div>
            
            {/* Prohibited Uses */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-red-700">{content.prohibitedUsesTitle}</h2>
              <ul className="list-disc list-inside space-y-2">
                {content.prohibitedUses.map((use, index) => (
                  <li key={index} className="text-gray-700">{use}</li>
                ))}
              </ul>
            </div>
            
            {/* Attribution */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{content.attributionTitle}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{content.attributionText}</p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                {content.attributionExample}
              </div>
            </div>
            
            {/* Contact for Licensing */}
            <div className="mb-8 bg-green-50 p-6 rounded-lg">
              <h2 className="mb-4 text-2xl font-bold text-green-800">{content.contactTitle}</h2>
              <p className="text-gray-700 mb-4">{content.contactText}</p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@centrabiotechindonesia.com" className="text-green-600 hover:underline">
                    info@centrabiotechindonesia.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>WhatsApp:</strong>{' '}
                  <a href="https://wa.me/6285196214187" className="text-green-600 hover:underline">
                    +62 851-9621-4187
                  </a>
                </p>
              </div>
            </div>
            
            {/* DMCA */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{content.dmcaTitle}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{content.dmcaText}</p>
              <ul className="list-disc list-inside space-y-2">
                {content.dmcaItems.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Copyright Notice */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                © {currentYear} PT Centra Biotech Indonesia. {lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi undang-undang.'}
              </p>
            </div>
            
            {/* Related Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                href={`/${lang}/privacy-policy`}
                className="text-green-600 hover:text-green-800 hover:underline"
              >
                {lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href={`/${lang}/terms-of-service`}
                className="text-green-600 hover:text-green-800 hover:underline"
              >
                {lang === 'en' ? 'Terms of Service' : 'Syarat dan Ketentuan'}
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href={`/${lang}/contact`}
                className="text-green-600 hover:text-green-800 hover:underline"
              >
                {lang === 'en' ? 'Contact Us' : 'Hubungi Kami'}
              </Link>
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
};

export default CopyrightPage;
