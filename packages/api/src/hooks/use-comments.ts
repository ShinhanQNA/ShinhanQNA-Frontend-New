"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommentCreateRequest, CommentUpdateRequest } from "@shinhanqna/types";
import { commentKeys, fetchComments, createComment, updateComment, deleteComment } from "../endpoints/comments";

export function useComments(postId: number) {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => fetchComments(postId),
  });
}

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentCreateRequest) => createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
    },
  });
}

export function useUpdateComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: number; data: CommentUpdateRequest }) =>
      updateComment(postId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
    },
  });
}

export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
    },
  });
}
