"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Flag, Trash2, Pencil } from "lucide-react";
import { usePost, useDeletePost, useComments, useCreateComment, useToggleLike, useReportPost, useMe } from "@shinhanqna/api";
import { Avatar, Badge, LikeButton, CommentItem, ReportDialog, Dropdown, Spinner, EmptyState, Button, Textarea, RecruitmentBadge } from "@shinhanqna/ui";
import type { BoardType, ReportReason } from "@shinhanqna/types";

const boardLabels: Record<BoardType, string> = {
  FREE: "자유",
  QNA: "Q&A",
  PROJECT_RECRUIT: "프로젝트 모집",
  STUDY_RECRUIT: "스터디 모집",
};

export default function PostDetailPage() {
  const router = useRouter();
  const { postId: postIdParam } = useParams<{ postId: string }>();
  const postId = Number(postIdParam);
  const isValidId = Number.isInteger(postId) && postId > 0;

  const { data: me } = useMe();
  const { data: post, isLoading: postLoading } = usePost(postId);
  const { data: commentsData } = useComments(postId);
  const deleteMutation = useDeletePost();
  const likeMutation = useToggleLike(postId);
  const reportMutation = useReportPost(postId);
  const createCommentMutation = useCreateComment(postId);

  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  if (!isValidId) {
    return <EmptyState message="잘못된 게시글 주소입니다" />;
  }

  if (postLoading) {
    return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;
  }

  if (!post) {
    return <EmptyState message="게시글을 찾을 수 없습니다" />;
  }

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(postId, { onSuccess: () => router.push("/") });
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    createCommentMutation.mutate({ content: commentText }, { onSuccess: () => setCommentText("") });
  };

  const handleReport = (reason: ReportReason, description?: string) => {
    reportMutation.mutate({ reason, description }, { onSuccess: () => setReportOpen(false) });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
        <button type="button" onClick={() => router.back()} className="text-fg-muted hover:text-fg">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-lg font-bold text-fg">게시글</span>
      </div>

      <article className="px-4 py-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar fallback={post.authorName} size="lg" />
            <div>
              <p className="font-semibold text-fg">{post.authorName}</p>
              <div className="flex items-center gap-2">
                <Badge variant="cyan">{boardLabels[post.boardType]}</Badge>
                <span className="text-xs text-fg-muted">{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
              </div>
            </div>
          </div>
          {me?.nickname && (
            <Dropdown
              trigger={<MoreHorizontal className="h-5 w-5 text-fg-muted" />}
              items={
                me.nickname === post.authorName
                  ? [
                      { key: "edit", label: "수정" },
                      { key: "delete", label: "삭제", danger: true },
                    ]
                  : [{ key: "report", label: "신고" }]
              }
              onSelect={(key) => {
                if (key === "edit") router.push(`/post/${postId}/edit`);
                if (key === "report") setReportOpen(true);
                if (key === "delete") handleDelete();
              }}
            />
          )}
        </div>

        <h1 className="text-xl font-bold text-fg mb-2">{post.title}</h1>
        <p className="text-base text-fg whitespace-pre-wrap mb-4">{post.content}</p>

        {post.imageUrls.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mb-4">
            {post.imageUrls.map((url, i) => (
              <img key={i} src={url} alt="" className="shrink-0 rounded-xl max-h-80 object-cover" />
            ))}
          </div>
        )}

        {post.recruitment && (
          <div className="mb-4">
            <RecruitmentBadge
              capacity={post.recruitment.capacity}
              currentCount={post.recruitment.currentCount}
              recruitStatus={post.recruitment.recruitStatus}
              deadline={post.recruitment.deadline}
            />
          </div>
        )}

        <div className="flex items-center gap-3 py-3 border-t border-border-default">
          <LikeButton
            liked={liked}
            count={post.likeCount}
            onClick={() => likeMutation.mutate(undefined, {
              onSuccess: (res) => setLiked(res.liked),
            })}
          />
        </div>
      </article>

      <div className="border-t border-border-default">
        <div className="px-4 py-3">
          <h2 className="text-base font-semibold text-fg">댓글 {post.commentCount}</h2>
        </div>

        <form onSubmit={handleComment} className="flex flex-col gap-2 px-4 pb-3">
          <Textarea
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm" loading={createCommentMutation.isPending} className="self-end">
            작성
          </Button>
        </form>

        {commentsData?.items.map((comment) => (
          <CommentItem
            key={comment.commentId}
            content={comment.content}
            anonymousLabel={comment.anonymousLabel}
            isPostAuthor={comment.isPostAuthor}
            deleted={comment.deleted}
            createdAt={comment.createdAt}
          />
        ))}

        {(!commentsData || commentsData.items.length === 0) && (
          <EmptyState message="댓글이 없습니다" description="첫 번째 댓글을 남겨보세요" />
        )}
      </div>

      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={handleReport}
        loading={reportMutation.isPending}
      />
    </div>
  );
}
