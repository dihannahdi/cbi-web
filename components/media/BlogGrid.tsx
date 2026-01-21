"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/media/ArticleCard";
import Pagination from "@/components/common/Pagination";
import { ArticleItem } from "@/types/responseTypes/article/articleItem";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface BlogGridProps {
  articles: ArticleItem[];
  lang: Locale;
  dict: Dictionary;
  itemsPerPage?: number;
}

export default function BlogGrid({
  articles,
  lang,
  dict,
  itemsPerPage = 9,
}: BlogGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Get articles for current page
  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return articles.slice(startIndex, endIndex);
  }, [articles, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the grid smoothly
    window.scrollTo({
      top: document.getElementById("blog-grid")?.offsetTop || 0 - 100,
      behavior: "smooth",
    });
  };

  return (
    <div id="blog-grid">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article.id}
            articleItemData={article}
            lang={lang}
            dict={dict}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <p className="text-center text-sm text-gray-500 mt-4">
            {lang === "id"
              ? `Menampilkan ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                  currentPage * itemsPerPage,
                  articles.length
                )} dari ${articles.length} artikel`
              : `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                  currentPage * itemsPerPage,
                  articles.length
                )} of ${articles.length} articles`}
          </p>
        </div>
      )}
    </div>
  );
}
