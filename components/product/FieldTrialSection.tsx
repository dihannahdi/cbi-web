import ContainerSection from "@/components/layout/container";
import FieldTrialCard from "@/components/product/FieldTrialCard";
import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { FieldTrial } from "@/types/fieldTrial";

export interface FieldTrialSectionProps {
  /** Section heading, e.g. "Testimoni & Hasil Uji Lapangan". */
  heading: string;
  /** Optional supporting paragraph rendered under the heading. */
  description?: string;
  /** First-party proof points to render. Pass an empty array to see the empty state. */
  trials: FieldTrial[];
  /** Locale for built-in UI copy. Defaults to "id". */
  locale?: Locale;
  /** Optional override for the empty-state message. Falls back to a locale default. */
  emptyStateMessage?: string;
  /** Optional id attribute, useful for in-page anchor links (e.g. a table of contents). */
  id?: string;
  className?: string;
}

const defaultEmptyState: Record<Locale, string> = {
  id: "Studi kasus dan testimoni lapangan untuk produk ini sedang kami kumpulkan, dan akan tampil di sini setelah diverifikasi.",
  en: "Field case studies and testimonials for this product are being gathered, and will appear here once verified.",
};

/**
 * FieldTrialSection — a heading + grid of FieldTrialCard proof points
 * (testimonials / field trials / case studies).
 *
 * This is a plain presentational wrapper: it does not fetch, invent, or
 * validate data. Pass only real, consented trials — see
 * docs/seo/EVIDENCE_CONTENT_BRIEF.md for exactly what to collect from the
 * client before wiring this into a product page, the asam humat pillar,
 * or a blog article.
 */
const FieldTrialSection = ({
  heading,
  description,
  trials,
  locale = "id",
  emptyStateMessage,
  id,
  className,
}: FieldTrialSectionProps) => {
  return (
    <section id={id} className={cn("w-full", className)}>
      <ContainerSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-3 leading-relaxed text-neutral-600">
              {description}
            </p>
          )}
        </div>

        {trials.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trials.map((trial) => (
              <FieldTrialCard
                key={trial.id}
                farmerName={trial.farmerName}
                location={trial.location}
                crop={trial.crop}
                quote={trial.quote}
                durationLabel={trial.durationLabel}
                beforeImage={trial.beforeImage}
                afterImage={trial.afterImage}
                resultLabel={trial.resultLabel}
                source={trial.source}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
            <p className="text-sm text-neutral-500">
              {emptyStateMessage ?? defaultEmptyState[locale]}
            </p>
          </div>
        )}
      </ContainerSection>
    </section>
  );
};

export default FieldTrialSection;
