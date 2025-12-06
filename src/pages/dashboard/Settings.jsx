import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Settings = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [cafe, setCafe] = useState({
    name: "",
    address: "",
    openingTime: "08:00",
    closingTime: "23:00",
  });

  const [toggles, setToggles] = useState({
    onlineOrders: true,
    reservations: true,
    notifications: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ========= LOAD SETTINGS FROM API ============
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        const token = localStorage.getItem("bh_token");
        if (!token) {
          setErrorMsg("You must be signed in as Admin to view settings.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.message || "Failed to load settings.");
        }

        if (data.owner) {
          setOwner({
            name: data.owner.name || "",
            email: data.owner.email || "",
            phone: data.owner.phone || "",
          });
        }

        if (data.cafe) {
          setCafe({
            name: data.cafe.name || "",
            address: data.cafe.address || "",
            openingTime: data.cafe.openingTime || "08:00",
            closingTime: data.cafe.closingTime || "23:00",
          });
        }

        if (data.features) {
          setToggles({
            onlineOrders:
              typeof data.features.onlineOrders === "boolean"
                ? data.features.onlineOrders
                : true,
            reservations:
              typeof data.features.reservations === "boolean"
                ? data.features.reservations
                : true,
            notifications:
              typeof data.features.notifications === "boolean"
                ? data.features.notifications
                : true,
          });
        }
      } catch (err) {
        console.error("Fetch settings error:", err);
        setErrorMsg(err.message || "Could not load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ========= HANDLERS ============

  const handleOwnerChange = (e) => {
    setOwner((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCafeChange = (e) => {
    setCafe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const token = localStorage.getItem("bh_token");
    if (!token) {
      setErrorMsg("You must be signed in as Admin to update settings.");
      return;
    }

    const payload = {
      owner: {
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
      },
      cafe: {
        name: cafe.name,
        address: cafe.address,
        openingTime: cafe.openingTime,
        closingTime: cafe.closingTime,
      },
      features: {
        onlineOrders: toggles.onlineOrders,
        reservations: toggles.reservations,
        notifications: toggles.notifications,
      },
    };

    try {
      setSaving(true);

      const res = await fetch(`${API_BASE}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to save settings.");
      }

      setSuccessMsg("Settings saved successfully.");
    } catch (err) {
      console.error("Save settings error:", err);
      setErrorMsg(err.message || "Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
          Settings
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          Café & account settings
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Update owner details, café information, and platform preferences.
        </p>
      </header>

      {loading && (
        <div className="mb-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-[11px] text-slate-300">
          Loading settings...
        </div>
      )}

      {errorMsg && (
        <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
          {successMsg}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs sm:text-sm"
      >
        {/* Owner info */}
        <section>
          <h2 className="text-sm font-semibold text-slate-50">Owner profile</h2>
          <p className="mt-1 text-[11px] text-slate-500">
            This information helps us contact you for important account updates.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-slate-300">Name</label>
              <input
                type="text"
                name="name"
                value={owner.name}
                onChange={handleOwnerChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                value={owner.email}
                onChange={handleOwnerChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-300">Mobile number</label>
              <input
                type="tel"
                name="phone"
                value={owner.phone}
                onChange={handleOwnerChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </section>

        {/* Cafe info */}
        <section>
          <h2 className="text-sm font-semibold text-slate-50">
            Café information
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            This appears on the website and can be used for Google Maps, etc.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-slate-300">Café name</label>
              <input
                type="text"
                name="name"
                value={cafe.name}
                onChange={handleCafeChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-slate-300">Address</label>
              <textarea
                name="address"
                rows={2}
                value={cafe.address}
                onChange={handleCafeChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-300">Opening time</label>
              <input
                type="time"
                name="openingTime"
                value={cafe.openingTime}
                onChange={handleCafeChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-300">Closing time</label>
              <input
                type="time"
                name="closingTime"
                value={cafe.closingTime}
                onChange={handleCafeChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </section>

        {/* Toggles */}
        <section>
          <h2 className="text-sm font-semibold text-slate-50">
            Features & preferences
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Control what features are available to customers.
          </p>
          <div className="mt-3 space-y-2 text-xs">
            <ToggleRow
              label="Accept online orders"
              description="Customers can place pickup orders from the website."
              checked={toggles.onlineOrders}
              onChange={() => handleToggle("onlineOrders")}
            />
            <ToggleRow
              label="Allow reservations"
              description="Customers can reserve tables online."
              checked={toggles.reservations}
              onChange={() => handleToggle("reservations")}
            />
            <ToggleRow
              label="Email notifications"
              description="Send email alerts for new orders and bookings."
              checked={toggles.notifications}
              onChange={() => handleToggle("notifications")}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={saving || loading}
          className="mt-2 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving changes..." : "Save changes"}
        </button>

        <p className="text-[10px] text-slate-600">
          These settings are synced with your backend (
          <code>GET /api/settings</code> and <code>PUT /api/settings</code>) and
          can be used across your dashboard and public site.
        </p>
      </form>
    </div>
  );
};

const ToggleRow = ({ label, description, checked, onChange }) => (
  <label className="flex items-start justify-between gap-3 rounded-xl bg-slate-950/70 p-3">
    <div>
      <p className="text-[11px] font-semibold text-slate-100">{label}</p>
      <p className="mt-1 text-[11px] text-slate-400">{description}</p>
    </div>
    <div className="pt-1">
      <button
        type="button"
        onClick={onChange}
        className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
          checked ? "bg-amber-400" : "bg-slate-700"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-slate-950 transition ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  </label>
);

export default Settings;
