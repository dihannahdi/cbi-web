#!/usr/bin/env python3
"""Check SEO elements of a page"""
import re, urllib.request, sys, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = sys.argv[1] if len(sys.argv) > 1 else 'https://www.centrabiotechindonesia.com/id/produk-layanan/pertanian/floraone-pupuk-hayati'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8', errors='ignore')

print(f"URL: {url}")
print(f"HTML length: {len(html)}")
print()

# Title
m = re.search(r'<title>([^<]+)</title>', html)
print(f"TITLE: {m.group(1) if m else 'NONE'}")

# Meta description
m = re.search(r'name="description"\s+content="([^"]+)"', html)
print(f"META DESC: {m.group(1) if m else 'NONE'}")

# Canonical
m = re.search(r'rel="canonical"\s+href="([^"]+)"', html)
print(f"CANONICAL: {m.group(1) if m else 'NONE'}")

# OG tags
for tag in ['og:title', 'og:description', 'og:type', 'og:url']:
    m = re.search(rf'property="{tag}"\s+content="([^"]+)"', html)
    if not m:
        m = re.search(rf'content="([^"]+)"\s+property="{tag}"', html)
    print(f"{tag.upper()}: {m.group(1) if m else 'NONE'}")

# Keywords
m = re.search(r'name="keywords"\s+content="([^"]+)"', html)
print(f"KEYWORDS: {m.group(1) if m else 'NONE'}")

# JSON-LD types
types = re.findall(r'"@type"\s*:\s*"([^"]+)"', html)
print(f"JSON-LD TYPES: {types}")

# H1 tags
h1s = re.findall(r'<h1[^>]*>([^<]+)</h1>', html)
if not h1s:
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.S)
print(f"H1 TAGS: {h1s[:3]}")

# H2 tags
h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.S)
h2_texts = [re.sub(r'<[^>]+>', '', h).strip() for h in h2s[:10]]
print(f"H2 TAGS ({len(h2s)} total): {h2_texts}")
