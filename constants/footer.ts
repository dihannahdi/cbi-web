export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookies Settings", href: "/cookies" },
];

export const SOCIAL_LINKS = [
  {
    icon: "/social-media-icon/Facebook.svg",
    href: "https://www.facebook.com/profile.php?id=61552413907665",
    alt: "facebook",
  },
  {
    icon: "/social-media-icon/Instagram.svg",
    href: "https://www.instagram.com/centrabiotechindonesia/?utm_source=ig_web_button_share_sheet",
    alt: "instagram",
  },
  {
    icon: "/social-media-icon/LinkedIn.svg",
    href: "https://www.linkedin.com/company/pt-centra-biotech-indonesia/",
    alt: "linkedin",
  },
  {
    icon: "/social-media-icon/Youtube.svg",
    href: "https://www.youtube.com/@centrabiotechindonesia",
    alt: "youtube",
  },
];

export interface NavigationLink {
  label: string;
  href: string;
  target?: string;
}

export const COMPANY_LINKS: NavigationLink[] = [
  { label: "Beranda", href: "/" }, // Added homepage link for better internal linking
  { label: "Tentang Kami", href: "/about-us" },
  { label: "Media & Informasi", href: "/news" },
  { label: "Blog", href: "/blog" }, // Added blog link
  { label: "Dokumen", href: "/documents" }, // Added documents link
  { label: "Karir", href: "/career" },
  { label: "Hubungi Kami", href: "/contact" },
];

export const PRODUCT_LINKS: NavigationLink[] = [
  { label: "Semua Produk", href: "/product" }, // Added main product page
  { label: "Pertanian", href: "/product/agriculture" },
  { label: "Peternakan", href: "/product/livestock" },
  { label: "Perikanan", href: "/product/fishery" },
  { label: "Maklon Pupuk", href: "/maklon-pupuk" }, // SEO landing page
  {
    label: "Dokter Tani",
    href: "https://www.doktertani.co.id/",
    target: "_blank",
  },
];
