// src/components/unauthorized/UnauthorizedPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>401 - Unauthorized</h1>
      <p>You do not have the right to access this page.</p>
      <button onClick={goToLogin}>Go to Login Page</button>
    </div>
  );
};

export default UnauthorizedPage;
