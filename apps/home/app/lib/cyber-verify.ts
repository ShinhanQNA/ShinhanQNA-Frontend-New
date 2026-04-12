import "server-only";

const CYBER_LOGIN_PAGE_URL = "https://cyber.shinhan.ac.kr/login.php";
const CYBER_LOGIN_URL = "https://cyber.shinhan.ac.kr/login/index.php";
const CYBER_PROFILE_URL = "https://cyber.shinhan.ac.kr/user/user_edit.php";
const ALLOWED_DEPARTMENT = "소프트웨어융합학과";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";

export type CyberVerifyError =
  | "INVALID_CREDENTIALS"
  | "NOT_SOFTWARE_DEPT"
  | "PARSE_ERROR"
  | "NETWORK_ERROR";

export interface CyberVerifyOk {
  success: true;
  studentNumber: string;
  department: string;
}

export interface CyberVerifyFail {
  success: false;
  error: CyberVerifyError;
  studentNumber?: string;
  department?: string;
}

export type CyberVerifyResult = CyberVerifyOk | CyberVerifyFail;

export async function cyberVerify(username: string, password: string): Promise<CyberVerifyResult> {
  try {
    // 1. 로그인 페이지 prefetch — 초기 세션 쿠키 확보
    const prefetchRes = await fetch(CYBER_LOGIN_PAGE_URL, {
      method: "GET",
      headers: { "User-Agent": USER_AGENT },
      redirect: "manual",
    });
    const prefetchCookies = parseSetCookie(prefetchRes.headers);
    const prefetchCookieHeader = toCookieHeader(prefetchCookies);

    // 2. 로그인 POST — prefetch 쿠키 포함
    const loginRes = await fetch(CYBER_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
        Referer: CYBER_LOGIN_PAGE_URL,
        ...(prefetchCookieHeader ? { Cookie: prefetchCookieHeader } : {}),
      },
      body: new URLSearchParams({ username, password }).toString(),
      redirect: "manual",
    });

    // 3. 로그인 성공/실패 판정
    const location = loginRes.headers.get("location") ?? "";
    if (location.includes("errorcode=") || location.includes("/login.php?errorcode")) {
      return { success: false, error: "INVALID_CREDENTIALS" };
    }

    // 4. 세션 쿠키 병합 (prefetch + login 응답)
    const loginCookies = parseSetCookie(loginRes.headers);
    const merged = mergeCookies(prefetchCookies, loginCookies);
    const sessionCookieHeader = toCookieHeader(merged);
    if (!sessionCookieHeader) {
      return { success: false, error: "INVALID_CREDENTIALS" };
    }

    // 5. 프로필 페이지 GET
    const profileRes = await fetch(CYBER_PROFILE_URL, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Cookie: sessionCookieHeader,
      },
      redirect: "manual",
    });

    // 200이 아닌 경우 = 로그인 실패 (세션 없어서 login으로 redirect)
    if (profileRes.status !== 200) {
      return { success: false, error: "INVALID_CREDENTIALS" };
    }

    const html = await profileRes.text();
    const studentNumber = extractStudentNumber(html);
    const department = extractDepartment(html);

    if (!studentNumber || !department) {
      return { success: false, error: "PARSE_ERROR" };
    }

    if (department !== ALLOWED_DEPARTMENT) {
      return { success: false, error: "NOT_SOFTWARE_DEPT", studentNumber, department };
    }

    return { success: true, studentNumber, department };
  } catch {
    return { success: false, error: "NETWORK_ERROR" };
  }
}

interface CookiePair {
  name: string;
  value: string;
}

function parseSetCookie(headers: Headers): CookiePair[] {
  const getSetCookie = (headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  const rawCookies =
    typeof getSetCookie === "function" ? getSetCookie.call(headers) : splitSetCookie(headers.get("set-cookie"));

  const pairs: CookiePair[] = [];
  for (const raw of rawCookies) {
    const firstSemi = raw.indexOf(";");
    const kv = firstSemi === -1 ? raw : raw.slice(0, firstSemi);
    const eq = kv.indexOf("=");
    if (eq > 0) {
      pairs.push({
        name: kv.slice(0, eq).trim(),
        value: kv.slice(eq + 1).trim(),
      });
    }
  }
  return pairs;
}

function splitSetCookie(value: string | null): string[] {
  if (!value) return [];
  return value.split(/,(?=\s*[A-Za-z0-9_-]+=)/).map((s) => s.trim()).filter(Boolean);
}

function mergeCookies(base: CookiePair[], override: CookiePair[]): CookiePair[] {
  const map = new Map<string, string>();
  for (const c of base) map.set(c.name, c.value);
  for (const c of override) map.set(c.name, c.value);
  return Array.from(map, ([name, value]) => ({ name, value }));
}

function toCookieHeader(cookies: CookiePair[]): string | null {
  if (cookies.length === 0) return null;
  return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
}

function extractStudentNumber(html: string): string | null {
  const match = html.match(
    /<div class="fstaticlabel">학번\s*<\/div>[\s\S]*?<div class="felement fstatic">\s*(\d+)\s*<\/div>/,
  );
  return match ? match[1] : null;
}

function extractDepartment(html: string): string | null {
  const match = html.match(
    /<div class="fstaticlabel">학과\(전공\)\s*<\/div>[\s\S]*?<div class="felement fstatic">\s*([^<]+?)\s*<\/div>/,
  );
  return match ? match[1].trim() : null;
}
