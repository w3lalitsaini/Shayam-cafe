import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const AccountLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        navigate("/auth/signin");
      }
    } catch (err) {
      console.error("Error reading user from localStorage", err);
      navigate("/auth/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("bh_user");
    navigate("/auth/signin");
  };

  const navItems = [
    { label: "Profile", to: "/account" },
    { label: "My Orders", to: "/account/orders" },
    { label: "My Reservations", to: "/account/reservations" },
  ];

  const base =
    "flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition";
  const active = "bg-amber-400/10 text-amber-300 border border-amber-400/50";
  const inactive =
    "text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900";

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        {/* Left column: sidebar + user summary */}
        <aside className="w-full md:w-60 md:flex-shrink-0">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  {user.name || "User"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {user.email || user.phone || "No contact set"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-full border border-slate-700 px-3 py-1.5 text-[11px] text-slate-300 hover:border-rose-400 hover:text-rose-300 transition"
            >
              Logout
            </button>
          </div>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/account"}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/"
            className="mt-4 inline-flex text-[11px] text-slate-400 hover:text-amber-300"
          >
            ← Back to website
          </Link>
        </aside>

        {/* Right column: content */}
        <main className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
