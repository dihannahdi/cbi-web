#!/bin/bash
# ============================================
# MAKLON PUPUK SEO ARTICLES - PART 4
# Articles 25-30
# ============================================

cd /opt/cbi-strapi

cat > /tmp/insert_maklon_articles_part4.sql << 'EOFMAKLON4'

-- ============================================
-- ARTICLE 25: Distribusi Pupuk Maklon
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Strategi Distribusi Pupuk Maklon: Dari Pabrik ke Petani',
  'distribusi-pupuk-maklon',
  'Panduan strategi distribusi pupuk maklon: channel distribusi, pricing, logistik, dan cara membangun jaringan penjualan.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Membangun Jaringan Distribusi Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Setelah produk siap, tantangan berikutnya adalah distribusi. Strategi distribusi yang tepat menentukan seberapa cepat produk Anda sampai ke petani dan menghasilkan revenue."}]},{"type":"heading","children":[{"type":"text","text":"Channel Distribusi Pupuk"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Toko Pertanian"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Channel tradisional yang masih dominan di Indonesia. Petani terbiasa membeli pupuk di toko pertanian terdekat."}]},{"type":"heading","children":[{"type":"text","text":"2. Distributor Regional"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Untuk menjangkau area luas, kerjasama dengan distributor regional sangat efektif. Mereka sudah punya jaringan toko pertanian."}]},{"type":"heading","children":[{"type":"text","text":"3. Kelompok Tani"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Direct selling ke kelompok tani dengan demo plot. Efektif untuk membangun kepercayaan dan testimoni."}]},{"type":"heading","children":[{"type":"text","text":"4. Online (E-Commerce)"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Marketplace pertanian seperti TaniHub, atau e-katalog pemerintah untuk institusi."}]},{"type":"heading","children":[{"type":"text","text":"Strategi Pricing"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Harga produsen + margin 30-50%"}]},{"type":"list-item","children":[{"type":"text","text":"Discount volume untuk distributor"}]},{"type":"list-item","children":[{"type":"text","text":"Program insentif untuk sales"}]},{"type":"list-item","children":[{"type":"text","text":"Harga khusus untuk demo plot"}]}]},{"type":"heading","children":[{"type":"text","text":"Tips Logistik Pupuk"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Simpan di tempat sejuk untuk pupuk hayati"}]},{"type":"list-item","children":[{"type":"text","text":"Perhatikan masa kadaluarsa"}]},{"type":"list-item","children":[{"type":"text","text":"Kemasan harus tahan benturan"}]},{"type":"list-item","children":[{"type":"text","text":"Asuransi pengiriman untuk jarak jauh"}]}]},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia mendukung klien maklon dengan konsultasi strategi distribusi. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 26: Tren Pupuk Organik Indonesia
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Tren Pupuk Organik Indonesia 2026: Peluang & Tantangan',
  'tren-pupuk-organik-indonesia',
  'Analisis tren industri pupuk organik Indonesia: pertumbuhan pasar, kebijakan pemerintah, peluang bisnis, dan proyeksi 5 tahun.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Pertumbuhan Pasar Pupuk Organik"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pasar pupuk organik Indonesia tumbuh rata-rata 15-20% per tahun. Faktor pendorong utama adalah kesadaran petani akan pertanian berkelanjutan dan program pemerintah untuk mengurangi ketergantungan pupuk kimia."}]},{"type":"heading","children":[{"type":"text","text":"Kebijakan Pemerintah yang Mendukung"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Subsidi pupuk organik melalui program Kartu Tani"}]},{"type":"list-item","children":[{"type":"text","text":"Program 1000 Desa Organik"}]},{"type":"list-item","children":[{"type":"text","text":"Pengurangan subsidi pupuk kimia bertahap"}]},{"type":"list-item","children":[{"type":"text","text":"Insentif untuk produsen pupuk organik"}]}]},{"type":"heading","children":[{"type":"text","text":"Tren Teknologi Pupuk 2026"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Nano-fertilizer untuk efisiensi tinggi"}]},{"type":"list-item","children":[{"type":"text","text":"Biofertilizer dengan mikroba terseleksi"}]},{"type":"list-item","children":[{"type":"text","text":"Smart fertilizer dengan slow-release coating"}]},{"type":"list-item","children":[{"type":"text","text":"Integrasi IoT untuk precision farming"}]}]},{"type":"heading","children":[{"type":"text","text":"Peluang Bisnis Maklon Pupuk"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Pertumbuhan pasar yang masih tinggi"}]},{"type":"list-item","children":[{"type":"text","text":"Kompetisi belum terlalu ketat"}]},{"type":"list-item","children":[{"type":"text","text":"Dukungan kebijakan pemerintah"}]},{"type":"list-item","children":[{"type":"text","text":"Margin keuntungan yang menarik"}]}]},{"type":"heading","children":[{"type":"text","text":"Tantangan yang Perlu Diantisipasi"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Edukasi petani tentang manfaat pupuk organik"}]},{"type":"list-item","children":[{"type":"text","text":"Persaingan dengan pupuk kimia subsidi"}]},{"type":"list-item","children":[{"type":"text","text":"Standarisasi kualitas produk"}]},{"type":"list-item","children":[{"type":"text","text":"Distribusi ke daerah terpencil"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Manfaatkan tren positif ini dengan memulai bisnis pupuk organik bersama PT Centra Biotech Indonesia. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 27: Kisah Sukses Bisnis Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Kisah Sukses Bisnis Pupuk Organik dengan Sistem Maklon',
  'sukses-bisnis-pupuk-organik',
  'Inspirasi kisah sukses pengusaha pupuk organik yang memulai dengan sistem maklon: strategi, tantangan, dan tips sukses.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Inspirasi dari Pengusaha Pupuk Sukses"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Banyak pengusaha sukses memulai bisnis pupuk dengan sistem maklon sebelum akhirnya membangun pabrik sendiri. Berikut pelajaran yang bisa diambil dari perjalanan mereka."}]},{"type":"heading","children":[{"type":"text","text":"Kisah Pak Ahmad - Dari Kios ke Distributor Besar"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pak Ahmad memulai dengan kios pertanian kecil di Jawa Timur. Melihat kebutuhan petani akan pupuk organik berkualitas, dia memutuskan maklon pupuk dengan mereknya sendiri. Dalam 3 tahun, dia sudah memiliki jaringan 50 toko dan omzet miliaran per bulan."}]},{"type":"heading","children":[{"type":"text","text":"Kunci Sukses:"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Fokus pada kualitas produk"}]},{"type":"list-item","children":[{"type":"text","text":"Demo plot di setiap kelompok tani"}]},{"type":"list-item","children":[{"type":"text","text":"After-sales service yang baik"}]},{"type":"list-item","children":[{"type":"text","text":"Konsisten membangun brand"}]}]},{"type":"heading","children":[{"type":"text","text":"Kisah Bu Siti - Mantan Dosen Jadi Pengusaha"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Bu Siti adalah mantan dosen pertanian yang melihat gap antara riset dan aplikasi di lapangan. Dia memutuskan maklon pupuk hayati dengan formulasi unik hasil risetnya. Produknya kini diminati oleh perkebunan besar di Sumatera."}]},{"type":"heading","children":[{"type":"text","text":"Kunci Sukses:"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Formulasi custom berbasis riset"}]},{"type":"list-item","children":[{"type":"text","text":"Target pasar spesifik (perkebunan)"}]},{"type":"list-item","children":[{"type":"text","text":"Kredibilitas sebagai ahli"}]},{"type":"list-item","children":[{"type":"text","text":"Kerjasama dengan institusi riset"}]}]},{"type":"heading","children":[{"type":"text","text":"Mulai Kisah Sukses Anda"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia telah membantu ratusan pengusaha memulai bisnis pupuk dengan sistem maklon. Anda bisa menjadi kisah sukses berikutnya! Hubungi 0851 8328 4691 untuk konsultasi gratis."}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 28: Kesalahan Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  '10 Kesalahan Fatal dalam Maklon Pupuk & Cara Menghindarinya',
  'kesalahan-maklon-pupuk',
  'Pelajari 10 kesalahan umum dalam bisnis maklon pupuk: pemilihan mitra, kontrak, kualitas, dan strategi mengatasinya.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Belajar dari Kesalahan Orang Lain"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Bisnis maklon pupuk memiliki tantangan tersendiri. Berikut 10 kesalahan fatal yang sering dilakukan dan cara menghindarinya:"}]},{"type":"heading","children":[{"type":"text","text":"1. Memilih Pabrik Maklon Tanpa Survey"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Selalu kunjungi pabrik untuk melihat fasilitas dan kapasitas sebenarnya."}]},{"type":"heading","children":[{"type":"text","text":"2. Tidak Cek Sertifikasi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Pastikan pabrik memiliki Nomor Kementan, SNI Organik, dan izin lengkap."}]},{"type":"heading","children":[{"type":"text","text":"3. MOQ Terlalu Besar di Awal"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Mulai dengan MOQ kecil untuk testing pasar sebelum order besar."}]},{"type":"heading","children":[{"type":"text","text":"4. Kontrak Tidak Jelas"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Buat kontrak tertulis yang detail mencakup spesifikasi, harga, timeline, dan garansi."}]},{"type":"heading","children":[{"type":"text","text":"5. Tidak Ada QC dari Pihak Klien"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Minta sampel setiap batch dan cek kualitas secara independen."}]},{"type":"heading","children":[{"type":"text","text":"6. Branding Asal-asalan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Investasi di branding profesional untuk diferensiasi di pasar."}]},{"type":"heading","children":[{"type":"text","text":"7. Tidak Ada Demo Plot"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Buat demo plot di beberapa lokasi untuk bukti efektivitas produk."}]},{"type":"heading","children":[{"type":"text","text":"8. Target Pasar Tidak Jelas"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Definisikan target pasar spesifik sebelum produksi."}]},{"type":"heading","children":[{"type":"text","text":"9. Tidak Ada After-Sales Service"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Sediakan panduan aplikasi dan layanan konsultasi untuk pelanggan."}]},{"type":"heading","children":[{"type":"text","text":"10. Berhenti Terlalu Cepat"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Solusi: Bisnis pupuk butuh waktu untuk membangun kepercayaan. Konsisten minimal 2 tahun."}]},{"type":"paragraph","children":[{"type":"text","text":"Hindari kesalahan ini dengan bermitra dengan PT Centra Biotech Indonesia yang berpengalaman. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 29: Maklon Pupuk untuk Ekspor
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk untuk Ekspor: Peluang Pasar Internasional',
  'maklon-pupuk-untuk-ekspor',
  'Panduan maklon pupuk untuk ekspor: standar internasional, sertifikasi global, negara tujuan, dan prosedur ekspor pupuk.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Peluang Ekspor Pupuk Organik Indonesia"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Indonesia memiliki potensi besar sebagai eksportir pupuk organik. Permintaan global untuk pupuk ramah lingkungan terus meningkat, terutama dari negara-negara maju yang fokus pada pertanian berkelanjutan."}]},{"type":"heading","children":[{"type":"text","text":"Negara Tujuan Ekspor Potensial"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"ASEAN - Malaysia, Thailand, Vietnam, Filipina"}]},{"type":"list-item","children":[{"type":"text","text":"Timur Tengah - UAE, Saudi Arabia"}]},{"type":"list-item","children":[{"type":"text","text":"Afrika - Nigeria, Kenya, Tanzania"}]},{"type":"list-item","children":[{"type":"text","text":"Asia Selatan - India, Bangladesh, Sri Lanka"}]}]},{"type":"heading","children":[{"type":"text","text":"Standar dan Sertifikasi Internasional"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"USDA Organic - Untuk pasar Amerika"}]},{"type":"list-item","children":[{"type":"text","text":"EU Organic - Untuk pasar Eropa"}]},{"type":"list-item","children":[{"type":"text","text":"JAS - Untuk pasar Jepang"}]},{"type":"list-item","children":[{"type":"text","text":"IFOAM - Standar organik internasional"}]}]},{"type":"heading","children":[{"type":"text","text":"Prosedur Ekspor Pupuk"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Registrasi eksportir di Kemendag"}]},{"type":"list-item","children":[{"type":"text","text":"Sertifikasi produk sesuai standar negara tujuan"}]},{"type":"list-item","children":[{"type":"text","text":"Uji laboratorium internasional"}]},{"type":"list-item","children":[{"type":"text","text":"Pengurusan dokumen ekspor"}]},{"type":"list-item","children":[{"type":"text","text":"Pengiriman dengan kontainer"}]}]},{"type":"heading","children":[{"type":"text","text":"Tantangan Ekspor"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Biaya sertifikasi internasional tinggi"}]},{"type":"list-item","children":[{"type":"text","text":"Regulasi yang berbeda tiap negara"}]},{"type":"list-item","children":[{"type":"text","text":"Kompetisi dengan produsen lokal"}]},{"type":"list-item","children":[{"type":"text","text":"Stabilitas kualitas untuk volume besar"}]}]},{"type":"heading","children":[{"type":"text","text":"Dukungan Ekspor dari Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memiliki pengalaman ekspor ke beberapa negara ASEAN. Kami siap mendukung klien maklon yang ingin go international. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 30: Masa Depan Industri Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Masa Depan Industri Maklon Pupuk di Era Pertanian Modern',
  'masa-depan-industri-maklon-pupuk',
  'Analisis masa depan industri maklon pupuk: teknologi baru, sustainability, digitalisasi, dan peluang bisnis 2026-2030.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Transformasi Industri Pupuk Indonesia"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Industri pupuk Indonesia sedang mengalami transformasi besar menuju pertanian berkelanjutan. Maklon pupuk organik dan hayati akan memainkan peran penting dalam transisi ini."}]},{"type":"heading","children":[{"type":"text","text":"Tren Teknologi 2026-2030"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Bioteknologi Lanjutan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pengembangan strain mikroba super dengan kemampuan spesifik melalui teknik bioteknologi modern."}]},{"type":"heading","children":[{"type":"text","text":"2. Nano-Fertilizer"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pupuk dengan partikel nano yang lebih efisien diserap tanaman, mengurangi dosis dan limbah."}]},{"type":"heading","children":[{"type":"text","text":"3. Smart Agriculture Integration"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Integrasi pupuk dengan sensor IoT untuk aplikasi presisi berdasarkan kebutuhan real-time tanaman."}]},{"type":"heading","children":[{"type":"text","text":"4. Carbon Credit Opportunity"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pupuk organik akan mendapat nilai tambah dari program carbon credit untuk sequestration."}]},{"type":"heading","children":[{"type":"text","text":"Peluang Bisnis Maklon ke Depan"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Permintaan terus meningkat seiring transisi ke pertanian organik"}]},{"type":"list-item","children":[{"type":"text","text":"Margin lebih baik dibanding pupuk kimia"}]},{"type":"list-item","children":[{"type":"text","text":"Dukungan kebijakan pemerintah semakin kuat"}]},{"type":"list-item","children":[{"type":"text","text":"Pasar ekspor terbuka lebar"}]},{"type":"list-item","children":[{"type":"text","text":"Differensiasi produk dengan inovasi"}]}]},{"type":"heading","children":[{"type":"text","text":"Bergabung dengan Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia terus berinovasi mengikuti perkembangan teknologi. Kami siap menjadi partner jangka panjang Anda dalam bisnis pupuk organik dan hayati. Mulai perjalanan Anda sekarang!"}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi gratis dan penawaran terbaik!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

EOFMAKLON4

# Execute the SQL
echo "Inserting articles 25-30..."
sqlite3 .tmp/data.db < /tmp/insert_maklon_articles_part4.sql

echo "Articles 25-30 inserted successfully!"
echo ""
echo "=========================================="
echo "All 30 Maklon Pupuk Articles Inserted!"
echo "=========================================="
echo ""
echo "Restarting Strapi..."
pm2 restart cbi-strapi-dev

echo ""
echo "Done! Check the articles at:"
echo "https://cbi-backend.my.id/api/blogs?filters[type][\$eq]=maklon"
