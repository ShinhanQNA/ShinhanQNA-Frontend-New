"use client";

import { useState } from "react";
import { useCommentReports, useAdminDeleteComment } from "@shinhanqna/api";
import { Badge, Button, Pagination, Spinner, EmptyState, Modal } from "@shinhanqna/ui";
import type { ReportReason } from "@shinhanqna/types";

const reasonLabels: Record<ReportReason, string> = {
  SPAM: "스팸",
  ABUSE: "욕설/비방",
  ADVERTISEMENT: "광고",
  ETC: "기타",
};

export default function CommentReportsPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useCommentReports(page);
  const deleteMutation = useAdminDeleteComment();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteTarget === null) return;
    deleteMutation.mutate(deleteTarget, {
      onSuccess: () => setDeleteTarget(null),
      onError: () => setDeleteTarget(null),
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-fg mb-4 sm:mb-6">댓글 신고 관리</h1>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState message="신고된 댓글이 없습니다" />
      ) : (
        <>
          <div className="rounded-xl bg-surface shadow-card overflow-x-auto">
            <table className="w-full min-w-[780px] text-sm">
              <thead className="bg-surface-hover text-fg-muted">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">댓글 ID</th>
                  <th className="text-left px-4 py-3 font-medium">게시글 ID</th>
                  <th className="text-left px-4 py-3 font-medium">사유</th>
                  <th className="text-left px-4 py-3 font-medium">설명</th>
                  <th className="text-left px-4 py-3 font-medium">상태</th>
                  <th className="text-left px-4 py-3 font-medium">신고일</th>
                  <th className="text-right px-4 py-3 font-medium">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {data.items.map((report) => (
                  <tr key={report.reportId} className="hover:bg-surface-hover transition-colors">
                    <td className="px-4 py-3 text-fg">{report.commentId}</td>
                    <td className="px-4 py-3 text-fg-muted">{report.postId}</td>
                    <td className="px-4 py-3">
                      <Badge variant="orange">{reasonLabels[report.reason]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-fg-muted max-w-[200px] truncate">{report.description || "-"}</td>
                    <td className="px-4 py-3">
                      {report.commentDeleted
                        ? <Badge variant="default">삭제됨</Badge>
                        : <Badge variant="red">미처리</Badge>
                      }
                    </td>
                    <td className="px-4 py-3 text-fg-muted">{new Date(report.reportedAt).toLocaleDateString("ko-KR")}</td>
                    <td className="px-4 py-3 text-right">
                      {!report.commentDeleted && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteTarget(report.commentId)}
                        >
                          삭제
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            hasNext={data.hasNext}
            hasPrevious={data.hasPrevious}
            onPageChange={setPage}
          />
        </>
      )}

      <Modal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} title="댓글 삭제">
        <p className="text-sm text-fg-muted mb-4">이 댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>취소</Button>
          <Button variant="danger" onClick={handleDelete} loading={deleteMutation.isPending}>삭제</Button>
        </div>
      </Modal>
    </div>
  );
}
