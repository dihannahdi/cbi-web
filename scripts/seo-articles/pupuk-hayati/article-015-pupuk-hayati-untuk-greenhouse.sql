-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Greenhouse
-- Keyword: Pupuk Hayati, Greenhouse, Rumah Kaca
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Greenhouse: Panduan Lengkap Budidaya Tanaman di Rumah Kaca',
  'pupuk-hayati-untuk-greenhouse',
  'Panduan lengkap penggunaan pupuk hayati di greenhouse. Jenis mikroorganisme, dosis, teknik aplikasi, dan strategi meningkatkan produktivitas tanaman rumah kaca.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Mengapa Pupuk Hayati Penting untuk Greenhouse?"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Budidaya tanaman di greenhouse atau rumah kaca memiliki karakteristik unik yang berbeda dengan pertanian lahan terbuka. Lingkungan tertutup, media tanam buatan, dan intensitas produksi tinggi menciptakan tantangan tersendiri dalam pengelolaan kesuburan dan kesehatan tanaman."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati menjadi solusi strategis untuk greenhouse karena mampu menyediakan nutrisi secara efisien, menekan penyakit tanah, dan memperbaiki kualitas media tanam. Dengan penerapan yang tepat, pupuk hayati dapat meningkatkan produktivitas greenhouse 20-40% dengan penghematan input signifikan."}]},

    {"type":"heading","children":[{"type":"text","text":"Tantangan Budidaya Greenhouse"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Media tanam buatan dengan mikrobioma terbatas atau tidak ada"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kelembaban tinggi yang mendukung perkembangan penyakit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Suhu tinggi yang menekan aktivitas mikroba beneficial"}]},
      {"type":"list-item","children":[{"type":"text","text":"Akumulasi patogen akibat budidaya terus-menerus"}]},
      {"type":"list-item","children":[{"type":"text","text":"Salinitas media meningkat akibat fertigasi intensif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penggunaan pestisida yang dapat membunuh mikroba beneficial"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biaya produksi tinggi yang menuntut efisiensi maksimal"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati untuk Greenhouse"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Trichoderma spp."}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Trichoderma adalah pilihan utama untuk greenhouse karena:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Menekan Pythium, Fusarium, dan Rhizoctonia - penyakit utama di greenhouse"}]},
      {"type":"list-item","children":[{"type":"text","text":"Toleran terhadap kondisi steril media tanam buatan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kompatibel dengan sistem fertigasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan penyerapan nutrisi melalui produksi enzim"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 5-10 gram per polybag atau 50-100 gram per meter persegi bendengan."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Bakteri PGPR (Pseudomonas, Bacillus)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"PGPR sangat efektif di lingkungan greenhouse:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Melarutkan fosfat dalam media tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menghasilkan siderophore untuk kompetisi dengan patogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Produksi fitohormon untuk pertumbuhan optimal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Induksi ketahanan sistemik (ISR) terhadap penyakit"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 2-5 ml/liter air untuk penyiraman, setiap 1-2 minggu."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Mikoriza"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Mikoriza meningkatkan efisiensi nutrisi di greenhouse:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Memperluas zona penyerapan akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan serapan P, Zn, dan Cu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan toleransi terhadap salinitas"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efektif untuk tomat, paprika, dan melon"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 10-20 gram per lubang tanam atau dicampur media semai."}]},

    {"type":"heading","children":[{"type":"text","text":"4. Beauveria bassiana"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pengendalian hama di greenhouse:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Whitefly (kutu kebul) - hama utama greenhouse"}]},
      {"type":"list-item","children":[{"type":"text","text":"Thrips - vektor virus TSWV"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aphids - kutu daun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Spider mites pada kondisi lembab"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Teknik Aplikasi Pupuk Hayati di Greenhouse"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Integrasi dengan Sistem Fertigasi"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Gunakan pupuk hayati cair yang kompatibel dengan drip irrigation"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi terpisah dari pupuk kimia untuk menghindari interaksi negatif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Filter larutan untuk mencegah penyumbatan emitter"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi pagi hari saat suhu lebih rendah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Flushing sistem setelah aplikasi pupuk hayati"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Inokulasi Media Tanam"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Campurkan Trichoderma 500 gram per m3 media sebelum filling polybag"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tambahkan mikoriza 200 gram per m3 untuk media tanam baru"}]},
      {"type":"list-item","children":[{"type":"text","text":"Inkubasi media 3-5 hari sebelum tanam untuk kolonisasi mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jaga kelembaban media 60-70% selama inkubasi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Aplikasi pada Pembibitan"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Rendam benih dalam larutan PGPR 10 ml/liter selama 30 menit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Campurkan Trichoderma ke media semai 10 gram/kg media"}]},
      {"type":"list-item","children":[{"type":"text","text":"Siram bibit dengan PGPR setiap minggu, dosis 5 ml/liter"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi mikoriza saat transplanting ke polybag produksi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pupuk Hayati untuk Tanaman Greenhouse"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Tomat Greenhouse:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Semai: Trichoderma 10 g/kg media + PGPR 5 ml/L setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Transplanting: Mikoriza 15 g/lubang + Trichoderma 10 g"}]},
      {"type":"list-item","children":[{"type":"text","text":"Vegetatif: PGPR via fertigasi 100 ml/100 L air, setiap 2 minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Generatif: Fokus pada Trichoderma untuk cegah fusarium"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pengendalian whitefly: Beauveria 3 g/L semprot mingguan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Paprika Greenhouse:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Semai: PGPR rendaman benih + Trichoderma di media"}]},
      {"type":"list-item","children":[{"type":"text","text":"Transplanting: Mikoriza VAM 20 g/lubang"}]},
      {"type":"list-item","children":[{"type":"text","text":"Vegetatif-generatif: PGPR 150 ml/100 L via fertigasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cegah Phytophthora: Trichoderma 50 g/m2 setiap bulan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Thrips control: Beauveria + Metarhizium kombinasi"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Melon Greenhouse:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Media tanam: Trichoderma 500 g/m3 + mikoriza 200 g/m3"}]},
      {"type":"list-item","children":[{"type":"text","text":"Semai: PGPR 5 ml/L setiap 5 hari"}]},
      {"type":"list-item","children":[{"type":"text","text":"Masa pertumbuhan: PGPR 100 ml/100 L setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cegah layu fusarium: Trichoderma 30 g/tanaman setiap 3 minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu daun: Beauveria 2 g/L semprot preventif"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Mengatasi Masalah Umum di Greenhouse dengan Pupuk Hayati"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Damping-off pada Semai:"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Penyebab: Pythium, Rhizoctonia, Fusarium. Solusi:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Sterilisasi media semai dengan panas atau solarisasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Inokulasi Trichoderma 20 g/kg media"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penyiraman dengan PGPR 10 ml/L setiap 3 hari"}]},
      {"type":"list-item","children":[{"type":"text","text":"Hindari overwatering yang menciptakan kondisi anaerob"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Layu Fusarium:"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Penyakit paling merusak di greenhouse. Penanganan:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Preventif: Trichoderma di setiap tahap budidaya"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kuratif: Aplikasi Trichoderma 100 g/m2 pada tanaman bergejala"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rotasi media: Ganti media tanam setelah 2-3 siklus"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sanitasi: Sterilisasi alat dan wadah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Akumulasi Garam:"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Fertigasi intensif menyebabkan salinitas tinggi. Solusi:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi mikoriza meningkatkan toleransi tanaman terhadap garam"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR penghasil EPS (exopolysaccharides) melindungi akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Leaching berkala dengan air bersih"}]},
      {"type":"list-item","children":[{"type":"text","text":"Monitoring EC media secara rutin"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tips Sukses Penggunaan Pupuk Hayati di Greenhouse"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Simpan pupuk hayati di tempat sejuk - suhu greenhouse tinggi dapat menurunkan viabilitas"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi pagi atau sore - hindari jam terpanas"}]},
      {"type":"list-item","children":[{"type":"text","text":"Beri jeda dengan fungisida kimia - minimal 7 hari sebelum/sesudah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Gunakan air bersih - hindari air dengan klorin tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Konsisten dan teratur - mikroba butuh waktu untuk kolonisasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Monitor hasil - catat respons tanaman untuk evaluasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pilih produk berkualitas - pastikan konsentrasi sel sesuai label"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Analisis ROI Penggunaan Pupuk Hayati di Greenhouse"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Per 1000 m2 greenhouse tomat per musim:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Biaya pupuk hayati: Rp 1.500.000 - Rp 2.500.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pestisida: Rp 500.000 - Rp 1.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pupuk kimia: Rp 300.000 - Rp 500.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Peningkatan hasil 20%: 500 kg × Rp 15.000 = Rp 7.500.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Peningkatan kualitas (grade A): Premium Rp 2.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Net benefit: Rp 7.000.000 - Rp 8.500.000 per musim"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Seputar Pupuk Hayati untuk Greenhouse"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Apakah pupuk hayati cocok untuk hidroponik?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Ya, terutama PGPR dan Trichoderma. Namun perlu perhatian khusus pada kompatibilitas dengan sistem, konsentrasi nutrisi, dan filter untuk mencegah penyumbatan. Mikoriza kurang cocok untuk sistem NFT atau DFT murni."}]},

    {"type":"heading","children":[{"type":"text","text":"Bagaimana jika sudah menggunakan fungisida kimia?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Beri jeda minimal 7-10 hari setelah aplikasi fungisida sebelum menggunakan pupuk hayati. Beberapa fungisida seperti mancozeb dan tembaga sangat toksik bagi mikroba beneficial. Bacillus dan Trichoderma lebih toleran dibanding bakteri lain."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah komponen penting untuk budidaya greenhouse yang berkelanjutan dan menguntungkan. Dengan pemilihan jenis yang tepat dan teknik aplikasi yang benar, greenhouse dapat meningkatkan produktivitas signifikan dengan biaya input lebih rendah."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati khusus untuk greenhouse dengan formulasi yang kompatibel dengan sistem fertigasi. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi teknis."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
