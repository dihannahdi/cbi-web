#!/bin/bash

# --- CONFIGURATION ---
DOMAIN="cbi-backend.my.id"
PORT="9338"
DB_PATH="/home/ayam/cbi-strapi-sqlite/.tmp/data.db"
MIDDLEWARE_FILE="/home/ayam/cbi-strapi-sqlite/config/middlewares.ts"
ENV_OVERRIDE="/home/ayam/cbi-strapi-sqlite/config/env/production/middlewares.ts"

echo "==============================================="
echo "   CBI SYSTEM DEEP DIAGNOSTICS REPORT"
echo "==============================================="
echo "Time: $(date)"
echo ""

# 1. CHECK PROCESS STATUS
echo "[1] CHECKING PROCESSES..."
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is RUNNING"
else
    echo "❌ Nginx is STOPPED (CRITICAL)"
fi

PM2_STATUS=$(pm2 jlist | grep "online")
if [[ ! -z "$PM2_STATUS" ]]; then
    echo "✅ PM2 (Strapi) is ONLINE"
else
    echo "❌ PM2 (Strapi) is OFFLINE or ERRORED"
fi

# 2. CHECK PORTS
echo ""
echo "[2] CHECKING PORTS..."
if netstat -tuln | grep ":$PORT" > /dev/null; then
    echo "✅ Port $PORT is listening (Strapi is active)"
else
    echo "❌ Port $PORT is CLOSED. Strapi is not running correctly."
fi

# 3. CHECK DATABASE INTEGRITY & PERMISSIONS
echo ""
echo "[3] CHECKING DATABASE (Guest Access)..."
if [ -f "$DB_PATH" ]; then
    echo "✅ Database file exists."
    
    # Check for Null Titles (The Frontend Crasher)
    NULL_COUNT=$(sqlite3 "$DB_PATH" "SELECT count(*) FROM product_items WHERE title IS NULL;")
    if [ "$NULL_COUNT" -eq "0" ]; then
        echo "✅ No 'Ghost' products found (Data is clean)."
    else
        echo "❌ WARNING: Found $NULL_COUNT broken products with NULL titles."
    fi

    # Check Public Permissions (The Guest Trick)
    # Note: Schema varies, checking generic 'up_permissions' availability
    PERM_CHECK=$(sqlite3 "$DB_PATH" "SELECT count(*) FROM up_permissions WHERE role=2 AND enabled=1;" 2>/dev/null)
    if [[ $? -eq 0 ]]; then
         echo "ℹ️  Database permission rows found for Public role: $PERM_CHECK (Should be > 0)"
    else
         echo "⚠️  Could not verify permissions via SQL (Schema mismatch?)"
    fi
else
    echo "❌ Database file NOT FOUND at $DB_PATH"
fi

# 4. CHECK MIDDLEWARE & CORS (The 'Error Loading Data' Cause)
echo ""
echo "[4] CHECKING CORS CONFIG..."
if [ -f "$ENV_OVERRIDE" ]; then
    echo "❌ CRITICAL: Production override file exists!" 
    echo "   ($ENV_OVERRIDE)"
    echo "   This overrides your main config and might block the Guest Trick."
else
    echo "✅ No production override file found (Good)."
fi

if grep -q "origin: \['\*'\]" "$MIDDLEWARE_FILE"; then
    echo "✅ Main middleware set to wildcard '*' (Guest Mode Active)."
else
    echo "❌ Main middleware is RESTRICTIVE. It does not have origin: ['*']."
    grep "origin:" "$MIDDLEWARE_FILE"
fi

# 5. CHECK API RESPONSES
echo ""
echo "[5] CHECKING API RESPONSES..."

# Local Check
LOCAL_CODE=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:$PORT/api/product-items)
if [ "$LOCAL_CODE" -eq "200" ]; then
    echo "✅ Local API Access: OK (200)"
else
    echo "❌ Local API Access: FAILED ($LOCAL_CODE)"
fi

# Public Domain Check
PUBLIC_CODE=$(curl -o /dev/null -s -w "%{http_code}" https://$DOMAIN/api/product-items)
if [ "$PUBLIC_CODE" -eq "200" ]; then
    echo "✅ Public Domain Access: OK (200)"
else
    echo "❌ Public Domain Access: FAILED ($PUBLIC_CODE)"
fi

# Data Content Check
DATA_CHECK=$(curl -s http://localhost:$PORT/api/product-items | grep -o "RAJABIO")
if [[ ! -z "$DATA_CHECK" ]]; then
    echo "✅ 'RAJABIO' data is visible in the API."
else
    echo "❌ 'RAJABIO' NOT found in API response (Data hidden or empty)."
fi

echo ""
echo "==============================================="
echo "END OF REPORT"
echo "==============================================="
