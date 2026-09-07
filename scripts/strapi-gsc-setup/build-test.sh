#!/bin/bash
cd /opt/cbi-strapi

echo "=== Test 1: Build WITHOUT plugin ==="
# Disable plugin
sed -i 's/enabled: true/enabled: false/' config/plugins.ts  
echo "Plugin disabled"
npm run build > /tmp/build-test1.log 2>&1
RC1=$?
echo "Exit code: $RC1"
echo "Admin panel files:"
ls dist/build/ 2>/dev/null | wc -l

if [ $RC1 -eq 0 ]; then
    echo "=== Build WITHOUT plugin: SUCCESS ==="
else
    echo "=== Build WITHOUT plugin: FAILED ==="
    tail -20 /tmp/build-test1.log
fi

echo ""
echo "=== Test 2: Build WITH plugin ==="
# Re-enable plugin
sed -i 's/enabled: false/enabled: true/' config/plugins.ts
echo "Plugin enabled"
npm run build > /tmp/build-test2.log 2>&1
RC2=$?
echo "Exit code: $RC2"
echo "Admin panel files:"
ls dist/build/ 2>/dev/null | wc -l

if [ $RC2 -eq 0 ]; then
    echo "=== Build WITH plugin: SUCCESS ==="
else
    echo "=== Build WITH plugin: FAILED ==="
    tail -20 /tmp/build-test2.log
fi
