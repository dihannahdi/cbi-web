-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Kopi
-- Keyword: Pupuk Hayati, Kopi, Perkebunan
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Kopi: Tingkatkan Produktivitas dan Kualitas Biji Kopi',
  'pupuk-hayati-untuk-kopi',
  'Panduan lengkap penggunaan pupuk hayati untuk tanaman kopi. Jenis mikroorganisme, dosis, cara aplikasi, dan strategi meningkatkan produktivitas serta cita rasa kopi.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Pentingnya Pupuk Hayati untuk Perkebunan Kopi Indonesia"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Indonesia adalah produsen kopi terbesar keempat di dunia dengan berbagai varietas unggulan seperti Arabica Gayo, Toraja, Java, dan Robusta Lampung. Namun produktivitas rata-rata perkebunan kopi rakyat masih rendah, sekitar 600-800 kg/ha, jauh di bawah potensi 1.500-2.000 kg/ha."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati menjadi solusi untuk meningkatkan produktivitas sekaligus memperbaiki cita rasa kopi. Mikroorganisme beneficial membantu tanaman menyerap nutrisi lebih efisien, meningkatkan ketahanan terhadap penyakit, dan mengoptimalkan pembentukan biji berkualitas tinggi."}]},

    {"type":"heading","children":[{"type":"text","text":"Tantangan Budidaya Kopi di Indonesia"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Serangan penyakit karat daun (Hemileia vastatrix) yang menurunkan produktivitas 30-50%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Hama penggerek buah kopi (Hypothenemus hampei) merusak biji"}]},
      {"type":"list-item","children":[{"type":"text","text":"Degradasi tanah akibat monokultur puluhan tahun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efisiensi pupuk rendah di tanah masam dataran tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perubahan iklim mempengaruhi pembungaan dan pematangan buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tuntutan pasar specialty coffee untuk kualitas konsisten"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati untuk Tanaman Kopi"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Mikoriza Vesikular Arbuskula (MVA)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sangat penting untuk kopi karena:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan penyerapan P di tanah masam dataran tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperluas zona perakaran untuk akses air dan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan toleransi terhadap kekeringan saat musim kering"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki serapan mikronutrien (Zn, Cu, B) untuk kualitas biji"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 50-100 gram per pohon saat tanam, ulang setiap tahun setelah panen."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Trichoderma harzianum"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Melindungi kopi dari penyakit tanah:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Menekan Fusarium dan Rhizoctonia penyebab busuk akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mendekomposisi seresah daun dan kulit buah kopi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menghasilkan enzim yang membantu penyerapan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menginduksi ketahanan sistemik terhadap penyakit"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 50-100 gram per pohon setiap 3-4 bulan."}]},

    {"type":"heading","children":[{"type":"text","text":"3. PGPR Konsorsium"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Bakteri beneficial untuk pertumbuhan optimal:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Azotobacter - penambat N untuk pertumbuhan vegetatif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Azospirillum - penghasil IAA untuk pembungaan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pseudomonas fluorescens - pelarut fosfat dan biokontrol"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bacillus subtilis - penghasil enzim dan antibiotik alami"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 100-200 ml per pohon, dikocorkan setiap 1-2 bulan."}]},

    {"type":"heading","children":[{"type":"text","text":"4. Beauveria bassiana"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pengendalian hama utama kopi:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Penggerek buah kopi (PBKo) - hama paling merusak"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu hijau (Coccus viridis)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu putih pada akar"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: Semprot 3-5 gram/liter saat buah muda untuk cegah PBKo."}]},

    {"type":"heading","children":[{"type":"text","text":"5. Metarhizium anisopliae"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pengendalian hama tanah:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Uret/larva kumbang perusak akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rayap yang menyerang tanaman lemah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Cara Aplikasi Pupuk Hayati pada Kopi"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Fase Pembibitan:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Campurkan mikoriza 10 gram + Trichoderma 5 gram ke media semai"}]},
      {"type":"list-item","children":[{"type":"text","text":"Siram bibit dengan PGPR 5 ml/liter setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Bibit dengan pupuk hayati lebih vigor dan tahan transplanting"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Saat Tanam:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Lubang tanam: Mikoriza 50 gram + Trichoderma 50 gram + pupuk kandang 5 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Inkubasi lubang 1-2 minggu sebelum tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Celup akar bibit di larutan PGPR sebelum tanam"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tanaman Belum Menghasilkan (TBM):"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR 100 ml/pohon setiap bulan selama musim hujan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma 50 gram/pohon setiap 3 bulan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza 50 gram/pohon setahun sekali"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tanaman Menghasilkan (TM):"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Setelah panen: Mikoriza 100 gram + Trichoderma 100 gram untuk pemulihan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sebelum pembungaan: PGPR 200 ml/pohon untuk merangsang bunga"}]},
      {"type":"list-item","children":[{"type":"text","text":"Saat pembesaran buah: PGPR 150 ml/pohon setiap 2 minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pengendalian PBKo: Beauveria saat buah muda (3-4 bulan sebelum panen)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Meningkatkan Kualitas Cita Rasa Kopi dengan Pupuk Hayati"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Cita rasa kopi specialty ditentukan oleh keseimbangan nutrisi tanaman. Pupuk hayati berkontribusi melalui:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza meningkatkan serapan mikronutrien (Zn, Cu, Fe, B) yang esensial untuk pembentukan aroma"}]},
      {"type":"list-item","children":[{"type":"text","text":"Keseimbangan N-P-K dari PGPR mengoptimalkan akumulasi gula dan asam organik dalam biji"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanaman sehat menghasilkan biji dengan densitas dan ukuran seragam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pematangan buah lebih seragam untuk panen selektif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengurangi defek biji dari serangan hama dan penyakit"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Penyakit Karat Daun (Hemileia vastatrix)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Karat daun adalah penyakit paling merusak pada kopi. Strategi pengendalian dengan pupuk hayati:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma menginduksi ketahanan sistemik (ISR) terhadap jamur patogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR meningkatkan kesehatan tanaman secara umum"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanaman dengan nutrisi seimbang lebih tahan terhadap infeksi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kombinasi dengan fungisida nabati untuk hasil optimal"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Catatan: Pupuk hayati bukan pengganti fungisida untuk karat daun berat, tapi sangat efektif untuk pencegahan dan mengurangi tingkat keparahan serangan."}]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Penggerek Buah Kopi (PBKo) dengan Beauveria"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Identifikasi: PBKo menyerang buah hijau hingga matang, membuat lubang kecil di ujung buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Waktu aplikasi: Mulai saat buah berumur 3-4 bulan (hijau muda)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cara: Semprot Beauveria 5 gram/liter ke seluruh tajuk, terutama buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Frekuensi: Setiap 2 minggu selama periode rentan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kombinasi: Pasang perangkap feromon untuk monitoring dan mass trapping"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pemupukan Terpadu Kopi dengan Pupuk Hayati"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Contoh program untuk TM umur 5 tahun, per pohon per tahun:"}]},

    {"type":"heading","children":[{"type":"text","text":"Setelah Panen (Agustus-September):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pangkas dan bersihkan kebun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk kandang/kompos: 10-15 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza: 100 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 100 gram (campurkan dengan kompos)"}]},
      {"type":"list-item","children":[{"type":"text","text":"NPK: 200 gram"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Menjelang Pembungaan (Oktober-November):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR: 200 ml dikocorkan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk daun mikro: sesuai dosis"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pembesaran Buah (Januari-April):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR: 150 ml setiap bulan"}]},
      {"type":"list-item","children":[{"type":"text","text":"NPK: 150 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Beauveria: Semprot preventif untuk PBKo"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pematangan (Mei-Juli):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"KCl: 100 gram untuk kualitas biji"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR: 100 ml"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 50 gram"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Analisis Ekonomi per Hektar Kopi"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Biaya pupuk hayati: Rp 1.500.000 - Rp 2.500.000/ha/tahun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pupuk kimia: Rp 500.000 - Rp 1.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pestisida: Rp 300.000 - Rp 500.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Peningkatan hasil 300-500 kg × Rp 30.000 = Rp 9.000.000 - Rp 15.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Premium kualitas specialty: Rp 5.000 - Rp 10.000/kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Net benefit: Rp 8.000.000 - Rp 15.000.000/ha/tahun"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Seputar Pupuk Hayati untuk Kopi"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Apakah pupuk hayati mempengaruhi rasa kopi?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Ya, secara positif. Pupuk hayati meningkatkan keseimbangan nutrisi yang mengoptimalkan pembentukan gula, asam organik, dan senyawa aroma dalam biji. Banyak produsen specialty coffee sudah mengadopsi pupuk hayati untuk konsistensi kualitas."}]},

    {"type":"heading","children":[{"type":"text","text":"Berapa lama hasil pupuk hayati terlihat pada kopi?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Efek pada kesehatan tanaman terlihat dalam 2-3 bulan. Peningkatan produktivitas signifikan biasanya terlihat pada musim panen kedua setelah aplikasi konsisten, karena siklus produksi kopi yang panjang (8-10 bulan dari bunga ke panen)."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah investasi strategis untuk perkebunan kopi yang ingin meningkatkan produktivitas dan kualitas biji. Kombinasi mikoriza, Trichoderma, PGPR, dan Beauveria memberikan perlindungan menyeluruh sekaligus optimalisasi nutrisi."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati berkualitas untuk perkebunan kopi. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi dan penawaran khusus."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
