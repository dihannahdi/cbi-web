-- ROLLBACK for CTR-Rescue July 2026 (P0). Restores the 94 rows to their pre-change meta.
-- Precise per-row restore from ctr_rescue_backup_202607 (does NOT overwrite unrelated data).
-- Run on VPS: sqlite3 /opt/cbi-strapi/.tmp/data.db < ctr-rescue-july-2026-ROLLBACK.sql
-- Full-file backup also available: /opt/cbi-strapi/.tmp/data.db.bak-ctr-20260710
BEGIN TRANSACTION;
UPDATE blogs SET
  meta_title       = (SELECT old_title FROM ctr_rescue_backup_202607 b WHERE b.slug=blogs.slug AND b.ctype='blog'),
  meta_description = (SELECT old_meta  FROM ctr_rescue_backup_202607 b WHERE b.slug=blogs.slug AND b.ctype='blog')
WHERE slug IN (SELECT slug FROM ctr_rescue_backup_202607 WHERE ctype='blog');
UPDATE articles SET
  meta_title       = (SELECT old_title FROM ctr_rescue_backup_202607 b WHERE b.slug=articles.slug AND b.ctype='news'),
  meta_description = (SELECT old_meta  FROM ctr_rescue_backup_202607 b WHERE b.slug=articles.slug AND b.ctype='news')
WHERE slug IN (SELECT slug FROM ctr_rescue_backup_202607 WHERE ctype='news');
COMMIT;
-- Verify: SELECT count(*) FROM ctr_rescue_backup_202607 b JOIN blogs x ON x.slug=b.slug WHERE x.meta_title=b.old_title;
