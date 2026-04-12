import Link from "next/link";
import { Logo, Button } from "@shinhanqna/ui";

export function Landing() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-12 text-center">
      <Logo size={64} className="text-cyan-500 mb-6" />
      <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">
        신한Q&A에 오신 것을 환영합니다
      </h1>
      <p className="text-md text-fg-muted max-w-sm mb-8">
        신한대학교 캠퍼스 커뮤니티에서 궁금한 것을 묻고, 함께할 팀원을 찾아보세요.
      </p>
      <div className="flex flex-col gap-2.5 w-full max-w-xs">
        <Link href="/login" className="w-full">
          <Button className="w-full" size="lg">로그인</Button>
        </Link>
        <Link href="/register" className="w-full">
          <Button className="w-full" size="lg" variant="secondary">회원가입</Button>
        </Link>
      </div>
    </div>
  );
}
