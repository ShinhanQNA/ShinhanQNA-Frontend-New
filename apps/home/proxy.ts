import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** 누구나 접근 가능 (로그인 여부 무관) */
const PUBLIC_PATHS = ["/"];

/** 비로그인만 접근 가능 (로그인 상태면 홈으로 리다이렉트) */
const GUEST_ONLY_PATHS = ["/login", "/register"];

function matches(pathname: string, paths: string[]) {
  return paths.some((path) => pathname === path || pathname.startsWith(path + "/"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("student_access_token")?.value;

  const isPublic = matches(pathname, PUBLIC_PATHS);
  const isGuestOnly = matches(pathname, GUEST_ONLY_PATHS);

  if (accessToken && isGuestOnly) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && !isPublic && !isGuestOnly) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
