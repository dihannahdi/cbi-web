-- ============================================
-- SEO ARTICLE: Jenis-Jenis Pupuk Hayati
-- Keyword: Pupuk Hayati, Jenis Pupuk Hayati
-- Word Count Target: 2,500+ words
-- PT Centra Biotech Indonesia
-- ============================================

INSERT INTO blogs (id, document_id, title, slug, short_description, type, content, created_at, updated_at, published_at, locale)
VALUES (
  (SELECT COALESCE(MAX(id), 0) + 1 FROM blogs),
  lower(hex(randomblob(16))),
  '15 Jenis Pupuk Hayati Terbaik untuk Pertanian: Fungsi & Cara Penggunaannya',
  'jenis-jenis-pupuk-hayati-terbaik',
  'Panduan lengkap 15 jenis pupuk hayati untuk pertanian: pupuk penambat nitrogen, pelarut fosfat, mikoriza, Trichoderma, dan lainnya. Lengkap dengan fungsi dan cara penggunaan.',
  'maklon',
  '[
    {"type":"heading","children":[{"type":"text","text":"Mengenal Berbagai Jenis Pupuk Hayati untuk Pertanian Modern"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati hadir dalam berbagai jenis dengan fungsi dan kegunaan yang berbeda-beda. Setiap jenis pupuk hayati mengandung mikroorganisme spesifik yang dirancang untuk mengatasi permasalahan tertentu dalam pertanian. Memahami jenis-jenis pupuk hayati akan membantu Anda memilih produk yang tepat sesuai kebutuhan tanaman dan kondisi lahan."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Dalam panduan komprehensif ini, kami akan membahas 15 jenis pupuk hayati yang paling populer dan efektif digunakan dalam pertanian Indonesia. Setiap jenis akan dijelaskan secara detail mencakup mikroorganisme yang terkandung, mekanisme kerja, manfaat, dan rekomendasi penggunaannya."}]},

    {"type":"heading","children":[{"type":"text","text":"Klasifikasi Pupuk Hayati Berdasarkan Fungsinya"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Secara umum, pupuk hayati dapat diklasifikasikan menjadi empat kelompok utama berdasarkan fungsinya:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Penambat Nitrogen - mengandung mikroorganisme yang mampu mengikat nitrogen dari udara"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Pelarut Fosfat - mengandung mikroorganisme yang melarutkan fosfat terikat di tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Mikoriza - mengandung jamur yang bersimbiosis dengan akar tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Multifungsi - kombinasi berbagai mikroorganisme dengan fungsi ganda"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"1. Pupuk Hayati Rhizobium"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Rhizobium adalah bakteri penambat nitrogen yang membentuk simbiosis dengan tanaman leguminosa (kacang-kacangan). Bakteri ini membentuk bintil akar (nodul) yang menjadi tempat proses fiksasi nitrogen berlangsung. Satu gram bintil akar aktif dapat mengandung miliaran sel Rhizobium."}]},
    {"type":"heading","children":[{"type":"text","text":"Cara Kerja Rhizobium"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Rhizobium menginfeksi rambut akar tanaman legum dan merangsang pembentukan bintil akar. Di dalam bintil, bakteri mengubah nitrogen atmosfer (N2) menjadi amonia (NH3) menggunakan enzim nitrogenase. Amonia kemudian dikonversi menjadi asam amino yang digunakan tanaman untuk pertumbuhan."}]},
    {"type":"heading","children":[{"type":"text","text":"Manfaat Pupuk Rhizobium"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Menambat nitrogen 100-300 kg N/ha/tahun untuk tanaman kedelai"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengurangi kebutuhan pupuk urea hingga 50-75%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan kandungan protein biji legum"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki kesuburan tanah untuk tanaman berikutnya"}]}
    ]},
    {"type":"heading","children":[{"type":"text","text":"Tanaman yang Cocok"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Kedelai, kacang tanah, kacang hijau, kacang merah, buncis, dan tanaman legum lainnya. Setiap spesies tanaman membutuhkan strain Rhizobium yang spesifik."}]},

    {"type":"heading","children":[{"type":"text","text":"2. Pupuk Hayati Azotobacter"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Azotobacter adalah bakteri penambat nitrogen bebas (non-simbiotik) yang hidup di rizosfer tanaman. Berbeda dengan Rhizobium, Azotobacter tidak memerlukan tanaman inang spesifik dan dapat berasosiasi dengan berbagai jenis tanaman."}]},
    {"type":"heading","children":[{"type":"text","text":"Keunggulan Azotobacter"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Dapat digunakan untuk semua jenis tanaman, tidak terbatas pada legum"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menghasilkan fitohormon auksin, giberelin, dan sitokinin"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mampu menambat 15-25 kg N/ha/tahun"}]},
      {"type":"list-item","children":[{"type":"text","text":"Menghasilkan vitamin B kompleks yang merangsang pertumbuhan akar"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memproduksi pupuk hayati Azotobacter dengan konsentrasi tinggi (>10^8 CFU/ml) untuk hasil optimal."}]},

    {"type":"heading","children":[{"type":"text","text":"3. Pupuk Hayati Azospirillum"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Azospirillum adalah bakteri penambat nitrogen yang sangat efektif untuk tanaman serealia seperti padi, jagung, gandum, dan tebu. Bakteri ini hidup di permukaan akar (rhizoplane) dan dapat masuk ke dalam jaringan akar (endofitik)."}]},
    {"type":"heading","children":[{"type":"text","text":"Hasil Penelitian Azospirillum"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Berbagai penelitian menunjukkan inokulasi Azospirillum dapat meningkatkan hasil panen padi 10-20%, jagung 15-25%, dan tebu 10-15%. Peningkatan ini tidak hanya dari fiksasi nitrogen tetapi juga dari produksi fitohormon yang merangsang pertumbuhan akar."}]},

    {"type":"heading","children":[{"type":"text","text":"4. Pupuk Hayati Pelarut Fosfat (Pseudomonas & Bacillus)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pupuk hayati pelarut fosfat mengandung bakteri seperti Pseudomonas fluorescens dan Bacillus megaterium yang mampu melarutkan fosfat terikat di tanah. Di Indonesia, sekitar 70% tanah pertanian memiliki ketersediaan fosfor rendah karena terikat dengan Al, Fe, atau Ca."}]},
    {"type":"heading","children":[{"type":"text","text":"Mekanisme Pelarutan Fosfat"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Bakteri pelarut fosfat menghasilkan asam organik (asam sitrat, oksalat, glukonat) yang menurunkan pH di sekitar partikel tanah dan melepaskan fosfat terikat. Selain itu, bakteri juga menghasilkan enzim fosfatase yang menghidrolisis fosfat organik."}]},
    {"type":"heading","children":[{"type":"text","text":"Manfaat untuk Pertanian"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan ketersediaan P hingga 30-50%"}]},
      {"type":"list-item","children":[{"type":"text","text":"Mengurangi kebutuhan pupuk SP-36 atau TSP"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pseudomonas juga menghasilkan senyawa antibiotik yang menekan patogen tanah"}]},
      {"type":"list-item","children":[{"type":"text","text":"Efektif untuk tanah masam maupun alkalis"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"5. Pupuk Hayati Mikoriza (VAM)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Mikoriza Vesikular-Arbuskular (VAM) adalah jamur yang membentuk simbiosis dengan akar lebih dari 90% tanaman darat. Hifa jamur memperluas sistem perakaran hingga 100 kali lipat, meningkatkan kemampuan tanaman menyerap air dan hara."}]},
    {"type":"heading","children":[{"type":"text","text":"Struktur Mikoriza"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Hifa eksternal - menyebar di dalam tanah untuk menyerap hara dan air"}]},
      {"type":"list-item","children":[{"type":"text","text":"Arbuskula - struktur percabangan halus tempat pertukaran hara dengan tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Vesikel - struktur penyimpanan cadangan makanan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Spora - struktur reproduksi yang bertahan di tanah"}]}
    ]},
    {"type":"heading","children":[{"type":"text","text":"Manfaat Mikoriza"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan penyerapan P hingga 3-5 kali lipat"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan toleransi terhadap kekeringan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Memperbaiki struktur tanah melalui produksi glomalin"}]},
      {"type":"list-item","children":[{"type":"text","text":"Meningkatkan ketahanan terhadap patogen akar"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"6. Pupuk Hayati Trichoderma"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Trichoderma adalah jamur antagonis yang berfungsi ganda sebagai agen biokontrol dan dekomposer. Jamur ini sangat efektif mengendalikan berbagai patogen tanaman seperti Fusarium, Rhizoctonia, Sclerotium, dan Phytophthora."}]},
    {"type":"heading","children":[{"type":"text","text":"Mekanisme Antagonisme Trichoderma"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Mikoparasitisme - Trichoderma membelit dan menembus hifa jamur patogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Antibiosis - menghasilkan senyawa antibiotik yang menghambat patogen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kompetisi - berkompetisi dengan patogen untuk ruang dan nutrisi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Induksi Resistensi - merangsang sistem pertahanan tanaman"}]}
    ]},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia memproduksi Trichoderma harzianum dan Trichoderma viride dengan kerapatan spora tinggi untuk aplikasi di berbagai tanaman."}]},

    {"type":"heading","children":[{"type":"text","text":"7. Pupuk Hayati Beauveria bassiana"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Beauveria bassiana adalah jamur entomopatogen yang efektif mengendalikan berbagai hama serangga. Meskipun lebih tepat disebut bioinsektisida, produk ini sering dikategorikan sebagai pupuk hayati karena kemasannya yang serupa."}]},
    {"type":"heading","children":[{"type":"text","text":"Target Hama Beauveria"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Wereng coklat dan wereng hijau pada padi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Penggerek batang jagung dan padi"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kutu daun pada berbagai tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kumbang dan belalang"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"8. Pupuk Hayati Metarhizium anisopliae"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Metarhizium anisopliae adalah jamur entomopatogen yang efektif mengendalikan hama tanah seperti uret, rayap, dan larva kumbang. Jamur ini sangat cocok untuk tanaman perkebunan seperti kelapa sawit, karet, dan tebu."}]},

    {"type":"heading","children":[{"type":"text","text":"9. Pupuk Hayati Bacillus thuringiensis (Bt)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Bacillus thuringiensis atau Bt adalah bakteri yang menghasilkan protein kristal insektisidal (Cry protein). Produk berbasis Bt sangat populer untuk mengendalikan ulat atau larva Lepidoptera."}]},
    {"type":"heading","children":[{"type":"text","text":"Keunggulan Bt"}],"level":3},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Sangat selektif - hanya membunuh target tanpa merusak serangga menguntungkan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Aman bagi manusia, hewan, dan lingkungan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Tidak meninggalkan residu pada hasil panen"}]},
      {"type":"list-item","children":[{"type":"text","text":"Dapat digunakan hingga menjelang panen"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"10. Pupuk Hayati PGPR (Plant Growth Promoting Rhizobacteria)"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"PGPR adalah istilah umum untuk bakteri rizosfer yang merangsang pertumbuhan tanaman melalui berbagai mekanisme. Produk PGPR biasanya berisi konsorsium bakteri dengan fungsi yang saling melengkapi."}]},
    {"type":"heading","children":[{"type":"text","text":"Mekanisme PGPR"}],"level":3},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Produksi Fitohormon - auksin, giberelin, sitokinin yang merangsang pertumbuhan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Fiksasi Nitrogen - menambat N dari atmosfer"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pelarutan Fosfat - meningkatkan ketersediaan P"}]},
      {"type":"list-item","children":[{"type":"text","text":"Produksi Siderofor - melarutkan Fe untuk tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Biokontrol - menekan patogen tanah"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"11-15. Jenis Pupuk Hayati Lainnya"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Selain 10 jenis di atas, masih ada beberapa jenis pupuk hayati lain yang juga penting:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Aspergillus niger - pelarut fosfat dan kalium yang sangat efektif"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Lactobacillus - untuk fermentasi dan pengolahan limbah organik"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Paenibacillus - penghasil enzim kitinase untuk biokontrol"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Streptomyces - penghasil antibiotik untuk mengendalikan penyakit tanaman"}]},
      {"type":"list-item","children":[{"type":"text","text":"Pupuk Hayati Konsorsium - kombinasi berbagai mikroorganisme dalam satu produk"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Cara Memilih Jenis Pupuk Hayati yang Tepat"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Pemilihan jenis pupuk hayati harus disesuaikan dengan:"}]},
    {"type":"list","format":"ordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Jenis Tanaman - legum membutuhkan Rhizobium, serealia cocok dengan Azospirillum"}]},
      {"type":"list-item","children":[{"type":"text","text":"Masalah yang Dihadapi - defisiensi N gunakan penambat nitrogen, serangan jamur gunakan Trichoderma"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kondisi Tanah - tanah masam pilih mikroorganisme toleran asam"}]},
      {"type":"list-item","children":[{"type":"text","text":"Ketersediaan Produk - pilih produsen terpercaya dengan jaminan kualitas"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"Rekomendasi Produsen Pupuk Hayati Berkualitas"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"PT Centra Biotech Indonesia menyediakan berbagai jenis pupuk hayati dengan kualitas terjamin. Kami memiliki laboratorium mikrobiologi modern dan tim ahli berpengalaman yang siap membantu Anda memilih produk yang tepat."}]},
    {"type":"list","format":"unordered","children":[
      {"type":"list-item","children":[{"type":"text","text":"Pengalaman 15+ tahun di bidang bioteknologi pertanian"}]},
      {"type":"list-item","children":[{"type":"text","text":"Kapasitas produksi 3.000 ton/bulan"}]},
      {"type":"list-item","children":[{"type":"text","text":"Sertifikasi lengkap: Kementan RI, SNI Organik LeSOS, NIB"}]},
      {"type":"list-item","children":[{"type":"text","text":"Layanan maklon pupuk hayati dengan formulasi custom"}]}
    ]},

    {"type":"heading","children":[{"type":"text","text":"FAQ - Pertanyaan Tentang Jenis Pupuk Hayati"}],"level":2},
    
    {"type":"heading","children":[{"type":"text","text":"Jenis pupuk hayati apa yang paling bagus untuk padi?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Untuk padi, kombinasi Azospirillum (penambat nitrogen) + Pseudomonas (pelarut fosfat) + Trichoderma (biokontrol) memberikan hasil terbaik. Kombinasi ini meningkatkan hasil panen, mengurangi penggunaan pupuk kimia, dan menekan serangan penyakit blast."}]},

    {"type":"heading","children":[{"type":"text","text":"Apakah bisa menggunakan beberapa jenis pupuk hayati sekaligus?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Ya, berbagai jenis pupuk hayati dapat dikombinasikan karena mikroorganismenya tidak saling mengganggu. Bahkan, kombinasi beberapa jenis sering memberikan efek sinergis yang lebih baik dari penggunaan tunggal."}]},

    {"type":"heading","children":[{"type":"text","text":"Berapa harga pupuk hayati per liter?"}],"level":3},
    {"type":"paragraph","children":[{"type":"text","text":"Harga pupuk hayati bervariasi tergantung jenis dan konsentrasi mikroorganisme. Untuk informasi harga terbaru dan pemesanan, hubungi PT Centra Biotech Indonesia di 0851 8328 4691 atau email centrabioindo@gmail.com."}]},

    {"type":"heading","children":[{"type":"text","text":"Kesimpulan"}],"level":2},
    {"type":"paragraph","children":[{"type":"text","text":"Berbagai jenis pupuk hayati tersedia untuk memenuhi kebutuhan pertanian modern. Pemilihan jenis yang tepat sesuai tanaman dan masalah yang dihadapi akan memberikan hasil optimal. Konsultasikan kebutuhan Anda dengan ahli di PT Centra Biotech Indonesia untuk mendapatkan rekomendasi produk terbaik."}]},
    {"type":"paragraph","children":[{"type":"text","text":"Hubungi kami sekarang untuk konsultasi gratis: Telp 0851 8328 4691 | Email centrabioindo@gmail.com | Alamat: Griya Lusah Pratama B6, Klaten, Jawa Tengah 47525."}]}
  ]',
  datetime('now'),
  datetime('now'),
  datetime('now'),
  'id'
);
