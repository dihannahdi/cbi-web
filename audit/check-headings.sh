#!/bin/bash
# Add H2 headings to articles for better SEO heading hierarchy

cd /opt/cbi-strapi

echo "=== Fetching RAJABIO article content ==="
# Get the current content to understand the structure
sqlite3 .tmp/data.db "SELECT content FROM articles WHERE id = 28;" > /tmp/rajabio_content.json

echo "Content saved to /tmp/rajabio_content.json"

# Check Flora One article as well
echo ""
echo "=== Fetching Flora One article content ==="
sqlite3 .tmp/data.db "SELECT content FROM articles WHERE id = 33;" > /tmp/floraone_content.json

echo "Content saved to /tmp/floraone_content.json"

# Let's see the first part of each
echo ""
echo "=== RAJABIO content preview ==="
head -c 1000 /tmp/rajabio_content.json

echo ""
echo ""
echo "=== Flora One content preview ==="
head -c 1000 /tmp/floraone_content.json
