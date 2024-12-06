import React from "react";
import { useNavigate } from "react-router-dom";

const PlanSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = React.useState(() => {
    return JSON.parse(localStorage.getItem("selectedPlan") || "{}");
  });

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
  };

  return (
    <div className="plan-selection-page">
      <h1>Select a Plan</h1>
      <div className="plan-cards">
        {["Basic", "Standard", "Premium"].map((plan) => (
          <div
            key={plan}
            className={`plan-card ${selectedPlan === plan ? "selected" : ""}`}
            onClick={() => handleSelect(plan)}
          >
            <h3>{plan}</h3>
            <p>$10/mo</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/add-ons")} className="button-primary">
        Next
      </button>
    </div>
  );
};

export default PlanSelectionPage;
