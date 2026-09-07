-- Bump updated_at for the task 1 meta-fix row so sitemap <lastmod> refreshes -> prompts Google recrawl.
-- Content of the meta fields genuinely changed, so updated_at=now is correct. published_at is NOT touched.
-- Backs up old updated_at into task1_metafix_updatedat_bak_202609 first.
-- Run: sqlite3 /opt/cbi-strapi/.tmp/data.db < asam-humat-kentang-meta-fix-2026-09-bump-updatedat.sql
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS task1_metafix_updatedat_bak_202609 (slug TEXT, old_updated_at TEXT);
INSERT INTO task1_metafix_updatedat_bak_202609 (slug, old_updated_at)
  SELECT slug, updated_at FROM blogs
  WHERE slug IN (SELECT slug FROM task1_metafix_backup_202609);
UPDATE blogs SET updated_at = strftime('%Y-%m-%dT%H:%M:%S.000Z','now')
  WHERE slug IN (SELECT slug FROM task1_metafix_backup_202609);
COMMIT;
