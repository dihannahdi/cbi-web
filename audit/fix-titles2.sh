#!/bin/bash
# Fix title tags in Strapi database

cd /opt/cbi-strapi

echo "=== Current Homepage Title ==="
sqlite3 .tmp/data.db "SELECT id, title_tag, length(title_tag) as len FROM components_metadata_metadata WHERE id = 1;"

echo ""
echo "=== Updating Homepage Title ==="
# Fix Homepage title (ID 1) - currently 103 chars, needs <70
# New: "PT Centra Biotech Indonesia - Bioteknologi Pertanian" (52 chars)
sqlite3 .tmp/data.db "UPDATE components_metadata_metadata SET title_tag = 'PT Centra Biotech Indonesia - Bioteknologi Pertanian' WHERE id = 1;"

echo ""
echo "=== Updated Homepage Title ==="
sqlite3 .tmp/data.db "SELECT id, title_tag, length(title_tag) as len FROM components_metadata_metadata WHERE id = 1;"

echo ""
echo "Homepage title updated successfully!"

# Restart Strapi
pm2 restart cbi-strapi-dev
