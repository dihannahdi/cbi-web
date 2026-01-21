-- Link images to English headlines
-- Using the same images as Indonesian headlines

-- About Us headline (198) - need to check which image About Us ID uses
-- Check what image headline 171 uses
SELECT * FROM files_related_mph WHERE related_id = 171 AND related_type = 'dashboard.headline';

-- Product Agriculture EN headline (199) - use image from ID 165 (image 50)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
VALUES (2022, 50, 199, 'dashboard.headline', 'image', 1.0);

-- Product Fishery EN headline (200) - use image from ID 166 (image 58)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
VALUES (2023, 58, 200, 'dashboard.headline', 'image', 1.0);

-- Product Livestock EN headline (201) - use image from ID 167 (image 52)
INSERT INTO files_related_mph (id, file_id, related_id, related_type, field, "order")
VALUES (2024, 52, 201, 'dashboard.headline', 'image', 1.0);

-- About Us EN headline (198) - check what image ID 171 has
-- Then we'll add it
