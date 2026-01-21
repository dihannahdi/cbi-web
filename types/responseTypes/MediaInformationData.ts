import { Image } from "./image";
import { Headline } from "./headline";

export interface Certificate {
  id: number;
  documentId: string;
  title: string;
  description: string;
  publishedAt: string;
  image: Image;
  file: Image;
}

export interface Brochure {
  id: number;
  documentId: string;
  title: string;
  description: string;
  publishedAt: string;
  image: Image;
  file: Image;
}

export interface MediaInformationData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headline: Headline;
  certificates: Certificate[];
  brochures: Brochure[];
}
