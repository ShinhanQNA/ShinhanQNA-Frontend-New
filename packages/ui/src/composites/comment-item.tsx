import { cn } from "../lib/cn";
import { Avatar } from "../primitives/avatar";
import { Badge } from "../primitives/badge";

interface CommentItemProps {
  content: string;
  anonymousLabel: string;
  isPostAuthor: boolean;
  deleted: boolean;
  createdAt: string;
  isReply?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

function CommentItem({
  content,
  anonymousLabel,
  isPostAuthor,
  deleted,
  createdAt,
  isReply = false,
  actions,
  className,
}: CommentItemProps) {
  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3",
        isReply && "ml-12",
        className,
      )}
    >
      <Avatar fallback={anonymousLabel} size="sm" className="shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-900">{anonymousLabel}</span>
          {isPostAuthor && <Badge variant="cyan">작성자</Badge>}
          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        {deleted ? (
          <p className="text-sm text-gray-400 italic">삭제된 댓글입니다.</p>
        ) : (
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{content}</p>
        )}
        {!deleted && actions && (
          <div className="flex items-center gap-2 mt-1.5">{actions}</div>
        )}
      </div>
    </div>
  );
}

export { CommentItem, type CommentItemProps };
