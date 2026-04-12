import { type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type BadgeVariant = "default" | "cyan" | "blue" | "red" | "orange" | "green";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-hover text-fg-muted",
  cyan: "bg-cyan-100 text-cyan-900 dark:bg-cyan-800 dark:text-cyan-100",
  blue: "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100",
  red: "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100",
  orange: "bg-orange-100 text-orange-900 dark:bg-orange-800 dark:text-orange-100",
  green: "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100",
};

function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps };
