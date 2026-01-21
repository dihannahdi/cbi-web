import { generateQuery } from "../generateQuery";
import { IMAGE_QUERY, WITH_BANNER_CTA_QUERY } from "./common";

export const getBlogSectionQuery = () => {
  const params = {
    populate: {
      headline: {
        populate: "*",
      },
      headlineBlog: {
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
      blog1: {
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
      blog2: {
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
      ...WITH_BANNER_CTA_QUERY,
    },
  };

  return generateQuery(params);
};
