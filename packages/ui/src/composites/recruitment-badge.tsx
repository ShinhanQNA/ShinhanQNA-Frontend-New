import { Users, Calendar } from "lucide-react";
import type { RecruitStatus } from "@shinhanqna/types";
import { cn } from "../lib/cn";
import { Badge } from "../primitives/badge";

interface RecruitmentBadgeProps {
  capacity: number;
  currentCount: number;
  recruitStatus: RecruitStatus;
  deadline: string;
  className?: string;
}

function RecruitmentBadge({
  capacity,
  currentCount,
  recruitStatus,
  deadline,
  className,
}: RecruitmentBadgeProps) {
  const isClosed = recruitStatus === "CLOSED";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Badge variant={isClosed ? "default" : "green"}>
        {isClosed ? "모집 마감" : "모집 중"}
      </Badge>
      <span className="flex items-center gap-1 text-xs text-fg-muted">
        <Users className="h-3.5 w-3.5" />
        {currentCount}/{capacity}
      </span>
      <span className="flex items-center gap-1 text-xs text-fg-muted">
        <Calendar className="h-3.5 w-3.5" />
        {new Date(deadline).toLocaleDateString("ko-KR")}
      </span>
    </div>
  );
}

export { RecruitmentBadge, type RecruitmentBadgeProps };
