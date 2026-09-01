"use client";

import React, { useState, useRef, useEffect } from "react";

export interface Option {
  label: string;
  value: string;
}

interface ComboboxProps {
  id?: string;
  label?: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  searchable?: boolean;
  className?: string;
}

export function Combobox({
  id,
  label,
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Sélectionner…",
  required = false,
  searchable = false,
  className = "",
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the prop `value` if it exist (Controle the component), otherwise the internal state
  const selectedValue = value !== undefined ? value : internalValue;

  // close the list if we click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const handleSelect = (val: string) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    if (onChange) onChange(val);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className="block text-sm mb-1.5 font-medium">
          {label}
        </label>
      )}

      {/* Input caché pour la validation de formulaire natif */}
      <input
        type="text"
        id={id}
        name={id}
        value={selectedValue}
        required={required}
        onChange={() => {}}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Trigger du Combobox */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left text-sm bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl p-3 flex justify-between items-center transition-all focus:outline-none ${
            isOpen
              ? "border-[#7030A0] ring-4 ring-[#7030A0]/14"
              : "hover:border-[#7030A0]/50"
          }`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-1.5 w-full bg-[#FBF7F3] border border-[#EBE2DC] rounded-xl shadow-lg max-h-60 overflow-y-auto py-1 text-sm">
            {/* Barre de recherche */}
            {searchable && (
              <div className="p-2 border-b border-[#EBE2DC] sticky top-0 bg-[#FBF7F3]">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-white border border-[#EBE2DC] focus:outline-none focus:border-[#7030A0]"
                />
              </div>
            )}

            {/* Liste des options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-[#7030A0]/10 transition-colors flex items-center justify-between ${
                    selectedValue === opt.value
                      ? "font-semibold text-[#7030A0] bg-[#7030A0]/5"
                      : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedValue === opt.value && (
                    <svg
                      className="w-4 h-4 text-[#7030A0]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-gray-500 text-center">
                Aucune option trouvée
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}