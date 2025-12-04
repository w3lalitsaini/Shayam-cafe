import React from "react";

const DashboardHome = () => {
  const stats = [
    { label: "Today’s Orders", value: 18, sub: "6 pending, 12 completed" },
    {
      label: "Today’s Revenue",
      value: "₹4,250",
      sub: "Incl. online & walk-in",
    },
    { label: "Active Reservations", value: 4, sub: "For this evening" },
    { label: "Popular Item", value: "Caramel Latte", sub: "12 orders today" },
  ];

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
          Overview
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          Welcome back, Owner.
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Quick snapshot of how Brew Haven Café is doing today. All data is demo
          for now.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
          >
            <p className="text-[11px] text-slate-400">{s.label}</p>
            <p className="mt-2 text-lg font-semibold text-amber-300">
              {s.value}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{s.sub}</p>
          </div>
        ))}
      </section>

      {/* Activity + notes */}
      <section className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Recent activity (demo)
          </h2>
          <p className="mt-1 text-[11px] text-slate-400">
            Latest orders, reservations, and menu changes.
          </p>

          <div className="mt-3 space-y-3 text-[11px]">
            <ActivityItem
              title="Order #BH-1023 completed"
              time="2 mins ago"
              detail="2x Caramel Latte, 1x Chocolate Brownie"
            />
            <ActivityItem
              title="New reservation from Aditi"
              time="20 mins ago"
              detail="Table for 3 at 7:30 PM"
            />
            <ActivityItem
              title="Menu updated"
              time="1 hr ago"
              detail="Mocha Frappe marked as available"
            />
            <ActivityItem
              title="Order #BH-1018 cancelled"
              time="2 hrs ago"
              detail="Customer cancelled before preparation"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Owner quick notes
          </h2>
          <p className="mt-1 text-[11px] text-slate-400">
            Jot down things to remember. This is stored only in memory for now.
          </p>

          <textarea
            rows={6}
            placeholder="E.g. Train new staff on cold brew, update dessert photos, test online ordering..."
            className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-400"
          />

          <button
            type="button"
            className="mt-3 w-full rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition"
          >
            Save notes (Demo only)
          </button>

          <p className="mt-2 text-[10px] text-slate-600">
            In a real app, this would be saved to your backend per owner
            account.
          </p>
        </div>
      </section>
    </div>
  );
};

const ActivityItem = ({ title, time, detail }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-semibold text-slate-100">{title}</p>
      <span className="text-[10px] text-slate-500">{time}</span>
    </div>
    <p className="mt-1 text-[11px] text-slate-400">{detail}</p>
  </div>
);

export default DashboardHome;
