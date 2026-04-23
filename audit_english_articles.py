#!/usr/bin/env python3
import requests
import json

print("="*80)
print("CRITICAL AUDIT: English Blog Articles Status")
print("="*80)

api_url = 'https://cbi-backend.my.id/api/blogs'

# Check en locale thoroughly
print("\nDetailed check for 'en' locale:")
for page in [1, 2, 3]:
    resp = requests.get(
        f"{api_url}?locale=en&pagination[page]={page}&pagination[pageSize]=50",
        timeout=10,
        headers={'Content-Type': 'application/json'}
    )
    if resp.status_code == 200:
        data = resp.json()
        total = data.get('meta', {}).get('pagination', {}).get('total', 0)
        count = len(data.get('data', []))
        print(f"  Page {page}: {count} articles (total in database: {total})")
    else:
        print(f"  Page {page}: Failed - {resp.status_code}")

# Check what locales are available
print("\n\nChecking available locales in the system:")
for locale in ['id', 'en', 'es', 'fr', 'de', 'pt', 'ar']:
    resp = requests.get(
        f"{api_url}?locale={locale}&pagination[pageSize]=1",
        timeout=10,
        headers={'Content-Type': 'application/json'}
    )
    if resp.status_code == 200:
        data = resp.json()
        total = data.get('meta', {}).get('pagination', {}).get('total', 0)
        if total > 0:
            print(f"  ✓ {locale}: {total} articles")
        else:
            print(f"  ✗ {locale}: 0 articles")

# Check products for English versions to compare
print("\n\nChecking if English product pages exist (for comparison):")
products_api = 'https://cbi-backend.my.id/api/product-detail-pages'
for locale in ['id', 'en']:
    resp = requests.get(
        f"{products_api}?locale={locale}&pagination[pageSize]=1",
        timeout=10
    )
    if resp.status_code == 200:
        data = resp.json()
        total = data.get('meta', {}).get('pagination', {}).get('total', 0)
        print(f"  {locale} products: {total}")

print("\n" + "="*80)
print("KEY FINDING: English blogs missing from Strapi API")
print("="*80)
