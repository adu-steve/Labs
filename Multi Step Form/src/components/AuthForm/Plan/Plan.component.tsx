import Header from "../Header/Header.component";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import { StepTypes } from "../../../types.ts";

const Plan = ({ plan, updateForm, timeFrame }: StepTypes) => {
  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      <Cards
        plan={plan}
        updateForm={({title, price}) =>
          updateForm({ plan: { title, price} })
        }
        timeFrame={timeFrame}
      />
      <TimeFrameToogler
        timeFrame={timeFrame}
        updateForm={(value) => updateForm({ timeFrame: value })}
      />
    </div>
  );
};

export default Plan;
