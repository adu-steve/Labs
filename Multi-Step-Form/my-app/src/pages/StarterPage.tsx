import React from "react";
import { useNavigate } from "react-router-dom";

const StarterPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedData = localStorage.getItem("personalInfo");
    if (savedData) navigate("/personal-info");
  }, [navigate]);

  return (
    <div className="starter-page">
      <h1>Welcome to the Sign-Up Process</h1>
      <button
        onClick={() => navigate("/personal-info")}
        className="button-primary"
      >
        Start Sign-Up
      </button>
    </div>
  );
};

export default StarterPage;
