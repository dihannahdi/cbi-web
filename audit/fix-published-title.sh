#!/bin/bash
# Fix homepage title for published dashboard

cd /opt/cbi-strapi

echo "=== Checking which metadata is used by published dashboard ==="
sqlite3 .tmp/data.db "SELECT dc.cmp_id, m.title_tag FROM dashboards_cmps dc JOIN components_metadata_metadata m ON dc.cmp_id = m.id WHERE dc.entity_id = 51 AND dc.component_type = 'metadata.metadata';"

echo ""
echo "=== Updating metadata component 16 (used by published dashboard) ==="
sqlite3 .tmp/data.db "UPDATE components_metadata_metadata SET title_tag = 'PT Centra Biotech Indonesia - Bioteknologi Pertanian' WHERE id = 16;"

echo ""
echo "=== Verifying update ==="
sqlite3 .tmp/data.db "SELECT id, title_tag, length(title_tag) FROM components_metadata_metadata WHERE id = 16;"

echo ""
echo "=== Restarting Strapi ==="
pm2 restart cbi-strapi-dev

echo ""
echo "Done!"
