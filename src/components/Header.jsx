// src/layout/Header.jsx (or wherever your Header is)
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const { items: cartItems } = useCart();

  // Total items in cart (sum of qty)
  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // ---- Fetch logged-in user from localStorage + API profile ----
  useEffect(() => {
    // 1) Local snapshot (fast)
    try {
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to parse bh_user", err);
      setUser(null);
    }

    // 2) Fresh data from backend (role, name, phone, etc.)
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("bh_token");
        if (!token) {
          setProfileLoaded(true);
          return;
        }

        const res = await fetch(`${API_BASE}/account/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          // If token invalid / expired, silently ignore
          console.warn("Profile fetch failed:", data.message || res.status);
          setProfileLoaded(true);
          return;
        }

        // data.user comes from backend
        setUser(data.user || null);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "Order", to: "/order" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const linkBaseClasses =
    "text-sm font-medium transition-colors hover:text-amber-400";
  const activeClasses = "text-amber-400";

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/50 bg-amber-500/10">
            <span className="text-xl">☕</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Shree Shayam Cafe
            </span>
            <span className="text-[11px] text-slate-400">
              Near CLC, Sikar · Since 2019
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            // Special handling for "Order" link -> show cart badge
            if (link.to === "/order") {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `${linkBaseClasses} ${
                      isActive ? activeClasses : "text-slate-200"
                    } relative inline-flex items-center gap-1`
                  }
                >
                  <span>{link.label}</span>
                  {cartCount > 0 && (
                    <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-semibold text-slate-950">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              );
            }

            // Default link
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `${linkBaseClasses} ${
                    isActive ? activeClasses : "text-slate-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/order"
            className="relative rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition"
          >
            Order Now
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-950 text-[10px] font-semibold text-amber-300 border border-amber-400">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              {/* If admin, show dashboard link */}
              {user.role === "Admin" && (
                <Link
                  to="/dashboard"
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-amber-400 hover:text-amber-300 transition"
                >
                  Dashboard
                </Link>
              )}

              {/* My Account */}
              <Link
                to="/account"
                className="text-xs font-medium text-slate-300 hover:text-amber-300 transition"
              >
                My Account
              </Link>
            </div>
          ) : (
            <Link
              to="/auth/signin"
              className="text-xs font-medium text-slate-300 hover:text-amber-300 transition"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile controls: cart icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile cart icon (goes to /order) */}
          <Link
            to="/order"
            onClick={closeMenu}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-400 hover:text-amber-300 transition"
            aria-label="View cart / order"
          >
            {/* Cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a1 1 0 0 0 .99.81H19a1 1 0 0 0 .98-.8L22 6H6" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-semibold text-slate-950">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 p-2 text-slate-200 hover:border-amber-400 hover:text-amber-300 md:hidden"
            onClick={handleToggle}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              // Close icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {navLinks.map((link) => {
              if (link.to === "/order") {
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2 text-sm ${
                        isActive ? "text-amber-400" : "text-slate-200"
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    {cartCount > 0 && (
                      <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-semibold text-slate-950">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `py-2 text-sm ${
                      isActive ? "text-amber-400" : "text-slate-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
              {user ? (
                <>
                  {user.role === "Admin" && (
                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-center text-xs font-medium text-slate-100 hover:border-amber-400 hover:text-amber-300 transition"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/account"
                    onClick={closeMenu}
                    className="text-xs font-medium text-slate-300 hover:text-amber-300 transition"
                  >
                    My Account
                  </Link>
                </>
              ) : (
                <Link
                  to="/auth/signin"
                  onClick={closeMenu}
                  className="text-xs font-medium text-slate-300 hover:text-amber-300 transition"
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
