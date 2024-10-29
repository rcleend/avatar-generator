import "server-only";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const schema = z.object({
  //   name: z.string(),
  //   videoBlob: z.instanceof(Blob),
});

export const AI_VIDEO_API_URL = "/api/ai-video";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // const { name, videoBlob } = schema.parse(await request.json());
    const name = "test";

    // Read the video file from the public directory
    const publicDir = path.join(process.cwd(), "public");
    const videoBuffer = await fs.readFile(path.join(publicDir, "demo.mp4"));
    const videoBlob = new Blob([videoBuffer], { type: "video/mp4" });

    // TODO: what happens if the same video is uploaded twice?
    // TODO: When do we delete the video from vercel blob?
    const blobResponse = await put(name, videoBlob, {
      access: "public",
    });

    // Optional: Abstract Tavus call to a createTavusReplica() helper function
    const replicaOptions = {
      method: "POST",
      headers: {
        "x-api-key": process.env.TAVUS_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callback_url: "",
        replica_name: name,
        train_video_url: blobResponse.url,
      }),
    };

    const response = await fetch(
      "https://tavusapi.com/v2/replicas",
      replicaOptions
    );

    if (!response.ok) {
      throw new Error(`Failed to create Tavus replica: ${response.statusText}`);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues },
        { status: 400 }
      );
    }

    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
