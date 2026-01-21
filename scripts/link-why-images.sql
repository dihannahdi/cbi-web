-- Link images to English product why components
-- Agriculture EN whies (113, 114, 115) - use same images as Indonesian (104, 105, 106)

-- Check current max ID
SELECT MAX(id) FROM files_related_mph;

-- Insert image links for English agriculture whies
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
VALUES 
(2026, 66, 113, 'product.product-why', 'image', 1.0),
(2027, 45, 114, 'product.product-why', 'image', 1.0),
(2028, 67, 115, 'product.product-why', 'image', 1.0);

-- Now check fishery and livestock why sections
-- First, find the Indonesian why sections for fishery and livestock
SELECT * FROM components_product_why_sections_cmps WHERE entity_id IN (37, 38);
