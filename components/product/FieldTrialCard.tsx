import { Clock, ExternalLink, MapPin, Quote, Sprout } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";
import { FieldTrial } from "@/types/fieldTrial";

export type FieldTrialCardProps = Omit<FieldTrial, "id"> & {
  /** Locale for built-in UI copy ("Sebelum/Sesudah", etc). Defaults to "id". */
  locale?: Locale;
  className?: string;
};

const copy: Record<Locale, {
  before: string;
  after: string;
  reportedResult: string;
  sourceFallback: string;
}> = {
  id: {
    before: "Sebelum",
    after: "Sesudah",
    reportedResult: "Hasil yang dilaporkan petani",
    sourceFallback: "Lihat dokumen pendukung",
  },
  en: {
    before: "Before",
    after: "After",
    reportedResult: "Result reported by the grower",
    sourceFallback: "View supporting document",
  },
};

/**
 * FieldTrialCard — a single first-party proof point (farmer testimonial,
 * field trial, or case study) for a product page.
 *
 * This component only renders what it is given. It does not calculate,
 * validate, or embellish any claim — `resultLabel` is displayed exactly as
 * provided, verbatim. The caller (content owner) is responsible for
 * ensuring every value here reflects real, consented data. Never pass
 * invented names, locations, quotes, or metrics — see
 * docs/seo/EVIDENCE_CONTENT_BRIEF.md for the real data to collect first.
 */
const FieldTrialCard = ({
  farmerName,
  location,
  crop,
  quote,
  durationLabel,
  beforeImage,
  afterImage,
  resultLabel,
  source,
  locale = "id",
  className,
}: FieldTrialCardProps) => {
  const t = copy[locale] ?? copy.id;
  const hasBefore = Boolean(beforeImage);
  const hasAfter = Boolean(afterImage);

  return (
    <article
      aria-label={`${farmerName} — ${location}`}
      className={cn(
        "flex h-full flex-col gap-5 rounded-xl border border-green-100 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md",
        className,
      )}
    >
      {(hasBefore || hasAfter) && (
        <div
          className={cn(
            "grid gap-3",
            hasBefore && hasAfter ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          {hasBefore && (
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={beforeImage as string}
                alt={`${farmerName} — ${crop} (${t.before})`}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                {t.before}
              </span>
            </div>
          )}
          {hasAfter && (
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={afterImage as string}
                alt={`${farmerName} — ${crop} (${t.after})`}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-green-700/80 px-2 py-0.5 text-xs font-medium text-white">
                {t.after}
              </span>
            </div>
          )}
        </div>
      )}

      <figure className="m-0 flex flex-1 flex-col gap-4">
        <blockquote className="m-0 flex items-start gap-2">
          <Quote
            className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
            aria-hidden="true"
          />
          <p className="text-base font-medium leading-relaxed text-neutral-800">
            {quote}
          </p>
        </blockquote>

        <figcaption className="flex flex-col gap-1.5 text-sm not-italic text-neutral-600">
          <cite className="font-semibold not-italic text-neutral-800">
            {farmerName}
          </cite>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sprout className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
              {crop}
            </span>
            {durationLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                {durationLabel}
              </span>
            )}
          </div>
        </figcaption>
      </figure>

      {resultLabel && (
        <div className="rounded-lg bg-green-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-green-700">
            {t.reportedResult}
          </p>
          <p className="mt-1 text-sm font-semibold text-green-900">
            {resultLabel}
          </p>
        </div>
      )}

      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-green-700 underline-offset-2 hover:underline"
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          {source.label || t.sourceFallback}
        </a>
      )}
    </article>
  );
};

export default FieldTrialCard;
