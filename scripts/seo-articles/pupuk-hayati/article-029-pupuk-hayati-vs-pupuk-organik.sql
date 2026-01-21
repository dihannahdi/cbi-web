-- ============================================
-- SEO ARTICLE: Pupuk Hayati vs Pupuk Organik
-- Keyword: Pupuk Hayati, Pupuk Organik, Perbandingan
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati vs Pupuk Organik: Panduan Lengkap Perbedaan dan Cara Memilih',
  'pupuk-hayati-vs-pupuk-organik',
  'Panduan lengkap perbedaan pupuk hayati dan pupuk organik. Definisi, cara kerja, kelebihan, kekurangan, dan kapan menggunakan masing-masing jenis pupuk.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Memahami Perbedaan Pupuk Hayati dan Pupuk Organik"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Banyak petani dan pelaku agribisnis masih bingung membedakan pupuk hayati dan pupuk organik. Keduanya sering dianggap sama karena sama-sama ramah lingkungan, padahal memiliki definisi, cara kerja, dan manfaat yang berbeda. Memahami perbedaan ini penting untuk mengoptimalkan hasil pertanian."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Artikel ini akan membahas secara komprehensif perbedaan fundamental antara pupuk hayati dan pupuk organik, serta panduan kapan dan bagaimana menggunakan masing-masing."}]},

    {"type":"heading","children":[{"type":"text","text":"Definisi: Pupuk Hayati"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Berdasarkan Permentan No. 70/2011, pupuk hayati adalah produk biologi aktif yang mengandung mikroorganisme hidup yang berfungsi untuk meningkatkan efisiensi pemupukan, kesuburan tanah, dan/atau kesehatan tanaman."}]},
    {"type":"heading","children":[{"type":"text","text":"Karakteristik Pupuk Hayati:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mengandung mikroorganisme hidup (bakteri, jamur, atau keduanya)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tidak langsung menyediakan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bekerja melalui aktivitas biologis mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memerlukan kondisi tertentu untuk efektif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Populasi mikroba diukur dalam CFU/gram atau CFU/ml"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Definisi: Pupuk Organik"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk organik adalah pupuk yang sebagian besar atau seluruhnya berasal dari bahan organik (tanaman, hewan, atau limbah organik) melalui proses pembusukan atau dekomposisi."}]},
    {"type":"heading","children":[{"type":"text","text":"Karakteristik Pupuk Organik:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Berasal dari bahan organik alami"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menyediakan nutrisi (N, P, K, mikronutrien)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki struktur fisik tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan kapasitas tukar kation (KTK)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kandungan nutrisi diukur dalam persentase atau ppm"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Perbedaan Cara Kerja"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Cara Kerja Pupuk Hayati:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikroba dalam pupuk hayati berkembang biak di rizosfer"}]},
      {"type":"list-item","children":[{"type":"text","text":"Melakukan proses biologis: fiksasi N, pelarutan P, penghasilan hormon"}]},
      {"type":"list-item","children":[{"type":"text","text":"Membentuk simbiosis dengan akar (mikoriza) atau kolonisasi (PGPR)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek bertahap dan berkelanjutan selama mikroba hidup"}]},
      {"type":"list-item","children":[{"type":"text","text":"Membutuhkan kelembaban dan bahan organik sebagai sumber energi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Cara Kerja Pupuk Organik:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Nutrisi dalam pupuk organik dilepaskan secara bertahap melalui dekomposisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki struktur tanah, porositas, dan aerasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan kemampuan tanah menahan air dan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menyediakan substrat untuk mikroba tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek langsung pada sifat fisik dan kimia tanah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Perbandingan Detail"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Kandungan:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati: Mikroorganisme hidup (minimum 10⁷ CFU/gram)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Organik: Bahan organik (C-organik > 15%), N, P, K, dll"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Fungsi Utama:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati: Meningkatkan ketersediaan nutrisi, perlindungan penyakit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Organik: Menyediakan nutrisi, memperbaiki struktur tanah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Dosis:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati: Relatif kecil (5-25 kg/ha)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Organik: Besar (1-20 ton/ha)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kecepatan Efek:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati: 2-4 minggu (setelah mikroba berkembang)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Organik: Bertahap, efek penuh beberapa musim"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Penyimpanan:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati: Perlu kondisi khusus, umur terbatas (6-12 bulan)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Organik: Stabil, bisa disimpan lama"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Harga:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati: Relatif mahal per kg, tapi dosis kecil"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Organik: Murah per kg, tapi butuh volume besar"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kelebihan dan Kekurangan"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Kelebihan Pupuk Hayati:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan efisiensi pupuk kimia dan organik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menyediakan perlindungan dari patogen tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis kecil, mudah diaplikasikan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biaya transport dan penyimpanan rendah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek berkelanjutan jika mikroba mapan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kekurangan Pupuk Hayati:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Memerlukan kondisi optimal untuk efektif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tidak tahan panas, kering, atau pestisida tertentu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Umur simpan terbatas"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek tidak instant"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kelebihan Pupuk Organik:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki semua aspek tanah (fisik, kimia, biologi)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menyediakan nutrisi lengkap meski kadar rendah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Stabil dan mudah disimpan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memanfaatkan limbah organik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efek kumulatif, makin lama makin baik"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kekurangan Pupuk Organik:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Butuh volume besar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biaya transport tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kadar nutrisi rendah dan bervariasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Potensi bawa biji gulma atau patogen jika tidak matang"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kapan Menggunakan Masing-Masing?"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Gunakan Pupuk Hayati:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Saat ada masalah penyakit tanah (layu, busuk akar)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Untuk meningkatkan efisiensi pupuk kimia"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanah sudah cukup organik tapi mikroba kurang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanaman perlu serapan P tinggi tapi P terikat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bibit dan pembibitan untuk start yang kuat"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Gunakan Pupuk Organik:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Tanah sangat miskin bahan organik (< 2%)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Struktur tanah rusak (keras, padat)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Persiapan lahan sebelum tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rehabilitasi tanah terdegradasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pertanian organik dengan sertifikasi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kombinasi Optimal"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Hasil terbaik diperoleh dengan menggabungkan keduanya:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk organik sebagai basis untuk memperbaiki tanah dan sumber energi mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk hayati untuk mengoptimalkan ketersediaan nutrisi dan perlindungan penyakit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk kimia dosis rendah sebagai tambahan sesuai kebutuhan tanaman"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Contoh program: Pupuk kandang 10 ton/ha + Trichoderma 15 kg/ha + Mikoriza 10 kg/ha + NPK 50% rekomendasi."}]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Umum"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Bisakah pupuk hayati menggantikan pupuk organik?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Tidak sepenuhnya. Pupuk hayati tidak menyediakan nutrisi dan bahan organik seperti pupuk organik. Di tanah sangat miskin bahan organik, pupuk hayati tidak akan efektif tanpa pupuk organik sebagai sumber energi untuk mikroba."}]},

    {"type":"heading","children":[{"type":"text","text":"Mana yang lebih penting untuk tanaman?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Tergantung kondisi tanah. Di tanah yang sudah kaya organik tapi mikroba kurang, pupuk hayati lebih prioritas. Di tanah miskin organik, pupuk organik harus ditambahkan dulu. Idealnya kombinasi keduanya."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati dan pupuk organik adalah dua jenis input pertanian yang berbeda dengan fungsi yang saling melengkapi. Pupuk hayati mengandung mikroorganisme hidup yang bekerja secara biologis, sedangkan pupuk organik menyediakan nutrisi dan bahan organik untuk tanah. Kombinasi keduanya memberikan hasil optimal untuk pertanian berkelanjutan."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati dan pupuk organik berkualitas. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi produk yang sesuai kebutuhan Anda."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
