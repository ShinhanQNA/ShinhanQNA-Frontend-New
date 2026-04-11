"use client";

import { type ReactNode } from "react";
import { cn } from "../lib/cn";

interface MobileNavItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface MobileNavProps {
  items: MobileNavItem[];
  activeKey: string;
  className?: string;
}

function MobileNav({ items, activeKey, className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-200 bg-white py-2 lg:hidden",
        className,
      )}
    >
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          aria-current={activeKey === item.key ? "page" : undefined}
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors",
            activeKey === item.key
              ? "text-cyan-500"
              : "text-gray-500",
          )}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export { MobileNav, type MobileNavProps, type MobileNavItem };
