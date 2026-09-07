interface NavigationLink {
  title: string;
  href: string;
}

export const PRODUCT_LINKS: NavigationLink[] = [
  { title: "Pertanian", href: "/produk-layanan/pertanian" },
  { title: "Peternakan", href: "/produk-layanan/peternakan" },
  { title: "Perikanan", href: "/produk-layanan/perikanan" },
  { title: "Maklon Pupuk", href: "/maklon-pupuk" },
];

export const MEDIA_LINKS: NavigationLink[] = [
  { title: "Berita", href: "/news" },
  { title: "Blog", href: "/blog" },
  { title: "Brosur & Dokumen", href: "/documents" },
];
