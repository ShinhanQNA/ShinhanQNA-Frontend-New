import { apiProxy } from "@/lib/api-proxy";

export async function GET(_: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return apiProxy(`/api/v1/posts/${postId}/comments`);
}

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const body = await request.json();
  return apiProxy(`/api/v1/posts/${postId}/comments`, { method: "POST", body, contentType: "application/json" });
}
