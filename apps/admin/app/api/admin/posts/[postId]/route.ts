import { apiProxy } from "@/lib/api-proxy";

export async function DELETE(_: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return apiProxy(`/api/v1/admin/posts/${postId}`, { method: "DELETE" });
}
