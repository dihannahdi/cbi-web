"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";

import { i18n, type Locale, localeNames } from "@/i18n-config";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  currentLang: Locale;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    if (!pathname) return;
    
    // Replace the current locale in the path with the new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  const flagSrc = currentLang === 'id' ? '/Indonesia.svg' : '/UK.svg';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-2 rounded-lg px-2 py-1 transition-all hover:bg-white/10"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Image
          src={flagSrc}
          alt={localeNames[currentLang]}
          width={24}
          height={24}
          className="rounded-sm"
        />
        <span className="text-sm font-medium uppercase">{currentLang}</span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5">
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={cn(
                "flex w-full items-center gap-x-3 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100",
                currentLang === locale && "bg-green-50 text-green-700"
              )}
            >
              <Image
                src={locale === 'id' ? '/Indonesia.svg' : '/UK.svg'}
                alt={localeNames[locale]}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span className="flex-1">{localeNames[locale]}</span>
              {currentLang === locale && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
