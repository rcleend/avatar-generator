import React from "react";
import type { Step } from "./types";

interface StepRendererProps {
  step: Step;
  stepProps: Record<string, any>;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  stepProps,
}) => {
  const StepComponent = step.component;
  return <StepComponent {...stepProps} />;
};
