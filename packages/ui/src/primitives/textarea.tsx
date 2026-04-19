import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-fg-muted">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full rounded-xl border-none bg-input px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-all resize-none outline-none ring-0 focus:ring-2 focus:ring-cyan-500/30 focus:bg-input-focus",
            error && "ring-2 ring-red-500/30 bg-red-100/30 dark:bg-red-900/30",
            className,
          )}
          rows={4}
          {...props}
        />
        {error && <p id={errorId} className="text-sm text-red-500" role="alert">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
