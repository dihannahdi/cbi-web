#!/bin/bash
cd /opt/cbi-strapi

echo "=== Trying Vite build with debug ==="
# Run the build and capture stderr separately
NODE_OPTIONS="--max-old-space-size=4096" STRAPI_LOG_LEVEL=debug npx strapi build --debug 2>/tmp/build-stderr.txt 1>/tmp/build-stdout.txt
BUILD_CODE=$?

echo "Exit code: $BUILD_CODE"
echo ""
echo "=== STDOUT (last 20 lines) ==="
tail -20 /tmp/build-stdout.txt
echo ""
echo "=== STDERR (last 30 lines) ==="
tail -30 /tmp/build-stderr.txt
echo ""
echo "=== Any error in stderr ==="
grep -i "error\|fail\|cannot\|crash\|kill\|signal\|abort" /tmp/build-stderr.txt 2>/dev/null | head -20
echo "=== DONE ==="
