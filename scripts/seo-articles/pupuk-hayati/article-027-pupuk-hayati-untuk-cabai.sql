-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Cabai
-- Keyword: Pupuk Hayati, Cabai, Chili
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Cabai: Panduan Meningkatkan Hasil dan Kualitas Buah',
  'pupuk-hayati-untuk-cabai',
  'Panduan lengkap penggunaan pupuk hayati untuk tanaman cabai. Strategi meningkatkan produktivitas, mengendalikan layu bakteri dan antraknosa, serta produksi cabai berkualitas.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Peran Pupuk Hayati dalam Budidaya Cabai Modern"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Cabai adalah komoditas hortikultura bernilai tinggi dengan fluktuasi harga yang ekstrem. Saat harga tinggi, petani yang bisa panen mendapat keuntungan besar. Tantangannya adalah penyakit layu bakteri dan antraknosa yang sering menyebabkan gagal panen, terutama di musim hujan."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati menawarkan solusi untuk meningkatkan ketahanan tanaman, mengendalikan penyakit terbawa tanah, dan memperbaiki kualitas buah. Pendekatan biologis ini semakin penting untuk produksi cabai berkelanjutan dan menguntungkan."}]},

    {"type":"heading","children":[{"type":"text","text":"Tantangan Budidaya Cabai"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Layu bakteri (Ralstonia solanacearum) - penyakit paling merusak"}]},
      {"type":"list-item","children":[{"type":"text","text":"Layu Fusarium - menyerang sistem vaskular"}]},
      {"type":"list-item","children":[{"type":"text","text":"Antraknosa (Colletotrichum) - busuk buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Virus kuning keriting (Begomovirus)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Thrips dan kutu kebul - vektor virus"}]},
      {"type":"list-item","children":[{"type":"text","text":"Gugur bunga dan buah muda"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati untuk Cabai"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Trichoderma harzianum"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pelindung utama dari penyakit tanah:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Antagonis Fusarium oxysporum"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menekan Sclerotium dan Rhizoctonia"}]},
      {"type":"list-item","children":[{"type":"text","text":"Membantu mengendalikan Phytophthora"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menginduksi ketahanan sistemik tanaman"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 30-50 gram per lubang tanam, atau 15-20 kg/ha campur pupuk kandang."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Bacillus subtilis & B. amyloliquefaciens"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Kunci pengendalian layu bakteri:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Menekan Ralstonia solanacearum"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memproduksi antibiotik alami (surfactin, iturin)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menginduksi ketahanan sistemik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sebagai perlakuan benih dan semprot"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 5-10 ml/liter untuk perlakuan benih, 10-15 ml/liter untuk semprot."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Mikoriza VAM"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Efisiensi nutrisi untuk pembungaan dan pembuahan:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan serapan P untuk pembungaan lebat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki serapan K untuk kualitas buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan toleransi kekeringan dan cekaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengurangi gugur bunga"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 30-50 gram per lubang tanam saat transplanting."}]},

    {"type":"heading","children":[{"type":"text","text":"4. PGPR Konsorsium"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Azotobacter - penambat nitrogen untuk vegetatif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pseudomonas fluorescens - pelarut P dan antagonis patogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bacillus megaterium - pelarut fosfat"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"5. Beauveria bassiana & Metarhizium"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pengendalian hama:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Thrips padi dan thrips kuning"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu kebul (Bemisia tabaci) - vektor virus"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ulat grayak dan ulat buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu daun"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Layu Bakteri Terpadu"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Layu bakteri adalah penyakit paling merusak pada cabai. Strategi pengendalian:"}]},

    {"type":"heading","children":[{"type":"text","text":"Preventif:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Rotasi tanaman minimal 2 musim dengan non-solanaceae"}]},
      {"type":"list-item","children":[{"type":"text","text":"Solarisasi tanah dengan mulsa plastik transparan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bacillus subtilis 20 kg/ha campur pupuk kandang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perlakuan bibit dengan Bacillus sebelum tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Hindari genangan air"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kuratif:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Cabut dan musnahkan tanaman terinfeksi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Siram Bacillus 10 ml/liter di sekitar tanaman sehat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma untuk melindungi akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perbaiki drainase segera"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Antraknosa"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Antraknosa menyebabkan busuk buah yang sangat merugikan:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma semprot 5 gram/liter preventif saat musim hujan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bacillus subtilis semprot setiap 7-10 hari"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pangkas daun tua untuk sirkulasi udara"}]},
      {"type":"list-item","children":[{"type":"text","text":"Panen tepat waktu, jangan biarkan buah terlalu matang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sanitasi buah busuk dari kebun"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pemupukan per Fase"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Pembibitan:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Media semai campur Trichoderma 10 gram/kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR semprot setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bibit siap tanam umur 25-30 hari"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Persiapan Lahan:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk kandang 15-20 ton/ha"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma + Bacillus 20 kg/ha campur pupuk kandang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Inkubasi minimal 7 hari"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Saat Tanam:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza 30-50 gram per lubang"}]},
      {"type":"list-item","children":[{"type":"text","text":"NPK dasar sesuai rekomendasi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Vegetatif (Minggu 2-5):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR 200 ml per tanaman setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Beauveria semprot untuk cegah thrips dan kutu kebul"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pembungaan (Minggu 6-8):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR fokus perakaran"}]},
      {"type":"list-item","children":[{"type":"text","text":"KCl untuk memperkuat bunga"}]},
      {"type":"list-item","children":[{"type":"text","text":"Intensifkan Beauveria untuk cegah thrips"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pembuahan (Minggu 9+):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR dan Trichoderma rutin setiap 2 minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bacillus semprot untuk cegah antraknosa"}]},
      {"type":"list-item","children":[{"type":"text","text":"KCl untuk kualitas buah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Meningkatkan Kualitas Buah Cabai"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati berkontribusi pada kualitas buah:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Warna buah lebih cerah dan mengkilap"}]},
      {"type":"list-item","children":[{"type":"text","text":"Daging buah lebih tebal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tingkat kepedasan optimal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Daya simpan lebih lama"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bebas busuk antraknosa"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Hasil Penelitian di Cabai"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Balitsa (2022): Bacillus menurunkan layu bakteri 55-70%"}]},
      {"type":"list-item","children":[{"type":"text","text":"IPB (2021): Mikoriza meningkatkan hasil cabai 30-40%"}]},
      {"type":"list-item","children":[{"type":"text","text":"UGM (2020): PGPR mengurangi gugur bunga 40%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Litbang Pertanian (2019): Trichoderma menurunkan layu Fusarium 50%"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Analisis Ekonomi per Hektar"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Biaya pupuk hayati: Rp 3.000.000 - Rp 5.000.000/ha/musim"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pestisida: Rp 2.000.000 - Rp 4.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pupuk kimia: Rp 1.000.000 - Rp 2.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Peningkatan hasil 3-5 ton × Rp 25.000 = Rp 75.000.000 - Rp 125.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pengurangan kerugian penyakit: nilai tak terhingga saat harga tinggi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Cabai Musim Hujan (Off-Season)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Budidaya cabai musim hujan dengan pupuk hayati:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Intensifkan Trichoderma dan Bacillus"}]},
      {"type":"list-item","children":[{"type":"text","text":"Gunakan mulsa plastik perak"}]},
      {"type":"list-item","children":[{"type":"text","text":"Semprot preventif lebih sering"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tingkatkan drainase dan sanitasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Harga jual tinggi, keuntungan besar jika berhasil"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Seputar Pupuk Hayati untuk Cabai"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Bisakah pupuk hayati mencegah layu bakteri 100%?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Tidak ada metode yang 100% efektif, tetapi kombinasi rotasi tanaman, solarisasi, dan aplikasi Bacillus konsisten bisa menurunkan serangan hingga 70-80%. Kuncinya adalah pengendalian terpadu, bukan mengandalkan satu metode saja."}]},

    {"type":"heading","children":[{"type":"text","text":"Kapan waktu terbaik aplikasi pupuk hayati?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pagi (06.00-09.00) atau sore (16.00-18.00) saat suhu tidak terlalu panas. Untuk kocor ke tanah bisa kapan saja selama tanah lembab. Hindari aplikasi semprot saat hujan atau terik matahari yang bisa merusak mikroba."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah komponen kunci untuk keberhasilan budidaya cabai. Kombinasi Trichoderma, Bacillus, mikoriza, dan PGPR memberikan perlindungan menyeluruh dari penyakit sekaligus meningkatkan produktivitas dan kualitas buah."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati berkualitas untuk budidaya cabai. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi dan pemesanan."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
