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

// Translation map for product titles/descriptions from Strapi that may not respect locale
const productTranslations: Record<string, { id: string; en: string }> = {
  "Agriculture": { id: "Pertanian", en: "Agriculture" },
  "Livestock": { id: "Peternakan", en: "Livestock" },
  "Fishery": { id: "Perikanan", en: "Fishery" },
  "Pertanian": { id: "Pertanian", en: "Agriculture" },
  "Peternakan": { id: "Peternakan", en: "Livestock" },
  "Perikanan": { id: "Perikanan", en: "Fishery" },
};

const translateProductText = (text: string, lang: Locale): string => {
  return productTranslations[text]?.[lang] ?? text;
};

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
            <LinkGreen className="mt-2" href={`/${lang}/produk-layanan`}>
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
              title1={translateProductText(product.title, lang)}
              title2={translateProductText(product.description, lang)}
              color1={`#${product.color1}`}
              color2={`#${product.color2}`}
              url={`/${lang}/produk-layanan/${product.url === 'agriculture' ? 'pertanian' : product.url === 'livestock' ? 'peternakan' : product.url === 'fishery' ? 'perikanan' : product.url}`}
              readMoreText={dict.home.learnMore}
            />
          ))}
        </div>
        {/* ...existing code... */}
      </ContainerSection>
    </section>
  );
};

export default ProductServiceSection;
