#!/usr/bin/env tsx

/**
 * CRITICAL CTR FIX SCRIPT
 * 
 * This script identifies pages with excellent positions but poor CTR
 * and generates recommended title/description optimizations
 * 
 * Based on GSC data from Jan 19, 2026
 */

interface PageOptimization {
  url: string;
  currentPosition: number;
  currentCTR: number;
  expectedCTR: number;
  gap: number;
  currentTitle?: string;
  suggestedTitle: string;
  currentDescription?: string;
  suggestedDescription: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  reasoning: string;
}

// CTR benchmarks by position (industry standard)
const CTR_BENCHMARKS: Record<number, number> = {
  1: 0.28,   // Position 1: ~28% CTR
  2: 0.15,   // Position 2: ~15% CTR
  3: 0.11,   // Position 3: ~11% CTR
  4: 0.08,   // Position 4: ~8% CTR
  5: 0.06,   // Position 5: ~6% CTR
  10: 0.02,  // Position 10: ~2% CTR
};

/**
 * Calculate expected CTR based on position
 */
function getExpectedCTR(position: number): number {
  const roundedPos = Math.round(position);
  if (roundedPos <= 1) return CTR_BENCHMARKS[1];
  if (roundedPos <= 5) return CTR_BENCHMARKS[roundedPos] || 0.05;
  if (roundedPos <= 10) return CTR_BENCHMARKS[10];
  return 0.01;
}

/**
 * Critical pages from GSC report (last 7 days)
 */
const CRITICAL_PAGES: PageOptimization[] = [
  {
    url: 'https://www.centrabiotechindonesia.com/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya',
    currentPosition: 1.0,
    currentCTR: 0.00,
    expectedCTR: 0.28,
    gap: -100,
    currentTitle: 'Pengertian Pupuk Organik: Jenis dan Manfaatnya',
    suggestedTitle: 'Pupuk Organik Terbaik 2026: 7 Jenis, Manfaat & Cara Pakai [Panduan Lengkap]',
    currentDescription: 'Artikel lengkap tentang pupuk organik, jenis-jenis pupuk organik dan manfaatnya untuk tanaman.',
    suggestedDescription: '✅ Panduan lengkap pupuk organik cair & padat terbaik! Jenis, manfaat, cara aplikasi & rekomendasi produk bersertifikat. GRATIS konsultasi ahli: 0851-9621-4187',
    priority: 'CRITICAL',
    reasoning: 'Position #1 with 0% CTR - likely competing with featured snippet. Need compelling title with year, numbers, and benefit-driven copy.'
  },
  {
    url: 'https://www.centrabiotechindonesia.com/blog/penyakit-ganoderma-kelapa-sawit',
    currentPosition: 2.2,
    currentCTR: 0.00,
    expectedCTR: 0.15,
    gap: -100,
    currentTitle: 'Penyakit Ganoderma Kelapa Sawit',
    suggestedTitle: 'Cara Mengatasi Penyakit Ganoderma Kelapa Sawit: Pencegahan & Solusi Terbukti',
    currentDescription: 'Informasi tentang penyakit ganoderma pada kelapa sawit.',
    suggestedDescription: '🛡️ Solusi efektif atasi Ganoderma kelapa sawit! Ciri-ciri, cara pencegahan & pengobatan terbukti. Konsultasi GRATIS dengan ahli: 0851-9621-4187',
    priority: 'CRITICAL',
    reasoning: 'Position #2 with 0% CTR - title too generic. Add action verbs "Cara Mengatasi" and solution-focused approach.'
  },
  {
    url: 'https://www.centrabiotechindonesia.com/blog/perbedaan-sampah-organik-dan-anorganik',
    currentPosition: 7.1,
    currentCTR: 0.04,
    expectedCTR: 0.02,
    gap: -50,
    currentTitle: 'Perbedaan Sampah Organik dan Anorganik',
    suggestedTitle: 'Perbedaan Sampah Organik & Anorganik: Lengkap dengan Contoh & Cara Pengolahan',
    currentDescription: 'Artikel tentang perbedaan sampah organik dan anorganik.',
    suggestedDescription: '📚 Pahami perbedaan sampah organik & anorganik! Contoh lengkap, cara memilah, dan pengolahan jadi pupuk kompos. Baca panduan praktis →',
    priority: 'HIGH',
    reasoning: 'High impressions (4,780) but extremely low CTR (0.04%). Add specifics "Contoh" and "Cara Pengolahan" to match search intent.'
  },
  {
    url: 'https://www.centrabiotechindonesia.com/id',
    currentPosition: 4.0,
    currentCTR: 2.13,
    expectedCTR: 0.08,
    gap: +166,
    currentTitle: 'Centra Biotech Indonesia - Pusat Inovasi Agro-Bioteknologi',
    suggestedTitle: '🌱 Centra Biotech Indonesia: Pabrik Pupuk Hayati & Bio Pestisida Bersertifikat Kementan',
    currentDescription: 'PT Centra Biotech Indonesia adalah perusahaan agro-bioteknologi yang memproduksi pupuk hayati dan bio pestisida.',
    suggestedDescription: '🏭 Produsen #1 Pupuk Hayati Cair & Insektisida Hayati di Indonesia! Bersertifikat Kementan RI. Jasa Maklon & Distributor Resmi. Hub: 0851-9621-4187',
    priority: 'MEDIUM',
    reasoning: 'Already performing above expected CTR (+166%). Minor optimization to include emojis and stronger CTA for conversion.'
  },
  {
    url: 'https://www.centrabiotechindonesia.com/id/rajabio-pupuk-organik-cair',
    currentPosition: 3.0,
    currentCTR: 5.51,
    expectedCTR: 0.11,
    gap: +401,
    currentTitle: 'RAJABIO - Pupuk Organik Cair Premium Bersertifikat',
    suggestedTitle: '🏆 RAJABIO Pupuk Organik Cair: Hasil Panen +40% | Bersertifikat Kementan RI',
    currentDescription: 'RAJABIO pupuk organik cair premium dengan sertifikat Kementerian Pertanian RI.',
    suggestedDescription: '✅ RAJABIO pupuk organik cair terbaik! Tingkatkan panen hingga 40%. C-Organik >10%, harga terjangkau. Shopee/WA ready. 📞 0851-9621-4187',
    priority: 'MEDIUM',
    reasoning: 'Already excellent CTR (+401% above expected). Add quantified benefit "+40%" and direct purchase channels for conversion.'
  }
];

/**
 * Generate optimization report
 */
function generateOptimizationReport(): void {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║         CRITICAL CTR OPTIMIZATION REPORT                     ║');
  console.log('║         Based on GSC Data: Jan 12-18, 2026                   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');

  // Group by priority
  const critical = CRITICAL_PAGES.filter(p => p.priority === 'CRITICAL');
  const high = CRITICAL_PAGES.filter(p => p.priority === 'HIGH');
  const medium = CRITICAL_PAGES.filter(p => p.priority === 'MEDIUM');

  // CRITICAL
  console.log('🔴 CRITICAL PRIORITY (Fix This Week)');
  console.log('─'.repeat(80));
  critical.forEach((page, index) => {
    console.log(`\n${index + 1}. ${page.url}`);
    console.log(`   Position: ${page.currentPosition} | CTR: ${(page.currentCTR * 100).toFixed(2)}% | Expected: ${(page.expectedCTR * 100).toFixed(0)}%`);
    console.log(`   Gap: ${page.gap}% (${page.gap < 0 ? 'UNDERPERFORMING' : 'GOOD'})`);
    console.log('');
    console.log(`   📝 Current Title:`);
    console.log(`      "${page.currentTitle}"`);
    console.log(`   ✅ Suggested Title:`);
    console.log(`      "${page.suggestedTitle}"`);
    console.log('');
    console.log(`   📝 Current Description:`);
    console.log(`      "${page.currentDescription}"`);
    console.log(`   ✅ Suggested Description:`);
    console.log(`      "${page.suggestedDescription}"`);
    console.log('');
    console.log(`   💡 Reasoning: ${page.reasoning}`);
    console.log('');
  });

  // HIGH
  console.log('\n🟡 HIGH PRIORITY (Next 2 Weeks)');
  console.log('─'.repeat(80));
  high.forEach((page, index) => {
    console.log(`\n${index + 1}. ${page.url}`);
    console.log(`   Position: ${page.currentPosition} | CTR: ${(page.currentCTR * 100).toFixed(2)}% | Gap: ${page.gap}%`);
    console.log(`   ✅ Suggested Title: "${page.suggestedTitle}"`);
  });

  // MEDIUM
  console.log('\n🟢 MEDIUM PRIORITY (Optimization)');
  console.log('─'.repeat(80));
  medium.forEach((page, index) => {
    console.log(`\n${index + 1}. ${page.url}`);
    console.log(`   Position: ${page.currentPosition} | CTR: ${(page.currentCTR * 100).toFixed(2)}% | Gap: ${page.gap > 0 ? '+' : ''}${page.gap}%`);
    console.log(`   💡 ${page.reasoning}`);
  });

  // Summary
  console.log('\n\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    IMPLEMENTATION SUMMARY                     ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Total Pages to Optimize: ${CRITICAL_PAGES.length}`);
  console.log(`  🔴 Critical: ${critical.length} pages (0% CTR at top positions)`);
  console.log(`  🟡 High: ${high.length} pages (high impressions, low CTR)`);
  console.log(`  🟢 Medium: ${medium.length} pages (already good, can be better)`);
  console.log('');
  console.log('📋 Implementation Steps:');
  console.log('');
  console.log('1. Update metadata in CMS/Strapi for each page');
  console.log('2. Add FAQ schema to pages with 0% CTR');
  console.log('3. Check for featured snippets and optimize content');
  console.log('4. Monitor CTR changes in GSC after 3-5 days');
  console.log('5. Re-run IndexNow for updated pages');
  console.log('');
  console.log('🎯 Success Metrics (Week 1 Goal):');
  console.log('  - Critical pages: 0% → 10%+ CTR');
  console.log('  - High priority: 0.04% → 1%+ CTR');
  console.log('  - Overall site: 0.74% → 1.5%+ CTR');
  console.log('');
}

// Export for use as module
export {
  CRITICAL_PAGES,
  getExpectedCTR,
  generateOptimizationReport,
};

// Run if executed directly
if (require.main === module) {
  generateOptimizationReport();
}
