import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setToken } from "../utils/auth";
import { FaUser, FaLock } from "react-icons/fa";
import '../styles/LoginForm.css';


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
      setTimeout(() => setError(""), 1000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={handleSubmit} className="login-form">
          
          <div className="input-group">
            <label className="login-label">Email</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="login-label">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit">Login</button>
          {error && <p className={`error ${error ? "" : "hide"}`}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
