import { apiProxy } from "@/lib/api-proxy";

export async function GET(_: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return apiProxy(`/api/v1/posts/${postId}`);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const body = await request.json();
  return apiProxy(`/api/v1/posts/${postId}`, { method: "PATCH", body, contentType: "application/json" });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return apiProxy(`/api/v1/posts/${postId}`, { method: "DELETE" });
}
