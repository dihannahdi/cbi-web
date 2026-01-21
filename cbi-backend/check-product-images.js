const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function checkProductImages() {
  try {
    const SQL = await initSqlJs();
    const dbBuffer = fs.readFileSync(path.join(__dirname, 'database.db'));
    const db = new SQL.Database(dbBuffer);

    console.log('Checking product image relationships...\n');
    
    const productImages = db.exec(`
      SELECT frm.*, f.name as file_name, f.url 
      FROM files_related_mph frm
      JOIN files f ON frm.file_id = f.id
      WHERE frm.related_type = 'product' 
      AND frm.related_id IN (1,3,5)
    `);
    
    if (productImages.length > 0) {
      console.log('Found image relationships:');
      productImages[0].values.forEach(row => {
        const obj = {};
        productImages[0].columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        console.log(JSON.stringify(obj, null, 2));
      });
    } else {
      console.log('No image relationships found for products 1, 3, 5');
    }

    db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProductImages();
