"use client";

import { FileWarning, MessageSquareWarning } from "lucide-react";
import { usePostReports, useCommentReports } from "@shinhanqna/api";
import { Spinner } from "@shinhanqna/ui";

export default function DashboardPage() {
  const { data: postReports, isLoading: postsLoading } = usePostReports(0, 1);
  const { data: commentReports, isLoading: commentsLoading } = useCommentReports(0, 1);

  const isLoading = postsLoading || commentsLoading;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-fg mb-4 sm:mb-6">대시보드</h1>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-orange-100 p-2">
                <FileWarning className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-base font-semibold text-fg">게시글 신고</h2>
            </div>
            <p className="text-3xl font-bold text-fg">{postReports?.totalElements ?? 0}</p>
            <p className="text-sm text-fg-muted mt-1">전체 신고 건수</p>
          </div>

          <div className="rounded-xl bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-red-100 p-2">
                <MessageSquareWarning className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-base font-semibold text-fg">댓글 신고</h2>
            </div>
            <p className="text-3xl font-bold text-fg">{commentReports?.totalElements ?? 0}</p>
            <p className="text-sm text-fg-muted mt-1">전체 신고 건수</p>
          </div>
        </div>
      )}
    </div>
  );
}
