import { StepConfig } from "../types/steps";

interface StepRendererProps {
  step: StepConfig;
  stepProps?: Record<string, any>;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  stepProps = {},
}) => {
  const Component = step.component;
  return <Component {...step.props} {...stepProps} />;
};

export default StepRenderer;
