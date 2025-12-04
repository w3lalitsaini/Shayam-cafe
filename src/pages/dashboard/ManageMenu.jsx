import React, { useState } from "react";
import menuItemsData from "../../data/menuItems.json";
import { useNavigate } from "react-router-dom";


const ManageMenu = () => {
  const [items, setItems] = useState(menuItemsData);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "/images/menu/placeholder.jpg",
    isAvailable: true,
  });

  const categories = ["All", ...new Set(items.map((i) => i.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const handleToggleAvailability = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this menu item? (Demo only)");
    if (!ok) return;
    setItems((prev) => prev.filter((item) => item.id !== id));

    if (editingId === id) {
      setEditingId(null);
      resetForm();
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      image: item.image,
      isAvailable: item.isAvailable,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      price: "",
      description: "",
      image: "/images/menu/placeholder.jpg",
      isAvailable: true,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
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

    if (editingId) {
      // UPDATE
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: form.title,
                category: form.category,
                price: Number(form.price),
                description:
                  form.description || "Freshly prepared at Brew Haven Café.",
                image: form.image || "/images/menu/placeholder.jpg",
                isAvailable: form.isAvailable,
              }
            : item
        )
      );
      window.alert("Item updated (demo only).");
    } else {
      // CREATE
      const newItem = {
        id: Date.now(),
        title: form.title,
        category: form.category,
        price: Number(form.price),
        description: form.description || "Freshly prepared at Brew Haven Café.",
        image: form.image || "/images/menu/placeholder.jpg",
        tag: "New",
        badge: "New",
        isAvailable: form.isAvailable,
      };
      setItems((prev) => [newItem, ...prev]);
      window.alert("Item added (demo only).");
    }

    setEditingId(null);
    resetForm();
  };

  return (
    <div>
      {/* Header */}
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Menu Items
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Manage all menu items
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Admin can add, edit, hide or delete items. Changes are in-memory
            demo only for now.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1.5 transition ${
                activeCategory === cat
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <button
        onClick={() => navigate("/dashboard/menu/add")}
        className="rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition my-4"
      >
        + Add new item
      </button>

      {/* Add / Edit form */}
      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs sm:text-sm">
        <h2 className="text-sm font-semibold text-slate-50">
          {editingId ? "Edit menu item" : "Add new menu item"}
        </h2>
        <p className="mt-1 text-[11px] text-slate-400">
          This currently updates local React state. Later, connect it to{" "}
          <code>POST /api/menu</code> and <code>PATCH /api/menu/:id</code>.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-3 grid gap-3 md:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-slate-300">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="E.g. Caramel Latte"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-300">Category *</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleFormChange}
              placeholder="E.g. Coffee, Snacks"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-300">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleFormChange}
              placeholder="199"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-300">Image path</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleFormChange}
              placeholder="/images/menu/latte.jpg"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              For now use local images. Later replace with Cloudinary URLs.
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-slate-300">Description</label>
            <textarea
              name="description"
              rows={2}
              value={form.description}
              onChange={handleFormChange}
              placeholder="Short description of the drink/snack."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>
          <div className="flex items-center justify-between md:col-span-2">
            <label className="flex items-center gap-2 text-[11px] text-slate-300">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleFormChange}
                className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-0"
              />
              <span>Mark as available</span>
            </label>

            <div className="flex gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    resetForm();
                  }}
                  className="rounded-full border border-slate-700 px-4 py-2 text-[11px] text-slate-200 hover:border-slate-500 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition"
              >
                {editingId ? "Save changes" : "Add item"}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Items grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80"
          >
            <div className="relative h-28 w-full overflow-hidden sm:h-32">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              {!item.isAvailable && (
                <span className="absolute left-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-slate-200">
                  Hidden from customers
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-3 text-xs">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-50">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.category}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-amber-300">
                    ₹{item.price}
                  </p>
                </div>
                <p className="mt-2 text-[11px] text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-[11px] text-slate-300">
                  <input
                    type="checkbox"
                    checked={item.isAvailable}
                    onChange={() => handleToggleAvailability(item.id)}
                    className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-0"
                  />
                  <span>
                    {item.isAvailable ? "Available" : "Not available"}
                  </span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-rose-400 hover:text-rose-300 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <p className="mt-4 text-[11px] text-slate-500">
        Later, connect this page to real APIs:
        <br />
        <code>GET /api/menu</code>, <code>POST /api/menu</code>,{" "}
        <code>PATCH /api/menu/:id</code>, <code>DELETE /api/menu/:id</code>.
      </p>
    </div>
  );
};

export default ManageMenu;
