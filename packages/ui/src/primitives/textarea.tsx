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
          <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-2.5 text-base text-gray-900 placeholder:text-gray-500 transition-colors resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            error ? "border-red-500" : "border-gray-300",
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
