import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";

const HeroSectionCareer = () => {
  return (
    <HeroSectionGeneral
      imgUrl="/og-image.jpg"
      category="Karir"
      title={
        <h1 className="text-center text-3xl text-white lg:text-5xl xl:text-[56px]">
          Gabung Bersama Tim Kami, Wujudkan <br />
          Masa Depan Baru yang Lebih Baik
        </h1>
      }
    />
  );
};

export default HeroSectionCareer;
