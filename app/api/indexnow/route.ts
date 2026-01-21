/**
 * IndexNow API Route
 * 
 * Enables instant indexing notification to Bing, Yandex, and other search engines
 * that support the IndexNow protocol for faster content discovery
 * 
 * @see https://www.indexnow.org/
 */

import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'ccb7653f357e4936b9a5d5183ae215af';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';

interface IndexNowRequest {
  urls: string[];
}

/**
 * Submit URLs to IndexNow API
 * Supports Bing, Yandex, Seznam, Naver
 */
async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const payload = {
    host: new URL(BASE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`${endpoint} returned ${response.status}`);
      }

      return { endpoint, status: response.status };
    })
  );

  const successful = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  return {
    success: successful > 0,
    message: `Submitted to ${successful}/${endpoints.length} endpoints. ${failed > 0 ? `${failed} failed.` : ''}`,
  };
}

/**
 * POST /api/indexnow
 * Submit URLs for instant indexing
 */
export async function POST(request: NextRequest) {
  try {
    const body: IndexNowRequest = await request.json();

    if (!body.urls || !Array.isArray(body.urls) || body.urls.length === 0) {
      return NextResponse.json(
        { error: 'urls array is required' },
        { status: 400 }
      );
    }

    // Validate and normalize URLs
    const validUrls = body.urls
      .filter((url) => url && typeof url === 'string')
      .map((url) => {
        if (url.startsWith('/')) {
          return `${BASE_URL}${url}`;
        }
        return url;
      })
      .filter((url) => url.startsWith(BASE_URL));

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs provided' },
        { status: 400 }
      );
    }

    // Limit to 10,000 URLs per request (IndexNow limit)
    const urlsToSubmit = validUrls.slice(0, 10000);

    const result = await submitToIndexNow(urlsToSubmit);

    return NextResponse.json({
      success: result.success,
      message: result.message,
      urlsSubmitted: urlsToSubmit.length,
    });
  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Get IndexNow key for verification
 */
export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    host: new URL(BASE_URL).host,
    instructions: 'POST to this endpoint with { "urls": ["/path1", "/path2"] } to submit URLs to IndexNow',
  });
}
