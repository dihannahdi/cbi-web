import qs from "qs";

export const generateQuery = (paramsQuery: Record<string, any>) => {
  return qs.stringify(paramsQuery, {
    encodeValuesOnly: true,
  });
};
