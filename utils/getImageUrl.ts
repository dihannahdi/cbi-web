export const getImageUrl = (
  imageUrl: string | null | undefined,
  placeholder = "/img-placeholder.png",
): string => {
  // Check if imageUrl exists AND is not empty/whitespace
  // This prevents invalid URLs like "https://cbi-backend.my.id" without an image path
  if (imageUrl && imageUrl.trim() !== "") {
    return `${process.env.NEXT_PUBLIC_URL_API}${imageUrl}`;
  }
  return placeholder;
};
