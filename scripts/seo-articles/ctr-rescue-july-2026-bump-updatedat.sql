-- Bump updated_at for the 94 CTR-rescue rows so sitemap <lastmod> refreshes -> prompts Google recrawl.
-- Meta genuinely changed, so updated_at=now is correct. published_at is NOT touched.
-- Backs up old updated_at into ctr_rescue_updatedat_bak_202607 first.
-- Run: sqlite3 /opt/cbi-strapi/.tmp/data.db < ctr-rescue-july-2026-bump-updatedat.sql
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS ctr_rescue_updatedat_bak_202607 (ctype TEXT, slug TEXT, old_updated_at TEXT);
INSERT INTO ctr_rescue_updatedat_bak_202607 (ctype,slug,old_updated_at)
  SELECT 'blog', slug, updated_at FROM blogs
  WHERE slug IN (SELECT slug FROM ctr_rescue_backup_202607 WHERE ctype='blog');
INSERT INTO ctr_rescue_updatedat_bak_202607 (ctype,slug,old_updated_at)
  SELECT 'news', slug, updated_at FROM articles
  WHERE slug IN (SELECT slug FROM ctr_rescue_backup_202607 WHERE ctype='news');
UPDATE blogs   SET updated_at = strftime('%Y-%m-%dT%H:%M:%S.000Z','now')
  WHERE slug IN (SELECT slug FROM ctr_rescue_backup_202607 WHERE ctype='blog');
UPDATE articles SET updated_at = strftime('%Y-%m-%dT%H:%M:%S.000Z','now')
  WHERE slug IN (SELECT slug FROM ctr_rescue_backup_202607 WHERE ctype='news');
COMMIT;
