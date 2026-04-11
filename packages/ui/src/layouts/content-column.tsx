import { type ReactNode } from "react";
import { cn } from "../lib/cn";

interface ContentColumnProps {
  children: ReactNode;
  className?: string;
}

function ContentColumn({ children, className }: ContentColumnProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}

export { ContentColumn, type ContentColumnProps };
