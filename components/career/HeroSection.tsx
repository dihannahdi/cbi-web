import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { Locale } from "@/i18n-config";

const HeroSectionCareer = ({ lang }: { lang?: Locale }) => {
  const isEn = lang === 'en';
  return (
    <HeroSectionGeneral
      imgUrl="/og-image.jpg"
      category={isEn ? "Career" : "Karir"}
      title={
        <h1 className="text-center text-3xl text-white lg:text-5xl xl:text-[56px]">
          {isEn
            ? <>Join Our Team, Build a Better <br /> Future Together</>
            : <>Gabung Bersama Tim Kami, Wujudkan <br /> Masa Depan Baru yang Lebih Baik</>
          }
        </h1>
      }
    />
  );
};

export default HeroSectionCareer;
