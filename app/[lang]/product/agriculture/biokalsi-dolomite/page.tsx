import { redirect } from "next/navigation";
import { Locale, i18n } from "@/i18n-config";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Redirect to the Indonesian product URL path
export default async function BiokalsiDolomitePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  redirect(`/${lang}/produk-layanan/pertanian/biokalsi-dolomit`);
}
