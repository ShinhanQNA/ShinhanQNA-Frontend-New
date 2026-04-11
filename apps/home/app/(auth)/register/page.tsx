"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@shinhanqna/ui";
import { useRegister } from "@shinhanqna/api";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    email: "",
    studentNumber: "",
    password: "",
    nickname: "",
  });
  const [error, setError] = useState("");

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    registerMutation.mutate(form, {
      onSuccess: () => router.push("/login"),
      onError: (err) => setError(err.message || "회원가입에 실패했습니다."),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        value={form.email}
        onChange={update("email")}
        required
      />
      <Input
        label="학번"
        placeholder="학번을 입력하세요"
        value={form.studentNumber}
        onChange={update("studentNumber")}
        required
      />
      <Input
        label="닉네임"
        placeholder="닉네임을 입력하세요"
        value={form.nickname}
        onChange={update("nickname")}
        required
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="8자 이상 입력하세요"
        value={form.password}
        onChange={update("password")}
        minLength={8}
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" loading={registerMutation.isPending} className="w-full mt-2">
        회원가입
      </Button>
      <p className="text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-cyan-500 font-medium hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
