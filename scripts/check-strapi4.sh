#!/bin/bash
# Try localhost:9338 directly (Strapi port)
echo "=== TRYING LOCALHOST:9338 ==="
RESP=$(curl -s 'http://localhost:9338/api/product-detail-pages?filters[slug][$eq]=floraone-pupuk-hayati&locale=id')
echo "$RESP" | head -c 500

echo ""
echo "=== TRYING LOCALHOST:9338 EN ==="
RESP2=$(curl -s 'http://localhost:9338/api/product-detail-pages?filters[slug][$eq]=floraone-pupuk-hayati&locale=en')
echo "$RESP2" | head -c 500

echo ""
echo "=== DB DIRECT CHECK ==="
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT id, slug, name, subtitle, locale, meta_title, meta_description, hero_title FROM product_detail_pages WHERE slug='floraone-pupuk-hayati';"
