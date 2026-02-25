import Link from "next/link";
import { getArchetypeById } from "@/lib/data";
import {
  computeArchetypeResult,
  decodeResultFromUrl,
  encodeResultForUrl,
} from "@/lib/scoring";
import { ArchetypeRadarChart } from "@/components/ArchetypeRadarChart";
import { ResultHero } from "@/components/ResultHero";
import { ResultTabs } from "@/components/ResultTabs";
import { Button } from "@/components/Button";
import { ShareResult } from "@/components/ShareResult";

interface ResultsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const sp = await searchParams;
  const s = typeof sp.s === "string" ? sp.s : undefined;
  const params = new URLSearchParams(
    typeof sp.d === "string" ? { d: sp.d, s: sp.s as string } : {}
  );

  let result;
  if (s) {
    const answers = s.split(",").map((a) => a.trim()).filter(Boolean);
    result = computeArchetypeResult(answers);
  } else {
    const decoded = decodeResultFromUrl(params);
    if (!decoded) {
      return (
        <div className="min-h-screen bg-background px-6 py-24">
          <main className="mx-auto max-w-[868px]">
            <p className="text-gray-mid">
              No results.{" "}
              <Link href="/quiz" className="text-accent hover:underline">
                Take the quiz
              </Link>{" "}
              to discover your archetype.
            </p>
          </main>
        </div>
      );
    }
    const distribution = {
      visionary: 0,
      "systems-thinker": 0,
      "growth-optimization": 0,
      "craft-purist": 0,
      researcher: 0,
      "design-operator": 0,
      "strategic-partner": 0,
      ...(decoded.secondary
        ? { [decoded.dominant]: 3, [decoded.secondary]: 2 }
        : { [decoded.dominant]: 5 }),
    };
    result = {
      dominant: decoded.dominant,
      secondary: decoded.secondary,
      isHybrid: !!decoded.secondary,
      isAdaptiveGeneralist: decoded.isAdaptiveGeneralist ?? false,
      distribution,
    };
  }

  const dominant = getArchetypeById(result.dominant);
  const secondary = result.secondary
    ? getArchetypeById(result.secondary)
    : undefined;

  if (!dominant) {
    return (
      <div className="min-h-screen bg-background px-6 py-24">
        <p className="text-gray-mid">Invalid result.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-12 sm:px-12 lg:px-16">
        <div className="space-y-16">
          <ResultHero
            dominant={dominant}
            secondary={secondary}
            isHybrid={result.isHybrid}
            isAdaptiveGeneralist={result.isAdaptiveGeneralist}
          />
          <div className="-mt-10 mb-2">
            <ArchetypeRadarChart distribution={result.distribution} />
          </div>
          <ResultTabs result={result} />
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Button href="/quiz">Retake quiz</Button>
          <ShareResult shareUrl={`/results?${encodeResultForUrl(result)}`} />
        </div>
      </main>
    </div>
  );
}
