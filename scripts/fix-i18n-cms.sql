-- =====================================================
-- CBI STRAPI CMS - COMPREHENSIVE I18N FIX SCRIPT
-- =====================================================
-- This script fixes all language inconsistencies by:
-- 1. Creating English translations for component content
-- 2. Updating links so English pages use English components
-- =====================================================

-- BACKUP FIRST!
-- sqlite3 /opt/cbi-strapi/.tmp/data.db ".backup /opt/cbi-strapi/.tmp/data_backup_$(date +%Y%m%d_%H%M%S).db"

-- =====================================================
-- PART 1: HEADLINE TRANSLATIONS
-- =====================================================

-- Create English headline for About Us page (currently uses Indonesian headline 171)
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (200, 'Leading Biotechnology Company in Indonesia', '', '');

-- Create English headline for Agriculture product page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (201, 'Boost Your Harvest with High-Quality Biotechnology Products', 'Agriculture', 'Agriculture');

-- Create English headline for Livestock product page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (202, 'Improve Your Livestock Quality with Premium Biotechnology Products', 'Livestock', '');

-- Create English headline for Fishery product page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (203, 'Enhance Your Fishery Results with High-Quality Biotechnology Products', 'Fishery', '');

-- Create English headline for News page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (204, 'News', 'Media & Information', '');

-- Create English headline for Blog page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (205, 'Blog', 'Media & Information', '');

-- Create English headline for Documents page
INSERT INTO components_dashboard_headlines (id, title, description, cta_text)
VALUES (206, 'Brochures & Documents', 'Media & Information', '');

-- =====================================================
-- PART 2: PRODUCT ABOUT SECTIONS
-- =====================================================

-- Create English about section for Agriculture
INSERT INTO components_product_about_sections (id, title)
VALUES (50, 'About Agricultural Products');

-- Create English about section for Livestock
INSERT INTO components_product_about_sections (id, title)
VALUES (51, 'About Livestock Products');

-- Create English about section for Fishery
INSERT INTO components_product_about_sections (id, title)
VALUES (52, 'About Fishery Products');

-- =====================================================
-- PART 3: WHY SECTION TRANSLATIONS
-- =====================================================

-- Create English why section for Agriculture (currently using Indonesian id 36)
INSERT INTO components_product_why_sections (id, title)
VALUES (50, 'Why Choose Our Agricultural Products?');

-- Create English why section for Livestock
INSERT INTO components_product_why_sections (id, title)
VALUES (51, 'Why Choose Our Livestock Products?');

-- Create English why section for Fishery
INSERT INTO components_product_why_sections (id, title)
VALUES (52, 'Why Choose Our Fishery Products?');

-- =====================================================
-- PART 4: BANNER CTA TRANSLATIONS
-- =====================================================

-- Create English CTA for Agriculture
INSERT INTO components_dashboard_banner_kontaks (id, title, cta_text, description)
VALUES (200, 'Ready to Boost Your Harvest with Our Biotechnology Products?', 'Contact Us', '');

-- Create English CTA for Livestock
INSERT INTO components_dashboard_banner_kontaks (id, title, cta_text, description)
VALUES (201, 'Ready to Improve Livestock Quality with Our Biotechnology Products?', 'Contact Us', '');

-- Create English CTA for Fishery
INSERT INTO components_dashboard_banner_kontaks (id, title, cta_text, description)
VALUES (202, 'Ready to Enhance Fishery Results with Our Biotechnology Products?', 'Contact Us', '');

-- =====================================================
-- PART 5: CORPORATE VALUE ITEMS (English translations)
-- =====================================================

-- Create English corporate value items
INSERT INTO components_about_us_corporate_value_items (id, title, description)
VALUES 
(200, 'Trustworthy', 'Reliable in maintaining business relationships with customers'),
(201, 'Honest', 'Transparent in building mutually beneficial business relationships'),
(202, 'Enthusiastic', 'Proactively providing the best solutions for customers'),
(203, 'Initiative', 'Proactively creating relevant and impactful solutions to accelerate customer success'),
(204, 'Visionary', 'Continuously collaborating with experts to develop innovative and relevant products');

-- =====================================================
-- PART 6: UPDATE LINK TABLES - CONTACT PAGE
-- =====================================================

-- Fix English contact page (ID 7) to use English headline (196 exists already)
UPDATE contacts_cmps 
SET component_id = 196 
WHERE entity_id = 7 AND component_type = 'dashboard.headline';

-- =====================================================
-- PART 7: UPDATE LINK TABLES - ABOUT US PAGE
-- =====================================================

-- Fix English about_uses (ID 40) to use English headline
UPDATE about_uses_cmps 
SET component_id = 200 
WHERE entity_id = 40 AND component_type = 'dashboard.headline';

-- Fix English about_uses (ID 40) corporate value items
-- Need to update the link table for corporate values
UPDATE about_uses_cmps 
SET component_id = 40 
WHERE entity_id = 40 AND component_type = 'about-us.corporate-value';

-- =====================================================
-- PART 8: UPDATE LINK TABLES - PRODUCT PAGES
-- =====================================================

-- Fix English product_agricultures (ID 17) to use English components
UPDATE product_agricultures_cmps 
SET component_id = 201 
WHERE entity_id = 17 AND component_type = 'dashboard.headline';

UPDATE product_agricultures_cmps 
SET component_id = 50 
WHERE entity_id = 17 AND component_type = 'product.about-section';

UPDATE product_agricultures_cmps 
SET component_id = 50 
WHERE entity_id = 17 AND component_type = 'product.why-section';

UPDATE product_agricultures_cmps 
SET component_id = 200 
WHERE entity_id = 17 AND component_type = 'dashboard.banner-kontak';

-- =====================================================
-- PART 9: NEWS AND BLOG SECTIONS
-- =====================================================

-- Check news_sections and blog_sections for localization issues
-- First, let's see current state and fix if needed

-- =====================================================
-- PART 10: PRODUCT CATEGORIES - ADD ENGLISH ENTRIES
-- =====================================================

-- Create English entries for product_agriculture_categories
INSERT INTO product_agriculture_categories (id, document_id, title, locale, published_at, created_at, updated_at)
SELECT id + 100, document_id, 
  CASE title 
    WHEN 'Pupuk Hayati' THEN 'Biological Fertilizer'
    WHEN 'Pupuk Organik' THEN 'Organic Fertilizer'
    WHEN 'Insektisida Hayati' THEN 'Biological Insecticide'
    ELSE title
  END,
  'id', published_at, created_at, updated_at
FROM product_agriculture_categories 
WHERE locale = 'en' AND published_at IS NOT NULL;

-- Update original entries to be Indonesian locale
UPDATE product_agriculture_categories SET locale = 'id' WHERE locale = 'en';

-- Then create English versions
INSERT INTO product_agriculture_categories (document_id, title, locale, published_at, created_at, updated_at)
SELECT document_id, 
  CASE title 
    WHEN 'Pupuk Hayati' THEN 'Biological Fertilizer'
    WHEN 'Pupuk Organik' THEN 'Organic Fertilizer'
    WHEN 'Insektisida Hayati' THEN 'Biological Insecticide'
    ELSE title
  END,
  'en', published_at, created_at, updated_at
FROM product_agriculture_categories 
WHERE locale = 'id' AND published_at IS NOT NULL;

-- =====================================================
-- PART 11: PRODUCT LIVESTOCK CATEGORIES
-- =====================================================

-- Update locale and create English entries
UPDATE product_livestock_categories SET locale = 'id' WHERE locale = 'en';

INSERT INTO product_livestock_categories (document_id, title, locale, published_at, created_at, updated_at)
SELECT document_id, 
  CASE title 
    WHEN 'Probiotik' THEN 'Probiotics'
    WHEN 'Pakan Ternak' THEN 'Livestock Feed'
    WHEN 'Suplemen' THEN 'Supplements'
    ELSE title
  END,
  'en', published_at, created_at, updated_at
FROM product_livestock_categories 
WHERE locale = 'id' AND published_at IS NOT NULL;

-- =====================================================
-- PART 12: PRODUCT FISHERY CATEGORIES
-- =====================================================

-- Update locale and create English entries
UPDATE product_fishery_categories SET locale = 'id' WHERE locale = 'en';

INSERT INTO product_fishery_categories (document_id, title, locale, published_at, created_at, updated_at)
SELECT document_id, 
  CASE title 
    WHEN 'Probiotik Air' THEN 'Water Probiotics'
    WHEN 'Bioaktivator Kolam' THEN 'Pond Bioactivator'
    WHEN 'Suplemen Ikan' THEN 'Fish Supplements'
    ELSE title
  END,
  'en', published_at, created_at, updated_at
FROM product_fishery_categories 
WHERE locale = 'id' AND published_at IS NOT NULL;

-- =====================================================
-- PART 13: PRODUCTS TABLE - Fix locale
-- =====================================================

-- The products table has Indonesian titles but English locale
-- Let's fix this properly
UPDATE products SET locale = 'id' WHERE title IN ('Pertanian', 'Peternakan', 'Perikanan');

-- Create English product entries
INSERT INTO products (document_id, title, description, color1, color2, url, locale, published_at, created_at, updated_at, created_by_id, updated_by_id)
SELECT document_id, 
  CASE title 
    WHEN 'Pertanian' THEN 'Agriculture'
    WHEN 'Peternakan' THEN 'Livestock'
    WHEN 'Perikanan' THEN 'Fishery'
    ELSE title
  END,
  description, color1, color2, url, 'en', published_at, created_at, updated_at, created_by_id, updated_by_id
FROM products 
WHERE locale = 'id' AND published_at IS NOT NULL;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
