import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { getArchetypeById } from "@/lib/data";
import {
  computeArchetypeResult,
  decodeResultFromUrl,
  encodeResultForUrl,
} from "@/lib/scoring";
import { ArchetypeRadarChart } from "@/components/ArchetypeRadarChart";
import { ResultHero } from "@/components/ResultHero";
import { ResultTabs } from "@/components/ResultTabs";
import { ShareBar } from "@/components/ShareBar";

const OG_TITLE = "Check out my design archetype";
const OG_DESCRIPTION =
  "Discover your product design archetype with The Design Spectrum.";

interface ResultsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: ResultsPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const params = new URLSearchParams(
    typeof sp.d === "string" ? { d: sp.d, s: sp.s as string } : {}
  );
  const decoded = decodeResultFromUrl(params);
  const archetypeLabel = decoded
    ? getArchetypeById(decoded.dominant)?.label
    : null;
  const title = archetypeLabel
    ? `${OG_TITLE} — ${archetypeLabel}`
    : OG_TITLE;
  return {
    title,
    description: OG_DESCRIPTION,
    openGraph: {
      title,
      description: OG_DESCRIPTION,
    },
  };
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

  const resultsPath = `/results?${encodeResultForUrl(result)}`;
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const fullShareUrl = `${proto}://${host}${resultsPath}`;

  return (
    <div className="min-h-screen bg-background pb-24">
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
      </main>

      <footer
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-light bg-background py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        aria-label="Results actions"
      >
        <div className="mx-auto flex max-w-[868px] justify-center px-6 sm:px-12 lg:px-16">
          <ShareBar shareUrl={resultsPath} fullUrl={fullShareUrl} />
        </div>
      </footer>
    </div>
  );
}
