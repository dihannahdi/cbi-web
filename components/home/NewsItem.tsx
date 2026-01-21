import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/getImageUrl";
import { ArticleItem } from "@/types/responseTypes/article/articleItem";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

// Constants
const NEWS_TYPE = {
  NEWS: "news",
  ARTICLE: "article",
} as const;

const LABEL_STYLES = {
  [NEWS_TYPE.NEWS]: "bg-[rgba(235,122,28,0.4)]",
  [NEWS_TYPE.ARTICLE]: "bg-[rgba(28,103,173,0.4)]",
} as const;

interface ArticleImageProps {
  image: ArticleItem["image"];
  type: ArticleItem["type"];
  dict: Dictionary;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ image, type, dict }) => {
  const isTypeNews = type === NEWS_TYPE.NEWS;

  return (
    <div className="relative h-[19.375rem] w-[19.375rem] overflow-hidden rounded-lg border border-gray-200 lg:rounded-3xl">
      <Image
        src={getImageUrl(image?.url)}
        alt={image?.alternativeText ?? "Image article"}
        width={image?.width ?? 300}
        height={image?.height ?? 300}
        className="h-full w-full object-cover"
      />

      <div
        className={cn(
          "absolute left-4 top-4 rounded-lg px-4 py-2 text-white backdrop-blur-md",
          isTypeNews
            ? LABEL_STYLES[NEWS_TYPE.NEWS]
            : LABEL_STYLES[NEWS_TYPE.ARTICLE],
        )}
      >
        {isTypeNews ? dict.nav.news : dict.nav.blog}
      </div>
    </div>
  );
};

interface ArticleContentProps {
  title: string;
  shortDescription: string;
  slug: string;
  type: ArticleItem["type"];
  lang: Locale;
  dict: Dictionary;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  title,
  shortDescription,
  slug,
  type,
  lang,
  dict,
}) => {
  const isTypeNews = type === NEWS_TYPE.NEWS;
  const linkPath = isTypeNews ? `/${lang}/news/${slug}` : `/${lang}/blog/${slug}`;

  return (
    <>
      <h3 className="mt-6 line-clamp-2 text-ellipsis text-xl font-bold text-gray-900 lg:text-2xl">
        {title}
      </h3>

      <p className="mt-2 line-clamp-2 text-ellipsis text-sm lg:text-base">
        {shortDescription}
      </p>

      <Link
        href={linkPath}
        className="mt-6 flex items-center gap-4 transition-colors duration-300 hover:text-[#009933]"
      >
        {dict.home.readMore} <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  );
};

interface NewsItemComponentProps {
  article: ArticleItem;
  lang: Locale;
  dict: Dictionary;
}

const NewsItem: React.FC<NewsItemComponentProps> = ({ article, lang, dict }) => {
  return (
    <article className="max-w-[19.375rem]">
      <ArticleImage image={article.image} type={article.type} dict={dict} />
      <ArticleContent
        title={article.title}
        shortDescription={article.shortDescription}
        slug={article.slug}
        type={article.type}
        lang={lang}
        dict={dict}
      />
    </article>
  );
};

export default NewsItem;
