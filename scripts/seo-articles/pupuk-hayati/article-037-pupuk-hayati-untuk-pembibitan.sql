-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Pembibitan
-- Keyword: Pupuk Hayati, Pembibitan, Nursery, Bibit Tanaman
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Pembibitan: Panduan Lengkap Produksi Bibit Berkualitas',
  'pupuk-hayati-untuk-pembibitan-bibit-berkualitas',
  'Panduan lengkap penggunaan pupuk hayati di pembibitan. Cara menghasilkan bibit tanaman berkualitas dengan vigor tinggi dan sistem perakaran kuat.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Pentingnya Pupuk Hayati di Pembibitan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pembibitan adalah tahap paling kritis dalam budidaya tanaman. Kualitas bibit menentukan 70% keberhasilan di lapangan. Bibit yang lemah akan terus bermasalah sepanjang siklus hidupnya. Pupuk hayati di tahap pembibitan memberikan keunggulan yang akan terbawa hingga panen."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Inokulasi mikroba di awal pertumbuhan memungkinkan simbiosis yang kuat terbentuk, memberikan bibit sistem perakaran superior dan ketahanan alami terhadap stress."}]},

    {"type":"heading","children":[{"type":"text","text":"Keuntungan Pupuk Hayati di Pembibitan"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Vigor bibit lebih tinggi - pertumbuhan lebih cepat dan seragam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sistem perakaran kuat - transplant shock minimal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ketahanan penyakit sejak dini - damping off berkurang drastis"}]},
      {"type":"list-item","children":[{"type":"text","text":"Survival rate tinggi - bibit siap hadapi stress lapangan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efisiensi pupuk - mikroba sudah aktif saat pindah tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Hemat biaya penggantian bibit mati"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pembibitan dan Aplikasi"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Pembibitan Sayuran"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Tomat, cabai, terong, brokoli:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Semai di tray dengan media + pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis: 50 gram per kg media semai"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma untuk cegah damping off"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR untuk pertumbuhan akar"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"2. Pembibitan Buah-buahan"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Jeruk, mangga, durian, alpukat:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza kritis untuk tanaman buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis: 25-50 gram per polybag bibit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi dekat zona perakaran"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek mikoriza terbawa hingga produktif"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"3. Pembibitan Perkebunan"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sawit, karet, kakao, kopi:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pre-nursery: media + mikoriza"}]},
      {"type":"list-item","children":[{"type":"text","text":"Main nursery: tambahan PGPR dan Trichoderma"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis: 50-100 gram per polybag besar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bibit lebih siap hadapi stress transplanting"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"4. Pembibitan Kehutanan"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sengon, jati, mahoni, gmelina:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza sangat penting untuk pohon hutan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rhizobium untuk legum (sengon, akasia)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Survival rate meningkat 30-50%"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pupuk Hayati Rekomendasi untuk Pembibitan"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Mikoriza VAM"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Wajib untuk tanaman tahunan/perkebunan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Membentuk simbiosis permanen dengan akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan serapan P 3-5x"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek perlindungan kekeringan seumur hidup"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"2. Trichoderma spp."}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mencegah damping off (Pythium, Rhizoctonia)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perlindungan area leher batang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menginduksi ketahanan sistemik"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"3. PGPR (Azospirillum, Pseudomonas)"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Memproduksi hormon pertumbuhan (IAA)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Merangsang proliferasi akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bibit lebih kekar dan vigor"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"4. Rhizobium (untuk legum)"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Kedelai, kacang tanah, sengon"}]},
      {"type":"list-item","children":[{"type":"text","text":"Inokulasi benih sebelum semai"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bintil akar terbentuk sejak dini"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Teknik Aplikasi di Pembibitan"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Metode 1: Pencampuran Media"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Siapkan media tanam steril (tanah + kompos + sekam)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Campurkan pupuk hayati 5-10% volume"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aduk merata sampai homogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Diamkan 3-5 hari sebelum semai"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jaga kelembaban selama inkubasi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Metode 2: Perlakuan Benih"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Basahi benih dengan air bersih"}]},
      {"type":"list-item","children":[{"type":"text","text":"Taburkan pupuk hayati, aduk rata"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biarkan menempel di permukaan benih"}]},
      {"type":"list-item","children":[{"type":"text","text":"Segera semai setelah perlakuan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Metode 3: Aplikasi Lubang Tanam"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Untuk pembibitan polybag besar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Masukkan pupuk hayati ke lubang tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Letakkan bibit di atasnya"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tutup dan siram"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Resep Media Semai Berkualitas"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Tanah halus steril: 40%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kompos matang: 30%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sekam bakar: 20%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk hayati: 10%"}]},
      {"type":"list-item","children":[{"type":"text","text":"pH optimal: 6.0-6.5"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pencegahan Damping Off"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Damping off adalah musuh utama pembibitan. Trichoderma dalam pupuk hayati efektif mencegah:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pythium spp. - penyebab rebah kecambah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rhizoctonia solani - busuk pangkal batang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Fusarium spp. - layu bibit"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Dengan pupuk hayati, kerugian damping off bisa dikurangi dari 20-30% menjadi kurang dari 5%."}]},

    {"type":"heading","children":[{"type":"text","text":"Timeline Aplikasi Pembibitan"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Hari ke-0: Perlakuan benih + media + pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu ke-2: Aplikasi PGPR cair (optional)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu ke-4: Pindah ke polybag lebih besar + pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sebelum transplant: Aplikasi mikoriza tambahan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Indikator Bibit Berkualitas"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Batang kekar, tidak etiolasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Daun hijau tua, tidak pucat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Akar banyak dan putih (sehat)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pertumbuhan seragam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bebas hama penyakit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ratio tajuk-akar seimbang"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pupuk Hayati di Pembibitan"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Kapan waktu terbaik inokulasi mikoriza?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Semakin dini semakin baik. Idealnya saat semai atau saat pindah tanam pertama. Mikoriza membutuhkan waktu untuk membentuk simbiosis, sehingga inokulasi dini memberikan keuntungan maksimal."}]},

    {"type":"heading","children":[{"type":"text","text":"Bisakah sterilisasi media bunuh pupuk hayati?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Ya, sterilisasi (panas/uap) akan mematikan semua mikroba. Aplikasikan pupuk hayati SETELAH media dingin dari sterilisasi. Beri jeda 3-5 hari untuk mikroba berkembang sebelum semai."}]},

    {"type":"heading","children":[{"type":"text","text":"Apakah perlu pupuk hayati lagi setelah transplant?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Untuk mikoriza, tidak perlu karena sudah membentuk simbiosis permanen. Untuk PGPR dan Trichoderma, aplikasi tambahan di lapangan akan memperkuat perlindungan."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Investasi pupuk hayati di pembibitan memberikan return terbaik. Bibit berkualitas dengan sistem perakaran kuat dan ketahanan alami akan sukses di lapangan. Keuntungan dari inokulasi dini terbawa sepanjang siklus hidup tanaman."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati khusus pembibitan. Hubungi 0851 8328 4691 atau email centrabioindi@gmail.com untuk konsultasi kebutuhan nursery Anda."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
