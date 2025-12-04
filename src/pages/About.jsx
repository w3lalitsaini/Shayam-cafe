import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="border-b border-slate-800 pb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            About Us
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            The story behind Brew Haven Café.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            More than just coffee — Brew Haven Café was created as a cozy,
            work-friendly space for people who love good conversations, deep
            focus, and freshly brewed cups.
          </p>
        </header>

        {/* Intro section */}
        <section className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
          <div className="space-y-4 text-sm text-slate-300">
            <p>
              At <span className="text-amber-300">Brew Haven Café</span>, we
              believe a great café is not just about the coffee in your cup, but
              the feeling you carry when you leave. We wanted to build a place
              where students, founders, remote workers, and friends can sit for
              hours without feeling rushed.
            </p>
            <p>
              Every detail — from the lighting and seating, to our curated menu
              and soft lo-fi playlists — is designed to help you focus, create,
              and connect. Some guests come to grind on their laptops, others
              come to read a book or just enjoy a quiet evening with someone
              special.
            </p>
            <p>
              Our beans are sourced from Indian roasters and brewed with care by
              baristas who actually love what they do. Add to that fresh bakes,
              light snacks, and a calm ambience, and you get your new favorite
              third place between home and work.
            </p>
          </div>

          {/* Image / visual block */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-amber-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
                {/* Replace src with your actual local about image */}
                <img
                  src="/images/about/about.png"
                  alt="Inside view of Brew Haven Café"
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
            What makes us different
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            A café built with creators, students, and remote workers in mind.
          </p>

          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-semibold text-amber-300">2019</p>
              <p className="mt-1 text-xs font-medium text-slate-200">
                Year we started
              </p>
              <p className="mt-2 text-xs text-slate-400">
                From a small corner idea to a full café space in the heart of
                the city.
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-amber-300">20+</p>
              <p className="mt-1 text-xs font-medium text-slate-200">
                Coffee & tea options
              </p>
              <p className="mt-2 text-xs text-slate-400">
                From classic espresso to seasonal specials and comfort teas.
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-amber-300">4.8★</p>
              <p className="mt-1 text-xs font-medium text-slate-200">
                Average guest rating
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Loved for the ambience, quality brews, and respectful staff.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
            Our values
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            The principles that guide how we run Brew Haven every single day.
          </p>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-amber-300">
                People first
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Every guest should feel welcome — whether you&apos;re here for
                five minutes or five hours.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-amber-300">
                Quality over shortcuts
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                We don&apos;t compromise on beans, ingredients, or how your
                drink is prepared.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-amber-300">
                Calm, not chaos
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Brew Haven is intentionally designed to be a quiet, focused and
                comfortable space.
              </p>
            </div>
          </div>
        </section>

        {/* Team / Founders */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
            The team behind the counter
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            A small crew that cares about every cup and every guest.
          </p>

          <div className="mt-4 grid gap-6 grid-cols-2 sm:grid-cols-3">
            {/* Person 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <img
                src="/images/about/11.jpg"
                alt="Aarya Sharma - Founder & Head Barista"
                className="mx-auto mb-3 h-32 w-32 rounded-full object-cover border border-slate-700"
                loading="lazy"
              />
              <p className="text-sm font-semibold text-slate-100">
                Aarya Sharma
              </p>
              <p className="text-[11px] text-amber-300">
                Founder & Head Barista
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Obsessed with espresso, latte art, and building spaces people
                actually enjoy sitting in.
              </p>
            </div>

            {/* Person 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <img
                src="/images/about/12.jpg"
                alt="Rahul Verma - Operations Manager"
                className="mx-auto mb-3 h-32 w-32 rounded-full object-cover border border-slate-700"
                loading="lazy"
              />
              <p className="text-sm font-semibold text-slate-100">
                Rahul Verma
              </p>
              <p className="text-[11px] text-amber-300">
                Operations & Experience
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Makes sure your orders are smooth, seats are comfortable, and
                the music is always perfect.
              </p>
            </div>

            {/* Person 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <img
                src="/images/about/13.JPG"
                alt="Brew Haven Café team"
                className="mx-auto mb-3 h-32 w-32 rounded-full object-cover border border-slate-700"
                loading="lazy"
              />
              <p className="text-sm font-semibold text-slate-100">
                Team Brew Haven
              </p>
              <p className="text-[11px] text-amber-300">
                Baristas & kitchen crew
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                The people steaming milk, pulling shots, plating desserts, and
                smiling behind the counter.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mt-10 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
            Come say hi in person ☕
          </h2>
          <p className="mt-2 text-xs text-slate-300">
            We&apos;re open every day from{" "}
            <span className="text-amber-300">8:00 AM to 11:00 PM</span>. Drop by
            for a quick latte, a long work session, or just to explore our menu.
            Your next favourite corner might be waiting here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
