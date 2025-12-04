import React, { useEffect, useState } from "react";

const demoReservations = [
  {
    id: "UR-1001",
    userId: "u1",
    date: "2025-12-05",
    time: "19:30",
    guests: 3,
    type: "Dine-in",
    status: "Confirmed",
  },
];

const AccountReservations = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        const userRes = demoReservations.filter((r) => r.userId === u.id);
        setReservations(userRes);
      }
    } catch (err) {
      console.error("Error reading user / reservations", err);
    }
  }, []);

  const badgeColor = (status) => {
    if (status === "Confirmed") return "bg-emerald-400/15 text-emerald-300";
    if (status === "Pending") return "bg-amber-400/15 text-amber-300";
    if (status === "Cancelled") return "bg-rose-400/15 text-rose-300";
    return "bg-slate-800 text-slate-200";
  };

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
        My Reservations
      </h1>
      <p className="mt-1 text-[11px] text-slate-400">
        Your upcoming and past table bookings (demo data).
      </p>

      <div className="mt-4 space-y-3 text-xs">
        {reservations.length === 0 ? (
          <p className="text-[11px] text-slate-500">
            You don&apos;t have any reservations yet.
          </p>
        ) : (
          reservations.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    {r.date} · {r.time}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {r.guests} guest{r.guests > 1 ? "s" : ""} • {r.type}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${badgeColor(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="mt-3 text-[10px] text-slate-600">
        Later, connect this to <code>GET /api/my/reservations</code> using the
        logged-in user.
      </p>
    </div>
  );
};

export default AccountReservations;
