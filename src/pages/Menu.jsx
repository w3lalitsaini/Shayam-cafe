import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { addItem } = useCart();
  const navigate = useNavigate();

  // SEO: title for menu page
  useEffect(() => {
    document.title =
      "Menu – Shree Shayam Cafe | Coffee & Snacks Near CLC, Sikar";
  }, []);

  // ===== FETCH MENU FROM BACKEND =====
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

        // Normalize image field
        const normalized = (Array.isArray(data) ? data : []).map((item) => ({
          ...item,
          image: item.imageUrl || item.image || "/images/menu/placeholder.jpg",
        }));

        setMenuItems(normalized);
      } catch (err) {
        console.error("Menu page error:", err);
        setErrorMsg(err.message || "Unable to load menu right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    // check if user is logged in
    const storedUser = localStorage.getItem("bh_user");
    if (!storedUser) {
      // redirect to login with redirect back to menu
      navigate("/auth/signin?redirect=/menu");
      return;
    }

    // user logged in → add to cart
    addItem(item);
  };
  // Only show available items to customers
  const publicItems = menuItems.filter((i) => i.isAvailable !== false);

  // Build categories dynamically from API data
  const dynamicCategories = Array.from(
    new Set(publicItems.map((item) => item.category).filter(Boolean))
  );
  const categories = ["All", ...dynamicCategories];

  const filteredItems =
    activeCategory === "All"
      ? publicItems
      : publicItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
              Shree Shayam Cafe · Menu
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Coffee, chai & snacks near CLC, Sikar.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Explore our full menu of hot and cold coffees, chai, quick bites
              and café snacks. All prices are inclusive of taxes and perfect for
              students and locals around CLC, Sikar.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  activeCategory === cat
                    ? "border-amber-400 bg-amber-400/10 text-amber-300"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Error state */}
        {errorMsg && (
          <p className="mt-4 text-[11px] text-rose-300">{errorMsg}</p>
        )}

        {/* Menu Grid */}
        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
          {loading ? (
            <p className="col-span-full text-sm text-slate-400">
              Loading menu items...
            </p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                description={item.description}
                price={`₹${item.price}`}
                tag={item.tag}
                badge={item.badge}
                isAvailable={item.isAvailable}
                image={item.image}
                onAdd={() => handleAddToCart(item)}
              />
            ))
          ) : (
            <p className="col-span-full text-sm text-slate-400">
              No items available in this category right now.
            </p>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Menu;
