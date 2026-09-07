-- SQL Script to add Indonesian (id) locale entries for all 8 agriculture products
-- This creates localized copies of existing English products with Indonesian content

-- Get the max ID to start from
-- First, let's check current max ID
-- SELECT MAX(id) FROM product_detail_pages;

-- We'll use INSERT with explicit IDs starting from 100 to avoid conflicts

-- 1. FloraOne Pupuk Hayati Padat (slug: floraone-pupuk-hayati-padat)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    100, document_id, slug, 
    'FLORAONE' as name,
    'Pupuk Hayati Padat' as subtitle,
    'Pupuk Hayati Organik Bersertifikat' as tagline,
    'Tingkatkan Produktivitas Tanaman Anda dengan FloraOne Padat' as hero_title,
    'FloraOne adalah pupuk hayati organik premium yang mengandung konsorsium mikroba unggul.' as hero_subtitle,
    'FloraOne Padat adalah pupuk hayati organik premium dengan 5 jenis mikroba unggul.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat FloraOne Beraksi' as video_section_title,
    'Saksikan testimoni petani' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk FLORAONE Pupuk Hayati Padat.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'floraone-pupuk-hayati-padat' AND locale = 'en'
LIMIT 1;

-- 2. BioJagat Pupuk Hayati Cair (slug: biojagat-pupuk-hayati-cair)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    101, document_id, slug, 
    'BIOJAGAT' as name,
    'Pupuk Hayati Cair' as subtitle,
    'Konsorsium Mikroorganisme Unggulan' as tagline,
    'Pupuk Hayati Cair Terbaik - BIOJAGAT Tingkatkan Panen Hingga 40%' as hero_title,
    'Pupuk hayati cair premium dengan konsorsium mikroorganisme menguntungkan.' as hero_subtitle,
    'BIOJAGAT adalah pupuk organik cair (POC) premium dengan konsorsium mikroorganisme.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat BIOJAGAT Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk BIOJAGAT Pupuk Hayati Cair.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'biojagat-pupuk-hayati-cair' AND locale = 'en'
LIMIT 1;

-- 3. FloraOne Pupuk Hayati Cair (slug: floraone-pupuk-hayati)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    102, document_id, slug, 
    'FLORA ONE' as name,
    'Pupuk Hayati Cair & Padat' as subtitle,
    'Fungsi Ganda: Tingkatkan Panen & Kendalikan Penyakit' as tagline,
    'Pupuk Hayati Terbaik - FLORA ONE Tingkatkan Panen Hingga 86%' as hero_title,
    'Pupuk hayati bersertifikat Kementan RI mengandung mikroba hidup.' as hero_subtitle,
    'FLORA ONE adalah pupuk hayati mengandung konsorsium mikroba hidup yang dirancang untuk memupuk tanah pertanian.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat FLORA ONE Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk FLORA ONE Pupuk Hayati.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'floraone-pupuk-hayati' AND locale = 'en'
LIMIT 1;

-- 4. Simbios Pupuk Hayati (slug: simbios-pupuk-hayati)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    103, document_id, slug, 
    'SIMBIOS' as name,
    'Pupuk Hayati Premium' as subtitle,
    'Premium Quality - Teknologi Optimal untuk Mikroba Aktif' as tagline,
    'Pupuk Hayati Premium SIMBIOS: Efektivitas 122% RAE' as hero_title,
    'Pupuk hayati premium bersertifikat Kementan RI dengan teknologi bio-aktivasi.' as hero_subtitle,
    'SIMBIOS adalah pupuk hayati premium dalam bentuk cair yang diformulasikan dengan teknologi khusus.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat SIMBIOS Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk SIMBIOS Pupuk Hayati Premium.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'simbios-pupuk-hayati' AND locale = 'en'
LIMIT 1;

-- 5. RajaBio Pupuk Organik (slug: rajabio-pupuk-organik)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    104, document_id, slug, 
    'RAJABIO' as name,
    'Pupuk Organik Cair' as subtitle,
    'Revolusi Organik untuk Pertanian Indonesia' as tagline,
    'Pupuk Organik Cair Terbaik - RAJABIO Tingkatkan Panen Hingga 40%' as hero_title,
    'POC (Pupuk Organik Cair) bersertifikat Kementan RI. Dipercaya petani di 19+ provinsi Indonesia.' as hero_subtitle,
    'RAJABIO adalah pupuk organik cair (POC) premium yang diformulasikan dari bahan alami pilihan menggunakan teknologi fermentasi modern.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat RAJABIO Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk RAJABIO Pupuk Organik Cair.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'rajabio-pupuk-organik' AND locale = 'en'
LIMIT 1;

-- 6. BioKiller Insektisida Hayati (slug: biokiller-insektisida-hayati)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    105, document_id, slug, 
    'BIOKILLER' as name,
    'Insektisida Hayati Premium' as subtitle,
    'Pengendalian Hama Alami Tanpa Resistensi' as tagline,
    'Insektisida Hayati BIOKILLER - Basmi Wereng & Hama Tanpa Residu Kimia' as hero_title,
    'Insektisida hayati bersertifikat Kementan RI. Berbahan aktif jamur entomopatogen.' as hero_subtitle,
    'BIOKILLER adalah insektisida hayati premium berbentuk cair yang mengandung jamur entomopatogen.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat BIOKILLER Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk BIOKILLER Insektisida Hayati.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'biokiller-insektisida-hayati' AND locale = 'en'
LIMIT 1;

-- 7. Black Turbo Asam Humat (slug: blackturbo-asam-humat)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    106, document_id, slug, 
    'BLACK TURBO' as name,
    'Asam Humat Premium' as subtitle,
    'Pembenah Tanah Terbaik' as tagline,
    'Pembenah Tanah Terbaik - BLACK TURBO Asam Humat 52,37%' as hero_title,
    'BLACK TURBO mengandung asam humat tinggi 52,37% dengan kelarutan 81,04%.' as hero_subtitle,
    'BLACK TURBO adalah asam humat premium pembenah tanah dengan kandungan 52,37%.' as description,
    'Pesan via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat BLACK TURBO Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk BLACK TURBO Asam Humat.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'blackturbo-asam-humat' AND locale = 'en'
LIMIT 1;

-- 8. BioKalsi Dolomit (slug: biokalsi-dolomit)
INSERT INTO product_detail_pages (
    id, document_id, slug, name, subtitle, tagline, hero_title, hero_subtitle, description,
    cta_whatsapp, cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    video_section_title, video_section_subtitle, whatsapp_number, whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, locale,
    created_at, updated_at, published_at
)
SELECT 
    107, document_id, slug, 
    'BIOKALSI' as name,
    'Pupuk Dolomit Premium' as subtitle,
    'Netralkan Tanah Asam dengan Dolomit Premium' as tagline,
    'Atasi Tanah Asam dengan BIOKALSI - Dolomit Premium MgO 18,64% CaO 30,51%' as hero_title,
    'BIOKALSI adalah pupuk dolomit premium dengan kandungan MgO 18,64% dan CaO 30,51%. Efektif menetralkan pH tanah asam, menyediakan kalsium & magnesium untuk tanaman.' as hero_subtitle,
    'BIOKALSI adalah pupuk dolomit premium dengan kandungan MgO 18,64% dan CaO 30,51%. Efektif menetralkan pH tanah asam, menyediakan kalsium & magnesium untuk tanaman, serta mengatasi keracunan Mn dan Al. Mesh 100 untuk kelarutan maksimal.' as description,
    'Pesan Langsung via WhatsApp' as cta_whatsapp,
    cta_shopee, cta_catalog, cta_brochure, cta_certificate,
    'Lihat BIOKALSI Beraksi' as video_section_title,
    'Video testimoni dan cara aplikasi' as video_section_subtitle,
    whatsapp_number,
    'Halo, saya tertarik dengan produk BIOKALSI Dolomit. Mohon informasi lebih lanjut.' as whatsapp_message,
    primary_color, secondary_color, category, is_active, sort_order, 
    'id' as locale,
    created_at, updated_at, published_at
FROM product_detail_pages 
WHERE slug = 'biokalsi-dolomit' AND locale = 'en'
LIMIT 1;
