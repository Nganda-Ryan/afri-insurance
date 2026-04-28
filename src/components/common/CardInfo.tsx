import React from "react";

type LabelColor = "blue" | "orange" | "default";

interface CardInfoProps {
  label: string;
  labelColor?: LabelColor;
  children: React.ReactNode;
  className?: string;
}

const labelColorStyles: Record<LabelColor, string> = {
  blue: "text-blue-700 dark:text-blue-400",
  orange: "text-orange-500 dark:text-orange-400",
  default: "text-gray-500 dark:text-gray-400",
};

const CardInfo: React.FC<CardInfoProps> = ({
  label,
  labelColor = "blue",
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg border border-border bg-white p-5 dark:bg-slate-900 ${className}`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wide ${labelColorStyles[labelColor]}`}
      >
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
};

export default CardInfo;
