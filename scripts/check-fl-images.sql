-- Check what images the fishery (37) and livestock (38) Indonesian whies have
SELECT * FROM files_related_mph WHERE related_type = 'product.product-why' AND related_id IN (107, 108, 109, 110, 111, 112);
