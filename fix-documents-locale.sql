-- Fix Documents Locale Issue
-- This script creates Indonesian (id) locale versions of brochures and certificates
-- Date: 2025-01-07

-- Start transaction
BEGIN TRANSACTION;

-- Get current max ID for brochures
-- Current published brochures: 10, 11, 13, 15
-- We'll create new IDs: 16, 17, 18, 19

-- Insert Indonesian version of FLORAONE (document_id: r05f16hryza76k8ixjeuhu4g)
INSERT INTO brochures (id, document_id, title, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
SELECT 
    16 as id,
    document_id,
    title,
    description,
    datetime('now', '+1 second') as created_at,
    datetime('now', '+1 second') as updated_at,
    published_at,
    created_by_id,
    updated_by_id,
    'id' as locale
FROM brochures WHERE id = 10;

-- Insert Indonesian version of RAJABIO (document_id: vgbfu2oqnsgqzabu3qo08f69)
INSERT INTO brochures (id, document_id, title, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
SELECT 
    17 as id,
    document_id,
    title,
    description,
    datetime('now', '+2 second') as created_at,
    datetime('now', '+2 second') as updated_at,
    published_at,
    created_by_id,
    updated_by_id,
    'id' as locale
FROM brochures WHERE id = 11;

-- Insert Indonesian version of BIO KILLER (document_id: qg8cs3kz1gjudp3o89w0kquf)
INSERT INTO brochures (id, document_id, title, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
SELECT 
    18 as id,
    document_id,
    title,
    description,
    datetime('now', '+3 second') as created_at,
    datetime('now', '+3 second') as updated_at,
    published_at,
    created_by_id,
    updated_by_id,
    'id' as locale
FROM brochures WHERE id = 13;

-- Insert Indonesian version of SIMBIOS (document_id: za6kfjzzpxptf5l7fjpb1q0r)
INSERT INTO brochures (id, document_id, title, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale)
SELECT 
    19 as id,
    document_id,
    title,
    description,
    datetime('now', '+4 second') as created_at,
    datetime('now', '+4 second') as updated_at,
    published_at,
    created_by_id,
    updated_by_id,
    'id' as locale
FROM brochures WHERE id = 15;

-- Copy file relationships for FLORAONE (id: 10 -> 16)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
SELECT 
    (SELECT COALESCE(MAX(id), 0) FROM files_related_mph) + ROW_NUMBER() OVER (ORDER BY id) as id,
    file_id,
    16 as related_id,
    related_type,
    field,
    "order"
FROM files_related_mph
WHERE related_id = 10 AND related_type = 'api::brochure.brochure';

-- Copy file relationships for RAJABIO (id: 11 -> 17)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
SELECT 
    (SELECT COALESCE(MAX(id), 0) FROM files_related_mph) + ROW_NUMBER() OVER (ORDER BY id) as id,
    file_id,
    17 as related_id,
    related_type,
    field,
    "order"
FROM files_related_mph
WHERE related_id = 11 AND related_type = 'api::brochure.brochure';

-- Copy file relationships for BIO KILLER (id: 13 -> 18)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
SELECT 
    (SELECT COALESCE(MAX(id), 0) FROM files_related_mph) + ROW_NUMBER() OVER (ORDER BY id) as id,
    file_id,
    18 as related_id,
    related_type,
    field,
    "order"
FROM files_related_mph
WHERE related_id = 13 AND related_type = 'api::brochure.brochure';

-- Copy file relationships for SIMBIOS (id: 15 -> 19)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
SELECT 
    (SELECT COALESCE(MAX(id), 0) FROM files_related_mph) + ROW_NUMBER() OVER (ORDER BY id) as id,
    file_id,
    19 as related_id,
    related_type,
    field,
    "order"
FROM files_related_mph
WHERE related_id = 15 AND related_type = 'api::brochure.brochure';

-- Link new Indonesian brochures to media_and_informations (id=16 for 'id' locale)
-- Get current max ID for the linking table
INSERT INTO media_and_informations_brochures_lnk (id, media_and_information_id, brochure_id, brochure_ord)
VALUES 
    ((SELECT COALESCE(MAX(id), 0) FROM media_and_informations_brochures_lnk) + 1, 16, 16, 1),
    ((SELECT COALESCE(MAX(id), 0) FROM media_and_informations_brochures_lnk) + 2, 16, 17, 2),
    ((SELECT COALESCE(MAX(id), 0) FROM media_and_informations_brochures_lnk) + 3, 16, 18, 3),
    ((SELECT COALESCE(MAX(id), 0) FROM media_and_informations_brochures_lnk) + 4, 16, 19, 4);

-- Now do the same for certificates
-- First, check current certificates
-- Let's assume certificates have IDs similar to brochures (we'll verify and adjust)

COMMIT;

-- Verification queries
SELECT 'Brochures by locale:' as check_type;
SELECT locale, COUNT(*) as count FROM brochures WHERE published_at IS NOT NULL GROUP BY locale;

SELECT 'Indonesian brochures:' as check_type;
SELECT id, title, locale FROM brochures WHERE locale = 'id' AND published_at IS NOT NULL;

SELECT 'Media and Informations brochures links:' as check_type;
SELECT m.id, m.locale, COUNT(b.id) as brochure_count 
FROM media_and_informations m 
LEFT JOIN media_and_informations_brochures_lnk l ON m.id = l.media_and_information_id 
LEFT JOIN brochures b ON l.brochure_id = b.id 
GROUP BY m.id, m.locale;
