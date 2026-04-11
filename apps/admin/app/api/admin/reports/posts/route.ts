import { type NextRequest } from "next/server";
import { apiProxy } from "@/lib/api-proxy";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();
  return apiProxy(`/api/v1/admin/reports/posts${searchParams ? `?${searchParams}` : ""}`);
}
