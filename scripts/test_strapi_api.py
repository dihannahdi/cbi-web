import urllib.request
import json

# Test Strapi articles API
try:
    r = urllib.request.urlopen("http://127.0.0.1:1337/api/articles?pagination[pageSize]=1")
    print(f"Status: {r.status}")
    data = json.loads(r.read())
    print(f"Total articles: {data.get('meta', {}).get('pagination', {}).get('total', 'unknown')}")
    if data.get("data"):
        print(f"First article: {data['data'][0].get('slug', 'no slug')}")
except Exception as e:
    print(f"articles API error: {e}")

# Test with slug filter
try:
    r = urllib.request.urlopen("http://127.0.0.1:1337/api/articles?filters[slug][$eq]=rahasia-membuat-pupuk-organik-cair-super&fields[0]=slug&locale=id")
    data = json.loads(r.read())
    print(f"\nSlug filter result: {len(data.get('data', []))} matches")
    if data.get("data"):
        print(f"Match: {data['data'][0]}")
except Exception as e:
    print(f"Slug filter error: {e}")

# Test external Strapi API
import ssl
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    r = urllib.request.urlopen("https://cbi-backend.my.id/api/articles?pagination[pageSize]=1", context=ctx)
    print(f"\nExternal API status: {r.status}")
    data = json.loads(r.read())
    print(f"External total: {data.get('meta', {}).get('pagination', {}).get('total', 'unknown')}")
except Exception as e:
    print(f"External API error: {e}")
