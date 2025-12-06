import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("bh_token");

        // Not logged in
        if (!token) {
          setChecking(false);
          return;
        }

        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Invalid token");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("bh_token");
        localStorage.removeItem("bh_user");
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  // 🔄 Checking auth from backend
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Checking login...
      </div>
    );
  }

  // 🚫 NOT LOGGED IN
  if (!user) {
    return (
      <Navigate to="/auth/signin" replace state={{ from: location.pathname }} />
    );
  }

  // 🚫 ROLE MISMATCH
  if (role && user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <p className="text-4xl mb-3">🚫</p>
          <h1 className="text-lg font-semibold text-slate-100">
            Access denied
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            You don&apos;t have permission to access this page.
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Required role: <span className="text-amber-300">{role}</span>
          </p>
        </div>
      </div>
    );
  }

  // ✅ AUTHORIZED
  return children;
};

export default ProtectedRoute;
