import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("admin_access_token")?.value;
  const refreshToken = request.cookies.get("admin_refresh_token")?.value;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"));

  if (!accessToken && refreshToken && !isPublicPath) {
    try {
      const refreshRes = await fetch(new URL("/api/auth/refresh", request.url), {
        method: "POST",
        headers: { cookie: request.headers.get("cookie") ?? "" },
      });

      if (refreshRes.ok) {
        const response = NextResponse.next();
        const setCookieHeaders = refreshRes.headers.getSetCookie?.() ?? [];
        for (const cookie of setCookieHeaders) {
          response.headers.append("set-cookie", cookie);
        }
        return response;
      }
    } catch {
      // fall through
    }
  }

  if (!accessToken && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
