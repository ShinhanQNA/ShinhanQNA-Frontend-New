import type { ReportCreateRequest, ReportCreateResponse } from "@shinhanqna/types";
import { apiFetch } from "../client";

export function reportPost(postId: number, data: ReportCreateRequest) {
  return apiFetch<ReportCreateResponse>(`/api/posts/${postId}/reports`, {
    method: "POST",
    body: data,
  });
}

export function reportComment(commentId: number, data: ReportCreateRequest) {
  return apiFetch<ReportCreateResponse>(`/api/comments/${commentId}/reports`, {
    method: "POST",
    body: data,
  });
}
