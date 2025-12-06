// src/layout/Footer.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "Order", to: "/order" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="border-top border-slate-800 bg-slate-950/95 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand / short intro */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/10">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-50">
                  Shree Shayam Cafe
                </span>
                <span className="text-[11px] text-slate-400">
                  Near CLC, Sikar, Rajasthan.
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs text-slate-400">
              A friendly café near CLC, Sikar serving chai, coffee, snacks and
              simple meals — perfect for students, friends and families.
            </p>

            <p className="mt-3 text-[11px] text-slate-500">
              Open daily · 8:00 AM – 11:00 PM
            </p>
          </div>

          {/* Columns: Quick Links / Visit / Contact */}
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

            {/* Visit section */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Visit Shree Shayam Cafe
              </h4>
              <div className="mt-3 space-y-2 text-xs text-slate-400">
                <div>
                  <p className="font-medium text-slate-200">Address</p>
                  <p className="mt-1">
                    Near CLC Institute
                    <br />
                    Sikar, Rajasthan, India
                  </p>
                </div>
                <div>
                  <p className="font-medium text-slate-200">Timings</p>
                  <p className="mt-1">
                    Monday – Sunday
                    <br />
                    8:00 AM – 11:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & social */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Contact & Social
              </h4>
              <div className="mt-3 space-y-2 text-xs text-slate-400">
                <div>
                  <p className="font-medium text-slate-200">Contact</p>
                  <p className="mt-1">
                    Phone:{" "}
                    <span className="text-slate-200">+91-98873-74746</span>
                    <br />
                    Email:{" "}
                    <span className="text-slate-200">
                      sainilalit275@gmail.com
                    </span>
                  </p>
                </div>

                <div>
                  <p className="font-medium text-slate-200">Social (demo)</p>
                  <div className="mt-2 flex gap-3">
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
                      YT
                    </button>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-[13px] text-slate-300 hover:border-amber-400 hover:text-amber-300 transition"
                    >
                      WA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Shree Shayam Cafe, Sikar. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Made with ❤️ using MERN.</span>
            <span className="hidden text-slate-600 md:inline">·</span>
            <button className="text-slate-500 hover:text-amber-300 transition">
              Privacy Policy
            </button>
            <button className="text-slate-500 hover:text-amber-300 transition">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
