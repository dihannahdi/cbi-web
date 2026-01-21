import { generateQuery } from "@/utils/generateQuery";
import {
  WITH_BANNER_CTA_QUERY,
  WITH_HEADLINE_QUERY,
  WITH_METADATA,
} from "../common";

export const getServicesQuery = () => {
  const params = {
    populate: {
      ...WITH_HEADLINE_QUERY,

      aboutSection: "*",
      whySection: {
        populate: {
          why1: {
            populate: "*",
          },
          why2: {
            populate: "*",
          },
          why3: {
            populate: "*",
          },
        },
      },
      productCategoriesSection: {
        populate: {
          product_items: {
            populate: "*",
          },
        },
      },
      ...WITH_BANNER_CTA_QUERY,
      ...WITH_METADATA,
    },
  };

  return generateQuery(params);
};
