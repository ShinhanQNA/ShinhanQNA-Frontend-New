import { NextResponse } from "next/server";
import { getRefreshToken, setAuthCookies, clearAuthCookies } from "@/lib/auth-cookies";

const API_URL = process.env.API_URL;

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    await clearAuthCookies();
    return NextResponse.json(
      { resultCode: "401", msg: "리프레시 토큰 없음", data: {} },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      await clearAuthCookies();
      return NextResponse.json(data, { status: res.status });
    }

    await setAuthCookies(data.data.accessToken, data.data.refreshToken);
    return NextResponse.json({ resultCode: data.resultCode, msg: data.msg, data: {} });
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}
