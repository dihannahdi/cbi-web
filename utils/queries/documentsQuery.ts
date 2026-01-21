import { generateQuery } from "../generateQuery";
import { IMAGE_QUERY } from "./common";

export const getDocumentsQuery = () => {
  const params = {
    populate: {
      headline: {
        populate: "*",
      },
      certificates: {
        fields: ["title", "description", "publishedAt"],
        populate: {
          ...IMAGE_QUERY,
          file: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      brochures: {
        fields: ["title", "description", "publishedAt"],
        populate: {
          ...IMAGE_QUERY,
          file: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
    },
  };

  return generateQuery(params);
};
