"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import MobileMenu from "./mobile/MobileMenu";
import DesktopMenu from "./desktop/DesktopMenu";
import type { Locale } from "@/i18n-config";
import type { Dictionary } from "@/dictionaries";
import { cn } from "@/lib/utils";

interface LogoProps {
  lang: Locale;
  scrolled: boolean;
}

const Logo: FC<LogoProps> = ({ lang, scrolled }) => (
  <Link
    href={`/${lang}`}
    className="flex items-center gap-2.5"
    aria-label="Centra Biotech Indonesia"
  >
    <Image
      src="/logo-mark.png"
      width={44}
      height={44}
      alt="Centra Biotech Indonesia"
      priority
      className="h-9 w-9 shrink-0 lg:h-11 lg:w-11"
    />
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "text-sm font-extrabold leading-tight tracking-tight transition-colors lg:text-lg",
          scrolled ? "text-green-800" : "text-white",
        )}
      >
        CENTRA BIOTECH
      </span>
      <span
        className={cn(
          "text-[0.55rem] font-semibold tracking-[0.2em] transition-colors lg:text-[0.65rem]",
          scrolled ? "text-lime-700" : "text-lime-300",
        )}
      >
        INDONESIA
      </span>
    </span>
  </Link>
);

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

const Navbar: FC<NavbarProps> = ({ lang, dict }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-stone-200/80 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/25 to-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 transition-colors lg:h-20 lg:px-9",
          scrolled ? "text-green-800" : "text-white",
        )}
      >
        <Logo lang={lang} scrolled={scrolled} />
        <DesktopMenu lang={lang} dict={dict} scrolled={scrolled} />
        <MobileMenu
          isOpen={isMenuOpen}
          onToggle={toggleMenu}
          lang={lang}
          dict={dict}
        />
      </div>
    </header>
  );
};

export default Navbar;
