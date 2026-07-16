"use client";

import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";

import { i18n, type Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  currentLang: Locale;
  scrolled?: boolean;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({
  currentLang,
  scrolled = false,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (!pathname || newLocale === currentLang) return;

    const segments = pathname.split("/");
    segments[1] = newLocale;

    // Persist choice for the middleware locale negotiation.
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.push(segments.join("/"));
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={cn(
        "flex items-center rounded-full border p-0.5 text-xs font-bold uppercase transition-colors",
        scrolled ? "border-stone-200 bg-stone-50" : "border-white/30 bg-white/10",
      )}
    >
      {i18n.locales.map((locale) => {
        const isActive = currentLang === locale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchLocale(locale)}
            aria-pressed={isActive}
            aria-label={`Switch to ${locale.toUpperCase()}`}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              isActive
                ? "bg-brand text-white shadow-sm"
                : scrolled
                  ? "text-stone-500 hover:text-brand"
                  : "text-white/80 hover:text-white",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
};
