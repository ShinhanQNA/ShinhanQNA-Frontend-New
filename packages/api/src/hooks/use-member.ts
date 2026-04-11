"use client";

import { useMutation } from "@tanstack/react-query";
import type { NicknameUpdateRequest } from "@shinhanqna/types";
import { updateNickname } from "../endpoints/members";

export function useUpdateNickname() {
  return useMutation({
    mutationFn: (data: NicknameUpdateRequest) => updateNickname(data),
  });
}
