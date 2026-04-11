import { type NextRequest } from "next/server";
import { apiProxy, apiProxyFormData } from "@/lib/api-proxy";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  return apiProxy(`/api/v1/posts${searchParams ? `?${searchParams}` : ""}`);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  return apiProxyFormData("/api/v1/posts", formData);
}
