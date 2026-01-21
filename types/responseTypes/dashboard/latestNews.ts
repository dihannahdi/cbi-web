import { ArticleItem } from "../article/articleItem";

export interface LatestNews {
  id: number;
  blogs: ArticleItem[];
  news: ArticleItem[];
}
