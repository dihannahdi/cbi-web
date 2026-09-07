# WhatsApp Button Click Analytics System

## Overview
A comprehensive click tracking system for the WhatsApp floating button on the CBI website. Tracks user engagement across multiple channels with automatic failover.

## Features

### ✅ Three-Tier Tracking System
1. **Google Analytics 4 (GA4)** - Professional analytics platform
2. **localStorage** - Client-side backup (keeps last 100 clicks)
3. **API Endpoint** - Server-side persistence (keeps last 1000 clicks)

### ✅ Analytics Dashboard
- Real-time click count display
- Recent clicks table (last 10)
- Local vs server click comparison
- Auto-refresh every 30 seconds

### ✅ Privacy-Focused
- No personal identifiable information stored
- Summary data only in GET endpoint
- User agent and referrer tracked for analytics purposes only

## Architecture

### Files Structure

```
lib/whatsapp-analytics.ts              # Analytics tracking library
app/api/analytics/whatsapp-click/      # API endpoint (POST/GET)
  └── route.ts
app/[lang]/analytics/whatsapp/         # Analytics dashboard
  └── page.tsx
components/common/WhatsAppFloat.tsx    # Floating button with tracking
data/whatsapp-clicks.json              # Server-side storage (auto-created)
```

### Data Flow

```
User clicks WhatsApp button
         ↓
WhatsAppAnalytics.trackClick() called
         ↓
    ┌────┴────┬────────────┐
    ↓         ↓            ↓
  GA4    localStorage    API
 event    (100 limit)   endpoint
    ↓         ↓            ↓
Google   Browser    JSON file
Analytics Storage   (1000 limit)
```

## Usage

### View Analytics Dashboard

Visit: `https://cbi-web.vercel.app/id/analytics/whatsapp`

Or for English: `https://cbi-web.vercel.app/en/analytics/whatsapp`

### API Endpoints

**GET Analytics Data:**
```bash
curl https://cbi-web.vercel.app/api/analytics/whatsapp-click
```

Response:
```json
{
  "totalClicks": 42,
  "lastUpdated": "2026-01-20T10:30:00.000Z",
  "recentClicks": [
    {
      "timestamp": "2026-01-20T10:30:00.000Z",
      "page": "/id/product",
      "locale": "id"
    }
  ]
}
```

**POST Click Event (automatic from button):**
```bash
curl -X POST https://cbi-web.vercel.app/api/analytics/whatsapp-click \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2026-01-20T10:30:00.000Z",
    "page": "/id/product",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "locale": "id"
  }'
```

### Programmatic Access

```typescript
import WhatsAppAnalytics from '@/lib/whatsapp-analytics';

// Get total clicks from localStorage
const count = WhatsAppAnalytics.getLocalClickCount();

// Get all click data
const clicks = WhatsAppAnalytics.getLocalClickData();

// Manually track a click
WhatsAppAnalytics.trackClick();
```

## Data Storage

### localStorage (Client-side)
- **Key:** `wa_button_clicks`
- **Limit:** 100 most recent clicks
- **Format:** Array of ClickEvent objects
- **Persistence:** Per-browser, cleared if user clears browser data

### JSON File (Server-side)
- **Path:** `data/whatsapp-clicks.json`
- **Limit:** 1000 most recent clicks
- **Format:** AnalyticsData object
- **Persistence:** Permanent (until manually deleted)
- **Note:** File is auto-created on first click

### ClickEvent Structure

```typescript
interface ClickEvent {
  timestamp: string;      // ISO 8601 format
  page: string;          // Current page path
  userAgent: string;     // Browser user agent
  referrer: string;      // Previous page URL
  locale: string;        // Language (id/en)
}
```

## Google Analytics 4 Integration

### Current Status
GA4 tracking is implemented but requires GA4 setup to function.

### Setup Instructions

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)

2. Get your Measurement ID (format: `G-XXXXXXXXXX`)

3. Add to your Next.js layout:

```tsx
// app/[lang]/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

4. Verify in GA4 dashboard after 24-48 hours

### GA4 Event Tracking

The system automatically sends this event:

```javascript
gtag('event', 'whatsapp_button_click', {
  page_path: window.location.pathname,
  page_title: document.title,
  locale: locale
});
```

You can view this in GA4 under:
- **Realtime** > Events
- **Engagement** > Events

## Monitoring & Maintenance

### Health Checks

1. **API Endpoint:**
   ```bash
   curl https://cbi-web.vercel.app/api/analytics/whatsapp-click
   ```
   Should return valid JSON with totalClicks

2. **Console Logging:**
   Open browser console, click WhatsApp button, should see:
   ```
   WhatsApp button clicked! Total local clicks: 1
   ```

3. **localStorage:**
   Open browser DevTools > Application > Local Storage
   Check for `wa_button_clicks` key

### Data Management

**Clear localStorage (per-user):**
```javascript
localStorage.removeItem('wa_button_clicks');
```

**Reset server data:**
Delete or edit `data/whatsapp-clicks.json` on the server

**View raw server data:**
```bash
cat data/whatsapp-clicks.json | jq .
```

### File Size Management

- localStorage: Auto-managed (max 100 clicks)
- JSON file: Auto-managed (max 1000 clicks)
- Oldest clicks automatically removed when limits reached

## Troubleshooting

### No clicks recorded?

1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check if localStorage is enabled
4. Verify WhatsApp button is visible

### Dashboard shows 0 clicks?

1. Click the WhatsApp button at least once
2. Wait a few seconds for API call to complete
3. Refresh the dashboard page
4. Check if `data/whatsapp-clicks.json` exists on server

### GA4 not tracking?

1. Verify GA4 script is loaded (check Network tab)
2. Check if `window.gtag` function exists in console
3. Wait 24-48 hours for data to appear in GA4
4. Use GA4 Realtime report for immediate verification

### API errors?

Check Vercel logs:
```bash
vercel logs cbi-web --prod
```

## Performance Impact

- **Page Load:** None (button renders with page)
- **Click Event:** ~50-100ms total
  - GA4: ~10ms (async)
  - localStorage: ~5ms
  - API call: ~30-80ms (async, doesn't block)
- **Dashboard Load:** ~200-500ms (fetches data once)

All tracking is asynchronous and doesn't affect user experience.

## Security Considerations

- ✅ No sensitive data stored
- ✅ No authentication required (read-only data)
- ✅ CORS automatically handled by Next.js
- ✅ Input validation on API endpoint
- ✅ Rate limiting via Vercel platform
- ⚠️ Dashboard is publicly accessible (consider adding auth if needed)

## Future Enhancements

Potential improvements:

1. **Admin Authentication** - Protect analytics dashboard
2. **Export to CSV** - Download analytics data
3. **Date Range Filters** - View clicks by time period
4. **Geographic Data** - Add country/region tracking
5. **Conversion Tracking** - Track WhatsApp conversation outcomes
6. **A/B Testing** - Test different button designs
7. **Heatmap Integration** - See which pages generate most clicks
8. **Email Reports** - Weekly/monthly analytics emails

## Support

For issues or questions:
- Email: centrabioindo@gmail.com
- WhatsApp: 0812-3500-3655
- GitHub: [Repository Issues](https://github.com/your-repo/issues)

## Changelog

### v1.0.0 (2026-01-20)
- ✅ Initial release
- ✅ Three-tier tracking system
- ✅ Analytics dashboard
- ✅ API endpoints
- ✅ localStorage backup
- ✅ GA4 integration support

### v1.1.0 (2026-07-11) — File-format fix + GA4 durability notes
- 🐛 Fixed a format mismatch: the API route wrote an object wrapper
  (`{ totalClicks, clicks, lastUpdated }`) while the reporting script
  (`scripts/gsc-sheets-monitor/monthly_report.py`) expected a bare array —
  the two had silently never agreed, so `data/whatsapp-clicks.json` was
  effectively never read correctly for reports.
- `route.ts` now writes/reads a bare JSON array (see "File Format Contract"
  below); the reporting script now tolerates both shapes so it never
  silently reports 0 leads on a valid file.
- `route.ts` POST wraps all filesystem I/O in its own try/catch — a failed
  file write (e.g. on an ephemeral/read-only filesystem) never fails the
  click response to the user.

## File Format Contract (WhatsApp click file)

`data/whatsapp-clicks.json` is a **bare JSON array** of click events:

```json
[
  { "timestamp": "2026-07-11T10:30:00.000Z", "page": "/id/product", "userAgent": "...", "referrer": "...", "locale": "id" },
  { "timestamp": "2026-07-11T10:31:12.000Z", "page": "/id/product", "userAgent": "...", "referrer": "...", "locale": "en" }
]
```

- Producer: `app/api/analytics/whatsapp-click/route.ts` (`POST`) — appends one
  event per click, capped at the most recent 1000.
- Consumer: `scripts/gsc-sheets-monitor/monthly_report.py` ->
  `get_whatsapp_leads_monthly(year)` — counts events per calendar month by
  parsing `timestamp` (ISO 8601). It also tolerates the legacy
  `{ totalClicks, clicks: [...], lastUpdated }` object-wrapper shape as a
  read-time fallback, but new writes always use the bare-array shape above.
  Do not change either side's shape without updating the other.
- The `GET` handler in `route.ts` still returns the same summary shape as
  before (`{ totalClicks, lastUpdated, recentClicks }`) for the analytics
  dashboard (`app/[lang]/analytics/whatsapp/page.tsx`) — only the on-disk
  storage shape changed, not the API response shape.

## Ephemeral Filesystem Caveat — Why the JSON File Is Not Durable

`data/whatsapp-clicks.json` is written with plain Node `fs` calls from a
Next.js API route. On serverless/edge hosting (Vercel functions, or a
container behind Cloudflare) the filesystem is frequently:

- **ephemeral** — reset on every deploy and often on every cold start, and
- **not shared** — each invocation/instance may have its own disk, so
  concurrent requests don't see each other's writes.

In practice this means the file can appear empty or missing even when
WhatsApp clicks are actively happening — this is expected, not a bug. Treat
it as a **best-effort, short-term signal only** (useful for local dev or a
single long-lived server process), never as the authoritative lead count.

**GA4 is the durable source of truth.** Every WhatsApp button click fires a
`whatsapp_button_click` event directly to Google Analytics 4 (property
`G-16L2MWL33B`) from the browser — independent of this server and this file.
As long as the GA4 tag is loaded, that event is recorded regardless of what
happens to the Next.js filesystem.

## Enabling Durable GA4-Based Lead Counting (Recommended Fix)

`scripts/gsc-sheets-monitor/monthly_report.py` already has a guarded GA4
path (`get_whatsapp_leads_ga4_monthly`, combined via
`get_whatsapp_leads_combined`) that counts `whatsapp_button_click` events per
month straight from the GA4 Data API, and prefers that over the local file
whenever it's available. It currently falls back to the file because the
script's OAuth token lacks the required scope. To turn it on:

1. **Add the scope.** In `monthly_report.py`, the constant `GA4_SCOPES`
   already exists (`SCOPES + ["https://www.googleapis.com/auth/analytics.readonly"]`)
   but `get_credentials()` currently authorizes with `SCOPES` only. Change
   both calls inside `get_credentials()` — `Credentials.from_authorized_user_file(...)`
   and `InstalledAppFlow.from_client_secrets_file(...)` — to use `GA4_SCOPES`
   instead of `SCOPES`.
2. **Re-authorize.** Delete/rename `scripts/gsc-sheets-monitor/token.json`
   (or run `python monthly_report.py --auth`) and complete the OAuth consent
   screen again — this step is required because swapping the `SCOPES`
   constant alone does not retroactively upgrade an already-issued token;
   Google requires a fresh consent grant for the new scope.
3. **Set the GA4 property id.** Set the `GA4_PROPERTY_ID` environment
   variable to the numeric GA4 property id (e.g. `123456789`, not the
   `G-XXXXXXXXXX` Measurement ID) before running the script. If left unset,
   the script attempts auto-discovery via the GA4 Admin API
   (`_discover_ga4_property`), which also requires the scope from step 1.
4. **Verify.** Re-run `python monthly_report.py` and check the log for
   `GA4 WhatsApp leads YYYY-MM: N` lines instead of `GA4 property not
   configured` / 403 messages. Once this works, both the "Leads (WhatsApp)"
   row in the Web report sheet and the GA4 metrics rows above it will be
   backed by GA4 rather than the local file.

Until these steps are done, WhatsApp lead counts in the report come from the
local JSON file fallback and may undercount (or read as zero) due to the
ephemeral-filesystem caveat above.
