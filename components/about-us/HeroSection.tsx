import { getImageUrl } from "@/utils/getImageUrl";
import { Headline } from "@/types/responseTypes/headline";

import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";

const HeroSectionAboutUs = ({ headline }: { headline: Headline }) => {
  return (
    <HeroSectionGeneral
      imgUrl={getImageUrl(headline?.image?.url)}
      title={<h1 className="text-center text-white">{headline?.title}</h1>}
    />
  );
};

export default HeroSectionAboutUs;
