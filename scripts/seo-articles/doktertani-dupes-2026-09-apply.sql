-- Doktertani duplicate-title remedy -- September 2026.
--
-- INVESTIGATION SUMMARY (verified against the live doktertani Postgres DB, 2026-09-07):
--   - 578 published articles (289 pairs) share a title with another published article
--     at a different slug. Every single pair -- 289 of 289, no exceptions -- has:
--       * byte-identical content: md5(a.content) = md5(b.content) for all 289 pairs.
--       * the duplicate's slug is EXACTLY the original's slug + '-2' (289 of 289).
--       * a near-constant ~600-row id gap between original and duplicate (596-604),
--         consistent with the 2026-04-05 bulk-import batch re-running over part of
--         its own input and, on hitting a slug collision, appending '-2' instead of
--         skipping or deduplicating.
--   - This is NOT the "different crop, same title" template-collision scenario in
--     the original report: the named example pair (bawang merah / cabai) was checked
--     directly and those are two distinct, correctly differentiated titles, each with
--     its own separate '-2' duplicate. No cross-crop title collisions exist in the data.
--   - Both URLs of a sampled pair (budidaya-anggur...) are live, return HTTP 200,
--     serve identical content, and each independently self-canonicalizes
--     (<link rel="canonical"> points at its OWN url, not at the other) -- both are
--     also listed in sitemap-0.xml and submitted to Google. This is a textbook
--     duplicate-content split of ranking signal across two URLs.
--   - EXCEPTION, checked at the filesystem, not assumed: for 288 of the 289 pairs,
--     BOTH the original and the "-2" duplicate were built into the live static site.
--     For exactly one pair (panduan-kebutuhan-nutrisi-mangga-di-setiap-fase-pertumbuhan
--     -program-pemupukan-mangga-dari-vegetatif-hingga-generatif), only the "-2" page
--     was ever built (confirmed: the non-suffixed original 404s live, has no file
--     under /var/www/doktertani-web/artikel/, and is correctly absent from
--     sitemap-0.xml). That pair is a separate one-off build/deploy gap, not a live
--     duplicate-content issue, and is EXCLUDED from this migration below -- setting
--     canonical_slug to point at a URL that does not exist would be wrong once a
--     future template consumes the column. Flag it to the owner separately.
--
-- FRONTEND CONSTRAINT (verified 2026-09-07): the Astro static build's canonical tag
-- is generated purely from the page's own slug -- it does not read any DB column.
-- The `articles` table also has no existing column for a canonical override. This
-- migration is therefore only the DATA half of a real fix: it adds a nullable,
-- additive `canonical_slug` column and backfills it for the 289 duplicate rows, so
-- that WHENEVER the Astro template is updated to read + emit it, no further DB work
-- is needed. On its own, this UPDATE has ZERO effect on the live site (no rebuild,
-- no redeploy is triggered by a raw SQL change against a statically-built site).
--
-- THE PART THAT IS IMMEDIATELY EFFECTIVE without a rebuild is a set of nginx 301
-- redirects, one per duplicate "-2" URL -> its original, prepared separately at
-- scripts/seo-articles/doktertani-dupes-2026-09-nginx-redirects.conf (288 location
-- blocks -- the mangga exception above is excluded there too -- mirrors the existing
-- /kontak legacy-redirect pattern already in the vhost). That file is also prepared,
-- NOT applied to the live nginx config -- needs the owner's decision, same as this SQL.
--
-- DO NOT DELETE ANY ROWS (explicit constraint). DO NOT RUN THIS AGAINST PRODUCTION
-- without the owner's sign-off -- this file is prepared, not applied.
--
-- Run (once authorised): sudo -u postgres psql -d doktertani -f doktertani-dupes-2026-09-apply.sql
--
-- Precedent: scripts/seo-articles/pillar-uplinks-2026-09-apply.sql / -ROLLBACK.sql
-- (backup table storing original values, BEGIN TRANSACTION, per-row restore in the
-- rollback). Adapted here from SQLite (cbi-strapi) to Postgres (doktertani).

BEGIN;

-- Backup: 288 of the 289 duplicate ("-2") rows this migration touches, keyed by the
-- immutable numeric id. original_slug records what canonical_slug is being set to,
-- so the rollback can prove it is undoing exactly this change and nothing else.
-- The mangga pair (see EXCEPTION note above) is explicitly excluded: its "original"
-- side was never built to the live site, so it must not become a canonical target.
CREATE TABLE IF NOT EXISTS doktertani_dupes_backup_202609 (
  id            integer PRIMARY KEY,
  document_id   varchar,
  slug          varchar,
  original_slug varchar,
  updated_at    timestamp without time zone
);

WITH dupes AS (
  SELECT
    b.id,
    b.document_id,
    b.slug,
    a.slug AS original_slug,
    b.updated_at
  FROM articles b
  JOIN articles a
    ON a.title = b.title
   AND b.slug = a.slug || '-2'
   AND md5(a.content) = md5(b.content)
  WHERE b.published_at IS NOT NULL
    AND a.published_at IS NOT NULL
    -- Exclude the one confirmed exception (original page never built live):
    AND a.slug <> 'panduan-kebutuhan-nutrisi-mangga-di-setiap-fase-pertumbuhan-program-pemupukan-mangga-dari-vegetatif-hingga-generatif'
)
INSERT INTO doktertani_dupes_backup_202609 (id, document_id, slug, original_slug, updated_at)
SELECT id, document_id, slug, original_slug, updated_at FROM dupes
ON CONFLICT (id) DO NOTHING;

-- Additive, nullable column. No existing column touched, no row deleted. Strapi's
-- content-type schema does not know about this column and will simply ignore it
-- (same pattern as any out-of-band tracking column); confirm on a non-prod copy
-- before running against the live DB if that assumption needs verifying first.
ALTER TABLE articles ADD COLUMN IF NOT EXISTS canonical_slug varchar;

-- Point every confirmed duplicate at its original. Only the 288 backed-up rows
-- are touched (join is against the backup table, not recomputed against live data,
-- so this cannot drift from what was actually backed up above).
UPDATE articles
SET canonical_slug = bk.original_slug
FROM doktertani_dupes_backup_202609 bk
WHERE articles.id = bk.id;

COMMIT;

-- Verify (expect 288 for both -- 289 confirmed duplicate pairs minus the 1 excluded
-- mangga exception):
--   SELECT count(*) FROM doktertani_dupes_backup_202609;
--   SELECT count(*) FROM articles WHERE canonical_slug IS NOT NULL;
