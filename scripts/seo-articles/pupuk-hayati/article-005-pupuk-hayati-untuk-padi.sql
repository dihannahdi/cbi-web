-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Padi
-- Keyword: Pupuk Hayati, Pupuk Hayati Padi
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Padi: Panduan Lengkap Meningkatkan Hasil Panen hingga 30%',
  'pupuk-hayati-untuk-padi',
  'Pelajari cara menggunakan pupuk hayati untuk padi. Panduan lengkap jenis mikroorganisme, dosis, waktu aplikasi, dan tips meningkatkan hasil panen padi hingga 30%.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Mengapa Pupuk Hayati Penting untuk Budidaya Padi?"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Padi adalah komoditas pangan utama Indonesia dengan luas tanam lebih dari 10 juta hektar per tahun. Produktivitas padi nasional masih berkisar 5-6 ton per hektar, jauh di bawah potensi hasil yang bisa mencapai 10-12 ton per hektar. Salah satu faktor penghambat adalah kondisi tanah sawah yang semakin menurun kesuburannya akibat penggunaan pupuk kimia terus-menerus."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati hadir sebagai solusi untuk memperbaiki kondisi tanah sekaligus meningkatkan efisiensi pemupukan. Berbagai penelitian menunjukkan aplikasi pupuk hayati pada padi dapat meningkatkan hasil panen 15-30% dengan pengurangan pupuk kimia hingga 50%."}]},

    {"type":"heading","children":[{"type":"text","text":"Masalah Umum Pertanian Padi di Indonesia"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Sebelum membahas solusi pupuk hayati, mari pahami masalah yang dihadapi petani padi Indonesia:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Kesuburan Tanah Menurun - penggunaan pupuk kimia berlebihan selama puluhan tahun menyebabkan degradasi tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efisiensi Pupuk Rendah - lebih dari 50% pupuk urea hilang karena penguapan dan pencucian"}]},
      {"type":"list-item","children":[{"type":"text","text":"Serangan Penyakit Meningkat - blast, kresek, dan busuk batang semakin sulit dikendalikan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Hama Resistensi - wereng coklat semakin resisten terhadap insektisida kimia"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biaya Produksi Tinggi - harga pupuk dan pestisida terus naik"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati yang Cocok untuk Padi"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Tidak semua pupuk hayati cocok untuk padi. Berikut jenis-jenis yang terbukti efektif berdasarkan penelitian:"}]},
    
    {"type":"heading","children":[{"type":"text","text":"1. Azospirillum brasilense"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Azospirillum adalah bakteri penambat nitrogen terbaik untuk tanaman serealia termasuk padi. Bakteri ini hidup berasosiasi dengan akar padi dan mampu menambat 20-40 kg N/ha/musim. Selain itu, Azospirillum menghasilkan hormon auksin yang merangsang pertumbuhan akar."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Hasil Penelitian: Inokulasi Azospirillum pada padi varietas Ciherang meningkatkan hasil gabah 18% dan mengurangi kebutuhan urea 30%."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Azotobacter chroococcum"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Azotobacter adalah bakteri penambat nitrogen bebas yang hidup di rizosfer padi. Selain fiksasi nitrogen, bakteri ini menghasilkan vitamin B kompleks dan fitohormon yang merangsang pertumbuhan tanaman."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Pseudomonas fluorescens"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pseudomonas memiliki multi fungsi: melarutkan fosfat, menghasilkan siderofor untuk penyerapan besi, dan memproduksi senyawa antibiotik yang menekan patogen. Bakteri ini sangat efektif mencegah penyakit blast dan busuk batang."}]},

    {"type":"heading","children":[{"type":"text","text":"4. Trichoderma harzianum"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Trichoderma adalah jamur antagonis yang efektif mengendalikan berbagai penyakit padi seperti hawar pelepah (sheath blight), busuk batang, dan blast. Jamur ini juga berfungsi sebagai dekomposer jerami."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Hasil Penelitian: Aplikasi Trichoderma pada padi mengurangi intensitas serangan hawar pelepah hingga 65%."}]},

    {"type":"heading","children":[{"type":"text","text":"5. Mikoriza VAM (Glomus sp.)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Meskipun padi sawah tergenang air, mikoriza tetap dapat berkolonisasi pada akar dan membantu penyerapan fosfor. Mikoriza sangat bermanfaat pada padi gogo atau padi sawah dengan sistem SRI."}]},

    {"type":"heading","children":[{"type":"text","text":"6. Beauveria bassiana"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Beauveria adalah jamur entomopatogen yang efektif mengendalikan wereng coklat, wereng hijau, dan penggerek batang padi. Aplikasi Beauveria dapat mengurangi populasi wereng hingga 80%."}]},

    {"type":"heading","children":[{"type":"text","text":"Cara Aplikasi Pupuk Hayati pada Padi"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Efektivitas pupuk hayati sangat bergantung pada cara dan waktu aplikasi yang tepat. Berikut panduan lengkapnya:"}]},

    {"type":"heading","children":[{"type":"text","text":"Aplikasi pada Persemaian"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Seed Treatment - Rendam benih dalam larutan pupuk hayati (2-5 ml/liter) selama 6-12 jam sebelum semai"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penyiraman Persemaian - Siram bedeng persemaian dengan larutan pupuk hayati (5 ml/liter) setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Root Dipping - Celup akar bibit dalam larutan pupuk hayati (10 ml/liter) selama 15-30 menit sebelum tanam"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Aplikasi saat Pengolahan Tanah"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Dekomposisi Jerami - Semprot jerami dengan Trichoderma (5 ml/liter) sebelum pengolahan tanah untuk mempercepat dekomposisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pencampuran dengan Pupuk Organik - Campur pupuk hayati dengan pupuk kandang atau kompos sebelum disebarkan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Aplikasi Fase Vegetatif"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"7-10 HST - Aplikasi pertama setelah padi tumbuh, fokus pada penambat nitrogen (Azospirillum)"}]},
      {"type":"list-item","children":[{"type":"text","text":"21-28 HST - Aplikasi kedua bersamaan dengan pemupukan susulan pertama"}]},
      {"type":"list-item","children":[{"type":"text","text":"35-42 HST - Aplikasi ketiga untuk mendorong anakan produktif"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Aplikasi Fase Generatif"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Primordia Bunga - Aplikasi pelarut fosfat dan kalium untuk pembentukan malai optimal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pengisian Bulir - Aplikasi terakhir untuk memaksimalkan bobot gabah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Dosis Pupuk Hayati untuk Padi"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Dosis aplikasi bervariasi tergantung jenis dan konsentrasi produk. Berikut panduan umum untuk produk pupuk hayati dari PT Centra Biotech Indonesia:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Seed Treatment: 2-5 ml per liter air, rendam benih 1 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Root Dipping: 10 ml per liter air"}]},
      {"type":"list-item","children":[{"type":"text","text":"Soil Application: 2-4 liter per hektar, diencerkan dalam 200-400 liter air"}]},
      {"type":"list-item","children":[{"type":"text","text":"Foliar Spray: 2-4 ml per liter air, volume semprot 400-500 liter per hektar"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pemupukan Terpadu Padi dengan Pupuk Hayati"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Untuk hasil optimal, pupuk hayati sebaiknya diintegrasikan dengan pupuk organik dan pupuk kimia dalam dosis dikurangi. Berikut contoh program pemupukan terpadu per hektar:"}]},
    
    {"type":"heading","children":[{"type":"text","text":"Pupuk Dasar (sebelum tanam):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk kandang/kompos: 2-3 ton"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 2 liter (untuk dekomposisi jerami)"}]},
      {"type":"list-item","children":[{"type":"text","text":"SP-36: 50 kg (dikurangi 50%)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pemupukan Susulan I (7-10 HST):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Urea: 50 kg (dikurangi 50%)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk hayati penambat N: 2 liter"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pemupukan Susulan II (21-28 HST):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Urea: 50 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"KCl: 50 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk hayati pelarut P dan K: 2 liter"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Hasil Penelitian Pupuk Hayati pada Padi"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Berbagai penelitian di Indonesia menunjukkan efektivitas pupuk hayati untuk padi:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Balitbangtan (2020): Aplikasi konsorsium pupuk hayati meningkatkan hasil GKP 15-22% dengan pengurangan urea 25-50%"}]},
      {"type":"list-item","children":[{"type":"text","text":"IPB (2019): Kombinasi Azospirillum + Pseudomonas meningkatkan efisiensi serapan N hingga 35%"}]},
      {"type":"list-item","children":[{"type":"text","text":"UGM (2021): Trichoderma mengurangi intensitas serangan blast hingga 60% dan meningkatkan hasil 12%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Litbang Jawa Tengah (2022): Pupuk hayati meningkatkan pendapatan petani Rp 2,5 juta/ha/musim"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tips Sukses Menggunakan Pupuk Hayati pada Padi"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Gunakan produk berkualitas - Pilih pupuk hayati dari produsen terpercaya dengan sertifikasi Kementan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi pagi atau sore - Hindari sinar matahari terik yang dapat membunuh mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jangan campur dengan pestisida kimia - Beri jeda minimal 3 hari antara aplikasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Konsisten dan rutin - Aplikasi terjadwal memberikan hasil lebih baik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perhatikan kondisi tanah - pH tanah 5,5-7 optimal untuk aktivitas mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tambah bahan organik - Mikroba membutuhkan bahan organik sebagai sumber energi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Hama Penyakit Padi dengan Pupuk Hayati"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Pengendalian Wereng dengan Beauveria bassiana"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi Beauveria bassiana efektif mengendalikan wereng coklat dan hijau. Semprot pada sore hari dengan dosis 2-3 ml/liter, frekuensi 7-10 hari sekali saat populasi wereng mulai meningkat."}]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Blast dengan Trichoderma"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Trichoderma harzianum efektif mencegah blast daun dan leher. Aplikasi preventif dimulai sejak fase vegetatif dengan dosis 3-5 ml/liter setiap 2 minggu."}]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Kresek (BLB) dengan Pseudomonas"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pseudomonas fluorescens menghasilkan senyawa antibiotik yang efektif menekan Xanthomonas oryzae penyebab kresek. Aplikasi rutin sejak awal dapat mengurangi serangan hingga 50%."}]},

    {"type":"heading","children":[{"type":"text","text":"Testimoni Petani Padi Pengguna Pupuk Hayati"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"\"Setelah menggunakan pupuk hayati dari Centra Biotech selama 2 musim, hasil panen saya naik dari 5,5 ton menjadi 7 ton per hektar. Biaya pupuk urea berkurang setengah.\" - Pak Tarno, Petani Padi, Klaten"}]},
    {"type":"paragraph","children":[{"type":"text","text":"\"Dulu setiap musim pasti kena blast, sekarang hampir tidak ada. Padi lebih sehat dan bulir lebih bernas.\" - Pak Sugeng, Petani Padi, Sragen"}]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Tentang Pupuk Hayati untuk Padi"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Apakah pupuk hayati bisa digunakan di sawah tergenang?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Ya, beberapa jenis pupuk hayati seperti Azospirillum dan Pseudomonas dapat hidup di kondisi anaerob fakultatif. Untuk hasil optimal, aplikasi saat kondisi macak-macak (tidak terlalu tergenang)."}]},

    {"type":"heading","children":[{"type":"text","text":"Berapa lama pupuk hayati mulai bekerja pada padi?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Efek mulai terlihat dalam 2-3 minggu, ditandai dengan pertumbuhan akar lebih lebat dan daun lebih hijau. Efek penuh terlihat setelah aplikasi rutin 2-3 kali."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah solusi tepat untuk meningkatkan produktivitas padi sekaligus menjaga kesehatan tanah sawah. Dengan aplikasi yang benar dan konsisten, petani dapat meningkatkan hasil panen 15-30% dengan penghematan biaya pupuk kimia hingga 50%."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan berbagai pupuk hayati berkualitas untuk padi. Konsultasikan kebutuhan Anda dengan tim ahli kami di 0851 8328 4691 atau email centrabioindo@gmail.com."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
