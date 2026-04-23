const API_URL = (process.env.NEXT_PUBLIC_URL_API || 'https://backend.centrabiotechindonesia.com').trim();

export const getImageUrl = (
  imageUrl: string | null | undefined,
  placeholder = "/og-image.jpg",
): string => {
  // Check if imageUrl exists AND is not empty/whitespace
  // This prevents invalid URLs like "https://backend.centrabiotechindonesia.com" without an image path
  if (imageUrl && imageUrl.trim() !== "") {
    return `${API_URL}${imageUrl}`;
  }
  return placeholder;
};
