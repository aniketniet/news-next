import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_token } = body;

    if (!id_token) {
      return NextResponse.json({ error: "id_token is required" }, { status: 400 });
    }

    // Forward the token to the backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
        return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });
    }

    const response = await fetch(`${backendUrl}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ id_token })
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/auth/google:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
