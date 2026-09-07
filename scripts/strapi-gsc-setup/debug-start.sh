#!/bin/bash
cd /opt/cbi-strapi
echo "=== Starting Strapi Debug ==="
echo "Node version: $(node --version)"
echo "PWD: $(pwd)"
echo "Dist exists: $(ls dist/ 2>/dev/null | head -5)"

# Stop PM2
pm2 stop cbi-strapi 2>/dev/null

# Start Strapi with full output capture
timeout 25 npm run start > /tmp/strapi-debug.log 2>&1
EXIT_CODE=$?

echo "=== Exit Code: $EXIT_CODE ==="
echo "=== stdout+stderr output ==="
cat /tmp/strapi-debug.log
echo "=== END ==="
