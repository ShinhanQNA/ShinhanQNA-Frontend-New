import { Logo } from "@shinhanqna/ui";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={48} className="text-cyan-500 mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">신한Q&A</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
