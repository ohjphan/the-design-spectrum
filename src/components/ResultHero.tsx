import type { Archetype } from "@/lib/types";

interface ResultHeroProps {
  dominant: Archetype;
  secondary?: Archetype;
  isHybrid: boolean;
  isAdaptiveGeneralist: boolean;
  /** When "detail", show only label + shortDescription (e.g. archetype browse page). */
  variant?: "result" | "detail";
}

export function ResultHero({
  dominant,
  secondary,
  isHybrid,
  isAdaptiveGeneralist,
  variant = "result",
}: ResultHeroProps) {
  let title: string;
  let description: string;

  if (variant === "detail") {
    title = dominant.label;
    description = dominant.shortDescription;
  } else if (isAdaptiveGeneralist) {
    title = "You are an Adaptive Generalist";
    description =
      "Your instincts are distributed across archetypes—often a sign of senior design maturity. You adapt to context rather than defaulting to one mode.";
  } else if (isHybrid && secondary) {
    title = `You are a ${dominant.label}–${secondary.label} Hybrid`;
    description = dominant.shortDescription;
  } else {
    title = `You are a ${dominant.label}`;
    description = dominant.shortDescription;
  }

  return (
    <header className="space-y-4">
      <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-[68px]">
        {title}
      </h1>
      <p className="max-w-2xl text-lg text-gray-mid">{description}</p>
    </header>
  );
}
