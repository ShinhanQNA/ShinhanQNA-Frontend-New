import { NextResponse } from "next/server";
import { getRefreshToken, clearAuthCookies } from "@/lib/auth-cookies";

const API_URL = process.env.API_URL;

export async function POST() {
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {});
  }

  await clearAuthCookies();
  return NextResponse.json({ resultCode: "200", msg: "로그아웃 성공", data: {} });
}
