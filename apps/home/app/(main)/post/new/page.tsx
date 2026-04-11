"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { BoardType } from "@shinhanqna/types";
import { useCreatePost } from "@shinhanqna/api";
import { Input, Textarea, Button, Tabs, type TabItem } from "@shinhanqna/ui";

const boardTabs: TabItem[] = [
  { key: "FREE", label: "자유" },
  { key: "QNA", label: "Q&A" },
  { key: "PROJECT_RECRUIT", label: "프로젝트 모집" },
  { key: "STUDY_RECRUIT", label: "스터디 모집" },
];

const isRecruitBoard = (bt: string) => bt === "PROJECT_RECRUIT" || bt === "STUDY_RECRUIT";

export default function NewPostPage() {
  const router = useRouter();
  const createMutation = useCreatePost();

  const [boardType, setBoardType] = useState<BoardType>("FREE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [capacity, setCapacity] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const recruitment = isRecruitBoard(boardType) ? {
      capacity: Number(capacity),
      contactMethod,
      deadline,
    } : undefined;

    createMutation.mutate(
      { data: { boardType, title, content, recruitment }, images: images.length > 0 ? images : undefined },
      {
        onSuccess: () => router.push("/"),
        onError: (err) => setError(err.message || "게시글 작성에 실패했습니다."),
      },
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
        <button type="button" onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-lg font-bold text-gray-900">글쓰기</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <Tabs
          items={boardTabs}
          activeKey={boardType}
          onChange={(key) => setBoardType(key as BoardType)}
        />

        <Input
          label="제목"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="내용"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            이미지 (최대 5장)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files || []).slice(0, 5))}
            className="text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {isRecruitBoard(boardType) && (
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-100">
            <p className="text-sm font-semibold text-gray-900">모집 정보</p>
            <Input
              label="모집 인원"
              type="number"
              min={1}
              placeholder="1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
            <Input
              label="연락 방법"
              placeholder="오픈카톡 링크, 이메일 등"
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              required
            />
            <Input
              label="마감일"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" loading={createMutation.isPending} className="w-full">
          게시하기
        </Button>
      </form>
    </div>
  );
}
