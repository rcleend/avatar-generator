import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://tavusapi.com/v2/videos/${videoId}`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.TAVUS_API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch video status");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching video status:", error);
    return NextResponse.json(
      { error: "Failed to fetch video status" },
      { status: 500 }
    );
  }
}
