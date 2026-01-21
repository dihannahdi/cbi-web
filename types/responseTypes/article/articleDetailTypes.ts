import { Image } from "../image";

export interface Author {
  createdAt: string;
  documentId: string;
  firstname: string;
  id: number;
  lastname: string;
  preferedLanguage: string | null;
  publishedAt: string;
  updatedAt: string;
  username: string | null;
}

export interface ArticleDetail {
  // Strapi default data
  id: number;
  documentId: string;

  // Section type
  title: string;
  type: string;
  publishedAt: string;
  content: any;
  image: Image;
  author: Author;
}
