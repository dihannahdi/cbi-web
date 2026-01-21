import { generateQuery } from "../generateQuery";

export const getContactQuery = () => {
  const params = {
    populate: {
      headline: {
        populate: "*",
      },
      addressAndContact: {
        populate: "*",
      },
    },
  };

  return generateQuery(params);
};
