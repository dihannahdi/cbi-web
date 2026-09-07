const db = require('better-sqlite3')('/opt/cbi-strapi/.tmp/data.db');

// Delete duplicate entries - keep the lowest ID for each slug
const dupes = [166, 169, 171, 174]; // Higher IDs that are duplicates
for (const id of dupes) {
  const result = db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
  console.log(`Deleted ID ${id}: ${result.changes} row(s)`);
}

// Verify
const rows = db.prepare("SELECT id, slug FROM blogs WHERE slug LIKE '%flora%' ORDER BY id").all();
console.log(`\nRemaining FloraOne articles: ${rows.length}`);
rows.forEach(r => console.log(`  ID=${r.id} | ${r.slug}`));

const total = db.prepare("SELECT COUNT(*) as c FROM blogs").get();
console.log(`\nTotal blogs: ${total.c}`);
db.close();
