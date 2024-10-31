"use client";

import React from "react";
import { Clapperboard } from "lucide-react";
import { StepDialog } from "@/components/step-dialog";
import { Replica } from "@/types/replica";
import { STEPS } from "../config/steps";
import { useEditAIClone } from "../hooks/useEditAIClone";

interface ConnectedEditAICloneProps {
  initialReplicaDetails: Replica;
}

const ConnectedEditAIClone: React.FC<ConnectedEditAICloneProps> = ({
  initialReplicaDetails,
}) => {
  const { currentStep, stepProps } = useEditAIClone(initialReplicaDetails);

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
