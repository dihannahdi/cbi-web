-- ROLLBACK for Doktertani duplicate-title remedy -- September 2026.
-- Restores the 288 duplicate rows touched by the apply script to their pre-change
-- state (no canonical_slug value existed before this migration, since the column
-- itself did not exist), then drops the additive column and the backup table.
--
-- Precise per-row restore from doktertani_dupes_backup_202609 (does NOT touch any
-- row this migration did not touch). Run on VPS:
--   sudo -u postgres psql -d doktertani -f doktertani-dupes-2026-09-ROLLBACK.sql

BEGIN;

-- Per-row restore: null out canonical_slug only for the rows this migration set,
-- matched against the backup table rather than a blanket "WHERE canonical_slug IS
-- NOT NULL" so any independent future use of the column is left untouched.
UPDATE articles
SET canonical_slug = NULL
WHERE id IN (SELECT id FROM doktertani_dupes_backup_202609);

-- The column was purely additive (did not exist before this migration) -- safe to
-- drop outright rather than merely nulling it.
ALTER TABLE articles DROP COLUMN IF EXISTS canonical_slug;

DROP TABLE IF EXISTS doktertani_dupes_backup_202609;

COMMIT;

-- Verify (expect 0 rows / false):
--   SELECT column_name FROM information_schema.columns
--     WHERE table_name = 'articles' AND column_name = 'canonical_slug';
--   SELECT to_regclass('public.doktertani_dupes_backup_202609'); -- expect NULL
