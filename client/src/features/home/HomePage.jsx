import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <section className="card fade-in">
      <h1>Welcome</h1>

      {!isAuthenticated ? (
        <div>
          <p>Please login or register to continue.</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Link to="/login" className="btn primary">
              Sign In
            </Link>
            <Link to="/register" className="btn secondary">
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>
            Hello, <strong>{user?.name}</strong>!
          </p>
          <p>
            Your role: <strong>{user?.role}</strong>
          </p>
          <button
            onClick={logout}
            className="btn secondary"
            style={{ marginTop: "1rem" }}
          >
            Logout
          </button>
        </div>
      )}
    </section>
  );
};
