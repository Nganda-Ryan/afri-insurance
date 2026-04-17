import React from "react";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
