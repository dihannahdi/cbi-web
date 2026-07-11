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
import TrackedWhatsAppButton from "@/components/common/TrackedWhatsAppButton";
import RelatedProduct from "@/components/product/RelatedProduct";
import { buildWhatsAppUrl } from "@/constants/contact";
import { getRelatedProduct } from "@/lib/relatedProduct";
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
  /**
   * Article title, used to personalize the WhatsApp CTA message so the
   * sales team sees what the reader was reading. Optional — callers that
   * don't pass it yet (see app/[lang]/blog/[slug]/page.tsx and
   * app/[lang]/news/[slug]/page.tsx) fall back to a generic message.
   */
  title?: string;
  /**
   * Article slug, used for click-tracking context and to look up a
   * related product to surface next to the CTA. Optional for the same
   * reason as `title`.
   */
  slug?: string;
}

const ArticleDetail = ({
  content,
  type,
  locale = 'id',
  dict,
  title,
  slug,
}: ArticleDetailProps) => {
  const isEn = locale === 'en';
  const ctaTitle = dict?.blog?.ctaTitle || (isEn ? 'Need Biotechnology Solutions?' : 'Butuh Solusi Bioteknologi?');
  const ctaDesc = dict?.blog?.ctaDescription || (isEn ? 'Consult your agriculture, livestock, or fishery needs with our expert team.' : 'Konsultasikan kebutuhan pertanian, peternakan, atau perikanan Anda dengan tim ahli kami.');
  const ctaWhatsapp = dict?.blog?.ctaWhatsapp || (isEn ? 'Contact via WhatsApp' : 'Hubungi via WhatsApp');
  const ctaPhone = dict?.blog?.ctaPhone || '+62 851-9621-4187';
  const ctaEmail = dict?.blog?.ctaEmail || 'centrabiotech.id@gmail.com';

  // Prefill the WA message with the article title/topic so sales can see
  // what the reader was reading — falls back to a generic message when
  // the caller hasn't passed a title yet.
  const ctaMessage = title
    ? (isEn
        ? `Hello, I read the article "${title}" and would like to consult.`
        : `Halo, saya membaca artikel "${title}" dan ingin konsultasi.`)
    : (isEn
        ? 'Hello, I would like to consult about agriculture, livestock, or fishery needs.'
        : 'Halo, saya ingin konsultasi seputar kebutuhan pertanian, peternakan, atau perikanan.');
  const ctaWhatsappUrl = buildWhatsAppUrl(ctaMessage);

  // Only look up a related product when we actually have a slug to match.
  const relatedProduct = slug ? getRelatedProduct(slug, isEn ? 'en' : 'id') : null;
  const relatedProductUrl = relatedProduct
    ? (isEn ? relatedProduct.url.replace(/^\/id\//, '/en/') : relatedProduct.url)
    : null;

  return (
    <section>
      <ContainerBlog>
        <BlocksRendererClient content={content} />

        {/* Article CTA */}
        <div className="mt-12 rounded-xl bg-green-50 border border-green-100 p-6 lg:p-8">
          <h3 className="text-lg font-bold text-[#222] lg:text-xl mb-2">{ctaTitle}</h3>
          <p className="text-sm text-[#555] lg:text-base mb-5">{ctaDesc}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedWhatsAppButton
              href={ctaWhatsappUrl}
              source="article_cta"
              context={{ slug, title }}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <Phone className="h-4 w-4" />
              {ctaWhatsapp}
            </TrackedWhatsAppButton>
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

        {/* Related product, when the article topic matches one of ours */}
        {relatedProduct && relatedProductUrl && (
          <RelatedProduct
            name={relatedProduct.name}
            url={relatedProductUrl}
            blurb={relatedProduct.blurb}
            locale={isEn ? 'en' : 'id'}
            context={{ slug }}
          />
        )}
      </ContainerBlog>
      <ContainerSection>
        <OtherArticle type={type} locale={locale} dict={dict} />
      </ContainerSection>
    </section>
  );
};

export default ArticleDetail;
