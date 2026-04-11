"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { BoardType, PostCreateRequest, PostUpdateRequest } from "@shinhanqna/types";
import { postKeys, fetchPosts, fetchPost, createPost, updatePost, deletePost } from "../endpoints/posts";

export function usePosts(boardType?: BoardType, page = 0, size = 20) {
  return useQuery({
    queryKey: postKeys.list(boardType, page, size),
    queryFn: () => fetchPosts({ boardType, page, size }),
  });
}

export function usePost(postId: number) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => fetchPost(postId),
    enabled: postId > 0,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, images }: { data: PostCreateRequest; images?: File[] }) =>
      createPost(data, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostUpdateRequest) => updatePost(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.removeQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
