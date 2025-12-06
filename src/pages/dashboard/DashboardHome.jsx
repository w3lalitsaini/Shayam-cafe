import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem("bh_token");
        if (!token) {
          setErrorMsg("Not authenticated. Please sign in as admin.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/dashboard/overview`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.message || "Failed to load dashboard data");
        }

        setSummary(data.summary || null);
        setRecentActivity(data.recentActivity || []);
      } catch (err) {
        console.error("Dashboard overview error:", err);
        setErrorMsg(err.message || "Something went wrong loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  // Build stat cards from summary or fallback demo values
  const stats = summary
    ? [
        {
          label: "Today’s Orders",
          value: summary.todaysOrders ?? 0,
          sub: `${summary.pendingOrders ?? 0} pending, ${
            summary.completedOrders ?? 0
          } completed`,
        },
        {
          label: "Today’s Revenue",
          value:
            typeof summary.revenueToday === "number"
              ? `₹${summary.revenueToday}`
              : summary.revenueToday || "₹0",
          sub: "Incl. online & walk-in",
        },
        {
          label: "Active Reservations",
          value: summary.activeReservations ?? 0,
          sub: "For this evening",
        },
        {
          label: "Popular Item",
          value: summary.popularItemName || "—",
          sub: summary.popularItemCount
            ? `${summary.popularItemCount} orders today`
            : "Based on today's orders",
        },
      ]
    : [
        // fallback demo if API fails / empty
        { label: "Today’s Orders", value: 0, sub: "No data" },
        { label: "Today’s Revenue", value: "₹0", sub: "No data" },
        { label: "Active Reservations", value: 0, sub: "No data" },
        { label: "Popular Item", value: "—", sub: "No data" },
      ];

  if (loading) {
    return (
      <div className="text-xs text-slate-400">
        Loading dashboard overview...
      </div>
    );
  }

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
          Quick snapshot of how Brew Haven Café is doing today.
        </p>

        {errorMsg && (
          <div className="mt-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {errorMsg}
          </div>
        )}
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
        {/* Recent activity (from API) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Recent activity
          </h2>
          <p className="mt-1 text-[11px] text-slate-400">
            Latest orders, reservations, and menu changes.
          </p>

          <div className="mt-3 space-y-3 text-[11px]">
            {recentActivity.length > 0 ? (
              recentActivity.map((item) => (
                <ActivityItem
                  key={item.id || item.title + item.timeAgo}
                  title={item.title}
                  time={item.timeAgo || ""}
                  detail={item.detail || ""}
                />
              ))
            ) : (
              <p className="text-[11px] text-slate-500">
                No recent activity yet.
              </p>
            )}
          </div>
        </div>

        {/* Owner notes (still local/demo) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold text-slate-50">
            Owner quick notes
          </h2>
          <p className="mt-1 text-[11px] text-slate-400">
            Jot down things to remember. This is still local-only; later you can
            save it to your backend.
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
