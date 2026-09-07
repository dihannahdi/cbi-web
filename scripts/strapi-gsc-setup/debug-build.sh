#!/bin/bash
set -e
cd /opt/cbi-strapi

echo "=== Check plugin files ==="
find src/plugins/gsc-monitor -name '*.ts' -o -name '*.tsx' | head -20
echo

echo "=== Check admin/src/index.ts ==="
cat src/plugins/gsc-monitor/admin/src/index.ts
echo

echo "=== Check for syntax errors in Dashboard.tsx ==="
head -30 src/plugins/gsc-monitor/admin/src/pages/Dashboard.tsx
echo

echo "=== Trying build with verbose ==="
NODE_OPTIONS="--max-old-space-size=4096" npx strapi build 2>&1 || true

echo "=== Check dist for admin ==="
ls -la dist/build/ 2>/dev/null | head -5
echo "=== DONE ==="
