"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Plus } from "lucide-react";
import { Header, Logo, Button, Dropdown } from "@shinhanqna/ui";

interface MainLayoutShellProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function MainLayoutShell({ children, isAuthenticated }: MainLayoutShellProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/";
    }
  }

  const handleProfileSelect = (key: string) => {
    if (key === "profile") router.push("/profile");
    else if (key === "logout") void handleLogout();
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[640px] lg:max-w-3xl xl:max-w-4xl flex-col border-x border-border-default">
      <Header
        left={
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} className="text-cyan-500" />
            <span className="text-lg font-bold text-fg">신한Q&A</span>
          </Link>
        }
        right={
          isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/post/new"
                className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                글쓰기
              </Link>
              <Dropdown
                trigger={
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-default bg-surface text-fg hover:bg-surface-hover transition-colors">
                    <User className="h-5 w-5" />
                  </span>
                }
                items={[
                  { key: "profile", label: "프로필" },
                  { key: "logout", label: "로그아웃", danger: true },
                ]}
                onSelect={handleProfileSelect}
              />
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm">로그인</Button>
            </Link>
          )
        }
      />
      {children}
    </div>
  );
}
