"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({ page, totalPages, hasNext, hasPrevious, onPageChange, className }: PaginationProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2 py-4", className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        aria-label="이전 페이지"
        className="p-2 rounded-lg text-fg-muted hover:bg-surface-hover disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className="text-sm text-fg-muted px-3">
        {page + 1} / {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        aria-label="다음 페이지"
        className="p-2 rounded-lg text-fg-muted hover:bg-surface-hover disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export { Pagination, type PaginationProps };
