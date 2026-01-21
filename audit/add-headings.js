// Script to add H2 headings to articles
// Run with: node add-headings.js

const sqlite3 = require('better-sqlite3');
const db = sqlite3('.tmp/data.db');

// Function to add H2 heading before specific paragraph index
function addH2Heading(content, afterIndex, headingText) {
  const heading = {
    type: "heading",
    level: 2,
    children: [{
      type: "text",
      text: headingText,
      bold: true
    }]
  };
  content.splice(afterIndex + 1, 0, heading);
  return content;
}

// Get RAJABIO article content
let rajabioRow = db.prepare("SELECT content FROM articles WHERE id = 28").get();
let rajabioContent = JSON.parse(rajabioRow.content);

console.log("RAJABIO original paragraphs:", rajabioContent.length);

// Find and add H2 headings based on bold paragraph text
let insertions = [];
rajabioContent.forEach((block, index) => {
  if (block.type === 'paragraph' && block.children?.[0]?.bold && block.children?.[0]?.text?.length > 20) {
    const text = block.children[0].text;
    if (text.includes('Mendesaknya') || text.includes('RAJABIO') || text.includes('Metodologi') || 
        text.includes('Hasil') || text.includes('Pertumbuhan') || text.includes('Efisiensi') ||
        text.includes('Kesimpulan') || text.includes('Dampak')) {
      console.log(`Found section: ${text.substring(0, 50)}...`);
    }
  }
});

// For now, let's just change the bold paragraphs to H2 headings
for (let i = 0; i < rajabioContent.length; i++) {
  const block = rajabioContent[i];
  if (block.type === 'paragraph' && 
      block.children?.length === 1 && 
      block.children[0]?.bold && 
      block.children[0]?.text?.length > 20 &&
      block.children[0]?.text?.length < 100) {
    console.log(`Converting to H2: ${block.children[0].text}`);
    rajabioContent[i] = {
      type: "heading",
      level: 2,
      children: [{
        type: "text",
        text: block.children[0].text
      }]
    };
  }
}

// Update RAJABIO
const updateRajabio = db.prepare("UPDATE articles SET content = ? WHERE id = 28");
updateRajabio.run(JSON.stringify(rajabioContent));
console.log("\nRAJABIO updated!");

// Get Flora One article content
let floraoneRow = db.prepare("SELECT content FROM articles WHERE id = 33").get();
let floraoneContent = JSON.parse(floraoneRow.content);

console.log("\nFlora One original paragraphs:", floraoneContent.length);

// For Flora One, same approach
for (let i = 0; i < floraoneContent.length; i++) {
  const block = floraoneContent[i];
  if (block.type === 'paragraph' && 
      block.children?.length === 1 && 
      block.children[0]?.bold && 
      block.children[0]?.text?.length > 20 &&
      block.children[0]?.text?.length < 100) {
    console.log(`Converting to H2: ${block.children[0].text}`);
    floraoneContent[i] = {
      type: "heading",
      level: 2,
      children: [{
        type: "text",
        text: block.children[0].text
      }]
    };
  }
}

// Update Flora One
const updateFloraone = db.prepare("UPDATE articles SET content = ? WHERE id = 33");
updateFloraone.run(JSON.stringify(floraoneContent));
console.log("\nFlora One updated!");

db.close();
console.log("\nDone! Headings added.");
