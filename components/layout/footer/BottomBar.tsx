import Link from "next/link";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface BottomBarProps {
  lang: Locale;
  dict: Dictionary;
}

const BottomBar = ({ lang, dict }: BottomBarProps) => {
  // Generate localized legal links
  const LEGAL_LINKS = [
    { label: dict.footer.privacyPolicy, href: `/${lang}/privacy-policy` },
    { label: dict.footer.termsOfService, href: `/${lang}/terms-of-service` },
    { label: dict.footer.cookiesSettings, href: `/${lang}/cookies` },
  ];

  return (
    <div className="mb-8 mt-16 text-xs md:mt-24 lg:text-sm">
      <hr />
      <div className="mt-8 flex flex-col-reverse justify-between md:flex-row">
        <p className="mt-6 text-xs text-white/90 lg:mt-0 lg:text-sm">
          © {new Date().getFullYear()} PT Centra Biotech Indonesia. {dict.footer.allRightsReserved}
        </p>
        <div className="flex items-center gap-6 lg:gap-8">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="underline">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
