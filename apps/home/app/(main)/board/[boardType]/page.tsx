"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { BoardType } from "@shinhanqna/types";
import { usePosts } from "@shinhanqna/api";
import { PostCard, Pagination, EmptyState, Spinner } from "@shinhanqna/ui";

const slugToBoard: Record<string, BoardType> = {
  free: "FREE",
  qna: "QNA",
  "project-recruit": "PROJECT_RECRUIT",
  "study-recruit": "STUDY_RECRUIT",
};

const boardTitles: Record<BoardType, string> = {
  FREE: "자유게시판",
  QNA: "Q&A",
  PROJECT_RECRUIT: "프로젝트 모집",
  STUDY_RECRUIT: "스터디 모집",
};

export default function BoardPage() {
  const router = useRouter();
  const params = useParams<{ boardType: string }>();
  const boardType = slugToBoard[params.boardType];
  const [page, setPage] = useState(0);

  const { data, isLoading } = usePosts(boardType, page);

  if (!boardType) {
    return <EmptyState message="존재하지 않는 게시판입니다" />;
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3 border-b border-border-default">
        <h2 className="text-lg font-bold text-fg">{boardTitles[boardType]}</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState message="게시글이 없습니다" description="첫 번째 글을 작성해보세요" />
      ) : (
        <>
          {data.items.map((post) => (
            <PostCard
              key={post.postId}
              title={post.title}
              content={post.content}
              authorName={post.authorName}
              boardType={post.boardType}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              createdAt={post.createdAt}
              onClick={() => router.push(`/post/${post.postId}`)}
            />
          ))}
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            hasNext={data.hasNext}
            hasPrevious={data.hasPrevious}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
