import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Test 1: Basic articles list
r = urllib.request.urlopen('https://cbi-backend.my.id/api/articles?pagination[pageSize]=1', context=ctx, timeout=10)
data = r.read()
print("=== Basic articles list ===")
print(data[:1000])

# Test 2: Filtered by slug
print("\n=== Filtered by slug ===")
r2 = urllib.request.urlopen('https://cbi-backend.my.id/api/articles?filters[slug][$eq]=rahasia-membuat-pupuk-organik-cair-super&locale=id', context=ctx, timeout=10)
data2 = r2.read()
print(data2[:1000])

# Test 3: Check what port cbi-strapi runs on
import subprocess
result = subprocess.run(['pm2', 'describe', 'cbi-strapi'], capture_output=True, text=True)
for line in result.stdout.splitlines():
    if 'script path' in line.lower() or 'cwd' in line.lower() or 'exec' in line.lower():
        print(line)

# Test 4: Try Strapi on various ports
for port in [1337, 1338, 3000, 3001, 8080]:
    try:
        r = urllib.request.urlopen(f'http://127.0.0.1:{port}/api/articles?pagination[pageSize]=1', timeout=3)
        print(f"\nPort {port}: OK - {r.read()[:200]}")
    except Exception as e:
        print(f"Port {port}: {e}")
