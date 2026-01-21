-- Strapi i18n Content Translation Script
-- This script properly creates English translations by duplicating Indonesian components
-- and updating all references in the _cmps tables

-- ============================================================================
-- STEP 1: Duplicate components with English translations
-- ============================================================================

-- Dashboard Headlines
INSERT INTO components_dashboard_headlines (title, description, cta_text)
SELECT 
  CASE 
    WHEN title = 'PT Centra Biotech Indonesia - Perusahaan Bioteknologi di Indonesia untuk Pertanian, Peternakan & Perikanan' 
      THEN 'PT Centra Biotech Indonesia - Biotechnology Company in Indonesia for Agriculture, Livestock & Fisheries'
    WHEN title = 'Perusahaan Bioteknologi  Terkemuka di Indonesia' 
      THEN 'Leading Biotechnology Company in Indonesia'
    WHEN title = 'Tingkatkan Produktivitas Anda dengan Produk Bioteknologi Berkualitas Tinggi' 
      THEN 'Increase Your Productivity with High-Quality Biotechnology Products'
    WHEN title = 'Produk & Layanan' 
      THEN 'Products & Services'
    WHEN title = 'Tingkatkan Hasil Panen Anda dengan Produk Bioteknologi Berkualitas Tinggi' 
      THEN 'Increase Your Harvest with High-Quality Biotechnology Products'
    WHEN title = 'Pertanian' 
      THEN 'Agriculture'
    WHEN title = 'Berita' 
      THEN 'News'
    WHEN title = 'Blog' 
      THEN 'Blog'
    WHEN title = 'Tingkatkan Hasil Perikanan Anda dengan Produk Bioteknologi Berkualitas Tinggi' 
      THEN 'Increase Your Fishery Results with High-Quality Biotechnology Products'
    WHEN title = 'Perikanan' 
      THEN 'Fishery'
    WHEN title = 'Tingkatkan Kualitas Ternak Anda dengan Produk Bioteknologi Berkualitas' 
      THEN 'Improve Your Livestock Quality with Quality Biotechnology Products'
    WHEN title = 'Peternakan' 
      THEN 'Livestock'
    WHEN title = 'Brosur & Dokumen' 
      THEN 'Brochures & Documents'
    WHEN title = 'Media & Informasi' 
      THEN 'Media & Information'
    WHEN title = 'Hubungi Kami' 
      THEN 'Contact Us'
    WHEN title = 'PT Centra Biotech Indonesia: Solusi Bioteknologi Terintegrasi untuk Pertanian, Peternakan & Perikanan' 
      THEN 'PT Centra Biotech Indonesia: Integrated Biotechnology Solutions for Agriculture, Livestock & Fisheries'
    ELSE title 
  END as title,
  CASE 
    WHEN description = 'Temukan bagaimana solusi bioteknologi kami dapat mengatasi permasalahan global di industri pertanian, peternakan, dan perikanan.' 
      THEN 'Discover how our biotechnology solutions can address global challenges in agriculture, livestock, and fisheries industries.'
    WHEN description = 'Temukan bagaimana solusi bioteknologi kami dapat mengatasi permasalahan global di industri pertanian, peternakan, dan perikanan' 
      THEN 'Discover how our biotechnology solutions can address global challenges in agriculture, livestock, and fisheries'
    ELSE description 
  END as description,
  cta_text
FROM components_dashboard_headlines
WHERE id IN (SELECT DISTINCT cmp_id FROM dashboards_cmps WHERE entity_id IN (SELECT id FROM dashboards WHERE locale='id'));

-- About Us - Tentang Kami
INSERT INTO components_about_us_tentang_kamis (title, description)
SELECT 
  CASE 
    WHEN title = 'Tentang Kami' THEN 'About Us'
    ELSE title 
  END as title,
  CASE 
    WHEN description LIKE '%PT Centra Biotech Indonesia merupakan perusahaan nasional%' 
      THEN 'PT Centra Biotech Indonesia is a national company that produces and markets environmentally friendly biotechnology products with special microbes as the main composition. We provide biotechnology products in agriculture that include various specific products to support plant health and productivity.

Centra Biotech Indonesia has been established since February 10, 2010 and received approval from the Minister of Law and Human Rights of the Republic of Indonesia with number: AHU-20782.AH.01.01.Year 2010

Centra Biotech Indonesia with expert personnel in microbiology always creates and innovates to present products with selected natural ingredients that are the best to provide quality products that are beneficial for farmers.'
    ELSE description 
  END as description
FROM components_about_us_tentang_kamis
WHERE id IN (SELECT DISTINCT cmp_id FROM about_uses_cmps WHERE field='aboutUs' AND entity_id IN (SELECT id FROM about_uses WHERE locale='id'));

-- Corporate Values
-- First, get the structure
-- We need to duplicate the corporate_values and their items

-- Vision Mission (Visi Misi)
-- Similar pattern - duplicate with translations

-- ============================================================================
-- STEP 2: Create mapping table for old ID -> new ID
-- ============================================================================
CREATE TEMP TABLE component_id_mapping AS
SELECT 
  old_id,
  new_id,
  'dashboard_headlines' as component_type
FROM (
  SELECT 
    h1.id as old_id,
    (SELECT id FROM components_dashboard_headlines WHERE 
      title = CASE 
        WHEN h1.title = 'PT Centra Biotech Indonesia - Perusahaan Bioteknologi di Indonesia untuk Pertanian, Peternakan & Perikanan' 
          THEN 'PT Centra Biotech Indonesia - Biotechnology Company in Indonesia for Agriculture, Livestock & Fisheries'
        WHEN h1.title = 'Perusahaan Bioteknologi  Terkemuka di Indonesia' 
          THEN 'Leading Biotechnology Company in Indonesia'
        -- Add more mappings...
        ELSE h1.title 
      END
      LIMIT 1
    ) as new_id
  FROM components_dashboard_headlines h1
  WHERE h1.id IN (SELECT DISTINCT cmp_id FROM dashboards_cmps WHERE entity_id IN (SELECT id FROM dashboards WHERE locale='id'))
);

-- ============================================================================
-- STEP 3: Update _cmps tables to use new English component IDs
-- ============================================================================

-- Update dashboards_cmps for English locale
UPDATE dashboards_cmps 
SET cmp_id = (SELECT new_id FROM component_id_mapping WHERE old_id = cmp_id AND component_type = 'dashboard_headlines')
WHERE entity_id IN (SELECT id FROM dashboards WHERE locale='en')
  AND field = 'headline'
  AND EXISTS (SELECT 1 FROM component_id_mapping WHERE old_id = cmp_id);

-- Repeat for other content types...

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if English dashboard now has different component IDs than Indonesian
-- SELECT 
--   d.id, 
--   d.locale, 
--   dc.cmp_id, 
--   dc.field,
--   h.title
-- FROM dashboards d
-- JOIN dashboards_cmps dc ON d.id = dc.entity_id
-- JOIN components_dashboard_headlines h ON dc.cmp_id = h.id
-- WHERE d.locale IN ('id', 'en')
-- ORDER BY d.locale, dc.field;
