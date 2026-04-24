import { NextResponse } from "next/server";
import { getAccessToken, getRefreshToken, setAuthCookies, clearAuthCookies } from "./auth-cookies";

const API_URL = process.env.API_URL;

const refreshPromises = new Map<string, Promise<string | null>>();

async function tryRefresh(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    await clearAuthCookies();
    return null;
  }

  const existing = refreshPromises.get(refreshToken);
  if (existing) return existing;

  const promise = (async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        await clearAuthCookies();
        return null;
      }

      const data = await res.json();
      await setAuthCookies(data.data.accessToken, data.data.refreshToken);
      return data.data.accessToken as string;
    } catch {
      await clearAuthCookies();
      return null;
    }
  })().finally(() => {
    refreshPromises.delete(refreshToken);
  });

  refreshPromises.set(refreshToken, promise);
  return promise;
}

async function sendWithAuth(path: string, init: RequestInit, overrideToken?: string): Promise<Response> {
  const accessToken = overrideToken ?? (await getAccessToken());
  const headers = new Headers(init.headers);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  return fetch(`${API_URL}${path}`, { ...init, headers });
}

async function withAutoRefresh(
  execute: (overrideToken?: string) => Promise<Response>,
): Promise<Response> {
  let res = await execute();
  if (res.status === 401) {
    const newToken = await tryRefresh();
    if (newToken) res = await execute(newToken);
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

  const text = await res.text();
  if (!text) {
    return NextResponse.json(
      { resultCode: String(res.status), msg: "success", data: {} },
      { status: res.status },
    );
  }

  try {
    const data = JSON.parse(text);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { resultCode: String(res.status), msg: "서버에서 잘못된 응답을 받았습니다", data: {} },
      { status: res.status },
    );
  }
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
    const res = await withAutoRefresh((token) =>
      sendWithAuth(path, { method, headers, body: serializedBody }, token),
    );
    return buildProxyResponse(res);
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}

export async function apiProxyFormData(path: string, formData: FormData) {
  try {
    const res = await withAutoRefresh((token) =>
      sendWithAuth(path, { method: "POST", body: formData }, token),
    );
    return buildProxyResponse(res);
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}
