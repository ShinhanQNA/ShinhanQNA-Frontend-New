import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-fg-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full rounded-xl border-none bg-input px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-all outline-none ring-0 focus:ring-2 focus:ring-cyan-500/30 focus:bg-input-focus",
            error && "ring-2 ring-red-500/30 bg-red-100/30",
            className,
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-sm text-red-500" role="alert">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, type InputProps };
