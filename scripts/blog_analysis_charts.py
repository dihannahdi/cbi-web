#!/usr/bin/env python3
"""
Blog Deep SEO Analysis - Visualization Charts
==============================================
Generates professional charts for the blog indexability diagnosis report.
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
from pathlib import Path
import json

# CBI Brand Colors
COLORS = {
    'primary': '#2E7D32',
    'secondary': '#1976D2',
    'danger': '#D32F2F',
    'warning': '#F57C00',
    'success': '#388E3C',
    'light_green': '#C8E6C9',
    'light_red': '#FFCDD2',
    'light_blue': '#BBDEFB',
    'gray': '#9E9E9E',
    'dark': '#212121',
    'bg': '#FAFAFA',
}

charts_dir = Path("reports/charts")
charts_dir.mkdir(parents=True, exist_ok=True)


def chart_1_indexing_crisis():
    """Chart 1: The Indexing Crisis - 0/48 Indexed"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))
    fig.patch.set_facecolor(COLORS['bg'])
    fig.suptitle('BLOG INDEXING CRISIS: 0% Indexing Rate', 
                 fontsize=18, fontweight='bold', color=COLORS['danger'], y=0.98)
    
    # Left: Pie chart showing indexed vs not
    ax1 = axes[0]
    sizes = [0, 48]
    labels = ['Indexed\n(0 blogs)', 'NOT Indexed\n(48 blogs)']
    colors_pie = [COLORS['success'], COLORS['danger']]
    explode = (0, 0.05)
    
    wedges, texts, autotexts = ax1.pie(sizes if sizes[0] > 0 else [0.001, 48], 
                                        labels=labels, colors=colors_pie,
                                        explode=explode, autopct='%1.0f%%',
                                        shadow=True, startangle=90,
                                        textprops={'fontsize': 12})
    autotexts[0].set_fontsize(1)  # Hide 0% text
    autotexts[1].set_fontsize(16)
    autotexts[1].set_fontweight('bold')
    ax1.set_title('Google Indexing Status\n(48 Blog URLs Checked)', fontsize=13, fontweight='bold', pad=15)
    
    # Right: Comparison with other content types
    ax2 = axes[1]
    categories = ['Products', 'News', 'Main Pages', 'BLOGS']
    indexed_pct = [75, 25, 80, 0]
    bar_colors = [COLORS['success'], COLORS['warning'], COLORS['success'], COLORS['danger']]
    
    bars = ax2.barh(categories, indexed_pct, color=bar_colors, height=0.6, edgecolor='white', linewidth=1.5)
    
    for bar, pct in zip(bars, indexed_pct):
        color = 'white' if pct > 20 else COLORS['danger']
        ax2.text(bar.get_width() + 2 if pct < 90 else bar.get_width() - 15, 
                bar.get_y() + bar.get_height()/2, 
                f'{pct}%', va='center', fontsize=14, fontweight='bold', color=color)
    
    ax2.set_xlim(0, 105)
    ax2.set_xlabel('Indexing Rate (%)', fontsize=12)
    ax2.set_title('Indexing Rate by Content Type', fontsize=13, fontweight='bold', pad=15)
    ax2.axvline(x=50, color=COLORS['gray'], linestyle='--', alpha=0.5, label='Target: 50%+')
    ax2.spines['top'].set_visible(False)
    ax2.spines['right'].set_visible(False)
    
    plt.tight_layout(rect=[0, 0, 1, 0.93])
    plt.savefig(charts_dir / 'blog_indexing_crisis.png', dpi=300, bbox_inches='tight', 
                facecolor=COLORS['bg'])
    plt.close()
    print("  [1/6] blog_indexing_crisis.png")


def chart_2_root_cause_severity():
    """Chart 2: Root Cause Analysis - Severity Matrix"""
    fig, ax = plt.subplots(figsize=(14, 8))
    fig.patch.set_facecolor(COLORS['bg'])
    
    root_causes = [
        ("RC1: Google Cannot Fetch Pages\n(PAGE_FETCH_STATE_UNSPECIFIED)", "CRITICAL", 100),
        ("RC2: Aggressive No-Cache Headers\n(Crawl Budget Waste)", "CRITICAL", 95),
        ("RC3: 38/48 Blogs Orphaned\n(No Internal Links)", "HIGH", 85),
        ("RC4: Canonical URL Conflicts\n(Old vs New URL Structure)", "HIGH", 75),
        ("RC5: Mass Publication Signal\n(45 Blogs Same Timestamp)", "MEDIUM", 60),
        ("RC6: Slug-Title Mismatch\n(Misleading URL vs Content)", "MEDIUM", 50),
        ("RC7: Legacy Test Pages\n(Wasting Crawl Budget)", "LOW", 25),
    ]
    
    labels = [rc[0] for rc in root_causes]
    impacts = [rc[2] for rc in root_causes]
    severities = [rc[1] for rc in root_causes]
    
    severity_colors = {
        'CRITICAL': COLORS['danger'],
        'HIGH': COLORS['warning'],
        'MEDIUM': '#FFC107',
        'LOW': COLORS['gray'],
    }
    
    bar_colors = [severity_colors[s] for s in severities]
    y_pos = range(len(labels))
    
    bars = ax.barh(y_pos, impacts, color=bar_colors, height=0.7, edgecolor='white', linewidth=1.5)
    
    # Add severity badges
    for i, (bar, severity) in enumerate(zip(bars, severities)):
        ax.text(bar.get_width() + 2, bar.get_y() + bar.get_height()/2, 
                f' [{severity}]', va='center', fontsize=10, fontweight='bold',
                color=severity_colors[severity])
    
    ax.set_yticks(y_pos)
    ax.set_yticklabels(labels, fontsize=10)
    ax.set_xlabel('Impact Score (0-100)', fontsize=12, fontweight='bold')
    ax.set_title('Root Cause Analysis: Why 48 Blogs Have 0% Indexing', 
                fontsize=15, fontweight='bold', color=COLORS['dark'], pad=20)
    ax.set_xlim(0, 115)
    ax.invert_yaxis()
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Legend
    legend_patches = [mpatches.Patch(color=severity_colors[s], label=s) 
                     for s in ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']]
    ax.legend(handles=legend_patches, loc='lower right', fontsize=10, title='Severity')
    
    plt.tight_layout()
    plt.savefig(charts_dir / 'blog_root_causes.png', dpi=300, bbox_inches='tight',
                facecolor=COLORS['bg'])
    plt.close()
    print("  [2/6] blog_root_causes.png")


def chart_3_url_structure_flow():
    """Chart 3: URL Structure Problem Flow"""
    fig, ax = plt.subplots(figsize=(14, 7))
    fig.patch.set_facecolor(COLORS['bg'])
    
    # Create a flow diagram using boxes and arrows
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 8)
    ax.axis('off')
    
    title = ax.text(5, 7.5, 'URL Structure Problem: Why Google Can\'t Find Your Blogs',
                    fontsize=16, fontweight='bold', ha='center', va='center', color=COLORS['dark'])
    
    # Box styles
    ok_style = dict(boxstyle="round,pad=0.5", facecolor=COLORS['light_green'], edgecolor=COLORS['success'], linewidth=2)
    bad_style = dict(boxstyle="round,pad=0.5", facecolor=COLORS['light_red'], edgecolor=COLORS['danger'], linewidth=2)
    warn_style = dict(boxstyle="round,pad=0.5", facecolor='#FFF3E0', edgecolor=COLORS['warning'], linewidth=2)
    info_style = dict(boxstyle="round,pad=0.5", facecolor=COLORS['light_blue'], edgecolor=COLORS['secondary'], linewidth=2)
    
    # Row 1: Sitemap declares
    ax.text(2, 6.3, 'SITEMAP DECLARES:\n/id/blog/{slug}\n(48 URLs)', fontsize=10, ha='center', va='center', bbox=info_style)
    ax.text(5, 6.3, 'GOOGLE CRAWLS:\nFinds /id/blog/ URLs\nvia sitemap', fontsize=10, ha='center', va='center', bbox=warn_style)
    ax.text(8, 6.3, 'RESULT:\nDiscovered but\nNOT INDEXED', fontsize=10, ha='center', va='center', bbox=bad_style)
    
    # Arrows row 1
    ax.annotate('', xy=(3.7, 6.3), xytext=(3.2, 6.3), arrowprops=dict(arrowstyle='->', color=COLORS['dark'], lw=2))
    ax.annotate('', xy=(6.7, 6.3), xytext=(6.2, 6.3), arrowprops=dict(arrowstyle='->', color=COLORS['danger'], lw=2))
    
    # Row 2: Old URL problem
    ax.text(2, 4.5, 'GOOGLE INDEX HAS:\n/blog/{slug}\n(Old format, no /id/)', fontsize=10, ha='center', va='center', bbox=warn_style)
    ax.text(5, 4.5, 'MIDDLEWARE:\n301 Redirect\n/blog/ -> /id/blog/', fontsize=10, ha='center', va='center', bbox=ok_style)
    ax.text(8, 4.5, 'GOOGLE SEES:\n404 Not Found\n(3 URLs broken)', fontsize=10, ha='center', va='center', bbox=bad_style)
    
    # Arrows row 2
    ax.annotate('', xy=(3.7, 4.5), xytext=(3.2, 4.5), arrowprops=dict(arrowstyle='->', color=COLORS['dark'], lw=2))
    ax.annotate('', xy=(6.7, 4.5), xytext=(6.2, 4.5), arrowprops=dict(arrowstyle='->', color=COLORS['danger'], lw=2))
    
    # Row 3: Canonical confusion
    ax.text(2, 2.7, 'SITE DECLARES:\ncanonical=/id/blog/{slug}', fontsize=10, ha='center', va='center', bbox=ok_style)
    ax.text(5, 2.7, 'GOOGLE PREFERS:\ncanonical=/blog/{slug}\n(Old format)', fontsize=10, ha='center', va='center', bbox=warn_style)
    ax.text(8, 2.7, 'CANONICAL\nCONFLICT\n(Ranking diluted)', fontsize=10, ha='center', va='center', bbox=bad_style)
    
    # Arrows row 3
    ax.annotate('', xy=(3.7, 2.7), xytext=(3.2, 2.7), arrowprops=dict(arrowstyle='->', color=COLORS['dark'], lw=2))
    ax.annotate('', xy=(6.7, 2.7), xytext=(6.2, 2.7), arrowprops=dict(arrowstyle='->', color=COLORS['danger'], lw=2))
    
    # Bottom summary
    ax.text(5, 1.0, 
            'NET RESULT: 48 blogs published, 0 indexed by Google = 58,688 wasted impressions',
            fontsize=13, fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle="round,pad=0.8", facecolor=COLORS['light_red'], 
                     edgecolor=COLORS['danger'], linewidth=3),
            color=COLORS['danger'])
    
    plt.tight_layout()
    plt.savefig(charts_dir / 'blog_url_flow.png', dpi=300, bbox_inches='tight',
                facecolor=COLORS['bg'])
    plt.close()
    print("  [3/6] blog_url_flow.png")


def chart_4_internal_linking():
    """Chart 4: Internal Linking Gap Analysis"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))
    fig.patch.set_facecolor(COLORS['bg'])
    fig.suptitle('Internal Linking Gap: 38/48 Blogs are Orphaned', 
                 fontsize=16, fontweight='bold', color=COLORS['danger'], y=0.98)
    
    # Left: Where blogs are linked from
    ax1 = axes[0]
    sources = ['Homepage', 'Blog Listing\n(HTML)', 'Blog Listing\n(JS Pagination)', 'Sitemap\nOnly']
    counts = [3, 10, 38, 38]
    bar_colors = [COLORS['success'], COLORS['success'], COLORS['warning'], COLORS['gray']]
    
    bars = ax1.bar(sources, counts, color=bar_colors, edgecolor='white', linewidth=1.5)
    
    for bar, count in zip(bars, counts):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                str(count), ha='center', fontsize=13, fontweight='bold')
    
    ax1.set_ylabel('Number of Blog URLs', fontsize=11)
    ax1.set_title('Blog Discovery Sources\n(Googlebot perspective)', fontsize=12, fontweight='bold')
    ax1.spines['top'].set_visible(False)
    ax1.spines['right'].set_visible(False)
    ax1.set_ylim(0, 55)
    
    # Add note
    ax1.text(0.5, -0.18, 
             '* JS Pagination = Googlebot may not discover these links\n* Sitemap Only = Lowest crawl priority',
             transform=ax1.transAxes, fontsize=9, color=COLORS['gray'], ha='center')
    
    # Right: Crawl priority distribution
    ax2 = axes[1]
    priority_labels = ['High Priority\n(Homepage linked)', 'Medium Priority\n(Listing visible)', 
                       'Low Priority\n(JS only)', 'Minimal Priority\n(Sitemap only)']
    priority_counts = [3, 7, 0, 38]
    priority_colors = [COLORS['success'], '#4CAF50', COLORS['warning'], COLORS['danger']]
    
    wedges, texts, autotexts = ax2.pie(priority_counts, labels=priority_labels, 
                                        colors=priority_colors, autopct='%1.0f%%',
                                        startangle=90, textprops={'fontsize': 9})
    for at in autotexts:
        at.set_fontweight('bold')
        at.set_fontsize(11)
    
    ax2.set_title('Googlebot Crawl Priority\nDistribution', fontsize=12, fontweight='bold')
    
    plt.tight_layout(rect=[0, 0.05, 1, 0.93])
    plt.savefig(charts_dir / 'blog_internal_linking.png', dpi=300, bbox_inches='tight',
                facecolor=COLORS['bg'])
    plt.close()
    print("  [4/6] blog_internal_linking.png")


def chart_5_publication_timeline():
    """Chart 5: Mass Publication Problem"""
    fig, ax = plt.subplots(figsize=(14, 6))
    fig.patch.set_facecolor(COLORS['bg'])
    
    # Publication dates
    dates = ['Jul 2025\n(Originals)', 'Jan 3, 2026\n(Mass Batch)']
    counts = [3, 45]
    bar_colors = [COLORS['success'], COLORS['danger']]
    
    bars = ax.bar(dates, counts, color=bar_colors, width=0.5, edgecolor='white', linewidth=2)
    
    for bar, count in zip(bars, counts):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                f'{count} blogs', ha='center', fontsize=14, fontweight='bold',
                color=COLORS['danger'] if count > 10 else COLORS['success'])
    
    ax.set_ylabel('Number of Blogs Published', fontsize=12)
    ax.set_title('Publication Timeline: Google\'s Spam Signal Detection',
                fontsize=15, fontweight='bold', color=COLORS['dark'])
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.set_ylim(0, 55)
    
    # Add warning annotation
    ax.annotate('SPAM SIGNAL!\n45 blogs published\nat exact same timestamp\n(2026-01-03 12:31:13)',
                xy=(1, 45), xytext=(0.3, 40),
                fontsize=11, fontweight='bold', color=COLORS['danger'],
                arrowprops=dict(arrowstyle='->', color=COLORS['danger'], lw=2),
                bbox=dict(boxstyle='round,pad=0.5', facecolor=COLORS['light_red'], edgecolor=COLORS['danger']))
    
    # Add Google policy note
    ax.text(0.5, -0.15, 
            'Google SpamBrain Algorithm: Mass-published content with similar patterns\n'
            'is deprioritized in crawl queue and may trigger quality review.',
            transform=ax.transAxes, fontsize=10, ha='center', color=COLORS['gray'],
            style='italic')
    
    plt.tight_layout()
    plt.savefig(charts_dir / 'blog_mass_publication.png', dpi=300, bbox_inches='tight',
                facecolor=COLORS['bg'])
    plt.close()
    print("  [5/6] blog_mass_publication.png")


def chart_6_wasted_impressions():
    """Chart 6: Wasted Impressions & Traffic Opportunity"""
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))
    fig.patch.set_facecolor(COLORS['bg'])
    fig.suptitle('Blog Traffic: Wasted Potential & Opportunity Cost', 
                 fontsize=16, fontweight='bold', color=COLORS['dark'], y=0.98)
    
    # Left: Wasted impressions by old URL
    ax1 = axes[0]
    blog_names = ['Sampah Organik\nvs Anorganik', 'Pengertian\nPupuk Organik', 
                  'Penyakit\nGanoderma', 'Contoh Blog\n(Test)', 'Pupuk Hayati\nuntuk Teh']
    impressions = [28805, 15159, 14155, 474, 70]
    clicks = [17, 40, 61, 0, 1]
    
    x = np.arange(len(blog_names))
    width = 0.35
    
    bars1 = ax1.bar(x - width/2, impressions, width, label='Impressions', color=COLORS['secondary'], alpha=0.8)
    bars2 = ax1.bar(x + width/2, clicks, width, label='Clicks', color=COLORS['success'])
    
    ax1.set_ylabel('Count', fontsize=11)
    ax1.set_title('Only 5 Blogs Ever Got Impressions\n(13+ months data)', fontsize=12, fontweight='bold')
    ax1.set_xticks(x)
    ax1.set_xticklabels(blog_names, fontsize=8)
    ax1.legend(fontsize=10)
    ax1.set_yscale('log')
    ax1.spines['top'].set_visible(False)
    ax1.spines['right'].set_visible(False)
    
    # Right: Opportunity cost calculation
    ax2 = axes[1]
    categories = ['Current\nTraffic', 'If 2% CTR\n(Industry Avg)', 'If 5% CTR\n(Optimized)', 'Potential\nwith All 48']
    traffic = [122, 1174, 2934, 5868]
    bar_colors = [COLORS['danger'], COLORS['warning'], COLORS['success'], COLORS['primary']]
    
    bars = ax2.bar(categories, traffic, color=bar_colors, edgecolor='white', linewidth=1.5)
    
    for bar, t in zip(bars, traffic):
        ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 100,
                f'{t:,}', ha='center', fontsize=12, fontweight='bold')
    
    ax2.set_ylabel('Clicks (13-month projection)', fontsize=11)
    ax2.set_title('Traffic Opportunity Cost\n(Based on 58,688 impressions)', fontsize=12, fontweight='bold')
    ax2.spines['top'].set_visible(False)
    ax2.spines['right'].set_visible(False)
    
    # Add multiplier annotations
    ax2.annotate('+862%\nopportunity', xy=(1, 1174), xytext=(1.5, 2500),
                fontsize=10, fontweight='bold', color=COLORS['warning'],
                arrowprops=dict(arrowstyle='->', color=COLORS['warning']))
    
    plt.tight_layout(rect=[0, 0, 1, 0.93])
    plt.savefig(charts_dir / 'blog_wasted_impressions.png', dpi=300, bbox_inches='tight',
                facecolor=COLORS['bg'])
    plt.close()
    print("  [6/6] blog_wasted_impressions.png")


if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("  GENERATING BLOG DEEP SEO ANALYSIS CHARTS")
    print("=" * 60 + "\n")
    
    chart_1_indexing_crisis()
    chart_2_root_cause_severity()
    chart_3_url_structure_flow()
    chart_4_internal_linking()
    chart_5_publication_timeline()
    chart_6_wasted_impressions()
    
    print(f"\n  All 6 charts generated in: {charts_dir}/")
    print("=" * 60)
