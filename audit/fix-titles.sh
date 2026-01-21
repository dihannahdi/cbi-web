#!/bin/bash
# Fix title tags in Strapi database

cd /opt/cbi-strapi

# Fix Homepage title (ID 1) - currently 103 chars, needs <70
# Old: "PT Centra Biotech Indonesia - Perusahaan Bioteknologi Indonesia untuk Pertanian, Peternakan & Perikanan"
# New: "PT Centra Biotech Indonesia - Bioteknologi Pertanian" (52 chars)
sqlite3 .tmp/data.db "UPDATE components_metadata_metadata SET titleTag = 'PT Centra Biotech Indonesia - Bioteknologi Pertanian' WHERE id = 1;"

echo "Homepage title updated!"
echo "New title: PT Centra Biotech Indonesia - Bioteknologi Pertanian"

# Verify the update
sqlite3 .tmp/data.db "SELECT id, titleTag FROM components_metadata_metadata WHERE id = 1;"

# Restart Strapi
pm2 restart cbi-strapi-dev
