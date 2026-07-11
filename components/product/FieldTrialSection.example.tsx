// EXAMPLE ONLY — replace placeholders with REAL, consented farmer data before use.
//
// This file is NOT routed and is NOT imported anywhere in the app. It only
// demonstrates how to call <FieldTrialSection>. Every value below is an
// obviously-fake placeholder (bracketed [like this]) — none of it is a
// real farmer name, location, crop, quote, or result. Do not copy these
// placeholders into a live page; do not invent realistic-looking data to
// fill this template either. See docs/seo/EVIDENCE_CONTENT_BRIEF.md for
// what to collect from the client first, including written consent.

import FieldTrialSection from "@/components/product/FieldTrialSection";
import { FieldTrial } from "@/types/fieldTrial";

const EXAMPLE_TRIALS: FieldTrial[] = [
  {
    id: "example-1",
    farmerName: "[Nama Petani]",
    location: "[Lokasi, Provinsi]",
    crop: "[Komoditas]",
    quote: "[Isi kutipan testimoni asli di sini]",
    durationLabel: "[Durasi pemakaian, mis. 1 musim tanam]",
    beforeImage: "[URL foto sebelum — isi setelah difoto & disetujui petani]",
    afterImage: "[URL foto sesudah — isi setelah difoto & disetujui petani]",
    resultLabel: "[Hasil yang dilaporkan petani — isi dengan data asli, verbatim]",
    source: {
      label: "[Nama dokumen pendukung, mis. Laporan Uji Demplot]",
      url: "[URL PDF laporan uji/demplot asli]",
    },
  },
  {
    id: "example-2",
    farmerName: "[Nama Petani Lain]",
    location: "[Lokasi Lain, Provinsi]",
    crop: "[Komoditas Lain]",
    quote: "[Isi kutipan testimoni asli lainnya di sini]",
    // durationLabel, before/after images, resultLabel, and source are all
    // optional — this second entry shows the minimal required fields only.
  },
];

/**
 * Non-routed usage example for FieldTrialSection. Not exported for use
 * elsewhere; kept purely as a reference when wiring real data into a
 * product page.
 */
const FieldTrialSectionExample = () => {
  return (
    <FieldTrialSection
      heading="[Judul section, mis. Testimoni Petani]"
      description="[Sub-judul opsional yang menjelaskan konteks studi kasus ini]"
      trials={EXAMPLE_TRIALS}
      locale="id"
    />
  );
};

export default FieldTrialSectionExample;
