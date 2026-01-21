import { Data } from "./dashboard/dashboardTypes";
import { BlogData } from "./article/blogSectionType";
import { NewsData } from "./article/newsSectionType";
import { ArticleDetail } from "./article/articleDetailTypes";
import { MediaInformationData } from "./MediaInformationData";
import { ArticleItem } from "./article/articleItem";
import { ContactPageData } from "./contactPageData";
import { CompanyData } from "./aboutUsData";
import { ProductsData } from "./productService/productAgriculture";
import { ProductAndServiceData } from "./productService/productAndServiceData";

//* ====>PAGE SECTION <====
export interface DashboardResponse {
  data: Data;
  meta: Record<string, never>;
}
export interface AboutUsResponse {
  data: CompanyData;
  meta: Record<string, never>;
}

// Product and Service Section
export interface ProductAndServiceResponse {
  data: ProductAndServiceData;
  meta: Record<string, never>;
}

export interface ProductAgricultureResponse {
  data: ProductsData;
  meta: Record<string, never>;
}

export interface ProductLivestockResponse {
  data: ProductsData;
  meta: Record<string, never>;
}

export interface ProductFisheryResponse {
  data: ProductsData;
  meta: Record<string, never>;
}

//* ====>PAGE SECTION END <====

export interface ArticleDetailResponse {
  data: ArticleDetail[];
  meta: Record<string, never>;
}
export interface NewsSectionResponse {
  data: NewsData;
  meta: Record<string, never>;
}
export interface BlogSectionResponse {
  data: BlogData;
  meta: Record<string, never>;
}
export interface ArticlesCollectionResponse {
  data: ArticleItem[];
  meta: Record<string, never>;
}
export interface MediaInformationResponse {
  data: MediaInformationData;
  meta: Record<string, never>;
}
export interface ContactResponse {
  data: ContactPageData;
  meta: Record<string, never>;
}
