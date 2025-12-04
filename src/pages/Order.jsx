import React, { useState, useMemo } from "react";
import menuItems from "../data/menuItems.json";

const Order = () => {
  // Build categories dynamically from JSON
  const dynamicCategories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );
  const categories = ["All", ...dynamicCategories];

  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [orderType, setOrderType] = useState("Takeaway"); // Takeaway / Dine-in
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const currentQty = prev[item.id] || 0;
      return {
        ...prev,
        [item.id]: currentQty + 1,
      };
    });
  };

  const handleQtyChange = (id, delta) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const nextQty = currentQty + delta;

      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return {
        ...prev,
        [id]: nextQty,
      };
    });
  };

  const cartItems = useMemo(
    () =>
      menuItems
        .filter((item) => cart[item.id])
        .map((item) => ({
          ...item,
          qty: cart[item.id],
          lineTotal: item.price * cart[item.id],
        })),
    [cart]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = Math.round(subtotal * 0.05); // 5% demo tax
  const total = subtotal + tax;

  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      window.alert("Please add at least one item to your order.");
      return;
    }

    if (!customerName || !customerPhone) {
      window.alert("Please fill your name and phone number.");
      return;
    }

    // For now, just show an alert.
    window.alert(
      `Order placed!\n\nName: ${customerName}\nPhone: ${customerPhone}\nType: ${orderType}\nItems: ${
        cartItems.length
      }\nTotal: ${formatCurrency(total)}`
    );

    // Reset state
    setCart({});
    setCustomerName("");
    setCustomerPhone("");
    setNote("");
    setOrderType("Takeaway");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
              Order Online
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Freshly brewed, ready when you are.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Choose your favourite drinks and snacks, and place an order for
              takeaway or dine-in. No login or payment needed yet – this is a
              demo flow.
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

        {/* Layout: menu left, cart right */}
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* Left side: items */}
          <div>
            {/* Category pills */}
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-3 py-1.5 text-xs md:text-sm transition ${
                    activeCategory === cat
                      ? "border-amber-400 bg-amber-400/10 text-amber-300"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Items grid: 2–3 per row like Flipkart */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col overflow-hidden rounded-2xl border bg-slate-900/80 shadow-sm ${
                      item.isAvailable
                        ? "border-slate-800"
                        : "border-slate-900 opacity-80"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-28 w-full overflow-hidden sm:h-32">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      {!item.isAvailable && (
                        <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-3">
                      <div>
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-50 sm:text-sm">
                            {item.title}
                          </h4>
                          {item.tag && (
                            <span className="rounded-full bg-slate-800 px-2 py-1 text-[9px] text-slate-300">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs font-semibold text-amber-300 sm:text-sm">
                          {formatCurrency(item.price)}
                        </p>
                        {cart[item.id] ? (
                          <div className="flex items-center gap-2 rounded-full bg-slate-800 px-2 py-1">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(item.id, -1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-slate-200 hover:bg-slate-700"
                            >
                              -
                            </button>
                            <span className="text-xs font-medium">
                              {cart[item.id]}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(item.id, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-semibold text-slate-950 hover:bg-amber-300"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={!item.isAvailable}
                            onClick={() => handleAddToCart(item)}
                            className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                              item.isAvailable
                                ? "bg-slate-800 text-slate-100 hover:bg-amber-400 hover:text-slate-950"
                                : "cursor-not-allowed bg-slate-800/60 text-slate-500"
                            }`}
                          >
                            {item.isAvailable ? "Add" : "Not Available"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No items available in this category right now.
                </p>
              )}
            </div>
          </div>

          {/* Right side: Cart & checkout */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
              Your Order
            </h2>

            {/* Cart items */}
            <div className="space-y-3 border-b border-slate-800 pb-3 max-h-64 overflow-y-auto custom-scroll">
              {cartItems.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Your cart is empty. Add some items from the menu.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-100">{item.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {formatCurrency(item.price)} × {item.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] text-slate-200 hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="text-[11px] font-medium">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQtyChange(item.id, 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[11px] font-semibold text-slate-950 hover:bg-amber-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-amber-300">
                        {formatCurrency(item.lineTotal)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

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

            {/* Checkout form */}
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

              <div>
                <label className="mb-1 block text-slate-300">
                  Special instructions (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="E.g. less sugar, extra hot, no onions, etc."
                  rows={3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition disabled:cursor-not-allowed disabled:opacity-60"
                disabled={cartItems.length === 0}
              >
                Place Order (Demo)
              </button>

              <p className="text-[11px] text-slate-500">
                This is a frontend-only demo. Later, you can connect this to
                your Express + MongoDB backend and integrate Razorpay/Stripe for
                payments.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
