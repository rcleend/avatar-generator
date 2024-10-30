import "server-only";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("video") as File;
    const name = formData.get("name") as string;

    if (!file) {
      throw new Error("No file uploaded");
    }

    console.log("file", file);

    // Store the video in Vercel Blob to make uploading more robust
    // const blobResponse = await put(name, file, {
    //   access: "public",
    // });

    // const replicaOptions = {
    //   method: "POST",
    //   headers: {
    //     "x-api-key": process.env.TAVUS_API_KEY || "",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     callback_url: "",
    //     replica_name: name,
    //     train_video_url: blobResponse.url,
    //   }),
    // };

    // Commented this out because I don't want to pay 75,- per replica for the Tavus API 💀
    // const response = await fetch(
    //   "https://tavusapi.com/v2/replicas",
    //   replicaOptions
    // );

    // if (!response.ok) {
    //   throw new Error(`Failed to create Tavus replica: ${response.statusText}`);
    // }

    return NextResponse.json({
      success: true,
    });
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
