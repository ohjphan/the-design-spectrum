"use client";

import { useState } from "react";
import Link from "next/link";
import type { StageFit } from "@/lib/types";
import { getArchetypesByIds } from "@/lib/data";

interface StageExplorerProps {
  stages: StageFit[];
}

export function StageExplorer({ stages }: StageExplorerProps) {
  const [activeId, setActiveId] = useState<string>(
    stages[0]?.id ?? ""
  );
  const selected = stages.find((s) => s.id === activeId);
  const archetypes = selected
    ? getArchetypesByIds(selected.archetypeIds)
    : [];

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
        Company Stage
      </h2>
      <p className="max-w-2xl text-gray-mid">
        Explore which archetypes thrive and what the company needs at that stage.
      </p>

      <nav className="flex flex-wrap gap-2 border-b border-gray-light pb-0">
        {stages.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveId(stage.id)}
            className={`border-b-2 px-6 py-2 text-sm font-medium transition-colors ${
              activeId === stage.id
                ? "border-accent text-foreground"
                : "border-transparent text-gray-mid hover:text-foreground"
            }`}
          >
            {stage.label}
          </button>
        ))}
      </nav>

      {selected && (
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-foreground">{selected.label}</h3>
            <p className="mt-1 text-gray-mid">{selected.description}</p>
          </div>
          {selected.companySize && (
            <div>
              <p className="text-sm font-medium text-foreground">
                Company size
              </p>
              <p className="mt-1 text-gray-mid">{selected.companySize} employees</p>
            </div>
          )}
          {selected.examples && selected.examples.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground">
                Examples
              </p>
              <ul className="mt-1 list-inside list-disc text-gray-mid">
                {selected.examples.map((company) => (
                  <li key={company}>{company}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">
              Archetypes that thrive here
            </p>
            <ul className="mt-1 grid grid-cols-1 gap-3">
            {archetypes.map((a) => (
              <li key={a.id}>
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
