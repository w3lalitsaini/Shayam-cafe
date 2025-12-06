import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const VerifiyEmail = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [email, setEmail] = useState("");

  // Fetch email from localStorage that we saved during signup
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bh_signup_email");
      if (stored) {
        const parsed = JSON.parse(stored);
        setEmail(parsed.email || "");
      } else {
        setInfoMsg("No signup email found. Please sign up again.");
      }
    } catch (err) {
      console.error("Error reading stored email:", err);
      setInfoMsg("Could not detect your email. Please sign up again.");
    }
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only digits allowed

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input automatically
    if (value && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setInfoMsg("");

    const code = otp.join("");

    if (!email) {
      setErrorMsg("We couldn't detect your email. Please sign up again.");
      return;
    }

    if (code.length !== 6) {
      setErrorMsg("Please enter the full 6-digit code.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }

      // store user + token so user is logged in
      if (data.user && data.token) {
        localStorage.setItem("bh_user", JSON.stringify(data.user));
        localStorage.setItem("bh_token", data.token);
      }

      // clear temporary signup email
      localStorage.removeItem("bh_signup_email");

      // Optional: toast
      // window.alert("Email verified successfully!");

      navigate("/auth/signin");
    } catch (err) {
      console.error("Verify email error:", err);
      setErrorMsg(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setErrorMsg("");
    setInfoMsg("");

    if (!email) {
      setErrorMsg("We couldn't detect your email. Please sign up again.");
      return;
    }

    try {
      setResendLoading(true);

      const res = await fetch(`${API_BASE}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setInfoMsg("A new OTP has been sent to your email / phone.");
      // For dev you may log
      if (data.dev_otp) {
        console.log("DEV OTP (resend):", data.dev_otp);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setErrorMsg(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10">
          📩
        </div>

        <h1 className="text-lg font-semibold">Verify your email</h1>
        <p className="mt-2 text-xs text-slate-400">
          Enter the 6-digit code sent to your email address
          {email ? (
            <>
              {" "}
              <span className="font-medium text-amber-300">({email})</span>.
            </>
          ) : (
            "."
          )}
        </p>

        {errorMsg && (
          <div className="mt-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100 text-left">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100 text-left">
            {infoMsg}
          </div>
        )}

        {/* OTP Inputs */}
        <div className="mt-5 flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-11 w-11 rounded-lg border border-slate-700 bg-slate-900 text-center text-lg font-semibold text-amber-300 outline-none focus:border-amber-400"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Resend */}
        <div className="mt-3 text-[11px] text-slate-400">
          Didn&apos;t get the code?{" "}
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-amber-300 hover:text-amber-200 underline disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        </div>

        {/* Back */}
        <div className="mt-4">
          <Link
            to="/auth/signin"
            className="text-[11px] text-slate-400 hover:text-amber-300 transition"
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifiyEmail;
