-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Sayuran
-- Keyword: Pupuk Hayati, Pupuk Hayati Sayuran
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Sayuran: Panduan Lengkap Budidaya Sayuran Organik Berkualitas',
  'pupuk-hayati-untuk-sayuran',
  'Pelajari cara menggunakan pupuk hayati untuk budidaya sayuran organik. Panduan lengkap jenis mikroorganisme, dosis, waktu aplikasi untuk berbagai jenis sayuran.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Mengapa Pupuk Hayati Penting untuk Budidaya Sayuran?"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Sayuran adalah komoditas yang dikonsumsi langsung oleh manusia, sehingga kualitas dan keamanan menjadi prioritas utama. Penggunaan pupuk hayati pada budidaya sayuran memberikan keuntungan ganda: meningkatkan produktivitas sekaligus menghasilkan produk yang aman dan bebas residu kimia berbahaya."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Permintaan sayuran organik di Indonesia terus meningkat seiring kesadaran konsumen akan pentingnya pola makan sehat. Pupuk hayati menjadi kunci utama dalam sistem budidaya sayuran organik yang berkualitas dan berkelanjutan."}]},

    {"type":"heading","children":[{"type":"text","text":"Tantangan Budidaya Sayuran Konvensional"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Ketergantungan tinggi pada pupuk kimia yang meningkatkan biaya produksi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Residu pestisida dan pupuk kimia pada hasil panen mengancam kesehatan konsumen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Degradasi tanah akibat monokultur dan penggunaan bahan kimia intensif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Serangan hama dan penyakit yang semakin resisten terhadap pestisida"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kualitas sayuran menurun: rasa kurang enak, daya simpan pendek"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati untuk Berbagai Sayuran"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Sayuran Daun (Sawi, Bayam, Kangkung, Selada)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sayuran daun membutuhkan nitrogen tinggi untuk pertumbuhan daun yang optimal. Pupuk hayati yang direkomendasikan:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Azotobacter - penambat nitrogen bebas, cocok untuk semua jenis tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR konsorsium - merangsang pertumbuhan cepat dan daun lebih hijau"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma - mencegah penyakit rebah kecambah dan busuk akar"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Dosis: 2-3 ml/liter air, aplikasi setiap 7 hari sejak pindah tanam hingga panen."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Sayuran Buah (Tomat, Cabai, Terong, Timun, Melon)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sayuran buah membutuhkan keseimbangan N-P-K untuk pertumbuhan vegetatif dan generatif yang optimal. Rekomendasi pupuk hayati:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Azospirillum + Pseudomonas - kombinasi penambat N dan pelarut P"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma harzianum - sangat penting untuk mencegah layu fusarium"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza - meningkatkan penyerapan P untuk pembungaan dan pembuahan"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Dosis: 3-5 ml/liter air, aplikasi setiap 10-14 hari. Intensifkan saat fase pembungaan."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Sayuran Umbi (Wortel, Kentang, Bawang)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sayuran umbi membutuhkan fosfor dan kalium tinggi untuk pembentukan umbi. Pupuk hayati yang sesuai:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Bacillus megaterium - pelarut fosfat efektif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aspergillus niger - melarutkan fosfat dan kalium terikat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma viride - mencegah busuk umbi"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Dosis: 3-4 ml/liter air, aplikasi kocor ke tanah setiap 2 minggu."}]},

    {"type":"heading","children":[{"type":"text","text":"4. Sayuran Legum (Buncis, Kacang Panjang, Kapri)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sayuran legum dapat bersimbiosis dengan Rhizobium untuk fiksasi nitrogen. Rekomendasi:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Rhizobium - wajib untuk pembentukan bintil akar dan fiksasi N"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pseudomonas fluorescens - pelarut P dan biokontrol"}]},
      {"type":"list-item","children":[{"type":"text","text":"Beauveria bassiana - pengendalian kutu daun"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi Rhizobium sebaiknya melalui seed treatment sebelum tanam."}]},

    {"type":"heading","children":[{"type":"text","text":"Cara Aplikasi Pupuk Hayati pada Sayuran"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Tahap Persemaian"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Seed treatment - rendam benih dalam larutan pupuk hayati (2 ml/liter) selama 2-4 jam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Campurkan Trichoderma ke media semai untuk mencegah rebah kecambah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Siram persemaian dengan larutan PGPR setiap 5-7 hari"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tahap Pindah Tanam"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Root dipping - celup akar bibit dalam larutan pupuk hayati (5 ml/liter) selama 15-30 menit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kocor lubang tanam dengan larutan Trichoderma"}]},
      {"type":"list-item","children":[{"type":"text","text":"Berikan mikoriza granul di sekitar perakaran saat tanam"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tahap Pertumbuhan"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Minggu 1-2: Fokus pada PGPR untuk merangsang perakaran"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu 3-4: Kombinasi penambat N dan pelarut P"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menjelang berbunga: Intensifkan aplikasi pelarut P dan K"}]},
      {"type":"list-item","children":[{"type":"text","text":"Fase pembuahan: Kombinasi lengkap untuk hasil optimal"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pemupukan Terpadu Sayuran"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Contoh program untuk tomat per 1000 m2 bedengan:"}]},
    
    {"type":"heading","children":[{"type":"text","text":"Pupuk Dasar:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk kandang matang: 1-2 ton"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dolomit: 50 kg (untuk penyesuaian pH)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 500 gram dicampur pupuk kandang"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pemupukan Susulan:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Minggu 1: PGPR 500 ml + Trichoderma 200 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu 2: Pupuk hayati konsorsium 500 ml"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu 3: Azospirillum 300 ml + Pseudomonas 200 ml"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu 4 dst: Rotasi sesuai fase pertumbuhan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Hama Penyakit Sayuran dengan Agen Hayati"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Penyakit Layu Fusarium (Tomat, Cabai, Melon)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Layu fusarium adalah penyakit paling merusak pada sayuran buah. Pencegahan dengan Trichoderma harzianum sangat efektif jika dilakukan sejak awal tanam. Aplikasi preventif: campurkan Trichoderma ke lubang tanam dan lakukan pengocoran rutin setiap 2 minggu."}]},

    {"type":"heading","children":[{"type":"text","text":"Rebah Kecambah (Damping-off)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Menyerang bibit muda di persemaian. Pencegahan: campurkan Trichoderma ke media semai, hindari kelembaban berlebihan, dan gunakan benih yang sudah di-treatment dengan pupuk hayati."}]},

    {"type":"heading","children":[{"type":"text","text":"Kutu Daun dan Thrips"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pengendalian dengan Beauveria bassiana efektif jika diaplikasikan saat populasi masih rendah. Semprot sore hari dengan dosis 3-5 ml/liter, frekuensi 5-7 hari sekali."}]},

    {"type":"heading","children":[{"type":"text","text":"Keuntungan Sayuran dengan Pupuk Hayati"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Kualitas Lebih Baik - rasa lebih enak, tekstur renyah, warna cerah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Daya Simpan Lama - sayuran tidak cepat layu dan busuk"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aman Dikonsumsi - bebas residu pestisida dan pupuk kimia"}]},
      {"type":"list-item","children":[{"type":"text","text":"Nilai Jual Tinggi - sayuran organik dihargai 30-50% lebih mahal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biaya Produksi Efisien - mengurangi kebutuhan pupuk dan pestisida kimia"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanah Tetap Subur - tidak ada degradasi untuk musim berikutnya"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tips Sukses Budidaya Sayuran dengan Pupuk Hayati"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mulai dengan tanah yang sudah diperkaya bahan organik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi pupuk hayati secara rutin dan konsisten"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jangan campurkan dengan pestisida kimia keras"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perhatikan kelembaban tanah - mikroba butuh kondisi lembab"}]},
      {"type":"list-item","children":[{"type":"text","text":"Gunakan mulsa untuk menjaga kelembaban dan suhu tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rotasi tanaman untuk menjaga kesehatan tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pilih produk dari produsen terpercaya seperti PT Centra Biotech Indonesia"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Tentang Pupuk Hayati untuk Sayuran"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Apakah sayuran yang dipupuk hayati bisa disebut organik?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Untuk label organik resmi, seluruh sistem budidaya harus mengikuti standar organik dan mendapat sertifikasi dari lembaga berwenang. Namun, sayuran dengan pupuk hayati sudah jauh lebih sehat dari sayuran konvensional."}]},

    {"type":"heading","children":[{"type":"text","text":"Berapa hari sebelum panen masih boleh aplikasi pupuk hayati?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati aman diaplikasikan hingga menjelang panen karena tidak meninggalkan residu berbahaya. Bahkan aplikasi terakhir bisa dilakukan 1-3 hari sebelum panen."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah solusi terbaik untuk budidaya sayuran berkualitas, aman, dan berkelanjutan. Dengan pemilihan jenis yang tepat dan aplikasi yang benar, petani sayuran dapat meningkatkan produktivitas sekaligus memenuhi permintaan pasar akan produk sehat."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan berbagai pupuk hayati untuk sayuran dengan kualitas terjamin. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi dan pemesanan."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
