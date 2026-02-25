import { phaseFit } from "@/lib/data";
import { PhaseExplorer } from "@/components/PhaseExplorer";

export default function ProjectLifecyclePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-12 sm:px-12 lg:px-16">
        <PhaseExplorer phases={phaseFit} />
      </main>
    </div>
  );
}
