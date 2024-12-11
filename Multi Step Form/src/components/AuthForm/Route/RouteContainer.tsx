import Route from "./Routes";
import "./route.css";

const StepArr = [
  { step: 1, description: "Your Info" },
  { step: 2, description: "Select Plan" },
  { step: 3, description: "Add-ons" },
  { step: 4, description: "Summary" },
];

function StepContainer({
  currentStep,
  navigateTo,
  complete,
}: {
  complete: boolean;
  currentStep: number;
  navigateTo: (value: number) => void;
}) {
  return (
    <div className="step-container">
      {StepArr.map((step, index) => (
        <Route
          key={index}
          step={step.step}
          description={step.description}
          currentStep={currentStep}
          navigateTo={navigateTo}
          disabled={complete}
        />
      ))}
    </div>
  );
}

export default StepContainer;
