#!/usr/bin/env python3
"""Quick verification of Google Sheet output."""
import gspread
from google.oauth2.credentials import Credentials
import json

with open('/opt/cbi-gsc-monitor/token.json') as f:
    token_data = json.load(f)

creds = Credentials(
    token=token_data['token'],
    refresh_token=token_data['refresh_token'],
    token_uri='https://oauth2.googleapis.com/token',
    client_id=token_data['client_id'],
    client_secret=token_data['client_secret'],
    scopes=token_data.get('scopes', [])
)

gc = gspread.authorize(creds)
sh = gc.open_by_url('https://docs.google.com/spreadsheets/d/1W-wmoxLGbU0SeAojlpeAOECa5OE87ZOgLLpzgJrit0E')

print("=== WORKSHEETS ===")
for ws in sh.worksheets():
    print(f"  - {ws.title} ({ws.row_count} rows x {ws.col_count} cols)")

print("\n=== ARTICLE MONITOR (first 5 rows) ===")
ws = sh.worksheet('Article Monitor')
header = ws.row_values(1)
print(f"Headers: {header}")
for i in range(2, 7):
    row = ws.row_values(i)
    if row:
        print(f"Row {i}: {row[:6]}... clicks={row[7] if len(row)>7 else 'N/A'} impr={row[8] if len(row)>8 else 'N/A'}")

print("\n=== DAILY TREND (first 3 rows) ===")
ws2 = sh.worksheet('Daily Trend')
for i in range(1, 4):
    row = ws2.row_values(i)
    if row:
        print(f"Row {i}: {row}")

print("\n=== TOP QUERIES (first 5 rows) ===")
ws3 = sh.worksheet('Top Queries')
for i in range(1, 6):
    row = ws3.row_values(i)
    if row:
        print(f"Row {i}: {row}")

print("\n=== EXECUTION LOG ===")
ws4 = sh.worksheet('Execution Log')
for i in range(1, 5):
    row = ws4.row_values(i)
    if row:
        print(f"Row {i}: {row}")

print("\n=== VERIFICATION COMPLETE ===")
