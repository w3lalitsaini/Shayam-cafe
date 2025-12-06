import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { email, phone, password } = form;

    if (!email && !phone) {
      setErrorMsg("Please enter your email or mobile number.");
      return;
    }

    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    if (!email && phone && !/^\d{10}$/.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || undefined,
          phone: phone || undefined,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      if (data.user && data.token) {
        localStorage.setItem("bh_user", JSON.stringify(data.user));
        localStorage.setItem("bh_token", data.token);
      }

      // Simple role-based redirect
      if (data.user?.role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Signin error:", err);
      setErrorMsg(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10">
            <span className="text-xl">☕</span>
          </div>
          <h1 className="text-lg font-semibold">Welcome back</h1>
          <p className="mt-1 text-xs text-slate-400">
            Sign in to manage your orders and reservations.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="mb-1 block text-slate-300">
              Email (optional)
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-300">
              Mobile number (optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              You can sign in using either email or mobile number.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-amber-400 focus:ring-0"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-amber-300 hover:text-amber-200"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-500">
          New here?{" "}
          <Link
            to="/auth/signup"
            className="text-amber-300 hover:text-amber-200"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
