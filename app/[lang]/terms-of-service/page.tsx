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
    ? 'Terms and Conditions | Centra Biotech Indonesia'
    : 'Syarat dan Ketentuan | Centra Biotech Indonesia';
  const description = lang === 'en'
    ? 'Terms and conditions for using PT Centra Biotech Indonesia website. Please read carefully before using our services.'
    : 'Syarat dan ketentuan penggunaan situs web PT Centra Biotech Indonesia. Harap baca dengan seksama sebelum menggunakan layanan kami.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/terms-of-service`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/terms-of-service`,
        'en': `${SITE_CONFIG.url}/en/terms-of-service`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/terms-of-service`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
    },
  };
}

const TermsOfService = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized content
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const pageTitle = lang === 'en' ? 'Terms and Conditions' : 'Syarat dan Ketentuan';

  const structuredDataArray = [
    generateWebPageSchema({
      name: pageTitle,
      description: lang === 'en' 
        ? 'Terms and conditions for using PT Centra Biotech Indonesia website'
        : 'Syarat dan ketentuan penggunaan situs web PT Centra Biotech Indonesia',
      url: `/${lang}/terms-of-service`,
    }),
    generateBreadcrumbSchema([
      { name: homeLabel, url: `/${lang}` },
      { name: pageTitle, url: `/${lang}/terms-of-service` },
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
            <div className="mb-12 rounded-xl bg-amber-50 p-6">
              <p className="leading-relaxed text-amber-800">
                <strong>{lang === 'en' ? 'Important:' : 'Penting:'}</strong>{' '}
                {lang === 'en'
                  ? `By accessing and using this website, you agree to be bound by the following Terms and Conditions. 
                     If you do not agree to these terms, please do not use our website.`
                  : `Dengan mengakses dan menggunakan situs web ini, Anda menyetujui 
                     untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui ketentuan ini, 
                     harap tidak menggunakan situs web kami.`}
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '1. Acceptance of Terms' : '1. Penerimaan Ketentuan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en' ? (
                    <>
                      These Terms and Conditions (&quot;Terms&quot;) constitute a legal agreement between you and 
                      PT Centra Biotech Indonesia (&quot;Company&quot;, &quot;we&quot;, or &quot;us&quot;) that governs 
                      the use of the website{" "}
                      <Link href={`/${lang}`} className="text-green-600 hover:underline">centrabiotech.co.id</Link>{" "}
                      and all related services.
                    </>
                  ) : (
                    <>
                      Syarat dan Ketentuan ini (&quot;Ketentuan&quot;) merupakan perjanjian hukum antara Anda dan 
                      PT Centra Biotech Indonesia (&quot;Perusahaan&quot;, &quot;kami&quot;, atau &quot;kita&quot;) yang mengatur 
                      penggunaan situs web{" "}
                      <Link href={`/${lang}`} className="text-green-600 hover:underline">centrabiotech.co.id</Link>{" "}
                      dan semua layanan terkait.
                    </>
                  )}
                </p>
                <p>
                  {lang === 'en'
                    ? `By using this website, you represent that you have read, understood, 
                       and agree to be bound by these Terms. We reserve the right to change these Terms 
                       at any time without prior notice.`
                    : `Dengan menggunakan situs web ini, Anda menyatakan bahwa Anda telah membaca, memahami, 
                       dan menyetujui untuk terikat oleh Ketentuan ini. Kami berhak mengubah Ketentuan ini 
                       kapan saja tanpa pemberitahuan sebelumnya.`}
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '2. Website Usage' : '2. Penggunaan Situs Web'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{lang === 'en' ? 'You agree to use this website only for lawful purposes and in a manner that does not:' : 'Anda setuju untuk menggunakan situs web ini hanya untuk tujuan yang sah dan dengan cara yang tidak:'}</p>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>{lang === 'en' ? 'Violate applicable laws or regulations in Indonesia' : 'Melanggar hukum atau peraturan yang berlaku di Indonesia'}</li>
                    <li>{lang === 'en' ? 'Misuse or damage the website or its servers' : 'Menyalahgunakan atau merusak situs web atau servernya'}</li>
                    <li>{lang === 'en' ? 'Collect other users\' data without permission' : 'Mengumpulkan data pengguna lain tanpa izin'}</li>
                    <li>{lang === 'en' ? 'Transmit material containing viruses or harmful code' : 'Mengirimkan materi yang mengandung virus atau kode berbahaya'}</li>
                    <li>{lang === 'en' ? 'Conduct activities that may disrupt or overload our infrastructure' : 'Melakukan aktivitas yang dapat mengganggu atau membebani infrastruktur kami'}</li>
                    <li>{lang === 'en' ? 'Use robots, spiders, or other automated data collection tools' : 'Menggunakan robot, spider, atau alat pengumpulan data otomatis lainnya'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '3. Intellectual Property Rights' : '3. Hak Kekayaan Intelektual'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `All content on this website, including but not limited to text, graphics, logos, 
                       icons, images, audio clips, digital downloads, and data compilations, is the property of PT Centra 
                       Biotech Indonesia or its licensors and is protected by Indonesian 
                       and international copyright laws.`
                    : `Semua konten di situs web ini, termasuk tetapi tidak terbatas pada teks, grafik, logo, 
                       ikon, gambar, klip audio, unduhan digital, dan kompilasi data, adalah milik PT Centra 
                       Biotech Indonesia atau pemberi lisensinya dan dilindungi oleh hukum hak cipta Indonesia 
                       dan internasional.`}
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-green-50 p-5 text-center">
                    <div className="mb-2 text-3xl">©</div>
                    <h4 className="font-semibold text-green-800">{lang === 'en' ? 'Copyright' : 'Hak Cipta'}</h4>
                    <p className="mt-2 text-sm text-green-700">{lang === 'en' ? 'All content protected' : 'Semua konten dilindungi'}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-5 text-center">
                    <div className="mb-2 text-3xl">®</div>
                    <h4 className="font-semibold text-blue-800">{lang === 'en' ? 'Trademark' : 'Merek Dagang'}</h4>
                    <p className="mt-2 text-sm text-blue-700">{lang === 'en' ? 'Registered logo and name' : 'Logo dan nama terdaftar'}</p>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-5 text-center">
                    <div className="mb-2 text-3xl">™</div>
                    <h4 className="font-semibold text-purple-800">{lang === 'en' ? 'Intellectual Property' : 'Kekayaan Intelektual'}</h4>
                    <p className="mt-2 text-sm text-purple-700">{lang === 'en' ? 'Legally protected' : 'Dilindungi hukum'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '4. Product and Service Information' : '4. Informasi Produk dan Layanan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `Information about products and services displayed on this website is provided 
                       "as is". We strive to ensure accuracy of information, but 
                       we do not guarantee that product descriptions, prices, or other content on this 
                       website is accurate, complete, current, or error-free.`
                    : `Informasi tentang produk dan layanan yang ditampilkan di situs web ini disediakan 
                       "sebagaimana adanya". Kami berusaha untuk memastikan keakuratan informasi, namun 
                       kami tidak menjamin bahwa deskripsi produk, harga, atau konten lainnya di situs 
                       web ini akurat, lengkap, terkini, atau bebas dari kesalahan.`}
                </p>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">{lang === 'en' ? 'Note:' : 'Perhatian:'}</h3>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>{lang === 'en' ? 'Product images may differ from actual products' : 'Gambar produk mungkin berbeda dari produk sebenarnya'}</li>
                    <li>{lang === 'en' ? 'Product specifications may change without notice' : 'Spesifikasi produk dapat berubah tanpa pemberitahuan'}</li>
                    <li>{lang === 'en' ? 'Product availability is not guaranteed' : 'Ketersediaan produk tidak dijamin'}</li>
                    <li>{lang === 'en' ? 'Consult our team for latest information' : 'Konsultasikan dengan tim kami untuk informasi terbaru'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '5. Limitation of Liability' : '5. Batasan Tanggung Jawab'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `To the extent permitted by applicable law, PT Centra Biotech Indonesia is not 
                       liable for any direct, indirect, incidental, special, 
                       consequential, or punitive damages arising from:`
                    : `Sejauh diizinkan oleh hukum yang berlaku, PT Centra Biotech Indonesia tidak 
                       bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, 
                       konsekuensial, atau punitif yang timbul dari:`}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>{lang === 'en' ? 'Use or inability to use this website' : 'Penggunaan atau ketidakmampuan menggunakan situs web ini'}</li>
                  <li>{lang === 'en' ? 'Any content obtained from this website' : 'Setiap konten yang diperoleh dari situs web ini'}</li>
                  <li>{lang === 'en' ? 'Unauthorized access to or alteration of your transmissions or data' : 'Akses tidak sah ke atau perubahan transmisi atau data Anda'}</li>
                  <li>{lang === 'en' ? 'Statements or conduct of any third party on this website' : 'Pernyataan atau tindakan pihak ketiga di situs web ini'}</li>
                  <li>{lang === 'en' ? 'Technical issues or system failures' : 'Masalah teknis atau kegagalan sistem'}</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '6. Links to Third-Party Sites' : '6. Tautan ke Situs Pihak Ketiga'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `Our website may contain links to third-party websites. These links 
                       are provided only for your convenience. We have no control over the content 
                       of third-party sites and are not responsible for:`
                    : `Situs web kami mungkin berisi tautan ke situs web pihak ketiga. Tautan ini 
                       disediakan hanya untuk kenyamanan Anda. Kami tidak memiliki kendali atas konten 
                       situs pihak ketiga dan tidak bertanggung jawab atas:`}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>{lang === 'en' ? 'Privacy policies or practices of third-party sites' : 'Kebijakan privasi atau praktik situs pihak ketiga'}</li>
                  <li>{lang === 'en' ? 'Accuracy or completeness of third-party site content' : 'Keakuratan atau kelengkapan konten situs pihak ketiga'}</li>
                  <li>{lang === 'en' ? 'Security of third-party sites' : 'Keamanan situs pihak ketiga'}</li>
                </ul>
              </div>
            </div>

            {/* Section 7-10 and Contact */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '7. Indemnification' : '7. Ganti Rugi'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `You agree to defend, indemnify, and hold harmless PT Centra Biotech Indonesia, 
                       its directors, employees, and agents from any claims, losses, liabilities, costs, or 
                       expenses (including attorney fees) arising from:`
                    : `Anda setuju untuk membela, mengganti rugi, dan membebaskan PT Centra Biotech Indonesia, 
                       direktur, karyawan, dan agennya dari setiap klaim, kerugian, kewajiban, biaya, atau 
                       pengeluaran (termasuk biaya pengacara) yang timbul dari:`}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>{lang === 'en' ? 'Your use of this website' : 'Penggunaan Anda atas situs web ini'}</li>
                  <li>{lang === 'en' ? 'Your violation of these Terms' : 'Pelanggaran Anda terhadap Ketentuan ini'}</li>
                  <li>{lang === 'en' ? 'Your violation of any third-party rights' : 'Pelanggaran Anda terhadap hak pihak ketiga'}</li>
                </ul>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '8. Governing Law' : '8. Hukum yang Berlaku'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `These Terms are governed by and construed in accordance with the laws of the Republic of Indonesia. 
                       Any dispute arising from or related to these Terms will be resolved 
                       exclusively by the competent courts in Indonesia.`
                    : `Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
                       Setiap sengketa yang timbul dari atau terkait dengan Ketentuan ini akan diselesaikan 
                       secara eksklusif oleh pengadilan yang berwenang di Indonesia.`}
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '9. Severability' : '9. Keterpisahan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `If any provision of these Terms and Conditions is deemed invalid or 
                       unenforceable by a competent court, the remaining provisions will 
                       remain in full force and effect.`
                    : `Jika ada ketentuan dalam Syarat dan Ketentuan ini yang dianggap tidak sah atau 
                       tidak dapat dilaksanakan oleh pengadilan yang berwenang, ketentuan lainnya akan 
                       tetap berlaku sepenuhnya.`}
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '10. Changes to Terms' : '10. Perubahan Ketentuan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `We reserve the right to change or update these Terms at any time without 
                       prior notice. Changes will take effect immediately upon posting on 
                       this website. Your continued use of the website after such changes 
                       constitutes your acceptance of the revised Terms.`
                    : `Kami berhak untuk mengubah atau memperbarui Ketentuan ini kapan saja tanpa 
                       pemberitahuan sebelumnya. Perubahan akan berlaku segera setelah diposting di 
                       situs web ini. Penggunaan berkelanjutan Anda atas situs web setelah perubahan 
                       tersebut merupakan penerimaan Anda terhadap Ketentuan yang direvisi.`}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="rounded-2xl bg-green-600 p-8 text-white">
              <h2 className="mb-4 text-xl font-bold lg:text-2xl">
                {lang === 'en' ? '11. Contact Us' : '11. Hubungi Kami'}
              </h2>
              <p className="mb-6">
                {lang === 'en'
                  ? 'If you have questions about these Terms and Conditions, please contact us:'
                  : 'Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:'}
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

export default TermsOfService;
