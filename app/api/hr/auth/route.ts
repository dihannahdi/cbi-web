import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: err?.error?.message || "Invalid credentials" },
        { status: 401 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      jwt: data.jwt,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
      },
    });
  } catch (error) {
    console.error("[HR Auth] Error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
