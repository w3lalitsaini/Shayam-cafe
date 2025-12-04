import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "Order", to: "/order" },
    { label: "Reservations", to: "/reservations" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/10">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-50">
                  Brew Haven Café
                </span>
                <span className="text-[11px] text-slate-400">
                  Crafted sips, cozy vibes.
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs text-slate-400">
              Specialty coffee, fresh bakes, and a calm corner to work or chill.
              Order online or reserve your favorite spot in advance.
            </p>

            <p className="mt-3 text-[11px] text-slate-500">
              MG Road, Jaipur, Rajasthan · Open 8:00 AM – 11:00 PM
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-1 flex-wrap gap-8 text-sm md:justify-end">
            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Quick Links
              </h4>
              <div className="mt-3 flex flex-col gap-2 text-xs">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="text-slate-300 hover:text-amber-300 transition"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Contact
              </h4>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>Phone: +91-98765-43210</p>
                <p>Email: hello@brewhaven.cafe</p>
                <p>Instagram: @brewhaven.cafe</p>
              </div>

              {/* Social icons (placeholder) */}
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[13px] text-slate-300 hover:border-amber-400 hover:text-amber-300 transition"
                >
                  in
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[13px] text-slate-300 hover:border-amber-400 hover:text-amber-300 transition"
                >
                  IG
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[13px] text-slate-300 hover:border-amber-400 hover:text-amber-300 transition"
                >
                  X
                </button>
              </div>
            </div>

            {/* Newsletter / CTA */}
            <div className="max-w-xs">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Stay in the loop
              </h4>
              <p className="mt-3 text-xs text-slate-400">
                Get updates on new brews, seasonal specials, and café events.
              </p>

              <form className="mt-3 space-y-2 text-xs">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
                <button
                  type="button"
                  className="w-full rounded-full bg-amber-400 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Brew Haven Café. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Made with ❤️ using MERN.</span>
            <span className="hidden text-slate-600 md:inline">·</span>
            <button className="text-slate-500 hover:text-amber-300 transition">
              Privacy Policy
            </button>
            <button className="text-slate-500 hover:text-amber-300 transition">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
