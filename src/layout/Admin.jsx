import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Users", to: "/admin" },
    { name: "Cafés", to: "/admin/cafes" },
  ];

  const base =
    "flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition";
  const active = "bg-amber-400/10 text-amber-300 border border-amber-400/50";
  const inactive =
    "text-slate-300 border border-transparent hover:border-slate-700 hover:bg-slate-900";

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-60 flex-col border-r border-slate-800 bg-slate-950/95 px-4 py-4 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/10">
            <span className="text-xl">🛡️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Brew Haven Admin
            </span>
            <span className="text-[11px] text-slate-400">Platform Control</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 border-t border-slate-800 pt-3 text-[11px] text-slate-500">
          Logged in as Admin
        </div>
      </aside>

      {/* Mobile header */}
      <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 md:hidden">
        <Link to="/">
          <span className="text-sm font-semibold">🛡️ Admin Panel</span>
        </Link>
        <button
          onClick={() => setOpen((p) => !p)}
          className="rounded-full border border-slate-700 p-2 text-slate-200"
        >
          {open ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed left-0 right-0 top-12 z-20 border-b border-slate-800 bg-slate-950/98 px-4 py-3 md:hidden">
          <nav className="space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-60">
        <div className="pt-14 md:pt-4">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
