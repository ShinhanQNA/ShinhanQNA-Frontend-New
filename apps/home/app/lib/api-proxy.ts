import { NextResponse } from "next/server";
import { getAccessToken } from "./auth-cookies";

const API_URL = process.env.API_URL;

export async function apiProxy(
  path: string,
  options: { method?: string; body?: unknown; contentType?: string } = {},
) {
  const accessToken = await getAccessToken();
  const { method = "GET", body, contentType } = options;

  const headers: Record<string, string> = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  if (contentType) headers["Content-Type"] = contentType;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined
        ? typeof body === "string" ? body : JSON.stringify(body)
        : undefined,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}

export async function apiProxyFormData(path: string, formData: FormData) {
  const accessToken = await getAccessToken();

  const headers: Record<string, string> = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}
