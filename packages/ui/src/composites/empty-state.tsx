import { Inbox } from "lucide-react";
import { cn } from "../lib/cn";

interface EmptyStateProps {
  message: string;
  description?: string;
  className?: string;
}

function EmptyState({ message, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <Inbox className="h-12 w-12 text-gray-300 mb-4" />
      <p className="text-base font-medium text-gray-500">{message}</p>
      {description && (
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}

export { EmptyState, type EmptyStateProps };
