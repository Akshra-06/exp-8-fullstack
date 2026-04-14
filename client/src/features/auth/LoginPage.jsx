import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const redirectPath = location.state?.from?.pathname || "/";

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginUser = await login(form);

      // Validate role matches the tab user is on
      if (activeTab === "admin" && loginUser.role !== "admin") {
        logout();
        setError(
          "This account is not an admin account. Please use the User Login tab.",
        );
        return;
      }

      if (activeTab === "user" && loginUser.role === "admin") {
        logout();
        setError("Admin account detected. Please use the Admin Login tab.");
        return;
      }

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = {
    user: { email: "user@example.com", password: "password123" },
    admin: { email: "admin@example.com", password: "admin123" },
  };

  const fillDemoCredentials = () => {
    setForm(demoCredentials[activeTab]);
    setError("");
  };

  return (
    <section className="auth-wrap card fade-in">
      <div className="auth-head">
        <p className="kicker">Welcome Back</p>
        <h2>Sign in to continue</h2>
      </div>

      {/* Tabs */}
      <div className="login-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === "user" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("user");
            setForm({ email: "", password: "" });
            setError("");
          }}
        >
          👤 User Login
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("admin");
            setForm({ email: "", password: "" });
            setError("");
          }}
        >
          🔑 Admin Login
        </button>
      </div>

      {/* Tab Content */}
      <form className="stack" onSubmit={onSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={onChange}
            value={form.email}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={onChange}
            value={form.password}
            required
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Demo Credentials Button */}
        <button
          type="button"
          className="btn secondary"
          onClick={fillDemoCredentials}
          style={{ marginTop: "0.5rem" }}
        >
          {activeTab === "admin"
            ? "📋 Use Demo Admin Account"
            : "📋 Use Demo User Account"}
        </button>
      </form>

      <p className="auth-footnote">
        Need an account? <Link to="/register">Register</Link>
      </p>

      {/* Demo Info */}
      <div className="demo-info">
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            marginTop: "1rem",
          }}
        >
          💡 <strong>Demo Accounts:</strong>
          <br />
          👤 User: user@example.com / password123
          <br />
          🔑 Admin: admin@example.com / admin123
        </p>
      </div>
    </section>
  );
};
