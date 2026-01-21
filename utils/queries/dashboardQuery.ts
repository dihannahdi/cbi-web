import { generateQuery } from "../generateQuery";
import { IMAGE_QUERY, WITH_BANNER_CTA_QUERY, WITH_METADATA } from "./common";

export const getDashboardQuery = () => {
  const params = {
    populate: {
      headline: {
        populate: {
          ...IMAGE_QUERY,
        },
      },
      whySection: {
        populate: {
          ...IMAGE_QUERY,
        },
      },
      productService: {
        populate: {
          products: {
            populate: {
              ...IMAGE_QUERY,
            },
          },
        },
      },
      ourImpact: {
        populate: {
          product1image: {
            fields: ["url", "alternativeText", "width", "height"],
          },
          product1bgimage: {
            fields: ["url", "alternativeText", "width", "height"],
          },
          product2image: {
            fields: ["url", "alternativeText", "width", "height"],
          },
          product2bgimage: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      latestNews: {
        populate: {
          blogs: {
            fields: [
              "title",
              "shortDescription",
              "slug",
              "createdAt",
              "publishedAt",
              "type",
            ],
            populate: {
              ...IMAGE_QUERY,
            },
          },
          news: {
            fields: [
              "title",
              "shortDescription",
              "slug",
              "createdAt",
              "publishedAt",
              "type",
            ],
            populate: {
              ...IMAGE_QUERY,
            },
          },
        },
      },
      ...WITH_BANNER_CTA_QUERY,
      ...WITH_METADATA,
    },
  };

  return generateQuery(params);
};
