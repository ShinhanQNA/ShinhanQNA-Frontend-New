"use client";

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
  return (
    <div className={cn("flex border-b border-gray-200", className)} role="tablist">
      {items.map((item) => (
        <button
          key={item.key}
          role="tab"
          aria-selected={activeKey === item.key}
          onClick={() => onChange(item.key)}
          className={cn(
            "px-4 py-3 text-sm font-medium transition-colors relative",
            activeKey === item.key
              ? "text-cyan-500"
              : "text-gray-500 hover:text-gray-700",
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
