#!/bin/bash
# ============================================
# MAKLON PUPUK SEO ARTICLES - PART 3
# Articles 17-24
# ============================================

cd /opt/cbi-strapi

cat > /tmp/insert_maklon_articles_part3.sql << 'EOFMAKLON3'

-- ============================================
-- ARTICLE 17: Maklon Pupuk untuk Padi
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Organik untuk Padi: Tingkatkan Produktivitas',
  'maklon-pupuk-untuk-padi',
  'Panduan maklon pupuk organik khusus padi sawah dan padi gogo: formulasi, waktu aplikasi, dan peningkatan hasil panen.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Pentingnya Pupuk Organik untuk Padi"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Padi adalah komoditas pangan utama Indonesia. Penggunaan pupuk kimia berlebihan selama puluhan tahun telah merusak struktur tanah sawah. Pupuk organik dan hayati menjadi solusi untuk mengembalikan kesuburan tanah."}]},{"type":"heading","children":[{"type":"text","text":"Masalah Utama Budidaya Padi"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Tanah sawah semakin keras dan padat"}]},{"type":"list-item","children":[{"type":"text","text":"Penyakit blast dan kresek sulit dikendalikan"}]},{"type":"list-item","children":[{"type":"text","text":"Serangan wereng semakin resisten"}]},{"type":"list-item","children":[{"type":"text","text":"Biaya pupuk kimia semakin tinggi"}]},{"type":"list-item","children":[{"type":"text","text":"Produktivitas stagnan atau menurun"}]}]},{"type":"heading","children":[{"type":"text","text":"Solusi dengan Pupuk Hayati"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati dengan Trichoderma harzianum dan Pseudomonas fluorescens terbukti efektif:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Mengendalikan penyakit blast dan kresek"}]},{"type":"list-item","children":[{"type":"text","text":"Menggemburkan tanah sawah"}]},{"type":"list-item","children":[{"type":"text","text":"Meningkatkan anakan produktif"}]},{"type":"list-item","children":[{"type":"text","text":"Mempercepat pengisian bulir"}]},{"type":"list-item","children":[{"type":"text","text":"Meningkatkan hasil panen 20-40%"}]}]},{"type":"heading","children":[{"type":"text","text":"Waktu Aplikasi Pupuk Hayati Padi"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Perlakuan Benih - Sebelum persemaian"}]},{"type":"list-item","children":[{"type":"text","text":"Umur 7 HST - Setelah tanam"}]},{"type":"list-item","children":[{"type":"text","text":"Umur 21 HST - Fase vegetatif"}]},{"type":"list-item","children":[{"type":"text","text":"Umur 42 HST - Menjelang bunting"}]},{"type":"list-item","children":[{"type":"text","text":"Umur 56 HST - Fase generatif"}]}]},{"type":"heading","children":[{"type":"text","text":"Maklon Pupuk Padi di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia telah menyuplai pupuk hayati ke ribuan hektar sawah di Indonesia dengan hasil memuaskan. Hubungi 0851 8328 4691 untuk maklon pupuk khusus padi!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 18: Maklon Pupuk untuk Hortikultura
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk untuk Hortikultura: Sayuran, Buah & Bunga',
  'maklon-pupuk-untuk-hortikultura',
  'Panduan maklon pupuk organik untuk tanaman hortikultura: formulasi khusus sayuran, buah-buahan, dan tanaman hias.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Kebutuhan Pupuk Tanaman Hortikultura"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Tanaman hortikultura (sayuran, buah, bunga) memiliki kebutuhan nutrisi yang lebih spesifik dibanding tanaman pangan. Pupuk organik dan hayati sangat cocok untuk hortikultura karena menghasilkan produk yang lebih sehat dan aman dikonsumsi."}]},{"type":"heading","children":[{"type":"text","text":"Formulasi untuk Sayuran Daun"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Sayuran daun seperti bayam, kangkung, sawi membutuhkan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Nitrogen tinggi untuk pertumbuhan daun"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk organik cair mudah serap"}]},{"type":"list-item","children":[{"type":"text","text":"Aplikasi rutin setiap 7-10 hari"}]}]},{"type":"heading","children":[{"type":"text","text":"Formulasi untuk Sayuran Buah"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Cabai, tomat, terong, mentimun membutuhkan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"NPK seimbang dengan K lebih tinggi saat generatif"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk hayati untuk mencegah layu Fusarium"}]},{"type":"list-item","children":[{"type":"text","text":"Unsur mikro lengkap untuk kualitas buah"}]}]},{"type":"heading","children":[{"type":"text","text":"Formulasi untuk Buah-buahan"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Melon, semangka, pepaya membutuhkan:"}]},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Kalium tinggi untuk rasa manis"}]},{"type":"list-item","children":[{"type":"text","text":"Kalsium untuk mencegah blossom end rot"}]},{"type":"list-item","children":[{"type":"text","text":"Pupuk hayati anti jamur akar"}]}]},{"type":"heading","children":[{"type":"text","text":"Maklon Pupuk Hortikultura di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia dapat membuat formulasi pupuk custom untuk berbagai jenis hortikultura. Tim R&D kami siap membantu Anda membuat produk yang tepat untuk target pasar. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 19: Maklon Pupuk Mikro Lengkap
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Mikro Lengkap: Fe, Zn, Cu, Mn, B untuk Tanaman',
  'maklon-pupuk-mikro-lengkap',
  'Panduan maklon pupuk mikro lengkap: pentingnya unsur mikro, gejala defisiensi, dan formulasi optimal untuk berbagai tanaman.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Pentingnya Unsur Hara Mikro"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Meskipun dibutuhkan dalam jumlah kecil, unsur hara mikro sangat penting untuk metabolisme tanaman. Defisiensi unsur mikro dapat menurunkan produktivitas dan kualitas hasil panen."}]},{"type":"heading","children":[{"type":"text","text":"Unsur Mikro dan Fungsinya"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Besi (Fe) - Pembentukan klorofil dan enzim"}]},{"type":"list-item","children":[{"type":"text","text":"Seng (Zn) - Sintesis hormon auksin dan protein"}]},{"type":"list-item","children":[{"type":"text","text":"Tembaga (Cu) - Aktivator enzim dan fotosintesis"}]},{"type":"list-item","children":[{"type":"text","text":"Mangan (Mn) - Fotosintesis dan metabolisme nitrogen"}]},{"type":"list-item","children":[{"type":"text","text":"Boron (B) - Pembungaan dan pembuahan"}]},{"type":"list-item","children":[{"type":"text","text":"Molibdenum (Mo) - Fiksasi nitrogen"}]}]},{"type":"heading","children":[{"type":"text","text":"Gejala Defisiensi Unsur Mikro"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Kekurangan Fe - Daun muda menguning (klorosis)"}]},{"type":"list-item","children":[{"type":"text","text":"Kekurangan Zn - Daun kecil dan roset"}]},{"type":"list-item","children":[{"type":"text","text":"Kekurangan B - Bunga rontok dan buah tidak sempurna"}]},{"type":"list-item","children":[{"type":"text","text":"Kekurangan Mn - Bintik-bintik kuning pada daun"}]}]},{"type":"heading","children":[{"type":"text","text":"Formulasi Pupuk Mikro yang Efektif"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Pupuk mikro dalam bentuk chelate (Fe-EDTA, Zn-EDTA) lebih mudah diserap tanaman. Kombinasi dengan pupuk organik cair meningkatkan efektivitas penyerapan."}]},{"type":"heading","children":[{"type":"text","text":"Maklon Pupuk Mikro di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan formulasi pupuk organik cair yang sudah dilengkapi unsur mikro lengkap. Kami juga dapat membuat formulasi khusus sesuai kebutuhan. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 20: Maklon Pupuk Granul vs Cair
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Maklon Pupuk Granul vs Cair: Mana yang Lebih Baik?',
  'maklon-pupuk-granul-vs-cair',
  'Perbandingan maklon pupuk granul dan cair: kelebihan, kekurangan, biaya produksi, dan rekomendasi sesuai target pasar.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Memilih Bentuk Sediaan Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Saat memulai bisnis maklon pupuk, salah satu keputusan penting adalah memilih bentuk sediaan: granul (padat) atau cair. Masing-masing memiliki kelebihan dan target pasar yang berbeda."}]},{"type":"heading","children":[{"type":"text","text":"Pupuk Cair - Kelebihan"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Mudah diserap tanaman (fast release)"}]},{"type":"list-item","children":[{"type":"text","text":"Aplikasi lebih merata dengan semprot"}]},{"type":"list-item","children":[{"type":"text","text":"Bisa dikombinasi dengan pestisida"}]},{"type":"list-item","children":[{"type":"text","text":"Cocok untuk hidroponik dan fertigasi"}]},{"type":"list-item","children":[{"type":"text","text":"Mikroba hayati tetap hidup dalam media cair"}]}]},{"type":"heading","children":[{"type":"text","text":"Pupuk Cair - Kekurangan"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Biaya kemasan lebih tinggi"}]},{"type":"list-item","children":[{"type":"text","text":"Biaya pengiriman lebih mahal (berat)"}]},{"type":"list-item","children":[{"type":"text","text":"Daya simpan lebih pendek"}]}]},{"type":"heading","children":[{"type":"text","text":"Pupuk Granul - Kelebihan"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Daya simpan lebih lama"}]},{"type":"list-item","children":[{"type":"text","text":"Biaya pengiriman lebih murah"}]},{"type":"list-item","children":[{"type":"text","text":"Pelepasan nutrisi lambat (slow release)"}]},{"type":"list-item","children":[{"type":"text","text":"Mudah disimpan dan ditangani"}]},{"type":"list-item","children":[{"type":"text","text":"Cocok untuk tanaman tahunan"}]}]},{"type":"heading","children":[{"type":"text","text":"Pupuk Granul - Kekurangan"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Penyerapan lebih lambat"}]},{"type":"list-item","children":[{"type":"text","text":"Tidak cocok untuk hidroponik"}]},{"type":"list-item","children":[{"type":"text","text":"Viabilitas mikroba hayati lebih rendah"}]}]},{"type":"heading","children":[{"type":"text","text":"Rekomendasi Berdasarkan Target Pasar"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Petani Hortikultura - Pilih pupuk cair"}]},{"type":"list-item","children":[{"type":"text","text":"Perkebunan - Bisa granul atau cair"}]},{"type":"list-item","children":[{"type":"text","text":"Daerah Terpencil - Granul lebih praktis"}]},{"type":"list-item","children":[{"type":"text","text":"Pasar Premium - Cair dengan kemasan menarik"}]}]},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan maklon pupuk cair dan padat. Konsultasikan kebutuhan Anda di 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 21: Teknologi Fermentasi
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Teknologi Fermentasi Pupuk Hayati Modern & Aplikasinya',
  'teknologi-fermentasi-pupuk-hayati',
  'Pelajari teknologi fermentasi pupuk hayati modern: jenis bioreaktor, parameter kontrol, dan cara menghasilkan produk berkualitas.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Fermentasi dalam Produksi Pupuk Hayati"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Fermentasi adalah proses kunci dalam produksi pupuk hayati. Teknologi fermentasi yang tepat menentukan viabilitas, populasi, dan efektivitas mikroba dalam produk akhir."}]},{"type":"heading","children":[{"type":"text","text":"Jenis-jenis Fermentasi"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Fermentasi Submerged (Terendam)"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Mikroba ditumbuhkan dalam media cair dengan aerasi. Cocok untuk produksi pupuk hayati cair dengan populasi tinggi."}]},{"type":"heading","children":[{"type":"text","text":"2. Fermentasi Solid State (Padat)"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Mikroba ditumbuhkan pada substrat padat seperti dedak atau sekam. Cocok untuk produksi pupuk hayati padat."}]},{"type":"heading","children":[{"type":"text","text":"Parameter Kontrol Fermentasi"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Suhu - Optimal 25-30°C untuk kebanyakan mikroba"}]},{"type":"list-item","children":[{"type":"text","text":"pH - Dijaga sesuai kebutuhan masing-masing mikroba"}]},{"type":"list-item","children":[{"type":"text","text":"Oksigen - Aerasi cukup untuk mikroba aerob"}]},{"type":"list-item","children":[{"type":"text","text":"Nutrisi - Media yang kaya nutrisi untuk pertumbuhan optimal"}]},{"type":"list-item","children":[{"type":"text","text":"Waktu - Durasi fermentasi disesuaikan target populasi"}]}]},{"type":"heading","children":[{"type":"text","text":"Teknologi Fermentasi di Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menggunakan teknologi fermentasi modern dengan bioreaktor terkontrol. Teknologi kami menghasilkan mikroba dengan viabilitas 70% lebih tinggi dari standar industri, sehingga produk lebih efektif di lapangan."}]},{"type":"paragraph","children":[{"type":"text","text":"Hubungi 0851 8328 4691 untuk maklon pupuk hayati dengan teknologi fermentasi terbaik!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 22: Quality Control Maklon Pupuk
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Quality Control Maklon Pupuk: Standar & Prosedur Lengkap',
  'quality-control-maklon-pupuk',
  'Panduan quality control maklon pupuk: parameter uji, standar SNI, prosedur pengujian, dan cara memastikan kualitas produk.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Pentingnya Quality Control dalam Maklon"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Quality Control (QC) adalah kunci untuk memastikan setiap batch produk maklon memiliki kualitas konsisten. QC yang baik melindungi reputasi merek Anda dan kepuasan pelanggan."}]},{"type":"heading","children":[{"type":"text","text":"Parameter Uji Pupuk Hayati"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Populasi Mikroba - Minimal 10^7 CFU/ml atau gram"}]},{"type":"list-item","children":[{"type":"text","text":"Viabilitas - Persentase mikroba hidup"}]},{"type":"list-item","children":[{"type":"text","text":"Kemurnian - Bebas dari kontaminan"}]},{"type":"list-item","children":[{"type":"text","text":"pH - Sesuai standar produk"}]},{"type":"list-item","children":[{"type":"text","text":"Aktivitas Enzimatis - Bukti mikroba aktif"}]}]},{"type":"heading","children":[{"type":"text","text":"Parameter Uji Pupuk Organik Cair"}],"level":2},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"C-Organik - Minimal 4% (SNI)"}]},{"type":"list-item","children":[{"type":"text","text":"N, P, K Total - Sesuai klaim produk"}]},{"type":"list-item","children":[{"type":"text","text":"pH - 4-9 (SNI)"}]},{"type":"list-item","children":[{"type":"text","text":"Logam Berat - Di bawah ambang batas aman"}]},{"type":"list-item","children":[{"type":"text","text":"E. coli dan Salmonella - Negatif"}]}]},{"type":"heading","children":[{"type":"text","text":"Prosedur QC di Centra Biotech"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Pengujian Bahan Baku - Sebelum produksi"}]},{"type":"list-item","children":[{"type":"text","text":"In-Process Control - Selama fermentasi"}]},{"type":"list-item","children":[{"type":"text","text":"Final Product Testing - Setiap batch"}]},{"type":"list-item","children":[{"type":"text","text":"Stability Testing - Uji daya simpan"}]},{"type":"list-item","children":[{"type":"text","text":"Certificate of Analysis - Untuk setiap batch"}]}]},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memiliki laboratorium QC modern untuk menjamin kualitas setiap produk maklon. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 23: Strategi Branding Pupuk Organik
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Strategi Branding Pupuk Organik untuk Pemula Bisnis Maklon',
  'strategi-branding-pupuk-organik',
  'Panduan strategi branding pupuk organik: positioning, nama merek, desain kemasan, dan marketing untuk produk maklon.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Pentingnya Branding dalam Bisnis Pupuk"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Dengan sistem maklon, kualitas produk dijamin oleh pabrik. Tugas Anda adalah membangun merek yang kuat untuk memenangkan pasar. Branding yang baik bisa meningkatkan harga jual dan loyalitas pelanggan."}]},{"type":"heading","children":[{"type":"text","text":"Langkah Membangun Brand Pupuk"}],"level":2},{"type":"heading","children":[{"type":"text","text":"1. Tentukan Positioning"}],"level":3},{"type":"paragraph","children":[{"type":"text","text":"Posisikan produk Anda: premium, mid-range, atau ekonomis? Untuk petani apa? Untuk tanaman apa? Positioning yang jelas memudahkan marketing."}]},{"type":"heading","children":[{"type":"text","text":"2. Pilih Nama Merek yang Tepat"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Mudah diingat dan diucapkan"}]},{"type":"list-item","children":[{"type":"text","text":"Relevan dengan produk (hijau, subur, tumbuh)"}]},{"type":"list-item","children":[{"type":"text","text":"Bisa didaftarkan sebagai merek dagang"}]},{"type":"list-item","children":[{"type":"text","text":"Tidak mirip dengan kompetitor"}]}]},{"type":"heading","children":[{"type":"text","text":"3. Desain Kemasan Menarik"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Warna hijau dominan untuk kesan alami"}]},{"type":"list-item","children":[{"type":"text","text":"Informasi produk jelas dan lengkap"}]},{"type":"list-item","children":[{"type":"text","text":"Cantumkan sertifikasi (Kementan, SNI Organik)"}]},{"type":"list-item","children":[{"type":"text","text":"QR code untuk informasi tambahan"}]}]},{"type":"heading","children":[{"type":"text","text":"4. Strategi Marketing"}],"level":3},{"type":"list","format":"unordered","children":[{"type":"list-item","children":[{"type":"text","text":"Demo plot di kelompok tani"}]},{"type":"list-item","children":[{"type":"text","text":"Testimoni petani sukses"}]},{"type":"list-item","children":[{"type":"text","text":"Social media marketing"}]},{"type":"list-item","children":[{"type":"text","text":"Kerjasama dengan toko pertanian"}]}]},{"type":"heading","children":[{"type":"text","text":"Dukungan Branding dari Centra Biotech"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan dukungan branding untuk klien maklon: konsultasi positioning, desain kemasan, dan materi marketing. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

-- ============================================
-- ARTICLE 24: Cara Daftar Pupuk Kementan
-- ============================================
INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Cara Daftar Pupuk ke Kementan RI: Syarat & Prosedur Lengkap',
  'cara-daftar-pupuk-kementan',
  'Panduan lengkap pendaftaran pupuk ke Kementerian Pertanian: persyaratan, dokumen, prosedur, biaya, dan timeline.',
  'maklon',
  '[{"type":"heading","children":[{"type":"text","text":"Mengapa Harus Daftar ke Kementan?"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Semua produk pupuk yang beredar di Indonesia wajib memiliki Nomor Pendaftaran dari Kementerian Pertanian. Tanpa nomor ini, produk tidak bisa dijual secara legal dan bisa ditarik dari peredaran."}]},{"type":"heading","children":[{"type":"text","text":"Persyaratan Pendaftaran"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Dokumen perusahaan (NIB, SIUP, TDP)"}]},{"type":"list-item","children":[{"type":"text","text":"Hasil uji laboratorium terakreditasi"}]},{"type":"list-item","children":[{"type":"text","text":"Hasil uji efektivitas lapangan (minimal 2 lokasi)"}]},{"type":"list-item","children":[{"type":"text","text":"Contoh produk dan kemasan"}]},{"type":"list-item","children":[{"type":"text","text":"Surat keterangan dari produsen (jika maklon)"}]}]},{"type":"heading","children":[{"type":"text","text":"Prosedur Pendaftaran"}],"level":2},{"type":"list","format":"ordered","children":[{"type":"list-item","children":[{"type":"text","text":"Pengajuan online melalui siinas.pertanian.go.id"}]},{"type":"list-item","children":[{"type":"text","text":"Verifikasi dokumen oleh Kementan"}]},{"type":"list-item","children":[{"type":"text","text":"Uji laboratorium (jika diperlukan)"}]},{"type":"list-item","children":[{"type":"text","text":"Evaluasi teknis oleh tim ahli"}]},{"type":"list-item","children":[{"type":"text","text":"Penerbitan Nomor Pendaftaran"}]}]},{"type":"heading","children":[{"type":"text","text":"Timeline dan Biaya"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Proses pendaftaran memerlukan waktu 6-12 bulan dengan biaya sekitar Rp 200-500 juta termasuk uji laboratorium dan uji lapangan."}]},{"type":"heading","children":[{"type":"text","text":"Keuntungan Maklon: Nomor Sudah Ada!"}],"level":2},{"type":"paragraph","children":[{"type":"text","text":"Dengan menggunakan jasa maklon dari PT Centra Biotech Indonesia, Anda tidak perlu mengurus pendaftaran sendiri. Produk diproduksi di fasilitas yang sudah memiliki Nomor Pendaftaran Kementan. Hubungi 0851 8328 4691!"}]}]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);

EOFMAKLON3

# Execute the SQL
echo "Inserting articles 17-24..."
sqlite3 .tmp/data.db < /tmp/insert_maklon_articles_part3.sql

echo "Articles 17-24 inserted successfully!"
