import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@shinhanqna/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <FileQuestion className="h-12 w-12 text-fg-subtle mb-4" />
        <h2 className="text-xl font-bold text-fg mb-2">페이지를 찾을 수 없습니다</h2>
        <p className="text-sm text-fg-muted mb-6">요청하신 페이지가 존재하지 않습니다.</p>
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
