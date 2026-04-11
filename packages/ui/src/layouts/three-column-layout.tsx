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
      <div className="hidden lg:flex sticky top-0 h-screen shrink-0 overflow-y-auto">
        {left}
      </div>
      <main className="w-full lg:max-w-[600px] lg:border-x border-gray-200 pb-16 lg:pb-0">
        {center}
      </main>
      {right && (
        <div className="hidden xl:flex w-[350px] shrink-0 sticky top-0 h-screen overflow-y-auto p-4">
          {right}
        </div>
      )}
    </div>
  );
}

export { ThreeColumnLayout, type ThreeColumnLayoutProps };
