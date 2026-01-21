import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";

import { ApiPath, apiRequest } from "@/utils/apiClient";
import { getArticlesCollectionQuery } from "@/utils/queries/articlesCollectionQuery";

import { ArticlesCollectionResponse } from "@/types/responseTypes";

import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/media/ArticleCard";
import ContainerSection from "@/components/layout/container";
import ContainerBlog from "@/components/layout/ContainerBlog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BlocksRendererClient from "@/components/common/BlockRendererClient";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

const getApiPathByType = (type: string): ApiPath => {
  return type === "news" ? ApiPath.NEWS : ApiPath.BLOGS;
};

const translations = {
  id: {
    otherArticles: "Blog Lainnya",
    viewAll: "Lihat Semua",
  },
  en: {
    otherArticles: "Other Articles",
    viewAll: "View All",
  },
};

const OtherArticle = async ({ type, locale = 'id', dict }: { type: string; locale?: string; dict?: Dictionary }) => {
  const lang = locale as Locale;
  const t = translations[lang] || translations.id;
  
  try {
    const query = getArticlesCollectionQuery();
    const { data } = await apiRequest<ArticlesCollectionResponse>({
      path: getApiPathByType(type),
      queryParams: query,
      locale: locale,
    });

    const basePath = type === "news" ? `/${lang}/news` : `/${lang}/blog`;

    return (
      <>
        <div className="mt-20 flex flex-col gap-y-6">
          <h2>{dict?.blog?.otherArticles || t.otherArticles}</h2>
          <Link href={basePath}>
            <Button className="w-fit bg-[#009933] text-sm">{dict?.home?.viewAll || t.viewAll}</Button>
          </Link>
        </div>
        <ScrollArea>
          <div className="mt-12 flex gap-x-4 lg:gap-x-6">
            {data.map((item) => (
              <ArticleCard key={item.id} articleItemData={item} lang={lang} dict={dict} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </>
    );
  } catch (e) {
    console.error(e);
  }
};

interface ArticleDetailProps {
  content: BlocksContent;
  type: string;
  locale?: string;
  dict?: Dictionary;
}

const ArticleDetail = ({
  content,
  type,
  locale = 'id',
  dict,
}: ArticleDetailProps) => {
  return (
    <section>
      <ContainerBlog>
        <BlocksRendererClient content={content} />
      </ContainerBlog>
      <ContainerSection>
        <OtherArticle type={type} locale={locale} dict={dict} />
      </ContainerSection>
    </section>
  );
};

export default ArticleDetail;
