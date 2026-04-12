"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@shinhanqna/ui";
import { useCyberVerify, useRegister } from "@shinhanqna/api";

type Step = "verify" | "account";

interface VerifiedCyber {
  cyberId: string;
  cyberPassword: string;
  studentNumber: string;
  department: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const cyberVerifyMutation = useCyberVerify();
  const registerMutation = useRegister();

  const [step, setStep] = useState<Step>("verify");
  const [verified, setVerified] = useState<VerifiedCyber | null>(null);
  const [error, setError] = useState("");

  const [cyberForm, setCyberForm] = useState({ cyberId: "", cyberPassword: "" });
  const [accountForm, setAccountForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const updateCyber = (key: keyof typeof cyberForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCyberForm((prev) => ({ ...prev, [key]: e.target.value }));

  const updateAccount = (key: keyof typeof accountForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAccountForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    cyberVerifyMutation.mutate(cyberForm, {
      onSuccess: (data) => {
        setVerified({
          cyberId: cyberForm.cyberId,
          cyberPassword: cyberForm.cyberPassword,
          studentNumber: data.studentNumber,
          department: data.department,
        });
        setStep("account");
      },
      onError: (err) => setError(err.message || "사이버캠퍼스 인증에 실패했습니다."),
    });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (accountForm.password !== accountForm.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!verified) {
      setError("사이버캠퍼스 인증이 필요합니다.");
      setStep("verify");
      return;
    }

    registerMutation.mutate(
      {
        email: accountForm.email,
        cyberId: verified.cyberId,
        cyberPassword: verified.cyberPassword,
        password: accountForm.password,
        nickname: accountForm.nickname,
      },
      {
        onSuccess: () => router.push("/login"),
        onError: (err) => setError(err.message || "회원가입에 실패했습니다."),
      },
    );
  };

  if (step === "verify") {
    return (
      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-fg-muted">
            학번·학과는 사이버캠퍼스 로그인으로 자동 확인합니다. 현재는 소프트웨어융합학과 학생만 가입할 수 있어요.
          </p>
        </div>
        <Input
          label="사이버캠퍼스 ID"
          placeholder="사이버캠퍼스 로그인 ID"
          value={cyberForm.cyberId}
          onChange={updateCyber("cyberId")}
          required
        />
        <Input
          label="사이버캠퍼스 비밀번호"
          type="password"
          placeholder="저장되지 않으며, 학적 확인에만 1회 사용됩니다"
          value={cyberForm.cyberPassword}
          onChange={updateCyber("cyberPassword")}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" loading={cyberVerifyMutation.isPending} className="w-full mt-2">
          다음
        </Button>
        <p className="text-center text-sm text-fg-muted">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-cyan-500 font-medium hover:underline">
            로그인
          </Link>
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div className="rounded-lg border border-border-default bg-surface-hover p-3 text-sm">
        <p className="text-fg">
          <span className="font-semibold">{verified?.studentNumber}</span> · {verified?.department}
        </p>
        <p className="text-xs text-fg-muted mt-1">학적 확인이 완료됐습니다. 계정 정보를 입력해주세요.</p>
      </div>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        value={accountForm.email}
        onChange={updateAccount("email")}
        required
      />
      <Input
        label="닉네임"
        placeholder="닉네임을 입력하세요"
        value={accountForm.nickname}
        onChange={updateAccount("nickname")}
        required
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="8자 이상 입력하세요"
        value={accountForm.password}
        onChange={updateAccount("password")}
        minLength={8}
        required
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한 번 더 입력하세요"
        value={accountForm.passwordConfirm}
        onChange={updateAccount("passwordConfirm")}
        minLength={8}
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={() => {
            setStep("verify");
            setError("");
          }}
        >
          이전
        </Button>
        <Button type="submit" loading={registerMutation.isPending} className="flex-1">
          회원가입
        </Button>
      </div>
    </form>
  );
}
