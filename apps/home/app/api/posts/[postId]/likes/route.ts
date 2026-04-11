import { apiProxy } from "@/lib/api-proxy";

export async function POST(_: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return apiProxy(`/api/v1/posts/${postId}/likes`, { method: "POST" });
}
