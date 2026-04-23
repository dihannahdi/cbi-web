"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ContainerSection from "@/components/layout/container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";
import { getImageUrl } from "@/utils/getImageUrl";

// Types
interface BlogItem {
  id: number;
  slug: string;
  title: string;
  shortDescription?: string;
  type?: string;
  publishedAt?: string;
  image?: {
    url?: string;
    alternativeText?: string;
  };
}

interface BlogDiscoverySectionProps {
  blogs: BlogItem[];
  lang: Locale;
  dict: Dictionary;
}

// Blog categories for filtering
const BLOG_CATEGORIES = {
  ALL: "all",
  PUPUK_HAYATI: "pupuk-hayati",
  TANAMAN: "tanaman",
  MAKLON: "maklon",
} as const;

type BlogCategory = (typeof BLOG_CATEGORIES)[keyof typeof BLOG_CATEGORIES];

// Helper to categorize blogs by slug patterns
const categorizeBlog = (slug: string): BlogCategory => {
  if (slug.includes("pupuk-hayati") || slug.includes("pengertian") || slug.includes("manfaat") || slug.includes("jenis")) {
    return BLOG_CATEGORIES.PUPUK_HAYATI;
  }
  if (slug.includes("padi") || slug.includes("jagung") || slug.includes("cabai") || slug.includes("tomat") || slug.includes("sayuran") || slug.includes("buah")) {
    return BLOG_CATEGORIES.TANAMAN;
  }
  if (slug.includes("maklon") || slug.includes("formulasi") || slug.includes("branding") || slug.includes("kementan")) {
    return BLOG_CATEGORIES.MAKLON;
  }
  return BLOG_CATEGORIES.ALL;
};

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

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

interface BlogCardProps {
  blog: BlogItem;
  lang: Locale;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, lang }) => {
  const imageUrl = blog.image?.url ? getImageUrl(blog.image.url) : "/images/placeholder-blog.jpg";
  
  return (
    <Link 
      href={`/${lang}/blog/${blog.slug}`}
      className="group flex min-w-[280px] max-w-[320px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all duration-300 hover:border-primary-500/20"
    >
      <div className="relative h-[160px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={blog.image?.alternativeText || blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 280px, 320px"
        />
        {blog.type && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-500/90 px-3 py-1 text-xs font-medium text-white">
            {blog.type}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
          {blog.title}
        </h3>
        {blog.shortDescription && (
          <p className="line-clamp-2 text-xs text-gray-600">
            {blog.shortDescription}
          </p>
        )}
        <div className="mt-auto pt-3">
          <span className="text-xs font-medium text-primary-600 group-hover:underline">
            {lang === 'id' ? 'Baca Selengkapnya →' : 'Read More →'}
          </span>
        </div>
      </div>
    </Link>
  );
};

const BlogDiscoverySection: React.FC<BlogDiscoverySectionProps> = ({ 
  blogs, 
  lang, 
  dict 
}) => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>(BLOG_CATEGORIES.ALL);
  const [showAll, setShowAll] = useState(false);

  const categoryLabels = {
    [BLOG_CATEGORIES.ALL]: lang === 'id' ? 'Semua Artikel' : 'All Articles',
    [BLOG_CATEGORIES.PUPUK_HAYATI]: lang === 'id' ? 'Pupuk Hayati' : 'Biofertilizer',
    [BLOG_CATEGORIES.TANAMAN]: lang === 'id' ? 'Tanaman' : 'Crops',
    [BLOG_CATEGORIES.MAKLON]: lang === 'id' ? 'Bisnis Maklon' : 'Contract Manufacturing',
  };

  const filteredBlogs = useMemo(() => {
    if (activeCategory === BLOG_CATEGORIES.ALL) {
      return blogs;
    }
    return blogs.filter(blog => categorizeBlog(blog.slug) === activeCategory);
  }, [blogs, activeCategory]);

  const displayedBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, 12);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gray-50 py-12 lg:py-16">
      <ContainerSection>
        <div className="px-6 lg:px-8 xl:px-0">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                {lang === 'id' ? 'Artikel Pupuk Hayati & Pertanian' : 'Biofertilizer & Agriculture Articles'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {lang === 'id' 
                  ? 'Panduan lengkap tentang pupuk hayati, cara aplikasi, dan tips pertanian berkelanjutan'
                  : 'Complete guides on biofertilizers, application methods, and sustainable farming tips'
                }
              </p>
            </div>
            <Link 
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              {lang === 'id' ? 'Lihat Semua Blog' : 'View All Blogs'}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Category Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <FilterButton
                key={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category as BlogCategory)}
              >
                {label}
              </FilterButton>
            ))}
          </div>

          {/* Blog Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
            {displayedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} lang={lang} />
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden">
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {displayedBlogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} lang={lang} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Show More Button */}
          {filteredBlogs.length > 12 && !showAll && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-primary-600 px-6 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50"
              >
                {lang === 'id' 
                  ? `Tampilkan ${filteredBlogs.length - 12} Artikel Lainnya` 
                  : `Show ${filteredBlogs.length - 12} More Articles`
                }
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* SEO Internal Links Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {lang === 'id' ? 'Topik Populer' : 'Popular Topics'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {blogs.slice(0, 20).map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/${lang}/blog/${blog.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
                >
                  {blog.title.length > 40 ? blog.title.substring(0, 40) + '...' : blog.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default BlogDiscoverySection;
