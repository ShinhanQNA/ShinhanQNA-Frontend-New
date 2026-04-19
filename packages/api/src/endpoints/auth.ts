import type {
  TokenPair,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  LogoutRequest,
  CyberVerifyRequest,
  CyberVerifyResponse,
} from "@shinhanqna/types";
import { apiFetch } from "../client";

export function login(data: LoginRequest) {
  return apiFetch<TokenPair>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function verifyCyber(data: CyberVerifyRequest) {
  return apiFetch<CyberVerifyResponse>("/api/auth/verify-cyber", {
    method: "POST",
    body: data,
  });
}

export function fetchMe() {
  return apiFetch<{ nickname: string | null }>("/api/auth/me");
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
