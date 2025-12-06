import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AddMenuItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "", // fallback/manual URL (optional)
    isAvailable: true,
    tag: "",
    badge: "",
  });
  const [imageFile, setImageFile] = useState(null); // 👈 local file
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title || !form.category || !form.price) {
      setErrorMsg("Title, category and price are required.");
      return;
    }

    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in as admin to add menu items.");
      return;
    }

    try {
      setLoading(true);

      // Use FormData for file + fields
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("price", form.price);
      fd.append("description", form.description || "");
      fd.append("tag", form.tag || "");
      fd.append("badge", form.badge || "");
      fd.append("isAvailable", form.isAvailable ? "true" : "false");

      // If file selected → send file; else if manual URL provided → send that
      if (imageFile) {
        fd.append("image", imageFile); // 👈 field name must match multer
      } else if (form.imageUrl) {
        fd.append("imageUrl", form.imageUrl);
      }

      const res = await fetch(`${API_BASE}/menu`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ don't set Content-Type manually, browser sets boundary for FormData
        },
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to create menu item");
      }

      // Optional: show toast
      // window.alert("Menu item created successfully");

      navigate("/dashboard/menu");
    } catch (err) {
      console.error("Create menu item error:", err);
      setErrorMsg(err.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
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
          Create a new drink or snack for your café menu. Images are uploaded to
          Cloudinary via your backend.
        </p>
      </header>

      {errorMsg && (
        <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {errorMsg}
        </div>
      )}

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

          {/* Image file + optional URL */}
          <div className="md:col-span-2 grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <label className="mb-1 block text-slate-300">
                Upload image (Cloudinary)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs file:mr-2 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-1 file:text-xs file:text-slate-100 focus:border-amber-400"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                Choose an image file to upload. It will be stored on Cloudinary.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-slate-300">
                Or use existing image URL (optional)
              </label>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="Cloudinary URL or /images/menu/latte.jpg"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                If no file is selected but a URL is provided, the URL will be
                saved directly.
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
                disabled={loading}
                className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create item"}
              </button>
            </div>
          </div>
        </form>
      </section>

      <p className="mt-3 text-[11px] text-slate-500">
        This form now sends <code>multipart/form-data</code> to{" "}
        <code>POST /api/menu</code>. Image files are uploaded to Cloudinary on
        the server.
      </p>
    </div>
  );
};

export default AddMenuItem;
