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
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-2.5 text-base text-gray-900 placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            error ? "border-red-500" : "border-gray-300",
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
