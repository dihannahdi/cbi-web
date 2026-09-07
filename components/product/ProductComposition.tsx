import { FlaskConical } from "lucide-react";

import type { Locale } from "@/i18n-config";

export interface CompositionItem {
  /** Organism / active ingredient, e.g. "Beauveria bassiana" */
  organism: string;
  /** Real spec/viable count if known, e.g. "1.0 × 10⁶ cfu/ml". Omit if unknown — never invent. */
  spec?: string;
  /** Role / function, e.g. "PGPR & Fungisida Hayati" */
  role?: string;
}

interface ProductCompositionProps {
  lang: Locale;
  items: CompositionItem[];
  /** Optional heading override. */
  title?: string;
  /** Optional lead sentence. */
  subtitle?: string;
}

/**
 * Visible microbial/active-ingredient composition table for flagship product
 * pages. Renders ONLY the data passed in — the `spec` (CFU) column appears only
 * when real values exist. No figures are invented (claim-safety).
 */
const ProductComposition = ({ lang, items, title, subtitle }: ProductCompositionProps) => {
  if (!items || items.length === 0) return null;
  const isId = lang === "id";
  const hasSpec = items.some((i) => i.spec);

  return (
    <section className="bg-stone-50 px-6 py-14 lg:px-9 lg:py-20 xl:px-0">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <FlaskConical className="h-5 w-5" />
          </span>
          <div>
            <h2 className="!text-2xl lg:!text-3xl">
              {title ?? (isId ? "Komposisi" : "Composition")}
            </h2>
            {subtitle && <p className="mt-1 !text-base text-stone-600">{subtitle}</p>}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-stone-100 text-stone-600">
              <tr>
                <th className="px-5 py-3 font-semibold">{isId ? "Organisme / Bahan Aktif" : "Organism / Active Ingredient"}</th>
                {hasSpec && (
                  <th className="px-5 py-3 font-semibold">{isId ? "Kepadatan" : "Viable Count"}</th>
                )}
                <th className="px-5 py-3 font-semibold">{isId ? "Peran" : "Role"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {items.map((item, i) => (
                <tr key={i} className="bg-white">
                  <td className="px-5 py-4 font-medium italic text-stone-800">{item.organism}</td>
                  {hasSpec && (
                    <td className="cbi-mono px-5 py-4 text-stone-600">{item.spec ?? "—"}</td>
                  )}
                  <td className="px-5 py-4 text-stone-600">{item.role ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-stone-500">
          {isId
            ? "Komposisi sesuai sertifikasi Kementerian Pertanian RI. Untuk spesifikasi mutu lengkap, hubungi tim kami."
            : "Composition per Indonesian Ministry of Agriculture certification. Contact our team for the full quality specification."}
        </p>
      </div>
    </section>
  );
};

export default ProductComposition;
