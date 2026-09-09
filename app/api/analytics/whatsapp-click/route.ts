import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir, appendFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * WhatsApp button click tracking — local JSON file persistence.
 *
 * EPHEMERAL FILESYSTEM CAVEAT:
 * This route best-effort persists clicks to `data/whatsapp-clicks.json` on
 * disk. On serverless/edge hosting (e.g. Vercel, or behind Cloudflare) the
 * filesystem is often ephemeral and/or not shared across invocations/
 * instances — writes here can silently vanish between deploys or cold
 * starts, and concurrent invocations do not see each other's writes. Do NOT
 * treat this file as a durable lead-tracking store.
 *
 * The DURABLE source of truth for WhatsApp lead counts is the GA4 event
 * `whatsapp_button_click` (GA4 property G-QQ90XL5KS5), fired client-side
 * directly to Google Analytics in lib/whatsapp-analytics.ts — it does not
 * depend on this file or this server at all. See
 * scripts/gsc-sheets-monitor/monthly_report.py (get_whatsapp_leads_ga4_monthly
 * / get_ga4_monthly) for the reporting-side GA4 path, and
 * docs/seo/ANALYTICS-README.md for the exact scope/config a human needs to
 * add to enable durable GA4-based lead counting.
 *
 * STORAGE FORMAT CONTRACT:
 * The file is a BARE JSON ARRAY of ClickEvent objects — NOT an object
 * wrapper like `{ totalClicks, clicks, lastUpdated }`. This matches what
 * scripts/gsc-sheets-monitor/monthly_report.py::get_whatsapp_leads_monthly
 * parses. If you change this shape, update that script too.
 */

interface ClickEvent {
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  locale: string;
  // Added when per-CTA attribution shipped (see lib/whatsapp-analytics.ts).
  // Optional because events written before that have neither field.
  source?: string;
  context?: Record<string, unknown>;
}

const ANALYTICS_DIR = join(process.cwd(), 'data');
const ANALYTICS_FILE = join(ANALYTICS_DIR, 'whatsapp-clicks.json');
const ARCHIVE_FILE = join(ANALYTICS_DIR, 'whatsapp-clicks-archive.jsonl');
// Hot file cap. Raised from 1000 on 2026-09-07: at the old cap the file held
// only ~3 months and every new click silently destroyed the oldest one.
// Anything trimmed past this now goes to ARCHIVE_FILE instead of being lost.
const MAX_STORED_CLICKS = 10000;

/**
 * Read stored clicks, tolerating both the current bare-array format and the
 * legacy `{ totalClicks, clicks, lastUpdated }` object-wrapper format (in
 * case an older deployment already wrote that shape to disk somewhere).
 * Never throws — returns [] on any parse/shape issue.
 */
async function readStoredClicks(): Promise<ClickEvent[]> {
  if (!existsSync(ANALYTICS_FILE)) {
    return [];
  }
  try {
    const fileContent = await readFile(ANALYTICS_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent);

    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.clicks)) {
      // Legacy object-wrapper shape — read-through, migrated on next write.
      return parsed.clicks;
    }
    return [];
  } catch (error) {
    console.error('Error reading whatsapp-clicks.json (ignoring, treating as empty):', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parsing the request body can legitimately fail on a malformed
    // request — that's a real 500-worthy error, distinct from the fs
    // persistence step below.
    const clickData: ClickEvent = await request.json();

    // Everything below is best-effort local persistence only. GA4 (fired
    // client-side, separately from this call) is the durable channel, so a
    // failure here must never surface as a failed click to the user.
    try {
      if (!existsSync(ANALYTICS_DIR)) {
        await mkdir(ANALYTICS_DIR, { recursive: true });
      }

      const clicks = await readStoredClicks();
      clicks.push(clickData);

      // Keep only the last MAX_STORED_CLICKS to prevent unbounded file growth.
      const overflow =
        clicks.length > MAX_STORED_CLICKS
          ? clicks.slice(0, clicks.length - MAX_STORED_CLICKS)
          : [];
      const trimmed =
        clicks.length > MAX_STORED_CLICKS ? clicks.slice(-MAX_STORED_CLICKS) : clicks;

      // Append what fell out of the hot file to an append-only JSONL archive
      // so history survives the cap. One line per event means no read+parse of
      // existing content, so the cost stays constant however large it grows.
      // Its own try/catch: losing the archive must never block the hot write.
      if (overflow.length > 0) {
        try {
          await appendFile(
            ARCHIVE_FILE,
            overflow.map(event => JSON.stringify(event)).join('\n') + '\n'
          );
        } catch (archiveError) {
          console.error('WhatsApp click archive append failed (non-fatal):', archiveError);
        }
      }

      await writeFile(ANALYTICS_FILE, JSON.stringify(trimmed, null, 2));

      return NextResponse.json({
        success: true,
        totalClicks: trimmed.length,
        persisted: true,
      });
    } catch (fsError) {
      // Ephemeral/read-only filesystem, permissions, etc. — non-fatal.
      console.error(
        'WhatsApp click file persistence failed (non-fatal — GA4 remains the source of truth):',
        fsError
      );
      return NextResponse.json({ success: true, persisted: false });
    }
  } catch (error) {
    console.error('Error tracking WhatsApp click:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track click' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clicks = await readStoredClicks();
    const lastUpdated = clicks.length > 0 ? clicks[clicks.length - 1].timestamp : null;

    // Return summary data (not full click details for privacy) — response
    // shape is unchanged from before so existing consumers (the analytics
    // dashboard page) keep working without changes.
    return NextResponse.json({
      totalClicks: clicks.length,
      lastUpdated,
      recentClicks: clicks.slice(-10).map(click => ({
        timestamp: click.timestamp,
        page: click.page,
        locale: click.locale,
      })),
    });
  } catch (error) {
    console.error('Error reading analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read analytics' },
      { status: 500 }
    );
  }
}
