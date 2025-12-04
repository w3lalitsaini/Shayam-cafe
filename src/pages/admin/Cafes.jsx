import React, { useState } from "react";

const demoCafes = [
  {
    id: "C-2001",
    name: "Brew Haven Café",
    owner: "Cafe Owner",
    ownerEmail: "owner@brewhaven.cafe",
    city: "Jaipur",
    status: "Active",
    ordersToday: 42,
  },
  {
    id: "C-2002",
    name: "Midnight Mug",
    owner: "Riya Kapoor",
    ownerEmail: "riya@midnightmug.com",
    city: "Delhi",
    status: "Pending Approval",
    ordersToday: 0,
  },
  {
    id: "C-2003",
    name: "Bean & Byte",
    owner: "Sarthak Jain",
    ownerEmail: "sarthak@beanbyte.in",
    city: "Bengaluru",
    status: "Suspended",
    ordersToday: 5,
  },
];

const statusFilters = ["All", "Active", "Pending Approval", "Suspended"];

const Cafes = () => {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? demoCafes : demoCafes.filter((c) => c.status === filter);

  const badgeColor = (status) => {
    if (status === "Active") return "bg-emerald-400/15 text-emerald-300";
    if (status === "Pending Approval") return "bg-amber-400/15 text-amber-300";
    if (status === "Suspended") return "bg-rose-400/15 text-rose-300";
    return "bg-slate-800 text-slate-200";
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Admin · Cafés
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Manage cafés
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Approve, monitor, and control all cafés registered on the platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1.5 transition ${
                filter === s
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      {/* Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            No cafés found for this filter (demo data).
          </p>
        ) : (
          filtered.map((cafe) => (
            <div
              key={cafe.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs"
            >
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  {cafe.name}
                </p>
                <p className="text-[11px] text-slate-500">{cafe.id}</p>

                <p className="mt-2 text-[11px] text-slate-300">
                  Owner: <span className="text-slate-100">{cafe.owner}</span>
                </p>
                <p className="text-[11px] text-slate-400">{cafe.ownerEmail}</p>

                <p className="mt-2 text-[11px] text-slate-300">
                  City: <span className="text-slate-100">{cafe.city}</span>
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${badgeColor(
                      cafe.status
                    )}`}
                  >
                    {cafe.status}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Today&apos;s orders:{" "}
                    <span className="font-semibold text-amber-300">
                      {cafe.ordersToday}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition">
                  View details
                </button>
                <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-emerald-400 hover:text-emerald-300 transition">
                  Impersonate
                </button>
                <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-rose-400 hover:text-rose-300 transition">
                  Suspend
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <p className="mt-4 text-[11px] text-slate-500">
        Later, connect this to APIs like <code>GET /api/admin/cafes</code> and{" "}
        <code>PATCH /api/admin/cafes/:id/status</code> for real moderation.
      </p>
    </div>
  );
};

export default Cafes;
