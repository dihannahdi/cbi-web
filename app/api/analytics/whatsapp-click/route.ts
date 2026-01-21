import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface ClickEvent {
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  locale: string;
}

interface AnalyticsData {
  totalClicks: number;
  clicks: ClickEvent[];
  lastUpdated: string;
}

const ANALYTICS_DIR = join(process.cwd(), 'data');
const ANALYTICS_FILE = join(ANALYTICS_DIR, 'whatsapp-clicks.json');

export async function POST(request: NextRequest) {
  try {
    // Parse click data
    const clickData: ClickEvent = await request.json();

    // Ensure data directory exists
    if (!existsSync(ANALYTICS_DIR)) {
      await mkdir(ANALYTICS_DIR, { recursive: true });
    }

    // Read existing data
    let analyticsData: AnalyticsData = {
      totalClicks: 0,
      clicks: [],
      lastUpdated: new Date().toISOString(),
    };

    if (existsSync(ANALYTICS_FILE)) {
      const fileContent = await readFile(ANALYTICS_FILE, 'utf-8');
      analyticsData = JSON.parse(fileContent);
    }

    // Add new click
    analyticsData.clicks.push(clickData);
    analyticsData.totalClicks += 1;
    analyticsData.lastUpdated = new Date().toISOString();

    // Keep only last 1000 clicks to prevent file from growing too large
    if (analyticsData.clicks.length > 1000) {
      analyticsData.clicks = analyticsData.clicks.slice(-1000);
    }

    // Save updated data
    await writeFile(ANALYTICS_FILE, JSON.stringify(analyticsData, null, 2));

    return NextResponse.json({ 
      success: true, 
      totalClicks: analyticsData.totalClicks 
    });
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
    // Check if analytics file exists
    if (!existsSync(ANALYTICS_FILE)) {
      return NextResponse.json({
        totalClicks: 0,
        clicks: [],
        lastUpdated: null,
      });
    }

    // Read and return analytics data
    const fileContent = await readFile(ANALYTICS_FILE, 'utf-8');
    const analyticsData: AnalyticsData = JSON.parse(fileContent);

    // Return summary data (not full click details for privacy)
    return NextResponse.json({
      totalClicks: analyticsData.totalClicks,
      lastUpdated: analyticsData.lastUpdated,
      recentClicks: analyticsData.clicks.slice(-10).map(click => ({
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
