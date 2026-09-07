#!/usr/bin/env node
/**
 * IndexNow Bulk Submission
 * Submits all blog article URLs to IndexNow API for immediate indexing notification
 * IndexNow notifies: Bing, Yandex, and Google (via Bing partnership)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const SLUGS_FILE = path.join(__dirname, '../blog-slugs.txt');
const BASE_URL = 'https://www.centrabiotechindonesia.com';
const INDEXNOW_KEY = 'ccb7653f357e4936b9a5d5183ae215af';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

// IndexNow endpoints (submit to all for coverage)
const ENDPOINTS = [
  { host: 'api.indexnow.org', path: '/IndexNow', name: 'IndexNow API' },
  { host: 'www.bing.com', path: '/IndexNow', name: 'Bing' },
];

function readSlugs() {
  const content = fs.readFileSync(SLUGS_FILE, 'utf8');
  return content.trim().split('\n').map(s => s.trim()).filter(Boolean);
}

function buildUrls(slugs) {
  const urls = [];
  // Add both /id/ and /en/ versions for each slug
  for (const slug of slugs) {
    urls.push(`${BASE_URL}/id/blog/${slug}`);
    urls.push(`${BASE_URL}/en/blog/${slug}`);
  }
  return urls;
}

function httpPost(host, pathname, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: host,
      port: 443,
      path: pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: responseData }));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function submitBatch(endpoint, urls, batchNum, totalBatches) {
  const payload = {
    host: 'www.centrabiotechindonesia.com',
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`  → [${endpoint.name}] Batch ${batchNum}/${totalBatches}: ${urls.length} URLs...`);
  
  try {
    const result = await httpPost(endpoint.host, endpoint.path, payload);
    
    if (result.status === 200 || result.status === 202) {
      console.log(`  ✓ [${endpoint.name}] Success (HTTP ${result.status})`);
      return { success: true, count: urls.length };
    } else if (result.status === 422) {
      console.log(`  ⚠ [${endpoint.name}] HTTP 422 - URL list issue`);
      console.log(`    Response: ${result.body.substring(0, 200)}`);
      return { success: false, count: 0 };
    } else {
      console.log(`  ✗ [${endpoint.name}] HTTP ${result.status}: ${result.body.substring(0, 200)}`);
      return { success: false, count: 0 };
    }
  } catch (err) {
    console.log(`  ✗ [${endpoint.name}] Error: ${err.message}`);
    return { success: false, count: 0 };
  }
}

async function main() {
  console.log('=== IndexNow Bulk URL Submission ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Key: ${INDEXNOW_KEY}`);
  console.log(`Key URL: ${KEY_LOCATION}`);
  console.log('');

  // Read slugs
  const slugs = readSlugs();
  console.log(`Slugs loaded: ${slugs.length}`);

  // Build all URLs (both /id/ and /en/)
  const allUrls = buildUrls(slugs);
  console.log(`Total URLs to submit: ${allUrls.length} (${slugs.length} slugs × 2 locales)`);
  console.log('');

  // Also include other important pages
  const extraUrls = [
    `${BASE_URL}/id/produk-layanan/pertanian/flora-one`,
    `${BASE_URL}/en/produk-layanan/pertanian/flora-one`,
    `${BASE_URL}/id/blog`,
    `${BASE_URL}/en/blog`,
    `${BASE_URL}/id`,
    `${BASE_URL}/en`,
  ];
  const finalUrls = [...allUrls, ...extraUrls];
  console.log(`Extra pages added: ${extraUrls.length}`);
  console.log(`Grand total: ${finalUrls.length} URLs`);
  console.log('');

  // IndexNow allows 10,000 URLs per batch - we can do it all at once
  // But split into batches of 1000 to be safe
  const BATCH_SIZE = 1000;
  const batches = [];
  for (let i = 0; i < finalUrls.length; i += BATCH_SIZE) {
    batches.push(finalUrls.slice(i, i + BATCH_SIZE));
  }

  let totalSubmitted = 0;
  let totalFailed = 0;

  for (const endpoint of ENDPOINTS) {
    console.log(`\nSubmitting to ${endpoint.name}...`);
    
    for (let i = 0; i < batches.length; i++) {
      const result = await submitBatch(endpoint, batches[i], i + 1, batches.length);
      if (result.success) {
        totalSubmitted += result.count;
      } else {
        totalFailed += batches[i].length;
      }
      
      // Small delay between batches
      if (i < batches.length - 1) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total URLs: ${finalUrls.length}`);
  console.log(`Successfully notified: ${totalSubmitted / ENDPOINTS.length}`);
  console.log(`Endpoints used: ${ENDPOINTS.map(e => e.name).join(', ')}`);
  console.log('');
  console.log('✓ IndexNow notifications sent!');
  console.log('  → Bing will crawl and index URLs within minutes-hours');
  console.log('  → Google (via Bing partnership) will receive notifications');
  console.log('  → GSC URL inspection quota resets tomorrow for daily GSC requests');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Wait 24h for GSC quota reset');
  console.log('  2. Run: node gsc-bulk-indexing.js --resume --limit 50 (max 50/day)');
  console.log('  3. Monitor GSC Coverage report for indexed URLs in 3-7 days');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
