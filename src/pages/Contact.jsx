import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      window.alert("Please fill your name, email and message.");
      return;
    }

    window.alert(
      `Message sent (demo only)!\n\nName: ${form.name}\nEmail: ${
        form.email
      }\nSubject: ${form.subject || "-"}`
    );

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
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
            Have a question about our menu, reservations, or want to host a
            small event at Brew Haven Café? Drop us a message or reach out
            directly using the details below.
          </p>
        </header>

        {/* Main layout */}
        <section className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          {/* Left: contact form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
              Send us a message
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              We usually respond within a few hours during café working time.
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

              <div>
                <label className="mb-1 block text-slate-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Reservation, menu, feedback, collaboration..."
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
                className="mt-1 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
              >
                Send Message (Demo)
              </button>

              <p className="text-[11px] text-slate-500">
                This form is currently frontend-only. Later you can send this
                data to your Express backend (e.g. via an API route) and email
                it to yourself or store it in MongoDB.
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
                    Brew Haven Café
                    <br />
                    MG Road, Jaipur, Rajasthan
                    <br />
                    (demo address – replace with real one)
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Contact
                  </p>
                  <p className="mt-1 text-slate-300">
                    Phone: +91-98765-43210
                    <br />
                    Email: hello@brewhaven.cafe
                    <br />
                    Instagram: @brewhaven.cafe
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
                    Best time for work/study: 9:00 AM – 1:00 PM and 4:00 PM –
                    7:00 PM.
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
                You can embed a live Google Map here using an iframe when
                you&apos;re ready.
              </p>
              <div className="mt-3 h-44 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-[11px] text-slate-500 flex items-center justify-center">
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
                    Do you offer Wi-Fi and charging points?
                  </p>
                  <p className="mt-1 text-slate-400">
                    Yes, we have free Wi-Fi and multiple charging points around
                    the café. Just ask our staff if you need help finding a plug
                    point.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Can I host a small meetup or event?
                  </p>
                  <p className="mt-1 text-slate-400">
                    Definitely! For small meetups (5–20 people), contact us at{" "}
                    <span className="text-amber-300">hello@brewhaven.cafe</span>{" "}
                    with your date, time, and rough headcount.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">
                    Do you take bulk orders?
                  </p>
                  <p className="mt-1 text-slate-400">
                    Yes, we handle bulk orders for offices and events. Share
                    your requirements through the form and we&apos;ll get back
                    with options and pricing.
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
