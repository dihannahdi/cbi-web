import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { Headline } from "@/types/responseTypes/headline";
import { getImageUrl } from "@/utils/getImageUrl";

const HeroSection = ({ data }: { data: Headline }) => {
  return (
    <HeroSectionGeneral
      imgUrl={getImageUrl(data?.image?.url)}
      category={data.description}
      title={
        <h1 className="text-center text-3xl font-bold text-white lg:text-5xl xl:text-[56px]">
          {data.title}
        </h1>
      }
    />
  );
};

export default HeroSection;
