import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
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

    if (!form.password || !form.confirmPassword) {
      window.alert("Please fill both password fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    // Demo only
    window.alert(
      `Password reset (demo)\n\nToken: ${token}\nNew password set successfully.`
    );
    navigate("/auth/signin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10">
            <span className="text-xl">🔒</span>
          </div>
          <h1 className="text-lg font-semibold">Set a new password</h1>
          <p className="mt-1 text-xs text-slate-400">
            Enter your new password below. This is a demo flow, token is not
            validated yet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="mb-1 block text-slate-300">New password</label>
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
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
          >
            Reset password (Demo)
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-500">
          Remember your password?{" "}
          <Link
            to="/auth/signin"
            className="text-amber-300 hover:text-amber-200"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
