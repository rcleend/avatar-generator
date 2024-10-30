"use client";
import React from "react";
import { Clapperboard } from "lucide-react";
import { useCreateAIClone } from "../hooks/useCreateAIClone";
import { StepDialog } from "@/components/step-dialog";
import { STEPS } from "../config/steps";

const ConnectedCreateAIClone: React.FC = () => {
  const {
    currentStep,
    handleVideoRecorded,
    handleConfirm,
    handleRecordAgain,
    videoUrl,
  } = useCreateAIClone();

  const stepProps = {
    record: {
      onVideoRecorded: handleVideoRecorded,
    },
    confirm: {
      videoUrl: videoUrl!,
      onConfirm: handleConfirm,
      onRecordAgain: handleRecordAgain,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <StepDialog
          steps={Object.values(STEPS)}
          currentStep={currentStep}
          stepProps={stepProps[currentStep as keyof typeof stepProps]}
          title="AI Video"
          description="Train Scripe to generate professional videos for your personal branding."
          icon={<Clapperboard className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};

export default ConnectedCreateAIClone;
