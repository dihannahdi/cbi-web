import Image from "next/image";
import ContainerSection from "@/components/layout/container";

const JoinUs = () => {
  return (
    <section className="h-full w-full bg-[#EEE]">
      <ContainerSection>
        <div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl bg-[#00802B] p-8">
          <h2 className="text-white">Jadilah Bagian dari Kami!</h2>
          <p className="text-white/90">
            Kami percaya bahwa inovasi dan kolaborasi adalah kunci untuk
            menciptakan solusi bioteknologi ramah lingkungan yang berdampak
            besar bagi sektor pertanian, perikanan, dan peternakan. Jika Anda
            memiliki semangat untuk berkontribusi dalam menciptakan masa depan
            yang berkelanjutan, bergabunglah dengan tim kami. Temukan peluang
            karir yang sesuai dengan keahlian Anda dan jadilah bagian dari
            perjalanan kami dalam memberikan manfaat nyata bagi masyarakat dan
            lingkungan.
          </p>
          <div className="absolute -bottom-[40%] right-[10%] h-[580px] w-[580px] translate-x-[50%] md:-bottom-[80%]">
            <Image
              src="/logo-only.png"
              alt="logo cbi"
              width={500}
              height={500}
              className="h-full w-full object-cover opacity-10 brightness-0 invert"
            />
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default JoinUs;
