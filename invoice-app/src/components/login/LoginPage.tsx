// src/components/login/LoginPage.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { login, selectAuth } from "../../features/auth/auth.slice";
import { Navigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username: email, password }));
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Login</h1>
        <div className="input-group">
          <label className="input-label">Email:</label>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password:</label>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={loading === "loading"}
        >
          {loading === "loading" ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
