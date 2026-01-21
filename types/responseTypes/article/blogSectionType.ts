import { BannerCTA } from "../bannerCTA";
import { Headline } from "../headline";
import { ArticleItem } from "./articleItem";

export interface BlogData {
  // Strapi default data
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  // Section type
  headline: Headline;
  headlineBlog: ArticleItem;
  blog1: ArticleItem[];
  blog2: ArticleItem[];
  bannerCTA: BannerCTA;
}
