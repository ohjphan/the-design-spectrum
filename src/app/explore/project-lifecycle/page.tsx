import { phaseFit } from "@/lib/data";
import { PhaseExplorer } from "@/components/PhaseExplorer";

const PHASE_IDS = new Set(phaseFit.map((p) => p.id));

interface ProjectLifecyclePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectLifecyclePage({
  searchParams,
}: ProjectLifecyclePageProps) {
  const sp = await searchParams;
  const phaseParam = typeof sp.phase === "string" ? sp.phase : undefined;
  const initialPhaseId =
    phaseParam && PHASE_IDS.has(phaseParam) ? phaseParam : undefined;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-12 lg:px-16">
        <PhaseExplorer phases={phaseFit} initialPhaseId={initialPhaseId} />
      </main>
    </div>
  );
}
