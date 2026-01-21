import { FC } from "react";
import HeroSectionGeneral from "../common/HeroSectionGeneral";
import ContainerSection from "../layout/container";
import { Headline } from "@/types/responseTypes/headline";
import { getImageUrl } from "@/utils/getImageUrl";

interface HeroSectionProps {
  headline: Headline;
  introTitle?: string;
  introDescription?: string;
}

/**
 * Media HeroSection with optional integrated SEO intro
 * Used for Blog and News pages
 */
const HeroSection: FC<HeroSectionProps> = ({ headline, introTitle, introDescription }) => {
  return (
    <>
      <HeroSectionGeneral
        imgUrl={getImageUrl(headline.image?.url)}
        category={headline.description}
        title={
          <h1 className="text-center text-3xl font-bold text-white lg:text-5xl xl:text-[56px]">
            {headline.title}
          </h1>
        }
      />
      
      {/* Integrated SEO Intro (if provided) */}
      {introTitle && introDescription && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-10">
          <ContainerSection>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
                {introTitle}
              </h2>
              <p className="leading-relaxed text-gray-600 md:text-lg">
                {introDescription}
              </p>
            </div>
          </ContainerSection>
        </section>
      )}
    </>
  );
};

export default HeroSection;
