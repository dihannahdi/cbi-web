#!/bin/bash
set -e
cd /opt/cbi-strapi

echo "=== Step 1: Enable plugin ==="
sed -i "s/enabled: false/enabled: true/" config/plugins.ts
grep -A2 'gsc-monitor' config/plugins.ts
echo

echo "=== Step 2: Stop Strapi ==="
pm2 stop cbi-strapi
echo

echo "=== Step 3: Build ==="
NODE_OPTIONS="--max-old-space-size=4096" npm run build 2>&1
BUILD_EXIT=$?
echo
echo "Build exit code: $BUILD_EXIT"

if [ $BUILD_EXIT -eq 0 ]; then
  echo "=== Step 4: Start Strapi ==="
  pm2 start cbi-strapi
  echo "=== BUILD SUCCESS ==="
else
  echo "=== BUILD FAILED, reverting plugin ==="
  sed -i "s/enabled: true/enabled: false/" config/plugins.ts
  pm2 start cbi-strapi
  echo "=== REVERTED ==="
fi
