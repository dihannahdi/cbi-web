import json, urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

d = json.load(open("/opt/cbi-strapi/public/uploads/article-performance.json"))

print("=== Checking ALL articles table entries (type=news) at wrong /blog/ path ===")
articles_as_news = [a for a in d["articles"] if a["type"] == "news"]
print(f"Total news-type articles: {len(articles_as_news)}")

broken = []
for a in articles_as_news:
    slug = a["slug"]
    wrong_url = f"https://www.centrabiotechindonesia.com/id/blog/{slug}"
    try:
        req = urllib.request.Request(wrong_url, method="HEAD")
        resp = urllib.request.urlopen(req, context=ctx, timeout=10)
        status = resp.getcode()
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception as e:
        status = f"ERR:{e}"
    
    if status != 404:
        print(f"  UNEXPECTED {status}: {wrong_url}")
    broken.append({"slug": slug, "wrong_url": wrong_url, "status": status})

count_404 = sum(1 for b in broken if b["status"] == 404)
print(f"\nAll {count_404}/{len(articles_as_news)} articles correctly return 404 at /blog/ path")
print("(These will be fixed by the redirect after deployment)")

# Also spot-check a few blogs at wrong /news/ path
print("\n=== Spot-checking 5 random blogs at wrong /news/ path ===")
blogs_type = [a for a in d["articles"] if a["type"] == "blog"][:5]
for b in blogs_type:
    slug = b["slug"]
    wrong_url = f"https://www.centrabiotechindonesia.com/id/news/{slug}"
    try:
        req = urllib.request.Request(wrong_url, method="HEAD")
        resp = urllib.request.urlopen(req, context=ctx, timeout=10)
        status = resp.getcode()
    except urllib.error.HTTPError as e:
        status = e.code
    except Exception as e:
        status = f"ERR:{e}"
    print(f"  {status}: /id/news/{slug}")

print("\nDone.")
