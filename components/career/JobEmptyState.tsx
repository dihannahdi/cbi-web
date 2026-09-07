"use client";

import { Search } from "lucide-react";
import ContainerSection from "@/components/layout/container";

interface JobEmptyStateProps {
  locale: string;
}

const JobEmptyState = ({ locale }: JobEmptyStateProps) => {
  const title =
    locale === "en"
      ? "Sorry, there are currently no Job Openings available"
      : "Mohon maaf, saat ini belum ada Lowongan Kerja yang Tersedia";

  const subtitle =
    locale === "en"
      ? "Stay connected with us for the latest job opening information"
      : "Tetap terhubung dengan kami untuk mendapatkan informasi lowongan terbaru";

  const sectionTitle = locale === "en" ? "Job Openings" : "Lowongan Kerja";

  return (
    <section className="w-full bg-[#EEE]">
      <ContainerSection>
        <h2 className="mb-8 text-2xl font-bold text-[#222] lg:text-[40px] lg:leading-[1.2]">
          {sectionTitle}
        </h2>

        <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-10 sm:px-10 sm:py-14 lg:rounded-3xl">
          {/* Illustration - Document with magnifying glass */}
          <div className="relative mb-6 flex h-[140px] w-[170px] items-center justify-center">
            {/* Dashed circle */}
            <div className="absolute left-1/2 top-1/2 h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-gray-300" />

            {/* Decorative dots */}
            <div className="absolute left-[18%] top-[12%] h-[6px] w-[6px] rounded-full bg-gray-200" />
            <div className="absolute right-[22%] top-[8%] h-[5px] w-[5px] rounded-full bg-gray-200" />
            <div className="absolute bottom-[20%] left-[12%] h-[4px] w-[4px] rounded-full bg-gray-300" />
            <div className="absolute bottom-[15%] right-[14%] h-[7px] w-[7px] rounded-full bg-gray-200" />

            {/* Document icon */}
            <div className="relative z-10">
              <div className="flex h-[68px] w-[52px] flex-col gap-[3px] rounded-md bg-[#F8F8F8] p-3 pt-3.5">
                <div className="h-[3px] w-full rounded-full bg-gray-200" />
                <div className="h-[2.5px] w-full rounded-full bg-gray-200" />
                <div className="h-[2.5px] w-[85%] rounded-full bg-gray-200" />
                <div className="h-[2.5px] w-full rounded-full bg-gray-200" />
                <div className="h-[2.5px] w-[70%] rounded-full bg-gray-200" />
                <div className="h-[2.5px] w-full rounded-full bg-gray-200" />
              </div>

              {/* Magnifying glass */}
              <div className="absolute -bottom-2 -right-5 flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-white bg-[#F0F0F0]">
                <Search className="h-4 w-4 text-gray-400" strokeWidth={2.5} />
              </div>
              {/* Handle */}
              <div className="absolute -bottom-[14px] -right-[6px] h-[14px] w-[5px] rotate-[40deg] rounded-full bg-[#2EAE4E]" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-base font-bold leading-[1.6] text-[#222] sm:text-lg lg:text-xl">
              {title}
            </p>
            <p className="text-sm leading-normal text-[#666] sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default JobEmptyState;
