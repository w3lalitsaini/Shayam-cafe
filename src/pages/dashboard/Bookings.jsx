import React, { useState } from "react";

const demoBookings = [
  {
    id: "RV-3001",
    name: "Aditi",
    guests: 3,
    date: "2025-12-05",
    time: "19:30",
    type: "Dine-in",
    status: "Confirmed",
  },
  {
    id: "RV-3002",
    name: "Rohan",
    guests: 2,
    date: "2025-12-05",
    time: "18:00",
    type: "Work",
    status: "Pending",
  },
  {
    id: "RV-3003",
    name: "Neha",
    guests: 6,
    date: "2025-12-06",
    time: "20:00",
    type: "Group",
    status: "Cancelled",
  },
];

const statusFilters = ["All", "Pending", "Confirmed", "Cancelled"];

const Bookings = () => {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? demoBookings
      : demoBookings.filter((b) => b.status === filter);

  const badgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-400/15 text-amber-300";
      case "Confirmed":
        return "bg-emerald-400/15 text-emerald-300";
      case "Cancelled":
        return "bg-rose-400/15 text-rose-300";
      default:
        return "bg-slate-800 text-slate-200";
    }
  };

  return (
    <div>
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Bookings
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Table reservations
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            View and manage upcoming reservations. Data is static demo.
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

      <section className="space-y-3">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-xs md:grid-cols-[1.1fr_1fr_0.8fr_0.8fr]"
          >
            <div>
              <p className="text-sm font-semibold text-slate-100">
                {b.name} • {b.guests} guest{b.guests > 1 ? "s" : ""}
              </p>
              <p className="text-[11px] text-slate-400">#{b.id}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-300">
                {b.date} at {b.time}
              </p>
              <p className="text-[11px] text-slate-400">{b.type}</p>
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${badgeColor(
                  b.status
                )}`}
              >
                {b.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition">
                View
              </button>
              <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition">
                Note
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Bookings;
