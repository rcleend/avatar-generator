import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import StepRenderer from "./StepRenderer";
import { StepRendererProps } from "./types";

interface StepDialogProps<T extends Record<string, any>>
  extends StepRendererProps<T> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function StepDialog<T extends Record<string, any>>({
  steps,
  currentStep,
  stepProps,
  title,
  description,
  icon,
}: StepDialogProps<T>) {
  const currentStepConfig = steps.find((step) => step.id === currentStep);

  if (!currentStepConfig) {
    return null;
  }

  return (
    <>
      {(title || description || icon) && (
        <div className="mb-4">
          {(title || icon) && (
            <div className="flex items-center space-x-2 mb-2">
              {icon}
              {title && <h1 className="text-2xl font-semibold">{title}</h1>}
            </div>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center">
              {currentStepConfig.title}
            </CardTitle>
          </div>
          <CardDescription className="mt-1">
            {currentStepConfig.description}
          </CardDescription>
        </CardHeader>
        <StepRenderer step={currentStepConfig} stepProps={stepProps} />
      </Card>
    </>
  );
}
