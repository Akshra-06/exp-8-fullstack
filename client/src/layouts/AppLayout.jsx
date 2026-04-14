import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export const AppLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          My App
        </Link>
        <div className="topbar-right">
          {isAuthenticated && user ? (
            <>
              <span className="user-info">
                {user.email} ({user.role})
              </span>
              <button type="button" className="btn ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn ghost">
                Sign In
              </Link>
              <Link to="/register" className="btn ghost">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};
