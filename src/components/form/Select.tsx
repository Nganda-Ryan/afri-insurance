import React, { useMemo, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  success?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder = "Select an option",
  value,
  onChange,
  onBlur,
  className = "",
  defaultValue = "",
  disabled = false,
  readOnly = false,
  error = false,
  success = false,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const selectedValue = isControlled ? value : internalValue;

  const stateClass = useMemo(() => {
    if (disabled || readOnly) {
      return "text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
    if (error) {
      return "text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500";
    }
    if (success) {
      return "text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500";
    }
    return selectedValue
      ? "text-gray-800 dark:text-white/90"
      : "text-gray-400 dark:text-gray-400";
  }, [disabled, error, readOnly, selectedValue, success]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (readOnly) return;
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  return (
    <select
      id={id}
      name={name}
      className={`h-11 w-full appearance-none rounded-lg border border-gray-200/80 px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${stateClass} ${className}`}
      value={selectedValue}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={disabled}
      aria-invalid={error}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
