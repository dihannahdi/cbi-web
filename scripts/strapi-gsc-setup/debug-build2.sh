#!/bin/bash
cd /opt/cbi-strapi

echo "=== Checking plugin structure ==="
find src/plugins/gsc-monitor -type f | sort

echo ""
echo "=== Checking package.json ==="
cat src/plugins/gsc-monitor/package.json

echo ""
echo "=== Checking pluginId.ts ==="
cat src/plugins/gsc-monitor/admin/src/pluginId.ts

echo ""
echo "=== Checking server/src/index.js ==="  
cat src/plugins/gsc-monitor/server/src/index.js

echo ""
echo "=== Checking tsconfig ==="
cat src/plugins/gsc-monitor/tsconfig.json 2>/dev/null || echo "No tsconfig found"

echo ""
echo "=== Running build with full error capture ==="
NODE_OPTIONS="--max-old-space-size=4096" npm run build > /tmp/build-output.txt 2>&1
BUILD_CODE=$?
echo "Build exit code: $BUILD_CODE"

echo ""
echo "=== Build output (last 100 lines) ==="
tail -100 /tmp/build-output.txt

echo ""
echo "=== Any error/warning lines ==="
grep -i "error\|warn\|fail\|cannot\|not found\|ENOENT\|module" /tmp/build-output.txt | head -30
