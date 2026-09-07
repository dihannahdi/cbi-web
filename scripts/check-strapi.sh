#!/bin/bash
curl -s 'https://cbi-backend.my.id/api/product-detail-pages?filters[slug][$eq]=floraone-pupuk-hayati&locale=id' | python3 -c "
import json, sys
data = json.load(sys.stdin)
items = data.get('data', [])
if items:
    item = items[0]
    attrs = item.get('attributes', item)
    print('=== STRAPI FLORAONE DATA ===')
    for key in ['metaTitle', 'metaDescription', 'heroTitle', 'heroSubtitle', 'slug', 'name', 'locale']:
        val = attrs.get(key, 'NOT SET')
        print(f'{key}: {val}')
    print('---')
    print('ALL KEYS:', list(attrs.keys()))
else:
    print('NO DATA FOUND')
    print('Raw:', json.dumps(data)[:500])
"
