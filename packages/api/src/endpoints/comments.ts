import type { CommentListResponse, CommentCreateRequest, CommentUpdateRequest, CommentCreateResponse } from "@shinhanqna/types";
import { apiFetch } from "../client";

export const commentKeys = {
  all: ["comments"] as const,
  list: (postId: number) => [...commentKeys.all, "list", postId] as const,
};

export function fetchComments(postId: number) {
  return apiFetch<CommentListResponse>(`/api/posts/${postId}/comments`);
}

export function createComment(postId: number, data: CommentCreateRequest) {
  return apiFetch<CommentCreateResponse>(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: data,
  });
}

export function updateComment(postId: number, commentId: number, data: CommentUpdateRequest) {
  return apiFetch<void>(`/api/posts/${postId}/comments/${commentId}`, {
    method: "PATCH",
    body: data,
  });
}

export function deleteComment(postId: number, commentId: number) {
  return apiFetch<void>(`/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });
}
