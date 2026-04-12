import { NextResponse } from "next/server";
import { cyberVerify } from "@/lib/cyber-verify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cyberId, cyberPassword } = body as {
      cyberId?: string;
      cyberPassword?: string;
    };

    if (!cyberId || !cyberPassword) {
      return NextResponse.json(
        { resultCode: "400", msg: "사이버캠퍼스 ID·비밀번호를 입력해주세요.", data: {} },
        { status: 400 },
      );
    }

    const verify = await cyberVerify(cyberId, cyberPassword);

    if (!verify.success) {
      switch (verify.error) {
        case "INVALID_CREDENTIALS":
          return NextResponse.json(
            { resultCode: "401", msg: "사이버캠퍼스 로그인에 실패했습니다.", data: {} },
            { status: 401 },
          );
        case "NOT_SOFTWARE_DEPT":
          return NextResponse.json(
            {
              resultCode: "403",
              msg: "현재는 소프트웨어융합학과 학생만 가입할 수 있습니다.",
              data: { department: verify.department },
            },
            { status: 403 },
          );
        case "PARSE_ERROR":
          return NextResponse.json(
            { resultCode: "502", msg: "학적 정보를 확인할 수 없습니다.", data: {} },
            { status: 502 },
          );
        default:
          return NextResponse.json(
            { resultCode: "502", msg: "사이버캠퍼스 연결에 실패했습니다.", data: {} },
            { status: 502 },
          );
      }
    }

    return NextResponse.json(
      {
        resultCode: "200",
        msg: "확인 완료",
        data: {
          studentNumber: verify.studentNumber,
          department: verify.department,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ resultCode: "502", msg: "서버 연결 실패", data: {} }, { status: 502 });
  }
}
