import type { NicknameUpdateRequest } from "@shinhanqna/types";
import { apiFetch } from "../client";

export function updateNickname(data: NicknameUpdateRequest) {
  return apiFetch<void>("/api/members/me/nickname", {
    method: "PATCH",
    body: data,
  });
}
