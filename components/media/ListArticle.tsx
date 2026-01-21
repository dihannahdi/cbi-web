import ContainerSection from "@/components/layout/container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import ArticleCard from "./ArticleCard";
import { ArticleItem } from "@/types/responseTypes/article/articleItem";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface ListArticleProps {
  news1: ArticleItem[];
  news2: ArticleItem[];
  lang?: Locale;
  dict?: Dictionary;
}

const ListArticle = ({ news1, news2, lang, dict }: ListArticleProps) => {
  const otherNewsText = dict?.blog?.otherArticles ?? "Berita Lainnya";
  
  return (
    <section>
      <ContainerSection>
        <h3>{otherNewsText}</h3>

        {/* News Card */}
        <ScrollArea>
          <div className="mt-12 flex gap-x-4 pb-7 lg:gap-x-6">
            {news1.map((item) => (
              <ArticleCard key={item.id} articleItemData={item} lang={lang} dict={dict} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <ScrollArea>
          <div className="mt-12 flex gap-x-4 pb-7 md:mt-16 lg:gap-x-6">
            {news2.map((item) => (
              <ArticleCard key={item.id} articleItemData={item} lang={lang} dict={dict} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ContainerSection>
    </section>
  );
};

export default ListArticle;
