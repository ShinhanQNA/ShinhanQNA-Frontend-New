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
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevious}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-sm text-gray-600 px-3">
        {page + 1} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export { Pagination, type PaginationProps };
