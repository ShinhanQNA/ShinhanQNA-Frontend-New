import { apiProxy } from "@/lib/api-proxy";

export async function POST(request: Request, { params }: { params: Promise<{ commentId: string }> }) {
  const { commentId } = await params;
  const body = await request.json();
  return apiProxy(`/api/v1/comments/${commentId}/reports`, { method: "POST", body, contentType: "application/json" });
}
