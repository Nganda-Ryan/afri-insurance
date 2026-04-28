import React from "react";

type FormButtonVariant = "primary" | "secondary" | "outline" | "icon";
type FormButtonSize = "md" | "lg";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FormButtonVariant;
  size?: FormButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variantClass: Record<FormButtonVariant, string> = {
  primary:
    "border-brand-600 bg-brand-600 text-white hover:bg-brand-700 dark:border-brand-500 dark:bg-brand-500 dark:hover:bg-brand-600",
  secondary:
    "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200",
  outline:
    "border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5",
  icon: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5",
};

const sizeClass: Record<FormButtonSize, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-sm",
};

export default function FormButton({
  variant = "secondary",
  size = "lg",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}: FormButtonProps) {
  const isDisabled = disabled || isLoading;
  const iconOnly = variant === "icon";
  const iconSizeClasses = iconOnly
    ? "h-12 w-12 rounded-lg p-0"
    : "rounded-full";

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 border font-medium shadow-theme-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${sizeClass[size]} ${iconSizeClasses} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {!iconOnly ? children : null}
          {icon && iconPosition === "right" && icon}
        </>
      )}
      {isLoading && !iconOnly ? children : null}
    </button>
  );
}
