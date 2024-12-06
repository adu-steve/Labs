import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>Success!</h1>
      <p>Your sign-up is complete.</p>
      <button onClick={() => navigate("/")} className="button-primary">
        Go to Starter Page
      </button>
    </div>
  );
};

export default SuccessPage;
