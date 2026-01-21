"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

import { listIcon, Platform } from "@/constants";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const shareLinks: Record<Platform, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
  };

  const handleShare = (platform: Platform) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={copyToClipboard}
        className="rounded-full bg-[#EEEEEE] p-2 transition-colors hover:bg-[#EEEEEE]/70"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Image
            src={"/share-icon/copy.svg"}
            alt="icon"
            width={24}
            height={24}
          />
        )}
      </button>

      {listIcon.map((icon) => (
        <button
          key={icon.id}
          onClick={() => handleShare(icon.name)}
          className="rounded-full bg-[#EEEEEE] p-2 transition-colors hover:bg-[#EEEEEE]/70"
          aria-label={`Share on ${icon.name}`}
        >
          <Image src={icon.url} alt="icon" width={24} height={24} />
        </button>
      ))}
    </div>
  );
};

export default ShareButtons;
