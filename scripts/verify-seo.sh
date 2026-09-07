#!/bin/bash
# Verify SEO changes on deployed page
echo "=== CHECKING LIVE PAGE SEO ==="
echo ""

# Check the actual deployed page
HTML=$(curl -s 'https://www.centrabiotechindonesia.com/id/produk-layanan/pertanian/floraone-pupuk-hayati')

echo "--- TITLE TAG ---"
echo "$HTML" | grep -oP '<title[^>]*>.*?</title>'

echo ""
echo "--- META DESCRIPTION ---"
echo "$HTML" | grep -oP '<meta name="description"[^>]*/>' | head -1

echo ""
echo "--- OG TITLE ---"
echo "$HTML" | grep -oP '<meta property="og:title"[^>]*/>' | head -1

echo ""
echo "--- OG DESCRIPTION ---"
echo "$HTML" | grep -oP '<meta property="og:description"[^>]*/>' | head -1

echo ""
echo "--- H1 TAGS ---"
echo "$HTML" | grep -oP '<h1[^>]*>.*?</h1>'

echo ""
echo "--- H2 TAGS ---"
echo "$HTML" | grep -oP '<h2[^>]*>.*?</h2>' | head -10

echo ""
echo "--- KEYWORDS META ---"
echo "$HTML" | grep -oP '<meta name="keywords"[^>]*/>' | head -1 | cut -c1-200

echo ""
echo "--- CANONICAL ---"
echo "$HTML" | grep -oP '<link rel="canonical"[^>]*/>'

echo ""
echo "TITLE LENGTH:"
echo "$HTML" | grep -oP '(?<=<title>).*?(?=</title>)' | wc -c
