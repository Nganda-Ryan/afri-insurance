import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import DateOption = flatpickr.Options.DateOption;
import FlatpickrInstance = flatpickr.Instance;

import Label from "./Label";
import { CalenderIcon } from "../../icons";

type DatePickerOnChange =
  | ((value: string) => void)
  | ((dates: Date[], value: string, instance: FlatpickrInstance) => void);

type PropsType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: DatePickerOnChange;
  defaultDate?: DateOption;
  value?: string;
  min?: string;
  max?: string;
  label?: string;
  error?: boolean;
  success?: boolean;
  appendToBody?: boolean;
};

export default function DatePicker({
  id,
  mode = "single",
  onChange,
  label,
  defaultDate,
  placeholder,
  value,
  min,
  max,
  className = "",
  disabled = false,
  error = false,
  success = false,
  appendToBody = false,
  onBlur,
  ...props
}: PropsType) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pickerRef = useRef<FlatpickrInstance | null>(null);
  const onChangeRef = useRef<DatePickerOnChange | undefined>(onChange);

  const getScrollableAncestors = (element: HTMLElement): HTMLElement[] => {
    const scrollables: HTMLElement[] = [];
    let current = element.parentElement;

    while (current) {
      const style = window.getComputedStyle(current);
      const overflowY = style.overflowY;
      const overflowX = style.overflowX;
      const isScrollable =
        /(auto|scroll|overlay)/.test(overflowY) ||
        /(auto|scroll|overlay)/.test(overflowX);

      if (isScrollable) {
        scrollables.push(current);
      }
      current = current.parentElement;
    }

    return scrollables;
  };

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!inputRef.current) return;

    const picker = flatpickr(inputRef.current, {
      mode,
      static: !appendToBody,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      clickOpens: !disabled,
      appendTo:
        appendToBody && typeof document !== "undefined" ? document.body : undefined,
      onChange: (selectedDates, dateStr, instance) => {
        const changeHandler = onChangeRef.current;
        if (!changeHandler) return;
        if (changeHandler.length >= 2) {
          (changeHandler as (dates: Date[], value: string, picker: FlatpickrInstance) => void)(
            selectedDates,
            dateStr,
            instance,
          );
          return;
        }
        (changeHandler as (nextValue: string) => void)(dateStr);
      },
    });

    pickerRef.current = picker;

    const repositionCalendar = () => {
      const currentPicker = pickerRef.current as FlatpickrInstance & {
        _positionCalendar?: () => void;
      };
      if (!currentPicker?.isOpen) return;
      currentPicker._positionCalendar?.();
    };

    const scrollParents =
      appendToBody && typeof window !== "undefined"
        ? getScrollableAncestors(inputRef.current)
        : [];

    if (appendToBody) {
      window.addEventListener("scroll", repositionCalendar, true);
      window.addEventListener("resize", repositionCalendar);
      for (const parent of scrollParents) {
        parent.addEventListener("scroll", repositionCalendar, { passive: true });
      }
    }

    return () => {
      if (appendToBody) {
        window.removeEventListener("scroll", repositionCalendar, true);
        window.removeEventListener("resize", repositionCalendar);
        for (const parent of scrollParents) {
          parent.removeEventListener("scroll", repositionCalendar);
        }
      }
      picker.destroy();
      pickerRef.current = null;
    };
  }, [appendToBody, defaultDate, disabled, mode]);

  useEffect(() => {
    if (!pickerRef.current) return;
    pickerRef.current.set("minDate", min);
  }, [min]);

  useEffect(() => {
    if (!pickerRef.current) return;
    pickerRef.current.set("maxDate", max);
  }, [max]);

  useEffect(() => {
    if (!pickerRef.current) return;
    if (!value) {
      pickerRef.current.clear();
      return;
    }
    if (pickerRef.current.input.value !== value) {
      pickerRef.current.setDate(value, false, "Y-m-d");
    }
  }, [value]);

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 ${className}`;

  if (disabled) {
    inputClasses += " cursor-not-allowed border-gray-300 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400";
  } else if (error) {
    inputClasses += " border-error-500 text-error-800 focus:ring-error-500/10 dark:border-error-500 dark:text-error-400";
  } else {
    inputClasses += " border-gray-300 bg-transparent text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";
  }

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={props.name}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          onBlur={onBlur}
          {...props}
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
