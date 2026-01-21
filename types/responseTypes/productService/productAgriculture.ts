import { Image } from "../image";
import { Headline } from "../headline";
import { BannerCTA } from "../bannerCTA";
import { Metadata } from "../metadata";

export interface ProductWhyItem {
  id: number;
  title: string;
  description: string;
  image: Image;
}

export interface ProductItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
}

export interface ProductCategory {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product_items: ProductItem[];
}
export interface ProductWhySection {
  id: number;
  why1: ProductWhyItem;
  why2: ProductWhyItem;
  why3: ProductWhyItem;
}
export interface AboutSection {
  id: number;
  title: string;
  description: string;
}
export interface ProductsData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headline: Headline;
  aboutSection: AboutSection;
  whySection: ProductWhySection;
  productCategoriesSection: ProductCategory[];
  bannerCTA: BannerCTA;
  metadata: Metadata;
}
