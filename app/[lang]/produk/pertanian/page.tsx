import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import ContainerSection from '@/components/layout/container';
import { Leaf, Droplets, ArrowRight, CheckCircle, Star } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'id' 
    ? 'Produk Pertanian: Pupuk Organik Cair & Solusi Bioteknologi | Centra Biotech'
    : 'Agricultural Products: Liquid Organic Fertilizer & Biotech Solutions | Centra Biotech';
  
  const description = lang === 'id'
    ? 'Pupuk organik cair (POC) dan solusi bioteknologi pertanian terbaik. RAJABIO pupuk organik cair meningkatkan panen hingga 40%. Bersertifikat Kementan RI, tersedia di E-Katalog.'
    : 'Best liquid organic fertilizer (LOF) and agricultural biotechnology solutions. RAJABIO organic liquid fertilizer increases harvest up to 40%. Ministry certified, available on E-Catalog.';

  return {
    title,
    description,
    keywords: lang === 'id'
      ? 'pupuk organik cair, poc, pupuk organik cair pertanian, pupuk organik cair terbaik, pupuk hayati, bioteknologi pertanian, pupuk bersertifikat'
      : 'liquid organic fertilizer, lof, agricultural biotechnology, certified fertilizer',
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function AgricultureProductsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const products = [
    {
      name: 'RAJABIO',
      subtitle: lang === 'id' ? 'Pupuk Organik Cair Premium' : 'Premium Liquid Organic Fertilizer',
      description: lang === 'id'
        ? 'Pupuk organik cair (POC) terbaik dengan C-Organik >10%. Terbukti meningkatkan hasil panen hingga 40%. Bersertifikat Kementan RI & E-Katalog Pemerintah.'
        : 'Best liquid organic fertilizer (LOF) with C-Organic >10%. Proven to increase harvest up to 40%. Certified by Ministry of Agriculture & Government E-Catalog.',
      features: [
        lang === 'id' ? 'C-Organik >10%' : 'C-Organic >10%',
        lang === 'id' ? 'Meningkatkan panen 40%' : 'Increases harvest 40%',
        lang === 'id' ? 'Bersertifikat Kementan RI' : 'Ministry Certified',
        lang === 'id' ? 'Tersedia di E-Katalog' : 'Available on E-Catalog',
      ],
      price: 'Rp 62.000',
      badge: lang === 'id' ? 'BESTSELLER' : 'BESTSELLER',
      image: '/products/rajabio/rajabio-cover.webp',
      href: `/${lang}/produk/pertanian/rajabio-pupuk-organik-cair`,
      color: 'from-green-600 to-green-700',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <ContainerSection>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="h-4 w-4" />
              {lang === 'id' ? 'Produk Pertanian' : 'Agricultural Products'}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl mb-6">
              {lang === 'id' 
                ? 'Pupuk Organik Cair & Solusi Bioteknologi Pertanian'
                : 'Liquid Organic Fertilizer & Agricultural Biotechnology Solutions'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {lang === 'id' 
                ? 'Tingkatkan produktivitas pertanian dengan pupuk organik cair (POC) dan solusi bioteknologi ramah lingkungan yang telah terbukti efektif'
                : 'Enhance agricultural productivity with eco-friendly liquid organic fertilizer (LOF) and proven biotechnology solutions'}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{lang === 'id' ? 'Bersertifikat Kementan RI' : 'Ministry Certified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{lang === 'id' ? 'Tersedia di E-Katalog' : 'Available on E-Catalog'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{lang === 'id' ? 'Ramah Lingkungan' : 'Eco-Friendly'}</span>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <ContainerSection>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => (
              <div key={idx} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      <Star className="h-3 w-3 fill-current" />
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className={`relative h-48 bg-gradient-to-br ${product.color} p-8 flex items-center justify-center`}>
                  <Droplets className="h-24 w-24 text-white opacity-20 absolute" />
                  <div className="relative z-10 text-white text-center">
                    <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                    <p className="text-sm opacity-90">{product.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 min-h-[80px]">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`h-4 w-4 ${product.textColor}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">{lang === 'id' ? 'Harga mulai' : 'Starting from'}</p>
                      <p className="text-2xl font-bold text-gray-900">{product.price}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link 
                    href={product.href}
                    className={`flex items-center justify-center gap-2 w-full ${product.bgColor} ${product.textColor} py-3 px-6 rounded-xl font-medium group-hover:gap-3 transition-all hover:shadow-md`}
                  >
                    {lang === 'id' ? 'Lihat Detail Produk' : 'View Product Details'}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ContainerSection>
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-16">
        <ContainerSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {lang === 'id' 
                ? 'Mengapa Memilih Pupuk Organik Cair (POC)?'
                : 'Why Choose Liquid Organic Fertilizer (LOF)?'}
            </h2>
            <p className="text-gray-600 mb-8">
              {lang === 'id'
                ? 'Pupuk organik cair (POC) adalah solusi modern untuk pertanian berkelanjutan. Berbeda dengan pupuk padat konvensional, POC lebih mudah diserap tanaman dan ramah lingkungan.'
                : 'Liquid organic fertilizer (LOF) is a modern solution for sustainable agriculture. Unlike conventional solid fertilizers, LOF is more easily absorbed by plants and eco-friendly.'}
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-left">
              <div className="bg-white rounded-xl p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                <p className="text-sm text-gray-600">{lang === 'id' ? 'Bahan organik alami' : 'Natural organic materials'}</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                <p className="text-sm text-gray-600">{lang === 'id' ? 'Peningkatan hasil panen' : 'Harvest increase'}</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">19+</div>
                <p className="text-sm text-gray-600">{lang === 'id' ? 'Provinsi di Indonesia' : 'Provinces in Indonesia'}</p>
              </div>
            </div>
          </div>
        </ContainerSection>
      </section>
    </>
  );
}
