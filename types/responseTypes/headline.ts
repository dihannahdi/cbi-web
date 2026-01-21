import { Image } from "./image";

export interface Headline {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  image?: Image;
}
