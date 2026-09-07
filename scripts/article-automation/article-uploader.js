#!/usr/bin/env node
/**
 * CBI Article Automation System
 * =============================
 * Automatically processes DOCX articles from draft folder and uploads to Strapi CMS
 * with Enterprise SEO optimization.
 * 
 * Features:
 * - DOCX to Strapi JSON blocks conversion
 * - Enterprise SEO optimization (meta_title, meta_description, focus_keyphrase)
 * - SQLite direct database insertion
 * - Duplicate prevention via uploaded articles tracking
 * - Scheduled execution via cron (every 6 hours)
 * 
 * @author PT Centra Biotech Indonesia
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const cheerio = require('cheerio');
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

// =============================================================================
// CONFIGURATION
// =============================================================================
const CONFIG = {
  // Paths
  DRAFT_FOLDER: process.env.DRAFT_FOLDER || '/opt/cbi-article-automation/drafts',
  STRAPI_DB_PATH: process.env.STRAPI_DB_PATH || '/opt/cbi-strapi/.tmp/data.db',
  UPLOADED_TRACKER_PATH: process.env.UPLOADED_TRACKER || '/opt/cbi-article-automation/uploaded-articles.json',
  LOG_PATH: process.env.LOG_PATH || '/opt/cbi-article-automation/logs',
  
  // Settings
  ARTICLES_PER_RUN: parseInt(process.env.ARTICLES_PER_RUN || '1', 10), // Upload 1 article per 6 hours
  DEFAULT_LOCALE: 'id',
  DEFAULT_TYPE: 'news',
  ROBOTS_DIRECTIVE: 'index,follow',
  
  // SEO Settings
  META_TITLE_MAX: 70,
  META_DESCRIPTION_MAX: 160,
  FOCUS_KEYPHRASE_MAX: 100,
  
  // Company branding for SEO
  COMPANY_NAME: 'PT Centra Biotech Indonesia',
  COMPANY_SHORT: 'Centra Biotech',
  
  // Product keywords for SEO optimization
  PRODUCT_KEYWORDS: [
    'pupuk hayati', 'pupuk organik', 'insektisida hayati', 'asam humat',
    'biofertilizer', 'bioteknologi pertanian', 'pertanian berkelanjutan',
    'floraone', 'simbios', 'biojagat', 'biokiller', 'rajabio', 'black turbo',
    'bawang merah', 'padi', 'jagung', 'hortikultura', 'tanaman pangan'
  ]
};

// =============================================================================
// LOGGING UTILITY
// =============================================================================
class Logger {
  constructor() {
    this.ensureLogDir();
  }
  
  ensureLogDir() {
    if (!fs.existsSync(CONFIG.LOG_PATH)) {
      fs.mkdirSync(CONFIG.LOG_PATH, { recursive: true });
    }
  }
  
  getLogFile() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(CONFIG.LOG_PATH, `automation-${date}.log`);
  }
  
  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data })
    };
    
    const logLine = JSON.stringify(logEntry);
    console.log(`[${timestamp}] [${level}] ${message}`);
    
    fs.appendFileSync(this.getLogFile(), logLine + '\n');
  }
  
  info(message, data = null) { this.log('INFO', message, data); }
  warn(message, data = null) { this.log('WARN', message, data); }
  error(message, data = null) { this.log('ERROR', message, data); }
  success(message, data = null) { this.log('SUCCESS', message, data); }
}

const logger = new Logger();

// =============================================================================
// UPLOADED ARTICLES TRACKER
// =============================================================================
class UploadedTracker {
  constructor() {
    this.trackerPath = CONFIG.UPLOADED_TRACKER_PATH;
    this.data = this.load();
  }
  
  load() {
    try {
      if (fs.existsSync(this.trackerPath)) {
        const data = JSON.parse(fs.readFileSync(this.trackerPath, 'utf-8'));
        // Ensure required properties exist
        if (!Array.isArray(data.uploaded)) data.uploaded = [];
        if (typeof data.totalUploaded !== 'number') data.totalUploaded = data.uploaded.length;
        return data;
      }
    } catch (error) {
      logger.warn('Failed to load tracker, creating new one', { error: error.message });
    }
    return { uploaded: [], lastRun: null, totalUploaded: 0 };
  }
  
  save() {
    fs.writeFileSync(this.trackerPath, JSON.stringify(this.data, null, 2));
  }
  
  isUploaded(filename) {
    return this.data.uploaded.includes(filename);
  }
  
  markAsUploaded(filename, articleId, title) {
    this.data.uploaded.push(filename);
    this.data.lastRun = new Date().toISOString();
    this.data.totalUploaded++;
    
    if (!this.data.history) this.data.history = [];
    this.data.history.push({
      filename,
      articleId,
      title,
      uploadedAt: new Date().toISOString()
    });
    
    this.save();
  }
  
  getStats() {
    return {
      totalUploaded: this.data.totalUploaded,
      lastRun: this.data.lastRun,
      uploadedCount: this.data.uploaded.length
    };
  }
}

// =============================================================================
// HTML TO STRAPI BLOCKS CONVERTER
// =============================================================================
class HtmlToStrapiConverter {
  constructor() {
    this.$ = null;
  }
  
  /**
   * Convert HTML string to Strapi blocks format
   * @param {string} html - HTML content from mammoth
   * @returns {Array} Strapi blocks array
   */
  convert(html) {
    this.$ = cheerio.load(html);
    const blocks = [];
    
    // Process each top-level element
    this.$('body').children().each((_, element) => {
      const block = this.processElement(element);
      if (block) {
        if (Array.isArray(block)) {
          blocks.push(...block);
        } else {
          blocks.push(block);
        }
      }
    });
    
    return blocks;
  }
  
  processElement(element) {
    const tagName = element.tagName?.toLowerCase();
    
    switch (tagName) {
      case 'p':
        return this.processParagraph(element);
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return this.processHeading(element, parseInt(tagName[1]));
      case 'ul':
        return this.processList(element, 'unordered');
      case 'ol':
        return this.processList(element, 'ordered');
      case 'blockquote':
        return this.processBlockquote(element);
      case 'table':
        return this.processTable(element);
      default:
        // For unknown elements, try to extract text
        const text = this.$(element).text().trim();
        if (text) {
          return {
            type: 'paragraph',
            children: [{ type: 'text', text }]
          };
        }
        return null;
    }
  }
  
  processParagraph(element) {
    const children = this.processInlineChildren(element);
    
    // Skip empty paragraphs
    if (children.length === 0 || 
        (children.length === 1 && children[0].type === 'text' && !children[0].text.trim())) {
      return null;
    }
    
    return {
      type: 'paragraph',
      children
    };
  }
  
  processHeading(element, level) {
    const children = this.processInlineChildren(element);
    
    if (children.length === 0) return null;
    
    return {
      type: 'heading',
      level: Math.min(Math.max(level, 1), 6), // Ensure level is 1-6
      children
    };
  }
  
  processList(element, format) {
    const children = [];
    
    this.$(element).children('li').each((_, li) => {
      const listItemChildren = this.processInlineChildren(li);
      if (listItemChildren.length > 0) {
        children.push({
          type: 'list-item',
          children: listItemChildren
        });
      }
    });
    
    if (children.length === 0) return null;
    
    return {
      type: 'list',
      format,
      children
    };
  }
  
  processBlockquote(element) {
    const children = this.processInlineChildren(element);
    
    if (children.length === 0) return null;
    
    return {
      type: 'quote',
      children
    };
  }
  
  processTable(element) {
    // Strapi doesn't have native table support in blocks
    // Convert to formatted text
    const rows = [];
    this.$(element).find('tr').each((_, tr) => {
      const cells = [];
      this.$(tr).find('td, th').each((_, cell) => {
        cells.push(this.$(cell).text().trim());
      });
      if (cells.length > 0) {
        rows.push(cells.join(' | '));
      }
    });
    
    if (rows.length === 0) return null;
    
    return {
      type: 'paragraph',
      children: [{ type: 'text', text: rows.join('\n') }]
    };
  }
  
  processInlineChildren(element) {
    const children = [];
    
    this.$(element).contents().each((_, node) => {
      if (node.type === 'text') {
        const text = node.data;
        if (text) {
          children.push({ type: 'text', text });
        }
      } else if (node.type === 'tag') {
        const inlineBlock = this.processInlineElement(node);
        if (inlineBlock) {
          if (Array.isArray(inlineBlock)) {
            children.push(...inlineBlock);
          } else {
            children.push(inlineBlock);
          }
        }
      }
    });
    
    // Merge consecutive text nodes and apply formatting
    return this.mergeTextNodes(children);
  }
  
  processInlineElement(element) {
    const tagName = element.tagName?.toLowerCase();
    const text = this.$(element).text();
    
    if (!text.trim()) return null;
    
    const textNode = { type: 'text', text };
    
    switch (tagName) {
      case 'strong':
      case 'b':
        textNode.bold = true;
        break;
      case 'em':
      case 'i':
        textNode.italic = true;
        break;
      case 'u':
        textNode.underline = true;
        break;
      case 's':
      case 'strike':
        textNode.strikethrough = true;
        break;
      case 'code':
        textNode.code = true;
        break;
      case 'a':
        return {
          type: 'link',
          url: this.$(element).attr('href') || '',
          children: [{ type: 'text', text }]
        };
      case 'br':
        return { type: 'text', text: '\n' };
      case 'span':
        // Handle nested formatting in spans
        const innerChildren = this.processInlineChildren(element);
        return innerChildren;
    }
    
    return textNode;
  }
  
  mergeTextNodes(children) {
    // Remove empty text nodes and merge where appropriate
    return children.filter(child => {
      if (child.type === 'text') {
        return child.text !== '';
      }
      return true;
    });
  }
}

// =============================================================================
// SEO OPTIMIZER
// =============================================================================
class SEOOptimizer {
  constructor() {
    this.productKeywords = CONFIG.PRODUCT_KEYWORDS;
  }
  
  /**
   * Generate SEO-optimized fields from article content
   * @param {string} title - Article title
   * @param {string} plainText - Plain text content
   * @param {string} category - Article category folder name
   * @returns {Object} SEO fields
   */
  optimize(title, plainText, category) {
    const focusKeyphrase = this.generateFocusKeyphrase(title, plainText, category);
    const metaTitle = this.generateMetaTitle(title, focusKeyphrase);
    const metaDescription = this.generateMetaDescription(plainText, focusKeyphrase);
    const slug = this.generateSlug(title);
    
    return {
      meta_title: metaTitle,
      meta_description: metaDescription,
      focus_keyphrase: focusKeyphrase,
      slug,
      robots_directive: CONFIG.ROBOTS_DIRECTIVE
    };
  }
  
  /**
   * Generate focus keyphrase from title and content
   */
  generateFocusKeyphrase(title, plainText, category) {
    // Extract key terms from title
    const titleLower = title.toLowerCase();
    const contentLower = plainText.toLowerCase();
    
    // Find matching product keywords
    const matchedKeywords = this.productKeywords.filter(kw => 
      titleLower.includes(kw) || contentLower.includes(kw)
    );
    
    // Generate keyphrase based on category and matched keywords
    let keyphrase = '';
    
    // Category-specific keyphrases
    const categoryMap = {
      'asam humat': 'asam humat pupuk organik',
      'insektisida hayati': 'insektisida hayati pengendalian hama',
      'maklon pupuk': 'jasa maklon pupuk organik',
      'pupuk hayati': 'pupuk hayati biofertilizer',
      'pupuk organik cair': 'pupuk organik cair tanaman',
      'uji efektivitas': 'uji efektivitas produk pertanian'
    };
    
    const categoryLower = category.toLowerCase();
    keyphrase = categoryMap[categoryLower] || '';
    
    // Add matched product name if found
    const productNames = ['floraone', 'simbios', 'biojagat', 'biokiller', 'rajabio', 'black turbo', 'mashitam', 'trico-z'];
    for (const product of productNames) {
      if (titleLower.includes(product)) {
        keyphrase = product + ' ' + keyphrase;
        break;
      }
    }
    
    // Ensure keyphrase doesn't exceed max length
    keyphrase = keyphrase.trim().substring(0, CONFIG.FOCUS_KEYPHRASE_MAX);
    
    return keyphrase || 'bioteknologi pertanian indonesia';
  }
  
  /**
   * Generate SEO-optimized meta title
   */
  generateMetaTitle(title, focusKeyphrase) {
    // Title should be max 70 chars, include keyphrase, and brand
    let metaTitle = title;
    
    // If title is too long, truncate intelligently
    if (metaTitle.length > CONFIG.META_TITLE_MAX - 20) {
      // Try to cut at a natural break point
      const breakPoints = [' – ', ' - ', ': ', ' | '];
      for (const bp of breakPoints) {
        const idx = metaTitle.indexOf(bp);
        if (idx > 20 && idx < CONFIG.META_TITLE_MAX - 20) {
          metaTitle = metaTitle.substring(0, idx);
          break;
        }
      }
    }
    
    // Add brand suffix if space allows
    const brandSuffix = ' | Centra Biotech';
    if (metaTitle.length + brandSuffix.length <= CONFIG.META_TITLE_MAX) {
      metaTitle += brandSuffix;
    }
    
    return metaTitle.substring(0, CONFIG.META_TITLE_MAX);
  }
  
  /**
   * Generate SEO-optimized meta description
   */
  generateMetaDescription(plainText, focusKeyphrase) {
    // Extract first meaningful sentence(s) that contain keyphrase
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    let description = '';
    
    // Try to find a sentence containing the focus keyphrase
    const keyphraseWords = focusKeyphrase.toLowerCase().split(' ');
    for (const sentence of sentences.slice(0, 5)) {
      const sentenceLower = sentence.toLowerCase();
      const matchCount = keyphraseWords.filter(w => sentenceLower.includes(w)).length;
      
      if (matchCount >= 1) {
        description = sentence.trim();
        break;
      }
    }
    
    // Fallback to first sentence if no match
    if (!description && sentences.length > 0) {
      description = sentences[0].trim();
    }
    
    // Clean and truncate
    description = description
      .replace(/\s+/g, ' ')
      .replace(/[\n\r]/g, ' ')
      .trim();
    
    // Ensure it ends properly
    if (description.length > CONFIG.META_DESCRIPTION_MAX) {
      description = description.substring(0, CONFIG.META_DESCRIPTION_MAX - 3) + '...';
    }
    
    return description || `Artikel ${focusKeyphrase} dari ${CONFIG.COMPANY_SHORT}`;
  }
  
  /**
   * Generate URL-friendly slug
   */
  generateSlug(title) {
    return slugify(title, {
      lower: true,
      strict: true,
      locale: 'id',
      remove: /[*+~.()'"!:@]/g
    }).substring(0, 200);
  }
}

// =============================================================================
// DOCX PROCESSOR
// =============================================================================
class DocxProcessor {
  constructor() {
    this.converter = new HtmlToStrapiConverter();
    this.seoOptimizer = new SEOOptimizer();
  }
  
  /**
   * Process a DOCX file and extract article data
   * @param {string} filePath - Path to DOCX file
   * @param {string} category - Category folder name
   * @returns {Object} Processed article data
   */
  async process(filePath, category) {
    logger.info(`Processing DOCX: ${filePath}`);
    
    // Read and convert DOCX to HTML
    const result = await mammoth.convertToHtml({ path: filePath }, {
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "b => strong",
        "i => em",
        "u => u"
      ]
    });
    
    const html = result.value;
    const warnings = result.messages;
    
    if (warnings.length > 0) {
      logger.warn('Mammoth warnings', { warnings });
    }
    
    // Extract plain text for SEO analysis
    const textResult = await mammoth.extractRawText({ path: filePath });
    const plainText = textResult.value;
    
    // Extract title from filename or first heading
    let title = this.extractTitle(filePath, html);
    
    // Convert HTML to Strapi blocks
    const blocks = this.converter.convert(html);
    
    // Generate SEO fields
    const seoFields = this.seoOptimizer.optimize(title, plainText, category);
    
    // Generate short description (first 200 chars of content)
    const shortDescription = plainText
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 200);
    
    return {
      title,
      shortDescription,
      content: blocks,
      ...seoFields,
      locale: CONFIG.DEFAULT_LOCALE,
      type: CONFIG.DEFAULT_TYPE
    };
  }
  
  /**
   * Extract title from filename or first heading in HTML
   */
  extractTitle(filePath, html) {
    // First try to get from first H1 or H2
    const $ = cheerio.load(html);
    const h1 = $('h1').first().text().trim();
    if (h1) return h1;
    
    const h2 = $('h2').first().text().trim();
    if (h2) return h2;
    
    // Fallback to filename
    const filename = path.basename(filePath, '.docx');
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

// =============================================================================
// DATABASE HANDLER
// =============================================================================
class DatabaseHandler {
  constructor() {
    this.db = null;
  }
  
  connect() {
    try {
      this.db = new Database(CONFIG.STRAPI_DB_PATH);
      logger.info('Connected to Strapi SQLite database');
    } catch (error) {
      logger.error('Failed to connect to database', { error: error.message });
      throw error;
    }
  }
  
  disconnect() {
    if (this.db) {
      this.db.close();
      logger.info('Disconnected from database');
    }
  }
  
  /**
   * Generate a unique document ID (24 char alphanumeric)
   */
  generateDocumentId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 24; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  /**
   * Check if an article with the same slug already exists
   */
  articleExists(slug) {
    const stmt = this.db.prepare('SELECT id FROM articles WHERE slug = ?');
    const result = stmt.get(slug);
    return !!result;
  }
  
  /**
   * Insert a new article into the database
   * @param {Object} article - Article data
   * @returns {number} Inserted article ID
   */
  insertArticle(article) {
    const documentId = this.generateDocumentId();
    const now = new Date().toISOString();
    
    // Check for duplicate slug
    if (this.articleExists(article.slug)) {
      // Append timestamp to slug to make it unique
      article.slug = `${article.slug}-${Date.now()}`;
      logger.warn('Duplicate slug detected, appended timestamp', { newSlug: article.slug });
    }
    
    const stmt = this.db.prepare(`
      INSERT INTO articles (
        document_id, title, short_description, content, slug, type,
        created_at, updated_at, published_at, locale,
        meta_title, meta_description, focus_keyphrase,
        canonical_url, robots_directive
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?
      )
    `);
    
    const contentJson = JSON.stringify(article.content);
    
    const result = stmt.run(
      documentId,
      article.title,
      article.shortDescription || '',
      contentJson,
      article.slug,
      article.type || CONFIG.DEFAULT_TYPE,
      now,
      now,
      now, // Published immediately
      article.locale || CONFIG.DEFAULT_LOCALE,
      article.meta_title || '',
      article.meta_description || '',
      article.focus_keyphrase || '',
      article.canonical_url || '',
      article.robots_directive || CONFIG.ROBOTS_DIRECTIVE
    );
    
    logger.success('Article inserted successfully', {
      id: result.lastInsertRowid,
      documentId,
      title: article.title,
      slug: article.slug
    });
    
    return result.lastInsertRowid;
  }
  
  /**
   * Get article count
   */
  getArticleCount() {
    const stmt = this.db.prepare('SELECT COUNT(*) as count FROM articles');
    return stmt.get().count;
  }
}

// =============================================================================
// DRAFT FOLDER SCANNER
// =============================================================================
class DraftScanner {
  constructor(tracker) {
    this.tracker = tracker;
  }
  
  /**
   * Scan draft folder and return list of unprocessed DOCX files
   * @returns {Array} List of file objects with path and category
   */
  scan() {
    const files = [];
    
    if (!fs.existsSync(CONFIG.DRAFT_FOLDER)) {
      logger.error('Draft folder does not exist', { path: CONFIG.DRAFT_FOLDER });
      return files;
    }
    
    // Get all category folders
    const categories = fs.readdirSync(CONFIG.DRAFT_FOLDER, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    logger.info(`Found ${categories.length} category folders`, { categories });
    
    for (const category of categories) {
      const categoryPath = path.join(CONFIG.DRAFT_FOLDER, category);
      
      // Get all DOCX files in category
      const docxFiles = fs.readdirSync(categoryPath)
        .filter(file => file.toLowerCase().endsWith('.docx'))
        .filter(file => !this.tracker.isUploaded(file)); // Exclude already uploaded
      
      for (const file of docxFiles) {
        files.push({
          filename: file,
          path: path.join(categoryPath, file),
          category
        });
      }
    }
    
    logger.info(`Found ${files.length} unprocessed DOCX files`);
    return files;
  }
}

// =============================================================================
// MAIN AUTOMATION CONTROLLER
// =============================================================================
class ArticleAutomation {
  constructor() {
    this.tracker = new UploadedTracker();
    this.scanner = new DraftScanner(this.tracker);
    this.processor = new DocxProcessor();
    this.database = new DatabaseHandler();
  }
  
  /**
   * Run the automation
   */
  async run() {
    logger.info('========================================');
    logger.info('CBI Article Automation Started');
    logger.info('========================================');
    
    const startTime = Date.now();
    let uploadedCount = 0;
    
    try {
      // Connect to database
      this.database.connect();
      
      // Get initial article count
      const initialCount = this.database.getArticleCount();
      logger.info(`Current articles in database: ${initialCount}`);
      
      // Scan for unprocessed files
      const files = this.scanner.scan();
      
      if (files.length === 0) {
        logger.info('No new articles to process');
        return { success: true, uploaded: 0, message: 'No new articles' };
      }
      
      // Process limited number of articles per run
      const toProcess = files.slice(0, CONFIG.ARTICLES_PER_RUN);
      logger.info(`Processing ${toProcess.length} article(s) this run`);
      
      for (const file of toProcess) {
        try {
          logger.info(`Processing: ${file.filename} (Category: ${file.category})`);
          
          // Process DOCX file
          const articleData = await this.processor.process(file.path, file.category);
          
          // Insert into database
          const articleId = this.database.insertArticle(articleData);
          
          // Mark as uploaded
          this.tracker.markAsUploaded(file.filename, articleId, articleData.title);
          
          uploadedCount++;
          
          logger.success(`Successfully uploaded: ${articleData.title}`, {
            id: articleId,
            slug: articleData.slug,
            focusKeyphrase: articleData.focus_keyphrase
          });
          
        } catch (error) {
          logger.error(`Failed to process ${file.filename}`, { 
            error: error.message,
            stack: error.stack 
          });
        }
      }
      
      // Get final article count
      const finalCount = this.database.getArticleCount();
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      logger.info('========================================');
      logger.success('Automation Complete', {
        articlesProcessed: uploadedCount,
        totalArticles: finalCount,
        remainingDrafts: files.length - uploadedCount,
        duration: `${duration}s`
      });
      logger.info('========================================');
      
      return {
        success: true,
        uploaded: uploadedCount,
        totalArticles: finalCount,
        remaining: files.length - uploadedCount
      };
      
    } catch (error) {
      logger.error('Automation failed', { error: error.message, stack: error.stack });
      return { success: false, error: error.message };
      
    } finally {
      this.database.disconnect();
    }
  }
  
  /**
   * Get statistics
   */
  getStats() {
    return this.tracker.getStats();
  }
}

// =============================================================================
// CLI ENTRY POINT
// =============================================================================
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
CBI Article Automation System
=============================

Usage: node article-uploader.js [options]

Options:
  --help, -h     Show this help message
  --stats        Show upload statistics
  --dry-run      Scan files without uploading
  --count N      Override articles per run (default: 1)

Environment Variables:
  DRAFT_FOLDER          Path to draft articles folder
  STRAPI_DB_PATH        Path to Strapi SQLite database
  ARTICLES_PER_RUN      Number of articles to process per run
  LOG_PATH              Path to log files directory

Example:
  node article-uploader.js
  node article-uploader.js --stats
  node article-uploader.js --count 5
    `);
    process.exit(0);
  }
  
  const automation = new ArticleAutomation();
  
  if (args.includes('--stats')) {
    const stats = automation.getStats();
    console.log('\nUpload Statistics:');
    console.log('==================');
    console.log(`Total Uploaded: ${stats.totalUploaded}`);
    console.log(`Last Run: ${stats.lastRun || 'Never'}`);
    process.exit(0);
  }
  
  if (args.includes('--dry-run')) {
    const scanner = new DraftScanner(new UploadedTracker());
    const files = scanner.scan();
    console.log('\nDry Run - Files to be processed:');
    console.log('=================================');
    files.forEach((f, i) => {
      console.log(`${i + 1}. [${f.category}] ${f.filename}`);
    });
    console.log(`\nTotal: ${files.length} files`);
    process.exit(0);
  }
  
  const countIdx = args.indexOf('--count');
  if (countIdx !== -1 && args[countIdx + 1]) {
    CONFIG.ARTICLES_PER_RUN = parseInt(args[countIdx + 1], 10);
  }
  
  const result = await automation.run();
  
  process.exit(result.success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { ArticleAutomation, DocxProcessor, SEOOptimizer, HtmlToStrapiConverter };
