import Link from "next/link";
import Image from "next/image";

import { SOCIAL_LINKS } from "@/constants/footer";
import { buildWhatsAppUrl } from "@/constants/contact";
import TrackedWhatsAppButton from "@/components/common/TrackedWhatsAppButton";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

const SocialLinks = () => (
  <div className="flex gap-4">
    {SOCIAL_LINKS.map(({ icon, href, alt }) => (
      <Link key={alt} href={href} target="_blank">
        <Image
          src={icon}
          height={24}
          width={24}
          alt={alt ?? "social media icon"}
          className="h-6 w-6"
        />
      </Link>
    ))}
  </div>
);

interface CompanyInfoProps {
  lang: Locale;
  dict: Dictionary;
}

const CompanyInfo = ({ lang, dict }: CompanyInfoProps) => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-8">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <Image
            src="/logo-mark.png"
            alt="Centra Biotech Indonesia"
            width={48}
            height={48}
            className="h-11 w-11"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-white">
              CENTRA BIOTECH
            </span>
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-lime-300">
              INDONESIA
            </span>
          </span>
        </Link>
        <div>
          <h4 className="font-semibold text-white">{dict.footer.address}</h4>
          <p className="max-w-xs text-sm text-white/90">
            Sawahan RT 02 RW 07 Pasungan, Ceper, Klaten Jawa Tengah, Indonesia
            57465
          </p>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold text-white">{dict.footer.contact}</h4>
          <TrackedWhatsAppButton
            href={buildWhatsAppUrl()}
            source="footer"
            className="underline"
          >
            +62 851-9621-4187
          </TrackedWhatsAppButton>
          <Link href="mailto:centrabiotech.id@gmail.com" className="underline">
            centrabiotech.id@gmail.com
          </Link>
        </div>

        <SocialLinks />
      </div>
    </>
  );
};

export default CompanyInfo;
