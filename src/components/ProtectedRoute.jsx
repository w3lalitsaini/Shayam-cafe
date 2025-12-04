import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();

  // Read user from localStorage (demo auth)
  // Later you can replace this with Context or Redux.
  let user = null;
  try {
    const stored = localStorage.getItem("bh_user");
    user = stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
  }

  // 1) Not logged in → send to signin
  if (!user) {
    return (
      <Navigate to="/auth/signin" replace state={{ from: location.pathname }} />
    );
  }

  // 2) Role check (for routes like /dashboard that need Owner)
  if (role && user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center">
          <p className="text-4xl mb-3">🔒</p>
          <h1 className="text-lg font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-slate-400">
            You don&apos;t have permission to view this page.
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Required role: <span className="text-amber-300">{role}</span>
          </p>
        </div>
      </div>
    );
  }

  // 3) All good → render the protected content
  return children;
};

export default ProtectedRoute;
