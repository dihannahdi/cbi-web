import Image from "next/image";

import { getImageUrl } from "@/utils/getImageUrl";
import { WhySection as WhySectionProps } from "@/types/responseTypes/dashboard/whySection";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

import ContainerSection from "@/components/layout/container";

interface WhySectionComponentProps {
  data: WhySectionProps;
  lang: Locale;
  dict: Dictionary;
}

const WhySection = async ({ data, lang, dict }: WhySectionComponentProps) => {
  try {
    return (
      <section className="w-full bg-[#eee]">
        <ContainerSection className="flex flex-col items-center justify-between gap-8 md:flex-row xl:gap-16">
          {/* Text */}
          <div className="flex flex-1 flex-col gap-y-6">
            <h2>{lang === 'id' ? data.title : dict.home.whyTitle}</h2>
            <p>{lang === 'id' ? data.description : dict.home.whySubtitle}</p>
          </div>

          {/* Image */}
          {data?.image?.url && (
            <div className="flex-1">
              <Image
                src={getImageUrl(data.image.url)}
                alt={
                  data.image.alternativeText ??
                  "image of farmers and rice fields"
                }
                width={data.image.width ?? 400}
                height={data.image.height ?? 400}
                className="h-44 flex-1 rounded-3xl object-cover md:h-[22.25rem] lg:h-[28.5rem] xl:h-96"
              />
            </div>
          )}
        </ContainerSection>
      </section>
    );
  } catch (e) {
    console.error(e);
  }
};

export default WhySection;
