-- Bump updated_at for the 9 task-2 news-uplink rows so sitemap <lastmod> refreshes -> prompts Google recrawl.
-- Content genuinely changed (one new in-body link added), so updated_at=now is correct. published_at is NOT touched.
-- Backs up old updated_at into task2_news_uplinks_updatedat_bak_202609 first.
-- Run: sqlite3 /opt/cbi-strapi/.tmp/data.db < task2-news-uplinks-2026-09-bump-updatedat.sql
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS task2_news_uplinks_updatedat_bak_202609 (slug TEXT, old_updated_at TEXT);
INSERT INTO task2_news_uplinks_updatedat_bak_202609 (slug, old_updated_at)
  SELECT slug, updated_at FROM articles
  WHERE slug IN (SELECT slug FROM task2_news_uplinks_backup_202609);
UPDATE articles SET updated_at = strftime('%Y-%m-%dT%H:%M:%S.000Z','now')
  WHERE slug IN (SELECT slug FROM task2_news_uplinks_backup_202609);
COMMIT;
