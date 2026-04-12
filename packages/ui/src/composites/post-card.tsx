import { Heart, MessageCircle } from "lucide-react";
import type { BoardType } from "@shinhanqna/types";
import { cn } from "../lib/cn";
import { Avatar } from "../primitives/avatar";
import { Badge } from "../primitives/badge";

interface PostCardProps {
  title: string;
  content: string;
  authorName: string;
  boardType: BoardType;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  onClick?: () => void;
  className?: string;
}

const boardLabels: Record<BoardType, string> = {
  FREE: "자유",
  QNA: "Q&A",
  PROJECT_RECRUIT: "프로젝트 모집",
  STUDY_RECRUIT: "스터디 모집",
};

const boardVariants: Record<BoardType, "default" | "cyan" | "blue" | "orange" | "green"> = {
  FREE: "default",
  QNA: "cyan",
  PROJECT_RECRUIT: "blue",
  STUDY_RECRUIT: "green",
};

function PostCard({
  title,
  content,
  authorName,
  boardType,
  likeCount,
  commentCount,
  createdAt,
  onClick,
  className,
}: PostCardProps) {
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      className={cn(
        "flex gap-3 px-4 py-3 border-b border-border-default transition-colors hover:bg-surface-hover",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <Avatar fallback={authorName} size="md" className="shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-fg truncate">{authorName}</span>
          <Badge variant={boardVariants[boardType]}>{boardLabels[boardType]}</Badge>
          <span className="text-xs text-fg-subtle shrink-0">
            {new Date(createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <h3 className="text-base font-semibold text-fg mb-1 truncate">{title}</h3>
        <p className="text-sm text-fg-muted line-clamp-2">{content}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-xs text-fg-subtle">
            <Heart className="h-3.5 w-3.5" />
            {likeCount}
          </span>
          <span className="flex items-center gap-1 text-xs text-fg-subtle">
            <MessageCircle className="h-3.5 w-3.5" />
            {commentCount}
          </span>
        </div>
      </div>
    </article>
  );
}

export { PostCard, type PostCardProps };
