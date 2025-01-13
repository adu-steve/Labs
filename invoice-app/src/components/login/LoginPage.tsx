// src/components/login/LoginPage.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { login, selectAuth } from "../../features/auth/auth.slice";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector(selectAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading === "loading"}>
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
