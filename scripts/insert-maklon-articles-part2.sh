#!/bin/bash
# ============================================
# MAKLON PUPUK SEO ARTICLES - PART 2
# Articles 9-16
# ============================================

cd /opt/cbi-strapi

cat > /tmp/insert_maklon_articles_part2.sql << 'EOFMAKLON2'

-- ============================================
-- ARTICLE 9: MOQ Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'MOQ Maklon Pupuk: Berapa Minimum Order yang Ideal?',
  'moq-maklon-pupuk',
  'Panduan menentukan MOQ (Minimum Order Quantity) maklon pupuk untuk berbagai skala bisnis, dari UMKM hingga enterprise.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Memahami MOQ dalam Bisnis Maklon Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"MOQ (Minimum Order Quantity) adalah jumlah minimum pesanan yang harus dipenuhi untuk memulai produksi maklon. Memahami MOQ sangat penting untuk perencanaan bisnis pupuk Anda."}]},{"type":"heading","children":[{"type":"text","text":"Mengapa Ada MOQ?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pabrik maklon menetapkan MOQ karena beberapa alasan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Efisiensi Produksi - Produksi skala kecil tidak efisien biaya"}]},{"type":"list-item","children":[{"type":"text","text":"Setup Mesin - Setiap batch memerlukan persiapan mesin"}]},{"type":"list-item","children":[{"type":"text","text":"Pengadaan Bahan Baku - Bahan baku harus dipesan dalam jumlah tertentu"}]},{"type":"list-item","children":[{"type":"text","text":"Quality Control - Pengujian memerlukan sampel yang cukup"}]}]},{"type":"heading","children":[{"type":"text","text":"MOQ Standar Maklon Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Berikut MOQ standar untuk berbagai jenis produk maklon pupuk:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Pupuk Organik Cair: 1.000 - 2.000 liter per batch"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Cair: 500 - 1.000 liter per batch"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Padat: 500 - 1.000 kg per batch"}]},{"type":"list-item","children":[{"type":"text","text":"Insektisida Hayati: 500 - 1.000 liter per batch"}]}]},{"type":"heading","children":[{"type":"text","text":"Tips Mengelola MOQ untuk Pemula"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Mulai dari MOQ terendah untuk menguji pasar"}]},{"type":"list-item","children":[{"type":"text","text":"Negosiasikan MOQ dengan pabrik maklon"}]},{"type":"list-item","children":[{"type":"text","text":"Pertimbangkan kerjasama dengan pengusaha lain untuk berbagi batch"}]},{"type":"list-item","children":[{"type":"text","text":"Hitung kebutuhan pasar sebelum order"}]}]},{"type":"heading","children":[{"type":"text","text":"MOQ Fleksibel di PT Centra Biotech Indonesia"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menawarkan MOQ yang fleksibel untuk mendukung berbagai skala bisnis. Kami memahami bahwa pengusaha pemula memerlukan MOQ yang lebih rendah. Hubungi 0851 8328 4691 untuk negosiasi MOQ sesuai kebutuhan Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 10: Formulasi Pupuk Custom
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Formulasi Pupuk Custom: Cara Membuat Produk Unik dengan Maklon',
  'formulasi-pupuk-custom',
  'Panduan lengkap membuat formulasi pupuk custom melalui jasa maklon: riset pasar, formulasi, uji coba, hingga produksi massal.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Mengapa Formulasi Custom Penting?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Membuat formulasi pupuk custom memberi Anda keunggulan kompetitif di pasar. Produk yang unik dan sesuai kebutuhan spesifik petani akan lebih mudah dijual dibanding produk generik."}]},{"type":"heading","children":[{"type":"text","text":"Langkah Membuat Formulasi Pupuk Custom"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Riset Pasar dan Kebutuhan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Identifikasi masalah spesifik petani di target pasar Anda. Apakah mereka butuh pupuk untuk tanaman tertentu? Apakah ada masalah penyakit yang perlu diatasi?"}]},{"type":"heading","children":[{"type":"text","text":"2. Konsultasi dengan Tim R&D"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Diskusikan temuan riset dengan tim R&D pabrik maklon. Mereka akan membantu menerjemahkan kebutuhan pasar menjadi formulasi teknis."}]},{"type":"heading","children":[{"type":"text","text":"3. Desain Formulasi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Tim ahli akan merancang kombinasi optimal mikroba dan nutrisi. Untuk pupuk hayati, ini meliputi pemilihan strain mikroba yang tepat."}]},{"type":"heading","children":[{"type":"text","text":"4. Produksi dan Uji Sampel"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Sampel diproduksi dalam skala kecil untuk diuji efektivitasnya. Uji coba dilakukan di lapangan untuk memastikan hasil sesuai ekspektasi."}]},{"type":"heading","children":[{"type":"text","text":"5. Penyempurnaan dan Produksi Massal"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Berdasarkan hasil uji coba, formulasi disempurnakan jika perlu. Setelah final, produksi massal bisa dimulai."}]},{"type":"heading","children":[{"type":"text","text":"Contoh Formulasi Custom Sukses"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia telah membantu banyak klien menciptakan formulasi custom untuk berbagai kebutuhan: pupuk khusus sawit, pupuk padi organik, insektisida hayati untuk hortikultura, dan banyak lagi."}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi 0851 8328 4691 untuk konsultasi formulasi pupuk custom Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 11: Maklon Pupuk Hayati Trichoderma
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Hayati Trichoderma: Manfaat & Cara Produksi',
  'maklon-pupuk-hayati-trichoderma',
  'Panduan maklon pupuk hayati Trichoderma harzianum: manfaat untuk tanaman, proses produksi, dan aplikasi di berbagai komoditas.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Mengenal Trichoderma harzianum"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Trichoderma harzianum dijuluki Raja Jamur karena kemampuannya yang luar biasa sebagai fungisida hayati dan agen dekomposer. Mikroba ini menjadi komponen utama dalam pupuk hayati premium."}]},{"type":"heading","children":[{"type":"text","text":"Manfaat Trichoderma untuk Tanaman"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Fungisida Hayati - Mengendalikan penyakit jamur seperti Fusarium, Rhizoctonia, Pythium"}]},{"type":"list-item","children":[{"type":"text","text":"Dekomposer - Mengurai bahan organik menjadi nutrisi tersedia"}]},{"type":"list-item","children":[{"type":"text","text":"PGPR - Memproduksi fitohormon (auxin, giberelin, sitokinin) untuk pertumbuhan"}]},{"type":"list-item","children":[{"type":"text","text":"Menggemburkan Tanah - Memperbaiki struktur tanah secara alami"}]},{"type":"list-item","children":[{"type":"text","text":"Mengurangi Fungisida Kimia - Bisa menggantikan 50-100% fungisida kimia"}]}]},{"type":"heading","children":[{"type":"text","text":"Proses Produksi Trichoderma"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memproduksi Trichoderma harzianum dengan teknologi modern:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Isolasi strain unggul dari alam"}]},{"type":"list-item","children":[{"type":"text","text":"Kultur murni di laboratorium steril"}]},{"type":"list-item","children":[{"type":"text","text":"Fermentasi dalam bioreaktor terkontrol"}]},{"type":"list-item","children":[{"type":"text","text":"Quality control ketat untuk viabilitas"}]},{"type":"list-item","children":[{"type":"text","text":"Formulasi stabil untuk daya simpan lama"}]}]},{"type":"heading","children":[{"type":"text","text":"Aplikasi Trichoderma di Berbagai Komoditas"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Padi - Mengatasi penyakit blast dan busuk pelepah"}]},{"type":"list-item","children":[{"type":"text","text":"Cabai - Mencegah layu Fusarium dan antraknosa"}]},{"type":"list-item","children":[{"type":"text","text":"Tomat - Mengendalikan layu bakteri dan jamur"}]},{"type":"list-item","children":[{"type":"text","text":"Sawit - Menekan Ganoderma boninense"}]},{"type":"list-item","children":[{"type":"text","text":"Melon - Mencegah layu Fusarium oxysporum"}]}]},{"type":"heading","children":[{"type":"text","text":"Maklon Pupuk Trichoderma di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Produk unggulan kami FLORA ONE dan SIMBIOS mengandung Trichoderma harzianum berkualitas tinggi. Kami siap memproduksi pupuk Trichoderma dengan merek Anda. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 12: Maklon POC
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Organik Cair (POC): Panduan Produksi Lengkap',
  'maklon-pupuk-organik-cair-poc',
  'Panduan lengkap maklon POC (Pupuk Organik Cair): bahan baku, proses fermentasi, standar kualitas, dan tips sukses produksi.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Apa Itu Pupuk Organik Cair (POC)?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk Organik Cair (POC) adalah pupuk yang berasal dari bahan-bahan organik yang difermentasi dan berbentuk cair. POC mudah diserap tanaman karena nutrisinya sudah dalam bentuk terlarut."}]},{"type":"heading","children":[{"type":"text","text":"Bahan Baku Pembuatan POC"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Limbah pertanian - Jerami, sekam, dedaunan"}]},{"type":"list-item","children":[{"type":"text","text":"Kotoran ternak - Sapi, kambing, ayam"}]},{"type":"list-item","children":[{"type":"text","text":"Limbah industri - Molase, ampas tahu"}]},{"type":"list-item","children":[{"type":"text","text":"Bahan tambahan - EM4, mikroba dekomposer"}]}]},{"type":"heading","children":[{"type":"text","text":"Proses Produksi POC"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Persiapan Bahan - Pencacahan dan pencampuran bahan organik"}]},{"type":"list-item","children":[{"type":"text","text":"Fermentasi Aerob/Anaerob - Proses penguraian dengan bantuan mikroba"}]},{"type":"list-item","children":[{"type":"text","text":"Ekstraksi - Pemisahan cairan dari padatan"}]},{"type":"list-item","children":[{"type":"text","text":"Fortifikasi - Penambahan unsur hara jika diperlukan"}]},{"type":"list-item","children":[{"type":"text","text":"Quality Control - Pengujian parameter kualitas"}]},{"type":"list-item","children":[{"type":"text","text":"Pengemasan - Pengisian ke kemasan dengan merek klien"}]}]},{"type":"heading","children":[{"type":"text","text":"Standar Kualitas POC (SNI)"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Berdasarkan SNI 6729:2016, POC harus memenuhi:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"C-Organik minimal 4%"}]},{"type":"list-item","children":[{"type":"text","text":"pH 4-9"}]},{"type":"list-item","children":[{"type":"text","text":"Kadar air maksimal 98%"}]},{"type":"list-item","children":[{"type":"text","text":"Bebas dari logam berat berbahaya"}]}]},{"type":"heading","children":[{"type":"text","text":"Maklon POC di PT Centra Biotech Indonesia"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Kami memproduksi POC berkualitas dengan sertifikat organik SNI. Produk referensi kami RAJABIO (Nomor Kementan: 02.02.2023.883) telah terbukti efektif di berbagai tanaman. Hubungi 0851 8328 4691 untuk maklon POC dengan merek Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 13: Maklon Insektisida Hayati
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Insektisida Hayati Beauveria bassiana untuk Pertanian',
  'maklon-insektisida-hayati-beauveria',
  'Panduan maklon insektisida hayati Beauveria bassiana: efektivitas pengendalian hama, proses produksi, dan keunggulan vs kimia.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Mengenal Beauveria bassiana"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Beauveria bassiana adalah jamur entomopatogen yang secara alami menginfeksi dan membunuh berbagai serangga hama. Jamur ini menjadi komponen utama insektisida hayati ramah lingkungan."}]},{"type":"heading","children":[{"type":"text","text":"Cara Kerja Beauveria bassiana"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Spora menempel pada kutikula serangga"}]},{"type":"list-item","children":[{"type":"text","text":"Spora berkecambah dan menembus tubuh serangga"}]},{"type":"list-item","children":[{"type":"text","text":"Jamur tumbuh di dalam tubuh serangga"}]},{"type":"list-item","children":[{"type":"text","text":"Serangga mati dalam 24-72 jam"}]},{"type":"list-item","children":[{"type":"text","text":"Spora baru keluar untuk menginfeksi serangga lain"}]}]},{"type":"heading","children":[{"type":"text","text":"Hama Target Beauveria bassiana"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Wereng coklat dan wereng hijau (padi)"}]},{"type":"list-item","children":[{"type":"text","text":"Penggerek batang (padi, jagung, tebu)"}]},{"type":"list-item","children":[{"type":"text","text":"Kutu daun (hortikultura)"}]},{"type":"list-item","children":[{"type":"text","text":"Ulat grayak (berbagai tanaman)"}]},{"type":"list-item","children":[{"type":"text","text":"Kumbang dan kepik"}]}]},{"type":"heading","children":[{"type":"text","text":"Keunggulan vs Insektisida Kimia"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Tidak meninggalkan residu berbahaya"}]},{"type":"list-item","children":[{"type":"text","text":"Tidak menyebabkan resistensi hama"}]},{"type":"list-item","children":[{"type":"text","text":"Aman bagi musuh alami dan penyerbuk"}]},{"type":"list-item","children":[{"type":"text","text":"Ramah lingkungan dan berkelanjutan"}]},{"type":"list-item","children":[{"type":"text","text":"Dapat dikombinasikan dengan pengendalian lain"}]}]},{"type":"heading","children":[{"type":"text","text":"BIOKILLER - Insektisida Hayati Terdaftar Kementan"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"BIOKILLER dari PT Centra Biotech Indonesia adalah satu-satunya insektisida hayati cair yang terdaftar di Kementerian Pertanian RI (No. RI. 01010120227621). Mengandung Beauveria bassiana dan Metarhizium anisopliae dengan efektivitas tinggi."}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi 0851 8328 4691 untuk maklon insektisida hayati dengan merek Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 14: Maklon Fungisida Hayati
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Fungisida Hayati: Solusi Ramah Lingkungan Anti Jamur',
  'maklon-fungisida-hayati',
  'Panduan maklon fungisida hayati dengan Trichoderma dan Pseudomonas: manfaat, cara kerja, dan aplikasi di berbagai tanaman.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Apa Itu Fungisida Hayati?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Fungisida hayati adalah pestisida berbahan aktif mikroorganisme yang dapat mengendalikan penyakit jamur pada tanaman. Berbeda dengan fungisida kimia, fungisida hayati aman bagi lingkungan dan tidak meninggalkan residu berbahaya."}]},{"type":"heading","children":[{"type":"text","text":"Mikroba Aktif Fungisida Hayati"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Trichoderma harzianum"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Jamur antagonis paling efektif untuk mengendalikan berbagai patogen tanah seperti Fusarium, Rhizoctonia, Pythium, dan Sclerotium."}]},{"type":"heading","children":[{"type":"text","text":"2. Pseudomonas fluorescens"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Bakteri yang menghasilkan antibiotik alami dan senyawa antijamur. Efektif terhadap berbagai penyakit bakteri dan jamur."}]},{"type":"heading","children":[{"type":"text","text":"Penyakit yang Bisa Dikendalikan"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Layu Fusarium - Pada cabai, tomat, melon, pisang"}]},{"type":"list-item","children":[{"type":"text","text":"Busuk Akar - Pada berbagai tanaman"}]},{"type":"list-item","children":[{"type":"text","text":"Penyakit Blast - Pada padi"}]},{"type":"list-item","children":[{"type":"text","text":"Busuk Pangkal Batang - Pada sawit (Ganoderma)"}]},{"type":"list-item","children":[{"type":"text","text":"Antraknosa - Pada cabai dan mangga"}]},{"type":"list-item","children":[{"type":"text","text":"Akar Gada - Pada tanaman kubis-kubisan"}]}]},{"type":"heading","children":[{"type":"text","text":"Keunggulan Fungisida Hayati"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Tidak menyebabkan resistensi patogen"}]},{"type":"list-item","children":[{"type":"text","text":"Memperbaiki kesehatan tanah"}]},{"type":"list-item","children":[{"type":"text","text":"Aman untuk pertanian organik"}]},{"type":"list-item","children":[{"type":"text","text":"Dapat mengurangi fungisida kimia 50-100%"}]}]},{"type":"heading","children":[{"type":"text","text":"Maklon Fungisida Hayati di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"FLORA ONE dan SIMBIOS dari PT Centra Biotech Indonesia mengandung Trichoderma harzianum dan Pseudomonas fluorescens berkualitas tinggi. Kami siap memproduksi fungisida hayati dengan merek Anda. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 15: Maklon Pupuk NPK Organik
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk NPK Organik: Kombinasi Terbaik untuk Tanaman',
  'maklon-pupuk-npk-organik',
  'Panduan maklon pupuk NPK organik: formulasi ideal, sumber bahan organik, dan keunggulan dibanding NPK sintetis.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Mengenal Pupuk NPK Organik"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk NPK Organik adalah pupuk yang mengandung unsur hara makro utama (Nitrogen, Phosphor, Kalium) dari sumber bahan organik. Berbeda dengan NPK sintetis, NPK organik lebih ramah lingkungan dan memperbaiki struktur tanah."}]},{"type":"heading","children":[{"type":"text","text":"Sumber Bahan Organik untuk NPK"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Nitrogen (N) - Dari kotoran ayam, darah hewan, bungkil kedelai"}]},{"type":"list-item","children":[{"type":"text","text":"Phosphor (P) - Dari tulang hewan, guano, rock phosphate"}]},{"type":"list-item","children":[{"type":"text","text":"Kalium (K) - Dari abu kayu, rumput laut, kotoran ternak"}]}]},{"type":"heading","children":[{"type":"text","text":"Keunggulan NPK Organik vs Sintetis"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Pelepasan Nutrisi Lambat - Tidak mudah tercuci hujan"}]},{"type":"list-item","children":[{"type":"text","text":"Memperbaiki Struktur Tanah - Meningkatkan porositas dan daya simpan air"}]},{"type":"list-item","children":[{"type":"text","text":"Mendukung Mikroba Tanah - Sumber makanan bagi mikroba bermanfaat"}]},{"type":"list-item","children":[{"type":"text","text":"Tidak Merusak Lingkungan - Tidak mencemari air tanah"}]},{"type":"list-item","children":[{"type":"text","text":"Hasil Panen Lebih Sehat - Tanpa residu kimia berbahaya"}]}]},{"type":"heading","children":[{"type":"text","text":"Formulasi NPK Organik yang Efektif"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Formulasi NPK Organik yang baik harus mempertimbangkan:"}]},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Rasio NPK sesuai kebutuhan tanaman target"}]},{"type":"list-item","children":[{"type":"text","text":"C/N ratio yang seimbang"}]},{"type":"list-item","children":[{"type":"text","text":"pH yang optimal (6-7)"}]},{"type":"list-item","children":[{"type":"text","text":"Kandungan bahan organik tinggi"}]}]},{"type":"heading","children":[{"type":"text","text":"Maklon NPK Organik di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia dapat memproduksi pupuk NPK Organik dengan formulasi custom sesuai kebutuhan Anda. Kami memiliki sertifikasi organik SNI yang menjamin kualitas produk. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 16: Maklon Pupuk untuk Sawit
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Khusus Kelapa Sawit: Formulasi & Kebutuhan',
  'maklon-pupuk-untuk-sawit',
  'Panduan maklon pupuk organik dan hayati khusus kelapa sawit: kebutuhan hara, formulasi optimal, dan dosis aplikasi.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Kebutuhan Nutrisi Kelapa Sawit"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Kelapa sawit memiliki kebutuhan nutrisi spesifik yang berbeda dari tanaman lain. Pemahaman akan kebutuhan ini penting untuk membuat formulasi pupuk yang tepat."}]},{"type":"heading","children":[{"type":"text","text":"Unsur Hara Penting untuk Sawit"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Nitrogen (N) - Untuk pertumbuhan vegetatif dan pembentukan daun"}]},{"type":"list-item","children":[{"type":"text","text":"Phosphor (P) - Untuk pembentukan akar dan buah"}]},{"type":"list-item","children":[{"type":"text","text":"Kalium (K) - Sangat penting untuk produksi TBS"}]},{"type":"list-item","children":[{"type":"text","text":"Magnesium (Mg) - Untuk pembentukan klorofil"}]},{"type":"list-item","children":[{"type":"text","text":"Boron (B) - Untuk pembungaan dan pembuahan"}]}]},{"type":"heading","children":[{"type":"text","text":"Masalah Utama di Perkebunan Sawit"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Penyakit Ganoderma - Busuk pangkal batang yang mematikan"}]},{"type":"list-item","children":[{"type":"text","text":"Tanah Miskin Hara - Akibat penggunaan pupuk kimia berlebihan"}]},{"type":"list-item","children":[{"type":"text","text":"Resistensi Hama - Karena penggunaan pestisida terus-menerus"}]}]},{"type":"heading","children":[{"type":"text","text":"Solusi: Pupuk Hayati untuk Sawit"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati dengan Trichoderma harzianum terbukti efektif menekan Ganoderma boninense. Kombinasi dengan pupuk organik dapat memperbaiki kesehatan tanah dan meningkatkan produktivitas."}]},{"type":"heading","children":[{"type":"text","text":"Formulasi Pupuk Sawit dari Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia telah menyuplai pupuk hayati ke berbagai perkebunan sawit di Indonesia. Produk kami FLORA ONE dan SIMBIOS telah terbukti:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Menekan penyakit Ganoderma"}]},{"type":"list-item","children":[{"type":"text","text":"Meningkatkan produksi TBS 10-30%"}]},{"type":"list-item","children":[{"type":"text","text":"Memperbaiki kesehatan tanah"}]},{"type":"list-item","children":[{"type":"text","text":"Mengurangi biaya pupuk kimia"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi 0851 8328 4691 untuk maklon pupuk khusus sawit dengan merek Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

EOFMAKLON2

# Execute the SQL
echo "Inserting articles 9-16..."
sqlite3 .tmp/data.db < /tmp/insert_maklon_articles_part2.sql

echo "Articles 9-16 inserted successfully!"
