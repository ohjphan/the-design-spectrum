"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const BAR_HEIGHT_PX = 3;

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMount(document.getElementById("progress-bar-mount"));
  }, []);

  const barContent = (
    <div
      className="h-full w-full bg-gray-light"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div
        className="h-full bg-accent transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );

  const bar =
    typeof document !== "undefined" && mount
      ? createPortal(barContent, mount)
      : null;

  return (
    <>
      {bar}
      <div style={{ height: `${BAR_HEIGHT_PX}px` }} aria-hidden />
    </>
  );
}
