-- Bump updated_at for the 228 source rows touched by the orphan up-link pass so sitemap <lastmod> refreshes -> prompts Google recrawl.
-- Content genuinely changed (new in-body link(s) added), so updated_at=now is correct. published_at is NOT touched.
-- Backs up old updated_at into orphan_uplinks_updatedat_bak_202609 first.
-- Run: sqlite3 /opt/cbi-strapi/.tmp/data.db < orphan-uplinks-2026-09-bump-updatedat.sql
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS orphan_uplinks_updatedat_bak_202609 (slug TEXT, old_updated_at TEXT);
INSERT INTO orphan_uplinks_updatedat_bak_202609 (slug, old_updated_at)
  SELECT slug, updated_at FROM blogs
  WHERE slug IN (SELECT slug FROM orphan_uplinks_backup_202609);
UPDATE blogs SET updated_at = strftime('%Y-%m-%dT%H:%M:%S.000Z','now')
  WHERE slug IN (SELECT slug FROM orphan_uplinks_backup_202609);
COMMIT;