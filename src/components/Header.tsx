"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Archetypes", href: "/archetypes" },
  { label: "Company Stage", href: "/explore/company-stage" },
  { label: "Project Phase", href: "/explore/project-lifecycle" },
  { label: "About", href: "/about" },
];

/** Minimal radial diagram logomark (matches archetype radar). Segments animate in on mount and on hover. */
function Logomark({ animKey = 0 }: { animKey?: number }) {
  const n = 7;
  const cx = 16;
  const cy = 16;
  const R = 13;
  const innerR = R * 0.4;
  const segmentR = R * 0.88;
  const angles = Array.from({ length: n }, (_, i) => 90 - (i * 360) / n);
  const toPt = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
  };
  const outer = angles.map((a) => toPt(a, R));
  const outerStr = outer.map((p) => `${p.x},${p.y}`).join(" ");
  const innerStr = angles.map((a) => toPt(a, innerR)).map((p) => `${p.x},${p.y}`).join(" ");

  const segmentPaths = angles.map((_, i) => {
    const next = (i + 1) % n;
    const p1 = toPt(angles[i], segmentR);
    const p2 = toPt(angles[next], segmentR);
    return `M ${cx} ${cy} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`;
  });

  const opacityBySegment = [0.15, 0.42, 0.22, 0.38, 0.12, 0.35, 0.28];

  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 shrink-0 text-foreground sm:h-9 sm:w-9"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      {/* Concentric inner ring */}
      <polygon points={innerStr} className="stroke-[var(--gray-light)]" />
      {/* Spokes */}
      <g className="stroke-[var(--gray-light)]" strokeWidth="0.8">
        {angles.map((angle, i) => {
          const end = toPt(angle, R);
          return (
            <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} />
          );
        })}
      </g>
      {/* Outer heptagon (no stroke) */}
      <polygon points={outerStr} stroke="none" />
      {/* Animated accent segments (replay when key changes / on hover) */}
      <g key={animKey}>
        {segmentPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            className="animate-logo-segment-in"
            style={{
              fill: "var(--accent)",
              fillOpacity: opacityBySegment[i],
              stroke: "var(--accent)",
              strokeWidth: 1,
              animationDelay: `${i * 0.06}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-shrink-0 items-center justify-center" aria-hidden>
      {open ? (
        <>
          <span className="absolute h-0.5 w-5 bg-current rotate-45" />
          <span className="absolute h-0.5 w-5 bg-current -rotate-45" />
        </>
      ) : (
        <>
          <span className="absolute top-0 left-0 h-0.5 w-6 bg-current" />
          <span className="absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 bg-current" />
          <span className="absolute bottom-0 left-0 h-0.5 w-6 bg-current" />
        </>
      )}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const isQuiz = pathname === "/quiz";
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoAnimKey, setLogoAnimKey] = useState(0);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="border-b border-gray-light bg-background"
      style={{ position: "sticky", top: 0, zIndex: 50 }}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4 sm:px-12 lg:px-16">
        <Link
          href="/"
          className="font-heading group flex items-center gap-2 text-2xl font-medium tracking-tight text-foreground"
          onMouseEnter={() => setLogoAnimKey((k) => k + 1)}
        >
          <Logomark animKey={logoAnimKey} />
          <span>The Design Spectrum</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/quiz"
            className="font-heading inline-flex shrink-0 items-center justify-center whitespace-nowrap border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Take the quiz
          </Link>
          <button
            type="button"
            className="flex items-center justify-center p-2 -mr-2 text-foreground hover:opacity-80 transition-opacity"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Full-screen menu overlay (mobile + desktop) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 bg-foreground text-background transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={closeMenu}
          className="absolute top-[calc(env(safe-area-inset-top)+1rem)] right-6 p-2 text-background hover:opacity-80 transition-opacity"
          aria-label="Close menu"
        >
          <span className="flex h-6 w-6 items-center justify-center text-3xl font-light leading-none" aria-hidden>×</span>
        </button>
        <div className="flex flex-col min-h-full pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] px-6">
          <nav className="flex flex-col flex-1" aria-label="Main">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="font-heading py-4 text-5xl md:text-7xl font-medium border-b border-white/20 text-background transition-all duration-200 hover:text-white hover:translate-x-2"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isQuiz && (
        <div
          id="progress-bar-mount"
          className="w-full"
          style={{ height: 3 }}
          aria-hidden
        />
      )}
    </header>
  );
}
