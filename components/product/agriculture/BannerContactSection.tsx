import Image from "next/image";

import LinkGreen from "@/components/home/LinkGreen";
import ContainerSection from "@/components/layout/container";
import { BannerCTA } from "@/types/responseTypes/bannerCTA";
import { getImageUrl } from "@/utils/getImageUrl";

const BannerContactSection = ({ data }: { data: BannerCTA }) => {
  return (
    <section className="bg-[#EEE]">
      <ContainerSection>
        <div className="relative min-h-[22rem] w-full overflow-hidden rounded-3xl bg-cover bg-bottom bg-no-repeat xl:min-h-[25rem]">
          {/* Background with Image component - lazy load for below-fold */}
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(data?.image?.url)}
              alt="Agriculture Banner"
              fill
              loading="lazy"
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-[#171717]/80" />

          {/* Content */}
          <div className="absolute z-20 flex h-full w-full flex-col items-start justify-between p-8 md:flex-row md:items-center lg:px-24 lg:py-10">
            <div className="flex flex-1 items-center">
              <h2 className="max-w-[16rem] text-[32px] font-normal !leading-tight text-white md:max-w-sm lg:text-[40px] xl:max-w-4xl xl:text-5xl">
                {data?.title}
              </h2>
            </div>
            <div className="mt-4 flex items-center justify-end md:mt-0">
              <LinkGreen href="/contact" withArrow={false}>
                {data.ctaText}
              </LinkGreen>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default BannerContactSection;
