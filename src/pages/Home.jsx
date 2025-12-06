import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Build category summary from menu items array
const buildCategorySummary = (items) => {
  const map = items.reduce((acc, item) => {
    if (!item.category) return acc;

    if (!acc[item.category]) {
      acc[item.category] = {
        name: item.category,
        image: item.imageUrl || item.image || "/images/menu/placeholder.jpg",
        minPrice: item.price || 0,
        count: 1,
      };
    } else {
      acc[item.category].minPrice = Math.min(
        acc[item.category].minPrice,
        item.price || 0
      );
      acc[item.category].count += 1;
    }
    return acc;
  }, {});

  return Object.values(map);
};

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [menuError, setMenuError] = useState("");

  const navigate = useNavigate();
  const { addItem } = useCart();

  // Basic SEO: page title
  useEffect(() => {
    document.title =
      "Shree Shayam Cafe – Coffee & Snacks Near CLC, Sikar, Rajasthan";
  }, []);

  // ===== FETCH MENU FROM API =====
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoadingMenu(true);
        setMenuError("");

        const res = await fetch(`${API_BASE}/menu`);
        const data = await res.json().catch(() => []);

        if (!res.ok) {
          throw new Error(data.message || "Failed to load menu items.");
        }

        // Normalize image field from backend
        const normalized = (Array.isArray(data) ? data : []).map((item) => ({
          ...item,
          image: item.imageUrl || item.image || "/images/menu/placeholder.jpg",
        }));

        setMenuItems(normalized);
      } catch (err) {
        console.error("Home menu error:", err);
        setMenuError(err.message || "Unable to load menu right now.");
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchMenu();
  }, []);

  // ===== DERIVED DATA =====
  const availableItems = menuItems.filter((i) => i.isAvailable !== false);

  const specials = availableItems
    .filter((item) => item.badge) // you can tweak condition later
    .slice(0, 3);

  const featuredMenu = availableItems.slice(0, 6);

  const categorySummary = buildCategorySummary(availableItems);

  const handleAddToCart = (item) => {
    const storedUser = localStorage.getItem("bh_user");
    if (!storedUser) {
      navigate("/auth/signin?redirect=/");
      return;
    }
    addItem(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center">
          {/* Left */}
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
              <span className="text-amber-300">Open Today</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              8:00 AM – 11:00 PM
            </p>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Shree Shayam Cafe,{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                near CLC Sikar
              </span>
              .
            </h1>

            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              Welcome to Shree Shayam Cafe — a cozy, student-friendly café near
              CLC, Sikar. Enjoy strong coffee, quick snacks, and a calm space
              for study, work, or gupshup with friends.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/order"
                className="rounded-full bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-300 transition"
              >
                Order Online
              </Link>
              <Link
                to="/menu"
                className="rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 hover:border-amber-400/60 hover:text-amber-300 transition"
              >
                View Menu
              </Link>
              <p className="text-xs text-slate-400">
                Free Wi-Fi • Power outlets • Calm ambience
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-amber-300">4.8 / 5</p>
                <p className="text-slate-400">Student favourites</p>
              </div>
              <div>
                <p className="font-semibold text-amber-300">
                  {availableItems.length || "20+"}
                </p>
                <p className="text-slate-400">coffee & snack options</p>
              </div>
              <div>
                <p className="font-semibold text-amber-300">Work-friendly</p>
                <p className="text-slate-400">Quiet &amp; cozy seating</p>
              </div>
            </div>
          </div>

          {/* Right - hero with local image */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-amber-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
                <img
                  src="/images/hero/hero-cafe.jpg"
                  alt="Interior of Shree Shayam Cafe near CLC Sikar"
                  className="h-64 w-full object-cover sm:h-[390px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today’s Specials */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Today&apos;s Specials</h2>
              <p className="text-xs text-slate-400">
                Handpicked items we recommend you try today.
              </p>
            </div>
            <Link
              to="/menu"
              className="rounded-full border border-slate-700 px-4 py-1.5 text-xs text-slate-200 hover:border-amber-400/70 hover:text-amber-300 transition"
            >
              View Full Menu
            </Link>
          </div>

          {menuError && (
            <p className="mb-3 text-[11px] text-rose-300">{menuError}</p>
          )}

          {loadingMenu ? (
            <p className="text-[11px] text-slate-500">
              Loading today&apos;s specials...
            </p>
          ) : specials.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Specials will appear here when you mark items with a badge in the
              dashboard.
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
              {specials.map((item) => (
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Menu Preview section (small preview, not full Menu component) */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
                Explore the Menu
              </p>
              <h2 className="mt-1 text-lg font-semibold">
                A quick look at what we serve.
              </h2>
              <p className="text-xs text-slate-400">
                Some of the most loved coffee, chai, and snacks at Shree Shayam
                Cafe.
              </p>
            </div>
            <Link
              to="/menu"
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs text-slate-200 border border-slate-700 hover:border-amber-400 hover:text-amber-300 transition"
            >
              See all items
            </Link>
          </div>

          {loadingMenu ? (
            <p className="text-[11px] text-slate-500">
              Loading menu preview...
            </p>
          ) : featuredMenu.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No menu items yet. Add some from the admin dashboard.
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
              {featuredMenu.map((item) => (
                <Card
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  price={`₹${item.price}`}
                  tag={item.tag}
                  badge={item.badge}
                  isAvailable={item.isAvailable}
                  image={item.image}
                  onAdd={() => addItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Browse by category */}
      {categorySummary.length > 0 && (
        <section className="border-b border-slate-800 bg-slate-950/60">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <h2 className="text-sm font-semibold text-slate-50">
              Browse by category
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Quickly jump into your favourite type of drink or snack.
            </p>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {categorySummary.map((cat) => (
                <div
                  key={cat.name}
                  className="min-w-[160px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80"
                >
                  <div className="h-20 w-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={`${cat.name} at Shree Shayam Cafe`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-[11px]">
                    <p className="font-semibold text-slate-100">{cat.name}</p>
                    <p className="mt-1 text-slate-400">
                      From ₹{cat.minPrice} · {cat.count}+ options
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why people love us */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Why people love us</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 text-2xl">🛋️</p>
              <h3 className="text-sm font-semibold">Cozy & calm ambience</h3>
              <p className="mt-2 text-xs text-slate-400">
                Perfect for CLC students and locals who want a quiet place to
                study, work, or just relax with friends.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 text-2xl">☕</p>
              <h3 className="text-sm font-semibold">
                Great taste, fair prices
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                From strong cold coffee to classic chai and snacks — tasty
                options without burning a hole in your pocket.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 text-2xl">💻</p>
              <h3 className="text-sm font-semibold">Work-friendly space</h3>
              <p className="mt-2 text-xs text-slate-400">
                Free Wi-Fi, charging points, and comfortable seating. Ideal for
                freelancers and students preparing for exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit / Contact teaser */}
      <section className="border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Plan your visit</h2>
            <p className="mt-2 text-xs text-slate-400">
              Drop in between classes, bring your laptop, or just enjoy some
              quiet me-time with a hot cup and snacks.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <p>
                <span className="font-semibold text-amber-300">Address:</span>{" "}
                Shree Shayam Cafe, Near CLC,
                <br />
                Sikar, Rajasthan.
              </p>
              <p>
                <span className="font-semibold text-amber-300">Timings:</span>{" "}
                8:00 AM – 11:00 PM, all days.
              </p>
              <p>
                <span className="font-semibold text-amber-300">Contact:</span>{" "}
                98873&nbsp;74746 · sainilalit275@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex h-48 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-[11px] text-slate-500">
              Map placeholder
              <br />
              (Embed Google Map for &quot;Shree Shayam Cafe, Near CLC,
              Sikar&quot; when ready)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
