import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("URL parameter is required", { status: 400 });
  }

  try {
    const response = await fetch(url);
    const svgContent = await response.text();

    return new NextResponse(svgContent, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new NextResponse(`Failed to fetch SVG ${error}`, { status: 500 });
  }
}
