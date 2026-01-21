const initSqlJs = require('sql.js');
const fs = require('fs');

initSqlJs().then(SQL => {
  const data = fs.readFileSync('./database.db');
  const db = new SQL.Database(data);
  
  console.log('=== components_about_us_visi_misis_cmps ===');
  const schema = db.exec('PRAGMA table_info(components_about_us_visi_misis_cmps)');
  if (schema && schema[0]) {
    console.log('Columns:');
    schema[0].values.forEach(row => {
      console.log(`  - ${row[1]} (${row[2]})`);
    });
  }
  
  console.log('\n=== components_about_us_corporate_values_cmps ===');
  const schema2 = db.exec('PRAGMA table_info(components_about_us_corporate_values_cmps)');
  if (schema2 && schema2[0]) {
    console.log('Columns:');
    schema2[0].values.forEach(row => {
      console.log(`  - ${row[1]} (${row[2]})`);
    });
  }
  
  console.log('\n=== components_product_why_sections_cmps ===');
  const schema3 = db.exec('PRAGMA table_info(components_product_why_sections_cmps)');
  if (schema3 && schema3[0]) {
    console.log('Columns:');
    schema3[0].values.forEach(row => {
      console.log(`  - ${row[1]} (${row[2]})`);
    });
  }
});
