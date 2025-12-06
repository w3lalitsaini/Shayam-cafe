import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const roleFilters = ["All", "User", "Owner", "Admin"];
const statusFilters = ["All", "Active", "Suspended"];

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [banLoadingId, setBanLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // 👈 full details panel

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const token = localStorage.getItem("bh_token");
        if (!token) {
          setErrorMsg("You must be signed in as admin to view users.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!Array.isArray(data)) {
          throw new Error(
            data.message || "Unexpected response from /admin/users"
          );
        }

        // Expecting array of users from backend
        // Shape: { _id, name, email, phone, role, status, isVerified, createdAt, lastLoginAt, ... }
        const mapped = data.map((u) => ({
          id: u._id,
          name: u.name || "—",
          email: u.email || "—",
          phone: u.phone || "—",
          role: u.role || "User",
          status: u.status || (u.isSuspended ? "Suspended" : "Active"),
          isVerified: !!u.isVerified,
          createdAt: u.createdAt
            ? new Date(u.createdAt).toLocaleDateString("en-IN")
            : "-",
          lastLoginAt: u.lastLoginAt
            ? new Date(u.lastLoginAt).toLocaleString("en-IN")
            : null,
          // any extra stats your backend might send (optional)
          totalOrders: u.totalOrders || u.stats?.totalOrders || 0,
          totalSpent: u.totalSpent || u.stats?.totalSpent || 0,
          raw: u, // keep original object for full detail view
        }));

        setAllUsers(mapped);
      } catch (err) {
        console.error("Admin users error:", err);
        setErrorMsg(err.message || "Something went wrong fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Ban / suspend user
  const handleBan = async (userId, currentStatus) => {
    if (currentStatus === "Suspended") return; // already banned

    const confirmBan = window.confirm(
      "Are you sure you want to suspend this user?"
    );
    if (!confirmBan) return;

    try {
      setBanLoadingId(userId);
      const token = localStorage.getItem("bh_token");
      if (!token) {
        setErrorMsg("You must be signed in as admin to perform this action.");
        return;
      }

      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Suspended" }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to suspend user");
      }

      // Update local state
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: "Suspended" } : u))
      );

      // If their details panel is open, also update there
      setSelectedUser((prev) =>
        prev && prev.id === userId ? { ...prev, status: "Suspended" } : prev
      );
    } catch (err) {
      console.error("Ban user error:", err);
      setErrorMsg(err.message || "Failed to update user status.");
    } finally {
      setBanLoadingId(null);
    }
  };

  const filtered = allUsers.filter((u) => {
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    const query = search.toLowerCase();
    const matchSearch =
      !query ||
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.phone.toLowerCase().includes(query) ||
      (u.id && u.id.toLowerCase().includes(query));

    return matchRole && matchStatus && matchSearch;
  });

  const statusBadge = (status) => {
    if (status === "Active") return "bg-emerald-400/15 text-emerald-300";
    if (status === "Suspended") return "bg-rose-400/15 text-rose-300";
    return "bg-slate-800 text-slate-200";
  };

  const verifiedBadge = (isVerified) =>
    isVerified
      ? "bg-emerald-400/15 text-emerald-300"
      : "bg-slate-700/60 text-slate-300";

  return (
    <div>
      {/* Header */}
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
            Admin · Users
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Manage users
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            View and control all users across the platform.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs outline-none focus:border-amber-400"
          >
            {roleFilters.map((r) => (
              <option key={r} value={r}>
                Role: {r}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs outline-none focus:border-amber-400"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Error */}
      {errorMsg && (
        <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
          {errorMsg}
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone or user ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none placeholder:text-slate-500 focus:border-amber-400"
        />
      </div>

      {/* Table / list */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="hidden grid-cols-[0.9fr_1.2fr_0.9fr_0.7fr_0.7fr_0.9fr] gap-3 border-b border-slate-800 pb-2 text-[11px] text-slate-400 md:grid">
          <span>User</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Role</span>
          <span>Status</span>
          <span>Joined</span>
        </div>

        <div className="mt-2 space-y-3 text-xs">
          {loading ? (
            <p className="text-[11px] text-slate-500">Loading users...</p>
          ) : filtered.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No users found for this filter.
            </p>
          ) : (
            filtered.map((u) => (
              <div
                key={u.id}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 md:grid-cols-[0.9fr_1.2fr_0.9fr_0.7fr_0.7fr_0.9fr]"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-100">
                    {u.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {typeof u.id === "string"
                      ? u.id
                      : u.id?.toString().slice(-6)}
                  </p>
                  <span
                    className={
                      "mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium " +
                      verifiedBadge(u.isVerified)
                    }
                  >
                    {u.isVerified ? "Verified" : "Not verified"}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 break-all">
                  {u.email}
                </p>

                <p className="text-[11px] text-slate-300">{u.phone}</p>

                <p className="text-[11px] text-slate-400">{u.role}</p>

                <div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${statusBadge(
                      u.status
                    )}`}
                  >
                    {u.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-400">{u.createdAt}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(u)}
                      className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-amber-400 hover:text-amber-300 transition"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      disabled={
                        u.status === "Suspended" || banLoadingId === u.id
                      }
                      onClick={() => handleBan(u.id, u.status)}
                      className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-rose-400 hover:text-rose-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {banLoadingId === u.id
                        ? "Banning..."
                        : u.status === "Suspended"
                        ? "Banned"
                        : "Ban"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Details panel */}
      {selectedUser && (
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs sm:text-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                User details
              </p>
              <p className="text-[11px] text-slate-400">
                Full information for{" "}
                <span className="text-amber-300">{selectedUser.name}</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300 hover:border-slate-500 transition"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailBlock label="User ID" value={selectedUser.id} />
            <DetailBlock label="Role" value={selectedUser.role} />
            <DetailBlock label="Status" value={selectedUser.status} />
            <DetailBlock
              label="Email verified"
              value={selectedUser.isVerified ? "Yes" : "No"}
            />
            <DetailBlock label="Name" value={selectedUser.name} />
            <DetailBlock label="Email" value={selectedUser.email} />
            <DetailBlock label="Phone" value={selectedUser.phone} />
            <DetailBlock label="Joined on" value={selectedUser.createdAt} />
            <DetailBlock
              label="Last login"
              value={selectedUser.lastLoginAt || "—"}
            />
            <DetailBlock
              label="Total orders"
              value={
                typeof selectedUser.totalOrders === "number"
                  ? selectedUser.totalOrders
                  : "—"
              }
            />
            <DetailBlock
              label="Total spent"
              value={
                typeof selectedUser.totalSpent === "number"
                  ? `₹${selectedUser.totalSpent}`
                  : "—"
              }
            />
          </div>

          {/* If you want to show raw JSON (for debugging) */}
          {/* 
          <pre className="mt-4 max-h-48 overflow-auto rounded-xl bg-slate-900/80 p-3 text-[10px] text-slate-300">
            {JSON.stringify(selectedUser.raw, null, 2)}
          </pre>
          */}
        </section>
      )}

      <p className="mt-4 text-[11px] text-slate-500">
        This page uses <code>GET /api/admin/users</code> to load all users and{" "}
        <code>PATCH /api/admin/users/:id</code> to update status. The details
        panel lets you see all important fields for each user.
      </p>
    </div>
  );
};

const DetailBlock = ({ label, value }) => (
  <div>
    <p className="text-[11px] text-slate-400">{label}</p>
    <p className="mt-1 break-all text-xs text-slate-100">{value || "—"}</p>
  </div>
);

export default Users;
