const initSqlJs = require('sql.js');
const fs = require('fs');

initSqlJs().then(SQL => {
  const data = fs.readFileSync('./database.db');
  const db = new SQL.Database(data);
  
  console.log('=== Dashboard Component Types ===');
  const comps = db.exec('SELECT DISTINCT component_type FROM dashboards_cmps ORDER BY component_type');
  if (comps && comps[0]) {
    comps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  console.log('\n=== Dashboard Latest News Fields ===');
  const latestNewsTable = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%latest%'");
  if (latestNewsTable && latestNewsTable[0]) {
    console.log('Tables with "latest" in name:');
    latestNewsTable[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  console.log('\n=== All Component Tables ===');
  const componentTables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'components_dashboard_%' ORDER BY name");
  if (componentTables && componentTables[0]) {
    componentTables[0].values.forEach(row => console.log('  -', row[0]));
  }
});
