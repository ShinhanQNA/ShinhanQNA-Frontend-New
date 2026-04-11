"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@shinhanqna/ui";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">문제가 발생했습니다</h2>
        <p className="text-sm text-gray-500 mb-6">잠시 후 다시 시도해주세요.</p>
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </div>
  );
}
