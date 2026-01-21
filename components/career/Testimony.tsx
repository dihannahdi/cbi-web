"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import ContainerSection from "@/components/layout/container";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonyData = [
  {
    id: 1,
    image: "/testimony.jpeg",
    name: "Bayu Subeni",
    title: "Staff Digital Marketing",
    testimony:
      "Bekerja sebagai Marketing di PT Centra Biotech Indonesia adalah pengalaman yang luar biasa. Saya merasa dihargai karena ide-ide kreatif saya didukung penuh untuk memperluas jangkauan produk ramah lingkungan kami. Selain itu, budaya perusahaan yang kolaboratif dan fokus pada inovasi membuat saya terus termotivasi untuk memberikan yang terbaik. Setiap hari adalah kesempatan untuk belajar hal baru dan memberikan dampak positif bagi sektor pertanian, perikanan, dan peternakan di Indonesia.",
  },
  {
    id: 2,
    image: "/testimony.jpeg",
    name: "Bayu Subeni",
    title: "Staff Digital Marketing",
    testimony:
      "Bekerja sebagai Marketing di PT Centra Biotech Indonesia adalah pengalaman yang luar biasa. Saya merasa dihargai karena ide-ide kreatif saya didukung penuh untuk memperluas jangkauan produk ramah lingkungan kami. Selain itu, budaya perusahaan yang kolaboratif dan fokus pada inovasi membuat saya terus termotivasi untuk memberikan yang terbaik. Setiap hari adalah kesempatan untuk belajar hal baru dan memberikan dampak positif bagi sektor pertanian, perikanan, dan peternakan di Indonesia.",
  },
  {
    id: 3,
    image: "/testimony.jpeg",
    name: "Bayu Subeni",
    title: "Staff Digital Marketing",
    testimony:
      "Bekerja sebagai Marketing di PT Centra Biotech Indonesia adalah pengalaman yang luar biasa. Saya merasa dihargai karena ide-ide kreatif saya didukung penuh untuk memperluas jangkauan produk ramah lingkungan kami. Selain itu, budaya perusahaan yang kolaboratif dan fokus pada inovasi membuat saya terus termotivasi untuk memberikan yang terbaik. Setiap hari adalah kesempatan untuk belajar hal baru dan memberikan dampak positif bagi sektor pertanian, perikanan, dan peternakan di Indonesia.",
  },
];

const Testimony = () => {
  const [swiper, setSwiper] = useState<SwiperType>();

  return (
    <section>
      <ContainerSection>
        <h2>Life at Centra Biotech Indonesia</h2>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active bg-green-600",
            el: ".pagination-bullets",
          }}
          onSwiper={setSwiper}
          navigation={false} // Disable default navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="pb-16"
        >
          {TestimonyData.map((data) => (
            <SwiperSlide key={data.id} className="mt-8 lg:mt-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                <Image
                  src={data.image}
                  width={400}
                  height={400}
                  alt="photo profile"
                  className="h-[400px] w-[400px] rounded-3xl object-cover object-center"
                />
                <div className="flex flex-col justify-center">
                  <p>{data.testimony}</p>
                  <div className="mt-8">
                    <p className="font-bold">{data.name}</p>
                    <p>{data.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between lg:mt-16">
          <div>
            <div className="pagination-bullets" />
          </div>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#009933] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#009933]/80 disabled:cursor-not-allowed disabled:opacity-50 xl:h-10 xl:w-10"
            >
              <ArrowLeft size={16} className="text-white" />
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#009933] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#009933]/80 disabled:cursor-not-allowed disabled:opacity-50 xl:h-10 xl:w-10"
            >
              <ArrowRight size={16} className="text-white" />
            </button>
          </div>
        </div>
      </ContainerSection>
      <style jsx global>{`
        .pagination-bullets {
          text-align: left;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          background: #059669 !important;
        }
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default Testimony;
