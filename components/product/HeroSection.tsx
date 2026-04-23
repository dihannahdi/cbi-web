import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { Headline } from "@/types/responseTypes/headline";
import { getImageUrl } from "@/utils/getImageUrl";

interface HeroSectionProps {
  data: Headline;
  categoryText?: string;
  titleText?: string;
}

const HeroSection = ({ data, categoryText, titleText }: HeroSectionProps) => {
  return (
    <HeroSectionGeneral
      imgUrl={getImageUrl(data?.image?.url)}
      category={categoryText ?? data.description}
      title={
        <h1 className="text-center text-3xl font-bold text-white lg:text-5xl xl:text-[56px]">
          {titleText ?? data.title}
        </h1>
      }
    />
  );
};

export default HeroSection;
