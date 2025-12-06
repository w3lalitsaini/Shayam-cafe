import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  // Basic SEO: update page title when About mounts
  useEffect(() => {
    document.title =
      "About Shree Shayam Cafe | Best Cafe Near CLC, Sikar, Rajasthan";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            About Shree Shayam Cafe
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            A cozy, chai & snacks cafe near CLC, Sikar.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Shree Shayam Cafe is a friendly spot near CLC, Sikar where students,
            coaching aspirants, and locals come together for hot chai, fresh
            snacks and peaceful breaks between study sessions.
          </p>
        </header>

        {/* Intro section */}
        <section
          className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]"
          aria-labelledby="about-story-heading"
        >
          <article className="space-y-4 text-sm text-slate-300">
            <h2
              id="about-story-heading"
              className="text-sm font-semibold text-slate-50 sm:text-base"
            >
              How Shree Shayam Cafe started
            </h2>
            <p>
              At{" "}
              <strong className="font-semibold text-amber-300">
                Shree Shayam Cafe
              </strong>
              , the idea was simple: create a clean, comfortable cafe right next
              to the coaching hustle of CLC, Sikar — a place where students and
              working professionals can sit, relax, study, and recharge without
              feeling rushed.
            </p>
            <p>
              The seating, lighting and layout are designed for{" "}
              <span className="text-amber-300">real daily use</span>: long
              self-study sessions, group discussions, casual meetings, or a
              quick chai break between classes. Some guests drop in for 10
              minutes, others spend hours here with books and notebooks open.
            </p>
            <p>
              We serve hot chai, coffee, cold drinks and simple, tasty snacks
              that feel home-like — not heavy, oily fast food. The goal is to
              keep you fresh, not sleepy, so you can go back to your studies or
              work with better focus.
            </p>
            <p>
              If you&apos;re searching for a calm{" "}
              <strong>cafe near CLC Sikar</strong> to sit, study or hang out
              with friends, Shree Shayam Cafe is built exactly for you.
            </p>
          </article>

          {/* Image / visual block */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-amber-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
                <img
                  src="/images/about/about.png"
                  alt="Inside view of Shree Shayam Cafe near CLC, Sikar with cozy seating and warm lighting."
                  className="h-64 w-full object-cover sm:h-80"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats & highlights */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
            Why people choose Shree Shayam Cafe
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            A cafe designed for students and locals around CLC, Sikar — peaceful
            vibe, clean food and reliable service.
          </p>

          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-semibold text-amber-300">2019</p>
              <p className="mt-1 text-xs font-medium text-slate-200">
                Serving near CLC since
              </p>
              <p className="mt-2 text-xs text-slate-400">
                From a small idea to a regular hangout place for CLC students
                and Sikar locals.
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-amber-300">25+</p>
              <p className="mt-1 text-xs font-medium text-slate-200">
                Chai, coffee & snacks
              </p>
              <p className="mt-2 text-xs text-slate-400">
                From classic chai and coffee to cold beverages and quick
                snacks—perfect for breaks between classes.
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-amber-300">4.8★</p>
              <p className="mt-1 text-xs font-medium text-slate-200">
                Loved by students & locals
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Guests appreciate the calm environment, friendly staff and
                student-friendly pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-10" aria-labelledby="values-heading">
          <h2
            id="values-heading"
            className="text-sm font-semibold text-slate-50 sm:text-base"
          >
            What we care about
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            These values guide how we run Shree Shayam Cafe every day.
          </p>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-amber-300">
                Students first
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Most of our guests are CLC and nearby coaching students. We
                respect your time, focus and budget.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-amber-300">
                Clean & consistent food
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                We focus on simple, fresh and hygienic food instead of over
                complicated menus. Taste and cleanliness stay consistent.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-amber-300">
                Calm, not noisy
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                No loud DJ, no chaos. Just a peaceful space where you can talk,
                think or study without disturbance.
              </p>
            </article>
          </div>
        </section>

        {/* Team / Founders */}
        <section className="mt-10" aria-labelledby="team-heading">
          <h2
            id="team-heading"
            className="text-sm font-semibold text-slate-50 sm:text-base"
          >
            The team behind the counter
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            A small crew making sure every cup and plate feels served with care.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {/* Person 1 */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <img
                src="/images/about/11.jpg"
                alt="Cafe owner and lead at Shree Shayam Cafe."
                className="mx-auto mb-3 h-32 w-32 rounded-full border border-slate-700 object-cover"
                loading="lazy"
              />
              <p className="text-sm font-semibold text-slate-100">
                Shree Shayam Team Lead
              </p>
              <p className="text-[11px] text-amber-300">
                Owner &amp; Head Host
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Welcomes guests, listens to feedback and keeps the cafe running
                smoothly day to day.
              </p>
            </article>

            {/* Person 2 */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <img
                src="/images/about/12.jpg"
                alt="Staff member managing daily operations at Shree Shayam Cafe."
                className="mx-auto mb-3 h-32 w-32 rounded-full border border-slate-700 object-cover"
                loading="lazy"
              />
              <p className="text-sm font-semibold text-slate-100">
                Operations & Service
              </p>
              <p className="text-[11px] text-amber-300">
                Orders &amp; Guest Experience
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Makes sure orders are on time, tables are clean, and guests feel
                comfortable sitting longer.
              </p>
            </article>

            {/* Person 3 */}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <img
                src="/images/about/13.JPG"
                alt="Cafe team at Shree Shayam Cafe in Sikar."
                className="mx-auto mb-3 h-32 w-32 rounded-full border border-slate-700 object-cover"
                loading="lazy"
              />
              <p className="text-sm font-semibold text-slate-100">
                Shree Shayam Cafe Team
              </p>
              <p className="text-[11px] text-amber-300">
                Kitchen &amp; counter crew
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                The people preparing chai, snacks and greeting you with a smile
                every time you walk in.
              </p>
            </article>
          </div>
        </section>

        {/* Call to action + internal links */}
        <section className="mt-10 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
            Visit Shree Shayam Cafe near CLC, Sikar ☕
          </h2>
          <p className="mt-2 text-xs text-slate-300">
            We&apos;re open every day from{" "}
            <span className="text-amber-300">8:00 AM to 11:00 PM</span>. Drop in
            before or after your coaching, or bring your friends for an evening
            chai break.
          </p>
          <div className="mt-3 space-y-1 text-xs text-slate-300">
            <p>
              <span className="font-semibold text-amber-300">Address:</span>{" "}
              Near CLC, Sikar, Rajasthan
            </p>
            <p>
              <span className="font-semibold text-amber-300">Contact:</span>{" "}
              9887374746 · sainilalit275@gmail.com
            </p>
            <p className="mt-1">
              <span className="font-semibold text-amber-300">
                Plan your first visit:
              </span>{" "}
              <Link
                to="/menu"
                className="underline decoration-amber-400/70 underline-offset-2 hover:text-amber-300"
              >
                Explore the full menu
              </Link>{" "}
              ·{" "}
              <Link
                to="/order"
                className="underline decoration-amber-400/70 underline-offset-2 hover:text-amber-300"
              >
                Order online for takeaway
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
