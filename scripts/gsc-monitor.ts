#!/usr/bin/env tsx

/**
 * GSC (Google Search Console) Performance Monitor
 * 
 * This script provides automated monitoring and reporting for:
 * - Search performance metrics (clicks, impressions, CTR, position)
 * - Target keyword tracking
 * - Indexation status
 * - Period-over-period comparisons
 * 
 * Target Keywords (2025 Campaign):
 * - Pupuk Hayati Cair
 * - Pupuk Organik Cair  
 * - Insektisida Hayati
 * - Bio Pestisida
 * - Pupuk Hayati Terbaik
 * - Distributor Pupuk Organik Cair
 * - Jual Insektisida Hayati
 * - Floraone
 * 
 * @author CBI Technical SEO System
 * @version 1.0.0
 * @date January 2026
 */

interface GSCMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface KeywordData extends GSCMetrics {
  query: string;
  change?: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
}

interface PerformanceReport {
  period: string;
  overall: GSCMetrics;
  targetKeywords: KeywordData[];
  topQueries: KeywordData[];
  issues: string[];
  recommendations: string[];
}

// Target Keywords for Monitoring
const TARGET_KEYWORDS = [
  'pupuk hayati cair',
  'pupuk organik cair',
  'insektisida hayati',
  'bio pestisida',
  'pupuk hayati terbaik',
  'distributor pupuk organik cair',
  'jual insektisida hayati',
  'floraone',
  'rajabio',
  'simbios',
  'bio killer',
  'maklon pupuk',
  'centra biotech',
];

// Position thresholds
const POSITION_TARGETS = {
  EXCELLENT: 3,    // Top 3 = Excellent
  GOOD: 10,        // Page 1 = Good
  IMPROVE: 20,     // Page 2 = Needs improvement
  CRITICAL: 50,    // Beyond page 5 = Critical
};

// CTR benchmarks by position
const CTR_BENCHMARKS: Record<number, number> = {
  1: 0.28,   // Position 1: ~28% CTR
  2: 0.15,   // Position 2: ~15% CTR
  3: 0.11,   // Position 3: ~11% CTR
  4: 0.08,   // Position 4: ~8% CTR
  5: 0.06,   // Position 5: ~6% CTR
  10: 0.02,  // Position 10: ~2% CTR
};

/**
 * Generate performance status based on metrics
 */
function getPerformanceStatus(position: number): string {
  if (position <= POSITION_TARGETS.EXCELLENT) return '🟢 EXCELLENT';
  if (position <= POSITION_TARGETS.GOOD) return '🟡 GOOD';
  if (position <= POSITION_TARGETS.IMPROVE) return '🟠 IMPROVE';
  return '🔴 CRITICAL';
}

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
 * Check if CTR is underperforming for position
 */
function isCTRUnderperforming(ctr: number, position: number): boolean {
  const expectedCTR = getExpectedCTR(position);
  return ctr < expectedCTR * 0.7; // 30% below expected
}

/**
 * Generate recommendations based on metrics
 */
function generateRecommendations(data: KeywordData[]): string[] {
  const recommendations: string[] = [];
  
  data.forEach(keyword => {
    // High impressions but low clicks = title/description issue
    if (keyword.impressions > 100 && keyword.ctr < 0.01) {
      recommendations.push(
        `📝 "${keyword.query}" has ${keyword.impressions} impressions but ${(keyword.ctr * 100).toFixed(2)}% CTR. ` +
        `Consider improving meta title and description for this keyword.`
      );
    }
    
    // Good position but low CTR
    if (keyword.position <= 10 && isCTRUnderperforming(keyword.ctr, keyword.position)) {
      recommendations.push(
        `🎯 "${keyword.query}" ranks at position ${keyword.position.toFixed(1)} but CTR is below expected. ` +
        `Optimize title tags and add rich snippets.`
      );
    }
    
    // Keywords just outside page 1
    if (keyword.position > 10 && keyword.position <= 15) {
      recommendations.push(
        `⬆️ "${keyword.query}" is at position ${keyword.position.toFixed(1)} - just outside page 1. ` +
        `Small improvements could push it to page 1.`
      );
    }
    
    // Keywords with declining position
    if (keyword.change && keyword.change.position > 2) {
      recommendations.push(
        `⚠️ "${keyword.query}" position dropped by ${keyword.change.position.toFixed(1)}. ` +
        `Monitor and investigate potential causes.`
      );
    }
  });
  
  return recommendations.slice(0, 10); // Top 10 recommendations
}

/**
 * Format metrics for display
 */
function formatMetrics(metrics: GSCMetrics): string {
  return `
    Clicks: ${metrics.clicks.toLocaleString()}
    Impressions: ${metrics.impressions.toLocaleString()}
    CTR: ${(metrics.ctr * 100).toFixed(2)}%
    Position: ${metrics.position.toFixed(1)}
  `;
}

/**
 * Generate keyword report table
 */
function generateKeywordTable(keywords: KeywordData[]): string {
  const header = '| Query | Clicks | Impressions | CTR | Position | Status |';
  const divider = '|-------|--------|-------------|-----|----------|--------|';
  
  const rows = keywords.map(k => {
    const status = getPerformanceStatus(k.position);
    return `| ${k.query.substring(0, 30)} | ${k.clicks} | ${k.impressions} | ${(k.ctr * 100).toFixed(2)}% | ${k.position.toFixed(1)} | ${status} |`;
  });
  
  return [header, divider, ...rows].join('\n');
}

/**
 * Main monitoring function
 * This would integrate with GSC MCP tools in production
 */
async function runMonitoring(): Promise<void> {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║         GSC PERFORMANCE MONITOR - CBI Web                   ║');
  console.log('║         centrabiotechindonesia.com                           ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║  Target Keywords:                                            ║');
  console.log('║  - Pupuk Hayati Cair / Pupuk Organik Cair                    ║');
  console.log('║  - Insektisida Hayati / Bio Pestisida                        ║');
  console.log('║  - Pupuk Hayati Terbaik / Floraone                           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📊 Monitoring Configuration:');
  console.log(`   Site: sc-domain:centrabiotechindonesia.com`);
  console.log(`   Keywords tracked: ${TARGET_KEYWORDS.length}`);
  console.log(`   Position targets:`);
  console.log(`     - Excellent: Top ${POSITION_TARGETS.EXCELLENT}`);
  console.log(`     - Good: Top ${POSITION_TARGETS.GOOD}`);
  console.log(`     - Needs Improvement: Top ${POSITION_TARGETS.IMPROVE}`);
  console.log('');
  console.log('📋 To run full monitoring, use the GSC MCP tools:');
  console.log('');
  console.log('   1. Get Performance Overview (28 days):');
  console.log('      mcp_gsc_get_performance_overview');
  console.log('');
  console.log('   2. Get Advanced Analytics with keyword filter:');
  console.log('      mcp_gsc_get_advanced_search_analytics');
  console.log('      filter_dimension: query');
  console.log('      filter_operator: contains');
  console.log('      filter_expression: pupuk hayati');
  console.log('');
  console.log('   3. Compare periods (Month over Month):');
  console.log('      mcp_gsc_compare_search_periods');
  console.log('');
  console.log('   4. Check URL Indexing:');
  console.log('      mcp_gsc_check_indexing_issues');
  console.log('');
  console.log('─'.repeat(60));
  console.log('💡 Quick Health Check Commands:');
  console.log('');
  console.log('   # Check target keyword "insektisida hayati" performance');
  console.log('   filter_expression: insektisida hayati');
  console.log('');
  console.log('   # Check product pages indexation');
  console.log('   urls: /id/produk-layanan/pertanian/biokiller-insektisida-hayati');
  console.log('         /id/produk-layanan/pertanian/rajabio-pupuk-organik');
  console.log('         /id/produk-layanan/pertanian/floraone-pupuk-hayati');
  console.log('');
  console.log('─'.repeat(60));
  console.log('📈 Key Metrics to Monitor:');
  console.log('');
  console.log('   Current baseline (as of last check):');
  console.log('   - Total Clicks (90d): ~871');
  console.log('   - Total Impressions (90d): ~68,726');
  console.log('   - Average CTR: ~1.27%');
  console.log('   - Average Position: ~5.9');
  console.log('');
  console.log('   Target improvements:');
  console.log('   - "insektisida hayati": Position 21.1 → Target: < 10');
  console.log('   - "pupuk hayati terbaik": Increase impressions');
  console.log('   - Overall CTR: 1.27% → Target: > 2%');
  console.log('');
}

// Export for use as module
export {
  TARGET_KEYWORDS,
  POSITION_TARGETS,
  getPerformanceStatus,
  generateRecommendations,
  formatMetrics,
  generateKeywordTable,
  runMonitoring,
};

// Run if executed directly
if (require.main === module) {
  runMonitoring().catch(console.error);
}
