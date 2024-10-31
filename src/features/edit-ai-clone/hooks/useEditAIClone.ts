"use client";

import { useMutation } from "@tanstack/react-query";

interface GenerateVideoResponse {
  video_id: string;
  hosted_url: string;
}

interface GenerateVideoVariables {
  script: string;
  replicaId: string;
}

export const useEditAIClone = (replicaId: string, onSuccess?: () => void) => {
  const generateVideoMutation = useMutation<
    GenerateVideoResponse,
    Error,
    GenerateVideoVariables
  >({
    mutationFn: async ({ script, replicaId }) => {
      const response = await fetch("/api/ai-video/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script, replicaId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate video");
      }

      return response.json();
    },
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleGenerateVideo = async (script: string) => {
    generateVideoMutation.mutate({ script, replicaId });
  };

  return {
    handleGenerateVideo,
    isGenerating: generateVideoMutation.isPending,
    generatedVideo: generateVideoMutation.data,
    error: generateVideoMutation.error,
  };
};
