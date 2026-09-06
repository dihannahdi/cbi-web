-- ROLLBACK for Orphan up-links -- 2026-09. Restores every touched source row to its pre-change content.
-- Precise per-row restore from orphan_uplinks_backup_202609 (does NOT overwrite unrelated data).
-- Run on VPS: sqlite3 /opt/cbi-strapi/.tmp/data.db < orphan-uplinks-2026-09-ROLLBACK.sql
BEGIN TRANSACTION;
UPDATE blogs SET
  content = (SELECT old_content FROM orphan_uplinks_backup_202609 b WHERE b.slug=blogs.slug)
WHERE slug IN (SELECT slug FROM orphan_uplinks_backup_202609);
COMMIT;
-- Verify: SELECT count(*) FROM blogs b JOIN orphan_uplinks_backup_202609 k ON b.slug=k.slug WHERE b.content != k.old_content; -- should return 0