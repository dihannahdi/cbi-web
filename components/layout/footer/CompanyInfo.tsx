import Link from "next/link";
import Image from "next/image";

import { SOCIAL_LINKS } from "@/constants/footer";
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
        <Image
          src={"/logo-footer.png"}
          alt="logo white"
          width={166}
          height={36}
        />
        <div>
          <h4 className="font-semibold text-white">{dict.footer.address}</h4>
          <p className="max-w-xs text-sm text-white/90">
            Sawahan RT 02 RW 07 Pasungan, Ceper, Klaten Jawa Tengah, Indonesia
            57465
          </p>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold text-white">{dict.footer.contact}</h4>
          <Link href="https://wa.me/6281235003655" className="underline">
            0812-3500-3655
          </Link>
          <Link href="mailto:centrabioindo@gmail.com" className="underline">
            centrabioindo@gmail.com
          </Link>
        </div>

        <SocialLinks />
      </div>
    </>
  );
};

export default CompanyInfo;
