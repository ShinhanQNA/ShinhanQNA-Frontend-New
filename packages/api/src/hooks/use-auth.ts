"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import type { LoginRequest, RegisterRequest, LogoutRequest, CyberVerifyRequest } from "@shinhanqna/types";
import { login, register, logout, verifyCyber, fetchMe } from "../endpoints/auth";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });
}

export function useCyberVerify() {
  return useMutation({
    mutationFn: (data: CyberVerifyRequest) => verifyCyber(data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: (data: LogoutRequest) => logout(data),
  });
}
