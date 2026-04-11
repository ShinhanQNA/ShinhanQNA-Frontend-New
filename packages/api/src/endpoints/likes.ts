import type { LikeToggleResponse } from "@shinhanqna/types";
import { apiFetch } from "../client";

export function toggleLike(postId: number) {
  return apiFetch<LikeToggleResponse>(`/api/posts/${postId}/likes`, {
    method: "POST",
  });
}
