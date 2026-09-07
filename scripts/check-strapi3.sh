#!/bin/bash
echo "=== CHECKING ENGLISH LOCALE ==="
curl -s 'https://cbi-backend.my.id/api/product-detail-pages?filters[slug][$eq]=floraone-pupuk-hayati&locale=en' | python3 -c "
import json, sys
data = json.load(sys.stdin)
items = data.get('data', [])
if items:
    item = items[0]
    print('FOUND English entry!')
    for key in ['name', 'subtitle', 'heroTitle', 'heroSubtitle', 'meta_title', 'meta_description', 'focus_keyphrase', 'locale']:
        print(f'  {key}: {item.get(key, \"NOT SET\")}')
else:
    print('NO English entry found')
    print('Raw:', json.dumps(data)[:300])
"

echo ""
echo "=== CHECKING ID LOCALE (full field names) ==="
curl -s 'https://cbi-backend.my.id/api/product-detail-pages?filters[slug][$eq]=floraone-pupuk-hayati&locale=id' | python3 -c "
import json, sys
data = json.load(sys.stdin)
items = data.get('data', [])
if items:
    item = items[0]
    print('FOUND Indonesian entry!')
    for key in sorted(item.keys()):
        val = item.get(key)
        if val is not None and val != '' and key not in ['createdAt', 'updatedAt', 'publishedAt', 'documentId']:
            display = str(val)[:100]
            print(f'  {key}: {display}')
else:
    print('NO Indonesian entry found')
"
