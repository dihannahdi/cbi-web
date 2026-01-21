-- Check original Indonesian why section 36 component links
SELECT * FROM components_product_why_sections_cmps WHERE entity_id = 36;

-- Check what images the original product whies have
SELECT * FROM files_related_mph WHERE related_type = 'product.product-why' AND related_id IN (104, 105, 106);
