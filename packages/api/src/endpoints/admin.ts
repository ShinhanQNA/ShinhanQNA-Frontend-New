import type { PaginatedData, AdminPostReportItem, AdminCommentReportItem } from "@shinhanqna/types";
import { apiFetch } from "../client";

export const adminKeys = {
  all: ["admin"] as const,
  postReports: (page?: number) => [...adminKeys.all, "postReports", { page }] as const,
  commentReports: (page?: number) => [...adminKeys.all, "commentReports", { page }] as const,
};

export function fetchPostReports(params: { page?: number; size?: number }) {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.size !== undefined) searchParams.set("size", String(params.size));

  return apiFetch<PaginatedData<AdminPostReportItem>>(`/api/admin/reports/posts?${searchParams}`);
}

export function fetchCommentReports(params: { page?: number; size?: number }) {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.size !== undefined) searchParams.set("size", String(params.size));

  return apiFetch<PaginatedData<AdminCommentReportItem>>(`/api/admin/reports/comments?${searchParams}`);
}

export function adminDeletePost(postId: number) {
  return apiFetch<void>(`/api/admin/posts/${postId}`, {
    method: "DELETE",
  });
}

export function adminDeleteComment(commentId: number) {
  return apiFetch<void>(`/api/admin/comments/${commentId}`, {
    method: "DELETE",
  });
}
