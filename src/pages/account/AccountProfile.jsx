import React, { useEffect, useState } from "react";

const AccountProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error reading user from localStorage", err);
    }
  }, []);

  if (!user) {
    return <p className="text-sm text-slate-400">No profile data found.</p>;
  }

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
        Your Profile
      </h1>
      <p className="mt-1 text-[11px] text-slate-400">
        Basic account details stored from <code>bh_user</code>.
      </p>

      <div className="mt-4 space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[11px] text-slate-400">Name</p>
            <p className="mt-1 text-slate-100">{user.name || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Role</p>
            <p className="mt-1 text-slate-100">{user.role || "User"}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Email</p>
            <p className="mt-1 text-slate-100">{user.email || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Mobile</p>
            <p className="mt-1 text-slate-100">{user.phone || "—"}</p>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-slate-500">
          Later you can fetch deeper data from your backend, like saved
          addresses, payment methods, and preferences.
        </p>
      </div>
    </div>
  );
};

export default AccountProfile;
