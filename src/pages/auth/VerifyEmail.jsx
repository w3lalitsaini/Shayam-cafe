import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifiyEmail = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only digits allowed

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input automatically
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      window.alert("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);

    // Fake OTP verification
    setTimeout(() => {
      setLoading(false);

      if (code === "123456") {
        window.alert("Email verified successfully! ✅");
        navigate("/auth/signin");
      } else {
        window.alert("Invalid OTP. Try again. ❌");
      }
    }, 1200);
  };

  const handleResend = () => {
    window.alert("New OTP sent to your email (demo: 123456).");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/10">
          📩
        </div>

        <h1 className="text-lg font-semibold">Verify your email</h1>
        <p className="mt-2 text-xs text-slate-400">
          Enter the 6-digit code sent to your email address.
        </p>

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
          className="mt-5 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Resend */}
        <div className="mt-3 text-[11px] text-slate-400">
          Didn&apos;t get the code?{" "}
          <button
            onClick={handleResend}
            className="text-amber-300 hover:text-amber-200 underline"
          >
            Resend OTP
          </button>
        </div>

        {/* Demo Hint */}
        <p className="mt-4 text-[10px] text-slate-600">
          Demo OTP: <span className="text-amber-300">123456</span>
        </p>

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
