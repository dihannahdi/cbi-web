-- Insert gallery images into Strapi files table
-- Starting from ID 200 (MAX was 199)
-- Images transferred on 2026-01-22

-- RAJABIO Gallery (product IDs: 3, 19, 25, 41)
INSERT INTO files (id, document_id, name, alternative_text, caption, width, height, hash, ext, mime, size, url, provider, folder_path, created_at, updated_at, published_at, created_by_id, updated_by_id)
VALUES 
(200, 'rajabio_gallery_001', 'rajabio1.webp', 'RAJABIO Pupuk Organik - Aplikasi di Sawah', 'Aplikasi RAJABIO di sawah padi', 1920, 1080, 'rajabio1_gallery', '.webp', 'image/webp', 1148.4, '/uploads/rajabio1.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(201, 'rajabio_gallery_002', 'rajabio2.webp', 'RAJABIO Pupuk Organik - Hasil Panen Melimpah', 'Hasil panen setelah aplikasi RAJABIO', 1920, 1080, 'rajabio2_gallery', '.webp', 'image/webp', 930.5, '/uploads/rajabio2.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(202, 'rajabio_gallery_003', 'rajabio3.webp', 'RAJABIO Pupuk Organik - Tanaman Subur', 'Tanaman subur dengan RAJABIO', 1920, 1080, 'rajabio3_gallery', '.webp', 'image/webp', 1037.1, '/uploads/rajabio3.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(203, 'rajabio_gallery_004', 'rajabio4.webp', 'RAJABIO Pupuk Organik - Testimoni Petani', 'Petani menggunakan RAJABIO', 1920, 1080, 'rajabio4_gallery', '.webp', 'image/webp', 980.0, '/uploads/rajabio4.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(204, 'rajabio_gallery_005', 'rajabio5.webp', 'RAJABIO Pupuk Organik - Padi Sehat', 'Padi sehat dan kuat dengan RAJABIO', 1920, 1080, 'rajabio5_gallery', '.webp', 'image/webp', 1043.0, '/uploads/rajabio5.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),

-- BIOKILLER Gallery (product IDs: 5, 20, 27, 42)
(205, 'biokiller_gallery_001', 'biokiller1.webp', 'BIOKILLER Insektisida Hayati - Aplikasi Semprot', 'Aplikasi semprot BIOKILLER', 1920, 1080, 'biokiller1_gallery', '.webp', 'image/webp', 1089.1, '/uploads/biokiller1.webp', 'local', '/', '2026-01-22 06:19:00', '2026-01-22 06:19:00', '2026-01-22 06:19:00', 1, 1),
(206, 'biokiller_gallery_002', 'biokiller2.webp', 'BIOKILLER Insektisida Hayati - Pengendalian Hama', 'Pengendalian hama dengan BIOKILLER', 1920, 1080, 'biokiller2_gallery', '.webp', 'image/webp', 902.0, '/uploads/biokiller2.webp', 'local', '/', '2026-01-22 06:19:00', '2026-01-22 06:19:00', '2026-01-22 06:19:00', 1, 1),
(207, 'biokiller_gallery_003', 'biokiller3.webp', 'BIOKILLER Insektisida Hayati - Wereng Mati', 'Efek BIOKILLER pada wereng', 1920, 1080, 'biokiller3_gallery', '.webp', 'image/webp', 912.1, '/uploads/biokiller3.webp', 'local', '/', '2026-01-22 06:19:00', '2026-01-22 06:19:00', '2026-01-22 06:19:00', 1, 1),
(208, 'biokiller_gallery_004', 'biokiller4.webp', 'BIOKILLER Insektisida Hayati - Padi Bebas Hama', 'Padi bebas hama dengan BIOKILLER', 1920, 1080, 'biokiller4_gallery', '.webp', 'image/webp', 957.0, '/uploads/biokiller4.webp', 'local', '/', '2026-01-22 06:19:00', '2026-01-22 06:19:00', '2026-01-22 06:19:00', 1, 1),
(209, 'biokiller_gallery_005', 'biokiller5.webp', 'BIOKILLER Insektisida Hayati - Hasil Optimal', 'Hasil panen optimal dengan BIOKILLER', 1920, 1080, 'biokiller5_gallery', '.webp', 'image/webp', 941.5, '/uploads/biokiller5.webp', 'local', '/', '2026-01-22 06:19:00', '2026-01-22 06:19:00', '2026-01-22 06:19:00', 1, 1),

-- SIMBIOS Gallery (product IDs: 6, 18, 28, 40)
(210, 'simbios_gallery_001', 'simbios1.webp', 'SIMBIOS Pupuk Hayati - Peningkatan Hasil Panen', 'Peningkatan hasil panen dengan SIMBIOS', 1920, 1080, 'simbios1_gallery', '.webp', 'image/webp', 1115.0, '/uploads/simbios1.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(211, 'simbios_gallery_002', 'simbios2.webp', 'SIMBIOS Pupuk Hayati - Akar Kuat', 'Sistem akar kuat dengan SIMBIOS', 1920, 1080, 'simbios2_gallery', '.webp', 'image/webp', 919.4, '/uploads/simbios2.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(212, 'simbios_gallery_003', 'simbios3.webp', 'SIMBIOS Pupuk Hayati - Tanaman Sehat', 'Tanaman sehat dengan SIMBIOS', 1920, 1080, 'simbios3_gallery', '.webp', 'image/webp', 966.1, '/uploads/simbios3.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(213, 'simbios_gallery_004', 'simbios4.webp', 'SIMBIOS Pupuk Hayati - Penyerapan Nutrisi', 'Penyerapan nutrisi optimal', 1920, 1080, 'simbios4_gallery', '.webp', 'image/webp', 1031.0, '/uploads/simbios4.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(214, 'simbios_gallery_005', 'simbios5.webp', 'SIMBIOS Pupuk Hayati - Padi Berkualitas', 'Padi berkualitas tinggi', 1920, 1080, 'simbios5_gallery', '.webp', 'image/webp', 1292.0, '/uploads/simbios5.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),

-- FLORAONE Gallery (product IDs for floraone-cair: 17, 26, 39, 46)
(215, 'floraone_gallery_001', 'floraone1.webp', 'FLORAONE Pupuk Hayati Cair - Aplikasi Sprayer', 'Aplikasi FLORAONE dengan sprayer', 1920, 1080, 'floraone1_gallery', '.webp', 'image/webp', 1082.0, '/uploads/floraone1.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(216, 'floraone_gallery_002', 'floraone2.webp', 'FLORAONE Pupuk Hayati Cair - Pertumbuhan Cepat', 'Pertumbuhan tanaman cepat', 1920, 1080, 'floraone2_gallery', '.webp', 'image/webp', 849.0, '/uploads/floraone2.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(217, 'floraone_gallery_003', 'floraone3.webp', 'FLORAONE Pupuk Hayati Cair - Daun Hijau Segar', 'Daun hijau segar dengan FLORAONE', 1920, 1080, 'floraone3_gallery', '.webp', 'image/webp', 916.0, '/uploads/floraone3.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(218, 'floraone_gallery_004', 'floraone4.webp', 'FLORAONE Pupuk Hayati Cair - Hasil Panen', 'Hasil panen berlimpah', 1920, 1080, 'floraone4_gallery', '.webp', 'image/webp', 963.0, '/uploads/floraone4.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(219, 'floraone_gallery_005', 'floraone5.webp', 'FLORAONE Pupuk Hayati Cair - Petani Puas', 'Petani puas dengan FLORAONE', 1920, 1080, 'floraone5_gallery', '.webp', 'image/webp', 943.0, '/uploads/floraone5.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),

-- BLACKTURBO Gallery (product IDs: 12, 21, 34, 43)
(220, 'blackturbo_gallery_001', 'blackturbo1.webp', 'BLACK TURBO Asam Humat - Aplikasi Tanah', 'Aplikasi BLACK TURBO ke tanah', 1920, 1080, 'blackturbo1_gallery', '.webp', 'image/webp', 1127.0, '/uploads/blackturbo1.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(221, 'blackturbo_gallery_002', 'blackturbo2.webp', 'BLACK TURBO Asam Humat - Struktur Tanah', 'Perbaikan struktur tanah', 1920, 1080, 'blackturbo2_gallery', '.webp', 'image/webp', 997.0, '/uploads/blackturbo2.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(222, 'blackturbo_gallery_003', 'blackturbo3.webp', 'BLACK TURBO Asam Humat - Tanah Subur', 'Tanah subur kaya humus', 1920, 1080, 'blackturbo3_gallery', '.webp', 'image/webp', 980.0, '/uploads/blackturbo3.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(223, 'blackturbo_gallery_004', 'blackturbo4.webp', 'BLACK TURBO Asam Humat - Akar Berkembang', 'Perkembangan akar optimal', 1920, 1080, 'blackturbo4_gallery', '.webp', 'image/webp', 1017.0, '/uploads/blackturbo4.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1),
(224, 'blackturbo_gallery_005', 'blackturbo5.webp', 'BLACK TURBO Asam Humat - Hasil Maksimal', 'Hasil panen maksimal', 1920, 1080, 'blackturbo5_gallery', '.webp', 'image/webp', 1270.0, '/uploads/blackturbo5.webp', 'local', '/', '2026-01-22 06:20:00', '2026-01-22 06:20:00', '2026-01-22 06:20:00', 1, 1);

-- Link gallery images to products via files_related_mph
-- Product ID mapping:
-- rajabio: 3(en), 19(id), 25(en), 41(id)
-- biokiller: 5(en), 20(id), 27(en), 42(id)
-- simbios: 6(en), 18(id), 28(en), 40(id)
-- floraone-padat: 11(en), 15(id), 33(en), 37(id)
-- blackturbo: 12(en), 21(id), 34(en), 43(id)
-- biokalsi: 14(en), 22(id), 36(en), 44(id)
-- biojagat: 16(id), 35(en), 38(id), 45(en)
-- floraone-cair: 17(id), 26(en), 39(id), 46(en)

-- Get max ID from files_related_mph
-- SELECT MAX(id) FROM files_related_mph; -- was 2200

-- RAJABIO gallery links (IDs 200-204 to products 3, 19, 25, 41)
INSERT INTO files_related_mph (file_id, related_id, related_type, field, "order")
VALUES
-- RAJABIO EN (id 3)
(200, 3, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(201, 3, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(202, 3, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(203, 3, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(204, 3, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- RAJABIO ID (id 19)
(200, 19, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(201, 19, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(202, 19, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(203, 19, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(204, 19, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- RAJABIO EN (id 25)
(200, 25, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(201, 25, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(202, 25, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(203, 25, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(204, 25, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- RAJABIO ID (id 41)
(200, 41, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(201, 41, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(202, 41, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(203, 41, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(204, 41, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),

-- BIOKILLER gallery links (IDs 205-209 to products 5, 20, 27, 42)
-- BIOKILLER EN (id 5)
(205, 5, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(206, 5, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(207, 5, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(208, 5, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(209, 5, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- BIOKILLER ID (id 20)
(205, 20, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(206, 20, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(207, 20, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(208, 20, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(209, 20, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- BIOKILLER EN (id 27)
(205, 27, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(206, 27, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(207, 27, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(208, 27, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(209, 27, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- BIOKILLER ID (id 42)
(205, 42, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(206, 42, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(207, 42, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(208, 42, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(209, 42, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),

-- SIMBIOS gallery links (IDs 210-214 to products 6, 18, 28, 40)
-- SIMBIOS EN (id 6)
(210, 6, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(211, 6, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(212, 6, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(213, 6, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(214, 6, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- SIMBIOS ID (id 18)
(210, 18, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(211, 18, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(212, 18, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(213, 18, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(214, 18, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- SIMBIOS EN (id 28)
(210, 28, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(211, 28, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(212, 28, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(213, 28, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(214, 28, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- SIMBIOS ID (id 40)
(210, 40, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(211, 40, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(212, 40, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(213, 40, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(214, 40, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),

-- FLORAONE-CAIR gallery links (IDs 215-219 to products 17, 26, 39, 46)
-- FLORAONE-CAIR ID (id 17)
(215, 17, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(216, 17, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(217, 17, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(218, 17, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(219, 17, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- FLORAONE-CAIR EN (id 26)
(215, 26, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(216, 26, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(217, 26, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(218, 26, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(219, 26, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- FLORAONE-CAIR ID (id 39)
(215, 39, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(216, 39, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(217, 39, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(218, 39, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(219, 39, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),
-- FLORAONE-CAIR EN (id 46)
(215, 46, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(216, 46, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(217, 46, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
(218, 46, 'api::product-detail-page.product-detail-page', 'productGallery', 6.0),
(219, 46, 'api::product-detail-page.product-detail-page', 'productGallery', 7.0),

-- BLACKTURBO gallery links (IDs 220-224 to products 12, 21, 34, 43)
-- BLACKTURBO EN (id 12)
(220, 12, 'api::product-detail-page.product-detail-page', 'productGallery', 1.0),
(221, 12, 'api::product-detail-page.product-detail-page', 'productGallery', 2.0),
(222, 12, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(223, 12, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(224, 12, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
-- BLACKTURBO ID (id 21)
(220, 21, 'api::product-detail-page.product-detail-page', 'productGallery', 1.0),
(221, 21, 'api::product-detail-page.product-detail-page', 'productGallery', 2.0),
(222, 21, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(223, 21, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(224, 21, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
-- BLACKTURBO EN (id 34)
(220, 34, 'api::product-detail-page.product-detail-page', 'productGallery', 1.0),
(221, 34, 'api::product-detail-page.product-detail-page', 'productGallery', 2.0),
(222, 34, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(223, 34, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(224, 34, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0),
-- BLACKTURBO ID (id 43)
(220, 43, 'api::product-detail-page.product-detail-page', 'productGallery', 1.0),
(221, 43, 'api::product-detail-page.product-detail-page', 'productGallery', 2.0),
(222, 43, 'api::product-detail-page.product-detail-page', 'productGallery', 3.0),
(223, 43, 'api::product-detail-page.product-detail-page', 'productGallery', 4.0),
(224, 43, 'api::product-detail-page.product-detail-page', 'productGallery', 5.0);
