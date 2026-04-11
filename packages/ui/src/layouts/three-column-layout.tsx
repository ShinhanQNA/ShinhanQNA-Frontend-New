import { type ReactNode } from "react";
import { cn } from "../lib/cn";

interface ThreeColumnLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right?: ReactNode;
  className?: string;
}

function ThreeColumnLayout({ left, center, right, className }: ThreeColumnLayoutProps) {
  return (
    <div className={cn("flex min-h-screen justify-center", className)}>
      <div className="hidden lg:block sticky top-0 h-screen shrink-0">
        {left}
      </div>
      <main className="w-full max-w-[600px] border-x border-gray-200">
        {center}
      </main>
      {right && (
        <div className="hidden xl:block w-[350px] shrink-0 sticky top-0 h-screen">
          {right}
        </div>
      )}
    </div>
  );
}

export { ThreeColumnLayout, type ThreeColumnLayoutProps };
