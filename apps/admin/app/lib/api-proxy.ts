import { NextResponse } from "next/server";
import { getAccessToken, getRefreshToken, setAuthCookies, clearAuthCookies } from "./auth-cookies";

const API_URL = process.env.API_URL;

let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      await clearAuthCookies();
      return false;
    }

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        await clearAuthCookies();
        return false;
      }

      const data = await res.json();
      await setAuthCookies(data.data.accessToken, data.data.refreshToken);
      return true;
    } catch {
      await clearAuthCookies();
      return false;
    }
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

async function sendWithAuth(path: string, init: RequestInit): Promise<Response> {
  const accessToken = await getAccessToken();
  const headers = new Headers(init.headers);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  return fetch(`${API_URL}${path}`, { ...init, headers });
}

async function withAutoRefresh(execute: () => Promise<Response>): Promise<Response> {
  let res = await execute();
  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) res = await execute();
  }
  return res;
}

async function buildProxyResponse(res: Response) {
  if (res.status === 401) {
    return NextResponse.json(
      { resultCode: "401", msg: "세션이 만료되었습니다", data: {} },
      { status: 401 },
    );
  }
  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return NextResponse.json({ resultCode: "200", msg: "success", data: {} }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function apiProxy(
  path: string,
  options: { method?: string; body?: unknown; contentType?: string } = {},
) {
  const { method = "GET", body, contentType } = options;
  const headers: Record<string, string> = {};
  if (contentType) headers["Content-Type"] = contentType;
  const serializedBody =
    body !== undefined
      ? typeof body === "string"
        ? body
        : JSON.stringify(body)
      : undefined;

  try {
    const res = await withAutoRefresh(() =>
      sendWithAuth(path, { method, headers, body: serializedBody }),
    );
    return buildProxyResponse(res);
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}
