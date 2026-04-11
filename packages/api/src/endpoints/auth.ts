import type { TokenPair, LoginRequest, RegisterRequest, RefreshTokenRequest, LogoutRequest } from "@shinhanqna/types";
import { apiFetch } from "../client";

export function login(data: LoginRequest) {
  return apiFetch<TokenPair>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function register(data: RegisterRequest) {
  return apiFetch<void>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

export function refresh(data: RefreshTokenRequest) {
  return apiFetch<TokenPair>("/api/auth/refresh", {
    method: "POST",
    body: data,
  });
}

export function logout(data: LogoutRequest) {
  return apiFetch<void>("/api/auth/logout", {
    method: "POST",
    body: data,
  });
}
