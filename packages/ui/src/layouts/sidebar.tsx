"use client";

import { type ReactNode } from "react";
import { cn } from "../lib/cn";

interface SidebarLink {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  activeKey: string;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

function Sidebar({ links, activeKey, header, footer, className }: SidebarProps) {
  return (
    <aside className={cn("flex flex-col h-full w-[240px] border-r border-border-default bg-surface", className)}>
      {header && <div className="p-4 border-b border-border-default">{header}</div>}
      <nav className="flex-1 py-2">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            aria-current={activeKey === link.key ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeKey === link.key
                ? "bg-cyan-100 text-cyan-900"
                : "text-fg-muted hover:bg-surface-hover hover:text-fg",
            )}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </nav>
      {footer && <div className="p-4 border-t border-border-default">{footer}</div>}
    </aside>
  );
}

export { Sidebar, type SidebarProps, type SidebarLink };
