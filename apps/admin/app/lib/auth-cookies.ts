import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 30,
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_KEY)?.value;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
