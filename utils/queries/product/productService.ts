import { generateQuery } from "@/utils/generateQuery";
import { WITH_BANNER_CTA_QUERY, WITH_HEADLINE_QUERY } from "../common";

export const getProductServiceQuery = () => {
  const params = {
    populate: {
      ...WITH_HEADLINE_QUERY,

      whySection: {
        populate: "*",
      },
      productsSection: {
        populate: {
          products: {
            populate: "*",
          },
        },
      },
      servicesSection: {
        populate: {
          services: {
            populate: "*",
          },
        },
      },
      ...WITH_BANNER_CTA_QUERY,
    },
  };

  return generateQuery(params);
};
