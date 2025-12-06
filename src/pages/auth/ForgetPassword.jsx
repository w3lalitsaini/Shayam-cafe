import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setInfoMsg(
        data.message ||
          "If that email exists, a password reset link has been sent."
      );

      // For dev: show reset URL in console if backend sends it
      if (data.dev_reset_url) {
        console.log("DEV reset URL:", data.dev_reset_url);
      }
      if (data.dev_reset_token) {
        console.log("DEV reset token:", data.dev_reset_token);
      }

      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10">
            <span className="text-xl">🔑</span>
          </div>
          <h1 className="text-lg font-semibold">Forgot password?</h1>
          <p className="mt-1 text-xs text-slate-400">
            Enter your registered email address and we&apos;ll send you a reset
            link.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="mb-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
            {infoMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="mb-1 block text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 outline-none placeholder:text-slate-500 focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send reset link"}
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

export default ForgetPassword;
