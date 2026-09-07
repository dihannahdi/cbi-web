#!/bin/bash
cd /opt/cbi-strapi

echo "=== Step 1: Fix plugin package.json with proper exports ==="
cat > src/plugins/gsc-monitor/package.json << 'PKGJSON'
{
  "name": "gsc-monitor",
  "version": "1.0.0",
  "description": "GSC Article Monitoring Dashboard for Strapi Admin",
  "strapi": {
    "displayName": "GSC Monitor",
    "name": "gsc-monitor",
    "description": "Google Search Console article monitoring dashboard",
    "kind": "plugin"
  },
  "main": "./server/src/index.js",
  "exports": {
    "./strapi-admin": {
      "source": "./admin/src/index.ts",
      "default": "./admin/src/index.ts"
    },
    "./strapi-server": {
      "source": "./server/src/index.js",
      "default": "./server/src/index.js"
    }
  }
}
PKGJSON

echo "Done. New package.json:"
cat src/plugins/gsc-monitor/package.json

echo ""
echo "=== Step 2: Build ==="
NODE_OPTIONS="--max-old-space-size=4096" npm run build > /tmp/build-output2.txt 2>&1
BUILD_CODE=$?
echo "Build exit code: $BUILD_CODE"

echo ""
echo "=== Build output (last 30 lines) ==="
tail -30 /tmp/build-output2.txt

if [ $BUILD_CODE -eq 0 ]; then
  echo ""
  echo "=== Step 3: Start Strapi ==="
  pm2 start cbi-strapi
  echo "=== BUILD SUCCESS ==="
else
  echo ""
  echo "=== Build errors ==="
  grep -i "error\|fail\|cannot\|ENOENT\|module" /tmp/build-output2.txt | head -20
fi
