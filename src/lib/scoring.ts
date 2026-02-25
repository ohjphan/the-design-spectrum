import type { ArchetypeId, ArchetypeResult } from "./types";

const LETTER_TO_ARCHETYPE: Record<string, ArchetypeId> = {
  A: "visionary",
  B: "systems-thinker",
  C: "growth-optimization",
  D: "craft-purist",
  E: "researcher",
  F: "design-operator",
  G: "strategic-partner",
};

const ALL_ARCHETYPE_IDS: ArchetypeId[] = [
  "visionary",
  "systems-thinker",
  "growth-optimization",
  "craft-purist",
  "researcher",
  "design-operator",
  "strategic-partner",
];

function getDistribution(answers: string[]): Record<ArchetypeId, number> {
  const distribution = ALL_ARCHETYPE_IDS.reduce(
    (acc, id) => ({ ...acc, [id]: 0 }),
    {} as Record<ArchetypeId, number>
  );
  for (const letter of answers) {
    const id = LETTER_TO_ARCHETYPE[letter.toUpperCase()];
    if (id) distribution[id]++;
  }
  return distribution;
}

/**
 * Compute dominant archetype (and optional secondary / hybrid / adaptive generalist)
 * from an array of 5 answer letters (A–G).
 */
export function computeArchetypeResult(answers: string[]): ArchetypeResult {
  if (answers.length !== 5) {
    const distribution = getDistribution(answers);
    const dominant = (ALL_ARCHETYPE_IDS.find((id) => distribution[id] > 0) ??
      "visionary") as ArchetypeId;
    return {
      dominant,
      isHybrid: false,
      isAdaptiveGeneralist: false,
      distribution,
    };
  }

  const distribution = getDistribution(answers);
  const entries = (Object.entries(distribution) as [ArchetypeId, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const maxCount = entries[0]?.[1] ?? 0;
  const topEntries = entries.filter(([, c]) => c === maxCount);

  if (maxCount === 1) {
    return {
      dominant: entries[0]?.[0] ?? "visionary",
      isHybrid: false,
      isAdaptiveGeneralist: true,
      distribution,
    };
  }

  if (topEntries.length >= 2) {
    return {
      dominant: topEntries[0][0],
      secondary: topEntries[1][0],
      isHybrid: true,
      isAdaptiveGeneralist: false,
      distribution,
    };
  }

  const secondary =
    entries[1]?.[1] !== undefined && entries[1][1] > 0 ? entries[1][0] : undefined;
  return {
    dominant: entries[0][0],
    secondary,
    isHybrid: false,
    isAdaptiveGeneralist: false,
    distribution,
  };
}

/**
 * Encode result for shareable URL: d=dominant&s=secondary (optional).
 */
export function encodeResultForUrl(result: ArchetypeResult): string {
  const params = new URLSearchParams();
  params.set("d", result.dominant);
  if (result.secondary) params.set("s", result.secondary);
  if (result.isAdaptiveGeneralist) params.set("a", "1");
  return params.toString();
}

/**
 * Decode result from URL params. Returns null if invalid.
 */
export function decodeResultFromUrl(
  searchParams: URLSearchParams
): Pick<ArchetypeResult, "dominant" | "secondary" | "isAdaptiveGeneralist"> | null {
  const d = searchParams.get("d") as ArchetypeId | null;
  if (!d || !ALL_ARCHETYPE_IDS.includes(d)) return null;
  const s = searchParams.get("s") as ArchetypeId | null;
  const secondary =
    s && ALL_ARCHETYPE_IDS.includes(s) ? s : undefined;
  const isAdaptiveGeneralist = searchParams.get("a") === "1";
  return { dominant: d, secondary, isAdaptiveGeneralist };
}
