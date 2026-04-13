"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileWarning, MessageSquareWarning, LogOut, Menu } from "lucide-react";
import { Sidebar, Logo, Button, type SidebarLink } from "@shinhanqna/ui";
import { useLogout } from "@shinhanqna/api";

const sidebarLinks: SidebarLink[] = [
  { key: "/", label: "대시보드", href: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
  { key: "/reports/posts", label: "게시글 신고", href: "/reports/posts", icon: <FileWarning className="h-5 w-5" /> },
  { key: "/reports/comments", label: "댓글 신고", href: "/reports/comments", icon: <MessageSquareWarning className="h-5 w-5" /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogout();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeKey = sidebarLinks.find((link) =>
    link.key === "/" ? pathname === "/" : pathname.startsWith(link.key),
  )?.key || "/";

  const handleLogout = () => {
    logoutMutation.mutate(
      { refreshToken: "" },
      {
        onSuccess: () => router.push("/login"),
        onError: () => router.push("/login"),
      },
    );
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const sidebar = (
    <Sidebar
      links={sidebarLinks}
      activeKey={activeKey}
      header={
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} className="text-cyan-500" />
          <span className="text-lg font-bold text-fg">관리자</span>
        </Link>
      }
      footer={
        <Button variant="ghost" onClick={handleLogout} className="w-full text-fg-muted justify-start">
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      }
    />
  );

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex">{sidebar}</div>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-border-default bg-surface/80 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            className="-ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-fg hover:bg-surface-hover transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Logo size={24} className="text-cyan-500" />
            <span className="text-base font-bold text-fg">관리자</span>
          </Link>
          <span className="w-9" aria-hidden="true" />
        </header>

        <main className="flex-1 bg-surface-hover">{children}</main>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative h-full w-[280px] bg-surface shadow-modal">{sidebar}</div>
        </div>
      )}
    </div>
  );
}
