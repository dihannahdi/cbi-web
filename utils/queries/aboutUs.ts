import { generateQuery } from "../generateQuery";
import {
  IMAGE_QUERY,
  WITH_BANNER_CTA_QUERY,
  WITH_HEADLINE_QUERY,
} from "./common";

export const getAboutUsQuery = () => {
  const params = {
    populate: {
      ...WITH_HEADLINE_QUERY,
      aboutUs: {
        populate: {
          ...IMAGE_QUERY,
        },
      },
      visionMission: {
        fields: ["title", "description"],
        populate: {
          visionItem: {
            populate: {
              ...IMAGE_QUERY,
            },
          },
        },
      },
      corporateValue: {
        populate: "*",
      },
      managements: {
        fields: ["name", "position", "description", "createdAt", "publishedAt"],
        populate: {
          ...IMAGE_QUERY,
        },
      },
      ...WITH_BANNER_CTA_QUERY,
    },
  };

  return generateQuery(params);
};
