"use client";

import React from "react";
import { Clapperboard } from "lucide-react";
import { StepDialog } from "@/components/step-dialog";
import { Replica } from "@/types/replica";
import { useEditAIClone } from "../hooks/useEditAIClone";
import { STEPS } from "../config/steps";

interface ConnectedEditAICloneProps {
  initialReplicaDetails: Replica;
}

const ConnectedEditAIClone: React.FC<ConnectedEditAICloneProps> = ({
  initialReplicaDetails,
}) => {
  const [currentStep, setCurrentStep] = React.useState("edit");
  const { handleGenerateVideo, isGenerating, generatedVideo } = useEditAIClone(
    initialReplicaDetails.replica_id,
    () => setCurrentStep("download")
  );

  const stepProps = {
    edit: {
      replicaDetails: initialReplicaDetails,
      onGenerateVideo: handleGenerateVideo,
      isGenerating,
    },
    download: {
      videoId: generatedVideo?.video_id,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-3xl mx-auto">
        <StepDialog
          steps={STEPS}
          currentStep={currentStep}
          stepProps={stepProps[currentStep as keyof typeof stepProps]}
          title="Edit AI Video"
          description="Generate a new video using your AI clone"
          icon={<Clapperboard className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};

export default ConnectedEditAIClone;
