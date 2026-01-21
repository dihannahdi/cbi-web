-- ============================================
-- SEO ARTICLE: Pupuk Hayati Mikroorganisme Lokal (MOL)
-- Keyword: Pupuk Hayati, MOL, Mikroorganisme Lokal
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati MOL (Mikroorganisme Lokal): Panduan Lengkap Pembuatan dan Aplikasi',
  'pupuk-hayati-mol-mikroorganisme-lokal',
  'Panduan lengkap pembuatan dan penggunaan pupuk hayati MOL (Mikroorganisme Lokal). Jenis-jenis MOL, cara fermentasi, aplikasi, dan perbandingan dengan pupuk hayati komersial.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Mengenal Pupuk Hayati MOL (Mikroorganisme Lokal)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"MOL (Mikroorganisme Lokal) adalah larutan fermentasi yang mengandung berbagai mikroorganisme beneficial yang diisolasi dari bahan-bahan lokal. Konsep MOL populer di Indonesia sebagai alternatif pupuk hayati yang murah dan mudah dibuat oleh petani sendiri."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Berbeda dengan pupuk hayati komersial yang menggunakan strain terseleksi dan teridentifikasi, MOL memanfaatkan populasi mikroba alami yang ada di lingkungan sekitar. Keunggulannya adalah adaptasi dengan kondisi lokal, namun kualitas dan efektivitasnya bervariasi."}]},

    {"type":"heading","children":[{"type":"text","text":"Jenis-Jenis MOL Berdasarkan Bahan Dasar"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. MOL Bonggol Pisang"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sumber mikroorganisme pengurai dan penghasil fitohormon:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mengandung bakteri pengurai selulosa"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kaya kalium untuk pembungaan dan pembuahan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghasil hormon sitokinin alami"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cocok untuk tanaman buah dan sayuran"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"2. MOL Keong Mas"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sumber nitrogen dan protein tinggi:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Kandungan nitrogen tinggi untuk vegetatif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memanfaatkan hama menjadi pupuk"}]},
      {"type":"list-item","children":[{"type":"text","text":"Protein terurai menjadi asam amino"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cocok untuk fase pertumbuhan daun"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"3. MOL Buah-Buahan Busuk"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sumber ragi dan bakteri pengurai gula:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mengandung ragi (Saccharomyces)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bakteri asam laktat (Lactobacillus)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kaya vitamin dan mineral"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cocok untuk dekomposer dan pemacu pertumbuhan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"4. MOL Nasi Basi/Nasi Jagung"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sumber bakteri pengurai pati:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mengandung Aspergillus dan Rhizopus"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bakteri asam laktat melimpah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cocok sebagai aktivator kompos"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mudah dibuat dalam skala rumah tangga"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"5. MOL Rebung Bambu"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sumber giberelin alami:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mengandung hormon giberelin alami"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memacu pertumbuhan tinggi tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Merangsang perkecambahan biji"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cocok untuk pembibitan dan vegetatif"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Cara Membuat MOL"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Bahan Umum:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Bahan dasar (bonggol pisang, buah busuk, dll): 2-3 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Gula merah/molase: 250-500 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Air bersih (non-klorin): 5 liter"}]},
      {"type":"list-item","children":[{"type":"text","text":"Wadah fermentasi (jerigen/tong plastik)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Langkah Pembuatan:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Potong/hancurkan bahan dasar menjadi potongan kecil"}]},
      {"type":"list-item","children":[{"type":"text","text":"Larutkan gula merah dalam air hangat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Masukkan bahan dasar ke wadah fermentasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tuang larutan gula, aduk rata"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tutup rapat tapi beri lubang kecil/selang untuk gas"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aduk setiap 2-3 hari sekali"}]},
      {"type":"list-item","children":[{"type":"text","text":"Fermentasi selama 14-21 hari"}]},
      {"type":"list-item","children":[{"type":"text","text":"MOL siap saat berbau asam manis, tidak busuk"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tanda MOL Berhasil:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Aroma asam seperti tape atau fermentasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tidak berbau busuk atau menyengat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ada gelembung saat fermentasi berlangsung"}]},
      {"type":"list-item","children":[{"type":"text","text":"Warna kecoklatan (tergantung bahan)"}]},
      {"type":"list-item","children":[{"type":"text","text":"pH sekitar 4-5 (asam)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Aplikasi MOL"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Semprot daun: Encerkan 1:10 hingga 1:20 dengan air"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kocor akar: Encerkan 1:5 hingga 1:10"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aktivator kompos: Encerkan 1:5, siramkan ke bahan kompos"}]},
      {"type":"list-item","children":[{"type":"text","text":"Frekuensi: 1-2 minggu sekali"}]},
      {"type":"list-item","children":[{"type":"text","text":"Waktu: Pagi atau sore hari"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Perbandingan MOL vs Pupuk Hayati Komersial"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Keunggulan MOL:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Biaya sangat murah (hampir gratis)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bahan mudah didapat di sekitar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikroba teradaptasi kondisi lokal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Petani bisa mandiri membuat"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kelemahan MOL:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Kualitas tidak konsisten antar batch"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jenis dan jumlah mikroba tidak terukur"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bisa mengandung patogen jika proses tidak benar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tidak ada jaminan efektivitas"}]},
      {"type":"list-item","children":[{"type":"text","text":"Umur simpan pendek (1-2 bulan)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Keunggulan Pupuk Hayati Komersial:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Strain terseleksi dan teridentifikasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Populasi mikroba terukur (CFU/ml)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kualitas konsisten antar batch"}]},
      {"type":"list-item","children":[{"type":"text","text":"Teruji efektivitasnya"}]},
      {"type":"list-item","children":[{"type":"text","text":"Umur simpan lebih lama"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bersertifikat dan terdaftar"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kapan Memilih MOL vs Komersial?"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Gunakan MOL untuk:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pertanian subsisten skala kecil"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aktivator kompos rumahan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Suplemen untuk tanaman pekarangan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Petani dengan modal sangat terbatas"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Gunakan Pupuk Hayati Komersial untuk:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pertanian komersial dengan target produksi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pengendalian penyakit spesifik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kebutuhan yang memerlukan konsistensi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanaman bernilai tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ekspor dengan standar food safety"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Meningkatkan Kualitas MOL"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Gunakan bahan dasar berkualitas dan segar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pastikan wadah dan peralatan bersih"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jaga suhu fermentasi 25-35°C"}]},
      {"type":"list-item","children":[{"type":"text","text":"Hindari kontaminasi sinar matahari langsung"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aduk rutin untuk aerasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Gunakan air bersih non-klorin"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kombinasi MOL dengan Pupuk Hayati Komersial"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Strategi optimal menggabungkan keduanya:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk hayati komersial sebagai basis mikroba utama"}]},
      {"type":"list-item","children":[{"type":"text","text":"MOL sebagai suplemen nutrisi dan aktivator"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma komersial untuk penyakit + MOL bonggol untuk K"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza komersial + MOL buah untuk hormon"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Seputar MOL"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Apakah MOL bisa menggantikan pupuk hayati komersial?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Untuk kebutuhan spesifik seperti pengendalian penyakit atau peningkatan produksi signifikan, pupuk hayati komersial dengan strain terseleksi lebih efektif dan konsisten. MOL lebih cocok sebagai suplemen atau untuk pertanian subsisten."}]},

    {"type":"heading","children":[{"type":"text","text":"Berapa lama MOL bisa disimpan?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"MOL optimal digunakan dalam 1-2 bulan setelah fermentasi selesai. Simpan di tempat sejuk, gelap, dan tertutup. Jika berbau busuk atau berlendir, jangan digunakan karena mungkin sudah terkontaminasi."}]},

    {"type":"heading","children":[{"type":"text","text":"Layanan Maklon PT Centra Biotech Indonesia"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Jika Anda tertarik mengembangkan pupuk hayati dengan kualitas konsisten dan teruji, PT Centra Biotech Indonesia menawarkan layanan maklon (produksi dengan merek Anda). Keunggulan produksi di fasilitas kami:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Strain mikroba terseleksi dan teruji"}]},
      {"type":"list-item","children":[{"type":"text","text":"Fasilitas produksi tersertifikasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Quality control ketat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kapasitas produksi 3.000 ton/bulan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pendampingan registrasi Kementan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"MOL adalah alternatif pupuk hayati yang murah dan bisa dibuat petani. Namun untuk hasil optimal dan konsisten, terutama untuk pertanian komersial, pupuk hayati dengan strain terseleksi tetap menjadi pilihan utama. Kombinasi keduanya bisa menjadi strategi yang efektif dan ekonomis."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati berkualitas dan layanan maklon. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
