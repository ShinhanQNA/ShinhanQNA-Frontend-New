"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileWarning, MessageSquareWarning, LogOut } from "lucide-react";
import Link from "next/link";
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

  const activeKey = sidebarLinks.find((link) =>
    link.key === "/" ? pathname === "/" : pathname.startsWith(link.key),
  )?.key || "/";

  const handleLogout = () => {
    logoutMutation.mutate(
      { refreshToken: "" },
      { onSuccess: () => router.push("/login") },
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        links={sidebarLinks}
        activeKey={activeKey}
        header={
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} className="text-cyan-500" />
            <span className="text-lg font-bold text-gray-900">관리자</span>
          </Link>
        }
        footer={
          <Button variant="ghost" onClick={handleLogout} className="w-full text-gray-500 justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            로그아웃
          </Button>
        }
      />
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
