"use client";

import { useState } from "react";
import Link from "next/link";
import type { PhaseFit } from "@/lib/types";
import { getArchetypesByIds } from "@/lib/data";

interface PhaseExplorerProps {
  phases: PhaseFit[];
  /** When provided (e.g. from ?phase= in URL), open this tab on load. */
  initialPhaseId?: string;
}

export function PhaseExplorer({
  phases,
  initialPhaseId,
}: PhaseExplorerProps) {
  const [activeId, setActiveId] = useState<string>(
    initialPhaseId && phases.some((p) => p.id === initialPhaseId)
      ? initialPhaseId
      : phases[0]?.id ?? ""
  );
  const selected = phases.find((p) => p.id === activeId);
  const archetypes = selected
    ? getArchetypesByIds(selected.archetypeIds)
    : [];

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
        Project Phase
      </h2>
      <p className="max-w-2xl text-gray-mid">
        Explore which archetypes shine and why for each phase.
      </p>

      <nav className="flex flex-nowrap gap-1 overflow-x-auto border-b border-gray-light pb-0 sm:gap-2">
        {phases.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => setActiveId(phase.id)}
            className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors sm:px-6 ${
              activeId === phase.id
                ? "border-accent text-foreground"
                : "border-transparent text-gray-mid hover:text-foreground"
            }`}
          >
            {phase.label}
          </button>
        ))}
      </nav>

      {selected && (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-foreground">
              {selected.label}
            </h3>
            <p className="mt-1 text-gray-mid">{selected.description}</p>
          </div>
          <div>
            <p className="mb-3 text-lg font-medium tracking-tight text-foreground">Archetypes that shine here</p>
            <ul className="grid grid-cols-1 gap-0">
            {archetypes.map((a) => (
              <li key={a.id} className="-mt-px first:mt-0">
                <Link
                  href={`/archetypes/${a.id}`}
                  className="block w-full border border-gray-light px-6 py-4 text-left text-base text-foreground transition-colors hover:border-gray-mid"
                >
                  {a.emoji && <span>{a.emoji} </span>}
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      )}
    </div>
  );
}
