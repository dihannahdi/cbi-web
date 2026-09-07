import { FC, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n-config";
import type { Dictionary } from "@/dictionaries";

import { Button } from "@/components/ui/button";
import { SearchButton } from "@/components/layout/navbar/desktop/SearchButton";
import { DropdownMenu } from "@/components/layout/navbar/desktop/DropdownMenu";
import { MegaMenu } from "@/components/layout/navbar/desktop/MegaMenu";
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

  // Media dropdown links (Products uses the MegaMenu below)
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

        <li
          className="relative flex items-center gap-x-1"
          onMouseLeave={() => setActiveDropdown((cur) => (cur === "products" ? null : cur))}
        >
          <NavigationLink href={lang === 'id' ? `/${lang}/produk-layanan` : `/${lang}/product`} isActive={pathname?.startsWith(`/${lang}/produk-layanan`) || pathname?.startsWith(`/${lang}/product`)}>
            {dict.nav.products}
          </NavigationLink>
          <Button
            variant="link"
            onClick={() => toggleDropdown("products")}
            onMouseEnter={() => setActiveDropdown("products")}
            aria-expanded={activeDropdown === "products"}
            className={cn(
              "transform p-0 text-current transition-transform duration-500 ease-in-out hover:bg-transparent hover:no-underline",
              activeDropdown === "products" && "rotate-180",
            )}
          >
            <ChevronDown className="h-5 w-5 text-current" />
          </Button>
          <MegaMenu
            isOpen={activeDropdown === "products"}
            lang={lang}
            dict={dict}
            onNavigate={() => setActiveDropdown(null)}
          />
        </li>

        <li className="relative flex items-center gap-x-1">
          <Button
            variant="link"
            onClick={() => toggleDropdown("media")}
            className={cn(
              "p-0 text-base font-normal text-current underline-offset-4 hover:bg-transparent hover:underline",
              (pathname?.startsWith(`/${lang}/news`) || pathname?.startsWith(`/${lang}/blog`)) && "font-bold underline underline-offset-4",
            )}
          >
            {dict.nav.media}
            <ChevronDown
              className={cn(
                "h-5 w-5 text-current transition-transform duration-500",
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
  scrolled: boolean;
}

const DesktopMenu: FC<DesktopMenuProps> = ({ lang, dict, scrolled }) => {
  return (
    <div className="hidden w-full items-center justify-between pl-10 transition-all lg:flex">
      <NavigationMenu lang={lang} dict={dict} />

      <div className="flex items-center gap-x-5">
        <LanguageSelector currentLang={lang} scrolled={scrolled} />
        <SearchButton />
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
        >
          {lang === "id" ? "Hubungi Kami" : "Contact Us"}
        </Link>
      </div>
    </div>
  );
};

export default DesktopMenu;
