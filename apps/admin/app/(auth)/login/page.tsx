"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@shinhanqna/ui";
import { useLogin } from "@shinhanqna/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => router.push(from),
        onError: (err) => setError(err.message || "로그인에 실패했습니다."),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="이메일"
        type="email"
        placeholder="관리자 이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" loading={loginMutation.isPending} className="w-full mt-2">
        로그인
      </Button>
    </form>
  );
}
