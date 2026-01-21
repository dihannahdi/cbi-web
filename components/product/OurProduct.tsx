import {
  Product,
  ProductsSection,
} from "@/types/responseTypes/productService/productAndServiceData";
import { getImageUrl } from "@/utils/getImageUrl";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

import ProductCard from "../home/ProductCard";
import ContainerSection from "../layout/container";

interface OurProductSectionProps {
  data: ProductsSection;
  lang: Locale;
  dict: Dictionary;
}

const OurProductSection = ({ data, lang, dict }: OurProductSectionProps) => {
  return (
    <section>
      <ContainerSection>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex-1">
            <h2 className="text-3xl font-bold lg:text-4xl">{dict.home.productsTitle}</h2>
          </div>
        </div>

        {/* Images */}
        <div className="mt-14 flex flex-col gap-5 md:flex-row">
          {data.products.map((product: Product) => (
            <ProductCard
              key={product.id}
              imgUrl={getImageUrl(product?.image?.url)}
              imgAlt={product.image?.alternativeText ?? "Product image"}
              title1={product.title}
              title2={product.description}
              color1={`#${product.color1}`}
              color2={`#${product.color2}`}
              url={`/${lang}/produk-layanan/${product.url}`}
              readMoreText={dict.home.learnMore}
            />
          ))}
        </div>
      </ContainerSection>
    </section>
  );
};

export default OurProductSection;
