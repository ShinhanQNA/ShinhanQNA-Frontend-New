"use client";

import { type ReactNode, useState, useRef, useEffect } from "react";
import { cn } from "../lib/cn";

interface DropdownItem {
  key: string;
  label: string;
  danger?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (key: string) => void;
  className?: string;
}

function Dropdown({ trigger, items, onSelect, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {trigger}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[160px] rounded-xl border border-gray-200 bg-white py-1 shadow-dropdown z-50" role="menu">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              role="menuitem"
              onClick={() => {
                onSelect(item.key);
                setOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm transition-colors",
                item.danger
                  ? "text-red-500 hover:bg-red-100"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { Dropdown, type DropdownProps, type DropdownItem };
