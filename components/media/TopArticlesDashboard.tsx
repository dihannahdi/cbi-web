"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface ArticleData {
  title: string;
  slug: string;
  url: string;
  type: "blog" | "news";
  locale: string;
  publishedAt: string;
  focusKeyphrase: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQuery: string;
  indexed: boolean;
}

interface DashboardData {
  lastUpdated: string;
  period: string;
  summary: {
    totalArticles: number;
    totalBlogs: number;
    totalNews: number;
    totalClicks: number;
    totalImpressions: number;
    indexedCount: number;
    overallCTR: number;
    overallPosition: number;
  };
  articles: ArticleData[];
}

type SortKey = "clicks" | "impressions" | "ctr" | "position" | "publishedAt";
type FilterType = "all" | "blog" | "news";

const API_URL =
  process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";

export default function TopArticlesDashboard({ lang }: { lang: Locale }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("clicks");
  const [sortAsc, setSortAsc] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterIndexed, setFilterIndexed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}/uploads/article-performance.json?t=${Date.now()}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: DashboardData = await res.json();
        setData(json);
      } catch (e) {
        setError(
          lang === "id"
            ? "Gagal memuat data. Pastikan dashboard JSON sudah di-generate."
            : "Failed to load data. Make sure dashboard JSON has been generated.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lang]);

  const filteredArticles = useMemo(() => {
    if (!data) return [];
    let articles = [...data.articles];

    // Type filter
    if (filterType !== "all") {
      articles = articles.filter((a) => a.type === filterType);
    }

    // Indexed filter
    if (filterIndexed) {
      articles = articles.filter((a) => a.indexed);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q) ||
          a.topQuery.toLowerCase().includes(q) ||
          a.focusKeyphrase.toLowerCase().includes(q),
      );
    }

    // Sort
    articles.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "publishedAt") {
        cmp = (a.publishedAt || "").localeCompare(b.publishedAt || "");
      } else {
        cmp = (a[sortKey] || 0) > (b[sortKey] || 0) ? 1 : -1;
      }
      return sortAsc ? cmp : -cmp;
    });

    return articles;
  }, [data, filterType, filterIndexed, searchQuery, sortKey, sortAsc]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortKey }) => {
    if (sortKey !== field) return <span className="text-neutral-300">↕</span>;
    return <span>{sortAsc ? "↑" : "↓"}</span>;
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-green-500 border-t-transparent" />
          <p className="text-sm text-neutral-500">
            {lang === "id" ? "Memuat data..." : "Loading data..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const { summary } = data;

  return (
    <div className="space-y-6">
      {/* Last Updated */}
      <p className="text-xs text-neutral-400">
        {lang === "id" ? "Terakhir diperbarui" : "Last updated"}:{" "}
        {new Date(data.lastUpdated).toLocaleString(
          lang === "id" ? "id-ID" : "en-US",
        )}{" "}
        &middot; {data.period}
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label={lang === "id" ? "Total Artikel" : "Total Articles"}
          value={summary.totalArticles.toLocaleString()}
          sub={`${summary.totalBlogs} blog · ${summary.totalNews} news`}
        />
        <StatCard
          label={lang === "id" ? "Terindeks" : "Indexed"}
          value={summary.indexedCount.toLocaleString()}
          sub={`${((summary.indexedCount / summary.totalArticles) * 100).toFixed(1)}%`}
          accent={summary.indexedCount > 0 ? "green" : "red"}
        />
        <StatCard
          label={lang === "id" ? "Total Klik" : "Total Clicks"}
          value={summary.totalClicks.toLocaleString()}
          accent="green"
        />
        <StatCard
          label={lang === "id" ? "Total Tayangan" : "Total Impressions"}
          value={summary.totalImpressions.toLocaleString()}
        />
        <StatCard
          label="CTR"
          value={`${summary.overallCTR.toFixed(2)}%`}
        />
        <StatCard
          label={lang === "id" ? "Posisi Rata-rata" : "Avg Position"}
          value={summary.overallPosition.toFixed(1)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        {/* Search */}
        <input
          type="text"
          placeholder={
            lang === "id"
              ? "Cari judul, slug, keyword..."
              : "Search title, slug, keyword..."
          }
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-green-500 min-w-[200px]"
        />

        {/* Type Filter */}
        <div className="flex rounded-md border border-neutral-200 bg-white text-sm">
          {(["all", "blog", "news"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                setCurrentPage(1);
              }}
              className={`px-3 py-2 capitalize transition-colors ${
                filterType === type
                  ? "bg-brand-green-500 text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              } ${type === "all" ? "rounded-l-md" : type === "news" ? "rounded-r-md" : ""}`}
            >
              {type === "all"
                ? lang === "id"
                  ? "Semua"
                  : "All"
                : type}
            </button>
          ))}
        </div>

        {/* Indexed toggle */}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={filterIndexed}
            onChange={(e) => {
              setFilterIndexed(e.target.checked);
              setCurrentPage(1);
            }}
            className="h-4 w-4 rounded border-neutral-300 accent-brand-green-500"
          />
          {lang === "id" ? "Terindeks saja" : "Indexed only"}
        </label>

        {/* Results count */}
        <span className="ml-auto text-xs text-neutral-400">
          {filteredArticles.length}{" "}
          {lang === "id" ? "artikel" : "articles"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <th className="py-3 pl-4 pr-2 w-10">#</th>
              <th className="px-2 py-3 min-w-[280px]">
                {lang === "id" ? "Artikel" : "Article"}
              </th>
              <th className="px-2 py-3 w-16">
                {lang === "id" ? "Tipe" : "Type"}
              </th>
              <th
                className="cursor-pointer px-2 py-3 w-20 hover:text-brand-green-500"
                onClick={() => handleSort("clicks")}
              >
                <span className="flex items-center gap-1">
                  {lang === "id" ? "Klik" : "Clicks"}{" "}
                  <SortIcon field="clicks" />
                </span>
              </th>
              <th
                className="cursor-pointer px-2 py-3 w-24 hover:text-brand-green-500"
                onClick={() => handleSort("impressions")}
              >
                <span className="flex items-center gap-1">
                  {lang === "id" ? "Tayangan" : "Impr."}{" "}
                  <SortIcon field="impressions" />
                </span>
              </th>
              <th
                className="cursor-pointer px-2 py-3 w-20 hover:text-brand-green-500"
                onClick={() => handleSort("ctr")}
              >
                <span className="flex items-center gap-1">
                  CTR <SortIcon field="ctr" />
                </span>
              </th>
              <th
                className="cursor-pointer px-2 py-3 w-20 hover:text-brand-green-500"
                onClick={() => handleSort("position")}
              >
                <span className="flex items-center gap-1">
                  {lang === "id" ? "Posisi" : "Pos."}{" "}
                  <SortIcon field="position" />
                </span>
              </th>
              <th className="px-2 py-3 min-w-[160px]">
                {lang === "id" ? "Top Query" : "Top Query"}
              </th>
              <th className="px-2 py-3 w-20">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {paginatedArticles.map((article, idx) => {
              const rank =
                (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <tr
                  key={`${article.slug}-${article.locale}`}
                  className="transition-colors hover:bg-neutral-50"
                >
                  <td className="py-3 pl-4 pr-2 text-neutral-400">
                    {rank}
                  </td>
                  <td className="px-2 py-3">
                    <Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-2 font-medium text-neutral-800 hover:text-brand-green-500"
                    >
                      {article.title}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-neutral-400">
                      {article.slug}
                    </p>
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        article.type === "blog"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {article.type}
                    </span>
                  </td>
                  <td className="px-2 py-3 font-semibold tabular-nums">
                    {article.clicks > 0 ? (
                      <span className="text-brand-green-500">
                        {article.clicks}
                      </span>
                    ) : (
                      <span className="text-neutral-300">0</span>
                    )}
                  </td>
                  <td className="px-2 py-3 tabular-nums text-neutral-600">
                    {article.impressions > 0
                      ? article.impressions.toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-2 py-3 tabular-nums text-neutral-600">
                    {article.ctr > 0 ? `${article.ctr}%` : "—"}
                  </td>
                  <td className="px-2 py-3 tabular-nums text-neutral-600">
                    {article.position > 0
                      ? article.position.toFixed(1)
                      : "—"}
                  </td>
                  <td className="px-2 py-3">
                    {article.topQuery ? (
                      <span className="line-clamp-1 text-xs text-neutral-500">
                        {article.topQuery}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-2 py-3">
                    {article.indexed ? (
                      <span className="inline-block rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-400">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
          <p className="text-xs text-neutral-400">
            {lang === "id"
              ? `Menampilkan ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} dari ${filteredArticles.length}`
              : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} of ${filteredArticles.length}`}
          </p>
          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 disabled:opacity-40"
            >
              ←
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page: number;
              if (totalPages <= 7) {
                page = i + 1;
              } else if (currentPage <= 4) {
                page = i + 1;
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i;
              } else {
                page = currentPage - 3 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    currentPage === page
                      ? "border-brand-green-500 bg-brand-green-500 text-white"
                      : "border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Top 10 Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopListCard
          title={lang === "id" ? "🏆 Top 10 Klik" : "🏆 Top 10 Clicks"}
          articles={filteredArticles.slice(0, 10)}
          metricKey="clicks"
          metricLabel={lang === "id" ? "klik" : "clicks"}
          lang={lang}
        />
        <TopListCard
          title={
            lang === "id" ? "👀 Top 10 Tayangan" : "👀 Top 10 Impressions"
          }
          articles={[...filteredArticles]
            .sort((a, b) => b.impressions - a.impressions)
            .slice(0, 10)}
          metricKey="impressions"
          metricLabel={lang === "id" ? "tayangan" : "impressions"}
          lang={lang}
        />
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "green" | "red";
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-bold ${
          accent === "green"
            ? "text-brand-green-500"
            : accent === "red"
              ? "text-red-500"
              : "text-neutral-800"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-neutral-400">{sub}</p>}
    </div>
  );
}

function TopListCard({
  title,
  articles,
  metricKey,
  metricLabel,
  lang,
}: {
  title: string;
  articles: ArticleData[];
  metricKey: "clicks" | "impressions";
  metricLabel: string;
  lang: Locale;
}) {
  const maxVal = Math.max(...articles.map((a) => a[metricKey]), 1);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <h3 className="mb-4 text-base font-bold text-neutral-800">{title}</h3>
      <div className="space-y-3">
        {articles.map((article, i) => (
          <div key={`${article.slug}-${i}`} className="flex items-center gap-3">
            <span className="w-5 text-right text-xs font-bold text-neutral-400">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-sm font-medium text-neutral-700 hover:text-brand-green-500"
              >
                {article.title}
              </Link>
              <div className="mt-1 h-1.5 w-full rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-brand-green-500 transition-all"
                  style={{
                    width: `${(article[metricKey] / maxVal) * 100}%`,
                  }}
                />
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-neutral-600">
              {article[metricKey].toLocaleString()}
            </span>
          </div>
        ))}
        {articles.length === 0 && (
          <p className="text-center text-sm text-neutral-400">
            {lang === "id" ? "Tidak ada data" : "No data"}
          </p>
        )}
      </div>
    </div>
  );
}
