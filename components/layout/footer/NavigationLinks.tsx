import { FC } from "react";
import Link from "next/link";

import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface NavigationLinkType {
  label: string;
  href: string;
  target?: string;
}

interface LinkSectionProps {
  title: string;
  links: NavigationLinkType[];
}

// Components
const LinkSection: FC<LinkSectionProps> = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h4 className="font-bold text-white">{title}</h4>
    {links.map(({ label, href, target }) => (
      <Link key={label} className="hover:underline" href={href} target={target}>
        {label}
      </Link>
    ))}
  </div>
);

interface NavigationLinksProps {
  lang: Locale;
  dict: Dictionary;
}

const NavigationLinks: FC<NavigationLinksProps> = ({ lang, dict }) => {
  // Generate localized company links
  const COMPANY_LINKS: NavigationLinkType[] = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.about, href: `/${lang}/about-us` },
    { label: dict.nav.media, href: `/${lang}/news` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.documents, href: `/${lang}/documents` },
    { label: dict.nav.career, href: `/${lang}/career` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  // Generate localized product links with proper paths for each language
  const PRODUCT_LINKS: NavigationLinkType[] = lang === 'id' ? [
    { label: dict.nav.products, href: `/${lang}/produk-layanan` },
    { label: dict.nav.agriculture, href: `/${lang}/produk-layanan/pertanian` },
    { label: dict.nav.livestock, href: `/${lang}/produk-layanan/peternakan` },
    { label: dict.nav.fishery, href: `/${lang}/produk-layanan/perikanan` },
    {
      label: dict.nav.dokterTani,
      href: "https://www.doktertani.co.id/",
      target: "_blank",
    },
  ] : [
    { label: dict.nav.products, href: `/${lang}/product` },
    { label: dict.nav.agriculture, href: `/${lang}/product/agriculture` },
    { label: dict.nav.livestock, href: `/${lang}/product/livestock` },
    { label: dict.nav.fishery, href: `/${lang}/product/fishery` },
    {
      label: dict.nav.dokterTani,
      href: "https://www.doktertani.co.id/",
      target: "_blank",
    },
  ];

  return (
    <div className="mt-8 flex flex-1 flex-row gap-14 md:me-16 md:mt-0 md:justify-end md:gap-36">
      <LinkSection title={dict.footer.company} links={COMPANY_LINKS} />
      <LinkSection title={dict.nav.products} links={PRODUCT_LINKS} />
    </div>
  );
};

export default NavigationLinks;
