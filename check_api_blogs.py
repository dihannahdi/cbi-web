#!/usr/bin/env python3
import requests
import json

# Check the blog API to see if articles are being returned correctly
api_url = 'https://cbi-backend.my.id/api/blogs'

for locale in ['id', 'en']:
    print(f"\n{'='*80}")
    print(f"Checking API for locale: {locale}")
    print('='*80)
    
    try:
        # First page
        resp = requests.get(
            f"{api_url}?locale={locale}&pagination[page]=1&pagination[pageSize]=10",
            timeout=10,
            headers={'Content-Type': 'application/json'}
        )
        print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            data = resp.json()
            print(f"Total articles: {data.get('meta', {}).get('pagination', {}).get('total', 'N/A')}")
            print(f"Page count: {data.get('meta', {}).get('pagination', {}).get('pageCount', 'N/A')}")
            print(f"Articles on page 1: {len(data.get('data', []))}")
            
            if len(data.get('data', [])) > 0:
                first_article = data['data'][0]
                print(f"\nFirst article sample:")
                print(f"  - ID: {first_article.get('id')}")
                print(f"  - Slug: {first_article.get('slug')}")
                print(f"  - Title: {first_article.get('title', 'N/A')[:50]}")
                print(f"  - Locale: {first_article.get('locale')}")
                print(f"  - PublishedAt: {first_article.get('publishedAt')}")
                print(f"  - CreatedAt: {first_article.get('createdAt')}")
        else:
            print(f"Error response: {resp.text[:200]}")
            
    except Exception as e:
        print(f"Error: {e}")

print("\n" + "="*80)
print("API CHECK COMPLETE")
print("="*80)
