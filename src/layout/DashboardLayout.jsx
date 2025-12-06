import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("bh_token");
        if (!token) {
          navigate("/auth/signin");
          return;
        }

        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }

        setUser(data.user || null);

        // Optional: enforce only Admin can be here
        if (data.user?.role !== "Admin") {
          setErrorMsg("You are not authorized to access this dashboard.");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1500);
        }
      } catch (err) {
        console.error("Fetch /auth/me error:", err);
        setErrorMsg(err.message || "Session expired. Please sign in again.");
        localStorage.removeItem("bh_token");
        localStorage.removeItem("bh_user");
        setTimeout(() => {
          navigate("/auth/signin", { replace: true });
        }, 1200);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchMe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("bh_user");
    localStorage.removeItem("bh_token");
    navigate("/auth/signin");
  };

  const navItems = [
    { label: "Overview", to: "/dashboard" },
    { label: "Users", to: "/dashboard/users" },
    { label: "Orders", to: "/dashboard/orders" },
    { label: "Menu Items", to: "/dashboard/menu" },
    { label: "Bookings", to: "/dashboard/bookings" },
    { label: "Settings", to: "/dashboard/settings" },
  ];

  const base =
    "flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium";
  const active = "bg-amber-400/10 text-amber-300 border border-amber-400/50";
  const inactive =
    "text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900";

  // While loading user data, show a simple loader
  if (loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs">
          Loading dashboard...
        </div>
      </div>
    );
  }

  // If not admin or error, show message (redirects handled in useEffect)
  if (errorMsg && (!user || user.role !== "Admin")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center text-xs">
          <p className="text-rose-300 mb-2 font-semibold">Access denied</p>
          <p className="text-slate-400">{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden w-60 flex-col border-r border-slate-800 bg-slate-950/95 px-4 py-4 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/10">
            <span className="text-xl">🛡️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Admin Dashboard
            </span>
            <span className="text-[11px] text-slate-400">Brew Haven Café</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 border-t border-slate-800 pt-3 text-[11px] text-slate-500">
          {user && (
            <>
              <p>{user.name || "Admin User"}</p>
              <p className="text-slate-600">
                {user.email || user.phone || "—"}
              </p>
            </>
          )}
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-full border border-slate-700 px-3 py-1.5 text-[11px] text-slate-300 hover:border-rose-400 hover:text-rose-300 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡️</span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Admin Dashboard</span>
            <span className="text-[10px] text-slate-500">
              {user?.role || "Admin"}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full border border-slate-700 p-2 text-slate-200"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed left-0 right-0 top-12 z-20 border-b border-slate-800 bg-slate-950/98 px-4 py-3 md:hidden">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="mt-3 w-full rounded-full border border-slate-700 px-3 py-1.5 text-[11px] text-slate-300 hover:border-rose-400 hover:text-rose-300 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-60">
        <div className="pt-14 md:pt-4">
          <div className="mx-auto max-w-6xl px-4 pb-6 pt-2">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
