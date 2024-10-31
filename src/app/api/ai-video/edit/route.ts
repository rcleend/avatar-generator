import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for request validation
const generateVideoSchema = z.object({
  script: z.string().min(1, "Script is required"),
  replicaId: z.string().min(1, "Replica ID is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { script, replicaId } = generateVideoSchema.parse(body);

    const response = await fetch("https://tavusapi.com/v2/videos", {
      method: "POST",
      headers: {
        "x-api-key": process.env.TAVUS_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script,
        replica_id: replicaId,
        video_name: `Generated Video ${Date.now()}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate video");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
