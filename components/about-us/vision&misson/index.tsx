import { FC } from "react";
import Image from "next/image";

import VisionMission from "./VisionMission";
import CorporateValue from "./CorporateValue";

import {
  CorporateValue as CorporateValueProps,
  VisionMission as VisionMissionProps,
} from "@/types/responseTypes/aboutUsData";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface VisionValueSection {
  visionMission: VisionMissionProps;
  corporateValue: CorporateValueProps;
  lang: Locale;
  dict: Dictionary;
}

const VisionMissionSection: FC<VisionValueSection> = ({ visionMission, corporateValue, lang, dict }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#eee]">
      <div className="absolute bottom-1/3 left-1/4 h-[64rem] w-[64rem] -translate-x-1/2 translate-y-1/3 xl:left-[15%]">
        <Image
          draggable={false}
          src="/logo-only.png"
          alt="logo cbi"
          width={600}
          height={600}
          className="h-full w-full object-cover opacity-40 brightness-0 invert"
        />
      </div>
      <div className="relative z-10">
        <VisionMission visionMissionData={visionMission} lang={lang} dict={dict} />
        <CorporateValue corporateValueData={corporateValue} lang={lang} dict={dict} />
      </div>
    </section>
  );
};

export default VisionMissionSection;
