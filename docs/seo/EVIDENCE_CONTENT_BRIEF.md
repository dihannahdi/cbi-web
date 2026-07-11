# Evidence Content Brief — Field Trials, Case Studies & Testimonials

**Audience:** the client (CBI) team collecting content, and whoever briefs field/sales staff.
**Purpose:** define exactly what real data to collect so it can be dropped into the new `FieldTrial` component (`components/product/FieldTrialCard.tsx` + `FieldTrialSection.tsx`) without any invented or embellished claim.

## Why this matters (and why it can't be faked)

Google's quality guidelines (E-E-A-T) added **Experience** as its own signal in December 2022 — content ranks better when it shows the author or company actually *did the thing*, not just wrote about it. A generic AI model, and most competitors, can produce fluent copy about "manfaat asam humat" from public sources. What none of them can produce is:

- a specific farmer, in a specific place, who used a specific batch of Black Turbo / RajaBio / FloraOne, for a specific duration
- a photo of *that* field, taken by *us or them*, on *that* date
- a quote in that farmer's own words, with their consent to publish it

That combination — real name, real place, real photo, real words, real consent trail — is not something a competitor can scrape or an LLM can generate. It is the one part of the page an AI Overview or a competitor's copywriter cannot replicate. Every case study collected under this brief adds to that moat. This is also first-party evidence a fact-checking reader (or a future AI Overview citing sources) can actually verify, unlike an unsourced percentage claim.

This is precisely why the `FieldTrial` component and its brief exist: the codebase today only has ad-hoc YouTube galleries and raw lab-report PDF links (`testReport1`, `testReport2`, `demplotPdf` fields on product pages). Those are useful (they're real, third-party-verified lab data) but they are not farmer *experience* — no name, no face, no first-person voice. This new component is built to hold that missing layer, once real data exists.

## What to collect per case study

For each testimonial / field trial / case study, get:

| Field | What it is | Notes |
|---|---|---|
| Farmer/grower name | Full name, as they want it published | Can be a nickname or "Bapak/Ibu [Nama]" if the farmer prefers partial anonymity — ask explicitly |
| Location | Village/kecamatan + kabupaten + province | Enough to be credible, not necessarily a full address |
| Crop / commodity | What was grown, or the livestock/fishery product | e.g. padi, cabai, udang vaname, ayam broiler |
| Product used | Which CBI product, and ideally the dosage/application method actually used | Keep this factual — "used per label instructions" or the actual regimen, not a claim of superiority |
| Duration | How long the product was used / trial ran | e.g. "1 musim tanam", "3 bulan" |
| Before photo | Photo of the field/livestock/pond *before* or at baseline | Must be taken by the farmer, field staff, or a CBI rep who was actually there |
| After photo | Photo at the point the farmer is describing | Same sourcing requirement — no stock photos, no photos from a different farm |
| Quote | The farmer's own words, in their own language | Transcribe faithfully; light grammar cleanup is fine, do not change the meaning or add numbers they didn't say |
| Result (optional) | Only if the farmer/trial reported one, in their words or from a real report | See "On numbers and results" below — this is the highest-risk field |
| Supporting document (optional) | Lab report, demplot (field-demonstration) PDF, or similar | Link the actual PDF; do not summarize it into a bigger number than it states |

## Consent / permission requirement — non-negotiable

Before any of the above is published anywhere:

1. **Get written consent** from the farmer (a signed form or, at minimum, a recorded verbal confirmation with a witness) covering:
   - use of their name (or agreed alias), photo, and quote
   - the channels it may appear on: the CBI website, product pages, blog articles, and social media/print marketing
   - that they understand it's for marketing purposes, not just an internal record
2. **Let them review the final quote and photos** before publishing, if at all possible. If the quote is translated (e.g. regional language to Bahasa Indonesia), the farmer should confirm the translation still reflects what they meant.
3. **Right to withdraw**: keep a record of who to contact if a farmer later asks for their story to be taken down.
4. **No proxy testimonials.** Do not write a quote and get a farmer to just approve it after the fact, and do not source quotes from social media comments without separately asking permission to reuse them as a testimonial.

If any of this can't be confirmed, do not publish that case study — an unconsented testimonial is a bigger liability than having no testimonial at all.

## On numbers and results — the actual legal risk

This is an agri-input company (fertilizers, humic acid products); an invented or exaggerated efficacy number is a regulatory and legal risk, not just a marketing quibble. Rules for the `resultLabel` field specifically:

- Only use a number or outcome the farmer actually said, or that comes from a real, attributable lab/demplot report.
- Never round up, average across farmers, or extrapolate ("several farmers reported X" is not the same as "X% increase").
- Prefer the farmer's own framing ("panen saya lebih baik dari biasanya") over converting it into a percentage unless a real measurement backs the percentage.
- When in doubt, leave `resultLabel` empty — it is an optional field precisely so a case study without a hard number can still be published as a qualitative testimonial.
- The component renders `resultLabel` verbatim and labels it "Hasil yang dilaporkan petani" ("Result reported by the grower") rather than as a company-verified claim — keep that framing; don't rephrase it into an implied guarantee.

## Where this will surface

Once real case studies exist, `FieldTrialSection` is meant to be wired into:

1. **Product pages** (`app/[lang]/produk-layanan/**`) — near the existing lab-report/demplot links, as the "real farmer" counterpart to the "real lab" evidence already there.
2. **The asam humat pillar page** (see `docs/seo/ASAM_HUMAT_PILLAR_PLAN_JULY_2026.md`) — as social proof supporting the informational content, particularly for Black Turbo.
3. **Blog articles** — embedded within relevant posts (e.g. dosage or use-case articles) as a supporting sidebar or in-article block, once the article's topic matches a collected case study.

## Status of this brief

No case studies exist yet. The `FieldTrial` component (`types/fieldTrial.ts`, `components/product/FieldTrialCard.tsx`, `components/product/FieldTrialSection.tsx`) is built and ready to receive real data — see `components/product/FieldTrialSection.example.tsx` for the shape it expects (populated only with obvious placeholders, not real or fabricated content). Nothing should be wired into a live page until at least one case study clears the consent requirement above.
