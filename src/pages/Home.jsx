import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import menuItems from "../data/menuItems.json";
import Menu from "./Menu";

// Build category summary from menuItems
const buildCategorySummary = (items) => {
  const map = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        name: item.category,
        image: item.image,
        minPrice: item.price,
        count: 1,
      };
    } else {
      acc[item.category].minPrice = Math.min(
        acc[item.category].minPrice,
        item.price
      );
      acc[item.category].count += 1;
    }
    return acc;
  }, {});

  return Object.values(map);
};


const Home = () => {
  // Today's Specials: pick items with a badge or just first few featured ones
  const specials = menuItems
    .filter((item) => item.badge && item.isAvailable)
    .slice(0, 3);

  // Menu preview: first 6 items => 2 rows (3x2) on large screens
  const featuredMenu = menuItems.slice(0, 6);

  const categorySummary = buildCategorySummary(menuItems);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center">
          {/* Left */}
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
              <span className="text-amber-300">Open Today</span>
              <span className="h-1 w-1 rounded-full bg-amber-300" />
              8:00 AM – 11:00 PM
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Coffee that{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                wakes your soul
              </span>
              , not just your eyes.
            </h2>

            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              Welcome to Brew Haven Café — your neighborhood spot for specialty
              coffee, freshly baked desserts, and quiet corners to work, read,
              or relax with friends.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/order"
                className="rounded-full bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-300 transition"
              >
                Order Online
              </Link>
              <Link
                to="/reservations"
                className="rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 hover:border-amber-400/60 hover:text-amber-300 transition"
              >
                Book a Table
              </Link>
              <p className="text-xs text-slate-400">
                Free Wi-Fi • Power outlets • Calm ambience
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-amber-300">4.8 / 5</p>
                <p className="text-slate-400">Google Reviews</p>
              </div>
              <div>
                <p className="font-semibold text-amber-300">20+ Types</p>
                <p className="text-slate-400">of coffee &amp; tea</p>
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
                {/* Replace the src path with your actual local image path */}
                <img
                  src="/images/hero/hero-cafe.jpg"
                  alt="Cozy café interior with coffee"
                  className="h-64 w-full object-cover sm:h-80"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Specials using Card + JSON */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Today&apos;s Specials</h3>
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

          {/* Flipkart-like: 2–3 items per row even on mobile */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
            {specials.map((item) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview section (2 rows on large screens) */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <Menu/>
      </section>

      {/* Why people love us */}
      <section className="border-b border-slate-800 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Why people love us</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 text-2xl">🛋️</p>
              <h4 className="text-sm font-semibold">Cozy & calm ambience</h4>
              <p className="mt-2 text-xs text-slate-400">
                Perfect for work, study, or catching up with friends. Soft
                lighting, comfortable seating, and no loud music.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 text-2xl">☕</p>
              <h4 className="text-sm font-semibold">Specialty coffee</h4>
              <p className="mt-2 text-xs text-slate-400">
                Freshly sourced beans, crafted by trained baristas. From classic
                espresso to seasonal signatures.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 text-2xl">💻</p>
              <h4 className="text-sm font-semibold">Work-friendly space</h4>
              <p className="mt-2 text-xs text-slate-400">
                Free Wi-Fi, charging points, and quiet corners. Ideal for
                freelancers and students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Visit / Contact teaser */}
      <section className="border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Plan your visit</h3>
            <p className="mt-2 text-xs text-slate-400">
              Visit us with friends, bring your laptop, or just enjoy some quiet
              me-time with a book and coffee.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <p>
                <span className="font-semibold text-amber-300">Address:</span>{" "}
                MG Road, Jaipur, Rajasthan (demo address).
              </p>
              <p>
                <span className="font-semibold text-amber-300">Timings:</span>{" "}
                8:00 AM – 11:00 PM, all days.
              </p>
              <p>
                <span className="font-semibold text-amber-300">Contact:</span>{" "}
                +91-98765-43210 · hello@brewhaven.cafe
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-48 w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-[11px] text-slate-500 flex items-center justify-center">
              Map placeholder
              <br />
              (Embed Google Map when ready)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
