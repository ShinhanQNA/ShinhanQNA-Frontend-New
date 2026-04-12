"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useUpdateNickname, useLogout } from "@shinhanqna/api";
import { Input, Button, Avatar } from "@shinhanqna/ui";

export default function ProfilePage() {
  const router = useRouter();
  const nicknameMutation = useUpdateNickname();
  const logoutMutation = useLogout();

  const [nickname, setNickname] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleNickname = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nickname.trim()) return;

    nicknameMutation.mutate(
      { nickname },
      {
        onSuccess: () => { setSuccess("닉네임이 변경되었습니다."); setNickname(""); },
        onError: (err) => setError(err.message || "닉네임 변경에 실패했습니다."),
      },
    );
  };

  const handleLogout = () => {
    logoutMutation.mutate(
      { refreshToken: "" },
      { onSuccess: () => router.push("/login") },
    );
  };

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3 border-b border-border-default">
        <h2 className="text-lg font-bold text-fg">프로필</h2>
      </div>

      <div className="p-4 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar fallback="나" size="lg" />
          <div>
            <p className="font-semibold text-fg">내 프로필</p>
            <p className="text-sm text-fg-muted">닉네임을 변경할 수 있습니다</p>
          </div>
        </div>

        <form onSubmit={handleNickname} className="flex flex-col gap-3">
          <Input
            label="새 닉네임"
            placeholder="변경할 닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          {success && <p className="text-sm text-green-500">{success}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" loading={nicknameMutation.isPending}>
            닉네임 변경
          </Button>
        </form>

        <div className="border-t border-border-default pt-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            loading={logoutMutation.isPending}
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
