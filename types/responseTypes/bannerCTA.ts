import { Image } from "./image";

export interface BannerCTA {
  id: number;
  title: string;
  ctaText: string;
  description?: string;
  image: Image;
}
