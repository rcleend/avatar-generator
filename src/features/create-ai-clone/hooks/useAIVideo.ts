import { useState, useEffect } from "react";
import { StepId } from "../types/steps";
import { useMutation } from "@tanstack/react-query";

interface UploadResponse {
  success: boolean;
  blobURL?: string;
  replicaData?: any;
  error?: any;
}

export const useAIVideo = () => {
  const [currentStep, setCurrentStep] = useState<StepId>("record");
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Cleanup object URL when component unmounts or when blob changes
  useEffect(() => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoBlob]);

  const uploadMutation = useMutation<UploadResponse, Error, Blob>({
    mutationFn: async (blob: Blob) => {
      const formData = {
        name: `consent-video-${Date.now()}.webm`,
        videoBlob: blob,
      };

      const response = await fetch("/api/ai-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to upload video");
      }

      return response.json();
    },
    onSuccess: () => {
      setCurrentStep("complete");
    },
    onError: (error) => {
      console.error("Failed to upload video:", error);
    },
  });

  const handleVideoRecorded = (blob: Blob) => {
    setVideoBlob(blob);
    setCurrentStep("confirm");
  };

  const handleConfirm = async () => {
    if (!videoBlob) return;
    uploadMutation.mutate(videoBlob);
  };

  const handleRecordAgain = () => {
    setCurrentStep("record");
    setVideoBlob(null);
    setVideoUrl(null);
  };

  return {
    currentStep,
    videoUrl,
    handleVideoRecorded,
    handleConfirm,
    handleRecordAgain,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  };
};
