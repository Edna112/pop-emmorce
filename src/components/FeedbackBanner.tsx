"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type Variant = "success" | "error";

interface FeedbackBannerProps {
  variant: Variant;
  title: string;
  message: string;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export default function FeedbackBanner({
  variant,
  title,
  message,
  onDismiss,
  autoDismissMs = 8000,
}: FeedbackBannerProps) {
  useEffect(() => {
    if (autoDismissMs <= 0) return;
    const t = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(t);
  }, [autoDismissMs, onDismiss]);

  const isSuccess = variant === "success";
  const Icon = isSuccess ? CheckCircle : XCircle;
  const bg = isSuccess ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200";
  const iconColor = isSuccess ? "text-emerald-600" : "text-red-600";
  const titleColor = isSuccess ? "text-emerald-800" : "text-red-800";
  const textColor = isSuccess ? "text-emerald-700" : "text-red-700";

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border p-4 ${bg} shadow-sm`}
    >
      <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${iconColor}`} aria-hidden />
      <div className="flex-1 min-w-0">
        <p className={`font-semibold ${titleColor}`}>{title}</p>
        <p className={`mt-1 text-sm ${textColor}`}>{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className={`shrink-0 p-1 rounded-md transition-colors hover:bg-black/5 ${textColor}`}
        aria-label="Dismiss"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
