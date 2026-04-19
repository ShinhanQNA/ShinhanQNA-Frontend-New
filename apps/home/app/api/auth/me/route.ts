import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth-cookies";

export async function GET() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ resultCode: "401", msg: "인증 필요", data: {} }, { status: 401 });
  }

  try {
    const parts = accessToken.split(".");
    if (parts.length !== 3) {
      return NextResponse.json({ resultCode: "401", msg: "유효하지 않은 토큰", data: {} }, { status: 401 });
    }

    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));

    return NextResponse.json({
      resultCode: "200",
      msg: "success",
      data: {
        nickname: payload.nickname ?? payload.name ?? payload.sub ?? null,
      },
    });
  } catch {
    return NextResponse.json({ resultCode: "500", msg: "토큰 파싱 실패", data: {} }, { status: 500 });
  }
}
