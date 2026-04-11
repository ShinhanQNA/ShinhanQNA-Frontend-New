import { apiProxy } from "@/lib/api-proxy";

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const body = await request.json();
  return apiProxy(`/api/v1/posts/${postId}/reports`, { method: "POST", body, contentType: "application/json" });
}
