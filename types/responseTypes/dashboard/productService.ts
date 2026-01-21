import { Product } from "../productService/productAndServiceData";

export interface ProductService {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  products: Product[];
}
