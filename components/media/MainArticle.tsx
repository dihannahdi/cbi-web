import React from "react";
import Image from "next/image";

import { getImageUrl } from "@/utils/getImageUrl";
import { formatDate } from "@/utils/formatDate";
import ContainerSection from "@/components/layout/container";
import { ArticleItem } from "@/types/responseTypes/article/articleItem";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

import ShareButtons from "./ShareButtons";
import ReadMoreButton from "./ReadMoreButton";

interface ArticleContentProps {
  content: ArticleItem;
  lang?: Locale;
  dict?: Dictionary;
}

const ArticleContent = ({ content, lang, dict }: ArticleContentProps) => {
  const basePath = lang ? `/${lang}` : '';
  const linkPath =
    content.type === "news" ? `${basePath}/news/${content.slug}` : `${basePath}/blog/${content.slug}`;
  
  const readMoreText = dict?.blog?.readMore ?? "Selengkapnya";
  const shareViaText = dict?.blog?.shareArticle ?? "Bagikan Melalui";
  
  return (
    <div className="md:w-1/2">
      <div className="mt-4 space-y-2">
        <p>{formatDate(content.publishedAt)}</p>
        <h3>{content.title}</h3>
        <p>{content.shortDescription}</p>
      </div>

      {/* Read More Button */}
      <ReadMoreButton link={linkPath} text={readMoreText} />

      {/* Share Button List */}
      <div className="mt-6">
        <p className="text-sm font-medium text-[#222222] xl:text-base">
          {shareViaText}
        </p>
        {/* List Socmed Icons */}
        <ShareButtons
          title={"Article"}
          url={"https://www.centrabiotechindonesia.com" + `/${content.type}/${content.slug}`}
        />
      </div>
    </div>
  );
};

interface MainArticleProps {
  data: ArticleItem;
  lang?: Locale;
  dict?: Dictionary;
}

const MainArticle = ({ data, lang, dict }: MainArticleProps) => {
  return (
    <section>
      <ContainerSection className="md:flex md:gap-x-9">
        {/* Article Image */}
        <Image
          src={getImageUrl(data?.image?.url)}
          alt={data?.image?.alternativeText ?? "Headline image"}
          width={data?.image?.width ?? 400}
          height={data?.image?.height ?? 400}
          className="rounded-lg object-cover md:w-1/2 lg:rounded-3xl"
        />

        {/* Article Content */}
        <ArticleContent content={data} lang={lang} dict={dict} />
      </ContainerSection>
    </section>
  );
};

export default MainArticle;
