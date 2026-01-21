import { generateQuery } from "../generateQuery";
import {
  IMAGE_QUERY,
  WITH_BANNER_CTA_QUERY,
  WITH_HEADLINE_QUERY,
} from "./common";

export const getNewsSectionQuery = () => {
  const params = {
    populate: {
      ...WITH_HEADLINE_QUERY,

      headlineNews: {
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
      news1: {
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
      news2: {
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
