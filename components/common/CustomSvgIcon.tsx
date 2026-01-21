"use client";
import { useEffect, useState } from "react";

interface CustomSvgIconProps {
  url: string;
  className?: string;
}

const CustomSvgIcon = ({
  url,
  className = "h-8 w-8 stroke-[#C46617] group-hover:stroke-white transition-colors duration-300 lg:h-12 lg:w-12",
}: CustomSvgIconProps) => {
  const [svgContent, setSvgContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      if (!url?.endsWith(".svg")) {
        setError("URL must end with .svg");
        return;
      }

      try {
        // Use the Next.js API route to proxy the request
        const proxyUrl = `/api/svg?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let svgText = await response.text();

        // Remove any existing fill and stroke colors
        svgText = svgText
          .replace(/fill="[^"]*"/g, "")
          .replace(/stroke="[^"]*"/g, "")
          .replace(/style="[^"]*fill:[^;]*;/g, "")
          .replace(/style="[^"]*stroke:[^;]*;/g, "");

        // Add the SVG element with proper classes
        svgText = svgText.replace(
          /<svg/,
          `<svg class="${className}" fill="none"`,
        );

        setSvgContent(svgText);
        setError(null);
      } catch (error) {
        console.error("Error fetching SVG:", error);
        setError(error instanceof Error ? error.message : "Failed to load SVG");
      }
    };

    if (url) {
      fetchSvg();
    }
  }, [url, className]);

  if (error) {
    return <div className="text-sm text-red-500">Error: {error}</div>;
  }

  if (!svgContent) {
    return (
      <div className="h-8 w-8 animate-pulse bg-gray-200 lg:h-12 lg:w-12" />
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default CustomSvgIcon;
