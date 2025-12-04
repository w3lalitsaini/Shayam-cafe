import React, { useState } from "react";

const Settings = () => {
  const [owner, setOwner] = useState({
    name: "Cafe Owner",
    email: "owner@brewhaven.cafe",
    phone: "+91-98765-43210",
  });

  const [cafe, setCafe] = useState({
    name: "Brew Haven Café",
    address: "MG Road, Jaipur, Rajasthan",
    openingTime: "08:00",
    closingTime: "23:00",
  });

  const [toggles, setToggles] = useState({
    onlineOrders: true,
    reservations: true,
    notifications: true,
  });

  const handleOwnerChange = (e) => {
    setOwner((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCafeChange = (e) => {
    setCafe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    window.alert("Settings saved (demo only, not persisted).");
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
          Update owner details, café information, and basic preferences.
        </p>
      </header>

      <form
        onSubmit={handleSave}
        className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs sm:text-sm"
      >
        {/* Owner info */}
        <section>
          <h2 className="text-sm font-semibold text-slate-50">Owner profile</h2>
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
          className="mt-2 w-full rounded-full bg-amber-400 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition"
        >
          Save changes (Demo)
        </button>

        <p className="text-[10px] text-slate-600">
          These settings are currently stored only in local React state. Later,
          you can sync them with your backend for the owner account.
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
