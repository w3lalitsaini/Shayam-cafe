import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMenuItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "/images/menu/placeholder.jpg",
    isAvailable: true,
    tag: "",
    badge: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.price) {
      window.alert("Title, category and price are required.");
      return;
    }

    // For now this is just demo – in real app you'd POST to your API.
    const payload = {
      ...form,
      price: Number(form.price),
    };

    console.log("New menu item (demo only):", payload);
    window.alert("Menu item created (demo only). Check console payload.");

    // Redirect admin back to menu management page
    navigate("/dashboard/menu");
  };

  const handleCancel = () => {
    navigate("/dashboard/menu");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] text-slate-100">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
          Menu Items
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          Add new menu item
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Create a new drink or snack for your café menu. This page is currently
          frontend-only; later you&apos;ll connect it to your backend API.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs sm:text-sm">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-slate-300">Item name *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="E.g. Caramel Latte"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-slate-300">Category *</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="E.g. Coffee, Cold Drinks, Snacks"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-slate-300">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="199"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="mb-1 block text-slate-300">Tag (optional)</label>
            <input
              type="text"
              name="tag"
              value={form.tag}
              onChange={handleChange}
              placeholder="E.g. Bestseller, Seasonal"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          {/* Badge */}
          <div>
            <label className="mb-1 block text-slate-300">
              Badge (optional)
            </label>
            <input
              type="text"
              name="badge"
              value={form.badge}
              onChange={handleChange}
              placeholder="E.g. New, Limited"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-slate-300">Image path</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/images/menu/latte.jpg"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              Use local image paths for now. Later you can replace this with
              Cloudinary URLs from your backend.
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-slate-300">Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Short description of the drink/snack, flavor notes, etc."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          {/* Availability + buttons */}
          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-[11px] text-slate-300">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
                className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-0"
              />
              <span>Mark as available</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border border-slate-700 px-4 py-2 text-[11px] text-slate-200 hover:border-slate-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition"
              >
                Create item
              </button>
            </div>
          </div>
        </form>
      </section>

      <p className="mt-3 text-[11px] text-slate-500">
        Later, connect this page to an API endpoint like{" "}
        <code>POST /api/menu</code> and then refresh your admin menu list from{" "}
        <code>GET /api/menu</code>.
      </p>
    </div>
  );
};

export default AddMenuItem;
