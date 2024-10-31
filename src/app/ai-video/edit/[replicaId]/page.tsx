import ConnectedEditAIClone from "@/features/edit-ai-clone/connected/ConnectedEditAIClone";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function fetchReplicaDetails(replicaId: string) {
  const response = await fetch(
    `https://tavusapi.com/v2/replicas/${replicaId}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.TAVUS_API_KEY || "",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function EditAIClonePage(props: {
  params: Promise<{ replicaId: string }>;
}) {
  const { replicaId } = await props.params;
  const replicaDetails = await fetchReplicaDetails(replicaId);

  if (!replicaDetails) {
    notFound();
  }

  return <ConnectedEditAIClone initialReplicaDetails={replicaDetails} />;
}
