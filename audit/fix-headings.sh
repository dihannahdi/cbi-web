#!/bin/bash
# Add H2 headings to articles by converting bold paragraphs to headings
# This improves heading hierarchy for SEO

cd /opt/cbi-strapi

echo "=== Updating RAJABIO article heading hierarchy ==="

# Get current content
RAJABIO_CONTENT=$(sqlite3 .tmp/data.db "SELECT content FROM articles WHERE id = 28;")

# Use Node.js to process the JSON
node -e "
const content = JSON.parse(process.argv[1]);
let updatedCount = 0;

for (let i = 0; i < content.length; i++) {
  const block = content[i];
  // Find bold paragraphs that look like section headers
  if (block.type === 'paragraph' && 
      block.children?.length === 1 && 
      block.children[0]?.bold && 
      block.children[0]?.text?.length > 20 &&
      block.children[0]?.text?.length < 120) {
    const text = block.children[0].text;
    // Convert to H2
    content[i] = {
      type: 'heading',
      level: 2,
      children: [{
        type: 'text',
        text: text
      }]
    };
    console.log('Converted to H2: ' + text.substring(0, 50) + '...');
    updatedCount++;
  }
}

// Output the updated JSON
console.log('UPDATED_CONTENT:' + JSON.stringify(content));
console.log('Total H2 headings added: ' + updatedCount);
" "$RAJABIO_CONTENT" > /tmp/rajabio_output.txt 2>&1

# Extract just the JSON line
UPDATED_JSON=$(grep 'UPDATED_CONTENT:' /tmp/rajabio_output.txt | sed 's/UPDATED_CONTENT://')

if [ -n "$UPDATED_JSON" ]; then
    # Escape single quotes for SQL
    ESCAPED_JSON=$(echo "$UPDATED_JSON" | sed "s/'/''/g")
    sqlite3 .tmp/data.db "UPDATE articles SET content = '$ESCAPED_JSON' WHERE id = 28;"
    echo "RAJABIO updated!"
    grep 'Converted to H2:' /tmp/rajabio_output.txt
    grep 'Total H2' /tmp/rajabio_output.txt
else
    echo "Error processing RAJABIO content"
    cat /tmp/rajabio_output.txt
fi

echo ""
echo "=== Updating Flora One article heading hierarchy ==="

# Get Flora One content
FLORAONE_CONTENT=$(sqlite3 .tmp/data.db "SELECT content FROM articles WHERE id = 33;")

node -e "
const content = JSON.parse(process.argv[1]);
let updatedCount = 0;

for (let i = 0; i < content.length; i++) {
  const block = content[i];
  if (block.type === 'paragraph' && 
      block.children?.length === 1 && 
      block.children[0]?.bold && 
      block.children[0]?.text?.length > 20 &&
      block.children[0]?.text?.length < 120) {
    const text = block.children[0].text;
    content[i] = {
      type: 'heading',
      level: 2,
      children: [{
        type: 'text',
        text: text
      }]
    };
    console.log('Converted to H2: ' + text.substring(0, 50) + '...');
    updatedCount++;
  }
}

console.log('UPDATED_CONTENT:' + JSON.stringify(content));
console.log('Total H2 headings added: ' + updatedCount);
" "$FLORAONE_CONTENT" > /tmp/floraone_output.txt 2>&1

UPDATED_JSON=$(grep 'UPDATED_CONTENT:' /tmp/floraone_output.txt | sed 's/UPDATED_CONTENT://')

if [ -n "$UPDATED_JSON" ]; then
    ESCAPED_JSON=$(echo "$UPDATED_JSON" | sed "s/'/''/g")
    sqlite3 .tmp/data.db "UPDATE articles SET content = '$ESCAPED_JSON' WHERE id = 33;"
    echo "Flora One updated!"
    grep 'Converted to H2:' /tmp/floraone_output.txt
    grep 'Total H2' /tmp/floraone_output.txt
else
    echo "Error processing Flora One content"
    cat /tmp/floraone_output.txt
fi

echo ""
echo "=== Restarting Strapi ==="
pm2 restart cbi-strapi-dev
