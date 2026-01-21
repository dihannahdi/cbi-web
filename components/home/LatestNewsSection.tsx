"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LatestNews } from "@/types/responseTypes/dashboard/latestNews";
import ContainerSection from "@/components/layout/container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import NewsItem from "./NewsItem";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

// Constants
const NEWS_TYPES = {
  ALL: "all",
  ARTICLE: "article",
  NEWS: "news",
} as const;

type NewsType = (typeof NEWS_TYPES)[keyof typeof NEWS_TYPES];

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

// Extracted components
const FilterButton: React.FC<FilterButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <button
    className={cn(
      "filter-pill",
      isActive ? "filter-pill-active" : "filter-pill-inactive",
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

interface NewsFilterProps {
  activeType: NewsType;
  onTypeChange: (type: NewsType) => void;
  dict: Dictionary;
}

const NewsFilter: React.FC<NewsFilterProps> = ({
  activeType,
  onTypeChange,
  dict,
}) => (
  <div className="flex gap-1 text-xs lg:gap-2 lg:text-sm">
    <FilterButton
      isActive={activeType === NEWS_TYPES.ALL}
      onClick={() => onTypeChange(NEWS_TYPES.ALL)}
    >
      {dict.common.seeMore === 'Lihat Lebih Banyak' ? 'Semua' : 'All'}
    </FilterButton>
    <FilterButton
      isActive={activeType === NEWS_TYPES.NEWS}
      onClick={() => onTypeChange(NEWS_TYPES.NEWS)}
    >
      {dict.nav.news}
    </FilterButton>
    <FilterButton
      isActive={activeType === NEWS_TYPES.ARTICLE}
      onClick={() => onTypeChange(NEWS_TYPES.ARTICLE)}
    >
      {dict.nav.blog}
    </FilterButton>
  </div>
);

interface LatestNewsSectionProps {
  data: LatestNews;
  lang: Locale;
  dict: Dictionary;
}

const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({ data, lang, dict }) => {
  const [activeType, setActiveType] = useState<NewsType>(NEWS_TYPES.ALL);

  const filteredNews = useMemo(() => {
    const { blogs, news } = data;
    const allItems = [...blogs, ...news];

    switch (activeType) {
      case NEWS_TYPES.ARTICLE:
        return blogs;
      case NEWS_TYPES.NEWS:
        return news;
      default:
        return allItems;
    }
  }, [data, activeType]);

  return (
    <section className="w-full">
      <ContainerSection>
        <div className="flex flex-col justify-between gap-6 px-6 md:flex-row md:items-center lg:px-8 xl:px-0">
          <div className="flex-1">
            <h2>{dict.home.newsTitle}</h2>
          </div>
          <NewsFilter activeType={activeType} onTypeChange={setActiveType} dict={dict} />
        </div>

        <ScrollArea className="w-full">
          <div className="mt-12 flex gap-4 pb-7 ps-6 lg:ps-8 xl:ps-0">
            {filteredNews.map((item) => (
              <NewsItem key={item.slug} article={item} lang={lang} dict={dict} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ContainerSection>
    </section>
  );
};

export default LatestNewsSection;
