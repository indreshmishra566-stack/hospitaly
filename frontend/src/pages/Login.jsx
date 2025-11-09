import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:10000";

export default function Login() {
  const [email, setEmail] = useState("doctor@demo.com");
  const [password, setPassword] = useState("Demo@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/api/auth/login`, { email, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h1>Smart Hospital</h1>
        <p className="muted">Please sign in</p>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <div className="error">{error}</div>}
          <button disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}
