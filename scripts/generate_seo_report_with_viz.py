"""
Comprehensive SEO Report Generator with Visualizations
Creates detailed PDF report with charts, graphs, and article-level performance metrics
"""

import json
import sys
from datetime import datetime
from pathlib import Path
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.patches import Rectangle
import numpy as np

# Set style
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.sans-serif'] = ['Arial']

class SEOReportGenerator:
    def __init__(self, output_dir='reports'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.charts_dir = self.output_dir / 'charts'
        self.charts_dir.mkdir(exist_ok=True)
        
        # Color scheme (CBI brand colors)
        self.colors = {
            'primary': '#2E7D32',  # Green
            'secondary': '#1976D2',  # Blue
            'accent': '#F57C00',  # Orange
            'danger': '#D32F2F',  # Red
            'success': '#388E3C',  # Light green
            'warning': '#FFA000'  # Amber
        }
    
    def create_device_performance_chart(self, data):
        """Create device performance comparison chart"""
        print("  📱 Creating device performance chart...")
        
        devices = ['Mobile', 'Desktop', 'Tablet']
        clicks = [201, 126, 0]
        impressions = [9757, 3627, 184]
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
        
        # Clicks by device
        colors_list = [self.colors['primary'], self.colors['secondary'], self.colors['accent']]
        ax1.bar(devices, clicks, color=colors_list, alpha=0.8)
        ax1.set_title('Clicks by Device (30 Days)', fontsize=14, fontweight='bold')
        ax1.set_ylabel('Clicks', fontsize=12)
        ax1.grid(axis='y', alpha=0.3)
        for i, v in enumerate(clicks):
            ax1.text(i, v + 5, str(v), ha='center', fontweight='bold')
        
        # CTR comparison
        ctrs = [2.06, 3.47, 0.00]
        ax2.bar(devices, ctrs, color=colors_list, alpha=0.8)
        ax2.set_title('CTR by Device (%)', fontsize=14, fontweight='bold')
        ax2.set_ylabel('CTR (%)', fontsize=12)
        ax2.grid(axis='y', alpha=0.3)
        for i, v in enumerate(ctrs):
            ax2.text(i, v + 0.1, f'{v:.2f}%', ha='center', fontweight='bold')
        
        plt.tight_layout()
        chart_path = self.charts_dir / 'device_performance.png'
        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"    ✅ Saved: {chart_path}")
        return chart_path
    
    def create_daily_trend_chart(self):
        """Create 30-day daily trend chart"""
        print("  📈 Creating daily trend analysis...")
        
        # Daily data
        dates = ['01/14', '01/15', '01/16', '01/17', '01/18', '01/19', '01/20',
                 '01/21', '01/22', '01/23', '01/24', '01/25', '01/26', '01/27',
                 '01/28', '01/29', '01/30', '01/31', '02/01', '02/02', '02/03',
                 '02/04', '02/05', '02/06', '02/07', '02/08', '02/09', '02/10']
        clicks = [9, 7, 12, 15, 13, 12, 24, 10, 8, 8, 7, 14, 16, 11, 18, 12, 8, 
                  11, 13, 14, 8, 19, 10, 12, 10, 6, 14, 6]
        impressions = [845, 446, 463, 409, 613, 666, 604, 519, 482, 404, 352, 481,
                       452, 414, 451, 342, 334, 310, 429, 447, 529, 592, 512, 492,
                       401, 489, 580, 510]
        
        fig, ax1 = plt.subplots(figsize=(16, 6))
        
        # Clicks line
        ax1.plot(dates, clicks, color=self.colors['primary'], linewidth=2, 
                marker='o', markersize=6, label='Clicks')
        ax1.set_xlabel('Date (2026)', fontsize=12)
        ax1.set_ylabel('Clicks', color=self.colors['primary'], fontsize=12)
        ax1.tick_params(axis='y', labelcolor=self.colors['primary'])
        ax1.grid(alpha=0.3)
        
        # Impressions line (secondary axis)
        ax2 = ax1.twinx()
        ax2.plot(dates, impressions, color=self.colors['secondary'], linewidth=2,
                marker='s', markersize=5, alpha=0.6, label='Impressions')
        ax2.set_ylabel('Impressions', color=self.colors['secondary'], fontsize=12)
        ax2.tick_params(axis='y', labelcolor=self.colors['secondary'])
        
        # Rotate x-axis labels
        plt.setp(ax1.xaxis.get_majorticklabels(), rotation=45, ha='right')
        
        plt.title('30-Day Traffic Trend: Clicks vs Impressions', 
                 fontsize=16, fontweight='bold', pad=20)
        
        # Legend
        lines1, labels1 = ax1.get_legend_handles_labels()
        lines2, labels2 = ax2.get_legend_handles_labels()
        ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper left')
        
        plt.tight_layout()
        chart_path = self.charts_dir / 'daily_trend.png'
        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"    ✅ Saved: {chart_path}")
        return chart_path
    
    def create_top_pages_chart(self):
        """Create top 10 pages performance chart"""
        print("  🏆 Creating top pages ranking...")
        
        pages = [
            'Homepage (/id)',
            'Revolusi Hijau Sawah',
            'RajaBio Product',
            'RajaBio Revolusi Organik',
            'RajaBio (old URL)',
            'FloraOne Product',
            'About Us',
            'Simbios Product',
            'Homepage (root)',
            'English Homepage'
        ]
        clicks = [107, 36, 33, 24, 22, 17, 13, 10, 8, 8]
        ctrs = [2.87, 1.91, 2.35, 2.59, 3.49, 1.86, 0.84, 5.99, 1.20, 3.16]
        
        fig, ax = plt.subplots(figsize=(12, 8))
        
        y_pos = np.arange(len(pages))
        bars = ax.barh(y_pos, clicks, color=self.colors['primary'], alpha=0.8)
        
        # Color code by performance
        for i, (bar, ctr) in enumerate(zip(bars, ctrs)):
            if ctr > 3.0:
                bar.set_color(self.colors['success'])
            elif ctr < 1.5:
                bar.set_color(self.colors['warning'])
        
        ax.set_yticks(y_pos)
        ax.set_yticklabels(pages)
        ax.invert_yaxis()
        ax.set_xlabel('Clicks (30 Days)', fontsize=12)
        ax.set_title('Top 10 Pages by Traffic', fontsize=16, fontweight='bold', pad=20)
        ax.grid(axis='x', alpha=0.3)
        
        # Add CTR labels
        for i, (v, ctr) in enumerate(zip(clicks, ctrs)):
            ax.text(v + 2, i, f'{v} clicks ({ctr}% CTR)', va='center', fontsize=10)
        
        plt.tight_layout()
        chart_path = self.charts_dir / 'top_pages.png'
        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"    ✅ Saved: {chart_path}")
        return chart_path
    
    def create_content_type_performance(self):
        """Create content type comparison chart"""
        print("  📊 Creating content type analysis...")
        
        categories = ['Products\n(8 pages)', 'News\n(13 pages)', 'Blogs\n(3 pages)', 
                     'Other\n(43 pages)']
        clicks = [110, 68, 4, 145]
        impressions = [4654, 4400, 271, 4243]
        avg_ctr = [2.36, 1.55, 1.48, 3.42]
        
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(14, 10))
        
        colors_palette = [self.colors['primary'], self.colors['secondary'], 
                         self.colors['accent'], self.colors['warning']]
        
        # 1. Clicks distribution (pie)
        ax1.pie(clicks, labels=categories, autopct='%1.1f%%', colors=colors_palette,
               startangle=90)
        ax1.set_title('Click Distribution by Content Type', fontweight='bold')
        
        # 2. Impressions comparison (bar)
        ax2.bar(range(len(categories)), impressions, color=colors_palette, alpha=0.8)
        ax2.set_xticks(range(len(categories)))
        ax2.set_xticklabels(categories)
        ax2.set_ylabel('Impressions')
        ax2.set_title('Impressions by Content Type', fontweight='bold')
        ax2.grid(axis='y', alpha=0.3)
        
        # 3. Average CTR comparison
        ax3.bar(range(len(categories)), avg_ctr, color=colors_palette, alpha=0.8)
        ax3.set_xticks(range(len(categories)))
        ax3.set_xticklabels(categories)
        ax3.set_ylabel('CTR (%)')
        ax3.set_title('Average CTR by Content Type', fontweight='bold')
        ax3.grid(axis='y', alpha=0.3)
        ax3.axhline(y=2.41, color='red', linestyle='--', linewidth=2, 
                   label='Overall Avg (2.41%)')
        ax3.legend()
        
        # 4. Performance matrix
        ax4.axis('off')
        performance_text = """
        CONTENT TYPE INSIGHTS:
        
        🏆 Best CTR: Other Pages (3.42%)
           - Homepage, About, Documents
        
        📰 News: Moderate performance
           - 68 clicks from 4,400 impressions
           - Room for CTR improvement
        
        🚨 Blogs: Critical underperformance
           - Only 4 clicks despite good rankings
           - Position #1 with 0% CTR (3 articles)
        
        ✅ Products: Solid baseline
           - 110 clicks, 2.36% CTR
           - Indexing improved from 0% to 75%
        """
        ax4.text(0.1, 0.9, performance_text, transform=ax4.transAxes,
                fontsize=11, verticalalignment='top', family='monospace',
                bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.3))
        
        plt.tight_layout()
        chart_path = self.charts_dir / 'content_type_performance.png'
        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"    ✅ Saved: {chart_path}")
        return chart_path
    
    def create_keyword_performance_chart(self):
        """Create top keywords performance visualization"""
        print("  🔑 Creating keyword performance analysis...")
        
        # Top keywords
        keywords = ['pt centra\nbiotech', 'centra\nbiotech', 'rajabio\npupuk', 
                   'floraone', 'pt centra\n(short)', 'rajabio', 'floraone\npupuk',
                   'pupuk hayati\ncair', 'pt sentra\nbudidaya']
        clicks = [34, 22, 12, 8, 7, 6, 5, 4, 3]
        impressions = [133, 117, 42, 112, 20, 85, 44, 137, 162]
        ctr = [25.56, 18.80, 28.57, 7.14, 35.00, 7.06, 11.36, 2.92, 1.85]
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
        
        # Clicks by keyword
        y_pos = np.arange(len(keywords))
        bars1 = ax1.barh(y_pos, clicks, color=self.colors['primary'], alpha=0.8)
        ax1.set_yticks(y_pos)
        ax1.set_yticklabels(keywords)
        ax1.invert_yaxis()
        ax1.set_xlabel('Clicks', fontsize=12)
        ax1.set_title('Top 9 Keywords by Clicks', fontsize=14, fontweight='bold')
        ax1.grid(axis='x', alpha=0.3)
        
        # CTR performance
        bars2 = ax2.barh(y_pos, ctr, alpha=0.8)
        
        # Color code by CTR performance
        for bar, ctr_val in zip(bars2, ctr):
            if ctr_val > 20:
                bar.set_color(self.colors['success'])
            elif ctr_val > 10:
                bar.set_color(self.colors['primary'])
            elif ctr_val > 5:
                bar.set_color(self.colors['warning'])
            else:
                bar.set_color(self.colors['danger'])
        
        ax2.set_yticks(y_pos)
        ax2.set_yticklabels(keywords)
        ax2.invert_yaxis()
        ax2.set_xlabel('CTR (%)', fontsize=12)
        ax2.set_title('CTR Performance by Keyword', fontsize=14, fontweight='bold')
        ax2.grid(axis='x', alpha=0.3)
        ax2.axvline(x=2.41, color='blue', linestyle='--', linewidth=2, 
                   label='Avg CTR (2.41%)')
        ax2.legend()
        
        plt.tight_layout()
        chart_path = self.charts_dir / 'keyword_performance.png'
        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"    ✅ Saved: {chart_path}")
        return chart_path
    
    def create_blog_crisis_chart(self):
        """Create visualization highlighting blog CTR crisis"""
        print("  🚨 Creating blog crisis visualization...")
        
        blogs = [
            'Perbedaan Sampah\nOrganik',
            'Pengertian Pupuk\nOrganik',
            'Penyakit Ganoderma\nKelapa Sawit',
            'Produsen Pupuk\nHayati',
            'Pupuk Hayati\nuntuk Teh'
        ]
        positions = [1.0, 1.0, 1.1, 8.9, 6.8]
        impressions = [494, 124, 76, 77, 70]
        clicks = [0, 0, 0, 3, 1]
        ctr = [0.00, 0.00, 0.00, 3.90, 1.43]
        
        fig, ax = plt.subplots(figsize=(14, 8))
        
        y_pos = np.arange(len(blogs))
        
        # Create grouped bar chart
        width = 0.35
        bars1 = ax.barh([p - width/2 for p in y_pos], impressions, width, 
                       label='Impressions', color=self.colors['secondary'], alpha=0.6)
        bars2 = ax.barh([p + width/2 for p in y_pos], clicks, width,
                       label='Clicks', alpha=0.8)
        
        # Color code clicks bars
        for i, (bar, c) in enumerate(zip(bars2, clicks)):
            if c == 0:
                bar.set_color(self.colors['danger'])
            else:
                bar.set_color(self.colors['success'])
        
        ax.set_yticks(y_pos)
        ax.set_yticklabels(blogs)
        ax.invert_yaxis()
        ax.set_xlabel('Count', fontsize=12)
        ax.set_title('🚨 BLOG PERFORMANCE CRISIS: Top Rankings with Zero Clicks',
                    fontsize=16, fontweight='bold', color=self.colors['danger'], pad=20)
        ax.legend()
        ax.grid(axis='x', alpha=0.3)
        
        # Add position and CTR annotations
        for i, (pos, c, imp) in enumerate(zip(positions, ctr, impressions)):
            color = 'red' if c == 0 else 'green'
            ax.text(imp + 20, i, f'Pos #{pos:.1f} • {c:.2f}% CTR',
                   va='center', fontsize=10, fontweight='bold', color=color)
        
        # Add crisis annotation
        ax.text(0.5, 0.98, '⚠️  3 blogs at Position #1 with 0% CTR = 694 wasted impressions/month',
               transform=ax.transAxes, fontsize=12, ha='center', va='top',
               bbox=dict(boxstyle='round', facecolor='#ffcccc', alpha=0.8),
               fontweight='bold')
        
        plt.tight_layout()
        chart_path = self.charts_dir / 'blog_crisis.png'
        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"    ✅ Saved: {chart_path}")
        return chart_path
    
    def generate_all_charts(self):
        """Generate all visualization charts"""
        print("\n📊 GENERATING VISUALIZATION CHARTS")
        print("="*80)
        
        charts = {}
        
        charts['device'] = self.create_device_performance_chart({})
        charts['daily_trend'] = self.create_daily_trend_chart()
        charts['top_pages'] = self.create_top_pages_chart()
        charts['content_type'] = self.create_content_type_performance()
        charts['keywords'] = self.create_keyword_performance_chart()
        charts['blog_crisis'] = self.create_blog_crisis_chart()
        
        print(f"\n✅ All charts generated successfully!")
        print(f"📁 Charts directory: {self.charts_dir}")
        
        return charts

def main():
    """Main execution"""
    print("\n" + "="*80)
    print("🚀 COMPREHENSIVE SEO REPORT WITH VISUALIZATIONS")
    print("="*80)
    
    generator = SEOReportGenerator()
    charts = generator.generate_all_charts()
    
    print(f"\n" + "="*80)
    print("✅ VISUALIZATION GENERATION COMPLETE")
    print("="*80)
    print(f"\n📊 Generated {len(charts)} charts:")
    for name, path in charts.items():
        print(f"  • {name}: {path.name}")
    
    print(f"\n⏭️  Next step: Generate comprehensive PDF report...")

if __name__ == '__main__':
    main()
