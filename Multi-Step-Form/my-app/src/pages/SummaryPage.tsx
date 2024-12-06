import React from "react";
import { useNavigate } from "react-router-dom";

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const personalInfo = JSON.parse(localStorage.getItem("personalInfo") || "{}");
  const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan") || "{}");
  const selectedAddOns = JSON.parse(
    localStorage.getItem("selectedAddOns") || "[]"
  );

  const handleSubmit = () => {
    localStorage.clear();
    navigate("/success");
  };

  return (
    <div className="summary-page">
      <h1>Summary</h1>
      <p>Name: {personalInfo.name}</p>
      <p>Plan: {selectedPlan}</p>
      <p>Add-Ons: {selectedAddOns.join(", ") || "None"}</p>
      <button onClick={handleSubmit} className="button-primary">
        Submit
      </button>
    </div>
  );
};

export default SummaryPage;
