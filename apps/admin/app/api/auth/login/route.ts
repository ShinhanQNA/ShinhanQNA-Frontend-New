import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth-cookies";

const API_URL = process.env.API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    await setAuthCookies(data.data.accessToken, data.data.refreshToken);
    return NextResponse.json({ resultCode: data.resultCode, msg: data.msg, data: {} });
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}
