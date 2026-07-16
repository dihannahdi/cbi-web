import Image from "next/image";
import { FC, useState } from "react";

import { getFileUrl } from "@/utils/getFileUrl";
import { getImageUrl } from "@/utils/getImageUrl";
import { handleFileDownload } from "@/utils/downloadPdf";

import { Button } from "@/components/ui/button";
import {
  Brochure,
  Certificate,
} from "@/types/responseTypes/MediaInformationData";
import { Locale } from "@/i18n-config";

interface DocumentCardProps {
  document: Certificate | Brochure;
  lang?: Locale;
}

export const DocumentCard: FC<DocumentCardProps> = ({ document, lang }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const isEn = lang === 'en';

  const onDownload = async () => {
    try {
      setIsDownloading(true);
      const fileUrl = getFileUrl(document.file.url);
      const fileName =
        document.file.url.split("/").pop() || `${document.title}.pdf`;

      await handleFileDownload(fileUrl, fileName);
    } catch (error) {
      // Handle error (misalnya tampilkan toast/alert)
      console.error("Failed to download:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg lg:flex-row lg:items-center lg:p-8">
      <Image
        src={getImageUrl(document?.image?.url)}
        alt={`${document?.image?.alternativeText} thumbnail`}
        width={document?.image?.width ?? 400}
        height={document?.image?.height ?? 400}
        className="flex h-36 w-full flex-none rounded-lg object-cover object-center lg:w-36"
      />

      <div className="flex-grow">
        <h5 className="text-xl font-bold text-stone-950 lg:text-2xl">
          {document.title}
        </h5>
        <p className="mt-4">{document.description}</p>
      </div>

      <Button
        className={`w-fit bg-brand hover:bg-brand-hover lg:text-base xl:text-xl`}
        onClick={onDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (isEn ? "Downloading..." : "Mengunduh...") : (isEn ? "Download" : "Unduh")}
      </Button>
    </div>
  );
};
