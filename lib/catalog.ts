// Paket Solusi catalog — Product Knowledge v2 dataset (145 consortium
// solutions across 6 sectors), authored by the CBI team. Served as static
// typed data. Efficacy figures in `tagline`/`roi` are target specs / field-
// trial ranges and MUST be rendered with the readiness note below (see
// READINESS_NOTE) — consistent with the brand's proof-led-but-honest voice
// and the claim-safety convention in lib/relatedProduct.ts.

import solutionsData from "@/data/catalog/solutions.json";
import {
  SECTORS,
  sectorSlug,
  getSectorBySlug,
  sectorLabel,
  sectorColor,
  type SectorMeta,
} from "@/lib/catalogSectors";

// Re-export the JSON-free sector helpers so existing server-side imports from
// "@/lib/catalog" keep working. Client components should import these directly
// from "@/lib/catalogSectors" to avoid bundling the dataset.
export {
  SECTORS,
  sectorSlug,
  getSectorBySlug,
  sectorLabel,
  sectorColor,
  type SectorMeta,
};

export interface SolutionComp {
  /** Organism name, e.g. "Trichoderma harzianum" */
  n: string;
  /** CBI strain code, e.g. "CBI-034" */
  code: string;
  /** Viable count / concentration, e.g. "≥2×10⁷ spora/g" */
  conc: string;
  /** Mechanism, e.g. "MIKOPARASITISME" */
  mech: string;
}

export interface Solution {
  sector: string;
  komoditas: string;
  code: string;
  solution: string;
  brand: string;
  phase: string;
  tagline: string;
  problems: string[];
  solusi: string[];
  comp: SolutionComp[];
  dosage: string;
  roi: string[];
}

/** Slim shape passed to the client catalog for filtering (keeps bundle small). */
export interface SolutionSummary {
  code: string;
  sector: string;
  sectorSlug: string;
  komoditas: string;
  solution: string;
  brand: string;
  phase: string;
  tagline: string;
}

const SOLUTIONS = solutionsData as Solution[];

// ── Accessors ────────────────────────────────────────────────────────────
export function getAllSolutions(): Solution[] {
  return SOLUTIONS;
}

export function getSolutionByCode(code: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.code === code);
}

export function getAllCodes(): string[] {
  return SOLUTIONS.map((s) => s.code);
}

function toSummary(s: Solution): SolutionSummary {
  return {
    code: s.code,
    sector: s.sector,
    sectorSlug: sectorSlug(s.sector),
    komoditas: s.komoditas,
    solution: s.solution,
    brand: s.brand,
    phase: s.phase,
    tagline: s.tagline,
  };
}

export function getSolutionSummaries(): SolutionSummary[] {
  return SOLUTIONS.map(toSummary);
}

/** Sector tiles with live counts for the catalog index. */
export function getSectorTiles(): Array<SectorMeta & { count: number }> {
  return SECTORS.map((meta) => ({
    ...meta,
    count: SOLUTIONS.filter((s) => s.sector === meta.name).length,
  }));
}

/** Distinct komoditas within a sector (for chip filters). */
export function getKomoditasBySector(sectorName: string): string[] {
  return [
    ...new Set(SOLUTIONS.filter((s) => s.sector === sectorName).map((s) => s.komoditas)),
  ];
}

/** Related solutions — same komoditas first, then same sector. */
export function getRelatedSolutions(code: string, limit = 3): Solution[] {
  const current = getSolutionByCode(code);
  if (!current) return [];
  const sameKomoditas = SOLUTIONS.filter(
    (s) => s.code !== code && s.komoditas === current.komoditas,
  );
  const sameSector = SOLUTIONS.filter(
    (s) => s.code !== code && s.komoditas !== current.komoditas && s.sector === current.sector,
  );
  return [...sameKomoditas, ...sameSector].slice(0, limit);
}

export const CATALOG_TOTAL = SOLUTIONS.length;

// ── Claim-safety framing ─────────────────────────────────────────────────
// Efficacy figures in taglines/roi are target specs & field-trial ranges,
// not guaranteed market claims. Always render one of these alongside them.
export const READINESS_NOTE = {
  id: "Angka merupakan spesifikasi target & rentang hasil uji lapang; hasil aktual bervariasi menurut kondisi lahan dan cara aplikasi. Konsultasikan dengan tim kami untuk data uji per produk sebelum penerapan.",
  en: "Figures are target specifications & field-trial ranges; actual results vary with field conditions and application method. Contact our team for per-product test data before use.",
} as const;

export const READINESS_SHORT = {
  id: "Spesifikasi target — konsultasikan untuk data uji.",
  en: "Target specs — contact us for test data.",
} as const;

