"use client";

import { Heart } from "lucide-react";
import { cn } from "../lib/cn";

interface LikeButtonProps {
  liked: boolean;
  count: number;
  onClick: () => void;
  className?: string;
}

function LikeButton({ liked, count, onClick, className }: LikeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={liked}
      aria-label={liked ? `좋아요 취소 (${count})` : `좋아요 (${count})`}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
        liked
          ? "text-red-500 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700"
          : "text-fg-muted hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-800",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      {count}
    </button>
  );
}

export { LikeButton, type LikeButtonProps };
