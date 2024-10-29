export interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

export interface StepRendererProps<T extends Record<string, any>> {
  steps: Step[];
  currentStep: string;
  stepProps: T;
}
