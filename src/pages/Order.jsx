import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Order = () => {
  const {
    items: cartItems,
    updateQty,
    removeItem,
    clearCart,
    totals,
  } = useCart();

  const [orderType, setOrderType] = useState("Takeaway");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState(""); // address
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { subtotal, tax, total } = totals;

  // Basic SEO
  useEffect(() => {
    document.title =
      "Order Online | Shree Shayam Cafe – Near CLC, Sikar, Rajasthan";
  }, []);

  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!cartItems.length) {
      setErrorMsg("Please add at least one item to your order.");
      return;
    }

    if (!customerName || !customerPhone) {
      setErrorMsg("Please fill your name and phone number.");
      return;
    }

    if (!customerAddress.trim()) {
      setErrorMsg("Please enter your address (or hostel/room details).");
      return;
    }

    try {
      setLoading(true);

      // If user is logged in, send userId
      let userId = null;
      try {
        const storedUser = localStorage.getItem("bh_user");
        if (storedUser) {
          const u = JSON.parse(storedUser);
          userId = u.id || u._id || null;
        }
      } catch {
        /* ignore */
      }

      const payload = {
        userId,
        items: cartItems.map((item) => ({
          menuItem: item.id, // Mongo ObjectId string
          title: item.title,
          quantity: item.qty,
          price: item.price,
        })),
        totalAmount: total,
        notes: note,
        source: orderType === "Dine-in" ? "In-store" : "Online",
        customerName,
        customerPhone,
        customerAddress,
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      // success
      clearCart();
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setNote("");
      setOrderType("Takeaway");
      setSuccessMsg(
        "Order placed successfully! Shree Shayam Cafe has received your order."
      );
    } catch (err) {
      console.error("Place order error:", err);
      setErrorMsg(err.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
              Shree Shayam Cafe · Order Online
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Fresh food & chai, ready when you are.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Review your cart and confirm your order for takeaway or dine-in at
              Shree Shayam Cafe, near CLC, Sikar.
            </p>
          </div>

          {/* Order type */}
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setOrderType("Takeaway")}
              className={`rounded-full border px-3 py-1.5 transition ${
                orderType === "Takeaway"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              Takeaway
            </button>
            <button
              type="button"
              onClick={() => setOrderType("Dine-in")}
              className={`rounded-full border px-3 py-1.5 transition ${
                orderType === "Dine-in"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              Dine-in
            </button>
          </div>
        </div>

        {/* Error / success */}
        {errorMsg && (
          <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
            {successMsg}
          </div>
        )}

        {/* Layout: cart + checkout */}
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
          {/* Cart items */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
              Your Cart
            </h2>

            <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-[11px] text-slate-500">
                  Your cart is empty. Go to the menu and add some items.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-slate-100">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-slate-200 hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="text-[11px] font-medium">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[11px] font-semibold text-slate-950 hover:bg-amber-300"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-semibold text-amber-300">
                          {formatCurrency(item.price * item.qty)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-1 text-[10px] text-slate-500 hover:text-rose-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Checkout form + totals */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            {/* Totals */}
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-semibold text-amber-300">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-2 space-y-3 text-xs">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-slate-300">Your name</label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300">
                    Phone number
                  </label>
                  <input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    type="tel"
                    placeholder="10-digit number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="mb-1 block text-slate-300">
                  Delivery / contact address
                </label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Hostel / room no, street, area, landmark near CLC, Sikar"
                  rows={3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-slate-300">
                  Special instructions (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="E.g. less sugar, extra hot, ring after reaching gate, etc."
                  rows={3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="mt-1 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Placing order..." : "Place Order"}
              </button>

              <p className="text-[11px] text-slate-500">
                Your order will be created in the system and visible on the
                Shree Shayam Cafe admin dashboard. A notification email is sent
                to{" "}
                <span className="text-amber-300">sainilalit275@gmail.com</span>{" "}
                for every new order.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
