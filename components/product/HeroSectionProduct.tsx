"use client";

import Image from "next/image";
import Link from "next/link";
import ContainerSection from "@/components/layout/container";
import { Award, MessageCircle, ShoppingCart, BadgeCheck } from "lucide-react";

interface ProductHeroProps {
  imgUrl: string;
  productName: string;
  subtitle: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  stats: Array<{ value: string; label: string }>;
  ctaWhatsapp: string;
  ctaShopee: string;
  whatsappUrl: string;
  shopeeUrl: string;
  pricing: {
    price: string;
    originalPrice: string;
    discount: string;
  };
  registrationLabel: string;
  lang: string;
}

const HeroSectionProduct = ({
  imgUrl,
  productName,
  subtitle,
  heroTitle,
  heroSubtitle,
  stats,
  ctaWhatsapp,
  ctaShopee,
  whatsappUrl,
  shopeeUrl,
  pricing,
  registrationLabel,
}: ProductHeroProps) => {
  return (
    <section className="relative h-[600px] overflow-hidden lg:h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/products/rajabio/rajabio-poster.jpg"
          alt=""
          fill
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004d1a]/95 via-[#006622]/90 to-[#008833]/80" />
      </div>

      {/* Blur Gradient Overlay - Matching HeroSectionGeneral */}
      <div className="absolute bottom-0 left-0 right-0 h-96 backdrop-blur-lg [mask:linear-gradient(transparent,white,white)]" />

      {/* Content */}
      <ContainerSection className="relative z-10 flex h-full flex-col justify-center pt-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium mb-6">
              <BadgeCheck className="h-4 w-4" />
              <span>{registrationLabel}</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl mb-4">
              {productName}
              <span className="block text-[#90EE90] text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
                {subtitle}
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-medium text-white/90 mb-4">
              {heroTitle}
            </p>

            <p className="text-lg text-white/80 mb-8 max-w-xl">
              {heroSubtitle}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#90EE90]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={whatsappUrl}
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] px-6 py-4 font-semibold text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                {ctaWhatsapp}
              </Link>
              <Link
                href={shopeeUrl}
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-[#EE4D2D] hover:bg-[#D73211] px-6 py-4 font-semibold text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ShoppingCart className="h-5 w-5" />
                {ctaShopee}
              </Link>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="hidden lg:block relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Product Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm p-4">
                <Image
                  src={imgUrl}
                  alt={`${productName} - ${subtitle}`}
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              {/* Price Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#C46617] text-white rounded-2xl p-4 shadow-xl">
                <div className="text-xs line-through opacity-70">
                  {pricing.originalPrice}
                </div>
                <div className="text-2xl font-bold">{pricing.price}</div>
                <div className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-semibold mt-1">
                  {pricing.discount}
                </div>
              </div>

              {/* Certificate Badge */}
              <div className="absolute -top-4 -left-4 bg-white text-[#006622] rounded-full p-3 shadow-xl">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default HeroSectionProduct;
