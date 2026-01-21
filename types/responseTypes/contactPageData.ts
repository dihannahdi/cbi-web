import { Headline } from "./headline";

export interface AddressAndContact {
  id: number;
  email: string;
  phoneNumber: string;
  address: string;
  urlAddress: string;
}

export interface ContactPageData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headline: Headline;
  addressAndContact: AddressAndContact;
}
