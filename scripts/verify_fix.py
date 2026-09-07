#!/usr/bin/env python3
"""Verify fixed URLs via Strapi API."""
import json
import urllib.request

url = 'http://localhost:9338/api/blogs?filters[slug][$eq]=perbedaan-sampah-organik-dan-anorganik&locale=id&fields[0]=content'
resp = urllib.request.urlopen(url)
data = json.loads(resp.read())

def find_urls(obj, urls):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == 'url' and isinstance(v, str):
                urls.append(v)
            else:
                find_urls(v, urls)
    elif isinstance(obj, list):
        for item in obj:
            find_urls(item, urls)

urls = []
find_urls(data, urls)
print("URLs found in API response for 'perbedaan-sampah-organik-dan-anorganik':")
for u in urls:
    status = "OK" if u.startswith('/id/') or u.startswith('/en/') or u.startswith('http') else "BROKEN"
    print(f"  [{status}] {u}")
