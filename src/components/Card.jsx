// src/components/Card.jsx
import React from "react";

const Card = ({
  title,
  description,
  price,
  tag,
  badge,
  isAvailable = true,
  image,
  onAdd, // callback (parent handles auth / cart)
  buttonLabel, // optional custom label
}) => {
  const handleAddClick = () => {
    if (!isAvailable || !onAdd) return;
    onAdd();
  };

  const isDisabled = !isAvailable || !onAdd;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border bg-slate-900 shadow-sm transition
      hover:-translate-y-1 hover:shadow-md hover:shadow-amber-500/20
      ${isAvailable ? "border-slate-800" : "border-slate-700 opacity-80"}`}
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden sm:h-56">
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

        {/* Badge / availability labels */}
        {!isAvailable && (
          <span className="absolute right-2 top-2 rounded-full bg-slate-900/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Sold Out
          </span>
        )}

        {badge && isAvailable && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500/95 px-2 py-1 text-[10px] font-semibold text-slate-950 shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-50 line-clamp-1">
              {title}
            </h4>
            {tag && (
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-200">
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
            type="button"
            onClick={handleAddClick}
            disabled={isDisabled}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium transition
            ${
              isDisabled
                ? "cursor-not-allowed bg-slate-800/60 text-slate-500"
                : "bg-slate-800 text-slate-100 hover:bg-amber-400 hover:text-slate-950"
            }`}
          >
            {isAvailable ? (
              <>
                <span className="text-xs">＋</span>
                <span>{buttonLabel || "Add to Cart"}</span>
              </>
            ) : (
              "Not Available"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
