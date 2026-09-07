import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Test the EXACT URL our redirect checker would call
url = 'https://cbi-backend.my.id/api/articles?filters[slug][$eq]=rahasia-membuat-pupuk-organik-cair-super&fields[0]=slug&locale=id'
r = urllib.request.urlopen(url, context=ctx, timeout=10)
data = json.loads(r.read())
print(f"data length: {len(data.get('data', []))}")
if data.get('data'):
    print(f"first: {data['data'][0]}")
else:
    print("NONE found")

# Also test without locale
url2 = 'https://cbi-backend.my.id/api/articles?filters[slug][$eq]=rahasia-membuat-pupuk-organik-cair-super&fields[0]=slug'
r2 = urllib.request.urlopen(url2, context=ctx, timeout=10)
data2 = json.loads(r2.read())
print(f"\nWithout locale - data length: {len(data2.get('data', []))}")

# Test with en locale
url3 = 'https://cbi-backend.my.id/api/articles?filters[slug][$eq]=rahasia-membuat-pupuk-organik-cair-super&fields[0]=slug&locale=en'
r3 = urllib.request.urlopen(url3, context=ctx, timeout=10)
data3 = json.loads(r3.read())
print(f"With en locale - data length: {len(data3.get('data', []))}")
