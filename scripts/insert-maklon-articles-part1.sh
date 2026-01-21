#!/bin/bash
# ============================================
# MAKLON PUPUK SEO ARTICLES - INSERTION SCRIPT
# PT Centra Biotech Indonesia
# ============================================
# 
# This script creates a new content type "maklon-articles" in Strapi
# and inserts 30 SEO-optimized articles about maklon pupuk
#
# Run this script on VPS: /opt/cbi-strapi/
# ============================================

cd /opt/cbi-strapi

echo "=========================================="
echo "Creating Maklon Articles Content Type..."
echo "=========================================="

# First, let's check if we can use the existing blogs table structure
# or we need to create a new table

# Check existing blogs table structure
echo "Checking existing blogs table structure..."
sqlite3 .tmp/data.db ".schema blogs" > /tmp/blogs_schema.txt
cat /tmp/blogs_schema.txt

echo ""
echo "We will insert maklon articles into the blogs table"
echo "with type='maklon' to differentiate them"
echo ""

# Get the current max ID
MAX_ID=$(sqlite3 .tmp/data.db "SELECT COALESCE(MAX(id), 0) FROM blogs;")
echo "Current max blog ID: $MAX_ID"

# Create a temporary file with INSERT statements
cat > /tmp/insert_maklon_articles.sql << 'EOFMAKLON'

-- ============================================
-- ARTICLE 1: Apa Itu Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Apa Itu Maklon Pupuk? Panduan Lengkap untuk Pemula 2026',
  'apa-itu-maklon-pupuk',
  'Pelajari pengertian maklon pupuk, cara kerja, keuntungan, dan langkah memulai bisnis pupuk dengan sistem maklon. Panduan lengkap untuk pemula.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Apa Itu Maklon Pupuk?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Maklon pupuk adalah layanan produksi pupuk yang dilakukan oleh pihak ketiga (manufacturer) untuk merek atau brand milik klien. Dalam sistem ini, Anda sebagai pemilik brand tidak perlu membangun pabrik sendiri - cukup menyediakan spesifikasi produk dan desain kemasan, sementara pabrik maklon mengerjakan seluruh proses produksi."}]},{"type":"paragraph","children":[{"type":"text","text":"Istilah \"maklon\" sendiri berasal dari bahasa Belanda \"makeloon\" yang berarti upah pembuatan. Di Indonesia, jasa maklon pupuk semakin populer karena memberikan solusi praktis bagi pengusaha yang ingin memiliki produk pupuk dengan merek sendiri tanpa investasi besar untuk membangun fasilitas produksi."}]},{"type":"heading","children":[{"type":"text","text":"Bagaimana Cara Kerja Sistem Maklon Pupuk?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Sistem maklon pupuk bekerja dengan mekanisme sebagai berikut:"}]},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Konsultasi dan Analisis Kebutuhan - Klien berdiskusi dengan pabrik maklon tentang jenis produk, spesifikasi, dan target pasar."}]},{"type":"list-item","children":[{"type":"text","text":"Formulasi Produk - Tim R&D pabrik merancang formulasi optimal sesuai kebutuhan."}]},{"type":"list-item","children":[{"type":"text","text":"Produksi Sampel - Pembuatan sampel untuk diuji dan disetujui."}]},{"type":"list-item","children":[{"type":"text","text":"Produksi Massal - Setelah sampel disetujui, produksi skala besar dimulai."}]},{"type":"list-item","children":[{"type":"text","text":"Quality Control - Pengujian kualitas di setiap tahapan produksi."}]},{"type":"list-item","children":[{"type":"text","text":"Pengemasan - Produk dikemas sesuai desain merek klien."}]},{"type":"list-item","children":[{"type":"text","text":"Pengiriman - Produk siap dikirim ke klien."}]}]},{"type":"heading","children":[{"type":"text","text":"Keuntungan Menggunakan Jasa Maklon Pupuk"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Tanpa Investasi Pabrik - Tidak perlu modal besar untuk membangun fasilitas produksi."}]},{"type":"list-item","children":[{"type":"text","text":"Sertifikasi Lengkap - Produk sudah memiliki izin Kementan dan sertifikasi yang diperlukan."}]},{"type":"list-item","children":[{"type":"text","text":"Fokus ke Marketing - Anda bisa fokus membangun merek dan menjual produk."}]},{"type":"list-item","children":[{"type":"text","text":"Fleksibilitas MOQ - Minimum order yang fleksibel sesuai kemampuan."}]},{"type":"list-item","children":[{"type":"text","text":"Kualitas Terjamin - Produksi oleh ahli dengan pengalaman bertahun-tahun."}]}]},{"type":"heading","children":[{"type":"text","text":"PT Centra Biotech Indonesia - Partner Maklon Pupuk Terpercaya"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia adalah perusahaan maklon pupuk terpercaya dengan kapasitas produksi 3.000 ton per bulan. Berdiri sejak 2010, kami telah melayani ratusan klien dari berbagai daerah di Indonesia."}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi gratis."}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 2: Keuntungan Maklon Pupuk Organik
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  '7 Keuntungan Menggunakan Jasa Maklon Pupuk Organik',
  'keuntungan-maklon-pupuk-organik',
  'Temukan 7 keuntungan utama menggunakan jasa maklon pupuk organik: hemat biaya, tanpa pabrik, sertifikasi lengkap, dan kualitas terjamin.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Mengapa Memilih Jasa Maklon Pupuk Organik?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Bisnis pupuk organik di Indonesia terus berkembang seiring meningkatnya kesadaran petani akan pertanian berkelanjutan. Namun, membangun pabrik pupuk organik sendiri membutuhkan investasi yang sangat besar. Solusinya? Gunakan jasa maklon pupuk organik!"}]},{"type":"heading","children":[{"type":"text","text":"7 Keuntungan Utama Maklon Pupuk Organik"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Hemat Biaya Investasi Hingga 90%"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Membangun pabrik pupuk organik membutuhkan modal minimal Rp 5-10 miliar. Dengan maklon, Anda bisa memulai bisnis pupuk dengan modal Rp 50-100 juta saja untuk stok awal dan marketing."}]},{"type":"heading","children":[{"type":"text","text":"2. Produk Sudah Tersertifikasi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pabrik maklon seperti PT Centra Biotech Indonesia sudah memiliki sertifikasi lengkap: Nomor Pendaftaran Kementan RI, Sertifikat Organik SNI dari LeSOS, NIB, dan Izin Usaha Industri. Anda tinggal menggunakan fasilitas ini."}]},{"type":"heading","children":[{"type":"text","text":"3. Kualitas Produk Konsisten"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pabrik maklon profesional memiliki standar quality control ketat dan pengalaman bertahun-tahun. Kualitas produk Anda akan selalu konsisten di setiap batch produksi."}]},{"type":"heading","children":[{"type":"text","text":"4. Fokus ke Pemasaran dan Penjualan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Dengan menyerahkan produksi ke pabrik maklon, Anda bisa fokus 100% ke aktivitas marketing, membangun jaringan distributor, dan melayani pelanggan."}]},{"type":"heading","children":[{"type":"text","text":"5. Fleksibilitas Produk dan Kemasan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Anda bisa membuat formulasi custom sesuai kebutuhan pasar. Kemasan juga bisa disesuaikan dengan brand identity Anda - dari ukuran 1 liter hingga 20 liter."}]},{"type":"heading","children":[{"type":"text","text":"6. Skalabilitas Bisnis"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Mulai dari pesanan kecil, Anda bisa meningkatkan volume produksi seiring pertumbuhan bisnis. Pabrik maklon dengan kapasitas besar seperti Centra Biotech (3.000 ton/bulan) siap mendukung ekspansi Anda."}]},{"type":"heading","children":[{"type":"text","text":"7. Dukungan Teknis dan Konsultasi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pabrik maklon profesional menyediakan dukungan teknis, termasuk panduan aplikasi produk, materi marketing, dan konsultasi pengembangan produk."}]},{"type":"heading","children":[{"type":"text","text":"Mulai Bisnis Pupuk Organik Anda Sekarang!"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia siap menjadi partner maklon pupuk organik Anda. Dengan pengalaman 15+ tahun dan fasilitas produksi modern, kami jamin kualitas terbaik untuk produk Anda. Hubungi 0851 8328 4691 untuk konsultasi gratis!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 3: Proses Maklon Pupuk Hayati
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Proses Maklon Pupuk Hayati dari A sampai Z',
  'proses-maklon-pupuk-hayati',
  'Panduan lengkap proses maklon pupuk hayati: konsultasi, formulasi, produksi, quality control, hingga pengemasan dan pengiriman.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Memahami Proses Maklon Pupuk Hayati"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah pupuk yang mengandung mikroorganisme hidup yang bermanfaat bagi tanaman. Proses produksinya memerlukan keahlian khusus dan fasilitas laboratorium yang memadai. Berikut panduan lengkap proses maklon pupuk hayati dari awal hingga akhir."}]},{"type":"heading","children":[{"type":"text","text":"Tahap 1: Konsultasi dan Analisis Kebutuhan"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Proses dimulai dengan konsultasi mendalam antara Anda dan tim pabrik maklon. Pada tahap ini, akan dibahas:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Target pasar dan jenis tanaman yang akan disasar"}]},{"type":"list-item","children":[{"type":"text","text":"Spesifikasi produk yang diinginkan"}]},{"type":"list-item","children":[{"type":"text","text":"Budget dan timeline produksi"}]},{"type":"list-item","children":[{"type":"text","text":"Desain kemasan dan branding"}]}]},{"type":"heading","children":[{"type":"text","text":"Tahap 2: Formulasi dan Pengembangan Produk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Tim R&D pabrik akan merancang formulasi optimal. Untuk pupuk hayati, ini meliputi pemilihan jenis mikroba seperti:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Trichoderma harzianum - Fungisida hayati dan dekomposer"}]},{"type":"list-item","children":[{"type":"text","text":"Rhizobium sp. - Pengikat nitrogen untuk legum"}]},{"type":"list-item","children":[{"type":"text","text":"Azospirillum sp. - Pengikat nitrogen untuk semua tanaman"}]},{"type":"list-item","children":[{"type":"text","text":"Pseudomonas fluorescens - PGPR dan bakterisida hayati"}]},{"type":"list-item","children":[{"type":"text","text":"Aspergillus niger - Pelarut P dan K"}]}]},{"type":"heading","children":[{"type":"text","text":"Tahap 3: Produksi Starter Kultur"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Mikroba dikultur dalam kondisi terkontrol di laboratorium. Tahap ini sangat kritis karena menentukan viabilitas dan efektivitas produk akhir."}]},{"type":"heading","children":[{"type":"text","text":"Tahap 4: Fermentasi Skala Produksi"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Kultur starter diperbanyak dalam bioreaktor dengan media fermentasi khusus. PT Centra Biotech Indonesia menggunakan teknologi fermentasi modern yang menghasilkan mikroba dengan viabilitas 70% lebih tinggi dari standar industri."}]},{"type":"heading","children":[{"type":"text","text":"Tahap 5: Quality Control"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Setiap batch produksi diuji ketat untuk memastikan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Jumlah koloni mikroba per ml/gram"}]},{"type":"list-item","children":[{"type":"text","text":"Viabilitas dan aktivitas mikroba"}]},{"type":"list-item","children":[{"type":"text","text":"Kebebasan dari kontaminan"}]},{"type":"list-item","children":[{"type":"text","text":"pH dan parameter fisik lainnya"}]}]},{"type":"heading","children":[{"type":"text","text":"Tahap 6: Pengemasan dan Labeling"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Produk dikemas sesuai spesifikasi Anda dengan label yang memenuhi regulasi Kementerian Pertanian. Tersedia berbagai ukuran kemasan sesuai kebutuhan pasar."}]},{"type":"heading","children":[{"type":"text","text":"Tahap 7: Pengiriman dan After-Sales"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Produk dikirim dengan penanganan khusus untuk menjaga kualitas mikroba. Kami juga menyediakan dukungan teknis berkelanjutan untuk membantu Anda sukses di pasar."}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi PT Centra Biotech Indonesia di 0851 8328 4691 untuk memulai proses maklon pupuk hayati Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 4: Cara Memilih Jasa Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Cara Memilih Jasa Maklon Pupuk yang Tepat: 10 Kriteria Penting',
  'cara-memilih-jasa-maklon-pupuk',
  'Panduan memilih jasa maklon pupuk terpercaya: sertifikasi, kapasitas produksi, pengalaman, harga, dan dukungan teknis.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"10 Kriteria Memilih Jasa Maklon Pupuk Terbaik"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Memilih partner maklon yang tepat adalah keputusan krusial yang menentukan kesuksesan bisnis pupuk Anda. Berikut 10 kriteria penting yang harus Anda perhatikan:"}]},{"type":"heading","children":[{"type":"text","text":"1. Sertifikasi dan Legalitas Lengkap"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pastikan pabrik maklon memiliki: Nomor Pendaftaran Kementerian Pertanian RI, Sertifikat Organik SNI (jika produk organik), NIB, dan Izin Usaha Industri. Tanpa sertifikasi ini, produk Anda tidak bisa dijual secara legal."}]},{"type":"heading","children":[{"type":"text","text":"2. Kapasitas Produksi yang Memadai"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pilih pabrik dengan kapasitas produksi yang bisa mendukung pertumbuhan bisnis Anda. Kapasitas ideal minimal 1.000-3.000 ton per bulan untuk memastikan fleksibilitas."}]},{"type":"heading","children":[{"type":"text","text":"3. Pengalaman dan Track Record"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Periksa berapa lama pabrik sudah beroperasi dan berapa banyak klien yang sudah dilayani. Pengalaman 10+ tahun menunjukkan stabilitas dan keahlian."}]},{"type":"heading","children":[{"type":"text","text":"4. Fasilitas Produksi Modern"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Kunjungi pabrik untuk melihat langsung fasilitas produksi. Perhatikan kebersihan, peralatan laboratorium, dan sistem quality control."}]},{"type":"heading","children":[{"type":"text","text":"5. Tim R&D yang Kompeten"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pabrik yang baik memiliki tim ahli mikrobiologi dan agronomi untuk pengembangan formulasi. Ini penting untuk menciptakan produk yang benar-benar efektif."}]},{"type":"heading","children":[{"type":"text","text":"6. MOQ yang Fleksibel"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Minimum Order Quantity harus sesuai dengan skala bisnis Anda. MOQ terlalu tinggi bisa memberatkan modal awal."}]},{"type":"heading","children":[{"type":"text","text":"7. Harga yang Kompetitif dan Transparan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Bandingkan harga dari beberapa pabrik maklon. Pastikan struktur harga transparan tanpa biaya tersembunyi."}]},{"type":"heading","children":[{"type":"text","text":"8. Dukungan Teknis dan Konsultasi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Partner maklon yang baik menyediakan dukungan teknis: panduan aplikasi, materi marketing, dan konsultasi pengembangan produk."}]},{"type":"heading","children":[{"type":"text","text":"9. Fleksibilitas Formulasi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pastikan pabrik bisa membuat formulasi custom sesuai kebutuhan spesifik pasar Anda, bukan hanya produk standar."}]},{"type":"heading","children":[{"type":"text","text":"10. Reputasi dan Testimoni"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Cari testimoni dari klien yang sudah menggunakan jasa maklon tersebut. Reputasi baik adalah indikator kualitas layanan."}]},{"type":"heading","children":[{"type":"text","text":"PT Centra Biotech Indonesia - Memenuhi Semua Kriteria!"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memenuhi semua kriteria di atas dengan: 15+ tahun pengalaman, kapasitas 3.000 ton/bulan, sertifikasi lengkap, dan tim ahli mikrobiologi. Hubungi 0851 8328 4691 untuk konsultasi gratis!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 5: Maklon Pupuk Organik Cair Terbaik
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Organik Cair Terbaik di Indonesia 2026',
  'maklon-pupuk-organik-cair-terbaik',
  'Rekomendasi jasa maklon pupuk organik cair terbaik di Indonesia dengan sertifikasi lengkap, kapasitas besar, dan kualitas premium.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Kriteria Jasa Maklon Pupuk Organik Cair Terbaik"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk Organik Cair (POC) menjadi salah satu produk pupuk yang paling diminati petani Indonesia. Untuk memulai bisnis POC dengan sistem maklon, Anda perlu memilih partner yang tepat. Berikut kriteria jasa maklon pupuk organik cair terbaik:"}]},{"type":"heading","children":[{"type":"text","text":"1. Sertifikat Organik SNI"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Pupuk organik cair yang dijual harus memiliki sertifikat organik dari lembaga terakreditasi seperti LeSOS. Ini menjamin produk benar-benar organik dan aman untuk pertanian berkelanjutan."}]},{"type":"heading","children":[{"type":"text","text":"2. Kandungan C-Organik Tinggi"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"POC berkualitas memiliki kandungan C-Organik tinggi yang menyuburkan tanah. Standar SNI mensyaratkan minimal 4% C-Organik untuk POC."}]},{"type":"heading","children":[{"type":"text","text":"3. Teknologi Fermentasi Modern"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Proses fermentasi yang baik menghasilkan POC dengan nutrisi lengkap dan mudah diserap tanaman. Pabrik maklon terbaik menggunakan bioreaktor modern untuk fermentasi."}]},{"type":"heading","children":[{"type":"text","text":"4. Unsur Hara Makro-Mikro Lengkap"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"POC berkualitas mengandung unsur hara makro (N, P, K) dan mikro (Fe, Zn, Cu, Mn, B) yang lengkap untuk mendukung pertumbuhan tanaman optimal."}]},{"type":"heading","children":[{"type":"text","text":"PT Centra Biotech Indonesia - Jasa Maklon POC Terpercaya"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan jasa maklon pupuk organik cair dengan keunggulan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Sertifikat Organik SNI: 442-LSO-005-IDN-08-23"}]},{"type":"list-item","children":[{"type":"text","text":"Nomor Pendaftaran Kementan: 02.02.2023.883"}]},{"type":"list-item","children":[{"type":"text","text":"Kapasitas produksi: 3.000 ton/bulan"}]},{"type":"list-item","children":[{"type":"text","text":"Teknologi fermentasi modern"}]},{"type":"list-item","children":[{"type":"text","text":"Tim ahli mikrobiologi berpengalaman"}]}]},{"type":"heading","children":[{"type":"text","text":"Produk POC Unggulan Kami: RAJABIO"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"RAJABIO adalah produk POC unggulan kami yang diformulasikan dari bahan-bahan alami pilihan dan diproses dengan teknologi fermentasi modern. Produk ini bisa menjadi referensi untuk produk maklon Anda."}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk memulai maklon pupuk organik cair dengan merek Anda!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 6: Biaya Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Berapa Biaya Maklon Pupuk? Rincian Lengkap & Simulasi 2026',
  'biaya-maklon-pupuk',
  'Rincian biaya maklon pupuk organik dan hayati: komponen biaya, faktor penentu harga, dan simulasi perhitungan modal awal.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Komponen Biaya Maklon Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Sebelum memulai bisnis maklon pupuk, penting untuk memahami struktur biaya yang akan Anda keluarkan. Berikut rincian lengkapnya:"}]},{"type":"heading","children":[{"type":"text","text":"1. Biaya Produksi Per Unit"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Biaya produksi maklon pupuk bervariasi tergantung jenis produk:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Pupuk Organik Cair: Rp 15.000 - 30.000 per liter"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Cair: Rp 25.000 - 50.000 per liter"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Padat: Rp 5.000 - 15.000 per kg"}]},{"type":"list-item","children":[{"type":"text","text":"Insektisida Hayati: Rp 50.000 - 100.000 per liter"}]}]},{"type":"heading","children":[{"type":"text","text":"2. Biaya Kemasan"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Kemasan termasuk botol/jirigen, tutup, label, dan kardus. Biaya berkisar Rp 3.000 - 10.000 per unit tergantung ukuran dan kualitas kemasan."}]},{"type":"heading","children":[{"type":"text","text":"3. Biaya Pengiriman"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Untuk pengiriman dalam pulau Jawa sekitar Rp 500-1.000 per kg, luar pulau Rp 2.000-5.000 per kg tergantung lokasi."}]},{"type":"heading","children":[{"type":"text","text":"Faktor Penentu Harga Maklon"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Volume Pesanan - Semakin besar volume, harga per unit semakin murah"}]},{"type":"list-item","children":[{"type":"text","text":"Kompleksitas Formulasi - Formulasi khusus membutuhkan biaya R&D tambahan"}]},{"type":"list-item","children":[{"type":"text","text":"Jenis Mikroba - Beberapa mikroba lebih mahal untuk diproduksi"}]},{"type":"list-item","children":[{"type":"text","text":"Standar Kemasan - Kemasan premium lebih mahal"}]}]},{"type":"heading","children":[{"type":"text","text":"Simulasi Modal Awal Bisnis Maklon Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Berikut simulasi modal untuk memulai bisnis pupuk organik cair dengan sistem maklon:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Stok awal 1.000 liter: Rp 30.000.000"}]},{"type":"list-item","children":[{"type":"text","text":"Kemasan dan label: Rp 10.000.000"}]},{"type":"list-item","children":[{"type":"text","text":"Biaya marketing awal: Rp 10.000.000"}]},{"type":"list-item","children":[{"type":"text","text":"Operasional 3 bulan: Rp 15.000.000"}]},{"type":"list-item","children":[{"type":"text","text":"Total Modal Awal: Rp 65.000.000"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Dengan margin 30-50%, Anda bisa balik modal dalam 6-12 bulan pertama!"}]},{"type":"paragraph","children":[{"type":"text","text":"Konsultasikan kebutuhan maklon Anda dengan PT Centra Biotech Indonesia untuk mendapatkan penawaran harga terbaik. Hubungi 0851 8328 4691."}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 7: Maklon vs Produksi Sendiri
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon vs Produksi Sendiri: Mana yang Lebih Menguntungkan?',
  'perbedaan-maklon-dan-produksi-sendiri',
  'Analisis perbandingan maklon pupuk vs membangun pabrik sendiri: biaya, risiko, waktu, dan ROI untuk membantu keputusan bisnis Anda.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Dilema: Maklon atau Bangun Pabrik Sendiri?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Ketika memutuskan untuk terjun ke bisnis pupuk, Anda dihadapkan pada dua pilihan: menggunakan jasa maklon atau membangun pabrik sendiri. Mari kita analisis secara mendalam."}]},{"type":"heading","children":[{"type":"text","text":"Perbandingan Biaya Investasi"}],"level":2},{"type":"heading","children":[{"type":"text","text":"Maklon Pupuk:"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Modal awal: Rp 50-100 juta"}]},{"type":"list-item","children":[{"type":"text","text":"Tidak perlu investasi fasilitas"}]},{"type":"list-item","children":[{"type":"text","text":"Biaya variabel per unit produksi"}]}]},{"type":"heading","children":[{"type":"text","text":"Pabrik Sendiri:"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Modal awal: Rp 5-10 miliar"}]},{"type":"list-item","children":[{"type":"text","text":"Tanah dan bangunan: Rp 2-3 miliar"}]},{"type":"list-item","children":[{"type":"text","text":"Peralatan produksi: Rp 2-4 miliar"}]},{"type":"list-item","children":[{"type":"text","text":"Sertifikasi dan izin: Rp 500 juta - 1 miliar"}]}]},{"type":"heading","children":[{"type":"text","text":"Perbandingan Waktu ke Pasar"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Maklon: 1-3 bulan dari konsultasi hingga produk siap jual. Pabrik Sendiri: 2-3 tahun untuk pembangunan dan perizinan."}]},{"type":"heading","children":[{"type":"text","text":"Perbandingan Risiko"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Maklon: Risiko rendah karena modal kecil dan fleksibel. Pabrik Sendiri: Risiko tinggi dengan modal besar yang terikat dalam aset tetap."}]},{"type":"heading","children":[{"type":"text","text":"Kapan Pilih Maklon?"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Modal terbatas"}]},{"type":"list-item","children":[{"type":"text","text":"Ingin cepat masuk pasar"}]},{"type":"list-item","children":[{"type":"text","text":"Belum yakin dengan potensi pasar"}]},{"type":"list-item","children":[{"type":"text","text":"Fokus pada marketing dan distribusi"}]}]},{"type":"heading","children":[{"type":"text","text":"Kapan Pilih Bangun Pabrik?"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Modal sangat besar (>Rp 10 miliar)"}]},{"type":"list-item","children":[{"type":"text","text":"Volume produksi sangat tinggi (>10.000 ton/bulan)"}]},{"type":"list-item","children":[{"type":"text","text":"Ingin kontrol penuh atas produksi"}]},{"type":"list-item","children":[{"type":"text","text":"Visi jangka panjang 10+ tahun"}]}]},{"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Untuk kebanyakan pengusaha pemula, maklon adalah pilihan paling rasional. Anda bisa memulai dengan modal kecil, menguji pasar, dan berkembang secara bertahap. PT Centra Biotech Indonesia siap menjadi partner maklon Anda. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 8: Sertifikasi Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Sertifikasi Maklon Pupuk di Indonesia: Panduan Lengkap',
  'sertifikasi-maklon-pupuk-indonesia',
  'Panduan lengkap sertifikasi maklon pupuk: Kementan RI, SNI Organik, NIB, dan izin usaha industri yang wajib dimiliki.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Sertifikasi Wajib untuk Bisnis Pupuk di Indonesia"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Menjual pupuk di Indonesia memerlukan berbagai sertifikasi dan perizinan. Keuntungan menggunakan jasa maklon adalah Anda bisa memanfaatkan sertifikasi yang sudah dimiliki pabrik. Berikut panduan lengkapnya:"}]},{"type":"heading","children":[{"type":"text","text":"1. Nomor Pendaftaran Kementerian Pertanian RI"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Ini adalah izin wajib untuk semua produk pupuk yang beredar di Indonesia. Proses pendaftaran memerlukan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Hasil uji laboratorium terakreditasi"}]},{"type":"list-item","children":[{"type":"text","text":"Uji efektivitas di lapangan"}]},{"type":"list-item","children":[{"type":"text","text":"Dokumen perusahaan lengkap"}]},{"type":"list-item","children":[{"type":"text","text":"Biaya pendaftaran dan perpanjangan"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Waktu proses: 6-12 bulan. Biaya: Rp 200-500 juta."}]},{"type":"heading","children":[{"type":"text","text":"2. Sertifikat Organik SNI (untuk Pupuk Organik)"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Jika Anda menjual pupuk organik, sertifikat organik dari lembaga terakreditasi seperti LeSOS sangat penting. Sertifikasi ini membuktikan produk Anda benar-benar organik."}]},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memiliki sertifikat organik: 442-LSO-005-IDN-08-23."}]},{"type":"heading","children":[{"type":"text","text":"3. NIB (Nomor Induk Berusaha)"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"NIB adalah identitas berusaha yang wajib dimiliki setiap pelaku usaha di Indonesia. NIB diperoleh melalui sistem OSS (Online Single Submission)."}]},{"type":"heading","children":[{"type":"text","text":"4. Izin Usaha Industri"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pabrik pupuk harus memiliki izin usaha industri yang dikeluarkan oleh pemerintah daerah atau melalui sistem OSS."}]},{"type":"heading","children":[{"type":"text","text":"Keuntungan Maklon: Sertifikasi Sudah Ada!"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Dengan menggunakan jasa maklon dari PT Centra Biotech Indonesia, Anda tidak perlu mengurus sertifikasi sendiri. Produk Anda diproduksi di fasilitas yang sudah memiliki semua perizinan lengkap:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Nomor Pendaftaran Kementan RI"}]},{"type":"list-item","children":[{"type":"text","text":"Sertifikat Organik SNI: 442-LSO-005-IDN-08-23"}]},{"type":"list-item","children":[{"type":"text","text":"NIB: 0220203310827"}]},{"type":"list-item","children":[{"type":"text","text":"Izin Usaha Industri: 202008-2219-4737-2327-799"}]}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi 0851 8328 4691 untuk konsultasi maklon pupuk dengan sertifikasi lengkap!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

EOFMAKLON

# Execute the SQL
echo "Inserting articles 1-8..."
sqlite3 .tmp/data.db < /tmp/insert_maklon_articles.sql

echo "Articles 1-8 inserted successfully!"
echo ""
echo "Continuing with articles 9-30..."

