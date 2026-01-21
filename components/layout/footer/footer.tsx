import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";
import BottomBar from "./BottomBar";
import CompanyInfo from "./CompanyInfo";
import NavigationLinks from "./NavigationLinks";
import BackgroundEffects from "./BackgroundEffect";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

const Footer = ({ lang, dict }: FooterProps) => {
  return (
    <footer className="relative min-h-[36rem] w-full overflow-hidden bg-[#083F19] px-6 pb-6 pt-12 font-jakartaSans text-sm text-[#FDFDFD] lg:px-8 lg:pb-12 lg:pt-24 xl:px-0">
      <BackgroundEffects />
      <div className="relative z-20 mx-auto max-w-7xl">
        <div className="mx-auto flex flex-col md:flex-row">
          <CompanyInfo lang={lang} dict={dict} />
          <NavigationLinks lang={lang} dict={dict} />
        </div>
        <BottomBar lang={lang} dict={dict} />
      </div>
    </footer>
  );
};

export default Footer;
