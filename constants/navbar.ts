interface NavigationLink {
  title: string;
  href: string;
}

export const PRODUCT_LINKS: NavigationLink[] = [
  { title: "Pertanian", href: "/product/agriculture" },
  { title: "Peternakan", href: "/product/livestock" },
  { title: "Perikanan", href: "/product/fishery" },
  { title: "Maklon Pupuk", href: "/maklon-pupuk" },
];

export const MEDIA_LINKS: NavigationLink[] = [
  { title: "Berita", href: "/news" },
  { title: "Blog", href: "/blog" },
  { title: "Brosur & Dokumen", href: "/documents" },
];
