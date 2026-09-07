const db = require('better-sqlite3')('/opt/cbi-strapi/.tmp/data.db');

// Delete duplicate
const del = db.prepare('DELETE FROM blogs WHERE id = ?').run(161);
console.log(`Deleted duplicate ID 161: ${del.changes} row(s)`);

// Verify
const rows = db.prepare("SELECT id, slug FROM blogs WHERE slug LIKE '%flora%' ORDER BY id").all();
console.log(`Remaining FloraOne articles: ${rows.length}`);
rows.forEach(r => console.log(`  ID=${r.id} | ${r.slug}`));
db.close();
