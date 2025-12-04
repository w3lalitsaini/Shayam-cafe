import React, { useState } from "react";

const Reservations = () => {
  const [reservationType, setReservationType] = useState("Dine-in"); // Dine-in / Group / Work
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [recentReservations, setRecentReservations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time || !name || !phone) {
      window.alert(
        "Please fill all required fields (date, time, name, phone)."
      );
      return;
    }

    const newReservation = {
      id: Date.now(),
      type: reservationType,
      date,
      time,
      guests,
      name,
      phone,
      note,
    };

    setRecentReservations((prev) => [newReservation, ...prev].slice(0, 5)); // keep last 5
    window.alert(
      `Reservation requested!\n\nName: ${name}\nGuests: ${guests}\nType: ${reservationType}\nDate: ${date}\nTime: ${time}`
    );

    // Reset some fields
    setGuests(2);
    setNote("");
  };

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
    "07:00 PM",
    "09:00 PM",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
              Reservations
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Reserve your cozy corner in advance.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Whether it&apos;s a quick catch-up, a study session, or a small
              celebration, book a table so your spot is ready when you arrive.
              This is a demo reservation flow (no real backend yet).
            </p>
          </div>

          {/* Reservation type pills */}
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => setReservationType("Dine-in")}
              className={`rounded-full border px-3 py-1.5 transition ${
                reservationType === "Dine-in"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              Dine-in
            </button>
            <button
              type="button"
              onClick={() => setReservationType("Group")}
              className={`rounded-full border px-3 py-1.5 transition ${
                reservationType === "Group"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              Group / Celebration
            </button>
            <button
              type="button"
              onClick={() => setReservationType("Work")}
              className={`rounded-full border px-3 py-1.5 transition ${
                reservationType === "Work"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-400/60 hover:text-amber-200"
              }`}
            >
              Work / Study
            </button>
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          {/* Left: Reservation form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
              Reservation details
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 text-xs sm:text-sm"
            >
              {/* Date & time */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-slate-300">
                    Date <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300">
                    Time <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Guests & phone */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-slate-300">
                    Number of guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value) || 1)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300">
                    Phone number <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Name & note */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-slate-300">
                    Your name <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-slate-300">
                    Seating preference (optional)
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none focus:border-amber-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select preference
                    </option>
                    <option value="window">Near window</option>
                    <option value="inside">Inside / quiet corner</option>
                    <option value="outdoor">Outdoor seating</option>
                    <option value="no-pref">No preference</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-slate-300">
                  Special notes (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="E.g. birthday decoration, need power sockets, prefer quiet corner etc."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
              >
                Request Reservation (Demo)
              </button>

              <p className="text-[11px] text-slate-500">
                This is a frontend-only demo. Later you can send this data to
                your Express + MongoDB backend and show confirmation or
                email/SMS notifications to guests.
              </p>
            </form>
          </div>

          {/* Right: info & recent reservations */}
          <div className="flex flex-col gap-4">
            {/* Time slots */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                Popular time slots
              </h2>
              <p className="mt-1 text-[11px] text-slate-400">
                These are some typical busy hours. Try booking a bit earlier for
                better chances of getting your preferred spot.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slotToInputTime(slot))}
                    className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition"
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-slate-900 p-3 text-[11px] text-slate-400">
                <p>
                  <span className="font-semibold text-amber-300">
                    Same-day bookings:
                  </span>{" "}
                  For same day reservations after 8 PM, it&apos;s better to call
                  us directly so we can confirm availability in real-time.
                </p>
              </div>
            </div>

            {/* Recent reservations (local-only) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                Your recent reservations (demo)
              </h2>
              {recentReservations.length === 0 ? (
                <p className="mt-2 text-[11px] text-slate-500">
                  You haven&apos;t made any reservations in this session yet.
                  Submit the form to see them listed here.
                </p>
              ) : (
                <div className="mt-3 space-y-3 text-[11px]">
                  {recentReservations.map((res) => (
                    <div
                      key={res.id}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-100">
                          {res.name} • {res.guests} guest
                          {res.guests > 1 ? "s" : ""}
                        </p>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">
                          {res.type}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-400">
                        {res.date} at {res.time}
                      </p>
                      {res.note && (
                        <p className="mt-1 text-slate-500 line-clamp-2">
                          Note: {res.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper: convert "07:00 PM" to "19:00" for input[type=time]
function slotToInputTime(label) {
  // Very simple converter based on pattern like "07:00 PM"
  const [time, meridian] = label.split(" ");
  let [hour, minute] = time.split(":").map((x) => parseInt(x, 10));

  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;

  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default Reservations;
