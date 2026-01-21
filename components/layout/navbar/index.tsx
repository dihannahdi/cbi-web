"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import MobileMenu from "./mobile/MobileMenu";
import DesktopMenu from "./desktop/DesktopMenu";
import type { Locale } from "@/i18n-config";
import type { Dictionary } from "@/dictionaries";

interface LogoProps {
  className?: string;
  lang: Locale;
}

const Logo: FC<LogoProps> = ({ className, lang }) => (
  <Link href={`/${lang}`} className={className}>
    <Image
      src="/logo CBI navbar.png"
      width={166.5}
      height={36}
      alt="CBI Logo"
      priority
    />
  </Link>
);

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

const Navbar: FC<NavbarProps> = ({ lang, dict }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="absolute top-9 z-50 flex w-full items-center justify-center px-9">
      <header className="flex h-20 w-full max-w-7xl items-center justify-between rounded-[2rem] bg-[#FDFDFD33] px-6 py-4 text-[#FDFDFD] backdrop-blur-md">
        <Logo lang={lang} />
        <MobileMenu isOpen={isMenuOpen} onToggle={toggleMenu} lang={lang} dict={dict} />
        <DesktopMenu lang={lang} dict={dict} />
      </header>
    </div>
  );
};

export default Navbar;
