import { generateQuery } from "../generateQuery";
import { IMAGE_QUERY } from "./common";

export const getArticlesCollectionQuery = () => {
  const params = {
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
  };

  return generateQuery(params);
};
