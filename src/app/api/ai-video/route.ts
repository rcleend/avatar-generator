import "server-only";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  videoBlob: z.instanceof(Blob),
});

export async function PUT(request: Request) {
  try {
    const { videoBlob } = schema.parse(await request.json());
    
    return Response.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return Response.json({ success: false, error: error.issues }, { status: 400 });
    }
    return Response.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
