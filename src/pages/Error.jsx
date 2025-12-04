import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  const status = error?.status || 404;
  const title = status === 404 ? "Page not found" : "Something went wrong";
  const message =
    status === 404
      ? "The page you’re looking for doesn’t exist or has been moved."
      : error?.statusText || "Unexpected error occurred. Please try again.";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center">
      <div className="mx-auto max-w-md text-center px-4">
        {/* Error Code */}
        <p className="text-[70px] font-extrabold text-amber-400 opacity-80">
          {status}
        </p>

        {/* Title */}
        <h1 className="mt-1 text-xl font-semibold">{title}</h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-slate-400">{message}</p>

        {/* Visual */}
        <div className="mx-auto my-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-4xl">
          ☕
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-full bg-amber-400 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition"
          >
            Back to Home
          </Link>

          <Link
            to="/menu"
            className="rounded-full border border-slate-700 px-5 py-2 text-xs text-slate-200 hover:border-amber-400 hover:text-amber-300 transition"
          >
            View Menu
          </Link>
        </div>

        {/* Developer detail (optional) */}
        {error && (
          <p className="mt-4 text-[10px] text-slate-600">
            {error?.message || error?.statusText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Error;
