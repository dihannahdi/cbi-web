import { BannerCTA } from "./bannerCTA";
import { Headline } from "./headline";
import { Image } from "./image";

export interface AboutUs {
  id: number;
  title: string;
  description: string;
  image: Image;
}

interface VisionItem {
  id: number;
  description: string;
  image: Image;
}

export interface VisionMission {
  id: number;
  title: string;
  description: string;
  visionItem: VisionItem[];
}

export interface Management {
  id: number;
  documentId: string;
  name: string;
  position: string;
  description: string;
  createdAt: string;
  publishedAt: string;
  image: Image;
}

interface CorporateValueItem {
  id: number;
  title: string;
  description: string;
}

export interface CorporateValue {
  id: number;
  title: string;
  corporateValueItem: CorporateValueItem[];
}

export interface CompanyData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headline: Headline;
  aboutUs: AboutUs;
  visionMission: VisionMission;
  corporateValue: CorporateValue;
  managements: Management[];
  bannerCTA: BannerCTA;
}
