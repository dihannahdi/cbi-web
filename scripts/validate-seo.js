#!/usr/bin/env node

/**
 * SEO VALIDATION SCRIPT
 * Validates SEO implementation across the application
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✅ ${description}: Found`, colors.green);
    return true;
  } else {
    log(`❌ ${description}: Not found`, colors.red);
    return false;
  }
}

function checkFileContent(filePath, searchStrings, description) {
  if (!fs.existsSync(filePath)) {
    log(`❌ ${description}: File not found`, colors.red);
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const allFound = searchStrings.every(str => content.includes(str));
  
  if (allFound) {
    log(`✅ ${description}: All checks passed`, colors.green);
    return true;
  } else {
    const missing = searchStrings.filter(str => !content.includes(str));
    log(`⚠️  ${description}: Missing: ${missing.join(', ')}`, colors.yellow);
    return false;
  }
}

function validateRobotsTxt(filePath) {
  if (!fs.existsSync(filePath)) {
    log(`❌ robots.txt: Not found`, colors.red);
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const requiredPatterns = [
    'User-agent:',
    'Allow:',
    'Sitemap:',
  ];
  
  const allFound = requiredPatterns.every(pattern => content.includes(pattern));
  
  if (allFound) {
    log(`✅ robots.txt: Valid`, colors.green);
    return true;
  } else {
    log(`❌ robots.txt: Invalid or incomplete`, colors.red);
    return false;
  }
}

async function runSEOValidation() {
  log('\n==============================================', colors.blue);
  log('  SEO VALIDATION REPORT', colors.bright + colors.blue);
  log('==============================================\n', colors.blue);

  let totalChecks = 0;
  let passedChecks = 0;

  // 1. Check robots.txt
  log('\n📋 1. ROBOTS.TXT', colors.bright);
  totalChecks++;
  if (validateRobotsTxt(path.join(process.cwd(), 'public', 'robots.txt'))) {
    passedChecks++;
  }

  // 2. Check sitemap
  log('\n🗺️  2. SITEMAP', colors.bright);
  totalChecks++;
  if (checkFile(path.join(process.cwd(), 'app', 'sitemap.ts'), 'sitemap.ts')) {
    passedChecks++;
  }

  // 3. Check manifest.json
  log('\n📱 3. MANIFEST (PWA)', colors.bright);
  totalChecks++;
  if (checkFile(path.join(process.cwd(), 'public', 'manifest.json'), 'manifest.json')) {
    passedChecks++;
  }

  // 4. Check SEO utilities
  log('\n🛠️  4. SEO UTILITIES', colors.bright);
  totalChecks++;
  if (checkFileContent(
    path.join(process.cwd(), 'utils', 'seo.ts'),
    ['generateMetadataFromProps', 'SITE_CONFIG', 'openGraph', 'twitter'],
    'seo.ts'
  )) {
    passedChecks++;
  }

  // 5. Check structured data utilities
  log('\n📊 5. STRUCTURED DATA', colors.bright);
  totalChecks++;
  if (checkFileContent(
    path.join(process.cwd(), 'utils', 'structuredData.tsx'),
    ['generateOrganizationSchema', 'generateWebsiteSchema', 'StructuredData'],
    'structuredData.tsx'
  )) {
    passedChecks++;
  }

  // 6. Check layout.tsx metadata
  log('\n🎨 6. ROOT LAYOUT METADATA', colors.bright);
  totalChecks++;
  if (checkFileContent(
    path.join(process.cwd(), 'app', 'layout.tsx'),
    ['metadataBase', 'openGraph', 'twitter', 'robots', 'verification'],
    'layout.tsx'
  )) {
    passedChecks++;
  }

  // 7. Check landing page metadata
  log('\n🏠 7. LANDING PAGE SEO', colors.bright);
  totalChecks++;
  if (checkFileContent(
    path.join(process.cwd(), 'app', 'page.tsx'),
    ['generateMetadata', 'StructuredData', 'generateOrganizationSchema'],
    'page.tsx'
  )) {
    passedChecks++;
  }

  // 8. Check next.config for image optimization
  log('\n🖼️  8. IMAGE OPTIMIZATION', colors.bright);
  totalChecks++;
  if (checkFileContent(
    path.join(process.cwd(), 'next.config.ts'),
    ['remotePatterns', 'images'],
    'next.config.ts'
  )) {
    passedChecks++;
  }

  // 9. Check Google Analytics integration
  log('\n📈 9. ANALYTICS', colors.bright);
  totalChecks++;
  const gaComponent = path.join(process.cwd(), 'components', 'common', 'GoogleAnalytics.tsx');
  if (fs.existsSync(gaComponent)) {
    const layoutContent = fs.readFileSync(path.join(process.cwd(), 'app', 'layout.tsx'), 'utf8');
    if (layoutContent.includes('GoogleAnalytics')) {
      log(`✅ Google Analytics: Integrated`, colors.green);
      passedChecks++;
    } else {
      log(`⚠️  Google Analytics: Not integrated in layout`, colors.yellow);
    }
  } else {
    log(`❌ Google Analytics: Component not found`, colors.red);
  }

  // 10. Check environment variables
  log('\n🔐 10. ENVIRONMENT VARIABLES', colors.bright);
  const envLocal = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envLocal)) {
    const envContent = fs.readFileSync(envLocal, 'utf8');
    const hasBaseUrl = envContent.includes('NEXT_PUBLIC_SITE_URL');
    const hasApiUrl = envContent.includes('NEXT_PUBLIC_API_URL');
    
    totalChecks += 2;
    if (hasBaseUrl) {
      log(`✅ NEXT_PUBLIC_SITE_URL: Configured`, colors.green);
      passedChecks++;
    } else {
      log(`⚠️  NEXT_PUBLIC_SITE_URL: Not configured`, colors.yellow);
    }
    
    if (hasApiUrl) {
      log(`✅ NEXT_PUBLIC_API_URL: Configured`, colors.green);
      passedChecks++;
    } else {
      log(`⚠️  NEXT_PUBLIC_API_URL: Not configured`, colors.yellow);
    }
  } else {
    log(`⚠️  .env.local: Not found`, colors.yellow);
    totalChecks += 2;
  }

  // 11. Check AI Visibility Files (llms.txt)
  log('\n🤖 11. AI VISIBILITY (llms.txt)', colors.bright);
  totalChecks += 2;
  const llmsTxt = path.join(process.cwd(), 'public', 'llms.txt');
  const llmsFullTxt = path.join(process.cwd(), 'public', 'llms-full.txt');
  
  if (fs.existsSync(llmsTxt)) {
    const content = fs.readFileSync(llmsTxt, 'utf8');
    const hasKeywords = content.includes('pupuk hayati') && content.includes('insektisida hayati');
    if (hasKeywords) {
      log(`✅ llms.txt: Found with target keywords`, colors.green);
      passedChecks++;
    } else {
      log(`⚠️  llms.txt: Found but missing target keywords`, colors.yellow);
    }
  } else {
    log(`❌ llms.txt: Not found`, colors.red);
  }
  
  if (fs.existsSync(llmsFullTxt)) {
    log(`✅ llms-full.txt: Found`, colors.green);
    passedChecks++;
  } else {
    log(`⚠️  llms-full.txt: Not found`, colors.yellow);
  }

  // 12. Check IndexNow Implementation
  log('\n⚡ 12. INDEXNOW PROTOCOL', colors.bright);
  totalChecks += 2;
  
  // Check for IndexNow API route
  const indexNowRoute = path.join(process.cwd(), 'app', 'api', 'indexnow', 'route.ts');
  if (fs.existsSync(indexNowRoute)) {
    log(`✅ IndexNow API Route: Found`, colors.green);
    passedChecks++;
  } else {
    log(`⚠️  IndexNow API Route: Not found`, colors.yellow);
  }
  
  // Check for IndexNow key file (find any .txt file matching key pattern)
  const publicDir = path.join(process.cwd(), 'public');
  const publicFiles = fs.readdirSync(publicDir);
  const keyFile = publicFiles.find(f => /^[a-f0-9]{32}\.txt$/i.test(f));
  if (keyFile) {
    log(`✅ IndexNow Key File: ${keyFile}`, colors.green);
    passedChecks++;
  } else {
    log(`⚠️  IndexNow Key File: Not found`, colors.yellow);
  }

  // 13. Check Sitemap Routes (Advanced)
  log('\n🗺️  13. ADVANCED SITEMAPS', colors.bright);
  totalChecks += 4;
  
  const sitemapRoutes = [
    { path: 'sitemap.xml', name: 'Sitemap Index' },
    { path: 'sitemap-static.xml', name: 'Static Sitemap' },
    { path: 'sitemap-products.xml', name: 'Products Sitemap' },
    { path: 'sitemap-blog.xml', name: 'Blog Sitemap' },
  ];
  
  sitemapRoutes.forEach(route => {
    const routePath = path.join(process.cwd(), 'app', route.path, 'route.ts');
    if (fs.existsSync(routePath)) {
      log(`✅ ${route.name}: Found`, colors.green);
      passedChecks++;
    } else {
      log(`⚠️  ${route.name}: Not found`, colors.yellow);
    }
  });

  // Summary
  log('\n==============================================', colors.blue);
  log('  VALIDATION SUMMARY', colors.bright + colors.blue);
  log('==============================================\n', colors.blue);
  
  const percentage = ((passedChecks / totalChecks) * 100).toFixed(1);
  const color = percentage >= 90 ? colors.green : percentage >= 70 ? colors.yellow : colors.red;
  
  log(`Total Checks: ${totalChecks}`, colors.bright);
  log(`Passed: ${passedChecks}`, colors.green);
  log(`Failed: ${totalChecks - passedChecks}`, colors.red);
  log(`Success Rate: ${percentage}%`, color);
  
  if (percentage >= 90) {
    log('\n✅ SEO implementation looks great! 🎉', colors.green);
  } else if (percentage >= 70) {
    log('\n⚠️  SEO implementation needs some improvements.', colors.yellow);
  } else {
    log('\n❌ SEO implementation requires attention.', colors.red);
  }
  
  log('\n==============================================\n', colors.blue);

  // Recommendations
  if (passedChecks < totalChecks) {
    log('📝 RECOMMENDATIONS:', colors.bright + colors.blue);
    log('');
    
    if (!fs.existsSync(path.join(process.cwd(), 'public', 'robots.txt'))) {
      log('• Create robots.txt file in public directory', colors.yellow);
    }
    
    if (!fs.existsSync(path.join(process.cwd(), 'app', 'sitemap.ts'))) {
      log('• Create sitemap.ts in app directory', colors.yellow);
    }
    
    const envLocal = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocal)) {
      const envContent = fs.readFileSync(envLocal, 'utf8');
      if (!envContent.includes('NEXT_PUBLIC_SITE_URL')) {
        log('• Add NEXT_PUBLIC_SITE_URL to .env.local', colors.yellow);
      }
    } else {
      log('• Create .env.local with required environment variables', colors.yellow);
    }
    
    log('');
  }
  
  process.exit(passedChecks === totalChecks ? 0 : 1);
}

// Run validation
runSEOValidation().catch(error => {
  log(`\n❌ Error running SEO validation: ${error.message}`, colors.red);
  process.exit(1);
});
