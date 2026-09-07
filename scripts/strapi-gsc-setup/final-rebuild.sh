#!/bin/bash
cd /opt/cbi-strapi

echo "=== Stopping Strapi ==="
pm2 stop cbi-strapi 2>/dev/null

echo "=== Building ==="
NODE_OPTIONS="--max-old-space-size=4096" npm run build > /tmp/build-final.txt 2>&1
BUILD_CODE=$?
echo "Build exit code: $BUILD_CODE"

echo "=== Build output (last 15 lines) ==="
tail -15 /tmp/build-final.txt

echo "=== Files in dist/build ==="
ls /opt/cbi-strapi/dist/build/ 2>/dev/null | wc -l

echo "=== Starting Strapi ==="
pm2 start cbi-strapi
echo "=== Waiting 50s for startup ==="
sleep 50
echo "=== Health check ==="
curl -s http://localhost:9338/_health && echo " OK" || echo " FAILED"
echo "=== DONE ==="
