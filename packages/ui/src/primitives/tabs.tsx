"use client";

import { useRef } from "react";
import { cn } from "../lib/cn";

interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

function Tabs({ items, activeKey, onChange, className }: TabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const count = items.length;
    let nextIndex: number | null = null;

    if (e.key === "ArrowRight") nextIndex = (index + 1) % count;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + count) % count;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = count - 1;

    if (nextIndex !== null) {
      e.preventDefault();
      onChange(items[nextIndex].key);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className={cn("flex border-b border-border-default", className)} role="tablist">
      {items.map((item, index) => (
        <button
          key={item.key}
          ref={(el) => { tabRefs.current[index] = el; }}
          type="button"
          role="tab"
          aria-selected={activeKey === item.key}
          tabIndex={activeKey === item.key ? 0 : -1}
          onClick={() => onChange(item.key)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            "px-4 py-3 text-sm font-medium transition-colors relative",
            activeKey === item.key
              ? "text-cyan-500"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {item.label}
          {activeKey === item.key && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />
          )}
        </button>
      ))}
    </div>
  );
}

export { Tabs, type TabsProps, type TabItem };
