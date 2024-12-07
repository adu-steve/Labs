import Header from "../Header/Header.component";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import { useEffect, useState } from "react";
import { ServiceType } from "../../../types.ts";

const Plan = () => {
  const [plan, setPlan] = useState<ServiceType>(() => {
    const storedPlan = localStorage.getItem("plan");
    return storedPlan ? JSON.parse(storedPlan) : { title: "arcade", price: 9 };
  });

  const [timeFrame, setTimeFrame] = useState<string>(
    () => localStorage.getItem("timeframe") || "monthly"
  );

  const handlePlan = ({ title, price }: ServiceType) => {
    setPlan({ title, price });
  };

  const handleTimeFrame = () => {
    setTimeFrame(timeFrame === "monthly" ? "yearly" : "monthly");
  };

  useEffect(() => {
    localStorage.setItem("plan", JSON.stringify(plan));
    localStorage.setItem("timeframe", timeFrame);
  }, [plan, timeFrame]);

  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      <Cards plan={plan} handlePlan={handlePlan} timeFrame={timeFrame} />
      <TimeFrameToogler
        timeFrame={timeFrame}
        handleTimeFrame={handleTimeFrame}
      />
    </div>
  );
};

export default Plan;
