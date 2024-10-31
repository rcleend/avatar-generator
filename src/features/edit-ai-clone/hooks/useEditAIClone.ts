"use client";

import { Replica } from "@/types/replica";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface GenerateVideoResponse {
  video_id: string;
  hosted_url: string;
}

interface GenerateVideoVariables {
  script: string;
  replicaId: string;
}

export const useEditAIClone = (initialReplicaDetails: Replica) => {
  const [currentStep, setCurrentStep] = useState("edit");

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
      setCurrentStep("download");
    },
  });

  const handleGenerateVideo = async (script: string) => {
    generateVideoMutation.mutate({
      script,
      replicaId: initialReplicaDetails.replica_id,
    });
  };

  const stepProps = {
    edit: {
      replicaDetails: initialReplicaDetails,
      onGenerateVideo: handleGenerateVideo,
      isGenerating: generateVideoMutation.isPending,
    },
    download: {
      videoId: generateVideoMutation.data?.video_id,
    },
  };

  return {
    currentStep,
    stepProps,
    handleGenerateVideo,
    isGenerating: generateVideoMutation.isPending,
    generatedVideo: generateVideoMutation.data,
    error: generateVideoMutation.error,
  };
};
