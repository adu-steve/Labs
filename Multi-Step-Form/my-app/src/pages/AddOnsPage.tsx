import React from "react";
import { useNavigate } from "react-router-dom";

const AddOnsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAddOns, setSelectedAddOns] = React.useState<string[]>([]);

  const handleToggle = (addon: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addon)
        ? prev.filter((item) => item !== addon)
        : [...prev, addon]
    );
  };

  return (
    <div className="addons-page">
      <h1>Select Add-Ons</h1>
      <div className="addon-cards">
        {["Addon1", "Addon2", "Addon3"].map((addon) => (
          <div
            key={addon}
            className={`addon-card ${
              selectedAddOns.includes(addon) ? "selected" : ""
            }`}
            onClick={() => handleToggle(addon)}
          >
            <h3>{addon}</h3>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/summary")} className="button-primary">
        Next
      </button>
    </div>
  );
};

export default AddOnsPage;
