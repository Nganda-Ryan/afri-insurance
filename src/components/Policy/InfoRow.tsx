import React from "react";

interface InfoRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      {icon && (
        <div className="text-brand-secondary mt-0.5 shrink-0">{icon}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-semibold text-text-main mt-0.5 wrap-break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
