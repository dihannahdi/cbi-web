// Pinchtab API helper - run with: node scripts/pinchtab-helper.js <command> [args]
const BASE = 'http://localhost:9867';
const INST = 'inst_aef00d2e';

async function api(path, method = 'GET', body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

async function main() {
  const cmd = process.argv[2];

  if (cmd === 'tabs') {
    const tabs = await api(`/instances/${INST}/tabs`);
    console.log(JSON.stringify(tabs, null, 2));
  }
  else if (cmd === 'navigate') {
    const tabId = process.argv[3];
    const url = process.argv[4];
    const r = await api(`/tabs/${tabId}/navigate`, 'POST', { url });
    console.log(JSON.stringify(r, null, 2));
  }
  else if (cmd === 'open') {
    const url = process.argv[3];
    const r = await api(`/instances/${INST}/tabs/open`, 'POST', { url });
    console.log(JSON.stringify(r, null, 2));
  }
  else if (cmd === 'snapshot') {
    const tabId = process.argv[3];
    const r = await api(`/tabs/${tabId}/snapshot`);
    // Print compact - just refs and text
    if (Array.isArray(r)) {
      r.forEach(n => {
        if (n.ref && n.text) console.log(`[${n.ref}] ${n.role || n.tag || ''}: ${n.text.substring(0, 120)}`);
        else if (n.ref) console.log(`[${n.ref}] ${n.role || n.tag || ''}`);
      });
    } else {
      console.log(JSON.stringify(r, null, 2));
    }
  }
  else if (cmd === 'snapshot-raw') {
    const tabId = process.argv[3];
    const r = await api(`/tabs/${tabId}/snapshot`);
    // Save to file for inspection
    const fs = require('fs');
    fs.writeFileSync('d:\\cbi-web\\scripts\\snapshot.json', JSON.stringify(r, null, 2));
    console.log(`Snapshot saved to scripts/snapshot.json (${Array.isArray(r) ? r.length + ' nodes' : 'error'})`);
  }
  else if (cmd === 'action') {
    const tabId = process.argv[3];
    const kind = process.argv[4];
    const ref = process.argv[5];
    const value = process.argv[6] || '';
    const body = { kind, ref };
    if (value) body.value = value;
    const r = await api(`/tabs/${tabId}/action`, 'POST', body);
    console.log(JSON.stringify(r, null, 2));
  }
  else if (cmd === 'text') {
    const tabId = process.argv[3];
    const r = await api(`/tabs/${tabId}/text`);
    console.log(typeof r === 'string' ? r.substring(0, 3000) : JSON.stringify(r, null, 2));
  }
  else {
    console.log('Usage: node pinchtab-helper.js <tabs|navigate|open|snapshot|snapshot-raw|action|text> [args]');
  }
}

main().catch(e => console.error('Error:', e.message));
