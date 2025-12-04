import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Read logged-in user (from localStorage → bh_user)
  useEffect(() => {
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
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "Order", to: "/order" },
    { label: "Reservations", to: "/reservations" },
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
              Brew Haven Café
            </span>
            <span className="text-[11px] text-slate-400">
              Crafted sips, cozy vibes.
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
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
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/order"
            className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition"
          >
            Order Now
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

        {/* Mobile Hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-700 p-2 text-slate-200 hover:border-amber-400 hover:text-amber-300 md:hidden"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {navLinks.map((link) => (
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
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
              <Link
                to="/order"
                onClick={closeMenu}
                className="w-full rounded-full bg-amber-400 px-4 py-2 text-center text-xs font-semibold text-slate-950 hover:bg-amber-300 transition"
              >
                Order Now
              </Link>

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
