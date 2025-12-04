import React, { useEffect, useState } from "react";

const demoOrders = [
  {
    id: "UO-001",
    userId: "u1",
    items: "Caramel Latte x2, Brownie",
    total: 540,
    status: "Completed",
    date: "2025-12-01",
    time: "10:12 AM",
  },
  {
    id: "UO-002",
    userId: "u1",
    items: "Cold Brew",
    total: 180,
    status: "Preparing",
    date: "2025-12-03",
    time: "09:45 AM",
  },
];

const AccountOrders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);

        // Filter demo orders by userId, email, etc.
        const userOrders = demoOrders.filter((o) => o.userId === u.id);
        setOrders(userOrders);
      }
    } catch (err) {
      console.error("Error reading user / orders", err);
    }
  }, []);

  const badgeColor = (status) => {
    if (status === "Completed") return "bg-emerald-400/15 text-emerald-300";
    if (status === "Preparing") return "bg-amber-400/15 text-amber-300";
    return "bg-slate-800 text-slate-200";
  };

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
        My Orders
      </h1>
      <p className="mt-1 text-[11px] text-slate-400">
        Orders you&apos;ve placed with Brew Haven Café (demo data).
      </p>

      <div className="mt-4 space-y-3 text-xs">
        {orders.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            You don&apos;t have any orders yet.
          </p>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{o.id}</p>
                  <p className="text-[11px] text-slate-400">
                    {o.date} · {o.time}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${badgeColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-300">{o.items}</p>
              <p className="mt-1 text-[11px] font-semibold text-amber-300">
                ₹{o.total}
              </p>
            </div>
          ))
        )}
      </div>

      <p className="mt-3 text-[10px] text-slate-600">
        Later, connect this to an API like <code>GET /api/my/orders</code> using
        the logged-in user&apos;s token.
      </p>
    </div>
  );
};

export default AccountOrders;
