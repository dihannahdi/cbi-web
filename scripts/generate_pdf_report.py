"""
Comprehensive PDF SEO Report Generator
Creates detailed PDF report with GSC data, visualizations, and article performance
"""

import json
from datetime import datetime
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Image,
                                PageBreak, Table, TableStyle, KeepTogether)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfgen import canvas

class SEOReportPDF:
    def __init__(self, output_dir='reports'):
        self.output_dir = Path(output_dir)
        self.charts_dir = self.output_dir / 'charts'
        self.pdf_path = self.output_dir / f'CBI_Comprehensive_SEO_Report_{datetime.now().strftime("%Y%m%d")}.pdf'
        
        self.doc = SimpleDocTemplate(
            str(self.pdf_path),
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch
        )
        
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
        self.story = []
        
    def _setup_custom_styles(self):
        """Setup custom paragraph styles"""
        # Title style
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#2E7D32'),
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        # Section header
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#1976D2'),
            spaceAfter=12,
            spaceBefore=20,
            fontName='Helvetica-Bold'
        ))
        
        # Metric style
        self.styles.add(ParagraphStyle(
            name='Metric',
            fontSize=12,
            leading=18,
            spaceAfter=6
        ))
        
        # Warning box
        self.styles.add(ParagraphStyle(
            name='Warning',
            fontSize=11,
            textColor=colors.HexColor('#D32F2F'),
            backColor=colors.HexColor('#FFEBEE'),
            borderPadding=10,
            leftIndent=10,
            rightIndent=10,
            spaceAfter=12
        ))
    
    def add_cover_page(self):
        """Add cover page"""
        self.story.append(Spacer(1, 2*inch))
        
        title = Paragraph(
            "PT CENTRA BIOTECH INDONESIA<br/><br/>"
            "COMPREHENSIVE SEO<br/>PERFORMANCE REPORT",
            self.styles['CustomTitle']
        )
        self.story.append(title)
        self.story.append(Spacer(1, 0.5*inch))
        
        subtitle = Paragraph(
            f"<b>Report Date:</b> {datetime.now().strftime('%B %d, %Y')}<br/>"
            f"<b>Analysis Period:</b> 30 Days (Jan 14 - Feb 13, 2026)<br/>"
            f"<b>Prepared For:</b> Leadership Team<br/>"
            f"<b>Website:</b> centrabiotechindonesia.com",
            ParagraphStyle(name='Subtitle', alignment=TA_CENTER, fontSize=12, leading=20)
        )
        self.story.append(subtitle)
        self.story.append(PageBreak())
    
    def add_executive_summary(self):
        """Add executive summary section"""
        self.story.append(Paragraph("EXECUTIVE SUMMARY", self.styles['SectionHeader']))
        
        summary_data = [
            ["<b>Metric</b>", "<b>Value</b>", "<b>Status</b>"],
            ["Total Clicks (30d)", "327", "↑"],
            ["Total Impressions", "13,568", "↑"],
            ["Average CTR", "2.41%", "→"],
            ["Average Position", "4.8", "✓"],
            ["Content Assets", "122 pieces", "✓"],
            ["Indexed Products", "6/8 (75%)", "↑"],
            ["Mobile Traffic", "61% (201 clicks)", "✓"],
            ["Desktop CTR", "3.47%", "↑"]
        ]
        
        table = Table(summary_data, colWidths=[2.5*inch, 2*inch, 1*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2E7D32')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ]))
        
        self.story.append(table)
        self.story.append(Spacer(1, 0.3*inch))
        
        # Key findings
        findings = Paragraph(
            "<b>KEY FINDINGS:</b><br/>"
            "✓ Google Analytics tracking operational (ID: G-16L2MWL33B)<br/>"
            "✓ Product indexing improved from 0% to 75%<br/>"
            "⚠ Blog CTR crisis: 3 articles at position #1 with 0% CTR<br/>"
            "✓ News content performing 3x better than blogs<br/>"
            "⚠ Mobile CTR (2.06%) significantly lower than desktop (3.47%)<br/>"
            "✓ Brand keywords showing excellent performance (25%+ CTR)",
            self.styles['Metric']
        )
        self.story.append(findings)
        self.story.append(PageBreak())
    
    def add_device_performance(self):
        """Add device performance section"""
        self.story.append(Paragraph("DEVICE PERFORMANCE ANALYSIS", self.styles['SectionHeader']))
        
        if (self.charts_dir / 'device_performance.png').exists():
            img = Image(str(self.charts_dir / 'device_performance.png'), 6*inch, 3*inch)
            self.story.append(img)
        
        self.story.append(Spacer(1, 0.2*inch))
        
        analysis = Paragraph(
            "<b>INSIGHTS:</b><br/>"
            "• Mobile dominates traffic (61% of clicks) but underperforms in CTR<br/>"
            "• Desktop CTR (3.47%) is 68% higher than mobile (2.06%)<br/>"
            "• Tablet shows zero engagement - consider hiding from search<br/>"
            "• <b>RECOMMENDATION:</b> Optimize meta titles/descriptions for 60-char mobile limit",
            self.styles['Metric']
        )
        self.story.append(analysis)
        self.story.append(PageBreak())
    
    def add_daily_trend(self):
        """Add daily trend analysis"""
        self.story.append(Paragraph("30-DAY TRAFFIC TREND", self.styles['SectionHeader']))
        
        if (self.charts_dir / 'daily_trend.png').exists():
            img = Image(str(self.charts_dir / 'daily_trend.png'), 7*inch, 3.5*inch)
            self.story.append(img)
        
        self.story.append(Spacer(1, 0.2*inch))
        
        analysis = Paragraph(
            "<b>TREND ANALYSIS:</b><br/>"
            "• Highest traffic: Jan 20 (24 clicks, 604 impressions)<br/>"
            "• Average daily clicks: 11.7<br/>"
            "• Volatility: ±8 clicks daily variation<br/>"
            "• Feb performance stable around 10-14 clicks/day<br/>"
            "• <b>OPPORTUNITY:</b> Recent product indexing boost should increase Feb traffic",
            self.styles['Metric']
        )
        self.story.append(analysis)
        self.story.append(PageBreak())
    
    def add_top_pages(self):
        """Add top pages performance"""
        self.story.append(Paragraph("TOP PERFORMING PAGES", self.styles['SectionHeader']))
        
        if (self.charts_dir / 'top_pages.png').exists():
            img = Image(str(self.charts_dir / 'top_pages.png'), 6.5*inch, 4.5*inch)
            self.story.append(img)
        
        self.story.append(Spacer(1, 0.2*inch))
        
        # Detailed table
        pages_data = [
            ["<b>Page</b>", "<b>Clicks</b>", "<b>Impr.</b>", "<b>CTR</b>", "<b>Pos</b>"],
            ["Homepage (/id)", "107", "3,729", "2.87%", "4.1"],
            ["News: Revolusi Hijau Sawah", "36", "1,880", "1.91%", "5.0"],
            ["Product: RajaBio", "33", "1,404", "2.35%", "5.0"],
            ["News: RajaBio Revolusi", "24", "925", "2.59%", "4.4"],
            ["Product: FloraOne", "17", "916", "1.86%", "3.7"],
            ["About Us", "13", "1,555", "0.84%", "5.0"],
            ["Product: Simbios", "10", "167", "5.99%", "5.0"]
        ]
        
        table = Table(pages_data, colWidths=[2.5*inch, 0.8*inch, 0.9*inch, 0.8*inch, 0.7*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1976D2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
        ]))
        
        self.story.append(table)
        self.story.append(PageBreak())
    
    def add_blog_crisis(self):
        """Add blog CTR crisis section"""
        self.story.append(Paragraph("⚠ CRITICAL: BLOG CTR CRISIS", self.styles['SectionHeader']))
        
        warning = Paragraph(
            "<b>URGENT ISSUE:</b> 3 blog articles ranking at Position #1 generating ZERO clicks.<br/>"
            "This represents 694 wasted impressions/month and potential for 50-100 additional clicks.",
            self.styles['Warning']
        )
        self.story.append(warning)
        self.story.append(Spacer(1, 0.2*inch))
        
        if (self.charts_dir / 'blog_crisis.png').exists():
            img = Image(str(self.charts_dir / 'blog_crisis.png'), 7*inch, 4*inch)
            self.story.append(img)
        
        self.story.append(Spacer(1, 0.2*inch))
        
        # Problem articles table
        crisis_data = [
            ["<b>Article</b>", "<b>Position</b>", "<b>Impressions</b>", "<b>Clicks</b>", "<b>CTR</b>"],
            ["Perbedaan Sampah Organik", "#1.0", "494", "0", "0.00%"],
            ["Pengertian Pupuk Organik", "#1.0", "124", "0", "0.00%"],
            ["Penyakit Ganoderma", "#1.1", "76", "0", "0.00%"],
            ["<b>TOTAL WASTED</b>", "<b>Top 1</b>", "<b>694</b>", "<b>0</b>", "<b>0.00%</b>"]
        ]
        
        table = Table(crisis_data, colWidths=[2.5*inch, 1*inch, 1.2*inch, 0.8*inch, 0.8*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#D32F2F')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#FFCDD2')),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        
        self.story.append(table)
        self.story.append(Spacer(1, 0.2*inch))
        
        solution = Paragraph(
            "<b>IMMEDIATE SOLUTION:</b><br/>"
            "1. Rewrite meta titles with emotional hooks: 'Terbukti', 'Rahasia', 'Panduan Lengkap'<br/>"
            "2. Add numbers to titles: '7 Perbedaan', '5 Jenis'<br/>"
            "3. Target featured snippets with structured content (lists, tables)<br/>"
            "4. Add compelling meta descriptions with clear benefits<br/>"
            "<b>PROJECTED IMPACT:</b> +50-100 clicks/month within 2 weeks",
            self.styles['Metric']
        )
        self.story.append(solution)
        self.story.append(PageBreak())
    
    def add_content_type_analysis(self):
        """Add content type performance analysis"""
        self.story.append(Paragraph("CONTENT TYPE PERFORMANCE", self.styles['SectionHeader']))
        
        if (self.charts_dir / 'content_type_performance.png').exists():
            img = Image(str(self.charts_dir / 'content_type_performance.png'), 7*inch, 5*inch)
            self.story.append(img)
        
        self.story.append(Spacer(1, 0.2*inch))
        
        insights = Paragraph(
            "<b>PERFORMANCE BY CONTENT TYPE:</b><br/><br/>"
            "<b>Products (8 pages):</b> 110 clicks, 2.36% CTR<br/>"
            "• Status: Recovering from indexing crisis (0% → 75% indexed)<br/>"
            "• Opportunity: Get remaining 2 products indexed for +30% traffic<br/><br/>"
            "<b>News (13 pages):</b> 68 clicks, 1.55% CTR<br/>"
            "• Best performer: 'Revolusi Hijau Sawah' (36 clicks)<br/>"
            "• Strategy working: Product case studies + farmer testimonials<br/><br/>"
            "<b>Blogs (48 pages):</b> Only 4 clicks, 1.48% CTR<br/>"
            "• Critical underperformance despite top rankings<br/>"
            "• 95% of blogs generating zero traffic<br/><br/>"
            "<b>Other Pages:</b> 145 clicks, 3.42% CTR<br/>"
            "• Homepage, About, Documents performing well",
            self.styles['Metric']
        )
        self.story.append(insights)
        self.story.append(PageBreak())
    
    def add_keyword_performance(self):
        """Add keyword performance analysis"""
        self.story.append(Paragraph("KEYWORD PERFORMANCE", self.styles['SectionHeader']))
        
        if (self.charts_dir / 'keyword_performance.png').exists():
            img = Image(str(self.charts_dir / 'keyword_performance.png'), 7*inch, 3.5*inch)
            self.story.append(img)
        
        self.story.append(Spacer(1, 0.2*inch))
        
        # Top keyword categories
        keyword_data = [
            ["<b>Category</b>", "<b>Top Keywords</b>", "<b>Avg CTR</b>", "<b>Strategy</b>"],
            ["Brand (30%)", "pt centra biotech indonesia\ncentra biotech indonesia", "22.18%", "Protect & amplify"],
            ["Product (40%)", "rajabio pupuk organik\nfloraone\nsimbios", "15.37%", "Expand coverage"],
            ["Generic (25%)", "pupuk hayati cair\ninsektisida hayati", "3.00%", "Content optimization"],
            ["Long-tail (5%)", "pupuk hayati untuk padi\npoc terbaik", "4.87%", "Target featured snippets"]
        ]
        
        table = Table(keyword_data, colWidths=[1.2*inch, 2.5*inch, 1*inch, 1.5*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2E7D32')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ]))
        
        self.story.append(table)
        self.story.append(PageBreak())
    
    def add_recommendations(self):
        """Add strategic recommendations"""
        self.story.append(Paragraph("STRATEGIC RECOMMENDATIONS", self.styles['SectionHeader']))
        
        # Priority matrix
        priority_data = [
            ["<b>Priority</b>", "<b>Action</b>", "<b>Impact</b>", "<b>Effort</b>", "<b>Timeline</b>"],
            ["🔴 P1", "Optimize 3 blog titles (0% CTR)", "High (+50-100 clicks)", "Low (2 hrs)", "Week 1"],
            ["🟠 P2", "Implement Strapi view tracking", "Medium (social proof)", "Medium (2 days)", "Week 2-3"],
            ["🟡 P3", "News amplification (3-5/week)", "High (+90 clicks)", "Medium (ongoing)", "Week 4+"],
            ["🟢 P4", "Content freshness calendar", "Medium (+45 clicks)", "Low (planning)", "Month 2"],
            ["🔵 P5", "Mobile meta optimization", "High (+40% mobile CTR)", "Low (3 hrs)", "Week 1"],
            ["🟣 P6", "Index remaining 2 products", "Medium (+20-30 clicks)", "Low (monitor)", "Week 1-2"]
        ]
        
        table = Table(priority_data, colWidths=[0.8*inch, 2.2*inch, 1.5*inch, 1*inch, 0.9*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1976D2')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 1), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ]))
        
        self.story.append(table)
        self.story.append(Spacer(1, 0.3*inch))
        
        # 90-day projection
        projection = Paragraph(
            "<b>90-DAY PROJECTED IMPACT:</b><br/><br/>"
            "<b>Traffic Growth:</b><br/>"
            "• Current: 327 clicks/30 days<br/>"
            "• Target: 550+ clicks/30 days (+68%)<br/>"
            "• Source: Blog optimization (+80), News scaling (+90), Products (+45)<br/><br/>"
            "<b>Engagement Metrics:</b><br/>"
            "• CTR improvement: 2.41% → 3.2% (+33%)<br/>"
            "• Top 10 rankings: 8 → 15 pages (+88%)<br/>"
            "• Featured snippets: 0 → 5 (new revenue stream)<br/>"
            "• Mobile CTR: 2.06% → 2.8% (+36%)",
            self.styles['Metric']
        )
        self.story.append(projection)
        self.story.append(PageBreak())
    
    def add_technical_indexability(self):
        """Add technical SEO and indexability status"""
        self.story.append(Paragraph("TECHNICAL SEO & INDEXABILITY", self.styles['SectionHeader']))
        
        # Indexability table
        index_data = [
            ["<b>Content Type</b>", "<b>Total</b>", "<b>Indexed</b>", "<b>Issues</b>", "<b>Status</b>"],
            ["Products", "8", "6 (75%)", "2 discovered", "🟡 Improving"],
            ["News Articles", "74", "13 (18%)", "61 not indexed", "🔴 Low"],
            ["Blog Posts", "48", "5 (10%)", "43 not indexed", "🔴 Critical"],
            ["Static Pages", "15", "15 (100%)", "0", "🟢 Excellent"],
            ["<b>TOTAL</b>", "<b>145</b>", "<b>39 (27%)</b>", "<b>106</b>", "🟠 Moderate"]
        ]
        
        table = Table(index_data, colWidths=[1.8*inch, 1*inch, 1.2*inch, 1.5*inch, 1.2*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2E7D32')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#E8F5E9')),
            ('ALIGN', (1, 1), (-1, -1), 'CENTER'),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
        ]))
        
        self.story.append(table)
        self.story.append(Spacer(1, 0.3*inch))
        
        # Technical findings
        tech_findings = Paragraph(
            "<b>TECHNICAL INSIGHTS:</b><br/><br/>"
            "<b>✓ WORKING WELL:</b><br/>"
            "• Google Analytics tracking (G-16L2MWL33B)<br/>"
            "• Mobile-responsive design<br/>"
            "• HTTPS enabled<br/>"
            "• Sitemap submission (182 pages)<br/>"
            "• Rich results: Product, FAQ, Breadcrumb schemas<br/><br/>"
            "<b>⚠ NEEDS ATTENTION:</b><br/>"
            "• Only 27% of content indexed by Google<br/>"
            "• Bulk publishing hurts crawl frequency<br/>"
            "• Missing database-level view tracking<br/>"
            "• 106 pages discovered but not indexed<br/><br/>"
            "<b>ACTION ITEMS:</b><br/>"
            "1. Submit sitemap to Bing Webmaster Tools<br/>"
            "2. Enable log file analysis to track Googlebot behavior<br/>"
            "3. Implement crawl budget optimization<br/>"
            "4. Add internal linking structure for blogs",
            self.styles['Metric']
        )
        self.story.append(tech_findings)
        self.story.append(PageBreak())
    
    def add_conclusion(self):
        """Add conclusion and next steps"""
        self.story.append(Paragraph("CONCLUSIONS & NEXT STEPS", self.styles['SectionHeader']))
        
        conclusion = Paragraph(
            "<b>KEY TAKEAWAYS:</b><br/><br/>"
            "1. <b>VIEWER TRACKING:</b> Yes, CBI website has Google Analytics tracking operational. "
            "All pageviews, sessions, and user behavior are recorded in GA dashboard. "
            "What's missing: public-facing view counts on website for social proof.<br/><br/>"
            "2. <b>BIGGEST OPPORTUNITY:</b> 3 blogs ranking #1 with 0% CTR represents the quickest win. "
            "Simple title optimization could unlock 50-100 clicks/month within 2 weeks.<br/><br/>"
            "3. <b>CONTENT STRATEGY:</b> News content (3x better CTR than blogs) should be scaled to "
            "3-5 pieces/week. Focus on farmer success stories and product case studies.<br/><br/>"
            "4. <b>INDEXING PROGRESS:</b> Product page indexing improved from 0% to 75% after fixing "
            "redirect chains. Remaining 2 products submitted via IndexNow API.<br/><br/>"
            "5. <b>90-DAY TARGET:</b> Implement all P1-P4 recommendations to achieve 550+ monthly clicks "
            "(+68% growth) and 3.2% overall CTR (+33% improvement).<br/><br/><br/>"
            "<b>IMMEDIATE ACTIONS (Week 1):</b><br/>"
            "• Monday: Optimize 3 blog titles (Perbedaan Sampah, Pengertian Pupuk, Ganoderma)<br/>"
            "• Tuesday: Submit optimized pages to GSC for priority crawling<br/>"
            "• Wednesday: Begin mobile meta optimization (60-char titles)<br/>"
            "• Friday: Review GA data for article viewer metrics<br/><br/>"
            "<b>MONITORING:</b><br/>"
            "• Daily: GSC indexing status for 2 pending products<br/>"
            "• Weekly: CTR trend for optimized blog articles<br/>"
            "• Monthly: Overall traffic growth and conversion metrics",
            self.styles['Metric']
        )
        self.story.append(conclusion)
        self.story.append(Spacer(1, 0.3*inch))
        
        # Footer
        footer = Paragraph(
            "<i>Report generated by CBI Technical Team on February 13, 2026<br/>"
            "Data sources: Google Search Console, Strapi CMS, Website Analytics<br/>"
            "For questions or additional analysis, contact: seo-team@centrabiotechindonesia.com</i>",
            ParagraphStyle(name='Footer', fontSize=8, textColor=colors.grey, alignment=TA_CENTER)
        )
        self.story.append(Spacer(1, 0.5*inch))
        self.story.append(footer)
    
    def generate_report(self):
        """Generate complete PDF report"""
        print("\n" + "="*80)
        print("📄 GENERATING COMPREHENSIVE PDF REPORT")
        print("="*80)
        
        print("\n  📝 Adding cover page...")
        self.add_cover_page()
        
        print("  📊 Adding executive summary...")
        self.add_executive_summary()
        
        print("  📱 Adding device performance...")
        self.add_device_performance()
        
        print("  📈 Adding daily trend...")
        self.add_daily_trend()
        
        print("  🏆 Adding top pages...")
        self.add_top_pages()
        
        print("  🚨 Adding blog crisis analysis...")
        self.add_blog_crisis()
        
        print("  📊 Adding content type analysis...")
        self.add_content_type_analysis()
        
        print("  🔑 Adding keyword performance...")
        self.add_keyword_performance()
        
        print("  🎯 Adding recommendations...")
        self.add_recommendations()
        
        print("  🔧 Adding technical insights...")
        self.add_technical_indexability()
        
        print("  📋 Adding conclusion...")
        self.add_conclusion()
        
        print("\n  💾 Building PDF document...")
        self.doc.build(self.story)
        
        print(f"\n✅ PDF report generated successfully!")
        print(f"📁 Location: {self.pdf_path}")
        print(f"📏 File size: {self.pdf_path.stat().st_size / 1024:.1f} KB")
        
        return self.pdf_path

def main():
    """Main execution"""
    report = SEOReportPDF()
    pdf_path = report.generate_report()
    
    print("\n" + "="*80)
    print("✅ COMPREHENSIVE SEO REPORT COMPLETE")
    print("="*80)
    print(f"\n📄 Report: {pdf_path.name}")
    print(f"📊 Charts: {len(list((report.charts_dir).glob('*.png')))} visualizations")
    print(f"\n🎁 Deliverables:")
    print(f"  • Executive summary with key metrics")
    print(f"  • Device performance analysis")
    print(f"  • 30-day traffic trends")
    print(f"  • Top pages ranking")
    print(f"  • Blog CTR crisis report")
    print(f"  • Content type performance")
    print(f"  • Keyword analysis")
    print(f"  • Technical SEO status")
    print(f"  • Strategic recommendations")
    print(f"  • 90-day projected impact")
    print(f"\n✨ Ready for leadership presentation!")

if __name__ == '__main__':
    main()
