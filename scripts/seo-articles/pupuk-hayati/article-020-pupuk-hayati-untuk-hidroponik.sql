-- ============================================
-- SEO ARTICLE: Pupuk Hayati untuk Hidroponik
-- Keyword: Pupuk Hayati, Hidroponik
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  'Pupuk Hayati untuk Hidroponik: Panduan Lengkap Sistem Tanam Tanpa Tanah',
  'pupuk-hayati-untuk-hidroponik',
  'Panduan lengkap penggunaan pupuk hayati dalam sistem hidroponik. Jenis yang cocok, cara aplikasi, tips integrasi dengan nutrisi AB Mix, dan manfaat untuk tanaman.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Bisakah Pupuk Hayati Digunakan untuk Hidroponik?"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pertanyaan ini sering muncul karena hidroponik identik dengan sistem steril dan pupuk kimia presisi. Jawabannya adalah YA, pupuk hayati dapat dan sebaiknya digunakan dalam hidroponik. Konsep hidroponik organik atau bioponic semakin populer dan terbukti menghasilkan produk berkualitas lebih tinggi."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Mikroorganisme beneficial dapat hidup di zona perakaran (rhizosphere) tanaman hidroponik, meskipun tidak ada tanah. Mereka menempel pada akar dan media tanam, memberikan manfaat yang sama seperti pada pertanian konvensional."}]},

    {"type":"heading","children":[{"type":"text","text":"Mengapa Menambahkan Pupuk Hayati ke Hidroponik?"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan penyerapan nutrisi - mikroba membantu tanaman menyerap nutrisi lebih efisien"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mencegah penyakit akar - Trichoderma dan Bacillus melindungi dari Pythium dan Fusarium"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menghasilkan fitohormon alami - untuk pertumbuhan dan pembuahan optimal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan kualitas hasil - rasa lebih baik, nutrisi lebih tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengurangi ketergantungan pada nutrisi sintetis"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mendukung sertifikasi organik untuk nilai tambah produk"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menstabilkan sistem - mikroba membantu buffer pH dan EC"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Jenis Pupuk Hayati yang Cocok untuk Hidroponik"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"1. PGPR (Plant Growth Promoting Rhizobacteria)"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Paling cocok untuk hidroponik karena:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Bakteri mudah larut dan terdispersi dalam larutan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tidak menyumbat sistem irigasi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Cepat berkolonisasi di akar"}]},
      {"type":"list-item","children":[{"type":"text","text":"Toleran terhadap berbagai kondisi pH dan EC"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Rekomendasi: Bacillus subtilis, Pseudomonas fluorescens, Azospirillum brasilense."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Trichoderma spp."}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sangat penting untuk pencegahan penyakit:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mencegah Pythium (damping-off) - masalah umum hidroponik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menekan Fusarium dan Rhizoctonia"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menghasilkan enzim yang membantu penyerapan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dapat ditambahkan ke media tanam atau larutan"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"Catatan: Gunakan formulasi spora untuk mencegah penyumbatan sistem."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Bakteri Nitrifikasi"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Untuk sistem aquaponik atau organik:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Nitrosomonas - mengubah ammonia menjadi nitrit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Nitrobacter - mengubah nitrit menjadi nitrat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Esensial untuk sistem aquaponik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Membantu stabilisasi larutan nutrisi organik"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"4. Bakteri Pelarut Fosfat"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Meningkatkan ketersediaan P:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Melarutkan presipitat fosfat yang terbentuk di sistem"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan efisiensi penggunaan nutrisi P"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengurangi pembentukan kerak di pipa dan emitter"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pupuk Hayati yang Kurang Cocok untuk Hidroponik"}],"level":2},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza - memerlukan media padat untuk berasosiasi, tidak cocok untuk NFT/DFT"}]},
      {"type":"list-item","children":[{"type":"text","text":"Rhizobium - spesifik untuk legum dan memerlukan nodul akar di tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk hayati formulasi padat/granul - berpotensi menyumbat sistem"}]},
      {"type":"list-item","children":[{"type":"text","text":"Produk dengan bahan organik tinggi - meningkatkan BOD dan pertumbuhan alga"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Cara Aplikasi Pupuk Hayati pada Berbagai Sistem Hidroponik"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Sistem NFT (Nutrient Film Technique):"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Gunakan hanya formulasi cair yang sudah difilter"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tambahkan PGPR 50-100 ml per 100 liter larutan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi setiap pergantian larutan atau setiap minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pastikan aerasi cukup untuk bakteri aerob"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Sistem DFT (Deep Flow Technique):"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Lebih toleran terhadap pupuk hayati dibanding NFT"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis PGPR 100-150 ml per 100 liter"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma dapat ditambahkan langsung ke larutan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Monitor kualitas air dan ganti jika keruh berlebihan"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Sistem Drip/Irigasi Tetes:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Gunakan filter 100-200 mesh untuk mencegah penyumbatan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi terpisah dari nutrisi utama"}]},
      {"type":"list-item","children":[{"type":"text","text":"Flushing sistem setelah aplikasi pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis 100-200 ml per 100 liter, setiap 1-2 minggu"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Sistem Dutch Bucket:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi langsung ke media (perlite, hydroton)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma 5-10 gram per bucket"}]},
      {"type":"list-item","children":[{"type":"text","text":"PGPR disiramkan ke media, 50 ml per bucket per minggu"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mikoriza bisa digunakan untuk tanaman buah di dutch bucket"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Sistem Wick dan Kratky:"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Tambahkan PGPR saat pembuatan larutan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma di media tanam (rockwool, hidroton)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dosis lebih rendah karena volume kecil: 10-20 ml per liter"}]},
      {"type":"list-item","children":[{"type":"text","text":"Refresh larutan lebih sering (setiap 1-2 minggu)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Integrasi Pupuk Hayati dengan AB Mix"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Prinsip dasar integrasi:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Jangan campur pupuk hayati dengan stok A atau B - konsentrasi terlalu tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tambahkan ke larutan akhir yang sudah diencerkan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Beri jeda 30 menit setelah pencampuran nutrisi sebelum menambah pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"pH optimal 5.5-6.5 untuk aktivitas mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"EC tinggi (>3.0 mS/cm) dapat menekan aktivitas beberapa bakteri"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Program Pupuk Hayati untuk Selada Hidroponik"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Contoh jadwal untuk sistem NFT:"}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Semai: Rendam rockwool di larutan PGPR 10 ml/L selama 30 menit"}]},
      {"type":"list-item","children":[{"type":"text","text":"Transplanting: Celup akar di PGPR sebelum tanam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu 1-2: PGPR 50 ml/100 L saat pergantian larutan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Minggu 3-4: PGPR 75 ml/100 L"}]},
      {"type":"list-item","children":[{"type":"text","text":"Preventif Pythium: Trichoderma 25 ml/100 L setiap 2 minggu"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Troubleshooting Masalah Hidroponik dengan Pupuk Hayati"}],"level":2},

    {"type":"heading","children":[{"type":"text","text":"Pythium/Busuk Akar:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Tingkatkan dosis Trichoderma 2x dari normal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tambahkan Bacillus subtilis untuk kompetisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Turunkan suhu larutan ke <25°C"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tingkatkan aerasi untuk oksigen terlarut"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Pertumbuhan Lambat:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Gunakan PGPR penghasil IAA (Azospirillum)"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pastikan pH optimal untuk aktivitas mikroba"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aplikasi lebih sering (setiap 5 hari)"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Alga Berlebihan:"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Kurangi paparan cahaya ke larutan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jangan gunakan pupuk hayati dengan bahan organik tinggi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Trichoderma dapat membantu kompetisi dengan alga"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Tips Sukses Menggunakan Pupuk Hayati di Hidroponik"}],"level":2},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pilih produk khusus hidroponik atau formulasi cair murni"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mulai dengan dosis rendah, tingkatkan bertahap"}]},
      {"type":"list-item","children":[{"type":"text","text":"Monitor pH dan EC lebih sering saat menggunakan pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"Jaga suhu larutan <28°C untuk aktivitas optimal"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pastikan aerasi cukup - mikroba aerob butuh oksigen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ganti larutan lebih sering jika menggunakan pupuk hayati"}]},
      {"type":"list-item","children":[{"type":"text","text":"Catat hasil untuk optimalisasi sistem Anda"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Seputar Pupuk Hayati untuk Hidroponik"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Apakah pupuk hayati membuat air nutrisi keruh?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Sedikit kekeruhan normal dan bukan masalah. Namun jika sangat keruh, kemungkinan ada pertumbuhan mikroba berlebihan atau kontaminasi. Kurangi dosis dan tingkatkan aerasi."}]},

    {"type":"heading","children":[{"type":"text","text":"Bisakah mikoriza digunakan di hidroponik?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Mikoriza kurang cocok untuk sistem air (NFT, DFT) karena memerlukan media padat. Namun untuk sistem dengan media (dutch bucket dengan perlite, cocopeat), mikoriza bisa digunakan dengan efektivitas lebih rendah dibanding di tanah."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati dapat meningkatkan performa sistem hidroponik dengan mencegah penyakit, meningkatkan penyerapan nutrisi, dan menghasilkan produk berkualitas lebih tinggi. Kunci sukses adalah memilih jenis yang tepat dan teknik aplikasi yang sesuai dengan sistem."}]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan pupuk hayati dengan formulasi khusus untuk hidroponik. Hubungi kami di 0851 8328 4691 atau email centrabioindo@gmail.com untuk konsultasi kebutuhan sistem hidroponik Anda."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
