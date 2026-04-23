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
import { Phone, Mail } from "lucide-react";

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
  const ctaTitle = dict?.blog?.ctaTitle || (locale === 'en' ? 'Need Biotechnology Solutions?' : 'Butuh Solusi Bioteknologi?');
  const ctaDesc = dict?.blog?.ctaDescription || (locale === 'en' ? 'Consult your agriculture, livestock, or fishery needs with our expert team.' : 'Konsultasikan kebutuhan pertanian, peternakan, atau perikanan Anda dengan tim ahli kami.');
  const ctaWhatsapp = dict?.blog?.ctaWhatsapp || (locale === 'en' ? 'Contact via WhatsApp' : 'Hubungi via WhatsApp');
  const ctaPhone = dict?.blog?.ctaPhone || '+62 851-9621-4187';
  const ctaEmail = dict?.blog?.ctaEmail || 'centrabiotech.id@gmail.com';

  return (
    <section>
      <ContainerBlog>
        <BlocksRendererClient content={content} />

        {/* Article CTA */}
        <div className="mt-12 rounded-xl bg-green-50 border border-green-100 p-6 lg:p-8">
          <h3 className="text-lg font-bold text-[#222] lg:text-xl mb-2">{ctaTitle}</h3>
          <p className="text-sm text-[#555] lg:text-base mb-5">{ctaDesc}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="https://wa.me/6285196214187"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <Phone className="h-4 w-4" />
              {ctaWhatsapp}
            </Link>
            <div className="flex flex-col gap-1 text-sm text-[#555]">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-green-600" />
                {ctaPhone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-green-600" />
                {ctaEmail}
              </span>
            </div>
          </div>
        </div>
      </ContainerBlog>
      <ContainerSection>
        <OtherArticle type={type} locale={locale} dict={dict} />
      </ContainerSection>
    </section>
  );
};

export default ArticleDetail;
