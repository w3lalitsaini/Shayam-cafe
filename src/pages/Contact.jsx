// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    document.title =
      "Contact Shree Shayam Cafe | Cafe Near CLC Sikar, Rajasthan";
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill your name, email and message.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to send your message.");
      }

      setSuccessMsg(
        "Thank you for reaching out! Your message has been sent successfully."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Contact
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s stay in touch.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Have a question about our menu, bulk orders, or want to plan a small
            get-together at{" "}
            <span className="text-amber-300">Shree Shayam Cafe</span> near CLC,
            Sikar? Send us a message and we&apos;ll get back to you.
          </p>
        </header>

        {/* Alerts */}
        {errorMsg && (
          <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
            {successMsg}
          </div>
        )}

        {/* Main layout */}
        <section className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          {/* Left: contact form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
              Send us a message
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              We usually respond within a few hours during cafe timings.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 text-xs sm:text-sm"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-slate-300">
                    Your name <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300">
                    Email <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Phone (optional but useful) */}
              <div>
                <label className="mb-1 block text-slate-300">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your contact number"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-slate-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Feedback, order enquiry, collaboration..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-slate-300">
                  Message <span className="text-amber-300">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-[11px] text-slate-500">
                Your message will be stored securely and forwarded to the cafe
                owner&apos;s email.
              </p>
            </form>
          </div>

          {/* Right: contact info + map + small FAQ */}
          <div className="flex flex-col gap-4">
            {/* Contact details */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                Visit or reach us
              </h2>

              <div className="mt-3 space-y-3 text-xs text-slate-300">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Address
                  </p>
                  <p className="mt-1 text-slate-300">
                    Shree Shayam Cafe
                    <br />
                    Near CLC, Sikar, Rajasthan
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Contact
                  </p>
                  <p className="mt-1 text-slate-300">
                    Phone: 9887374746
                    <br />
                    Email: sainilalit275@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Timings
                  </p>
                  <p className="mt-1 text-slate-300">
                    Monday – Sunday: 8:00 AM – 11:00 PM
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Popular student hours: before and after coaching batches at
                    CLC.
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                Find us on the map
              </h2>
              <p className="mt-1 text-[11px] text-slate-400">
                You can embed a live Google Map for &quot;Shree Shayam Cafe,
                Near CLC, Sikar&quot; here using an iframe when you&apos;re
                ready.
              </p>
              <div className="mt-3 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-[11px] text-slate-500">
                Map placeholder
                <br />
                (Google Maps iframe goes here later)
              </div>
            </div>

            {/* Small FAQ */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                Quick questions
              </h2>
              <div className="mt-3 space-y-3 text-[11px] text-slate-300">
                <div>
                  <p className="font-semibold text-slate-100">
                    Is Shree Shayam Cafe student-friendly?
                  </p>
                  <p className="mt-1 text-slate-400">
                    Yes, most of our guests are students from CLC and nearby
                    institutes. We keep pricing, seating and ambience friendly
                    for long study sessions.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Can I host a small meetup or group study?
                  </p>
                  <p className="mt-1 text-slate-400">
                    Definitely! For small groups, just call{" "}
                    <span className="text-amber-300">9887374746</span> or send a
                    message through this form with preferred time and number of
                    people.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Do you take bulk tea/snacks orders?
                  </p>
                  <p className="mt-1 text-slate-400">
                    Yes, we handle bulk orders for batches, coaching events and
                    small functions. Share your requirement via the form and
                    we&apos;ll confirm pricing and timing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
