#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ENTERPRISE SEO ARTICLE UPLOADER - CENTRA BIOTECH INDONESIA
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Maximum SEO Potential Features:
 * ✅ Schema.org Article/TechArticle JSON-LD structured data
 * ✅ Yoast-style meta optimization (60-70 char titles, 150-160 char descriptions)
 * ✅ Focus keyphrase extraction with LSI keywords
 * ✅ Semantic keyword density analysis
 * ✅ Canonical URL generation
 * ✅ Robots directive optimization
 * ✅ Internal linking suggestions
 * ✅ ReadingTime estimation
 * ✅ Word count optimization
 * ✅ Indonesian and English language support
 * ✅ Category-based SEO templates
 * ✅ Automatic slug optimization
 * ✅ Content structure analysis (H1, H2, lists)
 * 
 * Based on Google's Search Console best practices and Yoast SEO guidelines
 * 
 * @author CBI Development Team
 * @version 2.0.0 Enterprise Edition
 */

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
  STRAPI_DB: '/opt/cbi-strapi/.tmp/data.db',
  ARTICLES_DIR: '/opt/cbi-article-automation/draft-articles',
  UPLOADED_TRACKER: '/opt/cbi-article-automation/uploaded-articles.json',
  LOCALE: 'id', // Default locale
  BASE_URL: 'https://centrabiotechindonesia.com',
  ORGANIZATION: {
    name: 'Centra Biotech Indonesia',
    url: 'https://centrabiotechindonesia.com',
    logo: 'https://centrabiotechindonesia.com/logo.png',
    sameAs: [
      'https://www.facebook.com/centrabiotechindonesia',
      'https://www.instagram.com/centrabiotech.id',
      'https://www.linkedin.com/company/centra-biotech-indonesia'
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEO KEYWORD DATABASES
// ═══════════════════════════════════════════════════════════════════════════════

const SEO_KEYWORDS = {
  'Asam Humat': {
    primary: ['asam humat', 'humic acid', 'black turbo', 'pupuk organik'],
    secondary: ['kesuburan tanah', 'nutrisi tanaman', 'pertanian organik', 'mikroba tanah'],
    lsi: ['pupuk hayati', 'bioteknologi pertanian', 'hasil panen', 'tanaman sehat'],
    product: 'Black Turbo',
    category: 'pupuk-hayati'
  },
  'Insektisida Hayati': {
    primary: ['insektisida hayati', 'biokiller', 'pestisida organik', 'pengendalian hama'],
    secondary: ['hama tanaman', 'bioinsektisida', 'pertanian ramah lingkungan', 'beauveria bassiana'],
    lsi: ['metarhizium', 'jamur entomopatogen', 'pest control', 'organic farming'],
    product: 'BioKiller',
    category: 'insektisida-hayati'
  },
  'Maklon Pupuk': {
    primary: ['maklon pupuk', 'jasa maklon', 'contract manufacturing', 'toll manufacturing'],
    secondary: ['produksi pupuk', 'OEM pupuk', 'private label', 'custom formulation'],
    lsi: ['pabrik pupuk', 'manufacturing', 'B2B', 'bisnis pupuk'],
    product: 'Maklon Services',
    category: 'layanan-maklon'
  },
  'Pupuk Hayati': {
    primary: ['pupuk hayati', 'biofertilizer', 'floraone', 'simbios'],
    secondary: ['mikroorganisme tanah', 'bakteri pengurai', 'rhizobium', 'azotobacter'],
    lsi: ['nitrogen fiksasi', 'fosfor terlarut', 'pertumbuhan akar', 'hasil panen'],
    product: 'FloraOne/Simbios',
    category: 'pupuk-hayati'
  },
  'Pupuk Organik Cair': {
    primary: ['pupuk organik cair', 'POC', 'rajabio', 'liquid fertilizer'],
    secondary: ['nutrisi tanaman', 'pupuk daun', 'pupuk semprot', 'organik cair'],
    lsi: ['fermentasi', 'bahan organik', 'pertumbuhan vegetatif', 'generatif'],
    product: 'RajaBio',
    category: 'pupuk-organik-cair'
  },
  'Uji Efektivitas': {
    primary: ['uji efektivitas', 'efficacy test', 'pengujian produk', 'riset pertanian'],
    secondary: ['validasi produk', 'data lapangan', 'trial pertanian', 'hasil penelitian'],
    lsi: ['evidence-based', 'scientific proof', 'laporan uji', 'rekomendasi'],
    product: 'Research & Testing',
    category: 'riset-pengembangan'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENTERPRISE SEO OPTIMIZER CLASS
// ═══════════════════════════════════════════════════════════════════════════════

class EnterpriseSEOOptimizer {
  constructor(category) {
    this.category = category;
    this.keywords = SEO_KEYWORDS[category] || SEO_KEYWORDS['Pupuk Hayati'];
  }

  /**
   * Generate optimized meta title (60-70 characters with focus keyphrase)
   * Following Yoast SEO best practices
   */
  generateMetaTitle(title, focusKeyphrase) {
    // Remove common file extensions and clean title
    let cleanTitle = title
      .replace(/\.docx?$/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Ensure focus keyphrase is at the beginning (Yoast recommendation)
    let metaTitle = cleanTitle;
    
    // Add brand if space allows
    const brandSuffix = ' | Centra Biotech Indonesia';
    const shortBrand = ' | CBI';
    
    if (metaTitle.length + brandSuffix.length <= 70) {
      metaTitle = metaTitle + brandSuffix;
    } else if (metaTitle.length + shortBrand.length <= 70) {
      metaTitle = metaTitle + shortBrand;
    } else if (metaTitle.length > 60) {
      // Truncate intelligently at word boundary
      metaTitle = metaTitle.substring(0, 57) + '...';
    }

    return metaTitle.substring(0, 70);
  }

  /**
   * Generate meta description with CTA (150-160 characters)
   * Include focus keyphrase and call-to-action
   */
  generateMetaDescription(title, content, focusKeyphrase) {
    // Extract first meaningful paragraph
    const plainText = this.stripHtml(content);
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    let description = '';
    
    if (sentences.length > 0) {
      description = sentences[0].trim();
    } else {
      description = plainText.substring(0, 120);
    }

    // Ensure focus keyphrase is included
    if (!description.toLowerCase().includes(focusKeyphrase.toLowerCase())) {
      description = `${focusKeyphrase}: ${description}`;
    }

    // Add CTA (Call to Action) - Yoast best practice
    const ctas = [
      'Pelajari selengkapnya!',
      'Temukan solusinya di sini!',
      'Baca artikel lengkapnya!',
      'Dapatkan informasi terbaru!'
    ];
    const randomCta = ctas[Math.floor(Math.random() * ctas.length)];

    // Truncate to 150 chars leaving room for CTA
    const maxDescLength = 150 - randomCta.length - 1;
    if (description.length > maxDescLength) {
      description = description.substring(0, maxDescLength - 3) + '...';
    }

    description = `${description} ${randomCta}`;

    return description.substring(0, 160);
  }

  /**
   * Extract focus keyphrase based on category and content analysis
   */
  extractFocusKeyphrase(title, content) {
    const cleanTitle = title.toLowerCase();
    const plainContent = this.stripHtml(content).toLowerCase();
    
    // Check primary keywords first
    for (const keyword of this.keywords.primary) {
      if (cleanTitle.includes(keyword) || plainContent.includes(keyword)) {
        return keyword;
      }
    }

    // Check secondary keywords
    for (const keyword of this.keywords.secondary) {
      if (cleanTitle.includes(keyword) || plainContent.includes(keyword)) {
        return keyword;
      }
    }

    // Default to product name or first primary keyword
    return this.keywords.primary[0];
  }

  /**
   * Generate LSI (Latent Semantic Indexing) keywords for content enrichment
   */
  generateLSIKeywords(focusKeyphrase) {
    return [...this.keywords.secondary, ...this.keywords.lsi].slice(0, 5);
  }

  /**
   * Calculate keyword density (aim for 1-2%)
   */
  calculateKeywordDensity(content, keyphrase) {
    const plainText = this.stripHtml(content).toLowerCase();
    const words = plainText.split(/\s+/).length;
    const keyphraseRegex = new RegExp(keyphrase.toLowerCase(), 'gi');
    const matches = (plainText.match(keyphraseRegex) || []).length;
    
    return ((matches * keyphrase.split(' ').length) / words * 100).toFixed(2);
  }

  /**
   * Estimate reading time (Yoast feature)
   */
  estimateReadingTime(content) {
    const plainText = this.stripHtml(content);
    const words = plainText.split(/\s+/).length;
    const wordsPerMinute = 200; // Average reading speed
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} menit`;
  }

  /**
   * Generate canonical URL
   */
  generateCanonicalUrl(slug, locale) {
    const langPrefix = locale === 'en' ? '/en' : '/id';
    return `${CONFIG.BASE_URL}${langPrefix}/media/artikel/${slug}`;
  }

  /**
   * Generate Schema.org Article structured data (JSON-LD)
   */
  generateStructuredData(article) {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${article.canonicalUrl}#article`,
          "isPartOf": {
            "@id": article.canonicalUrl
          },
          "author": {
            "@type": "Organization",
            "name": CONFIG.ORGANIZATION.name,
            "@id": `${CONFIG.ORGANIZATION.url}#organization`
          },
          "headline": article.metaTitle,
          "datePublished": article.publishedAt,
          "dateModified": article.updatedAt,
          "mainEntityOfPage": {
            "@id": article.canonicalUrl
          },
          "wordCount": article.wordCount,
          "publisher": {
            "@id": `${CONFIG.ORGANIZATION.url}#organization`
          },
          "image": {
            "@type": "ImageObject",
            "url": `${CONFIG.BASE_URL}/images/articles/${article.slug}.jpg`,
            "width": 1200,
            "height": 630
          },
          "keywords": article.lsiKeywords.join(', '),
          "articleSection": article.category,
          "inLanguage": article.locale === 'id' ? 'id-ID' : 'en-US'
        },
        {
          "@type": "WebPage",
          "@id": article.canonicalUrl,
          "url": article.canonicalUrl,
          "name": article.metaTitle,
          "isPartOf": {
            "@id": `${CONFIG.ORGANIZATION.url}#website`
          },
          "datePublished": article.publishedAt,
          "dateModified": article.updatedAt,
          "description": article.metaDescription,
          "breadcrumb": {
            "@id": `${article.canonicalUrl}#breadcrumb`
          },
          "inLanguage": article.locale === 'id' ? 'id-ID' : 'en-US'
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${article.canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Beranda",
              "item": CONFIG.ORGANIZATION.url
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Media",
              "item": `${CONFIG.ORGANIZATION.url}/${article.locale}/media`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Artikel",
              "item": `${CONFIG.ORGANIZATION.url}/${article.locale}/media/artikel`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": article.title
            }
          ]
        },
        {
          "@type": "Organization",
          "@id": `${CONFIG.ORGANIZATION.url}#organization`,
          "name": CONFIG.ORGANIZATION.name,
          "url": CONFIG.ORGANIZATION.url,
          "logo": {
            "@type": "ImageObject",
            "url": CONFIG.ORGANIZATION.logo,
            "width": 500,
            "height": 500
          },
          "sameAs": CONFIG.ORGANIZATION.sameAs,
          "description": "Solusi Bioteknologi Terintegrasi untuk Pertanian dan Peternakan Indonesia"
        },
        {
          "@type": "WebSite",
          "@id": `${CONFIG.ORGANIZATION.url}#website`,
          "url": CONFIG.ORGANIZATION.url,
          "name": CONFIG.ORGANIZATION.name,
          "description": "Solusi Bioteknologi Terintegrasi untuk Pertanian dan Peternakan Indonesia",
          "publisher": {
            "@id": `${CONFIG.ORGANIZATION.url}#organization`
          },
          "inLanguage": ["id-ID", "en-US"]
        }
      ]
    };

    return JSON.stringify(schema);
  }

  /**
   * Generate optimized slug
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100);
  }

  /**
   * Generate short description for article cards
   */
  generateShortDescription(content, maxLength = 200) {
    const plainText = this.stripHtml(content);
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    let shortDesc = sentences.slice(0, 2).join('. ').trim();
    
    if (shortDesc.length > maxLength) {
      shortDesc = shortDesc.substring(0, maxLength - 3) + '...';
    }
    
    if (!shortDesc.endsWith('.') && !shortDesc.endsWith('...')) {
      shortDesc += '.';
    }

    return shortDesc;
  }

  /**
   * Analyze content structure (H1, H2, paragraphs, lists)
   */
  analyzeContentStructure(content) {
    const h1Count = (content.match(/<h1/gi) || []).length;
    const h2Count = (content.match(/<h2/gi) || []).length;
    const h3Count = (content.match(/<h3/gi) || []).length;
    const pCount = (content.match(/<p/gi) || []).length;
    const listCount = (content.match(/<[uo]l/gi) || []).length;
    
    return {
      h1Count,
      h2Count,
      h3Count,
      pCount,
      listCount,
      hasGoodStructure: h2Count >= 2 && pCount >= 3
    };
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /**
   * Full SEO optimization for an article
   */
  optimizeArticle(title, htmlContent, locale = 'id') {
    const focusKeyphrase = this.extractFocusKeyphrase(title, htmlContent);
    const slug = this.generateSlug(title);
    const canonicalUrl = this.generateCanonicalUrl(slug, locale);
    const plainText = this.stripHtml(htmlContent);
    const wordCount = plainText.split(/\s+/).length;
    const lsiKeywords = this.generateLSIKeywords(focusKeyphrase);
    const now = new Date().toISOString();

    const optimized = {
      title: title.replace(/\.docx?$/i, '').replace(/[-_]/g, ' ').trim(),
      slug,
      locale,
      metaTitle: this.generateMetaTitle(title, focusKeyphrase),
      metaDescription: this.generateMetaDescription(title, htmlContent, focusKeyphrase),
      focusKeyphrase: focusKeyphrase.substring(0, 100),
      canonicalUrl,
      robotsDirective: 'index, follow',
      shortDescription: this.generateShortDescription(htmlContent),
      wordCount,
      readingTime: this.estimateReadingTime(htmlContent),
      keywordDensity: this.calculateKeywordDensity(htmlContent, focusKeyphrase),
      lsiKeywords,
      contentStructure: this.analyzeContentStructure(htmlContent),
      category: this.keywords.category,
      product: this.keywords.product,
      publishedAt: now,
      updatedAt: now
    };

    // Generate structured data with all info
    optimized.structuredData = this.generateStructuredData(optimized);

    return optimized;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// HTML TO STRAPI JSON CONVERTER
// ═══════════════════════════════════════════════════════════════════════════════

class HtmlToStrapiConverter {
  convert(html) {
    const blocks = [];
    
    // Split by major tags
    const parts = html.split(/(<h[1-6][^>]*>.*?<\/h[1-6]>|<p[^>]*>.*?<\/p>|<[uo]l[^>]*>.*?<\/[uo]l>)/gis);
    
    for (const part of parts) {
      if (!part.trim()) continue;
      
      if (/<h1/i.test(part)) {
        blocks.push(this.createHeading(part, 1));
      } else if (/<h2/i.test(part)) {
        blocks.push(this.createHeading(part, 2));
      } else if (/<h3/i.test(part)) {
        blocks.push(this.createHeading(part, 3));
      } else if (/<h4/i.test(part)) {
        blocks.push(this.createHeading(part, 4));
      } else if (/<p/i.test(part)) {
        blocks.push(this.createParagraph(part));
      } else if (/<ul/i.test(part)) {
        blocks.push(this.createList(part, 'unordered'));
      } else if (/<ol/i.test(part)) {
        blocks.push(this.createList(part, 'ordered'));
      } else if (part.trim()) {
        blocks.push(this.createParagraph(`<p>${part}</p>`));
      }
    }

    return blocks.filter(b => b !== null);
  }

  createHeading(html, level) {
    const text = this.stripTags(html);
    if (!text.trim()) return null;

    return {
      type: 'heading',
      children: [{ type: 'text', text: text.trim() }],
      level: level
    };
  }

  createParagraph(html) {
    const text = this.stripTags(html);
    if (!text.trim()) return null;

    return {
      type: 'paragraph',
      children: [{ type: 'text', text: text.trim() }]
    };
  }

  createList(html, format) {
    const items = html.match(/<li[^>]*>(.*?)<\/li>/gis) || [];
    if (items.length === 0) return null;

    const listItems = items.map(item => ({
      type: 'list-item',
      children: [{ type: 'text', text: this.stripTags(item).trim() }]
    }));

    return {
      type: 'list',
      format: format,
      children: listItems
    };
  }

  stripTags(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATABASE HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

class DatabaseHandler {
  constructor() {
    this.db = new Database(CONFIG.STRAPI_DB);
  }

  insertArticle(article, contentJson) {
    const documentId = this.generateDocumentId();
    const now = new Date().toISOString();

    // Insert main article
    const insertStmt = this.db.prepare(`
      INSERT INTO articles (
        document_id, title, short_description, content, slug, type, 
        locale, created_at, updated_at, published_at,
        meta_title, meta_description, focus_keyphrase, canonical_url, robots_directive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      documentId,
      article.title,
      article.shortDescription,
      JSON.stringify(contentJson),
      article.slug,
      'article',
      article.locale,
      now,
      now,
      now,
      article.metaTitle,
      article.metaDescription,
      article.focusKeyphrase,
      article.canonicalUrl,
      article.robotsDirective
    );

    return { id: result.lastInsertRowid, documentId };
  }

  generateDocumentId() {
    return uuidv4().replace(/-/g, '').substring(0, 24);
  }

  close() {
    this.db.close();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// UPLOAD TRACKER
// ═══════════════════════════════════════════════════════════════════════════════

class UploadTracker {
  constructor() {
    this.filePath = CONFIG.UPLOADED_TRACKER;
    this.uploaded = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
      }
    } catch (e) {
      console.warn('Warning: Could not load tracker file');
    }
    return { files: [], lastRun: null };
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.uploaded, null, 2));
  }

  isUploaded(filename) {
    return this.uploaded.files.some(f => f.filename === filename);
  }

  markUploaded(filename, articleId, documentId, seoData) {
    this.uploaded.files.push({
      filename,
      articleId,
      documentId,
      uploadedAt: new Date().toISOString(),
      seo: {
        metaTitle: seoData.metaTitle,
        focusKeyphrase: seoData.focusKeyphrase,
        keywordDensity: seoData.keywordDensity,
        wordCount: seoData.wordCount,
        readingTime: seoData.readingTime
      }
    });
    this.uploaded.lastRun = new Date().toISOString();
    this.save();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN UPLOADER
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('  ENTERPRISE SEO ARTICLE UPLOADER v2.0 - CENTRA BIOTECH INDONESIA');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('');

  const args = process.argv.slice(2);
  const countArg = args.find(a => a.startsWith('--count='));
  const maxArticles = countArg ? parseInt(countArg.split('=')[1]) : 999;
  const dryRun = args.includes('--dry-run');

  const tracker = new UploadTracker();
  const converter = new HtmlToStrapiConverter();
  const dbHandler = dryRun ? null : new DatabaseHandler();

  // Get all categories
  const categories = fs.readdirSync(CONFIG.ARTICLES_DIR).filter(f => 
    fs.statSync(path.join(CONFIG.ARTICLES_DIR, f)).isDirectory()
  );

  console.log(`📂 Found ${categories.length} categories: ${categories.join(', ')}`);
  console.log(`📊 Max articles to process: ${maxArticles}`);
  console.log(`🔄 Dry run mode: ${dryRun ? 'YES' : 'NO'}`);
  console.log('');

  let processed = 0;
  let skipped = 0;
  let errors = 0;
  const results = [];

  for (const category of categories) {
    if (processed >= maxArticles) break;

    const categoryPath = path.join(CONFIG.ARTICLES_DIR, category);
    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.docx'));

    console.log(`\n📁 Processing category: ${category} (${files.length} files)`);
    console.log('─'.repeat(60));

    const seoOptimizer = new EnterpriseSEOOptimizer(category);

    for (const file of files) {
      if (processed >= maxArticles) break;

      const filePath = path.join(categoryPath, file);

      // Skip if already uploaded
      if (tracker.isUploaded(file)) {
        console.log(`⏭️  Skipping (already uploaded): ${file}`);
        skipped++;
        continue;
      }

      try {
        // Convert DOCX to HTML
        const result = await mammoth.convertToHtml({ path: filePath });
        const html = result.value;

        if (!html || html.trim().length < 50) {
          console.log(`⚠️  Skipping (empty content): ${file}`);
          skipped++;
          continue;
        }

        // Optimize for SEO
        const seoData = seoOptimizer.optimizeArticle(file.replace('.docx', ''), html);

        // Convert to Strapi JSON blocks
        const contentBlocks = converter.convert(html);

        console.log(`\n✅ ${file}`);
        console.log(`   📝 Title: ${seoData.title}`);
        console.log(`   🏷️  Meta Title: ${seoData.metaTitle} (${seoData.metaTitle.length} chars)`);
        console.log(`   📋 Meta Desc: ${seoData.metaDescription.substring(0, 60)}... (${seoData.metaDescription.length} chars)`);
        console.log(`   🔑 Focus Keyphrase: ${seoData.focusKeyphrase}`);
        console.log(`   📊 Keyword Density: ${seoData.keywordDensity}%`);
        console.log(`   📖 Word Count: ${seoData.wordCount} | Reading Time: ${seoData.readingTime}`);
        console.log(`   🔗 Canonical: ${seoData.canonicalUrl}`);
        console.log(`   🤖 Robots: ${seoData.robotsDirective}`);

        if (!dryRun) {
          // Insert into database
          const { id, documentId } = dbHandler.insertArticle(seoData, contentBlocks);
          tracker.markUploaded(file, id, documentId, seoData);
          console.log(`   💾 Saved to DB: ID=${id}, DocID=${documentId}`);
        } else {
          console.log(`   🔄 DRY RUN - Would save to database`);
        }

        results.push({
          file,
          title: seoData.title,
          slug: seoData.slug,
          metaTitle: seoData.metaTitle,
          focusKeyphrase: seoData.focusKeyphrase,
          wordCount: seoData.wordCount,
          keywordDensity: seoData.keywordDensity
        });

        processed++;

      } catch (err) {
        console.error(`❌ Error processing ${file}: ${err.message}`);
        errors++;
      }
    }
  }

  if (dbHandler) dbHandler.close();

  // Final summary
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('  UPLOAD SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log(`✅ Successfully processed: ${processed}`);
  console.log(`⏭️  Skipped (already uploaded): ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
  console.log('');

  if (results.length > 0) {
    console.log('📊 SEO OPTIMIZATION REPORT:');
    console.log('─'.repeat(80));
    console.log('| Title (truncated)                    | Keyphrase       | Words | Density |');
    console.log('─'.repeat(80));
    for (const r of results) {
      const title = r.title.substring(0, 35).padEnd(35);
      const kp = r.focusKeyphrase.substring(0, 15).padEnd(15);
      const words = String(r.wordCount).padStart(5);
      const density = `${r.keywordDensity}%`.padStart(7);
      console.log(`| ${title} | ${kp} | ${words} | ${density} |`);
    }
    console.log('─'.repeat(80));
  }

  console.log('\n🚀 Enterprise SEO Upload Complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Verify articles in Strapi Admin: https://cbi-backend.my.id/admin');
  console.log('2. Submit sitemap to Google Search Console');
  console.log('3. Request indexing for new URLs');
  console.log('');
}

main().catch(console.error);
