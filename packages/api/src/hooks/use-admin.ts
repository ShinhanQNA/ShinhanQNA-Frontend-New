"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminKeys, fetchPostReports, fetchCommentReports, adminDeletePost, adminDeleteComment } from "../endpoints/admin";

export function usePostReports(page = 0, size = 20) {
  return useQuery({
    queryKey: adminKeys.postReports(page, size),
    queryFn: () => fetchPostReports({ page, size }),
  });
}

export function useCommentReports(page = 0, size = 20) {
  return useQuery({
    queryKey: adminKeys.commentReports(page, size),
    queryFn: () => fetchCommentReports({ page, size }),
  });
}

export function useAdminDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => adminDeletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.postReportsList() });
    },
  });
}

export function useAdminDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => adminDeleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.commentReportsList() });
    },
  });
}
