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
    ? 'Cookie Policy | Centra Biotech Indonesia'
    : 'Kebijakan Cookie | Centra Biotech Indonesia';
  const description = lang === 'en'
    ? 'Cookie policy of PT Centra Biotech Indonesia explaining how we use cookies and similar technologies on our website.'
    : 'Kebijakan cookie PT Centra Biotech Indonesia menjelaskan bagaimana kami menggunakan cookie dan teknologi serupa di situs web kami.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/cookies`,
      languages: {
        'id': `${SITE_CONFIG.url}/id/cookies`,
        'en': `${SITE_CONFIG.url}/en/cookies`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${lang}/cookies`,
      siteName: SITE_CONFIG.name,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      type: 'website',
    },
  };
}

const CookiesPolicy = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Localized content
  const homeLabel = lang === 'en' ? 'Home' : 'Beranda';
  const pageTitle = lang === 'en' ? 'Cookie Policy' : 'Kebijakan Cookie';

  const structuredDataArray = [
    generateWebPageSchema({
      name: pageTitle,
      description: lang === 'en' 
        ? 'Cookie policy of PT Centra Biotech Indonesia'
        : 'Kebijakan cookie PT Centra Biotech Indonesia',
      url: `/${lang}/cookies`,
    }),
    generateBreadcrumbSchema([
      { name: homeLabel, url: `/${lang}` },
      { name: pageTitle, url: `/${lang}/cookies` },
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
                {lang === 'en'
                  ? `PT Centra Biotech Indonesia website uses cookies and similar technologies to 
                     enhance your browsing experience, analyze site traffic, and understand 
                     where our visitors come from. This page explains what cookies are, how 
                     we use them, and the choices you have.`
                  : `Situs web PT Centra Biotech Indonesia menggunakan cookie dan teknologi serupa untuk 
                     meningkatkan pengalaman browsing Anda, menganalisis lalu lintas situs, dan memahami 
                     dari mana pengunjung kami berasal. Halaman ini menjelaskan apa itu cookie, bagaimana 
                     kami menggunakannya, dan pilihan yang Anda miliki.`}
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '1. What Are Cookies?' : '1. Apa Itu Cookie?'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `Cookies are small text files placed on your device (computer, tablet, 
                       or phone) when you visit a website. Cookies are widely used to 
                       make websites work more efficiently and provide information to site owners.`
                    : `Cookie adalah file teks kecil yang ditempatkan di perangkat Anda (komputer, tablet, 
                       atau ponsel) ketika Anda mengunjungi situs web. Cookie digunakan secara luas untuk 
                       membuat situs web berfungsi lebih efisien dan memberikan informasi kepada pemilik situs.`}
                </p>
                <div className="rounded-xl bg-blue-50 p-6">
                  <h3 className="mb-3 font-semibold text-blue-800">{lang === 'en' ? 'Cookie Functions:' : 'Fungsi Cookie:'}</h3>
                  <ul className="list-disc space-y-2 pl-5 text-blue-700">
                    <li>{lang === 'en' ? 'Remember your preferences and settings' : 'Mengingat preferensi dan pengaturan Anda'}</li>
                    <li>{lang === 'en' ? 'Enable security features' : 'Memungkinkan fitur keamanan'}</li>
                    <li>{lang === 'en' ? 'Analyze how the website is used' : 'Menganalisis bagaimana situs web digunakan'}</li>
                    <li>{lang === 'en' ? 'Customize content to your interests' : 'Menyesuaikan konten dengan minat Anda'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '2. Types of Cookies We Use' : '2. Jenis Cookie yang Kami Gunakan'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{lang === 'en' ? 'We use several types of cookies on our website:' : 'Kami menggunakan beberapa jenis cookie di situs web kami:'}</p>
                
                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{lang === 'en' ? 'Essential Cookies' : 'Cookie Esensial'}</h3>
                        <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                          {lang === 'en' ? 'Always Active' : 'Selalu Aktif'}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm">
                      {lang === 'en'
                        ? `These cookies are necessary for the website to function and cannot be disabled. 
                           They are usually only set in response to your actions such as setting 
                           privacy preferences, logging in, or filling out forms.`
                        : `Cookie ini diperlukan agar situs web berfungsi dan tidak dapat dinonaktifkan. 
                           Biasanya hanya diatur sebagai respons terhadap tindakan Anda seperti mengatur 
                           preferensi privasi, masuk, atau mengisi formulir.`}
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{lang === 'en' ? 'Analytics Cookies' : 'Cookie Analitik'}</h3>
                        <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                          {lang === 'en' ? 'Can Be Disabled' : 'Dapat Dinonaktifkan'}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm">
                      {lang === 'en'
                        ? `These cookies help us understand how visitors interact with the website 
                           by collecting and reporting information anonymously. We use 
                           Google Analytics for this purpose.`
                        : `Cookie ini membantu kami memahami bagaimana pengunjung berinteraksi dengan situs 
                           web dengan mengumpulkan dan melaporkan informasi secara anonim. Kami menggunakan 
                           Google Analytics untuk tujuan ini.`}
                    </p>
                    <div className="mt-3 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-600">
                        <strong>{lang === 'en' ? 'Example:' : 'Contoh:'}</strong> _ga, _gid, _gat (Google Analytics)
                      </p>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{lang === 'en' ? 'Functional Cookies' : 'Cookie Fungsional'}</h3>
                        <span className="mt-1 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
                          {lang === 'en' ? 'Can Be Disabled' : 'Dapat Dinonaktifkan'}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm">
                      {lang === 'en'
                        ? `These cookies enable the website to provide enhanced functionality and 
                           personalization. They may be set by us or by third-party providers 
                           whose services we have added to our pages.`
                        : `Cookie ini memungkinkan situs web menyediakan fungsi dan personalisasi yang 
                           ditingkatkan. Cookie ini dapat diatur oleh kami atau oleh penyedia pihak ketiga 
                           yang layanannya telah kami tambahkan ke halaman kami.`}
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{lang === 'en' ? 'Marketing Cookies' : 'Cookie Pemasaran'}</h3>
                        <span className="mt-1 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">
                          {lang === 'en' ? 'Can Be Disabled' : 'Dapat Dinonaktifkan'}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm">
                      {lang === 'en'
                        ? `These cookies may be set through our site by our advertising partners. 
                           They may be used to build a profile of your interests and show you 
                           relevant ads on other sites.`
                        : `Cookie ini dapat diatur melalui situs kami oleh mitra periklanan kami. 
                           Cookie ini dapat digunakan untuk membangun profil minat Anda dan menampilkan 
                           iklan yang relevan di situs lain.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '3. Third-Party Cookies' : '3. Cookie Pihak Ketiga'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `Some cookies are placed by third-party services that appear on our pages. 
                       Below are the third parties whose cookies may be present on our site:`
                    : `Beberapa cookie ditempatkan oleh layanan pihak ketiga yang muncul di halaman kami. 
                       Berikut adalah pihak ketiga yang cookie-nya mungkin ada di situs kami:`}
                </p>
                <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{lang === 'en' ? 'Provider' : 'Penyedia'}</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{lang === 'en' ? 'Purpose' : 'Tujuan'}</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{lang === 'en' ? 'Information' : 'Informasi'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Google Analytics</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{lang === 'en' ? 'Analytics' : 'Analitik'}</td>
                        <td className="px-6 py-4 text-sm">
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            {lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Vercel</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{lang === 'en' ? 'Hosting & Performance' : 'Hosting & Performa'}</td>
                        <td className="px-6 py-4 text-sm">
                          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            {lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '4. Managing Cookies' : '4. Mengelola Cookie'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `You can control and manage cookies in various ways. Please note that 
                       removing or blocking cookies may affect your user experience and some 
                       parts of the website may no longer function fully.`
                    : `Anda dapat mengontrol dan mengelola cookie dengan berbagai cara. Harap diingat bahwa 
                       menghapus atau memblokir cookie dapat memengaruhi pengalaman pengguna Anda dan beberapa 
                       bagian situs web mungkin tidak lagi berfungsi sepenuhnya.`}
                </p>
                
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-semibold text-gray-900">{lang === 'en' ? 'Browser Settings' : 'Pengaturan Browser'}</h3>
                  <p className="mb-4 text-sm">
                    {lang === 'en'
                      ? `Most browsers allow you to refuse or accept cookies. Here is how to 
                         access cookie settings in popular browsers:`
                      : `Sebagian besar browser memungkinkan Anda menolak atau menerima cookie. Berikut cara 
                         mengakses pengaturan cookie di browser populer:`}
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" 
                       className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-xl">🌐</span>
                      <span className="text-sm font-medium">Google Chrome</span>
                    </a>
                    <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-xl">🦊</span>
                      <span className="text-sm font-medium">Mozilla Firefox</span>
                    </a>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-xl">🧭</span>
                      <span className="text-sm font-medium">Safari</span>
                    </a>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-xl">🔷</span>
                      <span className="text-sm font-medium">Microsoft Edge</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5-8 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                5. Google Analytics Opt-Out
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `You can opt out of being tracked by Google Analytics on all websites 
                       by installing the Google Analytics Opt-out browser add-on:`
                    : `Anda dapat memilih untuk tidak dilacak oleh Google Analytics di semua situs web 
                       dengan menginstal add-on browser Google Analytics Opt-out:`}
                </p>
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/>
                  </svg>
                  Download Google Analytics Opt-out Add-on
                </a>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '6. Cookie Policy Changes' : '6. Perubahan Kebijakan Cookie'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en'
                    ? `We may update this Cookie Policy from time to time to reflect 
                       changes to the cookies we use or for other operational, legal, or 
                       regulatory reasons. Please visit this Cookie Policy periodically to stay 
                       informed about our use of cookies.`
                    : `Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk mencerminkan 
                       perubahan pada cookie yang kami gunakan atau karena alasan operasional, hukum, atau 
                       peraturan lainnya. Silakan kunjungi Kebijakan Cookie ini secara berkala untuk tetap 
                       mendapat informasi tentang penggunaan cookie kami.`}
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                {lang === 'en' ? '7. More Information' : '7. Informasi Lebih Lanjut'}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {lang === 'en' ? (
                    <>
                      For more information about how we process your personal data, 
                      please read our{" "}
                      <Link href={`/${lang}/privacy-policy`} className="text-green-600 hover:underline">
                        Privacy Policy
                      </Link>.
                    </>
                  ) : (
                    <>
                      Untuk informasi lebih lanjut tentang bagaimana kami memproses data pribadi Anda, 
                      silakan baca{" "}
                      <Link href={`/${lang}/privacy-policy`} className="text-green-600 hover:underline">
                        Kebijakan Privasi
                      </Link>{" "}
                      kami.
                    </>
                  )}
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
                  ? 'If you have questions about our use of cookies, please contact us:'
                  : 'Jika Anda memiliki pertanyaan tentang penggunaan cookie kami, silakan hubungi kami:'}
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

export default CookiesPolicy;
