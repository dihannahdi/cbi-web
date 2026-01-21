"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ContainerSection from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/getImageUrl";

import type { Swiper as SwiperType } from "swiper";
import {
  ProductCategory,
  ProductItem,
} from "@/types/responseTypes/productService/productAgriculture";

const FisheryProductsSection = ({
  productCategories,
}: {
  productCategories: ProductCategory[];
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    productCategories[0]?.id,
  );
  const [swiper, setSwiper] = useState<SwiperType>();
  const [activeProduct, setActiveProduct] = useState<ProductItem | undefined>(
    productCategories[0]?.product_items[0],
  );
  const [activeSlide, setActiveSlide] = useState(1);

  const activeCategory = productCategories.find(
    (category) => category.id === activeCategoryId,
  );

  // Reset swiper and active product when menu changes
  useEffect(() => {
    if (activeCategory) {
      setActiveProduct(activeCategory?.product_items[0]);
      setActiveSlide(1);
      swiper?.slideTo(0);
    }
  }, [activeCategory, activeCategoryId, swiper]);

  return (
    <section>
      <ContainerSection className="flex flex-col items-stretch gap-4 overflow-hidden lg:gap-10 xl:flex-row">
        {/* Button and texts */}
        <div className="flex flex-col gap-4 lg:gap-12 xl:w-1/3">
          {/* buttons */}
          <div className="flex gap-2">
            {productCategories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "rounded-[1.5rem] px-3 py-2 text-xs lg:text-sm",
                  activeCategoryId === category.id
                    ? "bg-[#009933] text-white"
                    : "border border-gray-200 text-[#666]",
                )}
                onClick={() => setActiveCategoryId(category.id)}
              >
                {category.title}
              </button>
            ))}
          </div>

          <p className="text-sm lg:text-base">{activeCategory?.description}</p>
        </div>

        {/* Swiper Image and Texts */}
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-16">
          <div className="h-[20rem] flex-1 rounded-3xl bg-[#99AC33] lg:h-[25rem]">
            <Image
              className="h-[20rem] w-full scale-75 object-contain lg:h-[25rem]"
              src={getImageUrl(activeProduct?.image?.url)} // Use the utility function here
              width={280}
              height={315}
              alt={activeProduct?.image?.alternativeText ?? "Product Image"}
            />
          </div>

          {/* title, description, and swiper button previous and next */}
          <div className="flex flex-1 flex-col justify-center gap-6">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              onSwiper={setSwiper}
              direction="vertical"
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="h-[12rem] w-full"
              onSlideChange={(swiper) => {
                const currentIndex = swiper.realIndex;
                setActiveProduct(activeCategory?.product_items[currentIndex]);
                setActiveSlide(currentIndex + 1);
              }}
            >
              {activeCategory?.product_items.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex h-full flex-col gap-4 lg:justify-center">
                    <h3 className="text-xl font-semibold text-[#222] lg:text-2xl">
                      {product.title}
                    </h3>
                    <p className="text-ellipsis text-sm text-[#666]">
                      {product.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <div className="flex items-center justify-end gap-4">
              <span className="text-sm text-[#666]">
                {activeSlide}/{activeCategory?.product_items.length}
              </span>
              <button
                onClick={() => swiper?.slidePrev()}
                className="flex h-12 w-fit items-center gap-2 rounded-[0.5rem] bg-[#009933] px-4 text-sm text-white transition-colors duration-300 hover:bg-green-700 lg:text-base xl:text-xl"
              >
                <span className="text-white">
                  <ArrowLeft size={16} />
                </span>
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="flex h-12 w-fit items-center gap-2 rounded-[0.5rem] bg-[#009933] px-4 text-sm text-white transition-colors duration-300 hover:bg-green-700 lg:text-base xl:text-xl"
              >
                <span className="text-white">
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default FisheryProductsSection;
