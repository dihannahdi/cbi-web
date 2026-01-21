import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import ContainerSection from '@/components/layout/container';
import { Leaf, Factory, FlaskConical, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'id' 
    ? 'Produk Bioteknologi Pertanian & Peternakan | Centra Biotech Indonesia'
    : 'Agricultural & Livestock Biotechnology Products | Centra Biotech Indonesia';
  
  const description = lang === 'id'
    ? 'Solusi bioteknologi lengkap untuk pertanian dan peternakan: pupuk organik cair, probiotik ternak, pakan organik. Produk bersertifikat dengan teknologi ramah lingkungan.'
    : 'Complete biotechnology solutions for agriculture and livestock: liquid organic fertilizer, probiotic feed, organic nutrition. Certified products with eco-friendly technology.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function ProductCategoriesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const categories = [
    {
      title: lang === 'id' ? 'Produk Pertanian' : 'Agricultural Products',
      description: lang === 'id' 
        ? 'Pupuk organik cair dan solusi bioteknologi untuk meningkatkan produktivitas tanaman'
        : 'Liquid organic fertilizer and biotechnology solutions to increase crop productivity',
      icon: Leaf,
      href: `/${lang}/produk/pertanian`,
      color: 'text-green-600 bg-green-50',
      products: [
        { name: lang === 'id' ? 'RAJABIO - Pupuk Organik Cair' : 'RAJABIO - Liquid Organic Fertilizer', slug: 'rajabio-pupuk-organik-cair' }
      ],
    },
    {
      title: lang === 'id' ? 'Produk Peternakan' : 'Livestock Products',
      description: lang === 'id'
        ? 'Probiotik dan pakan organik untuk kesehatan dan produktivitas ternak'
        : 'Probiotic and organic feed for livestock health and productivity',
      icon: Factory,
      href: `/${lang}/produk/peternakan`,
      color: 'text-orange-600 bg-orange-50',
      products: [],
    },
    {
      title: lang === 'id' ? 'Produk Lainnya' : 'Other Products',
      description: lang === 'id'
        ? 'Inovasi bioteknologi lainnya untuk berbagai kebutuhan'
        : 'Other biotechnology innovations for various needs',
      icon: FlaskConical,
      href: `/${lang}/produk/lainnya`,
      color: 'text-blue-600 bg-blue-50',
      products: [],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <ContainerSection>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl mb-6">
              {lang === 'id' ? 'Produk Bioteknologi Kami' : 'Our Biotechnology Products'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {lang === 'id' 
                ? 'Solusi inovatif dan berkelanjutan untuk meningkatkan produktivitas pertanian dan peternakan Indonesia'
                : 'Innovative and sustainable solutions to enhance Indonesian agriculture and livestock productivity'}
            </p>
          </div>
        </ContainerSection>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <ContainerSection>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, idx) => (
              <Link 
                key={idx}
                href={category.href}
                className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${category.color} mb-6`}>
                  <category.icon className="h-8 w-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {category.title}
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {category.description}
                </p>

                {category.products.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      {lang === 'id' ? 'Produk Tersedia:' : 'Available Products:'}
                    </p>
                    <ul className="space-y-1">
                      {category.products.map((product, pidx) => (
                        <li key={pidx} className="text-sm text-green-600 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2 text-green-600 font-medium group-hover:gap-3 transition-all">
                  {lang === 'id' ? 'Lihat Produk' : 'View Products'}
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
        </ContainerSection>
      </section>
    </>
  );
}
