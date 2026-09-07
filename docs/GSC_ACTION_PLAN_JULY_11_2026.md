# GSC SEO ACTION PLAN — July 11, 2026

## EXECUTIVE SUMMARY

**Plan Date:** July 11, 2026
**Data Window:** through July 8, 2026 (GSC 3-day lag), pulled live from `sc-domain:centrabiotechindonesia.com`
**Headline:** Traffic is up ~20x in 3 months, driven entirely by informational blog content (asam humat cluster). Two big leaks remain: **very low CTR (~1.3%)** and **almost no commercial-intent capture.**
**Biggest, fastest win:** Harvest clicks from pages we *already* rank for — not new content.

| Priority | Items | Focus |
|---|---|---|
| 🔴 P0 | 2 | CTR rescue on ranking pages + AI Overview / snippet capture |
| 🟠 P1 | 2 | Commercial layer (leads) + Asam Humat pillar |
| 🟡 P2 | 1 | Prune / focus thin & off-topic content |
| ⚫ Governance | 1 | AI-content risk & E-E-A-T guardrails |

**Projected impact (conservative):** +40–70% organic clicks in 60–90 days, primarily from CTR recovery on the ~483k monthly impressions we already earn.

---

## DATA SNAPSHOT (evidence base)

### 1. Growth trend (by date — accurate totals)

| Month | Clicks | Impressions | CTR |
|---|---|---|---|
| Jan 2026 | 367 | 29,623 | 1.24% |
| Mar 2026 | 312 | 30,686 | 1.02% |
| Apr 2026 | 2,010 | 180,590 | 1.11% |
| May 2026 | 5,729 | 424,055 | 1.35% |
| **Jun 2026** | **6,434** | **540,754** | **1.19%** |
| Jul 2026 (8 days) | 1,845 | 141,962 | 1.30% |

Last 28 days (real, by-device sum): **~6,154 clicks / ~483,600 impressions / CTR 1.27%**. Split: **86% mobile, ~98% Indonesia.** Avg position ~5.3 (mobile).

> Note: per-*query* totals in GSC are far lower than reality because Google withholds anonymized long-tail queries. Use by-date/by-page for totals; use query lists only for *relative* opportunity.

### 2. Period comparison — last 28d vs prior 28d
- Impressions **+7.2%** (still gaining visibility)
- Clicks (named-query slice) **flat**
- Avg position 6.92 → 7.02 (**slightly worse**)
- CTR **−7%**

**Reading:** We appear more, get clicked less. CTR erosion is the trend to fix.

### 3. The CTR problem (impressions we are wasting)

| Query | Impr | Pos | CTR |
|---|---|---|---|
| asam humat | 8,973 | 6.9 | **0.3%** |
| asam humat cair *(our product — Black Turbo)* | 573 | 9.7 | **0.0%** |
| asam humat terbuat dari apa | 1,304 | 10.4 | 0.3% |
| raja cair | 1,278 | 8.8 | 0.5% |
| asam humat untuk cabe | 823 | 8.0 | 0.2% |
| pupuk asam humat | 401 | 6.5 | 0.0% |

**Single biggest lever:** page `/id/blog/dosis-dan-cara-aplikasi-asam-humat` — **35,215 impr**, pos 5.0, CTR ~1.1%. Each +1% CTR ≈ **+350 clicks/month** from one URL.

Likely causes: (a) title/meta not compelling or intent-mismatched, and (b) **AI Overviews** absorbing informational clicks (2026 reality).

### 4. Commercial gap — target keyword standings (28d)

| Keyword | Position | Note |
|---|---|---|
| pembenah tanah | 6.3 | ✅ strongest |
| floraone | 9.7 | ok |
| asam humat cair | 9.7 | **product term, 0 clicks** |
| pupuk organik cair | 9.3 | page 1 bottom |
| pupuk hayati cair | 13.3 | page 2 |
| jual insektisida hayati | 15.8 | weak |
| insektisida hayati | 23.5 | weak |
| bio pestisida | 27.4 | weak |
| pupuk hayati terbaik | 32.1 | weak |
| distributor pupuk organik cair | 42.0 | very weak |

Informational content ranks; **commercial/product/category pages do not.** We win readers, not buyers.

### 5. Striking distance
**112 non-brand queries at position 4.5–20** with meaningful impressions — the opportunity pool. High-value examples: `asam humat` (8,973 impr, pos 6.9), `asam humat terbuat dari apa` (1,304, pos 10.4), `raja cair` (1,278, pos 8.8), `pupuk hayati cair` (407, pos 13.3), `pupuk asam humat` (401, pos 6.5).

### 6. Top pages (28d, by clicks)
`/id/blog/dosis-dan-cara-aplikasi-asam-humat` (394 clk / 35,215 impr) · `/id/news/10-rekomendasi-pupuk-organik-cair-terbaik` (271) · `/id/blog/asam-humat-cair-untuk-sawit-dosis-per-pokok` (226) · `/id/blog/kombinasi-asam-humat-dengan-pupuk-npk` (138, 12,947 impr) · `/id/blog/dolomit-sebagai-pembenah-tanah` (109, 18,553 impr).

---

## 🔴 P0 — HARVEST CTR FROM PAGES WE ALREADY RANK
**Priority:** CRITICAL — do first · **Owner:** SEO + Content (AI-assisted) · **Timeline:** 3–10 days · **Effort:** Medium · **Status:** ✅ SHIPPED July 11, 2026

> **DONE:** Top-100 pages worklist generated (DeepSeek `deepseek-v4-flash`), then **94 rows applied to prod** (`blogs`+`articles` on cbi-vps), 6 KEEP, **0 fabricated claims** (prompt guardrail + programmatic safety net stripped invented %/efficacy/cert claims; 5 pre-existing claims like "30%"/"122% RAE" carried over — flagged for substantiation). Verified via Strapi API (:9338).
> - Worklist: `docs/seo/CTR_RESCUE_WORKLIST_JULY_2026.md`
> - Applied SQL: `scripts/seo-articles/ctr-rescue-july-2026.sql`
> - **Rollback:** `scripts/seo-articles/ctr-rescue-july-2026-ROLLBACK.sql` (per-row restore from table `ctr_rescue_backup_202607`); full-file backup `/opt/cbi-strapi/.tmp/data.db.bak-ctr-20260710`.
> - **Recrawl triggered (Jul 11):** bumped `updated_at` on all 94 rows (backup `ctr_rescue_updatedat_bak_202607`) so sitemap `<lastmod>` refreshed (86 blog URLs now dated today, verified live), and resubmitted `sitemap.xml` + `sitemap-blog.xml` + `sitemap-news.xml` to GSC (pending processing).
> - **Measure in 2–4 weeks:** re-pull GSC CTR for these URLs; keep winners, revert losers via rollback.

**Why:** Fastest ROI. Touches the ~483k monthly impressions already earned. No waiting for new content to index.

**What to do:**
1. Build a worklist of the top ~100 URLs by impressions with current title + meta description.
2. Rewrite `<title>` and meta description to match search intent; add numbers, year, and a clear benefit. Prioritize the "high-impression, near-zero CTR" list in §3.
3. Add **FAQPage / HowTo schema** to the asam humat dosis/aplikasi articles.
4. Ensure the ranking URL genuinely answers the query (fix intent mismatch on `asam humat cair` → route to the product/Black Turbo page).

**AI leverage:** batch-generate 3–5 title/meta variants per URL; human picks.
**Guardrails:** title <60 chars, honest, no keyword stuffing, one primary intent per page.

**Success criteria:**
- [x] Top-100 title/meta worklist produced and shipped (94 applied, July 11)
- [ ] Site CTR ≥ 2.0% within 60 days (from ~1.3%)
- [ ] `/id/blog/dosis-dan-cara-aplikasi-asam-humat` CTR ≥ 2.5%
- [ ] `asam humat cair` product term earns first clicks

## 🔴 P0b — WIN AI OVERVIEW & FEATURED SNIPPETS (asam humat cluster)
**Priority:** CRITICAL · **Owner:** Content · **Timeline:** 1–2 weeks · **Effort:** Medium · **Status:** Not Started

**Why:** We already rank pos 3–7 on dozens of asam humat queries. In 2026, being the *cited* source in AI Overviews / snippets recovers clicks that AIO would otherwise absorb.

**What to do:**
1. Add a direct-answer paragraph (40–60 words) at the top of each target article.
2. Convert dosis into **tables**; convert application into **numbered steps**.
3. Add concise definitions for `asam humat adalah`, `asam humat terbuat dari apa`.

**Success criteria:**
- [ ] ≥ 10 asam humat queries hold a featured snippet / AIO citation
- [ ] Head term `asam humat` moves from pos 6.9 → top 3

---

## 🟠 P1 — BUILD THE COMMERCIAL LAYER (capture leads, not just readers)
**Priority:** HIGH · **Owner:** SEO + Product · **Timeline:** 3–6 weeks · **Effort:** High · **Status:** Not Started

**Why:** Money keywords rank poorly (§4). The 20x blog traffic is not funneled to product pages.

**What to do:**
1. Strengthen product & category pages: unique content, specs, use-cases, comparison tables, and `harga / jual / distributor` intent coverage.
2. **Internal linking:** add contextual CTAs from winning blog articles → matching product pages.
3. Close the `asam humat cair` → Black Turbo product loop (pos 9.7, one step away).

**AI leverage:** draft product FAQ, comparison tables, use-case sections.
**⚠️ Critical guardrail — product claims:** RajaBio is **not** the humat product; **Black Turbo** is the asam humat cair. Do not misstate claims on product pages. See memory `cbi-product-claims`.

**Success criteria:**
- [ ] `pupuk hayati cair` → page 1 (from 13.3)
- [ ] `insektisida hayati`, `bio pestisida`, `pupuk hayati terbaik` → top 15
- [ ] Blog → product internal links live on top-20 pages
- [ ] WhatsApp leads from organic tracked (see Governance)

## 🟠 P1b — ASAM HUMAT PILLAR + CLUSTER
**Priority:** HIGH · **Owner:** Content · **Timeline:** 2–4 weeks · **Effort:** Medium · **Status:** ✅ PILLAR SHIPPED July 11, 2026

> **DONE:** Pillar page **live** at `/id/blog/panduan-lengkap-asam-humat` (blog id 1133, ~1,300 words, 37 blocks, reading 8 min). Generated via DeepSeek under claim guardrails — **0 %/efficacy claims**, no RajaBio↔humat confusion. Links down to 16 cluster hubs + CTA to Black Turbo product. Verified: Strapi API returns it, live page HTTP 200 renders, URL already in `sitemap-blog.xml`, resubmitted to GSC.
> - Structure: `docs/seo/ASAM_HUMAT_PILLAR_PLAN_JULY_2026.md` · Insert SQL: `scripts/seo-articles/asam-humat-pillar-INSERT.sql`
> - **Rollback:** `DELETE FROM blogs WHERE slug='panduan-lengkap-asam-humat';` (full-file backup `/opt/cbi-strapi/.tmp/data.db.bak-pillar-20260711`).
> - **Remaining for P1b:** (a) up-links from the 107 spoke articles → pillar (deferred — needs careful rich-body edits); (b) FAQ schema for definitional Q&As; (c) request indexing in GSC to speed discovery.

**⚠️ Finding (affects all blog titles):** the blog page template appends `| Centra Biotech Indonesia` to `meta_title`, so titles that already contain a brand render **double-branded** (e.g. `… | Centra Biotech | Centra Biotech Indonesia`). Pre-existing site-wide. Fix once: drop brand from `meta_title` values OR make the template skip the suffix when a brand is already present.

**What to do:** Create one pillar page "Panduan Lengkap Asam Humat" linking all dosis/manfaat/aplikasi articles; formalize the topical authority we already own; target the head term `asam humat` (8,973 impr).

**Success criteria:**
- [ ] Pillar page published with internal-link map to ≥ 20 cluster articles
- [ ] `asam humat` head term top 3

---

## 🟡 P2 — PRUNE & FOCUS
**Priority:** MEDIUM · **Owner:** Content/SEO · **Timeline:** ongoing · **Effort:** Low–Medium · **Status:** Not Started

**Why:** Off-topic / thin pages (e.g. `snot pada ayam`, gibberish query `puxeupuxizov`, random livestock how-tos) dilute topical focus and drag site quality signals — a bigger risk if content is AI-scaled.

**What to do:** Audit low-value pages; consolidate or noindex; keep the site centered on pertanian/pupuk/asam humat authority.

**Success criteria:**
- [ ] Thin/off-topic pages list produced and actioned (merge/noindex/improve)

---

## ⚫ GOVERNANCE — AI CONTENT RISK & E-E-A-T (read before scaling with AI)
**Priority:** STANDING · **Owner:** Whole team

- **Google "scaled content abuse" policy** (since the Mar-2024 core update) targets mass-produced, search-first content. The gibberish query and over-broad topics are the symptoms that trigger algorithmic suppression. Treat AI as a *draft/scale* assistant behind human editorial review — never publish unreviewed.
- **Use real E-E-A-T** — we are a biotech company: publish field-trial data, our own dosis experiments, photos, lab results. That is authority AI and competitors cannot fake; it is our moat.
- **2026 = GEO era.** AI Overviews eat informational CTR. Defend by (a) targeting commercial/transactional queries AIO doesn't fully answer, (b) being the cited source, (c) building brand so users search us directly.
- **Connect SEO to revenue:** `monthly_report.py` looks for a missing `whatsapp-clicks.json`. Wire up WhatsApp lead tracking so success is measured in leads, not just clicks.

---

## HOW TO RE-PULL THIS DATA (reproducible)

Live GSC pull uses the monitor's OAuth token (read-only):
```bash
# from repo root; venv has gspread + google-api-python-client
PYTHONIOENCODING=utf-8 ./.venv/Scripts/python.exe scripts/gsc-sheets-monitor/verify_sheet.py
# full analysis script (trend, striking distance, targets): see scratchpad seo_analysis.py
```
GSC property: `sc-domain:centrabiotechindonesia.com` · Sheet: `1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E` ("CBI Web Reports"). Monitor infra + how to check it's alive: memory `cbi-seo-monitor`.

---

## NEXT DELIVERABLE (recommended: start with P0)
1. **CTR-rescue worklist** — top 100 URLs: current vs proposed title/meta (ready to paste). ← highest ROI
2. Asam Humat pillar + internal-link map.
3. Product-page optimization brief for money keywords (with claim guardrails).
4. Thin/off-topic content audit list (P2).
