-- Insert hero images for Flora One Cair and Dolomit
-- File IDs: 225-226
-- Created: 2026-01-22

-- Insert file records for new hero images
INSERT INTO files (id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, folder_path, created_at, updated_at, created_by_id, updated_by_id)
VALUES 
-- ID 225: flora-one-cair-hero.webp
(225, 'flora-one-cair-hero.webp', 'FLORA ONE Pupuk Hayati Cair Hero Image', 'Flora One Liquid Biofertilizer - Premium Organic Solution for Agriculture', 1200, 800, NULL, 'flora_one_cair_hero_' || substr(hex(randomblob(8)), 1, 16), '.webp', 'image/webp', 65.00, '/uploads/flora-one-cair-hero.webp', NULL, 'local', NULL, '/', datetime('now'), datetime('now'), 1, 1),

-- ID 226: dolomit-hero.webp  
(226, 'dolomit-hero.webp', 'BIOKALSI Dolomit Hero Image', 'Biokalsi Dolomit - Natural Calcium and Magnesium Fertilizer for Soil Health', 1200, 800, NULL, 'dolomit_hero_' || substr(hex(randomblob(8)), 1, 16), '.webp', 'image/webp', 108.00, '/uploads/dolomit-hero.webp', NULL, 'local', NULL, '/', datetime('now'), datetime('now'), 1, 1);

-- Get the current heroImage file_id for products that need updating
-- floraone-pupuk-hayati (IDs: 17, 26, 39, 46)
-- biokalsi-dolomit (IDs: 14, 36)

-- Delete old heroImage links for Flora One Cair products
DELETE FROM files_related_mph 
WHERE field = 'heroImage' 
AND related_id IN (17, 26, 39, 46);

-- Delete old heroImage links for Dolomit products
DELETE FROM files_related_mph 
WHERE field = 'heroImage' 
AND related_id IN (14, 36);

-- Insert new heroImage links for Flora One Cair (4 language versions)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
VALUES 
-- floraone-pupuk-hayati ID 17 (Indonesian version)
((SELECT COALESCE(MAX(id), 0) + 1 FROM files_related_mph), 225, 17, 'api::product-detail-page.product-detail-page', 'heroImage', 1.0),

-- floraone-pupuk-hayati ID 26 (another locale)
((SELECT COALESCE(MAX(id), 0) + 2 FROM files_related_mph), 225, 26, 'api::product-detail-page.product-detail-page', 'heroImage', 1.0),

-- floraone-pupuk-hayati ID 39 (another locale)
((SELECT COALESCE(MAX(id), 0) + 3 FROM files_related_mph), 225, 39, 'api::product-detail-page.product-detail-page', 'heroImage', 1.0),

-- floraone-pupuk-hayati ID 46 (English version)
((SELECT COALESCE(MAX(id), 0) + 4 FROM files_related_mph), 225, 46, 'api::product-detail-page.product-detail-page', 'heroImage', 1.0);

-- Insert new heroImage links for Dolomit (2 language versions)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
VALUES 
-- biokalsi-dolomit ID 14 (Indonesian version)
((SELECT COALESCE(MAX(id), 0) + 5 FROM files_related_mph), 226, 14, 'api::product-detail-page.product-detail-page', 'heroImage', 1.0),

-- biokalsi-dolomit ID 36 (English version)
((SELECT COALESCE(MAX(id), 0) + 6 FROM files_related_mph), 226, 36, 'api::product-detail-page.product-detail-page', 'heroImage', 1.0);

-- Verification queries
SELECT 'New hero images inserted successfully!' as Status;
SELECT id, name, url FROM files WHERE id IN (225, 226);
SELECT pd.id, pd.slug, pd.name, f.name as hero_image 
FROM product_detail_pages pd 
JOIN files_related_mph frm ON pd.id = frm.related_id 
JOIN files f ON frm.file_id = f.id 
WHERE frm.field = 'heroImage' 
AND pd.id IN (17, 26, 39, 46, 14, 36)
ORDER BY pd.id;
