const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function inspectSchema() {
  try {
    const SQL = await initSqlJs();
    const dbBuffer = fs.readFileSync(path.join(__dirname, 'database.db'));
    const db = new SQL.Database(dbBuffer);

    // Get all tables
    const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%dashboard%' ORDER BY name");
    
    console.log('Dashboard-related tables:');
    tables[0].values.forEach(([tableName]) => {
      console.log(`\n📋 Table: ${tableName}`);
      const schema = db.exec(`PRAGMA table_info(${tableName})`);
      if (schema.length > 0) {
        console.log('Columns:');
        schema[0].values.forEach(row => {
          console.log(`  - ${row[1]} (${row[2]})`);
        });
      }
      
      // Show sample data
      const sample = db.exec(`SELECT * FROM ${tableName} LIMIT 1`);
      if (sample.length > 0 && sample[0].values.length > 0) {
        console.log('Sample row:', JSON.stringify(Object.fromEntries(
          sample[0].columns.map((col, idx) => [col, sample[0].values[0][idx]])
        ), null, 2));
      }
    });

    db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

inspectSchema();
