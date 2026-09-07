#!/bin/bash
cd /opt/cbi-strapi

echo "=== Test 1: Check admin panel loads ==="
curl -s http://localhost:9338/admin | grep -o 'GSC Monitor\|gsc-monitor\|gscMonitor' | head -5
echo ""

echo "=== Test 2: Check plugin dashboard route via admin API ==="
# The admin API route for the plugin should be at /gsc-monitor/dashboard-data
curl -s http://localhost:9338/gsc-monitor/dashboard-data 2>&1 | head -3
echo ""

echo "=== Test 3: Check content type data count ==="
# Use sqlite to check data exists
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT COUNT(*) as count FROM article_analytics;" 2>/dev/null || echo "table not found"
echo ""
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT COUNT(*) as count FROM gsc_top_queries;" 2>/dev/null || echo "table not found"
echo ""
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT COUNT(*) as count FROM gsc_monitoring_logs;" 2>/dev/null || echo "table not found"
echo ""

echo "=== Test 4: Check sample article-analytic data ==="
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT slug, title, clicks_28d, impressions_28d, index_status FROM article_analytics LIMIT 5;" 2>/dev/null || echo "query failed"
echo ""

echo "=== Test 5: Check sample gsc-top-query data ==="
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT query, clicks, impressions FROM gsc_top_queries ORDER BY clicks DESC LIMIT 5;" 2>/dev/null || echo "query failed"
echo ""

echo "=== Test 6: Check monitoring log ==="
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT total_articles, indexed_count, total_clicks, total_impressions, status FROM gsc_monitoring_logs ORDER BY created_at DESC LIMIT 3;" 2>/dev/null || echo "query failed"
echo ""

echo "=== Test 7: List all tables ==="
sqlite3 /opt/cbi-strapi/.tmp/data.db ".tables" | tr ' ' '\n' | grep -E 'article_analytic|gsc_top|gsc_monitoring'

echo "=== DONE ==="
