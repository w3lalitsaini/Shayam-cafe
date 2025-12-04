import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      window.alert("Please fill all fields (name, email, mobile, password).");
      return;
    }

    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      window.alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Demo only
    window.alert(
      `Signup (demo)\n\nName: ${name}\nEmail: ${email}\nMobile: ${phone}`
    );
    navigate("/auth/verify-email");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10">
            <span className="text-xl">☕</span>
          </div>
          <h1 className="text-lg font-semibold">Create your account</h1>
          <p className="mt-1 text-xs text-slate-400">
            Sign up to manage orders, reservations, and more.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="mb-1 block text-slate-300">Full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-300">Email</label>
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
            <label className="mb-1 block text-slate-300">Mobile number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-slate-300">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-300">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
          >
            Create account (Demo)
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-500">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-amber-300 hover:text-amber-200"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-2 text-[10px] text-slate-600">
          This auth flow is currently frontend-only. Later you can connect it to
          your Express + MongoDB API and JWT/session system.
        </p>
      </div>
    </div>
  );
};

export default Signup;
