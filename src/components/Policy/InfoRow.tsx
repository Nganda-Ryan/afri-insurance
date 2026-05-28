import React from "react";

interface InfoRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-b-0 dark:border-gray-800">
      {icon && (
        <div className="mt-0.5 shrink-0 text-brand-secondary dark:text-orange-400">{icon}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="mt-0.5 wrap-break-words text-sm font-semibold text-text-main dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}
