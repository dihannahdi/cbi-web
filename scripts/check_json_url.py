import json

d = json.load(open("/opt/cbi-strapi/public/uploads/article-performance.json"))
for a in d["articles"]:
    if "rahasia-membuat" in a["slug"]:
        print(f"type={a['type']} url={a['url']}")

# Also check: any articles-table entries with /blog/ URL?
print("\n=== Articles with /blog/ in URL (WRONG) ===")
for a in d["articles"]:
    if a["type"] == "news" and "/blog/" in a.get("url", ""):
        print(f"  WRONG: {a['slug']} -> {a['url']}")

print("\n=== Blogs with /news/ in URL (WRONG) ===")
for a in d["articles"]:
    if a["type"] == "blog" and "/news/" in a.get("url", ""):
        print(f"  WRONG: {a['slug']} -> {a['url']}")

print("\nDone.")
