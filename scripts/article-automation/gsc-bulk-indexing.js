/**
 * GSC Bulk Indexing Request Automation via Pinchtab
 * 
 * Automates "Request Indexing" for all blog article URLs in Google Search Console.
 * Uses Pinchtab HTTP API for browser automation.
 * 
 * Usage:
 *   node gsc-bulk-indexing.js                    # Run all unprocessed URLs
 *   node gsc-bulk-indexing.js --resume           # Resume from last position
 *   node gsc-bulk-indexing.js --start 50         # Start from URL #50
 *   node gsc-bulk-indexing.js --dry-run          # Test without clicking Request Indexing
 *   node gsc-bulk-indexing.js --status           # Show progress stats
 *   node gsc-bulk-indexing.js --limit 50         # Process max 50 URLs (stay within daily quota)
 *   node gsc-bulk-indexing.js --reset-dry-run    # Reset all dry_run entries to pending
 */

const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────
const PINCHTAB_BASE = 'http://localhost:9867';
const INST_ID = 'inst_8774ee16';
const SITE_DOMAIN = 'https://www.centrabiotechindonesia.com';
const GSC_RESOURCE = 'sc-domain:centrabiotechindonesia.com';
const GSC_URL = `https://search.google.com/search-console?resource_id=${GSC_RESOURCE}`;
const SLUGS_FILE = path.join(__dirname, '..', 'blog-slugs.txt');
const PROGRESS_FILE = path.join(__dirname, 'gsc-indexing-progress.json');
const LOG_FILE = path.join(__dirname, 'gsc-indexing.log');

// Delays (ms)
const DELAY_AFTER_NAVIGATE = 3000;
const DELAY_AFTER_CLEAR = 1000;
const DELAY_AFTER_TYPE = 500;
const DELAY_INSPECTION_LOAD = 15000;
const DELAY_INDEXING_TEST = 45000;   // GSC tests live URL ~30-60s
const DELAY_BETWEEN_URLS = 5000;     // Between each URL
const DELAY_AFTER_ERROR = 15000;     // After error, wait longer
const MAX_RETRIES = 2;

// ── Helpers ─────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

async function api(urlPath, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${PINCHTAB_BASE}${urlPath}`, opts);
  return res.json();
}

async function action(tabId, actionBody) {
  return api(`/tabs/${tabId}/action`, 'POST', actionBody);
}

async function snapshot(tabId) {
  const data = await api(`/tabs/${tabId}/snapshot`);
  if (data && data.nodes) return data.nodes;
  if (Array.isArray(data)) return data;
  return [];
}

function findNode(nodes, predicate) {
  return nodes.find(predicate);
}

function findNodes(nodes, predicate) {
  return nodes.filter(predicate);
}

// ── Progress Tracking ───────────────────────────────────────
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return { processed: {}, lastIndex: -1, stats: { success: 0, failed: 0, alreadyIndexed: 0, skipped: 0 } };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ── Core Automation Steps ───────────────────────────────────

async function ensureOnGSC(tabId) {
  const nodes = await snapshot(tabId);
  const page = nodes[0];
  if (page && page.name && (page.name.includes('URL Inspection') || page.name.includes('Overview'))) {
    return true;
  }
  // Navigate to GSC
  log('Navigating to GSC...');
  await api(`/tabs/${tabId}/navigate`, 'POST', { url: GSC_URL });
  await sleep(DELAY_AFTER_NAVIGATE);
  return true;
}

async function inspectUrl(tabId, blogUrl) {
  // 1. Ensure we're on GSC
  await ensureOnGSC(tabId);
  
  // 2. Take snapshot to find elements
  let nodes = await snapshot(tabId);
  
  // 3. Find and click Clear search button (if exists)
  const clearBtn = findNode(nodes, n => n.name === 'Clear search' && n.role === 'button');
  if (clearBtn) {
    await action(tabId, { kind: 'click', ref: clearBtn.ref });
    await sleep(DELAY_AFTER_CLEAR);
    nodes = await snapshot(tabId); // Refresh refs
  }
  
  // 4. Find the inspection combobox
  const combo = findNode(nodes, n => n.role === 'combobox' && n.name && n.name.includes('nspect'));
  if (!combo) {
    throw new Error('Could not find URL inspection combobox');
  }
  
  // 5. Click combobox
  await action(tabId, { kind: 'click', ref: combo.ref });
  await sleep(300);
  
  // 6. Type URL
  const typeResult = await action(tabId, { kind: 'type', ref: combo.ref, text: blogUrl });
  if (typeResult.error) {
    throw new Error('Failed to type URL: ' + JSON.stringify(typeResult));
  }
  await sleep(DELAY_AFTER_TYPE);
  
  // 7. Find and click Search button
  nodes = await snapshot(tabId);
  const searchBtn = findNode(nodes, n => n.name === 'Search' && n.role === 'button');
  if (!searchBtn) {
    throw new Error('Could not find Search button');
  }
  await action(tabId, { kind: 'click', ref: searchBtn.ref });
  
  // 8. Wait for inspection to load
  log('  Waiting for inspection results...');
  await sleep(DELAY_INSPECTION_LOAD);
  
  // 9. Take snapshot and analyze results
  nodes = await snapshot(tabId);
  const page = nodes[0];
  
  if (!page || !page.name || !page.name.includes('URL Inspection')) {
    // Maybe still loading
    await sleep(5000);
    nodes = await snapshot(tabId);
  }
  
  return nodes;
}

async function requestIndexing(tabId, nodes) {
  // Look for "Request indexing" button
  const reqBtn = findNode(nodes, n => n.role === 'button' && n.name && n.name.includes('equest indexing'));
  
  if (!reqBtn) {
    // Check if already indexed
    const indexedText = findNode(nodes, n => n.name && n.name.includes('URL is on Google'));
    if (indexedText) {
      return 'already_indexed';
    }
    
    // Check for other states
    const statusBtn = findNode(nodes, n => n.role === 'button' && n.name && n.name.includes('Page indexing'));
    if (statusBtn) {
      log('  Status: ' + statusBtn.name);
    }
    
    return 'no_request_button';
  }
  
  // Click Request Indexing
  log('  Clicking Request Indexing...');
  await action(tabId, { kind: 'click', ref: reqBtn.ref });
  
  // Poll every 5 seconds for up to 90 seconds to catch the dialog
  log('  Waiting for live URL test (polling)...');
  const maxPolls = 18; // 18 * 5s = 90s
  let dialogSeen = false;
  
  for (let poll = 0; poll < maxPolls; poll++) {
    await sleep(5000);
    const pollNodes = await snapshot(tabId);
    
    // Check for success dialog
    const successMsg = findNode(pollNodes, n => 
      n.name && (n.name.includes('Indexing requested') || n.name.includes('successfully'))
    );
    if (successMsg) {
      log('  SUCCESS: Indexing requested!');
      const okBtn = findNode(pollNodes, n => n.role === 'button' && 
        (n.name === 'OK' || n.name === 'Got it' || n.name === 'Dismiss'));
      if (okBtn) await action(tabId, { kind: 'click', ref: okBtn.ref });
      return 'success';
    }
    
    // Check for "Oops" error dialog
    const errorHeading = findNode(pollNodes, n => n.name && n.name.includes('Oops'));
    if (errorHeading) {
      log('  ERROR: Something went wrong');
      const dismissBtn = findNode(pollNodes, n => n.role === 'button' && n.name === 'Dismiss');
      if (dismissBtn) await action(tabId, { kind: 'click', ref: dismissBtn.ref });
      return 'error';
    }
    
    // Check for quota exceeded
    const quotaText = findNode(pollNodes, n => n.name && n.name.includes('quota'));
    if (quotaText) {
      log('  QUOTA EXCEEDED');
      const dismissBtn = findNode(pollNodes, n => n.role === 'button' && n.name === 'Dismiss');
      if (dismissBtn) await action(tabId, { kind: 'click', ref: dismissBtn.ref });
      return 'quota_exceeded';
    }
    
    // Check if "Testing" dialog is visible (still in progress)
    const testing = findNode(pollNodes, n => n.name && n.name.includes('Testing'));
    if (testing) {
      dialogSeen = true;
      continue; // Keep polling
    }
    
    // If we previously saw the testing dialog but now it's gone,
    // the request likely completed (dialog auto-dismissed on success)
    if (dialogSeen) {
      log('  Dialog auto-dismissed - checking page state...');
      // Check if "Request again" text appears (success indicator)
      const reqAgain = findNode(pollNodes, n => n.name && n.name.includes('Request again'));
      if (reqAgain) {
        return 'success';
      }
      // Couldn't determine - likely success since dialog auto-dismissed
      return 'likely_success';
    }
    
    // No dialog at all - might still be initializing or already done
    if (poll >= 6 && !dialogSeen) {
      // 30s and no dialog seen - something else happened
      log('  No dialog appeared after 30s');
      return 'no_dialog';
    }
  }

  return 'timeout';
}

// ── Main Loop ───────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const statusOnly = args.includes('--status');
  const resetDryRun = args.includes('--reset-dry-run');
  const startIdx = args.includes('--start') ? parseInt(args[args.indexOf('--start') + 1]) : null;
  const resume = args.includes('--resume');
  const dailyLimit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : null;
  
  // Load slugs
  const slugs = fs.readFileSync(SLUGS_FILE, 'utf8').trim().split('\n').filter(Boolean);
  log(`Loaded ${slugs.length} blog slugs`);
  
  // Load progress
  const progress = loadProgress();
  
  if (resetDryRun) {
    let resetCount = 0;
    for (const slug of Object.keys(progress.processed)) {
      if (progress.processed[slug] === 'dry_run') {
        delete progress.processed[slug];
        resetCount++;
      }
    }
    progress.lastIndex = -1;
    saveProgress(progress);
    console.log(`Reset ${resetCount} dry_run entries - they will be reprocessed on next run`);
    return;
  }

  if (statusOnly) {
    const dryRunCount = Object.values(progress.processed).filter(v => v === 'dry_run').length;
    const realCount = Object.values(progress.processed).filter(v => v !== 'dry_run').length;
    console.log('\n📊 GSC Indexing Progress:');
    console.log(`  Total URLs: ${slugs.length}`);
    console.log(`  Really processed: ${realCount}`);
    console.log(`  Dry-run only: ${dryRunCount}`);
    console.log(`  ✅ Success: ${progress.stats.success}`);
    console.log(`  ⚠️  Already Indexed: ${progress.stats.alreadyIndexed}`);
    console.log(`  ❌ Failed: ${progress.stats.failed}`);
    console.log(`  ⏭️  Skipped: ${progress.stats.skipped}`);
    console.log(`  📍 Last Index: ${progress.lastIndex}`);
    const remaining = slugs.filter(s => !progress.processed[s] || progress.processed[s] === 'dry_run');
    console.log(`  🔄 Remaining (incl. dry_run): ${remaining.length}`);
    return;
  }
  
  // Get tab ID
  const tabsResp = await api(`/instances/${INST_ID}/tabs`);
  const tabsList = tabsResp.tabs || tabsResp;
  if (!Array.isArray(tabsList) || tabsList.length === 0) {
    log('ERROR: No tabs found. Make sure Pinchtab instance is running.');
    process.exit(1);
  }
  // Use the first real page tab (not about:blank)
  const gscTab = tabsList.find(t => t.url && t.url.includes('search.google.com')) || tabsList[0];
  const tabId = gscTab.id;
  log(`Using tab: ${tabId} (${gscTab.title})`);
  
  // Navigate to GSC first
  log('Navigating to GSC...');
  await api(`/tabs/${tabId}/navigate`, 'POST', { url: GSC_URL });
  await sleep(DELAY_AFTER_NAVIGATE);
  
  // Determine start position
  let startFrom = 0;
  if (startIdx !== null) {
    startFrom = startIdx;
  } else if (resume) {
    startFrom = progress.lastIndex + 1;
  }
  
  if (dailyLimit) {
    log(`Daily limit: ${dailyLimit} URLs (to stay within GSC quota)`);
  }
  log(`Starting from index ${startFrom} (${dryRun ? 'DRY RUN' : 'LIVE'})`);
  log(`─────────────────────────────────────────────`);
  
  let consecutiveErrors = 0;
  let processedThisRun = 0;
  
  for (let i = startFrom; i < slugs.length; i++) {
    const slug = slugs[i];
    const blogUrl = `${SITE_DOMAIN}/id/blog/${slug}`;
    
    // Skip already processed (but NOT dry_run entries - those need real processing)
    const prevResult = progress.processed[slug];
    if (prevResult && prevResult !== 'error' && prevResult !== 'dry_run') {
      log(`[${i + 1}/${slugs.length}] SKIP (already ${prevResult}): ${slug}`);
      continue;
    }
    
    log(`[${i + 1}/${slugs.length}] Inspecting: ${slug}`);
    
    let result = 'error';
    let retries = 0;
    
    while (retries <= MAX_RETRIES) {
      try {
        // Step 1: Navigate to URL inspection
        const inspectionNodes = await inspectUrl(tabId, blogUrl);
        
        if (dryRun) {
          const status = findNode(inspectionNodes, n => n.role === 'button' && n.name && n.name.includes('Page indexing'));
          log(`  [DRY RUN] Would request indexing. Status: ${status?.name || 'unknown'}`);
          result = 'dry_run';
          break;
        }
        
        // Step 2: Request indexing
        result = await requestIndexing(tabId, inspectionNodes);
        log(`  Result: ${result}`);
        
        if (result === 'quota_exceeded') {
          log('⚠️  QUOTA EXCEEDED - Stopping. Run again tomorrow with --resume');
          log('   Tip: Use --limit 50 to stay within daily quota (~50 requests/day)');
          saveProgress(progress);
          process.exit(0);
        }
        
        break; // Success or non-retryable
        
      } catch (err) {
        retries++;
        log(`  ERROR (attempt ${retries}): ${err.message}`);
        if (retries <= MAX_RETRIES) {
          log(`  Retrying in ${DELAY_AFTER_ERROR / 1000}s...`);
          await sleep(DELAY_AFTER_ERROR);
          // Navigate back to GSC overview to reset state
          await api(`/tabs/${tabId}/navigate`, 'POST', { url: GSC_URL });
          await sleep(DELAY_AFTER_NAVIGATE);
        }
      }
    }
    
    // Update progress
    progress.processed[slug] = result;
    progress.lastIndex = i;
    
    switch (result) {
      case 'success': case 'likely_success':
        progress.stats.success++; consecutiveErrors = 0; break;
      case 'already_indexed': progress.stats.alreadyIndexed++; consecutiveErrors = 0; break;
      case 'error': case 'timeout': case 'unknown': case 'no_dialog':
        progress.stats.failed++;
        consecutiveErrors++;
        break;
      case 'no_request_button': progress.stats.skipped++; consecutiveErrors = 0; break;
    }
    
    saveProgress(progress);
    
    // Check daily limit
    if (!dryRun) {
      processedThisRun++;
      if (dailyLimit && processedThisRun >= dailyLimit) {
        log(`🛑 Daily limit reached (${dailyLimit} URLs). Resume tomorrow with: node gsc-bulk-indexing.js --resume --limit ${dailyLimit}`);
        process.exit(0);
      }
    }
    
    // Safety: stop after too many consecutive errors
    if (consecutiveErrors >= 5) {
      log('⚠️  5 consecutive errors. Stopping. Resume later with --resume');
      process.exit(1);
    }
    
    // Delay between URLs
    await sleep(result === 'error' ? DELAY_AFTER_ERROR : DELAY_BETWEEN_URLS);
  }
  
  // Final summary
  log('─────────────────────────────────────────────');
  log('🏁 COMPLETED!');
  log(`  ✅ Success: ${progress.stats.success}`);
  log(`  ⚠️  Already Indexed: ${progress.stats.alreadyIndexed}`);
  log(`  ❌ Failed: ${progress.stats.failed}`);
  log(`  ⏭️  Skipped: ${progress.stats.skipped}`);
}

main().catch(err => {
  log(`FATAL ERROR: ${err.message}`);
  process.exit(1);
});
