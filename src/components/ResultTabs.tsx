"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArchetypeResult } from "@/lib/types";
import type { Archetype } from "@/lib/types";
import { getArchetypeById } from "@/lib/data";
import { stageFit, phaseFit } from "@/lib/data";
type TabId = "strengths" | "environments" | "growth";

const TABS: { id: TabId; label: string }[] = [
  { id: "strengths", label: "Strengths & Blind Spots" },
  { id: "environments", label: "Best Environments" },
  { id: "growth", label: "Growth Paths" },
];

const TAB_DESCRIPTIONS: Record<TabId, string> = {
  strengths: "",
  environments: "",
  growth: "",
};

function toSentenceCase(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

interface ResultTabsProps {
  result: ArchetypeResult;
}

export function ResultTabs({ result }: ResultTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("strengths");
  const dominant = getArchetypeById(result.dominant);
  if (!dominant) return null;

  const stages = stageFit.filter((s) =>
    s.archetypeIds.includes(result.dominant)
  );
  const phases = phaseFit.filter((p) =>
    p.archetypeIds.includes(result.dominant)
  );

  return (
    <div className="space-y-8">
      <nav className="flex flex-nowrap gap-1 overflow-x-auto border-b border-gray-light pb-0 sm:gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors sm:px-6 ${
              activeTab === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-gray-mid hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {TAB_DESCRIPTIONS[activeTab] ? (
        <p className="text-gray-mid">{TAB_DESCRIPTIONS[activeTab]}</p>
      ) : null}

      <div className="min-h-[200px]">
        {activeTab === "strengths" && (
          <div className="animate-fade-in space-y-10">
            <div>
              <p className="mb-1 text-lg font-medium tracking-tight text-foreground">Strengths</p>
              <p className="mb-3 text-gray-mid">Where you generate momentum and clarity without forcing it</p>
              {dominant.strengthsPoints && dominant.strengthsPoints.length > 0 ? (
                <div className="space-y-0">
                  {dominant.strengthsPoints.map((point, i) => (
                    <div
                      key={i}
                      className="-mt-px flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-3 pl-5 pr-4 first:mt-0"
                    >
                      <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                        {i + 1}
                      </span>
                      <div className="text-foreground">
                        <p className="font-medium">{toSentenceCase(point.title)}</p>
                        <p className="mt-1 text-gray-mid text-sm sm:text-base">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-0">
                  {(dominant.strengths ?? []).map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-3 pl-5 pr-4"
                    >
                      <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="mb-1 text-lg font-medium tracking-tight text-foreground">Blind Spots</p>
              <p className="mb-3 text-gray-mid">Where your strengths, pushed too far, can create imbalance</p>
              {dominant.risksPoints && dominant.risksPoints.length > 0 ? (
                <div className="space-y-0">
                  {dominant.risksPoints.map((point, i) => (
                    <div
                      key={i}
                      className="-mt-px flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-3 pl-5 pr-4 first:mt-0"
                    >
                      <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                        {i + 1}
                      </span>
                      <div className="text-foreground">
                        <p className="font-medium">{toSentenceCase(point.title)}</p>
                        <p className="mt-1 text-gray-mid text-sm sm:text-base">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-0">
                  {(dominant.risks ?? []).map((r, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-3 pl-5 pr-4"
                    >
                      <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{r}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {activeTab === "environments" && (
          <div className="animate-fade-in space-y-10">
            <div>
              <p className="mb-1 text-lg font-medium tracking-tight text-foreground">Best Company Stage</p>
              <p className="mb-3 text-gray-mid">Where you tend to thrive</p>
              {stages.length > 0 ? (
                <div className="space-y-0">
                  {stages.map((stage) => (
                    <Link
                      key={stage.id}
                      href={`/explore/company-stage?stage=${encodeURIComponent(stage.id)}`}
                      className="-mt-px block border border-gray-light px-6 py-4 text-foreground transition-colors hover:border-gray-mid first:mt-0"
                    >
                      <p className="font-medium">{stage.label}</p>
                      <p className="mt-1 text-gray-mid">{stage.description}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <div>
              <p className="mb-1 text-lg font-medium tracking-tight text-foreground">Best Project Phase</p>
              <p className="mb-3 text-gray-mid">Project phases where you shine</p>
              {phases.length > 0 ? (
                <div className="space-y-0">
                  {phases.map((phase) => (
                    <Link
                      key={phase.id}
                      href={`/explore/project-lifecycle?phase=${encodeURIComponent(phase.id)}`}
                      className="-mt-px block border border-gray-light px-6 py-4 text-foreground transition-colors hover:border-gray-mid first:mt-0"
                    >
                      <p className="font-medium">{phase.label}</p>
                      <p className="mt-1 text-gray-mid">{phase.description}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
        {activeTab === "growth" && (
          <div className="animate-fade-in space-y-10">
            <div>
              <p className="mb-1 text-lg font-medium tracking-tight text-foreground">Growth Paths</p>
              <p className="mb-3 text-gray-mid">To expand your impact, consider building strength in</p>
              {dominant.growthPathPoints && dominant.growthPathPoints.length > 0 ? (
                <div className="space-y-0">
                  {dominant.growthPathPoints.map((point, i) => (
                    <div
                      key={i}
                      className="-mt-px flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-3 pl-5 pr-4 first:mt-0"
                    >
                      <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                        {i + 1}
                      </span>
                      <div className="text-foreground">
                        <p className="font-medium">{toSentenceCase(point.title)}</p>
                        <p className="mt-1 text-gray-mid text-sm sm:text-base">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-4 pl-5 pr-4">
                  <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                    1
                  </span>
                  <p className="text-foreground">
                    {dominant.growthPath ?? "—"}
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="mb-1 text-lg font-medium tracking-tight text-foreground">How your manager can help</p>
              <p className="mb-3 text-gray-mid">To support and amplify your archetype</p>
              {dominant.tipsForManagersPoints && dominant.tipsForManagersPoints.length > 0 ? (
                <div className="space-y-0">
                  {dominant.tipsForManagersPoints.map((point, i) => (
                    <div
                      key={i}
                      className="-mt-px flex items-center gap-4 border-l-4 border-gray-light bg-gray-light/5 py-3 pl-5 pr-4 first:mt-0"
                    >
                      <span className="font-medium tracking-tight text-foreground text-2xl sm:text-3xl shrink-0 mr-4">
                        {i + 1}
                      </span>
                      <div className="text-foreground">
                        <p className="font-medium">{toSentenceCase(point.title)}</p>
                        <p className="mt-1 text-gray-mid text-sm sm:text-base">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
