import type { BoardType, PostDetail, PostCreateRequest, PostUpdateRequest, PaginatedData } from "@shinhanqna/types";
import { apiFetch } from "../client";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (boardType?: BoardType, page?: number, size?: number) => [...postKeys.lists(), { boardType, page, size }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (postId: number) => [...postKeys.details(), postId] as const,
};

export function fetchPosts(params: { boardType?: BoardType; page?: number; size?: number }) {
  const searchParams = new URLSearchParams();
  if (params.boardType) searchParams.set("boardType", params.boardType);
  if (params.page !== undefined) searchParams.set("page", String(params.page));
  if (params.size !== undefined) searchParams.set("size", String(params.size));

  return apiFetch<PaginatedData<PostDetail>>(`/api/posts?${searchParams}`);
}

export function fetchPost(postId: number) {
  return apiFetch<PostDetail>(`/api/posts/${postId}`);
}

export function createPost(data: PostCreateRequest, images?: File[]) {
  const formData = new FormData();
  formData.append("post", new Blob([JSON.stringify(data)], { type: "application/json" }));

  if (images) {
    images.forEach((file) => formData.append("images", file));
  }

  return apiFetch<{ postId: number }>("/api/posts", {
    method: "POST",
    body: formData,
  });
}

export function updatePost(postId: number, data: PostUpdateRequest) {
  return apiFetch<void>(`/api/posts/${postId}`, {
    method: "PATCH",
    body: data,
  });
}

export function deletePost(postId: number) {
  return apiFetch<void>(`/api/posts/${postId}`, {
    method: "DELETE",
  });
}
