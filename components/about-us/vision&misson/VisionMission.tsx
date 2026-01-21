import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/getImageUrl";

import ContainerSection from "@/components/layout/container";
import { VisionMission as VisionMissionProps } from "@/types/responseTypes/aboutUsData";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface VisionMissionComponentProps {
  visionMissionData: VisionMissionProps;
  lang: Locale;
  dict: Dictionary;
}

const VisionMission = ({
  visionMissionData,
  lang,
  dict,
}: VisionMissionComponentProps) => {
  // Use dictionary fallback for English
  const title = lang === 'id' ? visionMissionData.title : dict.about.visionMissionTitle;
  const description = lang === 'id' ? visionMissionData.description : dict.about.visionMissionDesc;

  return (
    <ContainerSection>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="space-y-6 md:w-[40%]">
          <h2>{title}</h2>
          <p className="max-w-96">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:w-[60%] xl:grid-cols-2">
          {visionMissionData?.visionItem?.map((content, index) => (
            <div
              key={content.id}
              className={cn(
                "rounded-sm bg-[#FDFDFD] p-6 drop-shadow-sm md:rounded-lg",
                index === visionMissionData?.visionItem.length - 1 &&
                  "xl:col-span-2",
              )}
            >
              <Image
                src={getImageUrl(content.image.url)}
                alt={content.image?.alternativeText ?? "icon"}
                width={32}
                height={32}
                className="h-8 w-8 md:h-12 md:w-12"
              />
              <p className="mt-2">{content.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ContainerSection>
  );
};

export default VisionMission;
