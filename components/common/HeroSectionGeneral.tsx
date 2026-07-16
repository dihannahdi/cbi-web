"use client";

import Image from "next/image";
import React from "react";

interface HeroSectionGeneralProps {
  imgUrl: string;
  category?: string | null | undefined;
  title: React.ReactNode;
}

const HeroSectionGeneral = ({
  imgUrl,
  category,
  title,
}: HeroSectionGeneralProps) => {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 via-green-900/45 to-green-900/25"></div>
      {/* Image background - priority for LCP optimization */}
      <Image
        src={imgUrl}
        alt="hero banner cbi"
        width={1440}
        height={500}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="h-[500px] w-full object-cover object-[center_20%]"
      />

      {/* Multi-step Blur Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-96 backdrop-blur-lg [mask:linear-gradient(transparent,white,white)]" />

      {/* Content */}
      <div className="absolute bottom-[40%] left-1/2 z-10 w-full max-w-6xl -translate-x-1/2 translate-y-1/2 pt-14 text-white lg:bottom-[35%]">
        <div className="mx-2 flex h-full flex-col items-center justify-center space-y-3 md:mx-0">
          {category && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-lime-300 backdrop-blur-sm lg:text-sm">
              {category}
            </span>
          )}
          {title}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionGeneral;
