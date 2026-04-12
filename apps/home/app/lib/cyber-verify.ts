import "server-only";

const CYBER_LOGIN_URL = "https://cyber.shinhan.ac.kr/login/index.php";
const CYBER_PROFILE_URL = "https://cyber.shinhan.ac.kr/user/user_edit.php";
const CYBER_LOGIN_REFERER = "https://cyber.shinhan.ac.kr/login.php";
const ALLOWED_DEPARTMENT = "소프트웨어융합학과";

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
    const loginRes = await fetch(CYBER_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: CYBER_LOGIN_REFERER,
      },
      body: new URLSearchParams({ username, password }).toString(),
      redirect: "manual",
    });

    const location = loginRes.headers.get("location") ?? "";
    if (location.includes("errorcode=")) {
      return { success: false, error: "INVALID_CREDENTIALS" };
    }

    const cookieHeader = buildCookieHeader(loginRes.headers);
    if (!cookieHeader) {
      return { success: false, error: "INVALID_CREDENTIALS" };
    }

    const profileRes = await fetch(CYBER_PROFILE_URL, {
      method: "GET",
      headers: { Cookie: cookieHeader },
      redirect: "manual",
    });

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

function buildCookieHeader(headers: Headers): string | null {
  const getSetCookie = (headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  const rawCookies = typeof getSetCookie === "function" ? getSetCookie.call(headers) : splitSetCookie(headers.get("set-cookie"));
  if (rawCookies.length === 0) return null;

  const pairs: string[] = [];
  for (const raw of rawCookies) {
    const firstSemi = raw.indexOf(";");
    const kv = firstSemi === -1 ? raw : raw.slice(0, firstSemi);
    const eq = kv.indexOf("=");
    if (eq > 0) pairs.push(kv.trim());
  }
  return pairs.length > 0 ? pairs.join("; ") : null;
}

function splitSetCookie(value: string | null): string[] {
  if (!value) return [];
  return value.split(/,(?=\s*[A-Za-z0-9_-]+=)/).map((s) => s.trim()).filter(Boolean);
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
