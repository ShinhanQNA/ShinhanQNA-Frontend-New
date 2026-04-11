import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border border-gray-300",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-6 py-3 text-md rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, disabled, type = "button", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps };
