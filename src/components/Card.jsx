import React from "react";

const Card = ({
  title,
  description,
  price,
  tag,
  badge,
  isAvailable = true,
  image,
}) => {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border bg-slate-900/80 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 ${
        isAvailable ? "border-slate-800" : "border-slate-900 opacity-80"
      }`}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs text-slate-500">
            No Image
          </div>
        )}

        {/* Availability / badge on image */}
        {!isAvailable && (
          <span className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Sold Out
          </span>
        )}
        {badge && isAvailable && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-1 text-[10px] font-semibold text-slate-950">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-50">{title}</h4>
            {tag && (
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">
                {tag}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-slate-400 line-clamp-3">{description}</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-amber-300">{price}</p>
          <button
            disabled={!isAvailable}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
              isAvailable
                ? "bg-slate-800 text-slate-100 hover:bg-amber-400 hover:text-slate-950"
                : "cursor-not-allowed bg-slate-800/60 text-slate-500"
            }`}
          >
            {isAvailable ? "Add to Cart" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
