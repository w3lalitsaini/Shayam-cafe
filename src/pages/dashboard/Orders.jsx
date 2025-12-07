// src/pages/dashboard/Orders.jsx
import React, { useEffect, useState, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const statusOptions = [
  "All",
  "Pending",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoadingId, setStatusLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // =============== FETCH ORDERS (ADMIN ONLY) ===============
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const token = localStorage.getItem("bh_token");
      if (!token) {
        setErrorMsg("You must be signed in as admin to view orders.");
        setLoading(false);
        return;
      }

      // optional status filter via query -> GET /api/orders?status=Preparing
      const query =
        statusFilter === "All"
          ? ""
          : `?status=${encodeURIComponent(statusFilter)}`;

      const res = await fetch(`${API_BASE}/orders${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => []);

      if (!res.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      const mapped = (Array.isArray(data) ? data : []).map((o) => ({
        id: o._id,
        // Updated code prefix for Shree Shayam Café
        orderCode: `SS-${o._id.toString().slice(-6).toUpperCase()}`,
        customer: o.customerName || o.user?.name || "Guest",
        customerPhone: o.customerPhone || "",
        customerAddress: o.customerAddress || "",
        items:
          (o.items || [])
            .map((it) => `${it.title || "Item"} x${it.quantity || 1}`)
            .join(", ") || "-",
        total: o.totalAmount || 0,
        type: o.source || "Online", // "Online" | "In-store"
        status: o.status || "Pending",
        paymentStatus: o.paymentStatus || "Pending",
        createdAt: o.createdAt
          ? new Date(o.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        createdDate: o.createdAt
          ? new Date(o.createdAt).toLocaleDateString("en-IN")
          : "",
      }));

      setOrders(mapped);
    } catch (err) {
      console.error("Get orders error:", err);
      setErrorMsg(err.message || "Something went wrong fetching orders.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // =============== STATUS UPDATE: PATCH /api/orders/:id/status ===============
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("bh_token");
      if (!token) {
        setErrorMsg("You must be signed in as admin to update orders.");
        return;
      }

      setStatusLoadingId(orderId);
      setErrorMsg("");

      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to update order status");
      }

      // data is the updated order from backend → use data.status
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: data.status || newStatus } : o
        )
      );
    } catch (err) {
      console.error("Update order status error:", err);
      setErrorMsg(err.message || "Could not update order status.");
    } finally {
      setStatusLoadingId(null);
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-slate-800 text-slate-200";
      case "Preparing":
        return "bg-amber-400/15 text-amber-300";
      case "Ready":
        return "bg-sky-400/15 text-sky-300";
      case "Completed":
        return "bg-emerald-400/15 text-emerald-300";
      case "Cancelled":
        return "bg-rose-400/15 text-rose-300";
      default:
        return "bg-slate-800 text-slate-200";
    }
  };

  const paymentBadgeColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-500/15 text-emerald-300";
      case "Failed":
        return "bg-rose-500/15 text-rose-300";
      case "Pending":
      default:
        return "bg-slate-700/60 text-slate-200";
    }
  };

  const canMarkPreparing = (status) => status === "Pending";
  const canMarkReady = (status) => status === "Preparing";
  const canMarkCompleted = (status) =>
    status === "Ready" || status === "Preparing";
  const isTerminal = (status) =>
    status === "Completed" || status === "Cancelled";

  return (
    <div>
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Orders
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Live &amp; recent orders
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Track and manage Shree Shayam Café orders from all channels.
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

      {errorMsg && (
        <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {errorMsg}
        </div>
      )}

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        {/* Header row (desktop) */}
        <div className="hidden grid-cols-[1.4fr_1.4fr_0.8fr_0.9fr_0.9fr] gap-3 border-b border-slate-800 pb-2 text-[11px] text-slate-400 md:grid">
          <span>Order / Customer</span>
          <span>Items</span>
          <span>Type</span>
          <span>Status</span>
          <span>Total</span>
        </div>

        <div className="mt-2 space-y-3 text-xs">
          {loading ? (
            <p className="text-[11px] text-slate-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No orders found for this filter.
            </p>
          ) : (
            orders.map((o) => (
              <div
                key={o.id}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 md:grid-cols-[1.4fr_1.4fr_0.8fr_0.9fr_0.9fr]"
              >
                {/* Order + customer + address */}
                <div>
                  <p className="font-semibold text-slate-100">{o.orderCode}</p>
                  <p className="text-[11px] text-slate-400">
                    {o.customer} · {o.createdDate} · {o.createdAt}
                  </p>

                  {o.customerPhone && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      📞 {o.customerPhone}
                    </p>
                  )}
                  {o.customerAddress && (
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                      📍 {o.customerAddress}
                    </p>
                  )}
                </div>

                {/* Items */}
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {o.items}
                </p>

                {/* Type */}
                <div className="flex flex-col gap-1 text-[11px] text-slate-400">
                  <span>{o.type}</span>
                  <span
                    className={`inline-flex w-max rounded-full px-2 py-0.5 text-[10px] ${paymentBadgeColor(
                      o.paymentStatus
                    )}`}
                  >
                    Payment: {o.paymentStatus}
                  </span>
                </div>

                {/* Status + actions */}
                <div className="flex flex-col gap-2">
                  <span
                    className={`inline-flex w-max rounded-full px-2 py-1 text-[10px] font-medium ${badgeColor(
                      o.status
                    )}`}
                  >
                    {statusLoadingId === o.id ? "Updating..." : o.status}
                  </span>

                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      disabled={
                        !canMarkPreparing(o.status) ||
                        statusLoadingId === o.id ||
                        isTerminal(o.status)
                      }
                      onClick={() => handleStatusChange(o.id, "Preparing")}
                      className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-amber-400 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Preparing
                    </button>
                    <button
                      type="button"
                      disabled={
                        !canMarkReady(o.status) ||
                        statusLoadingId === o.id ||
                        isTerminal(o.status)
                      }
                      onClick={() => handleStatusChange(o.id, "Ready")}
                      className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-sky-400 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Ready
                    </button>
                    <button
                      type="button"
                      disabled={
                        !canMarkCompleted(o.status) ||
                        statusLoadingId === o.id ||
                        isTerminal(o.status)
                      }
                      onClick={() => handleStatusChange(o.id, "Completed")}
                      className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-emerald-400 hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Complete
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex flex-col items-start justify-center md:items-end">
                  <p className="text-[11px] font-semibold text-amber-300">
                    ₹{o.total}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Inc. taxes (if applied)
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;
