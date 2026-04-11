import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-cyan-500", sizeStyles[size], className)}
      aria-label="로딩 중"
    />
  );
}

export { Spinner, type SpinnerProps };
