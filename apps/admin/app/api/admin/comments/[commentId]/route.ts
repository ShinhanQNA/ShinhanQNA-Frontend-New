import { apiProxy } from "@/lib/api-proxy";

export async function DELETE(_: Request, { params }: { params: Promise<{ commentId: string }> }) {
  const { commentId } = await params;
  return apiProxy(`/api/v1/admin/comments/${commentId}`, { method: "DELETE" });
}
