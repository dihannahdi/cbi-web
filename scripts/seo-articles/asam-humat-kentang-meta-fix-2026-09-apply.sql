-- Task 1 meta fix -- 2026-09. Row blogs.slug='asam-humat-cair-manfaat-dosis-aplikasi'.
-- Defect: slug + meta_title + meta_description promise "asam humat cair", but title and
-- the full 14,235-char body are entirely about pupuk hayati for kentang (0 occurrences of
-- "asam humat" in content). Title already matches content and is left untouched.
-- Remedy chosen: correct meta_title + meta_description to match actual content. Slug is
-- NOT changed (would break the indexed URL and need a redirect). Row is NOT deleted.
-- Canonical-to-another-article was rejected: the only other kentang article
-- ("pupuk-hayati-untuk-kentang-strategi-peningkatan-produksi") covers a different angle
-- (production-strategy framing vs. this row's microbial-species-and-dosage catalog) --
-- not a near-duplicate, so canonicalizing away would misuse the tag and forfeit unique,
-- already-indexed content for no real gain (both pages earn near-zero GSC impressions).
-- Backs up original meta_title/meta_description into task1_metafix_backup_202609, then
-- updates inside a transaction.
-- Run on VPS: sqlite3 /opt/cbi-strapi/.tmp/data.db < asam-humat-kentang-meta-fix-2026-09-apply.sql
CREATE TABLE IF NOT EXISTS task1_metafix_backup_202609 (slug TEXT, old_meta_title TEXT, old_meta_description TEXT, ts TEXT DEFAULT (datetime('now')));
BEGIN TRANSACTION;
INSERT INTO task1_metafix_backup_202609 (slug,old_meta_title,old_meta_description)
  SELECT slug,meta_title,meta_description FROM blogs WHERE slug='asam-humat-cair-manfaat-dosis-aplikasi';
UPDATE blogs SET
  meta_title='Pupuk Hayati Kentang: Manfaat, Dosis & Aplikasi | Centra Biotech',
  meta_description='5 jenis pupuk hayati untuk kentang: Trichoderma, Bacillus, Mikoriza VAM, PGPR, Paecilomyces. Dosis aplikasi lengkap, tingkatkan hasil 20-35%. Baca selengkapnya!'
WHERE slug='asam-humat-cair-manfaat-dosis-aplikasi';
COMMIT;
-- Verify: SELECT meta_title, meta_description FROM blogs WHERE slug='asam-humat-cair-manfaat-dosis-aplikasi';
