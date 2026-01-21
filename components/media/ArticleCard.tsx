import Image from "next/image";

import ReadMoreButton from "./ReadMoreButton";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/formatDate";
import { ArticleItem } from "@/types/responseTypes/article/articleItem";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

// Default placeholder image for articles without images
const DEFAULT_ARTICLE_IMAGE = "/placeholder-image.png";

interface ArticleCardProps {
  articleItemData: ArticleItem;
  lang?: Locale;
  dict?: Dictionary;
}

const ArticleCard = ({ articleItemData, lang, dict }: ArticleCardProps) => {
  const basePath = lang ? `/${lang}` : '';
  const linkPath =
    articleItemData.type === "news"
      ? `${basePath}/news/${articleItemData.slug}`
      : `${basePath}/blog/${articleItemData.slug}`;

  // Handle null or missing image
  const imageUrl = articleItemData.image?.url 
    ? getImageUrl(articleItemData.image.url) 
    : DEFAULT_ARTICLE_IMAGE;
  const imageAlt = articleItemData.image?.alternativeText ?? articleItemData.title ?? "Article image";
  const imageWidth = articleItemData.image?.width ?? 421;
  const imageHeight = articleItemData.image?.height ?? 280;

  const readMoreText = dict?.blog?.readMore ?? "Read More";

  return (
    <div className="w-[280px] flex-none snap-center lg:w-[306px] xl:w-[421px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="rounded-lg object-cover object-center lg:rounded-3xl"
      />

      {/* News Content */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-[#222222]">
            {articleItemData.title}
          </h4>
          <p>{formatDate(articleItemData.publishedAt)}</p>
        </div>
        <p>{articleItemData.shortDescription}</p>
      </div>

      {/* Read More Button */}
      <ReadMoreButton link={linkPath} text={readMoreText} />
    </div>
  );
};

export default ArticleCard;
