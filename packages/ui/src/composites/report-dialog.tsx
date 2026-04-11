"use client";

import { useState, useEffect } from "react";
import type { ReportReason } from "@shinhanqna/types";
import { Modal } from "../primitives/modal";
import { Button } from "../primitives/button";
import { Textarea } from "../primitives/textarea";
import { cn } from "../lib/cn";

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: ReportReason, description?: string) => void;
  loading?: boolean;
}

const reasons: { value: ReportReason; label: string }[] = [
  { value: "SPAM", label: "스팸" },
  { value: "ABUSE", label: "욕설/비방" },
  { value: "ADVERTISEMENT", label: "광고" },
  { value: "ETC", label: "기타" },
];

function ReportDialog({ open, onClose, onSubmit, loading }: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) {
      setReason(null);
      setDescription("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!reason) return;
    onSubmit(reason, description || undefined);
  };

  return (
    <Modal open={open} onClose={onClose} title="신고하기">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {reasons.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setReason(r.value)}
              className={cn(
                "px-4 py-3 rounded-lg border text-left text-sm transition-colors",
                reason === r.value
                  ? "border-cyan-500 bg-cyan-100 text-cyan-900"
                  : "border-gray-200 text-gray-700 hover:bg-gray-100",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        {reason === "ETC" && (
          <Textarea
            placeholder="신고 사유를 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>취소</Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={!reason}
            loading={loading}
          >
            신고
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export { ReportDialog, type ReportDialogProps };
