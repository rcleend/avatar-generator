export type StepConfig = {
  id: string;
  title: string;
  description: string;
  component: React.FC<any>;
  props?: Record<string, any>;
};

export type StepId = "record" | "confirm" | "complete";
