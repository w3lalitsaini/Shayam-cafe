import React, { useState } from "react";

const demoOrders = [
  {
    id: "BH-1023",
    customer: "Rohan",
    items: "Caramel Latte x2, Brownie",
    total: 540,
    type: "Takeaway",
    status: "Preparing",
    time: "10:12 AM",
  },
  {
    id: "BH-1022",
    customer: "Aditi",
    items: "Masala Chai, Veg Sandwich",
    total: 310,
    type: "Dine-in",
    status: "Completed",
    time: "09:55 AM",
  },
  {
    id: "BH-1021",
    customer: "Neha",
    items: "Cold Coffee",
    total: 180,
    type: "Takeaway",
    status: "Pending",
    time: "09:40 AM",
  },
];

const statusOptions = ["All", "Pending", "Preparing", "Completed", "Cancelled"];

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = demoOrders.filter(
    (o) => statusFilter === "All" || o.status === statusFilter
  );

  const badgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-slate-800 text-slate-200";
      case "Preparing":
        return "bg-amber-400/15 text-amber-300";
      case "Completed":
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
            Orders
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Live & recent orders
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Track and manage café orders. Data is static demo for now.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1.5 transition ${
                statusFilter === s
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="hidden grid-cols-[1.1fr_1.2fr_0.8fr_0.7fr_0.7fr] gap-3 border-b border-slate-800 pb-2 text-[11px] text-slate-400 md:grid">
          <span>Order</span>
          <span>Items</span>
          <span>Type</span>
          <span>Status</span>
          <span>Total</span>
        </div>

        <div className="mt-2 space-y-3 text-xs">
          {filtered.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No orders found for this filter (demo data).
            </p>
          ) : (
            filtered.map((o) => (
              <div
                key={o.id}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 md:grid-cols-[1.1fr_1.2fr_0.8fr_0.7fr_0.7fr]"
              >
                <div>
                  <p className="font-semibold text-slate-100">{o.id}</p>
                  <p className="text-[11px] text-slate-400">
                    {o.customer} · {o.time}
                  </p>
                </div>
                <p className="text-[11px] text-slate-300">{o.items}</p>
                <p className="text-[11px] text-slate-400">{o.type}</p>
                <div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${badgeColor(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-amber-300">
                  ₹{o.total}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;
