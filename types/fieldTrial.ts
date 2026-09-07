/**
 * FieldTrial — a single first-party proof point (farmer testimonial, field
 * trial, or case study) that can be attached to a product page, the asam
 * humat pillar, or a blog article.
 *
 * IMPORTANT — legal/regulatory note (agri-input claims):
 * Every field here is plain text/URL supplied by the caller. This type
 * intentionally has NO computed, inferred, or aggregated claim (e.g. no
 * `yieldIncreasePercent` number derived by this codebase). Any efficacy
 * figure must come from real, consented, verifiable farmer or trial data
 * typed as-is into `resultLabel` — never invent or estimate a value to
 * populate these fields. See docs/seo/EVIDENCE_CONTENT_BRIEF.md for what
 * to collect from the client before publishing a real FieldTrial.
 */

/** A link to supporting evidence, e.g. a lab report or demplot (field-demo) PDF. */
export interface FieldTrialSource {
  /** Visible link label, e.g. "Laporan Uji Lab (PDF)". */
  label: string;
  /** URL to the supporting document. */
  url: string;
}

export interface FieldTrial {
  /** Stable unique key (used for React lists / anchors). Not rendered. */
  id: string;
  /** Farmer/grower's name, exactly as consented for publication. */
  farmerName: string;
  /** Location, e.g. "Kabupaten Subang, Jawa Barat". */
  location: string;
  /** Commodity / crop / livestock / fishery product involved. */
  crop: string;
  /** The verbatim testimonial quote, in the farmer's own words. */
  quote: string;
  /** Optional human-readable duration, e.g. "3 bulan masa tanam". */
  durationLabel?: string;
  /** Optional "before" photo URL (first-party, consented). */
  beforeImage?: string;
  /** Optional "after" photo URL (first-party, consented). */
  afterImage?: string;
  /**
   * Optional result label, rendered verbatim exactly as provided — this
   * component does not validate, round, or embellish it in any way. The
   * caller/content owner is solely responsible for ensuring the text is
   * truthful and substantiated before it is passed in.
   */
  resultLabel?: string;
  /** Optional link to supporting evidence (lab report, demplot PDF, etc). */
  source?: FieldTrialSource;
}
