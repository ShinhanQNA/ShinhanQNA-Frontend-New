import { apiProxy } from "@/lib/api-proxy";

export async function PATCH(request: Request) {
  const body = await request.json();
  return apiProxy("/api/v1/members/me/nickname", { method: "PATCH", body, contentType: "application/json" });
}
