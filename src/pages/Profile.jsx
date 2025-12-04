import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // if no user, send to signin
        navigate("/auth/signin");
      }
    } catch (err) {
      console.error("Error reading user from localStorage", err);
      navigate("/auth/signin");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading profile...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("bh_user");
    navigate("/auth/signin");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your Profile
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          View your basic account details. This is using demo data from
          <code> localStorage["bh_user"] </code>.
        </p>

        <div className="mt-6 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
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

          <p className="mt-4 text-[11px] text-slate-500">
            Later, you can replace this with real data from your backend (e.g.{" "}
            <code>GET /api/me</code>) instead of relying on
            <code> localStorage</code>.
          </p>

          <button
            onClick={handleLogout}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
