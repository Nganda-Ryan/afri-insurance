import { useEffect, useMemo, type FocusEventHandler } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Label from './Label';
import { CalenderIcon } from '../../icons';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import Instance = flatpickr.Instance;

type PropsType = {
  id: string;
  name?: string;
  value?: string;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  onChange?: ((nextValue: string) => void) | Hook | Hook[];
  onBlur?: FocusEventHandler<HTMLInputElement>;
  defaultDate?: DateOption;
  min?: DateOption;
  max?: DateOption;
  appendToBody?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  className?: string;
};

function toIsoDate(value: DateOption | undefined): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  if (typeof value === 'number') {
    return toIsoDate(new Date(value));
  }
  if (typeof value === 'string') {
    if (value === 'today') return toIsoDate(new Date());
    return value;
  }
  return undefined;
}

export default function DatePicker({
  id,
  name,
  value,
  mode,
  onChange,
  onBlur,
  label,
  defaultDate,
  min,
  max,
  appendToBody,
  placeholder,
  error,
  success,
  className,
}: PropsType) {
  const desktopId = `${id}-desktop`;

  const normalizedOnChange = useMemo<Hook | Hook[] | undefined>(() => {
    if (!onChange) return undefined;

    if (Array.isArray(onChange)) {
      return onChange;
    }

    return (selectedDates, dateStr, instance, data) => {
      if (onChange.length <= 1) {
        (onChange as (nextValue: string) => void)(dateStr);
        return;
      }
      (onChange as Hook)(selectedDates, dateStr, instance, data);
    };
  }, [onChange]);

  useEffect(() => {
    const inputElement = document.getElementById(desktopId) as HTMLInputElement | null;
    if (!inputElement) return;

    const flatPickr = flatpickr(inputElement, {
      mode: mode || 'single',
      static: true,
      disableMobile: true,
      monthSelectorType: 'static',
      dateFormat: 'Y-m-d',
      defaultDate: value || defaultDate,
      minDate: min,
      maxDate: max,
      appendTo: appendToBody ? document.body : undefined,
      onChange: normalizedOnChange,
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, normalizedOnChange, desktopId, defaultDate, min, max, appendToBody, value]);

  useEffect(() => {
    const inputElement = document.getElementById(desktopId) as (HTMLInputElement & {
      _flatpickr?: Instance;
    }) | null;

    if (!inputElement?._flatpickr) return;

    inputElement._flatpickr.setDate(value || '', false);
  }, [desktopId, value]);

  const handleNativeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    const next = event.target.value;
    if (Array.isArray(onChange)) {
      onChange.forEach((hook) => hook([], next, undefined as unknown as Instance));
      return;
    }
    if (onChange.length <= 1) {
      (onChange as (nextValue: string) => void)(next);
      return;
    }
    (onChange as Hook)([], next, undefined as unknown as Instance);
  };

  const inputStateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
      : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800';

  const sharedClasses = `h-11 w-full appearance-none rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${inputStateClasses} ${className || ''}`;

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          name={name}
          type="date"
          value={value || ''}
          onChange={handleNativeChange}
          onBlur={onBlur}
          min={toIsoDate(min)}
          max={toIsoDate(max)}
          placeholder={placeholder}
          className={`block md:hidden ${sharedClasses}`}
        />

        <input
          id={desktopId}
          name={name ? `${name}-desktop` : undefined}
          value={value || ''}
          onBlur={onBlur}
          readOnly
          placeholder={placeholder}
          className={`hidden md:block ${sharedClasses}`}
          autoComplete="off"
        />

        <span className="hidden md:block absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
