"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { usePost, useUpdatePost } from "@shinhanqna/api";
import { Input, Textarea, Button, Spinner, EmptyState } from "@shinhanqna/ui";

export default function EditPostPage() {
  const router = useRouter();
  const { postId: postIdParam } = useParams<{ postId: string }>();
  const postId = Number(postIdParam);

  const { data: post, isLoading } = usePost(postId);
  const updateMutation = useUpdatePost(postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (post && !initialized.current) {
      setTitle(post.title);
      setContent(post.content);
      initialized.current = true;
    }
  }, [post]);

  if (!Number.isInteger(postId) || postId <= 0) {
    return <EmptyState message="잘못된 게시글 주소입니다" />;
  }

  if (isLoading) {
    return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;
  }

  if (!post) {
    return <EmptyState message="게시글을 찾을 수 없습니다" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    updateMutation.mutate(
      { title, content },
      {
        onSuccess: () => router.push(`/post/${postId}`),
        onError: (err) => setError(err.message || "수정에 실패했습니다."),
      },
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
        <button type="button" onClick={() => router.back()} className="text-fg-muted hover:text-fg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-lg font-bold text-fg">수정하기</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" loading={updateMutation.isPending} className="w-full">
          수정하기
        </Button>
      </form>
    </div>
  );
}
