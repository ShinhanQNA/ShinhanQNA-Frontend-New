"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "../lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "rounded-2xl border-none bg-white p-0 shadow-modal backdrop:bg-black/50 max-w-lg w-full",
        className,
      )}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="p-6">
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        )}
        {children}
      </div>
    </dialog>
  );
}

export { Modal, type ModalProps };
