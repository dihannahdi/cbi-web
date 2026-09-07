const db = require('better-sqlite3')('/opt/cbi-strapi/.tmp/data.db');
const rows = db.prepare("SELECT id, slug, title FROM blogs WHERE slug LIKE '%flora%' ORDER BY id").all();
console.log(`Found ${rows.length} FloraOne articles:`);
rows.forEach(r => console.log(`  ID=${r.id} | ${r.slug} | ${r.title}`));

// Also check total blog count
const total = db.prepare("SELECT COUNT(*) as c FROM blogs").get();
console.log(`\nTotal blogs in DB: ${total.c}`);
db.close();
