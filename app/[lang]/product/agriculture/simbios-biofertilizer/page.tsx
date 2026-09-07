import { redirect } from "next/navigation";
import { Locale, i18n } from "@/i18n-config";

// Generate static params for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Redirect to the main product URL path (supports both EN and ID)
export default async function SimbiosBiofertilizerPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  redirect(`/${lang}/produk-layanan/pertanian/simbios-pupuk-hayati`);
}
