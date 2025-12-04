import React, { useState } from "react";
import Card from "../components/Card";
import menuItems from "../data/menuItems.json";

const Menu = () => {
  // Build categories dynamically from JSON
  const dynamicCategories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );
  const categories = ["All", ...dynamicCategories];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
              Our Menu
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Crafted drinks & bites for every mood.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Explore our selection of freshly brewed coffee, teas, cold
              beverages, and snacks. All prices are inclusive of taxes.
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

        {/* Menu Grid */}
        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                price={`₹${item.price}`}
                tag={item.tag}
                badge={item.badge}
                isAvailable={item.isAvailable}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No items available in this category right now.
            </p>
          )}
        </div>

        {/* Note */}
        <p className="mt-6 text-[11px] text-slate-500">
          Images are currently served from{" "}
          <span className="text-amber-300">/public/images/menu</span>. Later you
          can replace the <code>image</code> field in{" "}
          <span className="text-amber-300">menuItems.json</span> with Cloudinary
          URLs from your backend API.
        </p>
      </div>
    </div>
  );
};

export default Menu;
