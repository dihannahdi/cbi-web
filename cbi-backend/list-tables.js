const initSqlJs = require('sql.js');
const fs = require('fs');

initSqlJs().then(SQL => {
  const data = fs.readFileSync('./database.db');
  const db = new SQL.Database(data);
  
  console.log('=== ALL MAIN TABLES ===\n');
  const tables = db.exec(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    AND name NOT LIKE 'sqlite_%' 
    AND name NOT LIKE '%_cmps' 
    AND name NOT LIKE '%_lnk'
    AND name NOT LIKE 'components_%'
    ORDER BY name
  `);
  
  if (tables && tables[0]) {
    tables[0].values.forEach(row => {
      const tableName = row[0];
      const count = db.exec(`SELECT COUNT(*) FROM ${tableName}`);
      console.log(`${tableName}: ${count[0].values[0][0]} records`);
    });
  }
});
