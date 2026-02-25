"use client";

import { useState } from "react";

interface ShareResultProps {
  shareUrl: string;
  label?: string;
  variant?: "primary" | "secondary";
}

export function ShareResult({
  shareUrl,
  label = "Copy result link",
  variant,
}: ShareResultProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${shareUrl}`
      : shareUrl;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const base =
    "inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-tight transition-colors";
  const primary =
    "border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground";
  const secondary = "text-sm text-gray-mid hover:text-foreground";
  const className =
    variant === "primary"
      ? `${base} ${primary}`
      : variant === "secondary"
        ? `${base} border border-foreground text-foreground hover:bg-foreground hover:text-background`
        : secondary;

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "Copied!" : label}
    </button>
  );
}
