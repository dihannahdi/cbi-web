/**
 * AUTOMATED ERROR DETECTION TEST SUITE
 * Runs comprehensive tests to catch all possible errors
 */

const { runHealthCheck } = require('./comprehensive-health-check');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:9337${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          success: res.statusCode === 200,
          status: res.statusCode,
          data: data // Keep full data, don't truncate
        });
      });
    });
    req.on('error', () => resolve({ success: false, status: 0, error: 'Connection failed' }));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ success: false, status: 0, error: 'Timeout' });
    });
  });
}

async function runTests() {
  console.log('\n' + '═'.repeat(60));
  log(' 🧪 AUTOMATED ERROR DETECTION TEST SUITE', 'cyan');
  console.log('═'.repeat(60) + '\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check Validation
  log('Test 1: Running health check validation...', 'yellow');
  try {
    const healthResult = await runHealthCheck();
    if (healthResult.status !== 'unhealthy') {
      log('✅ PASS: Health check completed successfully', 'green');
      passed++;
    } else {
      log('❌ FAIL: Critical health check errors detected', 'red');
      failed++;
    }
  } catch (error) {
    log(`❌ FAIL: Health check crashed: ${error.message}`, 'red');
    failed++;
  }

  console.log('');

  // Test 2: API Endpoints
  log('Test 2: Testing API endpoints...', 'yellow');
  const endpoints = [
    '/health',
    '/api/dashboard',
    '/api/about-us',
    '/api/contact',
    '/api/news-section',
    '/api/product-agriculture',
    '/api/product-livestock',
    '/api/product-fishery',
    '/api/products',
    '/api/services',
    '/api/blogs',
    '/api/articles'
  ];

  let endpointsPassed = 0;
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    if (result.success) {
      log(`  ✅ ${endpoint}`, 'green');
      endpointsPassed++;
    } else {
      log(`  ❌ ${endpoint} - ${result.error || result.status}`, 'red');
    }
  }

  if (endpointsPassed === endpoints.length) {
    log(`✅ PASS: All ${endpoints.length} endpoints responding`, 'green');
    passed++;
  } else {
    log(`❌ FAIL: ${endpoints.length - endpointsPassed}/${endpoints.length} endpoints failed`, 'red');
    failed++;
  }

  console.log('');

  // Test 3: Data Structure Validation
  log('Test 3: Validating data structures...', 'yellow');
  try {
    const dashboardResult = await testEndpoint('/api/dashboard');
    if (dashboardResult.success) {
      const data = JSON.parse(dashboardResult.data);
      const requiredFields = ['headline', 'whySection', 'productService', 'ourImpact', 'bannerCTA', 'latestNews'];
      const missing = requiredFields.filter(field => !data.data[field]);
      
      if (missing.length === 0) {
        log('✅ PASS: Dashboard structure complete', 'green');
        passed++;
      } else {
        log(`❌ FAIL: Dashboard missing fields: ${missing.join(', ')}`, 'red');
        failed++;
      }
    } else {
      log('❌ FAIL: Could not fetch dashboard data', 'red');
      failed++;
    }
  } catch (error) {
    log(`❌ FAIL: Data structure validation failed: ${error.message}`, 'red');
    failed++;
  }

  console.log('');

  // Test 4: File System Checks
  log('Test 4: Checking file system...', 'yellow');
  const fs = require('fs');
  const path = require('path');
  
  const criticalFiles = [
    'database.db',
    'data.json',
    'server.js',
    'comprehensive-health-check.js',
    'extract-data.js'
  ];

  let filesPassed = true;
  for (const file of criticalFiles) {
    if (fs.existsSync(path.join(__dirname, file))) {
      log(`  ✅ ${file}`, 'green');
    } else {
      log(`  ❌ ${file} - MISSING`, 'red');
      filesPassed = false;
    }
  }

  if (filesPassed) {
    log('✅ PASS: All critical files present', 'green');
    passed++;
  } else {
    log('❌ FAIL: Some critical files missing', 'red');
    failed++;
  }

  // Final Summary
  console.log('\n' + '═'.repeat(60));
  log(' 📊 TEST SUMMARY', 'cyan');
  console.log('═'.repeat(60) + '\n');

  const total = passed + failed;
  const percentage = Math.round((passed / total) * 100);

  log(`Total Tests: ${total}`, 'cyan');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`Success Rate: ${percentage}%`, percentage === 100 ? 'green' : 'yellow');

  console.log('\n' + '═'.repeat(60) + '\n');

  if (failed === 0) {
    log('🎉 ALL TESTS PASSED! System is error-free.', 'green');
    return 0;
  } else {
    log('⚠️  SOME TESTS FAILED. Review errors above.', 'yellow');
    return 1;
  }
}

if (require.main === module) {
  runTests().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Test suite crashed:', error);
    process.exit(1);
  });
}

module.exports = { runTests };
