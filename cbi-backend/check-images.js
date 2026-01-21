const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function checkImageLinks() {
  try {
    const SQL = await initSqlJs();
    const dbBuffer = fs.readFileSync(path.join(__dirname, 'database.db'));
    const db = new SQL.Database(dbBuffer);

    console.log('\n📸 Checking files_related_mph for dashboard components:');
    const imageLinks = db.exec(`
      SELECT * FROM files_related_mph 
      WHERE related_type IN ('dashboard.headline', 'dashboard.why-section', 'dashboard.dampak-kami', 'dashboard.banner-kontak')
      LIMIT 10
    `);
    
    if (imageLinks.length > 0) {
      imageLinks[0].values.forEach(row => {
        const obj = {};
        imageLinks[0].columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        console.log(JSON.stringify(obj, null, 2));
      });
    }

    console.log('\n📸 Checking a sample headline component with its images:');
    const headline = db.exec(`SELECT * FROM components_dashboard_headlines WHERE id = 1`);
    if (headline.length > 0) {
      console.log('Headline:', JSON.stringify(Object.fromEntries(
        headline[0].columns.map((col, idx) => [col, headline[0].values[0][idx]])
      ), null, 2));
      
      const relatedFiles = db.exec(`
        SELECT files.* FROM files 
        JOIN files_related_mph ON files.id = files_related_mph.file_id
        WHERE files_related_mph.related_type = 'dashboard.headline' 
        AND files_related_mph.related_id = 1
      `);
      
      if (relatedFiles.length > 0) {
        console.log('\nRelated files:');
        relatedFiles[0].values.forEach(row => {
          const file = {};
          relatedFiles[0].columns.forEach((col, idx) => {
            file[col] = row[idx];
          });
          console.log(JSON.stringify(file, null, 2));
        });
      }
    }

    db.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkImageLinks();
