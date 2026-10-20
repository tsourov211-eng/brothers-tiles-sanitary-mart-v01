"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";

export interface DropdownOption {
  value: string;
  label: string;
  mobileLabel?: string;
  subLabel?: string;
  badge?: string;
  colorSwatch?: string;
  icon?: React.ReactNode;
}

export interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  label?: string;
  variant?: "default" | "pill" | "dark" | "compact";
  className?: string;
  menuClassName?: string;
  disabled?: boolean;
  prefixIcon?: React.ReactNode;
  align?: "left" | "right";
  ariaLabel?: string;
}

export default function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  variant = "default",
  className = "",
  menuClassName = "",
  disabled = false,
  prefixIcon,
  align = "left",
  ariaLabel,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  // Selected option details
  const selectedOption = options.find((opt) => opt.value === value);

  const updateMenuCoords = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const menuWidth = Math.min(230, window.innerWidth - 16);
    let left = align === "right" ? rect.right - menuWidth : rect.left;
    left = Math.max(8, Math.min(window.innerWidth - menuWidth - 8, left));
    const top = rect.bottom + 6;
    setMenuCoords({ top, left });
  };

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      updateMenuCoords();
    }
    setIsOpen((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Recalculate menu position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;
    updateMenuCoords();
    const handleScrollOrResize = () => {
      updateMenuCoords();
    };
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, align]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        updateMenuCoords();
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const nextIndex =
          currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        onChange(options[nextIndex].value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        updateMenuCoords();
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        onChange(options[prevIndex].value);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) updateMenuCoords();
      setIsOpen((prev) => !prev);
    }
  };

  // Base styling per variant
  const getTriggerStyles = () => {
    const isPill = variant === "pill";
    const isDark = variant === "dark";
    const isCompact = variant === "compact";
    const isFiltered = isPill && value && value !== "All" && value !== "popular";

    if (isPill) {
      return `flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer shadow-2xs select-none shrink-0 whitespace-nowrap ${
        isFiltered
          ? "bg-obsidian text-gold border-gold/80 shadow-sm ring-1 ring-gold/40"
          : isOpen
          ? "bg-white text-obsidian border-gold ring-2 ring-gold/20"
          : "bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 hover:border-gold/60"
      }`;
    }

    if (isDark) {
      return `w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-medium rounded-xl border transition-all duration-200 cursor-pointer select-none shrink-0 ${
        isOpen
          ? "bg-[#1f1f1f] text-white border-gold ring-2 ring-gold/20"
          : "bg-[#141414] hover:bg-[#1a1a1a] text-neutral-100 border-white/10 hover:border-gold/50"
      }`;
    }

    if (isCompact) {
      return `flex items-center justify-between gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer select-none shrink-0 whitespace-nowrap ${
        isOpen
          ? "bg-white border-obsidian ring-1 ring-gold/30"
          : "bg-white hover:bg-neutral-50 border-neutral-300 hover:border-gold/60 text-obsidian"
      }`;
    }

    // Default form variant
    return `w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-medium rounded-xl border transition-all duration-200 cursor-pointer select-none ${
      isOpen
        ? "bg-white text-obsidian border-obsidian ring-2 ring-gold/20 shadow-xs"
        : "bg-white hover:bg-neutral-50/80 text-obsidian border-neutral-300 hover:border-gold/60 shadow-2xs"
    }`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${
        isOpen ? "z-50" : "z-10"
      } ${
        variant === "pill" || variant === "compact" ? "w-auto" : "w-full"
      }`}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
          {label}
        </label>
      )}

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        aria-controls={listboxId}
        className={`${getTriggerStyles()} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        <span className="flex items-center gap-1.5 sm:gap-2 truncate">
          {prefixIcon && <span className="shrink-0">{prefixIcon}</span>}
          {selectedOption?.colorSwatch && (
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10 shadow-2xs"
              style={{ backgroundColor: selectedOption.colorSwatch }}
            />
          )}
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate">
            {selectedOption ? (
              <>
                {selectedOption.mobileLabel ? (
                  <>
                    <span className="inline sm:hidden">{selectedOption.mobileLabel}</span>
                    <span className="hidden sm:inline">{selectedOption.label}</span>
                  </>
                ) : (
                  selectedOption.label
                )}
              </>
            ) : (
              placeholder
            )}
          </span>
          {selectedOption?.badge && (
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded bg-gold/20 text-gold-dark font-bold">
              {selectedOption.badge}
            </span>
          )}
        </span>

        <IconChevronDown
          size={variant === "compact" || variant === "pill" ? 13 : 15}
          stroke={2}
          className={`shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-gold" : "text-neutral-400"
          }`}
        />
      </button>

      {/* Floating Modern Custom Menu */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          className={`fixed z-50 min-w-[200px] max-w-[calc(100vw-1rem)] max-h-72 overflow-y-auto overscroll-contain rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-xl shadow-2xl p-1.5 transition-all duration-150 animate-in fade-in zoom-in-95 focus:outline-none ${menuClassName}`}
          style={{
            top: menuCoords ? `${menuCoords.top}px` : "auto",
            left: menuCoords ? `${menuCoords.left}px` : "auto",
            boxShadow:
              "0 20px 35px -10px rgba(0, 0, 0, 0.15), 0 8px 16px -6px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div className="space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2.5 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-obsidian text-gold font-bold shadow-xs"
                      : "text-neutral-800 hover:bg-[#FAF6EF] hover:text-obsidian font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {option.colorSwatch && (
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-black/10 shadow-2xs"
                        style={{ backgroundColor: option.colorSwatch }}
                      />
                    )}
                    {option.icon && (
                      <span
                        className={`shrink-0 ${
                          isSelected ? "text-gold" : "text-neutral-500"
                        }`}
                      >
                        {option.icon}
                      </span>
                    )}
                    <div className="min-w-0">
                      <span className="block truncate">{option.label}</span>
                      {option.subLabel && (
                        <span
                          className={`block text-[10px] truncate ${
                            isSelected
                              ? "text-gold/80 font-normal"
                              : "text-neutral-400 font-normal"
                          }`}
                        >
                          {option.subLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {option.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase ${
                          isSelected
                            ? "bg-gold/20 text-gold"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && (
                      <IconCheck
                        size={15}
                        stroke={2.5}
                        className="text-gold shrink-0 animate-in zoom-in-75 duration-100"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
