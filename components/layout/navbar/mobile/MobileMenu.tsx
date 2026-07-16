import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/layout/navbar/desktop/LanguageSelector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationLink } from "@/components/layout/navbar/NavigationLink";
import { AccordionMenu } from "@/components/layout/navbar/mobile/AccordionMenu";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  lang: Locale;
  dict: Dictionary;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onToggle, lang, dict }) => {
  const pathname = usePathname();
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const toggleProduct = () => setIsProductOpen((prev) => !prev);
  const toggleMedia = () => setIsMediaOpen((prev) => !prev);

  // Generate localized product links with proper paths for each language
  const PRODUCT_LINKS = lang === 'id' ? [
    { title: dict.nav.agriculture, href: `/${lang}/produk-layanan/pertanian` },
    { title: dict.nav.livestock, href: `/${lang}/produk-layanan/peternakan` },
    { title: `  ${dict.nav.peternakanUnggas}`, href: `/${lang}/produk-layanan/peternakan/unggas` },
    { title: `  ${dict.nav.peternakanRuminant}`, href: `/${lang}/produk-layanan/peternakan/ruminant` },
    { title: dict.nav.fishery, href: `/${lang}/produk-layanan/perikanan` },
    { title: `  ${dict.nav.perikananBiofloc}`, href: `/${lang}/produk-layanan/perikanan/biofloc` },
    { title: `  ${dict.nav.perikananUdang}`, href: `/${lang}/produk-layanan/perikanan/udang` },
  ] : [
    { title: dict.nav.agriculture, href: `/${lang}/product/agriculture` },
    { title: dict.nav.livestock, href: `/${lang}/product/livestock` },
    { title: `  ${dict.nav.peternakanUnggas}`, href: `/${lang}/produk-layanan/peternakan/unggas` },
    { title: `  ${dict.nav.peternakanRuminant}`, href: `/${lang}/produk-layanan/peternakan/ruminant` },
    { title: dict.nav.fishery, href: `/${lang}/product/fishery` },
    { title: `  ${dict.nav.perikananBiofloc}`, href: `/${lang}/produk-layanan/perikanan/biofloc` },
    { title: `  ${dict.nav.perikananUdang}`, href: `/${lang}/produk-layanan/perikanan/udang` },
  ];

  // Generate localized media links
  const MEDIA_LINKS = [
    { title: dict.nav.news, href: `/${lang}/news` },
    { title: dict.nav.blog, href: `/${lang}/blog` },
    { title: dict.nav.career, href: `/${lang}/career` },
    { title: dict.nav.documents, href: `/${lang}/documents` },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggle}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          className="transition-transform hover:scale-105 lg:hidden"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>
        <div className="p-8 text-sm font-medium text-stone-700">
          <ul className="flex w-full flex-col justify-center gap-y-6">
            <li className="list-none">
              <NavigationLink href={`/${lang}`} isActive={pathname === `/${lang}` || pathname === `/${lang}/`}>
                {dict.nav.home}
              </NavigationLink>
            </li>

            <li className="list-none">
              <NavigationLink
                href={`/${lang}/about-us`}
                isActive={pathname === `/${lang}/about-us`}
              >
                {dict.nav.about}
              </NavigationLink>
            </li>

            <AccordionMenu
              title={dict.nav.products}
              isOpen={isProductOpen}
              onToggle={toggleProduct}
              links={PRODUCT_LINKS}
              currentPath={pathname}
              href={lang === 'id' ? `/${lang}/produk-layanan` : `/${lang}/product`}
            />

            <AccordionMenu
              title={dict.nav.media}
              isOpen={isMediaOpen}
              onToggle={toggleMedia}
              links={MEDIA_LINKS}
              currentPath={pathname}
            />

            <li className="list-none">
              <NavigationLink
                href={`/${lang}/contact`}
                isActive={pathname === `/${lang}/contact`}
              >
                {dict.nav.contact}
              </NavigationLink>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-6">
            <LanguageSelector currentLang={lang} scrolled />
            <Link
              href={`/${lang}/contact`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
            >
              {lang === "id" ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
