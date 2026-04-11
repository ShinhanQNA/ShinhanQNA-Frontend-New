import type { ReportReason } from "./report";

export interface AdminPostReportItem {
  reportId: number;
  postId: number;
  reporterId: number;
  reason: ReportReason;
  description?: string;
  postDeleted: boolean;
  reportedAt: string;
}

export interface AdminCommentReportItem {
  reportId: number;
  commentId: number;
  postId: number;
  reporterId: number;
  reason: ReportReason;
  description?: string;
  commentDeleted: boolean;
  reportedAt: string;
}
