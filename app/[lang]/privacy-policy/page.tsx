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
    ? 'Privacy Policy | Centra Biotech Indonesia'
    : 'Kebijakan Privasi | Centra Biotech Indonesia';
  const description = lang === 'en'
    ? 'Privacy policy of PT Centra Biotech Indonesia explaining how we collect, use, and protect your personal information.'
    : 'Kebijakan privasi PT Centra Biotech Indonesia menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/privacy-policy`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/privacy-policy`,
        'en': `${SITE_CONFIG.url}/en/privacy-policy`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/privacy-policy`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
    },
  };
}

const PrivacyPolicy = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized content
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const pageTitle = lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi';

  const structuredDataArray = [
    generateWebPageSchema({
      name: pageTitle,
      description: lang === 'en' 
        ? 'Privacy policy of PT Centra Biotech Indonesia'
        : 'Kebijakan privasi PT Centra Biotech Indonesia',
      url: `/${lang}/privacy-policy`,
    }),
    generateBreadcrumbSchema([
      { name: homeLabel, url: `/${lang}` },
      { name: pageTitle, url: `/${lang}/privacy-policy` },
    ]),
  ];

  const lastUpdated = lang === 'en' ? 'January 1, 2026' : '1 Januari 2026';

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
            <p className="mb-8 text-sm text-gray-500">
              {lang === 'en' ? 'Last updated: ' : 'Terakhir diperbarui: '}{lastUpdated}
            </p>

            {/* Introduction */}
            <div className="mb-12">
              <p className="leading-relaxed text-gray-700">
                {lang === 'en' ? (
                  <>
                    PT Centra Biotech Indonesia (&quot;Company&quot;, &quot;we&quot;, or &quot;us&quot;) is committed to protecting 
                    your privacy. This Privacy Policy explains how we collect, use, 
                    disclose, and protect your information when you visit our website at{" "}
                    <Link href={`/${lang}`} className="text-green-600 hover:underline">centrabiotech.co.id</Link>.
                  </>
                ) : (
                  <>
                    PT Centra Biotech Indonesia (&quot;Perusahaan&quot;, &quot;kami&quot;, atau &quot;kita&quot;) berkomitmen untuk melindungi 
                    privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, 
                    mengungkapkan, dan melindungi informasi Anda ketika Anda mengunjungi situs web kami di{" "}
                    <Link href={`/${lang}`} className="text-green-600 hover:underline">centrabiotech.co.id</Link>.
                  </>
                )}
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '1. Information We Collect' : '1. Informasi yang Kami Kumpulkan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{lang === 'en' ? 'We may collect information about you in various ways, including:' : 'Kami dapat mengumpulkan informasi tentang Anda dengan berbagai cara, termasuk:'}</p>
                
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">{lang === 'en' ? 'Personal Information' : 'Informasi Pribadi'}</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>{lang === 'en' ? 'Full name' : 'Nama lengkap'}</li>
                    <li>{lang === 'en' ? 'Email address' : 'Alamat email'}</li>
                    <li>{lang === 'en' ? 'Phone number' : 'Nomor telepon'}</li>
                    <li>{lang === 'en' ? 'Company or institution name' : 'Nama perusahaan atau instansi'}</li>
                    <li>{lang === 'en' ? 'Address (if required for shipping)' : 'Alamat (jika diperlukan untuk pengiriman)'}</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">{lang === 'en' ? 'Non-Personal Information' : 'Informasi Non-Pribadi'}</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>{lang === 'en' ? 'Browser type and version' : 'Jenis browser dan versi'}</li>
                    <li>{lang === 'en' ? 'Operating system' : 'Sistem operasi'}</li>
                    <li>{lang === 'en' ? 'IP address' : 'Alamat IP'}</li>
                    <li>{lang === 'en' ? 'Pages visited and time of visit' : 'Halaman yang dikunjungi dan waktu kunjungan'}</li>
                    <li>{lang === 'en' ? 'Website analytics data' : 'Data analitik website'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '2. Use of Information' : '2. Penggunaan Informasi'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{lang === 'en' ? 'We use the information collected to:' : 'Kami menggunakan informasi yang dikumpulkan untuk:'}</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>{lang === 'en' ? 'Respond to your inquiries and requests' : 'Merespons pertanyaan dan permintaan Anda'}</li>
                  <li>{lang === 'en' ? 'Send product and service information you requested' : 'Mengirimkan informasi produk dan layanan yang Anda minta'}</li>
                  <li>{lang === 'en' ? 'Process orders and transactions' : 'Memproses pesanan dan transaksi'}</li>
                  <li>{lang === 'en' ? 'Send newsletters and marketing materials (with your consent)' : 'Mengirimkan newsletter dan materi pemasaran (dengan persetujuan Anda)'}</li>
                  <li>{lang === 'en' ? 'Improve service quality and user experience' : 'Meningkatkan kualitas layanan dan pengalaman pengguna'}</li>
                  <li>{lang === 'en' ? 'Analyze website usage trends' : 'Menganalisis tren penggunaan website'}</li>
                  <li>{lang === 'en' ? 'Comply with legal obligations' : 'Mematuhi kewajiban hukum'}</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '3. Information Protection' : '3. Perlindungan Informasi'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en' 
                    ? `We implement administrative, technical, and physical security measures designed 
                       to protect your personal information from unauthorized access, use, or disclosure. 
                       However, no method of transmission over the internet or electronic storage is 100% secure.`
                    : `Kami menerapkan langkah-langkah keamanan administratif, teknis, dan fisik yang dirancang 
                       untuk melindungi informasi pribadi Anda dari akses tidak sah, penggunaan, atau pengungkapan. 
                       Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.`}
                </p>
                <div className="rounded-xl bg-green-50 p-6">
                  <h3 className="mb-3 font-semibold text-green-800">{lang === 'en' ? 'Our Security Measures:' : 'Langkah Keamanan Kami:'}</h3>
                  <ul className="list-disc space-y-2 pl-5 text-green-700">
                    <li>{lang === 'en' ? 'SSL/TLS encryption for all data transmission' : 'Enkripsi SSL/TLS untuk semua transmisi data'}</li>
                    <li>{lang === 'en' ? 'Limited access to personal information' : 'Akses terbatas ke informasi pribadi'}</li>
                    <li>{lang === 'en' ? 'Continuous security monitoring' : 'Pemantauan keamanan berkelanjutan'}</li>
                    <li>{lang === 'en' ? 'Regular security system updates' : 'Pembaruan sistem keamanan secara berkala'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '4. Sharing Information with Third Parties' : '4. Berbagi Informasi dengan Pihak Ketiga'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `We do not sell, trade, or rent your personal information to third parties. 
                       We may share your information in the following situations:`
                    : `Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. 
                       Kami dapat membagikan informasi Anda dalam situasi berikut:`}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>{lang === 'en' ? 'With service providers who help our operations' : 'Dengan penyedia layanan yang membantu operasional kami'}</li>
                  <li>{lang === 'en' ? 'To comply with legal obligations or court orders' : 'Untuk mematuhi kewajiban hukum atau perintah pengadilan'}</li>
                  <li>{lang === 'en' ? 'To protect our rights and safety or those of others' : 'Untuk melindungi hak dan keamanan kami atau pihak lain'}</li>
                  <li>{lang === 'en' ? 'In case of merger, acquisition, or sale of company assets' : 'Dalam kasus merger, akuisisi, atau penjualan aset perusahaan'}</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '5. Cookies and Tracking Technologies' : '5. Cookie dan Teknologi Pelacakan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en' ? (
                    <>
                      Our website uses cookies and similar tracking technologies to enhance 
                      your experience. For more information, please read our{" "}
                      <Link href={`/${lang}/cookies`} className="text-green-600 hover:underline">
                        Cookie Policy
                      </Link>.
                    </>
                  ) : (
                    <>
                      Situs web kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan 
                      pengalaman Anda. Untuk informasi lebih lanjut, silakan baca{" "}
                      <Link href={`/${lang}/cookies`} className="text-green-600 hover:underline">
                        Kebijakan Cookie
                      </Link>{" "}
                      kami.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '6. Your Rights' : '6. Hak Anda'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{lang === 'en' ? 'You have the right to:' : 'Anda memiliki hak untuk:'}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h4 className="mb-2 font-semibold text-gray-900">{lang === 'en' ? 'Access' : 'Akses'}</h4>
                    <p className="text-sm">{lang === 'en' ? 'Request a copy of the personal information we hold about you' : 'Meminta salinan informasi pribadi yang kami miliki tentang Anda'}</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h4 className="mb-2 font-semibold text-gray-900">{lang === 'en' ? 'Correction' : 'Koreksi'}</h4>
                    <p className="text-sm">{lang === 'en' ? 'Request that we correct inaccurate information' : 'Meminta kami memperbaiki informasi yang tidak akurat'}</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h4 className="mb-2 font-semibold text-gray-900">{lang === 'en' ? 'Deletion' : 'Penghapusan'}</h4>
                    <p className="text-sm">{lang === 'en' ? 'Request deletion of your personal information' : 'Meminta penghapusan informasi pribadi Anda'}</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm">
                    <h4 className="mb-2 font-semibold text-gray-900">{lang === 'en' ? 'Restriction' : 'Pembatasan'}</h4>
                    <p className="text-sm">{lang === 'en' ? 'Request restriction of processing your data' : 'Meminta pembatasan pemrosesan data Anda'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '7. Privacy Policy Changes' : '7. Perubahan Kebijakan Privasi'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `We may update this Privacy Policy from time to time. Changes will 
                       be posted on this page with a new "Last updated" date. 
                       We encourage you to review this policy periodically.`
                    : `Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan 
                       diposting di halaman ini dengan tanggal "Terakhir diperbarui" yang baru. 
                       Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.`}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="rounded-2xl bg-green-600 p-8 text-white">
              <h2 className="mb-4 text-xl font-bold lg:text-2xl">
                {lang === 'en' ? '8. Contact Us' : '8. Hubungi Kami'}
              </h2>
              <p className="mb-6">
                {lang === 'en'
                  ? `If you have questions about this Privacy Policy or wish to exercise 
                     your privacy rights, please contact us:`
                  : `Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan 
                     hak privasi Anda, silakan hubungi kami:`}
              </p>
              <div className="space-y-2">
                <p><strong>PT Centra Biotech Indonesia</strong></p>
                <p>Email: centrabioindo@gmail.com</p>
                <p>{lang === 'en' ? 'Phone: ' : 'Telepon: '}0812-3500-3655</p>
                <p>{lang === 'en' ? 'Address: ' : 'Alamat: '}Sawahan RT 02 RW 07 Pasungan, Ceper, Klaten, Jawa Tengah 57465</p>
              </div>
              <Link 
                href={`/${lang}/contact`}
                className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-medium text-green-600 transition-colors hover:bg-gray-100"
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

export default PrivacyPolicy;
