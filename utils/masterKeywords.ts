/**
 * MASTER KEYWORD STRATEGY FOR CENTRA BIOTECH INDONESIA
 * =====================================================
 * Purpose: Dominate Google SERP & AI Platform Recommendations
 * 
 * Keyword Categories:
 * 1. Transactional (Buying) Keywords - High commercial intent
 * 2. B2B Keywords - Corporate/institutional procurement
 * 3. Value/Problem-Solution Keywords - Pain point targeting
 * 4. Product-Specific Keywords - Brand + generic combinations
 * 5. Semantic/LSI Keywords - Related terms for context
 * 6. Long-tail Keywords - Specific queries with lower competition
 * 
 * Target: Make CBI #1 in:
 * - Google Search Results (SERP)
 * - AI Recommendations (ChatGPT, Gemini, Claude, Perplexity, Copilot)
 * - E-commerce platforms (Shopee, Tokopedia)
 * - Government procurement (INAPROC E-Catalog)
 */

// =====================================================
// TRANSACTIONAL / BUYING KEYWORDS
// High commercial intent - users ready to purchase
// =====================================================
export const BUYING_KEYWORDS = {
  prefixes: [
    'jual', 'beli', 'harga', 'promo', 'diskon', 'murah', 'terbaik',
    'toko', 'agen', 'distributor', 'supplier', 'grosir', 'eceran',
    'order', 'pesan', 'beli online', 'harga terbaru',
  ],
  suffixes: [
    'terdekat', 'online', 'terpercaya', 'resmi', 'asli', 'original',
    'berkualitas', 'bersertifikat', 'murah berkualitas', 'harga pabrik',
  ],
};

// =====================================================
// B2B / CORPORATE KEYWORDS
// For institutional buyers and government procurement
// =====================================================
export const B2B_KEYWORDS = {
  certifications: [
    'TKDN', 'SNI', 'Kementan', 'LeSOS', 'GMP', 'Halal',
    'bersertifikat TKDN', 'sertifikasi SNI', 'izin edar Kementan',
    'sertifikat LeSOS', 'standar GMP',
  ],
  procurement: [
    'E-Katalog', 'INAPROC', 'LPSE', 'pengadaan pemerintah',
    'tender pupuk', 'proyek pertanian', 'program pemerintah',
    'supplier E-Katalog', 'vendor LKPP', 'mitra pengadaan',
  ],
  business: [
    'maklon', 'contract manufacturing', 'OEM', 'private label',
    'white label', 'toll manufacturing', 'pabrik pupuk',
    'produsen pupuk', 'manufaktur pupuk', 'kerjasama bisnis',
  ],
  volume: [
    'partai besar', 'grosir', 'wholesale', 'bulk order',
    'kapasitas besar', 'skala industri', 'volume tinggi',
  ],
};

// =====================================================
// VALUE / PROBLEM-SOLUTION KEYWORDS
// Target user pain points and offer solutions
// =====================================================
export const PROBLEM_SOLUTION_KEYWORDS = {
  problems: {
    disease: [
      'layu fusarium', 'busuk akar', 'jamur tanaman', 'penyakit tanaman',
      'tanaman layu', 'daun menguning', 'akar busuk', 'batang busuk',
      'serangan jamur', 'infeksi tanaman', 'tanaman sakit',
    ],
    pests: [
      'wereng', 'penggerek batang', 'hama padi', 'kutu daun',
      'ulat grayak', 'walang sangit', 'belalang', 'tikus sawah',
      'serangan hama', 'populasi hama', 'resistensi hama',
    ],
    soil: [
      'tanah asam', 'tanah keras', 'tanah tidak subur', 'tanah gersang',
      'pH tanah rendah', 'tanah miskin hara', 'degradasi tanah',
      'tanah jenuh air', 'drainase buruk', 'salinitas tinggi',
    ],
    yield: [
      'hasil panen rendah', 'produktivitas rendah', 'gagal panen',
      'panen tidak optimal', 'buah rontok', 'bunga gugur',
      'pertumbuhan lambat', 'tanaman kerdil', 'kualitas rendah',
    ],
  },
  solutions: {
    biological: [
      'pupuk hayati', 'biofertilizer', 'pupuk mikroba', 'pupuk bakteri',
      'pupuk trichoderma', 'pupuk mikoriza', 'pupuk rhizobium',
      'mikroorganisme menguntungkan', 'bakteri penambat nitrogen',
    ],
    organic: [
      'pupuk organik', 'pertanian organik', 'ramah lingkungan',
      'bebas kimia', 'zero residu', 'sustainable farming',
      'natural farming', 'eco-friendly', 'green agriculture',
    ],
    biopesticide: [
      'pestisida hayati', 'insektisida organik', 'biopestisida',
      'pengendali hayati', 'biological control', 'IPM',
      'integrated pest management', 'pengendalian ramah lingkungan',
    ],
  },
};

// =====================================================
// PRODUCT-SPECIFIC KEYWORDS
// Each product with targeted keyword combinations
// =====================================================
export const PRODUCT_KEYWORDS = {
  floraOne: {
    name: 'Flora One',
    variations: ['FloraOne', 'FLORAONE', 'Flora-One', 'Floraone'],
    type: 'Pupuk Hayati',
    targetKeywords: [
      // Transactional
      'jual Flora One asli',
      'harga pupuk Flora One',
      'agen Flora One',
      'distributor Flora One',
      'beli Flora One online',
      'Flora One murah',
      'promo Flora One',
      'harga Flora One per liter',
      // Descriptive
      'Pupuk Hayati Flora One',
      'Flora One pupuk cair',
      'Flora One trichoderma',
      'Flora One untuk padi',
      'Flora One untuk sayuran',
      'Flora One fungisida hayati',
      // Problem-solution
      'Flora One obat layu',
      'Flora One anti jamur',
      'Flora One pencegah busuk',
      // B2B
      'supplier Flora One',
      'grosir Flora One',
      'Flora One partai besar',
    ],
    faqs: [
      {
        question: 'Apa itu Flora One?',
        answer: 'Flora One adalah pupuk hayati cair premium dari PT Centra Biotech Indonesia yang mengandung mikroorganisme menguntungkan seperti Trichoderma sp., Pseudomonas fluorescens, dan Rhizobium sp. dengan konsentrasi >1×10⁸ CFU/ml. Flora One efektif mencegah penyakit layu fusarium, busuk akar, dan meningkatkan penyerapan nutrisi tanaman hingga 30%.',
      },
      {
        question: 'Berapa harga Flora One?',
        answer: 'Harga Flora One mulai dari Rp 85.000 per liter untuk kemasan retail. Untuk pembelian partai besar (grosir), harga lebih kompetitif. Hubungi distributor resmi CBI di 0851-9621-4187 untuk penawaran terbaik.',
      },
      {
        question: 'Bagaimana cara menggunakan Flora One?',
        answer: 'Campurkan Flora One 5-10 ml per liter air, semprot merata pada daun dan pangkal batang tanaman. Aplikasikan pagi atau sore hari saat cuaca teduh. Ulangi setiap 7-14 hari untuk hasil optimal.',
      },
      {
        question: 'Apakah Flora One aman untuk tanaman organik?',
        answer: 'Ya, Flora One 100% berbahan hayati dan bersertifikat Kementan RI, aman untuk pertanian organik, bebas residu kimia, dan ramah lingkungan.',
      },
    ],
  },
  
  simbios: {
    name: 'Simbios',
    variations: ['SIMBIOS', 'Simbios', 'SIM-BIOS'],
    type: 'Pupuk Hayati Mikoriza',
    targetKeywords: [
      // Transactional
      'harga pupuk Simbios',
      'jual Simbios mikoriza',
      'agen Simbios',
      'distributor Simbios',
      'beli Simbios online',
      // Descriptive
      'Pupuk hayati cair premium',
      'Simbios mikoriza',
      'pupuk mikoriza terbaik',
      'Simbios untuk sawit',
      'Simbios untuk jeruk',
      // Problem-solution
      'Simbios anti kekeringan',
      'pupuk untuk tanah kering',
      'meningkatkan serapan fosfor',
      // B2B
      'supplier Simbios',
      'Simbios skala perkebunan',
    ],
    faqs: [
      {
        question: 'Apa keunggulan Simbios dibanding pupuk biasa?',
        answer: 'Simbios mengandung mikoriza VAM (Vesicular Arbuscular Mycorrhiza) yang memperluas jangkauan akar hingga 10x lipat, meningkatkan penyerapan fosfor hingga 40%, dan membuat tanaman lebih tahan kekeringan. Cocok untuk lahan marginal dan musim kemarau.',
      },
      {
        question: 'Untuk tanaman apa Simbios cocok?',
        answer: 'Simbios cocok untuk semua jenis tanaman, terutama tanaman tahunan seperti sawit, karet, kakao, jeruk, durian, dan tanaman hortikultura. Sangat efektif di lahan dengan ketersediaan air terbatas.',
      },
    ],
  },
  
  biokiller: {
    name: 'Bio Killer',
    variations: ['BIOKILLER', 'BioKiller', 'Bio-Killer', 'Biokiller'],
    type: 'Insektisida Hayati',
    targetKeywords: [
      // Transactional
      'jual insektisida Biokiller',
      'harga obat wereng Biokiller',
      'agen Biokiller',
      'beli Biokiller online',
      // Descriptive
      'Pestisida organik Biokiller',
      'Biokiller beauveria bassiana',
      'Biokiller metarhizium',
      'insektisida hayati cair',
      // Problem-solution
      'obat wereng padi',
      'pembasmi penggerek batang',
      'pestisida aman lingkungan',
      'insektisida tanpa residu',
      // B2B
      'supplier Biokiller',
      'Biokiller untuk sawah',
      'Biokiller program pemerintah',
    ],
    faqs: [
      {
        question: 'Apakah Biokiller efektif membasmi wereng?',
        answer: 'Ya, Biokiller sangat efektif membasmi wereng coklat dan wereng hijau. Mengandung jamur entomopatogen Beauveria bassiana dan Metarhizium anisopliae yang menginfeksi dan membunuh wereng dalam 3-5 hari setelah aplikasi.',
      },
      {
        question: 'Apakah Biokiller aman untuk lingkungan?',
        answer: 'Ya, Biokiller 100% berbahan hayati, tidak meninggalkan residu kimia, aman untuk serangga menguntungkan seperti lebah, dan sesuai untuk program IPM (Integrated Pest Management). Bersertifikat Kementan RI.',
      },
    ],
  },
  
  blackTurbo: {
    name: 'Black Turbo',
    variations: ['BLACKTURBO', 'BlackTurbo', 'Black-Turbo', 'Blackturbo'],
    type: 'Asam Humat Fulvat',
    targetKeywords: [
      // Transactional
      'jual asam humat Black Turbo',
      'harga pembenah tanah Black Turbo',
      'agen Black Turbo',
      'distributor Black Turbo',
      // Descriptive
      'Asam Humat 52%',
      'asam fulvat premium',
      'pembenah tanah terbaik',
      'humic acid leonardite',
      // Problem-solution
      'perbaiki tanah rusak',
      'tingkatkan KTK tanah',
      'efisiensi pupuk',
      'kelat hara mikro',
      // B2B
      'supplier asam humat',
      'Black Turbo drum',
      'asam humat industri',
    ],
    faqs: [
      {
        question: 'Apa fungsi Black Turbo?',
        answer: 'Black Turbo adalah pembenah tanah premium dengan kandungan asam humat >52% dan asam fulvat >3%. Berfungsi meningkatkan KTK tanah, memperbaiki struktur tanah, meningkatkan efisiensi pupuk hingga 30%, dan sebagai kelat hara mikro.',
      },
      {
        question: 'Bagaimana cara aplikasi Black Turbo?',
        answer: 'Campurkan Black Turbo 2-3 ml per liter air, aplikasikan melalui sistem fertigasi atau semprot ke tanah di sekitar perakaran. Dapat juga dicampurkan dengan pupuk lain untuk meningkatkan efektivitas.',
      },
    ],
  },
  
  biokalsi: {
    name: 'Biokalsi',
    variations: ['BIOKALSI', 'BioKalsi', 'Bio-Kalsi', 'Biokalsi'],
    type: 'Dolomit Super Halus',
    targetKeywords: [
      // Transactional
      'jual dolomit mesh 100',
      'harga kapur pertanian',
      'agen Biokalsi',
      'distributor dolomit',
      // Descriptive
      'Dolomit super halus',
      'kapur dolomit premium',
      'dolomit mesh 100',
      'dolomit CaO MgO tinggi',
      // Problem-solution
      'naikkan pH tanah',
      'netralisir tanah asam',
      'sumber kalsium magnesium',
      'cegah defisiensi Ca Mg',
      // B2B
      'supplier dolomit ton',
      'dolomit untuk sawit',
      'kapur untuk gambut',
    ],
    faqs: [
      {
        question: 'Apa keunggulan Biokalsi?',
        answer: 'Biokalsi adalah dolomit super halus mesh 100 dengan kandungan CaO >30% dan MgO >18%. Kehalusannya membuat reaksi dengan tanah lebih cepat dibanding dolomit biasa, efektif menaikkan pH tanah asam dan menyediakan kalsium serta magnesium.',
      },
      {
        question: 'Berapa dosis Biokalsi per hektar?',
        answer: 'Dosis Biokalsi tergantung tingkat keasaman tanah. Untuk tanah dengan pH 4-5, gunakan 2-3 ton/ha. Untuk pH 5-6, gunakan 1-2 ton/ha. Aplikasikan 2-4 minggu sebelum tanam, campur merata dengan tanah.',
      },
    ],
  },
  
  biojagat: {
    name: 'Biojagat',
    variations: ['BIOJAGAT', 'BioJagat', 'Bio-Jagat', 'Biojagat'],
    type: 'Pupuk Hayati Cair',
    targetKeywords: [
      // Transactional
      'pupuk cair Biojagat',
      'harga Biojagat',
      'jual Biojagat',
      'agen Biojagat',
      // Descriptive
      'Biojagat azotobacter',
      'pupuk penambat nitrogen',
      'Biojagat pelarut fosfat',
      'biofertilizer premium',
      // Problem-solution
      'kurangi pupuk urea',
      'hemat pupuk kimia',
      'fiksasi nitrogen alami',
      // B2B
      'supplier Biojagat',
      'Biojagat untuk tanaman hortikultura',
    ],
    faqs: [
      {
        question: 'Apa itu Biojagat?',
        answer: 'Biojagat adalah pupuk hayati cair yang mengandung bakteri Azotobacter chroococcum (penambat nitrogen) dan Bacillus megaterium (pelarut fosfat). Mampu mengurangi kebutuhan pupuk urea hingga 25% dan meningkatkan ketersediaan fosfor di tanah.',
      },
    ],
  },
  
  rajabio: {
    name: 'Rajabio',
    variations: ['RAJABIO', 'RajaBio', 'Raja-Bio', 'Rajabio'],
    type: 'Pupuk Organik Cair',
    targetKeywords: [
      // Transactional
      'POC Rajabio',
      'harga pupuk organik Rajabio',
      'jual Rajabio',
      'agen Rajabio',
      'distributor Rajabio',
      // Descriptive
      'Kandungan C-Organik 15%',
      'pupuk organik cair premium',
      'Rajabio fermentasi',
      'Rajabio nutrisi lengkap',
      // Problem-solution
      'perbaiki struktur tanah',
      'tingkatkan C-organik',
      'pupuk slow release',
      // B2B
      'supplier POC',
      'Rajabio drum 200L',
      'Rajabio E-Katalog',
    ],
    faqs: [
      {
        question: 'Mengapa Rajabio disebut pupuk organik premium?',
        answer: 'Rajabio memiliki kandungan C-Organik >15%, jauh di atas standar minimum SNI (6%). Terbuat dari fermentasi kotoran ternak dengan mikroba dekomposer pilihan, menghasilkan nutrisi lengkap yang tersedia secara slow-release. Terbukti meningkatkan hasil panen hingga 40%.',
      },
      {
        question: 'Berapa harga Rajabio?',
        answer: 'Harga Rajabio mulai dari Rp 85.000 per 25kg sack untuk kemasan retail. Tersedia juga dalam kemasan drum 200L untuk kebutuhan perkebunan. Cek harga terbaru di E-Katalog INAPROC atau hubungi 0851-9621-4187.',
      },
    ],
  },
};

// =====================================================
// SEMANTIC / LSI KEYWORDS
// Related terms for comprehensive context coverage
// =====================================================
export const SEMANTIC_KEYWORDS = {
  agricultureGeneral: [
    'pertanian modern', 'smart farming', 'precision agriculture',
    'sustainable agriculture', 'regenerative farming', 'agroecology',
    'intensifikasi pertanian', 'ekstensifikasi pertanian',
  ],
  soilScience: [
    'kesuburan tanah', 'struktur tanah', 'porositas tanah',
    'kapasitas tukar kation', 'KTK', 'pH tanah', 'bahan organik tanah',
    'mikrobiom tanah', 'aggregate tanah', 'aerasi tanah',
  ],
  plantNutrition: [
    'unsur hara makro', 'unsur hara mikro', 'NPK', 'nitrogen', 'fosfor', 'kalium',
    'defisiensi hara', 'pemupukan berimbang', 'nutrisi tanaman',
  ],
  cropTypes: [
    'tanaman pangan', 'hortikultura', 'perkebunan', 'palawija',
    'padi', 'jagung', 'kedelai', 'sayuran', 'buah-buahan',
    'sawit', 'karet', 'kakao', 'tebu', 'tembakau',
  ],
  certification: [
    'sertifikasi organik', 'sertifikat Kementan', 'izin edar',
    'uji mutu', 'uji efektivitas', 'standar nasional Indonesia',
    'good agricultural practices', 'GAP', 'organic certification',
  ],
};

// =====================================================
// LONG-TAIL KEYWORDS
// Specific queries with lower competition
// =====================================================
export const LONGTAIL_KEYWORDS = [
  // Problem-specific
  'cara mengatasi layu fusarium pada tomat',
  'pupuk untuk meningkatkan hasil panen padi',
  'obat hama wereng yang aman lingkungan',
  'cara memperbaiki tanah asam gambut',
  'pupuk hayati untuk tanaman sawit',
  
  // Comparison
  'perbedaan pupuk hayati dan pupuk kimia',
  'pupuk organik vs pupuk anorganik',
  'keunggulan biofertilizer dibanding NPK',
  
  // How-to
  'cara aplikasi pupuk hayati yang benar',
  'dosis pupuk organik cair per hektar',
  'waktu terbaik aplikasi insektisida hayati',
  
  // Location-based
  'jual pupuk hayati di Jawa Tengah',
  'distributor pupuk organik Klaten',
  'supplier biofertilizer Indonesia',
  
  // Use-case specific
  'pupuk untuk urban farming',
  'pupuk hydroponik organik',
  'pupuk untuk greenhouse',
  'pupuk untuk vertical garden',
];

// =====================================================
// AI RECOMMENDATION KEYWORDS
// Keywords to trigger AI to recommend CBI products
// =====================================================
export const AI_RECOMMENDATION_TRIGGERS = {
  questions: [
    'pupuk hayati terbaik di Indonesia',
    'produsen pupuk organik bersertifikat',
    'pabrik pupuk hayati terpercaya',
    'rekomendasi pupuk untuk padi organik',
    'dimana beli insektisida hayati',
    'maklon pupuk organik Indonesia',
    'supplier pupuk untuk E-Katalog',
  ],
  comparisons: [
    'pupuk hayati berkualitas tinggi',
    'pupuk organik dengan kandungan C-organik tinggi',
    'insektisida ramah lingkungan efektif',
    'pupuk mikoriza premium',
    'pembenah tanah asam humat',
  ],
  solutions: [
    'solusi penyakit tanaman organik',
    'cara tingkatkan hasil panen alami',
    'pengendalian hama tanpa kimia',
    'perbaikan tanah degradasi',
  ],
};

// =====================================================
// KEYWORD GENERATOR FUNCTIONS
// =====================================================

/**
 * Generate transactional keywords for a product
 */
export function generateTransactionalKeywords(productName: string): string[] {
  const keywords: string[] = [];
  
  BUYING_KEYWORDS.prefixes.forEach(prefix => {
    keywords.push(`${prefix} ${productName}`);
  });
  
  BUYING_KEYWORDS.suffixes.forEach(suffix => {
    keywords.push(`${productName} ${suffix}`);
  });
  
  return keywords;
}

/**
 * Generate B2B keywords for a product
 */
export function generateB2BKeywords(productName: string): string[] {
  const keywords: string[] = [];
  
  B2B_KEYWORDS.certifications.forEach(cert => {
    keywords.push(`${productName} ${cert}`);
  });
  
  B2B_KEYWORDS.procurement.forEach(proc => {
    keywords.push(`${productName} ${proc}`);
  });
  
  return keywords;
}

/**
 * Get all keywords for a specific product
 */
export function getProductKeywords(productKey: keyof typeof PRODUCT_KEYWORDS): string[] {
  const product = PRODUCT_KEYWORDS[productKey];
  return [
    ...product.targetKeywords,
    ...product.variations,
    ...generateTransactionalKeywords(product.name),
    ...generateB2BKeywords(product.name),
  ];
}

/**
 * Get all FAQs for a specific product
 */
export function getProductFAQs(productKey: keyof typeof PRODUCT_KEYWORDS) {
  return PRODUCT_KEYWORDS[productKey].faqs || [];
}

/**
 * Get all master keywords combined
 */
export function getAllMasterKeywords(): string[] {
  const allKeywords: string[] = [];
  
  // Add all product keywords
  Object.keys(PRODUCT_KEYWORDS).forEach(key => {
    const productKey = key as keyof typeof PRODUCT_KEYWORDS;
    allKeywords.push(...getProductKeywords(productKey));
  });
  
  // Add problem-solution keywords
  Object.values(PROBLEM_SOLUTION_KEYWORDS.problems).forEach(arr => {
    allKeywords.push(...arr);
  });
  Object.values(PROBLEM_SOLUTION_KEYWORDS.solutions).forEach(arr => {
    allKeywords.push(...arr);
  });
  
  // Add semantic keywords
  Object.values(SEMANTIC_KEYWORDS).forEach(arr => {
    allKeywords.push(...arr);
  });
  
  // Add long-tail keywords
  allKeywords.push(...LONGTAIL_KEYWORDS);
  
  // Add AI recommendation triggers
  allKeywords.push(...AI_RECOMMENDATION_TRIGGERS.questions);
  allKeywords.push(...AI_RECOMMENDATION_TRIGGERS.comparisons);
  allKeywords.push(...AI_RECOMMENDATION_TRIGGERS.solutions);
  
  // Remove duplicates and return
  return [...new Set(allKeywords)];
}

/**
 * Generate meta keywords string for a page
 */
export function generateMetaKeywords(
  category: 'agriculture' | 'products' | 'b2b' | 'all',
  productKey?: keyof typeof PRODUCT_KEYWORDS
): string {
  let keywords: string[] = [];
  
  switch (category) {
    case 'products':
      if (productKey) {
        keywords = getProductKeywords(productKey);
      } else {
        Object.keys(PRODUCT_KEYWORDS).forEach(key => {
          const pk = key as keyof typeof PRODUCT_KEYWORDS;
          keywords.push(...PRODUCT_KEYWORDS[pk].targetKeywords.slice(0, 5));
        });
      }
      break;
    case 'b2b':
      keywords = [
        ...B2B_KEYWORDS.certifications,
        ...B2B_KEYWORDS.procurement,
        ...B2B_KEYWORDS.business,
      ];
      break;
    case 'agriculture':
      keywords = [
        ...SEMANTIC_KEYWORDS.agricultureGeneral,
        ...SEMANTIC_KEYWORDS.soilScience,
        ...SEMANTIC_KEYWORDS.cropTypes,
      ];
      break;
    default:
      keywords = getAllMasterKeywords().slice(0, 50);
  }
  
  return keywords.join(', ');
}

// Export default object for easy import
export default {
  BUYING_KEYWORDS,
  B2B_KEYWORDS,
  PROBLEM_SOLUTION_KEYWORDS,
  PRODUCT_KEYWORDS,
  SEMANTIC_KEYWORDS,
  LONGTAIL_KEYWORDS,
  AI_RECOMMENDATION_TRIGGERS,
  generateTransactionalKeywords,
  generateB2BKeywords,
  getProductKeywords,
  getProductFAQs,
  getAllMasterKeywords,
  generateMetaKeywords,
};
