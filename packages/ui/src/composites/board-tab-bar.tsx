"use client";

import type { BoardType } from "@shinhanqna/types";
import { Tabs, type TabItem } from "../primitives/tabs";

interface BoardTabBarProps {
  activeBoard?: BoardType;
  onChange: (boardType?: BoardType) => void;
  className?: string;
}

const boardTabs: TabItem[] = [
  { key: "ALL", label: "전체" },
  { key: "FREE", label: "자유" },
  { key: "QNA", label: "Q&A" },
  { key: "PROJECT_RECRUIT", label: "프로젝트 모집" },
  { key: "STUDY_RECRUIT", label: "스터디 모집" },
];

function BoardTabBar({ activeBoard, onChange, className }: BoardTabBarProps) {
  return (
    <Tabs
      items={boardTabs}
      activeKey={activeBoard || "ALL"}
      onChange={(key) => onChange(key === "ALL" ? undefined : (key as BoardType))}
      className={className}
    />
  );
}

export { BoardTabBar, type BoardTabBarProps };
