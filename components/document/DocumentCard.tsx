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

interface DocumentCardProps {
  document: Certificate | Brochure;
}

export const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

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
    <div className="flex flex-col gap-6 rounded-lg bg-white p-4 drop-shadow-[0_0_4px_rgba(0,0,0,0.1)] lg:flex-row lg:items-center lg:p-8">
      <Image
        src={getImageUrl(document?.image?.url)}
        alt={`${document?.image?.alternativeText} thumbnail`}
        width={document?.image?.width ?? 400}
        height={document?.image?.height ?? 400}
        className="flex h-36 w-full flex-none rounded-lg object-cover object-center lg:w-36"
      />

      <div className="flex-grow">
        <h5 className="text-xl font-bold text-[#222222] lg:text-2xl">
          {document.title}
        </h5>
        <p className="mt-4">{document.description}</p>
      </div>

      <Button
        className={`w-fit bg-[#009933] hover:bg-[#009933]/70 lg:text-base xl:text-xl`}
        onClick={onDownload}
        disabled={isDownloading}
      >
        {isDownloading ? "Mengunduh..." : "Unduh"}
      </Button>
    </div>
  );
};
