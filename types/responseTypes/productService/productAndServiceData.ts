import { WhySection } from "../dashboard/whySection";
import { Headline } from "../headline";
import { Image } from "../image";
import { BannerCTA } from "../bannerCTA";

interface Service {
  id: number;
  documentId: string;
  title: string;
  image: Image;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  url: string;
  color1: string;
  color2: string;
  image: Image;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductsSection {
  id: number;
  title: string;
  description: string | null;
  ctaText: string | null;
  products: Product[];
}

export interface ServicesSection {
  id: number;
  title: string;
  description: string;
  services: Service[];
}

export interface ProductAndServiceData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headline: Headline;
  whySection: WhySection;
  productsSection: ProductsSection;
  servicesSection: ServicesSection;
  bannerCTA: BannerCTA;
}
