const initSqlJs = require('sql.js');
const fs = require('fs');

initSqlJs().then(SQL => {
  const data = fs.readFileSync('./database.db');
  const db = new SQL.Database(data);
  
  // Check about_uses structure
  console.log('=== ABOUT_USES ===');
  const aboutUs = db.exec('SELECT * FROM about_uses LIMIT 1');
  if (aboutUs && aboutUs[0]) {
    console.log('Columns:', aboutUs[0].columns.join(', '));
  }
  
  // Check about_uses components
  console.log('\n=== ABOUT_USES COMPONENTS ===');
  const aboutUsesCmps = db.exec('SELECT DISTINCT component_type FROM about_uses_cmps ORDER BY component_type');
  if (aboutUsesCmps && aboutUsesCmps[0]) {
    aboutUsesCmps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  // Check contacts structure
  console.log('\n=== CONTACTS ===');
  const contacts = db.exec('SELECT * FROM contacts LIMIT 1');
  if (contacts && contacts[0]) {
    console.log('Columns:', contacts[0].columns.join(', '));
  }
  
  // Check contacts components
  console.log('\n=== CONTACTS COMPONENTS ===');
  const contactsCmps = db.exec('SELECT DISTINCT component_type FROM contacts_cmps ORDER BY component_type');
  if (contactsCmps && contactsCmps[0]) {
    contactsCmps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  // Check news_sections structure
  console.log('\n=== NEWS_SECTIONS ===');
  const newsSections = db.exec('SELECT * FROM news_sections LIMIT 1');
  if (newsSections && newsSections[0]) {
    console.log('Columns:', newsSections[0].columns.join(', '));
  }
  
  // Check news_sections components
  console.log('\n=== NEWS_SECTIONS COMPONENTS ===');
  const newsSectionsCmps = db.exec('SELECT DISTINCT component_type FROM news_sections_cmps ORDER BY component_type');
  if (newsSectionsCmps && newsSectionsCmps[0]) {
    newsSectionsCmps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  // Check product tables
  console.log('\n=== PRODUCT_AGRICULTURES ===');
  const prodAgri = db.exec('SELECT * FROM product_agricultures LIMIT 1');
  if (prodAgri && prodAgri[0]) {
    console.log('Columns:', prodAgri[0].columns.join(', '));
  }
  
  console.log('\n=== PRODUCT_AGRICULTURES COMPONENTS ===');
  const prodAgriCmps = db.exec('SELECT DISTINCT component_type FROM product_agricultures_cmps ORDER BY component_type');
  if (prodAgriCmps && prodAgriCmps[0]) {
    prodAgriCmps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  console.log('\n=== PRODUCT_LIVESTOCKS COMPONENTS ===');
  const prodLiveCmps = db.exec('SELECT DISTINCT component_type FROM product_livestocks_cmps ORDER BY component_type');
  if (prodLiveCmps && prodLiveCmps[0]) {
    prodLiveCmps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  console.log('\n=== PRODUCT_FISHERIES COMPONENTS ===');
  const prodFishCmps = db.exec('SELECT DISTINCT component_type FROM product_fisheries_cmps ORDER BY component_type');
  if (prodFishCmps && prodFishCmps[0]) {
    prodFishCmps[0].values.forEach(row => console.log('  -', row[0]));
  }
  
  // Check component tables for these
  console.log('\n=== ALL COMPONENT TABLES ===');
  const compTables = db.exec(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    AND (name LIKE 'components_about_%' 
         OR name LIKE 'components_contact_%'
         OR name LIKE 'components_news_%'
         OR name LIKE 'components_product_%')
    ORDER BY name
  `);
  if (compTables && compTables[0]) {
    compTables[0].values.forEach(row => console.log('  -', row[0]));
  }
});
