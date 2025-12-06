import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AccountProfile = () => {
  const [user, setUser] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =========================
  // 1. Fetch profile from API
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        const token = localStorage.getItem("bh_token");
        if (!token) {
          setErrorMsg("You must be signed in to view your profile.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/account/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        const profileUser = data.user || data;

        setUser(profileUser);
        setProfileForm({
          name: profileUser.name || "",
          phone: profileUser.phone || "",
        });

        // also sync localStorage "bh_user" so Header / Dashboard sees updated data
        const stored = localStorage.getItem("bh_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          localStorage.setItem(
            "bh_user",
            JSON.stringify({
              ...parsed,
              name: profileUser.name,
              email: profileUser.email,
              phone: profileUser.phone,
              role: profileUser.role,
            })
          );
        }
      } catch (err) {
        console.error("Account profile error:", err);
        setErrorMsg(
          err.message || "Something went wrong loading your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================
  // 2. Profile update handler
  // =========================
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in to update your profile.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`${API_BASE}/account/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileForm.name,
          phone: profileForm.phone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      const updatedUser = data.user || data;
      setUser(updatedUser);
      setSuccessMsg("Profile updated successfully.");

      // update localStorage bh_user as well
      const stored = localStorage.getItem("bh_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          "bh_user",
          JSON.stringify({
            ...parsed,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
          })
        );
      }
    } catch (err) {
      console.error("Update profile error:", err);
      setErrorMsg(err.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // 3. Change password handler
  // =========================
  const handlePwdChange = (e) => {
    const { name, value } = e.target;
    setPwdForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!pwdForm.currentPassword || !pwdForm.newPassword) {
      setErrorMsg("Please fill all password fields.");
      return;
    }

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in to change password.");
      return;
    }

    try {
      setPwdSaving(true);

      const res = await fetch(`${API_BASE}/account/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setSuccessMsg("Password updated successfully.");
      setPwdForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Change password error:", err);
      setErrorMsg(err.message || "Could not change password.");
    } finally {
      setPwdSaving(false);
    }
  };

  // =========================
  // 4. UI
  // =========================
  if (loading) {
    return (
      <p className="text-sm text-slate-400">
        Loading your profile, please wait...
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-sm text-slate-400">
        No profile data found. Try signing in again.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
        Your Profile
      </h1>
      <p className="mt-1 text-[11px] text-slate-400">
        Manage your account details and password.
      </p>

      {(errorMsg || successMsg) && (
        <div className="mt-3 space-y-2 text-[11px]">
          {errorMsg && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-rose-100">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-100">
              {successMsg}
            </div>
          )}
        </div>
      )}

      {/* Profile form */}
      <div className="mt-4 space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs sm:text-sm">
        <h2 className="text-sm font-semibold text-slate-50">Profile details</h2>
        <form
          onSubmit={handleProfileSubmit}
          className="mt-3 grid gap-4 sm:grid-cols-2"
        >
          <div>
            <p className="mb-1 text-[11px] text-slate-400">Full name</p>
            <input
              type="text"
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <p className="mb-1 text-[11px] text-slate-400">Email</p>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400 outline-none"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              Email is fixed here. You can add an &quot;update email&quot; flow
              later if you want.
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] text-slate-400">Mobile</p>
            <input
              type="tel"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <p className="mb-1 text-[11px] text-slate-400">Role</p>
            <input
              type="text"
              value={user.role || "User"}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400 outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-amber-400 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        </form>
      </div>

      {/* Change password section */}
      <div className="mt-6 space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs sm:text-sm">
        <h2 className="text-sm font-semibold text-slate-50">Change password</h2>
        <p className="text-[11px] text-slate-400">
          Update your password to keep your account secure.
        </p>

        <form
          onSubmit={handlePwdSubmit}
          className="mt-3 grid gap-3 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <p className="mb-1 text-[11px] text-slate-400">Current password</p>
            <input
              type="password"
              name="currentPassword"
              value={pwdForm.currentPassword}
              onChange={handlePwdChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <p className="mb-1 text-[11px] text-slate-400">New password</p>
            <input
              type="password"
              name="newPassword"
              value={pwdForm.newPassword}
              onChange={handlePwdChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <p className="mb-1 text-[11px] text-slate-400">
              Confirm new password
            </p>
            <input
              type="password"
              name="confirmPassword"
              value={pwdForm.confirmPassword}
              onChange={handlePwdChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none focus:border-amber-400"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={pwdSaving}
              className="rounded-full bg-slate-800 px-4 py-2 text-[11px] font-semibold text-slate-100 hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pwdSaving ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-4 text-[10px] text-slate-600">
        This page uses <code>GET /api/account/profile</code>,{" "}
        <code>PATCH /api/account/profile</code> and{" "}
        <code>PATCH /api/account/change-password</code>. You can extend it later
        with addresses, preferences, saved payment methods, etc.
      </p>
    </div>
  );
};

export default AccountProfile;
