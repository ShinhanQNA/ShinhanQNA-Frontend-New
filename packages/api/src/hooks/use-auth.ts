"use client";

import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, RegisterRequest, LogoutRequest } from "@shinhanqna/types";
import { login, register, logout } from "../endpoints/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
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
