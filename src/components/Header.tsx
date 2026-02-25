"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Archetypes", href: "/archetypes" },
  { label: "Company Stage", href: "/explore/company-stage" },
  { label: "Project Phase", href: "/explore/project-lifecycle" },
];

export function Header() {
  const pathname = usePathname();
  const isQuiz = pathname === "/quiz";

  return (
    <header
      className="border-b border-gray-light bg-background"
      style={{ position: "sticky", top: 0, zIndex: 2 }}
    >
      <div className="mx-auto flex max-w-[868px] items-center justify-between gap-6 px-6 py-4 sm:px-12 lg:px-16">
        <Link
          href="/"
          className="text-lg font-medium tracking-tight text-foreground"
        >
          The Design Spectrum
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-foreground hover:underline"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Take the quiz
          </Link>
        </nav>
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
