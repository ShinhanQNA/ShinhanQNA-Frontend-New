"use client";

import { usePathname } from "next/navigation";
import { Home, MessageCircle, Users, BookOpen, User, Plus } from "lucide-react";
import Link from "next/link";
import { ThreeColumnLayout, Sidebar, Header, MobileNav, Logo, type SidebarLink, type MobileNavItem } from "@shinhanqna/ui";

const sidebarLinks: SidebarLink[] = [
  { key: "/", label: "홈", href: "/", icon: <Home className="h-5 w-5" /> },
  { key: "/board/free", label: "자유게시판", href: "/board/free", icon: <MessageCircle className="h-5 w-5" /> },
  { key: "/board/qna", label: "Q&A", href: "/board/qna", icon: <BookOpen className="h-5 w-5" /> },
  { key: "/board/project-recruit", label: "프로젝트 모집", href: "/board/project-recruit", icon: <Users className="h-5 w-5" /> },
  { key: "/board/study-recruit", label: "스터디 모집", href: "/board/study-recruit", icon: <Users className="h-5 w-5" /> },
  { key: "/profile", label: "프로필", href: "/profile", icon: <User className="h-5 w-5" /> },
];

const mobileNavItems: MobileNavItem[] = [
  { key: "/", label: "홈", href: "/", icon: <Home className="h-5 w-5" /> },
  { key: "/board/qna", label: "Q&A", href: "/board/qna", icon: <BookOpen className="h-5 w-5" /> },
  { key: "/board/project-recruit", label: "모집", href: "/board/project-recruit", icon: <Users className="h-5 w-5" /> },
  { key: "/profile", label: "프로필", href: "/profile", icon: <User className="h-5 w-5" /> },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const activeKey = sidebarLinks.find((link) =>
    link.key === "/" ? pathname === "/" : pathname.startsWith(link.key),
  )?.key || "/";

  return (
    <>
      <ThreeColumnLayout
        left={
          <Sidebar
            links={sidebarLinks}
            activeKey={activeKey}
            header={
              <Link href="/" className="flex items-center gap-2">
                <Logo size={28} className="text-cyan-500" />
                <span className="text-lg font-bold text-gray-900">신한Q&A</span>
              </Link>
            }
          />
        }
        center={
          <div className="flex flex-col">
            <Header
              title="신한Q&A"
              right={
                <Link
                  href="/post/new"
                  className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  글쓰기
                </Link>
              }
            />
            {children}
          </div>
        }
      />
      <MobileNav items={mobileNavItems} activeKey={activeKey} />
    </>
  );
}
