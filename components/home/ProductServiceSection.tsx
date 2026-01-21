import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";

import LinkGreen from "./LinkGreen";
import ProductCard from "./ProductCard";
import ContainerSection from "../layout/container";

import { ProductService } from "@/types/responseTypes/dashboard/productService";
import { Product } from "@/types/responseTypes/productService/productAndServiceData";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface ProductServiceSectionProps {
  data: ProductService;
  lang: Locale;
  dict: Dictionary;
}

/**
 * ProductServiceSection with integrated SEO content
 * Target keywords: perusahaan bioteknologi di Indonesia, PT Biotech, pupuk hayati, 
 * insektisida hayati, probiotik, penelitian dan pengembangan, sumber daya manusia,
 * vaksin dan produk bioteknologi, di bidang, pangan dan
 */
const ProductServiceSection = ({ data, lang, dict }: ProductServiceSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-white to-[#f8faf9]">
      <ContainerSection>
        {/* Main Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex-1">
            <h2>{lang === 'id' ? data.title : dict.home.productsTitle}</h2>
          </div>
          <div className="flex max-w-[30rem] flex-col gap-5">
            <p className="text-gray-600">{lang === 'id' ? data.description : dict.home.productsSubtitle}</p>
            <LinkGreen className="mt-2" href={lang === 'id' ? `/${lang}/produk-layanan` : `/${lang}/product`}>
              {dict.home.learnMore}
            </LinkGreen>
          </div>
        </div>

        {/* Product Cards */}
        <div className="mt-14 flex flex-col gap-5 md:flex-row">
          {data.products?.map((product: Product) => (
            <ProductCard
              key={product.id}
              imgUrl={getImageUrl(product?.image?.url)}
              imgAlt={product.image?.alternativeText ?? "Product image"}
              title1={product.title}
              title2={product.description}
              color1={`#${product.color1}`}
              color2={`#${product.color2}`}
              url={`/${lang}/product/${product.url}`}
              readMoreText={dict.home.learnMore}
            />
          ))}
        </div>

        {/* Integrated SEO Content - Company Description */}
        <div className="mt-16 rounded-2xl bg-[#083F19] p-8 text-white lg:p-12">
          <h3 className="mb-4 text-2xl font-bold lg:text-3xl">
            {lang === 'id' 
              ? 'PT Centra Biotech Indonesia - Perusahaan Bioteknologi Terdepan'
              : 'PT Centra Biotech Indonesia - Leading Biotechnology Company'}
          </h3>
          <p className="mb-6 leading-relaxed text-gray-200">
            {lang === 'id' ? (
              <>
                Sebagai <strong>perusahaan bioteknologi di Indonesia</strong> yang inovatif, 
                <strong> PT Biotech</strong> CBI (Centra Biotech Indonesia) mengembangkan 
                <strong> pupuk hayati</strong>, <strong>insektisida hayati</strong>, dan <strong>probiotik</strong> melalui 
                <strong> penelitian dan pengembangan</strong> berbasis teknologi fermentasi modern. Dengan 
                <strong> sumber daya manusia</strong> kompeten <strong>di bidang</strong> bioteknologi, kami menghasilkan 
                <strong> vaksin dan produk bioteknologi</strong> yang terbukti meningkatkan produktivitas 
                <strong> pangan dan</strong> pertanian berkelanjutan di Indonesia.
              </>
            ) : (
              <>
                As an innovative <strong>biotechnology company in Indonesia</strong>, 
                <strong> PT Biotech</strong> CBI (Centra Biotech Indonesia) develops 
                <strong> biological fertilizers</strong>, <strong>biological insecticides</strong>, and <strong>probiotics</strong> through 
                <strong> research and development</strong> based on modern fermentation technology. With 
                <strong> competent human resources</strong> in the <strong>field of</strong> biotechnology, we produce 
                <strong> vaccines and biotechnology products</strong> that have been proven to increase 
                <strong> food and</strong> sustainable agricultural productivity in Indonesia.
              </>
            )}
          </p>
          
          {/* Quick Links Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href={lang === 'id' ? `/${lang}/produk-layanan/pertanian` : `/${lang}/product/agriculture`} className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
              <span className="text-2xl">🌾</span>
              <div>
                <div className="font-semibold">{lang === 'id' ? 'Pupuk Organik Cair' : 'Liquid Organic Fertilizer'}</div>
                <div className="text-xs text-gray-300">{dict.nav.agriculture}</div>
              </div>
            </Link>
            <Link href={lang === 'id' ? `/${lang}/produk-layanan/peternakan` : `/${lang}/product/livestock`} className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
              <span className="text-2xl">🐄</span>
              <div>
                <div className="font-semibold">{lang === 'id' ? 'Probiotik Peternakan' : 'Livestock Probiotics'}</div>
                <div className="text-xs text-gray-300">{dict.nav.livestock}</div>
              </div>
            </Link>
            <Link href={lang === 'id' ? `/${lang}/produk-layanan/perikanan` : `/${lang}/product/fishery`} className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
              <span className="text-2xl">🐟</span>
              <div>
                <div className="font-semibold">{lang === 'id' ? 'Bioaktivator Perikanan' : 'Fishery Bioactivator'}</div>
                <div className="text-xs text-gray-300">{dict.nav.fishery}</div>
              </div>
            </Link>
            <Link href={`/${lang}/about-us`} className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
              <span className="text-2xl">🏢</span>
              <div>
                <div className="font-semibold">{lang === 'id' ? 'Tentang PT CBI' : 'About PT CBI'}</div>
                <div className="text-xs text-gray-300">{lang === 'id' ? 'Profil Perusahaan' : 'Company Profile'}</div>
              </div>
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 border-t border-white/20 pt-6 text-sm">
            <Link href={`/${lang}/blog`} className="text-gray-300 hover:text-white hover:underline">📝 {dict.nav.blog}</Link>
            <Link href={`/${lang}/news`} className="text-gray-300 hover:text-white hover:underline">📰 {dict.nav.news}</Link>
            <Link href={`/${lang}/documents`} className="text-gray-300 hover:text-white hover:underline">📄 {dict.nav.documents}</Link>
            <Link href={`/${lang}/contact`} className="text-gray-300 hover:text-white hover:underline">📞 {dict.nav.contact}</Link>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default ProductServiceSection;
