"use client";

import { useState } from "react";

interface ShareResultProps {
  shareUrl: string;
}

export function ShareResult({ shareUrl }: ShareResultProps) {
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

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-sm text-gray-mid hover:text-foreground"
    >
      {copied ? "Link copied" : "Copy result link"}
    </button>
  );
}
