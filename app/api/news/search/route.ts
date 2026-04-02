import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const backendBase = process.env.NEXT_PUBLIC_API_URL
    if (!backendBase) {
      return NextResponse.json({ success: false, message: "NEXT_PUBLIC_API_URL not set", data: [] }, { status: 500 })
    }

    const body = await req.json()

    const upstream = await fetch(`${backendBase}/news/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const text = await upstream.text()
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Search proxy failed", data: [] },
      { status: 500 }
    )
  }
}

