"use client";

import { useState } from "react";
import Link from "next/link";
import type { StageFit } from "@/lib/types";
import { getArchetypesByIds } from "@/lib/data";
import { STAGE_LINKEDIN_URLS } from "@/lib/linkedin-urls";

interface StageExplorerProps {
  stages: StageFit[];
  /** When provided (e.g. from ?stage= in URL), open this tab on load. */
  initialStageId?: string;
}

export function StageExplorer({
  stages,
  initialStageId,
}: StageExplorerProps) {
  const [activeId, setActiveId] = useState<string>(
    initialStageId && stages.some((s) => s.id === initialStageId)
      ? initialStageId
      : stages[0]?.id ?? ""
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

      <nav className="flex flex-nowrap gap-1 overflow-x-auto border-b border-gray-light pb-0 sm:gap-2">
        {stages.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveId(stage.id)}
            className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors sm:px-6 ${
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
            <ul className="mt-1 grid grid-cols-1">
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
            {STAGE_LINKEDIN_URLS[selected.id] && (
              <a
                href={STAGE_LINKEDIN_URLS[selected.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-4 text-base font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Explore Roles at This Stage
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
