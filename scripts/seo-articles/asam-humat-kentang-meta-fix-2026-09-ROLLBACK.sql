-- ROLLBACK for Task 1 meta fix -- 2026-09. Restores blogs.slug='asam-humat-cair-manfaat-dosis-aplikasi'
-- meta_title/meta_description to their pre-change values.
-- Precise per-row restore from task1_metafix_backup_202609 (does NOT overwrite unrelated data).
-- Run on VPS: sqlite3 /opt/cbi-strapi/.tmp/data.db < asam-humat-kentang-meta-fix-2026-09-ROLLBACK.sql
BEGIN TRANSACTION;
UPDATE blogs SET
  meta_title = (SELECT old_meta_title FROM task1_metafix_backup_202609 b WHERE b.slug=blogs.slug),
  meta_description = (SELECT old_meta_description FROM task1_metafix_backup_202609 b WHERE b.slug=blogs.slug)
WHERE slug IN (SELECT slug FROM task1_metafix_backup_202609);
COMMIT;
-- Verify: SELECT meta_title, meta_description FROM blogs WHERE slug='asam-humat-cair-manfaat-dosis-aplikasi';
-- should read 'Asam Humat Cair: Manfaat, Dosis & Cara Aplikasi' / the original asam-humat description.
