"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { ArrowLeft, ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ContainerSection from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/getImageUrl"; // Import the utility function

import type { Swiper as SwiperType } from "swiper";
import {
  ProductCategory,
  ProductItem,
} from "@/types/responseTypes/productService/productAgriculture";

// Map product titles to their actual URL slugs
const getProductSlug = (title: string | undefined, lang: 'id' | 'en'): string => {
  if (!title) return '';
  
  const normalizedTitle = title.toUpperCase().trim();
  
  // Slug mapping for each product
  const slugMap: Record<string, { id: string; en: string }> = {
    'FLORAONE': { 
      id: 'floraone-pupuk-hayati', 
      en: 'floraone-pupuk-hayati' 
    },
    'SIMBIOS': { 
      id: 'simbios-pupuk-hayati-cair', 
      en: 'simbios-pupuk-hayati-cair' 
    },
    'RAJABIO': { 
      id: 'rajabio-pupuk-organik-cair', 
      en: 'rajabio-pupuk-organik-cair' 
    },
    'BIO KILLER': { 
      id: 'biokiller-insektisida-hayati', 
      en: 'biokiller-insektisida-hayati' 
    },
    'BIOKILLER': { 
      id: 'biokiller-insektisida-hayati', 
      en: 'biokiller-insektisida-hayati' 
    },
    'BLACKTURBO ASAM HUMAT': {
      id: 'blackturbo-asam-humat-cair',
      en: 'blackturbo-asam-humat-cair'
    },
    'BLACKTURBO HUMIC ACID': {
      id: 'blackturbo-asam-humat-cair',
      en: 'blackturbo-asam-humat-cair'
    },
    'BLACK TURBO ASAM HUMAT': {
      id: 'blackturbo-asam-humat-cair',
      en: 'blackturbo-asam-humat-cair'
    },
    'BLACK TURBO HUMIC ACID': {
      id: 'blackturbo-asam-humat-cair',
      en: 'blackturbo-asam-humat-cair'
    },
    'BLACK TURBO': {
      id: 'blackturbo-asam-humat-cair',
      en: 'blackturbo-asam-humat-cair'
    },
    'BIOKALSI': {
      id: 'biokalsi-dolomit-pembenah-tanah',
      en: 'biokalsi-dolomit-pembenah-tanah'
    },
    'BIOKALSI DOLOMIT': {
      id: 'biokalsi-dolomit-pembenah-tanah',
      en: 'biokalsi-dolomit-pembenah-tanah'
    },
    'DOLOMIT': {
      id: 'biokalsi-dolomit-pembenah-tanah',
      en: 'biokalsi-dolomit-pembenah-tanah'
    },
    'DOLOMITE': {
      id: 'biokalsi-dolomit-pembenah-tanah',
      en: 'biokalsi-dolomit-pembenah-tanah'
    },
    'FLORAONE PADAT': {
      id: 'floraone-pupuk-hayati-padat',
      en: 'floraone-pupuk-hayati-padat'
    },
    'FLORA ONE PADAT': {
      id: 'floraone-pupuk-hayati-padat',
      en: 'floraone-pupuk-hayati-padat'
    },
    'BIOJAGAT': {
      id: 'biojagat-pupuk-hayati-cair',
      en: 'biojagat-pupuk-hayati-cair'
    },
  };
  
  const mapping = slugMap[normalizedTitle];
  if (mapping) {
    return mapping[lang];
  }
  
  // Fallback: convert title to slug format
  return title.toLowerCase().replace(/\s+/g, '-');
};

// Get the correct base path for product pages
const getProductBasePath = (lang: 'id' | 'en'): string => {
  return `/${lang}/produk-layanan/pertanian`;
};

const getFallbackProductImage = (title?: string): string | null => {
  if (!title) return null;

  const normalizedTitle = title.toUpperCase().trim();

  if (normalizedTitle.includes('BLACK')) {
    return 'https://backend.centrabiotechindonesia.com/uploads/mockup-black-turbo.webp';
  }

  if (normalizedTitle.includes('DOLOMIT') || normalizedTitle.includes('DOLOMITE') || normalizedTitle.includes('BIOKALSI')) {
    return 'https://backend.centrabiotechindonesia.com/uploads/dolomit-biokalsi-mockup.webp';
  }

  return null;
};

const AgricultureProductsSection = ({
  productCategories,
  lang = 'id',
}: {
  productCategories: ProductCategory[];
  lang?: 'id' | 'en';
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    productCategories[0]?.id,
  );
  const [swiper, setSwiper] = useState<SwiperType>();
  const [activeProduct, setActiveProduct] = useState<ProductItem | undefined>(
    productCategories[0].product_items[0],
  );
  const [activeSlide, setActiveSlide] = useState(1);

  const activeCategory = productCategories.find(
    (category) => category.id === activeCategoryId,
  );

  // Reset swiper and active product when menu changes
  useEffect(() => {
    if (activeCategory) {
      setActiveProduct(activeCategory.product_items[0]);
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
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "filter-pill",
                  activeCategoryId === category.id
                    ? "filter-pill-active"
                    : "filter-pill-inactive",
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
          <Link 
            href={`${getProductBasePath(lang)}/${getProductSlug(activeProduct?.title, lang)}`}
            className="aspect-square w-full max-w-[30rem] lg:max-w-[37.5rem] rounded-3xl bg-[#99AC33] cursor-pointer hover:bg-[#8a9b2e] transition-colors flex items-center justify-center overflow-visible mx-auto lg:mx-0 relative"
          >
            {(() => {
              const placeholderUrl = "/img-placeholder.png";
              const imageUrl = getImageUrl(activeProduct?.image?.url, placeholderUrl);
              const fallbackImage = getFallbackProductImage(activeProduct?.title);
              const resolvedImageUrl = imageUrl === placeholderUrl && fallbackImage ? fallbackImage : imageUrl;
              
              // Check if this is Flora One Padat - make it bigger and allow overlap
              const isFloraOnePadat = activeProduct?.title?.toUpperCase().includes('FLORAONE PADAT') || 
                                       activeProduct?.title?.toUpperCase().includes('FLORA ONE PADAT');
              
              const imageClasses = isFloraOnePadat 
                ? "w-[110%] h-[110%] object-contain scale-110 -translate-y-4" 
                : "w-[85%] h-[85%] object-contain";

              return (
            <Image
              className={imageClasses}
              src={resolvedImageUrl}
              width={500}
              height={500}
              alt={activeProduct?.image?.alternativeText || "Product Image"}
              unoptimized
            />
              );
            })()}
          </Link>

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
              className="h-[16rem] w-full lg:h-[18rem]"
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
                    <p className="text-ellipsis text-sm text-[#666] line-clamp-3">
                      {product.description}
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <Link
                        href={`${getProductBasePath(lang)}/${getProductSlug(product.title, lang)}`}
                        className="inline-flex items-center justify-center gap-2 bg-[#006622] hover:bg-[#004d1a] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg text-sm"
                      >
                        {lang === 'id' ? 'Lihat Selengkapnya' : 'View Details'}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={lang === 'id'
                          ? `https://wa.me/6285196214187?text=Halo%20Centra%20Biotech%2C%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.title || '')}`
                          : `https://wa.me/6285196214187?text=Hello%20Centra%20Biotech%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.title || '')}%20product`
                        }
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg text-sm"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {lang === 'id' ? 'Konsultasi' : 'Consultation'}
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-sm text-gray-500">
                {activeSlide}/{activeCategory?.product_items.length}
              </span>
              <button
                onClick={() => swiper?.slidePrev()}
                className="btn-icon"
                aria-label="Previous product"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="btn-icon"
                aria-label="Next product"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default AgricultureProductsSection;
