export const getFileUrl = (url: string) => {
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_URL_API}${url}`;
};
