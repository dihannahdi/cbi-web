-- ============================================
-- CBI CMS I18N FIX - COMPLETE SCRIPT
-- ============================================
-- This script fixes all English content that incorrectly links to Indonesian components
-- Database: /opt/cbi-strapi/.tmp/data.db (SQLite)
-- 
-- PROBLEMS IDENTIFIED:
-- 1. Contact EN (entity 7) links to Indonesian headline 163 instead of existing EN headline 196
-- 2. About Us EN (entity 40) links to Indonesian headline 171
-- 3. Product Agriculture EN (entity 17) links to Indonesian components (165, 36, 36, 149)
-- 4. Product Livestock EN (entity 12) links to Indonesian components (167, 38, 38, 151)
-- 5. Product Fishery EN (entity 13) links to Indonesian components (166, 37, 37, 150)
-- ============================================

-- STEP 1: Create new English headlines for pages that need them
-- Current max headline ID: 197, so we start at 198

-- English headline for About Us page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text) 
VALUES (198, 'Leading Biotechnology Company in Indonesia', '', '');

-- English headline for Product Agriculture page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text) 
VALUES (199, 'Boost Your Harvest with High-Quality Biotechnology Products', 'Agriculture', '');

-- English headline for Product Fishery page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text) 
VALUES (200, 'Boost Your Fishery Yields with High-Quality Biotechnology Products', 'Fishery', '');

-- English headline for Product Livestock page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text) 
VALUES (201, 'Improve Your Livestock Quality with High-Quality Biotechnology Products', 'Livestock', '');

-- STEP 2: Create English about sections for products
-- Current max about_section ID: 38, so we start at 39

-- English about section for Agriculture
INSERT INTO components_product_about_sections (id, title, description) 
VALUES (39, 'About Agriculture Products', 'Agriculture Products are one of the solutions we provide to help the agricultural industry improve the quality and quantity of harvests. With ongoing research support from our professional team in agriculture, we have developed many quality products that have been proven to help overcome various challenges.');

-- English about section for Fishery
INSERT INTO components_product_about_sections (id, title, description) 
VALUES (40, 'About Fishery Products', 'Through biotechnology approaches, we develop products for fish and shrimp farming including probiotics, feed supplements, and water quality management. Our products are designed to increase the resilience of farmed organisms, accelerate growth, and naturally maintain pond ecosystem stability. With environmentally friendly formulations, we support more efficient, healthy, and sustainable farming practices.');

-- English about section for Livestock
INSERT INTO components_product_about_sections (id, title, description) 
VALUES (41, 'About Livestock Products', 'Livestock Products are solutions we are developing to help the livestock industry improve animal productivity. With support from our professional research team in animal husbandry, we are in the process of delivering quality products such as probiotics specially formulated for ruminants and poultry.');

-- STEP 3: Create English why sections container
-- Current max why_section ID: 38, so we start at 39

INSERT INTO components_product_why_sections (id) VALUES (39);
INSERT INTO components_product_why_sections (id) VALUES (40);
INSERT INTO components_product_why_sections (id) VALUES (41);

-- STEP 4: Create English product why items
-- Current max product_whies ID: 112, so we start at 113

-- Agriculture why items (English)
INSERT INTO components_product_product_whies (id, title, description) 
VALUES (113, 'why 1', 'Over 14 years of experience providing various environmentally friendly agricultural solutions, including biological fertilizers.');

INSERT INTO components_product_product_whies (id, title, description) 
VALUES (114, 'why 2', 'Our Biological Fertilizer products have been used by agricultural industry players throughout Indonesia for various types of crops.');

INSERT INTO components_product_product_whies (id, title, description) 
VALUES (115, 'why 3', 'Supported by a team of agricultural experts who continuously conduct research and development to produce quality product innovations.');

-- Fishery why items (English)
INSERT INTO components_product_product_whies (id, title, description) 
VALUES (116, 'why 1', 'Our products are scientifically formulated to improve the resilience and productivity of fish and shrimp farming.');

INSERT INTO components_product_product_whies (id, title, description) 
VALUES (117, 'why 2', 'Proven effective and used by farmers in various regions across Indonesia.');

INSERT INTO components_product_product_whies (id, title, description) 
VALUES (118, 'why 3', 'We have a team of experts ready to be your farming partners, providing technical support for optimal and sustainable harvests.');

-- Livestock why items (English)
INSERT INTO components_product_product_whies (id, title, description) 
VALUES (119, 'why 1', 'Using natural, environmentally friendly ingredients, including probiotics.');

INSERT INTO components_product_product_whies (id, title, description) 
VALUES (120, 'why 2', 'Our probiotic products have been used by farmers to maintain livestock health and increase productivity.');

INSERT INTO components_product_product_whies (id, title, description) 
VALUES (121, 'why 3', 'Supported by a team of livestock experts who continuously conduct research and development to produce high-quality product innovations.');

-- STEP 5: Link why items to why sections
-- Current max why_sections_cmps ID: 222, so we start at 223

-- Agriculture EN why section (ID 39) links
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (223, 39, 113, 'product.product-why', 'why1', 1);
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (224, 39, 114, 'product.product-why', 'why2', 2);
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (225, 39, 115, 'product.product-why', 'why3', 3);

-- Fishery EN why section (ID 40) links
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (226, 40, 116, 'product.product-why', 'why1', 1);
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (227, 40, 117, 'product.product-why', 'why2', 2);
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (228, 40, 118, 'product.product-why', 'why3', 3);

-- Livestock EN why section (ID 41) links
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (229, 41, 119, 'product.product-why', 'why1', 1);
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (230, 41, 120, 'product.product-why', 'why2', 2);
INSERT INTO components_product_why_sections_cmps (id, entity_id, cmp_id, component_type, field, "order") 
VALUES (231, 41, 121, 'product.product-why', 'why3', 3);

-- STEP 6: Create English banner CTAs for products
-- Current max banner_kontaks ID: 169, so we start at 170

INSERT INTO components_dashboard_banner_kontaks (id, title, cta_text) 
VALUES (170, 'Ready to Boost Your Harvest with Our Biotechnology Products?', 'Contact Us');

INSERT INTO components_dashboard_banner_kontaks (id, title, cta_text) 
VALUES (171, 'Ready to Improve Your Fish Pond Quality with Biotechnology Products?', 'Contact Us');

INSERT INTO components_dashboard_banner_kontaks (id, title, cta_text) 
VALUES (172, 'Ready to Improve Your Livestock Quality with Our Biotechnology Products?', 'Contact Us');

-- STEP 7: Update component links for English pages
-- ==============================================

-- 7a. Fix Contact EN (entity 7) to use English headline 196
UPDATE contacts_cmps SET cmp_id = 196 WHERE entity_id = 7 AND field = 'headline';

-- 7b. Fix About Us EN (entity 40) to use English headline 198
UPDATE about_uses_cmps SET cmp_id = 198 WHERE entity_id = 40 AND field = 'headline';

-- 7c. Fix Product Agriculture EN (entity 17) to use English components
UPDATE product_agricultures_cmps SET cmp_id = 199 WHERE entity_id = 17 AND field = 'headline';
UPDATE product_agricultures_cmps SET cmp_id = 39 WHERE entity_id = 17 AND field = 'aboutSection';
UPDATE product_agricultures_cmps SET cmp_id = 39 WHERE entity_id = 17 AND field = 'whySection';
UPDATE product_agricultures_cmps SET cmp_id = 170 WHERE entity_id = 17 AND field = 'bannerCTA';

-- 7d. Fix Product Livestock EN (entity 12) to use English components
UPDATE product_livestocks_cmps SET cmp_id = 201 WHERE entity_id = 12 AND field = 'headline';
UPDATE product_livestocks_cmps SET cmp_id = 41 WHERE entity_id = 12 AND field = 'aboutSection';
UPDATE product_livestocks_cmps SET cmp_id = 41 WHERE entity_id = 12 AND field = 'whySection';
UPDATE product_livestocks_cmps SET cmp_id = 172 WHERE entity_id = 12 AND field = 'bannerCTA';

-- 7e. Fix Product Fishery EN (entity 13) to use English components
UPDATE product_fisheries_cmps SET cmp_id = 200 WHERE entity_id = 13 AND field = 'headline';
UPDATE product_fisheries_cmps SET cmp_id = 40 WHERE entity_id = 13 AND field = 'aboutSection';
UPDATE product_fisheries_cmps SET cmp_id = 40 WHERE entity_id = 13 AND field = 'whySection';
UPDATE product_fisheries_cmps SET cmp_id = 171 WHERE entity_id = 13 AND field = 'bannerCTA';

-- ============================================
-- STEP 8: Fix Products table locale and create proper locale entries
-- ============================================

-- The products table has all entries with 'en' locale but Indonesian titles
-- We need to:
-- 1. Update original entries (1,3,5) to have locale 'id'
-- 2. Update duplicate entries (21,24,25) to have English titles

-- 8a. Fix original product entries to Indonesian locale
UPDATE products SET locale = 'id' WHERE id IN (1, 3, 5);

-- 8b. Update English product entries with English titles
UPDATE products SET title = 'Agriculture' WHERE id = 21;
UPDATE products SET title = 'Livestock' WHERE id = 24;
UPDATE products SET title = 'Fishery' WHERE id = 25;

-- ============================================
-- STEP 9: Fix Product Categories - Agriculture
-- ============================================
-- Current: IDs 1,5,7 have Indonesian titles with 'en' locale
--         IDs 9,12,14 are duplicates with same titles

-- 9a. Fix original entries to Indonesian locale
UPDATE product_agriculture_categories SET locale = 'id' WHERE id IN (1, 5, 7);

-- 9b. Update English category entries with English titles
UPDATE product_agriculture_categories SET title = 'Biological Fertilizer' WHERE id = 14;
UPDATE product_agriculture_categories SET title = 'Organic Fertilizer' WHERE id = 12;
UPDATE product_agriculture_categories SET title = 'Biological Insecticide' WHERE id = 9;

-- ============================================
-- STEP 10: Fix Product Categories - Livestock
-- ============================================
-- Current: IDs 1,5 have Indonesian titles with 'en' locale
--         IDs 10,12 are duplicates

-- 10a. Fix original entries to Indonesian locale
UPDATE product_livestock_categories SET locale = 'id' WHERE id IN (1, 5);

-- 10b. Update English category entries with English titles
UPDATE product_livestock_categories SET title = 'Probiotics' WHERE id = 10;
UPDATE product_livestock_categories SET title = 'Feed' WHERE id = 12;

-- ============================================
-- STEP 11: Fix Product Categories - Fishery
-- ============================================
-- Current: IDs 1,3 have Indonesian titles with 'en' locale
--         IDs 8,9 are duplicates

-- 11a. Fix original entries to Indonesian locale
UPDATE product_fishery_categories SET locale = 'id' WHERE id IN (1, 3);

-- 11b. Update English category entries with English titles
UPDATE product_fishery_categories SET title = 'Probiotics' WHERE id = 8;
UPDATE product_fishery_categories SET title = 'Feed' WHERE id = 9;

-- ============================================
-- END OF SCRIPT
-- ============================================
