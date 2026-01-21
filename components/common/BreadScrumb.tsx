"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n-config";
import { Dictionary } from "@/dictionaries";

interface BreadcrumbProps {
  className?: string;
  lang?: Locale;
  dict?: Dictionary;
}

const Breadcrumb = ({ className, lang, dict }: BreadcrumbProps) => {
  const pathname = usePathname();
  const currentLang = lang || (pathname.split('/')[1] as Locale) || 'id';

  // Mapping URL ke judul berdasarkan bahasa
  const getTitle = (path: string): string => {
    const cleanPath = path.replace(`/${currentLang}`, '') || '/';
    
    if (dict) {
      const pathMap: { [key: string]: string } = {
        "/": dict.nav.home,
        "/about-us": dict.nav.about,
        "/product": dict.nav.products,
        "/product/agriculture": dict.nav.agriculture,
        "/product/livestock": dict.nav.livestock,
        "/product/fishery": dict.nav.fishery,
        "/produk-layanan": dict.nav.products,
        "/produk-layanan/pertanian": dict.nav.agriculture,
        "/produk-layanan/peternakan": dict.nav.livestock,
        "/produk-layanan/perikanan": dict.nav.fishery,
        "/news": dict.nav.news,
        "/blog": dict.nav.blog,
        "/contact": dict.nav.contact,
        "/documents": dict.nav.documents,
        "/career": dict.nav.career,
        "/maklon-pupuk": dict.nav.maklonPupuk,
        "/privacy-policy": dict.footer.privacyPolicy,
        "/terms-of-service": dict.footer.termsOfService,
        "/cookies": dict.footer.cookiesSettings,
      };
      
      if (pathMap[cleanPath]) {
        return pathMap[cleanPath];
      }
      
      // Handle product names with better formatting
      const lastSegment = path.split("/").pop() || "";
      if (lastSegment.includes("rajabio")) {
        return "RAJABIO Pupuk Organik";
      }
      
      return lastSegment.replace(/-/g, " ").split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }

    // Fallback to Indonesian
    const pathMapId: { [key: string]: string } = {
      "/": "Beranda",
      "/about-us": "Tentang Kami",
      "/product": "Produk & Layanan",
      "/product/agriculture": "Pertanian",
      "/product/livestock": "Peternakan",
      "/product/fishery": "Perikanan",
      "/produk-layanan": "Produk & Layanan",
      "/produk-layanan/pertanian": "Pertanian",
      "/produk-layanan/peternakan": "Peternakan",
      "/produk-layanan/perikanan": "Perikanan",
      "/news": "Berita",
      "/blog": "Blog",
      "/contact": "Kontak",
      "/documents": "Brosur & Dokumen",
      "/career": "Karir",
      "/maklon-pupuk": "Maklon Pupuk",
    };

    if (pathMapId[cleanPath]) {
      return pathMapId[cleanPath];
    }
    
    // Handle product names with better formatting
    const lastSegment = path.split("/").pop() || "";
    if (lastSegment.includes("rajabio")) {
      return "RAJABIO Pupuk Organik";
    }
    
    return lastSegment.replace(/-/g, " ").split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Mengubah path menjadi array breadcrumb
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter((segment) => segment !== "");
    // Skip the language segment
    const contentSegments = segments[0] === currentLang ? segments.slice(1) : segments;
    
    const breadcrumbs = contentSegments.map((segment, index) => {
      const path = `/${currentLang}/${contentSegments.slice(0, index + 1).join("/")}`;
      return {
        label: getTitle(path),
        path,
      };
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const homeLabel = dict?.nav.home || "Beranda";

  return (
    <div className={className}>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full px-6 pt-10 lg:max-w-7xl lg:px-9 xl:px-0"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li className="flex items-center">
            <Link
              href={`/${currentLang}`}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <Home className="h-4 w-4" />
              <span className="ml-2">{homeLabel}</span>
            </Link>
          </li>

          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-gray-900">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;