import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n-config";
import type { Dictionary } from "@/dictionaries";

import { Button } from "@/components/ui/button";
import { SearchButton } from "@/components/layout/navbar/desktop/SearchButton";
import { DropdownMenu } from "@/components/layout/navbar/desktop/DropdownMenu";
import { NavigationLink } from "@/components/layout/navbar/NavigationLink";
import { LanguageSelector } from "@/components/layout/navbar/desktop/LanguageSelector";

interface NavigationMenuProps {
  lang: Locale;
  dict: Dictionary;
}

const NavigationMenu: FC<NavigationMenuProps> = ({ lang, dict }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Generate localized links with proper paths for each language
  const PRODUCT_LINKS = lang === 'id' ? [
    { title: dict.nav.agriculture, href: `/${lang}/produk-layanan/pertanian` },
    { title: dict.nav.livestock, href: `/${lang}/produk-layanan/peternakan` },
    { title: dict.nav.fishery, href: `/${lang}/produk-layanan/perikanan` },
  ] : [
    { title: dict.nav.agriculture, href: `/${lang}/product/agriculture` },
    { title: dict.nav.livestock, href: `/${lang}/product/livestock` },
    { title: dict.nav.fishery, href: `/${lang}/product/fishery` },
  ];

  const MEDIA_LINKS = [
    { title: dict.nav.news, href: `/${lang}/news` },
    { title: dict.nav.blog, href: `/${lang}/blog` },
    { title: dict.nav.documents, href: `/${lang}/documents` },
  ];

  return (
    <nav className="mx-4 flex-1">
      <ul className="flex w-full justify-center gap-x-5">
        <li className="flex items-center gap-x-1">
          <NavigationLink href={`/${lang}`} isActive={pathname === `/${lang}` || pathname === `/${lang}/`}>
            {dict.nav.home}
          </NavigationLink>
        </li>

        <li className="flex items-center gap-x-1">
          <NavigationLink href={`/${lang}/about-us`} isActive={pathname === `/${lang}/about-us`}>
            {dict.nav.about}
          </NavigationLink>
        </li>

        <li className="relative flex items-center gap-x-1">
          <NavigationLink href={lang === 'id' ? `/${lang}/produk-layanan` : `/${lang}/product`} isActive={pathname?.startsWith(`/${lang}/produk-layanan`) || pathname?.startsWith(`/${lang}/product`)}>
            {dict.nav.products}
          </NavigationLink>
          <Button
            variant="link"
            onClick={() => toggleDropdown("products")}
            className={cn(
              "transform p-0 transition-transform duration-500 ease-in-out",
              activeDropdown === "products" && "rotate-180",
            )}
          >
            <ChevronDown className="h-5 w-5 text-white" />
          </Button>
          <DropdownMenu
            isOpen={activeDropdown === "products"}
            links={PRODUCT_LINKS}
          />
        </li>

        <li className="relative flex items-center gap-x-1">
          <Button
            variant="link"
            onClick={() => toggleDropdown("media")}
            className={cn(
              "p-0 text-base font-normal text-[#FDFDFD] underline-offset-4 hover:underline",
              (pathname?.startsWith(`/${lang}/news`) || pathname?.startsWith(`/${lang}/blog`)) && "font-bold underline underline-offset-4",
            )}
          >
            {dict.nav.media}
            <ChevronDown
              className={cn(
                "h-5 w-5 text-white transition-transform duration-500",
                activeDropdown === "media" && "rotate-180",
              )}
            />
          </Button>
          <DropdownMenu
            isOpen={activeDropdown === "media"}
            links={MEDIA_LINKS}
          />
        </li>

        <li className="flex items-center gap-x-1">
          <NavigationLink href={`/${lang}/contact`} isActive={pathname === `/${lang}/contact`}>
            {dict.nav.contact}
          </NavigationLink>
        </li>
      </ul>
    </nav>
  );
};

interface DesktopMenuProps {
  lang: Locale;
  dict: Dictionary;
}

const DesktopMenu: FC<DesktopMenuProps> = ({ lang, dict }) => {
  return (
    <div className="hidden w-full items-center justify-between transition-all lg:flex">
      <NavigationMenu lang={lang} dict={dict} />

      <div className="flex items-center gap-x-11">
        <LanguageSelector currentLang={lang} />
        <SearchButton />
      </div>
    </div>
  );
};

export default DesktopMenu;
