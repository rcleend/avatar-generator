import { headers } from "next/headers";
import ConnectedAICloneOverview from "@/features/ai-clone-overview/connected/ConnectedAICloneOverview";

async function fetchClones() {
  const response = await fetch("https://tavusapi.com/v2/replicas", {
    method: "GET",
    headers: {
      "x-api-key": process.env.TAVUS_API_KEY || "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch clones");
  }

  return response.json();
}

export default async function AIVideoPage() {
  const clones = await fetchClones();
  return <ConnectedAICloneOverview initialClones={clones.data} />;
}
