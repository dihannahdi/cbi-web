# Asam Humat Pillar — Structure & Internal-Link Map (P1b)

**Status:** DRAFT FOR APPROVAL (structure only — no content written, no numeric claims). Once approved, fill via DeepSeek under the same claim guardrails as P0, then publish as a Strapi blog.

## Why
We already own the topic: **107 asam-humat articles** live. But the head term **"asam humat"** (8,973 impr, pos **6.9**, CTR 0.3%) and definitional queries have no single authoritative page — they land on a *dosis* article that mismatches intent. A pillar consolidates authority, captures the head + definitional intent, and funnels readers down to specifics and to the product (Black Turbo).

## Pillar page
- **Working title:** `Asam Humat: Panduan Lengkap (Pengertian, Manfaat, Dosis, Produk)`
- **URL (recommended, fast path):** `/id/blog/panduan-lengkap-asam-humat` (Strapi blog — no code deploy)
- **Stronger alternative (needs a code route):** top-level `/id/asam-humat` landing. Recommend starting on the blog route; promote later if it performs.
- **Primary target:** `asam humat` · **secondary:** `asam humat adalah`, `asam humat terbuat dari apa`, `fungsi asam humat`, `manfaat asam humat`, `kandungan asam humat`.
- **Intent:** informational-first (answer "what/why/how"), then bridge to commercial (Black Turbo).

## Section outline (H2 → what it answers → target query → down-link hub)
1. **Apa itu asam humat?** — definition, direct-answer paragraph up top (wins snippet/AIO). → `asam humat adalah` → hub: `apa-itu-asam-humat-dan-manfaatnya-untuk-tanaman`
2. **Asam humat terbuat dari apa?** — sources (leonardite, gambut, batu bara muda). → `asam humat terbuat dari apa` → hubs: `asam-humat-cair-dari-leonardite-vs-dari-gambut`, `asam-humat-cair-dari-batu-bara-muda-proses-ekstraksi`
3. **Asam humat vs asam fulvat vs pupuk organik** — disambiguation. → hubs: `perbedaan-asam-humat-dan-asam-fulvat`, `asam-humat-vs-pupuk-organik-biasa`
4. **Cara kerja & manfaat (sains)** — KTK, pH, chelasi, retensi air, mikrobiome, perakaran. → `fungsi asam humat`, `manfaat asam humat untuk tanaman` → hubs: `cara-kerja-asam-humat-meningkatkan-kesuburan-tanah`, `asam-humat-cair-dan-peningkatan-ktk-tanah`, `asam-humat-dan-ph-tanah-hubungan-penting`
5. **Dosis & cara aplikasi** — tables + numbered steps (snippet-friendly). → `dosis asam humat`, `cara aplikasi asam humat` → hub: `dosis-dan-cara-aplikasi-asam-humat` (our #1 traffic page)
6. **Asam humat per komoditas** — link grid to crop guides. → `asam humat untuk [sawit/padi/cabe/jagung/kopi/...]` → hubs: `asam-humat-cair-untuk-sawit-dosis-per-pokok-per-semester`, `asam-humat-cair-untuk-padi-dosis-dan-jadwal-aplikasi`, `asam-humat-cair-untuk-cabai-panduan-pemupukan-lengkap`, `asam-humat-cair-untuk-jagung-meningkatkan-serapan-hara`, `asam-humat-cair-untuk-kopi-panduan-perkebunan-rakyat` (+ full crop list below)
7. **Asam humat per kondisi tanah/lahan** — gambut, salin, pasir, liat, kritis. → hubs: `asam-humat-untuk-tanah-berpasir`, `asam-humat-untuk-tanah-liat`, `asam-humat-cair-untuk-lahan-gambut`, `asam-humat-cair-untuk-mengatasi-tanah-salin`
8. **Memilih produk asam humat cair** *(commercial bridge)* — how to choose, asli vs palsu, harga. → `asam humat cair`, `asam humat terbaik`, `harga asam humat cair` → hubs: `asam-humat-cair-terbaik-2026-rekomendasi-produk`, `cara-membedakan-asam-humat-cair-asli-dan-palsu`, `harga-asam-humat-cair-di-indonesia-perbandingan`
9. **Black Turbo — asam humat cair CBI** *(CTA)* → link to product page `/id/produk-layanan/pertanian/blackturbo-asam-humat-cair` + WA CTA. (Black Turbo = the humat product; do NOT attribute humat to RajaBio — see memory `cbi-product-claims`.)

## Internal-link map (the rule)
- **Up-links:** all **107** cluster articles get a contextual link to the pillar (anchor: "panduan lengkap asam humat"). This is the mechanical bulk step — scriptable.
- **Down-links:** pillar links to the ~20 section-hub articles above (not all 107; hubs then link to their spokes).
- **Commercial:** sections 8–9 link to Black Turbo product page; pillar gets one WA CTA block.
- **Cross-links:** each crop guide links to 2–3 sibling crop guides (already partially done — verify).

## Crop/condition spokes (section 6–7 grid — real slugs, abbreviated)
sawit · padi · cabai · jagung · kopi · kakao · karet · bawang-merah · teh · anggrek · kelengkeng · strawberry · tembakau · porang · kapas · pala · pinang · kemiri-sunan · rami · sawo · mete · kelapa-pesisir · hortikultura · tanaman-hias · sayuran-organik · rempah · buah-tropis · obat-tradisional — plus lahan: gambut · salin · pasir · liat · kritis · vulkanik · tadah-hujan · dataran-tinggi · pesisir · irigasi-teknis · greenhouse · hidroponik · fertigasi.

## Fill plan (after approval)
1. Draft pillar body via DeepSeek — **guardrails: no invented %/efficacy/cert claims** (same safety-net as P0); qualitative benefits only unless CBI supplies substantiated figures.
2. Human review (esp. sections 8–9 for claims + Black Turbo accuracy).
3. Publish as Strapi blog (locale `id`), then add up-links across the 107 articles (scripted UPDATE with row backup).
4. Add FAQ schema for the definitional Q&As (section 1–3).
5. Bump `updated_at` + resubmit `sitemap-blog.xml` (same as P0 step 2).

## P2 note (surfaced during this work)
4 duplicate/draft slugs pollute the cluster and should be pruned/redirected (they mirror real articles):
`draft-artikel-seo-asam-humat-untuk-cabe-pada-tanah-yang-sudah-jenuh-pupuk` · `draft-artikel-seo-asam-humat-untuk-padi-sebagai-penunjang-kesuburan-tanah-sawah` · `draft-artikel-seo-ciri-ciri-tanah-yang-membutuhkan-asam-humat-pertanian` · `draft-artikel-seo-efektivitas-asam-humat-pada-tanah-lelah-agar-nutrisi-terserap-maksimal`
