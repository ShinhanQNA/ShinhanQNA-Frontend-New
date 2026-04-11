import type { ApiResponse } from "@shinhanqna/types";

export class ApiError extends Error {
  constructor(
    public status: number,
    public resultCode: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    ...(customHeaders as Record<string, string>),
  };

  let fetchBody: BodyInit | undefined;

  if (body instanceof FormData) {
    fetchBody = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    fetchBody = JSON.stringify(body);
  }

  const res = await fetch(path, {
    ...rest,
    headers,
    body: fetchBody,
  });

  if (!res.ok) {
    let resultCode = "UNKNOWN";
    let msg = res.statusText;

    try {
      const errorData: ApiResponse<unknown> = await res.json();
      resultCode = errorData.resultCode;
      msg = errorData.msg;
    } catch {}

    throw new ApiError(res.status, resultCode, msg);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}
