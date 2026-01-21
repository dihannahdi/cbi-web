import { getImageUrl } from "@/utils/getImageUrl";

import CTASection from "@/components/common/CTA";
import ContainerSection from "@/components/layout/container";

import { BannerCTA } from "@/types/responseTypes/bannerCTA";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

const CTAContent = ({ title }: { title: string }) => (
  <div className="max-w-[820px] space-y-6">
    <h2 className="text-[#FDFDFD] font-bold lg:text-[40px] lg:leading-[50px] xl:text-5xl/[60px]">
      {title}
    </h2>
  </div>
);

interface CTAMediaSectionProps {
  data: BannerCTA;
  lang?: Locale;
  dict?: Dictionary;
}

const CTAMediaSection = ({ data, lang }: CTAMediaSectionProps) => {
  const contactPath = lang ? `/${lang}/contact` : '/contact';
  
  return (
    <section className="h-full w-full bg-[#EEE]">
      <ContainerSection className="h-full">
        <CTASection
          backgroundImage={getImageUrl(data?.image?.url)}
          content={<CTAContent title={data.title} />}
          buttonText={data.ctaText}
          buttonHref={contactPath}
        />
      </ContainerSection>
    </section>
  );
};

export default CTAMediaSection;
