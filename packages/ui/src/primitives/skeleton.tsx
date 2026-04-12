import { cn } from "../lib/cn";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-surface-hover", className)}
      aria-hidden="true"
    />
  );
}

export { Skeleton, type SkeletonProps };
