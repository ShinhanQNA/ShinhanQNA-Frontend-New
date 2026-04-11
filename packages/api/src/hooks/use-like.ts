"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "../endpoints/posts";
import { toggleLike } from "../endpoints/likes";

export function useToggleLike(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
