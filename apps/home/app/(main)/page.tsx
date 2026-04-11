"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BoardType } from "@shinhanqna/types";
import { usePosts } from "@shinhanqna/api";
import { PostCard, BoardTabBar, Pagination, EmptyState, Spinner } from "@shinhanqna/ui";

export default function HomePage() {
  const router = useRouter();
  const [boardType, setBoardType] = useState<BoardType | undefined>(undefined);
  const [page, setPage] = useState(0);

  const { data, isLoading } = usePosts(boardType, page);

  return (
    <div className="flex flex-col">
      <BoardTabBar activeBoard={boardType} onChange={(bt) => { setBoardType(bt); setPage(0); }} />

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
