-- ROLLBACK for Task 2 news up-links -- 2026-09. Restores the 9 articles rows to their pre-change content.
-- Precise per-row restore from task2_news_uplinks_backup_202609 (does NOT overwrite unrelated data).
-- Run on VPS: sqlite3 /opt/cbi-strapi/.tmp/data.db < task2-news-uplinks-2026-09-ROLLBACK.sql
BEGIN TRANSACTION;
UPDATE articles SET
  content = (SELECT old_content FROM task2_news_uplinks_backup_202609 b WHERE b.slug=articles.slug)
WHERE slug IN (SELECT slug FROM task2_news_uplinks_backup_202609);
COMMIT;
-- Verify: SELECT count(*) FROM articles WHERE content LIKE '%panduan-lengkap-asam-humat%'; -- should return to 0
