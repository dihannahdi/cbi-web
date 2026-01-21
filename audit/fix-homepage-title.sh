#!/bin/bash
# Fix long title tags in Strapi database

cd /opt/cbi-strapi

# Fix Homepage title (currently 103 chars, needs <70)
# Old: "PT Centra Biotech Indonesia - Perusahaan Bioteknologi Indonesia untuk Pertanian, Peternakan & Perikanan"
# New: "PT Centra Biotech Indonesia - Bioteknologi Pertanian Terpercaya" (65 chars)
sqlite3 .tmp/data.db "UPDATE dashboards SET titleTag = 'PT Centra Biotech Indonesia - Bioteknologi Pertanian Terpercaya' WHERE id = 1;"

echo "Homepage title updated!"

# Restart Strapi
pm2 restart cbi-strapi-dev
