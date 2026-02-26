import { notFound } from "next/navigation";
import { getArchetypeById, archetypes } from "@/lib/data";
import type { ArchetypeResult } from "@/lib/types";
import { ResultHero } from "@/components/ResultHero";
import { ResultTabs } from "@/components/ResultTabs";

export function generateStaticParams() {
  return archetypes.map((a) => ({ id: a.id }));
}

interface ArchetypeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ArchetypeDetailPage({
  params,
}: ArchetypeDetailPageProps) {
  const { id } = await params;
  const archetype = getArchetypeById(id);

  if (!archetype) notFound();

  const syntheticResult: ArchetypeResult = {
    dominant: archetype.id,
    isHybrid: false,
    isAdaptiveGeneralist: false,
    distribution: {
      visionary: 0,
      "systems-thinker": 0,
      "growth-optimization": 0,
      "craft-purist": 0,
      researcher: 0,
      "design-operator": 0,
      "strategic-partner": 0,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-12 lg:px-16">
        <div className="space-y-16">
          <ResultHero
            dominant={archetype}
            isHybrid={false}
            isAdaptiveGeneralist={false}
            variant="detail"
          />
          <ResultTabs result={syntheticResult} />
        </div>
      </main>
    </div>
  );
}
