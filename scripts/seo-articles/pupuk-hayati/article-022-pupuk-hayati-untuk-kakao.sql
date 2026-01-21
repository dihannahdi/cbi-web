-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Kakao
-- Keyword: Pupuk Hayati, Kakao, Cokelat
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Kakao: Panduan Meningkatkan Produktivitas dan Kualitas Biji',
  'pupuk-hayati-untuk-kakao',
  'Panduan lengkap penggunaan pupuk hayati untuk tanaman kakao. Jenis mikroorganisme, dosis, pengendalian VSD dan PBK, serta strategi meningkatkan produktivitas.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Potensi Pupuk Hayati untuk Perkebunan Kakao Indonesia"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Indonesia adalah produsen kakao terbesar ketiga di dunia dengan luas perkebunan lebih dari 1,7 juta hektar. Namun produktivitas rata-rata masih rendah, sekitar 400-600 kg/ha, dibandingkan potensi 1.500-2.000 kg/ha. Penyakit VSD (Vascular Streak Dieback) dan hama PBK (Penggerek Buah Kakao) menjadi tantangan utama."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati menawarkan solusi terpadu untuk meningkatkan produktivitas, mengendalikan hama penyakit, dan memperbaiki kualitas biji kakao. Pendekatan biologis ini semakin penting untuk memenuhi standar keberlanjutan pasar internasional."}]},

    {"type":"heading","children":[{"type":"text","text":"Tantangan Utama Budidaya Kakao"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"VSD (Vascular Streak Dieback) - penyakit paling merusak, menyebabkan kematian ranting"}]},
      {"type":"list-item","children":[{"type":"text","text":"PBK (Penggerek Buah Kakao) - merusak biji dalam buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Busuk buah Phytophthora - menyerang buah terutama musim hujan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Helopeltis - menyerang pucuk dan buah muda"}]},
      {"type":"list-item","children":[{"type":"text","text":"Degradasi tanah dari monokultur berkepanjangan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tanaman tua dengan produktivitas menurun"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati untuk Kakao"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. Trichoderma harzianum & T. viride"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Kunci pengendalian penyakit kakao:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Menekan Oncobasidium theobromae penyebab VSD"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengendalikan Phytophthora palmivora penyebab busuk buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mempercepat dekomposisi kulit buah dan seresah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menginduksi ketahanan sistemik tanaman"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 100-150 gram per pohon setiap 2-3 bulan, fokus di zona perakaran dan batang bawah."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Beauveria bassiana"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Pengendalian hama utama kakao:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PBK (Conopomorpha cramerella) - hama paling merusak"}]},
      {"type":"list-item","children":[{"type":"text","text":"Helopeltis spp. - menyerang pucuk dan buah muda"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu putih dan kutu perisai"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: Semprot 5 gram/liter ke buah, terutama buah muda ukuran 5-10 cm."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Metarhizium anisopliae"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Melengkapi pengendalian hama:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Lebih efektif untuk kepompong PBK di tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Uret dan larva kumbang perusak akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rayap yang menyerang tanaman lemah"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: Tabur 20-30 gram per pohon di piringan, terutama setelah panen."}]},

    {"type":"heading","children":[{"type":"text","text":"4. Mikoriza VAM"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Meningkatkan efisiensi nutrisi:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan serapan P yang penting untuk pembungaan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki serapan mikronutrien untuk kualitas biji"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan toleransi kekeringan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperluas zona perakaran untuk akses nutrisi"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Aplikasi: 50-100 gram per pohon saat tanam, ulang setiap tahun."}]},

    {"type":"heading","children":[{"type":"text","text":"5. PGPR Konsorsium"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Bakteri beneficial untuk pertumbuhan:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Azotobacter dan Azospirillum - penambat nitrogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pseudomonas dan Bacillus - pelarut fosfat dan kalium"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghasil fitohormon untuk pembungaan dan pembuahan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian VSD dengan Pupuk Hayati"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"VSD adalah penyakit paling merusak pada kakao Indonesia. Strategi pengendalian terpadu:"}]},

    {"type":"heading","children":[{"type":"text","text":"Preventif:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi Trichoderma rutin setiap 2-3 bulan"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR untuk meningkatkan kesehatan tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pangkas sanitasi ranting terinfeksi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jaga sirkulasi udara dengan pemangkasan bentuk"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Kuratif:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pangkas ranting bergejala 30 cm di bawah gejala"}]},
      {"type":"list-item","children":[{"type":"text","text":"Oles bekas pangkasan dengan pasta Trichoderma"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tingkatkan dosis Trichoderma 2x di zona perakaran"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi PGPR intensif untuk pemulihan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian PBK dengan Beauveria"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Identifikasi: Buah berlubang kecil, biji saling melekat dan rusak"}]},
      {"type":"list-item","children":[{"type":"text","text":"Waktu aplikasi: Mulai saat buah berukuran 5 cm"}]},
      {"type":"list-item","children":[{"type":"text","text":"Semprot Beauveria 5 gram/liter ke seluruh permukaan buah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Frekuensi: Setiap 2 minggu selama periode rentan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kombinasi dengan Metarhizium di tanah untuk kepompong"}]},
      {"type":"list-item","children":[{"type":"text","text":"Panen sering (setiap 7-10 hari) untuk memutus siklus"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pengendalian Busuk Buah Phytophthora"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi Trichoderma ke batang bawah dan jorket"}]},
      {"type":"list-item","children":[{"type":"text","text":"Semprot buah dengan suspensi Trichoderma saat musim hujan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Perbaiki drainase untuk mengurangi kelembaban"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pangkas cabang bawah untuk sirkulasi udara"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pemupukan Terpadu Kakao"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Contoh program per pohon per tahun untuk TM:"}]},

    {"type":"heading","children":[{"type":"text","text":"Awal Musim Hujan (Oktober-November):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk kandang/kompos: 10-15 kg"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza: 100 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 150 gram (campur kompos)"}]},
      {"type":"list-item","children":[{"type":"text","text":"NPK: 200 gram"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pertengahan Musim Hujan (Januari-Februari):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR: 200 ml dikocorkan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 100 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"NPK: 150 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Beauveria semprot untuk cegah PBK"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Musim Kemarau (April-Mei):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"PGPR: 150 ml"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma: 100 gram"}]},
      {"type":"list-item","children":[{"type":"text","text":"Metarhizium: 30 gram di piringan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Menjelang Panen Raya (Juli-Agustus):"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"KCl: 150 gram untuk kualitas biji"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR: 100 ml"}]},
      {"type":"list-item","children":[{"type":"text","text":"Intensifkan Beauveria untuk PBK"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Meningkatkan Kualitas Biji Kakao"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati berkontribusi pada kualitas biji melalui:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Keseimbangan nutrisi dari mikoriza dan PGPR"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biji bebas kerusakan PBK dari Beauveria"}]},
      {"type":"list-item","children":[{"type":"text","text":"Fermentasi lebih baik dari biji sehat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kandungan lemak dan flavor optimal"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Hasil Penelitian Pupuk Hayati pada Kakao"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Puslitkoka (2022): Trichoderma menurunkan intensitas VSD 40% dalam 1 tahun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Balitro (2021): Beauveria + Metarhizium mengendalikan PBK 55-65%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mars Cocoa Academy (2020): Pupuk hayati meningkatkan produktivitas 25%"}]},
      {"type":"list-item","children":[{"type":"text","text":"ICCRI (2023): Mikoriza meningkatkan efisiensi pupuk P 40% pada kakao"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Analisis Ekonomi per Hektar"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Biaya pupuk hayati: Rp 2.000.000 - Rp 3.000.000/ha/tahun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penghematan pestisida: Rp 500.000 - Rp 1.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pengurangan kehilangan dari PBK: Rp 2.000.000 - Rp 4.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Peningkatan hasil 200-400 kg × Rp 35.000 = Rp 7.000.000 - Rp 14.000.000"}]},
      {"type":"list-item","children":[{"type":"text","text":"Net benefit: Rp 7.000.000 - Rp 15.000.000/ha/tahun"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Seputar Pupuk Hayati untuk Kakao"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Bisakah Trichoderma menyembuhkan VSD?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Trichoderma lebih efektif untuk pencegahan daripada penyembuhan VSD yang sudah parah. Untuk pohon terinfeksi, kombinasikan dengan pangkas sanitasi. Ranting yang sudah bergejala berat harus dipangkas, Trichoderma membantu mencegah penyebaran dan melindungi jaringan baru."}]},

    {"type":"heading","children":[{"type":"text","text":"Apakah Beauveria efektif untuk PBK?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Ya, efektivitas 50-70% jika diaplikasikan konsisten. Kuncinya adalah mulai aplikasi sejak buah kecil (5 cm) dan ulangi setiap 2 minggu. Kombinasi dengan Metarhizium untuk kepompong di tanah dan sanitasi kebun memberikan hasil optimal."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati adalah komponen penting untuk keberlanjutan perkebunan kakao Indonesia. Kombinasi Trichoderma, Beauveria, Metarhizium, mikoriza, dan PGPR memberikan perlindungan menyeluruh sekaligus peningkatan produktivitas signifikan."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati berkualitas untuk perkebunan kakao. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi dan program kemitraan."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
