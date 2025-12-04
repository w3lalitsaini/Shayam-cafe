import React, { useState } from "react";

const demoUsers = [
  {
    id: "U-1001",
    name: "Cafe Owner",
    email: "owner@brewhaven.cafe",
    role: "Owner",
    status: "Active",
    createdAt: "2025-01-10",
  },
  {
    id: "U-1002",
    name: "Demo Admin",
    email: "admin@brewhaven.cafe",
    role: "Admin",
    status: "Active",
    createdAt: "2025-01-01",
  },
  {
    id: "U-1003",
    name: "Rohan Sharma",
    email: "rohan@example.com",
    role: "User",
    status: "Active",
    createdAt: "2024-12-20",
  },
  {
    id: "U-1004",
    name: "Neha Gupta",
    email: "neha@example.com",
    role: "User",
    status: "Suspended",
    createdAt: "2024-12-18",
  },
];

const roleFilters = ["All", "User", "Owner", "Admin"];
const statusFilters = ["All", "Active", "Suspended"];

const Users = () => {
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = demoUsers.filter((u) => {
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    const query = search.toLowerCase();
    const matchSearch =
      !query ||
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.id.toLowerCase().includes(query);

    return matchRole && matchStatus && matchSearch;
  });

  const statusBadge = (status) => {
    if (status === "Active") return "bg-emerald-400/15 text-emerald-300";
    if (status === "Suspended") return "bg-rose-400/15 text-rose-300";
    return "bg-slate-800 text-slate-200";
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Admin · Users
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Manage users
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            View and control all users across the platform. Demo data only for
            now.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs outline-none focus:border-amber-400"
          >
            {roleFilters.map((r) => (
              <option key={r} value={r}>
                Role: {r}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs outline-none focus:border-amber-400"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email or user ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
        />
      </div>

      {/* Table / list */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="hidden grid-cols-[0.9fr_1.3fr_0.7fr_0.7fr_0.7fr] gap-3 border-b border-slate-800 pb-2 text-[11px] text-slate-400 md:grid">
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Joined</span>
        </div>

        <div className="mt-2 space-y-3 text-xs">
          {filtered.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No users found for this filter (demo data).
            </p>
          ) : (
            filtered.map((u) => (
              <div
                key={u.id}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 md:grid-cols-[0.9fr_1.3fr_0.7fr_0.7fr_0.7fr]"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-100">
                    {u.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{u.id}</p>
                </div>
                <p className="text-[11px] text-slate-300">{u.email}</p>
                <p className="text-[11px] text-slate-400">{u.role}</p>
                <div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${statusBadge(
                      u.status
                    )}`}
                  >
                    {u.status}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-400">{u.createdAt}</p>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition">
                      View
                    </button>
                    <button className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-rose-400 hover:text-rose-300 transition">
                      Ban
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <p className="mt-4 text-[11px] text-slate-500">
        Later, this page can be backed by an API like{" "}
        <code>GET /api/admin/users</code> with pagination, search, and
        role-based actions.
      </p>
    </div>
  );
};

export default Users;
