export type ReportReason = "SPAM" | "ABUSE" | "ADVERTISEMENT" | "ETC";

export interface ReportCreateRequest {
  reason: ReportReason;
  description?: string;
}

export interface ReportCreateResponse {
  reportId: number;
}
