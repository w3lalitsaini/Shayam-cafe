import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // map status → badge tailwind classes
  const badgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-400/15 text-emerald-300";
      case "Ready":
        return "bg-emerald-400/15 text-emerald-300";
      case "Preparing":
        return "bg-amber-400/15 text-amber-300";
      case "Pending":
        return "bg-slate-700 text-slate-100";
      case "Cancelled":
        return "bg-rose-400/15 text-rose-300";
      default:
        return "bg-slate-800 text-slate-200";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const token = localStorage.getItem("bh_token");
        if (!token) {
          setErrorMsg("You must be signed in to view your orders.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/account/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => []);

        if (!res.ok) {
          throw new Error(data.message || "Failed to load your orders.");
        }

        // data is array of Order docs from backend
        // Shape: { _id, items[], totalAmount, status, paymentStatus, createdAt, ... }
        setOrders(
          (Array.isArray(data) ? data : []).map((o) => ({
            id: o._id,
            items: o.items || [],
            totalAmount: o.totalAmount || 0,
            status: o.status || "Pending",
            paymentStatus: o.paymentStatus || "Pending",
            createdAt: o.createdAt,
            notes: o.notes,
            source: o.source || "Online",
          }))
        );
      } catch (err) {
        console.error("Account orders error:", err);
        setErrorMsg(err.message || "Something went wrong loading your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDateTime = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} · ${time}`;
  };

  const buildItemsSummary = (items) => {
    if (!items || items.length === 0) return "No items";
    return items
      .map((it) => {
        const title = it.title || "Item";
        const qty = it.quantity || 1;
        return `${title} x${qty}`;
      })
      .join(", ");
  };

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
        My Orders
      </h1>
      <p className="mt-1 text-[11px] text-slate-400">
        Orders you&apos;ve placed with Brew Haven Café.
      </p>

      {errorMsg && (
        <div className="mt-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {errorMsg}
        </div>
      )}

      <div className="mt-4 space-y-3 text-xs">
        {loading ? (
          <p className="text-[11px] text-slate-500">Loading your orders...</p>
        ) : orders.length === 0 ? (
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
                  <p className="text-sm font-semibold text-slate-100">
                    Order #{o.id.slice(-6)}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatDateTime(o.createdAt)}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Source: {o.source} · Payment: {o.paymentStatus}
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

              <p className="mt-2 text-[11px] text-slate-300">
                {buildItemsSummary(o.items)}
              </p>

              {o.notes && (
                <p className="mt-1 text-[10px] text-slate-500">
                  Note: {o.notes}
                </p>
              )}

              <p className="mt-1 text-[11px] font-semibold text-amber-300">
                ₹{o.totalAmount}
              </p>
            </div>
          ))
        )}
      </div>

      <p className="mt-3 text-[10px] text-slate-600">
        This page uses <code>GET /api/account/orders</code> and shows only
        orders linked to your account.
      </p>
    </div>
  );
};

export default AccountOrders;
