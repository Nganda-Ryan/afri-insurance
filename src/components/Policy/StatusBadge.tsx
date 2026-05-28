import React from "react";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.trim().toLowerCase();
  const isDisabled = normalized === "disabled";

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  if (isDisabled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-200">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-950/80 dark:text-green-200">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      {label}
    </span>
  );
}
