import { Logo } from "@shinhanqna/ui";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-surface">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Logo size={56} className="text-cyan-500 mb-4" />
          <h1 className="text-2xl font-bold text-fg tracking-tight">신한Q&A</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
