"use client";

import { useMutation } from "@tanstack/react-query";
import type { ReportCreateRequest } from "@shinhanqna/types";
import { reportPost, reportComment } from "../endpoints/reports";

export function useReportPost(postId: number) {
  return useMutation({
    mutationFn: (data: ReportCreateRequest) => reportPost(postId, data),
  });
}

export function useReportComment(commentId: number) {
  return useMutation({
    mutationFn: (data: ReportCreateRequest) => reportComment(commentId, data),
  });
}
