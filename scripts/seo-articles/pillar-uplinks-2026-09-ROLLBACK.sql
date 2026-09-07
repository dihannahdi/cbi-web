-- ROLLBACK for Pillar up-links -- September 2026. Restores the 44 rows to their pre-change content.
-- Precise per-row restore from pillar_uplinks_backup_202609 (does NOT overwrite unrelated data).
-- Run on VPS: sqlite3 /opt/cbi-strapi/.tmp/data.db < pillar-uplinks-2026-09-ROLLBACK.sql
-- Full-file backup also available: /opt/cbi-strapi/.tmp/data.db.bak-pillar-<timestamp> (see apply run log)
BEGIN TRANSACTION;
UPDATE blogs SET
  content = (SELECT old_content FROM pillar_uplinks_backup_202609 b WHERE b.slug=blogs.slug)
WHERE slug IN (SELECT slug FROM pillar_uplinks_backup_202609);
COMMIT;
-- Verify: SELECT count(*) FROM blogs WHERE content LIKE '%panduan-lengkap-asam-humat%'; -- should return to 0
