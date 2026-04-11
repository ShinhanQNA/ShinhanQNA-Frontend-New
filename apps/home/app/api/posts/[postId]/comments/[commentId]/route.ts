import { apiProxy } from "@/lib/api-proxy";

export async function PATCH(request: Request, { params }: { params: Promise<{ postId: string; commentId: string }> }) {
  const { postId, commentId } = await params;
  const body = await request.json();
  return apiProxy(`/api/v1/posts/${postId}/comments/${commentId}`, { method: "PATCH", body, contentType: "application/json" });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ postId: string; commentId: string }> }) {
  const { postId, commentId } = await params;
  return apiProxy(`/api/v1/posts/${postId}/comments/${commentId}`, { method: "DELETE" });
}
