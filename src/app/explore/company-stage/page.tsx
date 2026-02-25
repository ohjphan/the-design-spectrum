import { stageFit } from "@/lib/data";
import { StageExplorer } from "@/components/StageExplorer";

const STAGE_IDS = new Set(stageFit.map((s) => s.id));

interface CompanyStagePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CompanyStagePage({
  searchParams,
}: CompanyStagePageProps) {
  const sp = await searchParams;
  const stageParam = typeof sp.stage === "string" ? sp.stage : undefined;
  const initialStageId =
    stageParam && STAGE_IDS.has(stageParam) ? stageParam : undefined;

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-12 sm:px-12 lg:px-16">
        <StageExplorer stages={stageFit} initialStageId={initialStageId} />
      </main>
    </div>
  );
}
