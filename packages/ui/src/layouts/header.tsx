import { type ReactNode } from "react";
import { cn } from "../lib/cn";

interface HeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

function Header({ title, left, right, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b border-border-default bg-surface/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {left}
        {title && <h1 className="text-lg font-bold text-fg">{title}</h1>}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  );
}

export { Header, type HeaderProps };
