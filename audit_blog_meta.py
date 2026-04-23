#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json

urls = [
    'https://www.centrabiotechindonesia.com/id/blog',
    'https://www.centrabiotechindonesia.com/en/blog',
    'https://www.centrabiotechindonesia.com/id/blog/pupuk-organik-cair-vs-padat-mana-yang-lebih-efektif'
]

results = {}

for url in urls:
    print(f"\n{'='*80}")
    print(f"Checking: {url}")
    print('='*80)
    try:
        resp = requests.get(url, timeout=10, allow_redirects=True)
        print(f"Status Code: {resp.status_code}")
        print(f"Final URL: {resp.url}")
        
        soup = BeautifulSoup(resp.content, 'html.parser')
        
        check_result = {
            'url': url,
            'status_code': resp.status_code,
            'final_url': resp.url,
            'issues': []
        }
        
        # Check robots meta tag
        robots_meta = soup.find('meta', attrs={'name': 'robots'})
        if robots_meta:
            robots_content = robots_meta.get('content', 'NO CONTENT')
            print(f"❌ Robots Meta Tag: {robots_content}")
            check_result['issues'].append(f"robots meta: {robots_content}")
        else:
            print("✓ No explicit robots meta tag")
        
        # Check for noindex
        if 'noindex' in resp.text.lower():
            print("⚠️  'noindex' found in page source")
            check_result['issues'].append("noindex found in source")
        
        # Check canonical
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        if canonical:
            print(f"✓ Canonical URL: {canonical.get('href')}")
            check_result['canonical'] = canonical.get('href')
        
        # Check X-Robots-Tag header
        if 'X-Robots-Tag' in resp.headers:
            print(f"❌ X-Robots-Tag header: {resp.headers['X-Robots-Tag']}")
            check_result['issues'].append(f"X-Robots-Tag header: {resp.headers['X-Robots-Tag']}")
        
        # Check title
        title = soup.find('title')
        if title:
            print(f"✓ Title: {title.text[:60]}...")
            check_result['title'] = title.text
        
        # Check description
        desc = soup.find('meta', attrs={'name': 'description'})
        if desc:
            print(f"✓ Description: {desc.get('content', '')[:60]}...")
            check_result['description'] = desc.get('content', '')
        
        # Check og:type
        og_type = soup.find('meta', attrs={'property': 'og:type'})
        if og_type:
            print(f"✓ OG Type: {og_type.get('content')}")
            check_result['og_type'] = og_type.get('content')
        
        # Check content length
        print(f"Content length: {len(resp.text)} bytes")
        check_result['content_length'] = len(resp.text)
        
        results[url] = check_result
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error: {e}")
        results[url] = {'error': str(e)}

print("\n" + "="*80)
print("SUMMARY")
print("="*80)
for url, data in results.items():
    print(f"\n{url}")
    if 'error' in data:
        print(f"  ERROR: {data['error']}")
    else:
        print(f"  Status: {data['status_code']}")
        print(f"  Issues: {len(data.get('issues', []))} found")
        if data.get('issues'):
            for issue in data['issues']:
                print(f"    - {issue}")
