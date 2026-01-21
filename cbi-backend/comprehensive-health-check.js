/**
 * COMPREHENSIVE HEALTH CHECK SYSTEM
 * Detects all possible errors in the CBI web application
 */

const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

// Color codes for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '═'.repeat(60));
  log(` ${title}`, 'cyan');
  console.log('═'.repeat(60) + '\n');
}

async function runHealthCheck() {
  const errors = [];
  const warnings = [];
  const info = [];

  try {
    logSection('🔍 COMPREHENSIVE HEALTH CHECK');

    // ===== 1. DATABASE CHECKS =====
    logSection('📊 DATABASE INTEGRITY');
    
    const SQL = await initSqlJs();
    const dbPath = path.join(__dirname, 'database.db');
    
    if (!fs.existsSync(dbPath)) {
      errors.push('Database file not found: database.db');
      log('❌ Database file not found', 'red');
    } else {
      log('✅ Database file exists', 'green');
      
      const dbBuffer = fs.readFileSync(dbPath);
      const db = new SQL.Database(dbBuffer);
      
      // Helper function
      const query = (sql) => {
        try {
          const result = db.exec(sql);
          if (result.length === 0) return [];
          const columns = result[0].columns;
          const values = result[0].values;
          return values.map(row => {
            const obj = {};
            columns.forEach((col, idx) => obj[col] = row[idx]);
            return obj;
          });
        } catch (e) {
          errors.push(`SQL Error: ${e.message} in query: ${sql.substring(0, 50)}...`);
          return [];
        }
      };
      
      // Check required tables exist
      const requiredTables = [
        'dashboards', 'about_uses', 'contacts', 'news_sections', 'blog_sections',
        'product_agricultures', 'product_livestocks', 'product_fisheries',
        'products', 'services', 'blogs', 'articles', 'managements', 'files'
      ];
      
      const tables = query("SELECT name FROM sqlite_master WHERE type='table'");
      const tableNames = tables.map(t => t.name);
      
      requiredTables.forEach(table => {
        if (tableNames.includes(table)) {
          const count = query(`SELECT COUNT(*) as count FROM ${table}`);
          const recordCount = count[0]?.count || 0;
          if (recordCount > 0) {
            log(`  ✅ ${table}: ${recordCount} records`, 'green');
          } else {
            warnings.push(`Table ${table} exists but has no records`);
            log(`  ⚠️  ${table}: 0 records`, 'yellow');
          }
        } else {
          errors.push(`Required table missing: ${table}`);
          log(`  ❌ ${table}: NOT FOUND`, 'red');
        }
      });
      
      // Check for published records
      log('\nChecking published records:', 'cyan');
      const publishedChecks = [
        { table: 'dashboards', name: 'Dashboard' },
        { table: 'about_uses', name: 'About Us' },
        { table: 'contacts', name: 'Contact' },
        { table: 'news_sections', name: 'News Section' },
        { table: 'product_agricultures', name: 'Product Agriculture' },
        { table: 'product_livestocks', name: 'Product Livestock' },
        { table: 'product_fisheries', name: 'Product Fishery' }
      ];
      
      publishedChecks.forEach(({ table, name }) => {
        const published = query(`SELECT COUNT(*) as count FROM ${table} WHERE published_at IS NOT NULL`);
        const count = published[0]?.count || 0;
        if (count > 0) {
          log(`  ✅ ${name}: ${count} published`, 'green');
        } else {
          warnings.push(`No published ${name} found`);
          log(`  ⚠️  ${name}: No published records`, 'yellow');
        }
      });
      
      // Check file references integrity
      log('\nChecking file references:', 'cyan');
      const filesInDb = query('SELECT id, name, url FROM files');
      const uploadsPath = path.join(__dirname, '..', 'cbi-strapi-sqlite', 'public', 'uploads');
      
      if (!fs.existsSync(uploadsPath)) {
        errors.push(`Uploads directory not found: ${uploadsPath}`);
        log('  ❌ Uploads directory not found', 'red');
      } else {
        const uploadedFiles = fs.readdirSync(uploadsPath);
        let missingFiles = 0;
        let foundFiles = 0;
        
        filesInDb.forEach(file => {
          if (file.url) {
            const filename = file.url.replace('/uploads/', '');
            if (uploadedFiles.includes(filename)) {
              foundFiles++;
            } else {
              missingFiles++;
              warnings.push(`Referenced file missing: ${filename}`);
            }
          }
        });
        
        log(`  ✅ ${foundFiles} files found in uploads`, 'green');
        if (missingFiles > 0) {
          log(`  ⚠️  ${missingFiles} referenced files missing`, 'yellow');
        }
      }
      
      db.close();
    }
    
    // ===== 2. DATA.JSON CHECKS =====
    logSection('📄 EXTRACTED DATA');
    
    const dataPath = path.join(__dirname, 'data.json');
    if (!fs.existsSync(dataPath)) {
      errors.push('data.json not found - run npm run extract');
      log('❌ data.json not found', 'red');
    } else {
      log('✅ data.json exists', 'green');
      
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      // Check all required collections
      const requiredCollections = [
        'dashboards', 'aboutUses', 'contacts', 'newsSections', 'blogSections',
        'productAgricultures', 'productLivestocks', 'productFisheries',
        'products', 'services', 'blogs', 'articles', 'managements'
      ];
      
      requiredCollections.forEach(collection => {
        if (data[collection]) {
          const count = data[collection].length;
          if (count > 0) {
            log(`  ✅ ${collection}: ${count} items`, 'green');
          } else {
            warnings.push(`Collection ${collection} is empty`);
            log(`  ⚠️  ${collection}: empty array`, 'yellow');
          }
        } else {
          errors.push(`Missing collection in data.json: ${collection}`);
          log(`  ❌ ${collection}: NOT FOUND`, 'red');
        }
      });
      
      // Deep structure validation for critical pages
      log('\nValidating data structures:', 'cyan');
      
      // Dashboard structure
      if (data.dashboards && data.dashboards.length > 0) {
        const dashboard = data.dashboards.find(d => d.published_at) || data.dashboards[0];
        const requiredFields = ['headline', 'whySection', 'productService', 'ourImpact', 'bannerCTA', 'latestNews'];
        requiredFields.forEach(field => {
          if (dashboard[field]) {
            log(`  ✅ Dashboard.${field}`, 'green');
          } else {
            errors.push(`Dashboard missing field: ${field}`);
            log(`  ❌ Dashboard.${field}`, 'red');
          }
        });
      }
      
      // About Us structure
      if (data.aboutUses && data.aboutUses.length > 0) {
        const aboutUs = data.aboutUses.find(d => d.published_at) || data.aboutUses[0];
        const requiredFields = ['headline', 'aboutUs', 'visionMission', 'corporateValue', 'bannerCTA', 'managements'];
        requiredFields.forEach(field => {
          if (aboutUs[field]) {
            log(`  ✅ AboutUs.${field}`, 'green');
          } else {
            errors.push(`About Us missing field: ${field}`);
            log(`  ❌ AboutUs.${field}`, 'red');
          }
        });
      }
      
      // Contact structure
      if (data.contacts && data.contacts.length > 0) {
        const contact = data.contacts.find(d => d.published_at) || data.contacts[0];
        const requiredFields = ['headline', 'title', 'description', 'addressAndContact'];
        requiredFields.forEach(field => {
          if (contact[field]) {
            log(`  ✅ Contact.${field}`, 'green');
          } else {
            errors.push(`Contact missing field: ${field}`);
            log(`  ❌ Contact.${field}`, 'red');
          }
        });
      }
      
      // Product pages structure
      const productPages = [
        { key: 'productAgricultures', name: 'Agriculture' },
        { key: 'productLivestocks', name: 'Livestock' },
        { key: 'productFisheries', name: 'Fishery' }
      ];
      
      productPages.forEach(({ key, name }) => {
        if (data[key] && data[key].length > 0) {
          const product = data[key].find(d => d.published_at) || data[key][0];
          const requiredFields = ['headline', 'aboutSection', 'whySection', 'bannerCTA'];
          requiredFields.forEach(field => {
            if (product[field]) {
              log(`  ✅ Product${name}.${field}`, 'green');
            } else {
              errors.push(`Product ${name} missing field: ${field}`);
              log(`  ❌ Product${name}.${field}`, 'red');
            }
          });
        }
      });
    }
    
    // ===== 3. SERVER CHECKS =====
    logSection('🚀 BACKEND SERVER');
    
    const serverPath = path.join(__dirname, 'server.js');
    if (!fs.existsSync(serverPath)) {
      errors.push('server.js not found');
      log('❌ server.js not found', 'red');
    } else {
      log('✅ server.js exists', 'green');
      
      const serverCode = fs.readFileSync(serverPath, 'utf8');
      
      // Check required endpoints
      const requiredEndpoints = [
        '/api/dashboard',
        '/api/about-us',
        '/api/contact',
        '/api/news-section',
        '/api/blog-section',
        '/api/product-agriculture',
        '/api/product-livestock',
        '/api/product-fishery',
        '/api/products',
        '/api/services',
        '/api/blogs',
        '/api/articles'
      ];
      
      log('\nChecking endpoint definitions:', 'cyan');
      requiredEndpoints.forEach(endpoint => {
        const endpointPattern = endpoint.replace(/\//g, '\\/').replace(/-/g, '\\-');
        if (serverCode.includes(`'${endpoint}'`) || serverCode.includes(`"${endpoint}"`)) {
          log(`  ✅ ${endpoint}`, 'green');
        } else {
          warnings.push(`Endpoint might be missing: ${endpoint}`);
          log(`  ⚠️  ${endpoint} (check generic handler)`, 'yellow');
        }
      });
      
      // Check CORS is enabled
      if (serverCode.includes('cors()')) {
        log('  ✅ CORS enabled', 'green');
      } else {
        warnings.push('CORS might not be enabled');
        log('  ⚠️  CORS configuration unclear', 'yellow');
      }
      
      // Check static file serving
      if (serverCode.includes('/uploads')) {
        log('  ✅ Uploads folder served', 'green');
      } else {
        errors.push('Uploads folder not being served');
        log('  ❌ Uploads folder not served', 'red');
      }
    }
    
    // ===== 4. FRONTEND CHECKS =====
    logSection('⚛️  FRONTEND CONFIGURATION');
    
    const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
    if (!fs.existsSync(nextConfigPath)) {
      errors.push('next.config.ts not found');
      log('❌ next.config.ts not found', 'red');
    } else {
      log('✅ next.config.ts exists', 'green');
      
      const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
      
      // Check image hostname configuration
      log('\nChecking image hostname configuration:', 'cyan');
      if (nextConfig.includes('localhost')) {
        log('  ✅ localhost configured', 'green');
      } else {
        errors.push('localhost not configured in next.config.ts images.remotePatterns');
        log('  ❌ localhost not configured', 'red');
      }
      
      if (nextConfig.includes('9337')) {
        log('  ✅ Port 9337 configured', 'green');
      } else {
        warnings.push('Port 9337 not explicitly configured');
        log('  ⚠️  Port 9337 not configured', 'yellow');
      }
    }
    
    const envPath = path.join(__dirname, '..', '.env.local');
    if (!fs.existsSync(envPath)) {
      warnings.push('.env.local not found');
      log('⚠️  .env.local not found', 'yellow');
    } else {
      log('✅ .env.local exists', 'green');
      
      const envContent = fs.readFileSync(envPath, 'utf8');
      if (envContent.includes('NEXT_PUBLIC_URL_API')) {
        log('  ✅ NEXT_PUBLIC_URL_API defined', 'green');
        const match = envContent.match(/NEXT_PUBLIC_URL_API=(.+)/);
        if (match) {
          log(`     API: ${match[1]}`, 'gray');
        }
      } else {
        errors.push('NEXT_PUBLIC_URL_API not defined in .env.local');
        log('  ❌ NEXT_PUBLIC_URL_API not defined', 'red');
      }
    }
    
    // ===== 5. PAGE FILES CHECKS =====
    logSection('📑 PAGE FILES');
    
    const pagesPath = path.join(__dirname, '..', 'app');
    const requiredPages = [
      'page.tsx',
      'about-us/page.tsx',
      'contact/page.tsx',
      'news/page.tsx',
      'product/agriculture/page.tsx',
      'product/livestock/page.tsx',
      'product/fishery/page.tsx'
    ];
    
    requiredPages.forEach(page => {
      const pagePath = path.join(pagesPath, page);
      if (fs.existsSync(pagePath)) {
        log(`  ✅ ${page}`, 'green');
      } else {
        errors.push(`Page file missing: ${page}`);
        log(`  ❌ ${page}`, 'red');
      }
    });
    
    // ===== FINAL SUMMARY =====
    logSection('📋 HEALTH CHECK SUMMARY');
    
    if (errors.length === 0 && warnings.length === 0) {
      log('✅ ALL CHECKS PASSED! System is healthy.', 'green');
      return { status: 'healthy', errors: [], warnings: [], info: [] };
    }
    
    if (errors.length > 0) {
      log(`\n❌ CRITICAL ERRORS (${errors.length}):`, 'red');
      errors.forEach((err, i) => {
        log(`   ${i + 1}. ${err}`, 'red');
      });
    }
    
    if (warnings.length > 0) {
      log(`\n⚠️  WARNINGS (${warnings.length}):`, 'yellow');
      warnings.forEach((warn, i) => {
        log(`   ${i + 1}. ${warn}`, 'yellow');
      });
    }
    
    log('\n' + '═'.repeat(60) + '\n');
    
    if (errors.length > 0) {
      log('⚠️  Action Required: Fix critical errors before deployment', 'yellow');
      return { status: 'unhealthy', errors, warnings, info };
    } else {
      log('✅ System is operational with minor warnings', 'green');
      return { status: 'healthy-with-warnings', errors, warnings, info };
    }
    
  } catch (error) {
    log(`\n❌ Health check failed: ${error.message}`, 'red');
    console.error(error.stack);
    return { status: 'error', errors: [error.message], warnings, info };
  }
}

// Run if called directly
if (require.main === module) {
  runHealthCheck().then(result => {
    process.exit(result.status === 'healthy' ? 0 : 1);
  });
}

module.exports = { runHealthCheck };
