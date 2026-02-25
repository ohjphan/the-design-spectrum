"use client";

import { useState } from "react";
import type { ArchetypeResult } from "@/lib/types";
import type { Archetype } from "@/lib/types";
import { getArchetypeById } from "@/lib/data";
import { stageFit, phaseFit } from "@/lib/data";

type TabId = "strengths" | "risks" | "stage" | "phase" | "growth";

const TABS: { id: TabId; label: string }[] = [
  { id: "strengths", label: "Strengths" },
  { id: "risks", label: "Risks" },
  { id: "stage", label: "Best Company Stage" },
  { id: "phase", label: "Best Project Phase" },
  { id: "growth", label: "Growth Path" },
];

const TAB_DESCRIPTIONS: Record<TabId, string> = {
  strengths: "Where you generate momentum and clarity without forcing it.",
  risks: "Where your strengths, pushed too far, can create imbalance.",
  stage: "The context that multiplies your impact.",
  phase: "The moment in the cycle where your instincts are most decisive.",
  growth: "The capabilities that turn a strong designer into a complete one.",
};

interface ResultTabsProps {
  result: ArchetypeResult;
}

export function ResultTabs({ result }: ResultTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("strengths");
  const dominant = getArchetypeById(result.dominant);
  if (!dominant) return null;

  const stage = stageFit.find((s) =>
    s.archetypeIds.includes(result.dominant)
  );
  const phase = phaseFit.find((p) =>
    p.archetypeIds.includes(result.dominant)
  );

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap gap-2 border-b border-gray-light pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-gray-mid hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <p className="text-gray-mid">{TAB_DESCRIPTIONS[activeTab]}</p>

      <div className="min-h-[200px]">
        {activeTab === "strengths" && (
          <ul className="grid animate-fade-in gap-3 sm:grid-cols-1">
            {dominant.strengths.map((s, i) => (
              <li
                key={i}
                className="border border-gray-light px-6 py-4 text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "risks" && (
          <ul className="grid animate-fade-in gap-3 sm:grid-cols-1">
            {dominant.risks.map((r, i) => (
              <li
                key={i}
                className="border border-gray-light px-6 py-4 text-foreground"
              >
                {r}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "stage" && (
          <div className="animate-fade-in space-y-4">
            <p className="text-gray-mid">
              Where you tend to thrive: {dominant.bestCompanyStage.join(", ")}.
            </p>
            {stage && (
              <div className="border border-gray-light px-6 py-4">
                <p className="font-medium">{stage.label}</p>
                <p className="mt-1 text-gray-mid">{stage.description}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === "phase" && (
          <div className="animate-fade-in space-y-4">
            <p className="text-gray-mid">
              Phases where you shine: {dominant.bestProjectPhase.join(", ")}.
            </p>
            {phase && (
              <div className="border border-gray-light px-6 py-4">
                <p className="font-medium">{phase.label}</p>
                <p className="mt-1 text-gray-mid">{phase.description}</p>
              </div>
            )}
          </div>
        )}
        {activeTab === "growth" && (
          <div className="animate-fade-in border border-gray-light px-6 py-4">
            <p className="text-foreground">{dominant.growthPath}</p>
          </div>
        )}
      </div>
    </div>
  );
}
