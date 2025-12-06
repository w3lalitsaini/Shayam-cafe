import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [toggleLoadingId, setToggleLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "", // text URL (Cloudinary or local)
    isAvailable: true,
  });

  const [imageFile, setImageFile] = useState(null); // 👈 selected file
  const [preview, setPreview] = useState(null);

  // ===== FETCH MENU ITEMS FROM API =====
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(`${API_BASE}/menu`);
        const data = await res.json().catch(() => []);

        if (!res.ok) {
          throw new Error(data.message || "Failed to load menu items.");
        }

        const mapped = data.map((i) => ({
          ...i,
          id: i._id,
          image: i.imageUrl || "/images/menu/placeholder.jpg",
        }));

        setItems(mapped);
      } catch (err) {
        console.error("Get menu error:", err);
        setErrorMsg(err.message || "Something went wrong loading the menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = ["All", ...new Set(items.map((i) => i.category))];

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  // ===== HANDLERS =====

  const handleToggleAvailability = async (id) => {
    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in as admin to change availability.");
      return;
    }

    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newAvailable = !item.isAvailable;

    try {
      setToggleLoadingId(id);
      setErrorMsg("");

      const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAvailable: newAvailable }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to update availability.");
      }

      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                isAvailable: data.isAvailable ?? newAvailable,
              }
            : i
        )
      );
    } catch (err) {
      console.error("Toggle availability error:", err);
      setErrorMsg(err.message || "Could not update item availability.");
    } finally {
      setToggleLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this menu item?");
    if (!ok) return;

    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in as admin to delete items.");
      return;
    }

    try {
      setDeleteLoadingId(id);
      setErrorMsg("");

      const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete item.");
      }

      setItems((prev) => prev.filter((i) => i.id !== id));

      if (editingId === id) {
        setEditingId(null);
        resetForm();
      }
    } catch (err) {
      console.error("Delete menu item error:", err);
      setErrorMsg(err.message || "Could not delete the item.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      category: item.category || "",
      price: item.price?.toString() || "",
      description: item.description || "Freshly prepared at Brew Haven Café.",
      imageUrl: item.imageUrl || item.image || "",
      isAvailable: item.isAvailable ?? true,
    });
    setImageFile(null);
    setPreview(item.image || item.imageUrl || null);
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
      isAvailable: true,
    });
    setImageFile(null);
    setPreview(null);
  };

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(form.imageUrl || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.price) {
      window.alert("Title, category and price are required.");
      return;
    }

    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in as admin to manage menu.");
      return;
    }

    try {
      setFormLoading(true);
      setErrorMsg("");

      let res, data;

      // If there is a new image file → use FormData (Cloudinary upload)
      if (imageFile) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("category", form.category);
        fd.append("price", form.price);
        fd.append(
          "description",
          form.description || "Freshly prepared at Brew Haven Café."
        );
        fd.append("isAvailable", form.isAvailable ? "true" : "false");

        // If user also filled imageUrl, we can ignore it or send as backup,
        // but usually new file overrides it.
        if (form.imageUrl) {
          fd.append("imageUrl", form.imageUrl);
        }

        fd.append("image", imageFile); // 👈 multer field name

        const method = editingId ? "PATCH" : "POST";
        const url = editingId
          ? `${API_BASE}/menu/${editingId}`
          : `${API_BASE}/menu`;

        res = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        });
        data = await res.json().catch(() => ({}));
      } else {
        // No file → send JSON (just update fields / URL)
        const payload = {
          title: form.title,
          category: form.category,
          price: Number(form.price),
          description:
            form.description || "Freshly prepared at Brew Haven Café.",
          imageUrl: form.imageUrl || "",
          isAvailable: form.isAvailable,
        };

        const method = editingId ? "PATCH" : "POST";
        const url = editingId
          ? `${API_BASE}/menu/${editingId}`
          : `${API_BASE}/menu`;

        res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        data = await res.json().catch(() => ({}));
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to save item.");
      }

      const mapped = {
        ...data,
        id: data._id,
        image: data.imageUrl || "/images/menu/placeholder.jpg",
      };

      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? mapped : i)));
        window.alert("Item updated successfully.");
      } else {
        setItems((prev) => [mapped, ...prev]);
        window.alert("Item added successfully.");
      }

      setEditingId(null);
      resetForm();
    } catch (err) {
      console.error("Save menu item error:", err);
      setErrorMsg(err.message || "Could not save the item.");
    } finally {
      setFormLoading(false);
    }
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
            Admin can add, edit, hide or delete items. Images are stored on
            Cloudinary when you upload a file.
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

      {errorMsg && (
        <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {errorMsg}
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard/menu/add")}
        className="rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition my-4"
      >
        + Add new item (full-page)
      </button>

      {/* Add / Edit form */}
      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs sm:text-sm">
        <h2 className="text-sm font-semibold text-slate-50">
          {editingId ? "Edit menu item" : "Quick add / edit"}
        </h2>
        <p className="mt-1 text-[11px] text-slate-400">
          Uses <code>POST /api/menu</code> and <code>PATCH /api/menu/:id</code>.
          If you choose a file, it will be uploaded to Cloudinary.
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

          {/* File + URL */}
          <div className="md:col-span-2 grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <label className="mb-1 block text-slate-300">
                Upload new image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs file:mr-2 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-1 file:text-xs file:text-slate-100 focus:border-amber-400"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                Choose a local image to upload to Cloudinary. Leaving this empty
                keeps the current image.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-slate-300">
                Image URL (optional)
              </label>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleFormChange}
                placeholder="Cloudinary URL or /images/menu/latte.jpg"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                If you don&apos;t pick a file but change this URL, the backend
                will update the image link (and can clear old Cloudinary image).
              </p>
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="md:col-span-2">
              <p className="mb-1 text-[11px] text-slate-400">Preview</p>
              <div className="h-32 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

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
                disabled={formLoading}
                className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formLoading
                  ? "Saving..."
                  : editingId
                  ? "Save changes"
                  : "Add item"}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Items grid */}
      {loading ? (
        <p className="text-[11px] text-slate-500">Loading menu items...</p>
      ) : (
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
                      disabled={toggleLoadingId === item.id}
                      className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-0 disabled:opacity-60"
                    />
                    <span>
                      {toggleLoadingId === item.id
                        ? "Updating..."
                        : item.isAvailable
                        ? "Available"
                        : "Not available"}
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
                      disabled={deleteLoadingId === item.id}
                      className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-200 hover:border-rose-400 hover:text-rose-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {deleteLoadingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && !loading && (
            <p className="text-[11px] text-slate-500">
              No items in this category yet.
            </p>
          )}
        </section>
      )}

      <p className="mt-4 text-[11px] text-slate-500">
        Connected APIs: <code>GET /api/menu</code>, <code>POST /api/menu</code>,{" "}
        <code>PATCH /api/menu/:id</code>, <code>DELETE /api/menu/:id</code>
        {" · "}Cloudinary used for image upload & delete.
      </p>
    </div>
  );
};

export default ManageMenu;
