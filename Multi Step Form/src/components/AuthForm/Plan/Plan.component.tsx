import Header from "../Header/Header.component";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";

const Plan = () => {
  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      <Cards />
      <TimeFrameToogler />
    </div>
  );
};

export default Plan;
