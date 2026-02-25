import { stageFit } from "@/lib/data";
import { StageExplorer } from "@/components/StageExplorer";

export default function CompanyStagePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-12 sm:px-12 lg:px-16">
        <StageExplorer stages={stageFit} />
      </main>
    </div>
  );
}
