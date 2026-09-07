#!/bin/bash
# List all product slugs and get FloraOne liquid data
python3 -c "
import json
d = json.load(open('/tmp/strapi-out.json'))
print('=== ALL PRODUCT SLUGS ===')
for x in d['data']:
    print(f\"{x['slug']} | {x.get('meta_title', 'N/A')}\")

print()
print('=== LOOKING FOR floraone-pupuk-hayati (liquid) ===')
for x in d['data']:
    if 'floraone' in x['slug'].lower() and 'padat' not in x['slug'].lower():
        print(json.dumps(x, indent=2, ensure_ascii=False)[:3000])
"
