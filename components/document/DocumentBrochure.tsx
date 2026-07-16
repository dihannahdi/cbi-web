"use client";

import { FC, ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import ContainerSection from "@/components/layout/container";
import { DocumentCard } from "@/components/document/DocumentCard";
import {
  Brochure,
  Certificate,
} from "@/types/responseTypes/MediaInformationData";
import { Locale } from "@/i18n-config";

enum DocumentType {
  BROCHURE = "brochure",
  CERTIFICATE = "certificate",
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton: FC<TabButtonProps> = ({ isActive, onClick, children }) => (
  <Button
    onClick={onClick}
    variant={"ghost"}
    className={cn(
      "rounded-full px-4 py-2 transition-colors",
      isActive
        ? "bg-[#166B30] text-white hover:bg-[#166B30] hover:text-white"
        : "border border-[#EEEEEE] bg-[#FDFDFD] text-[#666666] hover:bg-[#166B30] hover:text-white",
    )}
  >
    {children}
  </Button>
);

const DocumentBrochure = ({
  certificates,
  brochures,
  lang,
}: {
  certificates: Certificate[];
  brochures: Brochure[];
  lang?: Locale;
}) => {
  const [activeTab, setActiveTab] = useState<DocumentType>(
    DocumentType.BROCHURE,
  );
  const isEn = lang === 'en';
  const filteredDocument =
    activeTab === DocumentType.BROCHURE ? brochures : certificates;

  return (
    <section>
      <ContainerSection>
        <div className="mb-8 flex gap-4">
          <TabButton
            isActive={activeTab === DocumentType.BROCHURE}
            onClick={() => setActiveTab(DocumentType.BROCHURE)}
          >
            {isEn ? "Brochures" : "Brosur"}
          </TabButton>
          <TabButton
            isActive={activeTab === DocumentType.CERTIFICATE}
            onClick={() => setActiveTab(DocumentType.CERTIFICATE)}
          >
            {isEn ? "Fertilizer Certificates" : "Sertifikat Pupuk"}
          </TabButton>
        </div>

        {/* Card Document */}
        <div className="space-y-6">
          {filteredDocument.map((document) => (
            <DocumentCard key={document.id} document={document} lang={lang} />
          ))}
        </div>
      </ContainerSection>
    </section>
  );
};

export default DocumentBrochure;
