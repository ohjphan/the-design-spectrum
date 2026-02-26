"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const PARALLAX_FACTOR = 0.35;

export function HeroParallax() {
  const containerRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const height = container.offsetHeight;
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setOffset(0);
          return;
        }
        const scrollProgress = -rect.top;
        const maxOffset = height * PARALLAX_FACTOR;
        const value = Math.max(-maxOffset, Math.min(maxOffset, scrollProgress * PARALLAX_FACTOR));
        setOffset(value);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[28vh] min-h-[160px] w-full overflow-hidden sm:min-h-[180px]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
        }}
      >
        <Image
          src="/hero-design-spectrum.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-background/20 mix-blend-overlay" aria-hidden />
    </section>
  );
}
