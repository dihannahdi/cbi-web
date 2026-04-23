import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";

function getAuthToken(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

// GET: Fetch all applications with job vacancy data
export async function GET(request: NextRequest) {
  const token = getAuthToken(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const jobId = searchParams.get("jobId");
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "50";
    const sort = searchParams.get("sort") || "createdAt:desc";

    let url = `${STRAPI_URL}/api/job-applications?populate=*&sort=${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    if (status && status !== "all") {
      url += `&filters[status][$eq]=${status}`;
    }
    if (jobId) {
      url += `&filters[jobVacancy][documentId][$eq]=${jobId}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[HR Applications] Strapi error:", response.status, errText);
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ error: "Failed to fetch", detail: errText }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[HR Applications] GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT: Update application status or notes
export async function PUT(request: NextRequest) {
  const token = getAuthToken(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { documentId, status, hrNotes } = body;

    if (!documentId) {
      return NextResponse.json({ error: "documentId required" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (hrNotes !== undefined) updateData.hrNotes = hrNotes;

    const response = await fetch(
      `${STRAPI_URL}/api/job-applications/${documentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updateData }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("[HR Applications] PUT error:", err);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[HR Applications] PUT error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
