import { cn } from "../lib/cn";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string | null;
  fallback: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

function Avatar({ src, fallback, size = "md", className }: AvatarProps) {
  const initials = fallback.slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={fallback}
        className={cn("rounded-full object-cover", sizeStyles[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-semibold",
        sizeStyles[size],
        className,
      )}
      aria-label={fallback}
    >
      {initials}
    </div>
  );
}

export { Avatar, type AvatarProps };
